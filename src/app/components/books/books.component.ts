import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from 'src/app/services/book.service';
import { Router, RouterModule } from '@angular/router';
import { BookModel } from 'src/models/book.mode';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule,RouterModule],
  template: `
     <h1>Books</h1>
     <button type="button" class="btn btn-info" routerLink="/add-book" >Add More</button>
     
     <div class="mt-3">
        <table class="table table-striped table-bordered">
           <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
                <th>Action</th>
              </tr>
           </thead>
           <tbody>
              <tr *ngFor="let book of books">
                  <td>{{book.title}}</td>
                  <td>{{book.author}}</td>
                  <td>{{book.year}}</td>
                  <td>
                     <button class="btn btn-success" (click)="edit(book.id)">Edit</button>
                     <button class="btn btn-danger" (click)="delete(book)">Delete</button>
                  </td>
              </tr>
           </tbody>
        </table>
     </div>
  `,
  styles: [
  ]
})
export class BooksComponent implements OnInit {
  
  bookService = inject(BookService);
  router = inject(Router);

  books!: BookModel[];
  private async loadBooks() {
    try {
      this.books = await this.bookService.getBooks();
    }
    catch (error) {
      console.log(error);
    }
  }

  async delete(book: BookModel) {
    if (window.confirm("Are you sure?")) {
      try {
        // delete it from server
        await this.bookService.deleteBook(book.id);
      
        // delete it from client
        const index = this.books.findIndex(a => a.id === book.id);
        if (index >= 0) {
          this.books.splice(index, 1);
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  }

  edit(bookId: string) {
    this.router.navigate([`/edit-book/${bookId}`]);
  }
  ngOnInit(): void {
    this.loadBooks();
    }
}
