using Microsoft.Extensions.Configuration;
using TaskManagement.Models;
using TaskManagement.Repositorys;

namespace TaskManagement.Services.Interfaces
{
    public interface ITaskDataService
    {
        public Task<IEnumerable<TaskData>> SearchAsync();

        public Task<int> AddAsync(TaskData parameter);

        public Task<int> RemoveAsync(Guid Id);

        public Task<int> UpdateAsync(TaskData parameter);
    }
}
