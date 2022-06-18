import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { HomePageComponent } from './components/blog-page/home-page/home-page.component';
import { ArticlePageComponent } from './components/blog-page/article-page/article-page.component';

const routes: Routes = [
  {
    path: '', component: BlogPageComponent, children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '', component: HomePageComponent },
      { path: 'post/:id', component: ArticlePageComponent }
    ],
  },
  { path: 'admin', loadChildren: () => import('./modules/admin.module').then(module => module.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
