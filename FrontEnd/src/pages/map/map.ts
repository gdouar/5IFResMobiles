import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Mesure} from "../../model/Mesure.model";
import { MapService } from '../../service/MapService';
import { ColorsUtil } from '../../util/ColorsUtil';
import { JSONFileAccess } from '../../settings/JSONFileAccess';
import { FileMock } from '../../mocks/FileMock';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
/**
 * Page de la carte principale
 */
export class MapPage {
  points : Array<Mesure> =new Array<Mesure>();
  mapService : MapService = new MapService();

 constructor(  public navCtrl: NavController) {

   // this.points.push(new Mesure(50,50,"10/10/10",10,10));
  }

  // Appel asynchrone au chargement de la carte
  async ionViewDidLoad(){
    /*var settings = {
      "wifi" : true,
      "mobile" : false,
      "bande_passante_minimale": 5,
      "rayon_recherche": 0.5
    };*/
    var settingsFile = new FileMock()
    var settings = await new JSONFileAccess().readFile(settingsFile);
    var networksPoints = await this.mapService.getMapDatas(	settings, 45.785081, 4.888602);
    console.log(networksPoints)
    var measures = new Array<Mesure>();
    for(var network in networksPoints){
      for (var key in networksPoints[network]["zones"] ) {
        if (networksPoints[network]["zones"].hasOwnProperty(key)) {
          var zones = networksPoints[network]["zones"];
          for(var zone in zones){
            if(zone != "zone-1"){      //Suppression du bruit
              var colorZone = ColorsUtil.getRandomColor();
              for(var mesureZoneIndx in zones[zone]){
                var mesureZone = zones[zone][mesureZoneIndx];
                let measure = new Mesure(mesureZone["idmesure"], mesureZone["latitude"], mesureZone["longitude"], 
                              mesureZone["datemesure"]["date"], mesureZone["bandepassante"], mesureZone["forcesignal"], colorZone);
                measures.push(measure);
              }
            }
          }
        }
      }
    }
    console.log(measures);
    this.points = measures;
  }

  details(){
   //this.navCtrl.push(DetailPage);
  }

}
