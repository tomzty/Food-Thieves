//Local Storage: Cart Data
var cartData = JSON.parse(sessionStorage.getItem('cart'));

var validCart = JSON.parse(sessionStorage.getItem('cart'));

//Handlebars Variables
var source = $("#confirmTemplate").html();
var template = Handlebars.compile(source);
var parentDiv = $("#confirmation");


// No Items Message + confirmation button
if(validCart != null){
    $("#noItems").css('visibility','hidden'); 

    //Prints out current cart list
    for (var i = 0; i < cartData.length; i++){
    var curData = cartData[i];
    var curHtml = template(curData);
    parentDiv.append(curHtml);
}

}
else{
    $("#noItems").css('visibility','visible'); 
    $("#itemPresent").css('visibility','hidden');
}

/*Removes Selected Item and hides no items text(If Applicable)*/
$("#confirmation").on("click",'.removeItem',function(){
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