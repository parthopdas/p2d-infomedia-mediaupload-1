using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetWebApi.Models.Notes
{
    public class NotesService
    {
        public class IdentifierProvider
        {
            private static int id;
            public static int GetNewId()
            {
                return ++id;
            }
        }

        private static readonly List<Media> notesList = new List<Media>
        {
            new Media("Learn Underscore"),
            new Media("Learn Ionic Framework"),
            new Media("Learn AngularJS Google maps"),
        };

        public static bool Remove(int noteId)
        {
            var noteToRemove = notesList.SingleOrDefault(note => note.Id == noteId);
            return noteToRemove != null && notesList.Remove(noteToRemove);
        }

        public static Media Add(string note)
        {
            var newNote = new Media(note);
            notesList.Add(newNote);

            return newNote;
        }

        public static IEnumerable<Media> GetAll()
        {
            return notesList;
        }
    }
}