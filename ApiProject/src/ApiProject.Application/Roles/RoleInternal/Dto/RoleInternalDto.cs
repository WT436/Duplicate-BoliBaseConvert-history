using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Roles.RoleInternal.Dto
{
    public class RoleInternalInsertDto
    {

    }

    public class RoleInternalDetailDto : RoleInternalReadDto
    {

    }

    public class RoleInternalReadDto
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public bool IsDefault { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsStatic { get; set; }
        public string Name { get; set; }
        public int TenantId { get; set; }
        public string TenantName { get; set; }
        public string Description { get; set; }
        public DateTime LastModificationTime { get; set; }
        public int LastModifierUserId { get; set; }
        public string LastModifierUserName { get; set; }
    }



}
