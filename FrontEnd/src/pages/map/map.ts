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
export class MapPage {
  points : Array<Mesure> =new Array<Mesure>();
  mapService : MapService = new MapService();

 constructor(  public navCtrl: NavController) {

   // this.points.push(new Mesure(50,50,"10/10/10",10,10));
  }

  async ionViewDidLoad(){
    console.log("ionViewDidLoad")
    var test = await this.mapService.getMapDatas(	{
      "wifi" : true,
      "mobile" : false,
      "bande_passante_minimale": 5,
      "rayon_recherche": 0.5
    }, 45.785081, 4.888602);
    console.log("test =")
    console.log(test)
  }

  details(){
   //this.navCtrl.push(DetailPage);
  }

}
