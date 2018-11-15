import { FileBase } from "../mocks/FileBase";
import {File} from '@ionic-native/file';
import { rejects } from "assert";
import { fsync } from "fs";
/**
 * Classe d'accès au fichier de configuration sur le téléphone
 */
declare var cordova: any;

export class AndroidConfigFile extends FileBase {
    constructor(private file : File){
        super();
        console.log("object created");
    }

    /**
     * Création du fichier de configuration s'il n'existe pas
     */
    async initConfig(){
     // var that = this;
      return new Promise((resolve, reject) => {
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
                  resolve();
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
                        resolve();
                    };
                    reader.readAsText(file);
                }, function(e){console.log("failed to read file : " + e); reject();});
                };
                fileWriter.onerror = function (e) {
                    console.log("Failed file write: " + e.toString());
                    reject();
                };
                fileWriter.write(JSON.stringify(FileBase.settingsMock));
              });
          });
          
       //     this.writeFile(fileEntry, null, isAppend);
             
        }, function(err){
          console.log('getFile() failed !')
          console.log(err);
          reject();
        });
      }, function(err) {
          console.log("error accessing file system!")
          console.log(err);
          reject();
        });
      });
    });
  }
}
  
  