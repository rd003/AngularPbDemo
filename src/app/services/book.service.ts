import { Injectable } from '@angular/core';
import PocketBase from 'PocketBase';
import { environment } from 'src/environments/environment.development';
import { BookListModel } from 'src/models/book.mode';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  

  async getBooks() {
    const pb = new PocketBase(environment.baseUrl);
    const records = await pb.collection('books').getFullList({
      sort:'-created'
    });
    return records;
  }

  constructor() { }
}
