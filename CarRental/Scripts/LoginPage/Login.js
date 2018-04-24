var Counter=0;
$(document).ready(function () {
    $("#LoginCheck").click(function()
    {
        Counter++;
        $.ajax({
            type: 'POST',
        url: '/LoginCheck?mail=' + $("#login-username").val() + '&pass=' +$("#login-password").val(),
        success: function (data) {
                if (data == 'true')
                {
                    window.location = 'HomePage';
                }
                else if(data=='Block')
                {
                    var alert_ = document.getElementById("alert");
                    alert_.setAttribute("class", "alert alert-danger");
                    alert_.innerHTML = "Blocked From Admin";
                }
                else {
                    var alert_ = document.getElementById("alert");
                    alert_.setAttribute("class", "alert alert-danger");
                    alert_.innerHTML = "Wrong Mail Or Password ("+Counter+")";
                }
            }
        });
    });

});
function ValidateData() {
    var Password = $("#Password").val();
    var C_Password = $("#Confirm_Password").val();
    if(Password!=C_Password)
    {
        alert("Password not math the confirm Password");
        return false;
    }
    $.ajax({
        type: 'POST',
        url: '/CheckMailExists?Mail=' + document.getElementById("Email").value,
        success: function (data) {
            alert(data)
            if (data == 'false')
                return true;
            else
            {
                alert("Email Exists");
                return false;
            }
        }
    });
}