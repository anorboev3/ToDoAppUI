import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToDoService } from '../shared/services/to-do.service';
import { ToDoItemModel, ToDoItemStatus } from '../shared/interfaces';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule, DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateToDoItemComponent } from '../shared/components/create-to-do-item/create-to-do-item.component';
import { UpdateToDoItemComponent } from '../shared/components/update-to-do-item-component/update-to-do-item-component.component';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarConfig,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-to-do-list-page',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './to-do-list-page.component.html',
  styleUrl: './to-do-list-page.component.scss',
})
export class ToDoListPageComponent implements OnInit {
  toDoItems!: ToDoItemModel[];
  totalCount!: number;
  pageSize: number = 10;
  pageNumber: number = 1;
  status!: ToDoItemStatus;
  displayedColumns: string[] = [
    'title',
    'description',
    'dateOfCreation',
    'status',
    'actions',
  ];
  statusFilteringOptions = [
    {
      name: 'All',
      key: undefined,
    },
    {
      name: 'Active',
      key: ToDoItemStatus.Active,
    },
    {
      name: 'Completed',
      key: ToDoItemStatus.Completed,
    },
  ];
  statusTypes = [
    {
      name: 'Active',
      key: ToDoItemStatus.Active,
    },
    {
      name: 'Completed',
      key: ToDoItemStatus.Completed,
    },
  ];

  constructor(public toDoService: ToDoService, public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getToDoItems();
  }

  getToDoItems(event?: any) {
    const pageIndex = event ? event.pageIndex + 1 : this.pageNumber;
    const pageSize = event ? event.pageSize : this.pageSize;

    this.toDoService
      .getToDoItemsList(pageSize, pageIndex, this.status)
      .subscribe(
        (response: any) => {
          this.toDoItems = response.toDoItems;
          this.totalCount = response.totalCount;
        },
        (error) => {
          alert(error.error);
        }
      );
  }

  deleteAllCompleted() {
    this.toDoService.deleteAllCompletedToDoItems().subscribe(
      () => {
        this.getToDoItems()
        this.openSnackBar("All Compleated To Do Items status was deleted.");
      },
      (error) => {
        alert(error.error);
      }
    );
  }

  deleteItem(id: string) {
    this.toDoService.deleteToDoItem(id).subscribe(
      () => {
        this.getToDoItems();
        this.openSnackBar("To Do Item status was deleted.");
      },
      (error) => {
        alert(error.error);
      }
    );
  }

  createToDoItem() {
    const dialogRef = this.dialog.open(CreateToDoItemComponent, {
      width: '400px',
      height: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.getToDoItems();
        this.openSnackBar("To Do Item was created.");
      }
    });
  }

  updateItem(item: ToDoItemModel) {
    const dialogRef = this.dialog.open(UpdateToDoItemComponent, {
      width: '400px',
      height: '400px',
      data: item
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.getToDoItems();
        this.openSnackBar("To Do Item was updated.");
      }
    });
  }

  updateItemStatus(id: string, event?: any) {
    this.toDoService.updateToDoItemStatus(id, event.value).subscribe(
      () => {
        this.getToDoItems();
        this.openSnackBar("To Do Item status was updated.");
      },
      (error) => {
        alert(error.error);
      }
    );
  }

  getStatusDisplayName(status: ToDoItemStatus) {
    return status === ToDoItemStatus.Active ? "Active" : "Completed";
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
