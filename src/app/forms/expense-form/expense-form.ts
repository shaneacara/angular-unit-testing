import { DatePipe } from '@angular/common';
import { Component, computed, effect, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExpenseService } from '../../services/expense-service';

@Component({
  selector: 'app-expense-form',
  imports: [ReactiveFormsModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.scss',
  providers: [DatePipe],
})
export class ExpenseForm implements OnInit {
  formBuilder = inject(FormBuilder); // inject formbuilder
  datePipe = inject(DatePipe);
  expenseForm: FormGroup; // decalare formgroup

  isEditMode = computed(() => this.expenseService.selectedExpense() !== null);

  constructor(private expenseService: ExpenseService) {
    this.expenseForm = this.formBuilder.group({
      date: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
      description: ['test', Validators.required],
      type: ['Bills', Validators.required],
      price: [
        10,
        [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
    });

    effect(() => {
      const selected = this.expenseService.selectedExpense();

      if (selected) {
        this.expenseForm.patchValue({
          date: selected.date,
          description: selected.description,
          type: selected.type,
          price: selected.price,
        });
      }
    });
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.expenseForm.invalid) {
      this.expenseForm.markAllAsTouched();
      return;
    }

    const data = { id: crypto.randomUUID(), ...this.expenseForm.getRawValue() };

    if (this.isEditMode()) {
      const selected = this.expenseService.selectedExpense();

      if (!selected) return;

      this.expenseService.updateExpense(selected.id, data);
    } else {
      this.expenseService.addExpense(data);
    }

    this.expenseForm.reset();
    this.expenseService.clearSelectedExpense();
  }

  delete() {
    const selected = this.expenseService.selectedExpense();
    if (!selected) return;
    this.expenseService.deleteExpense(selected.id);
    this.expenseForm.reset();
    this.expenseService.clearSelectedExpense();
  }
}
