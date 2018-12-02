//Local Storage: Cart Data
var cartData = JSON.parse(sessionStorage.getItem('cart'));

var validCart = JSON.parse(sessionStorage.getItem('cart'));

//Handlebars Variables
var source = $("#confirmTemplate").html();
var template = Handlebars.compile(source);
var parentDiv = $("#confirmationList");

console.log("validCart :" + validCart);

// No Items Message + confirmation button
if(cartData == null | cartData.length == 0){
    $("#noItems").css('visibility','visible'); 
    $("#itemPresent").css('visibility','hidden');

}
else{
    $("#noItems").css('visibility','hidden'); 
    $("#itemPresent").css('visibility','visible');
    //Prints out current cart list
    for (var i = 0; i < cartData.length; i++){
        var curData = cartData[i];
        var curHtml = template(curData);
        parentDiv.append(curHtml);
    }
}

/*Removes Selected Item and hides no items text(If Applicable)*/
$("#confirmationList").on("click",'.removeItem',function(){
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
    $(this).parent('div').parent('td').parent('tr').remove();
    
    // No Items are in the cart Message + Removes confirmation button and instructions
    if(cartItem.length == 0){
        $("#noItems").css('visibility','visible'); 
        $("#itemPresent").remove();
    } 
    
});

/* Change quantity of item (Still in progress) */
$("#confirmation").on("click",'.changeQuant',function(){
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

$("#confirm").on("click",'#conf',function(){

    var instruc = [];
    console.log("Hello");

    var newInstruc = {
        'instra': $('#instructions').val(),
    };

    instruc.push(newInstruc);

    // Updating Storage
    sessionStorage.setItem('instr',JSON.stringify(instruc));

});

/* Removes Selected Item and hides no items text(If Applicable) */
$("#itemPresent").on("click",'.deleteCart',function(){
    var cartItem = JSON.parse(sessionStorage.getItem('cart'));
    var legacyList = JSON.parse(sessionStorage.getItem('orders')) || [];  
    var order = "#C120, ";
    var currentDate = new Date();
    //Looks for item in the storage and updates its quantity value
    for(var i = 0; i < cartItem.length; i++){    
        var quant = cartItem[i].quantity;
        var dishName = cartItem[i].dishname;
        
       
            order += dishName + "Qty(" + quant + "), ";
        

    }
    order +=  " \n(" + currentDate +")";
    prevOrder = {'prevOrder':order};
    legacyList.push(prevOrder);
    sessionStorage.removeItem('cart');
    sessionStorage.setItem('orders',JSON.stringify(legacyList));
});

/* @@@@@ Modal Window @@@@@ */
$("#recentOrders").on("click", function () {
	$(".modal").css('display', 'block');
});

$(".close").on("click", function () {
	$(".modal").css('display', 'none')
});

// When the user clicks anywhere outside of the modal, close it
$(window).click(function (event) {
	if (event.target == $(".modal")) {
		$(".modal").css("display", "none");
	}
});


/* @@@@@ Modal Content @@@@@ */
//Local Storage: Cart Data
var cartData = JSON.parse(sessionStorage.getItem('orders'));

var validCart = JSON.parse(sessionStorage.getItem('orders'));

//Handlebars Variables
var sourceRecentOrder = $("#recentOrderTemplate").html();
var templateRecentOrder = Handlebars.compile(sourceRecentOrder);
var parentCartDiv = $("#recentOrderItems");


// No Items Message + confirmation button   
if (validCart != null) {
	$("#noRecentOrder").css('visibility', 'hidden');

	//Prints out current cart list
	for (var i = cartData.length - 1; i >= 0; i--) {
		var curOrder = cartData[i].prevOrder.split("");

		var curData = cartData[i];
		var curHtml = templateRecentOrder(curData);
		parentCartDiv.append(curHtml);
	}

} else {
	$("#noRecentOrder").css('visibility', 'visible');
}

$("#recentOrderItems").find("tr").eq(1).css("color", "red");

/*Resetting Cart*/
