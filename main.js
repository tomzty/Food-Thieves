console.log('hello')
function goToNewPage(){
  var e = document.getElementById("dropDownId");
  var choice = e.value
  console.log(choice)
  window.open(choice)
}

