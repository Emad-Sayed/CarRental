using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarRental.Models
    {
    public class User
        {
        public int ID { get; set; }
        public String Fname { get; set; }
        public String Lname { get; set; }
        public String Email { get; set; }
        public String Password { get; set; }
        public String CreditCardNumber { get; set; }
        public String Phone { get; set; }
        public int Block { get; set; }
        public UserType Type { get; set; }
        }
    }