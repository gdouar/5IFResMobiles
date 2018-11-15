import { SpeedTest } from "./Speedtest";
import { Mesure } from "../model/Mesure.model";
import { IPService } from "../service/IPService";
import { Network } from "@ionic-native/network";
import { ConfConstants } from "../conf/ConfConstants";
import { Geolocation } from '@ionic-native/geolocation';
import { Geoposition } from "@ionic-native-mocks/geolocation";
import { Reseau } from "../model/Reseau.model";
import { MeasureService } from "../service/MeasureService";

/**
 * Job exécuté en arrière plan pour récupérer les infos de speedtest
 */
declare var WifiWizard2: any;

export class SpeedtestBackgroundJob {
  frequencyInMinutes :number;
  constructor(frequencyInMinutes){
    this.frequencyInMinutes = frequencyInMinutes;
  }


  /** MAJ du processus en arrière-plan */
  async updateBackgroundJob(){
    var that = this;
    setTimeout(async function () {
      await that.sendWifiAndLocData(that);
      that.updateBackgroundJob();
    } , (this.frequencyInMinutes * 60 * 1000));
  }

  /**
   * Envoi des données du téléphone vers le backend
   * @param that cette instance d'objet
   */
  async sendWifiAndLocData(that:SpeedtestBackgroundJob){
    let bandwidth:number = <number> (await new SpeedTest().getNetworkBandwidth());
    console.log("bandwidth is " + bandwidth);
    var myIp = <any>(await new IPService().getMyIp());
    myIp = myIp.ip;
    var type;
    var ssid;
    var latitude;
    var longitude;
    var signal;
    if(ConfConstants.IS_PROD){
      // Ce code ne marchera pas avec un npm run ionic:serve classique (ni cordova run browser)
      // TODO tester cette partie sous android
      ssid = WifiWizard2.getConnectedSSID();
      var network = new Network();
      type = network.type;
      if(type == "3g" || type == "4g" || type == "5g") {
        type = "mobile";    
      }
      var geolocation = new Geolocation();
      let position: Geoposition = await geolocation.getCurrentPosition();
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      signal = await that.getWifiSignal(<any>(window));   //tslint
    }
    else {
      ssid = "TEST_DEV";
      latitude = 45.784535;
      longitude = 4.882980;
      type = "wifi";
      signal = 4;
    }     // TODO décider si la mesure doit s'afficher directement ou pas sur la carte ?
    var measure = new Mesure(null, latitude, longitude, new Date(), bandwidth, signal, null, null);
    await new MeasureService().sendMeasure(measure, ssid, myIp, type);
  }
  // retourne le signal Wifi actuellement capté
async getWifiSignal(window:any){
  return new Promise<number>(resolve => {
    window.SignalStrength.dbm(function(measuredDbm){
      resolve(measuredDbm);
    });
  });
}

  }