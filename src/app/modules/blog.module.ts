import { NgModule } from '@angular/core';
import { BlogPageComponent } from '../components/blog-page/blog-page.component';
import { HomePageComponent } from '../components/blog-page/home-page/home-page.component';
import { PostPageComponent } from '../components/blog-page/post-page/post-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared.module';
import { BlogService } from '../services/blog.service';

@NgModule({
  declarations: [
    BlogPageComponent,
    HomePageComponent,
    PostPageComponent,
  ],
  imports: [
    RouterModule,
    SharedModule,
  ],
  providers: [BlogService],
})
export class BlogModule { }
