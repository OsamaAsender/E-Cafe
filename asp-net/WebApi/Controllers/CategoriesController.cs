using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using OA.E_Cafe.Dtos.Categories;
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

        public CategoriesController(ApplicationDbContext context, IMapper mapper ) //am trying to inject the automapper into the controller
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Actions
        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            var categories = await _context
                                           .Categories
                                           .ToListAsync();

            var categoriesDtos = _mapper.Map<List<CategoryDto>>( categories );

            return (categoriesDtos);
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDetailsDto>> GetCategory(int id)
        {
            var category = await _context
                                        .Categories
                                        .Include(c=> c.Products)
                                        .Where(c => c.Id == id)
                                        .SingleOrDefaultAsync();

            if (category == null)
            {
                return NotFound();
            }

            var categoryDto = _mapper.Map<CategoryDetailsDto>( category );

            return categoryDto;
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
            if (id != category.Id)
            {
                return BadRequest();
            }

            _context.Entry(category).State = EntityState.Modified;

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
        #endregion

        #region Private Functions
        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.Id == id);
        }
        #endregion
    }
}