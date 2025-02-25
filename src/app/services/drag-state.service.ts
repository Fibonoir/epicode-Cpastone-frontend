import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DragStateService {
  private isGrabbingSubject = new BehaviorSubject<boolean>(false);
  isGrabbing$ = this.isGrabbingSubject.asObservable();

  setGrabbing(state: boolean): void {
    this.isGrabbingSubject.next(state);
  }

  get isGrabbing(): boolean {
    return this.isGrabbingSubject.value;
  }
}
