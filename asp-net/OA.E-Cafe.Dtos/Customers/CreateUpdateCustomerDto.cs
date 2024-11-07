using OA.E_Cafe.Utils.enums;

namespace OA.E_Cafe.Dtos.Customers
{
    public class CreateUpdateCustomerDto
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string PhoneNumber { get; set; }
        public Gender Gender { get; set; }

    }
}
