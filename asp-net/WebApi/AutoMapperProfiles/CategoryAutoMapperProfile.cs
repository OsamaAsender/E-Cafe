using AutoMapper;
using OA.E_Cafe.Dtos.Categories;
using OA.E_Cafe.Entities.Categories;

namespace OA.ECafe.WebApi.AutoMapperProfiles
{
    public class CategoryAutoMapperProfile : Profile
    {
        public CategoryAutoMapperProfile() 
        {
            CreateMap<Category, CategoryDto>();
            CreateMap<Category, CategoryDetailsDto>();
            CreateMap<Category, CreateUpdateCategoryDto>().ReverseMap();
        }
    }
}
