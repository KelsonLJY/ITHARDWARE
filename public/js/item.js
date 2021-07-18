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

       

         
            tmp.qty = 1;
            
            /**  If items don't have in local storage.
             * Push current item into storageItems array
             * SET storageItems in local storage
             */  
            if(!storageItems){
                storageItems = [];
                storageItems.push(tmp);
                localStorage.setItem('items', JSON.stringify(storageItems));
            }else{
                /**  IF user  items already existed in local storage
                 *   Find    Item 
                 *   IF item is already existed in local storage
                 *      ADD 1 QTY and UPDATE QTY
                 *   ELSE
                 *      PUSH current item into storageItems array
                 */  
                 if(storageItems.length > 0){
                    let itemIndex = storageItems.findIndex(e=> e.id == item.id);
                    if(itemIndex > -1){
                        tmp.qty = parseInt(storageItems[itemIndex].qty) + 1;
                   
                        storageItems[itemIndex] = tmp;
                        localStorage.setItem('items', JSON.stringify(storageItems));

                    }else{
                        storageItems.push(tmp);
                        localStorage.setItem('items', JSON.stringify(storageItems));
                    }
                }
            }

            
        }
    },
    mounted(){
        axios.get('/api/get-items').then(({data}) => {
            this.db_items = data.items;
            this.items = data.items;
        }).catch(error => {
          
        })
    }
})