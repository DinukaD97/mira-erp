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
}