using System.Collections.Generic;
using System.Threading.Tasks;
using AspNetWebApi.Models.Notes;

namespace AspNetWebApi.Hubs.Notes
{
    public interface IMediaCalls
    {
        Task AddMedia(string note);

        IEnumerable<Media> GetAllMedia();

        Task RemoveMedia(int roomId);
    }
}