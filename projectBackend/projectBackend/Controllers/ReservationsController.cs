using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Constraints;
using Microsoft.EntityFrameworkCore;
using projectBackend.Database;
using projectBackend.Database.DatabaseFunctions;
using projectBackend.Models;

namespace projectBackend.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ReservationsController : ControllerBase
  {
    private readonly DatabaseContext _context;
    private ReservationFunctions reservationFunctions;


    public ReservationsController(DatabaseContext context)
    {
      _context = context;
      reservationFunctions = new ReservationFunctions(_context);
    }

    // GET: api/Reservations
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations()
    {
      reservationFunctions.UpdateReservationStatus();
      var reservations = await _context.Reservations.ToListAsync();
      foreach (var item in reservations)
      {
        if (item.ReservationType == 1 || item.ReservationType == 2)
        {
          reservationFunctions.locationTransfersOrder(item.Flight);
        }
      }

      return reservations;
    }

    // GET: api/Reservations/5
    [HttpGet("{token}")]
    public async Task<ActionResult<IEnumerable<Reservation>>> GetReservation(string token)
    {

      if (token == null)
      {
        return null;
      }
      var tokenHandle = new JwtSecurityTokenHandler();
      var userToken = tokenHandle.ReadJwtToken(token);

      string id = userToken.Payload["UserID"].ToString();

      reservationFunctions.UpdateReservationStatus();
      var reservations = await _context.Reservations.ToListAsync();
      foreach (var item in reservations.ToList())
      {
        if(item.UserID!= id)
        {
          reservations.Remove(item);
        }
      }

      if (reservations == null)
      {
        return NotFound();
      }
      foreach (var item in reservations)
      {
        if (item.ReservationType == 1 || item.ReservationType == 2)
        {
          reservationFunctions.locationTransfersOrder(item.Flight);
        }
      }

      return reservations;
    }

    [HttpPost]
    [Route("PostReservation")]
    public async Task<ActionResult<List<Reservation>>> PostReservation(Reservation reservation)
    {
      _context.Reservations.Add(reservation);
      await _context.SaveChangesAsync();

      return Ok();
    }


    [HttpGet]
    [Route("ReserveAccept/{token}/{id}")]
    public async Task<Object> ReserveAccept(string token, int id)
    {
      foreach (var item in _context.Reservations.ToList())
      {
        if (item.ID == id)
        {
          item.ReservationType = 1;
          _context.Entry(item).State = EntityState.Modified;
          _context.SaveChanges();
          break;
        }
      }

      return Ok();
    }
    [HttpGet]
    [Route("ReserveRefuse/{token}/{id}")]
    public async Task<Object> ReserveRefuse(string token, int id)
    {
      var reservation = await _context.Reservations.FindAsync(id);
      if (reservation == null)
      {
        return NotFound();
      }


      foreach (var seat in _context.Seats.ToList())
      {
        if (seat.ReservationID == reservation.ID)
        {
          seat.ReservationID = null;
          _context.Entry(seat).State = EntityState.Modified;
          _context.SaveChanges();
        }
      }

      _context.Reservations.Remove(reservation);
      await _context.SaveChangesAsync();

      return reservation;

    }


    [HttpPost]
    [Route("PostFlightReservation")]
    public async Task<ActionResult<List<Reservation>>> PostFlightReservation(ReservationFlight reservation)
    {
      // SAVE POINTS USED
      foreach (var item in reservation.Users)
      {
        _context.Entry(item).State = EntityState.Modified;
        _context.SaveChanges();
      }


      string invitorName = "";
      foreach (var user in _context.ApplicationUsers)
      {
        if (user.Id == reservation.Reservations[reservation.Reservations.Count - 1].UserID)
        {
          invitorName = user.UserName;
        }
      }

      Dictionary<string, MailMessage> messages = new Dictionary<string, MailMessage>();
      foreach (var res in reservation.Reservations)
      {
        foreach (var user in _context.ApplicationUsers)
        {
          if (user.Id == res.UserID)
          {
            MailMessage msg = new MailMessage();
            msg.From = new MailAddress("helpertravel45@gmail.com");
            msg.To.Add(new MailAddress(user.Email));

            if (res.ReservationType == 3)
            {
              msg.Subject = "Reservation invite";
              msg.Body += "\nYou were invited by : " + invitorName;
              msg.Body += "\n\nSeat invited to : ";
              foreach (var seat in res.Seats)
              {
                if (seat.Type == 5)
                {
                  msg.Body += "\nType : Economy, Seat order:" + seat.Order;
                }
                else if (seat.Type == 6)
                {
                  msg.Body += "\nType : Business, Seat order:" + seat.Order;
                }
                else if (seat.Type == 7)
                {
                  msg.Body += "\nType : First class, Seat order:" + seat.Order;
                }
              }
              msg.Body += "\n\nTotal price : " + res.Price;


            }
            else
            {
              msg.Subject = "Reservation created";
              msg.Body = "Your reservation is created on name " + user.UserName + " for " + res.NumberOfPeople + " people. Seats reserved are : ";
              foreach (var seat in res.Seats)
              {
                if (seat.Type == 5)
                {
                  msg.Body += "\nType : Economy, Seat order:" + seat.Order;
                }
                else if (seat.Type == 6)
                {
                  msg.Body += "\nType : Business, Seat order:" + seat.Order;
                }
                else if (seat.Type == 7)
                {
                  msg.Body += "\nType : First class, Seat order:" + seat.Order;
                }
              }

              msg.Body += "\nBag count : " + res.BagCount;
              msg.Body += "\n\nTotal price : " + res.Price;


            }
            messages.Add(user.Id, msg);
            //string text = string.Format("Please click on this link to {0}: {1}", msg.Subject, msg.Body);
            //string html = "Please confirm your account by clicking this link: <a href=\"" + msg.Body + "\">link</a><br/>";

            //msg.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(text, null, MediaTypeNames.Text.Plain));
            //msg.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(html, null, MediaTypeNames.Text.Html));
          }
        }


      }
      Dictionary<int, List<int>> seatID = new Dictionary<int, List<int>>();
      foreach (var item in reservation.Reservations)
      {
        List<int> SeatIDS = new List<int>();
        foreach (var seat in item.Seats)
        {
          SeatIDS.Add(seat.ID);
        }
        item.Seats = null;


        _context.Reservations.Add(item);
        _context.SaveChanges();

        seatID[item.ID] = SeatIDS;
      }
      foreach (var item in reservation.Seats)
      {
        foreach (var seat in seatID)
        {
          foreach (var id in seat.Value)
          {
            if (item.ID == id)
            {
              item.Name = item.Type.ToString();
              item.Type = 4;
              item.ReservationID = seat.Key;
              _context.Entry(item).State = EntityState.Modified;
              _context.SaveChanges();
            }
          }
        }

      }

      foreach (var item in reservation.Reservations)
      {
        if (item.ReservationType == 3)
        {
          messages[item.UserID].Body += "\n\nPlease accept your flight invitation : http://localhost:4200/reserveInvite/" + item.UserID+"/"+item.ID;
        }
      }

      foreach (var item in messages)
      {
        SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", Convert.ToInt32(587));
        smtpClient.UseDefaultCredentials = false;
        System.Net.NetworkCredential credentials = new System.Net.NetworkCredential("helpertravel45@gmail.com", "helpmeplease");
        smtpClient.Credentials = credentials;
        smtpClient.EnableSsl = true;
        smtpClient.Send(item.Value);
      }





      return Ok();
    }


    // PUT: api/Reservations/5
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPut("{id}")]
    [Route("RateRideReservation/{id}/{rating}")]
    public async Task<IActionResult> PutReservation(int id, int rating)
    {
      var reservation = await _context.Reservations.FirstOrDefaultAsync(i => i.ID == id);

      if (reservation == null)
      {
        return NotFound();
      }
      reservation.RideRating = rating;
      if (id != reservation.ID)
      {
        return BadRequest();
      }

      _context.Entry(reservation).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!reservationExists(id))
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



    // PUT: api/Reservations/5
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPut("{id}")]
    [Route("RateFlightReservation/{id}/{rating}")]
    public async Task<IActionResult> PutReservationFlight(int id, int rating)
    {
      var reservation = await _context.Reservations.FirstOrDefaultAsync(i => i.ID == id);

      if (reservation == null)
      {
        return NotFound();
      }
      reservation.FlightRating = rating;
      if (id != reservation.ID)
      {
        return BadRequest();
      }

      _context.Entry(reservation).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!reservationExists(id))
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



    // DELETE: api/Reservations/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Reservation>> DeleteReservation(int id)
    {
      var reservation = await _context.Reservations.FindAsync(id);
      if (reservation == null)
      {
        return NotFound();
      }

      foreach (var seat in _context.Seats.ToList())
      {
        if (seat.ReservationID == reservation.ID)
        {
          seat.Type =  Int32.Parse(seat.Name)-5;
          seat.ReservationID = null;
          _context.Entry(seat).State = EntityState.Modified;
          _context.SaveChanges();
        }
      }

      _context.Reservations.Remove(reservation);
      await _context.SaveChangesAsync();

      return reservation;
    }

    private bool reservationExists(int id)
    {
      return _context.Reservations.Any(e => e.ID == id);
    }
  }
}
