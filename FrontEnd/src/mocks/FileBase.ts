/**
 * Classe de mock pour l'accès aux fichiers du téléphone
 */
export class FileBase {
   static settingsMock : any = {
    "wifi" : true,
    "mobile" : false,
    "bande_passante_minimale": 5,
    "rayon_recherche": 0.5,
    "afficher_zones" : true,
    "collecte_auto":true,
    "frequence":0.25,
    "nb_jours":7
  };
  constructor(){
  }
   async readAsText() : Promise<string>{
    return new Promise<string>((resolve, reject) => {
      resolve(JSON.stringify(FileBase.settingsMock));
    })
  }

   async writeExistingFile(text: string | Blob): Promise<void>{
    return new Promise<void>((resolve, reject) => {
      FileBase.settingsMock = JSON.parse(text.toString());
      resolve();
    })
  }
}

