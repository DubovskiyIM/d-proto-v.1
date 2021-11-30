import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicFormModel, DynamicFormService } from '@ng-dynamic-forms/core';
import { ProductService } from '../../_services/product.service';
import { NavigationService } from '../../_services/navigation.service';
import { OUTERWEAR_LAYOUT } from '../../_services/schemas/outerwear_layout';

// import {MY_FORM_MODEL} from './schemas/ng-schema'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddProductComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private formService: DynamicFormService,
    private productService: ProductService,
    private navigateService: NavigationService
  ) {
    /*    this.createProductForm = formBuilder.group({
          "productTitle": ["", [Validators.required]],
          "productDescription": ["", [Validators.required]],
          "productPrice": ["", [Validators.required]],
          "productTags": ["", [Validators.required]],
        });*/
    // this.formGroup = this.formService.createFormGroup(this.formModel);
  }

  createProductForm: FormGroup;

  private fileList = [];
  private uploadFilesList = [];
  public schema = schemaObj;
  formModel: DynamicFormModel;
  formGroup: FormGroup;
  form_layout;

  model = {};
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags = [];

  ngOnInit(): void {}

  add(event): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push({ name: value });
    }
    event.chipInput!.clear();
  }

  remove(fruit): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  public getProductSchemaForCreate(typeProduct: string = 'default'): void {
    // ty
    // this.
    console.log('TYPE-PRODUCT', typeProduct);
    const formModelJson = this.productService.getCreateProductSchema(typeProduct);
    this.formModel = this.formService.fromJSON(formModelJson);
    this.form_layout = this.getLayoutForProductCreate(typeProduct);
    // console.log(this.formModel);
    // console.log(JSON.stringify(formModelJson));
    // this.formModel = formModelJson;
    this.formGroup = this.formService.createFormGroup(this.formModel);
  }

  // public getSchemaByType(typeProduct: string) {
  //
  // }
  public changeFileList(event: any): void {
    this.fileList = event;
    this.productService.pushImages(event).subscribe((res) => {
      this.uploadFilesList.push(res[1]?.url);
    });
  }

  private getLayoutForProductCreate(typeProduct: string = 'default') {
    if (typeProduct === 'outerwear') {
      console.log(true);
      return OUTERWEAR_LAYOUT;
    }
    return MY_FORM_LAYOUT;
  }

  public changeSelectCategory(event) {
    console.log(event);
    this.getProductSchemaForCreate(event?.value);
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
        about: this.createProductForm.value.productDescription,
      },
      tags: this.tags,
      style: '',
      color: '',
      images: this.uploadFilesList,
    };

    this.productService.productCreate(productData).subscribe((res) => {
      if (res) {
        this.navigateService.goToLKHomePage();
      }
    });
  }
}

export const MY_FORM_LAYOUT = {
  productTitle: {
    element: {
      control: 'w-75',
      label: '',
    },
    grid: {
      control: 'col-12',
      label: '',
    },
  },
  productPrice: {
    grid: {
      control: 'w-25',
    },
  },
  productTag: {
    grid: {
      control: 'w-50',
    },
  },
  productCount: {
    grid: {
      control: 'w-25',
    },
  },
  myOtherFormControlModelId: {
    element: {
      label: 'control-label',
    },
    grid: {
      control: 'col-sm-9',
      label: 'col-sm-3',
    },
  },
};
const schemaObj = {
  type: 'object',
  title: 'Comment',
  properties: {
    name: {
      title: 'Название',
      type: 'string',
    },
    customTag: {
      title: 'customTag',
      type: 'customTag',
    },
    size: {
      title: 'Размер',
      type: 'string',
      enum: ['46 (S)', '48 (M)', '50 (L)', '52 (L/XL)', '54 (XL)', '56 (XXL)'],
    },
    condition: {
      title: 'Состояние',
      type: 'string',
      enum: ['Новое', 'Б/y'],
    },
    who_did: {
      title: 'Кто это сделал?',
      type: 'string',
      enum: ['Я сделал', 'Член моей компании', 'Другая компания'],
    },
    tags: {
      title: 'Теги',
      type: 'string',
    },
    materials: {
      title: 'Материалы',
      type: 'string',
    },
    price: {
      title: 'Цена',
      type: 'number',
    },
    radiobuttons: {
      type: 'string',
      enum: ['Select me!', 'No me!'],
    },
    count: {
      title: 'Колличество',
      type: 'number',
    },
  },
  required: ['name', 'email', 'comment'],
};
