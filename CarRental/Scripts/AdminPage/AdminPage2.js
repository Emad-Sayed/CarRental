$(document).ready(function () {
    $("#UsersTable").click(function () {
        alert("HERE");
       /* $.ajax({
            type: 'POST',
            url: '/LoginCheck?mail=' + $("#login-username").val() + '&pass=' + $("#login-password").val(),
            success: function (data) {
                if (data == 'true') {
                    window.location = 'HomePage';
                }
                else {
                    var alert_ = document.getElementById("alert");
                    alert_.setAttribute("class", "alert alert-danger");
                    alert_.innerHTML = "Wrong Mail Or Password";
                }
            }
        });*/
    });

});