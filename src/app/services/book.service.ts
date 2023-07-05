import { Injectable } from '@angular/core';
import PocketBase from 'PocketBase';
import { environment } from 'src/environments/environment.development';
import { BookModel } from 'src/models/book.mode';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  

  async getBooks(): Promise<BookModel[]> {
    const pb = new PocketBase(environment.baseUrl);
    const records:BookModel[] = await pb.collection('books').getFullList({
      sort:'-created'
    });
    return records;
  }

  async addBook(book:BookModel) {
    const pb = new PocketBase(environment.baseUrl);
    const response: BookModel = await pb.collection('books').create(book);
    return response;
  }

  async deleteBook(bookId: string) {
    const pb = new PocketBase(environment.baseUrl);
    const response = await pb.collection('books').delete(bookId);
    return response;
  }

  async getBook(bookId: string) {
    const pb = new PocketBase(environment.baseUrl);
    const record: BookModel = await pb.collection('books').getOne(bookId);
    return record;
  } 

  async updateBook(book:BookModel) {
    const pb = new PocketBase(environment.baseUrl);
    const response: BookModel = await pb.collection('books').update(book.id,book);
    return response;
  } 

  constructor() { }
}
