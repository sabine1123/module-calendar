const ModuleName = 'calendar';
const ModuleDefaults =  {
    dataSource: './json/data1.json',
    initYearMonth: '201805',
	dataKeySetting: {
        'guaranteed': 'guaranteed',
        'status': 'status',
        'available': 'availableVancancy',
        'total': 'totalVacnacy',
        'price': 'price'
    },    
    onClickPrev: function( $btn, data, module ) {
    	console.log($btn, data, module);
    },

    onClickNext: function( $btn, data, module ) {
    	console.log($btn, data, module);
    },

    onClickDate: function( $date, data ){
        console.log($date, data);
    }    
};
const ModuleReturns = ['nextMonth','prevMonth','inputData','resetData','destroy'];
class Module {
    constructor (ele, options) {
        this.ele = ele;
        this.$ele = $(ele);
        this.option = options;
        this.currentYM = '';
        this.doneInit = false
        this.dataPool = {
            amount: 0,
            rawData: [],
            processedData: {}
        }

        this.$html = $(`
            <p class = "calendar_mode">切換<span class="switch" data-mode="default">列表</span>顯示</p>
            <div class="calendar_tabWrap">
                <a href="#" class="prev on"></a>
                <ul class="ntb_tab">
                </ul>
                <a href="#" class="next on"></a>                        
            </div>
            <div class="calendar_weekTitle">
                <div>星期日</div>
                <div>星期一</div>
                <div>星期二</div>
                <div>星期三</div>
                <div>星期四</div>
                <div>星期五</div>
                <div>星期六</div>
            </div> 
            <div class="calendar_daysBox"><div class="calendar_daysWrap"></div></div>
            <div class="calendar_pageBtn">
                <div class="calendar_pagePrev"><span class="arrow"></span>上一頁</div>
                <div class="calendar_pageNum">
                    <span class="currpage">1</span> / 
                    <span class="totalpage">3</span>
                </div>
                <div class="calendar_pageNext">下一頁<span class="arrow"></span></div>
            </div>            
            `);
        
         
    }
    init (userInput) {
        if (userInput) {
            let initYearMonth = this.option.initYearMonth;
            this.destroy();
            this.$ele.append(this.$html);
            this.processData(userInput);
            this.setMonthData(this.keyUnify(this.dataPool.rawData), initYearMonth);
        } else {
            this.$ele.append(this.$html);    
            this.getData (); 
        }
 
        let moduleThis = this;
        $('.calendar_mode').on('click', function(){
            let mode = $('.calendar_mode .switch').attr('data-mode');
            moduleThis.changeShowMode (mode);
            moduleThis.pagination($('.calendar_days.hasData').length);
        });

        $('.next').on('click', function(){  
            let _clickThis = this;  
            let activIdx =  parseInt($('.ntb_tab li.active').attr('data-liidx'));
            $('.ntb_tab li[data-liidx = "' + (activIdx + 1) + '"]').trigger('click');
            
            let nextMonthData = moduleThis.dataPool.processedData[settingYMToDataYM(moduleThis.currentYM)];
            moduleThis.onClickPrev ($(_clickThis), nextMonthData, moduleThis);
        });
        $('.prev').on('click', function(){
            let _clickThis = this;
            let activIdx =  parseInt($('.ntb_tab li.active').attr('data-liidx'));
            $('.ntb_tab li[data-liidx = "' + (activIdx - 1) + '"]').trigger('click');

            let prevMonthData = moduleThis.dataPool.processedData[settingYMToDataYM(moduleThis.currentYM)];
            moduleThis.onClickPrev ($(_clickThis), prevMonthData, moduleThis);
        });
    }

    getData () {
        let initYearMonth = this.option.initYearMonth;
        if( Array.isArray(this.option.dataSource) ){
            let data = this.option.dataSource;
            this.processData(data);
            this.setMonthData(this.keyUnify(this.dataPool.rawData), initYearMonth);
        }else{
            $.ajax({
                method: 'GET',
                url: this.option.dataSource,
                async: false
            }).done((data) => { 
                this.processData(data);
                this.setMonthData(this.keyUnify(this.dataPool.rawData), initYearMonth);
            });           
        }
    }

