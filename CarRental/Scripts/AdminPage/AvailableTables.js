function AddHead_Avilables()
{
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
    Search_Input.setAttribute("onkeyup", "SearchAvailable(this)");
   
    var Search_hr = document.createElement("hr");
    Search_hr.setAttribute("style", "visibility:hidden");

    Search_DIV.appendChild(Search_Label);
    Search_DIV.appendChild(Search_Input);
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

   

    var body = document.createElement("tbody");
    body.setAttribute("id", "Table_Body");


    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    tr.appendChild(th6);
    head.appendChild(tr);
    table.appendChild(head);
    table.appendChild(body);
    parent.appendChild(Search_DIV);
    parent.appendChild(table);
}
function AddRowAvailable(Car_ID, model, price, Num_Seats, Category, state)
{
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
        //button_state.setAttribute("onclick", "Unavailable(this)");
        button_state.setAttribute("class", "btn btn-success");
        button_state.innerHTML = "Available";
    }
    else {
        button_state.setAttribute("class", "btn btn-info");
        //button_state.setAttribute("onclick", "Available(this)");
        button_state.innerHTML = " Unavailable ";
    }

    td6.appendChild(button_state);


    


    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    parent.appendChild(tr);
}

function SearchAvailable(element) {
    ClearRows();
    document.getElementById("Head").style.visibility = 'visible';
    var re = new RegExp("\\b(" + element.value + ")(.)*\\b");
    for (var i = 0; i < Available.length; i++) {
        if (re.test(Available[i].Model)) {
            AddRowAvailable(Available[i].ID, Available[i].Model, Available[i].price, Available[i].NumberOfSeats, Available[i].Cat_NAME, Available[i].State);
        }
    }
}