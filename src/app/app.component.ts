import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Post } from './interface/post.model';
import { PostService } from './service/posts.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  formGroup!: FormGroup;
  loadedPosts: Post[] = [];
  isFetching: Boolean = false;
  isError: boolean = false;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.postService.error.subscribe();

    this.formGroup = new FormGroup({
      title: new FormControl(null),
      content: new FormControl(null),
    });

    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postService
      .createAndStorePost(postData.title, postData.content)
      .subscribe((response) => {
        this.loadedPosts.push({
          title: postData.title,
          content: postData.content,
          id: response.name,
        });
      });
  }

  onFetch() {
    this.fetchPosts();
  }

  onClear() {
    this.isFetching = true;
    this.postService.deletePosts().subscribe((response) => {
      this.fetchPosts();
      this.loadedPosts = [];
      this.isFetching = false;
    });
  }

  onHandleError() {
    this.isError = false;
    this.loadedPosts = [];
    this.isFetching = false;
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      (responseData: Post[]) => {
        this.loadedPosts = responseData;
        this.isFetching = false;
      },
      (error) => {
        this.loadedPosts = [];
        this.isError = true;
      }
    );
  }
}
