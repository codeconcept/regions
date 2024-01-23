import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import Region from '../interfaces/region';

@Injectable({
  providedIn: 'root',
})
export class RegionsService {
  private REGIONS_URL = 'https://geo.api.gouv.fr/regions?fields=nom,code';
  http = inject(HttpClient);

  getRegions(): Observable<Region[]> {
    return this.http
      .get<Region[]>(this.REGIONS_URL)
      .pipe(tap((data) => console.log(data)));
  }
}
