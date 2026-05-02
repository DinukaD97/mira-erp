using Mira.API.Models.DTOs;
using Mira.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mira.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _categoryService.GetAll();
            return Ok(ApiResponse<List<CategoryDto>>.Ok(result));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _categoryService.GetById(id);
            if (result == null)
                return NotFound(ApiResponse<CategoryDto>.Fail("Category not found"));
            return Ok(ApiResponse<CategoryDto>.Ok(result));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCategoryDto dto)
        {
            var result = await _categoryService.Create(dto);
            return Ok(ApiResponse<CategoryDto>.Ok(result, "Category created successfully"));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateCategoryDto dto)
        {
            var result = await _categoryService.Update(id, dto);
            if (result == null)
                return NotFound(ApiResponse<CategoryDto>.Fail("Category not found"));
            return Ok(ApiResponse<CategoryDto>.Ok(result, "Category updated successfully"));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _categoryService.Delete(id);
            if (!result)
                return NotFound(ApiResponse<bool>.Fail("Category not found"));
            return Ok(ApiResponse<bool>.Ok(true, "Category deleted successfully"));
        }
    }
}