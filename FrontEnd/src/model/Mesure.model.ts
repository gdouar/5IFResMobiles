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
  mesuresPassees: Array<any>;    // les mesures précédentes historisées
  
  constructor(id:number, la : number, lo : number, dat : Date, bp : number, forc : number, color:string, reseau : Reseau, mesuresPassees){
    this.id = id;
    this.bandePassante = bp;
    
    this.date = dat;
    this.lon = lo;
    this.lat = la;
    this.force = forc;
    this.colorUrl = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + color;
    this.bandePassanteAvg = Math.round(bp);
    this.reseau = reseau;
    this.mesuresPassees = mesuresPassees;
  }
}
