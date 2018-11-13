/**
 * Classe de mock pour l'accès aux fichiers du téléphone
 */
export class FileMock {
  static settingsMock : any = {
    "wifi" : true,
    "mobile" : false,
    "bande_passante_minimale": 5,
    "rayon_recherche": 0.5,
    "afficher_zones" : true,
    "collecte_auto":true,
    "frequence":10
  };
  constructor(){
  }
  static async readAsText(fileName){
    return new Promise<string>((resolve, reject) => {
      resolve(JSON.stringify(this.settingsMock));
    })
  }

  static async writeExistingFile(path: string, fileName: string, text: string | Blob): Promise<void>{
    return new Promise<void>((resolve, reject) => {
      this.settingsMock = JSON.parse(text.toString());
      resolve();
    })
  }
}

