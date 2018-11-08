/**
 * Gestion des services de lecture/écriture sur un fichier JSON
 */
import { File } from '@ionic-native/file';

export class JSONFileAccess {
  constructor(){}

 /**
  * Lecture du contenu d'un fichier JSON
  * @param file le chemin d'accès au fichier
  */ 
  async readFile(file : File | any) {
    return new Promise(function (resolve, reject) {
      file.readAsText(file.applicationDirectory + "www/assets", "settings.json").then((value) => {
        resolve(JSON.parse(value));
      })
    });
  }

  /**
   * Ecriture des paramètres
   * @param file le fichier JSON 
   * @param settings les nouveaux paramètres
   */
  async writeFile(file : File, settings : any){
    return new Promise(function (resolve, reject) {
      file.readAsText(file.applicationDirectory + "www/assets", "settings.json").then((value) => {
        resolve(JSON.parse(value));
      })
    });
  }

}