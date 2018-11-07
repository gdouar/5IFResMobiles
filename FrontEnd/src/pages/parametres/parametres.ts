import { Component } from '@angular/core';



@Component({
  selector: 'page-parametres',
  templateUrl: 'parametres.html',
})
export class ParametresPage {
  bandePassante : number = 0;
  freqEchantillon : number = 0;
  distanceRecherche :number = 0;
  constructor() {

  }

}

