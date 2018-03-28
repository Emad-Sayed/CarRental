using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarRental.Models
    {
    public class Feedback
        {
        public int ID { get; set; }
        public Car Car_Rated { get; set; }
        public int Car_Quality { get; set; }
        public int System_Quality { get; set; }

        }
    }