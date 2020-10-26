import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpensesComponent } from './expenses/expenses.component';
import {AddExpenseComponent} from './add-expense/add-expense.component';


const routes: Routes = [
  {path:'home' , component:ExpensesComponent},
  {path:'addexpense' , component:AddExpenseComponent},
  {path:'report' , component:ExpensesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
