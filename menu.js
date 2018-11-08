//Local Storage: Cart Data
var cartData = JSON.parse(sessionStorage.getItem('cart') ) || [];

//List of Items in Cart
var colCount = $('#cartList').children('td').length; 

//HandleBar Variables
var source = $("#cartTemplate").html();
var template = Handlebars.compile(source);
var parentDiv = $("#cartList");

// No Items Message
if(cartData.length == 0){
    $("#noItems").css('visibility','visible');
} 
else{
    $("#noItems").css('visibility','hidden');
}

//Prints out current cart list
for (var i = 0; i < cartData.length; i++){
    var curData = cartData[i];
    var curHtml = template(curData);
    parentDiv.append(curHtml);
}

/* Adds Item to cart and appends it to html */
$("#menu").on("click",'.addItem',function(){
    //Retrieving exisiting cart(If it exists)
    var cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    
    // Getting Name of Dish, Quantity Selected, and Img of Dish
    var dish = $(this).siblings('div').children('input').attr("name");
    var quant = $(this).siblings('div').children('input').val();
    var img = "../Images/" + dish + ".jpg";
    

    // Checking if Item already exist in cart
    for(var i = 0; i < cart.length; i++){
        if(cart[i].dishname == $(this).attr("name")){
            var itemQuant = parseInt(cart[i].quantity) + parseInt(quant);
            cart[i].quantity = itemQuant;
            
            //Updating Quantity and cancels function
            sessionStorage.setItem('cart',JSON.stringify(cart));
            return;
        }
    }
    console.log("test break");
    //Creating new Object
    var newItem = {'dishname':dish,
                'dishimg':img,'quantity':quant};
    
    //Added new item to cart and saving to local storage
    cart.push(newItem);
    sessionStorage.setItem('cart',JSON.stringify(cart));
    
    //Adding Item to current cart list
    var source = $("#cartTemplate").html();
    var template = Handlebars.compile(source);

    var parentDiv = $("#cartList");
    var html = template(cartData);
    parentDiv.append(html)     

    if(cart.length > 0){
        $("#noItems").css('visibility','hidden');
    }
    console.log("cart Length = " + cart.length);
    console.log("cartData Length = " + cartData.length);
});

/* Removes Selected Item and hides no items text(If Applicable) */
$("#cartList").on("click",'.removeItem',function(){
    // Retrieving cart
    var cartItem = JSON.parse(sessionStorage.getItem('cart'));
    
    //Looks for item in the storage removes it
    for(var i = 0; i < cartItem.length; i++){
        if(cartItem[i].dishname == $(this).attr("name")){
            console.log("Before: " + cartItem.length);
            cartItem.splice(i,1);
            break;
        }
    }
    
    // Updating Storage
    sessionStorage.setItem('cart',JSON.stringify(cartItem));
    $(this).parent('td').remove();

    console.log("After: " + cartItem.length);

    // No Items are in the cart Message
    if(cartItem.length == 0){
        $("#noItems").css('visibility','visible');      
    } 
});

/* Change quantity of item (Still in progress) */
$("#cart").on("click",'.changeQuant',function(){
    // Retrieving Cart and current input value
    var cartItem = JSON.parse(sessionStorage.getItem('cart'));  
    var newQuant = $(this).siblings('div').children('input').val();
    
    //Looks for item in the storage and updates its quantity value
    for(var i = 0; i < cartItem.length; i++){
        if(cartItem[i].dishname == $(this).attr("name")){
            cartItem[i].quantity = newQuant;
            break;
        }
    }

    //Updating Storage
    sessionStorage.setItem('cart',JSON.stringify(cartItem));
});




/* Original Cart Template
<td> 
                        <h3 style="text-align: center">Dish 1</h3>
                        <img style="margin-left:auto;margin-right:auto" src="../Images/vietnamese-pho.jpg" alt="burger" height="100px" width="150px">
                        <form method="POST" action="">
                                <div>
                                    <input type="number" name="vietnamese-pho" class="vietnamese-pho" min="1" value="1">
                                </div>
                                <button style="display:inline-block" class="Button changeQuant">Change Quantity</button>
                            </form>
                        <button style="text-align:center" class="Button removeItem">Remove Item</button>
                    </td>   

*/
