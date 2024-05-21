using OA.E_Cafe.Entities.Categories;
using OA.E_Cafe.Entities.Orders;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OA.E_Cafe.Entities.Products
{
    public class Product
    {
        public int Id { get; set; }

        public required string Name { get; set; }
        
        public required string Description { get; set; }

        public int Rating { get; set; } = 0;   // default value = 0

        [Column(TypeName = "decimal(6,2)")]
        public decimal Price { get; set; }

        public int CategoryId { get; set; }
        public required Category Category { get; set; }

        public List<Order> Orders { get; set; }
    }
}
