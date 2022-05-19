import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { ColorObserverDirective } from "../directives/color-observer.directive";

@NgModule({
    declarations: [ColorObserverDirective],
    imports: [HttpClientModule],
    exports: [HttpClientModule, ColorObserverDirective],
})
export class SharedModule { }
