import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Mesure} from "../../model/Mesure.model";
import { MapService } from '../../service/MapService';
import { ColorsUtil } from '../../util/ColorsUtil';
import { JSONFileAccess } from '../../settings/JSONFileAccess';
import { FileBase } from '../../mocks/FileBase';
import{DetailPage} from '../details/details';
import{ParametresPage} from '../parametres/parametres';
import { Reseau } from '../../model/Reseau.model';
import { ConfConstants } from '../../conf/ConfConstants';
import { SpeedTest } from '../../speedtest/Speedtest';
import { SpeedtestBackgroundJob } from '../../speedtest/SpeedtestBackgroundJob';
import { AndroidConfigFile } from '../../fs/AndroidConfigFile';
import { File } from '@ionic-native/file';
import { MathUtil } from '../../util/MathUtil';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
/**
 * Page de la carte principale
 */
export class MapPage {
  map: any;
  /**Les points actuellement affichés par la carte */
  points : Array<Mesure> =new Array<Mesure>();
  /** Toutes les mesures des réseaux */
  network2Points: Map<Reseau, Array<Mesure>> = new Map<Reseau, Array<Mesure>>();
  mapService : MapService = new MapService();
  displayedPolygons : Array<google.maps.Polygon> = new Array();
  //TODO use cordova geolocation later
  currentLat:number = 45.784535;
  currentLng:number = 4.882980;
  mapLoadingClass:string = "";
 constructor(  public navCtrl: NavController) {

   // this.points.push(new Mesure(50,50,"10/10/10",10,10));
  }

  // Appel asynchrone au chargement de la carte
  async ionViewDidLoad(){
    await this.fillMapMarkers();
    var settings : any= ConfConstants.IS_PROD ? await new AndroidConfigFile(new File()).readAsText(): await FileBase.readAsText(ConfConstants.SETTINGS_FILENAME)
    SpeedtestBackgroundJob.getBackgroundJobInstance(JSON.parse(settings).frequence,JSON.parse(settings).collecte_auto).updateBackgroundJob(); 
  }

/**
 * Remplissage des points de la carte
 */
  async fillMapMarkers(){
    this.points = new Array<Mesure>();
    this.network2Points = new Map<Reseau, Array<Mesure>>();
    this.mapLoadingClass = 'blurrWrapperLoadingEffect';
    var settings : any= ConfConstants.IS_PROD ? await new AndroidConfigFile(new File()).readAsText(): await FileBase.readAsText(ConfConstants.SETTINGS_FILENAME)
    settings = <any> (JSON.parse(settings));
    console.log(settings)
    var networksPoints = await this.mapService.getMapDatas(	settings,this.currentLat, this.currentLng);
    console.log(networksPoints)
    for(var network in networksPoints){
      var reseau = new Reseau( networksPoints[network]["id_reseau"],  networksPoints[network]["ssid"]);
      var measures = new Array<Mesure>();
      var zones = networksPoints[network]["zones"];
      for (var key in zones ) {
        if (networksPoints[network]["zones"].hasOwnProperty(key)) {
            if(key != "zone-1"){      //Suppression du bruit
              var colorZone = ColorsUtil.getRandomColor();
              for(var mesureZoneIndx in zones[key]){
                var mesureZone = zones[key][mesureZoneIndx];
                let measure = new Mesure(mesureZone["idmesure"], mesureZone["latitude"], mesureZone["longitude"], 
                              new Date(mesureZone["datemesure"]["date"]), Math.round(mesureZone["bandepassante"]* 100) /100, 
                              mesureZone["forcesignal"], colorZone, reseau);
                measures.push(measure);
              }
              this.network2Points.set(reseau, measures);
            }
        }
      }
    }
    this.mapLoadingClass="";
    if(this.network2Points.size > 0){
      this.points =  Array.from(this.network2Points)[0][1];   
      ParametresPage.selectedNetwork = Array.from(this.network2Points)[0][0];
      this.updateZones();
    }
    else {
      this.points = new Array<Mesure>();
    }
  }

  setDisplayedPoints(network){
    this.points = this.network2Points.get(network);
    this.updateZones();
  }

  updateZones(){
    for(var pol in this.displayedPolygons){
      this.displayedPolygons[pol].setMap(null);     // Supprime les anciens polygones
    }
    let map = new Map<String, Array<Mesure>>();
    for(var po in this.points){       // répartition par zone
      let mes : Mesure = this.points[po];
      if(!map.has(mes.colorUrl)){
        let arr = new Array<Mesure>();
        arr.push(mes);
        map.set(mes.colorUrl, arr);
      } else map.get(mes.colorUrl).push(mes);
    }
    this.displayedPolygons = new Array();
    var that = this;
    map.forEach((value, key) => {
      var polygonePoints = MathUtil.getEnveloppeConvexe(map.get(key));
      var pointsToDisplay = polygonePoints.map(m => new google.maps.LatLng(m.lat, m.lon)).sort(function(a,b) {
        let centerPoint : Mesure = that.points[0];
        if (MathUtil.angleFromCoordinate(a.lat(),a.lng(), centerPoint.lat, centerPoint.lon) <
            MathUtil.angleFromCoordinate(b.lat(),b.lng(), centerPoint.lat, centerPoint.lon))
            return -1;
        if (MathUtil.angleFromCoordinate(a.lat(),a.lng(), centerPoint.lat, centerPoint.lon) > 
            MathUtil.angleFromCoordinate(b.lat(),b.lng(), centerPoint.lat, centerPoint.lon))
            return 1;
        // a doit être égal à b
        return 0;
      });
      var percentage = Math.max(
        Math.min(MathUtil.moyenneBandePassanteZone(map.get(key)) /ConfConstants.OPTIMAL_BANDWIDTH_MAP * 100, 100),0);
      var colorZone = ColorsUtil.getColorForPercentage(percentage / 100);
      var polygon = new google.maps.Polygon({
        paths: pointsToDisplay,
        strokeColor: colorZone,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: colorZone,
        fillOpacity: 0.35      
      });
      polygon.setMap(this.map);
      this.displayedPolygons.push(polygon)
    });
  }

  getNetworksMap(){
    return this.network2Points;
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
