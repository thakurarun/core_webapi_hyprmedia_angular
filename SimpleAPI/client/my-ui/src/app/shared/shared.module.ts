import { NgModule } from '@angular/core';

import { ProgressLoaderComponent } from './progress.bar/progress.loader.component';
import { CommonModule } from '@angular/common';
import { ProgressLayoutSharedService } from './progress.bar/progress.shared.service';
import { AppHttpClientInterceptor } from './AppHttpClientInterceptor';
import { CustomUpperCasePipe } from './utility/UpperCase';

@NgModule({
    imports: [CommonModule],
    exports: [ProgressLoaderComponent],
    declarations: [ProgressLoaderComponent,
        CustomUpperCasePipe],
    providers: [ProgressLayoutSharedService, AppHttpClientInterceptor],
})
export class AppSharedModule {

}
