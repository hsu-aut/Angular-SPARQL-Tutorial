import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProcessReviewComponent } from './processReview/processReview.component';
import { Bootstrap_HTML_TemplatesComponent } from './bootstrap_HTML_Templates/bootstrap_HTML_Templates.component';

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      ProcessReviewComponent,
      Bootstrap_HTML_TemplatesComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
