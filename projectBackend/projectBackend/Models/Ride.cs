using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Models
{
  public class Ride
  {   
    [Key]
    public int ID { get; set; }
    public string CarMaker { get; set; }
    public string CarModel { get; set; }
    public string CarType { get; set; }
    public string ProductionYear { get; set; }
    public int NumberOfSeats { get; set; }
    public double price { get; set; }
    public int CompanyID { get; set; }
    [ForeignKey("CompanyID")]
    public virtual RideCompany Company { get; set; }

    public int LocationID { get; set; }
    [ForeignKey("LocationID")]
    public virtual Location Location { get; set; }

    public virtual List<Reservation> Reservations { get; set; }
  }
}
