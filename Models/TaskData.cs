using System.ComponentModel.DataAnnotations;

namespace TaskManagement.Models
{
    public class TaskData
    {
        public Guid Id { get; set; }

        public DateTime? Created { get; set; }

        public string? UserName { get; set; }

        public string? ProjectName { get; set; }

        public string? Description { get; set; }

    }
}
