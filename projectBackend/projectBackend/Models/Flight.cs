using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace projectBackend.Models
{
  public class Flight
  {
    [Key]
    public int ID { get; set; }
    public DateTime FlyOffTime { get; set; }
    public DateTime LandingTime { get; set; }
    public string FullFlightTime { get; set; }
    public int FlightLength { get; set; }
    public int NumberOfTransfers { get; set; }
    public int Price { get; set; }
    public int CompanyID { get; set; }
    [ForeignKey("CompanyID")]
    public virtual FlightCompany Company { get; set; }
    [InverseProperty("Flight")]
    public virtual ICollection<LocationTransfers> LocationTransfers { get; set; }
  }
}
