using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CarRental.Models
    {
    public class User
        {
        public int ID { get; set; }
        [Required]
       [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Use letters only please")]
        public String Fname { get; set; }
       [Required]
       [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Use letters only please")]
        public String Lname { get; set; }
                [Required]
        [RegularExpression(@"\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*", ErrorMessage = "invalid Email")]
        public String Email { get; set; }
                [Required]
       [RegularExpression(@"^[a-zA-Z0-9]{8,}", ErrorMessage = "Password at Leats 8 Chars")]

        public String Password { get; set; }
                [Required]
       [RegularExpression(@"[0-9]{14}", ErrorMessage = "Invalid Credit Number")]
       public String CreditCardNumber { get; set; }
                [Required]
               [RegularExpression(@"[0-9]{11}", ErrorMessage = "Invalid Phone Number")]
        public String Phone { get; set; }
        public float Balance { get; set; }
        public int Block { get; set; }
        public String User_Image { get; set; }
        public UserType Type { get; set; }
        }
    }