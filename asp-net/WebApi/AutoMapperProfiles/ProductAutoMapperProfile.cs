using AutoMapper;
using OA.E_Cafe.Dtos.Products;
using OA.E_Cafe.Entities.Products;

namespace OA.ECafe.WebApi.AutoMapperProfiles
{
    public class ProductAutoMapperProfile : Profile
    {
        public ProductAutoMapperProfile() 
        {
            CreateMap <Product, ProductDto>();

            CreateMap<Product, ProductDetailsDto>();

            CreateMap<Product, CreateUpdateProductDto>().ReverseMap();
        }
    }
}
