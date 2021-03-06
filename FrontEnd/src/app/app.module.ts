import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { DetailPage} from "../pages/details/details";
import { ParametresPage} from "../pages/parametres/parametres";
import {MapPage } from "../pages/map/map";


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import {File} from '@ionic-native/file';
import { Geolocation } from '@ionic-native/geolocation';
import { GeolocationMock } from '@ionic-native-mocks/geolocation';
import { Network } from '@ionic-native/network';

@NgModule({

  declarations: [
    MyApp,
    DetailPage,
    ParametresPage,

    MapPage
  ],
  imports: [
    BrowserModule,

   HttpModule ,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBrMEy5NMMtpkzikLomfoh-jj8zxH-hae0'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DetailPage,
    ParametresPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: Geolocation, useClass: GeolocationMock }
  ]
})
export class AppModule {}
