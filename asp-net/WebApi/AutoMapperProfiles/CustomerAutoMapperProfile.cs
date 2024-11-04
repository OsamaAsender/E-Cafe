using AutoMapper;
using OA.E_Cafe.Dtos.Customers;
using OA.E_Cafe.Entities.Customers;

namespace OA.ECafe.WebApi.AutoMapperProfiles
{
    public class CustomerAutoMapperProfile : Profile
    {
        public CustomerAutoMapperProfile()
        {
            CreateMap<Customer,CustomerDto>();
            CreateMap<Customer,CustomerDetailsDto>();
            CreateMap<Customer, CreateUpdateCustomerDto>().ReverseMap();
        }
    }
}
