import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProductDTO } from './../productModel';
@Component({
    selector: 'app-edit-product',
    templateUrl: 'edit.product.component.html'
})

export class EditProductComponent implements OnInit {

    @Input()
    product: IProductDTO;

    @Output()
    onCancel: EventEmitter<Boolean> = new EventEmitter<Boolean>();

    constructor() { }

    ngOnInit() { }

    cancelEdit() {
        this.onCancel.emit(false);
    }
}
