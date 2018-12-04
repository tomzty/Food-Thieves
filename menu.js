//Local Storage: Cart Data
var cartData = JSON.parse(sessionStorage.getItem('cart')) || [];

//List of Items in Cart
var colCount = $('#cartList').children('td').length;

//HandleBar Variables
var source = $("#cartTemplate").html();
var template = Handlebars.compile(source);
var parentDiv = $("#cartList");

if(cartData == null | cartData.length == 0){
	$("#checkout").css("visibility", "hidden");
	$("#noItems").css("visibility", "visible");
	console.log("ok1")
}
else{
	console.log("ok2")
	$("#checkout").css("visibility", "visible");
	$("#noItems").css("visibility", "hidden");
}

//Prints out current cart list
for (var i = 0; i < cartData.length; i++) {
	var curData = cartData[i];
	var curHtml = template(curData);
	parentDiv.append(curHtml);
}

/* Adds Item to cart and appends it to html */
$("#menu").on("click", '.addItem', function () {
	//Retrieving exisiting cart(If it exists)
	var cart = JSON.parse(sessionStorage.getItem('cart')) || [];

	// Getting Name of Dish, Quantity Selected, and Img of Dish
	var dish = $(this).siblings('div').children('input').attr("name");
	var quant = $(this).siblings('div').children('input').val();
	var img = "../Images/" + dish + ".jpg";


	// Checking if Item already exist in cart
	for (var i = 0; i < cart.length; i++) {
		if (cart[i].dishname == $(this).attr("name")) {
			var itemQuant = parseInt(cart[i].quantity) + parseInt(quant);
			cart[i].quantity = itemQuant;

			//Updating Quantity and cancels function
			sessionStorage.setItem('cart', JSON.stringify(cart));
			return;
		}
	}
	console.log("test break");
	//Creating new Object
	var newItem = {
		'dishname': dish,
		'dishimg': img,
		'quantity': quant
	};

	//Added new item to cart and saving to local storage
	cart.push(newItem);
	sessionStorage.setItem('cart', JSON.stringify(cart));

	//Adding Item to current cart list
	var source = $("#cartTemplate").html();
	var template = Handlebars.compile(source);

	var parentDiv = $("#cartList");
	var html = template(cartData);
	parentDiv.append(html)

	if (cart.length > 0) {
		$("#noItems").css('visibility', 'hidden');
		$("#checkout").css("visibility", "visible");
	}
	console.log("cart Length = " + cart.length);
	console.log("cartData Length = " + cartData.length);
});

/* Removes Selected Item and hides no items text(If Applicable) */
$("#cartList").on("click", '.removeItem', function () {
	// Retrieving cart
	var cartItem = JSON.parse(sessionStorage.getItem('cart'));

	//Looks for item in the storage removes it
	for (var i = 0; i < cartItem.length; i++) {
		if (cartItem[i].dishname == $(this).attr("name")) {
			console.log("Before: " + cartItem.length);
			cartItem.splice(i, 1);
			break;
		}
	}

	// Updating Storage
	sessionStorage.setItem('cart', JSON.stringify(cartItem));
	$(this).parent('td').parent('tr').remove();

	console.log("After: " + cartItem.length);

	// No Items are in the cart Message
	if (cartItem.length == 0) {
		$("#noItems").css('visibility', 'visible');
		$("#checkout").css("visibility", "hidden");
	}
});

