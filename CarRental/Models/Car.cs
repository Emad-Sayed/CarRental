using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CarRental.Models
    {
    public class Car
        {
        public int ID { get; set; }
        [Required]
        public String Model { get; set; }
        [Range(0,6)]
        public int NumberOfSeats { get; set; }
        [Required]
        [Range(50, 10000)]
        public float price { get; set; }
        [Required]
        public int State { get; set; }
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Use letters only please")]
        public String Color { get; set; }
        [Required]
        public String Image { get; set; }

        public String Advantages { get; set; }
        [Required]
        public Category Car_Category { get; set; }

        }
    }