/**
 * Gestion des services de base d'accès aux données du front-end
 */
import * as request  from "request";
import * as conf from '../conf/ConfConstants';
import { Mesure } from "../model/Mesure.model";

export class MeasureService {
  constructor(){}

  /**
   * Récupération données de la carte
   * @param parameters les paramètres de l'application
   * @param longitude la longitude actuelle
   * @param latitude la latitude actuelle
   */
  async sendMeasure(mesure : Mesure, ssid, ip, type){
    var measureCreateURL = conf.ConfConstants.BACKEND_URL + conf.ConfConstants.CREATE_MEASURE_URL;
    try{
      console.log("connecting to " + measureCreateURL);
      var postData = {
            'ssid' : ssid,
            'ip' : ip, 
            'type' : type,
            'bande_passante' : mesure.bandePassante,
            'force' : mesure.force,
            'lat' : mesure.lat,
            'lon' : mesure.lon
      };
      return await httpJsonRequest(postData, measureCreateURL, "POST")
  }
  catch(ex){
    console.log("ERROR sending measure data : " + ex)
    return null;
  }
}
}

/**
 * Requête JSON vers le backend
 * @param jsonData les paramètres de requêtes 
 * @param url l'URL du backend
 * TODO refactor
 */
async function httpJsonRequest(jsonData, url, endpointMethod){
  return new Promise(function (resolve, reject) {
    request.post(url, {
      method:endpointMethod,
      body: JSON.stringify(jsonData),
      headers: {
          'Content-Type': 'application/json',
          'Content-Length': JSON.stringify(jsonData).length,
      },
  },   
  function (error, response, body) {
    console.log("finished")
    if (error) {
      console.error('createMeasure failed:', error);
      reject(null);
    }
    resolve(JSON.parse(body));
  });
  });
}