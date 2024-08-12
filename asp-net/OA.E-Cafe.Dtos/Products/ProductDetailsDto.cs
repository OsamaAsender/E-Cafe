using OA.E_Cafe.Dtos.Categories;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OA.E_Cafe.Dtos.Products
{
    public class ProductDetailsDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public int Rating { get; set; } = 0;   // default value = 0

        [Column(TypeName = "decimal(4,2)")]
        public decimal Price { get; set; }
        public string CategoryName { get; set; }
    }
}
