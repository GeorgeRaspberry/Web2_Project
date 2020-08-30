using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projectBackend.Database;
using projectBackend.Models;

namespace projectBackend.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class FlightsController : ControllerBase
  {
    private readonly DatabaseContext _context;

    public FlightsController(DatabaseContext context)
    {
      _context = context;
    }

    // GET: api/Flights
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Flight>>> GetFlights()
    {
      return await _context.Flights.ToListAsync();
    }

    // GET: api/Flights/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Flight>> GetFlight(int id)
    {
      var flight = await _context.Flights.FirstOrDefaultAsync(i => i.ID == id);

      if (flight == null)
      {
        return NotFound();
      }
      //FlightModel flightModel = new FlightModel(flight.ID,flight.FlyOffTime,flight.LandingTime, flight.FullFlightTime, flight.FlightLength,flight.NumberOfTransfers,flight.Price,flight.CompanyID,flight.LocationTransfers)

      return flight;
    }

    [HttpPost]
    [Route("PostLocation")]
    public async Task<ActionResult<List<Flight>>> PostLocation(Location location)
    {
      _context.Locations.Add(location);
      await _context.SaveChangesAsync();

      return Ok();
    }


    [HttpGet]
    [Route("GetLocations")]
    public async Task<ActionResult<List<Location>>> GetLocations()
    {
      return await _context.Locations.ToListAsync();
    }

    // PUT: api/Flights/5
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPut("{id}")]
    public async Task<IActionResult> PutFlight(int id, Flight flight)
    {
      if (id != flight.ID)
      {
        return BadRequest();
      }

      _context.Entry(flight).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!FlightExists(id))
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

    [HttpPost]
    [Route("FilterDates")]
    public async Task<Object> FilterDates([FromBody] DateCluster dateCluster)
    {
      int id = dateCluster.ID;
      List<FlightCompany> companies = await _context.FlightCompanies.ToListAsync();
      List<Flight> tempList = new List<Flight>();
      DateTime date1 = dateCluster.FlyoffDate.AddHours(2);
      DateTime date2 = dateCluster.LandingDate.AddHours(2);

      foreach (FlightCompany fc in companies)
      {
        if (fc.ID == id)
        {
          tempList = fc.Flights.ToList();
          foreach (Flight f in tempList.ToList())
          {
            int result = DateTime.Compare(f.FlyOffTime, date1);
            result = DateTime.Compare(f.FlyOffTime, date2);
            result = DateTime.Compare(f.LandingTime, date2);
            result = DateTime.Compare(f.LandingTime, date1);
            if (!((DateTime.Compare(f.FlyOffTime, date1) >= 0 && DateTime.Compare(f.FlyOffTime, date2) < 0) && (DateTime.Compare(f.LandingTime, date2) <= 0 && DateTime.Compare(f.LandingTime, date1) > 0)))
            {
              tempList.Remove(f);
            }
          }
          break;
        }
      }

      return tempList;
    }

    // POST: api/Flights
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPost]
    public async Task<ActionResult<Flight>> PostFlight(Flight flight)
    {
      _context.Flights.Add(flight);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetFlight", new { id = flight.ID }, flight);
    }

    // DELETE: api/Flights/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Flight>> DeleteFlight(int id)
    {
      var flight = await _context.Flights.FindAsync(id);
      if (flight == null)
      {
        return NotFound();
      }

      _context.Flights.Remove(flight);
      await _context.SaveChangesAsync();

      return flight;
    }

    private bool FlightExists(int id)
    {
      return _context.Flights.Any(e => e.ID == id);
    }
  }
}
