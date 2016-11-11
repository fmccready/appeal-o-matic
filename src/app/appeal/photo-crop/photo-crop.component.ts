import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ImageCropperComponent, CropperSettings, ImageCropper } from 'ng2-img-cropper';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { Image as ImageMeta, Appeal } from '../../models/appeal';
import { AppealService } from '../../appeal.service';

@Component({
  selector: 'photo-crop',
  templateUrl: './photo-crop.component.html',
  styleUrls: ['./photo-crop.component.css']
})
export class PhotoCropComponent implements OnInit {
  @Output() saved = new EventEmitter<any>();

  @Input() imageMeta: ImageMeta;
  private cropperSettings: CropperSettings;

  @ViewChild('settingsModal') public settingsModal:ModalDirective;
  @ViewChild('cropModal') public cropModal:ModalDirective; 

  private isCropping: boolean = false;
  public showSettingsModal(){
    this.isCropping = false;
    this.cropModal.hide();
    this.settingsModal.show();
  }
  private showCropModal(){
    this.settingsModal.hide();
    this.isCropping = true;
    this.cropModal.show();
  }
  public cancel(){
    this.cropModal.hide();
    this.settingsModal.hide();
    this.isCropping = false;
  }

  private data: any;

  constructor(private appealService:AppealService) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 313;
    this.cropperSettings.height = 329;
    this.cropperSettings.croppedWidth = 313;
    this.cropperSettings.croppedHeight = 329;
    this.cropperSettings.canvasWidth = 360;
    this.cropperSettings.canvasHeight = 360;

    this.data = {};
  }

  ngOnInit() {
  }

  updateSize(val){
    switch(val){
      case 'polaroid':
        this.cropperSettings.width = 306;
        this.cropperSettings.height = 238;
        this.cropperSettings.croppedWidth = 306;
        this.cropperSettings.croppedHeight = 238;
        break;
      case '':
        this.cropperSettings.width = 313;
        this.cropperSettings.height = 329;
        this.cropperSettings.croppedWidth = 313;
        this.cropperSettings.croppedHeight = 329;
        break;
      default:
        this.cropperSettings.width = 313;
        this.cropperSettings.height = 329;
        this.cropperSettings.croppedWidth = 313;
        this.cropperSettings.croppedHeight = 329;
        break;
    }
  }
  cropImage(data){
    if (this.imageMeta.credit || this.imageMeta.caption){
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

      if (this.imageMeta.credit){
        picTransform.font = '10px Arial';
        picTransform.fillStyle = this.imageMeta.creditColor;
        
        switch(this.imageMeta.creditPlacement){
          case 'tl':
            picTransform.textAlign = "start";
            picTransform.fillText(this.imageMeta.credit, 10, 20);
            break;
          case 'tr':
            picTransform.textAlign = "end";
            picTransform.fillText(this.imageMeta.credit, (this.cropperSettings.width - 10), 20);
            break;
          case 'bl':
            picTransform.textAlign = "start";
            picTransform.fillText(this.imageMeta.credit, 10, (this.cropperSettings.height - 10));
            break;
          case 'br': 
            picTransform.textAlign = "end";
            picTransform.fillText(this.imageMeta.credit, (this.cropperSettings.width - 10), (this.cropperSettings.height - 10));
            break;
        }
      }
      
      if (this.imageMeta.treatment === "polaroid"){
        let background = new Image();
        background.src = `http://${window.location.hostname}:3000/assets/images/polaroid-template.png`;
        background.setAttribute('crossOrigin', 'anonymous');
        canvas.width = 326;
        canvas.height = 318;

        background.onload = () => {
          canvasTransform.drawImage(background, 0, 0);
          canvasTransform.drawImage(pic, 12, 9);
          this.saved.emit(canvas.toDataURL());

        }
        
      }
      else {
        canvas.width = 313;
        canvas.height = 329;
        canvasTransform.drawImage(pic, 0, 0);
        this.saved.emit(canvas.toDataURL());
      }
    }
    else {
      this.saved.emit(data);
    }

  }
  saveImage(data){


  }

}
