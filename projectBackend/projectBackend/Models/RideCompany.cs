using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Models
{
  public class RideCompany
  {
    [Key]
    public int ID { get; set; }
    public string Name { get; set; }
    public string Image { get; set; }
    public string Address { get; set; }
    public string PromoDescription { get; set; }
    public int Rating { get; set; }
    public virtual List<Ride> Rides { get; set; }
 
  }
}
