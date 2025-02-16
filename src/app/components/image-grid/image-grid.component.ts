import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import M from 'materialize-css';
import { KucingService } from '../../services/kucing.service';
import { firstValueFrom } from 'rxjs';
// import { AddKucingDialogComponent } from '../add-kucing-dialog/add-kucing-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-image-grid',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    FormsModule, 
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './image-grid.component.html',
  styleUrl: './image-grid.component.css'
})
export class ImageGridComponent implements OnInit {
  kucings: any[] = [];
  isSaving = false;

  constructor(
    private kucingService: KucingService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllAPIKucing();
  }

  ngAfterViewInit() {
    const elems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elems, {});
  }

  async getAllAPIKucing() {
    try {
      const kucing = await firstValueFrom(this.kucingService.getAPIKucing());
      this.kucings = kucing || [];
    } catch (error) {
      console.error('Error fetching kucing:', error);
    }
  }

  async deleteKucing(id: string) {
    this.kucings = this.kucings.filter(cat => cat.id !== id);
  }

  async saveRemainingCats() {
    this.isSaving = true;
    try {
      const response = await firstValueFrom(this.kucingService.addListKucing(this.kucings));
      console.log('Data image kucing telah disimpan:', response);
      const snackBarRef = this.snackBar.open('Data berhasil disimpan!', 'Tutup', {
        duration: 2000,
        panelClass: ['success-snackbar'],
      });
      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigate(['/gallery']);
      });
    } catch (error) {
      console.error('Gagal menyimpan data:', error);
      this.snackBar.open('Gagal menyimpan data!', 'Tutup', {
        duration: 2000,
        panelClass: ['error-snackbar'],
      });
    } finally {
      this.isSaving = false;
    }
  }
}
