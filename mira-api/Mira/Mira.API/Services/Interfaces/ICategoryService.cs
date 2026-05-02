using Mira.API.Models.DTOs;

namespace Mira.API.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<List<CategoryDto>> GetAll();
        Task<CategoryDto?> GetById(int id);
        Task<CategoryDto> Create(CreateCategoryDto dto);
        Task<CategoryDto?> Update(int id, UpdateCategoryDto dto);
        Task<bool> Delete(int id);
    }
}