var B;
var Categories;
var Cars;

$(document).ready(function () {
    LoadCars();
    function LoadCars()
    {
        $.ajax({
            type: 'GET',
            url: '/GetCars',
            success: function (data) {
                Cars = data;
                for (var i = (data.length - 1) ; i >= 0; i--) {
                    DrawCarBlcok(data[i].ID, data[i].Model, data[i].NumberOfSeats, data[i].price,
                        data[i].State, data[i].Color, data[i].Car_Category.Name, data[i].Image);
                    Cars[i].Cat_NAME = data[i].Car_Category.Name;
                    Cars[i].Cat_Desc = data[i].Car_Category.Description;
                }
                $("#Cars_Number_Button").html("All Cars Number : <span class=badge>" + Cars.length + "</span>");
                $("#Spinner").remove();
            }
        });
    }


   /* $("#Options").change(function () {
        var SelectedCategory = Categories[this.selectedIndex - 1].Name;
        ClearCarDrawing();
        var Temp = 0;
        for (var i = (Cars.length - 1) ; i >= 0; i--) {
            if (SelectedCategory == Cars[i].Cat_NAME) {
                DrawCarBlcok(Cars[i].ID, Cars[i].Model, Cars[i].NumberOfSeats, Cars[i].price,
                         Cars[i].State, Cars[i].Color, Cars[i].Cat_NAME, Cars[i].Image);
                Temp++;
            }
            $("#Cars_Number_Button").html("All " + SelectedCategory + " Cars : <span class=badge>" + Temp + "</span>");
 
        }

    });*/
    $("#Options").change(function () {
        var SearchKey = $("#Options option:selected").text();
        if (SearchKey == 'Category') {
            document.getElementById("search").setAttribute("onkeyup","SearchCategory(this)");
        }
        else if (SearchKey == 'Model') {
            document.getElementById("search").setAttribute("onkeyup","SearchModel(this)");
        }
        else if (SearchKey == 'Color') {
            document.getElementById("search").setAttribute("onkeyup", "SearchColor(this)");
        }
        else if (SearchKey == 'Number Of Seats') {
            document.getElementById("search").setAttribute("onkeyup", "SearchSeats(this)");
        }
        else
        {
            document.getElementById("option-div").remove();
            document.getElementById("Line").remove();
            document.getElementById("option-div2").innerHTML = "<div class=form-group row><div id=F1 class=col-xs-2><label>Category</label><input class=form-control id=Category2 type=text></div><div id=F2 class=col-xs-2><label>Model</label> <input class=form-control id=Model2 type=text>  </div><div id=F3 class=col-xs-2> <label>Color</label><input class=form-control id=Color2 type=text> </div> <div id=F4 class=col-xs-2> <label>Seats</label>  <input class=form-control id=Seats2 type=number>  </div> </div> <div class=form-group row><div id=F5 class=col-xs-2><label>Rent Value</label><input class=form-control id=Rent2 type=text></div>";
            var Button_Div = document.createElement("div");
            Button_Div.setAttribute("style", "margin:auto;width:280px");
            Button_Div.setAttribute("id", "Button_Div");
            var Filter_Button = document.createElement("button");
            Filter_Button.setAttribute("class", "btn btn-success");
            Filter_Button.setAttribute("onclick", "MultiFilter()");
            Filter_Button.setAttribute("id", "Filter_Button");
            Filter_Button.setAttribute("style", "margin-top:20px;margin-left:20px");
            Filter_Button.innerHTML = "Filter My Needs"
            Button_Div.appendChild(Filter_Button);
            document.getElementById("option-div2").appendChild(Button_Div);
            document.getElementById("option-div2").appendChild(document.createElement("hr"));

        }
        
    });
    $("#Cars_Number_Button").click(function () {
        window.location = 'HomePage';
    });
});
function MultiFilter()
{
    var Category = document.getElementById("Category2").value.toUpperCase();
    var Model = document.getElementById("Model2").value;
    var Color = document.getElementById("Color2").value.toUpperCase();
    var Seats = document.getElementById("Seats2").value;
    var Rent = document.getElementById("Rent2").value;
    if (Seats == "")
        Seats = -1;
    if (Rent == "")
        Rent = -1;
    $.ajax({
        type: 'GET',
        url: '/SpecificCar?Category=' + Category + "&Model=" + Model + "&Color=" + Color + "&NumOfSeats="+Seats+"&RentValue="+Rent,
        success: function (data) {
            ClearCarDrawing();
           for (var i = (data.length - 1) ; i >= 0; i--) {
                DrawCarBlcok(data[i].ID, data[i].Model, data[i].NumberOfSeats, data[i].price,
                    data[i].State, data[i].Color, data[i].Car_Category.Name, data[i].Image);
           }
        }
    });
}
function SearchCategory(element) {
    ClearCarDrawing();
    var re = new RegExp("\\b(" + element.value.toUpperCase() + ")(.)*\\b");
    for (var i = (Cars.length - 1) ; i >= 0; i--) {
        if (re.test(Cars[i].Cat_NAME)) {
            DrawCarBlcok(Cars[i].ID, Cars[i].Model, Cars[i].NumberOfSeats, Cars[i].price,
                                     Cars[i].State, Cars[i].Color, Cars[i].Cat_NAME, Cars[i].Image);
        }
    }
}
function SearchModel(element) {
    ClearCarDrawing();
    var re = new RegExp("\\b(" + element.value + ")(.)*\\b");
    for (var i = (Cars.length - 1) ; i >= 0; i--) {
        if (re.test(Cars[i].Model)) {
            DrawCarBlcok(Cars[i].ID, Cars[i].Model, Cars[i].NumberOfSeats, Cars[i].price,
                                     Cars[i].State, Cars[i].Color, Cars[i].Cat_NAME, Cars[i].Image);
        }
    }
}
function SearchColor(element) {
    ClearCarDrawing();
    var re = new RegExp("\\b(" + element.value.toUpperCase() + ")(.)*\\b");
    for (var i = (Cars.length - 1) ; i >= 0; i--) {
        if (re.test(Cars[i].Color)) {
            DrawCarBlcok(Cars[i].ID, Cars[i].Model, Cars[i].NumberOfSeats, Cars[i].price,
                                     Cars[i].State, Cars[i].Color, Cars[i].Cat_NAME, Cars[i].Image);
        }
    }
}
function SearchSeats(element) {
    ClearCarDrawing();
    var re = new RegExp("\\b(" + element.value + ")(.)*\\b");
    for (var i = (Cars.length - 1) ; i >= 0; i--) {
        if (re.test(Cars[i].NumberOfSeats)) {
            DrawCarBlcok(Cars[i].ID, Cars[i].Model, Cars[i].NumberOfSeats, Cars[i].price,
                                     Cars[i].State, Cars[i].Color, Cars[i].Cat_NAME, Cars[i].Image);
        }
    }
}
function DrawCarBlcok(id, model, numberofseats, price, state, color, car_category, img) {
    var Parent = document.getElementById("CarsContainer");
    var BlockDiv = document.createElement("div");
    BlockDiv.setAttribute("class", "col-xs-18 col-sm-4 col-md-3");
    var BlockBox = document.createElement("div");
    BlockBox.setAttribute("class", "productbox");
    var ImgDiv = document.createElement("div");
    ImgDiv.setAttribute("class", "imgthumb img-responsive");
    var Image = document.createElement("img");
    Image.setAttribute("src", "Content/CarsImage/" + img);
    var CaptionDiv = document.createElement("div");
    CaptionDiv.setAttribute("class", "caption");
    var H5 = document.createElement("h5");
    H5.innerHTML = model+"  "+car_category+" "+color;
    var S = document.createElement("s");
    S.setAttribute("class", "text-muted");
    S.innerHTML = price+40+" ";
    var B1 = document.createElement("b");
    B1.setAttribute("class", "finalprice");
    B1.innerHTML = price+"  ";
    var B2 = document.createElement("b");
    B2.innerHTML = car_category;
    var A = document.createElement("a");
    A.setAttribute("href", "#");
    A.setAttribute("class", "btn btn-default btn-xs pull-right");
    A.setAttribute("role", "button");
    var I = document.createElement("i");
    I.setAttribute("class", "glyphicon glyphicon-zoom-in");
    var P = document.createElement("p");
    var Button = document.createElement("button");
    Button.setAttribute("class", "btn btn-success btn-md btn-block");
    Button.setAttribute("type", "button");
    Button.setAttribute("id", id);
    Button.setAttribute("onclick", "Details(this)");

    Button.innerHTML = "Get Details";
    P.appendChild(Button);
    A.appendChild(I);
    CaptionDiv.appendChild(H5);
    CaptionDiv.appendChild(S);
    CaptionDiv.appendChild(B1);
    CaptionDiv.appendChild(B2);
    CaptionDiv.appendChild(A);
    CaptionDiv.appendChild(P);
    ImgDiv.appendChild(Image);
    BlockBox.appendChild(ImgDiv);
    BlockBox.appendChild(CaptionDiv);
    BlockDiv.appendChild(BlockBox);
    Parent.appendChild(BlockDiv);
}

