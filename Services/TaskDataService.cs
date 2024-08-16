using Microsoft.Data.SqlClient;
using System.Data;
using System.Data.Common;
using System.Reflection.Metadata;
using TaskManagement.Controllers;
using TaskManagement.Models;
using TaskManagement.Repositorys;

namespace TaskManagement.Services
{
    public class TaskDataService
    {
        //private readonly IConfiguration _configuration;
        private readonly IConfiguration _configuration;
        private readonly IDbConnection _connection;

        public TaskDataService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        }


        public async Task<IEnumerable<TaskData>> SearchAsync()
        {
            var tdr = new TaskDataRepository(_configuration);
            return await tdr.GetDataAllAsync();
        }

        public async Task<int> AddAsync(TaskData parameter)
        {
            var tdr = new TaskDataRepository(_configuration);
            return await tdr.InsertAsync(parameter);
        }

        public async Task<int> RemoveAsync(Guid Id)
        {
            var tdr = new TaskDataRepository(_configuration);
            return Id == Guid.Empty ? 0 : await tdr.DeleteAsync(Id);
        }
    }
}
