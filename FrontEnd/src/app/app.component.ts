import { Component, ViewChild  } from '@angular/core';
import {  Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import {ParametresPage} from "../pages/parametres/parametres";
import {MapPage} from "../pages/map/map";

import { NavController } from 'ionic-angular';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: NavController;
  rootPage: any = MapPage;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
   // this.nav.push(this.rootPage);
  }
  ngOnInit() {
    // Let's navigate from TabsPage to Page1
    this.nav.push(this.rootPage);
  }




  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  navigateToParam(){

    this.nav.push(ParametresPage);
  }

}
