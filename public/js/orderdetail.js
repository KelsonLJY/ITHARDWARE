
Vue.use(VeeValidate);

var myObject = new Vue({
    el: '#cart',
    data: {
        order_id : null,
        items : [],
        order : {
            delivery_address: null,
            delivery_date: new Date,
            delivery_fee: 0,
            order_date: new Date,
            status: "Pending",
            total: 0,
            userId:  null,
            _id: null,
            details :[]

        }
    },
    methods:{          
        formatDate(val){
            return moment(val).format('DD/MM/YYYY');
        }     ,
        getOrders(){
            axios.get('/api/get-order-detail', {
                params: {
                    order_id : this.order_id
                }
            }).then(({data}) => {
                if(data){
                    this.order = data;
                }else{
                    window.location.href = window.location.origin + '/orders';
                }
                
            }).catch(error => {
                window.location.href = window.location.origin + '/orders';
            })
        }
      
    },
    mounted(){
        var a = moment('7/11/2010','M/D/YYYY');
        var queryString = location.search
        let params = new URLSearchParams(queryString)
        this.order_id = params.get("order_id");
        this.getOrders();
    }
})