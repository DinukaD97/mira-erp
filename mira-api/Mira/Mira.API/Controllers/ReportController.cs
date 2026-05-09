using Mira.API.Models.DTOs;
using Mira.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mira.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet("stock")]
        public async Task<IActionResult> GetStockReport()
        {
            var result = await _reportService.GetStockReport();
            return Ok(ApiResponse<List<StockReportItemDto>>.Ok(result));
        }

        [HttpGet("sales-summary")]
        public async Task<IActionResult> GetSalesSummary()
        {
            var result = await _reportService.GetSalesSummary();
            return Ok(ApiResponse<SalesSummaryDto>.Ok(result));
        }
    }
}