function SearchDetailedCar(car_id)
{
    for (var i = 0; i < Cars.length; i++) {
        if (Cars[i].ID == car_id) {
            return Cars[i];
        }
    }
}

function Details(element) {
    ClearCarDrawing();
    var DetailedCar = SearchDetailedCar(element.id);

    var Mybutton = document.getElementById("Cars_Number_Button");
    Mybutton.innerHTML = "Go to all List View";
    Mybutton.disabled = false;

    var Parent = document.getElementById("CarsContainer");
    var Div_Main = document.createElement("div");

    Div_Main.setAttribute("class", "container");
    var Under_Main_Div = document.createElement("div");
    Under_Main_Div.setAttribute("class", "row");
    Under_Main_Div.setAttribute("style", "background-color: #d2dae2");
    Div_Main.appendChild(Under_Main_Div);
    var Img_Div = document.createElement("div");
    Img_Div.setAttribute("class", "col-md-6");
    Img_Div.setAttribute("style", "margin-top: 50px;");
    var img = document.createElement("img");
    img.setAttribute("class", "image-responsive");
    img.setAttribute("src", "Content/CarsImageDetails/" + DetailedCar.Image);
    Img_Div.appendChild(img);
    Under_Main_Div.appendChild(Img_Div);


    var Sub_Main_Div = document.createElement("div");
    Sub_Main_Div.setAttribute("class", "col-md-6");

    var Row_1 = document.createElement("div");
    Row_1.setAttribute("class", "row");
    var Under_Row_1 = document.createElement("div");
    Under_Row_1.setAttribute("class", "col-md-12");
    var Row_1_h1 = document.createElement("h1");
    Row_1_h1.innerHTML = DetailedCar.Cat_NAME;
    Under_Row_1.appendChild(Row_1_h1);
    Row_1.appendChild(Under_Row_1);
    Sub_Main_Div.appendChild(Row_1);


    var Row_2 = document.createElement("div");
    Row_2.setAttribute("class", "row");
    var Under_Row_2 = document.createElement("div");
    Under_Row_2.setAttribute("class", "col-md-12");
    var Row2_Span1 = document.createElement("span");
    Row2_Span1.setAttribute("class", "label label-primary");
    Row2_Span1.innerHTML = "Model";
    var Row2_Span2 = document.createElement("span");
    Row2_Span2.setAttribute("class", "monospaced");
    Row2_Span2.innerHTML = " "+DetailedCar.Model;
    Under_Row_2.appendChild(Row2_Span1);
    Under_Row_2.appendChild(Row2_Span2);
    Row_2.appendChild(Under_Row_2);
    Sub_Main_Div.appendChild(Row_2);

    var Row_3 = document.createElement("div");
    Row_3.setAttribute("class", "row");
    var Under_Row_3 = document.createElement("div");
    Under_Row_3.setAttribute("class", "col-md-12");
    var Row3_Span1 = document.createElement("span");
    Row3_Span1.setAttribute("class", "glyphicon glyphicon-star");
    Row3_Span1.setAttribute("aria-hidden", "true");
    var Row3_Span2 = document.createElement("span");
    Row3_Span2.setAttribute("class", "glyphicon glyphicon-star");
    Row3_Span2.setAttribute("aria-hidden", "true")
    var Row3_Span3 = document.createElement("span");
    Row3_Span3.setAttribute("class", "glyphicon glyphicon-star");
    Row3_Span3.setAttribute("aria-hidden", "true");
    var Row3_Span4 = document.createElement("span");
    Row3_Span4.setAttribute("class", "glyphicon glyphicon-star");
    Row3_Span4.setAttribute("aria-hidden", "true");
    var Row3_Span5 = document.createElement("span");
    Row3_Span5.setAttribute("class", "glyphicon glyphicon-star");
    Row3_Span5.setAttribute("aria-hidden", "true");

    var Rate_Div = document.createElement("div");
    Rate_Div.setAttribute("class", "col-md-3");
    var Span_CarRate = document.createElement("span");
    Span_CarRate.setAttribute("class", "monospaced");
    Span_CarRate.innerHTML = DetailedCar.NumberOfSeats+"  Seats";
    Rate_Div.appendChild(Span_CarRate);


    Under_Row_3.appendChild(Row3_Span1);
    Under_Row_3.appendChild(Row3_Span2);
    Under_Row_3.appendChild(Row3_Span3);
    Under_Row_3.appendChild(Row3_Span4);
    Under_Row_3.appendChild(Row3_Span5);
    Under_Row_3.appendChild(Rate_Div);
    Row_3.appendChild(Under_Row_3);
    Sub_Main_Div.appendChild(Row_3);


    var Row_4 = document.createElement("div");
    Row_4.setAttribute("class", "row");
    var Under_Row_4 = document.createElement("div");
    Under_Row_4.setAttribute("class", "col-md-12 bottom-rule");
    var Row_4_H2 = document.createElement("h2");
    Row_4_H2.setAttribute("class", "product-pric");
    Row_4_H2.innerHTML = "LE " + DetailedCar.price;
    Under_Row_4.appendChild(Row_4_H2);
    Row_4.appendChild(Under_Row_4);
    Sub_Main_Div.appendChild(Row_4);


    var Row_5 = document.createElement("div");
    Row_5.setAttribute("class", "row add-to-cart");
    var Under_Row_5 = document.createElement("div");
    Under_Row_5.setAttribute("class", "col-md-4");
    var Row_5_Button = document.createElement("button");
    if (DetailedCar.State == 1) {
        var Message;
        $.ajax({
            type: 'GET',
            url: '/GetCarDetails?id=' + DetailedCar.ID,
            success: function (data) {
                Row_5_Button.setAttribute("class", "btn btn-lg btn-brand btn-full-width btn-danger");
                Row_5_Button.innerHTML = "Unavailable Till " + data;
                Row_5_Button.disabled = true;
            }
        });

    }
    else
    {
        Row_5_Button.setAttribute("class", "btn btn-lg btn-brand btn-full-width btn-success");
        Row_5_Button.setAttribute("id", DetailedCar.ID);
        Row_5_Button.setAttribute("id", "Get_Car_Button");
        Row_5_Button.setAttribute("onclick", "Get_Car(this)");
        Row_5_Button.innerHTML = "GET CAR";
    }


    Under_Row_5.appendChild(Row_5_Button);
    Row_5.appendChild(Under_Row_5);
    Sub_Main_Div.appendChild(Row_5);


    var Row_5Plus = document.createElement("div");
    Row_5Plus.setAttribute("class", "row well");
    Row_5Plus.setAttribute("id", "Rendering_Form");
    Row_5Plus.setAttribute("style", "display: none; margin-top: 15px; margin: auto; width: 400px");

    var Row_5Plus_Hint = document.createElement("div");
    Row_5Plus_Hint.setAttribute("class", "well");
    var HintContent = document.createElement("i");
    HintContent.innerHTML="The Start Date begins from the day that after rendering request";
    Row_5Plus_Hint.appendChild(HintContent);


    var Last_Hint_Div = document.createElement("div");
    Last_Hint_Div.setAttribute("class", "input-group input-group-sm");
    Last_Hint_Div.setAttribute("style", "width:200px");



    var Span_ = document.createElement("span");
    Span_.setAttribute("class", "input-group-addon");
    Span_.setAttribute("id", "sizing-addon3");
    var Span_i = document.createElement("i");
    Span_i.setAttribute("class", "glyphicon glyphicon-calendar");
    Span_.appendChild(Span_i);
    var input_end_date = document.createElement("input");
    input_end_date.setAttribute("id", "End_Date_Input");
    input_end_date.setAttribute("class","form-control");
    input_end_date.setAttribute("placeholder","Number OF Days");
    input_end_date.setAttribute("type","number");
    input_end_date.setAttribute("aria-describedby","sizing-addon3");
    var Submit_Form = document.createElement("button");
    Submit_Form.setAttribute("class", "btn btn-warning");
    Submit_Form.setAttribute("style", "margin-top:10px");
    Submit_Form.setAttribute("id", DetailedCar.ID);
    Submit_Form.setAttribute("onclick", "Pay(this)");


    Submit_Form.innerHTML = "Pay For this Peroid";

    var Alter = document.createElement("div");
    Alter.setAttribute("id", "Pay_Alter");
    Alter.setAttribute("style", "margin-top:10px;display:none");
    Alter.setAttribute("class", "alert alert-danger");

    Last_Hint_Div.appendChild(Span_);
    Last_Hint_Div.appendChild(input_end_date);


    Row_5Plus.appendChild(Row_5Plus_Hint);
    Row_5Plus.appendChild(Last_Hint_Div);
    Row_5Plus.appendChild(Submit_Form);
    Row_5Plus.appendChild(Alter);

    Sub_Main_Div.appendChild(Row_5Plus);


    var Row_6 = document.createElement("div");
    Row_6.setAttribute("class", "row");
    Row_6.setAttribute("style", "margin-right:180px");
    var Under_Row_6 = document.createElement("div");
    Under_Row_6.setAttribute("class", "col-md-4 text-center");
    var Row_6_h3=document.createElement("h3");
    Row_6_Span=document.createElement("span");
    Row_6_Span.setAttribute("class","monospaced");
    Row_6_Span.innerHTML="In Stock";
    Row_6_h3.appendChild(Row_6_Span);
    Under_Row_6.appendChild(Row_6_h3);
    var Under_Row_6_2 = document.createElement("div");
    Under_Row_6_2.setAttribute("class", "col-md-4 col-md-offset-1 text-center");
    var Row_6_p=document.createElement("p");
    Row_6_p.innerHTML="Street 103 ElThrer City Cairo";
    Under_Row_6_2.appendChild(Row_6_p);
    Row_6.appendChild(Under_Row_6);
    Row_6.appendChild(Under_Row_6_2);
    Sub_Main_Div.appendChild(Row_6);


    var Row_7 = document.createElement("div");
    Row_7.setAttribute("class", "row");
    var Under_Row_7 = document.createElement("div");
    Under_Row_7.setAttribute("class", "col-md-12 top-10");
    var Row_7_p=document.createElement("p");
    Row_7_p.innerHTML="For Any help ";
    var Row_7_a=document.createElement("a");
    Row_7_a.setAttribute("href","");
    Row_7_a.innerHTML=" please call us on 01125346156";
    Row_7_p.appendChild(Row_7_a);
    Under_Row_7.appendChild(Row_7_p);
    Row_7.appendChild(Under_Row_7);
    Sub_Main_Div.appendChild(Row_7);



    var UL=document.createElement("ul");
    UL.setAttribute("class","nav nav-tabs");
    UL.setAttribute("role","tablist");
    var LI_1=document.createElement("li");
    LI_1.setAttribute("role","presentation");
    var LI_1_a=document.createElement("a");
    LI_1_a.setAttribute("href","#description");
    LI_1_a.setAttribute("aria-controls","description");
    LI_1_a.setAttribute("data-toggle","tab");
    LI_1_a.innerHTML="Description";
    LI_1.appendChild(LI_1_a);

    var LI_2=document.createElement("li");
    LI_2.setAttribute("role","presentation");
    var LI_2_a=document.createElement("a");
    LI_2_a.setAttribute("href","#features");
    LI_2_a.setAttribute("aria-controls","features");
    LI_2_a.setAttribute("data-toggle","tab");
    LI_2_a.innerHTML="Features";
    LI_2.appendChild(LI_2_a);


    var LI_3=document.createElement("li");
    LI_3.setAttribute("role","presentation");
    var LI_3_a=document.createElement("a");
    LI_3_a.setAttribute("href","#reviews");
    LI_3_a.setAttribute("aria-controls","reviews");
    LI_3_a.setAttribute("data-toggle","tab");
    LI_3_a.innerHTML = "Reviews";
    LI_3.appendChild(LI_3_a);

    UL.appendChild(LI_1);
    UL.appendChild(LI_2);
    UL.appendChild(LI_3);
    Sub_Main_Div.appendChild(UL);


    var Tab_Content = document.createElement("div");
    Tab_Content.setAttribute("class", "tab-content");
    var Description_Div = document.createElement("div");
    Description_Div.setAttribute("id", "description");
    Description_Div.setAttribute("class", "tab-pane active");
    Description_Div.setAttribute("role", "tabpanel");
    var Description_P = document.createElement("p");
    Description_P.setAttribute("class", "top-10");
    Description_P.innerHTML = DetailedCar.Cat_Desc;
    Description_Div.appendChild(Description_P);
    Tab_Content.appendChild(Description_Div);


    var Feature_Div = document.createElement("div");
    Feature_Div.setAttribute("id", "features");
    Feature_Div.setAttribute("class", "tab-pane top-10");
    Feature_Div.setAttribute("role", "tabpanel");
    var Feature_P = document.createElement("p");
    Feature_P.setAttribute("class", "top-10");
    Feature_P.innerHTML = DetailedCar.Advantages;
    Feature_Div.appendChild(Feature_P);
    Tab_Content.appendChild(Feature_Div);


    var Review_Div = document.createElement("div");
    Review_Div.setAttribute("id", "reviews");
    Review_Div.setAttribute("class", "tab-pane");
    Review_Div.setAttribute("role", "tabpanel");
    var Review_P = document.createElement("p");
    Review_P.setAttribute("class", "top-10");
    Review_P.innerHTML = "Features The 'Brownie' Flash B is a box camera taking 2¼ × 3¼ frames on 620 film, made of sheet metal by Kodak Ltd. in England, 1958-60. A more luxurious version of the Brownie Six-20 Model F, it has a two-speed shutter (1/80, 1/40 +B), a close-focus (5-10ft) lens, a yellow filter and flash sync. The Flash B is very similar to the Brownie Flash IV, adding a two-speed shutter but lacking a tripod bush.";
    Review_Div.appendChild(Review_P);
    Tab_Content.appendChild(Review_Div);
    Sub_Main_Div.appendChild(Tab_Content);



    Under_Main_Div.appendChild(Sub_Main_Div);
    Div_Main.appendChild(Under_Main_Div);
    Parent.appendChild(Div_Main);
    Parent.appendChild(document.createElement("hr"));


}
function Get_Car(element)
{
    document.getElementById("Rendering_Form").style.display = "block";
    document.getElementById("Get_Car_Button").style.display = "none";
}
function Pay(element)
{
    var Days_Number = document.getElementById("End_Date_Input").value;
    if (Days_Number<10000000) {
        $.ajax({
            type: 'POST',
            url: '/Pay?Car_ID=' + element.id + '&Days_Number=' + Days_Number,
            success: function (data) {
                if (data == 'true') {
                    var Alter = document.getElementById("Pay_Alter");
                    Alter.setAttribute("class", "alert alert-success");
                    Alter.style.display = "block";
                    Alter.innerHTML = "Operation Succeded , You rented the car for " + Days_Number + " Days";
                    setTimeout(function () {
                        window.location = 'HomePage';
                    }, 3000);
                }
                else if (data == "false") {
                    var Alter = document.getElementById("Pay_Alter");
                    Alter.style.display = "block";
                    Alter.innerHTML = "You have no Enough balance to rent for " + Days_Number + " Days";
                }
                else {
                    var Alter = document.getElementById("Pay_Alter");
                    Alter.style.display = "block";
                    Alter.innerHTML = data;
                }

            }
        });
    }
    else
    {
        var Alter = document.getElementById("Pay_Alter");
        Alter.style.display = "block";
        Alter.innerHTML = "Please insert a valid number";
    }

}
function ClearCarDrawing() {
    var parent = document.getElementById("CarsContainer");
    while (parent.hasChildNodes()) {
        parent.removeChild(parent.lastChild);
    }
}
/*<div class="container">
    <div class="row" style="background-color: #d2dae2;margin-top: 40px ">
        <div class="col-md-6" style="margin-top: 50px;">
            <img src="~/Content/CarsImageDetails/11.jpg" class=" image-responsive" />
        </div>

        <div class="col-md-6">
            <div class="row">
                <div class="col-md-12">
                    <h1>B M W</h1>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <span class="label label-primary">Model</span>
                    <span class="monospaced"> 1960140180</span>
                </div>
            </div><!-- end row -->


            <div class="row">
                <div class="col-md-3">
                    <span class="sr-only">Four out of Five Stars</span>
                    <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                    <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                    <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                    <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                    <span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
                    <span class="label label-success">Car Number : 61</span>
                </div>
                <div class="col-md-3">
                    <span class="monospaced">Car Rate</span>
                </div>
            </div><!-- end row -->






            <div class="row">
                <div class="col-md-12 bottom-rule">
                    <h2 class="product-price">$129.00</h2>
                </div>
            </div><!-- end row -->


            <div class="row add-to-cart">

                <div class="col-md-4">
                    <button class="btn btn-lg btn-brand btn-full-width btn-success">
                        Get Car
                    </button>
                </div>
            </div><!-- end row -->


            <div class="row well" style="margin-top: 15px; margin:auto;width:400px">
            <div class="well"> <i>The Start Date begins from the day that next rendering</i></div>
                <div class="input-group input-group-sm" style="width:200px;">
                    <span class="input-group-addon" id="sizing-addon3"><i class="glyphicon glyphicon-calendar"></i></span>
                    <input type="date" class="form-control" placeholder="End Date" aria-describedby="sizing-addon3">
                </div>
            </div><!-- end row -->



            <div class="row" style="margin-right:180px">
                <div class="col-md-4 text-center">
                    <h3><span class="monospaced">In Stock</span></h3>
                </div>
                <div class="col-md-4 col-md-offset-1 text-center">
                    <p>Street 103 ElThrer City Cairo</p>
                </div>
            </div><!-- end row -->





            <div class="row">
                <div class="col-md-12 top-10">
                    <p> For Any help <a href="tel:18005551212">please call us on 01125346156</a></p>
                </div>
            </div><!-- end row -->
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active">
                    <a href="#description"
aria-controls="description"
role="tab"
data-toggle="tab">Description</a>
</li>
<li role="presentation">
    <a href="#features"
aria-controls="features"
role="tab"
data-toggle="tab">Features</a>
</li>

<li role="presentation">
    <a href="#reviews"
aria-controls="reviews"
role="tab"
data-toggle="tab">Reviews</a>
</li>
</ul>


<!-- Tab panes -->
<div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="description">
        <p class="top-10">
            The 'Brownie' Flash B is a box camera taking 2&frac14; × 3&frac14;" frames on 620 film, made of sheet metal by Kodak Ltd. in England, 1958-60.
A more luxurious version of the Brownie Six-20 Model F, it has a two-speed shutter (1/80, 1/40 +B), a close-focus (5-10ft) lens, a yellow filter and flash sync. The Flash B is very similar to the Brownie Flash IV, adding a two-speed shutter but lacking a tripod bush.
</p>
<p>
<small>
    (source <a href="http://camerapedia.wikia.com/wiki/Kodak_Brownie_Flash_B">http://camerapedia.wikia.com/wiki/Kodak_Brownie_Flash_B</a>)
                        </small>
                    </p>
                </div>

                <div role="tabpanel" class="tab-pane top-10" id="features">
                    Features
                    <p class="top-10">
                        The 'Brownie' Flash B is a box camera taking 2&frac14; × 3&frac14;" frames on 620 film, made of sheet metal by Kodak Ltd. in England, 1958-60.
A more luxurious version of the Brownie Six-20 Model F, it has a two-speed shutter (1/80, 1/40 +B), a close-focus (5-10ft) lens, a yellow filter and flash sync. The Flash B is very similar to the Brownie Flash IV, adding a two-speed shutter but lacking a tripod bush.
</p>
<p>
<small>
    (source <a href="http://camerapedia.wikia.com/wiki/Kodak_Brownie_Flash_B">http://camerapedia.wikia.com/wiki/Kodak_Brownie_Flash_B</a>)
                        </small>
                    </p>
                </div>


                <div role="tabpanel" class="tab-pane" id="reviews">
                    The 'Brownie' Flash B is a box camera taking 2¼ × 3¼" frames on 620 film, made of sheet metal by Kodak Ltd. in England, 1958-60. A more luxurious version of the Brownie Six-20 Model F, it has a two-speed shutter (1/80, 1/40 +B), a close-focus (5-10ft) lens, a yellow filter and flash sync. The Flash B is very similar to the Brownie Flash IV, adding a two-speed shutter but lacking a tripod bush.
                    (source <a href="http://camerapedia.wikia.com/wiki/Kodak_Brownie_Flash_B">http://camerapedia.wikia.com/wiki/Kodak_Brownie_Flash_B</a>)

                </div>
            </div>




        </div>
    </div>
</div>

<hr>
*/






