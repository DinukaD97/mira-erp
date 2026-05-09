namespace Mira.API.Models.DTOs
{
    public class SalesItemDto
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public string ItemName { get; set; } = string.Empty;
        public string ItemCode { get; set; } = string.Empty;
        public decimal Qty { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal LineTotal { get; set; }
    }

    public class SalesDto
    {
        public int Id { get; set; }
        public string InvoiceNo { get; set; } = string.Empty;
        public int CustomerId { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public DateTime InvoiceDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Remark { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public List<SalesItemDto> Items { get; set; } = new();
    }

    public class CreateSalesItemDto
    {
        public int ItemId { get; set; }
        public decimal Qty { get; set; }
        public decimal UnitPrice { get; set; }
    }

    public class CreateSalesDto
    {
        public string InvoiceNo { get; set; } = string.Empty;
        public int CustomerId { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string Remark { get; set; } = string.Empty;
        public List<CreateSalesItemDto> Items { get; set; } = new();
    }
}