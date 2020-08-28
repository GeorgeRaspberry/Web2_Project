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

      var user = await _userManager.FindByIdAsync(userId);
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
      var user = await _userManager.FindByIdAsync(token);
      return userFunctions.GetAllFriends(user);
    }

    [HttpGet]
    [Route("GetAllUsers/{token}")]
    public async Task<Object> GetAllUsers(string token)
    {
      var user = await _userManager.FindByIdAsync(token);
      List<ApplicationUser> allRequests = userFunctions.GetAllFriends(user);
      List<ApplicationUser> allUsers = await _userManager.Users.ToListAsync();
      allUsers.Remove(user);

      if (allRequests.Count() == 0)
        return allUsers;

      foreach (ApplicationUser tempUser in allUsers.ToList())
      {
        if (allRequests.Contains(tempUser))
        {
          allUsers.Remove(tempUser);
        }
      }

      if (allUsers.Count() == 0)
        return new List<ApplicationUser>();

      return allUsers;
    }

    [HttpPost]
    [Route("Register")]
    //POST : /api/ApplicationUser/Register
    public async Task<Object> PostApplicationUser([FromBody]ApplicationUserModel model)
    {
      var applicationUser = new ApplicationUser()
      {
        UserName = model.UserName,
        Email = model.Email,
        FullName = model.Name + ' ' + model.Lastname,
        PhoneNumber = model.PhoneNumber.ToString(),
        City = model.City,
        Authenticate = model.Authenticate,
        Role = "Registered",
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
      var user = await _userManager.FindByIdAsync(id);
      user.SentRequests.Add(new Requests() {FriendID = potentialId, Status = 0});

      var result = await _userManager.UpdateAsync(user);

      return NoContent();
    }

    [HttpPut("{id}")]
    [Route("RejectRequest/{id}/{potentialId}")]
    public async Task<IActionResult> RejectRequest(string id, string potentialId)
    {
      //var user = await _userManager.FindByIdAsync(id);
      //foreach (Requests req in user.ReceivedRequests.ToList())
      //{
      //  if (req.Status == 0)
      //    if (req.UserID == potentialId)
      //    {
      //      user.ReceivedRequests.Remove(req);
      //    }
      //}

      //var result = await _userManager.UpdateAsync(user);

      //user = await _userManager.FindByIdAsync(potentialId);
      //foreach (Requests req in user.SentRequests.ToList())
      //{
      //  if (req.Status == 0)
      //    if (req.UserID == id)
      //    {
      //      user.SentRequests.Remove(req);
      //    }
      //}

      //result = await _userManager.UpdateAsync(user);

      //List<ApplicationUser> tempList = await _userManager.Users.ToListAsync();

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
      var user = await _userManager.FindByIdAsync(id);
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
    // POST: api/<controller>/Login
    public async Task<IActionResult> SocialLogin([FromBody] LoginModel loginModel)
    {
      var test = _appSettings.JWT_Secret;
      if (VerifyToken(loginModel.IdToken))
      {
        var tokenDescriptor = new SecurityTokenDescriptor
        {
          Expires = DateTime.UtcNow.AddMinutes(5),
          //Key min: 16 characters
          SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var securityToken = tokenHandler.CreateToken(tokenDescriptor);
        var token = tokenHandler.WriteToken(securityToken);
        return Ok(new { token });
      }

      return Ok();
    }

    public bool VerifyToken(string providerToken)
    {
      var httpClient = new HttpClient();
      var requestUri = new Uri(string.Format(GoogleApiTokenInfoUrl, providerToken));

      HttpResponseMessage httpResponseMessage;

      try
      {
        httpResponseMessage = httpClient.GetAsync(requestUri).Result;
      }
      catch (Exception ex)
      {
        return false;
      }

      if (httpResponseMessage.StatusCode != HttpStatusCode.OK)
      {
        return false;
      }

      var response = httpResponseMessage.Content.ReadAsStringAsync().Result;
      var googleApiTokenInfo = JsonConvert.DeserializeObject<GoogleApiTokenInfo>(response);

      return true;
    }
  }
}
