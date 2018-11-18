/**
 * Statistiques utilitaires
 */
import {Mesure} from "../model/Mesure.model";
var calculateConvexHull = require('geo-convex-hull')


export class MathUtil{
    /**
     * Retourne la moyenne d'une zone de plusieurs mesures
     * @param mesures les mesures de la zone
     */
    static moyenneBandePassanteZone(mesures: Array<Mesure> ){
        let moyenne : number= 0;
        for(var i in mesures){
            let mesure: Mesure = mesures[i];
            moyenne += mesure.bandePassante;
        }
        return moyenne / mesures.length;
    }

    /**
     * Retourne l'enveloppe convexe de la zone pour la constuction d'un polygone
     * @param mesures 
     */
    static getEnveloppeConvexe(mesures: Array<Mesure>) {
        let points : Array<any> = mesures.map(m => <any>{latitude : m.lat, longitude: m.lon, id:m.id});
        var boundaryPoints : Array<any> = calculateConvexHull(points);
        console.log(boundaryPoints)
        return mesures.filter( m => MathUtil.findWithAttr(boundaryPoints, 'id', m.id) != -1 );
    }
    private static findWithAttr(array, attr, value) {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Retourne le centroid d'un polygone de mesures
     * @param mesures les mesures
     */
    static getMeasuresPolygonCentroid(mesures : Array<Mesure>){
        var maxX = Math.max.apply(Math, mesures.map(function(o) { return o.lat; }));
        var minX =  Math.min.apply(Math, mesures.map(function(o) { return o.lat; }));
        var maxY =  Math.max.apply(Math, mesures.map(function(o) { return o.lon; }));
        var minY =  Math.max.apply(Math, mesures.map(function(o) { return o.lon; }));
        return {
            x : minX + ((maxX - minX) / 2),
            y : minY + ((maxY - minY) / 2)
        };
    }
    /**
     * Retourne l'angle entre deux points 
     * @param lat1 
     * @param long1 
     * @param lat2 
     * @param long2 
     */
    static angleFromCoordinate( lat1,  long1,  lat2,  long2) {
        var dLon = (long2 - long1);
        var y = Math.sin(dLon) * Math.cos(lat2);
        var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1)
                * Math.cos(lat2) * Math.cos(dLon);
        var brng = Math.atan2(y, x);
        brng = (brng)* (180/Math.PI);
        brng = (brng + 360) % 360;
        brng = 360 - brng; // count degrees counter-clockwise - remove to make clockwise
        return brng;
    }

}