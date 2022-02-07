import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPageComponent } from '../components/blog-page/blog-page.component';
import { HomePageComponent } from '../components/blog-page/home-page/home-page.component';
import { PostPageComponent } from '../components/blog-page/post-page/post-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BlogPageComponent, HomePageComponent, PostPageComponent],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class BlogModule { }

