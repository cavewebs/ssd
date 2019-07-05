import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


const STORAGE_KEY = 'favPosts';
const POST_ID ='postId';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  post:any = {
    'id': '',
    'title': '',
    'content': '',
    'media_url':'',
    'link': ''

  }
 
  constructor(public storage: NativeStorage) { }
 
  
  favoritePost(post) {
        return this.storage.setItem(post.id, post).then(
              () => console.log('Stored item!', post),
              error => console.error('Error storing item', error)
            );
        
  }
 
  unfavoritePost(post) {
    return this.storage.remove(post.id);
   
        
  }
   
  getAllFavoritePosts() {
    return this.storage.getItem(STORAGE_KEY);
  }
 
 isFavorite(postId) {
    return this.getAllFavoritePosts().then(result => {
      if (result.id.includes(postId)){
        return true;
        console.log("ids", result.id);
      } else {
        return false;
        console.log("ids", result.id);
      }
    }),
    error => console.error('Error storing item', error);
  }
 
}