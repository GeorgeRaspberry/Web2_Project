using Microsoft.EntityFrameworkCore;
using projectBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Database.DatabaseFunctions
{
  public class RideCompanyFunctions
  {
    private DatabaseContext Database;
    public RideCompanyFunctions(DatabaseContext database)
    {
      Database = database;
    }
    public List<Ride> GetFreeCars(List<Ride> rides)
    {
      foreach (var ride in rides.ToList())
      {
        foreach (var reservation in Database.Reservations.ToList())
        {
          if (reservation.RideID == ride.ID)
          {
            if (reservation.RentRideStart.AddDays(reservation.RideRentDays) > DateTime.Now)
            {
              rides.Remove(ride);
            }
          }
        }
      }

      return rides;
    }

    public double calculateRideRating(int companyID)
    {
      double sum = 0;
      int count = 0;

      foreach (var reservation in Database.Reservations)
      {
        if (reservation.ReservationType != 1 && reservation.ReservationType != 3)
        {
          if (reservation.Ride.CompanyID == companyID && reservation.RideRating != 0)
          {
            sum += reservation.RideRating;
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
