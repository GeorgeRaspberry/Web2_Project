using Microsoft.EntityFrameworkCore;
using projectBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Database.DatabaseFunctions
{
  public class ReservationFunctions
  {
    private DatabaseContext Database;
    public ReservationFunctions(DatabaseContext database)
    {
      Database = database;
    }

    public void UpdateReservationStatus()
    {
      foreach (var reservation in Database.Reservations.Include(u=>u.User).Include(f=>f.Flight).ToList())
      {
        if (reservation.ReservationType == 0)
        {
          DateTime now = DateTime.Now;

          if (now > reservation.RentRideStart.AddDays(reservation.RideRentDays))
          {
            if (reservation.StatusRide != 2)
            {
              ApplicationUser user = reservation.User;
              user.Points += reservation.RideRentDays / 5;
              Database.Entry(user).State = EntityState.Modified;
              Database.SaveChanges();
            }
            reservation.StatusRide = 2;
          }
          else if (now > reservation.RentRideStart.AddDays(-2))
          {
            reservation.StatusRide = 1;
          }
          else
          {
            reservation.StatusRide = 0;
          }

        }
        else if (reservation.ReservationType == 3)
        {
          // test
        }
        else
        {
          DateTime now = DateTime.Now;
          if (now > reservation.Flight.LandingTime)
          {
            if (reservation.StatusFlight != 2)
            {
              ApplicationUser user = reservation.User;
              user.Points += reservation.Flight.FlightLength / 100;
              Database.Entry(user).State = EntityState.Modified;
              Database.SaveChanges();
            }
            reservation.StatusFlight = 2;
          }
          else if (now > reservation.Flight.FlyOffTime.AddHours(-3))
          {
            reservation.StatusFlight = 1;
          }
          else
          {
            reservation.StatusFlight = 0;
          }
          if (reservation.ReservationType == 2)
          {
            if (now > reservation.RentRideStart.AddDays(reservation.RideRentDays))
            {
              if (reservation.StatusRide != 2)
              {
                ApplicationUser user = reservation.User;
                user.Points += reservation.RideRentDays / 5;
                Database.Entry(user).State = EntityState.Modified;
                Database.SaveChanges();
              }
              reservation.StatusRide = 2;
            }
            else
            {
              reservation.StatusRide = 4;
            }
          }
        }

        Database.Entry(reservation).State = EntityState.Modified;
      }
      try
      {
        Database.SaveChanges();
      }
      catch (DbUpdateConcurrencyException)
      {
      }
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
          var temp = transfers[transfers.Count - 1];
          transfers[transfers.Count - 1] = transfers[i];
          transfers[i] = temp;
        }
      }
      flight.LocationTransfers = transfers;
    }
  }
}
