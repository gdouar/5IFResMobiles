/*import {PointOfInterest} from "../model/PointOfInterest.model";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import { Report} from "../model/Report.model";
import {UserExtended} from "../model/userExtended.model";
import 'rxjs/Rx'
import {TemporaryPointOfInterest} from "../model/TemporaryPointOfInterest.model";
import {User} from "../model/user.model";
import {toPromise} from "rxjs/operator/toPromise";
import {Validation} from "../model/Validation.model";
import {Category} from "../model/Category.model";

@Injectable()
export class POIService {

  constructor(protected http:HttpClient) {
  }

  getPOI(token: string): Promise<Array<PointOfInterest>> {
    return this.http.get('http://localhost:8080/poi/allValid', {headers: new HttpHeaders({Authorization : 'Basic '+token})})
        .toPromise()
        .then(data => {
            return data as Array<PointOfInterest>;
        });
  }

  getUserValidatedPoi(param:string,token:string): Promise<Array<PointOfInterest>> {
    return this.http.get(param, {headers: new HttpHeaders({Authorization : 'Basic '+token})})
      .toPromise()
      .then(data => {
        return data as Array<PointOfInterest>;
      });
  }

  addPoint(params:string,poi:PointOfInterest, token : string){
    this.http.post(params, poi, {headers: new HttpHeaders({Authorization : 'Basic '+token})}).toPromise();
  }

  addPointTempo(params:string,poi:TemporaryPointOfInterest, token: string){
    this.http.post(params, poi, {headers: new HttpHeaders({Authorization : 'Basic '+token})}).toPromise();
  }

  getNumberSubPoint(params:string,token:string):Promise<number>{
    return this.http.get(params, {headers: new HttpHeaders({Authorization : 'Basic '+token})})
      .toPromise()
      .then(data => {
        return data as number;
      });
  }
  getNumberValPoint(params:string,token:string):Promise<number>{
    return this.http.get(params, {headers: new HttpHeaders({Authorization : 'Basic '+token})})
      .toPromise()
      .then(data => {
        return data as number;
      });
  }
  getNextPointToValidate(){
    //todo
     return this.http.get("todo");
  }

  getPointToValidate(token: string,  user: User) : Promise<PointOfInterest> { //pour vérifier s'il reste un point à valider ou non
    return this.http.get('http://localhost:8080/poi/getPointToValidate?email='+user.email, {headers: new HttpHeaders({Authorization : 'Basic '+token})})
      .toPromise()
      .then ( data =>  {
      return data as PointOfInterest;
    });
  }

  vote(token : string, validation : Validation){
    this.http.post("http://localhost:8080/poi/voteForPoi",validation , {headers: new HttpHeaders({Authorization : 'Basic '+token})})
      .subscribe();
  }

  reportBack(params:string,rep:Report,token :string){
    this.http.post(params, rep, {headers: new HttpHeaders({Authorization : 'Basic '+token})}).toPromise();
  }

  getAllCategory(token: string) : Promise<Array<Category>>{
    return this.http.get("http://localhost:8080/category/all", {headers: new HttpHeaders({Authorization: 'Basic ' + token})})
      .toPromise()
      .then(data => {
        return data as Array<Category>;
      });
  }

  getPOICategorie(token : string, categories : Array<String>){
    var query : string="nameCategories=";
    for(let c of categories){
      query+=c.valueOf()+",";
    }
    query=query.slice(0,-1);
    console.log(query);
    return this.http.get("http://localhost:8080/poi/getFilterPoints?"+query, {headers: new HttpHeaders({Authorization: 'Basic ' + token})})
      .toPromise()
      .then(data => {
        return data as Array<PointOfInterest>;
      });
  }

  getPOIRequete(token: string, q: string){
    return this.http.get("http://localhost:8080/poi/getSearchedPoints?name="+q, {headers: new HttpHeaders({Authorization: 'Basic ' + token})})
      .toPromise()
      .then(data => {
        return data as Array<PointOfInterest>;
      });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred during the authentication, please check your email/password'); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
*/
