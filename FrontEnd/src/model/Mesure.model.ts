/**
 * Représentation interne d'une mesure
 */
export class Mesure {
  id:number;
  lat : number;
  lon : number;
  date : string ;
  bandePassante : number;
  force : number;
  colorUrl:string;
  constructor(id:number, la : number, lo : number, dat : string, bp : number, forc : number, color:string){
    this.id = id;
    this.bandePassante = bp;
    this.date = dat;
    this.lon = lo;
    this.lat = la;
    this.force = forc;
    this.colorUrl = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + color;
  }
}
