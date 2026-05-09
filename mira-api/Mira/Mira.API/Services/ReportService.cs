using Mira.API.Data;
using Mira.API.Models.DTOs;
using Mira.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Mira.API.Services
{
    public class ReportService : IReportService
    {
        private readonly AppDbContext _context;

        public ReportService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<StockReportItemDto>> GetStockReport()
        {
            var items = await _context.Items
                .Include(x => x.Category)
                .Include(x => x.Unit)
                .Where(x => x.IsActive)
                .OrderBy(x => x.Code)
                .ToListAsync();

            var result = new List<StockReportItemDto>();

            foreach (var item in items)
            {
                // Total purchased for this item
                var totalPurchased = await _context.PurchaseInvoiceItems
                    .Where(x => x.ItemId == item.Id)
                    .SumAsync(x => (decimal?)x.Qty) ?? 0;

                // Total sold for this item
                var totalSold = await _context.SalesInvoiceItems
                    .Where(x => x.ItemId == item.Id)
                    .SumAsync(x => (decimal?)x.Qty) ?? 0;

                // Determine stock status
                string stockStatus;
                if (item.StockQty <= 0)
                    stockStatus = "Out of Stock";
                else if (item.StockQty <= item.ReorderLevel)
                    stockStatus = "Low Stock";
                else
                    stockStatus = "OK";

                result.Add(new StockReportItemDto
                {
                    ItemId = item.Id,
                    ItemCode = item.Code,
                    ItemName = item.Name,
                    CategoryName = item.Category?.Name ?? "",
                    UnitName = item.Unit?.Name ?? "",
                    TotalPurchased = totalPurchased,
                    TotalSold = totalSold,
                    CurrentStock = item.StockQty,
                    ReorderLevel = item.ReorderLevel,
                    StockStatus = stockStatus
                });
            }

            return result;
        }
    }
}