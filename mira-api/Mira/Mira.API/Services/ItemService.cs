using Mira.API.Data;
using Mira.API.Models.DTOs;
using Mira.API.Models.Entities;
using Mira.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Mira.API.Services
{
    public class ItemService : IItemService
    {
        private readonly AppDbContext _context;

        public ItemService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ItemDto>> GetAll()
        {
            return await _context.Items
                .Include(x => x.Category)
                .Include(x => x.Unit)
                .Select(x => new ItemDto
                {
                    Id = x.Id,
                    Code = x.Code,
                    Name = x.Name,
                    CategoryId = x.CategoryId,
                    CategoryName = x.Category!.Name,
                    UnitId = x.UnitId,
                    UnitName = x.Unit!.Name,
                    CostPrice = x.CostPrice,
                    SalePrice = x.SalePrice,
                    StockQty = x.StockQty,
                    ReorderLevel = x.ReorderLevel,
                    IsActive = x.IsActive
                })
                .ToListAsync();
        }

        public async Task<ItemDto?> GetById(int id)
        {
            var item = await _context.Items
                .Include(x => x.Category)
                .Include(x => x.Unit)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (item == null) return null;

            return new ItemDto
            {
                Id = item.Id,
                Code = item.Code,
                Name = item.Name,
                CategoryId = item.CategoryId,
                CategoryName = item.Category!.Name,
                UnitId = item.UnitId,
                UnitName = item.Unit!.Name,
                CostPrice = item.CostPrice,
                SalePrice = item.SalePrice,
                StockQty = item.StockQty,
                ReorderLevel = item.ReorderLevel,
                IsActive = item.IsActive
            };
        }

        public async Task<ItemDto> Create(CreateItemDto dto)
        {
            var item = new Item
            {
                Code = dto.Code,
                Name = dto.Name,
                CategoryId = dto.CategoryId,
                UnitId = dto.UnitId,
                CostPrice = dto.CostPrice,
                SalePrice = dto.SalePrice,
                ReorderLevel = dto.ReorderLevel,
                StockQty = 0,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return (await GetById(item.Id))!;
        }

        public async Task<ItemDto?> Update(int id, UpdateItemDto dto)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null) return null;

            item.Code = dto.Code;
            item.Name = dto.Name;
            item.CategoryId = dto.CategoryId;
            item.UnitId = dto.UnitId;
            item.CostPrice = dto.CostPrice;
            item.SalePrice = dto.SalePrice;
            item.ReorderLevel = dto.ReorderLevel;
            item.IsActive = dto.IsActive;

            await _context.SaveChangesAsync();

            return (await GetById(id))!;
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null) return false;

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}