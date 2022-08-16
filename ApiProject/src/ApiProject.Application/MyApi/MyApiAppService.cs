using Abp.Domain.Uow;
using ApiProject.EntityFrameworkCore;
using ApiProject.Query;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.MyApi
{
    public class MyApiAppService : IMyApiAppService
    {
        public MyApiAppService()
        {
        }

        [HttpGet]
        public async Task<string> asdasda()
        {
            return "";
        }
    }
}
