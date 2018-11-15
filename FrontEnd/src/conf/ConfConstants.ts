/**
 * Gestion des constantes de configuration du front
 */
export class ConfConstants {
  public static get IS_PROD() : boolean { return false; }
//  public static get BACKEND_PORT():number  { return 80; }
  public static get BACKEND_URL():string { return ConfConstants.IS_PROD ? "https://connectme.julien-emmanuel.com/" : "http://localhost:80/"}
  public static get MAPDATAS_URL():string { return "getMap"; }
  public static get MY_IP_URL():string { return "ip"; }
  public static get SPEEDTEST_URL():string { return "speedtest"; }
  public static get CREATE_MEASURE_URL():string { return "createMeasure"; }
  public static get SETTINGS_FILENAME() : string {return "www/assets/settings.json"; }
  /*public static get SPEEDTEST_IMAGE_URL() : string {return "http://www.kenrockwell.com/contax/images/g2/examples/31120037-5mb.jpg"; }
  public static get SPEEDTEST_BYTES_TO_DOWNLOAD() : number {return 4995374; }*/
}