using OA.E_Cafe.Entities.Products;

namespace OA.E_Cafe.Entities.Orders
{
    public class OrderProduct
    {
        public int ProductId { get; set; }
        public required Product Product { get; set; }

        public int OrderId { get; set; }
        public required Order Order { get; set; }

        public int Quantity { get; set; } = 1;
    }
}
