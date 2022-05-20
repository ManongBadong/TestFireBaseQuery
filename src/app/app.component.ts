import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {

  formGroup!: FormGroup

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      title: new FormControl(null),
      content: new FormControl(null)
    });
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.http.post("https://badongrecipe-default-rtdb.asia-southeast1.firebasedatabase.app/post.json", postData).subscribe(
      (responseData => {
        console.log(responseData);
      })
    );
  }

  test12() {
    
  }

}
