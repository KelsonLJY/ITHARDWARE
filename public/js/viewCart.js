$(document).ready(function () {
    $.ajax({
        url: "/items",
        method: "get"
    })
    .done(function (data) {
        data.forEach(function (Items) {
            $(".itemslist").append(`<option value='${Items.menu}'>${Items.menu}</opt
    ion>`);
        })
    }).fail(function (err) {
        console.log(err.responseText);
    });
})
