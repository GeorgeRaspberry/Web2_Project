
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Models
{
  public class Seat
  {
    [Key]
    public int ID { get; set; }
    [ForeignKey("Flight")]
    public int FlightID { get; set; }

    public virtual Flight Flight { get; set; }
    public string Name { get; set; }
    public int Order { get; set; }
    public int Type { get; set; }

    [ForeignKey("Reservation")]
    public int? ReservationID { get; set; }
    public virtual Reservation Reservation { get; set; }
  }
}
