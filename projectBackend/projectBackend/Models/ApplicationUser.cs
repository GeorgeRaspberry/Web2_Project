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
    [Column(TypeName = "nvarchar(150)")]
    public string FullName { get; set; }

    [Column(TypeName = "nvarchar(150)")]
    public string City { get; set; }

    [Column(TypeName = "nvarchar(150)")]
    public string Password { get; set; }

    [Column(TypeName = "nvarchar(150)")]
    public int Authenticate { get; set; }

    [Column(TypeName = "nvarchar(150)")]
    public string Role { get; set; }
    public int Points { get; set; }
    [InverseProperty("User")]
    public virtual ICollection<Requests> SentRequests { get; set; }

    [InverseProperty("Friend")]
    public virtual ICollection<Requests> ReceivedRequests { get; set; }

    public virtual List<Reservation> Reservations { get; set; }

  }
}
