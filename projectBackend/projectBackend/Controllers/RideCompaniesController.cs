using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projectBackend.Database;
using projectBackend.Database.DatabaseFunctions;
using projectBackend.Models;

namespace projectBackend.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class RideCompaniesController : ControllerBase
  {
    private readonly DatabaseContext _context;
    private RideCompanyFunctions rideCompanyFunction;


    public RideCompaniesController(DatabaseContext context)
    {
      _context = context;
      rideCompanyFunction = new RideCompanyFunctions(_context);
    }

    // GET: api/FlightCompanies
    [HttpGet]
    public async Task<ActionResult<List<RideCompany>>> GetRideCompanies()
    {
      var companies = await _context.RideCompanies.ToListAsync();

      foreach (var item in companies)
      {
        item.Rating= rideCompanyFunction.calculateRideRating(item.ID);
      }

      return companies;
    }

    // GET: api/FlightCompanies/5
    [HttpGet("{id}")]
    public async Task<ActionResult<RideCompany>> GetRideCompany(int id)
    {
      var rideCompany = await _context.RideCompanies.FirstOrDefaultAsync(i => i.ID == id);

      if (rideCompany == null)
      {
        return NotFound();
      }

      rideCompany.Rating = rideCompanyFunction.calculateRideRating(rideCompany.ID);
      rideCompany.Rides = rideCompanyFunction.GetFreeCars(rideCompany.Rides);

      return rideCompany;
    }

    // PUT: api/FlightCompanies/5
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPut("{id}")]
    public async Task<IActionResult> PutRideCompany(int id, RideCompany rideCompany)
    {
      if (id != rideCompany.ID)
      {
        return BadRequest();
      }

      _context.Entry(rideCompany).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!RideCompanyExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    // POST: api/FlightCompanies
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPost]
    public async Task<ActionResult<RideCompany>> PostRideCompany(RideCompany rideCompany)
    {

      var user = await _context.ApplicationUsers.FindAsync(rideCompany.UserID);
      user.Role = "RideAdministrator";

      _context.Entry(user).State = EntityState.Modified;
      _context.SaveChanges();


      _context.RideCompanies.Add(rideCompany);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetRideCompany", new { id = rideCompany.ID }, rideCompany);
    }

    // DELETE: api/FlightCompanies/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<RideCompany>> DeleteRideCompany(int id)
    {
      var rideCompany = await _context.RideCompanies.FindAsync(id);
      if (rideCompany == null)
      {
        return NotFound();
      }

      _context.RideCompanies.Remove(rideCompany);
      await _context.SaveChangesAsync();

      return rideCompany;
    }

    private bool RideCompanyExists(int id)
    {
      return _context.RideCompanies.Any(e => e.ID == id);
    }


  }
}
