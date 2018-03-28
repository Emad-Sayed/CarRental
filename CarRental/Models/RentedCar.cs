using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarRental.Models
    {
    public class RentedCar
        {
        public int ID { get; set; }
        public Car Car_ID { get; set; }
        public User User_ID { get; set; }
        public Date Start_Date { get; set; }
        public Date End_Date { get; set; }


        }
    }