using OA.E_Cafe.Entities.Orders;
using OA.E_Cafe.Utils.enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace OA.E_Cafe.Dtos.Customers
{
    public class CustomerDetailsDto
    {
        public int Id { get; set; }
        public required string FullName { get; set; }
        public required int PhoneNumber { get; set; }
        public Gender Gender { get; set; }

        //public List<OrderDto> Orders { get; set; } = [];

    }
}
