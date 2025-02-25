import { SingleInsertionComponent } from '../single-insertion/single-insertion.component';
import { Component, OnInit } from '@angular/core';
import { AdFormComponent } from '../ad-form/ad-form.component';
import { InsertionService } from '../../../services/insertion.service';
import { InsertionResponse } from '../../../interfaces/listings/InsertionResponse';
import { CommonModule } from '@angular/common';
import { InsertionComponent } from '../insertion/insertion.component';
import { fadeSlide } from '../../../animations/fadeslide';
import { ThemeService } from '../../../services/theme.service';
import { Observable } from 'rxjs';
import { DragStateService } from '../../../services/drag-state.service';
import { popUp } from '../../../animations/popUp';
import { smoothScrollToTop } from '../../../configs/smooth-scroll';
import { ToastComponent } from '../../reusables/toast/toast.component';
import { SwitchComponent } from "../../reusables/switch/switch.component";

@Component({
    selector: 'app-dashboard',
    imports: [
    AdFormComponent,
    CommonModule,
    InsertionComponent,
    SingleInsertionComponent,
    ToastComponent,
    SwitchComponent
],
    templateUrl: './dashboard.component.html',
    animations: [fadeSlide, popUp],
    styles: ``,
})
export class DashboardComponent implements OnInit {
    insertion$!: Observable<InsertionResponse[]>;
    loadingInsertions: boolean = true;
    addingListing!: boolean;
    showingInsertion: boolean = false;
    singleInsertion!: InsertionResponse;
    isDark!: boolean;
    clientView: boolean = false

    updateNotification = false;
    createNotification = false;
    deleteNotification = false;
    notificationMessage = '';

    constructor(
        private insertionService: InsertionService,
        private themeService: ThemeService,
        public dragStateService: DragStateService
    ) {}

    ngOnInit(): void {
        this.insertionService.loadInsertions();
        this.insertion$ = this.insertionService.insertion$;

        this.insertion$.subscribe(() => {
            this.loadingInsertions = false;
        });

        this.themeService.isDark$.subscribe((value) => {
            this.isDark = value;
        });
    }

    addListing() {
        this.addingListing = true;
    }

    submissionSuccessful() {
        this.addingListing = false;
        this.createNotification = true;
        smoothScrollToTop(600);
        setTimeout(() => {
            this.createNotification = false;
        }, 3000);
    }

    cancelListing() {
        this.addingListing = false;
    }

    showInsertion(insertion: InsertionResponse): void {
        this.showingInsertion = !this.showingInsertion;
        this.singleInsertion = insertion;
    }

    updateSuccessful() {
        this.updateNotification = true;
        setTimeout(() => {
            this.updateNotification = false;
        }, 3000);
    }

    deletionSuccessful() {
        this.deleteNotification = true;
        smoothScrollToTop(600);
        setTimeout(() => {
            this.deleteNotification = false;
        }, 3000);
    }

    goBack(): void {
        this.showingInsertion = false;
    }

    toggleTheme(): void {
        this.themeService.toggleTheme();
    }

    toggleClienView() {
        this.clientView = !this.clientView
        this.addingListing = false
    }
}
