import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { ColorObserverDirective } from "../directives/color-observer.directive";
import { FormsModule } from "@angular/forms";
import { ArticleSearchPipe } from "../pipes/article-search.pipe";
import { PostComponent } from "../components/blog-page/post-page/post/post.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        ColorObserverDirective,
        ArticleSearchPipe,
        PostComponent
    ],
    imports: [
        HttpClientModule,
        FormsModule,
        CommonModule,
    ],
    exports: [
        HttpClientModule,
        ColorObserverDirective,
        FormsModule,
        ArticleSearchPipe,
        PostComponent,
        CommonModule,
    ],
})
export class SharedModule { }
