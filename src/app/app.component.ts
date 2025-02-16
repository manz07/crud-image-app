import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Kucing } from './models/kucing.model';
import { KucingService } from './services/kucing.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crud-image-app';
  kucing$: Observable<Kucing[]>;

  constructor(private kucingService: KucingService) {
    this.kucing$ = this.kucingService.getKucing();
  }

}
