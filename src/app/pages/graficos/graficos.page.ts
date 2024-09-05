import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonCardContent, IonCardHeader, IonCard } from '@ionic/angular/standalone';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Chart } from 'chart.js/auto';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.page.html',
  styleUrls: ['./graficos.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardContent, IonLabel, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class GraficosPage implements AfterViewInit {
  @ViewChild('pipeChart', { static: false }) pipeChartElement: ElementRef;
  pipeChart: any;
  cosasLindasList: any[] = [];
  chartInfoList: any[] = []; // List to store chart info

  @ViewChild('barChart', { static: false }) barChartElement: ElementRef;
  barChart: any;
  cosasFeasList: any[] = [];

  public currentSection: string;

  constructor(
    private firestoreService: FirestoreService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ionViewWillEnter(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentSection = params['section'];
      if (this.currentSection === 'cosaslindas') {
        this.firestoreService.obtenerCosasLindas().subscribe((datos) => {
          this.cosasLindasList = datos;
          this.generatePipeChart();
        });
      } else if (this.currentSection === 'cosasfeas') {
        this.firestoreService.obtenerCosasFeas().subscribe((datos) => {
          this.cosasFeasList = datos;
          this.generateBarChart();
        });
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.currentSection === 'cosaslindas') {
      this.generatePipeChart();
    } else if (this.currentSection === 'cosasfeas') {
      this.generateBarChart();
    }
  }

  generatePipeChart() {
    if (!this.pipeChartElement) {
      console.log('pipeChartElement is not available');
      return;
    }

    const ctx = this.pipeChartElement.nativeElement.getContext('2d');
    if (!ctx) {
      console.log('Unable to get context for pipeChartElement');
      return;
    }

    if (this.cosasLindasList.length === 0) {
      console.log('cosasLindasList is empty');
      return;
    }

    const photos = this.cosasLindasList.filter((p) => p.likes.length > 0);
    const colors = [
      '#ffc409',
      '#eb445a',
      '#3dc2ff',
      '#92949c',
      '#2fdf75',
      '#0044ff',
      '#ee55ff',
    ];

    const photoColors = photos.map(
      (_, index) => colors[index % colors.length]
    );

    this.chartInfoList = photos.map((p, index) => ({
      name: p.nombre,
      date: new Date(p.hora).toLocaleString(),
      color: photoColors[index],
    }));

    const images = photos.map((p) => {
      const image = new Image(150, 150);
      image.src = p.rutaFoto;
      return image;
    });

    // Destroy previous chart if it exists
    if (this.pipeChart) {
      this.pipeChart.destroy();
    }

    this.pipeChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: photos.map(
          (p) => p.nombre + ' ' + new Date(p.hora).toLocaleString()
        ),
        datasets: [
          {
            label: 'votos',
            data: photos.map((p) => p.likes.length),
            backgroundColor: photoColors,
            borderColor: photoColors,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 20,
        },
        plugins: {
          tooltip: {
            usePointStyle: true,
            borderColor: '#ffffff',
            borderWidth: 3,
            boxHeight: 160,
            boxWidth: 160,
            cornerRadius: 20,
            displayColors: true,
            bodyAlign: 'center',
            callbacks: {
              //@ts-ignore

              labelPointStyle: (context) => {
                return {
                  pointStyle: images[context.dataIndex],
                };
              },
            },
          },
          legend: {
            display: false,
          },
        },
      },
    });
  }

  generateBarChart() {
    if (!this.barChartElement) {
      console.log('barChartElement is not available');
      return;
    }

    const ctx = this.barChartElement.nativeElement.getContext('2d');
    if (!ctx) {
      console.log('Unable to get context for barChartElement');
      return;
    }

    if (this.cosasFeasList.length === 0) {
      console.log('cosasFeasList is empty');
      return;
    }

    const photos = this.cosasFeasList.filter((p) => p.likes.length > 0);
    const colors = [
      '#ffc409',
      '#eb445a',
      '#3dc2ff',
      '#92949c',
      '#2fdf75',
      '#0044ff',
      '#ee55ff',
    ];

    let i = 0;
    const photoColors = photos.map((_) => colors[(i = (i + 1) % colors.length)]);

    this.chartInfoList = photos.map((p, index) => ({
      name: p.nombre,
      date: new Date(p.hora).toLocaleString(),
      color: photoColors[index],
    }));

    const images = photos.map((p) => {
      const image = new Image(150, 150);
      image.src = p.rutaFoto;
      return image;
    });

    // Destroy previous chart if it exists
    if (this.barChart) {
      this.barChart.destroy();
    }

    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: photos.map(
          (p) => p.nombre + ' ' + new Date(p.hora).toLocaleString()
        ), // Name, Date, and Votes for each bar
        datasets: [
          {
            data: photos.map((p) => p.likes.length),
            backgroundColor: photoColors,
            borderColor: photoColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
          y: {
            display: false,
          },
          x: {
            grid: {
              color: '#555555',
              //@ts-ignore

              drawBorder: true,
            },
            ticks: {
              color: 'rgb(0,0,0)',
              font: {
                family: "'Pretendard', sans-serif",
                weight: 'bold',
              },
            },
          },
        },
        layout: {
          padding: 20,
        },
        plugins: {
          tooltip: {
            usePointStyle: true,
            borderColor: '#ffffff',
            borderWidth: 3,
            boxHeight: 160,
            boxWidth: 160,
            cornerRadius: 20,
            displayColors: true,
            bodyAlign: 'center',
            callbacks: {
              //@ts-ignore

              labelPointStyle: (context) => {
                context.formattedValue = 'Votos:' + context.formattedValue;
                context.label =
                  'NombreUsuario:' +
                  photos[context.dataIndex].nombre +
                  ' ' +
                  new Date(photos[context.dataIndex].hora).toLocaleString();
                return {
                  pointStyle: images[context.dataIndex],
                };
              },
            },
          },
          legend: {
            display: false,
          },
          datalabels: {
            color: '#ffffff',
            anchor: 'end',
            align: 'center',
            font: {
              size: 30,
              weight: 'bold',
            },
            offset: 5,
            backgroundColor: photoColors,
            borderColor: '#ffffff',
            borderWidth: 1,
            borderRadius: 10,
            padding: 5,
            textShadowBlur: 10,
            textShadowColor: '#000000',
          },
        },
      },
    });
  }
}
