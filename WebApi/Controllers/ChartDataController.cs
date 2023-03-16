using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using WebApi.Hubs;
using static WebApi.LineChartData;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChartDataController : ControllerBase
    {
        private readonly IHubContext<TestHub> _testHub;

        private readonly ILogger<ChartDataController> _logger;

        private static LineChartData _lineChartData;

        public ChartDataController(
            ILogger<ChartDataController> logger,
            IHubContext<TestHub> testHub)
        {
            _logger = logger;
            _testHub = testHub;

            _lineChartData = SetDefaultLineChart();
        }

        [HttpGet]
        [Route("[action]")]
        public LineChartData GetLineChart()
        {
            var lineChartData = new LineChartData();
            lineChartData.Labels = new List<string>()
            {
                "January", "February", "March", "April", "May", "June", "July"
            };
            lineChartData.Datasets = new List<LineChartData.LineChartDataSet>();
            var dataset1 = new LineChartData.LineChartDataSet()
            {
                Label = "My First Dataset",
                Data = new List<int>() { 40, 20, 12, 39, 10, 80, 40 }
            };
            var dataset2 = new LineChartData.LineChartDataSet()
            {
                Label = "My Second Dataset",
                Data = new List<int>() { 50, 12, 28, 29, 7, 25, 60 }
            };

            (lineChartData.Datasets as List<LineChartData.LineChartDataSet>)!.Add(dataset1);
            (lineChartData.Datasets as List<LineChartData.LineChartDataSet>)!.Add(dataset2);

            return lineChartData;
        }

        [HttpPost]
        [Route("[action]")]
        public void SetLineChart(LineChartData lineChartData)
        {
            _lineChartData = lineChartData;
            //_testHub.Clients.AllExcept(_testHub)
        }

        private LineChartData SetDefaultLineChart()
        {
            var lineChartData = new LineChartData();
            lineChartData.Labels = new List<string>()
            {
                "January", "February", "March", "April", "May", "June", "July"
            };
            lineChartData.Datasets = new List<LineChartData.LineChartDataSet>();
            var dataset1 = new LineChartData.LineChartDataSet()
            {
                Label = "My First Dataset",
                Data = new List<int>() { 40, 20, 12, 39, 10, 80, 40 }
            };
            var dataset2 = new LineChartData.LineChartDataSet()
            {
                Label = "My Second Dataset",
                Data = new List<int>() { 50, 12, 28, 29, 7, 25, 60 }
            };

            (lineChartData.Datasets as List<LineChartData.LineChartDataSet>)!.Add(dataset1);
            (lineChartData.Datasets as List<LineChartData.LineChartDataSet>)!.Add(dataset2);

            return lineChartData;
        }
    }
}