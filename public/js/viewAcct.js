$(document).ready(function () {
    $.ajax({
        url: "/users", 
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function(users) {
                    $(".accounts").append(`
                    <article>
                       <h2><a href="/edit?id=${users._id}">${users.full_name}</a></h2>
                         <div>
                            email: ${users.email}<br>
                            address: ${users.address}<br>
                            phone: ${users.phone}<br>
                            address: ${users.address}<br>
                            dob: ${users.dob}<br>
                            postal_code: ${users.postal_code}<br>
                        </div>
                    </article>
                    `);
                })
            }
        )
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )

        
})

