$(document).ready(function () {
    $.ajax({
        url: "/api/user-profile", 
        method: "get"
    })
        .done(
            function (data) {
                // console.log(data)
                // data.forEach(function(users) {

                /**
                 * Can pass parameter like this
                 *  let url = `/edit-user?user_id=${data._id}`;
                 */
                    let url = `/edit-user`;
                    $(".accounts").append(`
                    <article>
                       <h2><a href="${url}">${data.full_name}</a></h2>
                         <div>
                            dob: ${data.dob}<br>
                            email: ${data.email}<br>
                            phone: ${data.phone}<br>
                            address: ${data.address}<br>
                            postal_code: ${data.postal_code}<br>
                        </div>
                    </article>
                    `);
                // })
               
            }
        )
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )

        
})

