using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Models
{
    public class ApplicationUserModel
    {
    public string ID { get; set; }
    public string Name { get; set; }

    public string Lastname { get; set; }

    public int PhoneNumber { get; set; }

    public string Email { get; set; }

    public string UserName { get; set; }

    public string Password { get; set; }

    public string City { get; set; }

    public string Role { get; set; }

    public int Authenticate { get; set; }
  }
}
