import { NgModule } from '@angular/core' ;
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { SharedModule } from './shared/shared.module';
import { AppealModule } from './appeal/appeal.module';
import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppealModule,
    routing,
    SharedModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent],
})
export class AppModule{}
