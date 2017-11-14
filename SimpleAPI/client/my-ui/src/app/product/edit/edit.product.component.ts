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

    editMode = false;
    categories: string[] = ['Automatic', 'Manual'];

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.editMode = !this.product.links.some(link => link.rel === 'add');
    }

    cancelEdit() {
        this.onCancel.emit(false);
    }

    saveChanges() {
        this.productService
            .saveProduct(this.product)
            .subscribe(response => {
                if (response) {
                    this.onSuccessSave.emit(true);
                } else {
                    alert('fail to save');
                }
            });
    }
}
