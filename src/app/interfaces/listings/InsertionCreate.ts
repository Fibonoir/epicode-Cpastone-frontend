import { ListingType } from "../enums/ListingType";
import { PropertyCondition } from "../enums/PropertyCondition";
import { PropertyType } from "../enums/PropertyType";

export interface InsertionRequest {
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
    hasHeating?: boolean;
    hasAirConditioning?: boolean;
    hasParking?: boolean;
    hasElevator?: boolean;
    hasBalcony?: boolean;
    hasGarden?: boolean;
    hasSwimmingPool?: boolean;
    isFurnished?: boolean;

    energyRating?: string;

    photos?: File[];
  }