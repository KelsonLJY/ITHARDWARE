
Vue.use(VeeValidate);
var myObject = new Vue({
    el: '#cart',
    data: {
        orders : []
    },
    methods:{          
        formatDate(val){
            return moment(val).format('DD/MM/YYYY');
        }  , 
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