﻿using System.ComponentModel.DataAnnotations.Schema;

namespace OA.E_Cafe.Dtos.Products
{
    public class ProductDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int Rating { get; set; } = 0;   // default value = 0

        [Column(TypeName = "decimal(4,2)")]
        public decimal Price { get; set; }
        public string CategoryName { get; set; }
    }
}
