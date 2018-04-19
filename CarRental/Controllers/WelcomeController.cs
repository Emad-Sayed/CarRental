using CarRental.Data;
using CarRental.Filters;
using CarRental.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CarRental.Controllers
    {
    public class WelcomeController : Controller
        {
        private MyDBContext db = new MyDBContext();
        private Operations SendingMail=null;
        //
        // GET: /Welcome/
        public ActionResult Index()
            {
            return View();
            }
        public ActionResult LoginPage()
            {
            User user = (User)Session["Person"];
            if (user == null)
                {
                return View();
                }
            return RedirectToAction("HomePage", "Home");
            }
        public ActionResult LoginCheck(string mail, string pass)
            {
            try
                {
                User user = (User)db.Users.Include("Type").Where(u => u.Email == mail).Where(u => u.Password == pass).First();
                if(user.Block==1)
                    return Json("Block");
                Session["person"] = user;
                return Json("true");
                }
            catch (Exception)
                {
                return Json("false");
                }
            }
        public ActionResult Regist([Bind(Include = "Fname,Lname,Email,Password,CreditCardNumber,Phone")] User user)
            {
            SendingMail = new Operations();
            user.Block = 0;
            user.Type = (UserType)db.UserTypes.Find(2);
            user.Balance = 0;
            user.User_Image = "Defult.jpg";
            if (ModelState.IsValid)
                {
                SendingMail.SendEmail(user.Email, "WHEELS registration", "You are now a member of WHEELS Family");
                db.Users.Add(user);
                db.SaveChanges();
                return RedirectToAction("LoginPage");
                }
            return View("LoginPage", user);
            }
        }
    }