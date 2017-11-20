import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductListComponent } from './list/product.list.component';
import { EditProductComponent } from './edit/edit.product.component';
import { ProductDetailComponent } from './product.detail.component';
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
