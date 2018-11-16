import { Component, ViewChild } from '@angular/core';
import {Mesure} from "../../model/Mesure.model";
import { ColorsUtil } from '../../util/ColorsUtil';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Chart} from 'chart.js';
import { dateValueRange } from 'ionic-angular/umd/util/datetime-util';
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailPage {

  mesure : Mesure;
  reseau : string;
  detailsMap:google.maps.Map;
  @ViewChild('lineCanvasBandwidth') lineCanvas;
  @ViewChild('lineCanvasSignal') lineCanvasSignal;
  lineChart: any;
  lineChartSignal: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("created")
    this.mesure = (navParams.get('marker'));
    console.log(this.mesure)
    this.reseau=this.mesure.reseau.ssid;
  }
  averageDayResults(mesureProperty){
    var measureMap = new Map();
    var that = this;
    that.mesure.mesuresPassees.forEach(value => {
        var date = new Date(value.datemesure.date).toString()
        if(measureMap.has(date)){
            measureMap.set(date, measureMap.get(date) + value[mesureProperty]);
        }
        else measureMap.set(date, value.bandepassante);
    })
    console.log(measureMap);
    var dataArray = new Array();
    measureMap.forEach((value, key) => {     
        var dateArr = new Date(key);
        var findArr = that.mesure.mesuresPassees.filter(
            mes => new Date(mes.datemesure.date).toString() == key);
        dataArray.push(<any>{x: dateArr, y:value / (findArr.length)});
    });
    console.log(dataArray); 
    return dataArray;
  }
  ionViewDidLoad(){
    console.log(this.lineCanvas)
    var that = this;
    console.log(that.mesure.mesuresPassees);
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
            datasets: [{
                data:  that.averageDayResults("bandepassante"),
                fill: false,
                backgroundColor: ["#000000"],
                borderColor: "#000000"
            }]
        },
        options: {
            legend: {
                display:false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'day',
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 20
                    }
                }]
            },
        }

    });
    this.lineChartSignal = new Chart(this.lineCanvasSignal.nativeElement, {
        type: 'line',
        data: {
            datasets: [{
                data:  that.averageDayResults("forcesignal"),
                fill: false,
                backgroundColor: ["#000000"],
                borderColor: "#000000"
            }]
        },
        options: {
            legend: {
                display:false
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'day',
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 20
                    }
                }]
            },
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

