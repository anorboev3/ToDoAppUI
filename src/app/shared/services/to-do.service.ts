import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreateToDoItemModel, ToDoItemModel, ToDoItemsListModel, UpdateToDoItemModel, ToDoItemStatus, UpdateToDoItemStatusModel } from "../interfaces";
import { environment } from "../../../environments/environment.dev";


@Injectable({
    providedIn: 'root'
})

export class ToDoService {
    constructor(private http: HttpClient) {}

    getToDoItem(id: string): Observable<ToDoItemModel>{
        return this.http.get<ToDoItemModel>(`${environment.serverUrl}/ToDoItem/${id}/`)
    }

    getToDoItemsList(pageSize: number, pageNumber: number, status?: ToDoItemStatus): Observable<ToDoItemsListModel>{
        let params = new HttpParams()
            .set('pageSize', pageSize.toString())
            .set('pageNumber', pageNumber.toString());

        if (status !== undefined) {
            params = params.set('toDoItemStatus', status);
        }

        return this.http.get<ToDoItemsListModel>(`${environment.serverUrl}/ToDoItem/`, {params: params})
    }

    createToDoItem(item: CreateToDoItemModel): Observable<ToDoItemModel>{
        return this.http.post<ToDoItemModel>(`${environment.serverUrl}/ToDoItem/`, item);
    }

    updateToDoItem(id: string, item: UpdateToDoItemModel): Observable<ToDoItemModel>{
        return this.http.put<ToDoItemModel>(`${environment.serverUrl}/ToDoItem/${id}`, item);
    }

    updateToDoItemStatus(id: string, status: ToDoItemStatus): Observable<ToDoItemModel>{
        let model: UpdateToDoItemStatusModel = {
            status: status
        }
        return this.http.put<ToDoItemModel>(`${environment.serverUrl}/ToDoItem/update-status/${id}`, {status} );
    }

    deleteToDoItem(id: string): Observable<ToDoItemModel>{
        return this.http.delete<ToDoItemModel>(`${environment.serverUrl}/ToDoItem/${id}`);
    }

    deleteAllCompletedToDoItems(): Observable<ToDoItemModel>{
        return this.http.delete<ToDoItemModel>(`${environment.serverUrl}/ToDoItem/delete-all-completed`);
    }
}