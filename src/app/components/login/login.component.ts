import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { LoginResponse } from '../../interfaces/LoginResponse';

@Component({
    selector: 'app-login',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styles: ``,
})
export class LoginComponent {
    apiUrl: string = 'http://localhost:8080/admin/login';
    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private http: HttpClient) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            const { email, password } = this.loginForm.value;

            this.http.post<LoginResponse>(this.apiUrl, { email, password }).subscribe({
                next: (response) => {
                    console.log('Login successful: ', response.data);
                    localStorage.setItem('token', response.data.token);
                    window.location.href = '/dashboard';

                },
                error: (error) => {
                    console.log('Login failed: ', error);
                },
            });
        }
    }
}
