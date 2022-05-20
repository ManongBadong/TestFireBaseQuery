import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onCreatePost(postData: { title: string; content: string }) {
    this.http.post("https://badongrecipe-default-rtdb.asia-southeast1.firebasedatabase.app/post.json", postData).subscribe(
      (responseData => {
        console.log(responseData);
      })
    )
  }

}
