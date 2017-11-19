using Microsoft.AspNetCore.Mvc;
using SimpleAPI.Controllers.ProductArea.ProductModels;
using SimpleAPI.CustomUrlHelper;
using SimpleAPI.Resource;
using System;
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
        public async Task<IActionResult> Get(Guid id)
        {
            var result = await Task.Run(() => ProductProducer.Products
                                  .First(product => id == product.Id));
            return Ok(result);
        }

        // POST: api/Product
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]ProductModel productModel)
        {

            if (ModelState.IsValid)
            {
                var newProduct = productModel.ToProduct();

                ProductProducer
                        .Products
                        .Add(newProduct);
                return await Task.Run(() => Ok(true));
            }

            return await Task.Run(() => Ok(false));
        }

        // PUT: api/Product/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody]ProductModel productModel)
        {
            await Task.Delay(TimeSpan.FromSeconds(2));

            if (ModelState.IsValid)
            {
                var result = ProductProducer.Products
                                        .Single(_product => _product.Id == id);
                result.Name = productModel.Name;
                result.Category = productModel.Category;
                result.Price = productModel.Price;
                return await Task.Run(() => Ok(true));
            }
            //var errorMessages = ModelState.SelectMany(err =>
            //                        err.Value?
            //                            .Errors?
            //                            .Select(e => e.ErrorMessage));

            return await Task.Run(() => Ok(false));
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
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
