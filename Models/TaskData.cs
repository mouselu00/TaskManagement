using System.ComponentModel.DataAnnotations;

namespace TaskManagement.Models
{
    public class TaskData
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [DataType(dataType: DataType.Date)]
        public DateTime? Created { get; set; } = DateTime.Now;

        [Required(AllowEmptyStrings = false, ErrorMessage = "人員名稱必填！")]
        public string? UserName { get; set; } = null;

        [Required(AllowEmptyStrings = false, ErrorMessage = "專案名稱必填！")]
        public string? ProjectName { get; set; } = null;

        public string? Description { get; set; } = null;

    }
}
