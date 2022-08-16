using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using ApiProject.Authorization.Roles;
using ApiProject.Authorization.Users;
using ApiProject.MultiTenancy;
using ApiProject.Entitys;

namespace ApiProject.EntityFrameworkCore
{
    public class ApiProjectDbContext : AbpZeroDbContext<Tenant, Role, User, ApiProjectDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<DemoProductCategorys> DemoProductCategorys { get; set; }

        public ApiProjectDbContext(DbContextOptions<ApiProjectDbContext> options)
            : base(options)
        {
        }
    }
}
