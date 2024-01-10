using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Todo
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public bool IsComplete { get; set; }

        public List<Tag> Tags { get; set; } = [];

        public DateTime? Reminder { get; set; }
    }
}