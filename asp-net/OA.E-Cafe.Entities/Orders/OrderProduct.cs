﻿using OA.E_Cafe.Entities.Products;

namespace OA.E_Cafe.Entities.Orders
{
    public class OrderProduct
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int OrderId { get; set; }
        public Order Order { get; set; }

        public int Quantity { get; set; } = 1;
    }
}
