import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProgressLoaderComponent } from './progress.bar/progress.loader.component';
import { CommonModule } from '@angular/common';
import { ProgressLayoutSharedService } from './progress.bar/progress.shared.service';
import { AppHttpClientInterceptor } from './AppHttpClientInterceptor';
import { CustomUpperCasePipe } from './utility/UpperCase';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


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
