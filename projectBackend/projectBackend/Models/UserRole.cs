using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Models
{
  public enum UserRole
  {
    Registered,
    Administrator,
    RideAdministrator,
    FlightAdministrator,
    NotLoggedIn
  }
}
