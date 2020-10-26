import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

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
   
   //public apiUrl: string = "https://localhost:44389/expense";

  constructor(private http: HttpClient) { 
    
    console.log("entering ngOnInit of add-expense component...");

  }

  ngOnInit(): void {
  }

  onSubmit(){
    //todo: post call
  }

}

interface Category {
  value: string;
  viewValue: string;
}
