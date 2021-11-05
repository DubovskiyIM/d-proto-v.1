import {Inject, Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import {pipe} from "rxjs";
import {filter, map} from "rxjs/operators";
import {DynamicFormModel, DynamicInputModel, DynamicSelectModel} from "@ng-dynamic-forms/core";
import {DynamicMaterialChipsComponent} from "@ng-dynamic-forms/ui-material";

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private static readonly httpActions = {
    getByID: 'products/product',
    getAll: 'products',
    login: 'auth/login',
    logout: 'auth/logout',
  };

  constructor(private http: HttpClient, @Inject(APP_BASE_HREF) private baseUrl: string,) {
    this.baseUrl = 'api' + this.baseUrl;
  }

  getCreateProductSchema(){
    return (schemaCreateProduct);
  }

  getProductsList() {
    return this.http.get(`${this.baseUrl}/${ProductService.httpActions.getAll}`);
  }


  productCreate(productValues) {
    return this.http.post('api/products/create', productValues)
  }

  getProductByOwner(ownerID) {
    return this.http.get('api/products/' + ownerID)
  }

  public getProductByOwnerForCreateOrder(ownerID) {
    return this.http.get('api/products/' + ownerID).pipe(map((value: any) => {
      let result = [];
      value.forEach((item) => {
        result.push(new CreateOrderData(item.title, item._id, 'https://source.unsplash.com/c_GmwfHBDzk/200x200'))
      })
      return result;
    }))
  }

  public deleteProductById(productID) {
    return this.http.delete('api/products/' + productID)
  }

  getProductById(productId) {
    return this.http.get(`${this.baseUrl}${ProductService.httpActions.getByID}/`+ productId)
  }

  toResponseBody() {
    return pipe(
      filter((event: any) => event.type === HttpEventType.Response),
      map((res: any) => res.body)
    );
  }

  toFormData(formValue) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }

    return formData;
  }


  pushImages(files) {
    if (files.length > 0) {
      let formData: FormData = new FormData();
      for (let file of files) {
        formData.append('files', file);
      }
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      const options = {
        headers: headers,
      }
      return  this.http.post('api/files/upload', formData, options)

    }
  }
}
class CreateOrderData {
  constructor(
    readonly name: string,
    readonly code: string,
    readonly avatarUrl: string | null = null,
  ) {}

  toString(): string {
    return `${this.name}`;
  }
}


export const schemaCreateProduct = [
  {
    "type": "INPUT",
    "id": 'productTitle',
    "inputType": "text",
    "label": 'Введите название',
    "name": 'INPUT',
  },
  {
    "type": "INPUT",
    "id": 'productPrice',
    "inputType": "number",
    "label": 'Цена',
    "name": 'INPUT',
  },
  {
    "type": "INPUT",
    "label": 'Добавьте подходящие теги',
    "id": 'productTag',
    "name": 'TAGS',
    "modelType": 'TAG',
  },
  {
    "type": "INPUT",
    "id": 'description',
    "name": 'EDITOR',
  },
  {
    "type": "SELECT",
    "id": "size",
    "label": "Sample Radio Group",
    "options": [
      {
        "label": "46 (S)",
        "value": "46 (S)",
      },
      {
        "label": "48 (M)",
        "value": "48 (M)"
      },
      {
        "label": "50 (L)",
        "value": "50 (L)"
      },
      {
        "label": "52 (L/XL)",
        "value": '52 (L/XL)'
      },
      {
        "label": "54 (XL)",
        "value": '54 (XL)'
      },
      {
        "label": "56 (XXL)",
        "value": "56 (XXL)"
      }
    ],
    "value": "46 (S)"
  },
  {
    "type": "RADIO_GROUP",
    "id": "who_did",
    "label": "Sample Radio Group",
    "options": [
      {
        "label": "Option 1",
        "value": "option-1",
      },
      {
        "label": "Option 2",
        "value": "option-2"
      },
      {
        "label": "Option 3",
        "value": "option-3"
      }
    ],
    "value": "option-3"
  },
  {
    "type": "CHECKBOX",
    "id": "sampleCheckbox",
    "label": "I do agree"
  }
]

const exmpl2: DynamicFormModel = [

  new DynamicInputModel({
    id: "sampleInput",
    multiple: true
  }),
  new DynamicSelectModel({
    id: 'sdsf',
    name: 'control',
    options: [
      {
        label: "Option 1",
        value: "option-1",
      },
      {
        label: "Option 2",
        value: "option-2"
      },
      {
        label: "Option 3",
        value: "option-3"
      }
    ],
    value: 'option-3'
  }),
  new DynamicInputModel({
    id: "sampleInput2",
    name: 'customControl',
    multiple: true
  }),

  // new DynamicRadioGroupModel<string>({
  //
  //   id: "sampleRadioGroup",
  //   label: "Sample Radio Group",
  //   options: [
  //     {
  //       label: "Option 1",
  //       value: "option-1",
  //     },
  //     {
  //       label: "Option 2",
  //       value: "option-2"
  //     },
  //     {
  //       label: "Option 3",
  //       value: "option-3"
  //     }
  //   ],
  //   value: "option-3"
  // }),
  //
  // new DynamicCheckboxModel({
  //
  //   id: "sampleCheckbox",
  //   label: "I do agree"
  // })
];
