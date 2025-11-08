import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as echarts from 'echarts';
import { MenuComponent } from '../menu/menu.component';

interface BarEspecialidad { especialidad: string; total: number; }
interface SerieCitas { period: string; total: number; }
interface HeatmapBin { dow: number; hour: number; total: number; }
interface KpiCrecimiento { current_month: string; previous_month: string; current_total: number; previous_total: number; growth_percent: number; }

@Component({
  selector: 'app-bi-kpis',
  templateUrl: './bi-kpis.component.html',
  styleUrls: ['./bi-kpis.component.css'],
  standalone: true,
  imports: [CommonModule, MenuComponent]
})
export class BiKpisComponent implements OnInit, AfterViewInit {
  loading = true;
  error: string | null = null;

  barrasEspecialidad: BarEspecialidad[] = [];
  serieSemana: SerieCitas[] = [];
  serieMes: SerieCitas[] = [];
  usuariosCrecimiento: SerieCitas[] = [];
  heatmap: HeatmapBin[] = [];
  citasPorMes: SerieCitas[] = [];
  citasPorDia: SerieCitas[] = [];
  kpiCrecimiento: KpiCrecimiento | null = null;
  kpiAsistencia: { percent: number; attended: number; total: number } | null = null;
  kpiOcupacion: { percent: number; ocupados: number; total: number } | null = null;
  kpiCancelacion: { percent: number; canceladas: number; total: number } | null = null;
  totalCitas = 0;
  citasMesActual = 0;
  citasHoy = 0;
  especialidadMasPedida = '';
  porcentajeEspecialidadTop = 0;

  private gqlUrl = 'http://localhost:8001/graphql'; // Microservicio BI-KPIS
  private charts: any[] = [];

  async ngOnInit() {
    try {
      await Promise.all([
        this.fetchBarrasEspecialidad(),
        this.fetchSerie('week').then(d => this.serieSemana = d),
        this.fetchSerie('month').then(d => this.serieMes = d),
        this.fetchHeatmap(),
        this.fetchCitasPorMes(),
        this.fetchCitasPorDia(),
        this.fetchKpiCrecimiento(),
        this.fetchKpiAsistencia(),
        this.fetchKpiOcupacion(),
        this.fetchKpiCancelacion(),
        this.fetchUsuariosCrecimiento(),
      ]);
      this.calculateTotalCitas();
    } catch (e: any) {
      this.error = e?.message || 'Error cargando datos';
    } finally {
      this.loading = false;
    }
  }

  ngAfterViewInit() {
    // Esperar a que los datos estén cargados
    setTimeout(() => {
      if (!this.loading && !this.error) {
        this.renderCharts();
      }
    }, 500);
  }

  private calculateTotalCitas() {
    this.totalCitas = this.citasPorMes.reduce((sum, item) => sum + item.total, 0);
    
    // Calcular citas del mes actual (formato YYYY-MM)
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const mesActual = this.citasPorMes.find(item => item.period === currentMonth);
    this.citasMesActual = mesActual ? mesActual.total : 0;
    
    // Calcular citas del día de hoy (formato YYYY-MM-DD)
    const currentDay = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const diaHoy = this.citasPorDia.find(item => item.period === currentDay);
    this.citasHoy = diaHoy ? diaHoy.total : 0;
    
    // Calcular especialidad más pedida y su porcentaje
    if (this.barrasEspecialidad.length > 0) {
      // Ordenar por total descendente
      const especialidadesOrdenadas = [...this.barrasEspecialidad].sort((a, b) => b.total - a.total);
      const topEspecialidad = especialidadesOrdenadas[0];
      
      this.especialidadMasPedida = topEspecialidad.especialidad;
      
      // Calcular el total de todas las citas por especialidad
      const totalCitasEspecialidades = this.barrasEspecialidad.reduce((sum, item) => sum + item.total, 0);
      
      // Calcular el porcentaje
      this.porcentajeEspecialidadTop = totalCitasEspecialidades > 0 
        ? Math.round((topEspecialidad.total / totalCitasEspecialidades) * 100 * 100) / 100 
        : 0;
    }
  }
    

