import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppealContent } from '../../../models/appeal';
import { RestoreService } from '../../../restore.service';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';

declare var $: any;

interface JQuery {
  chosen(options?: any): JQuery;
}

@Component({
  selector: 'app-appeal-content',
  templateUrl: 'appeal-content.component.html',
  styleUrls: ['appeal-content.component.css'],
  providers: [RestoreService]
})
export class AppealContentComponent implements OnInit {
  @Output() saved = new EventEmitter<AppealContent>();
  @Output() canceled = new EventEmitter<AppealContent>();
  @Output() croppedImage = new EventEmitter<any>();
  private _content: AppealContent;
  private data: any;
  private cropperSettings: CropperSettings;
  constructor(private restoreService: RestoreService<AppealContent>) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 313;
    this.cropperSettings.height = 329;
    this.cropperSettings.croppedWidth = 313;
    this.cropperSettings.croppedHeight = 329;
    this.cropperSettings.canvasWidth = 320;
    this.cropperSettings.canvasHeight = 320;

    this.data = {};
  }
  cropImage(data){
    console.log('cropImage called');
    this.croppedImage.emit(data);
  }
  @Input()
  set content(data: AppealContent){
    this._content = data;
    if (this._content.image.url){
      this.data.image = this._content.image.url;
    }
    this.restoreService.setItem(data);
  }
  get content(): AppealContent {
    return this._content;
  }
  save() {
    this.restoreService.setItem(this._content);
    this.saved.emit(this._content);
  }
  cancel() {
    this._content = this.restoreService.restoreItem();
    this.canceled.emit(this._content);
  }

  ngOnInit() {
    $(function () {
      $('[data-toggle="popover"]').popover({trigger: 'hover', html: true});
    });
  }
}
