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
    public double calculateFlightRating(int companyID)
    {
      double sum = 0;
      int count = 0;

      foreach (var reservation in Database.Reservations.Include(f=>f.Flight).ToList())
      {
        if (reservation.ReservationType != 0 && reservation.ReservationType != 3)
        {
          if (reservation.Flight.CompanyID == companyID && reservation.FlightRating != 0)
          {
            sum += reservation.FlightRating;
            count++;
          }
        }
      }


      if (count == 0)
      {
        return 0;
      }
      return sum / count;
    }
  }
}
