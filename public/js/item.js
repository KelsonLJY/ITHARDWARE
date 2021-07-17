Vue.use(VeeValidate);
var myObject = new Vue({
    el: '#app',
    data: {
        message: null,
            
        items : [],
        userId : null,
        search_text : null,
        db_items : []
    },
    methods:{      
        handleKeyUp(){
            this.message = null;
            if(this.search_text == null){ this.items = JSON.parse(JSON.stringify(db_items))}
            let items = this.db_items.filter(e => e.descriptions.toLowerCase().indexOf(this.search_text.toLowerCase()) > -1);

            if(items.length > 0){

                this.items = JSON.parse(JSON.stringify(items));

            }else{
                this.message = "No Item!!!!"
            }
        },
        onClickedAddToCard(item){
            // Clone Object
            let tmp = Object.assign({}, item);
            

            // Get Localstorage Items
            let storageItems = JSON.parse(localStorage.getItem('items'));

            // Find & Get User Item
            let userItems = storageItems.filter(e => e.user_id == this.userId);

         
            tmp.qty = 1;
            tmp.user_id = this.userId;
            /**  If user items don't have in local storage.
             * Push current item into userItems array
             * SET userItems in local storage
             */  
            if(!userItems){
                userItems.push(tmp);
                localStorage.setItem('items', JSON.stringify(items));
            }

            /**  IF user  items already existed in local storage
             *   Find    Item 
             *   IF item is already existed in local storage
             *      ADD 1 QTY and UPDATE QTY
             *   ELSE
             *      PUSH current item into userItems array
             */  
            if(userItems.length > 0){
                let itemIndex = userItems.findIndex(e=> e.id == item.id);
                if(itemIndex > -1){
                    tmp.qty = parseInt(userItems[itemIndex].qty) + 1;
                   
                    userItems[itemIndex] = tmp;
                    localStorage.setItem('items', JSON.stringify(userItems));

                }else{
                    userItems.push(tmp);
                    localStorage.setItem('items', JSON.stringify(userItems));
                }
            }
        }
    },
    mounted(){
        axios.get('/api/get-items').then(({data}) => {
            this.db_items = data.items;
            this.items = data.items;
            this.userId = data.user._id;
        }).catch(error => {
          
        })
    }
})