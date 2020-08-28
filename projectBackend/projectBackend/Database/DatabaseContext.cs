using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using projectBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Database
{
  public class DatabaseContext : IdentityDbContext
  {
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
    {
      
    }



    public DbSet<Flight> Flights { get; set; }
    public DbSet<FlightCompany> FlightCompanies { get; set; }
    public DbSet<ApplicationUser> ApplicationUsers { get; set; }
    public DbSet<Location> Locations { get; set; }
    public DbSet<RideCompany> RideCompanies { get; set; }
    public DbSet<Ride> Rides { get; set; }
  }
}
