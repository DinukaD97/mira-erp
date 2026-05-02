using Mira.API.Models.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mira.API.Services.Interfaces
{
    public interface ICustomerService
    {
        Task<List<CustomerDto>> GetAll();
        Task<CustomerDto?> GetById(int id);
        Task<CustomerDto> Create(CreateCustomerDto dto);
        Task<CustomerDto?> Update(int id, UpdateCustomerDto dto);
        Task<bool> Delete(int id);
    }
}