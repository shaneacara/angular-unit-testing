import { TestBed } from '@angular/core/testing';
import { Expense, ExpenseService } from './expense-service';
import { sample } from 'rxjs';

describe('ExpenseService', () => {
  let service: ExpenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add expense', () => {
    // declare instance
    const expenseSample: Expense = {
      id: 1,
      date: '2026-09-05',
      description: 'matcha',
      type: 'Food',
      price: 99,
    };
    service.addExpense(expenseSample);

    expect(service.expenses()).toContain(expenseSample);
  });

  it('should store the selected expense', () => {
    const clickedExpense: Expense = {
      id: 1,
      date: '2026-09-05',
      description: 'matcha',
      type: 'Food',
      price: 99,
    };

    service.selectExpense(clickedExpense);

    expect(service.selectedExpense()).toEqual(clickedExpense);
  });

  it('should update delete the expense', () => {
    const sampleExpenses: Expense[] = [
      {
        id: 2,
        date: '2026-09-05',
        description: 'meralco',
        type: 'Bills',
        price: 6000,
      },
      {
        id: 3,
        date: '2026-09-02',
        description: 'coffee',
        type: 'Food',
        price: 89,
      },
    ];
    const deleteId = 3;

    sampleExpenses.forEach((expense) => service.addExpense(expense));

    service.deleteExpense(deleteId);

    expect(service.expenses().find((expense) => expense.id === deleteId)).toBeUndefined();
    expect(service.expenses().length).toBe(1);
  });
});
