using Microsoft.EntityFrameworkCore;
using projectBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Database
{
    public class FlightContext:DbContext
    {
        public FlightContext(DbContextOptions<FlightContext> options) : base(options)
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

        public DbSet<Flight> Flights { get; set; }
        public DbSet<FlightCompany> FlightCompanies { get; set; }
        public DbSet<projectBackend.Models.User> User { get; set; }

    }
}
