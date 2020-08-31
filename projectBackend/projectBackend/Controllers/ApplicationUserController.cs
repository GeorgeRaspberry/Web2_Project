using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using projectBackend.Database;
using projectBackend.Database.DatabaseFunctions;
using projectBackend.Models;

namespace projectBackend.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ApplicationUserController : ControllerBase
  {
    private readonly DatabaseContext _context;
    private UserManager<ApplicationUser> _userManager;
    private SignInManager<ApplicationUser> _signInManager;
    private readonly ApplicationSettings _appSettings;
    private ApplicationUserFunctions userFunctions;
    private const string GoogleApiTokenInfoUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={0}";

    public ApplicationUserController(UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager, IOptions<ApplicationSettings> appSettings, DatabaseContext context)
    {
      _context = context;
      _userManager = userManager;
      _signInManager = signInManager;
      _appSettings = appSettings.Value;
      userFunctions = new ApplicationUserFunctions();
    }

    // GET: api/Flights
    [HttpGet]
    [Route("GetRegisteredUsers")]
    public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetRegisteredUsers()
    {
      var users = await _context.ApplicationUsers.ToListAsync();
      foreach (var item in users.ToList())
      {
        if (item.Role != "Registered")
        {
          users.Remove(item);
        }
      }

      return users;
    }

    [HttpGet]
    [Route("GetUserData/{token}")]
    public async Task<Object> GetUserData(string token)
    {
      if (token == null)
      {
        return null;
      }
      var tokenHandle = new JwtSecurityTokenHandler();
      var userToken = tokenHandle.ReadJwtToken(token);

      string userId = userToken.Payload["UserID"].ToString();

      var user = await _userManager.Users.Include(s => s.SentRequests).ThenInclude(fr => fr.Friend).Include(r => r.ReceivedRequests).ThenInclude(us => us.User).FirstOrDefaultAsync(i => i.Id == userId);
      if (user != null)
      {
        return user;
        /*string name = user.FullName.Split(' ')[0];
        string lastname = user.FullName.Split(' ')[1];

        ApplicationUserModel userModel = new ApplicationUserModel();
        var returnUser = new ApplicationUserModel()
        {
          ID = user.Id,
          UserName = user.UserName,
          Email = user.Email,
          Name = name,
          Lastname = lastname,
          PhoneNumber = Convert.ToInt32(user.PhoneNumber),
          City = user.City,
          Role = user.Role,
          FriendsList = userFunctions.GetAllFriends(user)
        };

        return returnUser;*/
      }
      else
      {
        return null;
      }
    }

    [HttpGet]
    [Route("Confirm/{token}")]
    public async Task<Object> Confirm(string token)
    {
      var user = await _userManager.FindByIdAsync(token);
      user.Authenticate = 1;
      var result = await _userManager.UpdateAsync(user);
      return result;
    }

    [HttpGet]
    [Route("GetAllFriends/{token}")]
    public async Task<Object> GetAllFriends(string token)
    {
      var user = await _userManager.Users.Include(s=>s.SentRequests).ThenInclude(fr=>fr.Friend).Include(r=>r.ReceivedRequests).ThenInclude(us=>us.User).FirstOrDefaultAsync(i => i.Id == token);
      return userFunctions.GetAllFriendsStatus(user);
    }

    [HttpGet]
    [Route("GetAllUsers/{token}")]
    public async Task<Object> GetAllUsers(string token)
    {
      if (token != "undefined") {
        var user = await _userManager.Users.Include(r=>r.ReceivedRequests).ThenInclude(us=>us.User).Include(s=>s.SentRequests).ThenInclude(fr=>fr.Friend).FirstOrDefaultAsync(i => i.Id == token);
        List<ApplicationUser> allRequests = userFunctions.GetAllFriends(user);
        List<ApplicationUser> allUsers = await _userManager.Users.ToListAsync();
        allUsers.Remove(user);

        if (allRequests.Count() == 0)
          return allUsers;

        foreach (ApplicationUser tempUser in allUsers.ToList())
        {
          foreach (var item in allRequests.ToList())
          {
            if (item.Id == tempUser.Id)
            {
              allUsers.Remove(tempUser);
              break;
            }
          }
        }

        if (allUsers.Count() == 0)
          return new List<ApplicationUser>();

        return allUsers;
      }
      else
      {
        //kada vracam sve korisnike a nemam ulogovanog korisnika
        return _userManager.Users.ToListAsync();
      }
    }

    [HttpPost]
    [Route("Register")]
    //POST : /api/ApplicationUser/Register
    public async Task<Object> PostApplicationUser([FromBody]ApplicationUserModel model)
    {
      //check if username is unique
      var allusers = await _userManager.Users.ToListAsync();
      foreach (ApplicationUser au in allusers)
      {
        if (au.UserName == model.UserName)
        {
          return HttpStatusCode.InternalServerError;
        }
      }
      string role = "Registered";
      if (model.UserName == "admin")
      {
        role = "Administrator";
      }

      var applicationUser = new ApplicationUser()
      {
        UserName = model.UserName,
        Email = model.Email,
        FullName = model.Name + ' ' + model.Lastname,
        PhoneNumber = model.PhoneNumber.ToString(),
        City = model.City,
        Authenticate = model.Authenticate,
        Role = role,
        Password = model.Password
      };

      try
      {
        var result = await _userManager.CreateAsync(applicationUser, model.Password);
        
        #region Mail
          MailMessage msg = new MailMessage();
          msg.From = new MailAddress("helpertravel45@gmail.com");
          msg.To.Add(new MailAddress(applicationUser.Email));
          msg.Subject = "Email Confirmation";
          msg.Body = "Please confirm your account by clicking this link: http://localhost:4200/confirm/" + applicationUser.Id;

          //string text = string.Format("Please click on this link to {0}: {1}", msg.Subject, msg.Body);
          //string html = "Please confirm your account by clicking this link: <a href=\"" + msg.Body + "\">link</a><br/>";

          //msg.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(text, null, MediaTypeNames.Text.Plain));
          //msg.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(html, null, MediaTypeNames.Text.Html));

          SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", Convert.ToInt32(587));
          smtpClient.UseDefaultCredentials = false;
          System.Net.NetworkCredential credentials = new System.Net.NetworkCredential("helpertravel45@gmail.com", "helpmeplease");
          smtpClient.Credentials = credentials;
          smtpClient.EnableSsl = true;
          smtpClient.Send(msg);
          #endregion
        
        return Ok(result);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpPost]
    [Route("UpdateUser/{id}")]
    public async Task<Object> UpdateUser(string id, [FromBody] ApplicationUserModel model)
    {
      try
      {
        var currentUser = await _userManager.FindByIdAsync(id);

        if (model.Password != currentUser.Password)
        {
          var result1 = await _userManager.RemovePasswordAsync(currentUser);
          result1 = await _userManager.AddPasswordAsync(currentUser, model.Password);
        }

        currentUser.UserName = model.UserName;
        currentUser.Email = model.Email;
        currentUser.FullName = model.Name + ' ' + model.Lastname;
        currentUser.PhoneNumber = model.PhoneNumber.ToString();
        currentUser.City = model.City;
        currentUser.Authenticate = 0;
        currentUser.Role = model.Role;

        var result = await _userManager.UpdateAsync(currentUser);

        return Ok(result);
      }
      catch (Exception ex)
      {

        throw ex;
      }
    }

    [HttpPost]
    [Route("Login")]
    //POST : /api/ApplicationUser/Login
    public async Task<IActionResult> Login(LoginModel model)
    {
      var user = await _userManager.FindByNameAsync(model.Username);

      if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
      {
        if (user.Authenticate == 0)
          return BadRequest(new { message = "User did not activate account!" });

        var tokenDescriptor = new SecurityTokenDescriptor
        {
          Subject = new ClaimsIdentity(new Claim[]
            {
                        new Claim("UserID", user.Id.ToString()),
            }),
          Expires = DateTime.UtcNow.AddDays(1),
          SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
        };
        if (user.Role == "Registered")
        {
          tokenDescriptor.Subject.AddClaim(new Claim("Roles", "Registered"));
        }
        else if (user.Role == "Administrator")
        {
          tokenDescriptor.Subject.AddClaim(new Claim("Roles", "Administrator"));
        }
        else if (user.Role == "RideAdministrator")
        {
          tokenDescriptor.Subject.AddClaim(new Claim("Roles", "RideAdministrator"));
        }
        else if (user.Role == "FlightAdministrator")
        {
          tokenDescriptor.Subject.AddClaim(new Claim("Roles", "FlightAdministrator"));
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var securityToken = tokenHandler.CreateToken(tokenDescriptor);
        var token = tokenHandler.WriteToken(securityToken);
        return Ok(new { token });
      }
      else
        return BadRequest(new { message = "Username or password is incorrect." });
    }

    [HttpPut("{id}")]
    [Route("SendRequest/{id}/{potentialId}")]
    public async Task<IActionResult> SendRequest(string id, string potentialId)
    {
      var user = await _userManager.Users.Include(r=>r.ReceivedRequests).Include(s=>s.SentRequests).FirstOrDefaultAsync(i => i.Id == id);
      user.SentRequests.Add(new Requests() {FriendID = potentialId, Status = 0});

      var result = await _userManager.UpdateAsync(user);

      return NoContent();
    }

    [HttpPut("{id}")]
    [Route("RejectRequest/{id}/{potentialId}")]
    public async Task<IActionResult> RejectRequest(string id, string potentialId)
    {
      foreach(Requests req in _context.Requests.ToList())
      {
        if (req.FriendID == id)
        {
          _context.Requests.Remove(req);
          break;
        }
      }

      await _context.SaveChangesAsync();

      return NoContent();
    }

    [HttpPut("{id}")]
    [Route("AcceptRequest/{id}/{potentialId}")]
    public async Task<IActionResult> AcceptRequest(string id, string potentialId)
    {
      var user = await _userManager.Users.Include(r => r.ReceivedRequests).FirstOrDefaultAsync(i => i.Id == id);
      foreach (Requests req in user.ReceivedRequests.ToList())
      {
        if (req.UserID == potentialId)
        {
          req.Status = 1;
          break;
        }
      }

      var result = await _userManager.UpdateAsync(user);

      return NoContent();
    }

    [HttpPut("{id}")]
    [Route("RemoveFriend/{id}/{potentialId}")]
    public async Task<IActionResult> RemoveFriend(string id, string potentialId)
    {
      foreach (Requests req in _context.Requests.ToList())
      {
        if (req.Status == 1)
          if ((req.UserID == id && req.FriendID == potentialId) || (req.UserID == potentialId && req.FriendID == id))
          {
            _context.Requests.Remove(req);
            break;
          }
      }

      await _context.SaveChangesAsync();

      return NoContent();
    }


    [HttpPost]
    [Route("SocialLogin")]
    public async Task<IActionResult> SocialLogin(LoginModel model)
    {
      var tokenVerification = await VerifyToken(model.IdToken);
      if (tokenVerification.isValid)
      {
        var user = await _userManager.FindByEmailAsync(tokenVerification.apiTokenInfo.email);

        if (user is null)
        {
          user = new ApplicationUser()
          {
            UserName = tokenVerification.apiTokenInfo.email.Split("@")[0],
            FullName = "User User",
            Password = tokenVerification.apiTokenInfo.email.Split("@")[0],
            Role = "Registered",
            Email = tokenVerification.apiTokenInfo.email,
            City = "default",
            PhoneNumber = "123123123",
            Authenticate = 1
          };
          try
          {
            await _userManager.CreateAsync(user, user.Password);
          }
          catch (Exception e)
          {
            Console.WriteLine(e);
          }
          
        }

        var tokenDescriptor = new SecurityTokenDescriptor
        {
          Subject = new ClaimsIdentity(new Claim[]
            {
                        new Claim("UserID", user.Id.ToString()),
            }),
          Expires = DateTime.UtcNow.AddDays(1),
          SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var securityToken = tokenHandler.CreateToken(tokenDescriptor);
        var token = tokenHandler.WriteToken(securityToken);

        return Ok(new { token });
      }

      return BadRequest(new { message = "Error loging in with google" });
    }

    private async Task<(bool isValid, GoogleApiToken apiTokenInfo)> VerifyToken(string providerToken)
    {
      var httpClient = new HttpClient();
      var requestUri = new Uri($"https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={providerToken}");

      HttpResponseMessage responseMessage;

      try
      {
        responseMessage = await httpClient.GetAsync(requestUri);
      }
      catch (Exception)
      {
        return (false, null);
      }

      if (responseMessage.StatusCode != HttpStatusCode.OK)
      {
        return (false, null);
      }

      var response = await responseMessage.Content.ReadAsStringAsync();
      var googleApiToken = JsonConvert.DeserializeObject<GoogleApiToken>(response);
      return (true, googleApiToken);
    }

  }
}
