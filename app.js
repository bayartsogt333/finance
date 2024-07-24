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
        percentageLabel: ".budget__expenses--percentage",
        containerDiv: ".container",
        expensePercentageLabel: ".item__percentage",
        dateLabel: ".budget__title--month"
    };
    //gej ogsnoor css deer classin oorcllt orhd solihod amar onowctoin boldog.
    var formatMoney = function (too, type) {
        too = '' + too; //temdegt mor lvv horwvvlew.
        var x = too.split(""); //ingd huwaacul neg neger n salgd massiwt hiicdg.
        x = x.reverse(); //massiwig shuud ergvldg buyu araas n eheldg bolgodg. 
        x = x.join("");  //splitiin esreg buyu massiwig zalgana. tgd dund n u tawiha zana.
        var y = '';
        var count = 0;
        for (var i = 0; i < x.length; i++) {
            y = y + x[i];
            count++;
            if (count % 3 === 0)
                y = y + ',';
        }
        y = y.split("").reverse().join("");  //massiwiig l ergvldg function gsn vg.
        //taslal nemew. 
        if (y[0] === ',')
            y = y.substr(1, y.length - 1);
        if (type === 'inc') y = '+' + y;
        else if (type === 'exp') y = '-' + y;
        return y;
    };

    var nodeListForEach = function (list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    return {
        displayDate: function () {
            var unuudur = new Date();
            document.querySelector(DOMstrings.dateLabel).textContent = unuudur.getMonth() + " сарын " + unuudur.getDay();
        },
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,  //buyu + ymu - ymu gdgiig valueaar n medjiin inc exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseInt(document.querySelector(DOMstrings.inputValue).value)
                //string orod irdeg. vvnhg int bolgjj nemj hasna gsn vg. 
            }
        },
        //get ;input duudagdhad oruulsan ogogdlvvdg awnaa gsn vg. select deer bol valueaa zaagad ogoh heregtei. 
        displayPercentages: function (allPercentagess) {
            //zarlagiin nodeListiig oloh. buyu deeres doosh daraaltsn huwiudaa olow.
            var elements = document.querySelectorAll(DOMstrings.expensePercentageLabel);
            //element bolgni huwid zarlagiin huwiig massiwas awc shiwj oruulah. 
            nodeListForEach(elements, function (el, ind) {
                el.textContent = allPercentagess[ind] + "%";
            });
            //el maani documentiin selectvvd daraalld ywjiiga gsn vg. ter bolgonoor gvvgel allpercentagiiha elmentvvdg jagsaagal bolcjn. 
        },
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
            var type;
            if (tusuv.tusuv >= 0) type = 'inc'
            else type = 'exp';
            document.querySelector(DOMstrings.tusuvLabel).textContent = formatMoney(tusuv.tusuv, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatMoney(tusuv.totalInc, 'inc');
            document.querySelector(DOMstrings.expeseLabel).textContent = formatMoney(tusuv.totalExp, 'exp');
            document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi + '%';
        },
        removeEventListenerItem: function (id) {
            //income-listiin child bolj orj irjiiga tvvnig idgaar n barij awaad hascinaa gsn vg.
            var b = document.getElementById(id);
            b.parentNode.removeChild(b);
            //tagiig n ter cigt n olj ogool ennni ene hvvhdiig hascyaal gdg sanaa. var a = document.querySelector(DOMstrings.incomeList); gj zaawal etsgiin hgd bh shaardlggv. parentNode ashiglaal shiidew. 
        },

        addEventListenertItem: function (item, type) {
            // orlogo zarlaga ali bolohig aguulsan htmliig bvteene.
            var html, incDiv;
            if (type == "inc") {
                html = '<div class="item clearfix" id="inc-%id%"><div div class="item__description" >$description$</div ><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div > ';
                incDiv = document.querySelector(DOMstrings.incomeList);
            } else {
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">$description$</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>';
                incDiv = document.querySelector(DOMstrings.expList);
            }
            //ter html dotroo orlogo zarlagiin utgudg replace ashhiglaj oorcilj ogno.
            html = html.replace('%id%', item.id);
            //buyu daraan ustgahiin tuld id-nuudg n neg bvrclen onooj baina.
            html = html.replace("$description$", item.description);
            html = html.replace('%value%', formatMoney(item.value, type));

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
    };
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.perccentage = -1;
    };

    //udamshsan vyd ashiglagdah huwi bodoh buyu tvvns udamshsn buyu objectvvdd ocnoo gsn vg.
    Expense.prototype.calcPercentages = function (totalIncome) {
        if (totalIncome > 0)
            this.perccentage = Math.round((this.value / totalIncome) * 100);
    };
    Expense.prototype.getPercentage = function () {
        return this.perccentage;
    };

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
            if (data.totals.inc > 0)
                data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
            else
                data.huvi = 0;

        },
        calculatePercentages: function () {
            data.items.exp.forEach(function (el) {
                el.calcPercentages(data.totals.inc);
            })
            //bvgden deer n huwiin bodoj gargaj baigaa.
        },
        getPercentages: function () {
            var allPersentages = data.items.exp.map(function (el) {
                return el.getPercentage();
            });
            return allPersentages;
            //tus tusdn dahin tootsoolcij bga uciraas hvsnegtd hiigel bolcij bnaa gsn vg.
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
                data.items[type].splice(index, 1);
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
        if (input.description !== "" && !isNaN(input.value)) {
            //buyu too oruulagv vyd nan alda zaadag.

            // 2. olj awsan ogogdlvvde sanhvvgin controllert damjuulj tend hadgalna.
            var item = financeController.addItem(input.type, input.description, input.value);

            // 3. olj awsan ogogdlvvde tohiroh hesegt n gargana.
            uiController.addEventListenertItem(item, input.type);
            uiController.clearFields();

            //toswig shiner tootsolj delgetsend vzvvleh.
            updateTosov();
        }
    }
    function updateTosov() {
        // 4. tosowiig tootsoolno. 
        financeController.tosovTootsooloh();

        // 5. etssiin vldegdel tootsoog delgetsnd gargana.
        var tusuv = financeController.tusviigAvah();

        // 6. toswin tootsog delgetsnd gargana. 
        uiController.tusviigUzuuleh(tusuv);

        // 7 elmentvvdiin huwiig tootsoolj, hvleen awah
        financeController.calculatePercentages();
        var allPersentagesa = financeController.getPercentages();
        // 8. delgetsend gargah.
        uiController.displayPercentages(allPersentagesa);
    }

    var setupEventListener = function () {
        var DOM = uiController.getDOMstrings();
        document.querySelector(DOM.addBtn).addEventListener("click", addItem);

        document.addEventListener("keypress", function (event) {
            // enter edr daraad awhad ajilna. daragdsan towc n event gdgeer orj irne. daragdsan towc bvr keykodetoi tvvger n barijn awdag bhnee.
            if (event.keyCode === 13 || event.which == 13) {
                // keycode bhgv vyd which n ymr c ylggv. 
                addItem()
            }
        });

        document.querySelector(DOM.containerDiv).addEventListener("click", function (event) {
            console.log(event.target.parentNode.parentNode.parentNode.parentNode.id);
            //buyu tuhain container dotor bui icon deer darhad medreh bolowc darsan gazraas hed deeshe ywd id bgan gdg deere ocjin.

            var fullId = event.target.parentNode.parentNode.parentNode.parentNode.id;  //inc-2 exp-1
            if (fullId) {   //buyu oor gazar darcij bolood id irqv vyd ajilcij boloh tul id irvvl true bhgv bol false bolgcdg gsn vg.
                var arr = fullId.split("-");
                // 1. sanhvvgin modulias ustgaj ogno.
                financeController.deleteItem(arr[0], parseInt(arr[1]));

                // 2. delgets deeres elmentiig ustgana.
                uiController.removeEventListenerItem(fullId);

                // 3. vldegdel tootsoog shinecilj haruulna.
                updateTosov();
            }
        });
    };

    return {
        init: function () {
            console.log("App start...");
            uiController.displayDate();
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