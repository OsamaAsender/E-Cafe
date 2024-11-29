using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OA.E_Cafe.Dtos.Orders
{
    public class CreateUpdateOrderProductDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
