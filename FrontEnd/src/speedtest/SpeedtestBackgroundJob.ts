import { SpeedTest } from "./Speedtest";
import { Mesure } from "../model/Mesure.model";
import { IPService } from "../service/IPService";
import { Network } from "@ionic-native/network";
import { ConfConstants } from "../conf/ConfConstants";

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
      var bandwidth = await new SpeedTest().getNetworkBandwidth();
      console.log("bandwidth is " + bandwidth);
      var myIp = await new IPService().getMyIp()["ip"];
      var type = new Network().type;
      if(type == "3g" || type == "4g" || type == "5g") type = "mobile";    
      var ssid;
      if(ConfConstants.IS_PROD){
        // Ce code ne marchera pas avec un npm run ionic:serve classique (ni cordiva run browser)
        // commande cordova = cordova run android
      // console.log(WifiWizard2.getConnectedSSID());
      // ssid = WifiWizard2.getConnectedSSID();
      }
      else {
        ssid = "TEST_DEV";
      }


    //  var measureToCreate = new Mesure();

    
      that.updateBackgroundJob();
    } , (this.frequencyInMinutes * 60 * 1000));
  }
  }