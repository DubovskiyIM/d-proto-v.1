import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  public listCards: any[] = [
    {
      owner: undefined,
      title: 'title',
      headerTitle: 'sdsadasdasd',
      images: {
        defaultOrderImage:
          'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
        secondOrderImage:
          'https://www.monikahibbs.com/wp-content/uploads/2014/07/image-200x300.jpg',
      },
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'small',
    },
    {
      owner: undefined,
      title: 'title',
      images: {
        defaultOrderImage:
          'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
        secondOrderImage:
          'https://www.monikahibbs.com/wp-content/uploads/2014/07/image-200x300.jpg',
      },
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'small',
    },
    {
      owner: undefined,
      title: 'title',
      images: {
        defaultOrderImage:
          'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
        secondOrderImage:
          'https://www.monikahibbs.com/wp-content/uploads/2014/07/image-200x300.jpg',
      },
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'large',
    },
    {
      owner: undefined,
      title: 'title',
      images: {
        defaultOrderImage:
          'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
        secondOrderImage:
          'https://www.monikahibbs.com/wp-content/uploads/2014/07/image-200x300.jpg',
      },
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'large',
    },
    {
      owner: undefined,
      title: 'title',
      images: {
        defaultOrderImage:
          'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
        secondOrderImage:
          'https://www.monikahibbs.com/wp-content/uploads/2014/07/image-200x300.jpg',
      },
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'small',
    },
    {
      owner: undefined,
      title: 'title',
      images: {
        defaultOrderImage:
          'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
        secondOrderImage:
          'https://www.monikahibbs.com/wp-content/uploads/2014/07/image-200x300.jpg',
      },
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'small',
    },
    {
      owner: undefined,
      title: 'title',
      images: {
        defaultOrderImage:
          'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
        secondOrderImage:
          'https://www.monikahibbs.com/wp-content/uploads/2014/07/image-200x300.jpg',
      },
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'medium',
    },
    // {
    //   owner: undefined,
    //   title: 'title',
    //   image: './assets/img/upper-right-arrow.png',
    //   description: 'description',
    //   price: 1200,
    //   created: new Date(),
    //   availableQuantity: 1,
    //   size: 'small',
    // },
    // {
    //   owner: undefined,
    //   title: 'title',
    //   image: './assets/img/upper-right-arrow.png',
    //   description: 'description',
    //   price: 1200,
    //   created: new Date(),
    //   availableQuantity: 1,
    //   size: 'small',
    // },
    // {
    //   owner: undefined,
    //   title: 'title',
    //   image: './assets/img/upper-right-arrow.png',
    //   description: 'description',
    //   price: 1200,
    //   created: new Date(),
    //   availableQuantity: 1,
    //   size: 'small',
    // },
    // {
    //   owner: undefined,
    //   title: 'title',
    //   image: './assets/img/upper-right-arrow.png',
    //   description: 'description',
    //   price: 1200,
    //   created: new Date(),
    //   availableQuantity: 1,
    //   size: 'small',
    // },
    // {
    //   owner: undefined,
    //   title: 'title',
    //   image: './assets/img/upper-right-arrow.png',
    //   description: 'description',
    //   price: 1200,
    //   created: new Date(),
    //   availableQuantity: 1,
    //   size: 'medium',
    // },
    // {
    //   owner: undefined,
    //   title: 'title',
    //   image: './assets/img/upper-right-arrow.png',
    //   description: 'description',
    //   price: 1200,
    //   created: new Date(),
    //   availableQuantity: 1,
    //   size: 'medium',
    // },
    // {
    //   owner: undefined,
    //   title: 'title',
    //   image: './assets/img/upper-right-arrow.png',
    //   description: 'description',
    //   price: 1200,
    //   created: new Date(),
    //   availableQuantity: 1,
    //   size: 'medium',
    // },
    // {
    //   owner: undefined,
    //   title: 'title',
    //   image: './assets/img/upper-right-arrow.png',
    //   description: 'description',
    //   price: 1200,
    //   created: new Date(),
    //   availableQuantity: 1,
    //   size: 'medium',
    // },
    // {
    //   owner: undefined,
    //   title: 'title',
    //   image: './assets/img/upper-right-arrow.png',
    //   description: 'description',
    //   price: 1200,
    //   created: new Date(),
    //   availableQuantity: 1,
    //   size: 'medium',
    // },
    // {
    //   owner: undefined,
    //   title: 'title',
    //   image: './assets/img/upper-right-arrow.png',
    //   description: 'description',
    //   price: 1200,
    //   created: new Date(),
    //   availableQuantity: 1,
    //   size: 'medium',
    // },
    // {
    //   owner: undefined,
    //   title: 'title',
    //   image: './assets/img/upper-right-arrow.png',
    //   description: 'description',
    //   price: 1200,
    //   created: new Date(),
    //   availableQuantity: 1,
    //   size: 'medium',
    // },
    // {
    //   owner: undefined,
    //   title: 'title',
    //   image: './assets/img/upper-right-arrow.png',
    //   description: 'description',
    //   price: 1200,
    //   created: new Date(),
    //   availableQuantity: 1,
    //   size: 'medium',
    // },
    // {
    //   owner: undefined,
    //   title: 'title',
    //   image: './assets/img/upper-right-arrow.png',
    //   description: 'description',
    //   price: 1200,
    //   created: new Date(),
    //   availableQuantity: 1,
    //   size: 'small',
    // },
    // {
    //   owner: undefined,
    //   title: 'title',
    //   image: './assets/img/upper-right-arrow.png',
    //   description: 'description',
    //   price: 1200,
    //   created: new Date(),
    //   availableQuantity: 1,
    //   size: 'large',
    // },
  ];

  constructor() {}

  ngOnInit() {}
}
