using Abp.Application.Services;
using ApiProject.MyApi.Dto;
using ApiProject.Shared.Entitys;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.MyApi
{
    public interface IMyApiAppService : IApplicationService
    {
        Task<List<DemoProductCategorys>> Asdasda(MyDto myDto);
    }
}
