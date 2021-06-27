import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-star-ratings',
  templateUrl: './star-ratings.component.html',
  styleUrls: ['./star-ratings.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class StarRatingsComponent implements OnInit {
  @Input('rating') private rating: number = 4;
  @Input('starCount') starCount: number = 5;
  @Input('color') color: string = 'accent';
  @Output() private ratingUpdated = new EventEmitter();

  public isActiveTouch: boolean = false;
  private snackBarDuration: number = 2000;
  ratingArr = [];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.rating = Math.round(this.rating);
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  onClick(rating: number) {
    this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration,
    });
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}

export enum StarRatingColor {
  primary = 'primary',
  accent = 'accent',
  warn = 'warn',
}
