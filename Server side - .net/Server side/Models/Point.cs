using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server_side.Models
{
    public class Point
    {
        int year;
        float value_in_year;

        public Point(int year, float value_in_year)
        {
            this.year = year;
            this.value_in_year = value_in_year;
        }

        public int x { get => year; set => year = value; }
        public float y { get => value_in_year; set => value_in_year = value; }
    }
}