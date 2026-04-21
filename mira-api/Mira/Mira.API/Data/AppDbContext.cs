using Microsoft.EntityFrameworkCore;
using Mira.API.Models.Entities;

namespace Mira.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Unit> Units { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<PurchaseInvoice> PurchaseInvoices { get; set; }
        public DbSet<PurchaseInvoiceItem> PurchaseInvoiceItems { get; set; }
        public DbSet<SalesInvoice> SalesInvoices { get; set; }
        public DbSet<SalesInvoiceItem> SalesInvoiceItems { get; set; }
        public DbSet<StockTransaction> StockTransactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Item
            modelBuilder.Entity<Item>()
                .Property(x => x.CostPrice).HasPrecision(18, 2);
            modelBuilder.Entity<Item>()
                .Property(x => x.SalePrice).HasPrecision(18, 2);
            modelBuilder.Entity<Item>()
                .Property(x => x.StockQty).HasPrecision(18, 2);
            modelBuilder.Entity<Item>()
                .Property(x => x.ReorderLevel).HasPrecision(18, 2);

            // PurchaseInvoice
            modelBuilder.Entity<PurchaseInvoice>()
                .Property(x => x.TotalAmount).HasPrecision(18, 2);

            // PurchaseInvoiceItem
            modelBuilder.Entity<PurchaseInvoiceItem>()
                .Property(x => x.Qty).HasPrecision(18, 2);
            modelBuilder.Entity<PurchaseInvoiceItem>()
                .Property(x => x.UnitCost).HasPrecision(18, 2);
            modelBuilder.Entity<PurchaseInvoiceItem>()
                .Property(x => x.LineTotal).HasPrecision(18, 2);

            // SalesInvoice
            modelBuilder.Entity<SalesInvoice>()
                .Property(x => x.TotalAmount).HasPrecision(18, 2);

            // SalesInvoiceItem
            modelBuilder.Entity<SalesInvoiceItem>()
                .Property(x => x.Qty).HasPrecision(18, 2);
            modelBuilder.Entity<SalesInvoiceItem>()
                .Property(x => x.UnitPrice).HasPrecision(18, 2);
            modelBuilder.Entity<SalesInvoiceItem>()
                .Property(x => x.LineTotal).HasPrecision(18, 2);

            // StockTransaction
            modelBuilder.Entity<StockTransaction>()
                .Property(x => x.Qty).HasPrecision(18, 2);
        }
    }
}