import { FileBase } from "../mocks/FileBase";
import { GeolocBase } from "../mocks/GeolocBase";
import { ServiceProvider } from "./ServiceProvider";
import { AndroidConfigFile } from "../fs/AndroidConfigFile";
import { GeolocAndroid } from "../geoloc/GeolocAndroid";

/**
 * Gestionnaire de l'accès aux objets d'accès aux données mobiles
 */

export class AndroidServiceProvider extends ServiceProvider {
    constructor(){ super(); }

    /** Configuration d'accès aux fichiers internes */
    getFileAccessObject() : FileBase {
        return new AndroidConfigFile();
    }
    
    /** Configuration d'accès à la géolocalisation */
    getGeolocationObject() : GeolocBase {
        return new GeolocAndroid();
    };

}