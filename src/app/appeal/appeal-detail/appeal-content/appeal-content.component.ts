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
  private imgCanvas: HTMLCanvasElement;
  private imageCreditColor: string = "Black";
  
  constructor(private restoreService: RestoreService<AppealContent>) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 313;
    this.cropperSettings.height = 329;
    this.cropperSettings.croppedWidth = 313;
    this.cropperSettings.croppedHeight = 329;
    this.cropperSettings.canvasWidth = 360;
    this.cropperSettings.canvasHeight = 360;

    this.data = {};
  }
  cropImage(data){
    if (this._content.image.credit){
      let image = new Image();
      image.src = data;

      var canvas = document.createElement('canvas');
      var pic = document.createElement('canvas');

      
      pic.width = this.cropperSettings.width;
      pic.height = this.cropperSettings.height;

      canvas.width = this.cropperSettings.width;
      canvas.height = this.cropperSettings.height;
      
      let picTransform = pic.getContext('2d');
      let canvasTransform = canvas.getContext('2d');

      picTransform.drawImage(image, 0, 0);

      if (this.content.image.credit){
        picTransform.font = '10px Arial';
        picTransform.fillStyle = this.imageCreditColor;
        
        switch(this.content.image.creditPlacement){
          case 'tl':
            picTransform.textAlign = "start";
            picTransform.fillText(this._content.image.credit, 10, 20);
            break;
          case 'tr':
            picTransform.textAlign = "end";
            picTransform.fillText(this._content.image.credit, (this.cropperSettings.width - 10), 20);
            break;
          case 'bl':
            picTransform.textAlign = "start";
            picTransform.fillText(this._content.image.credit, 10, (this.cropperSettings.height - 10));
            break;
          case 'br': 
            picTransform.textAlign = "end";
            picTransform.fillText(this._content.image.credit, (this.cropperSettings.width - 10), (this.cropperSettings.height - 10));
            break;
        }
      }
      
      if (this.content.image.treatment === "polaroid"){
        let background = new Image();
        background.src = `http://${window.location.hostname}:3000/images/polaroid-template.png`;

        canvas.width = 326;
        canvas.height = 318;

        background.onload = function(){
          canvasTransform.drawImage(background, 0, 0);  
        }
        
        //canvasTransform.drawImage(pic, 12, 9);
      }
      else {
        canvas.width = 313;
        canvas.height = 329;
        canvasTransform.drawImage(pic, 0, 0);
      }

      this.croppedImage.emit(canvas.toDataURL());
    }
    else {
      this.croppedImage.emit(data);
    }

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
    var self = this;
    $(function () {
      $('[data-toggle="popover"]').popover({trigger: 'hover', html: true});
      self.imgCanvas = $('img-cropper canvas')[0];
      
    });
  }
}
