function AddHead_Category() {
    var parent = document.getElementById("container");
    var Search_DIV = document.createElement("div");
    Search_DIV.setAttribute("id", "option-div");
    Search_DIV.setAttribute("class", "form-group");
    Search_DIV.setAttribute("style", "width: 320px;margin: auto");
    var Search_Label = document.createElement("label");
    Search_Label.setAttribute("for", "sel1");
    Search_Label.innerHTML = "Search By Name:"
    var Search_Input = document.createElement("input");
    Search_Input.setAttribute("id", "search");
    Search_Input.setAttribute("type", "text");
    Search_Input.setAttribute("class", "form-control");
    Search_Input.setAttribute("placeholder", "Category Name");
    Search_Input.setAttribute("onkeyup", "SearchCategory(this)");
    var AddNew = document.createElement("button");
    AddNew.innerHTML = "Add New Category";
    AddNew.setAttribute("class", "btn btn-success");
    AddNew.setAttribute("type", "button");
    AddNew.setAttribute("style", "width:320px");
    AddNew.setAttribute("onclick", "AddNewCategory(this)");
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
    th1.innerHTML = "Cateogry Number";

    var th2 = document.createElement("th");
    th2.innerHTML = "Cateogry Name";

    var th3 = document.createElement("th");
    th3.innerHTML = "Action";



    var body = document.createElement("tbody");
    body.setAttribute("id", "Table_Body");


    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    head.appendChild(tr);
    table.appendChild(head);
    table.appendChild(body);
    parent.appendChild(Search_DIV);
    parent.appendChild(table);
}
function AddRow_Category(Cat_ID, name) {
    var parent = document.getElementById("Table_Body");
    var tr = document.createElement("tr");
    tr.setAttribute("id", "TD" + Cat_ID);
    var td1 = document.createElement("td");
    td1.innerHTML = Cat_ID;
    var td2 = document.createElement("td");
    td2.innerHTML = name;

    var td3 = document.createElement("td");
    var delete_button = document.createElement("button");
    delete_button.innerHTML = "Delete";
    delete_button.setAttribute("class", "btn btn-danger");
    delete_button.setAttribute("type", "button");
    delete_button.setAttribute("onclick", "DeleteCategory(this)");
    delete_button.setAttribute("id", Cat_ID);
    td3.appendChild(delete_button);



    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    parent.appendChild(tr);
}
function AddNewCategory() {
    var parent = document.getElementById("container");
    var ALERT = document.createElement("div");
    parent.innerHTML = "<div id=Alert_Category style=text-align:center></div><form  style=" + "'" + "width:400px;margin: 0 auto;" + "'" + "><h1>Add New Category</h1><div class=required-field-block> <input id=Category_Name type=text placeholder=Name class=form-control><div class=required-icon><div class=text>*</div></div></div><div class=required-field-block><textarea id=Category_Des rows=3 class=form-control placeholder=Description></textarea><div class=required-icon><div class=text>*</div></div></div><button onclick=SubmitCategoryForm() class=btn btn-primary>Add..</button></form>"
}
function SubmitCategoryForm() {
    var Name = document.getElementById("Category_Name").value.toUpperCase();
    var Des = document.getElementById("Category_Des").value;
    var alert_=document.getElementById("Alert_Category");
    if (validateName(Name))
    {
        $.ajax({
            type: 'Post',
            url: '/AddCategory?Name=' + Name + "&Des=" + Des,
            success: function (data) {
                alert_.innerHTML="Category Added Successfully!!";
                alert_.setAttribute("class", "alert alert-success");
                setTimeout(function () {
                    CategoryView();
                }, 2000);
            }
        });
    }
    else
    {
        alert_.innerHTML = "Invalid Name!!";
        alert_.setAttribute("class","alert alert-danger");
    }

}
function DeleteCategory(element) {
    if (confirm("are you sure you want to Delete The Category?")) {
        document.getElementById("TD" + element.id).remove();

    }
}
function SearchCategory(element) {
    ClearRows();
    document.getElementById("Head").style.visibility = 'visible';
    var re = new RegExp("\\b(" + element.value + ")(.)*\\b");
    for (var i = 0; i < Categories.length; i++) {
        if (re.test(Categories[i].Name)) {

            AddRow_Category(Categories[i].ID, Categories[i].Name);
        }
    }
}