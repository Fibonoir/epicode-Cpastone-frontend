import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PropertyType } from '../../../interfaces/enums/PropertyType';
import { ListingType } from '../../../interfaces/enums/ListingType';
import { PropertyCondition } from '../../../interfaces/enums/PropertyCondition';
import { InsertionService } from '../../../services/insertion.service';
import { InsertionResponse } from '../../../interfaces/listings/InsertionResponse';
import { createAdForm } from '../../layout/ad-form/ad-form.config';
import { SavedImage } from '../../../interfaces/saved-image.model';
import { InsertionUpdate } from '../../../interfaces/listings/InsertionUpdate';
import { DragStateService } from '../../../services/drag-state.service';
import { smoothScrollToTop } from '../../../configs/smooth-scroll';
import { InvalidFormComponent } from '../../reusables/invalid-form/invalid-form.component';
import { ValidationMessageComponent } from '../../reusables/validation-message/validation-message.component';
import { SectionTitleComponent } from '../../reusables/section-title/section-title.component';
import { SeparatorComponent } from '../../reusables/separator/separator.component';
import { ImageUploadComponent } from '../../reusables/image-upload/image-upload.component';
import { InputComponent } from '../../reusables/input/input.component';
import {
    CdkDragDrop,
    DragDropModule,
    moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-update-insertion',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DragDropModule,
        InputComponent,
        ImageUploadComponent,
        SeparatorComponent,
        SectionTitleComponent,
        ValidationMessageComponent,
        InvalidFormComponent,
    ],
    templateUrl: './update-insertion.component.html',
    styleUrl: './update-image.component.css',
})
export class UpdateInsertionComponent implements OnInit {
    @Input() insertion!: InsertionResponse;
    @Output() updatedSuccessful = new EventEmitter<boolean>();
    @Output() delete = new EventEmitter<string>();

    updateInsertionForm!: FormGroup;
    submitting: boolean = false;
    isInvalid: boolean = false;
    selectedFiles: File[] = [];
    existingPhotos: SavedImage[] = [];

    isConfirmModalVisible: boolean = false;
    photoIndexToDelete: number | null = null;

    propertyTypes = Object.values(PropertyType);
    listingTypes = Object.values(ListingType);
    propertyConditions = Object.values(PropertyCondition);

    constructor(
        private fb: FormBuilder,
        private insertionService: InsertionService,
        public dragStateService: DragStateService
    ) {}

    ngOnInit(): void {
        this.updateInsertionForm = createAdForm(this.fb);

        this.updateInsertionForm.patchValue({
            title: this.insertion.title,
            description: this.insertion.description,
            price: this.insertion.price,
            listingType: this.insertion.listingType,
            propertyType: this.insertion.propertyType,
            condition: this.insertion.condition,
            address: this.insertion.address,
            city: this.insertion.city,
            province: this.insertion.province,
            postalCode: this.insertion.postalCode,
            totalArea: this.insertion.totalArea,
            livingArea: this.insertion.livingArea,
            bedrooms: this.insertion.bedrooms,
            bathrooms: this.insertion.bathrooms,
            hasHeating: this.insertion.hasHeating,
            hasAirConditioning: this.insertion.hasAirConditioning,
            hasParking: this.insertion.hasParking,
            hasElevator: this.insertion.hasElevator,
            hasBalcony: this.insertion.hasBalcony,
            hasGarden: this.insertion.hasGarden,
            hasSwimmingPool: this.insertion.hasSwimmingPool,
            isFurnished: this.insertion.isFurnished,
            energyRating: this.insertion.energyRating,
        });

        this.existingPhotos = this.insertion.photos
            ? [...this.insertion.photos]
            : [];
    }

    onDragStarted() {
        this.dragStateService.setGrabbing(true);
    }

    onDragEnded() {
        this.dragStateService.setGrabbing(false);
    }

    openConfirmModal(index: number): void {
        this.photoIndexToDelete = index;
        this.isConfirmModalVisible = true;
    }

    confirmDeletion(): void {
        if (this.photoIndexToDelete !== null) {
            this.existingPhotos.splice(this.photoIndexToDelete, 1);
        }
        this.isConfirmModalVisible = false;
        this.photoIndexToDelete = null;
    }

    cancelDeletion(): void {
        this.isConfirmModalVisible = false;
        this.photoIndexToDelete = null;
    }

    deleteInsertion() {
        this.delete.emit('delete');
    }

    dropExistingPhotos(event: CdkDragDrop<SavedImage[]>): void {
        if (event.previousIndex === event.currentIndex) {
            return; // no change
        }
        moveItemInArray(
            this.existingPhotos,
            event.previousIndex,
            event.currentIndex
        );
    }

    onPhotosChange(photos: string[]): void {}

    onFilesChange(files: File[]): void {
        this.selectedFiles = files;
    }

    removeExistingPhoto(index: number): void {
        this.existingPhotos.splice(index, 1);
    }

    onSubmit(): void {
        this.isInvalid = false;
        if (this.updateInsertionForm.invalid) {
            console.error('Form is invalid');
            this.isInvalid = true;
            this.submitting = false;
            return;
        }

        this.submitting = true;

        const updateData: InsertionUpdate = {
            ...this.updateInsertionForm.value,
            existingPhotos: this.existingPhotos,
        };

        this.insertionService
            .updateInsertion(this.insertion.id, updateData, this.selectedFiles)
            .subscribe({
                next: (updatedInsertion) => {
                    console.log('Insertion updated:', updatedInsertion);
                    this.submitting = false;
                    this.updatedSuccessful.emit(true);
                    smoothScrollToTop(600);
                },
                error: (err) => {
                    console.error('Error updating insertion:', err);
                    this.submitting = false;
                },
            });
    }
}
