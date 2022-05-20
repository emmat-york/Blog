import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { ColorObserverDirective } from "../directives/color-observer.directive";
import { FormsModule } from "@angular/forms";
import { PostSearchPipe } from "../pipes/post-search.pipe";

@NgModule({
    declarations: [ColorObserverDirective, PostSearchPipe],
    imports: [HttpClientModule, FormsModule],
    exports: [HttpClientModule, ColorObserverDirective, FormsModule, PostSearchPipe],
})
export class SharedModule { }
