using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarRental.Models
    {
    public class RentedCar
        {
        public int ID { get; set; }
        public Car Car { get; set; }
        public User User { get; set; }
        public DateTime Start_Date { get; set; }
        public DateTime End_Date { get; set; }


        }
    }