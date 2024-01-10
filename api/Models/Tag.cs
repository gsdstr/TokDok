using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Tag
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public List<Todo> Todos { get; } = [];
    }
}