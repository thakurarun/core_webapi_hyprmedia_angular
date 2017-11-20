import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductListComponent } from './list/list.component';
import { EditProductComponent } from './edit/edit.component';
import { ProductDetailComponent } from './detail.component';
import { ProductService } from './product.service';


@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [
        ProductDetailComponent
    ],
    declarations: [
        ProductListComponent,
        ProductDetailComponent,
        EditProductComponent],
    providers: [
        ProductService
    ],
})
export class ProductModule {


}
