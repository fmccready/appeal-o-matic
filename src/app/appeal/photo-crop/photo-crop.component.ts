import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as Cropper from 'cropperjs';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { AppealImage as ImageMeta, Appeal } from '../../models/appeal';
import { FileUploadComponent } from '../../file-upload/file-upload.component';
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
    if (data){
      this.updateSize(data.treatment);
    }
    console.log(this._imageMeta);
  };
  get imageMeta(){
    return this._imageMeta;
  }
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
    if (this.cropper){
      this.cropper.destroy();
    }
  }
  private aspectRatio: number;
  createCropper(fileName){
    let aspectRatio = this.aspectRatio;
    this.img.nativeElement.src = `http://${window.location.hostname}:3000/assets/images/` + fileName;
    this.cropper = new Cropper(this.img.nativeElement, {
      aspectRatio: this.aspectRatio,
      crop: function(e) {
        console.log(e.detail.x);
        console.log(e.detail.y);
        console.log(e.detail.width);
        console.log(e.detail.height);
        console.log(e.detail.rotate);
        console.log(e.detail.scaleX);
        console.log(e.detail.scaleY);
      }
    });
  }

  private data: any;
  private appealId;
  private _suffix;
  @Input()
  set suffix(num){
    this._suffix = num;
  }
  get suffix(){
    return this._suffix;
  }
  constructor(private appealService: AppealService) {
    this.appealService.getCurrentAppeal().subscribe(
      data => this.appealId = data._id
    );
  }

  private cropper: Cropper;
  private canvasData;

  @ViewChild('imageFile') private imageFile;
  @ViewChild('img') private img;
  
  private polaroidBackground: any;
  ngOnInit() {
    let polaroid = document.createElement('img');
    polaroid.src = `http://${window.location.hostname}:3000/assets/images/polaroid-template.jpg`;
    polaroid.setAttribute('crossOrigin', 'anonymous');
    polaroid.onload = () => {
      this.polaroidBackground = document.createElement('img');
      this.polaroidBackground.src = this.getBase64Image(polaroid);
    }
  }

  updateSize(val){
    switch(val){
      case 'polaroid':
        this.aspectRatio = 306/238;
        break;
      case 'small':
        this.aspectRatio = 313/329;
        break;
      case 'large':
        this.aspectRatio = 650/391;
        break;
      case 'calloutLarge':
        this.aspectRatio = 650/150;
        break;
      case 'calloutSmall':
        this.aspectRatio = 313/200;
      default:
        this.aspectRatio = 313/329;
        break;
    }
  }

  getBase64Image(img){
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL('image/jpg', 1.0);
    return dataURL;
  }
  saveImage(){
    
    //this.saved.emit();
    //this.cancel();
  }
/*
  cropImage(data){
    if (this.imageMeta.credit || this.imageMeta.caption){
      let image = new Image();
      image.src = data;
      let canvas = document.createElement('canvas');
      let pic = document.createElement('canvas');
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
        this.saved.emit(canvas.toDataURL('image/jpg', 1.0));
        this.cancel();
      }
      else if (this.imageMeta.treatment === 'calloutLarge' || this.imageMeta.treatment === 'calloutSmall'){
        canvasTransform.drawImage(pic, 0, 0);
        canvasTransform.font = "30px 'Arial'";
        canvasTransform.textAlign = "center";
        canvasTransform.textBaseline = "middle";
        let captionArr = this.imageMeta.caption.replace('&nbsp;', '').split('<br />');
        if (captionArr.length > 1){
          canvasTransform.fillText(captionArr[0], (canvas.width / 2), ((canvas.height / 2) - 18));
          canvasTransform.fillText(captionArr[1], (canvas.width / 2), ((canvas.height /2) + 18));
        }
        else {
          canvasTransform.fillText(this.imageMeta.caption, (canvas.width / 2), (canvas.height / 2));
        }
        this.saved.emit(canvas.toDataURL('image/jpg', 1.0));
        this.cancel();
      }
      else {
        canvas.width = this.cropperSettings.croppedWidth;
        canvas.height = this.cropperSettings.croppedHeight;
        canvasTransform.drawImage(pic, 0, 0);
        this.saved.emit(canvas.toDataURL('image/jpg', 1.0));
        this.cancel();
      }
    }
    else {
      this.saved.emit(data);
      this.cancel();
    }
  }
  */


}
