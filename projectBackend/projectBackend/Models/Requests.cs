using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Models
{
  public class Requests
  {
    [Key]
    public int ID { get; set; }

    [ForeignKey("User")]
    public string UserID { get; set; }
    public virtual ApplicationUser User { get; set; }

    [ForeignKey("Friend")]
    public string FriendID { get; set; }
    public virtual ApplicationUser Friend { get; set; }
    public int Status { get; set; }
  }
}
