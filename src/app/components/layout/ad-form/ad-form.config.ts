import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export function createAdForm(fb: FormBuilder): FormGroup {
  return fb.group({
    title: ['', Validators.required],
    description: [''],
    propertyType: ['', Validators.required],
    listingType: ['', Validators.required],
    price: ['', [Validators.required, Validators.min(0.01)]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    province: ['', Validators.required],
    postalCode: ['', Validators.required],
    totalArea: ['', [Validators.required, Validators.min(0.01)]],
    livingArea: [''],
    bedrooms: ['', [Validators.required, Validators.min(0)]],
    bathrooms: ['', [Validators.required, Validators.min(0)]],
    additionalRooms: [''],
    floorNumber: [''],
    totalFloors: [''],
    yearBuilt: [''],
    condition: ['', Validators.required],
    hasHeating: [false],
    hasAirConditioning: [false],
    hasParking: [false],
    hasElevator: [false],
    hasBalcony: [false],
    hasGarden: [false],
    hasSwimmingPool: [false],
    isFurnished: [false],
    energyRating: [''],
    photos: [[]],
  });
}
