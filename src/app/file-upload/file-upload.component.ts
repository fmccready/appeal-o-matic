import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  private _name: string;
  private _imageUrl = 'http://' + window.location.hostname + ':3000/image-upload';

  constructor(private http: Http) { }
  
  ngOnInit() {
  }


  @Input() 
  set fileName(name){
    this._name = name;
    console.log(name);
  }
  get fileName(){
    return this._name;
  }

  @Output() uploaded = new EventEmitter<any>();

  fileChosen(input){
    var file = input.target.files[0];
    let headers = new Headers({'Content-Type': 'image/jpg'});
    let options = new RequestOptions({ headers: headers });
    var data = {
      file: file,
      name: this._name
    }
    console.log(data);
    let test = this.http.post(this._imageUrl, data, options);
    test.subscribe(
      data => console.log(data)
    );
  }
  private extractData(res: Response) {
    let body = res.json();
    console.log(body.data);
    return body.data || { };
  }
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
