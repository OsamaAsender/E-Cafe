﻿using OA.E_Cafe.Dtos.Products;
using OA.E_Cafe.Entities.Orders;
using OA.E_Cafe.Utils.enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace OA.E_Cafe.Dtos.Orders
{
    public class OrderDetailsDto
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;

        [Column(TypeName = "decimal(4,2)")]
        public decimal TotalPrice { get; set; }
        public string? Note { get; set; }
        public List<OrderProductDto> OrderProducts { get; set; } = [];

        public string CustomerFullName { get; set; }

    }
}
