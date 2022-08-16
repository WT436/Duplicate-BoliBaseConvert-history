using ApiProject.EntityFrameworkCore;
using ApiProject.Query;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;

namespace ApiProject.MyApi
{
    public class MyApiAppService : IMyApiAppService
    {
        private readonly IUnitOfWork unitOfWork;

        public MyApiAppService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<string> asdasda()
        {
            var data = unitOfWork.FromSql("SELECT Name FROM ProcessDb.dbo.AbpTenants");
            throw new Exception();
            return data;
        }
    }
}
