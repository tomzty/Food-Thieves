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
