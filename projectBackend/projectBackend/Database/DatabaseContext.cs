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

    //protected override void OnModelCreating(ModelBuilder modelBuilder)
    //{
    //  modelBuilder.Entity<Requests>()
    //    .HasKey(u => new { u.UserID, u.FriendID });

    //  modelBuilder.Entity<Requests>()
    //      .HasOne(c => c.User)
    //      .WithMany(u => u.SentRequests)
    //      .HasForeignKey(c => c.UserID).OnDelete(DeleteBehavior.Cascade);

    //  modelBuilder.Entity<Requests>()
    //      .HasOne(c => c.Friend)
    //      .WithMany(u => u.ReceivedRequests).IsRequired()
    //      .HasForeignKey(c => c.FriendID).OnDelete(ReferentialAction.Cascade);

    //  base.OnModelCreating(modelBuilder);
    //}

    public DbSet<Flight> Flights { get; set; }
    public DbSet<FlightCompany> FlightCompanies { get; set; }
    public DbSet<ApplicationUser> ApplicationUsers { get; set; }
    public DbSet<Location> Locations { get; set; }
    public DbSet<Requests> Requests { get; set; }
  }
}