/*
    <div class="row">
        <div class="col-xs-18 col-sm-4 col-md-3">
            <div class="productbox">
                <div class="imgthumb img-responsive">
                    <img src="~/Content/WelcomePagee/images/pexels-photo-210019.jpeg" />
                </div>
                <div class="caption">
                    <h5>Thumbnail label</h5>
                    <s class="text-muted">$2.29</s> <b class="finalprice">$1.2</b> from <b>Amazon</b>
                    <a href="#" class="btn btn-default btn-xs pull-right" role="button"><i class="glyphicon glyphicon-zoom-in"></i></a>
                    <p>
                        <button type="button" class="btn btn-success btn-md btn-block">Get Offer</button>
                    </p>
                </div>
            </div>
        </div>

        <div class="col-xs-18 col-sm-4 col-md-3">
            <div class="productbox">
                <div class="imgthumb img-responsive">
                    <img src="~/Content/WelcomePagee/images/1.jpeg">
                </div>
                <div class="caption">
                    <h5>Thumbnail label</h5>
                    <s class="text-muted">$2.29</s> <b class="finalprice">$1.2</b> from <b>Amazon</b>
                    <a href="#" class="btn btn-default btn-xs pull-right" role="button"><i class="glyphicon glyphicon-zoom-in"></i></a>
                    <p>
                        <button type="button" class="btn btn-success btn-md btn-block">Get Offer</button>
                    </p>
                </div>
            </div>
        </div>

        <div class="col-xs-18 col-sm-4 col-md-3">
            <div class="productbox">
                <div class="imgthumb img-responsive">
                    <img src="~/Content/WelcomePagee/images/2.jpeg">
                </div>
                <div class="caption">
                    <h5>Thumbnail label</h5>
                    <s class="text-muted">$2.29</s> <b class="finalprice">$1.2</b> from <b>Amazon</b>
                    <a href="#" class="btn btn-default btn-xs pull-right" role="button"><i class="glyphicon glyphicon-zoom-in"></i></a>
                    <p>
                        <button type="button" class="btn btn-success btn-md btn-block">Get Offer</button>
                    </p>
                </div>
            </div>
        </div>

        <div class="col-xs-18 col-sm-4 col-md-3">
            <div class="productbox">
                <div class="imgthumb img-responsive">
                    <img src="~/Content/WelcomePagee/images/3.jpeg">
                </div>
                <div class="caption">
                    <h5>Thumbnail label</h5>
                    <s class="text-muted">$2.29</s> <b class="finalprice">$1.2</b> from <b>Amazon</b>
                    <a href="#" class="btn btn-default btn-xs pull-right" role="button"><i class="glyphicon glyphicon-zoom-in"></i></a>
                    <p>
                        <button type="button" class="btn btn-success btn-md btn-block">Get Offer</button>
                    </p>
                </div>
            </div>
        </div>

        <div class="col-xs-18 col-sm-4 col-md-3">
            <div class="productbox">
                <div class="imgthumb img-responsive">
                    <img src="~/Content/WelcomePagee/images/4.jpeg">
                </div>
                <div class="caption">
                    <h5>Thumbnail label</h5>
                    <s class="text-muted">$2.29</s> <b class="finalprice">$1.2</b> from <b>Amazon</b>
                    <a href="#" class="btn btn-default btn-xs pull-right" role="button"><i class="glyphicon glyphicon-zoom-in"></i></a>
                    <p>
                        <button type="button" class="btn btn-success btn-md btn-block">Get Offer</button>
                    </p>
                </div>
            </div>
        </div>

        <div class="col-xs-18 col-sm-4 col-md-3">
            <div class="productbox">
                <div class="imgthumb img-responsive">
                    <img src="~/Content/WelcomePagee/images/5.jpeg">
                </div>
                <div class="caption">
                    <h5>Thumbnail label</h5>
                    <s class="text-muted">$2.29</s> <b class="finalprice">$1.2</b> from <b>Amazon</b>
                    <a href="#" class="btn btn-default btn-xs pull-right" role="button"><i class="glyphicon glyphicon-zoom-in"></i></a>
                    <p>
                        <button type="button" class="btn btn-success btn-md btn-block">Get Offer</button>
                    </p>
                </div>
            </div>
        </div>

        <div class="col-xs-18 col-sm-4 col-md-3">
            <div class="productbox">
                <div class="imgthumb img-responsive">
                    <img src="~/Content/WelcomePagee/images/6.jpeg">
                </div>
                <div class="caption">
                    <h5>Thumbnail label</h5>
                    <s class="text-muted">$2.29</s> <b class="finalprice">$1.2</b> from <b>Amazon</b>
                    <a href="#" class="btn btn-default btn-xs pull-right" role="button"><i class="glyphicon glyphicon-zoom-in"></i></a>
                    <p>
                        <button type="button" class="btn btn-success btn-md btn-block">Get Offer</button>
                    </p>
                </div>
                <!--<div class="saleoffrate">
                  <b>90%</b><br>OFF
                </div>-->
            </div>
        </div>

        <div class="col-xs-18 col-sm-4 col-md-3">
            <div class="productbox">
                <div class="imgthumb img-responsive">
                    <img src="~/Content/WelcomePagee/images/7.jpeg">
                </div>
                <div class="caption">
                    <h5>Thumbnail label</h5>
                    <s class="text-muted">$2.29</s> <b class="finalprice">$1.2</b> from <b>Amazon</b>
                    <a href="#" class="btn btn-default btn-xs pull-right" role="button"><i class="glyphicon glyphicon-zoom-in"></i></a>
                    <p>
                        <button type="button" class="btn btn-success btn-md btn-block">Get Offer</button>
                    </p>
                </div>
                <!--<div class="saleoffrate">
                    <b>90%</b><br>OFF
                </div>-->
            </div>
        </div>

        <div class="col-xs-18 col-sm-4 col-md-3">
            <div class="productbox">
                <div class="imgthumb img-responsive">
                    <img src="~/Content/WelcomePagee/images/8.jpeg">
                </div>
                <div class="caption">
                    <h5>Thumbnail label</h5>
                    <s class="text-muted">$2.29</s> <b class="finalprice">$1.2</b> from <b>Amazon</b>
                    <a href="#" class="btn btn-default btn-xs pull-right" role="button"><i class="glyphicon glyphicon-zoom-in"></i></a>
                    <p>
                        <button type="button" class="btn btn-success btn-md btn-block">Get Offer</button>
                    </p>
                </div>
                <!--<div class="saleoffrate">
                    <b>90%</b><br>OFF
                </div>-->
            </div>
        </div>
        <div class="col-xs-18 col-sm-4 col-md-3">
            <div class="productbox">
                <div class="imgthumb img-responsive">
                    <img src="~/Content/WelcomePagee/images/9.jpeg">
                </div>
                <div class="caption">
                    <h5>Thumbnail label</h5>
                    <s class="text-muted">$2.29</s> <b class="finalprice">$1.2</b> from <b>Amazon</b>
                    <a href="#" class="btn btn-default btn-xs pull-right" role="button"><i class="glyphicon glyphicon-zoom-in"></i></a>
                    <p>
                        <button type="button" class="btn btn-success btn-md btn-block">Get Offer</button>
                    </p>
                </div>
                <!--<div class="saleoffrate">
                    <b>90%</b><br>OFF
                </div>-->
            </div>
        </div>


    </div><!--/row-->
*/

/*

*/