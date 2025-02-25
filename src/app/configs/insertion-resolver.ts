import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { InsertionResponse } from '../interfaces/listings/InsertionResponse';
import { InsertionService } from '../services/insertion.service';

@Injectable({ providedIn: 'root' })
export class InsertionsResolver implements Resolve<InsertionResponse[]> {
  constructor(private insertionService: InsertionService) {}

  resolve(): Observable<InsertionResponse[]> {
    return this.insertionService.getInsertions();
  }
}
