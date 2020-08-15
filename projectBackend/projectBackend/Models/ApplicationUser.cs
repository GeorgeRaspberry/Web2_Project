using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Column(TypeName ="nvarchar(150)")]
        public string FullName { get; set; }

        [Column(TypeName ="nvarchar(150)")]
        public string City { get; set; }
<<<<<<< HEAD

        [Column(TypeName = "nvarchar(150)")]
        public int Authenticate { get; set; }
=======
        [Column(TypeName = "nvarchar(150)")]
        public string Role { get; set; }
>>>>>>> 718123fa023ea5f2cd18d3d021b8d0b13b4f0648
  }
}
