import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APP_BASE_HREF} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class SearchLineService {

  constructor(
    private http: HttpClient,
    @Inject(APP_BASE_HREF) private baseUrl: string,
  ) {
    this.baseUrl = 'api' + this.baseUrl;
  }

  private static readonly httpActions = {
    // like: 'li'
    base: 'follow',
  };

  public getProductListBySearchLine(searchLine: string) {
    this.http.get('');
  }


}
