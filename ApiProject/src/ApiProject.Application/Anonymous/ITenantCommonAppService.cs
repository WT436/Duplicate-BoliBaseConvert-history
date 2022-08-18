using Abp.Application.Services;
using ApiProject.Anonymous.Dto;
using ApiProject.Shared.Common;
using System.Threading.Tasks;
using UnitOfWork.Collections;

namespace ApiProject.Anonymous
{
    public interface ITenantCommonAppService : IApplicationService
    {
        Task<IPagedList<TenantCommonDto>> GetAll(SearchRequest input);
    }
}
