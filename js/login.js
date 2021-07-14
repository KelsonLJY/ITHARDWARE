// $(document).ready(function () {
//     $(".proceed").hide();
// });
// function login() {
//     var credentials = {
//         name: $("#email").val(),
//         password: $("#password").val()
//     }
//     $.ajax({
//         url: "/Login",
//         method: "post",
//         data: credentials
//     })
//         .done(function (data) {
//             $(".statusMessage").text(data.message);
//             //stores the token returned from the server, if successful login
//             sessionStorage.authToken = data.token;
//             $(".proceed").show();
//         })
//         .fail(function (err) {
//             $(".statusMessage").text(err.responseText);
//         })
//     return false;
// }

Vue.use(VeeValidate);
var myObject = new Vue({
    el: '#app',
    data: {
        message: null,
            
        user : {
            email :  null,
            password : null
        }
    },
    methods:{           
        login(){
            this.$validator.validateAll().then(success => {
                if(success){
                    axios.post('/api/login', this.user).then(({data}) => {
                        console.log(window.location)
                        window.location.href = window.location.origin;
                    }).catch(error => {
                        this.message = error.response.data.message;
                    })
                }
                    
            })
                
        }
    }
})