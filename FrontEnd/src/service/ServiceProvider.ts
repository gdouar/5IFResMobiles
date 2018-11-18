import { FileBase } from "../mocks/FileBase";
import { GeolocBase } from "../mocks/GeolocBase";

/**
 * Gestionnaire de l'accès aux objets de mock ou d'accès aux données mobiles
 */

export abstract class ServiceProvider {
    constructor(){}

    /** Configuration d'accès aux fichiers internes */
    abstract getFileAccessObject() : FileBase;
    /** Configuration d'accès à la géolocalisation */
    abstract getGeolocationObject() : GeolocBase;

}