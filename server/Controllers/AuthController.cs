using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Services;
using System.Security.Cryptography;
using System.Text;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IJwtService _jwt;

    public AuthController(AppDbContext db, IJwtService jwt)
    {
        _db = db;
        _jwt = jwt;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(User user)
    {
        if (string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.PasswordHash))
            return BadRequest("Username and password required");

        if (await _db.Users.AnyAsync(x => x.Username == user.Username))
            return BadRequest("Username taken");

        user.PasswordHash = HashPassword(user.PasswordHash);
        _db.Users.Add(user);
        await _db.SaveChangesAsync();
        return Ok(new { user.Id, user.Username });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(User login)
    {
        var hash = HashPassword(login.PasswordHash);
        var user = await _db.Users.FirstOrDefaultAsync(x => x.Username == login.Username && x.PasswordHash == hash);
        if (user is null) return Unauthorized("Invalid credentials");

        var token = _jwt.GenerateToken(user);
        return Ok(new { token });
    }

    private static string HashPassword(string password)
    {
        using var sha = SHA256.Create();
        var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToHexString(bytes);
    }
}
