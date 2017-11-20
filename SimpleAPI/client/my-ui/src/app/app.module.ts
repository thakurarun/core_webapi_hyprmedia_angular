import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

/* Feature Modules */
import { AppSharedModule } from './shared/shared.module';
import { MyAccountModule } from './myAccount/myAccountModule';
import { UserAccountsModule } from './userAccounts/user.account.module';
import { ProductModule } from './product/product.module';

/* Routing Module */
import { RoutingModule } from './app.route.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    AppSharedModule,
    ProductModule,
    MyAccountModule,
    UserAccountsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
