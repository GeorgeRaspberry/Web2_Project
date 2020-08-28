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
  public class RidesController : ControllerBase
  {
    private readonly DatabaseContext _context;

    public RidesController(DatabaseContext context)
    {
      _context = context;
    }

    // GET: api/Rides
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Ride>>> GetRides()
    {
      return await _context.Rides.ToListAsync();
    }

    // GET: api/Rides/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Ride>> GetRide(int id)
    {
      var ride = await _context.Rides.FirstOrDefaultAsync(i => i.ID == id);

      if (ride == null)
      {
        return NotFound();
      }
      //RideModel rideModel = new RideModel(ride.ID,ride.FlyOffTime,ride.LandingTime, ride.FullRideTime, ride.RideLength,ride.NumberOfTransfers,ride.Price,ride.CompanyID,ride.LocationTransfers)

      return ride;
    }

    [HttpPost]
    [Route("PostLocation")]
    public async Task<ActionResult<List<Ride>>> PostLocation(Location location)
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

    // PUT: api/Rides/5
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPut("{id}")]
    public async Task<IActionResult> PutRide(int id, Ride ride)
    {
      if (id != ride.ID)
      {
        return BadRequest();
      }
      ride.Location = null;
      _context.Entry(ride).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!RideExists(id))
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

    // POST: api/Rides
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPost]
    public async Task<ActionResult<Ride>> PostRide(Ride ride)
    {
      _context.Rides.Add(ride);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetRide", new { id = ride.ID }, ride);
    }

    // DELETE: api/Rides/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Ride>> DeleteRide(int id)
    {
      var ride = await _context.Rides.FindAsync(id);
      if (ride == null)
      {
        return NotFound();
      }

      _context.Rides.Remove(ride);
      await _context.SaveChangesAsync();

      return ride;
    }

    private bool RideExists(int id)
    {
      return _context.Rides.Any(e => e.ID == id);
    }
  }
}
