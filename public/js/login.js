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
                        window.location.href = window.location.origin;
                    }).catch(error => {
                        this.message = error.response.data.message;
                    })
                }
                    
            })
                
        }
    }
})