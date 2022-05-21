import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Post } from '../interface/post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    return this.http.post<{ name: string }>(
      'https://badongrecipe-default-rtdb.asia-southeast1.firebasedatabase.app/post.json',
      postData
    );
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://badongrecipe-default-rtdb.asia-southeast1.firebasedatabase.app/post.json',
        {
          headers: new HttpHeaders({
            'Custom-Header': 'Fuck you!',
          }),
        }
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
        }),
        catchError((errorRes) => {
          return throwError(() => errorRes);
        })
      );
  }

  deletePosts() {
    return this.http.delete(
      'https://badongrecipe-default-rtdb.asia-southeast1.firebasedatabase.app/post.json'
    );
  }
}
