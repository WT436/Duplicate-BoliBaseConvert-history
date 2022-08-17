using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.MyApi.Dto
{
    public class MyDto
    {
        [MaxLength(1, ErrorMessage = "Loi cmm")]
        public string Name { get; set; }
    }
}
