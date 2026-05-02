using Mira.API.Models.DTOs;

namespace Mira.API.Services.Interfaces
{
    public interface IItemService
    {
        Task<List<ItemDto>> GetAll();
        Task<ItemDto?> GetById(int id);
        Task<ItemDto> Create(CreateItemDto dto);
        Task<ItemDto?> Update(int id, UpdateItemDto dto);
        Task<bool> Delete(int id);
    }
}