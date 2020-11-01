import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from '../models/expense';
import { Category } from '../models/category';
import { DateUtility } from '../utilities/dateUtility';

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.css']
})
export class UpdateExpenseComponent implements OnInit {
  id?: string;
  expense: Expense;
  title: string
  public apiUrl: string = "https://localhost:44389/expense";
  
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

  updateExpenseForm = new FormGroup({
    name: new FormControl(''),
    expValue: new FormControl(''),
    expCategory: new FormControl(''),
    createdDt: new FormControl('') 
   });

  constructor( private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    console.log("inside this.ngOnInit update expense")
    this.getExpenseDetails();
    console.log(`the id: ${this.id}`);
  }

  getExpenseDetails()
  {
    // retrieve the ID from the 'id'
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get<Expense>(this.apiUrl + "/" + this.id).subscribe(result => {
      this.expense = result;
      this.title = "Update - " + this.expense.name;
      this.loadExpenseForm(this.expense);
    }, error => console.error(error));
  }

  loadExpenseForm(expense: Expense){
    this.updateExpenseForm.setValue({
      name: expense.name,
      expValue: expense.value,
      expCategory: this.getCategoryValue(expense.category),
      createdDt: expense.created
    });
  }

  onSubmit(){
    console.log("inside update fn...");
    var expense = {} as Expense;
    expense.id = this.id;
    expense.name = this.updateExpenseForm.get("name").value;
    expense.value = this.updateExpenseForm.get("expValue").value;
    expense.created = DateUtility.getFormattedDate(this.updateExpenseForm.get("createdDt").value);
    expense.category = this.getCategoryViewValue(this.updateExpenseForm.get("expCategory").value);
    //for time being
    console.log(`expense details:${JSON.stringify(expense)}`);

    this.http.put<Expense>(this.apiUrl , expense).subscribe(result => {
      console.log("expense has been updated."  + result);
      this.router.navigate(['/home']);
    }, error => console.error(error));
  }

  getCategoryValue(category){
    var categoryValue: string = "";
     this.categories.forEach(item => {
       if(item.viewValue == category){
        categoryValue = item.value;
       }
    });
    return categoryValue;
  }

  getCategoryViewValue(category){
    var viewValue: string = "";
     this.categories.forEach(item => {
       if(item.value == category){
        viewValue = item.viewValue;
       }
    });
    return viewValue;
  }
}