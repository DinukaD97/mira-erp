using Mira.API.Models.DTOs;
using Mira.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mira.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SupplierController : ControllerBase
    {
        private readonly ISupplierService _supplierService;

        public SupplierController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _supplierService.GetAll();
            return Ok(ApiResponse<List<SupplierDto>>.Ok(result));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _supplierService.GetById(id);
            if (result == null)
                return NotFound(ApiResponse<SupplierDto>.Fail("Supplier not found"));
            return Ok(ApiResponse<SupplierDto>.Ok(result));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateSupplierDto dto)
        {
            var result = await _supplierService.Create(dto);
            return Ok(ApiResponse<SupplierDto>.Ok(result, "Supplier created successfully"));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateSupplierDto dto)
        {
            var result = await _supplierService.Update(id, dto);
            if (result == null)
                return NotFound(ApiResponse<SupplierDto>.Fail("Supplier not found"));
            return Ok(ApiResponse<SupplierDto>.Ok(result, "Supplier updated successfully"));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _supplierService.Delete(id);
            if (!result)
                return NotFound(ApiResponse<bool>.Fail("Supplier not found"));
            return Ok(ApiResponse<bool>.Ok(true, "Supplier deleted successfully"));
        }
    }
}