import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LineChartData, LineChartDataset } from './models/ChartData';
import { HubConnection, HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public forecasts?: WeatherForecast[];
  public lineData: LineChartData = {} as LineChartData;
  public httpClient: HttpClient;
  public hubconnection!: HubConnection;

  constructor(http: HttpClient) {
    this.initWebSocket();
    //this.hubconnection.invoke('Register', 'User' + Math.floor(Math.random() * 10001));

    this.httpClient = http;
    http.get<WeatherForecast[]>('/weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
    http.get<LineChartData>('/ChartData/GetLineChart').subscribe(result => {
      console.log(typeof result.datasets);
      //result.datasets.forEach((d: LineChartDataset) => { d.backgroundColor = '#f87979' });
      this.lineData = result;
    }, error => console.error(error));
  }

  title = 'DotNetCoreWithAngular';

  onUpdateLineChart() {
    const randomNumber1 = [
      Math.floor(Math.random() * 101),
      Math.floor(Math.random() * 101),
      Math.floor(Math.random() * 101),
      Math.floor(Math.random() * 101),
      Math.floor(Math.random() * 101),
      Math.floor(Math.random() * 101),
      Math.floor(Math.random() * 101),
    ];
    const randomNumber2 = [
      Math.floor(Math.random() * 101),
      Math.floor(Math.random() * 101),
      Math.floor(Math.random() * 101),
      Math.floor(Math.random() * 101),
      Math.floor(Math.random() * 101),
      Math.floor(Math.random() * 101),
      Math.floor(Math.random() * 101),
    ];

    this.lineData.datasets[0].data = randomNumber1;
    this.lineData.datasets[1].data = randomNumber2;
    this.hubconnection.invoke('Update', this.lineData)
  }

  initWebSocket() {
    this.hubconnection = new HubConnectionBuilder()
      .withUrl('/test', {
        skipNegotiation: false,
        transport: HttpTransportType.ServerSentEvents
      })
      .build();

    this.hubconnection.on('Update', (data: LineChartData) => {
      console.log(data);
      this.lineData = data;
    });

    this.hubconnection.on('Notify', (user: string) => {
      console.log(user);
      alert(user + ' updated the line chart data');
    });
    //this.hubconnection.start().then(
    //  () => this.hubconnection.invoke('Register', 'User' + Math.floor(Math.random() * 10001)));
    this.hubconnection.start().then(
      () => this.hubconnection.invoke('Register', 'User' + Math.floor(Math.random() * 10001)).catch(
        function (err) {
          return console.error(err.toString());
        }));
  }

  barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'GitHub Commits',
        backgroundColor: '#f87979',
        data: [40, 20, 12, 39, 10, 80, 40]
      }
    ]
  };
  radarData = {
    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(220, 220, 220, 0.2)',
        borderColor: 'rgba(220, 220, 220, 1)',
        pointBackgroundColor: 'rgba(220, 220, 220, 1)',
        pointBorderColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220, 220, 220, 1)',
        data: [65, 59, 90, 81, 56, 55, 40]
      },
      {
        label: 'My Second dataset',
        backgroundColor: 'rgba(151, 187, 205, 0.2)',
        borderColor: 'rgba(151, 187, 205, 1)',
        pointBackgroundColor: 'rgba(151, 187, 205, 1)',
        pointBorderColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151, 187, 205, 1)',
        data: [28, 48, 40, 19, 96, 27, 100]
      }
    ]
  };
  doughnutData = {
    labels: ['VueJs', 'EmberJs', 'ReactJs', 'Angular'],
    datasets: [{
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [40, 20, 80, 10]
    }]
  };
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
