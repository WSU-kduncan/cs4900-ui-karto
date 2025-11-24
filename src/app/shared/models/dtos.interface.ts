interface BaseCar {
  vin: string;
  image?: string;
  userEmail: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
}

export interface SerializedCar extends BaseCar {
  gasType: GasTypeDto;
}

export interface CarDto extends BaseCar {
  gasTypeId: number;
}

export interface GasPriceDto {
  id: GasPriceIdDto;
  price: number;
  updated: Date;
}

export interface GasPriceIdDto {
  gasStationId: number;
  gasTypeId: number;
}

export interface GasTypeDto {
  id: number;
  name: string;
}
export interface MaintenanceDto {
  id: number;
  carVin: string;
  date: number;
  mileage: number;
  cost: number;
  receipt: Uint8Array | null;
  itemDetails: MaintenanceItemDetailDto[];
}

export interface MaintenanceItemDetailDto {
  quantity: number;
  comments: string | null;
  id: MaintenanceItemDetailIdDto;
}

export interface MaintenanceItemDetailIdDto {
  maintenanceId: number;
  maintenanceType: MaintenanceTypeDescriptionDto;
}

export interface MaintenanceTypeDescriptionDto {
  id: number;
  name: string;
}

export interface GasStationDto {
  id: number;
  longitude: number;
  latitude: number;
  name: string;
  addressLine: string;
  city: string;
  state: string;
  zip: string;
  userEmails: string[];
}
