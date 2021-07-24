$(document).ready(function () {
    $(".proceed").hide();
});
function login() {
    var credentials = {
        name: $("#email").val(),
        password: $("#password").val()
    }
    $.ajax({
        url: "/Login",
        method: "post",
        data: credentials
    })
        .done(function (data) {
            $(".statusMessage").text(data.message);
            //stores the token returned from the server, if successful login
            sessionStorage.authToken = data.token;
            $(".proceed").show();
        })
        .fail(function (err) {
            $(".statusMessage").text(err.responseText);
        })
    return false;
}