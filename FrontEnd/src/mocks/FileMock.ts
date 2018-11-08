/**
 * Classe de mock pour l'accès aux fichiers du téléphone
 */
export class FileMock {
  settingsMock : any = {
    "wifi" : true,
    "mobile" : false,
    "bande_passante_minimale": 5,
    "rayon_recherche": 0.5
  };
  constructor(){
  }
  readAsText(fileName){
    return new Promise<string>((resolve, reject) => {
      resolve(JSON.stringify(this.settingsMock));
    })
  }

  writeExistingFile(path: string, fileName: string, text: string | Blob): Promise<void>{
    return new Promise<void>((resolve, reject) => {
      this.settingsMock = JSON.parse(text.toString());
      resolve();
    })
  }
}

