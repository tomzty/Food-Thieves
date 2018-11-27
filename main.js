/* @@@@@ School Selection @@@@@ */
console.log('hello')
function goToNewPage(){
  var e = document.getElementById("dropDownId");
  var choice = e.value
  console.log(choice)
  window.open(choice)
}

/* @@@@@ Modal @@@@@ */
$("#recentOrders").on("click", function () {
  $(".modal").css('display', 'block');
});

$(".close").on("click", function () {
  $(".modal").css('display', 'none')
});

// When the user clicks anywhere outside of the modal, close it
$(window).click(function(event) {
  if (event.target == $(".modal")) {
      $(".modal").css("display","none");
  }
});


/* @@@@@ Modal Content @@@@@ */
var user = sessionStorage.getItem('user');
console.log(" test: " + sessionStorage.getItem('user'));
// Replaces placeholder name
if(user != null){
    $(".user").html('<a href="Views/profilePage.html">Profile</a>');
    console.log("hi");
}
else{
    $(".user").html('<a href="login.html">Log In</a>');
}

// Sends user to page based on option
var makePath = function(form) {
    form.action = document.getElementById('dropDownId').value;
};


//Local Storage: Cart Data
var cartData = JSON.parse(sessionStorage.getItem('orders'));

var validCart = JSON.parse(sessionStorage.getItem('orders'));

//Handlebars Variables
var source = $("#confirmTemplate").html();
var template = Handlebars.compile(source);
var parentDiv = $("#confirmation");


// No Items Message + confirmation button   
if(validCart != null){
    $("#noItems").css('visibility','hidden'); 

    //Prints out current cart list
    for (var i = 0; i < cartData.length; i++){
        var curOrder = cartData[i].prevOrder.split("");

        var curData = cartData[i];
        var curHtml = template(curData);
        parentDiv.append(curHtml);
}

}
else{
    $("#noItems").css('visibility','visible'); 
    $("#itemPresent").css('visibility','hidden');
}


