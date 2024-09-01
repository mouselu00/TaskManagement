using Dapper;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;
using TaskManagement.DBContext;
using TaskManagement.Models;
using TaskManagement.Repositorys.Interfaces;

namespace TaskManagement.Repositorys
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly ILogger<GenericRepository<T>> _logger;
        private readonly DapperContext _dapperContext;
        public GenericRepository(ILogger<GenericRepository<T>> logger, DapperContext dapperContext)
        {
            _logger = logger;
            _dapperContext = dapperContext;
        }

        public async Task<IEnumerable<T>> GetDataAllAsync()
        {
            IEnumerable<T> result = null;
            try
            {
                string tableName = GetTableName();
                string sql = $"SELECT * FROM {tableName} ";
                result = await _dapperContext.dbConnection.QueryAsync<T>(sql);
            }
            catch (Exception ex)
            {
                _logger.LogError($"GetDataAllAsync : {ex.Message}");
            }
            return result;
        }

        public async Task<int> InsertAsync(T parameter)
        {
            int rowsEffected = 0;
            try
            {
                string tableName = GetTableName();
                string columns = GerColumns();
                string properties = GetProperties();
                string sql = $"insert into {tableName} ({columns} ) values ({properties}) ";
                rowsEffected = await _dapperContext.dbConnection.ExecuteAsync(sql, parameter, _dapperContext.dbTransaction);
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
                string tableName = GetTableName();
                string keyProperty = GetKeyPropertyName();
                string sql = $"DELETE {tableName} WHERE {keyProperty} = @Id";
                rowsEffected = await _dapperContext.dbConnection.ExecuteAsync(sql, new { Id = Id }, _dapperContext.dbTransaction);
            }
            catch (Exception ex)
            {
                _logger.LogError($"DeleteAsync : {ex.Message}");
            }
            return rowsEffected;
        }

        private string GetTableName()
        {
            string tableName = "";
            MemberInfo type = typeof(T).GetTypeInfo();
            var tableAttribute = type.GetCustomAttribute<TableAttribute>();
            if (tableAttribute != null)
            {
                tableName = tableAttribute.Name;
            }
            return tableName;
        }
        private string GetKeyPropertyName()
        {
            var prop = typeof(T).GetProperties().Where(p => p.GetCustomAttribute<KeyAttribute>() != null);

            if (prop.Any())
            {
                return prop.FirstOrDefault().Name;
            }

            return null;
        }
        private string GerColumns()
        {
            var column = string.Join(',', typeof(T).GetProperties()
                //.Where(p => p.IsDefined(typeof(KeyAttribute)))
                .Select(p =>
                {
                    var columnAttribute = p.GetCustomAttribute<ColumnAttribute>();
                    return columnAttribute != null ? columnAttribute.Name : p.Name;
                }));

            return column;
        }

        private string GetProperties()
        {
            var properties = typeof(T).GetProperties();
            //.Where(p => p.GetCustomAttribute<KeyAttribute>() == null);
            if (properties.Any())
            {
                var values = string.Join(", ", properties.Select(p =>
                {
                    return $"@{p.Name}";
                }));
                return values;
            }
            return null;
        }
    }


}
