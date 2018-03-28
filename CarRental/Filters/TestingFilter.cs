using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace CarRental.Filters
    {
    public class TestingFilter : ActionFilterAttribute
        {
        //Before Executing
        public override void OnActionExecuting(ActionExecutingContext filterContext)
            {
            /*int ID = (int)filterContext.HttpContext.Session["ID"];
            if (ID==1)
                {
                filterContext.Result = new RedirectToRouteResult(
                    new RouteValueDictionary 
                { 
                    { "controller", "Home" }, 
                    { "action", "Index" } 
                });
                }*/
            }
        //After Executing
        public override void OnActionExecuted(ActionExecutedContext filterContext)
            {
            int ID = (int)filterContext.HttpContext.Session["ID"];
            if (ID == 1)
                {
                filterContext.Result = new RedirectToRouteResult(
                    new RouteValueDictionary 
                { 
                    { "controller", "Home" }, 
                    { "action", "Index" } 
                });
                }
            }
        }
    }