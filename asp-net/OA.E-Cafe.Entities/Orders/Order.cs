using OA.E_Cafe.Entities.Products;
using OA.E_Cafe.Utils.enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace OA.E_Cafe.Entities.Orders
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;

        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        public Boolean OrderModified { get; set; } = false;
        public CheckoutType CheckoutType { get; set; }

        [Column(TypeName = "decimal(4,2)")]
        public decimal TotalPrice { get; set; }
        public List<OrderProduct> OrderProducts { get; set; } = [];
    }
}
