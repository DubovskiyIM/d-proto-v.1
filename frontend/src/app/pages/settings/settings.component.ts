import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../_services/product.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private fileList = [];
  private uploadFilesList = []

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  changeFileList(event) {
    this.fileList = event;
    this.productService.pushImages(event).subscribe((res) => {
      this.uploadFilesList.push(res[1]?.url);
    });
  }
}
