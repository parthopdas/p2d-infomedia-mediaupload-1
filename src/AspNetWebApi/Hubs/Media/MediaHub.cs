using AspNetWebApi.Models;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.IO;
using System.Web;

namespace AspNetWebApi.Hubs.Notes
{
    [HubName("mediaHub")]
    public class NotesHub : Hub<IMediaCallbacks>
    {
        private readonly string workingFolder = HttpRuntime.AppDomainAppPath + @"\Uploads";

        private FileSystemWatcher watcher = new FileSystemWatcher();

        public NotesHub()
        {
            watcher.Path = workingFolder;
            watcher.NotifyFilter = NotifyFilters.LastAccess | NotifyFilters.LastWrite | NotifyFilters.FileName | NotifyFilters.DirectoryName;
            watcher.Filter = "*.*";

            watcher.Created += new FileSystemEventHandler(OnChanged);
            watcher.Deleted += new FileSystemEventHandler(OnChanged);

            watcher.EnableRaisingEvents = true;
        }

        private void OnChanged(object source, FileSystemEventArgs e)
        {
            if (e.ChangeType == WatcherChangeTypes.Created)
            {
                FileInfo fileInfo = new FileInfo(e.FullPath);

                var media = new Media
                {
                    Name = fileInfo.Name,
                    Created = fileInfo.CreationTime,
                    Modified = fileInfo.LastWriteTime,
                    Size = fileInfo.Length / 1024
                };

                Clients.All.BroadcastNewMedia(media);
            }
            else if (e.ChangeType == WatcherChangeTypes.Deleted)
            {
                Clients.All.BroadcastRemoveMedia(e.Name);
            }
            else
            {
                Console.WriteLine($"{e.FullPath} -> {e.ChangeType}");
            }
        }
    }
}