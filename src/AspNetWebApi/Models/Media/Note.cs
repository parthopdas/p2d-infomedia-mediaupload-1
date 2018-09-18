using System.Runtime.Serialization;

namespace AspNetWebApi.Models.Notes
{
    [DataContract]
    public class Media
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Media"/> class.
        /// </summary>
        /// <param name="note">The note.</param>
        public Media(string note)
        {
            this.Text = note;
            this.Id = NotesService.IdentifierProvider.GetNewId();
        }

        [DataMember(Name = "text", IsRequired = false)]
        public string Text { get; set; }

        [DataMember(Name = "id", IsRequired = false)]
        public int Id { get; set; }
    }
}