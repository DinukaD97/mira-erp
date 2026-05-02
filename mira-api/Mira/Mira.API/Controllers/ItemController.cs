using Mira.API.Models.DTOs;
using Mira.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mira.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ItemController : ControllerBase
    {
        private readonly IItemService _itemService;

        public ItemController(IItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _itemService.GetAll();
            return Ok(ApiResponse<List<ItemDto>>.Ok(result));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _itemService.GetById(id);
            if (result == null)
                return NotFound(ApiResponse<ItemDto>.Fail("Item not found"));
            return Ok(ApiResponse<ItemDto>.Ok(result));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateItemDto dto)
        {
            var result = await _itemService.Create(dto);
            return Ok(ApiResponse<ItemDto>.Ok(result, "Item created successfully"));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateItemDto dto)
        {
            var result = await _itemService.Update(id, dto);
            if (result == null)
                return NotFound(ApiResponse<ItemDto>.Fail("Item not found"));
            return Ok(ApiResponse<ItemDto>.Ok(result, "Item updated successfully"));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _itemService.Delete(id);
            if (!result)
                return NotFound(ApiResponse<bool>.Fail("Item not found"));
            return Ok(ApiResponse<bool>.Ok(true, "Item deleted successfully"));
        }
    }
}