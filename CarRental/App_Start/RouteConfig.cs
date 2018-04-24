using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace CarRental
    {
    public class RouteConfig
        {
        public static void RegisterRoutes(RouteCollection routes)
            {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
            name: "Login",
            url: "LoginPage",
            defaults: new { controller = "Welcome", action = "LoginPage" }
            );
            routes.MapRoute(
            name: "LoginCheck",
            url: "LoginCheck",
            defaults: new { controller = "Welcome", action = "LoginCheck" }
            );
            routes.MapRoute(
name: "CheckMailExists",
url: "CheckMailExists",
defaults: new { controller = "Welcome", action = "CheckMailExists" }
);
            routes.MapRoute(
            name: "HomePage",
            url: "HomePage",
            defaults: new { controller = "User", action = "HomePage" }
            );
            routes.MapRoute(
name: "Profile",
url: "Profile",
defaults: new { controller = "User", action = "Profile" }
);
            routes.MapRoute(
name: "Dashboard",
url: "Dashboard",
defaults: new { controller = "Admin", action = "AdminPanel" }
);
            routes.MapRoute(
            name: "GetCateogries",
            url: "GetCateogries",
            defaults: new { controller = "User", action = "GetCateogries" }
             );
            routes.MapRoute(
name: "Prefer",
url: "Prefer",
defaults: new { controller = "User", action = "Prefer" }
 );
            routes.MapRoute(
name: "NotPrefer",
url: "NotPrefer",
defaults: new { controller = "User", action = "NotPrefer" }
);

            routes.MapRoute(
name: "GetMyPrefers",
url: "GetMyPrefers",
defaults: new { controller = "User", action = "GetMyPrefers" }
 );

            routes.MapRoute(
            name: "GetCars",
            url: "GetCars",
            defaults: new { controller = "User", action = "GetCars" }
            );
            routes.MapRoute(
name: "SpecificCar",
url: "SpecificCar",
defaults: new { controller = "User", action = "SpecificCar" }
);
            routes.MapRoute(
name: "GetCarDetails",
url: "GetCarDetails",
defaults: new { controller = "User", action = "GetCarDetails" }
);
            routes.MapRoute(
            name: "Regist",
            url: "Regist",
            defaults: new { controller = "Welcome", action = "Regist" }
            );

            routes.MapRoute(
name: "BarInfo",
url: "BarInfo",
defaults: new { controller = "User", action = "BarInfo" }
);
            routes.MapRoute(
name: "GetUsers",
url: "GetUsers",
defaults: new { controller = "Admin", action = "GetUsers" }
);

     
            routes.MapRoute(
name: "AdminPanel",
url: "AdminPanel",
defaults: new { controller = "Admin", action = "AdminPanel" }
);
            routes.MapRoute(
name: "CheckEndDate",
url: "CheckEndDate",
defaults: new { controller = "Admin", action = "CheckEndDate" }
);
            routes.MapRoute(
name: "GetAvailableCars",
url: "GetAvailableCars",
defaults: new { controller = "Admin", action = "GetAvailableCars" }
);
       
            routes.MapRoute(
name: "BlockUser",
url: "BlockUser",
defaults: new { controller = "Admin", action = "BlockUser" }
);
            routes.MapRoute(
name: "UnBlockUser",
url: "UnBlockUser",
defaults: new { controller = "Admin", action = "UnBlockUser" }
);
            routes.MapRoute(
name: "Unavailable",
url: "Unavailable",
defaults: new { controller = "Admin", action = "Unavailable" }
);
            routes.MapRoute(
name: "available",
url: "available",
defaults: new { controller = "Admin", action = "available" }
);
                        routes.MapRoute(
name: "AddCarPage",
url: "AddCarPage",
defaults: new { controller = "Admin", action = "AddCarPage" }
);
                        routes.MapRoute(
name: "UpdateCar",
url: "UpdateCar",
defaults: new { controller = "Admin", action = "UpdateCar" }
);
                        routes.MapRoute(
name: "UpdateCarImage",
url: "UpdateCarImage",
defaults: new { controller = "Admin", action = "UpdateCarImage" }
);
                        routes.MapRoute(
name: "DeleteCar",
url: "DeleteCar",
defaults: new { controller = "Admin", action = "DeleteCar" }
);
                        routes.MapRoute(
name: "DeleteUser",
url: "DeleteUser",
defaults: new { controller = "Admin", action = "DeleteUser" }
);
                        routes.MapRoute(
name: "SearchUser",
url: "SearchUser",
defaults: new { controller = "Admin", action = "SearchUser" }
);
                                    routes.MapRoute(
name: "ChargeBalance",
url: "ChargeBalance",
defaults: new { controller = "Admin", action = "ChargeBalance" }
);
                                    routes.MapRoute(
name: "AddCategory",
url: "AddCategory",
defaults: new { controller = "Admin", action = "AddCategory" }
);
                                    routes.MapRoute(
name: "AddCar",
url: "AddCar",
defaults: new { controller = "Admin", action = "AddCar" }
);
                                    routes.MapRoute(
name: "Chart",
url: "Chart",
defaults: new { controller = "Admin", action = "Chart" }
);
      
            routes.MapRoute(
            name: "LogOut",
            url: "LogOut",
           defaults: new { controller = "User", action = "LogOut" }
);
            routes.MapRoute(
            name: "Pay",
            url: "Pay",
           defaults: new { controller = "User", action = "Pay" }
);
            routes.MapRoute(
name: "GetRendering",
url: "GetRendering",
defaults: new { controller = "Admin", action = "GetRendering" }
);
            routes.MapRoute(
name: "EditProfile",
url: "EditProfile",
defaults: new { controller = "User", action = "EditProfile" }
); 
            routes.MapRoute(
name: "ChangePassword",
url: "ChangePassword",
defaults: new { controller = "User", action = "ChangePassword" }
);
            routes.MapRoute(
name: "UpdateImage",
url: "UpdateImage",
defaults: new { controller = "User", action = "UpdateImage" }
);


            routes.MapRoute(
name: "Test",
url: "SendEmail",
defaults: new { controller = "SendingEmails", action = "SendEmail" }
);


            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Welcome", action = "Index", id = UrlParameter.Optional }
            );
            }
        }
    }
