export interface CarDto {
  vin: string;
  image?: string;
  userEmail: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  gasType: GasTypeDto;
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
  date: string;
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
  name: string;
  address: string;
}
