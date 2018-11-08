import { Component } from '@angular/core';
import {Mesure} from "../../model/Mesure.model";
import { ColorsUtil } from '../../util/ColorsUtil';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailPage {
  mesure : Mesure;
  reseau : string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("called")
    this.mesure = (navParams.get('marker'));
    //this.mesure=new Mesure(1, 50,50,"10/10/10",10,10, ColorsUtil.getRandomColor());
    this.reseau=this.mesure.reseau.ssid;
  }

}

