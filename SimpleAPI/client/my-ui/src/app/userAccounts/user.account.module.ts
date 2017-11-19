import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccountListComponent } from './user.account.list';

@NgModule({
    imports: [CommonModule],
    exports: [UserAccountListComponent],
    declarations: [UserAccountListComponent],
    providers: [],
})
export class UserAccountsModule { }
