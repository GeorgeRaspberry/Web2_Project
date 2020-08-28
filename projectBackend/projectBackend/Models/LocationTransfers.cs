
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
    [ForeignKey("Flight")]
    public int FlightID { get; set; }
    public virtual Flight Flight { get; set; }
    [ForeignKey("Location")]
    public int LocationID { get; set; }
    public virtual Location Location { get; set; }
    public int Status { get; set; }
  }
}
