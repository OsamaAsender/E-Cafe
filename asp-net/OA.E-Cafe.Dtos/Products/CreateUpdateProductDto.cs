using System.ComponentModel.DataAnnotations.Schema;

namespace OA.E_Cafe.Dtos.Products
{
    public class CreateUpdateProductDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }

        public string? BarCode { get; set; }
        public int Rating { get; set; } = 0;   // default value = 0


        [Column(TypeName = "decimal(4,2)")]
        public decimal Price { get; set; }

        public int CategoryId { get; set; }

    }
}
