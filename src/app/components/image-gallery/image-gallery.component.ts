import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { KucingService } from '../../services/kucing.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { EditKucingDialogComponent } from '../edit-kucing-dialog/edit-kucing-dialog.component';
import { Kucing } from '../../models/kucing.model';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    FormsModule, 
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.css'
})
export class ImageGalleryComponent implements OnInit{
  private kucingsSubject = new BehaviorSubject<Kucing[]>([]);
  kucings$ = this.kucingService.kucings$;
  private dialog = inject(MatDialog);

  constructor(private kucingService: KucingService) {}

  ngOnInit() {
    this.getAllKucing();
  }

  removeImage(id: string) {
    const updatedImages = this.kucingsSubject.value.filter(img => img.id !== id);
    this.kucingsSubject.next(updatedImages);
  }

  openEditDialog(cat: Kucing) {
    const dialogRef = this.dialog.open(EditKucingDialogComponent, {
      width: '450px',
      data: { ...cat }
    });

    dialogRef.afterClosed().subscribe(async (result: { updatedData?: Kucing, deleted?: boolean }) => {
      this.getAllKucing();
      if (result?.updatedData) {
        try {
          console.log("Data yang dikirim ke updateKucing:", result.updatedData); 

          await firstValueFrom(this.kucingService.updateKucing(result.updatedData));  
        } catch (error) {
          console.error('Error updating cat:', error);
        }
      } else if (result?.deleted) {
        this.removeImage(cat.id);
      }
    });
  }

  async getAllKucing() {
    try {
      const kucing = await firstValueFrom(this.kucingService.getKucing());
      console.log("Data dari API:", kucing);
      if (kucing) {
        const sortedKucing = kucing
          .sort((a, b) => b.id.localeCompare(a.id))
          .map(cat => ({ ...cat, hover: false }));
        this.kucingService.setKucing(sortedKucing);
      }
    } catch (error) {
      console.error('Error fetching kucing:', error);
    }
  }

}
