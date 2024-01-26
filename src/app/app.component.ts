import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RegionsService } from './services/regions.service';
import { Subscription, tap } from 'rxjs';
import Region from './interfaces/region';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
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
      .pipe(tap((data) => this.regionsSig.set(data)))
      .subscribe();
  }
  title = 'regions';
  regionsSig = signal<Region[]>([]);
  regionsService = inject(RegionsService);
  subscription!: Subscription;
}
