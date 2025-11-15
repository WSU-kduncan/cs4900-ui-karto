import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  timestamp: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * GET request - handles Spring Boot ResponseEntity responses
   */
  get<T>(endpoint: string, params?: any): Observable<ApiResponse<T>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== null && params[key] !== undefined) {
          if (params[key] instanceof Date) {
            httpParams = httpParams.set(key, params[key].toISOString());
          } else {
            httpParams = httpParams.set(key, params[key].toString());
          }
        }
      });
    }

    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params: httpParams }).pipe(
      map((data) => ({
        success: true,
        data: data,
        timestamp: new Date(),
      })),
    );
  }

  /**
   * GET request for paginated data
   */
  getPaginated<T>(endpoint: string, params?: any): Observable<PaginatedResponse<T>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== null && params[key] !== undefined) {
          if (params[key] instanceof Date) {
            httpParams = httpParams.set(key, params[key].toISOString());
          } else {
            httpParams = httpParams.set(key, params[key].toString());
          }
        }
      });
    }

    return this.http.get<PaginatedResponse<T>>(`${this.baseUrl}/${endpoint}`, {
      params: httpParams,
    });
  }

  /**
   * POST request - handles Spring Boot ResponseEntity responses
   */
  post<T>(endpoint: string, data: any): Observable<ApiResponse<T>> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data).pipe(
      map((response) => ({
        success: true,
        data: response,
        timestamp: new Date(),
      })),
    );
  }

  /**
   * PUT request - handles Spring Boot ResponseEntity responses
   */
  put<T>(endpoint: string, data: any): Observable<ApiResponse<T>> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data).pipe(
      map((response) => ({
        success: true,
        data: response,
        timestamp: new Date(),
      })),
    );
  }

  /**
   * PATCH request - handles Spring Boot ResponseEntity responses
   */
  patch<T>(endpoint: string, data: any): Observable<ApiResponse<T>> {
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, data).pipe(
      map((response) => ({
        success: true,
        data: response,
        timestamp: new Date(),
      })),
    );
  }

  /**
   * DELETE request - handles Spring Boot ResponseEntity responses
   */
  delete<T>(endpoint: string): Observable<ApiResponse<T>> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`).pipe(
      map(() => ({
        success: true,
        data: null as T,
        timestamp: new Date(),
      })),
    );
  }
}
