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
                var totalPurchased = await _context.PurchaseInvoiceItems
                    .Where(x => x.ItemId == item.Id)
                    .SumAsync(x => (decimal?)x.Qty) ?? 0;

                var totalSold = await _context.SalesInvoiceItems
                    .Where(x => x.ItemId == item.Id)
                    .SumAsync(x => (decimal?)x.Qty) ?? 0;

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

        public async Task<SalesSummaryDto> GetSalesSummary()
        {
            // Total invoices and revenue
            var totalInvoices = await _context.SalesInvoices.CountAsync();
            var totalRevenue = await _context.SalesInvoices
                .SumAsync(x => (decimal?)x.TotalAmount) ?? 0;

            // Sales by customer
            var salesByCustomer = await _context.SalesInvoices
                .Include(x => x.Customer)
                .GroupBy(x => new { x.CustomerId, x.Customer!.Name })
                .Select(g => new SalesByCustomerDto
                {
                    CustomerId = g.Key.CustomerId,
                    CustomerName = g.Key.Name,
                    TotalInvoices = g.Count(),
                    TotalRevenue = g.Sum(x => x.TotalAmount)
                })
                .OrderByDescending(x => x.TotalRevenue)
                .ToListAsync();

            // Best selling items
            var bestSellingItems = await _context.SalesInvoiceItems
                .Include(x => x.Item)
                    .ThenInclude(x => x!.Category)
                .GroupBy(x => new
                {
                    x.ItemId,
                    x.Item!.Code,
                    x.Item!.Name,
                    CategoryName = x.Item.Category!.Name
                })
                .Select(g => new BestSellingItemDto
                {
                    ItemId = g.Key.ItemId,
                    ItemCode = g.Key.Code,
                    ItemName = g.Key.Name,
                    CategoryName = g.Key.CategoryName,
                    TotalQtySold = g.Sum(x => x.Qty),
                    TotalRevenue = g.Sum(x => x.LineTotal)
                })
                .OrderByDescending(x => x.TotalQtySold)
                .ToListAsync();

            return new SalesSummaryDto
            {
                TotalInvoices = totalInvoices,
                TotalRevenue = totalRevenue,
                SalesByCustomer = salesByCustomer,
                BestSellingItems = bestSellingItems
            };
        }

        public async Task<DashboardSummaryDto> GetDashboardSummary()
        {
            var totalItems = await _context.Items.CountAsync(x => x.IsActive);
            var totalCustomers = await _context.Customers.CountAsync();
            var totalSuppliers = await _context.Suppliers.CountAsync();
            var totalSalesInvoices = await _context.SalesInvoices.CountAsync();
            var totalRevenue = await _context.SalesInvoices
                .SumAsync(x => (decimal?)x.TotalAmount) ?? 0;

            var lowStockItems = await _context.Items
                .CountAsync(x => x.IsActive && x.StockQty > 0 && x.StockQty <= x.ReorderLevel);

            var outOfStockItems = await _context.Items
                .CountAsync(x => x.IsActive && x.StockQty <= 0);

            return new DashboardSummaryDto
            {
                TotalItems = totalItems,
                TotalCustomers = totalCustomers,
                TotalSuppliers = totalSuppliers,
                TotalSalesInvoices = totalSalesInvoices,
                TotalRevenue = totalRevenue,
                LowStockItems = lowStockItems,
                OutOfStockItems = outOfStockItems
            };
        }
    }
}