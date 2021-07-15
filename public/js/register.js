Vue.use(VeeValidate);
var myObject = new Vue({
    el: '#app',
    data: {
        message: null,
            
        user : {
            email :  null,
            password : null,
            confirm_password : null,
            phone : null,
            address : null,
            postal_code : null,
            dob : null,
            full_name : null
        }
    },
    methods:{           
        onClickedRegister(){
            this.$validator.validateAll().then(success => {
                if(success){
                    axios.post('/api/register', this.user).then(({data}) => {
                        window.location.href = window.location.origin + '/login';
                    }).catch(error => {
                        this.message = error.response.data.message;
                    })
                }
            })
        }
    }
})