using Microsoft.Data.SqlClient;
using System.Data;

namespace TaskManagement.DBContext
{
    public class DapperContext
    {
        public readonly IConfiguration _configuration;
        public IDbConnection dbConnection { get; }
        public IDbTransaction? dbTransaction { get; set; }
        public DapperContext(IConfiguration configuration)
        {
            _configuration = configuration;
            dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            dbConnection.Open();
        }

        public void Dispose() => dbConnection?.Dispose();
    }
}
