import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError, map, Observable } from 'rxjs';
import { UserDto } from '@shared/models/dtos.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  createUser(request: CreateUserRequest): Observable<UserDto> {
    return this.apiService.post<UserDto>('user', request).pipe(
      map(response => response.data)
    )
  }
}

export interface CreateUserRequest {
  email: string;
  username: string;
  password: string;
}
