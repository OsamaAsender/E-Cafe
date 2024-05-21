using OA.E_Cafe.Entities.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OA.E_Cafe.Entities.Orders
{
    public class Order
    {
        public int Id { get; set; }
        public List<Product> Products { get; set; }
    }
}
