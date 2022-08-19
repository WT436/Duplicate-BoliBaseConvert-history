using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.MultiTenancy.Dto
{
    public class TenantBasicDto
    {
        public int Id { get; set; }
        public string TenancyName { get; set; }
        public string Name { get; set; }
        public string ConnectionString { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
        public int LastModifierUserId { get; set; }
        public int LastModifierUserName { get; set; }
        public DateTime LastModificationTime { get; set; }
    }

    public class TenantFullDto : TenantBasicDto
    {
        public int EditionId { get; set; }
        public DateTime DeletionTime { get; set; }
        public int DeleterUserId { get; set; }
        public int CreatorUserId { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
