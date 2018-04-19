using CarRental.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CarRental.Models;
using CarRental.Filters;
using System.Data.Entity;
using System.Data.Entity.Validation;

namespace CarRental.Controllers
    {
    public class UserController : Controller
        {
        private MyDBContext db = new MyDBContext();
        private Operations SendingMailCont=new Operations();
        [IsLogged]
        public ActionResult HomePage()
            {
            return View();
            }
        [IsLogged]
        public ActionResult Profile()
            {
            User U = (User)Session["Person"];
            return View(U);
            }
        public ActionResult EditProfile(String Email, String Phone, String Fname, String Lname)
            {
            User OldInfo = (User)Session["Person"];
            User FreshInfo = db.Users.Include("Type").Where(u=>u.ID==OldInfo.ID).First();
            FreshInfo.Email = Email;
            FreshInfo.Fname = Fname;
            FreshInfo.Lname = Lname;
            FreshInfo.Phone = Phone;

            try
                {
                db.SaveChanges();
                Session["Person"] = FreshInfo;

                return Json("true");
                }
            catch(DbEntityValidationException ex)
                {
                var errorMessages = ex.EntityValidationErrors
                                 .SelectMany(x => x.ValidationErrors)
                                 .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = string.Join("; ", errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);
                return Json("false");
                }
            }
        public ActionResult ChangePassword(String OldPassword,String NewPassword)
            {
            User OldInfo = (User)Session["Person"];
            User FreshInfo = db.Users.Include("Type").Where(u => u.ID == OldInfo.ID).First();
            if (OldInfo.Password.Equals(OldPassword))
                {
                FreshInfo.Password = NewPassword;
                try
                    {
                    db.SaveChanges();
                    Session["Person"] = FreshInfo;
                    return Json("Password Changed");
                    }
                catch(Exception E)
                    {
                    return Json("Invalid Password , Password at Least 8 alphanumeric");
                    }
                }
            return Json("Old Password Not Correct");
            }
        public ActionResult UpdateImage()
            {
            HttpPostedFileBase file = Request.Files["Image"];
            file.SaveAs(Server.MapPath("~/Content/UsersImage/") + file.FileName);
            ViewBag.Message = "Images/" + file.FileName;
            User OldInfo = (User)Session["Person"];
            OldInfo.User_Image = file.FileName;
            User UserRecord = db.Users.Include("Type").Where(u => u.ID == OldInfo.ID).First();
            UserRecord.User_Image = file.FileName;
            db.SaveChanges();
            return View("Profile", OldInfo);
            }
        [IsLogged]
        [HttpGet]
        public ActionResult GetCateogries()
            {
            return Json(db.Categories.ToList(), JsonRequestBehavior.AllowGet);
            }
        [IsLogged]
        [HttpGet]
        public ActionResult GetMyPrefers()
            {
            User u=(User)Session["Person"];
            return Json(db.Prefers.Include("user").Include("category").Where(P=>P.user.ID==u.ID), JsonRequestBehavior.AllowGet);
            }
        [IsLogged]
        [HttpGet]
        public ActionResult Prefer(int Cat_ID)
            {
            User user = (User)Session["Person"];
            User Fresh = (User)db.Users.Find(user.ID);
            Category category = (Category)db.Categories.Find(Cat_ID);
            Prefers prefer = new Prefers();
            prefer.user = Fresh;
            prefer.category = category;
            db.Prefers.Add(prefer);
            db.SaveChanges();
            return Json("true");
            }
        public ActionResult NotPrefer(int Cat_ID)
            {
            User user = (User)Session["Person"];
            Prefers record =db.Prefers.Include("category").Include("user").Where(p => p.category.ID == Cat_ID).Where(p => p.user.ID == user.ID).First();
            db.Prefers.Remove(record);
            db.SaveChanges();
            return Json("true");
            }
        public ActionResult BarInfo()
            {
            User user = (User)Session["Person"];
            return Json(user, JsonRequestBehavior.AllowGet);

            }
        [HttpGet]
        public ActionResult GetCars()
            {
            return Json(db.Cars.Include("Car_Category").ToList(), JsonRequestBehavior.AllowGet);
            }
        public ActionResult GetCarDetails(int id)
            {
            try
                {
                return Json(db.RentedCars.Where(car => car.Car.ID == id).First().End_Date.ToShortDateString(), JsonRequestBehavior.AllowGet);
                }
            catch
                {
                return Json("(Not Specific Date)", JsonRequestBehavior.AllowGet);
                }
            }
        public ActionResult SpecificCar(String Category, String Model, String Color, int NumOfSeats, float RentValue)
            {
            var Cars = db.Cars.Include("Car_Category").
                Where(c => (Category == "" ? true : c.Car_Category.Name == Category)
                && (Model == "" ? true : c.Model == Model)
                && (Color == "" ? true : c.Color == Color)
                && (NumOfSeats == -1 ? true : c.NumberOfSeats == NumOfSeats)
                && (RentValue == -1 ? true : c.price == RentValue)                
                ).ToList() ;
            return Json(Cars, JsonRequestBehavior.AllowGet);
            }
        [IsLogged]
        public ActionResult Pay(int Car_ID, int Days_Number)
            {
            var Car_Check_Exists = db.RentedCars.Include("Car").Where(c => c.Car.ID == Car_ID);// JS Tricks if changed 
             Car Car_Needed =(Car) db.Cars.Include("Car_Category").Where(c=>c.ID==Car_ID).First(); //Js Tricks 
            if (!Car_Check_Exists.Any()||Car_Needed.State==1)
                {
                float total = Car_Needed.price * Days_Number;
                User Active_User = (User)Session["Person"];
                int User_ID = Active_User.ID;
                if (total > Active_User.Balance)
                    {
                    return Json("false");
                    }
                RentedCar newRent = new RentedCar();
                DateTime Today = DateTime.Today;
                DateTime EndDate = Today.AddDays(Days_Number);
                User Fresh_Info_User =(User) db.Users.Include("Type").Where(u=>u.ID==User_ID).First();
                Fresh_Info_User.Balance = Fresh_Info_User.Balance - total;
                Car_Needed.State = 1;
                db.SaveChanges();
                newRent.Car = Car_Needed;
                newRent.User = Fresh_Info_User;
                newRent.Start_Date =Today.AddDays(1);
                newRent.End_Date = EndDate;
                db.RentedCars.Add(newRent);
                db.SaveChanges();
                Session["person"] = Fresh_Info_User;//Fresh Session with new Balance
                SendingMailCont.SendEmail(Fresh_Info_User.Email, "Car Rented Successfully!", "Congratulations! you rent car which model is "+
                    Car_Needed.Model + " for " + Days_Number + " Days for " + total + " LE"); 
                return Json("true");
                }
            return Json("No Way");
            }
        public ActionResult LogOut()
            {
            Session.Abandon();
            return RedirectToAction("Index", "Welcome");
            }
        public ActionResult Test()
            {
            User user = (User)Session["Person"];
            return Json(user, JsonRequestBehavior.AllowGet);
            }
        }
    }