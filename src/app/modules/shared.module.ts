import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { ColorObserverDirective } from "../directives/color-observer.directive";
import { FormsModule } from "@angular/forms";
import { ArticleSearchPipe } from "../pipes/article-search.pipe";
import { PostComponent } from "../components/shared/post/post.component";
import { CommonModule } from "@angular/common";
import { ScrollButtonComponent } from "../components/shared/scroll-button/scroll-button.component";
import { LoaderComponent } from "../components/shared/loader/loader.component";

@NgModule({
    declarations: [
        PostComponent,
        ScrollButtonComponent,
        LoaderComponent,
        ColorObserverDirective,
        ArticleSearchPipe,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        PostComponent,
        ScrollButtonComponent,
        LoaderComponent,
        ColorObserverDirective,
        ArticleSearchPipe,
    ],
})
export class SharedModule { }
