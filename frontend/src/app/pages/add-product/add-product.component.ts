import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../../_services/product.service";
import {NavigationService} from "../../_services/navigation.service";
import {MY_FORM_MODEL} from './schemas/ng-schema'
import {DynamicFormModel, DynamicFormService} from "@ng-dynamic-forms/core";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AddProductComponent implements OnInit {
  createProductForm: FormGroup;
  private fileList = [];
  private uploadFilesList = []
  public schema = schemaObj;
  formModel: DynamicFormModel = MY_FORM_MODEL;
  formGroup: FormGroup;
  form_layout = MY_FORM_LAYOUT;

  constructor(private formBuilder: FormBuilder,
              private formService: DynamicFormService,
              private productService: ProductService, private navigateService: NavigationService,) {
    /*    this.createProductForm = formBuilder.group({
          "productTitle": ["", [Validators.required]],
          "productDescription": ["", [Validators.required]],
          "productPrice": ["", [Validators.required]],
          "productTags": ["", [Validators.required]],
        });*/
    // this.formGroup = this.formService.createFormGroup(this.formModel);
  }

  ngOnInit(): void {
    const formModelJson = this.productService.getCreateProductSchema();
    this.formModel = this.formService.fromJSON(formModelJson);
    console.log(this.formModel);
    // console.log(JSON.stringify(formModelJson));
    // this.formModel = formModelJson;
    this.formGroup = this.formService.createFormGroup(this.formModel);
    console.log(this.formGroup);
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
export const MY_FORM_LAYOUT = {

  "productTitle": {
    element: {
      label: ""
    },
    grid: {
      control: "w-50",
      label: ""
    }
  },
  "productPrice": {
    grid: {
      control: "width-10",
    }
  },
  "productTag": {
    grid: {
      control: "w-50",
    }
  },
  "myOtherFormControlModelId": {

    element: {
      label: "control-label"
    },
    grid: {
      control: "col-sm-9",
      label: "col-sm-3"
    }
  }
};
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

