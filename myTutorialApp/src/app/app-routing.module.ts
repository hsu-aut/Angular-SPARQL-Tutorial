import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { HomeComponent } from './home/home.component';
import { ProcessReviewComponent } from './processReview/processReview.component';
import { Bootstrap_HTML_TemplatesComponent } from './bootstrap_HTML_Templates/bootstrap_HTML_Templates.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'process', component: ProcessReviewComponent },
  { path: 'bootstrapTemplates', component: Bootstrap_HTML_TemplatesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
