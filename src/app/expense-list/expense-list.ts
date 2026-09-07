import { Component, computed } from '@angular/core';
import { ExpenseService } from '../services/expense-service';

@Component({
  selector: 'app-expense-list',
  imports: [],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.scss',
})
export class ExpenseList {
  expenses: any;

  constructor(private expenseService: ExpenseService) {
    this.expenses = this.expenseService.expenses;
  }

  bills = computed(() => {
    return this.expenses().filter((expense: any) => expense.type === 'Bills');
  });

  essentials = computed(() => {
    return this.expenses().filter((expense: any) => expense.type === 'Essentials');
  });

  family = computed(() => {
    return this.expenses().filter((expense: any) => expense.type === 'Family');
  });

  food = computed(() => {
    return this.expenses().filter((expense: any) => expense.type === 'Food');
  });

  bonding = computed(() => {
    return this.expenses().filter((expense: any) => expense.type === 'Bonding');
  });

  others = computed(() => {
    return this.expenses().filter((expense: any) => expense.type === 'Others');
  });

  work = computed(() => {
    return this.expenses().filter((expense: any) => expense.type === 'Work');
  });

  editExpense(expense: any): void {
    this.expenseService.selectExpense(expense);
  }
}
