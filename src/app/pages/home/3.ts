import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


const STORAGE_KEY = 'favPosts';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
 
  constructor(public storage: NativeStorage) { }
 
  isFavorite(post) {
    return this.getAllFavoritePosts().then(result => {
      return result && result.indexOf(post) !== -1;
    });
  }
 


  favoritePost(post) {
    return this.getAllFavoritePosts().then(result => {
      if (result) {
        result.push(post);
        return this.storage.setItem(STORAGE_KEY, result)
          .then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
          );
      } else {
        return this.storage.setItem(STORAGE_KEY, post);
      }
    });
  }
 
  unfavoritePost(post) {
    return this.getAllFavoritePosts().then(result => {
      if (result) {
        var index = result.indexOf(post);
        result.splice(index, 1);
        return this.storage.setItem(STORAGE_KEY, result)
        .then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item', error)
        );
      }
    });
  }
 
  getAllFavoritePosts() {
    return this.storage.getItem(STORAGE_KEY);
  }
 
}