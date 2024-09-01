using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagement.Models
{
    [Table("TaskData")]
    public class TaskData
    {
        [Key]
        [Column("ID")]
        public Guid Id { get; set; }
        [Column("Created")]
        public DateTime? Created { get; set; }
        [Column("UserName")]
        public string? UserName { get; set; }
        [Column("ProjectName")]
        public string? ProjectName { get; set; }
        [Column("Description")]
        public string? Description { get; set; }

    }
}
