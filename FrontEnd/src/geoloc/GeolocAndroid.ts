import { GeolocBase } from "../mocks/GeolocBase";
import { Geolocation } from '@ionic-native/geolocation';
import { Geoposition } from '@ionic-native/geolocation';

export class GeolocAndroid extends GeolocBase{
    
    constructor(){
        super();
    }

    async getCurrentLatitude() : Promise<number> {
        return new Promise<number>(async function(resolve){
            var geolocation = new Geolocation();
            let position: Geoposition = await geolocation.getCurrentPosition();
            resolve(position.coords.latitude);
        });
      }
    
      async getCurrentLongitude() : Promise<number>{
        return new Promise<number>(async function(resolve){
            var geolocation = new Geolocation();
            let position: Geoposition = await geolocation.getCurrentPosition();
            resolve(position.coords.longitude);
        });
      }
}