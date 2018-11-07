import { Component } from '@angular/core';
import {Mesure} from "../../model/Mesure.model";


@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailPage {
  mesure : Mesure;
  reseau : string;

  constructor() {
    this.mesure=new Mesure(50,50,"10/10/10",10,10);
    this.reseau="4G";
  }

}

