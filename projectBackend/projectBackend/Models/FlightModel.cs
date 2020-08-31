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
    public double Price { get; set; }
    public int CompanyID { get; set; }

    public FlightModel(int iD, DateTime flyOffTime, DateTime landingTime, string fullFlightTime, int flightLength, int numberOfTransfers, int price, int companyID, ICollection<Location> locationTransfers)
    {
      ID = iD;
      FlyOffTime = flyOffTime;
      LandingTime = landingTime;
      FullFlightTime = fullFlightTime;
      FlightLength = flightLength;
      NumberOfTransfers = numberOfTransfers;
      Price = price;
      CompanyID = companyID;
      LocationTransfers = locationTransfers;
    }

    public virtual ICollection<Location> LocationTransfers { get; set; }
  }
}
