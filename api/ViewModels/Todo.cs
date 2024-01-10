using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class TodoView
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public bool IsComplete { get; set; }

        public string[] Tags { get; set; } = [];
    }
}