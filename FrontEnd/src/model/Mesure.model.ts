export class Mesure {
  lat : number;
  lon : number;
  date : string ;
  bandePassante : number;
  force : number;
  constructor(la : number, lo : number, dat : string, bp : number, forc : number){
    this.bandePassante = bp;
    this.date = dat;
    this.lon = lo;
    this.lat = la;
    this.force = forc;
  }
}
