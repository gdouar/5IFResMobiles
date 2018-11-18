/**
 * Classe de mock pour l'accès à la géolocalisation
 */
import { MapPage } from "../pages/map/map";
export class GeolocBase {

    constructor(){
    }
    async getCurrentLatitude() : Promise<number>{
        return new Promise<number>((resolve) => {
          resolve(45.784535);
        });
    }
  
    async getCurrentLongitude() : Promise<number>{
        return new Promise<number>((resolve) => {
            resolve(4.882980);
        });
    }

    async setOnLocationChangedListener(mapPage:MapPage){
        // pas de géoloc
    }
    
}
  
  