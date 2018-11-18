import { FileBase } from "../mocks/FileBase";
/**
 * Classe d'accès au fichier de configuration sur le téléphone
 */
declare var cordova: any;

export class AndroidConfigFile extends FileBase {
    constructor(){
        super();
        console.log("object created");
    }
    /**Ecriture dans le fichier de configuration */
    async writeExistingFile(text: string | Blob): Promise<void>{
      return new Promise<void>((resolve, reject) => {
        var localWindow = <any> window;
        localWindow.requestFileSystem(localWindow.PERSISTENT, 0, function (fs) {
          fs.root.getFile("connectme.json", {create: false, exclusive: false}, function(fileEntry) {
            console.log("connectme.json exists.");
            console.log(fileEntry);
            fileEntry.createWriter(function (fileWriter) {
              fileWriter.onwriteend = function() {
                console.log("Successful file write...");
                resolve();
              }
              fileWriter.onerror = function (e) {
                console.log("Failed file write: " + e.toString());
                reject(null);
            };
            fileWriter.write((text));
            });
          }, function(err){
            console.log('getFile() failed !')
            console.log(err);
            reject(null);
          }), 
          function(err) {
            console.log("error accessing file system!")
            console.log(err);
            reject(null);
          }});
    });
  }
    /**
     *  Obtention des paramètres de l'application et création du fichier de configuration s'il n'existe pas
     */
    async readAsText() : Promise<string>{
      var that = this;
      return new Promise<string>((resolve, reject) => {
        console.log(cordova);
        var localWindow = <any> window;
        localWindow.requestFileSystem(localWindow.PERSISTENT, 0, function (fs) {
          console.log('file system open: ' + fs.name);
          fs.root.getFile("connectme.json", { create: false }, function(fileEntry){
            console.log("file EXISTS !")
            fileEntry.file(function (file) {
              var reader = new FileReader();
              reader.onloadend = function() {
                  console.log("Successful file read: ");
                  console.log(this.result);
                  resolve(this.result.toString());
              };
              reader.readAsText(file);
          }, function(){
            fs.root.getFile("connectme.json", {create: true, exclusive: false}, function(fileEntry) {
              console.log("file DOES NOT EXIST !")
              console.log("successfully created connectme.json");
              console.log(fileEntry);
              fileEntry.createWriter(function (fileWriter) {
                fileWriter.onwriteend = function() {
                  console.log("Successful file write...");
                  fileEntry.file(function (file) {
                    var reader = new FileReader();
                    reader.onloadend = function() {
                        console.log("Successful file read: ");
                        console.log(this.result);
                        resolve(this.result.toString());
                    };
                    reader.readAsText(file);
                }, function(e){console.log("failed to read file : " + e); reject(null);});
                };
                fileWriter.onerror = function (e) {
                    console.log("Failed file write: " + e.toString());
                    reject(null);
                };
                fileWriter.write(JSON.stringify(FileBase.settingsMock));
              });
          });
       //     this.writeFile(fileEntry, null, isAppend);
        }, function(err){
          console.log('getFile() failed !')
          console.log(err);
          reject(null);
        });
      }, function(err) {
          console.log("error accessing file system!")
          console.log(err);
          reject(null);
        });
      });
    });
  }
}
  
  