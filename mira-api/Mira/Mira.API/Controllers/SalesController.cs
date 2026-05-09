using Mira.API.Models.DTOs;
using Mira.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mira.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SalesController : ControllerBase
    {
        private readonly ISalesService _salesService;

        public SalesController(ISalesService salesService)
        {
            _salesService = salesService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _salesService.GetAll();
            return Ok(ApiResponse<List<SalesDto>>.Ok(result));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _salesService.GetById(id);
            if (result == null)
                return NotFound(ApiResponse<SalesDto>.Fail("Sale not found"));
            return Ok(ApiResponse<SalesDto>.Ok(result));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateSalesDto dto)
        {
            try
            {
                var result = await _salesService.Create(dto);
                return Ok(ApiResponse<SalesDto>.Ok(result, "Sales invoice created successfully"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse<SalesDto>.Fail(ex.Message));
            }
        }
    }
}