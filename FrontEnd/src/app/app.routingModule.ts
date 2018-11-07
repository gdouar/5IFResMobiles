import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import{DetailPage} from "../pages/details/details";
import {ParametresPage} from "../pages/parametres/parametres";
import {MapPage} from "../pages/map/map"




const appRoutes: Routes = [
  {path:'page-details',component:DetailPage},
  {path:'page-parametres',component:ParametresPage},
  {path:'page-map',component:MapPage},

  {path:'',redirectTo: '/page-map', pathMatch: 'full'}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})],
})
export class AppRoutingModule {}
