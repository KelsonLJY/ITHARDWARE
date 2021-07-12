$(document).ready(function () {
    $.ajax({
        url: "/users",
        method: "get"
    })
})
$(".addUser").click(function () {
    $(".addNewUser").show();
})