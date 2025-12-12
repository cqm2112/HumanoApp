using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _db;
    public ProductsController(AppDbContext db) => _db = db;


    [Authorize]
    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] string? category, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        try
        {
            var uidClaim = User.FindFirst("userId")?.Value;
            int.TryParse(uidClaim ?? "0", out int currentUserId);

            var query = _db.Products.AsQueryable();
            
            
            query = query.Include(p => p.User).Where(p => p.IsPublic || p.UserId == currentUserId);

            if (!string.IsNullOrWhiteSpace(category))
                query = query.Where(p => p.Category == category);

            var total = await query.CountAsync();
            var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

            return Ok(new { total, page, pageSize, items });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var p = await _db.Products.FindAsync(id);
            
            if (p is null) return NotFound();

            var uidClaim = User.FindFirst("userId")?.Value;
            int.TryParse(uidClaim ?? "0", out int currentUserId);

            if (!p.IsPublic && p.UserId != currentUserId) return Forbid();

            return Ok(p);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create(Product product)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(product.Name)) return BadRequest("Name required");
            if (product.Price < 0) return BadRequest("Price invalid");

            var uidClaim = User.FindFirst("userId")?.Value;
            if (!int.TryParse(uidClaim, out int userId)) return Unauthorized();

            product.UserId = userId;
            

            _db.Products.Add(product);
            await _db.SaveChangesAsync();
            
            
            product.User = await _db.Users.FindAsync(userId);

            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Product product)
    {
        try
        {
            if (id != product.Id) return BadRequest();
            if (string.IsNullOrWhiteSpace(product.Name)) return BadRequest("Name required");
            if (product.Price < 0) return BadRequest("Price invalid");

            var p = await _db.Products.FindAsync(id);
            if (p is null) return NotFound();

            var uidClaim = User.FindFirst("userId")?.Value;
            if (!int.TryParse(uidClaim, out int userId)) return Unauthorized();

            if (p.UserId != userId) return Forbid();

            p.Name = product.Name;
            p.Category = product.Category;
            p.Price = product.Price;
            p.IsPublic = product.IsPublic;

            await _db.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var p = await _db.Products.FindAsync(id);
            if (p is null) return NotFound();

            var uidClaim = User.FindFirst("userId")?.Value;
            if (!int.TryParse(uidClaim, out int userId)) return Unauthorized();

            if (p.UserId != userId) return Forbid();

            _db.Products.Remove(p);
            await _db.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
