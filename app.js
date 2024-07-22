// delgetstei ajillah controller
var uiController = (function () {
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
        incomeList: '.income__list',
        expList: ".expenses__list"
    }
    //gej ogsnoor css deer classin oorcllt orhd solihod amar onowctoin boldog.

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,  //buyu + ymu - ymu gdgiig valueaar n medjiin inc exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseInt(document.querySelector(DOMstrings.inputValue).value)
                //string orod irdeg. vvnhg int bolgjj nemj hasna gsn vg. 
            }
        },
        //get ;input duudagdhad oruulsan ogogdlvvdg awnaa gsn vg. select deer bol valueaa zaagad ogoh heregtei. 
        getDOMstrings: function () {
            return DOMstrings;
        },

        clearFields: function () {
            var fields = document.querySelectorAll(DOMstrings.inputDescription + ", " + DOMstrings.inputValue);
            //olon ym zereg selectleheer bol ingene ghde list bitsaj irdeg.

            //Convert List to Array slice ashiglan.
            var fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function (el, index, array) {
                el.value = "";
            });
            //massiwin elment bolgon eleer orj irne.

            fieldsArr[0].focus();
            //gewel cursoriig haana awaachu gdg code. focus ogjn gsn vg. 

        },

        addEventListenertItem: function (item, type) {
            // orlogo zarlaga ali bolohig aguulsan htmliig bvteene.
            var html, incDiv;
            if (type == "inc") {
                html = '<div class="item clearfix" id="income-%id%"><div div class="item__description" >$description$</div ><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div > ';
                incDiv = document.querySelector(DOMstrings.incomeList);
            } else {
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">$description$</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">$$huvi$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>';
                incDiv = document.querySelector(DOMstrings.expList);
            }
            //ter html dotroo orlogo zarlagiin utgudg replace ashhiglaj     oorcilj ogno.
            html = html.replace('%id%', item.id);
            html = html.replace("$description$", item.description);
            html = html.replace('%value%', item.value);

            //beltgesem htmlee dom ruu hiij ogno.
            incDiv.insertAdjacentHTML("beforeend", html);
            //ingel html nemeed biccij bnaa gsn vg.
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
    var calculateTotal = function (type) {
        var sum = 0;
        data.items[type].forEach(function (el) {
            sum += el.value;
        });
        data.totals[type] = sum;
    };

    //4 ogogdl damjuuljihar neg objectd hiigd ogcvvl zvgeer. 
    var data = {
        items: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        tusuv: 0,
        huvi: 0
    }

    return {
        tosovTootsooloh: function () {
            //niit orlogo zarlagiin niilber
            calculateTotal("inc");
            calculateTotal("exp");
            // toswiig shineer tootsoh.
            data.tusuv = data.totals.inc - data.totals.exp;
            // orlogo zarlagiin huwi. 
            data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);

        },
        tusviigAvah: function () {
            return {
                tusuv: data.tusuv,
                huvi: data.huvi,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
        }, //dotorh datag bvgdiig butsaaj bolqv gsn vg.
        addItem: function (type, description, val) {
            var item, id;
            if (data.items[type].length == 0)
                id = 1;
            else
                id = data.items[type][data.items[type].length - 1].id + 1;
            //idg hamgin ar deeer + 1 gd generate hiijin.

            if (type == 'inc') {
                item = new Income(id, description, val);
            } else {
                item = new Expense(id, description, val);
            }
            data.items[type].push(item);
            return item;
        },
        getData: function () {
            return data;
        },
    }
})();

// programmin holbogc controller
var appController = (function (uiController, financeControoller) {
    function addItem() {
        // 1. oruulah ogogdliig delgetsees olj awna. 
        var input = uiController.getInput();
        if (input.description !== "" && input.value !== "") {
            // 2. olj awsan ogogdlvvde sanhvvgin controllert damjuulj tend hadgalna.
            var item = financeController.addItem(input.type, input.description, input.value);

            // 3. olj awsan ogogdlvvde tohiroh hesegt n gargana.
            uiController.addEventListenertItem(item, input.type);
        }

        uiController.clearFields();

        // 4. tosowiig tootsoolno. 
        financeController.tosovTootsooloh();

        // 5. etssiin vldegdel tootsoog delgetsnd gargana.
        var tusuv = financeController.tusviigAvah();

        // 6. toswin tootsog delgetsnd gargana. 
        console.log(tusuv);

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