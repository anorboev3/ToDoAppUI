export interface ToDoItemModel {
  id: string;
  title: string;
  description?: string;
  dateOfCreation: Date;
  UpdatedAt: Date;
  status: ToDoItemStatus;
  isDeleted: boolean;
}

export interface ToDoItemsListModel {
  totalCount: number;
  currentPageCount: number;
  toDoItems: ToDoItemModel[];
}

export interface CreateToDoItemModel {
  title: string;
  description?: string;
}

export interface UpdateToDoItemModel {
  title: string;
  description?: string;
  status: ToDoItemStatus;
}

export interface UpdateToDoItemStatusModel {
  status: ToDoItemStatus;
}

export enum ToDoItemStatus {
  Active = 0,
  Completed = 1,
}
