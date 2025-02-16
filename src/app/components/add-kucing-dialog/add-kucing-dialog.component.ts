import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { KucingService } from '../../services/kucing.service';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-kucing-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-kucing-dialog.component.html',
  styleUrl: './add-kucing-dialog.component.css'
})
export class AddKucingDialogComponent {
  kucingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private kucingService: KucingService,
    private dialogRef: MatDialogRef<AddKucingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.kucingForm = this.fb.group({
      id: ['', Validators.required],
      url: ['', Validators.required],
      width: [null, [Validators.required, Validators.min(1)]],
      height: [null, [Validators.required, Validators.min(1)]]
    });

    if (data?.kucing) {
      this.kucingForm.patchValue(data.kucing);
    }
  }

  async getRandomCatImage() {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await response.json();
      if (data.length > 0) {
        this.kucingForm.patchValue({ url: data[0].url });
      }
    } catch (error) {
      console.error('Error fetching cat image:', error);
    }
  }  

  async saveKucing() {
    console.log('⏳ Save button clicked');
    console.log('Form Status:', this.kucingForm.status); // 🔎 Cek status form
    console.log('Form Errors:', this.kucingForm.errors); // 🔎 Cek error form
    console.log('Form Values:', this.kucingForm.value); // 🔎 Cek nilai form
    if (this.kucingForm.valid) {
      try {
        const newKucing = this.kucingForm.value;
        console.log('📤 Sending request:', newKucing); 
        await firstValueFrom(this.kucingService.addKucing(newKucing));
        this.snackBar.open('Kucing berhasil disimpan!', 'Tutup', { duration: 3000 });
        console.log('✅ Request berhasil dikirim!');
        this.dialogRef.close(true);
      } catch (error) {
        console.error('Error saving cat:', error);
      }
    }
  }

  closeDialog() {
    this.dialogRef.close(this.kucingForm.value);
  }
}
