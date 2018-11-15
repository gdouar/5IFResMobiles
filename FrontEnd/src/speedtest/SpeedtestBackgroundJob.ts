import { SpeedTest } from "./Speedtest";
import { Mesure } from "../model/Mesure.model";
import { IPService } from "../service/IPService";
import { Network } from "@ionic-native/network";
import { ConfConstants } from "../conf/ConfConstants";
import { Geolocation } from '@ionic-native/geolocation';
import { Geoposition } from '@ionic-native/geolocation';
import { Reseau } from "../model/Reseau.model";
import { MeasureService } from "../service/MeasureService";

/**
 * Job exécuté en arrière plan pour récupérer les infos de speedtest
 */
declare var WifiWizard2: any;

export class SpeedtestBackgroundJob {
  frequencyInMinutes :number;
  timeout:any;
  static instance:SpeedtestBackgroundJob;
  active:boolean;
  constructor(frequencyInMinutes){
    this.frequencyInMinutes = frequencyInMinutes;
  }

  /** Obtient une nouvelle instance ou l'instance existante mise à jour */
  static getBackgroundJobInstance(frequencyInMinutes, active):SpeedtestBackgroundJob{
    if(SpeedtestBackgroundJob.instance == null){
      SpeedtestBackgroundJob.instance = new SpeedtestBackgroundJob(frequencyInMinutes);
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
  //    if(signal == -1) return;  // TODO déterminer que faire en cas d'erreur de récupération GSM
      // TODO tester cette partie sous android
      var network = new Network();
      console.log("TYPE")
      var networkType = network.type;
      console.log(networkType)
      if(networkType == "3g" || networkType == "4g" || networkType == "5g") {
        type = "mobile";    
      }
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
      var geolocation = new Geolocation();
      let position: Geoposition = await geolocation.getCurrentPosition();
      console.log(position);
      latitude = position.coords.latitude;
      console.log(latitude);
      longitude = position.coords.longitude;
      console.log(longitude);
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
    var measure = new Mesure(null, latitude, longitude, new Date(), bandwidth, signal, null, null);
    await new MeasureService().sendMeasure(measure, ssid, myIp, type);
    
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