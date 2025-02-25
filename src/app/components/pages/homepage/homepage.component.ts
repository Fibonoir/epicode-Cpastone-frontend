import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InsertionResponse } from '../../../interfaces/listings/InsertionResponse';
import { fadeSlide } from '../../../animations/fadeslide';
import { InsertionComponent } from '../../layout/insertion/insertion.component';
import { SingleInsertionComponent } from '../../layout/single-insertion/single-insertion.component';
import { ThemeService } from '../../../services/theme.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-homepage',
    imports: [CommonModule, InsertionComponent, SingleInsertionComponent],
    templateUrl: './homepage.component.html',
    styles: ``,
    animations: [fadeSlide],
})
export class HomepageComponent implements OnInit {
    isDark!: boolean;
    loadingInsertions: boolean = true;
    insertions: InsertionResponse[] = [];
    showingInsertion: boolean = false;
    singleInsertion!: InsertionResponse;

    constructor(
        private route: ActivatedRoute,
        private themeService: ThemeService
    ) {}

    ngOnInit(): void {
        this.insertions = this.route.snapshot.data['insertions'];
        this.loadingInsertions = false;

        this.isDark = this.route.snapshot.data['theme'];
    }

    showInsertion(insertion: InsertionResponse): void {
        this.showingInsertion = true;
        this.singleInsertion = insertion;
    }

    toHomepage() {
        this.showingInsertion = false;
    }

    toggleTheme(): void {
        this.themeService.toggleTheme();
    }
}
