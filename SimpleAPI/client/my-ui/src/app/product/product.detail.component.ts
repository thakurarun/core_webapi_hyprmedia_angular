import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { IProductDTO } from './productModel';
import { ProductListComponent } from './list/product.list.component';

@Component({
    selector: 'app-product-detail',
    templateUrl: 'product.detail.html'
})
export class ProductDetailComponent {
    selectedProduct: IProductDTO;
    editMode = false;
    @ViewChild(ProductListComponent) child: ProductListComponent;

    onProductSelection(selectedProduct: IProductDTO) {
        console.log(323232);
        this.editMode = true;
        this.selectedProduct = selectedProduct;
    }

    onCancelEdit(isEdit: boolean) {
        this.editMode = isEdit;
    }

    saveProductChanges(product: IProductDTO) {
        this.editMode = false;
        this.child.loadProducts();
    }
}
