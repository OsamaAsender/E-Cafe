using Microsoft.EntityFrameworkCore;
using OA.E_Cafe.Entities.Categories;
using OA.E_Cafe.Entities.Customers;
using OA.E_Cafe.Entities.Orders;
using OA.E_Cafe.Entities.Products;

namespace OA.E_Cafe.EfCore
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Category> Categories { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
        : base (options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderProduct>()
                .HasKey(bc => new {bc.OrderId, bc.ProductId});

            modelBuilder.Entity<OrderProduct>()
                 .HasOne(bc => bc.Order)
                 .WithMany(b => b.OrderProducts)
                 .HasForeignKey(bc => bc.OrderId);

            modelBuilder.Entity <OrderProduct>()
                .HasOne(bc => bc.Product)
                .WithMany(b => b.OrderProducts)
                .HasForeignKey(bc => bc.ProductId);
        }
    }
}