namespace Mira.API.Models.DTOs
{
    public class PurchaseItemDto
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public string ItemName { get; set; } = string.Empty;
        public string ItemCode { get; set; } = string.Empty;
        public decimal Qty { get; set; }
        public decimal UnitCost { get; set; }
        public decimal LineTotal { get; set; }
    }

    public class PurchaseDto
    {
        public int Id { get; set; }
        public string InvoiceNo { get; set; } = string.Empty;
        public int SupplierId { get; set; }
        public string SupplierName { get; set; } = string.Empty;
        public DateTime InvoiceDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Remark { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public List<PurchaseItemDto> Items { get; set; } = new();
    }

    public class CreatePurchaseItemDto
    {
        public int ItemId { get; set; }
        public decimal Qty { get; set; }
        public decimal UnitCost { get; set; }
    }

    public class CreatePurchaseDto
    {
        public string InvoiceNo { get; set; } = string.Empty;
        public int SupplierId { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string Remark { get; set; } = string.Empty;
        public List<CreatePurchaseItemDto> Items { get; set; } = new();
    }
}