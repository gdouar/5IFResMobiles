import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Mesure} from "../../model/Mesure.model";
import { MapService } from '../../service/MapService';
import { ColorsUtil } from '../../util/ColorsUtil';
import { JSONFileAccess } from '../../settings/JSONFileAccess';
import { FileMock } from '../../mocks/FileMock';
import{DetailPage} from '../details/details';
import{ParametresPage} from '../parametres/parametres';
import { Reseau } from '../../model/Reseau.model';
import { ConfConstants } from '../../conf/ConfConstants';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
/**
 * Page de la carte principale
 */
export class MapPage {
  map: any;
  
  points : Array<Mesure> =new Array<Mesure>();
  mapService : MapService = new MapService();

  //TODO use cordova geolocation later
  currentLat:number = 45.784535;
  currentLng:number = 4.882980;

 constructor(  public navCtrl: NavController) {

   // this.points.push(new Mesure(50,50,"10/10/10",10,10));
  }

  // Appel asynchrone au chargement de la carte
  async ionViewDidLoad(){
    await this.fillMapMarkers();
  }

/**
 * Remplissage des points de la carte
 */
  async fillMapMarkers(){
    this.points = new Array<Mesure>();
    var settings = await FileMock.readAsText(ConfConstants.SETTINGS_FILENAME)
    settings = JSON.parse(settings);
    console.log(settings)
    var networksPoints = await this.mapService.getMapDatas(	settings,this.currentLat, this.currentLng);
    console.log(networksPoints)
    var measures = new Array<Mesure>();
    for(var network in networksPoints){
      var reseau = new Reseau( networksPoints[network]["id_reseau"],  networksPoints[network]["ssid"]);
      for (var key in networksPoints[network]["zones"] ) {
        if (networksPoints[network]["zones"].hasOwnProperty(key)) {
          var zones = networksPoints[network]["zones"];
          for(var zone in zones){
            if(zone != "zone-1"){      //Suppression du bruit
              var colorZone = ColorsUtil.getRandomColor();
              for(var mesureZoneIndx in zones[zone]){
                var mesureZone = zones[zone][mesureZoneIndx];
                let measure = new Mesure(mesureZone["idmesure"], mesureZone["latitude"], mesureZone["longitude"], 
                              new Date(mesureZone["datemesure"]["date"]), Math.round(mesureZone["bandepassante"]* 100) /100, 
                              mesureZone["forcesignal"], colorZone, reseau);
                measures.push(measure);
              }
            }
          }
        }
      }
    }
    this.points = measures;
  }

  /**
   * Chargement de la carte
   * @param map la carte
   */
  mapReady(map){
    this.map = map;
    this.map.setCenter(new google.maps.LatLng(this.currentLat, this.currentLng));
    this.map.setZoom(15);
  }

  details(clickedMarker){
    console.log("marker is " + clickedMarker)
    this.navCtrl.push(DetailPage, {
        marker:this.points.find(function(element) {
          return element.id == clickedMarker;
        })
    });
  }

  settings(){
    this.navCtrl.push(ParametresPage, {
      mapPage: this
    });
  }

}
