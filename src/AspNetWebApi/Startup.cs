using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(AspNetWebApi.Startup))]

namespace AspNetWebApi
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}
