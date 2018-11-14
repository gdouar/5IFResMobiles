import { SpeedTest } from "./Speedtest";

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
      console.log("bandiwdth is " + bandwidth);
      
      that.updateBackgroundJob();
    } , (this.frequencyInMinutes * 60 * 1000));
  }
  }