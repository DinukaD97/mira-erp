using Mira.API.Models.DTOs;

namespace Mira.API.Services.Interfaces
{
    public interface ISalesService
    {
        Task<List<SalesDto>> GetAll();
        Task<SalesDto?> GetById(int id);
        Task<SalesDto> Create(CreateSalesDto dto);
    }
}