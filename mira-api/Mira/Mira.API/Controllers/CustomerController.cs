using Mira.API.Models.DTOs;
using Mira.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mira.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _customerService.GetAll();
            return Ok(ApiResponse<List<CustomerDto>>.Ok(result));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _customerService.GetById(id);
            if (result == null)
                return NotFound(ApiResponse<CustomerDto>.Fail("Customer not found"));
            return Ok(ApiResponse<CustomerDto>.Ok(result));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCustomerDto dto)
        {
            var result = await _customerService.Create(dto);
            return Ok(ApiResponse<CustomerDto>.Ok(result, "Customer created successfully"));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateCustomerDto dto)
        {
            var result = await _customerService.Update(id, dto);
            if (result == null)
                return NotFound(ApiResponse<CustomerDto>.Fail("Customer not found"));
            return Ok(ApiResponse<CustomerDto>.Ok(result, "Customer updated successfully"));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _customerService.Delete(id);
            if (!result)
                return NotFound(ApiResponse<bool>.Fail("Customer not found"));
            return Ok(ApiResponse<bool>.Ok(true, "Customer deleted successfully"));
        }
    }
}