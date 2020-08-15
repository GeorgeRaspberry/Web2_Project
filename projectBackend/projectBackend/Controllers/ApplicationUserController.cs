using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using projectBackend.Models;

namespace projectBackend.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ApplicationUserController : ControllerBase
  {
    private UserManager<ApplicationUser> _userManager;
    private SignInManager<ApplicationUser> _signInManager;
    private readonly ApplicationSettings _appSettings;

    public ApplicationUserController(UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager, IOptions<ApplicationSettings> appSettings)
    {
      _userManager = userManager;
      _signInManager = signInManager;
      _appSettings = appSettings.Value;
    }

    [HttpGet]
    [Route("GetUserData/{token}")]
    public async Task<Object> GetUserData(string token)
    {
      var tokenHandle = new JwtSecurityTokenHandler();
      var userToken = tokenHandle.ReadJwtToken(token);

      string userId = userToken.Payload["UserID"].ToString();

      var user = await _userManager.FindByIdAsync(userId);
      string name = user.FullName.Split(' ')[0];
      string lastname = user.FullName.Split(' ')[1];

      ApplicationUserModel userModel = new ApplicationUserModel();
      var returnUser = new ApplicationUserModel()
      {
        UserName = user.UserName,
        Email = user.Email,
        Name = name,
        Lastname = lastname,
        PhoneNumber = 1,
        City = user.City,
        Role = user.Role
      };

      return returnUser;
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
        Role = "FlightAdministrator"
      };

      try
      {
        var result = await _userManager.CreateAsync(applicationUser, model.Password);
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
    private const string GoogleApiTokenInfoUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={0}";

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