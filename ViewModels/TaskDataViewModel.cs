using TaskManagement.Models;

namespace TaskManagement.ViewModels
{
    public class TaskDataViewModel
    {
        public TaskData TaskData { get; set; } = new TaskData();

        public IEnumerable<TaskData>? TaskDatas { get; set; } = null;

        public bool isEdit { get; set; } = false;
    }
}
