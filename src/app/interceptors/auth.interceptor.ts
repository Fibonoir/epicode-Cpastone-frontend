import {
    HttpInterceptorFn,
    HttpErrorResponse,
    HttpHandlerFn,
    HttpRequest,
    HttpEvent,
} from '@angular/common/http';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// Persistent state for refresh logic
let isRefreshing = false;
let refreshTokenSubject = new BehaviorSubject<string | null>(null);

export function authInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
    if (req.headers.has('skipAuthInterceptor')) {
        const headers = req.headers.delete('skipAuthInterceptor');
        return next(req.clone({ headers }));
    }

    const authService = inject(AuthService);
    const token = authService.getToken();
    let authReq = req;
    if (token) {
        authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    return next(authReq).pipe(
        catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                if (!isRefreshing) {
                    isRefreshing = true;
                    refreshTokenSubject.next(null);

                    return authService.refreshToken().pipe(
                        switchMap((response) => {
                            isRefreshing = false;
                            const newToken = response.data.accessToken;
                            refreshTokenSubject.next(newToken);

                            return next(
                                authReq.clone({
                                    setHeaders: {
                                        Authorization: `Bearer ${newToken}`,
                                    },
                                })
                            );
                        }),
                        catchError((err) => {
                            isRefreshing = false;
                            authService.logout();

                            return throwError(() => err);
                        })
                    );
                } else {
                    // Wait for the refreshTokenSubject to emit a non-null token
                    return refreshTokenSubject.pipe(
                        filter((token) => token != null),
                        take(1),
                        switchMap((newToken) => {
                            return next(
                                authReq.clone({
                                    setHeaders: {
                                        Authorization: `Bearer ${newToken}`,
                                    },
                                })
                            );
                        })
                    );
                }
            }
            return throwError(() => error);
        })
    );
}
