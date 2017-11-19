using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SimpleAPI.Controllers.ProductArea.ProductModels
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
    }

    public class ProductModel
    {
        [Required(
            AllowEmptyStrings = false,
            ErrorMessage = "Product name is required and can't be empty")]
        public string Name { get; set; }
        [Required(
            AllowEmptyStrings = false,
            ErrorMessage = "Category is required for each product")]
        public string Category { get; set; }

        [Required]
        [Range(0.01, 200)]
        public decimal Price { get; set; }

        public Product ToProduct()
        {
            return new Product
            {
                Id = Guid.NewGuid(),
                Name = this.Name,
                Category = this.Category,
                Price = this.Price
            };
        }

    }

    public static class ProductProducer
    {
        public static IList<Product> Products = new List<Product>
        {
            new Product{ Id = Guid.NewGuid(), Name = "ABC", Price = 10.25M, Category = "Automatic" },
            new Product{ Id = Guid.NewGuid(), Name = "EFG", Price = 20.00M, Category = "Automatic" },
            new Product{ Id = Guid.NewGuid(), Name = "HKL", Price = 12.45M, Category = "Automatic" },
            new Product{ Id = Guid.NewGuid(), Name = "MBP", Price = 56.00M, Category = "Automatic" },
            new Product{ Id = Guid.NewGuid(), Name = "XYZ", Price = 15.30M, Category = "Automatic" }
        };
    }
}
