import { Injectable, signal, Signal } from "@angular/core";
import { ApiService } from ".";
import { catchError, map, Observable, of } from "rxjs";
import { GasTypeDto } from "@shared/models/dtos.interface";
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable({
    providedIn: 'root',
})
export class GasService {

    constructor(private apiService: ApiService) { }

    getGasTypes(): Observable<GasTypeDto[]> {
        return this.apiService.get<GasTypeDto[]>('gas/types').pipe(
            map(response => response.data),
            catchError(error => {
                console.error('Error fetching gas types:', error, 'Using mock data instead.');

                return of(this.mockGasTypes);
            })
        );
    }

    // public gasTypes: Signal<GasTypeDto[] | undefined> = toSignal(this.getGasTypes());

    getGasTypeById(id: number): Observable<GasTypeDto | undefined> {
        return this.getGasTypes().pipe(
            map(gasTypes => gasTypes.find(gasType => gasType.id === id))
        );
    }

    private mockGasTypes: GasTypeDto[] = [
        { id: 1, name: 'Regular' },
        { id: 2, name: 'Mid-Grade' },
        { id: 3, name: 'Premium' },
        { id: 4, name: 'Diesel' },
        { id: 5, name: 'Biodiesel' },
        { id: 6, name: 'E85' },
        { id: 7, name: 'Natural' },
        { id: 8, name: 'Petroleum' },
        { id: 9, name: 'Hydrogen' },
        { id: 10, name: 'Electric' },
    ];

    public gasTypes = signal<GasTypeDto[]>(this.mockGasTypes);

}
