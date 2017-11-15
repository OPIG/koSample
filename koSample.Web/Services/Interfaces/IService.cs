using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace koSample.Web.Services
{
    using Data;
    public interface IService<T> where T : EntityBase
    {
        List<T> List(Expression<Func<T, bool>> selector = null);
        T Get(int id);
        T Get(Expression<Func<T, bool>> selector = null);
        void Add(T entity);
        void Delete(int id);
        void Update(T entity);
    }
}