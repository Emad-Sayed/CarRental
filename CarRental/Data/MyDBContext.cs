using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using CarRental.Models;

namespace CarRental.Data
    {
    public class MyDBContext : DbContext
        {
        public MyDBContext() :base("DefaultConnection")
        { }
        public DbSet<UserType> UserTypes { get; set; }
        public DbSet <User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<Email> Emails { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<RentedCar> RentedCars { get; set; }

        public DbSet<Prefers> Prefers { get; set; }


        }
    }