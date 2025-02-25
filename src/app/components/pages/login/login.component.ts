import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { environment } from '../../../../envrionments/environment';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styles: ``,
})
export class LoginComponent implements OnInit{
    apiUrl: string = environment.API_URL + 'admin/login';
    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.authService.logout()
    }
    onSubmit() {
        if (this.loginForm.valid) {
            const { email, password } = this.loginForm.value;

            this.authService.login(email, password).subscribe({
                next: (response) => {
                    console.log('Login successful: ', response.data);
                    this.router.navigate(['/adminArea']);
                },
                error: (error) => {
                    console.log('Login failed: ', error);
                },
            });
        }
    }
}
