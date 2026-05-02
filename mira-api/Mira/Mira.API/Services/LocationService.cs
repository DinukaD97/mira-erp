using Mira.API.Data;
using Mira.API.Models.DTOs;
using Mira.API.Models.Entities;
using Mira.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Mira.API.Services
{
    public class LocationService : ILocationService
    {
        private readonly AppDbContext _context;

        public LocationService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<LocationDto>> GetAll()
        {
            return await _context.Locations
                .Select(x => new LocationDto
                {
                    Id = x.Id,
                    Code = x.Code,
                    Name = x.Name,
                    Remark = x.Remark,
                    IsActive = x.IsActive
                })
                .ToListAsync();
        }

        public async Task<LocationDto?> GetById(int id)
        {
            var location = await _context.Locations.FindAsync(id);
            if (location == null) return null;

            return new LocationDto
            {
                Id = location.Id,
                Code = location.Code,
                Name = location.Name,
                Remark = location.Remark,
                IsActive = location.IsActive
            };
        }

        public async Task<LocationDto> Create(CreateLocationDto dto)
        {
            var location = new Location
            {
                Code = dto.Code,
                Name = dto.Name,
                Remark = dto.Remark,
                IsActive = true
            };

            _context.Locations.Add(location);
            await _context.SaveChangesAsync();

            return new LocationDto
            {
                Id = location.Id,
                Code = location.Code,
                Name = location.Name,
                Remark = location.Remark,
                IsActive = location.IsActive
            };
        }

        public async Task<LocationDto?> Update(int id, UpdateLocationDto dto)
        {
            var location = await _context.Locations.FindAsync(id);
            if (location == null) return null;

            location.Code = dto.Code;
            location.Name = dto.Name;
            location.Remark = dto.Remark;
            location.IsActive = dto.IsActive;

            await _context.SaveChangesAsync();

            return new LocationDto
            {
                Id = location.Id,
                Code = location.Code,
                Name = location.Name,
                Remark = location.Remark,
                IsActive = location.IsActive
            };
        }

        public async Task<bool> Delete(int id)
        {
            var location = await _context.Locations.FindAsync(id);
            if (location == null) return false;

            _context.Locations.Remove(location);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}