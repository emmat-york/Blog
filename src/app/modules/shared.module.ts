import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { ColorObserverDirective } from "../directives/color-observer.directive";
import { FormsModule } from "@angular/forms";
import { ArticleSearchPipe } from "../pipes/post-search.pipe";

@NgModule({
    declarations: [ColorObserverDirective, ArticleSearchPipe],
    imports: [HttpClientModule, FormsModule],
    exports: [HttpClientModule, ColorObserverDirective, FormsModule, ArticleSearchPipe],
})
export class SharedModule { }
