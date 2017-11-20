import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyDetailComponent } from './myAccount/detail.component';
import { UserAccountListComponent } from './userAccounts/user.account.list';
import { ProductDetailComponent } from './product/detail.component';

const routes: Routes = [
    { path: 'myaccount', component: MyDetailComponent },
    { path: 'products', component: ProductDetailComponent },
    { path: 'accounts', component: UserAccountListComponent },
    {
        path: '',
        redirectTo: '/products',
        pathMatch: 'full'
    },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class RoutingModule { }

