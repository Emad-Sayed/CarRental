﻿using CarRental.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace CarRental.Filters
    {
    public class IsAdmin : ActionFilterAttribute
        {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
            {
            User user = (User)filterContext.HttpContext.Session["Person"];
            if (user==null||!user.Type.Type.Equals("Admin")) // Lazy
                {
                filterContext.Result = new RedirectToRouteResult(
                    new RouteValueDictionary 
                { 
                    { "controller", "Welcome" }, 
                    { "action", "LoginPage" } 
                });
                }
            }
        }
    }