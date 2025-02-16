import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { KucingService } from '../../services/kucing.service';
import { firstValueFrom } from 'rxjs';
import { Kucing } from '../../models/kucing.model';

@Component({
  selector: 'app-edit-kucing-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './edit-kucing-dialog.component.html',
  styleUrl: './edit-kucing-dialog.component.css'
})
export class EditKucingDialogComponent implements OnInit {
  @Output() deleted = new EventEmitter<string>();
  editForm: FormGroup;
  isUpdating = false;
  isDeleting = false;
  id: string;

  constructor(
    private dialogRef: MatDialogRef<EditKucingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Kucing,
    private kucingService: KucingService,
    private snackBar: MatSnackBar
  ) {
    this.editForm = new FormGroup({
      url: new FormControl('', [Validators.required]),
      width: new FormControl(0, [Validators.required, Validators.min(1)]),
      height: new FormControl(0, [Validators.required, Validators.min(1)])
    });

    this.id = data.id;
  }

  ngOnInit(): void {
    this.editForm.setValue({
      url: this.data.url,
      width: this.data.width,
      height: this.data.height
    });
  }

  async update() {
    if (this.editForm.invalid) {
      this.snackBar.open('Form tidak valid, periksa kembali!', 'Tutup', { duration: 3000 });
      return;
    }

    this.isUpdating = true;

    const updatedData: Kucing = {
      id: this.data.id, 
      ...this.editForm.value 
    };

    try {
      await firstValueFrom(this.kucingService.updateKucing(updatedData));
      this.snackBar.open('Kucing berhasil diperbarui!', 'Tutup', { duration: 3000 });
      this.dialogRef.close(updatedData);
    } catch (error) {
      this.snackBar.open('Gagal memperbarui kucing!', 'Tutup', { duration: 3000 });
      console.error('Error updating kucing:', error);
    } finally {
      this.isUpdating = false;
    }
  }

  async deleteKucing() {
    if (this.isUpdating) return;
    this.isDeleting = true;
  
    try {
      await firstValueFrom(this.kucingService.deleteKucing(this.data.id));
      this.snackBar.open('Gambar berhasil dihapus!', 'Tutup', { duration: 3000 });
      this.dialogRef.close({ deleted: true });
    } catch (error) {
      this.snackBar.open('Gagal menghapus gambar!', 'Tutup', { duration: 3000 });
      console.error('Error deleting kucing:', error);
    } finally {
      this.isDeleting = false;
    }
  }  

  close() {
    this.dialogRef.close(false);
  }
}
