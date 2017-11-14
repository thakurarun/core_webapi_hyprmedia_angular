import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductDetailComponent } from './product/product.detail.component';

import { ProductListComponent } from './product/list/product.list.component';
import { EditProductComponent } from './product/edit/edit.product.component';
import { ProductService } from './product/product.service';
import { ProgressLoaderComponent } from './common/progress.loader.component';
import { AppHttpClientInterceptor } from './AppHttpClientInterceptor';
@NgModule({
  declarations: [
    AppComponent,
    ProductDetailComponent,
    ProductListComponent,
    EditProductComponent,
    ProgressLoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpClientInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
