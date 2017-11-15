using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace koSample.Web.Repositories
{
    using Data;
    public interface IRepository<T> where T : EntityBase
    {
        DbSet<T> Entities { get; }
        void Add(T entity);
        void Update(T entity);
        void Delete(int id);
        T GetEntity(int id);
    }
}
