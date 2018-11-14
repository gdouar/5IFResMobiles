
/**
 * Job exécuté en arrière plan pour récupérer les infos de speedtest
 */

export class SpeedtestBackgroundJob {
  frequencyInMinutes :number;
  constructor(frequencyInMinutes){
    this.frequencyInMinutes = frequencyInMinutes;
  }

  /** MAJ du processus en arrière-plan */
  updateBackgroundJob(){
    var that = this;
    setTimeout(function () {
      // Do Something Here
      // Then recall the parent function to
      // create a recursive loop.
      console.log("test !")
      that.updateBackgroundJob();
    } , (this.frequencyInMinutes * 60 * 1000));
  }
  }