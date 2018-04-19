using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarRental.Models
    {
    public class Prefers
        {
        public int ID { get; set; }
        public User user { get; set; }
        public Category category { get; set; }
        }
    }