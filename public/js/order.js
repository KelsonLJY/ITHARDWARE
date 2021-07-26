
Vue.use(VeeValidate);
var myObject = new Vue({
    el: '#cart',
    data: {
        orders : []
    },
    methods:{           
        getOrders(){
            axios.get('/api/get-orders').then(({data}) => {
                this.orders = data;
            }).catch(error => {

            })
        }
      
    },
    mounted(){
        this.getOrders();
    }
})