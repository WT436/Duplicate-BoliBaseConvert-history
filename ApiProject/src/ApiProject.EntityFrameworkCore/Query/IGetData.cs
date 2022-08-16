using ApiProject.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Query
{
    public interface IGetData<T> where T : class
    {
        DbSet<T> DbSet { get; }
        ApiProjectDbContext DbContext { get; set; }
        List<T> FromSqlQuery(string sql);
        T FromSqlManyQuery(string sql);
    }
}
