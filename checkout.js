//Local Storage: Cart Data
var cartData = JSON.parse(sessionStorage.getItem('cart'));
console.log(cartData);

//Handlebars Variables
var source = $("#confirmTemplate").html();
var template = Handlebars.compile(source);
var parentDiv = $("#confirmation");

//Prints out current cart list
for (var i = 0; i < cartData.length; i++){
    var curData = cartData[i];
    var curHtml = template(curData);
    parentDiv.append(curHtml);
}

/*Removes Selected Item and hides no items text(If Applicable)*/
$("#confirmation").on("click",'.removeItem',function(){
    $(this).parent('td').parent('tr').remove();
    console.log(colCount);
    if(colCount>1){
        $("#noItems").css('visibility','hidden');
    }
    else{
        $("#noItems").css('visibility','visible');
    }
});