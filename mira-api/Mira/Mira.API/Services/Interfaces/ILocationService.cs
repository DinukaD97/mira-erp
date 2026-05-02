using Mira.API.Models.DTOs;

namespace Mira.API.Services.Interfaces
{
    public interface ILocationService
    {
        Task<List<LocationDto>> GetAll();
        Task<LocationDto?> GetById(int id);
        Task<LocationDto> Create(CreateLocationDto dto);
        Task<LocationDto?> Update(int id, UpdateLocationDto dto);
        Task<bool> Delete(int id);
    }
}