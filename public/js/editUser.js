var userId = 0;
//doc ready
$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('id');

    $.ajax({
        url: "/api/user-editprofile" + userId,
        method: "get"
    }).done(
        function (data) {
            $('#name').val(data.full_name);
            $('#dob').val(data.dob);
            $('#email').val(data.email);
            $('#phone').val(data.phone);
            $('#address').val(data.address);
            $('#postal_code').val(data.postal_code);
            $('#password').val(data.password);
            $('#reconfirmpassword').val(data.reconfirmpassword);
        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );
    


});

//editevent anytime upon user interaction. form submission
function editCustomer() {
    var user = {
        _id: userId,
        full_name: $("#name").val(),
        dob: $("#dob").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        address: $("#address").val(),
        postal_code: $("#postal_code").val(),
        password: $("#password").val(),
        reconfirmpassword: $("#reconfirmpassword").val()
    };
    $.ajax(
        {
            url: '/api/user-editprofile',
            method: 'put',
            data: user //send to server
        }
    ).done(
        function (data) {
            alert("accout updated!");
        }
    ).fail(
        function (err) {
           console.log(err.responseText);
        }
    );
    return false;
}
