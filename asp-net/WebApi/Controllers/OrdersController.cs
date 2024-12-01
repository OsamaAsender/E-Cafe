using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OA.E_Cafe.Dtos.Orders;
using OA.E_Cafe.EfCore;
using OA.E_Cafe.Entities.Orders;

namespace OA.ECafe.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        #region Data and Const
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public OrdersController(ApplicationDbContext context , IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Actions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders()
        {
            var orders = await _context
                                       .Orders
                                       .Include(o => o.Customer)
                                       .ToListAsync();

            var ordersDto = _mapper.Map<List<OrderDto>>(orders);

            return (ordersDto); 
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDetailsDto>> GetOrder(int id)
        {
            var order = await _context.Orders
                                             .Include(o => o.OrderProducts)
                                             .ThenInclude(op => op.Product)
                                             .ThenInclude(p => p.Category)
                                             .Include(o => o.Customer)
                                             .Where(o => o.Id == id)
                                             .SingleOrDefaultAsync();

            

            if (order == null)
            {
                return NotFound();
            }

            var orderDetailsDto = _mapper.Map<OrderDetailsDto>(order);

            return orderDetailsDto;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CreateUpdateOrderDto>> GetOrderForEdit(int id)
        {
            var order = await _context
                                      .Orders
                                      .Include(o => o.OrderProducts)
                                      .Where(o => o.Id == id)
                                      .SingleOrDefaultAsync();

            if (order == null)
            {
                return NotFound();
            }

            var orderDto = _mapper.Map<CreateUpdateOrderDto>(order);

            return (orderDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditOrder(int id, CreateUpdateOrderDto createUpdateOrderDto)
        {
            if (id != createUpdateOrderDto.Id)
            {
                return BadRequest();
            }

            var order = await _context
                                .Orders
                                .Include(p => p.OrderProducts)
                                    .ThenInclude(op => op.Product)
                                .Where(o => o.Id == id)
                                .SingleOrDefaultAsync();

            if (order == null)
            {
                return NotFound();
            }

            _mapper.Map(createUpdateOrderDto, order);

            await UpdateOrderProductAsync(order.Id, createUpdateOrderDto.OrderProducts);

            order.TotalPrice = GetTotalPrice(order.OrderProducts);


            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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
        public async Task<ActionResult<CreateUpdateOrderDto>> CreateOrder(CreateUpdateOrderDto createUpdateOrderDto)
        {
            var order = _mapper.Map<Order>(createUpdateOrderDto);

            order.OrderDate = DateTime.Now;

            _context.Orders.Add(order);

            await _context.SaveChangesAsync();

            await UpdateOrderProductAsync(order.Id, createUpdateOrderDto.OrderProducts);

            order.TotalPrice = GetTotalPrice(order.OrderProducts);

            await _context.SaveChangesAsync();

            return Ok();
        }

       

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        #endregion

        #region Private Functions
        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }

        private async Task UpdateOrderProductAsync(int orderId, List<CreateUpdateOrderProductDto> orderProductsDtos)
        {
            var order = await _context.Orders
                                              .Include(o => o.OrderProducts)
                                              .ThenInclude(op => op.Product)
                                              .Where(o => o.Id == orderId)
                                              .SingleAsync();

            order.OrderProducts.Clear();
            
            var productIds = orderProductsDtos.Select(op => op.ProductId).ToList();

            var products = await _context
                                   .Products
                                   .Where(p =>productIds.Contains(p.Id))
                                   .ToListAsync();

            foreach ( var product in products)
            {
                var orderProduct = new OrderProduct()
                {
                    Order = order,
                    Product = product,
                    Quantity = orderProductsDtos.Where(op => op.ProductId == product.Id).Select(op => op.Quantity).Single()
                };

                order.OrderProducts.Add(orderProduct);
            }
        }

        private decimal GetTotalPrice(List<OrderProduct> orderProducts)
        {
            decimal totalPrice = 0;

            foreach (var orderProduct in orderProducts)
            {
                totalPrice += orderProduct.Quantity * orderProduct.Product.Price;
            }
            return totalPrice;
        }

        #endregion
    }
}
