import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpensesComponent } from './expenses/expenses.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { UpdateExpenseComponent } from './update-expense/update-expense.component';


const routes: Routes = [
  { path: 'home', component: ExpensesComponent },
  { path: 'addexpense', component: AddExpenseComponent },
  { path: 'updateexpense/:id', component: UpdateExpenseComponent },
  { path: 'report', component: ExpensesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
