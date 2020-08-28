using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Models
{
  public class Location
  {
    [Key]
    public int ID { get; set; }
    public string Name { get; set; }

    [InverseProperty("Location")]
    public virtual ICollection<LocationTransfers> LocationTransfers { get; set; }
    public virtual List<Ride> Rides { get; set; }
  }
}
