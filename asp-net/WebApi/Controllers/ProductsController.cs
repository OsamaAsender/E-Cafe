using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OA.E_Cafe.Dtos.Pages;
using OA.E_Cafe.Dtos.Products;
using OA.E_Cafe.EfCore;
using OA.E_Cafe.Entities.Products;

namespace OA.ECafe.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        #region Data and Const

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ProductsController(ApplicationDbContext context , IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        #endregion

        #region Actions

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {

            var products = await _context
                                         .Products
                                         .ToListAsync();


            var productsDto = _mapper.Map<List<ProductDto>>(products);

            return productsDto;

        }
        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<PagedListDto<ProductDto>>> GetPagedProducts([FromQuery]ListInputDto listInputDto)
        {

           var products = await _context
                                        .Products
                                        .Include(p => p.Category)
                                        .OrderByDescending(c => c.Price)
                                        .Skip(listInputDto.PageSize * listInputDto.PageIndex)
                                        .Take(listInputDto.PageSize)
                                        .ToListAsync();


            var productsDto = _mapper.Map<List<ProductDto>>(products);

            var pagedListDto = new PagedListDto<ProductDto>();

            pagedListDto.Items = _mapper.Map<List<ProductDto>>(products);

            pagedListDto.TotalItems = await _context.Products.CountAsync();

            return pagedListDto;


        }
            // GET: api/Products/5
            [HttpGet("{id}")]
        public async Task<ActionResult<ProductDetailsDto>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            var productDetailsDto = _mapper.Map<ProductDetailsDto>(product);

            return productDetailsDto;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CreateUpdateProductDto>> GetProductForEdit(int id)
        {
            var product = _context.Products.Find(id);

            if (product == null)
            {
                return NotFound();
            }

            var CreateUpdateProduct = _mapper.Map<CreateUpdateProductDto>(product);

            return CreateUpdateProduct;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditProduct(int id, CreateUpdateProductDto CreateUpdateproduct)
        {
            if (id != CreateUpdateproduct.Id)
            {
                return BadRequest();
            }

           var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            _mapper.Map(CreateUpdateproduct, product);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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
        public async Task<ActionResult<Product>> CreateProduct(CreateUpdateProductDto CreateUpdateproduct)
        {
            var product = _mapper.Map<Product>(CreateUpdateproduct);

            _context.Products.Add(product);

            await _context.SaveChangesAsync();

            return Ok();
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        #endregion

        #region Private Functions
        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
        #endregion

    }
}
