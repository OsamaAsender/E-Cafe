using OA.E_Cafe.Entities.Categories;
using OA.E_Cafe.Entities.Orders;
using System.ComponentModel.DataAnnotations.Schema;

namespace OA.E_Cafe.Entities.Products
{
    public class Product
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }

        public string ?BarCode { get; set; }
        public int Rating { get; set; } = 0;   // default value = 0

        [Column(TypeName = "decimal(4,2)")]
        public decimal Price { get; set; }
        public string ?ImageName { get; set; }
        public int CategoryId { get; set; }
        public required Category Category { get; set; }
        public List<OrderProduct> OrderProducts { get; set; }
    }
}
