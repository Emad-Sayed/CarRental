var global=0;
$(document).ready(function () {
        $.ajax({
            type: 'POST',
            url: '/BarInfo',
            success: function (data) {
                $("#UserName").html("Logged as : <br><b>" + data.Fname + " " + data.Lname + "</b></br>Balance : <br><b>" + data.Balance + "LE</b></br>");
                if (data.Type.Type == "Admin")
                    document.getElementById("Dash").style.display = "inline";
            }
        });

        $("#AllCategory").click(function () {
            if (global == 0) {
                $.ajax({
                    type: 'GET',
                    url: '/GetCateogries',
                    success: function (data) {
                        for (var i = 0; i < data.length; i++) {
                            DrawPreferButton(data[i].ID, data[i].Name);
                        }
                    }
                });
                setTimeout(function () {
                    GetMyPrefers();
                },100);
            }
            else
                ClearCategoryDrawing();
        });

});
function GetMyPrefers()
{
    $.ajax({
        type: 'GET',
        url: '/GetMyPrefers',
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                document.getElementById(data[i].category.ID).checked = true;
            }
        }
    });
}
function DrawPreferButton(id,category)
{
    var Parent = document.getElementById("CategoryButton");
    var Label = document.createElement("label");

    Label.setAttribute("style", "width:150px;margin:5px");
    Label.setAttribute("for", "default");
    Label.setAttribute("class", "btn btn-info");
    Label.innerHTML = category;
    var Input = document.createElement("input");
    Input.setAttribute("Type", "checkbox");
    Input.setAttribute("id",id);
    Input.setAttribute("onclick", "CategoryChecked(this)");
    Input.setAttribute("class", "badgebox");
    var Span = document.createElement("span");
    Span.setAttribute("class", "badge");
    Span.innerHTML = "&check;";
    Label.appendChild(Input);
    Label.appendChild(Span);
    Parent.appendChild(Label);
    global = 1;
}
function CategoryChecked(element)
{
    if (element.checked == false) //Shal el 3lama
        NotPrefer(element);
    else
        Prefer(element);
}
function Prefer(element)
{
    $.ajax({
        type: 'GET',
        url: '/Prefer?Cat_ID='+element.id,
        success: function (data) {
        }
    });
}
function NotPrefer(element)
{
    $.ajax({
        type: 'GET',
        url: '/NotPrefer?Cat_ID=' + element.id,
        success: function (data) {
        }
    });
}
function ClearCategoryDrawing() {
    var parent = document.getElementById("CategoryButton");
    while (parent.hasChildNodes()) {
        parent.removeChild(parent.lastChild);
    }
    global = 0;
}
/* <div class="container"  style="margin-bottom:20px">
                <div class="row text-center">
                    <label style="width:150px" for="default" class="btn btn-default">Success <input onclick="CategoryChecked(this)" type="checkbox" id="default" class="badgebox"><span class="badge">&check;</span></label>
                </div>
            </div>
*/
