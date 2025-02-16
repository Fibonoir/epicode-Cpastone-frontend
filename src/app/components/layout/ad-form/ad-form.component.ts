import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../ui/input/input.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ImageUploadComponent } from '../../ui/image-upload/image-upload.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export enum PropertyType {
    APARTMENT = 'APARTMENT',
    HOUSE = 'HOUSE',
    VILLA = 'VILLA',
}

export enum ListingType {
    SALE = 'SALE',
    RENT = 'RENT',
}

export enum PropertyCondition {
    NEW = 'NEW',
    GOOD = 'GOOD',
    NEEDS_RENOVATION = 'NEEDS_RENOVATION',
}

@Component({
    selector: 'app-ad-form',
    imports: [
        InputComponent,
        CommonModule,
        ImageUploadComponent,
        ReactiveFormsModule
    ],
    templateUrl: './ad-form.component.html',
    styles: ``,
})
export class AdFormComponent implements OnInit {
    insertionForm!: FormGroup;

    // Arrays for our dropdowns (the enum values):
    propertyTypes = Object.values(PropertyType);
    listingTypes = Object.values(ListingType);
    propertyConditions = Object.values(PropertyCondition);

    ngOnInit(): void {
      this.insertionForm = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl(''),
        propertyType: new FormControl('', Validators.required),
        listingType: new FormControl('', Validators.required),
        price: new FormControl('', [Validators.required, Validators.min(0.01)]),
        address: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        province: new FormControl('', Validators.required),
        postalCode: new FormControl('', Validators.required),
        totalArea: new FormControl('', [Validators.required, Validators.min(0.01)]),
        livingArea: new FormControl(''),
        bedrooms: new FormControl('', [Validators.required, Validators.min(0)]),
        bathrooms: new FormControl('', [Validators.required, Validators.min(0)]),
        additionalRooms: new FormControl(''),
        floorNumber: new FormControl(''),
        totalFloors: new FormControl(''),
        yearBuilt: new FormControl(''),
        condition: new FormControl('', Validators.required),
        hasHeating: new FormControl(false),
        hasAirConditioning: new FormControl(false),
        hasParking: new FormControl(false),
        hasElevator: new FormControl(false),
        hasBalcony: new FormControl(false),
        hasGarden: new FormControl(false),
        hasSwimmingPool: new FormControl(false),
        isFurnished: new FormControl(false),
        energyRating: new FormControl(''),
        photos: new FormControl([]) // This will be updated by the image upload component
      });
    }

    // This method is triggered when the image-upload component emits new photos.
    onPhotosChange(photos: string[]): void {
      this.insertionForm.patchValue({ photos: photos });
    }

    onSubmit(): void {
      if (this.insertionForm.valid) {
        // Here you would typically send this.insertionForm.value to your backend.
        console.log('Submission:', this.insertionForm.value);
      }
    }
}