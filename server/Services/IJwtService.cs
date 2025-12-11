using Server.Models;

namespace Server.Services;

public interface IJwtService
{
    string GenerateToken(User user);
}
