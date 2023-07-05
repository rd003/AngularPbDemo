import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      books works!
    </p>
  `,
  styles: [
  ]
})
export class BooksComponent implements OnInit {
  
  bookServcie = inject(BookService);

ngOnInit(): void {
  }
}
