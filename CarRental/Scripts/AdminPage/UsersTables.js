function AddHead_Users() {
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
    Search_Input.setAttribute("placeholder", "User Name");
    Search_Input.setAttribute("onkeyup", "Search(this)");
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
    th1.innerHTML = "User ID";

    var th2 = document.createElement("th");
    th2.innerHTML = "UserName";

    var th3 = document.createElement("th");
    th3.innerHTML = "Email";

    var th4 = document.createElement("th");
    th4.innerHTML = "Balance";

    var th5 = document.createElement("th");
    th5.innerHTML = "Block";

    var th6 = document.createElement("th");
    th6.innerHTML = "Delete";

    var th7 = document.createElement("th");
    th7.innerHTML = "Information";

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
function AddRowUser(User_ID, name, email, balance, block) {
    var parent = document.getElementById("Table_Body");
    var tr = document.createElement("tr");
    tr.setAttribute("id", "TD" + User_ID);
    var td1 = document.createElement("td");
    td1.innerHTML = User_ID;
    var td2 = document.createElement("td");
    td2.innerHTML = name;
    var td3 = document.createElement("td");
    td3.innerHTML = email;

    var td4 = document.createElement("td");
    td4.innerHTML = balance + " LE";

    var td5 = document.createElement("td");
    var block_user = document.createElement("button");
    block_user.setAttribute("type", "button");
    block_user.setAttribute("style", "width:90px");
    block_user.setAttribute("id", User_ID);
    if (block == 1) {
        block_user.setAttribute("onclick", "UnBlock(this)");
        block_user.setAttribute("class", "btn btn-success");
        block_user.innerHTML = "UnBlock";
    }
    else {
        block_user.setAttribute("class", "btn btn-info");
        block_user.setAttribute("onclick", "Block(this)");
        block_user.innerHTML = " Block ";
    }

    td5.appendChild(block_user);

    var td6 = document.createElement("td");
    var delete_button = document.createElement("button");
    delete_button.innerHTML = "Delete User";
    delete_button.setAttribute("class", "btn btn-danger");
    delete_button.setAttribute("type", "button");
    delete_button.setAttribute("onclick", "DeleteUser(this)");
    delete_button.setAttribute("id", User_ID);
    td6.appendChild(delete_button);

    var td7 = document.createElement("td");
    var info_button = document.createElement("button");
    info_button.innerHTML = "Information";
    info_button.setAttribute("class", "btn btn-success");
    info_button.setAttribute("type", "button");
    info_button.setAttribute("onclick", "Information(this)");
    info_button.setAttribute("id", User_ID);
    td7.appendChild(info_button);



    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    parent.appendChild(tr);
}

function Search(element) {
    ClearRows();
    document.getElementById("Head").style.visibility = 'visible';
    var re = new RegExp("\\b(" + element.value + ")(.)*\\b");
    for (var i = 0; i < Users.length; i++) {
        if (re.test(Users[i].Fname + " " + Users[i].Lname)) {
            AddRowUser(Users[i].ID, Users[i].Fname + " " + Users[i].Lname, Users[i].Email, Users[i].Balance, Users[i].block);
        }
    }
}
function Block(element) {
    $.ajax({
        type: 'POST',
        url: '/BlockUser?id=' + element.id,
        success: function (data) {
            element.innerHTML = "UnBlock"
            element.setAttribute("class", "btn btn-success");
            element.setAttribute("onclick", "UnBlock(this)");

        }
    });

}
function UnBlock(element) {
    $.ajax({
        type: 'POST',
        url: '/UnBlockUser?id=' + element.id,
        success: function (data) {
            element.innerHTML = "Block"
            element.setAttribute("class", "btn btn-info");
            element.setAttribute("onclick", "Block(this)");
        }
    });

}
function DeleteUser(element) {
    if (confirm("are you sure you want to Delete The User?")) {
        $.ajax({
            type: 'Post',
            url: '/DeleteUser?User_ID=' + element.id,
            success: function (data) {
                document.getElementById("TD" + element.id).remove();
            }
        });
    }

}
function Information(element) {
    $.ajax({
        type: 'GET',
        url: '/SearchUser?User_ID=' + element.id,
        success: function (data) {
            ClearAll();
            var parent = document.getElementById("container");
            var Alert = document.createElement("div");
            Alert.setAttribute("id", "Balance_Alert");
            var Information_Div = document.createElement("div");
            Information_Div.setAttribute("class", "span3 well");
            var Center = document.createElement("center");
            Center.setAttribute("id", "center_");

            var Image = document.createElement("img");
            Image.setAttribute("src", "Content/UsersImage/" + data.User_Image);

            Image.setAttribute("name", "aboutme");
            Image.setAttribute("width", "140");
            Image.setAttribute("height", "140");
            Image.setAttribute("class", "img-circle");
            var h3 = document.createElement("h3");
            h3.innerHTML = data.Fname + " " + data.Lname;
            var em = document.createElement("em");
            em.setAttribute("id", "balance_show");
            em.setAttribute("name", data.Balance);
            em.innerHTML = "Balance Is <b>" + data.Balance + " LE</b>";
            var Balance_Button = document.createElement("button");
            Balance_Button.setAttribute("id", data.ID);
            Balance_Button.setAttribute("class", "btn btn-info");
            Balance_Button.setAttribute("onclick", "ChargeBalance(this)");
            Balance_Button.innerHTML = "Charge " + data.Fname + "'s Balance";

            Center.appendChild(Alert);
            Center.appendChild(Image);
            Center.appendChild(h3);
            Center.appendChild(em);
            Center.appendChild(document.createElement("br"));
            Center.appendChild(Balance_Button);
            Information_Div.appendChild(Center);
            parent.appendChild(Information_Div);
        }
    });
}
function ChargeBalance(element) {
    var BalanceText = document.createElement("input");
    BalanceText.setAttribute("id", "balance_text");
    BalanceText.setAttribute("type", "number");
    BalanceText.innerHTML = "Test Text";
    element.parentNode.insertBefore(BalanceText, element);
    element.parentNode.insertBefore(document.createElement("br"), element);
    element.innerHTML = "Submit Charge Request";
    element.setAttribute("class", "btn btn-success");
    element.setAttribute("onclick", "submitBalance(" + element.id + ")");
}
function submitBalance(user_id) {
    var ChargeValue = document.getElementById("balance_text").value;
    var Alter = document.getElementById("Balance_Alert");
    if (ChargeValue < 100000 && ChargeValue) {
        $.ajax({
            type: 'POST',
            url: '/ChargeBalance?User_ID=' + user_id + '&ChargeValue=' + ChargeValue,
            success: function (data) {
                var Balance_Show = document.getElementById("balance_show");
                var Total = parseInt(Balance_Show.getAttribute("name")) + parseInt(ChargeValue);
                Balance_Show.innerHTML = "Balance Is <b>" + Total + " LE</b>";
                Alter.setAttribute("class", "alert alert-success");
                Alter.innerHTML = "Charging  Done Successfully! Please check your mails!!";
                setTimeout(function () {
                    window.location = 'AdminPanel';
                }, 3000);
            }
        });
    }
    else {
        Alter.setAttribute("class", "alert alert-danger");
        Alter.innerHTML = "Invalid charging value Please make sure the charging value is less than 100000LE and Not Empty!!";
    }
}