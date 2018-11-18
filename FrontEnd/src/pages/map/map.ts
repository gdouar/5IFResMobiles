import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConfConstants } from '../../conf/ConfConstants';
import { Mesure } from "../../model/Mesure.model";
import { Reseau } from '../../model/Reseau.model';
import { AndroidServiceProvider } from '../../service/AndroidServiceProvider';
import { MapService } from '../../service/MapService';
import { MockServiceProvider } from '../../service/MockServiceProvider';
import { ServiceProvider } from '../../service/ServiceProvider';
import { SpeedtestBackgroundJob } from '../../speedtest/SpeedtestBackgroundJob';
import { ColorsUtil } from '../../util/ColorsUtil';
import { MathUtil } from '../../util/MathUtil';
import { DetailPage } from '../details/details';
import { ParametresPage } from '../parametres/parametres';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
/**
 * Page de la carte principale
 */
export class MapPage {
  map: google.maps.Map;
  /**Les points actuellement affichés par la carte */
  points : Array<Mesure> =new Array<Mesure>();
  /** Cache des points en attente d'être affichés  */
  cachedPoints: Array<Mesure> = new Array<Mesure>();
  /** Toutes les mesures des réseaux */
  network2Points: Map<Reseau, Array<Mesure>> = new Map<Reseau, Array<Mesure>>();
  mapService : MapService = new MapService();
  displayedPolygons : Array<google.maps.Polygon> = new Array();
  mapLoadingClass:string = "";
  optionsEnabled:boolean = true;
  serviceProvider:ServiceProvider;
  currentUserMarker:google.maps.Marker;

 constructor(  public navCtrl: NavController,public toastCtrl: ToastController) {
   this.serviceProvider = ConfConstants.IS_PROD ? new AndroidServiceProvider() : new MockServiceProvider();
 }


  // Appel asynchrone au chargement de la carte
  async ionViewDidLoad(){
    await this.fillMapMarkers();
    let settings : any= JSON.parse(await this.serviceProvider.getFileAccessObject().readAsText());
    SpeedtestBackgroundJob.getBackgroundJobInstance((settings).frequence,(settings).collecte_auto, this.serviceProvider, this.toastCtrl).updateBackgroundJob(); 
  }
  // chargement carte défaut
  loadMapUI(){
    this.optionsEnabled = false;
    this.mapLoadingClass = 'blurrWrapperLoadingEffect';
  }
  // stoppe l'effet chargement de la carte
  stopMapLoad(){
    this.mapLoadingClass="";
    this.optionsEnabled = true;
  }
/**
 * Remplissage des points de la carte
 */
  async fillMapMarkers(){
    this.loadMapUI();
    try{
      this.points = new Array<Mesure>();
      this.cachedPoints = new Array<Mesure>();
      this.network2Points = new Map<Reseau, Array<Mesure>>();
      var settings : any = await this.serviceProvider.getFileAccessObject().readAsText();
      settings = <any> (JSON.parse(settings));
      console.log(settings)
      var networksPoints;
      console.log("geoloc")
      let latUser :number = await this.serviceProvider.getGeolocationObject().getCurrentLatitude();
      let longUser = await this.serviceProvider.getGeolocationObject().getCurrentLongitude();
      console.log("position is [" + latUser + ";" + longUser + "]");
      networksPoints = await this.mapService.getMapDatas(	settings, latUser, longUser);
      console.log(networksPoints)
      for(var network in networksPoints){
        var reseau = new Reseau( networksPoints[network]["id_reseau"],  networksPoints[network]["ssid"]);
        var measures = new Array<Mesure>();
        var zones = networksPoints[network]["zones"];
        for (var key in zones ) {
          if (networksPoints[network]["zones"].hasOwnProperty(key)) {
              if(key != "zone-1"){      //Suppression du bruit
                var colorZone = ColorsUtil.getRandomColor();
                for(var zoneInfoIndx in zones[key]){
                  var latitude = zones[key][zoneInfoIndx].latitude;
                  var longitude = zones[key][zoneInfoIndx].longitude;
                  let msArray : Array<any> = zones[key][zoneInfoIndx].mesures;
                  let measure = new Mesure(msArray[0].idmesure, latitude, longitude, 
                                msArray[0].datemesure, Math.round(msArray[0].bandepassante* 100) /100, 
                                msArray[0].forcesignal, colorZone, reseau, msArray);
                  measures.push(measure);
                }
                this.network2Points.set(reseau, measures);
              }
          }
        }
      }
      if(this.network2Points.size > 0){
        this.cachedPoints =  Array.from(this.network2Points)[0][1];   
        ParametresPage.selectedNetwork = Array.from(this.network2Points)[0][0];
        this.updateZones();
      }
      else {
        this.cachedPoints = new Array<Mesure>();
      }
      if(this.map.getZoom() >= ConfConstants.MAP_MIN_ZOOM_LEVEL){
        this.points = this.cachedPoints.slice();    // copie des mesures en cache
      }
    }
    catch(ex){
        console.log("ERROR OCCURED IN fillMapMarkers !")
        console.log(ex)
    }
    finally{
      this.stopMapLoad();
    }
  }
  
