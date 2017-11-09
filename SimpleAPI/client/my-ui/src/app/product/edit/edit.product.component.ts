import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from './../product.service';
import { IProductDTO } from './../productModel';

@Component({
    selector: 'app-edit-product',
    templateUrl: 'edit.product.html'
})

export class EditProductComponent implements OnInit {

    @Input()
    product: IProductDTO;

    @Output()
    onCancel: EventEmitter<Boolean> = new EventEmitter<Boolean>();

    @Output()
    onSuccessSave: EventEmitter<boolean> = new EventEmitter();

    categories: string[] = ['Automatic', 'Manual'];

    constructor(private productService: ProductService) { }

    ngOnInit() { }

    cancelEdit() {
        this.onCancel.emit(false);
    }

    saveChanges() {
        this.productService
            .saveProduct(this.product)
            .subscribe(response => {
                if (response) {
                    // reload product list
                    this.onSuccessSave.emit(true);
                }
            });
        // this.onSaveProduct.emit(this.product);
    }
}
