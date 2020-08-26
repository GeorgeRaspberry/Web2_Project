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
  }
}
