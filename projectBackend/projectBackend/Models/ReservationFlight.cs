using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Models
{
  public class ReservationFlight
  {
    public List<Reservation> Reservations { get; set; }
    public List<Seat> Seats { get; set; }
    public List<ApplicationUser> Users { get; set; }
  }
}
