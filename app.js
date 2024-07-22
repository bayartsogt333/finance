// delgetstei ajillah controller
var uiController = (function () {
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn"
    }
    //gej ogsnoor css deer classin oorcllt orhd solihod amar onowctoin boldog.

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,  //buyu + ymu - ymu gdgiig valueaar n medjiin inc exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },
        //get ;input duudagdhad oruulsan ogogdlvvdg awnaa gsn vg. select deer bol valueaa zaagad ogoh heregtei. 
        getDOMstrings: function () {
            return DOMstrings;
        }
    }
})();

// sanhvvtei ajillah controller 
var financeController = (function () {
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    //4 ogogdl damjuuljihar neg objectd hiigd ogcvvl zvgeer. 
    var data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 1000,
            exp: 500
        }
    }
})();

// programmin holbogc controller
var appController = (function (uiController, financeControoller) {
    function addItem() {
        // 1. oruulah ogogdliig delgetsees olj awna. 
        console.log(uiController.getInput());


        // 2. olj awsan ogogdlvvde sanhvvgin controllert damjuulj tend hadgalna.s

        // 3. olj awsan ogogdlvvde tohiroh hesegt n gargana.

        // 4. tosowiig tootsoolno. 

        // 5. etssiin vldegdel tootsoog delgetsnd gargana. 
    }

    var setupEventListener = function () {
        var DOM = uiController.getDOMstrings();
        document.querySelector(DOM.addBtn).addEventListener("click", addItem)
        document.addEventListener("keypress", function (event) {
            // enter edr daraad awhad ajilna. daragdsan towc n event gdgeer orj irne. daragdsan towc bvr keykodetoi tvvger n barijn awdag bhnee.
            if (event.keyCode === 13 || event.which == 13) {
                // keycode bhgv vyd which n ymr c ylggv. 
                addItem()
            }
        })
    };

    return {
        init: function () {
            console.log("App start...");
            setupEventListener();
        }
    }

    //ingej bgan bid daldalj return hij functionoor handuul ilv zvger bhnee. 
})(uiController, financeController);


appController.init();
//buyu llistener edr maani ajillaj ehlvvleh gsn vg. 