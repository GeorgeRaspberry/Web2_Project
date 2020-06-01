using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Models
{
    public class ApplicationUserModel
    {
    public string Name { get; set; }

    public string Lastname { get; set; }

    public int PhoneNumber { get; set; }

    public string Email { get; set; }

    public string UserName { get; set; }

    public string Password { get; set; }

    private string city;

    public string City
    {
      get { return city; }
      set { city = value; }
    }

    public string Role { get; set; }
  }
}
