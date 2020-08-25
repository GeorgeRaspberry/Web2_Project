using Microsoft.EntityFrameworkCore;
using projectBackend.Models;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Database
{
  public class UserContext:DbContext
  {
    public UserContext(DbContextOptions<UserContext> options) : base(options)
    {

    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseLazyLoadingProxies();
    }

    public DbSet<User> Users { get; set; }
  }
}
