/* @@@@@ School Selection @@@@@ */
console.log('hello')

function goToNewPage() {
	var e = document.getElementById("dropDownId");
	var choice = e.value
	console.log(choice)
	window.open(choice)
}

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
});


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
