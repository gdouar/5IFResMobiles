
/**
 * Gestion des services de base d'accès aux données du front-end
 */

import { ConfConstants } from '../conf/ConfConstants';
import * as request  from "request";

export class SpeedTest {

  constructor(){
  }

  // Récupère la bande passante mesurée actuele du réseau en téléchargement
  async getNetworkBandwidth(){    
    return new Promise(function (resolve, reject) {
       var startTime = new Date().getTime();
        request.get("http://localhost/speedtest", {
            headers: {
                "Content-Type" : "application/x-www-form-urlencoded"
            },
        },   
        function (error, response, body) {
            var downloadSize = 4995374;
            var endTime = new Date().getTime();
            if (error) {
                console.error('getImage() failed:', error);
                reject(null);
            }
            var duration = (endTime - startTime) / 1000;
            var bitsLoaded = downloadSize * 8;
            let speedMBps:number = parseFloat(((bitsLoaded / duration)/ 1024/ 1024).toFixed(2));
            console.log("speed is : " + speedMBps);
            resolve(speedMBps);
        });
    });
  }


}