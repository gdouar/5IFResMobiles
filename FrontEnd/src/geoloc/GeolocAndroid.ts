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

      /**
       * Tracking des déplacements utilisateur
       * @param mapPage 
       */
      async setOnLocationChangedListener(mapPage:MapPage){
          new Geolocation().watchPosition().subscribe((position) => {
              if(mapPage.currentUserMarker != null){
                  mapPage.currentUserMarker.setMap(null);
              }
            var x = position.coords.longitude;
            var y = position.coords.latitude;
          
            let latLng = new google.maps.LatLng(x, y);
          
            let currentMarker = new google.maps.Marker({
              map: mapPage.map,
              position: latLng,
              icon:{
                url: 'http://bluedot.ca/wp-content/themes/dsf-blue-dot-campaign-theme/src/images/marker-circle.png',
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(20, 32),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
              }
            });
            mapPage.currentUserMarker = currentMarker;
          
          }, (err) => {
            console.log(err);
          });
    }


}