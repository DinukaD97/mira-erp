using Mira.API.Models.DTOs;

namespace Mira.API.Services.Interfaces
{
    public interface ISupplierService
    {
        Task<List<SupplierDto>> GetAll();
        Task<SupplierDto?> GetById(int id);
        Task<SupplierDto> Create(CreateSupplierDto dto);
        Task<SupplierDto?> Update(int id, UpdateSupplierDto dto);
        Task<bool> Delete(int id);
    }
}