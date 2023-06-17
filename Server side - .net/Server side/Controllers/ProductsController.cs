using Server_side.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Server_side.Controllers
{
    public class ProductsController : ApiController
    {
        // GET api/<controller>
        public List<Product> Get()
        {
            Product p = new Product();
            return p.GetAllProducts();
        }

        // get the data for the pie chart
        public List<Product> Post(string cou, string flow, int year, [FromBody]List<Product> pieChartProducts)
        {
            Product p = new Product();
            return p.DataForPieChart(pieChartProducts, cou, flow, year);
        }

        [HttpPost]
        [Route("api/Products/NetowrkType")]
        // get the data for the pie chart
        public List<Product> NetowrkType([FromBody]List<Product> products)
        {
            Product p = new Product();
            return p.DataTimelineChart(products);
        }

    }
}