    processData (data) {
        this.dataPool = {
            amount:0,
            rawData:[],
            processedData:{}
        }
        data.map(d => {
            this.dataPool.amount++;
            let month = d.date.split('/')[0]+'/'+ d.date.split('/')[1]; 
            let primaryKey = d.date.split('/')[2] +'-' + d.price ;           
            if (this.dataPool.processedData[month]){
                this.dataPool.processedData[month].amount++;
                this.dataPool.processedData[month][primaryKey] = d;
            } else {
                this.dataPool.processedData[month] = {
                    amount: 1
                }
                this.dataPool.processedData[month][primaryKey] = d;
            }
        })
        this.dataPool.rawData = data;
    }

    keyUnify (data) {
        let setting = {}
        if (typeof this.option.dataKeySetting === 'object') {
            setting = this.option.dataKeySetting
        } else {
            setting = ModuleDefaults.dataKeySetting
        }

        return data.map(d => {
            return {
                "guaranteed": d[setting.guaranteed],
                "date": d.date,
                "price": d[setting.price],
                "available": d[setting.available],
                "total": d[setting.total],
                "status": d[setting.status]
            }
        })
    } 

    setMonthData (data, initYearMonth) {
        let initYear = initYearMonth.slice(0,4);
        let initMonth = HumanToJsMonth(initYearMonth.slice(4,6)); 
    
        initYearMonth = initYearMonth.slice(0,4).concat('/',initYearMonth.slice(4,6));
        let dateFilter= data.filter(function (d) {return d.date.slice(0,7) === initYearMonth});
        
        this.renderMonth(initYear, initMonth, dateFilter); 
    
        let dataYearAry = data.map(function(item, idx){
            return item.date.slice(0,7);   
        });    
        let setDateYaerAry = new Set(dataYearAry);
        let itemDateYaerAry = Array.from(setDateYaerAry);
        itemDateYaerAry.sort();
    
        this.renderMonthData(itemDateYaerAry, initYearMonth);
    
        let _moduleThis = this;
        $('.calendar_days').on('click', function(){
            let _clickThis = this;
            let dataDate = $(_clickThis).attr('data-date');
            $('.calendar_days').removeClass('active');
            $(_clickThis).addClass('active');
            _moduleThis.onClickDate ($(_clickThis), _moduleThis.getActiveDayData (dataDate))
        });        
    }

    renderMonthData(itemDateYaerAry, initYearMonth){
        let _moduleThis = this;
        let lastIdx = itemDateYaerAry.length - 1;
        clearMonths();

        itemDateYaerAry.forEach(function(obj,idx){
            let monthHtml=[];
            let month = obj.slice(0,4).concat(' ',obj.slice(5,7));
            if( obj === initYearMonth){
                monthHtml.push(`<li class="tab active" data-ym="${ obj.split('/')[0] + obj.split('/')[1] }" data-liidx="${ idx }">
                <a href="#"><span>${ month }月</span></a>
                </li>`);
            }else{
                monthHtml.push(`<li class="tab" data-ym="${ obj.split('/')[0] + obj.split('/')[1] }" data-liidx="${ idx }">
                <a href="#"><span>${ month }月</span></a>
                </li>`);            
            }        

            $('.ntb_tab').append(monthHtml.join(''));        
        
        
        })

        this.initTab(lastIdx);
        $('.ntb_tab li').on('click', function(e){
            let _clickThis = this;  
            $('.ntb_tab li').removeClass('active');
            $(_clickThis).addClass('active');
            _moduleThis.setMonthData (_moduleThis.keyUnify(_moduleThis.dataPool.rawData), $(_clickThis).attr('data-ym'));
        });

        this.pagination($('.calendar_days.hasData').length);        

        _moduleThis.currentYM = $('.ntb_tab li.active').attr('data-ym');

    }
    
    moveTab (distance) {
        $('.ntb_tab').css('transform', `translateX(-${distance}px)`);                
    }

