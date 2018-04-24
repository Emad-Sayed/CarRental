var Users;
var Cars;
var Rendering;
var Categories;
var Available;
$(document).ready(function () {
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
       isClosed = false;

    trigger.click(function () {
        hamburger_cross();
    });

    function hamburger_cross() {

        if (isClosed == true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        } else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
        }
    }

    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
    });
    $("#Users").click(function () {
        ClearAll();
        $.ajax({
            type: 'GET',
            url: '/GetUsers',
            success: function (data) {
                AddHead_Users();
                Users = data;
                for (var i = 0; i < data.length; i++) {
                    AddRowUser(data[i].ID, data[i].Fname+" "+data[i].Lname, data[i].Email, data[i].Balance, data[i].Block);
                }
            }
        });
    });
    $("#Cars").click(function () {
        CarView();
       
    });
$("#Rendering").click(function () {
    ClearAll();
    $.ajax({
        type: 'GET',
        url: '/GetRendering',
        success: function (data) {
            AddHead_Rendering();
            Rendering = data;
            for (var i = 0; i < data.length; i++) {
                var start = new Date(parseInt(data[i].Start_Date.replace(/[^0-9 +]/g, '')));
                var end = new Date(parseInt(data[i].End_Date.replace(/[^0-9 +]/g, '')));
                var start_date_format = start.getDate() + " - " + (start.getMonth() + 1) + " - " + start.getFullYear();
                var end_date_format = end.getDate() + " - " + (end.getMonth() + 1) + " - " + end.getFullYear();
                Rendering[i].Model = data[i].Car.Model;
                Rendering[i].Email = data[i].User.Enail;

                AddRowRendering(data[i].ID, data[i].User.Email, data[i].Car.Model, start_date_format, end_date_format);
             }
            }
    });
});
$("#Available").click(function () {
    ClearAll();
    $.ajax({
        type: 'GET',
        url: '/GetAvailableCars',
        success: function (data) {
            AddHead_Avilables();
            Available = data;
            for (var i = 0; i < data.length; i++) {
                AddRowAvailable(data[i].ID, data[i].Model, data[i].price, data[i].NumberOfSeats, data[i].Car_Category.Name, data[i].State);
                Available[i].Cat_NAME = data[i].Car_Category.Name;
                Available[i].Cat_Desc = data[i].Car_Category.Description;
            }
        }
    });
});
$("#Categories").click(function () {
    CategoryView();
});
$("#Chart").click(function () {
    ChartDraw();
});


});
function CarView()
{
    ClearAll();
    $.ajax({
        type: 'GET',
        url: '/GetCars',
        success: function (data) {
            AddHead_Cars();
            Cars = data;
            for (var i = 0; i < data.length; i++) {
                AddRowCar(data[i].ID, data[i].Model, data[i].price, data[i].NumberOfSeats, data[i].Car_Category.Name, data[i].State);
                Cars[i].Cat_NAME = data[i].Car_Category.Name;
                Cars[i].Cat_Desc = data[i].Car_Category.Description;
            }
        }

    });
}
function CategoryView()
{
    ClearAll();
    $.ajax({
        type: 'GET',
        url: '/GetCateogries',
        success: function (data) {
            AddHead_Category();
            Categories = data;
            for (var i = 0; i < data.length; i++) {
                AddRow_Category(Categories[i].ID, Categories[i].Name);
            }
        }

    });
}

//User Table

//End User Tabe
//Cars Table

//End Cars Table

//Start Rendering

// End Rendering
//Start Categories

    //End Categories
    function ClearRows() {
        var parent = document.getElementById("Table_Body");
        while (parent.hasChildNodes()) {
            parent.removeChild(parent.lastChild);
        }
    }
    function ClearAll() {
        var parent = document.getElementById("container");
        while (parent.hasChildNodes()) {
            parent.removeChild(parent.lastChild);
        }
    }
