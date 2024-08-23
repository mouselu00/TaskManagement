using TaskManagement.DBContext;
using TaskManagement.Repositorys.Interfaces;

namespace TaskManagement.Repositorys
{


    public class UnitOfWork : IUnitOfWork
    {
        private readonly DapperContext _dapperContext;
        public UnitOfWork(DapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }
        public void BeginTransaction()
        {
            _dapperContext.dbTransaction = _dapperContext.dbConnection.BeginTransaction();
        }

        public void Commit()
        {
            _dapperContext?.dbTransaction?.Commit();
            Dispose();
        }


        public void Rollback()
        {
            _dapperContext?.dbTransaction?.Rollback();
            Dispose();
        }


        public void Dispose() => _dapperContext.Dispose();
    }
}
