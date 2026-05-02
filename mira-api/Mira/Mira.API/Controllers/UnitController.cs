using Mira.API.Models.DTOs;
using Mira.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mira.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UnitController : ControllerBase
    {
        private readonly IUnitService _unitService;

        public UnitController(IUnitService unitService)
        {
            _unitService = unitService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _unitService.GetAll();
            return Ok(ApiResponse<List<UnitDto>>.Ok(result));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _unitService.GetById(id);
            if (result == null)
                return NotFound(ApiResponse<UnitDto>.Fail("Unit not found"));
            return Ok(ApiResponse<UnitDto>.Ok(result));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateUnitDto dto)
        {
            var result = await _unitService.Create(dto);
            return Ok(ApiResponse<UnitDto>.Ok(result, "Unit created successfully"));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateUnitDto dto)
        {
            var result = await _unitService.Update(id, dto);
            if (result == null)
                return NotFound(ApiResponse<UnitDto>.Fail("Unit not found"));
            return Ok(ApiResponse<UnitDto>.Ok(result, "Unit updated successfully"));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _unitService.Delete(id);
            if (!result)
                return NotFound(ApiResponse<bool>.Fail("Unit not found"));
            return Ok(ApiResponse<bool>.Ok(true, "Unit deleted successfully"));
        }
    }
}