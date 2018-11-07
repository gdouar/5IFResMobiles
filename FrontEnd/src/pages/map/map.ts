import { Component } from '@angular/core';
import {Geolocation} from "@ionic-native/geolocation";
import { NavController } from 'ionic-angular';
import { DetailPage} from "../details/details";
import {Mesure} from "../../model/Mesure.model";

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  points : Array<Mesure> =new Array<Mesure>();

  constructor(  public navCtrl: NavController) {
    this.points.push(new Mesure(50,50,"10/10/10",10,10));
  }

  details(){
    this.navCtrl.push(DetailPage);
  }

}
