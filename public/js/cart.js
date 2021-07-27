
Vue.use(VeeValidate);
var myObject = new Vue({
    el: '#cart',
    data: {
        items : [],
        payment_types : ['NETS', 'DEBIT'],
        order : {
            payment : "NETS",
            delivery_address : null
        },
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
        onClickedRemove(item){
            let itemIndex = this.items.findIndex(e => e.id == item.id);
            this.items.splice(itemIndex, 1);
            localStorage.setItem('items', JSON.stringify(this.items));
        },
        onClickedCheckout(){
            localStorage.setItem('items', JSON.stringify(this.items));
            axios.post('/api/validate-qty', {
                items : JSON.stringify(this.items)
            }).then(({data}) => {  
                  window.location.href = window.location.origin + '/delivery-info';
            }).catch(error => {
                // this.message = error.response.data.message;
               
                window.location.href = window.location.origin + '/checkout-failed';
            })
        },
        getUser(){
            axios.get('/api/user-editprofile').then(({data}) => {
                this.user = data;
            }).catch(error => {

            })
        },
        onClickedPlaceOrder(){
            this.$validator.validateAll().then(success => {
                if(success){
                    
                    axios.post('/api/confirm-order', {
                        total : this.total,
                        items : JSON.stringify(this.items)
                    }).then(({data}) => {  
                        localStorage.removeItem('items')
                        window.location.href = window.location.origin + '/place-order';
                    }).catch(error => {
                        this.message = error.response.data.message;
                    })
                }
            });
        }
    },
    computed :{
        total(){
            let total = 0;
            this.items.forEach(e => {
                let qty = e.qty ? e.qty : 0;
                total += parseInt(e.price) * parseInt(qty)
            })
            return total;
        }
    },
    mounted(){
        // this.getUser();
        this.items = JSON.parse(localStorage.getItem('items'));
        // let delivery_date = new Date();
        // var numberOfDaysToAdd = 6;
        // delivery_date.setDate(delivery_date.getDate() + numberOfDaysToAdd); 

        // var dd = delivery_date.getDate();
        // var mm = delivery_date.getMonth() + 1;
        // var y = delivery_date.getFullYear();

        // this.order.delivery_date = dd + '/'+ mm + '/'+ y;
    }
})