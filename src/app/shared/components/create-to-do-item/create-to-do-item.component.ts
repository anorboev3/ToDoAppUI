import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToDoService } from '../../services/to-do.service';
import { CreateToDoItemModel } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-to-do-item-component',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './create-to-do-item.component.html',
  styleUrl: './create-to-do-item.component.scss'
})
export class CreateToDoItemComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, public toDoService: ToDoService, private dialogRef: MatDialogRef<CreateToDoItemComponent>) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      let newToDoItme: CreateToDoItemModel = {
        title: this.form.get("title")?.value,
        description: this.form.get("description")?.value
      }
      this.toDoService.createToDoItem(newToDoItme).subscribe(
        (response: any) => {
          this.dialogRef.close(response)
        },
        (error) => {
          alert(error.error);
        }
      );
    }
  }
}
