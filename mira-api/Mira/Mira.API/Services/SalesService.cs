using Mira.API.Data;
using Mira.API.Models.DTOs;
using Mira.API.Models.Entities;
using Mira.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Mira.API.Services
{
    public class SalesService : ISalesService
    {
        private readonly AppDbContext _context;

        public SalesService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<SalesDto>> GetAll()
        {
            return await _context.SalesInvoices
                .Include(x => x.Customer)
                .Include(x => x.Items)
                    .ThenInclude(x => x.Item)
                .OrderByDescending(x => x.CreatedAt)
                .Select(x => new SalesDto
                {
                    Id = x.Id,
                    InvoiceNo = x.InvoiceNo,
                    CustomerId = x.CustomerId,
                    CustomerName = x.Customer!.Name,
                    InvoiceDate = x.InvoiceDate,
                    TotalAmount = x.TotalAmount,
                    Remark = x.Remark,
                    CreatedAt = x.CreatedAt,
                    Items = x.Items.Select(i => new SalesItemDto
                    {
                        Id = i.Id,
                        ItemId = i.ItemId,
                        ItemName = i.Item!.Name,
                        ItemCode = i.Item!.Code,
                        Qty = i.Qty,
                        UnitPrice = i.UnitPrice,
                        LineTotal = i.LineTotal
                    }).ToList()
                })
                .ToListAsync();
        }

        public async Task<SalesDto?> GetById(int id)
        {
            var sale = await _context.SalesInvoices
                .Include(x => x.Customer)
                .Include(x => x.Items)
                    .ThenInclude(x => x.Item)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (sale == null) return null;

            return new SalesDto
            {
                Id = sale.Id,
                InvoiceNo = sale.InvoiceNo,
                CustomerId = sale.CustomerId,
                CustomerName = sale.Customer!.Name,
                InvoiceDate = sale.InvoiceDate,
                TotalAmount = sale.TotalAmount,
                Remark = sale.Remark,
                CreatedAt = sale.CreatedAt,
                Items = sale.Items.Select(i => new SalesItemDto
                {
                    Id = i.Id,
                    ItemId = i.ItemId,
                    ItemName = i.Item!.Name,
                    ItemCode = i.Item!.Code,
                    Qty = i.Qty,
                    UnitPrice = i.UnitPrice,
                    LineTotal = i.LineTotal
                }).ToList()
            };
        }

        public async Task<SalesDto> Create(CreateSalesDto dto)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var sale = new SalesInvoice
                {
                    InvoiceNo = dto.InvoiceNo,
                    CustomerId = dto.CustomerId,
                    InvoiceDate = dto.InvoiceDate,
                    Remark = dto.Remark,
                    CreatedAt = DateTime.UtcNow,
                    TotalAmount = 0
                };

                _context.SalesInvoices.Add(sale);
                await _context.SaveChangesAsync();

                decimal totalAmount = 0;

                foreach (var itemDto in dto.Items)
                {
                    // ⚠️ Check stock before selling
                    var item = await _context.Items.FindAsync(itemDto.ItemId);
                    if (item == null)
                        throw new Exception($"Item with ID {itemDto.ItemId} not found.");

                    if (item.StockQty < itemDto.Qty)
                        throw new Exception(
                            $"Insufficient stock for '{item.Name}'. " +
                            $"Available: {item.StockQty}, Requested: {itemDto.Qty}");

                    var lineTotal = itemDto.Qty * itemDto.UnitPrice;
                    totalAmount += lineTotal;

                    var saleItem = new SalesInvoiceItem
                    {
                        SalesInvoiceId = sale.Id,
                        ItemId = itemDto.ItemId,
                        Qty = itemDto.Qty,
                        UnitPrice = itemDto.UnitPrice,
                        LineTotal = lineTotal
                    };

                    _context.SalesInvoiceItems.Add(saleItem);

                    // Decrease stock
                    item.StockQty -= itemDto.Qty;

                    // Record stock transaction
                    var stockTransaction = new StockTransaction
                    {
                        ItemId = itemDto.ItemId,
                        TransactionType = "Sale",
                        Qty = -itemDto.Qty,
                        ReferenceId = sale.Id,
                        Remark = $"Sales Invoice: {dto.InvoiceNo}",
                        CreatedAt = DateTime.UtcNow
                    };

                    _context.StockTransactions.Add(stockTransaction);
                }

                sale.TotalAmount = totalAmount;
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return (await GetById(sale.Id))!;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }
}