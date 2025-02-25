import { CommonModule } from '@angular/common';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar',
    imports: [CommonModule],
    templateUrl: './navbar.component.html',
    styles: ``,
})
export class NavbarComponent implements OnInit {
    isLogged!: boolean
    imageUrl: string =
        'https://masterbundles.com/wp-content/uploads/2023/04/real-estate-building-logo-2-785.jpg';

    constructor(public authService: AuthService) {}

    ngOnInit(): void {
        this.authService.isLoggedIn$.subscribe((value) => {
            this.isLogged = value
        })
    }

    logOut() {
        this.authService.logout()
    }
}
