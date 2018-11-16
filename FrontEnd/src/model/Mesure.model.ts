import { Reseau } from "./Reseau.model";

/**
 * Représentation interne d'une mesure
 */
export class Mesure {
  id:number;
  lat : number;
  lon : number;
  date : Date ;
  bandePassante : number;
  force : number;
  colorUrl:string;
  bandePassanteAvg : number;
  reseau:Reseau;
  mesuresPassees: Array<number>;    // la bande passante historisée
  signalPasse : Array<number>;    // l'historique du signal GSM
  
  constructor(id:number, la : number, lo : number, dat : Date, bp : number, forc : number, color:string, reseau : Reseau){
    this.id = id;
    this.bandePassante = bp;
    
    this.date = dat;
    this.lon = lo;
    this.lat = la;
    this.force = forc;
    this.colorUrl = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + color;
    this.bandePassanteAvg = Math.round(bp);
    this.reseau = reseau;
  }
}
