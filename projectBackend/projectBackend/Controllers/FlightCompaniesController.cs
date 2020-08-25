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


    public FlightCompaniesController(DatabaseContext context)
    {
      _context = context;
      flightCompanyFunction = new FlightCompanyFunctions(_context);
    }

    // GET: api/FlightCompanies
    [HttpGet]
    public async Task<ActionResult<List<FlightCompany>>> GetFlightCompanies()
    {
      var data = await _context.FlightCompanies.Include(r=>r.Flights).ToListAsync();
      return data;
    }

    // GET: api/FlightCompanies/5
    [HttpGet("{id}")]
    public async Task<ActionResult<FlightCompany>> GetFlightCompany(int id)
    {
      var flightCompany = await _context.FlightCompanies.Include(f => f.Flights).FirstOrDefaultAsync(i=>i.ID == id);

      if (flightCompany == null)
      {
        return NotFound();
      }

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
