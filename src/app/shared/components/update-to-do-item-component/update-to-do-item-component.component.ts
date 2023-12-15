import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToDoService } from '../../services/to-do.service';
import { CreateToDoItemModel, ToDoItemModel, ToDoItemStatus, UpdateToDoItemModel } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-update-to-do-item-component',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule, MatSelectModule ],
  templateUrl: './update-to-do-item-component.component.html',
  styleUrl: './update-to-do-item-component.component.scss'
})
export class UpdateToDoItemComponent {
  form: FormGroup;

  statusOptions = [
    {
      name: 'Active',
      key: ToDoItemStatus.Active,
    },
    {
      name: 'Completed',
      key: ToDoItemStatus.Completed,
    },
  ];

  constructor(private fb: FormBuilder, public toDoService: ToDoService, private dialogRef: MatDialogRef<UpdateToDoItemComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      title: [this.data.title, Validators.required],
      description: [this.data.description],
      status: [this.data.status]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      let updateToDoItme: UpdateToDoItemModel = {
        title: this.form.get("title")?.value,
        description: this.form.get("description")?.value,
        status: this.form.get("status")?.value,
      }
      this.toDoService.updateToDoItem(this.data.id, updateToDoItme).subscribe(
        (response: any) => {
          this.dialogRef.close(response)
        },
        (error) => {
          alert(error.error);
        }
      );
    }
  }

  getStatusDisplayName(status: ToDoItemStatus) {
    return status === ToDoItemStatus.Active ? "Active" : "Completed"
  }
}
