using Mira.API.Models.DTOs;
using Mira.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mira.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PurchaseController : ControllerBase
    {
        private readonly IPurchaseService _purchaseService;

        public PurchaseController(IPurchaseService purchaseService)
        {
            _purchaseService = purchaseService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _purchaseService.GetAll();
            return Ok(ApiResponse<List<PurchaseDto>>.Ok(result));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _purchaseService.GetById(id);
            if (result == null)
                return NotFound(ApiResponse<PurchaseDto>.Fail("Purchase not found"));
            return Ok(ApiResponse<PurchaseDto>.Ok(result));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreatePurchaseDto dto)
        {
            var result = await _purchaseService.Create(dto);
            return Ok(ApiResponse<PurchaseDto>.Ok(result, "Purchase created successfully"));
        }
    }
}