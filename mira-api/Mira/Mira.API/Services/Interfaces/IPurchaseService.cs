using Mira.API.Models.DTOs;

namespace Mira.API.Services.Interfaces
{
    public interface IPurchaseService
    {
        Task<List<PurchaseDto>> GetAll();
        Task<PurchaseDto?> GetById(int id);
        Task<PurchaseDto> Create(CreatePurchaseDto dto);
    }
}