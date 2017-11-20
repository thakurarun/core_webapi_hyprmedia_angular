import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppHttpClientInterceptor } from './AppHttpClientInterceptor';
import { CustomUpperCasePipe } from './utility/UpperCase';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProgressLayoutSharedService } from './progressLoader/progress.shared.service';
import { ProgressLoaderComponent } from './progressLoader/progress.loader.component';


@NgModule({
    imports: [CommonModule, HttpClientModule],
    exports: [ProgressLoaderComponent],
    declarations: [
        ProgressLoaderComponent,
        CustomUpperCasePipe],
    providers: [
        ProgressLayoutSharedService,
        AppHttpClientInterceptor,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppHttpClientInterceptor,
            multi: true
        }],
})
export class AppSharedModule {

}
