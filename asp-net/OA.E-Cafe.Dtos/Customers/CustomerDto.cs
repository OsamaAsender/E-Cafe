using OA.E_Cafe.Dtos.Orders;
using OA.E_Cafe.Entities.Orders;
using OA.E_Cafe.Utils.enums;

namespace OA.E_Cafe.Dtos.Customers
{
    public class CustomerDto
    {
        public int Id { get; set; }
        public required string FullName { get; set; }
        public required string PhoneNumber { get; set; }
        public Gender Gender { get; set; }
        public List<OrderDto> Orders { get; set; } = [];
    }
}
