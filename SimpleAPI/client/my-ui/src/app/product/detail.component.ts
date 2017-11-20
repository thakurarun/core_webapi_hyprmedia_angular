import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { IProductDTO } from './product.model';
import { ProductListComponent } from './list/list.component';

@Component({
    selector: 'app-product-detail',
    templateUrl: 'detail.html'
})
export class ProductDetailComponent {
    selectedProduct: IProductDTO;
    editMode = false;
    @ViewChild(ProductListComponent) child: ProductListComponent;

    onProductSelection(selectedProduct: IProductDTO) {
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
