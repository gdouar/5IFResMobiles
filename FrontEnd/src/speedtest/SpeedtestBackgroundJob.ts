import { Network } from "@ionic-native/network";
import { ToastController } from 'ionic-angular';
import { ConfConstants } from "../conf/ConfConstants";
import { Mesure } from "../model/Mesure.model";
import { IPService } from "../service/IPService";
import { MeasureService } from "../service/MeasureService";
import { ServiceProvider } from "../service/ServiceProvider";
import { SpeedTest } from "./Speedtest";

/**
 * Job exécuté en arrière plan pour récupérer les infos de speedtest
 */
declare var WifiWizard2: any;

export class SpeedtestBackgroundJob {
  frequencyInMinutes :number;
  serviceProvider:ServiceProvider;
  timeout:any;
  static instance:SpeedtestBackgroundJob;
  active:boolean;
  toastCtrl:ToastController;

  constructor(frequencyInMinutes, serviceProvider : ServiceProvider, toastCtrl : ToastController){
    this.frequencyInMinutes = frequencyInMinutes;
    this.serviceProvider = serviceProvider;
    this.toastCtrl = toastCtrl;
  }

  /** Obtient une nouvelle instance ou l'instance existante mise à jour */
  static getBackgroundJobInstance(frequencyInMinutes, active, serviceProvider, toastCtrl : ToastController):SpeedtestBackgroundJob{
    if(SpeedtestBackgroundJob.instance == null){
      SpeedtestBackgroundJob.instance = new SpeedtestBackgroundJob(frequencyInMinutes, serviceProvider, toastCtrl);
    }
    else {
      SpeedtestBackgroundJob.instance.frequencyInMinutes = frequencyInMinutes;
    }
    SpeedtestBackgroundJob.instance.setActive(active);
    return SpeedtestBackgroundJob.instance;
  }
  setActive(active){
    this.active = active;
  }
  /** Annulation de la collecte */
  clearBackgroundJob(){
    clearTimeout(this.timeout);
  }

  /** MAJ du processus en arrière-plan */
  async updateBackgroundJob(){
    var that = this;
    if(this.active){
      that.timeout = setTimeout(async function () {
        await that.sendWifiAndLocData(that);
        
        that.updateBackgroundJob();
      } , (this.frequencyInMinutes * 60 * 1000));
    }
  }

  /**
   * Envoi des données du téléphone vers le backend
   * @param that cette instance d'objet
   */
  async sendWifiAndLocData(that:SpeedtestBackgroundJob){
    try{
      var type;
      var ssid;
      var latitude;
      var longitude;
      var signal;
      if(ConfConstants.IS_PROD){
        // Ce code ne marchera pas avec un npm run ionic:serve classique (ni cordova run browser)
        console.log("CALLING GSM SIGNAL")
        signal = await that.getGSMSignal(<any>(window));   //tslint
        console.log("FINAL SIGNAL = " + signal)
    //    if(signal == -1) return;  // TODO déterminer que faire en cas d'erreur de récupération signal GSM
        var network = new Network();
        console.log("TYPE")
        var networkType = network.type;
        console.log(networkType)
        if(networkType == "3g" || networkType == "4g" || networkType == "5g") {
          type = "mobile";    
        } else if (type==undefined) type = "wifi";       // plugin error
        try {
          console.log("wifiwizard = ")
          console.log(WifiWizard2);
          ssid = await WifiWizard2.getConnectedSSID(); 
          console.log("ssid = " + ssid);
          }
          catch(ex){        // Pas de connexion à un réseau wifi
            console.log("could not get ssid :" + ex);
            ssid = (type == "mobile" ? networkType : "INCONNU"); 
            console.log("final ssid = " + ssid);
          }
        console.log("final type = " + type);
        console.log("GEOLOC");
        latitude = this.serviceProvider.getGeolocationObject().getCurrentLatitude();
        longitude = this.serviceProvider.getGeolocationObject().getCurrentLongitude();
        console.log("[" + latitude + ";" + longitude + "]");
      }
      else {
        ssid = "TEST_DEV";
        latitude = 45.784535;
        longitude = 4.882980;
        type = "wifi";
        signal = -85;
      }     // TODO décider si la mesure doit s'afficher directement ou pas sur la carte ?
      let bandwidth:number = <number> (await new SpeedTest().getNetworkBandwidth());
      console.log("bandwidth is " + bandwidth);
      var myIp = <any>(await new IPService().getMyIp());
      myIp = myIp.ip;
      var measure = new Mesure(null, latitude, longitude, new Date(), bandwidth, signal, null, null, new Array());
      await new MeasureService().sendMeasure(measure, ssid, myIp, type);
      this.toastUser("Mesure : " + bandwidth + " Mb/s. Prochaine collecte dans " + this.frequencyInMinutes + " minutes");
      
    }
    catch(ex){
      this.toastUser("Une erreur est survenue lors de la collecte de données. Prochaine collecte dans " + this.frequencyInMinutes + " minutes.");
      console.log("Could not send location data : ");
      console.log(ex);
    }
  }
  private toastUser(message:string) {
    let toast =  this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present(); 
  }

  // retourne le signal Wifi actuellement capté
async getGSMSignal(window:any){
  return new Promise<number>(resolve => {
    window.SignalStrength.dbm(function(measuredDbm){
      console.log("MEASURED " + measuredDbm),
      resolve(measuredDbm);
    });
  });
}

  }