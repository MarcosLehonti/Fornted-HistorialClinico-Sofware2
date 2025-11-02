// src/app/components/paciente-detalle/paciente-detalle.component.ts

import { Component, OnInit } from '@angular/core';
import { TriajeService } from '../../services/triaje.service';
import { UsuarioService } from '../../services/user.service';
import { DiagnosticoService } from '../../services/diagnostico.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-paciente-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule,MenuComponent],
  templateUrl: './paciente-detalle.component.html',
  styleUrls: ['./paciente-detalle.component.css']
})
export class PacienteDetalleComponent implements OnInit {
  triajes: any[] = [];
  antecedentes: any[] = [];
  diagnosticos: any[] = [];
  pacienteId: number | null = null;

  constructor(
    private triajeService: TriajeService,
    private userService: UsuarioService,
    private diagnosticoService: DiagnosticoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.pacienteId = this.authService.getUsuarioId();
    if (this.pacienteId) {
      this.obtenerTriajes();
      this.obtenerAntecedentes();
      this.obtenerDiagnosticos();
    }
  }

  obtenerTriajes(): void {
    this.triajeService.obtenerTriajesPorPacienteId(this.pacienteId!).subscribe(
      (data) => {
        this.triajes = data;
      },
      (error) => {
        console.error('Error al obtener triajes:', error);
      }
    );
  }

  obtenerAntecedentes(): void {
    this.userService.obtenerAntecedentesPorPacienteId(this.pacienteId!).subscribe(
      (data) => {
        this.antecedentes = data;
      },
      (error) => {
        console.error('Error al obtener antecedentes:', error);
      }
    );
  }

  obtenerDiagnosticos(): void {
    this.diagnosticoService.obtenerDiagnosticosPorPacienteId(this.pacienteId!).subscribe(
      (data) => {
        this.diagnosticos = data;
      },
      (error) => {
        console.error('Error al obtener diagnósticos:', error);
      }
    );
  }


  generarPDF(): void {
    const DATA = document.querySelector('.paciente-detalle-container') as HTMLElement;
    html2canvas(DATA).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('historial-clinico.pdf');
    });
  }

  imprimirPDF(): void {
    const doc = new jsPDF();
    let yPosition = 10; // Posición inicial en el eje Y
  
    // Título principal
    doc.setFontSize(18);
    doc.text('Historial Clínico', 10, yPosition);
    yPosition += 10;
  
    // Sección de Triajes
    if (this.triajes.length > 0) {
      doc.setFontSize(14);
      doc.text('Triajes', 10, yPosition);
      yPosition += 5;
  
      const triajesData = this.triajes.map(t => [
        t.fecha, t.hora, `${t.temperatura} °C`, `${t.frecuenciaCardiaca} bpm`, 
        `${t.frecuenciaRespiratoria} rpm`, `${t.saturacionOxigeno} %`, 
        `${t.peso} kg`, `${t.estatura} cm`, t.alergias || 'Ninguna', 
        t.enfermedadesCronicas || 'Ninguna', t.motivoConsulta, t.nombreEnfermera
      ]);
  
      autoTable(doc, {
        head: [['Fecha', 'Hora', 'Temperatura', 'Frecuencia Cardiaca', 'Frecuencia Respiratoria', 'Saturación de Oxígeno', 'Peso', 'Estatura', 'Alergias', 'Enfermedades Crónicas', 'Motivo de Consulta', 'Enfermera']],
        body: triajesData,
        startY: yPosition + 5,
      });
      yPosition = (doc as any).lastAutoTable.finalY + 10; // Ajusta yPosition para la siguiente tabla
    }
  
    // Sección de Antecedentes
    if (this.antecedentes.length > 0) {
      doc.setFontSize(14);
      doc.text('Antecedentes', 10, yPosition);
      yPosition += 5;
  
      const antecedentesData = this.antecedentes.map(a => [
        a.fecha, a.descripcion, a.especialidad.nombre
      ]);
  
      autoTable(doc, {
        head: [['Fecha', 'Descripción', 'Especialidad']],
        body: antecedentesData,
        startY: yPosition + 5,
      });
      yPosition = (doc as any).lastAutoTable.finalY + 10; // Ajusta yPosition para la siguiente tabla
    }
  
    // Sección de Diagnósticos
    if (this.diagnosticos.length > 0) {
      doc.setFontSize(14);
      doc.text('Diagnósticos', 10, yPosition);
      yPosition += 5;
  
      const diagnosticosData = this.diagnosticos.map(d => [
        d.fecha, d.descripcion, d.especialidad, d.tratamiento
      ]);
  
      autoTable(doc, {
        head: [['Fecha', 'Descripción', 'Especialidad', 'Tratamiento']],
        body: diagnosticosData,
        startY: yPosition + 5,
      });
    }
  
    // Guarda el PDF
    doc.save('historial_clinico.pdf');
  }
  
  
  
}
