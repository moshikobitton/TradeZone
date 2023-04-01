using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server_side.Models
{
    public class Product
    {
        int id;
        string details;
        string code;
        float sum_values_of_product;
        string color;

        public Product(string code, float sum_values_of_product, string color, string details)
        {
            this.Details = details;
            this.Code = code;
            this.Sum_values_of_product = sum_values_of_product;
            this.Color = color;
        }

        public Product(int id, string details, string code)
        {
            this.Id = id;
            this.Details = details;
            this.Code = code;
        }

        public Product() { }

        public int Id { get => id; set => id = value; }
        public string Details { get => details; set => details = value; }
        public string Code { get => code; set => code = value; }
        public float Sum_values_of_product { get => sum_values_of_product; set => sum_values_of_product = value; }
        public string Color { get => color; set => color = value; }

        // Get all products
        public List<Product> GetAllProducts()
        {
            return DBservices.GetAllProducts();
        }

        // Get data for the pie chart
        public List<Product> DataForPieChart(List<Product> pieChartProducts, string cou, string flow, int year)
        {
            return DBservices.DataForPieChart(pieChartProducts, cou, flow, year);
        }

    }
}