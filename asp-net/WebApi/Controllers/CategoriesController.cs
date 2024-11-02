using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OA.E_Cafe.Dtos.Categories;
using OA.E_Cafe.Dtos.Lookups;
using OA.E_Cafe.Dtos.Pages;
using OA.E_Cafe.Dtos.Products;
using OA.E_Cafe.EfCore;
using OA.E_Cafe.Entities.Categories;
using OA.E_Cafe.Entities.Products;

namespace OA.ECafe.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        #region Data and const

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CategoriesController(ApplicationDbContext context, IMapper mapper ) //am trying to inject the automapper and the DbContext into the controller
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Actions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {

            var categories = await _context
                                           .Categories
                                           .ToListAsync();

            var categoriesDtos = _mapper.Map<List<CategoryDto>>(categories);

            return (categoriesDtos);
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<PagedListDto<CategoryDto>>> GetPagedCategories([FromQuery] ListInputDto listInputDto)
        {

            var Categories = await _context
                                            .Categories
                                            .Skip(listInputDto.PageSize * listInputDto.PageIndex)
                                            .Take(listInputDto.PageSize)
                                            .ToListAsync();


            var categoriesDto = _mapper.Map<List<CategoryDto>>(Categories);

            var pagedListDto = new PagedListDto<CategoryDto>();

            pagedListDto.Items = _mapper.Map<List<CategoryDto>>(Categories);

            pagedListDto.TotalItems = await _context.Categories.CountAsync();

            return Ok(pagedListDto);
        }


        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDetailsDto>> GetCategory(int id ,bool includeDetails = true)
        {

            var query = _context
                                .Categories
                                .Where(c => c.Id == id);

            if(includeDetails)
            {
                query = query.Include(c => c.Products);
            }

            var category = await query.SingleOrDefaultAsync();


            if (category == null)
            {
                return NotFound();
            }

            var categoryDetailsDto = _mapper.Map<CategoryDetailsDto>( category );

            return categoryDetailsDto;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<CreateUpdateCategoryDto>> GetCategoryForEdit(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            var createUpdateCategoryDto = _mapper.Map<CreateUpdateCategoryDto>(category);

            return createUpdateCategoryDto;
        }


        [HttpPut("{id}")] 
        public async Task<IActionResult> EditCategory(int id, CreateUpdateCategoryDto createUpdateCategoryDto)
        {
            if (id != createUpdateCategoryDto.Id)
            {
                return BadRequest();
            }

            var category = await _context.Categories.FindAsync(id);


            if(category == null)
            {
                return NotFound();
            }

             _mapper.Map(createUpdateCategoryDto,category);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }  // Put = Edit


        [HttpPost]
        public async Task<ActionResult> CreateCategory(CreateUpdateCategoryDto createUpdateCategoryDto)  // Post = Create
        {
            var category = _mapper.Map<Category>(createUpdateCategoryDto);

            _context.Categories.Add(category);

            await _context.SaveChangesAsync();

            return Ok();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet]
        public async Task<IEnumerable<LookupDto>> GetCategoryLookup()
        {
            var categories = await _context
                                          .Categories
                                          .Include(c => c.Products)
                                          .ToListAsync();




            var categoryLookup = categories
                                           .Select(c => new LookupDto()
                                           {
                                                  id = c.Id,
                                                  Name = $"{c.Name} - {c.Description}",
                                           });

            return categoryLookup;

        }

        [HttpGet]
        public async Task<IEnumerable<LookupDto>> GetCategoryLookupFromDB()
        {
            var categoryLookups = await _context
                                               .Categories
                                               .Select(c => new LookupDto() { id = c.Id, Name = c.Name }).ToListAsync();
            return categoryLookups;
        }

        #endregion

        #region Private Functions
        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.Id == id);
        }
        #endregion
    }
}