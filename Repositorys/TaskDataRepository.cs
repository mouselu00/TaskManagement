using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Caching.Memory;
using System.Data;
using TaskManagement.Controllers;
using TaskManagement.Models;
using TaskManagement.Repositorys.Interfaces;

namespace TaskManagement.Repositorys
{
    public class TaskDataRepository : ITaskDataRepository
    {
        private readonly ILogger<TaskDataRepository> _logger;
        private readonly IConfiguration _configuration;
        private readonly IDbConnection _connection;
        public TaskDataRepository(ILogger<TaskDataRepository> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            _connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        }

        public async Task<IEnumerable<TaskData>> GetDataAllAsync()
        {
            IEnumerable<TaskData> result = null;
            try
            {
                string sql = $"select * from TaskData ";
                result = await _connection.QueryAsync<TaskData>(sql);
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
                rowsEffected = await _connection.ExecuteAsync(sql, new { Id = parameter.Id, Created = parameter.Created, UserName = parameter.UserName, ProjectName = parameter.ProjectName, Description = parameter.Description });
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
                rowsEffected = await _connection.ExecuteAsync(sql, new { Id = Id });
            }
            catch (Exception ex)
            {
                _logger.LogError($"DeleteAsync : {ex.Message}");
            }
            return rowsEffected;
        }
    }
}
