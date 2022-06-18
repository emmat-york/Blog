import { NgModule } from '@angular/core';
import { BlogPageComponent } from '../components/blog-page/blog-page.component';
import { HomePageComponent } from '../components/blog-page/home-page/home-page.component';
import { ArticlePageComponent } from '../components/blog-page/article-page/article-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    BlogPageComponent,
    HomePageComponent,
    ArticlePageComponent,
  ],
  imports: [
    RouterModule,
    SharedModule,
  ],
})
export class BlogModule { }
