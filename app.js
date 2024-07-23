// delgetstei ajillah controller
var uiController = (function () {
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
        incomeList: '.income__list',
        expList: ".expenses__list",
        tusuvLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expeseLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage"
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
            //massiwin elment bolgon eleer orj irne. tvvnig n hooson bolgjnl gsn vg.

            fieldsArr[0].focus();
            //gewel cursoriig haana awaachu gdg code. focus ogjn gsn vg. 
        },
        tusviigUzuuleh: function (tusuv) {
            document.querySelector(DOMstrings.tusuvLabel).textContent = tusuv.tusuv;
            document.querySelector(DOMstrings.incomeLabel).textContent = tusuv.totalInc;
            document.querySelector(DOMstrings.expeseLabel).textContent = tusuv.totalExp;
            document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi + '%';
        },

        addEventListenertItem: function (item, type) {
            // orlogo zarlaga ali bolohig aguulsan htmliig bvteene.
            var html, incDiv;
            if (type == "inc") {
                html = '<div class="item clearfix" id="income-%id%"><div div class="item__description" >$description$</div ><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div > ';
                incDiv = document.querySelector(DOMstrings.incomeList);
            } else {
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">$description$</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%  </div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>';
                incDiv = document.querySelector(DOMstrings.expList);
            }
            //ter html dotroo orlogo zarlagiin utgudg replace ashhiglaj oorcilj ogno.
            html = html.replace('%id%', item.id);
            //buyu daraan ustgahiin tuld id-nuudg n neg bvrclen onooj baina.
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
        }, //objectvvdg aguulna.
        totals: {
            inc: 0,
            exp: 0
        },  //niit niilbervvd
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
        deleteItem: function (type, id) {
            var ids = data.items[type].map(function (el) {
                return el.id;
            })
            var index = ids.indexOf(id);
            if (index !== -1) {
                data.items.splice(index, 1);
            }
        },
        //idgar n orlogo zarlaga ustgah.
        getData: function () {
            return data;
        },
    }
})();

// programmin holbogc controller
var appController = (function (uiController, financeController) {
    function addItem() {
        // 1. oruulah ogogdliig delgetsees olj awna. 
        var input = uiController.getInput();
        console.log(input.value);
        if (input.description !== "" && !isNaN(input.value)) {
            //buyu too oruulagv vyd nan alda zaadag.

            // 2. olj awsan ogogdlvvde sanhvvgin controllert damjuulj tend hadgalna.
            var item = financeController.addItem(input.type, input.description, input.value);

            // 3. olj awsan ogogdlvvde tohiroh hesegt n gargana.
            uiController.addEventListenertItem(item, input.type);
            uiController.clearFields();

            // 4. tosowiig tootsoolno. 
            financeController.tosovTootsooloh();

            // 5. etssiin vldegdel tootsoog delgetsnd gargana.
            var tusuv = financeController.tusviigAvah();

            // 6. toswin tootsog delgetsnd gargana. 
            uiController.tusviigUzuuleh(tusuv);
        }
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
            uiController.tusviigUzuuleh({
                tusuv: 0,
                huvi: 0,
                totalInc: 0,
                totalExp: 0
            });
            setupEventListener();
        }
    }
    //ingej bgan bid daldalj return hij functionoor handuul ilv zvger bhnee. 
})(uiController, financeController);


appController.init();
//buyu llistener edr maani ajillaj ehlvvleh gsn vg. 