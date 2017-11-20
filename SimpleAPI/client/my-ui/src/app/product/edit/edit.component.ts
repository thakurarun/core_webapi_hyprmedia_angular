import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from './../product.service';
import { IProductDTO } from './../product.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductDetailComponent } from '../detail.component';
import { ViewFlags } from '@angular/core/src/view';

@Component({
    selector: 'app-edit-product',
    templateUrl: 'edit.html'
})

export class EditProductComponent implements OnInit {

    @Input() product: IProductDTO;

    @Output() onCancel: EventEmitter<boolean> = new EventEmitter();

    @Output() onSuccessSave: EventEmitter<boolean> = new EventEmitter();

    editProductForm: FormGroup;
    editMode = false;
    categories: string[] = ['Automatic', 'Manual'];

    constructor(private productService: ProductService, private fb: FormBuilder) { }

    ngOnInit() {
        this.editMode = !this.product.links.some(link => link.rel === 'add');
        this.createEditForm();
    }

    createEditForm() {
        this.editProductForm = this.fb.group({
            name: [this.product.data.name,
            Validators.compose([
                Validators.required,
                Validators.maxLength(20),
                Validators.minLength(3)]
            )],
            price: [this.product.data.price, Validators.compose([
                Validators.required,
                Validators.max(200),
                Validators.min(0.01)])],
            category: [this.product.data.category]
        });
    }
    get name() { return this.editProductForm.get('name'); }

    get price() { return this.editProductForm.get('price'); }

    cancelEdit() {
        this.onCancel.emit(false);
    }

    saveChanges() {
        this.product.data.name = this.editProductForm.value['name'].toUpperCase().trim();
        this.product.data.price = this.editProductForm.value['price'];
        this.product.data.category = this.editProductForm.value['category'];
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
