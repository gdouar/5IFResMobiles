import { Component } from '@angular/core';
import { FileBase } from '../../mocks/FileBase';
import { ConfConstants } from '../../conf/ConfConstants';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Reseau } from '../../model/Reseau.model';
import { Mesure } from '../../model/Mesure.model';
import { MapPage } from '../map/map';
import { SpeedtestBackgroundJob } from '../../speedtest/SpeedtestBackgroundJob';
import { ALLOW_MULTIPLE_PLATFORMS } from '@angular/core/src/application_ref';
import { AndroidConfigFile } from '../../fs/AndroidConfigFile';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-parametres',
  templateUrl: 'parametres.html',
})
/**
 * Page des paramètres
 */
export class ParametresPage {
  bandePassante : any = 0;
  freqEchantillon : number = 0;
  distanceRecherche :any = 0;
  activerWifi:boolean = true;
  activer4G:boolean = true;
  afficherZones:boolean=true;
  collecteAuto:boolean=true;
  mode:string="";
  mapPage:MapPage;
  networks:Array<Reseau> = new Array<Reseau>();
  static selectedNetwork:Reseau;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mapPage = (navParams.get('mapPage'));
    this.networks = [];
    this.mapPage.getNetworksMap().forEach((value: Array<Mesure>, key: Reseau) => {
      this.networks.push(key)
  });

  if(this.networks.length > 0 && ParametresPage.selectedNetwork == null){
    ParametresPage.selectedNetwork = this.networks[0];
  }
  }
  getSelectedNetwork(){
    return ParametresPage.selectedNetwork;
  }
/**
 * Chargement de l'interface
 */
  async ionViewDidLoad() {
    let parametersString = ConfConstants.IS_PROD ? await new AndroidConfigFile(new File()).readAsText(): await FileBase.readAsText(ConfConstants.SETTINGS_FILENAME)
    let params = JSON.parse(parametersString);
    this.bandePassante = parseFloat(params["bande_passante_minimale"]);
    this.distanceRecherche = parseFloat(params["rayon_recherche"]);
    this.activerWifi = params["wifi"];
    this.activer4G = params["mobile"];
    this.afficherZones = params["afficher_zones"];
    this.collecteAuto = params["collecte_auto"];
    this.freqEchantillon = parseFloat(params["frequence"]);
    this.mode = this.freqEchantillon != null ? "echantillon" : "demandeServ";
  }

selectNewNetwork(network){
  console.log("called")
  console.log(network)
  ParametresPage.selectedNetwork = network;
  this.mapPage.setDisplayedPoints(network);
}
/**
 * Sauvegarde des paramètres
 */
  async validateParams(){
    console.log("serializing :")
    // maj config
    var savedParams = {
      "wifi" : this.activerWifi,
      "mobile" : this.activer4G,
      "bande_passante_minimale": parseFloat(this.bandePassante),
      "rayon_recherche": parseFloat(this.distanceRecherche),
      "afficher_zones" : this.afficherZones,
      "collecte_auto":this.collecteAuto,
      "frequence":this.freqEchantillon
    };
    console.log(savedParams);
    let parametersString = await FileBase.writeExistingFile(ConfConstants.SETTINGS_FILENAME, "", 
        JSON.stringify(savedParams)
    );
   

  }
  
 async updateMap(){
    // maj carte
    ParametresPage.selectedNetwork = null;
    this.networks = [];
    this.mapPage.fillMapMarkers();
    this.navCtrl.pop();
 }
 async updateDataCollect(){
    let backgroundJob : SpeedtestBackgroundJob = 
          SpeedtestBackgroundJob.getBackgroundJobInstance(parseFloat(<any>(this.freqEchantillon)), this.collecteAuto);
    backgroundJob.setActive(this.collecteAuto);
    await backgroundJob.updateBackgroundJob();
    await this.validateParams();
  }

  async updateDataFrequency(){
    SpeedtestBackgroundJob.getBackgroundJobInstance(parseFloat(<any>(this.freqEchantillon)), this.collecteAuto);
    await this.validateParams();
  }

}

