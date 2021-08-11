import {Inject, Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import {pipe} from "rxjs";
import {filter, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private static readonly httpActions = {
    register: 'auth/register',
    login: 'auth/login',
    logout: 'auth/logout',
  };

  public userCard1 = {
    username: 'Mery Jery',
    avatar: 'https://i.picsum.photos/id/1022/512/512.jpg?hmac=nl9w07uW1LOTANdOs1nRNA-U1O7ZumXYL1d8TtmCqmI',
  };

  public userCard2 = {
    username: 'SexyShoots22',
    avatar: 'https://i.picsum.photos/id/1022/512/512.jpg?hmac=nl9w07uW1LOTANdOs1nRNA-U1O7ZumXYL1d8TtmCqmI',
  };

  public listCards: any[] = [
    {
      id: 44,
      owner: this.userCard1,
      title: 'title',
      image: 'https://i.picsum.photos/id/1022/1000/2000.jpg?hmac=o0R55IjBxpioWBx8GaBz84h_ktgoSX1Kz1quH4L8JyY',
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'medium',
    },
    {
      id: 22,
      owner: this.userCard2,
      title: 'title',
      image: 'https://i.picsum.photos/id/48/200/200.jpg?hmac=3FKJwSlm1FM1GD916vZX2Z3HUjHsUXvQM3rYWYXsQvc',
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'small',
    },

    {
      id: 33,
      owner: this.userCard1,
      title: 'title',
      image: 'https://i.picsum.photos/id/30/500/200.jpg?hmac=40j93kHi7aLLphS9asc5UfT7ZAwWdKRsb-z2EnzSuHY',
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'medium',
    },
    {
      owner: undefined,
      title: 'title',
      image: './assets/img/upper-right-arrow.png',
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'medium',
    },
    {
      owner: undefined,
      title: 'title',
      image: './assets/img/upper-right-arrow.png',
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'medium',
    },
    {
      owner: undefined,
      title: 'title',
      image: './assets/img/upper-right-arrow.png',
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'small',
    },
    {
      owner: undefined,
      title: 'title',
      image: './assets/img/upper-right-arrow.png',
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'medium',
    },
    {
      owner: undefined,
      title: 'title',
      image: './assets/img/upper-right-arrow.png',
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'small',
    },
    {
      owner: undefined,
      title: 'title',
      image: './assets/img/upper-right-arrow.png',
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'small',
    },
    {
      owner: undefined,
      title: 'title',
      image: './assets/img/upper-right-arrow.png',
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'small',
    },
    {
      owner: undefined,
      title: 'title',
      image: './assets/img/upper-right-arrow.png',
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'small',
    },
    {
      owner: undefined,
      title: 'title',
      image: './assets/img/upper-right-arrow.png',
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'large',
    },
    {
      owner: undefined,
      title: 'title',
      image: './assets/img/upper-right-arrow.png',
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'medium',
    },
    {
      owner: undefined,
      title: 'title',
      image: './assets/img/upper-right-arrow.png',
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'medium',
    },
    {
      owner: undefined,
      title: 'title',
      image: './assets/img/upper-right-arrow.png',
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'medium',
    },
    {
      owner: undefined,
      title: 'title',
      image: './assets/img/upper-right-arrow.png',
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'large',
    },
    {
      owner: undefined,
      title: 'title',
      image: './assets/img/upper-right-arrow.png',
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'medium',
    },
    {
      owner: undefined,
      title: 'title',
      image: './assets/img/upper-right-arrow.png',
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'medium',
    },
    {
      owner: undefined,
      title: 'title',
      image: './assets/img/upper-right-arrow.png',
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'medium',
    },
    {
      owner: undefined,
      title: 'title',
      image: './assets/img/upper-right-arrow.png',
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'small',
    },
    {
      owner: undefined,
      title: 'title',
      image: './assets/img/upper-right-arrow.png',
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'large',
    },
  ];

  constructor(private http: HttpClient, @Inject(APP_BASE_HREF) private baseUrl: string,) {
    this.baseUrl = 'api' + this.baseUrl;
  }

  getProductsList() {
    return this.listCards;
  }

  getProductById(productId: string) {
    let product;
    this.listCards.forEach((item) => {
      if (item?.id === +productId) {
        product = item;
      }
    })
    return product;
  }

  productCreate(productValues) {
    return this.http.post('api/products/create', productValues)
  }

  getProductByOwner(ownerID) {
    return this.http.get('api/products/' + ownerID)
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
