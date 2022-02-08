import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { HomePageComponent } from './components/blog-page/home-page/home-page.component';
import { PostPageComponent } from './components/blog-page/post-page/post-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

const routes: Routes = [
  { path: '', component: BlogPageComponent, children: [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '', component: HomePageComponent },
    { path: 'post/:id', component: PostPageComponent }
  ],
  },
  { path: 'admin', loadChildren: () => import('./modules/admin.module').then(module => module.AdminModule) },
  { path: 'login', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
