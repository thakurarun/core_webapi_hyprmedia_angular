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

            var response = new ResourceList<object>(products)
                .AddLink(UrlCreator
                    .From<ProductController, object>("add", ctrl => ctrl.Post(null))
                    .WithParams<ProductModel>());

            return await Task.Run(() => Ok(response));
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await Task.Run(() => ProductProducer.Products
                                  .First(product => id == product.Id));
            return Ok(result);
        }

        // POST: api/Product
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Product newProduct)
        {
            ProductProducer.Products
                           .Add(newProduct);
            return await Task.Run(() => Ok(true));
        }

        // PUT: api/Product/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]Product product)
        {
            var result = ProductProducer.Products
                                        .Single(_product => _product.Id == id);
            result.Name = product.Name;
            result.Category = product.Category;
            result.Price = product.Price;
            return await Task.Run(() => Ok(true));
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = ProductProducer.Products
                                       .Single(product => product.Id == id);
            await Task.Run(() => ProductProducer
                .Products
                .Remove(result)
            );

            return Ok(true);
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
                   .WithParams<ProductModel>(),
                UrlCreator
                    .From<ProductController, object>("delete", ctrl => ctrl.Delete(product.Id)),

            });
            return data;
        }
    }
}
