using OA.E_Cafe.Dtos.Products;

namespace OA.E_Cafe.Dtos.Orders
{
    public class OrderProductDto
    {
        public ProductDto Product { get; set; }
        public int Quantity { get; set; }

        public double TotalPrice { get; set; }
    }
}
