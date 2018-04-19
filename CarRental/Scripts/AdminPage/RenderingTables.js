function AddHead_Rendering() {
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
    Search_Input.setAttribute("onkeyup", "SearchRendering(this)");
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
    th1.innerHTML = "Rendering Number";

    var th2 = document.createElement("th");
    th2.innerHTML = "User Email";

    var th3 = document.createElement("th");
    th3.innerHTML = "Car Model";

    var th4 = document.createElement("th");
    th4.innerHTML = "Start Date";

    var th5 = document.createElement("th");
    th5.innerHTML = "End Date";


    var body = document.createElement("tbody");
    body.setAttribute("id", "Table_Body");


    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    head.appendChild(tr);
    table.appendChild(head);
    table.appendChild(body);
    parent.appendChild(Search_DIV);
    parent.appendChild(table);
}

function AddRowRendering(Ren_ID, Email, Model, Start, End) {
    var parent = document.getElementById("Table_Body");
    var tr = document.createElement("tr");
    tr.setAttribute("id", "TD" + Ren_ID);
    var td1 = document.createElement("td");
    td1.innerHTML = Ren_ID;
    var td2 = document.createElement("td");
    td2.innerHTML = Email;
    var td3 = document.createElement("td");
    td3.innerHTML = Model;

    var td4 = document.createElement("td");
    td4.innerHTML = Start;

    var td5 = document.createElement("td");
    td5.innerHTML = End;




    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    parent.appendChild(tr);
}
function SearchRendering(element) {
    ClearRows();
    document.getElementById("Head").style.visibility = 'visible';
    var re = new RegExp("\\b(" + element.value + ")(.)*\\b");
    for (var i = 0; i < Rendering.length; i++) {
        if (re.test(Rendering[i].Model)) {
            var start = new Date(parseInt(Rendering[i].Start_Date.replace(/[^0-9 +]/g, '')));
            var end = new Date(parseInt(Rendering[i].End_Date.replace(/[^0-9 +]/g, '')));
            var start_date_format = start.getDate() + " - " + (start.getMonth() + 1) + " - " + start.getFullYear();
            var end_date_format = end.getDate() + " - " + (end.getMonth() + 1) + " - " + end.getFullYear();
            AddRowRendering(Rendering[i].ID, Rendering[i].User.Email, Rendering[i].Car.Model, start_date_format, end_date_format);
        }
    }
}