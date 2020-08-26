using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Models
{
  public class Location
  {
    [Key]
    public int ID { get; set; }
    public string Name { get; set; }

    [JsonIgnore]
    public virtual ICollection<LocationTransfers> LocationTransfers { get; set; }
  }
}
