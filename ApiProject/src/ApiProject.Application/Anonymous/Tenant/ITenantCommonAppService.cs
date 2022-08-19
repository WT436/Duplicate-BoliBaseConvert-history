using Abp.Application.Services;
using ApiProject.Anonymous.Tenant.Dto;
using ApiProject.Shared.Common;
using System.Threading.Tasks;
using UnitOfWork.Collections;

namespace ApiProject.Anonymous.Tenant
{
    public interface ITenantCommonAppService : IApplicationService
    {
        Task<IPagedList<TenantCommonDto>> GetAll(SearchRequest input);
    }
}
