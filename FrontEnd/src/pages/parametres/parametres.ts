import { Component } from '@angular/core';
import { FileMock } from '../../mocks/FileMock';
import { ConfConstants } from '../../conf/ConfConstants';

@Component({
  selector: 'page-parametres',
  templateUrl: 'parametres.html',
})
/**
 * Page des paramètres
 */
export class ParametresPage {
  bandePassante : number = 0;
  freqEchantillon : number = 0;
  distanceRecherche :number = 0;
  activerWifi:boolean = true;
  activer4G:boolean = true;
  afficherZones:boolean=true;
  collecteAuto:boolean=true;
  mode:string="";
  constructor() {
  }
/**
 * Chargement de l'interface
 */
  async ionViewDidLoad() {
    let parametersString = await  FileMock.readAsText(ConfConstants.SETTINGS_FILENAME);
    let params = JSON.parse(parametersString);
    this.bandePassante = params["bande_passante_minimale"];
    this.distanceRecherche = params["rayon_recherche"];
    this.activerWifi = params["wifi"];
    this.activer4G = params["mobile"];
    this.afficherZones = params["afficher_zones"];
    this.collecteAuto = true;
    this.freqEchantillon = params["frequence"];
    this.mode = this.freqEchantillon != null ? "echantillon" : "demandeServ";
    console.log(params)
  }

/**
 * Sauvegarde des paramètres
 */
  async validateParams(){
    console.log("serializing :")
    var savedParams = {
      "wifi" : this.activerWifi,
      "mobile" : this.activer4G,
      "bande_passante_minimale": this.bandePassante,
      "rayon_recherche": this.distanceRecherche,
      "afficher_zones" : this.afficherZones,
      "collecte_auto":this.collecteAuto,
      "frequence":this.freqEchantillon
    };
    console.log(savedParams)
    let parametersString = await FileMock.writeExistingFile(ConfConstants.SETTINGS_FILENAME, "", 
        JSON.stringify(savedParams)
    );
  }

}

