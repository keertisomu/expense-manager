import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Expense } from '../models/expense';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'value', 'category', 'date', 'delExpense'];
  public expenses: MatTableDataSource<Expense>;
  public apiUrl: string = "https://localhost:44389/expense";

  constructor(private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    console.log('entering ngOnInit...');
    this.loadData();
  }

  loadData() {
    console.log("inside loadData()...")
    this.http.get<any>(this.apiUrl)
      .subscribe(result => {
        this.expenses = new MatTableDataSource<Expense>(result);
      }, error => console.error(error));
  }

  deleteExpense(expense) {
    console.log(`delete expense...${JSON.stringify(expense)}`)
    this.http.delete<any>(this.apiUrl + "/" + expense.id)
      .subscribe(result => {
        console.log("expense deleted");
        //this.deleteRowFromDataSource(expense);
        this.loadData();
      }, error => console.error(error));
  }
}
