import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/layout/navbar/navbar.component";
import { footerComponent } from "./components/layout/footer/footer.component";


@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavbarComponent, footerComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'immobiliare365';
}
