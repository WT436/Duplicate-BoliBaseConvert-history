using ApiProject.Anonymous.Dto;
using ApiProject.Shared.Common;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using UnitOfWork;
using UnitOfWork.Collections;

namespace ApiProject.Anonymous
{
    [Route("/api/v1/[controller]/[action]")]
    public class TenantCommonAppService : ITenantCommonAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        public TenantCommonAppService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IPagedList<TenantCommonDto>> GetAll(SearchRequest input)
        {
            var data = _unitOfWork.FromSqlPageList<TenantCommonDto>(
                       sql: "SELECT ten.Name , ten.TenancyName FROM AbpTenants ten", orderBy: "ten.Name",
                       pageIndex: input.PageIndex, pageSize: input.PageSize, totalCount: out int totalcount);

            return data.MapToPagedList(input.PageIndex, input.PageSize, totalcount, 1);
        }
    }
}
