import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RegionsService } from './services/regions.service';
import { Observable } from 'rxjs';
import Region from './interfaces/region';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.regions$ = this.regionsService.getRegions();
  }
  title = 'regions';
  regions$ = new Observable<Region[]>();
  regionsService = inject(RegionsService);
}
