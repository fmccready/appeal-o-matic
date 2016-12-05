import { Injectable } from '@angular/core';

@Injectable()
export class RestoreService<T> {
  originalItem: T;
  currentItem: T;
  setItem(item:T) {
    this.originalItem = this.clone(item);
    this.currentItem = this.clone(item);
  }

  getItem(): T {
    return this.currentItem;
  }

  restoreItem(): T {
    this.currentItem = this.clone(this.originalItem);
    return this.getItem();
  }

  clone(item: T): T {
    if (item === null || typeof item !== 'object'){
      return item;
    }
    var temp = item.constructor();
    if (temp){
      for (var key in item){
        if(item[key] instanceof Date){
          temp[key] = new Date(item[key].getTime());
        }
        else {
          temp[key] = this.clone(item[key]);
        }
      }
    }
    return temp;
  }

}
