import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fadeSlide } from '../../../animations/fadeslide';
import { Router } from '@angular/router';

@Component({
    selector: 'app-footer',
    imports: [CommonModule],
    templateUrl: './footer.component.html',
    styles: ``,
    animations: [fadeSlide],
})
export class footerComponent {
    constructor(private router: Router) {}

    login() {
        this.router.navigate(['/login'])
    }
}
