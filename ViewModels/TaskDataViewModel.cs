using System.ComponentModel.DataAnnotations;

namespace TaskManagement.ViewModels
{
    public class TaskDataCollectionViewModel
    {
        public TaskDataFormViewModel TaskDataFrom { get; set; } = new TaskDataFormViewModel();

        public IEnumerable<TaskDataItemViewModel>? TaskDataList { get; set; } = null;

        public bool isEdit { get; set; } = false;
    }

    public class TaskDataFormViewModel
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

    public class TaskDataItemViewModel
    {
        public Guid Id { get; set; }

        public DateTime? Created { get; set; }

        public string? UserName { get; set; }

        public string? ProjectName { get; set; }

        public string? Description { get; set; }
    }
}
