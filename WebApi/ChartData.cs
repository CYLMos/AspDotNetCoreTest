namespace WebApi
{
    public interface ChartData
    {
        public object Datasets { get; set; }
    }

    public class LineChartData : ChartData
    {
        public List<string> Labels { get; set; }

        public object Datasets { get; set; }

        public class LineChartDataSet
        {
            public string Label { get; set; }
            public List<int> Data { get; set; }
        }
    }

    public class BarChartData
    {

    }
}