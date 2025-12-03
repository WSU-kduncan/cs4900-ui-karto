import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError, map, Observable } from 'rxjs';
import {GasStationDto, UserDto} from '@shared/models/dtos.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private localStorageService = inject(LocalStorageService);
  constructor(private apiService: ApiService) {}

  addTrustedGasStation(email: string, gasStationId: number): Observable<GasStationDto> {
    return this.apiService.post<GasStationDto>(`user/${email}/trustedStations/${gasStationId}`, null).pipe(
      map((response) => response.data));
  }

  createUser(request: CreateUserRequest): Observable<UserDto> {
    return this.apiService.post<UserDto>('user', request).pipe(map((response) => response.data));
  }

  login(request: LoginRequest): Observable<void> {
    return this.apiService.post('user/login', request).pipe(
      map((response) => {
        console.log('Login successful: ', response);
        var data = response.data as LoginResponse;
        this.localStorageService.accessToken = data.token;
        this.localStorageService.email = data.details.email;
        this.localStorageService.username = data.details.username;
      }),
    );
  }
}

interface LoginResponse {
  token: string;
  details: UserDto;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateUserRequest {
  email: string;
  username: string;
  password: string;
}
