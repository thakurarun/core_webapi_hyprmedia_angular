import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyDetailComponent } from './myAccount/detail.component';
import { ProductListComponent } from './product/list/product.list.component';
import { UserAccountListComponent } from './userAccounts/user.account.list';

const routes: Routes = [
    { path: 'myaccount', component: MyDetailComponent },
    { path: 'products', component: ProductListComponent },
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

export const routedComponents = [MyDetailComponent];
