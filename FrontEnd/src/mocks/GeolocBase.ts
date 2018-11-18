/**
 * Classe de mock pour l'accès à la géolocalisation
 */
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
    
}
  
  