using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Models
{
  public class FlightModel
  {
    public int ID { get; set; }
    public DateTime FlyOffTime { get; set; }
    public DateTime LandingTime { get; set; }
    public string FullFlightTime { get; set; }
    public int FlightLength { get; set; }
    public int NumberOfTransfers { get; set; }
    public int Price { get; set; }
    public int CompanyID { get; set; }

    public virtual ICollection<Location> LocationTransfers { get; set; }
  }
}
