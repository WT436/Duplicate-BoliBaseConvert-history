using ApiProject.EntityFrameworkCore;
using ApiProject.Query;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace ApiProject.Query
{
    public class GetData<T> : IGetData<T> where T : class
    {
        public ApiProjectDbContext DbContext;

        public GetData(ApiProjectDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public DbSet<T> DbSet
        {
            get
            {
                return DbContext.Set<T>();
            }
        }

        ApiProjectDbContext IGetData<T>.DbContext { get; set; }

        public T FromSqlManyQuery(string sql)
        {
            return (T)DbSet.FromSqlRaw(sql).FirstOrDefault();
        }

        public List<T> FromSqlQuery(string sql)
        {
            return DbSet.FromSqlRaw(sql).ToList();
        }
    }
}
