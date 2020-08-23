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
      var flight = await _context.Flights.FindAsync(id);

      if (flight == null)
      {
        return NotFound();
      }

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

    // POST: api/Flights
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPost]
    public async Task<ActionResult<Flight>> PostFlight(Flight flight)
    {

      

      _context.Flights.Add(flight);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetFlightCompany", new { id = flight.ID }, flight);
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
