import { NgModule } from '@angular/core';
import { BlogPageComponent } from '../components/blog-page/blog-page.component';
import { HomePageComponent } from '../components/blog-page/home-page/home-page.component';
import { ArticlePageComponent } from '../components/blog-page/article-page/article-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared.module';
import { ArticlePhotoModalComponent } from '../components/blog-page/article-page/article-photo-modal/article-photo-modal.component';

@NgModule({
  declarations: [
    BlogPageComponent,
    HomePageComponent,
    ArticlePageComponent,
    ArticlePhotoModalComponent,
  ],
  imports: [
    RouterModule,
    SharedModule,
  ],
  entryComponents: [ArticlePhotoModalComponent],
})
export class BlogModule { }
