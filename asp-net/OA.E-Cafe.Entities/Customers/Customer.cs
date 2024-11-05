using OA.E_Cafe.Entities.Orders;
using OA.E_Cafe.Utils.enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace OA.E_Cafe.Entities.Customers
{
    public class Customer
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string PhoneNumber { get; set; }
        public Gender Gender { get; set; }
        public List<Order> Orders { get; set; } = [];

        [NotMapped]
        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }

        }
    }
}
