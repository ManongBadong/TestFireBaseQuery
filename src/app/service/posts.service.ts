import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from '../interface/post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http
      .post<{ name: string }>(
        'https://badongrecipe-default-rtdb.asia-southeast1.firebasedatabase.app/post.json',
        postData
      )
      .subscribe((responseData) => {
        this.fetchPosts();
      });
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://badongrecipe-default-rtdb.asia-southeast1.firebasedatabase.app/post.json'
      )
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      );
  }

  deletePosts() {
    this.http
      .delete(
        'https://badongrecipe-default-rtdb.asia-southeast1.firebasedatabase.app/post.json'
      )
      .subscribe((responseData) => {
        this.fetchPosts();
      });
  }
}
