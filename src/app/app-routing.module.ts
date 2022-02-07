import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { HomePageComponent } from './components/blog-page/home-page/home-page.component';

const routes: Routes = [
  { path: '', component: BlogPageComponent, children: [
    { path: '', pathMatch: 'full', component: HomePageComponent },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
