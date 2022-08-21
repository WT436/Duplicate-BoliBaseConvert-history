using Abp.Application.Services;
using ApiProject.Roles.RoleInternal.Dto;
using ApiProject.Shared.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork.Collections;

namespace ApiProject.Roles.RoleInternal
{
    public interface IRoleInternalAppService : IApplicationService
    {
        public Task<IPagedList<RoleInternalReadDto>> GetAllRole(SearchRequest input);
    }
}
