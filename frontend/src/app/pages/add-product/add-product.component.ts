import {Component, OnInit} from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../_services/product.service";
import {NavigationService} from "../../_services/navigation.service";
import {TuiInputComponent} from "@taiga-ui/kit";
import {MY_FORM_MODEL} from './schemas/ng-schema'

import {
  DynamicCheckboxModel,
  DynamicFormModel, DynamicFormService,
  DynamicInputModel,
  DynamicRadioGroupModel
} from "@ng-dynamic-forms/core";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  createProductForm: FormGroup;
  private fileList = [];
  private uploadFilesList = []
  public schema = schemaObj;
  formModel: DynamicFormModel = MY_FORM_MODEL;
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private formService: DynamicFormService,
              private productService: ProductService, private navigateService: NavigationService,) {
    this.createProductForm = formBuilder.group({
      "productTitle": ["", [Validators.required]],
      "productDescription": ["", [Validators.required]],
      "productPrice": ["", [Validators.required]],
      "productTags": ["", [Validators.required]],
    });
    this.formGroup = this.formService.createFormGroup(this.formModel);
  }

  ngOnInit(): void {
  }
  model = {}
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
    this.productService.pushImages(event).subscribe((res) => {
      this.uploadFilesList.push(res[1]?.url);
    });
  }

  submit(event?) {
    if (!this.createProductForm.valid) {
      return;
    }
    const productData = {
      title: this.createProductForm.value.productTitle,
      status: 'ACTIVE',
      price: this.createProductForm.value.productPrice,
      description: {
        about: this.createProductForm.value.productDescription
      },
      tags: this.tags,
      style: '',
      color: '',
      images: this.uploadFilesList,
    }

    this.productService.productCreate(productData).subscribe((res) => {
      if (res) {
        this.navigateService.goToLKHomePage();
      }
    })
  }

}

const schemaObj = {
  "type": "object",
  "title": "Comment",
  "properties": {
    "name": {
      "title": "Название",
      "type": "string"
    },
    "customTag": {
      "title": "customTag",
      "type": "customTag"
    },
    "size": {
      "title": "Размер",
      "type": "string",
      "enum": [
        "46 (S)",
        "48 (M)",
        "50 (L)",
        "52 (L/XL)",
        "54 (XL)",
        "56 (XXL)",
    ]
    },
    "condition": {
      "title": "Состояние",
      "type": "string",
      "enum": [
        "Новое",
        "Б/y",
      ]
    },
    "who_did": {
      "title": "Кто это сделал?",
      "type": "string",
      "enum": [
        "Я сделал",
        "Член моей компании",
        "Другая компания",
      ]
    },
    "tags": {
      "title": "Теги",
      "type": "string"
    },
    "materials": {
      "title": "Материалы",
      "type": "string"
    },
    "price": {
      "title": "Цена",
      "type": "number"
    },
    "radiobuttons": {
      "type": "string",
      "enum": [
        "Select me!",
        "No me!"
      ]
    },
    "count": {
      "title": "Колличество",
      "type": "number"
    },
  },
  "required": [
    "name",
    "email",
    "comment"
  ]
}

