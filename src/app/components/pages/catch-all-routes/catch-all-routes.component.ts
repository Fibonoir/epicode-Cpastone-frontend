import { Router } from '@angular/router';
import { ThemeService } from './../../../services/theme.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catch-all-routes',
  imports: [],
  templateUrl: './catch-all-routes.component.html',
  styles: ``
})
export class CatchAllRoutesComponent implements OnInit {
    isDark!: boolean;


    constructor(private themeService: ThemeService, private router: Router) {}

    ngOnInit(): void {
        this.themeService.isDark$.subscribe((value) => {
            this.isDark = value;
        });
    }

    redirect() {
        this.router.navigate(['/adminArea']);
    }
}
