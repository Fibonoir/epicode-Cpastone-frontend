import { ListingType } from "../enums/ListingType";
import { PropertyCondition } from "../enums/PropertyCondition";
import { PropertyType } from "../enums/PropertyType";
import { SavedImage } from "../saved-image.model";

export interface InsertionUpdate {
    title: string;
    description?: string;
    propertyType: PropertyType;
    listingType: ListingType;
    price: number;

    // Location details
    address: string;
    city: string;
    province: string;
    postalCode: string;

    // Property size
    totalArea: number;
    livingArea?: number;

    // Rooms
    bedrooms: number;
    bathrooms: number;
    additionalRooms?: number;

    // Floor Information
    floorNumber?: number;
    totalFloors?: number;
    yearBuilt?: number;

    condition: PropertyCondition;

    // Amenities
    energyRating?: string;
    hasHeating?: boolean;
    hasAirConditioning?: boolean;
    hasParking?: boolean;
    hasElevator?: boolean;
    hasBalcony?: boolean;
    hasGarden?: boolean;
    hasSwimmingPool?: boolean;
    isFurnished?: boolean;

    // Image Handling Fields
    existingPhotos?: SavedImage[];
    newPhotos?: File[];
  }