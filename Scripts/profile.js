// init user selects new profile pic
document.getElementById("new-user-profile-pic").onchange = function () {
    if (this.files && this.files[0]) {
        var reader = new FileReader()
        reader.onload = function(e) {
            document.getElementById("current-picture").setAttribute('src', e.target.result)

        }
        reader.readAsDataURL(this.files[0])
    }
}