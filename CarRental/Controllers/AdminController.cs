using CarRental.Data;
using System;
using CarRental.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CarRental.Filters;
using System.Drawing;

namespace CarRental.Controllers
    {
    public class AdminController : Controller
        {
        private MyDBContext db = new MyDBContext();
        private Operations operations = new Operations();
        //
        // GET: /Admin/
        [IsLogged]
        [IsAdmin]
        public ActionResult AdminPanel()
            {
            CheckEndDate();
            return View();
            }
        [IsLogged]
        [IsAdmin]
        public void CheckEndDate()
            {
            List<RentedCar> rentedcars = db.RentedCars.Include("Car").ToList();
            DateTime ToDay = DateTime.Today;
            if(rentedcars.Any())
                {
                foreach (RentedCar record in rentedcars)
                    {
                    if (ToDay >= record.End_Date)
                        {
                        Car car=(Car)db.Cars.Include("Car_Category").Where(c => c.ID == record.Car.ID).First();
                        car.State = 0;
                        db.RentedCars.Remove(record);
                        }
                    }
                db.SaveChanges();
                }
            }
        public ActionResult AddCarPage()
            {
            return View();
            }
        [IsLogged]
        [IsAdmin]
        public ActionResult GetUsers()
            {
            return Json(db.Users.ToList(), JsonRequestBehavior.AllowGet);
            }
        [IsLogged]
        [IsAdmin]
        public ActionResult GetRendering()
            {
            return Json(db.RentedCars.Include("Car").Include("User").ToList(), JsonRequestBehavior.AllowGet);
            }
        [IsLogged]
        [IsAdmin]
        public ActionResult BlockUser(int id)
            {
            User user = db.Users.Find(id);

            if (user != null)
                {
                user.Block = 1;
                db.SaveChanges();
                return Json("true");
                }
            return Json("false");
            }
        [IsLogged]
        [IsAdmin]
        public ActionResult UnBlockUser(int id)
            {
            User user = db.Users.Find(id);

            if (user != null)
                {
                user.Block = 0;
                db.SaveChanges();
                return Json("true");
                }
            return Json("false");
            }
        [IsLogged]
        [IsAdmin]
        public ActionResult Unavailable(int id)
            {
            Car car = db.Cars.Include("Car_Category").Where(c => c.ID == id).First();

            if (car != null)
                {
                car.State = 1;
                db.SaveChanges();
                return Json("true");
                }
            return Json("false");

            }
        [IsLogged]
        [IsAdmin]
        public ActionResult available(int id)
            {
            Car car = db.Cars.Include("Car_Category").Where(c => c.ID == id).First();
            if (car != null)
                {
                car.State = 0;
                db.SaveChanges();
                try
                    {
                    RentedCar RC = db.RentedCars.Include("Car").Where(c => c.Car.ID == id).First(); //Law Fe M3ad
                    db.RentedCars.Remove(RC);
                    db.SaveChanges();
                    }
                catch(Exception E) //No Specifi Time for car
                    {

                    }
                return Json("true");
                }
            return Json("false");

            }
        [IsLogged]
        [IsAdmin]
        public ActionResult DeleteCar(int Car_ID)
            {

            var RentedRecord = db.RentedCars.Where(RC => RC.Car.ID == Car_ID);
            if(RentedRecord.Any())
            db.RentedCars.Remove((RentedCar)RentedRecord.First());
            Car CarRecord = (Car)db.Cars.Find(Car_ID);
            db.Cars.Remove(CarRecord);
            db.SaveChanges();
            return Json("true");
            }
        [IsLogged]
        [IsAdmin]
        public ActionResult DeleteUser(int User_ID)
            {

            var Prefers = db.Prefers.Where(RC => RC.user.ID == User_ID).ToList();
            if (Prefers.Any())
                {
                foreach (var item in Prefers)
                    {
                        db.Prefers.Remove((Prefers)item);
                    }
                }
            User UserRecord = (User)db.Users.Find(User_ID);
            db.Users.Remove(UserRecord);
            db.SaveChanges();
            return Json("true",JsonRequestBehavior.AllowGet);
            }
        [IsLogged]
        [IsAdmin]
        public ActionResult SearchUser(int User_ID)
            {
            return Json(db.Users.Find(User_ID),JsonRequestBehavior.AllowGet);
            }
        [IsLogged]
        [IsAdmin]
        public ActionResult ChargeBalance(int User_ID, float ChargeValue)
            {
            User u = (User)db.Users.Find(User_ID);
            u.Balance = u.Balance + ChargeValue;
            db.SaveChanges();
            return Json("Done");
            }
        public ActionResult AddCategory(String Name, String Des)
            {
            Category C = new Category();
            C.Name = Name;
            C.Description = Des;
            try
                {
                db.Categories.Add(C);
                db.SaveChanges();
                return Json("True");
                }
            catch
                {
                return Json("False");
                }
            }
        [IsLogged]
        [IsAdmin]
        public ActionResult AddCar(String Model,int Seats,String Color,String Category,float price,String Advantages)
            {
            HttpPostedFileBase ImageViewFile = Request.Files["Image"];
            HttpPostedFileBase ImageDetailsFile = Request.Files["Details"];
            //ImageViewFile.SaveAs(Server.MapPath("~/Content/UsersImage/") + file.FileName);
            Image ViewImage = Image.FromStream(ImageViewFile.InputStream, true, true);
            Image DetailsImage = Image.FromStream(ImageDetailsFile.InputStream, true, true);
            if (ViewImage.Height!=250 && ViewImage.Width!=250)
                {
                return Json("View Image Must Be 250*250 Dimentions");
                }
            if (DetailsImage.Height != 640 && DetailsImage.Width != 960)
                {
                return Json("Details Image Must Be 960*640 Dimentions");
                }
            Car car = new Car();
            car.Color = Color;
            car.Model = Model;
            car.Car_Category =(Category) db.Categories.Where(cat => cat.Name == Category).First();
            car.NumberOfSeats = Seats;
            car.Image = ImageViewFile.FileName;
            car.State = 0;
            car.price = price;
            car.Advantages = Advantages;
            try
                {
                db.Cars.Add(car);
                db.SaveChanges();
                ImageViewFile.SaveAs(Server.MapPath("~/Content/CarsImage/") + ImageViewFile.FileName);
                ImageDetailsFile.SaveAs(Server.MapPath("~/Content/CarsImageDetails/") + ImageViewFile.FileName);
                var Interests = db.Prefers.Include("category").Include("user").Where(Pr=>Pr.category.Name==Category);
                if(Interests.Any())
                    {
                    foreach (var item in Interests)
                        {
                        operations.SendEmail(item.user.Email, "New Car Added", "New "+Category+" car added in WHEELS System with very amazing advantages , Take a look!");
                        }
                    }
                return Json("True");
                }
            catch(Exception E)
                {
                return Json("False");
                }
            }
        [IsLogged]
        [IsAdmin]
        public ActionResult UpdateCar(int Car_ID, String Model, int Seats, String Color, String Category, float price, String Advantages)
            {
            Car car = (Car)db.Cars.Find(Car_ID);
            car.Color = Color;
            car.Model = Model;
            car.Car_Category = (Category)db.Categories.Where(cat => cat.Name == Category).First();
            car.NumberOfSeats = Seats;
            car.price = price;
            car.Advantages = Advantages;
            try
                {
                db.SaveChanges();
                return Json("true");
                }
            catch (Exception E)
                {
                return Json("false");
                }
            }
        [IsLogged]
        [IsAdmin]
        public ActionResult UpdateCarImage(int Car_ID)
            {
            HttpPostedFileBase ImageViewFile = Request.Files["Image"];
            HttpPostedFileBase ImageDetailsFile = Request.Files["Details"];
            //ImageViewFile.SaveAs(Server.MapPath("~/Content/UsersImage/") + file.FileName);
            Image ViewImage = Image.FromStream(ImageViewFile.InputStream, true, true);
            Image DetailsImage = Image.FromStream(ImageDetailsFile.InputStream, true, true);
            if (ViewImage.Height != 250 && ViewImage.Width != 250)
                {
                return Json("View Image Must Be 250*250 Dimentions");
                }
            if (DetailsImage.Height != 640 && DetailsImage.Width != 960)
                {
                return Json("Details Image Must Be 960*640 Dimentions");
                }
            Car car = db.Cars.Include("Car_Category").Where(c => c.ID == Car_ID).First();
            car.Image = ImageViewFile.FileName;
            try
                {
                db.SaveChanges();
                ImageViewFile.SaveAs(Server.MapPath("~/Content/CarsImage/") + ImageViewFile.FileName);
                ImageDetailsFile.SaveAs(Server.MapPath("~/Content/CarsImageDetails/") + ImageViewFile.FileName); 
                return Json("true");
                }
            catch(Exception E)
                {
                return Json("false");
                }
            }

        }
    }