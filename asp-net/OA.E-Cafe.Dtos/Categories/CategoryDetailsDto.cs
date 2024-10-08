﻿using OA.E_Cafe.Dtos.Products;
using OA.E_Cafe.Entities.Products;

namespace OA.E_Cafe.Dtos.Categories
{
    public class CategoryDetailsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<ProductDto> Products { get; set; } = [];
    }
}
