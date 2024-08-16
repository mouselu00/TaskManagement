using Microsoft.Data.SqlClient;
using System.Data;
using System.Data.Common;
using System.Reflection.Metadata;
using TaskManagement.Controllers;
using TaskManagement.Models;
using TaskManagement.Repositorys;
using TaskManagement.Repositorys.Interfaces;
using TaskManagement.Services.Interfaces;

namespace TaskManagement.Services
{
    public class TaskDataService : ITaskDataService
    {
        private readonly ILogger<TaskDataService> _logger;
        private readonly ITaskDataRepository _taskDataRepository;

        public TaskDataService(ILogger<TaskDataService> logger, ITaskDataRepository taskDataRepository)
        {
            _logger = logger;
            _taskDataRepository = taskDataRepository;
        }

        public async Task<IEnumerable<TaskData>> SearchAsync()
        {
            return await _taskDataRepository.GetDataAllAsync();
        }

        public async Task<int> AddAsync(TaskData parameter)
        {
            return await _taskDataRepository.InsertAsync(parameter);
        }

        public async Task<int> RemoveAsync(Guid Id)
        {
            return Id == Guid.Empty ? 0 : await _taskDataRepository.DeleteAsync(Id);
        }
    }
}
