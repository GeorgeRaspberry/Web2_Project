using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Models
{
    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string IdToken { get; set; }
    }
}
