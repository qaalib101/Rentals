export type Rental = {
    id: number;
    address: string;
    city: string;
    state: string;
    zipCode: number;
    bedrooms: number;
    bathrooms: number;
    monthlyRent: number;
    securityDeposit: number;
    petsAllowed: boolean;
    availableDate: Date;
};
