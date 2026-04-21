namespace Mira.API.Models.Entities
{
    public class PurchaseInvoice
    {
        public int Id { get; set; }
        public string InvoiceNo { get; set; } = string.Empty;
        public int SupplierId { get; set; }
        public Supplier? Supplier { get; set; }
        public DateTime InvoiceDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Remark { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public List<PurchaseInvoiceItem> Items { get; set; } = new();
    }
}