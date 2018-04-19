var Car_Need_Update;
function AddHead_Cars() {
    var parent = document.getElementById("container");
    var Search_DIV = document.createElement("div");
    Search_DIV.setAttribute("id", "option-div");
    Search_DIV.setAttribute("class", "form-group");
    Search_DIV.setAttribute("style", "width: 320px;margin: auto");
    var Search_Label = document.createElement("label");
    Search_Label.setAttribute("for", "sel1");
    Search_Label.innerHTML = "Search By Model:"
    var Search_Input = document.createElement("input");
    Search_Input.setAttribute("id", "search");
    Search_Input.setAttribute("type", "text");
    Search_Input.setAttribute("class", "form-control");
    Search_Input.setAttribute("placeholder", "Car Model");
    Search_Input.setAttribute("onkeyup", "SearchCar(this)");
    var AddNew = document.createElement("button");
    AddNew.innerHTML = "Add New Car";
    AddNew.setAttribute("class", "btn btn-success");
    AddNew.setAttribute("type", "button");
    AddNew.setAttribute("style", "width:320px");
    AddNew.setAttribute("onclick", "AddNewCar(this)");
    var Search_hr = document.createElement("hr");
    Search_hr.setAttribute("style", "visibility:hidden");

    Search_DIV.appendChild(Search_Label);
    Search_DIV.appendChild(Search_Input);
    Search_DIV.appendChild(AddNew);
    Search_DIV.appendChild(Search_hr);


    var table = document.createElement("table");
    table.setAttribute("class", "table table-striped");
    table.setAttribute("id", "MyTable");
    var head = document.createElement("thead");
    table.setAttribute("id", "Head");
    var tr = document.createElement("tr");

    var th1 = document.createElement("th");
    th1.innerHTML = "Car ID";

    var th2 = document.createElement("th");
    th2.innerHTML = "Model";

    var th3 = document.createElement("th");
    th3.innerHTML = "Price";

    var th4 = document.createElement("th");
    th4.innerHTML = "Num Of Seats";

    var th5 = document.createElement("th");
    th5.innerHTML = "Categoty";

    var th6 = document.createElement("th");
    th6.innerHTML = "State";

    var th7 = document.createElement("th");
    th7.innerHTML = "Details";

    var body = document.createElement("tbody");
    body.setAttribute("id", "Table_Body");


    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    tr.appendChild(th6);
    tr.appendChild(th7);
    head.appendChild(tr);
    table.appendChild(head);
    table.appendChild(body);
    parent.appendChild(Search_DIV);
    parent.appendChild(table);
}
function AddNewCar()
{
    var parent = document.getElementById("container");
    parent.innerHTML = "<div class=row><div id=ALERT  style=text-align:center;margin:auto;width:500px;margin-bottom:10px></div><div class=" + "'" + "col-md-6 col-md-offset-3" + "'" + "><div class=well well-sm><form class=form-horizontal><fieldset><legend class=text-center>Car Adding </legend><div id=ModelDiv class=form-group><label class=col-md-3 control-label for=name>Model</label><div class=col-md-9><input id=Model name=Model type=text placeholder=Model class=form-control></div></div><div id=ColorDiv class=form-group><label class=col-md-3 control-label for=email>Color</label><div class=col-md-9><input id=Color name=Color type=text placeholder=Color class=form-control></div></div><div id=SeatsDiv class=form-group><label class=col-md-3 control-label for=email> Seats</label><div class=col-md-9><input id=Seats name=Seats type=number placeholder=Number Of Seats class=form-control></div></div><div id=PriceDiv class=form-group><label class=col-md-3 control-label for=email> Price</label><div class=col-md-9><input id=Price name=Price type=number placeholder=Price class=form-control></div></div><div  class=form-group><label class=col-md-3 control-label for=email> Car Image</label><div class=col-md-9><input id=Image name=Image type=file placeholder=Price class=form-control></div></div><div class=form-group><label class=col-md-3 control-label for=email> Car Details Image</label><div class=col-md-9><input id=Details name=Details type=file placeholder=Price class=form-control></div></div><div class=form-group><label class=col-md-3 control-label for=email> Car Category</label><select id=CategoryOptions class=col-md-8 id=sel1 style=margin-top:10px;margin-left:14px></select></div><div class=form-group><label class=col-md-3 control-label for=message>Advantages</label><div class=col-md-9><textarea class=form-control id=Advantages name=Advantages placeholder=Please enter car advantages... rows=5></textarea></div></div><div class=form-group><div class=col-md-12 text-right><button type=button onclick=AddCar() class=" + "'" + "btn btn-primary btn-lg" + "'" + ">Submit</button></div></div></fieldset></form></div></div></div>"
    $.ajax({
        type: 'GET',
        url: '/GetCateogries',
        success: function (data) {
            for (var i = 0; i < data.length;i++)
            Add_Category_Option(data[i].Name);
        }
    });

}
function UpdateCar(element)
{
    ClearAll();
    var parent = document.getElementById("container");
    parent.innerHTML = "<div class=row><div id=ALERT  style=text-align:center;margin:auto;width:500px;margin-bottom:10px></div><div class=" + "'" + "col-md-6 col-md-offset-3" + "'" + "><div class=well well-sm><form class=form-horizontal><fieldset><legend class=text-center>Car Updating </legend><div id=ModelDiv class=form-group><label class=col-md-3 control-label for=name>Model</label><div class=col-md-9><input id=Model name=Model type=text placeholder=Model class=form-control></div></div><div id=ColorDiv class=form-group><label class=col-md-3 control-label for=email>Color</label><div class=col-md-9><input id=Color name=Color type=text placeholder=Color class=form-control></div></div><div id=SeatsDiv class=form-group><label class=col-md-3 control-label for=email> Seats</label><div class=col-md-9><input id=Seats name=Seats type=number placeholder=Number Of Seats class=form-control></div></div><div id=PriceDiv class=form-group><label class=col-md-3 control-label for=email> Price</label><div class=col-md-9><input id=Price name=Price type=number placeholder=Price class=form-control></div></div><div class=form-group><label class=col-md-3 control-label for=email> Car Category</label><select id=CategoryOptions class=col-md-8 id=sel1 style=margin-top:10px;margin-left:14px></select></div><div class=form-group><label class=col-md-3 control-label for=message>Advantages</label><div class=col-md-9><textarea class=form-control id=Advantages name=Advantages placeholder=Please enter car advantages... rows=5></textarea></div></div><div class=form-group><div class=col-md-12 text-right><button type=button onclick=SubmitUpdateCar() class=" + "'" + "btn btn-primary btn-lg" + "'" + ">Submit</button><button style=margin-left:20px type=button onclick=UpdateImage() class=" + "'" + "btn btn-primary btn-lg" + "'" + ">Change Car Image</button></div></div></fieldset></form></div></div></div>"
    $.ajax({
        type: 'GET',
        url: '/GetCateogries',
        success: function (data) {
            for (var i = 0; i < data.length; i++)
                Add_Category_Option(data[i].Name);
        }
    });

    var DetailedCar = SearchDetailedCar(element.id);
    var Model = document.getElementById("Model");
    var Color = document.getElementById("Color");
    var Seats = document.getElementById("Seats");
    var price = document.getElementById("Price");
    var Advantages = document.getElementById("Advantages");
    var Category = document.getElementById("CategoryOptions");
    Model.value = DetailedCar.Model;
    Seats.value = DetailedCar.NumberOfSeats;
    Color.value = DetailedCar.Color;
    price.value = DetailedCar.price;
    setTimeout(function () {
        selectItemByValue(Category, DetailedCar.Cat_NAME);
    }, 50);
    Advantages.value = DetailedCar.Advantages;
    Car_Need_Update = DetailedCar;

}
function SubmitUpdateCar()
{


    document.getElementById("ModelDiv").setAttribute("class", "form-group");
    document.getElementById("ColorDiv").setAttribute("class", "form-group");
    document.getElementById("SeatsDiv").setAttribute("class", "form-group");
    document.getElementById("PriceDiv").setAttribute("class", "form-group");

    var Alert = document.getElementById("ALERT");
    Alert.setAttribute("class", "");
    var Data = new FormData();
    var Model = document.getElementById("Model").value;
    var Color = document.getElementById("Color").value;
    var Seats = document.getElementById("Seats").value;
    var price = document.getElementById("Price").value;
    var Advantages = document.getElementById("Advantages").value;
    var Category = document.getElementById("CategoryOptions").value;
    var flag = 0;
    if (!Model || Model.length > 8) {
        Alert.setAttribute("class", "alert alert-danger");
        Alert.innerHTML = "Invalid Model Name";
        document.getElementById("ModelDiv").setAttribute("class", "form-group has-error");
        flag = 1;
    }
    else if (!validateName(Color) || Color.length == 0) {
        Alert.setAttribute("class", "alert alert-danger");
        Alert.innerHTML = "Invalid Color Please make sure that contains only letters ";
        document.getElementById("ColorDiv").setAttribute("class", "form-group has-error");
        flag = 1;
    }
    else if (Seats > 5 || Seats < 0 || !Seats) {
        Alert.setAttribute("class", "alert alert-danger");
        Alert.innerHTML = "Invalid Seats Number";
        document.getElementById("SeatsDiv").setAttribute("class", "form-group has-error");
        flag = 1;
    }
    else if (price > 10000 || price < 0 || !price) {
        Alert.setAttribute("class", "alert alert-danger");
        Alert.innerHTML = "Invalid Price  ";
        document.getElementById("PriceDiv").setAttribute("class", "form-group has-error");
        flag = 1;
    }

    if (flag == 0) {
        Data.append("Car_ID", Car_Need_Update.ID);
        Data.append("Model", Model);
        Data.append("Color", Color.toUpperCase());
        Data.append("Seats", Seats);
        Data.append("price", price);
        Data.append("Advantages", Advantages);
        Data.append("Category", Category);

        var Setting = {
            type: "POST",
            url: "UpdateCar",
            contentType: false,
            processData: false,
            data: Data,
            success: function (data) {
                if (data == 'true') {
                    Alert.setAttribute("class", "alert alert-success");
                    Alert.innerHTML = "Car Updated Successfully !! ";
                    setTimeout(function () {
                        CarView();
                    }, 3000);
                }
                else {
                    Alert.setAttribute("class", "alert alert-danger");
                    Alert.innerHTML = data;
                }
            }
        }
        $.ajax(Setting);
    }
    
}
function UpdateImage()
{
    var parent = document.getElementById("container");
    parent.innerHTML = "<div class=row><div id=ALERT  style=text-align:center;margin:auto;width:500px;margin-bottom:10px></div><div class=" + "'" + "col-md-6 col-md-offset-3" + "'" + "><div class=well well-sm><form class=form-horizontal><fieldset><legend class=text-center>Car Image Updating </legend><div  class=form-group><label class=col-md-3 control-label for=email> Car Image</label><div class=col-md-9><input id=Image name=Image type=file placeholder=Price class=form-control></div></div><div class=form-group><label class=col-md-3 control-label for=email> Car Details Image</label><div class=col-md-9><input id=Details name=Details type=file placeholder=Price class=form-control></div></div><div class=form-group><div class=col-md-12 text-right><button type=button onclick=AddImageToCar(Car_Need_Update) class=" + "'" + "btn btn-primary btn-lg" + "'" + ">Submit</button></div></div></fieldset></form></div></div></div>"
}
function AddImageToCar(car)
{
    var Alert = document.getElementById("ALERT");
    Alert.setAttribute("class", "");
    Alert.innerHTML = "";
    var Data = new FormData();
    var Image = document.getElementById("Image");
    var Details = document.getElementById("Details");
    var file = Image.files[0];
    var file2 = Details.files[0];
    var flag = 0;
 if (!checkURL(Image.value)) {
        Alert.setAttribute("class", "alert alert-danger");
        Alert.innerHTML = "Invalid Image Please make sure that you select image ";
        flag=1
    }
 else if (!checkURL(Details.value)) {
        Alert.setAttribute("class", "alert alert-danger");
        Alert.innerHTML = "Invalid Image Please make sure that you select image ";
        flag=1
    }
 if(flag==0)
 {
     
     Data.append("Image", file);
     Data.append("Details", file2);
     var Setting = {
         type: "POST",
         url: "UpdateCarImage",
         contentType: false,
         processData: false,
         data: Data,
         success: function (data) {
             if (data == 'true') {
                 Alert.setAttribute("class", "alert alert-success");
                 Alert.innerHTML = "Car Updated Successfully !! ";
                 setTimeout(function () {
                     CarView();
                 }, 3000);
             }
             else {
                 Alert.setAttribute("class", "alert alert-danger");
                 Alert.innerHTML = data;
             }
         }
     }
     $.ajax(Setting);
 }
 
}
function selectItemByValue(elmnt, value) {
    for (var i = 0; i < elmnt.options.length; i++) {
        if (elmnt.options[i].value === value) {
            elmnt.selectedIndex = i;
            break;
        }
    }
}
function Add_Category_Option(Category)
{
    var Parent = document.getElementById("CategoryOptions");
    var Option = document.createElement("option");
    Option.innerHTML = Category;
    Parent.appendChild(Option);
}
function AddCar()
{
    document.getElementById("ModelDiv").setAttribute("class", "form-group");
    document.getElementById("ColorDiv").setAttribute("class", "form-group");
    document.getElementById("SeatsDiv").setAttribute("class", "form-group");
    document.getElementById("PriceDiv").setAttribute("class", "form-group");

    var Alert=document.getElementById("ALERT");
    Alert.setAttribute("class", "");
    Alert.innerHTML = "";
    var Data = new FormData();
    var Image = document.getElementById("Image");
    var Details = document.getElementById("Details");
    var Model = document.getElementById("Model").value;
    var Color=document.getElementById("Color").value;
    var Seats=document.getElementById("Seats").value;
    var price=document.getElementById("Price").value;
    var Advantages= document.getElementById("Advantages").value;
    var Category=document.getElementById("CategoryOptions").value;
    var file = Image.files[0];
    var file2 = Details.files[0];
    var flag = 0;
    if (!Model || Model.length>8)
    {
        Alert.setAttribute("class", "alert alert-danger");
        Alert.innerHTML = "Invalid Model Name";
        document.getElementById("ModelDiv").setAttribute("class", "form-group has-error");
        flag=1;
    }
    else if (!validateName(Color) || Color.length==0) {
        Alert.setAttribute("class", "alert alert-danger");
        Alert.innerHTML = "Invalid Color Please make sure that contains only letters ";
        document.getElementById("ColorDiv").setAttribute("class", "form-group has-error");
        flag=1;
    }
    else if (Seats>5 ||Seats<0|| !Seats) {
        Alert.setAttribute("class", "alert alert-danger");
        Alert.innerHTML = "Invalid Seats Number";
        document.getElementById("SeatsDiv").setAttribute("class", "form-group has-error");
        flag = 1;
    }
    else if (price > 10000||price<0|| !price) {
        Alert.setAttribute("class", "alert alert-danger");
        Alert.innerHTML = "Invalid Price  ";
        document.getElementById("PriceDiv").setAttribute("class", "form-group has-error");
        flag = 1;
    }
    else if (!checkURL(Image.value)) {
        Alert.setAttribute("class", "alert alert-danger");
        Alert.innerHTML = "Invalid Image Please make sure that you select image ";
        flag=1
    }
    else if (!checkURL(Details.value)) {
        Alert.setAttribute("class", "alert alert-danger");
        Alert.innerHTML = "Invalid Image Please make sure that you select image ";
        flag=1;
    }

    if (flag == 0)
    {

        Data.append("Model", Model);
        Data.append("Color", Color.toUpperCase());
        Data.append("Seats", Seats);
        Data.append("price", price);
        Data.append("Advantages", Advantages);
        Data.append("Category", Category);
        Data.append("Image", file);
        Data.append("Details", file2);

        var Setting = {
            type: "POST",
            url: "AddCar",
            contentType: false,
            processData: false,
            data: Data,
            success: function (data) {
                if (data == 'True')
                {
                    Alert.setAttribute("class", "alert alert-success");
                    Alert.innerHTML = "Car Added Successfully !! ";
                    setTimeout(function () {
                        CarView();
                    }, 3000);
                }
                else
                {
                    Alert.setAttribute("class", "alert alert-danger");
                    Alert.innerHTML = data;
                }
            }
        }
        $.ajax(Setting);
    }

}
function AddRowCar(Car_ID, model, price, Num_Seats, Category, state) {
    var parent = document.getElementById("Table_Body");
    var tr = document.createElement("tr");
    tr.setAttribute("id", "TD" + Car_ID);
    var td1 = document.createElement("td");
    td1.innerHTML = Car_ID;
    var td2 = document.createElement("td");
    td2.innerHTML = model;
    var td3 = document.createElement("td");
    td3.innerHTML = price + " L.E";

    var td4 = document.createElement("td");
    td4.innerHTML = Num_Seats;

    var td5 = document.createElement("td");
    td5.innerHTML = Category;


    var td6 = document.createElement("td");
    var button_state = document.createElement("button");
    button_state.setAttribute("type", "button");
    button_state.setAttribute("style", "width:100px");
    button_state.setAttribute("id", Car_ID);
    if (state == 0) {
        button_state.setAttribute("onclick", "Unavailable(this)");
        button_state.setAttribute("class", "btn btn-success");
        button_state.innerHTML = "Available";
    }
    else {
        button_state.setAttribute("class", "btn btn-info");
        button_state.setAttribute("onclick", "Available(this)");
        button_state.innerHTML = " Unavailable ";
    }

    td6.appendChild(button_state);


    var td7 = document.createElement("td");
    var details_button = document.createElement("button");
    details_button.innerHTML = "Details";
    details_button.setAttribute("class", "btn btn-success");
    details_button.setAttribute("type", "button");
    details_button.setAttribute("onclick", "CarDetails(this)");
    details_button.setAttribute("id", Car_ID);
    td7.appendChild(details_button);


    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    parent.appendChild(tr);
}
function Available(element) {
    $.ajax({
        type: 'POST',
        url: '/available?id=' + element.id,
        success: function (data) {
            element.innerHTML = "Available"
            element.setAttribute("class", "btn btn-success");
            element.setAttribute("onclick", "Unavailable(this)");

        }
    });

}
function Unavailable(element) {
    $.ajax({
        type: 'POST',
        url: '/Unavailable?id=' + element.id,
        success: function (data) {
            element.innerHTML = "Unavailable"
            element.setAttribute("class", "btn btn-info");
            element.setAttribute("onclick", "Available(this)");

        }
    });


}
function SearchCar(element) {
    ClearRows();
    document.getElementById("Head").style.visibility = 'visible';
    var re = new RegExp("\\b(" + element.value + ")(.)*\\b");
    for (var i = 0; i < Cars.length; i++) {
        if (re.test(Cars[i].Model)) {
            AddRowCar(Cars[i].ID, Cars[i].Model, Cars[i].price, Cars[i].NumberOfSeats, Cars[i].Cat_NAME, Cars[i].State);
        }
    }
}
function SearchDetailedCar(car_id) {
    for (var i = 0; i < Cars.length; i++) {
        if (Cars[i].ID == car_id) {
            return Cars[i];
        }
    }
}
function CarDetails(element) {
    ClearAll();
    var DetailedCar = SearchDetailedCar(element.id);
    var AlertDiv = document.createElement("div");
    AlertDiv.setAttribute("id", "ActionsAlert");
    AlertDiv.setAttribute("style", "margin:auto;width:300px;");
    var Buttons_Div = document.createElement("div");
    Buttons_Div.setAttribute("style", "margin:auto;width:450px;margin-top:10px;text-align:center");
    var B1 = document.createElement("button");
    B1.innerHTML = "Delete The Car";
    B1.setAttribute("id", DetailedCar.ID);
    B1.setAttribute("onclick", "DeleteCar(this)");

    B1.setAttribute("class", "btn btn-warning");
    B1.setAttribute("style", "margin-right:20px");
    var B2 = document.createElement("button");
    B2.innerHTML = "Update The Car";
    B2.setAttribute("class", "btn btn-warning");
    B2.setAttribute("id", DetailedCar.ID);
    B2.setAttribute("onclick", "UpdateCar(this)");

    Buttons_Div.appendChild(B1);
    Buttons_Div.appendChild(B2);

    var Buttons_HR = document.createElement("hr");
    Buttons_HR.style.visibility = "hidden";
    Buttons_Div.appendChild(Buttons_HR);

    var Parent = document.getElementById("container");
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
    Row2_Span2.innerHTML = " " + DetailedCar.Model;
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
    Span_CarRate.innerHTML = "Car Rate";
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





    var Row_6 = document.createElement("div");
    Row_6.setAttribute("class", "row");
    Row_6.setAttribute("style", "margin-right:180px");
    var Under_Row_6 = document.createElement("div");
    Under_Row_6.setAttribute("class", "col-md-4 text-center");
    var Row_6_h3 = document.createElement("h3");
    Row_6_Span = document.createElement("span");
    Row_6_Span.setAttribute("class", "monospaced");
    Row_6_Span.innerHTML = "In Stock";
    Row_6_h3.appendChild(Row_6_Span);
    Under_Row_6.appendChild(Row_6_h3);
    var Under_Row_6_2 = document.createElement("div");
    Under_Row_6_2.setAttribute("class", "col-md-4 col-md-offset-1 text-center");
    var Row_6_p = document.createElement("p");
    Row_6_p.innerHTML = "Street 103 ElThrer City Cairo";
    Under_Row_6_2.appendChild(Row_6_p);
    Row_6.appendChild(Under_Row_6);
    Row_6.appendChild(Under_Row_6_2);
    Sub_Main_Div.appendChild(Row_6);


    var Row_7 = document.createElement("div");
    Row_7.setAttribute("class", "row");
    var Under_Row_7 = document.createElement("div");
    Under_Row_7.setAttribute("class", "col-md-12 top-10");
    var Row_7_p = document.createElement("p");
    Row_7_p.innerHTML = "For Any help ";
    var Row_7_a = document.createElement("a");
    Row_7_a.setAttribute("href", "");
    Row_7_a.innerHTML = " please call us on 01125346156";
    Row_7_p.appendChild(Row_7_a);
    Under_Row_7.appendChild(Row_7_p);
    Row_7.appendChild(Under_Row_7);
    Sub_Main_Div.appendChild(Row_7);



    var UL = document.createElement("ul");
    UL.setAttribute("class", "nav nav-tabs");
    UL.setAttribute("role", "tablist");
    var LI_1 = document.createElement("li");
    LI_1.setAttribute("role", "presentation");
    var LI_1_a = document.createElement("a");
    LI_1_a.setAttribute("href", "#description");
    LI_1_a.setAttribute("aria-controls", "description");
    LI_1_a.setAttribute("data-toggle", "tab");
    LI_1_a.innerHTML = "Description";
    LI_1.appendChild(LI_1_a);

    var LI_2 = document.createElement("li");
    LI_2.setAttribute("role", "presentation");
    var LI_2_a = document.createElement("a");
    LI_2_a.setAttribute("href", "#features");
    LI_2_a.setAttribute("aria-controls", "features");
    LI_2_a.setAttribute("data-toggle", "tab");
    LI_2_a.innerHTML = "Features";
    LI_2.appendChild(LI_2_a);


    var LI_3 = document.createElement("li");
    LI_3.setAttribute("role", "presentation");
    var LI_3_a = document.createElement("a");
    LI_3_a.setAttribute("href", "#reviews");
    LI_3_a.setAttribute("aria-controls", "reviews");
    LI_3_a.setAttribute("data-toggle", "tab");
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
    Parent.appendChild(AlertDiv);
    Parent.appendChild(Buttons_Div);
    Parent.appendChild(Div_Main);
    Parent.appendChild(document.createElement("hr"));


}
function CarsTable() {
    ClearAll();
    AddHead_Cars();
    for (var i = 0; i < Cars.length; i++) {
        AddRowCar(Cars[i].ID, Cars[i].Model, Cars[i].price, Cars[i].NumberOfSeats, Cars[i].Cat_NAME, Cars[i].State);
    }
}
function DeleteCar(element) {

    $.ajax({
        type: 'Post',
        url: '/DeleteCar?Car_ID=' + element.id,
        success: function (data) {
            var Alert = document.getElementById("ActionsAlert");
            Alert.setAttribute("class", "alert alert-success");
            Alert.innerHTML = "The Car Deleted Successfully!!";
            setTimeout(function () {
                CarView();
            }, 1000);
        }
    });
}
function validateName(name) {
    return /^[a-zA-Z ]+$/.test(name);
}


function checkURL(url) {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}