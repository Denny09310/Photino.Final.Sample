using Microsoft.Extensions.DependencyInjection;
using Photino.NET;
using Photino.NET.Extensions;
using Photino.NET.IPC;

internal class Program
{
    [STAThread]
    private static void Main(string[] args)
    {
        var builder = PhotinoApplicationBuilder.CreatePhotinoBuilder(args, out var url);

        builder.Services.Configure<PhotinoDevelopmentServerOptions>(options =>
        {
            options.WaitUntilReadyTimeout = TimeSpan.FromSeconds(30);
        });

        var app = builder.BuildApplication();

        app.MainWindow
            .Center()
            .SetTitle("Photino.Final.Sample")
            .RegisterChannelHandler<string>("PHOTINO_TEST_CHANNEL", (sender, message) =>
            {
                Console.WriteLine($"Received {message} from IPC Renderer");
                sender.Emit("Pong");
            });

        app.Load(url);
    }
}