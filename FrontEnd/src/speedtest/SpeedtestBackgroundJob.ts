import { SpeedTest } from "./Speedtest";
import { Mesure } from "../model/Mesure.model";
import { IPService } from "../service/IPService";

/**
 * Job exécuté en arrière plan pour récupérer les infos de speedtest
 */

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
      var myIp = await new IPService().getMyIp()["ip"];
     // var measureToCreate = new Mesure();

      console.log("bandwidth is " + bandwidth);
      
      that.updateBackgroundJob();
    } , (this.frequencyInMinutes * 60 * 1000));
  }
  }