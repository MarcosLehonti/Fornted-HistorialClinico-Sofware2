import { Component, OnInit } from '@angular/core';
import { CloudinaryGraphQLService } from '../../core/services/graphql/cloudinary-graphql.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';

@Component({
  standalone: true,
  selector: 'app-cloudinary',
  templateUrl: './cloudinary.component.html',
  styleUrls: ['./cloudinary.component.css'],
  imports: [CommonModule, FormsModule, MenuComponent],
  providers: [CloudinaryGraphQLService],
})
export class CloudinaryComponent implements OnInit {
  files: any[] = [];
  selectedFile: File | null = null;
  uploading = false;

  constructor(private cloudinaryService: CloudinaryGraphQLService) {}

  ngOnInit(): void {
    this.loadFiles();
  }

  // 🧠 Obtener ID del paciente desde localStorage
  getPatientId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? Number(userId) : null;
  }

  // 📤 Seleccionar archivo
  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // 🚀 Subir imagen
  uploadImage(): void {
    const patientId = this.getPatientId();
    if (!this.selectedFile || !patientId) return;

    this.uploading = true;

    this.cloudinaryService.uploadFile(this.selectedFile, patientId).subscribe({
      next: (res) => {
        alert(res.message);
        this.selectedFile = null;
        this.loadFiles();
      },
      error: (err) => {
        console.error('Error al subir imagen:', err);
        alert('❌ Error al subir imagen');
      },
      complete: () => {
        this.uploading = false;
      },
    });
  }

  // 📥 Cargar imágenes del paciente
  loadFiles(): void {
    const patientId = this.getPatientId();
    if (!patientId) return;

    this.cloudinaryService.getFilesByPatientId(patientId).subscribe({
      next: (data) => {
        this.files = data;
      },
      error: (err) => {
        console.error('Error al obtener imágenes:', err);
      },
    });
  }
}
