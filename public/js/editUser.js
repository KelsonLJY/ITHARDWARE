var userId = 0;
//doc ready
$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('user_id');

    $.ajax({
        url: "/api/user-editprofile",
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
        full_name: $("#name").val(),
        dob: $("#dob").val(),
        phone: $("#phone").val(),
        address: $("#address").val(),
        postal_code: $("#postal_code").val()
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
