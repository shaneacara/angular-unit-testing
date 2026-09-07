import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExpenseForm } from './forms/expense-form/expense-form';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpenseList } from './expense-list/expense-list';

@Component({
  selector: 'app-root',
  imports: [ExpenseForm, ExpenseList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Expense Tracker');
  description = 'For Automated Testing Purposes';
}
