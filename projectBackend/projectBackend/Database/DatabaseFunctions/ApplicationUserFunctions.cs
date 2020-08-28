using projectBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Database.DatabaseFunctions
{
  public class ApplicationUserFunctions
  {
    private DatabaseContext Database;

    public List<ApplicationUser> GetAllFriends (ApplicationUser user)
    {
      if (user == null)
        return null;

      List<ApplicationUser> allUsers = new List<ApplicationUser>();
      List<Requests> allRequests = user.SentRequests.ToList();

      foreach (var req in allRequests)
        {
          allUsers.Add(req.Friend);
        }

      allRequests.Clear();
      allRequests = user.ReceivedRequests.ToList();

      foreach (var req in allRequests)
        {
          allUsers.Add(req.User);
        }

      return allUsers;
    }
  }
}
