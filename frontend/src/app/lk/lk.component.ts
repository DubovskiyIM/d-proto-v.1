import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-lk',
  templateUrl: './lk.component.html',
  styleUrls: ['./lk.component.scss'],
})
export class LkComponent implements AfterViewInit {
  @ViewChild(MatSidenav)
  public sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver) {}

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close().then();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open().then();
      }
    });
  }

  public changeNavBarState() {
    if (this.sidenav?.mode === 'over') {
      this.sidenav.mode = 'side';
      this.sidenav.open().then();
    } else if (this.sidenav.mode === 'side') {
      this.sidenav.mode = 'over';
      this.sidenav.close().then();
    }
  }
}
