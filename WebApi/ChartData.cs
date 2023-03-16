using System.Text.Json.Serialization;

namespace WebApi
{
    public interface ChartData
    {
        public object Datasets { get; set; }
    }

    public class LineChartData : ChartData
    {
        [JsonPropertyName("labels")]
        public List<string> Labels { get; set; }

        [JsonPropertyName("datasets")]
        public object Datasets { get; set; }

        public class LineChartDataSet
        {
            [JsonPropertyName("label")]
            public string Label { get; set; }
            [JsonPropertyName("data")]
            public List<int> Data { get; set; }
        }
    }

    public class BarChartData
    {

    }
}