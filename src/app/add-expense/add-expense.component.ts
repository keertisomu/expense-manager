import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Expense } from '../models/expense';
import { Category  } from '../models/category';
import { DateUtility } from '../utilities/dateUtility';
import { ExpenseUtility } from '../utilities/expenseUtility';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  categories: Category[] = [
    {value: 'grocery-0', viewValue: 'Grocery'},
    {value: 'food-1', viewValue: 'Food'},
    {value: 'travel-2', viewValue: 'Travel'},
    {value: 'ent-3', viewValue: 'Entertaintment'},
    {value: 'utl-4', viewValue: 'Utilities'},
    {value: 'fuel-5', viewValue: 'Fuel'},
    {value: 'medical-6', viewValue: 'Medical'},
    {value: 'rent-7', viewValue: 'Rent'}
  ]; 

   addExpenseForm = new FormGroup({
    name: new FormControl(''),
    expValue: new FormControl(''),
    expCategory: new FormControl(''),
    createdDt: new FormControl('') 
   });
   
   public apiUrl: string = "https://localhost:44389/expense";

  constructor(private router: Router,
    private http: HttpClient) { 
    console.log("entering ngOnInit of add-expense component...");
    
  }

  ngOnInit(): void {
  }

  onSubmit(){
    var expense = {} as Expense;
    expense.name = this.addExpenseForm.get("name").value;
    expense.value = this.addExpenseForm.get("expValue").value;
    expense.created = DateUtility.getFormattedDate(this.addExpenseForm.get("createdDt").value);
    expense.category = this.getCategory(this.addExpenseForm.get("expCategory").value);
    //log the expense
    console.log(`expense details:${JSON.stringify(expense)}`);

    //call post action.
    this.http.post<Expense>(this.apiUrl , expense).subscribe(result => {
      console.log("expense has been added."  + result);
      this.router.navigate(['/home']);
    }, error => console.error(error));
  }

getCategory(category){
  var viewValue: string = "";
   this.categories.forEach(item => {
     if(item.value == category){
      viewValue = item.viewValue;
     }
  });
  return viewValue;
}

}