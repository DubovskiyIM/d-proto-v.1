import {Component, ElementRef, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-drag-and-drop-file',
  templateUrl: './drag-and-drop-file.component.html',
  styleUrls: ['./drag-and-drop-file.component.scss']
})
export class DragAndDropFileComponent implements OnInit {
  @ViewChild("fileDropRef", {static: false}) fileDropEl: ElementRef;
  _files: any[] = [];

  @Output() onChanged = new EventEmitter<boolean>();


  set files(files) {
    this._files = files;
    this.change(this._files);
  }

  get  files() {
    return this._files;
  }

  change(increased:any) {
    this.onChanged.emit(increased);
  }

  ngOnInit(): void {
  }

  fileBrowseHandler(event) {
    this.files = this.files.concat(...event.target?.files);
  }

  onFileDropped(event) {
    this.prepareFilesList(event);
  }

  deleteFile(index: number) {
    // if (this.files[index].progress < 100) {
    //   return;
    // }
    this.files.splice(index, 1);
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      // item.progress = 0;
      this.files = this.files.concat(item);
    }
    this.fileDropEl.nativeElement.value = "";
    // this.uploadFilesSimulator(0);
  }

  // uploadFilesSimulator(index: number) {
  //   setTimeout(() => {
  //     if (index === this.files.length) {
  //       return;
  //     } else {
  //       const progressInterval = setInterval(() => {
  //         if (this.files[index].progress === 100) {
  //           clearInterval(progressInterval);
  //           this.uploadFilesSimulator(index + 1);
  //         } else {
  //           this.files[index].progress += 5;
  //         }
  //       }, 200);
  //     }
  //   }, 1000);
  // }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
}
