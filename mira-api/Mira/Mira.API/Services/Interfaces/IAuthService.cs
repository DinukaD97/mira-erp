using Mira.API.Models.DTOs;

namespace Mira.API.Services.Interfaces
{
    public interface IAuthService
    {
        Task<LoginResponseDto?> Login(LoginRequestDto request);
    }
}