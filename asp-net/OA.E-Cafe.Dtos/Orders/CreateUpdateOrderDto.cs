using OA.E_Cafe.Entities.Orders;
using OA.E_Cafe.Utils.enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace OA.E_Cafe.Dtos.Orders
{
    public class CreateUpdateOrderDto
    {
        public int Id { get; set; }
        public string? Note { get; set; }
        public int CustomerId { get; set; }
        public List<CreateUpdateOrderProductDto> OrderProducts { get; set; } = [];
    }
}