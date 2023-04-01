using Server_side.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Server_side.Controllers
{
    public class CountriesController : ApiController
    {
        // GET api/<controller>
        public List<Country> Get()
        {
            Country c = new Country();
            return c.GetAllCountries();
        }

        // get the data for the bar chart
        public List<Country> POST(string code, string flow, int year, [FromBody]List<Country> countries)
        {
            Country c = new Country();
            return c.DataForBarChart(code, flow, year, countries);
        }



        public List<Country> POST(string category_id, string flow, [FromBody]List<Country> countries)
        {
            Country c = new Country();
            return c.DataForLineChart(category_id, flow, countries);
        }

        // get the data for the pie chart
        public List<Country> POST(string flow, int year, [FromBody]List<Product> geoChartProducts)
        {
            Country c = new Country();
            return c.DataForGeoChart(geoChartProducts, year, flow);
        }

    }
}