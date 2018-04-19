using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CarRental.Models
    {
    public class Category
        {
        public int ID { get; set; }
        [Required]
       [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Use letters only please")]
        public String Name { get; set; }
        public String Description { get; set; }
        }
    }