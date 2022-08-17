using Abp.Web.Models;
using ApiProject.EntityFrameworkCore;
using ApiProject.Entitys;
using ApiProject.MyApi.Dto;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using UnitOfWork;

namespace ApiProject.MyApi
{
    [Route("/api/v1/[controller]/[action]")]
    public class MyApiAppService : IMyApiAppService
    {
        private readonly IUnitOfWork unitOfWork;

        public MyApiAppService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> Asdasda(MyDto myDto)
        {
            var data = unitOfWork.FromSql<DemoProductCategorys>("SELECT *FROM  DemoProductCategorys");
            //IQueryable<DemoProductCategorys> users = unitOfWork.GetRepository<DemoProductCategorys>().GetAll();
            //unitOfWork.GetRepository<DemoProductCategorys>().Insert(new DemoProductCategorys { Name = "cmn", Active = true });
            unitOfWork.SaveChanges();
            return new OkObjectResult(data.ToList());
        }
    }
}
