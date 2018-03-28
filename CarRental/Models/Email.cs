using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarRental.Models
    {
    public class Email
        {
        public int iD { get; set; }
        public User From { get; set; }
        public User To { get; set; }
        public String  Content { get; set; }
        public Date Email_Date { get; set; }
        }
    }