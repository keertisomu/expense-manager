import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Expense } from '../models/expense';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'value', 'category', 'date'];
  public expenses: MatTableDataSource<Expense>;
  public apiUrl: string = "https://localhost:44389/expense";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log('entering ngOnInit...');
    this.loadData();
  }

  loadData()
  {
    console.log("inside loadData()...")
    this.http.get<any>(this.apiUrl)
    .subscribe(result => {
      this.expenses = new MatTableDataSource<Expense>(result);
    }, error => console.error(error));
  }
}
