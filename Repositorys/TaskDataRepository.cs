using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Caching.Memory;
using System.Data;
using TaskManagement.Controllers;
using TaskManagement.DBContext;
using TaskManagement.Models;
using TaskManagement.Repositorys.Interfaces;

namespace TaskManagement.Repositorys
{
    public class TaskDataRepository : ITaskDataRepository
    {
        private readonly ILogger<TaskDataRepository> _logger;
        private readonly DapperContext _dapperContext;

        public TaskDataRepository(ILogger<TaskDataRepository> logger, DapperContext dapperContext)
        {
            _logger = logger;
            _dapperContext = dapperContext;
        }

        public async Task<IEnumerable<TaskData>> GetDataAllAsync()
        {
            IEnumerable<TaskData> result = null;
            try
            {
                string sql = $"select * from TaskData ";
                result = await _dapperContext.dbConnection.QueryAsync<TaskData>(sql);
            }
            catch (Exception ex)
            {
                _logger.LogError($"GetDataAllAsync : {ex.Message}");
            }
            return result;
        }

        public async Task<int> InsertAsync(TaskData parameter)
        {
            int rowsEffected = 0;
            try
            {
                string sql = $"insert into TaskData (Id ,Created , UserName , ProjectName, Description ) values (@Id ,@Created , @UserName , @ProjectName, @Description) ";
                rowsEffected = await _dapperContext.dbConnection.ExecuteAsync(sql, new { Id = parameter.Id, Created = parameter.Created, UserName = parameter.UserName, ProjectName = parameter.ProjectName, Description = parameter.Description });
            }
            catch (Exception ex)
            {
                _logger.LogError($"InsertAsync : {ex.Message}");
            }
            return rowsEffected;
        }

        public async Task<int> DeleteAsync(Guid Id)
        {
            int rowsEffected = 0;
            try
            {
                string sql = $"Delete TaskData Where Id = @Id";
                rowsEffected = await _dapperContext.dbConnection.ExecuteAsync(sql, new { Id = Id });
            }
            catch (Exception ex)
            {
                _logger.LogError($"DeleteAsync : {ex.Message}");
            }
            return rowsEffected;
        }
    }
}
