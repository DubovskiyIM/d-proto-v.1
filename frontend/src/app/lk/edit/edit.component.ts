import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { StarRatingColor } from '../../components/star-ratings/star-ratings.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  rating: number = 4.4;

  starColor: StarRatingColor = StarRatingColor.accent;

  starColorP: StarRatingColor = StarRatingColor.primary;

  starColorW: StarRatingColor = StarRatingColor.warn;

  constructor() {}

  ngOnInit() {}

  onRatingChanged(rating) {
    this.rating = rating;
  }
}
