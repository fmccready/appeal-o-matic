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
  private _imageMeta;
  @Input()
  set imageMeta(data: ImageMeta){
    this._imageMeta = data;
    this.updateSize(data.treatment);
  };
  get imageMeta(){
    return this._imageMeta;
  }
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
    this.cropperSettings.canvasWidth = 500;
    this.cropperSettings.canvasHeight = 500;

    this.data = {};
  }
  private polaroidBackground: any;
  ngOnInit() {
    let polaroid = document.createElement('img');
    polaroid.src = `http://${window.location.hostname}:3000/assets/images/polaroid-template.png`;
    polaroid.setAttribute('crossOrigin', 'anonymous');
    polaroid.onload = () => {
      this.polaroidBackground = document.createElement('img');
      this.polaroidBackground.src = this.getBase64Image(polaroid);
    }

  }

  updateSize(val){
    switch(val){
      case 'polaroid':
        this.cropperSettings.width = 306;
        this.cropperSettings.height = 238;
        this.cropperSettings.croppedWidth = 306;
        this.cropperSettings.croppedHeight = 238;
        break;
      case 'small':
        this.cropperSettings.width = 313;
        this.cropperSettings.height = 329;
        this.cropperSettings.croppedWidth = 313;
        this.cropperSettings.croppedHeight = 329;
        break;
      case 'large':
        this.cropperSettings.width = 650;
        this.cropperSettings.height = 391;
        this.cropperSettings.croppedWidth = 650;
        this.cropperSettings.croppedHeight = 391;
        break;
      default:
        this.cropperSettings.width = 313;
        this.cropperSettings.height = 329;
        this.cropperSettings.croppedWidth = 313;
        this.cropperSettings.croppedHeight = 329;
        break;
    }
  }

  getBase64Image(img){
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL('image/png');
    return dataURL;
  }

  cropImage(data){
    
    if (this.imageMeta.credit || this.imageMeta.caption){
      let image = new Image();
      image.src = data;
      let canvas = document.createElement('canvas');
      let pic = document.createElement('canvas');

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

        canvas.width = 326;
        canvas.height = 318;
        let caption = document.createElement('canvas');
        let captionTransform = caption.getContext('2d');


        canvasTransform.drawImage(this.polaroidBackground, 0, 0);
        canvasTransform.drawImage(pic, 12, 9);
        canvasTransform.font = "22px 'Architects Daughter'";
        canvasTransform.textAlign = "center";
        canvasTransform.textBaseline = "middle";
        let captionArr = this.imageMeta.caption.replace('&nbsp;', '').split('<br />');
        if (captionArr.length > 1){
          canvasTransform.fillText(captionArr[0], (canvas.width / 2), (canvas.height - 54));
          canvasTransform.fillText(captionArr[1], (canvas.width / 2), (canvas.height - 30));
        }
        else {
          canvasTransform.fillText(this.imageMeta.caption, (canvas.width / 2), (canvas.height - 40));
        }
        
        this.saved.emit(canvas.toDataURL());
        this.cancel();
        
      }
      else {
        canvas.width = this.cropperSettings.croppedWidth;
        canvas.height = this.cropperSettings.croppedHeight;
        canvasTransform.drawImage(pic, 0, 0);
        this.saved.emit(canvas.toDataURL());
        this.cancel();
      }
    }
    else {
      this.saved.emit(data);
      this.cancel();
    }
  }
}
