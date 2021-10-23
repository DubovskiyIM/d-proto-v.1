// import {default as avatar} from '!!file-loader!../../../../../assets/images/avatar.jpg';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {Observable, of, Subject} from 'rxjs';
import {delay, filter, startWith, switchMap} from 'rxjs/operators';

class Data {
  constructor(
    readonly name: string,
    readonly code: string,
    readonly avatarUrl: string | null = null,
  ) {}

  toString(): string {
    return `${this.name}`;
  }
}

const avatar = 'https://source.unsplash.com/c_GmwfHBDzk/200x200';

const databaseMockData: ReadonlyArray<Data> = [
  new Data('Санкт-Петербург', 'spb'),
  new Data('Москва', 'moscow'),
];

@Component({
  selector: 'app-combo-box-select',
  templateUrl: './combo-box-select.component.html',
  styleUrls: ['./combo-box-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboBoxSelectComponent {
  readonly search$ = new Subject<string>();
  @Input() control: AbstractControl = new FormControl(null);
  @Input() label: string = '';
  @Input() inputDatabaseMockData: ReadonlyArray<Data> = [];
  @Input() isMultiSelect = false;

  readonly items$: Observable<ReadonlyArray<Data> | null> = this.search$.pipe(
    filter(value => value !== null),
    switchMap(search =>
      this.serverRequest(search).pipe(startWith<ReadonlyArray<Data> | null>(null)),
    ),
    startWith(this.inputDatabaseMockData),
  );

  constructor() {
  }

  onSearchChange(searchQuery: string) {
    this.search$.next(searchQuery);
  }

  /**
   * Service request emulation
   */
  private serverRequest(searchQuery: string): Observable<ReadonlyArray<Data>> {
    console.log(this.inputDatabaseMockData);
    debugger;
    const result = this.inputDatabaseMockData.filter(
      user =>
        user.toString().toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1,
    );

    return of(result).pipe(delay(Math.random() * 1000 + 500));
  }
}
