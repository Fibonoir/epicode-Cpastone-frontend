import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { InsertionResponse } from '../../../interfaces/listings/InsertionResponse';
import { CommonModule } from '@angular/common';
import { InsertionService } from '../../../services/insertion.service';
import { fadeSlide } from '../../../animations/fadeslide';
import { ImageCarouselComponent } from '../../reusables/image-carousel/image-carousel.component';
import { CallModalComponent } from '../../reusables/call-modal/call-modal.component';
import { UpdateInsertionComponent } from '../update-insertion/update-insertion.component';

@Component({
    selector: 'app-single-insertion',
    imports: [
        CommonModule,
        ImageCarouselComponent,
        CallModalComponent,
        UpdateInsertionComponent,
    ],
    templateUrl: './single-insertion.component.html',
    styles: ``,
    animations: [fadeSlide],
})
export class SingleInsertionComponent implements OnChanges {
    @Input() insertion: InsertionResponse | null = null;
    @Input() isClientView!: boolean
    @Output() goBack = new EventEmitter<void>();
    @Output() updatingSuccessful = new EventEmitter<void>();
    @Output() deletionSuccessful = new EventEmitter<void>();

    callModal!: boolean;
    deleteModal!: boolean;
    updating: boolean = false;
    deleting: boolean = false;
    deletionError: boolean = false;

    constructor(public insertionService: InsertionService) {}

    energyRatingColors: { [key: string]: string } = {
        A: 'bg-green-600',
        B: 'bg-teal-600',
        C: 'bg-lime-400',
        D: 'bg-yellow-300',
        E: 'bg-yellow-500',
        F: 'bg-amber-600',
        G: 'bg-red-700',
    };

    ngOnChanges(changes: SimpleChanges): void {
        if(this.isClientView){
            this.updating = false
        }
    }

    getEnergyRating(): string {
        const rating = this.insertion?.energyRating.toUpperCase();

        for (const key of Object.keys(this.energyRatingColors)) {
            if (rating?.includes(key)) {
                return this.energyRatingColors[key];
            }
        }

        return 'bg-gray-600';
    }

    openModal(selected: string) {
        if (selected === 'delete') {
            this.deletionError = false;
            this.deleteModal = true;
            return;
        }

        this.callModal = true;
    }

    closeModal(selected: string) {
        if (selected === 'delete') {
            this.deletionError = false;
            this.deleteModal = false;
            return;
        }

        this.callModal = false;
    }

    successfulUpdate(): void {
        if (this.insertion) {
            this.insertionService
                .getSingleInsertion(this.insertion.id)
                .subscribe({
                    next: (updatedInsertion) => {
                        this.insertion = updatedInsertion;
                        this.updatingSuccessful.emit();
                        this.updating = false;
                    },
                    error: (error) => {
                        console.error('Failed to update insertion:', error);
                        this.updating = false;
                    },
                });
        } else {
            this.updating = false;
        }
    }

    deleteInsertion(id: number): void {
        this.deletionError = false;
        this.deleting = true;

        this.insertionService.deleteInsertion(id).subscribe({
            next: () => {
                console.log('Deletion successful');
                this.deleting = false;
                this.deleteModal = false;
                this.deletionSuccessful.emit();
                this.goBack.emit();
            },
            error: () => {
                console.log('Error deleting insertion with id: ', id);
                this.deleting = false;
                this.deletionError = true;
            },
        });
    }
}
