namespace Mira.API.Models.Entities
{
    public class StockTransaction
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public Item? Item { get; set; }
        public string TransactionType { get; set; } = string.Empty;
        public decimal Qty { get; set; }
        public int ReferenceId { get; set; }
        public string Remark { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}