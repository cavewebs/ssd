import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


const STORAGE_KEY = 'favPosts';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
 
  constructor(public storage: NativeStorage) { }
 
  isFavorite(postId) {
    return this.getAllFavoritePosts().then(result => {
      return result && result.indexOf(postId) !== -1;
    });
  }
 


  favoritePost(post) {
    return this.getAllFavoritePosts().then(result => {
      if(result){
        if (result.includes(post.id)){
          //already stored before
          console.log('already Stored item!')
        }else 
        {
          //not stored before
          return this.storage.setItem(post.id, post)
            .then(
              () => console.log('Stored item!'),
              error => console.error('Error storing item', error)
            );
        }
      } else {
        return this.storage.setItem(post.id, post);
      }
    });
  
  }
 
  unfavoritePost(post) {
    return this.getAllFavoritePosts().then(result => {
    if (result) {
      if (result.includes(post.id)){
        this.storage.remove(post.id);
      }
    }
    });
        
  }
   
  getAllFavoritePosts() {
    return this.storage.getItem(STORAGE_KEY);
  }
 
}