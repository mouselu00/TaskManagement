using System.Data.Common;
using TaskManagement.Models;

namespace TaskManagement.Repositorys.Interfaces
{
    public interface ITaskDataRepository
    {
        public Task<IEnumerable<TaskData>> GetDataAllAsync();

        public Task<int> InsertAsync(TaskData parameter);

        public Task<int> DeleteAsync(Guid Id);
    }
}
