import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { ColorObserverDirective } from "../directives/color-observer.directive";
import { FormsModule } from "@angular/forms";
import { ArticleSearchPipe } from "../pipes/article-search.pipe";
import { PostComponent } from "../components/shared/post/post.component";
import { CommonModule } from "@angular/common";
import { ScrollButtonComponent } from "../components/shared/scroll-button/scroll-button.component";
import { LoaderComponent } from "../components/shared/loader/loader.component";
import { WordsSlicerPipe } from "../pipes/words-slicer.pipe";
import { GlobalFooterComponent } from "../components/shared/global-footer/global-footer.component";
import { AuthButtonComponent } from "../components/shared/auth-button/auth-button.component";

@NgModule({
    declarations: [
        PostComponent,
        ScrollButtonComponent,
        LoaderComponent,
        GlobalFooterComponent,
        AuthButtonComponent,
        ColorObserverDirective,
        ArticleSearchPipe,
        WordsSlicerPipe,
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
        GlobalFooterComponent,
        AuthButtonComponent,
        ColorObserverDirective,
        ArticleSearchPipe,
        WordsSlicerPipe,
    ],
})
export class SharedModule { }
