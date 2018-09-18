using AspNetWebApi.Models;
using System.Threading.Tasks;

namespace AspNetWebApi.Hubs.Notes
{
    public interface IMediaCallbacks
    {
        Task BroadcastNewMedia(Media newMedia);

        Task BroadcastRemoveMedia(string mediaName);
    }
}
