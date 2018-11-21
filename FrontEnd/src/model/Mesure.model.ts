import { Reseau } from "./Reseau.model";
import { MathUtil } from "../util/MathUtil";

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
   // this.lastBandePassanteAvg = Math.round(bp);
    this.date = dat;
    this.lon = lo;
    this.lat = la;
    this.force = forc;
    this.colorUrl = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + color;
    this.reseau = reseau;
    this.mesuresPassees = mesuresPassees;
    var averagedResults = MathUtil.averageDayResults("bandepassante", this.mesuresPassees);
    if(averagedResults.length > 0){
      this.bandePassanteAvg = averagedResults[averagedResults.length - 1].y;
    }  else {
      this.bandePassanteAvg = this.bandePassante;
    }
    this.bandePassanteAvg = Math.round(this.bandePassanteAvg);
  }
}
