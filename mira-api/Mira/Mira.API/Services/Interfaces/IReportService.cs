using Mira.API.Models.DTOs;

namespace Mira.API.Services.Interfaces
{
    public interface IReportService
    {
        Task<List<StockReportItemDto>> GetStockReport();
    }
}