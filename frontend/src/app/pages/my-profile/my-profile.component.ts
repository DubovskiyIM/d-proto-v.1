import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  public userCard = {
    username: 'velldfgdgdf',
    avatar: 'https://i.picsum.photos/id/1022/512/512.jpg?hmac=nl9w07uW1LOTANdOs1nRNA-U1O7ZumXYL1d8TtmCqmI',
  };

  public listCards: any[] = [
    {
      owner: this.userCard,
      title: 'title',
      image: './assets/img/upper-right-arrow.png',
      description: 'description',
      price: 1200,
      created: new Date(),
      availableQuantity: 1,
      size: 'medium',
    },
    {
      owner: this.userCard,
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

  private userid: number | undefined;

  private subscription: Subscription;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params) => params.getAll('id')),
    )
      .subscribe((data) => {
        console.log(data);
        this.userid = +data;
      });
  }
}
