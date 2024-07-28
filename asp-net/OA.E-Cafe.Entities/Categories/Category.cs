using OA.E_Cafe.Entities.Products;

namespace OA.E_Cafe.Entities.Categories
{
    public class Category
    {
        public int Id { get; set; }     
        public required string Name { get; set; }
        public required string Description { get; set; }
        public string ImageName { get; set; }
        public List<Product> Products { get; set; }
    }
}
