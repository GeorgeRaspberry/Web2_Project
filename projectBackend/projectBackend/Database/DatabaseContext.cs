using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
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
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);
    }



    public DbSet<Flight> Flights { get; set; }
    public DbSet<FlightCompany> FlightCompanies { get; set; }
    public DbSet<ApplicationUser> ApplicationUsers { get; set; }
    public DbSet<Location> Locations { get; set; }
    public DbSet<RideCompany> RideCompanies { get; set; }
    public DbSet<Ride> Rides { get; set; }
    public DbSet<Requests> Requests { get; set; }
    public DbSet<Reservation> Reservations { get; set; }
    public DbSet<Seat> Seats { get; set; }
  }
}
