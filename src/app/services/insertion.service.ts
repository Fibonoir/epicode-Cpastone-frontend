import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../envrionments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { InsertionResponse } from '../interfaces/listings/InsertionResponse';
import { InsertionRequest } from '../interfaces/listings/InsertionCreate';
import { InsertionUpdate } from '../interfaces/listings/InsertionUpdate';

@Injectable({
    providedIn: 'root',
})
export class InsertionService {
    private baseUrl = environment.API_URL + 'api/insertions';
    private insertionsSubject = new BehaviorSubject<InsertionResponse[]>([]);
    insertion$ = this.insertionsSubject.asObservable();

    constructor(private http: HttpClient) {}

    loadInsertions(): void {
        this.http.get<InsertionResponse[]>(this.baseUrl).subscribe({
            next: (insertions) => this.insertionsSubject.next(insertions),
            error: (err) => console.error(err),
        });
    }

    getInsertions(): Observable<InsertionResponse[]> {
        const headers = new HttpHeaders({
            'skipAuthInterceptor': 'true'
          });
        return this.http.get<InsertionResponse[]>(this.baseUrl);
    }

    getSingleInsertion(id: number): Observable<InsertionResponse> {
        return this.http.get<InsertionResponse>(`${this.baseUrl}/${id}`);
    }

    createInsertion(formData: FormData): Observable<InsertionResponse> {
        return this.http.post<InsertionResponse>(this.baseUrl, formData).pipe(
            tap((newInsertion) => {
                const curretnInsertions = this.insertionsSubject.value;
                this.insertionsSubject.next([
                    ...curretnInsertions,
                    newInsertion,
                ]);
            })
        );
    }

    updateInsertion(
        id: number,
        insertion: InsertionUpdate, // your update DTO interface
        newPhotos?: File[] // optional array of new photos
    ): Observable<InsertionResponse> {
        const formData = new FormData();

        // Append the DTO as a JSON blob.
        formData.append(
            'dto',
            new Blob([JSON.stringify(insertion)], { type: 'application/json' })
        );

        // Append each new photo file, if any.
        if (newPhotos) {
            newPhotos.forEach((file) => {
                formData.append('newPhotos', file);
            });
        }

        // Send a PUT request with the FormData payload.
        return this.http
            .put<InsertionResponse>(`${this.baseUrl}/${id}`, formData)
            .pipe(
                tap((updatedInsertion) => {
                    const currentInsertions = this.insertionsSubject.value;
                    const updatedInsertions = currentInsertions.map((ins) =>
                        ins.id === id ? updatedInsertion : ins
                    );
                    this.insertionsSubject.next(updatedInsertions);
                })
            );
    }

    deleteInsertion(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
            tap(() => {
                console.log(`Deletion of insertion with id ${id} successful.`);
                const currentInsertions = this.insertionsSubject.value;
                const updatedInsertions = currentInsertions.filter(
                    (ins) => ins.id !== id
                );
                this.insertionsSubject.next(updatedInsertions);
                console.log('Updated insertions list:', updatedInsertions);
            }),
            catchError((error) => {
                console.error(`Error deleting insertion with id ${id}:`, error);
                return throwError(() => error);
            })
        );
    }
}
