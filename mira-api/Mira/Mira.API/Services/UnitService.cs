using Mira.API.Data;
using Mira.API.Models.DTOs;
using Mira.API.Models.Entities;
using Mira.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Mira.API.Services
{
    public class UnitService : IUnitService
    {
        private readonly AppDbContext _context;

        public UnitService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<UnitDto>> GetAll()
        {
            return await _context.Units
                .Select(x => new UnitDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    IsActive = x.IsActive
                })
                .ToListAsync();
        }

        public async Task<UnitDto?> GetById(int id)
        {
            var unit = await _context.Units.FindAsync(id);
            if (unit == null) return null;

            return new UnitDto
            {
                Id = unit.Id,
                Name = unit.Name,
                IsActive = unit.IsActive
            };
        }

        public async Task<UnitDto> Create(CreateUnitDto dto)
        {
            var unit = new Unit
            {
                Name = dto.Name,
                IsActive = true
            };

            _context.Units.Add(unit);
            await _context.SaveChangesAsync();

            return new UnitDto
            {
                Id = unit.Id,
                Name = unit.Name,
                IsActive = unit.IsActive
            };
        }

        public async Task<UnitDto?> Update(int id, UpdateUnitDto dto)
        {
            var unit = await _context.Units.FindAsync(id);
            if (unit == null) return null;

            unit.Name = dto.Name;
            unit.IsActive = dto.IsActive;

            await _context.SaveChangesAsync();

            return new UnitDto
            {
                Id = unit.Id,
                Name = unit.Name,
                IsActive = unit.IsActive
            };
        }

        public async Task<bool> Delete(int id)
        {
            var unit = await _context.Units.FindAsync(id);
            if (unit == null) return false;

            _context.Units.Remove(unit);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}