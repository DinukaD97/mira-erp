namespace Mira.API.Models.DTOs
{
    public class StockReportItemDto
    {
        public int ItemId { get; set; }
        public string ItemCode { get; set; } = string.Empty;
        public string ItemName { get; set; } = string.Empty;
        public string CategoryName { get; set; } = string.Empty;
        public string UnitName { get; set; } = string.Empty;
        public decimal TotalPurchased { get; set; }
        public decimal TotalSold { get; set; }
        public decimal CurrentStock { get; set; }
        public decimal ReorderLevel { get; set; }
        public string StockStatus { get; set; } = string.Empty;
    }

    public class SalesByCustomerDto
    {
        public int CustomerId { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public int TotalInvoices { get; set; }
        public decimal TotalRevenue { get; set; }
    }

    public class BestSellingItemDto
    {
        public int ItemId { get; set; }
        public string ItemCode { get; set; } = string.Empty;
        public string ItemName { get; set; } = string.Empty;
        public string CategoryName { get; set; } = string.Empty;
        public decimal TotalQtySold { get; set; }
        public decimal TotalRevenue { get; set; }
    }

    public class SalesSummaryDto
    {
        public int TotalInvoices { get; set; }
        public decimal TotalRevenue { get; set; }
        public List<SalesByCustomerDto> SalesByCustomer { get; set; } = new();
        public List<BestSellingItemDto> BestSellingItems { get; set; } = new();
    }
    public class DashboardSummaryDto
    {
        public int TotalItems { get; set; }
        public int TotalCustomers { get; set; }
        public int TotalSuppliers { get; set; }
        public int TotalSalesInvoices { get; set; }
        public decimal TotalRevenue { get; set; }
        public int LowStockItems { get; set; }
        public int OutOfStockItems { get; set; }
    }
}