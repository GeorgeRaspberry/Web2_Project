using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Models
{
  public class DateCluster
  {
    private DateTime flyoffDate;

    public DateTime FlyoffDate
    {
      get { return flyoffDate; }
      set { flyoffDate = value; }
    }

    private DateTime landingDate;

    public DateTime LandingDate
    {
      get { return landingDate; }
      set { landingDate = value; }
    }

    private int id;

    public int ID
    {
      get { return id; }
      set { id = value; }
    }

  }
}
