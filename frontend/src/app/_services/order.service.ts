import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

interface IOrderCreateImportValue {
  trackNumber: string,
  selectedProducts: any,
  selectedUser: any,
}

export class OrderService {

  constructor() { }

  public createOrder(formValue: IOrderCreateImportValue) {

  }
}
