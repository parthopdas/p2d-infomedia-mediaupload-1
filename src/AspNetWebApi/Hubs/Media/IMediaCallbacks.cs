using System.Threading.Tasks;
using AspNetWebApi.Models.Notes;

namespace AspNetWebApi.Hubs.Notes
{
    public interface IMediaCallbacks
    {
        Task BroadcastNewMedia(Media newMedia);

        Task BroadcastRemoveMedia(int mediaId);
    }
}
