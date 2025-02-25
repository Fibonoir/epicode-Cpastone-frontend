import { LoginResponse } from './../interfaces/LoginResponse';
import { Injectable } from '@angular/core';
import { environment } from '../../envrionments/environment';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private loginUrl: string = environment.API_URL + 'admin/login';
    private refreshAuthUrl = environment.API_URL + 'auth/refresh';
    private tokenKey: string = 'accessToken';
    private refreshTokenKey: string = 'refreshToken';
    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this.isLoggedInSubject.asObservable();

    public accessToken$ = new BehaviorSubject<string | null>(this.getToken());

    constructor(private http: HttpClient, private router: Router) {
        if (this.getLoginState()) {
            this.isLoggedInSubject.next(true);
        } else {
            this.isLoggedInSubject.next(false)
        }

    }

    login(email: string, password: string): Observable<LoginResponse> {
        return this.http
            .post<LoginResponse>(this.loginUrl, { email, password })
            .pipe(
                tap((response) => {
                    this.isLoggedInSubject.next(true);
                    localStorage.setItem('isLogged', JSON.stringify(true));

                    this.setTokens(
                        response.data.accessToken,
                        response.data.refreshToken
                    );
                })
            );
    }

    private setTokens(accessToken: string, refreshToken: string): void {
        localStorage.setItem(this.tokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
        this.accessToken$.next(accessToken);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(this.refreshTokenKey);
    }

    logout(): void {
        this.isLoggedInSubject.next(false);
        localStorage.setItem('isLogged', JSON.stringify(false));

        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.refreshTokenKey);
        this.accessToken$.next(null);
        this.router.navigate(['/login']);
    }

    getLoginState() {
        const storedState = localStorage.getItem('isLogged')
        return storedState ? JSON.parse(storedState) : false
    }

    refreshToken(): Observable<LoginResponse> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            return throwError(() => new Error('No refresh token available'));
        }
        return this.http
            .post<LoginResponse>(this.refreshAuthUrl, { token: refreshToken })
            .pipe(
                tap((response) => {
                    this.setTokens(
                        response.data.accessToken,
                        response.data.refreshToken
                    );
                }),
                catchError((error) => {
                    this.logout();
                    return throwError(() => error);
                })
            );
    }
}
