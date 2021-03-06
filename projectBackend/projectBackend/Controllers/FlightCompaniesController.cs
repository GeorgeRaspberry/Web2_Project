using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using projectBackend.Database;
using projectBackend.Database.DatabaseFunctions;
using projectBackend.Models;

namespace projectBackend.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class FlightCompaniesController : ControllerBase
  {
    private readonly DatabaseContext _context;
    private FlightCompanyFunctions flightCompanyFunction;
    private FlightFunctions flightFunction;

    public FlightCompaniesController(DatabaseContext context)
    {
      _context = context;
      flightCompanyFunction = new FlightCompanyFunctions(_context);
      flightFunction = new FlightFunctions(_context);
    }

    // GET: api/FlightCompanies
    [HttpGet]
    public async Task<ActionResult<List<FlightCompany>>> GetFlightCompanies()
    {
      var companies = await _context.FlightCompanies.ToListAsync();

      

      foreach (var company in companies)
      {
        List<Flight> flights = new List<Flight>();

        foreach (var flight in _context.Flights.ToList())
        {
          if (flight.CompanyID == company.ID)
          {
            flights.Add(flight);
          }
        }
        company.Flights = flights;
      }

      foreach (var item in companies)
      {
        item.Rating = flightCompanyFunction.calculateFlightRating(item.ID);
      }
      foreach (var item in companies.ToList())
      {
        foreach (var item2 in item.Flights.ToList())
        {
          item2.Seats = null;
        }
      }
      return companies;


    }

    // GET: api/FlightCompanies/5
    [HttpGet("{id}")]
    public async Task<ActionResult<FlightCompany>> GetFlightCompany(int id)
    {


       var flightCompany = await _context.FlightCompanies.Include(f => f.Flights).ThenInclude(l => l.LocationTransfers).ThenInclude(r => r.Location).FirstOrDefaultAsync(i => i.ID == id);


      foreach (var flight in flightCompany.Flights)
      {
        List<Seat> seats = new List<Seat>();
        foreach (var seat in _context.Seats)
        {
          if (flight.ID == seat.FlightID)
          {
            seats.Add(seat);
          }
        }
        flight.Seats = seats;
      }

      if (flightCompany == null)
      {
        return NotFound();
      }
      foreach (var item in flightCompany.Flights)
      {
        flightFunction.locationTransfersOrder(item);
      }

      flightCompany.Flights = flightFunction.checkFlightDate(flightCompany.Flights);

      flightCompany.Rating = flightCompanyFunction.calculateFlightRating(flightCompany.ID);
      return flightCompany;

    }

    // PUT: api/FlightCompanies/5
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPut("{id}")]
    public async Task<IActionResult> PutFlightCompany(int id, FlightCompany flightCompany)
    {
      if (id != flightCompany.ID)
      {
        return BadRequest();
      }

      _context.Entry(flightCompany).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!FlightCompanyExists(id))
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
    public async Task<ActionResult<FlightCompany>> PostFlightCompany(FlightCompany flightCompany)
    {

      var user = await _context.ApplicationUsers.FindAsync(flightCompany.UserID);
      user.Role = "FlightAdministrator";

      _context.Entry(user).State = EntityState.Modified;
      _context.SaveChanges();

      _context.FlightCompanies.Add(flightCompany);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetFlightCompany", new { id = flightCompany.ID }, flightCompany);
    }

    // DELETE: api/FlightCompanies/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<FlightCompany>> DeleteFlightCompany(int id)
    {
      var flightCompany = await _context.FlightCompanies.FindAsync(id);
      if (flightCompany == null)
      {
        return NotFound();
      }

      _context.FlightCompanies.Remove(flightCompany);
      await _context.SaveChangesAsync();

      return flightCompany;
    }

    private bool FlightCompanyExists(int id)
    {
      return _context.FlightCompanies.Any(e => e.ID == id);
    }
  }
}
