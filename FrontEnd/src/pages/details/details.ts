import { Component, ViewChild } from '@angular/core';
import {Mesure} from "../../model/Mesure.model";
import { ColorsUtil } from '../../util/ColorsUtil';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailPage {
  @ViewChild('barCanvas') barCanvas;
  mesure : Mesure;
  reseau : string;
  detailsMap:any;
  barChart: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mesure = (navParams.get('marker'));
    //this.mesure=new Mesure(1, 50,50,"10/10/10",10,10, ColorsUtil.getRandomColor());
    console.log(this.mesure)
    this.reseau=this.mesure.reseau.ssid;
  }

  ionViewDidLoad(){
    this.barChart = new Chart(this.barCanvas.nativeElement, {
 
      type: 'bar',
      data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
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

