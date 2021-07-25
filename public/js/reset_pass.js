Vue.use(VeeValidate);
var myObject = new Vue({
    el: '#app',
    data: {
        message: null,
            
        user : {
            email :  null,
            dob : null
        }
    },
    methods:{           
        onClickedReset(){
            
            this.$validator.validateAll().then(success => {
                if(success){
                    // localStorage.removeItem('items')
                    axios.post('/api/sent-reset-link', this.user).then(({data}) => {
                        window.location.href = window.location.origin + '/sent-reset-password';
                    }).catch(error => {
                        this.message = error.response.data.message;
                    })
                }
                    
            })
                
        }
    }
})