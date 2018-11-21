import { GeolocBase } from "../mocks/GeolocBase";
import { Geolocation } from '@ionic-native/geolocation';
import { Geoposition } from '@ionic-native/geolocation';
import { MapPage } from "../pages/map/map";

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

      async displayCurrentLocation(mapPage : MapPage, x:number, y:number){
            if(mapPage.currentUserMarker != null){
                  mapPage.currentUserMarker.close();
                  mapPage.currentUserMarker = null;
              }
            let latLng = new google.maps.LatLng(x, y);
            let infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow();
            infoWindow.setPosition(latLng);
            infoWindow.setContent('Vous êtes ici !');
            infoWindow.open(mapPage.map); 
            mapPage.currentUserMarker = infoWindow;
      }     
      /**
       * Tracking des déplacements utilisateur
       * @param mapPage 
       */
      async setOnLocationChangedListener(mapPage:MapPage){
          new Geolocation().watchPosition().subscribe(async (position) => {
            await this.displayCurrentLocation(mapPage, position.coords.latitude, position.coords.longitude);
          }, (err) => {
            console.log(err);
          });
    }


}