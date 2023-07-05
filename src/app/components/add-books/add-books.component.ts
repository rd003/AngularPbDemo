import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookModel } from 'src/models/book.mode';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-books',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  template: `
    <h1>{{action}} Book</h1>

    <div class="w-50">
    <form [formGroup]="bookForm" (ngSubmit)="onPost()">
        <div class="mb-3">
          <label for="title" class="form-label" >Title</label>
          <input type="text" class="form-control" formControlName="title">

          <div  *ngIf="f['title'].invalid &&(f['title'].dirty || f['title'].touched)">
             <div class="form-text text-danger" *ngIf="f['title'].errors?.['required']" >Title is required</div>
             <div class="form-text text-danger" *ngIf="f['title'].errors?.['minlength']" >Minimum length should be 4</div>
             <div  class="form-text text-danger"*ngIf="f['title'].errors?.['maxlength']" >Max length should be 20</div>
          </div>
        </div>


        <div class="mb-3">
          <label for="author" class="form-label" >Author</label>
          <input type="text" class="form-control" formControlName="author">

          <div  *ngIf="f['author'].invalid &&(f['author'].dirty || f['author'].touched)">
             <div class="form-text text-danger" *ngIf="f['author'].errors?.['required']" >Author is required</div>
             <div class="form-text text-danger" *ngIf="f['author'].errors?.['minlength']" >Minimum length should be 4</div>
             <div  class="form-text text-danger"*ngIf="f['author'].errors?.['maxlength']" >Max length should be 20</div>
            
          </div>
        </div>

        <div class="mb-3">
          <label for="year" class="form-label" >Year</label>
          <input type="number" class="form-control" formControlName="year">
        </div>

        <div class="mb-3" *ngIf="message">
          <span class="">{{message}}</span>
        </div>

        <button type="submit" class="btn btn-primary" [disabled]="bookForm.invalid">Submit</button>
      </form>
    </div>

  `,
  styles: [
  ]
})
export class AddBooksComponent implements OnInit {
   
  //services
  fb = inject(FormBuilder);
  bookService = inject(BookService);
  route = inject(ActivatedRoute);

  // fields
  bookForm!: FormGroup;
  message!: string;
  action = "Add";
  
  //getters
  get f() {
    return this.bookForm.controls;
  }


  //methods

  async onPost() {
    if (this.action == "Add") {
      await this.addBook();
    }
    else {
      this.updateBook();
    }
  }

  private async addBook() {
    try {
      this.message = "pending";
      const book = this.bookForm.value as BookModel;
      await this.bookService.addBook(book);
      this.message = "Successfully added";
      this.bookForm.reset();  
    }
    catch (error) {
      console.log(error);
      this.message = "Something went wrong";
    }
  }

  private async updateBook() {
    try {
      this.message = "pending";
      const book = this.bookForm.value as BookModel;
      await this.bookService.updateBook(book);
      this.message = "Successfully updated";
    }
    catch (error) {
      console.log(error);
      this.message = "Something went wrong";
    }
  }
  
  private async loadEditForm(bookId:string) {
    try {
      const bookToUpdate = await this.bookService.getBook(bookId);
      if (bookToUpdate) {
        this.bookForm.patchValue(bookToUpdate);
        console.log(this.bookForm.value);
      }
    } catch (error) {
      console.log(error);
    }
    
  }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      'id': [''],
      'title': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      'author': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      'year': [0, Validators.required],
    });

    const bookId = this.route.snapshot.params['id'];
    if (bookId) {
      this.action = "Edit";
      this.loadEditForm(bookId);
    }
  }



}
