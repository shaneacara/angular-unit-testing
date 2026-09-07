import { Injectable, signal } from '@angular/core';

export interface Expense {
  id: number;
  date: any;
  description: string;
  type: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  expenses = signal<Expense[]>([]);
  selectedExpense = signal<Expense | null>(null);

  addExpense(data: Expense): void {
    this.expenses.update((expenses) => [...expenses, data]);
  }

  selectExpense(expense: Expense): void {
    this.selectedExpense.set(expense);
  }

  updateExpense(id: number, data: Expense): void {
    this.expenses.update((expenses) =>
      expenses.map((expense) => (expense.id === id ? { ...expense, ...data } : expense)),
    );
  }

  clearSelectedExpense(): void {
    this.selectedExpense.set(null);
  }

  deleteExpense(id: number) {
    this.expenses.update((expenses) => expenses.filter((expense) => expense.id !== id));
  }
}
