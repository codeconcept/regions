import {
  Component,
  OnDestroy,
  OnInit,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RegionsService } from './services/regions.service';
import { Subscription, tap } from 'rxjs';
import Region from './interfaces/region';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription = this.regionsService
      .getRegions()
      .pipe(
        tap((data) => {
          this.regions = data;
          this.regionsSig.set(data);
        })
      )
      .subscribe();

    this.departmentsSub = this.textControl.valueChanges
      .pipe(tap((data) => console.log({ departmentFilter: data.toUpperCase() })))
      .subscribe();
  }
  title = 'regions';
  regionsSig = signal<Region[]>([]);
  regions: Region[] = [];
  regionsService = inject(RegionsService);
  selectedRegionSig = this.regionsService.selectedRegionSig;
  subscription!: Subscription;
  departmentsSub!: Subscription;

  regionDepartmentsSig = this.regionsService.regionDepartments;
  filterBySig = signal<string>('');

  filterEffect = effect(() => {
    console.log(this.filterBySig().toLocaleLowerCase());

    this.regions = this.regionsSig().filter((reg) =>
      reg.Name.toLocaleLowerCase().startsWith(
        this.filterBySig().toLocaleLowerCase()
      )
    );
    console.log({ filteredRegions: this.regions });
  });

  textControl = new FormControl();

  selectRegion(region: Region) {
    this.selectedRegionSig.set(region);
  }
}