    initTab (lastIdx) {
        const tabW = $('.ntb_tab li').outerWidth();
        const tabIdx = parseInt($('.ntb_tab li.active').attr('data-liidx'));

        $('.ntb_tab li.active').addClass('middle');
        $('.ntb_tab li[data-liidx = "'+ ( tabIdx - 1 ) + '"]').addClass('left');
        $('.ntb_tab li[data-liidx = "'+ ( tabIdx + 1 ) + '"]').addClass('right');  

        if ($('.ntb_tab li.right').attr('data-liidx') == lastIdx) {
            this.moveTab(tabW*(lastIdx-2));
        } else if ($('.ntb_tab li.active').attr('data-liidx') == lastIdx) {
            this.moveTab(tabW*(lastIdx-2));
        }else {             
            this.moveTab(tabW*(tabIdx-1));
        }
    }


    renderMonth (year, month, dateFilter) {
        clearCalendar();
        current.year = year;
        current.month = month;
        
        let cal = this.genCalendar(year, month);
        for (let day of cal) {
          this.renderDay(day.date.format('MMDD ddd'), day._isCurrent, dateFilter);
        }
    }

    genCalendar (year, month) {
        let calendar = [];
        let startDateOfMonth = moment().set('year', year).set('month', month).date(1).startOf('week');
        let endDateOfMonth = moment().set('year', year).set('month', month).endOf('month').endOf('week').add(1, 'day');
        let start = startDateOfMonth.clone();
        while (start.dayOfYear() !== endDateOfMonth.dayOfYear()){      
          calendar.push({
            date: start.clone(),
            week: start.week(),
            month: start.month(),
            _isCurrent: month === start.month()
          })
          start = start.clone().add(1, 'day');
        }
       
        return calendar;
    }

    renderDay (content, isCurrent, dateFilter) {
        let dayHtml = [];
        let MM = content.slice(0,2);
        let DD = content.slice(2,4);
        let weekDay = weekDaytoCN(content.slice(5,8));
        let dataM = dateFilter.filter(function (d) {return d.date.slice(5,7) === MM});
        let dataD = dateFilter.filter(function (d) {return d.date.slice(8,10) === DD});
        let lastData = dataD[dataD.length-1];
        let _moduleThis = this;
        if (!isCurrent) {
          dayHtml.push(`<div class='calendar_days disable'>${content}</div>`);   
        } else {
            if (dataM.length !== 0) {
                if (dataD.length !== 0) {
                    dayHtml.push( `                
                    <div class="calendar_days hasData" data-date="${lastData.date}">
                        <div class="date">
                            <span class="num">`, DD ,`</span>
                            <span class="weekday">星期`, weekDay ,`</span>
                        </div>`);
                    let classMap = {
                        '截止': 'status-G',
                        '候補': 'status-O',
                        '後補': 'status-O'
                    }
                    let spanStart = `<span class="status ` + classMap[lastData.status] || '';
                    let spanEnd = `">${lastData.status}</span>`;
                    dayHtml.push(spanStart+spanEnd);                
                    dayHtml.push(
                        `<span class="sell">可賣：${lastData.available}</span>
                        <span class="group">團位：${lastData.total}</span>`);
                    
                    if( !!lastData.guaranteed ){
                        dayHtml.push(`<span class="tip"><i class="ic-ln productreferf"></i>保證出團</span>`)
                    }else{
                        dayHtml.push('');
                    }
                    dayHtml.push(`<span class="price">$`+ addComma(lastData.price) +`</span>
                    </div>`);                   
                    
                }else {
                    dayHtml.push(`<div class='calendar_days'>`+ DD +`</div>`);
                }
            } else {
                dayHtml.push(`<div class='calendar_days'>${content}</div>`);
            }
        }
        $('.calendar_daysWrap').append(dayHtml.join(''));
    
    }    
      
    getActiveDayData (YMD) {
        let data = this.dataPool.rawData;
        let dateFilter= data.filter(function (d) {return d.date === YMD});
        return dateFilter;
    }

    changeShowMode (mode) {
        if ( mode === 'default') {
            $('.calendar').addClass('calendar_listmode');
            $('.calendar_mode > .switch').text('日曆');
            $('.calendar_mode > .switch').attr('data-mode','list');

        } else if ( mode === 'list'){
            $('.calendar').removeClass('calendar_listmode');
            $('.calendar_mode > .switch').text('列表');
            $('.calendar_mode > .switch').attr('data-mode','default');            
        }        
    }

