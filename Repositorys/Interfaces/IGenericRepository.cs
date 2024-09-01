using TaskManagement.Models;

namespace TaskManagement.Repositorys.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        public Task<IEnumerable<T>> GetDataAllAsync();
        public Task<int> InsertAsync(T parameter);
        public Task<int> DeleteAsync(Guid Id);

    }
}
