Vue.use(VeeValidate);
var myObject = new Vue({
    el: '#app',
    data: {
        message: null,
            
        user : {
            id : null,
            token : null,
            email :  null,
            dob : null
        }
    },
    methods:{           
        onClickedUpdatePassword(){
            var queryString = location.search
            let params = new URLSearchParams(queryString)
            // example of retrieving 'id' parameter
            this.user.id = params.get("id");
            this.user.token = params.get("token");
            this.$validator.validateAll().then(success => {
                if(success){
                    axios.post('/api/update-new-password', this.user).then(({data}) => {
                        window.location.href = window.location.origin + '/login';
                    }).catch(error => {
                        this.message = error.response.data.message;
                    })
                }
                    
            })
                
        }
    }
})