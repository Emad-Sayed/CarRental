using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarRental.Models
    {
    public class Car
        {
        public int ID { get; set; }
        public String Model { get; set; }
        public int NumberOfSeats { get; set; }
        public float price { get; set; }
        public int State { get; set; }
        public String Color { get; set; }
        public Category Car_Category { get; set; }

        }
    }