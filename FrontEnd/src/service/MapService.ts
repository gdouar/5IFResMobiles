/**
 * Gestion des services de base d'accès aux données du front-end
 */
import * as request  from "request";
import { ConfConstants } from '../conf/ConfConstants';

export class MapService {
  constructor(){}

  /**
   * Récupération données de la carte
   * @param parameters les paramètres de l'application
   * @param longitude la longitude actuelle
   * @param latitude la latitude actuelle
   */
  async getMapDatas(parameters, latitude, longitude){
    var mapDatasUrl = ConfConstants.BACKEND_URL + ConfConstants.MAPDATAS_URL;
    try{
      console.log("connecting to " + mapDatasUrl);
      var result = null;
      var postData = {
        "parametres" : parameters,
        "longitudeActuelle" : longitude,
        "latitudeActuelle" : latitude
      };
      return await httpJsonRequest(postData, mapDatasUrl, "POST")
  }
  catch(ex){
    console.log("ERROR getting map data : " + ex)
    return null;
  }
}
}

/**
 * Requête JSON vers le backend
 * @param jsonData les paramètres de requêtes 
 * @param url l'URL du backend
 */
async function httpJsonRequest(jsonData, url, endpointMethod){
  return new Promise(function (resolve, reject) {
    request.post(url, {
      method:endpointMethod,
      form: JSON.stringify(jsonData),
      headers: {
          'Content-Type': 'application/json',
          'Content-Length': JSON.stringify(jsonData).length,
      },
  },   
  function (error, response, body) {
    console.log("finished")
    if (error) {
      console.error('getMap failed:', error);
      reject(null);
    }
    resolve(JSON.parse(body));
  });
  });
}