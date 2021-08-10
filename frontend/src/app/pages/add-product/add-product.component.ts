import {Component, OnInit} from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../_services/product.service";
import {NavigationService} from "../../_services/navigation.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  createProductForm: FormGroup;
  private fileList = [];
  constructor(private formBuilder: FormBuilder, private productService: ProductService, private navigateService: NavigationService) {
    this.createProductForm = formBuilder.group({
      "productTitle": ["", [Validators.required]],
      "productDescription": ["", [Validators.required]],
      "productPrice": ["", [Validators.required]],
      "productTags": ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push({name: value});
    }
    event.chipInput!.clear();
  }

  remove(fruit): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  changeFileList(event) {
    this.fileList = event;
    debugger;
  }

  submit() {
    if (!this.createProductForm.valid) {
      return;
    }
    const productData = {
      title: this.createProductForm.value.productTitle,
      status: 'ACTIVE',
      price: this.createProductForm.value.productPrice,
      tags: this.tags,
      style: '',
      color: '',
      images: this.fileList
    }
    this.productService.productCreate(productData).subscribe((res) => {
      if (res) {
        this.navigateService.goToLKHomePage();
      }
    })
  }

}
