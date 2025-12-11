using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Json;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExternalController : ControllerBase
{
    private readonly IHttpClientFactory _http;
    public ExternalController(IHttpClientFactory http) => _http = http;

    [HttpGet("weather")]
    public async Task<IActionResult> GetWeather()
    {

        var client = _http.CreateClient();
        var url = "https://api.open-meteo.com/v1/forecast?latitude=18.5&longitude=-69.9&current_weather=true";
        var res = await client.GetFromJsonAsync<System.Text.Json.JsonElement>(url);
        if (res.ValueKind == System.Text.Json.JsonValueKind.Undefined) return StatusCode(502, "Bad response");
        return Ok(new {
            temperature = res.GetProperty("current_weather").GetProperty("temperature").GetDouble()
        });
    }
}
