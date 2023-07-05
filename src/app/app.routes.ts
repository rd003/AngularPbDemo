import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BooksComponent } from './components/books/books.component';
import { AddBooksComponent } from './components/add-books/add-books.component';

export const routes: Routes = [
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'books',component:BooksComponent},
    {path:'add-books',component:AddBooksComponent},
    {path:'edit-books/:id',component:AddBooksComponent},
];
