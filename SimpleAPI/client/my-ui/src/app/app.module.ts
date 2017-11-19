import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppSharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { ProductDetailComponent } from './product/product.detail.component';

import { ProductListComponent } from './product/list/product.list.component';
import { EditProductComponent } from './product/edit/edit.product.component';
import { ProductService } from './product/product.service';
import { AppHttpClientInterceptor } from './shared/AppHttpClientInterceptor';
import { MyAccountModule } from './myAccount/myAccountModule';
import { RoutingModule } from './app.route.module';
import { UserAccountsModule } from './userAccounts/user.account.module';
@NgModule({
  declarations: [
    AppComponent,
    ProductDetailComponent,
    ProductListComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppSharedModule,
    MyAccountModule,
    UserAccountsModule,
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
