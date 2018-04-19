$(document).ready(function () {
    $("#ChangePassword").click(function () {
        $("#D1").removeAttr("style").hide();
        $("#D2").removeAttr("style").hide();
        $("#D3").removeAttr("style").hide();
        $("#D4").removeAttr("style").hide();

       

        $("#D5").show();
        $("#D6").show();
        $("#D7").show();

        $("#Update").removeAttr("style").hide();
        $("#UpdateImage").removeAttr("style").hide();
        $('#ChangePassword').attr('onclick', 'ChangePassword()')


    });
    $("#UpdateImage").click(function () {
        $("#D1").hide();
        $("#D2").hide();
        $("#D3").hide();
        $("#D4").hide();
        $("#D5").hide();
        $("#D6").hide();
        $("#D7").hide();
        $("#D8").show();
        $("#Update").removeAttr("style").hide();
        $("#ChangePassword").removeAttr("style").hide();
        $("#UpdateImage").removeAttr("style").hide();
        $("#SubmitImage").removeAttr("style").show();

    });
    $("#Update").click(function () {
        var Fname = $("#Inp1").val();
        var Lname = $("#Inp2").val();
        var Email = $("#Inp3").val();
        var Phone = $("#Inp4").val();
        var Flag = 0;
        $("#D1").attr("class", "form-group ");
        $("#D2").attr("class", "form-group ");
        $("#D3").attr("class", "form-group ");
        $("#D4").attr("class", "form-group ");
        $('#Error_FNAME').hide();
        $('#Error_LNAME').hide();
        $('#Error_EMAIL').hide();
        $('#Error_PHONE').hide();


        if (!validateName(Fname))
        {
            $("#D1").attr("class", "form-group has-error");
            $("#Inp1").attr("class", "form-control is-invalid");
            $('#Error_FNAME').show();
            Flag = 1;
        }
       if (!validateName(Lname)) {
            $("#D2").attr("class", "form-group has-error");
            $("#Inp2").attr("class", "form-control is-invalid");
            $('#Error_LNAME').show();
            Flag = 1;
        }
       if (!validateEmail(Email)) {
            $("#D3").attr("class", "form-group has-error");
            $("#Inp3").attr("class", "form-control is-invalid");
            $('#Error_EMAIL').show();
            Flag = 1
       }
       if (!validatePhone(Phone)) {
           $("#D4").attr("class", "form-group has-error");
           $("#Inp4").attr("class", "form-control is-invalid");
           $('#Error_PHONE').show();
           Flag = 1
       }
        if(Flag==0)
        {
            $.ajax({
                type: 'POST',
                url: '/EditProfile?Email=' + Email + "&Phone=" + Phone + "&Fname=" + Fname + "&Lname=" + Lname,
                success: function (data) {
                    if (data == 'true')
                        alert("Edit Done Successfully!");
                    else
                        alert("Invalid Data");
                }
            });
        }
      
    });

});
function ChangePassword() {
    var Old = $("#Inp5").val();
    var New = $("#Inp6").val();
    var Conf = $("#Inp7").val();
    if (New == Conf) {
        $.ajax({
            type: 'POST',
            url: '/ChangePassword?OldPassword=' + Old + "&NewPassword=" + New + "",
            success: function (data) {
                alert(data);
            }
        });
    }
    else
        alert("New Password Not Match Confirm Password");

}

function validateName(name) {
    return /^[a-zA-Z ]+$/.test(name);
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validatePhone(phone) {
    return (/^[0-9]{11}$/.test(phone))
}
function UpdateImage() {
    var Image = $("#Inp8").val();
    if (checkURL(Image))
        return true;
    else
        alert("Please insert an image!!");
    return false;

}
function checkURL(url) {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}