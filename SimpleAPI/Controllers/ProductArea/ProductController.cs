using Microsoft.AspNetCore.Mvc;
using SimpleAPI.Controllers.ProductArea.ProductModels;
using SimpleAPI.CustomUrlHelper;
using SimpleAPI.Resource;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleAPI.Controllers.ProductArea
{
    [Produces("application/json")]
    [Route("api/product")]
    public class ProductController : Controller
    {
        // GET: api/Product
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var products = ProductProducer.Products
                                            .Select(product =>
                                                CreateResourceDataOfProduct(product));

            var response = new ResourceData<object>(products)
                .AddLink(UrlCreator
                    .From<ProductController, object>("add", ctrl => ctrl.Post(null))
                    .WithParams<ProductModel>());

            return Ok(response);
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<Product> Get(int id)
        {
            return await Task.Run(() => ProductProducer.Products
                                  .First(product => id == product.Id));
        }

        // POST: api/Product
        [HttpPost]
        public async Task Post([FromBody]Product newProduct)
        {
            ProductProducer.Products
                           .Add(newProduct);
        }

        // PUT: api/Product/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody]string name)
        {
            var result = ProductProducer.Products
                                        .Single(product => product.Id == id);
            result.Name = name;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            var result = ProductProducer.Products
                                       .Single(product => product.Id == id);
            ProductProducer
                .Products
                .Remove(result);
        }

        private ResourceData<Product> CreateResourceDataOfProduct(Product product)
        {
            var data = new ResourceData<Product>(product);
            data.Links.AddRange(new List<Link>
            {
                UrlCreator
                    .From<ProductController, object>("self", ctrl => ctrl.Get(product.Id)),
                UrlCreator
                    .From<ProductController, object>("edit", ctrl => ctrl.Put(product.Id, null))
                    .WithParams(new {
                        name = string.Empty
                    }),
                UrlCreator
                    .From<ProductController, object>("delete", ctrl => ctrl.Delete(product.Id)),

            });
            return data;
        }
    }
}
