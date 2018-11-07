//Local Storage: Cart Data
var cartData = JSON.parse(sessionStorage.getItem('cart') ) || [];

//List of Items in Cart
var colCount = $('tr #cartList').children('td').length; 

//HandleBar Variables
var source = $("#cartTemplate").html();
var template = Handlebars.compile(source);
var parentDiv = $("#cartList");

//Outputs current items in cart
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
    var quant = $(this).siblings('div').children('input').attr("value");
    var img = "../Images/" + dish + ".jpg";
    
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
});



    console.log(colCount);
/*Removes Selected Item and hides no items text(If Applicable)*/
$("#cartList").on("click",'.removeItem',function(){
    $(this).parent('td').remove();
    console.log(colCount);
    if(colCount>1){
        $("#noItems").css('visibility','hidden');
    }
    else{
        $("#noItems").css('visibility','visible');
    }
});

//Change quantity of item (Still in progress)
$("#cart").on("click",'.chageQuant',function(){
    $(this).closest('input').val();
});



/* 
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
