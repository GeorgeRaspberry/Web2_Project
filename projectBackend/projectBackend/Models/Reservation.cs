using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Models
{
  public class Reservation
  {
    [Key]
    public int ID { get; set; }

    public int ReservationType { get; set; }
    [ForeignKey("Ride")]
    public int? RideID { get; set; }
    public virtual Ride Ride { get; set; }
    public int RideRating { get; set; }
    public DateTime RentRideStart { get; set; }
    public int RideRentDays { get; set; }
    [ForeignKey("Flight")]
    public int? FlightID { get; set; }
    public virtual Flight Flight { get; set; }
    public int BagCount { get; set; }
    public int NumberOfPeople { get; set; }
    public int FlightRating { get; set; }
    [ForeignKey("User")]
    public string UserID { get; set; }
    public virtual ApplicationUser User { get; set; }
    public int StatusRide { get; set; }
    public int StatusFlight { get; set; }

    public double Price { get; set; }

    public virtual List<Seat> Seats { get; set; }

  }
}
