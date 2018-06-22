/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

__webpack_require__(2);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _module = __webpack_require__(4);

var root = function (root) {
    if ((typeof root === 'undefined' ? 'undefined' : _typeof(root)) === 'object' && (root.self === root || root.global === global) && root) {
        return root;
    }
}(self || global || {});

var $ = function ($) {
    if (typeof $ === 'function') {
        return $;
    } else {
        throw new Error('You must import jQuery');
    }
}(root.jQuery);

$.fn[_module.ModuleName] = function () {
    var args = Array.prototype.slice.call(arguments, 0);
    var method = args[0];
    var options = args.slice(1).length <= 0 ? void 0 : args.slice(1, args.length);
    var isReturnMethod = this.length === 1 && typeof method === 'string' && _module.ModuleReturns.indexOf(method) !== -1;
    var methodRunner = function methodRunner(method, options, uesReturn) {
        var $this = $(this);
        var module = $this.data(_module.ModuleName);
        if (module) {
            if (typeof method === 'string' && !uesReturn) {
                module[method].apply(module, options);
            } else if (typeof method === 'string' && !!uesReturn) {
                return module[method].apply(module, options);
            } else {
                throw new Error('unsupported options!');
            }
        } else {
            throw new Error('You must run first this plugin!');
        }
    };
    if (isReturnMethod) {
        return methodRunner.call(this, method, options, isReturnMethod);
    } else {
        return this.each(function () {
            var $this = $(this);
            var module = $this.data(_module.ModuleName);
            var opts = null;
            if (module) {
                methodRunner.call(this, method, options);
            } else {
                opts = $.extend(true, {}, _module.ModuleDefaults, (typeof method === 'undefined' ? 'undefined' : _typeof(method)) === 'object' && method, (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options);
                module = new _module.Module(this, opts);
                $this.data(_module.ModuleName, module);
                module.init();
            }
        });
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModuleName = 'calendar';
var ModuleDefaults = {
    dataSource: './json/data1.json',
    initYearMonth: '201805',
    dataKeySetting: {
        'guaranteed': 'guaranteed',
        'status': 'status',
        'available': 'availableVancancy',
        'total': 'totalVacnacy',
        'price': 'price'
    },
    onClickPrev: function onClickPrev($btn, data, module) {
        console.log($btn, data, module);
    },

    onClickNext: function onClickNext($btn, data, module) {
        console.log($btn, data, module);
    },

    onClickDate: function onClickDate($date, data) {
        console.log($date, data);
    }
};
var ModuleReturns = ['nextMonth', 'prevMonth', 'inputData', 'resetData', 'destroy'];

var Module = function () {
    function Module(ele, options) {
        _classCallCheck(this, Module);

        this.ele = ele;
        this.$ele = $(ele);
        this.option = options;
        this.currentYM = '';
        this.doneInit = false;
        this.dataPool = {
            amount: 0,
            rawData: [],
            processedData: {}
        };

        this.$html = $('\n            <p class = "calendar_mode">\u5207\u63DB<span class="switch" data-mode="default">\u5217\u8868</span>\u986F\u793A</p>\n            <div class="calendar_tabWrap">\n                <a href="#" class="prev on"></a>\n                <ul class="ntb_tab">\n                </ul>\n                <a href="#" class="next on"></a>                        \n            </div>\n            <div class="calendar_weekTitle">\n                <div>\u661F\u671F\u65E5</div>\n                <div>\u661F\u671F\u4E00</div>\n                <div>\u661F\u671F\u4E8C</div>\n                <div>\u661F\u671F\u4E09</div>\n                <div>\u661F\u671F\u56DB</div>\n                <div>\u661F\u671F\u4E94</div>\n                <div>\u661F\u671F\u516D</div>\n            </div> \n            <div class="calendar_daysBox"><div class="calendar_daysWrap"></div></div>\n            <div class="calendar_pageBtn">\n                <div class="calendar_pagePrev"><span class="arrow"></span>\u4E0A\u4E00\u9801</div>\n                <div class="calendar_pageNum">\n                    <span class="currpage">1</span> / \n                    <span class="totalpage">3</span>\n                </div>\n                <div class="calendar_pageNext">\u4E0B\u4E00\u9801<span class="arrow"></span></div>\n            </div>            \n            ');
    }

    _createClass(Module, [{
        key: 'init',
        value: function init(userInput) {
            if (userInput) {
                var initYearMonth = this.option.initYearMonth;
                this.destroy();
                this.$ele.append(this.$html);
                this.processData(userInput);
                this.setMonthData(this.keyUnify(this.dataPool.rawData), initYearMonth);
            } else {
                this.$ele.append(this.$html);
                this.getData();
            }

            var moduleThis = this;
            $('.calendar_mode').on('click', function () {
                var mode = $('.calendar_mode .switch').attr('data-mode');
                moduleThis.changeShowMode(mode);
                moduleThis.pagination($('.calendar_days.hasData').length);
            });

            $('.next').on('click', function () {
                var _clickThis = this;
                var activIdx = parseInt($('.ntb_tab li.active').attr('data-liidx'));
                $('.ntb_tab li[data-liidx = "' + (activIdx + 1) + '"]').trigger('click');

                var nextMonthData = moduleThis.dataPool.processedData[settingYMToDataYM(moduleThis.currentYM)];
                moduleThis.onClickPrev($(_clickThis), nextMonthData, moduleThis);
            });
            $('.prev').on('click', function () {
                var _clickThis = this;
                var activIdx = parseInt($('.ntb_tab li.active').attr('data-liidx'));
                $('.ntb_tab li[data-liidx = "' + (activIdx - 1) + '"]').trigger('click');

                var prevMonthData = moduleThis.dataPool.processedData[settingYMToDataYM(moduleThis.currentYM)];
                moduleThis.onClickPrev($(_clickThis), prevMonthData, moduleThis);
            });
        }
    }, {
        key: 'getData',
        value: function getData() {
            var _this = this;

            var initYearMonth = this.option.initYearMonth;
            if (Array.isArray(this.option.dataSource)) {
                var data = this.option.dataSource;
                this.processData(data);
                this.setMonthData(this.keyUnify(this.dataPool.rawData), initYearMonth);
            } else {
                $.ajax({
                    method: 'GET',
                    url: this.option.dataSource,
                    async: false
                }).done(function (data) {
                    _this.processData(data);
                    _this.setMonthData(_this.keyUnify(_this.dataPool.rawData), initYearMonth);
                });
            }
        }
    }, {
        key: 'processData',
        value: function processData(data) {
            var _this2 = this;

            this.dataPool = {
                amount: 0,
                rawData: [],
                processedData: {}
            };
            data.map(function (d) {
                _this2.dataPool.amount++;
                var month = d.date.split('/')[0] + '/' + d.date.split('/')[1];
                var primaryKey = d.date.split('/')[2] + '-' + d.price;
                if (_this2.dataPool.processedData[month]) {
                    _this2.dataPool.processedData[month].amount++;
                    _this2.dataPool.processedData[month][primaryKey] = d;
                } else {
                    _this2.dataPool.processedData[month] = {
                        amount: 1
                    };
                    _this2.dataPool.processedData[month][primaryKey] = d;
                }
            });
            this.dataPool.rawData = data;
        }
    }, {
        key: 'keyUnify',
        value: function keyUnify(data) {
            var setting = {};
            if (_typeof(this.option.dataKeySetting) === 'object') {
                setting = this.option.dataKeySetting;
            } else {
                setting = ModuleDefaults.dataKeySetting;
            }

            return data.map(function (d) {
                return {
                    "guaranteed": d[setting.guaranteed],
                    "date": d.date,
                    "price": d[setting.price],
                    "available": d[setting.available],
                    "total": d[setting.total],
                    "status": d[setting.status]
                };
            });
        }
    }, {
        key: 'setMonthData',
        value: function setMonthData(data, initYearMonth) {
            var initYear = initYearMonth.slice(0, 4);
            var initMonth = HumanToJsMonth(initYearMonth.slice(4, 6));

            initYearMonth = initYearMonth.slice(0, 4).concat('/', initYearMonth.slice(4, 6));
            var dateFilter = data.filter(function (d) {
                return d.date.slice(0, 7) === initYearMonth;
            });

            this.renderMonth(initYear, initMonth, dateFilter);

            var dataYearAry = data.map(function (item, idx) {
                return item.date.slice(0, 7);
            });
            var setDateYaerAry = new Set(dataYearAry);
            var itemDateYaerAry = Array.from(setDateYaerAry);
            itemDateYaerAry.sort();

            this.renderMonthData(itemDateYaerAry, initYearMonth);

            var _moduleThis = this;
            $('.calendar_days').on('click', function () {
                var _clickThis = this;
                var dataDate = $(_clickThis).attr('data-date');
                $('.calendar_days').removeClass('active');
                $(_clickThis).addClass('active');
                _moduleThis.onClickDate($(_clickThis), _moduleThis.getActiveDayData(dataDate));
            });
        }
    }, {
        key: 'renderMonthData',
        value: function renderMonthData(itemDateYaerAry, initYearMonth) {
            var _moduleThis = this;
            var lastIdx = itemDateYaerAry.length - 1;
            clearMonths();

            itemDateYaerAry.forEach(function (obj, idx) {
                var monthHtml = [];
                var month = obj.slice(0, 4).concat(' ', obj.slice(5, 7));
                if (obj === initYearMonth) {
                    monthHtml.push('<li class="tab active" data-ym="' + (obj.split('/')[0] + obj.split('/')[1]) + '" data-liidx="' + idx + '">\n                <a href="#"><span>' + month + '\u6708</span></a>\n                </li>');
                } else {
                    monthHtml.push('<li class="tab" data-ym="' + (obj.split('/')[0] + obj.split('/')[1]) + '" data-liidx="' + idx + '">\n                <a href="#"><span>' + month + '\u6708</span></a>\n                </li>');
                }

                $('.ntb_tab').append(monthHtml.join(''));
            });

            this.initTab(lastIdx);
            $('.ntb_tab li').on('click', function (e) {
                var _clickThis = this;
                $('.ntb_tab li').removeClass('active');
                $(_clickThis).addClass('active');
                _moduleThis.setMonthData(_moduleThis.keyUnify(_moduleThis.dataPool.rawData), $(_clickThis).attr('data-ym'));
            });

            this.pagination($('.calendar_days.hasData').length);

            _moduleThis.currentYM = $('.ntb_tab li.active').attr('data-ym');
        }
    }, {
        key: 'moveTab',
        value: function moveTab(distance) {
            $('.ntb_tab').css('transform', 'translateX(-' + distance + 'px)');
        }
    }, {
        key: 'initTab',
        value: function initTab(lastIdx) {
            var tabW = $('.ntb_tab li').outerWidth();
            var tabIdx = parseInt($('.ntb_tab li.active').attr('data-liidx'));

            $('.ntb_tab li.active').addClass('middle');
            $('.ntb_tab li[data-liidx = "' + (tabIdx - 1) + '"]').addClass('left');
            $('.ntb_tab li[data-liidx = "' + (tabIdx + 1) + '"]').addClass('right');

            if ($('.ntb_tab li.right').attr('data-liidx') == lastIdx) {
                this.moveTab(tabW * (lastIdx - 2));
            } else if ($('.ntb_tab li.active').attr('data-liidx') == lastIdx) {
                this.moveTab(tabW * (lastIdx - 2));
            } else {
                this.moveTab(tabW * (tabIdx - 1));
            }
        }
    }, {
        key: 'renderMonth',
        value: function renderMonth(year, month, dateFilter) {
            clearCalendar();
            current.year = year;
            current.month = month;

            var cal = this.genCalendar(year, month);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = cal[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var day = _step.value;

                    this.renderDay(day.date.format('MMDD ddd'), day._isCurrent, dateFilter);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'genCalendar',
        value: function genCalendar(year, month) {
            var calendar = [];
            var startDateOfMonth = moment().set('year', year).set('month', month).date(1).startOf('week');
            var endDateOfMonth = moment().set('year', year).set('month', month).endOf('month').endOf('week').add(1, 'day');
            var start = startDateOfMonth.clone();
            while (start.dayOfYear() !== endDateOfMonth.dayOfYear()) {
                calendar.push({
                    date: start.clone(),
                    week: start.week(),
                    month: start.month(),
                    _isCurrent: month === start.month()
                });
                start = start.clone().add(1, 'day');
            }

            return calendar;
        }
    }, {
        key: 'renderDay',
        value: function renderDay(content, isCurrent, dateFilter) {
            var dayHtml = [];
            var MM = content.slice(0, 2);
            var DD = content.slice(2, 4);
            var weekDay = weekDaytoCN(content.slice(5, 8));
            var dataM = dateFilter.filter(function (d) {
                return d.date.slice(5, 7) === MM;
            });
            var dataD = dateFilter.filter(function (d) {
                return d.date.slice(8, 10) === DD;
            });
            var lastData = dataD[dataD.length - 1];
            var _moduleThis = this;
            if (!isCurrent) {
                dayHtml.push('<div class=\'calendar_days disable\'>' + content + '</div>');
            } else {
                if (dataM.length !== 0) {
                    if (dataD.length !== 0) {
                        dayHtml.push('                \n                    <div class="calendar_days hasData" data-date="' + lastData.date + '">\n                        <div class="date">\n                            <span class="num">', DD, '</span>\n                            <span class="weekday">\u661F\u671F', weekDay, '</span>\n                        </div>');
                        var classMap = {
                            '截止': 'status-G',
                            '候補': 'status-O',
                            '後補': 'status-O'
                        };
                        var spanStart = '<span class="status ' + classMap[lastData.status] || '';
                        var spanEnd = '">' + lastData.status + '</span>';
                        dayHtml.push(spanStart + spanEnd);
                        dayHtml.push('<span class="sell">\u53EF\u8CE3\uFF1A' + lastData.available + '</span>\n                        <span class="group">\u5718\u4F4D\uFF1A' + lastData.total + '</span>');

                        if (!!lastData.guaranteed) {
                            dayHtml.push('<span class="tip"><i class="ic-ln productreferf"></i>\u4FDD\u8B49\u51FA\u5718</span>');
                        } else {
                            dayHtml.push('');
                        }
                        dayHtml.push('<span class="price">$' + addComma(lastData.price) + '</span>\n                    </div>');
                    } else {
                        dayHtml.push('<div class=\'calendar_days\'>' + DD + '</div>');
                    }
                } else {
                    dayHtml.push('<div class=\'calendar_days\'>' + content + '</div>');
                }
            }
            $('.calendar_daysWrap').append(dayHtml.join(''));
        }
    }, {
        key: 'getActiveDayData',
        value: function getActiveDayData(YMD) {
            var data = this.dataPool.rawData;
            var dateFilter = data.filter(function (d) {
                return d.date === YMD;
            });
            return dateFilter;
        }
    }, {
        key: 'changeShowMode',
        value: function changeShowMode(mode) {
            if (mode === 'default') {
                $('.calendar').addClass('calendar_listmode');
                $('.calendar_mode > .switch').text('日曆');
                $('.calendar_mode > .switch').attr('data-mode', 'list');
            } else if (mode === 'list') {
                $('.calendar').removeClass('calendar_listmode');
                $('.calendar_mode > .switch').text('列表');
                $('.calendar_mode > .switch').attr('data-mode', 'default');
            }
        }
    }, {
        key: 'pagination',
        value: function pagination(totalDataNum) {
            var totalPage = Math.ceil(totalDataNum / 8);
            var currentPage = 1;
            if (!!$(this.ele).hasClass('calendar_listmode')) {
                if (totalDataNum < 8) {
                    $('.calendar_pageBtn').hide();
                } else if (totalPage === 1) {
                    $('.calendar_pageBtn').hide();
                } else {
                    $('.calendar_pageBtn').show();
                    $('.currpage').text(currentPage);
                    $('.totalpage').text(totalPage);
                    if (currentPage === 1) {
                        $('.calendar_pagePrev').css({ 'opacity': '0', 'pointer-events': 'none' });
                    } else if (currentPage === totalPage) {
                        $('.calendar_pageNext').css({ 'opacity': '0', 'pointer-events': 'none' });
                    }

                    $('.calendar_pageNext').on('click', function () {
                        if (currentPage < totalPage) {
                            currentPage++;
                            $('.currpage').text(currentPage);
                            $('.calendar_pageNext').css({ 'opacity': '0', 'pointer-events': 'none' });
                            $('.calendar_pagePrev').css({ 'opacity': '1', 'pointer-events': 'auto' });
                        }
                        $('.calendar_daysWrap').css('transform', 'translateY(-' + 490 * (currentPage - 1) + 'px)');
                    });

                    $('.calendar_pagePrev').on('click', function () {
                        if (currentPage === totalPage) {
                            $('.calendar_pageNext').css({ 'opacity': '1', 'pointer-events': 'auto' });
                            $('.calendar_pagePrev').css({ 'opacity': '0', 'pointer-events': 'none' });
                            currentPage--;
                            $('.currpage').text(currentPage);
                        }

                        $('.calendar_daysWrap').css('transform', 'translateY(' + 490 * 0 + 'px)');
                    });
                }
            }
        }
    }, {
        key: 'onClickPrev',
        value: function onClickPrev($btn, data, module) {
            console.log($btn, data, module);
        }
    }, {
        key: 'onClickNext',
        value: function onClickNext($btn, data, module) {
            console.log($btn, data, module);
        }
    }, {
        key: 'onClickDate',
        value: function onClickDate($date, data) {
            console.log($date, data);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            $(this.ele).empty();
        }
    }, {
        key: 'nextMonth',
        value: function nextMonth(userFun) {
            var currentYY = parseInt(this.currentYM.slice(0, 4));
            var currentMM = parseInt(this.currentYM.slice(4, 6));
            var nextMM = currentMM + 1;
            var nextYY = NaN;
            if (currentMM == 12) {
                nextYY = currentYY + 1;
            } else {
                nextYY = currentYY;
            }
            var nextYM = settingYMToDataYM(String(nextYY).concat('0', String(nextMM)));
            var dataA = this.dataPool.processedData;
            var nextData = dataA[nextYM];
            userFun(this, nextData);
        }
    }, {
        key: 'prevMonth',
        value: function prevMonth(userFun) {
            var currentYY = parseInt(this.currentYM.slice(0, 4));
            var currentMM = parseInt(this.currentYM.slice(4, 6));
            var prevMM = currentMM - 1;
            var prevYY = NaN;
            if (currentMM == 12) {
                prevYY = currentYY - 1;
            } else {
                prevYY = currentYY;
            }
            var prevYM = settingYMToDataYM(String(prevYY).concat('0', String(prevMM)));
            var dataA = this.dataPool.processedData;
            var prevData = dataA[prevYM];
            userFun(this, prevData);
        }
    }, {
        key: 'inputData',
        value: function inputData(userSet) {
            var initYM = settingYMToDataYM(this.currentYM);
            this.dataPool.rawData = this.dataPool.rawData.concat(userSet);
            this.processData(this.dataPool.rawData);
            var dateFilter = this.dataPool.rawData.filter(function (d) {
                return d.date.slice(0, 7) === initYM;
            });
            this.renderMonth(initYM.split('/')[0], parseInt(initYM.split('/')[1]) - 1, this.keyUnify(dateFilter));
        }
    }, {
        key: 'resetData',
        value: function resetData(userSet) {
            this.init(userSet);
        }
    }]);

    return Module;
}();

var current = {
    year: -1,
    month: -1
};

function clearMonths() {
    $('.ntb_tab').empty();
}

function clearCalendar() {
    $('.calendar_daysWrap').empty();
}

function addComma(val) {
    return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}

function jsToHumanMonth(month) {
    return month + 1;
}

function HumanToJsMonth(month) {
    return month - 1;
}

function settingYMToDataYM(YM) {
    return YM.slice(0, 4).concat('/', YM.slice(4, 6));
}

function weekDaytoCN(WD) {
    switch (WD) {
        case 'Sun':
            WD = '日';
            break;
        case 'Mon':
            WD = '一';
            break;
        case 'Tue':
            WD = '二';
            break;
        case 'Wed':
            WD = '三';
            break;
        case 'Thu':
            WD = '四';
            break;
        case 'Fri':
            WD = '五';
            break;
        case 'Sat':
            WD = '六';
            break;
    }

    return WD;
}

exports.ModuleName = ModuleName;
exports.ModuleDefaults = ModuleDefaults;
exports.ModuleReturns = ModuleReturns;
exports.Module = Module;

/***/ })
/******/ ]);
//# sourceMappingURL=module.js.map