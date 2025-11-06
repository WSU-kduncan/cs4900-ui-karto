export interface Car {
    vin: string;
    image: string;
    userEmail: string;
    make: string;
    model: string;
    year: number;
    color: string;
    mileage: number;
    gasType: GasType;
}

export interface GasType {
    id: number;
    name: string;
}