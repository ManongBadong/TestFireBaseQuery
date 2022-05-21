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

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      title: new FormControl(null),
      content: new FormControl(null),
    });

    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetch() {
    this.fetchPosts();
  }

  onClear() {
    this.postService.deletePosts();
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe((responseData: Post[]) => {
      this.loadedPosts = responseData;
      this.isFetching = false;
    });
  }
}
