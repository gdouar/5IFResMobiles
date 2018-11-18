import { FileBase } from "../mocks/FileBase";
import { GeolocBase } from "../mocks/GeolocBase";
import { ServiceProvider } from "./ServiceProvider";

/**
 * Gestionnaire de l'accès aux objets de mock 
 */

export class MockServiceProvider extends ServiceProvider {
    constructor(){ super(); }

    /** Configuration d'accès aux fichiers internes */
    getFileAccessObject() : FileBase {
        return new FileBase();
    }

    /** Configuration d'accès à la géolocalisation */
    getGeolocationObject() : GeolocBase {
        return new GeolocBase();
    };

}