// delgetstei ajillah controller
var uiController = (function () {

})();

// sanhvvtei ajillah controller 
var financeController = (function () {

})();

// programmin holbogc controller
var appController = (function (uiController, financeControoller) {

    function addItem() {
        // oruulah ogogdliig delgetsees olj awna. 

        // olj awsan ogogdlvvde sanhvvgin controllert damjuulj tend hadgalna.s

        // olj awsan ogogdlvvde tohiroh hesegt n gargana.

        // tosowiig tootsoolno. 

        //etssiin vldegdel tootsoog delgetsnd gargana. 
    }

    document.querySelector(".add__btn").addEventListener("click", addItem)
    document.addEventListener("keypress", function (event) {
        // enter edr daraad awhad ajilna. daragdsan towc n event gdgeer orj irne. daragdsan towc bvr keykodetoi tvvger n barijn awdag bhnee.
        if (event.keyCode === 13 || event.which == 13) {
            // keycode bhgv vyd which n ymr c ylggv. 
            addItem()
        } else {
            alert("oor towc daragdla")
        }
    })
})(uiController, financeController);
