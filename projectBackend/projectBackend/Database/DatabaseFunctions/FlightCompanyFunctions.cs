using Microsoft.EntityFrameworkCore;
using projectBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Database.DatabaseFunctions
{
  public class FlightCompanyFunctions
  {
    private DatabaseContext Database;
    public FlightCompanyFunctions(DatabaseContext database)
    {
      Database = database;
    }


    public async Task<IEnumerable<Flight>> GetFlightsByAirlineId(int companyID)
    {
      var query = Database.Flights.Where(i => i.CompanyID == companyID);

      return await Task.FromResult(query.ToList());
    }

  }
}
