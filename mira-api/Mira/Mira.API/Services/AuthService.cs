using Mira.API.Data;
using Mira.API.Helpers;
using Mira.API.Models.DTOs;
using Mira.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Mira.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly JwtHelper _jwtHelper;

        public AuthService(AppDbContext context, JwtHelper jwtHelper)
        {
            _context = context;
            _jwtHelper = jwtHelper;
        }

        public async Task<LoginResponseDto?> Login(LoginRequestDto request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == request.Email && x.IsActive);

            if (user == null) return null;

            bool isValid = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);

            if (!isValid) return null;

            var token = _jwtHelper.GenerateToken(user);

            return new LoginResponseDto
            {
                Token = token,
                FullName = user.FullName,
                Email = user.Email,
                Role = user.Role
            };
        }
    }
}