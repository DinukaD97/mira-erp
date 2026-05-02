using Mira.API.Models.DTOs;

namespace Mira.API.Services.Interfaces
{
    public interface IUnitService
    {
        Task<List<UnitDto>> GetAll();
        Task<UnitDto?> GetById(int id);
        Task<UnitDto> Create(CreateUnitDto dto);
        Task<UnitDto?> Update(int id, UpdateUnitDto dto);
        Task<bool> Delete(int id);
    }
}