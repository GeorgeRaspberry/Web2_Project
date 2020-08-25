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


  }
}
