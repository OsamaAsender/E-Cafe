using OA.E_Cafe.Entities.Customers;
using OA.E_Cafe.Entities.Products;
using OA.E_Cafe.Utils.enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace OA.E_Cafe.Entities.Orders
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;

        [Column(TypeName = "decimal(4,2)")]
        public decimal TotalPrice { get; set; }
        public string Note { get; set; }
        public List<OrderProduct> OrderProducts { get; set; } = [];

        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
    }
}
