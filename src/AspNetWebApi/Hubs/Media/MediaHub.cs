using System.Collections.Generic;
using System.Threading.Tasks;
using AspNetWebApi.Models.Notes;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace AspNetWebApi.Hubs.Notes
{
    [HubName("mediaHub")]
    public class NotesHub : Hub<IMediaCallbacks>, IMediaCalls
    {
        public async Task AddMedia(string note)
        {
            Media newNote = NotesService.Add(note);

            await Clients.All.BroadcastNewMedia(newNote);
        }

        public IEnumerable<Media> GetAllMedia()
        {
            return NotesService.GetAll();
        }

        public async Task RemoveMedia(int noteId)
        {
            if (NotesService.Remove(noteId))
            {
                await Clients.All.BroadcastRemoveMedia(noteId);
            }
        }
    }
}