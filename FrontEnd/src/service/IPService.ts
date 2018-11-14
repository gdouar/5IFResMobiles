/**
 * Gestion des services de base d'accès aux données du front-end
 */
import * as request  from "request";
import * as conf from '../conf/ConfConstants';

export class IPService {
  constructor(){}

  /**
   * Récupération données de la carte
   * @param parameters les paramètres de l'application
   * @param longitude la longitude actuelle
   * @param latitude la latitude actuelle
   */
  async getMyIp(){
    var mapDatasUrl = conf.ConfConstants.BACKEND_URL + conf.ConfConstants.MY_IP_URL;
    try{
      console.log("connecting to " + mapDatasUrl);
      var postData = {};
      return await httpJsonRequest(postData, mapDatasUrl, "GET")
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
      console.error('getIP failed:', error);
      reject(null);
    }
    resolve(JSON.parse(body));
  });
  });
}