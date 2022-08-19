using ApiProject.MultiTenancy.Dto;
using ApiProject.Shared.Common;
using System.Threading.Tasks;
using System.Web.Http;
using UnitOfWork;
using UnitOfWork.Collections;

namespace ApiProject.MultiTenancy.MyTenant
{
    public class MyTenantAppService : IMyTenantAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        public MyTenantAppService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


        [HttpGet]
        public async Task<IPagedList<TenantBasicDto>> GetAll(SearchRequest input)
        {
            var data = await _unitOfWork.FromSqlPageListAsync<TenantBasicDto>(
                       sql: "SELECT ten.Name , ten.TenancyName FROM AbpTenants ten", orderBy: "ten.Name",
                       pageIndex: input.PageIndex, pageSize: input.PageSize);

            return data.Item2.MapToPagedList(input.PageIndex, input.PageSize, data.Item1, 1);
        }

    }
}
