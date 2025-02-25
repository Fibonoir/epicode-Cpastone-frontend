import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private readonly localStorageKey = 'isDarkTheme';
    private isDarkSubject = new BehaviorSubject<boolean>(this.getInitialTheme());
    isDark$ = this.isDarkSubject.asObservable();

    constructor(@Inject(DOCUMENT) private document: Document) {
        if (this.isDarkSubject.value) {
            this.document.documentElement.classList.add('dark');
        } else {
            this.document.documentElement.classList.remove('dark');
        }
    }

    toggleTheme(): void {
        const nextValue = !this.isDarkSubject.value;
        this.isDarkSubject.next(nextValue);
        localStorage.setItem(this.localStorageKey, JSON.stringify(nextValue));

        if (nextValue) {
            this.document.documentElement.classList.add('dark');
        } else {
            this.document.documentElement.classList.remove('dark');
        }
    }

    private getInitialTheme(): boolean {
        const storedTheme = localStorage.getItem(this.localStorageKey);
        return storedTheme ? JSON.parse(storedTheme) : false;
    }
}
