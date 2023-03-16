using Microsoft.AspNetCore.SignalR;

namespace WebApi.Hubs
{
    public class TestHub : Hub
    {
        //private static readonly Dictionary<string, int> UpdateChartTimes = new Dictionary<string, int>();
        private static readonly Dictionary<string, string> RegisterUsers = new Dictionary<string, string>();

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public async Task Register(string username)
        {
            RegisterUsers.Add(Context.ConnectionId, username);
        }

        public async Task Update(LineChartData lineChartData)
        {
            await Clients.All.SendAsync(
                WebSocketActions.Update,
                lineChartData);

            await Notify(Context.ConnectionId);
        }

        public async Task Notify(string userId)
        {
            await Clients.Others.SendAsync(
                WebSocketActions.Notify, RegisterUsers.FirstOrDefault(x => x.Key.Equals(userId)).Value);
        }
    }

    public struct WebSocketActions
    {
        public static readonly string Register = "Register";
        public static readonly string Update = "Update";
        public static readonly string Notify = "Notify";
    }
}
