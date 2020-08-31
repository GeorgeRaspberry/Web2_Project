using projectBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Database.DatabaseFunctions
{
  public class FlightFunctions
  {
    private DatabaseContext Database;
    public FlightFunctions(DatabaseContext database)
    {
      Database = database;
    }

    public List<FlightModel> getFlightModel(Flight flight)
    {
      return null;
    }

    public void locationTransfersOrder(Flight flight)
    {
      List<LocationTransfers> transfers = flight.LocationTransfers.ToList();
      for (int i = 0; i < transfers.Count; i++)
      {
        if (transfers[i].Status == 1)
        {
          var temp = transfers[0];
          transfers[0] = transfers[i];
          transfers[i] = temp;
        }
        else if (transfers[i].Status == 2)
        {
          var temp = transfers[transfers.Count-1];
          transfers[transfers.Count-1] = transfers[i];
          transfers[i] = temp;
        }
      }
      flight.LocationTransfers = transfers;  
    }

    public List<Flight> checkFlightDate(List<Flight> flights)
    {
       foreach (var item in flights.ToList())
      {
        var now = DateTime.Now;
        if (item.FlyOffTime < now)
        {
          flights.Remove(item);
        }
      }
      return flights;
    }
  }
}
