import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProductDTO } from './productModel';

@Component({
    selector: 'app-product-detail',
    templateUrl: 'product.detail.html'
})
export class ProductDetailComponent {
    selectedProduct: IProductDTO;
    editMode: Boolean = false;

    onProductSelection(selectedProduct: IProductDTO) {
        this.editMode = true;
        this.selectedProduct = selectedProduct;
    }

    onCancelEdit(isEdit: Boolean) {
        this.editMode = isEdit;
    }

}
