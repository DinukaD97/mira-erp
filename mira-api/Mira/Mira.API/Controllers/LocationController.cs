using Mira.API.Models.DTOs;
using Mira.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mira.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService _locationService;

        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _locationService.GetAll();
            return Ok(ApiResponse<List<LocationDto>>.Ok(result));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _locationService.GetById(id);
            if (result == null)
                return NotFound(ApiResponse<LocationDto>.Fail("Location not found"));
            return Ok(ApiResponse<LocationDto>.Ok(result));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateLocationDto dto)
        {
            var result = await _locationService.Create(dto);
            return Ok(ApiResponse<LocationDto>.Ok(result, "Location created successfully"));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateLocationDto dto)
        {
            var result = await _locationService.Update(id, dto);
            if (result == null)
                return NotFound(ApiResponse<LocationDto>.Fail("Location not found"));
            return Ok(ApiResponse<LocationDto>.Ok(result, "Location updated successfully"));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _locationService.Delete(id);
            if (!result)
                return NotFound(ApiResponse<bool>.Fail("Location not found"));
            return Ok(ApiResponse<bool>.Ok(true, "Location deleted successfully"));
        }
    }
}