  setDisplayedPoints(network){
    this.cachedPoints = this.network2Points.get(network);
    this.updateZones();
  }

  showMapIfNeeded(network){
    if(ConfConstants.MAP_MIN_ZOOM_LEVEL <= this.map.getZoom()){
       this.points = this.network2Points.get(network);
    }
    else {
      this.points = new Array();
    }
  }

  /**
   * Met à jour les zones de la carte (polygones)
   */
  updateZones(){
    for(var pol in this.displayedPolygons){
      this.displayedPolygons[pol].setMap(null);     // Supprime les anciens polygones
    }
    let map = new Map<String, Array<Mesure>>();
    for(var po in this.cachedPoints){       // répartition par zone
      let mes : Mesure = this.cachedPoints[po];
      if(!map.has(mes.colorUrl)){
        let arr = new Array<Mesure>();
        arr.push(mes);
        map.set(mes.colorUrl, arr);
      } else map.get(mes.colorUrl).push(mes);
    }
    this.displayedPolygons = new Array();
    map.forEach((value) => {
      var polygonePoints = MathUtil.getEnveloppeConvexe(value);
      var centroid = MathUtil.getMeasuresPolygonCentroid(polygonePoints);
      var pointsToDisplay = polygonePoints.map(m => new google.maps.LatLng(m.lat, m.lon)).sort(function(a,b) {
        if (MathUtil.angleFromCoordinate(a.lat(),a.lng(), centroid.x, centroid.y) <
            MathUtil.angleFromCoordinate(b.lat(),b.lng(), centroid.x, centroid.y))
            return -1;
        if (MathUtil.angleFromCoordinate(a.lat(),a.lng(), centroid.x, centroid.y) > 
            MathUtil.angleFromCoordinate(b.lat(),b.lng(), centroid.x, centroid.y))
            return 1;
        return 0;
      });
      var percentage = Math.max(
        Math.min(MathUtil.moyenneBandePassanteZone(value) /ConfConstants.OPTIMAL_BANDWIDTH_MAP * 100, 100),0);
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
  async mapReady(map){
    this.map = map;
    let userLat:number = await this.serviceProvider.getGeolocationObject().getCurrentLatitude();
    let usrLng:number = await  this.serviceProvider.getGeolocationObject().getCurrentLongitude();
    this.map.setCenter(new google.maps.LatLng(userLat,usrLng));
    this.map.setZoom(15);
    /* Change markers on zoom */
    var that = this;
    google.maps.event.addListener(that.map, 'zoom_changed', function() {
      var zoom = map.getZoom();
      if(zoom >= ConfConstants.MAP_MIN_ZOOM_LEVEL){
        that.points= that.cachedPoints.slice();
      }
      else {
        that.points = new Array<Mesure>();
      }
    });
    //TODO maybe later  ? this.serviceProvider.getGeolocationObject().setOnLocationChangedListener(this);
  }

  /**
   * Ouvre une page de détails
   * @param clickedMarker la mesure cliquée
   */
  details(clickedMarker){
    console.log("marker is " + clickedMarker)
    this.navCtrl.push(DetailPage, {
        marker:this.cachedPoints.find(function(element) {
          return element.id == clickedMarker;
        })
    });
  }

  /**
   * Ouvre la page des paramètres
   */
  settings(){
    this.navCtrl.push(ParametresPage, {
      mapPage: this
    });
  }

}
