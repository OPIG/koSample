using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace koSample.Web.Services
{
    using Data;
    using Repositories;
    public abstract class ServiceBase<T> : IService<T> where T : EntityBase
    {
        protected IRepository<T> Repository { get; private set; }
        public ServiceBase(IRepository<T> repository)
        {
            Repository = repository;
        }

        public void Add(T entity)
        {
            Repository.Add(entity);
        }

        public void Delete(int id)
        {
            Repository.Delete(id);
        }

        public T Get(Expression<Func<T, bool>> selector = null)
        {
            return Repository.Entities.FirstOrDefault(selector);
        }

        public T Get(int id)
        {
            return Repository.Entities.FirstOrDefault(o => o.Id == id);
        }

        public List<T> List(Expression<Func<T, bool>> selector = null)
        {
            IQueryable<T> query = Repository.Entities;
            if (selector != null)
            {
                query = query.Where(selector);
            }

            return query.ToList();
        }

        public void Update(T entity)
        {
            Repository.Update(entity);
        }
    }
}