  private async gql<T>(query: string, variables?: any): Promise<T> {
    const res = await fetch(this.gqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables })
    });
    const json = await res.json();
    if (json.errors) throw new Error(json.errors.map((e: any) => e.message).join(', '));
    return json.data as T;
  }

  private async fetchBarrasEspecialidad() {
    const q = `query { citasPorEspecialidad { especialidad total } }`;
    const data = await this.gql<{ citasPorEspecialidad: BarEspecialidad[] }>(q);
    this.barrasEspecialidad = data.citasPorEspecialidad;
  }

  private async fetchSerie(granularidad: 'week' | 'month'): Promise<SerieCitas[]> {
    const q = `query($g:String){ citasSerie(granularidad:$g){ period total } }`;
    const data = await this.gql<{ citasSerie: SerieCitas[] }>(q, { g: granularidad });
    return data.citasSerie;
  }

  private async fetchHeatmap() {
    const q = `query { heatmapHorarios { dow hour total } }`;
    const data = await this.gql<{ heatmapHorarios: HeatmapBin[] }>(q);
    this.heatmap = data.heatmapHorarios;
  }

  private async fetchCitasPorMes() {
    const q = `query { citasPorMes { period total } }`;
    const data = await this.gql<{ citasPorMes: SerieCitas[] }>(q);
    this.citasPorMes = data.citasPorMes;
  }

  private async fetchCitasPorDia() {
    const q = `query { citasPorDia { period total } }`;
    const data = await this.gql<{ citasPorDia: SerieCitas[] }>(q);
    this.citasPorDia = data.citasPorDia;
  }

  private async fetchKpiCrecimiento() {
    const q = `query { kpiCrecimientoCitas { currentMonth previousMonth currentTotal previousTotal growthPercent } }`;
    const data = await this.gql<{ kpiCrecimientoCitas: any }>(q);
    const k = data.kpiCrecimientoCitas;
    if (k) {
      this.kpiCrecimiento = {
        current_month: k.currentMonth,
        previous_month: k.previousMonth,
        current_total: k.currentTotal,
        previous_total: k.previousTotal,
        growth_percent: k.growthPercent,
      };
    }
  }

  private async fetchKpiAsistencia() {
    const q = `query { kpiAsistencia { percent attended total } }`;
    const data = await this.gql<{ kpiAsistencia: { percent: number; attended: number; total: number } }>(q);
    this.kpiAsistencia = data.kpiAsistencia;
  }

  private async fetchKpiOcupacion() {
    const q = `query { kpiOcupacionHorarios { percent ocupados total } }`;
    const data = await this.gql<{ kpiOcupacionHorarios: { percent: number; ocupados: number; total: number } }>(q);
    this.kpiOcupacion = data.kpiOcupacionHorarios;
  }

  private async fetchKpiCancelacion() {
    const q = `query { kpiTasaCancelacion { percent canceladas total } }`;
    const data = await this.gql<{ kpiTasaCancelacion: { percent: number; canceladas: number; total: number } }>(q);
    this.kpiCancelacion = data.kpiTasaCancelacion;
  }

  private async fetchUsuariosCrecimiento() {
    const q = `query { usuariosCrecimiento { period total } }`;
    const data = await this.gql<{ usuariosCrecimiento: SerieCitas[] }>(q);
    this.usuariosCrecimiento = data.usuariosCrecimiento;
  }

  // Utilidades para heatmap
  get heatmapMatrix(): number[][] {
    const matrix: number[][] = Array.from({ length: 7 }, () => Array(24).fill(0));
    this.heatmap.forEach(b => {
      const d = Math.min(Math.max(b.dow, 0), 6);
      const h = Math.min(Math.max(b.hour, 0), 23);
      matrix[d][h] = b.total;
    });
    return matrix;
  }

  opacity(v: number): number {
    return Math.min(1, v / 10);
  }

  private renderCharts() {
    this.renderBarChart();
    this.renderLineChart();
    this.renderHeatmapChart();
    this.renderUserGrowthChart();
    this.renderGaugeChart();
  }

  private renderBarChart() {
    const chartDom = document.getElementById('chartEspecialidad');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    this.charts.push(myChart);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      xAxis: {
        type: 'category',
        data: this.barrasEspecialidad.map(b => b.especialidad),
        axisLabel: { rotate: 45, interval: 0 }
      },
      yAxis: { type: 'value' },
      series: [{
        data: this.barrasEspecialidad.map(b => b.total),
        type: 'bar',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 1, color: '#188df0' }
          ])
        },
        label: { show: true, position: 'top' }
      }]
    };

    myChart.setOption(option);
  }

  private renderLineChart() {
    const chartDom = document.getElementById('chartTemporal');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    this.charts.push(myChart);

    const option = {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: this.serieMes.map(s => s.period),
        boundaryGap: false
      },
      yAxis: { type: 'value' },
      series: [{
        data: this.serieMes.map(s => s.total),
        type: 'line',
        smooth: true,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(67, 160, 71, 0.5)' },
            { offset: 1, color: 'rgba(67, 160, 71, 0.1)' }
          ])
        },
        itemStyle: { color: '#43a047' },
        label: { show: true, position: 'top' }
      }]
    };

    myChart.setOption(option);
  }

  private renderHeatmapChart() {
    const chartDom = document.getElementById('chartHeatmap');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    this.charts.push(myChart);

    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    
    const data = this.heatmap.map(h => [h.hour, h.dow, h.total]);

    const option = {
      tooltip: {
        position: 'top',
        formatter: (params: any) => {
          return `${days[params.value[1]]} ${hours[params.value[0]]}<br/>Citas: ${params.value[2]}`;
        }
      },
      grid: {
        height: '70%',
        top: '10%'
      },
      xAxis: {
        type: 'category',
        data: hours,
        splitArea: { show: true }
      },
      yAxis: {
        type: 'category',
        data: days,
        splitArea: { show: true }
      },
      visualMap: {
        min: 0,
        max: Math.max(...this.heatmap.map(h => h.total), 10),
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '5%',
        inRange: {
          color: ['#e3f2fd', '#2196f3', '#0d47a1']
        }
      },
      series: [{
        name: 'Citas',
        type: 'heatmap',
        data: data,
        label: { show: false },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };

    myChart.setOption(option);
  }

  private renderUserGrowthChart() {
    const chartDom = document.getElementById('chartUsuarios');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    this.charts.push(myChart);

    const option = {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: this.usuariosCrecimiento.map(u => u.period),
        boundaryGap: false
      },
      yAxis: { type: 'value' },
      series: [{
        data: this.usuariosCrecimiento.map(u => u.total),
        type: 'line',
        smooth: true,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(156, 39, 176, 0.5)' },
            { offset: 1, color: 'rgba(156, 39, 176, 0.1)' }
          ])
        },
        itemStyle: { color: '#9c27b0' },
        label: { show: true, position: 'top' }
      }]
    };

    myChart.setOption(option);
  }

  private renderGaugeChart() {
    const chartDom = document.getElementById('chartGauge');
    if (!chartDom || !this.kpiAsistencia) return;
    
    const myChart = echarts.init(chartDom);
    this.charts.push(myChart);

    const option = {
      series: [{
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.3, '#ff6e76'],
              [0.7, '#fddd60'],
              [1, '#58d9f9']
            ]
          }
        },
        pointer: {
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          distance: -30,
          length: 8,
          lineStyle: {
            color: '#fff',
            width: 2
          }
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: '#fff',
            width: 4
          }
        },
        axisLabel: {
          color: 'inherit',
          distance: 40,
          fontSize: 14
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}%',
          color: 'inherit',
          fontSize: 32,
          offsetCenter: [0, '70%']
        },
        data: [{
          value: this.kpiAsistencia.percent,
          name: 'Asistencia'
        }]
      }]
    };

    myChart.setOption(option);
  }

  ngOnDestroy() {
    // Limpiar charts al destruir componente
    this.charts.forEach(chart => chart.dispose());
  }
}
