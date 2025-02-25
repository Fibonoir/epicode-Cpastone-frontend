import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InsertionResponse } from '../../../interfaces/listings/InsertionResponse';
import { CommonModule } from '@angular/common';
import { CallModalComponent } from '../../reusables/call-modal/call-modal.component';
import { ImageCarouselComponent } from '../../reusables/image-carousel/image-carousel.component';

@Component({
    selector: 'app-insertion',
    imports: [CommonModule, CallModalComponent, ImageCarouselComponent],
    templateUrl: './insertion.component.html',
    styles: ``,
})
export class InsertionComponent {
    @Input() insertion?: InsertionResponse | undefined;
    @Output() singleInsertion = new EventEmitter<InsertionResponse>();

    isModalOpen!: boolean;

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    emitId(insertion: InsertionResponse) {
        this.singleInsertion.emit(insertion);
    }
}
