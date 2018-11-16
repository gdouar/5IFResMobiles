import { Component, ViewChild } from '@angular/core';
import {Mesure} from "../../model/Mesure.model";
import { ColorsUtil } from '../../util/ColorsUtil';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Chart} from 'chart.js';
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailPage {

  mesure : Mesure;
  reseau : string;
  detailsMap:google.maps.Map;
 
  @ViewChild('lineCanvas') lineCanvas;
 
  lineChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("created")
    this.mesure = (navParams.get('marker'));
    //this.mesure=new Mesure(1, 50,50,"10/10/10",10,10, ColorsUtil.getRandomColor());
    console.log(this.mesure)
    this.reseau=this.mesure.reseau.ssid;
  }
  ionViewDidLoad(){
    console.log(this.lineCanvas)
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: [{
            x: 10,
            y: 20
        }, {
            x: 15,
            y: 10
        }],
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }

    });
  }
 
  /**
   * Chargement de la carte
   * @param map la carte
   */
  mapReady(map){
    this.detailsMap = map;
    let center = new google.maps.LatLng(this.mesure.lat, this.mesure.lon);
    this.detailsMap.setCenter(center);
    this.detailsMap.setZoom(17);
    this.detailsMap.panTo(center);
  }
}

