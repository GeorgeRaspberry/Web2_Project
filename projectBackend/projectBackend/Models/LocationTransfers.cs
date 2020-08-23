
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Models
{
  public class LocationTransfers
  {
    [Key]
    public int ID { get; set; }
    public int FlightID { get; set; }
    [ForeignKey("FlightID")]
    public virtual Flight flight { get; set; }

    public int LocationID { get; set; }
    [ForeignKey("LocationID")]
    public virtual Location location { get; set; }
    public int Status { get; set; }
  }
}