    pagination(totalDataNum) {
        let totalPage = Math.ceil(totalDataNum/8);
        let currentPage = 1;
        if(!!$(this.ele).hasClass('calendar_listmode')){        
            if (totalDataNum < 8) {
                $('.calendar_pageBtn').hide();
                
            }else if ( totalPage === 1) {
                $('.calendar_pageBtn').hide();
            }else{
                $('.calendar_pageBtn').show();
                $('.currpage').text(currentPage);
                $('.totalpage').text(totalPage);
                if (currentPage === 1) {
                    $('.calendar_pagePrev').css({'opacity':'0', 'pointer-events':'none'});
                } else if (currentPage === totalPage){
                    $('.calendar_pageNext').css({'opacity':'0', 'pointer-events':'none'});
                }

                $('.calendar_pageNext').on('click', function(){
                    if (currentPage < totalPage) {
                        currentPage++;
                        $('.currpage').text(currentPage);
                        $('.calendar_pageNext').css({'opacity':'0', 'pointer-events':'none'});
                        $('.calendar_pagePrev').css({'opacity':'1', 'pointer-events':'auto'});
                    }
                    $('.calendar_daysWrap').css('transform','translateY(-'+ 490*(currentPage-1) +'px)');
                });

                $('.calendar_pagePrev').on('click', function(){
                    if (currentPage === totalPage) {
                        $('.calendar_pageNext').css({'opacity':'1', 'pointer-events':'auto'});
                        $('.calendar_pagePrev').css({'opacity':'0', 'pointer-events':'none'});
                        currentPage--;
                        $('.currpage').text(currentPage);
                    }

                    $('.calendar_daysWrap').css('transform','translateY('+ 490*(0) +'px)');
                });
            }
        }
    }

    onClickPrev ($btn, data, module) {
        console.log($btn, data, module);
    }

    onClickNext ($btn, data, module) {
        console.log($btn, data, module);
    }

    onClickDate ( $date, data ){
        console.log($date, data);
    }

    destroy () {
        $(this.ele).empty();
    }
    nextMonth (userFun) {
        let currentYY = parseInt(this.currentYM.slice(0,4));
        let currentMM = parseInt(this.currentYM.slice(4,6));
        let nextMM =  currentMM + 1;   
        let nextYY = NaN;  
        if (currentMM == 12) {
            nextYY = currentYY + 1;
        } else {
            nextYY = currentYY ;
        }        
        let nextYM = settingYMToDataYM(String(nextYY).concat('0',String(nextMM)));
        let dataA = this.dataPool.processedData;
        let nextData = dataA[nextYM];
        userFun(this, nextData);
    }

    prevMonth (userFun) {
        let currentYY = parseInt(this.currentYM.slice(0,4));
        let currentMM = parseInt(this.currentYM.slice(4,6));
        let prevMM =  currentMM - 1;   
        let prevYY = NaN;  
        if (currentMM == 12) {
            prevYY = currentYY - 1;
        } else {
            prevYY = currentYY ;        
        }        
        let prevYM = settingYMToDataYM(String(prevYY).concat('0',String(prevMM)));
        let dataA = this.dataPool.processedData;
        let prevData = dataA[prevYM];
        userFun(this, prevData);
    }

    inputData (userSet) {
        let initYM =  settingYMToDataYM(this.currentYM);
        this.dataPool.rawData = this.dataPool.rawData.concat(userSet);
        this.processData(this.dataPool.rawData);
        let dateFilter= this.dataPool.rawData.filter(function (d) {return d.date.slice(0,7) === initYM});
        this.renderMonth(initYM.split('/')[0], (parseInt(initYM.split('/')[1])-1), this.keyUnify(dateFilter)); 
    }

    resetData (userSet) {
        this.init(userSet);
    }
}

const current = {
    year: -1,
    month: -1
}

function clearMonths () {
    $('.ntb_tab').empty();
}

function clearCalendar () {
    $('.calendar_daysWrap').empty();
}

function addComma (val) {
    return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}

function jsToHumanMonth (month) {
    return month + 1 ;
}

function HumanToJsMonth (month) {
    return month - 1 ;
}

function settingYMToDataYM (YM) {
    return YM.slice(0,4).concat('/',YM.slice(4,6));
}

function weekDaytoCN (WD) {
    switch (WD){                   
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

export { ModuleName, ModuleDefaults, ModuleReturns, Module };
