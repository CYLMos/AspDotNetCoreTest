export interface LineChartData {
  labels: string[];
  datasets: LineChartDataset[];
}

export interface LineChartDataset {
  labels: string[];
  data: number[];
  backgroundColor: '#f87979';
}