/* Change quantity of item (Still in progress) */
$('#cart').on("click", ".changeQuant", function () {
	// Retrieving Cart and current input value
	var cartItem = JSON.parse(sessionStorage.getItem('cart'));
	var newQuant = $(this).siblings('div').children('input').val();

	for (var i = 0; i < cartItem.length; i++) {
		if (cartItem[i].dishname == $(this).attr("name")) {
			cartItem[i].quantity = newQuant;
			console.log("hello");
			break;
		}
	}

	//Updating Storage
	sessionStorage.setItem('cart', JSON.stringify(cartItem));
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
	$("#itemPresent").css('visibility', 'hidden');
}

$("#recentOrderItems").find("tr").eq(1).css("color", "red");


/* @@@@@ ModalAlert Window @@@@@ */
$("#restrictions").on("click", function () {
	$(".modalAlert").css('display', 'block');
});

$(".close").on("click", function () {
	$(".modalAlert").css('display', 'none')
});

// When the user clicks anywhere outside of the modal, close it
$(window).click(function (event) {
	if (event.target == $(".modalAlert")) {
		$(".modalAlert").css("display", "none");
	}
});


/* Highlights ingredients in red */
function tagChecker(){
	var tagData = JSON.parse(sessionStorage.getItem('alertTags')) || [];

	if(tagData == null || tagData.length == 0 ){
		console.log("No Tags Available");
	}
	else{
		$(".tagCheck").each(function(menu){
			var menuL =  "#menu" + (menu+1); 
			var ingredients = $(menuL).text().split(",");
	
			//console.log("trimming: " + $.trim(ingredients) );
			
			
			for(var i =0; i<ingredients.length;i++){
				var currIngre = $.trim(ingredients[i]);
				
				//console.log("Ingrediant:" + ingredients[i]);

				for(var j = 0; j<tagData.length; j++){
					var tagsChecked ='';
					var currTag = tagData[j].aTag;
					if( currIngre.toLowerCase() == currTag.toLowerCase() ){
						ingredients[i]= " <mark style='background-color:#ff5959'>"+ currIngre + "</mark>";	
					}
				}
			}
			
			$(menuL).html(ingredients.join(","));
			
		});
		
	}
}
tagChecker();

//Add Tag
$('.modalAlert').on("click", ".addTag", function () {
	var tagData = JSON.parse(sessionStorage.getItem('alertTags')) || [];
	var newTag = $(this).siblings('input').val();
	var tagExist = false;

	//Checks to see if there is an existing tag
	for(var i = 0; i< tagData.length; i++){
		if(newTag.toLowerCase() == tagData[i].aTag.toLowerCase() ){
			tagExist = true;
			console.log("tag Exists already")
		}
	}
	
	//Adds new Tag to list
	if(tagExist == false){
		//Check for empty values and spaces
		if( newTag === null || newTag.match(/^ *$/) !== null){
			console.log("Value is empty")		
		}
		else{
			var alertTag={"aTag":newTag} 	
			tagData.push(alertTag);
		}
		sessionStorage.setItem('alertTags',JSON.stringify(tagData));

		//Adding Item to current cart list
		var sourceTagAlert = $("#alertTagTemplate").html();
		var templateTagAlert = Handlebars.compile(sourceTagAlert);
		var parentDiv = $("#curTags");

		var html = templateTagAlert(tagData[tagData.length-1]);
		parentDiv.append(html);
		tagChecker();

	}
});

//Remove Tag
$('.modalAlert').on("click", ".removeTag", function () {
	var tagData = JSON.parse(sessionStorage.getItem('alertTags'));
 
   //Looks for item in the storage removes it
   for(var i = 0; i < tagData.length; i++){
	   if(tagData[i].aTag == $(this).attr("name")){
		   tagData.splice(i,1);
		   break;
	   }
   }
   
   // Updating Storage
   sessionStorage.setItem('alertTags',JSON.stringify(tagData));
   $(this).parent('div').remove();
   tagChecker();
});

// Prints out current List
var tagData = JSON.parse(sessionStorage.getItem('alertTags'));
if(tagData == null || tagData.length == 0 ){
	console.log("Invalid Cart");
}
else{
	//Adding previous TagList
	var sourceTagAlert = $("#alertTagTemplate").html();
	var templateTagAlert = Handlebars.compile(sourceTagAlert);
	var parentDiv = $("#curTags");

	for(var i =0; i<tagData.length;i++){
		var currentTag = tagData[i]
		var html = templateTagAlert(currentTag);
		parentDiv.append(html)
	}
}

