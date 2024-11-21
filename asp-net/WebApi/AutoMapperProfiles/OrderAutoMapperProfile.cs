using AutoMapper;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;
using OA.E_Cafe.Dtos.Orders;
using OA.E_Cafe.Entities.Orders;

namespace OA.ECafe.WebApi.AutoMapperProfiles
{
    public class OrderAutoMapperProfile : Profile
    {
        public OrderAutoMapperProfile()
        {
            CreateMap<Order, OrderDto>();
            CreateMap<Order, OrderDetailsDto>();
            CreateMap<Order, CreateUpdateOrderDto>().ReverseMap();
            CreateMap<OrderProduct, OrderProductDto>().ReverseMap();
        }
    }
}
