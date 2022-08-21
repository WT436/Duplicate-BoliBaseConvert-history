using ApiProject.Roles.RoleInternal.Dto;
using ApiProject.Shared.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using UnitOfWork.Collections;

namespace ApiProject.Roles.RoleInternal
{
    public class RoleInternalAppService : IRoleInternalAppService
    {
        private readonly IUnitOfWork _unitOfWork;

        public RoleInternalAppService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public Task<IPagedList<RoleInternalReadDto>> GetAllRole(SearchRequest input)
        {
            // Kiểm tra tenant
            // Check User Id
            // Lấy dữ liệu
            // sử lý dữ liệu
            throw new NotImplementedException();
        }
    }
}
