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
        private readonly IUnitOfWork _unitOfWork;

        public TaskDataService(ILogger<TaskDataService> logger, ITaskDataRepository taskDataRepository, IUnitOfWork unitOfWork)
        {
            _logger = logger;
            _taskDataRepository = taskDataRepository;
            _unitOfWork = unitOfWork;
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

        public async Task<int> UpdateAsync(TaskData parameter)
        {
            int effectCount = 0;
            _unitOfWork.BeginTransaction();
            try
            {
                effectCount = parameter.Id == Guid.Empty ? 0 : await _taskDataRepository.DeleteAsync(parameter.Id);
                if (effectCount <= 0)
                {
                    _unitOfWork.Rollback();
                }
                else
                {
                    effectCount = await _taskDataRepository.InsertAsync(parameter);
                    _unitOfWork.Commit();
                }
            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
            }
            return effectCount;
        }
    }
}
