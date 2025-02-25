import { forkJoin, map } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
import { createAdForm } from './ad-form.config';
import { InsertionService } from '../../../services/insertion.service';
import { InsertionResponse } from '../../../interfaces/listings/InsertionResponse';
import { InputComponent } from '../../reusables/input/input.component';
import { ImageUploadComponent } from '../../reusables/image-upload/image-upload.component';
import { SeparatorComponent } from '../../reusables/separator/separator.component';
import { SectionTitleComponent } from '../../reusables/section-title/section-title.component';
import { ValidationMessageComponent } from '../../reusables/validation-message/validation-message.component';
import { InvalidFormComponent } from '../../reusables/invalid-form/invalid-form.component';


@Component({
    selector: 'app-ad-form',
    standalone: true,
    imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    ImageUploadComponent,
    SeparatorComponent,
    SectionTitleComponent,
    ValidationMessageComponent,
    InvalidFormComponent
],
    templateUrl: './ad-form.component.html',
    styles: [],
})
export class AdFormComponent implements OnInit {

    @Output() submitSuccessful = new EventEmitter<void>()

    insertionForm!: FormGroup;

    propertyTypes = Object.values(PropertyType);
    listingTypes = Object.values(ListingType);
    propertyConditions = Object.values(PropertyCondition);

    selectedFiles: File[] = [];
    secureURLs: string[] = [];

    isInvalid: boolean = false;

    insertions: InsertionResponse[] = [];

    submitting: boolean = false;

    constructor(
        private fb: FormBuilder,
        private insertionService: InsertionService
    ) {}

    ngOnInit(): void {
        this.insertionForm = createAdForm(this.fb);
    }

    onPhotosChange(photos: string[]): void {
        this.insertionForm.patchValue({ photos });
    }

    onFilesChange(files: File[]): void {
        this.selectedFiles = files;
    }

    onSubmit(): void {
        this.isInvalid = false;
        if (this.insertionForm.invalid) {
            console.error('Form is invalid');
            this.isInvalid = true;
            this.submitting = false;
            return;
        }
        this.submitting = true;

        const formData = new FormData();

        Object.keys(this.insertionForm.value).forEach((key) => {
            if (key !== 'photos') {
                formData.append(key, this.insertionForm.value[key]);
            }
        });

        if (this.selectedFiles && this.selectedFiles.length > 0) {
            this.selectedFiles.forEach((file) => {
                formData.append('photos', file);
            });
        }

        this.insertionService.createInsertion(formData).subscribe({
            next: (response) => {
                this.submitting = false;
                console.log('Insertion created:', response);
                this.submitSuccessful.emit()
            },
            error: (err) => {
                this.submitting = false
                console.error('Error creating insertion:', err);
            },
        });
    }
}
