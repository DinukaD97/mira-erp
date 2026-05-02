using Mira.API.Data;
using Mira.API.Models.DTOs;
using Mira.API.Models.Entities;
using Mira.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Mira.API.Services
{
    public class PurchaseService : IPurchaseService
    {
        private readonly AppDbContext _context;

        public PurchaseService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<PurchaseDto>> GetAll()
        {
            return await _context.PurchaseInvoices
                .Include(x => x.Supplier)
                .Include(x => x.Items)
                    .ThenInclude(x => x.Item)
                .Select(x => new PurchaseDto
                {
                    Id = x.Id,
                    InvoiceNo = x.InvoiceNo,
                    SupplierId = x.SupplierId,
                    SupplierName = x.Supplier!.Name,
                    InvoiceDate = x.InvoiceDate,
                    TotalAmount = x.TotalAmount,
                    Remark = x.Remark,
                    CreatedAt = x.CreatedAt,
                    Items = x.Items.Select(i => new PurchaseItemDto
                    {
                        Id = i.Id,
                        ItemId = i.ItemId,
                        ItemName = i.Item!.Name,
                        ItemCode = i.Item!.Code,
                        Qty = i.Qty,
                        UnitCost = i.UnitCost,
                        LineTotal = i.LineTotal
                    }).ToList()
                })
                .ToListAsync();
        }

        public async Task<PurchaseDto?> GetById(int id)
        {
            var purchase = await _context.PurchaseInvoices
                .Include(x => x.Supplier)
                .Include(x => x.Items)
                    .ThenInclude(x => x.Item)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (purchase == null) return null;

            return new PurchaseDto
            {
                Id = purchase.Id,
                InvoiceNo = purchase.InvoiceNo,
                SupplierId = purchase.SupplierId,
                SupplierName = purchase.Supplier!.Name,
                InvoiceDate = purchase.InvoiceDate,
                TotalAmount = purchase.TotalAmount,
                Remark = purchase.Remark,
                CreatedAt = purchase.CreatedAt,
                Items = purchase.Items.Select(i => new PurchaseItemDto
                {
                    Id = i.Id,
                    ItemId = i.ItemId,
                    ItemName = i.Item!.Name,
                    ItemCode = i.Item!.Code,
                    Qty = i.Qty,
                    UnitCost = i.UnitCost,
                    LineTotal = i.LineTotal
                }).ToList()
            };
        }

        public async Task<PurchaseDto> Create(CreatePurchaseDto dto)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var purchase = new PurchaseInvoice
                {
                    InvoiceNo = dto.InvoiceNo,
                    SupplierId = dto.SupplierId,
                    InvoiceDate = dto.InvoiceDate,
                    Remark = dto.Remark,
                    CreatedAt = DateTime.UtcNow,
                    TotalAmount = 0
                };

                _context.PurchaseInvoices.Add(purchase);
                await _context.SaveChangesAsync();

                decimal totalAmount = 0;

                foreach (var itemDto in dto.Items)
                {
                    var lineTotal = itemDto.Qty * itemDto.UnitCost;
                    totalAmount += lineTotal;

                    var purchaseItem = new PurchaseInvoiceItem
                    {
                        PurchaseInvoiceId = purchase.Id,
                        ItemId = itemDto.ItemId,
                        Qty = itemDto.Qty,
                        UnitCost = itemDto.UnitCost,
                        LineTotal = lineTotal
                    };

                    _context.PurchaseInvoiceItems.Add(purchaseItem);

                    // Update stock
                    var item = await _context.Items.FindAsync(itemDto.ItemId);
                    if (item != null)
                    {
                        item.StockQty += itemDto.Qty;
                    }

                    // Record stock transaction
                    var stockTransaction = new StockTransaction
                    {
                        ItemId = itemDto.ItemId,
                        TransactionType = "Purchase",
                        Qty = itemDto.Qty,
                        ReferenceId = purchase.Id,
                        Remark = $"Purchase Invoice: {dto.InvoiceNo}",
                        CreatedAt = DateTime.UtcNow
                    };

                    _context.StockTransactions.Add(stockTransaction);
                }

                purchase.TotalAmount = totalAmount;
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return (await GetById(purchase.Id))!;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }
}