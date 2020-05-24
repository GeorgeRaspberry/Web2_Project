using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Models
{
    public class Flight
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public DateTime FlyOffTime { get; set; }
        public DateTime LandingTime { get; set; }
        public string FullFlightTime { get; set; }
        public int FlightLength { get; set; }
        public int NumberOfTransfers { get; set; }
        public string LocationTransfers { get; set; }
        public int Price { get; set; }
        //[Required]
        //public virtual ICollection<Destination> LocationOfTransfers { get; set; }
        public int CompanyID { get; set; }
        public virtual FlightCompany Company { get; set; }
    }
}
