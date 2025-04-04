﻿using OA.E_Cafe.Dtos.Orders;
using OA.E_Cafe.Entities.Orders;
using OA.E_Cafe.Utils.enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace OA.E_Cafe.Dtos.Customers
{
    public class CustomerDetailsDto
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string PhoneNumber { get; set; }
        public Gender Gender { get; set; }

        public List<OrderDto> Orders { get; set; } = [];

    }
}
