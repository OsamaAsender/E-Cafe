using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OA.E_Cafe.Dtos.Categories;
using OA.E_Cafe.Dtos.Customers;
using OA.E_Cafe.EfCore;
using OA.E_Cafe.Entities.Customers;

namespace OA.ECafe.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        #region Data And Const 

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CustomersController(ApplicationDbContext context, IMapper mapper)

        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Actions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerDto>>> GetCustomers()
        {
            var Customer = await _context
                                         .Customers
                                         //.Select(c => _mapper.Map<CustomerDto>(c))
                                         .ToListAsync();

            var CustomersDto = _mapper.Map<List<CustomerDto>>(Customer);

            return Ok(CustomersDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDetailsDto>> GetCustomer(int id)
        {
            var customer = await _context
                                         .Customers
                                         .Include(c => c.Orders)
                                         .Where( c => c.Id == id)
                                         .SingleOrDefaultAsync();

            if (customer == null)
            {
                return NotFound();
            }

            var customerDto = _mapper.Map<CustomerDetailsDto>(customer);

            return customerDto;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CreateUpdateCustomerDto>> GetCustomerForEdit(int id)
        {
            var customer = await _context
                                         .Customers
                                         .Where( c => c.Id == id)
                                         .SingleOrDefaultAsync();

            if (customer == null)
            {
                return NotFound();
            }

            var createUpdateCustomerDto = _mapper.Map<CreateUpdateCustomerDto>(customer);

            return createUpdateCustomerDto;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditCustomer(int id, CreateUpdateCustomerDto createUpdateCustomerDto)
        {
            if (id != createUpdateCustomerDto.Id)
            {
                return BadRequest();
            }

            var customer = await _context.Customers.FindAsync(id);
          
            if(customer == null)
            {
                return NotFound();
            }

            _mapper.Map(createUpdateCustomerDto, customer);


            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<CreateUpdateCustomerDto>> CreateCustomer(CreateUpdateCustomerDto createUpdateCustomerDto)
        {
            var customer = _mapper.Map<Customer>(createUpdateCustomerDto);

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }
#endregion
        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.Id == id);
        }
    }
}
