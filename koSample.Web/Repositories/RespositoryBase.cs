using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace koSample.Web.Repositories
{
    using Data;
    public abstract class RespositoryBase<T> : IRepository<T> where T : EntityBase
    {
        protected DbContext Context { set; get; }
        public RespositoryBase(DbContext dbContext)
        {
            Context = dbContext;
        }

        public DbSet<T> Entities
        {
            get
            {
                return Context.Set<T>();
            }
        }

        public void Delete(int id)
        {
            var set = Context.Set<T>();
            var entity = set.FirstOrDefault(o => o.Id == id);
            if (entity != null)
            {
                Context.Set<T>().Remove(entity);
                Context.SaveChanges();
            }
        }

        public T GetEntity(int id)
        {
            var set = Context.Set<T>();
            var entity = set.FirstOrDefault(o => o.Id == id);
            return entity;
        }

        public void Add(T entity)
        {
            var set = Context.Set<T>();
            set.Add(entity);
            Context.SaveChanges();
        }

        public void Update(T entity)
        {
            var set = Context.Set<T>();
            var original = set.FirstOrDefault(o => o.Id == entity.Id);
            if (original != null)
            {
                Context.Entry(original).CurrentValues.SetValues(entity);
                Context.SaveChanges();
            }
        }
    }
}