import { Component } from '@angular/core';
import {Geolocation} from "@ionic-native/geolocation";
import { NavController } from 'ionic-angular';
import { DetailPage} from "../details/details";
import {Mesure} from "../../model/Mesure.model";
import { MapService } from '../../service/MapService';

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
    var networksPoints = await this.mapService.getMapDatas(	{
      "wifi" : true,
      "mobile" : false,
      "bande_passante_minimale": 5,
      "rayon_recherche": 0.5
    }, 45.785081, 4.888602);
    var measures = new Array<Mesure>();
    for(var network in networksPoints){
      for (var key in networksPoints[network]["zones"] ) {
        if (networksPoints[network]["zones"].hasOwnProperty(key)) {
          var zones = networksPoints[network]["zones"];
          for(var zone in zones){
            for(var mesureZoneIndx in zones[zone]){
              var mesureZone = zones[zone][mesureZoneIndx];
              let measure = new Mesure(mesureZone["latitude"], mesureZone["longitude"], 
                            mesureZone["datemesure"]["date"], mesureZone["bandePassante"], mesureZone["forcesignal"]);
              measures.push(measure);
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
