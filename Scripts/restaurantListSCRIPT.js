$(function() {
    var restaurantTableTemplate = $("#address-template").html()

    var compiledTemplate = Handlebars.compile(restaurantTableTemplate)

    // pass data to template
    var toHTML = compiledTemplate(restaurantData)

    // add compiled html into page
    $('.template-holder').html(toHTML)
    console.log(restaurantData)
})