(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"3awO":function(t,e,a){"use strict";a.r(e),a.d(e,"ROUTES",function(){return q}),a.d(e,"ReportModule",function(){return K});var n=a("tyNb"),r=a("B01t"),i=a("KZX/"),s=a("fXoL");let l=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=s.Eb({type:t,selectors:[["app-index"]],decls:2,vars:0,template:function(t,e){1&t&&(s.Pb(0,"p"),s.xc(1,"index works!"),s.Ob())},styles:[""]}),t})();var o=a("mrSG"),c=a("IzEk"),b=a("z3bE"),d=a("JrkW"),u=a("ofXK"),h=a("1kSV"),p=a("3Pt+");function y(t,e){if(1&t){const t=s.Qb();s.Nb(0),s.Pb(1,"div",13),s.Pb(2,"button",14),s.Zb("click",function(){return s.pc(t),s.bc().adjustDay(-1)}),s.Lb(3,"i",15),s.Ob(),s.Ob(),s.Pb(4,"div",16),s.Pb(5,"div",17),s.Pb(6,"div",18),s.Pb(7,"div",19),s.xc(8,"Date"),s.Ob(),s.Ob(),s.Pb(9,"input",20,21),s.Zb("click",function(){return s.pc(t),s.oc(10).toggle()})("ngModelChange",function(e){return s.pc(t),s.bc().date=e})("dateSelect",function(){return s.pc(t),s.bc().adjustDay(0)}),s.Ob(),s.Pb(11,"div",22),s.Pb(12,"button",23),s.Zb("click",function(){return s.pc(t),s.oc(10).toggle()}),s.Lb(13,"i",24),s.Ob(),s.Ob(),s.Ob(),s.Ob(),s.Pb(14,"div",13),s.Pb(15,"button",14),s.Zb("click",function(){return s.pc(t),s.bc().adjustDay(1)}),s.Lb(16,"i",25),s.Ob(),s.Ob(),s.Mb()}if(2&t){const t=s.bc();s.yb(9),s.hc("ngModel",t.date)}}function g(t,e){if(1&t){const t=s.Qb();s.Pb(0,"div",13),s.Pb(1,"div",26),s.Pb(2,"div",18),s.Pb(3,"div",19),s.xc(4,"Date"),s.Ob(),s.Ob(),s.Pb(5,"input",27),s.Zb("selected",function(e){return s.pc(t),s.bc().selectedDate(e)}),s.Ob(),s.Ob(),s.Ob()}if(2&t){const t=s.bc();s.yb(5),s.hc("options",t.options)}}let m=(()=>{class t{constructor(t){this.util=t,this.dateRange=new s.n,this.total=0,this.mode="day",this.itemList=[],this.filteredItemList=[],this.daterange={},this.year=(new Date).getFullYear(),this.date=t.convertJsDateToNgbDate(new Date),this.setDateRanges()}ngOnInit(){this.onModechange(this.mode)}setDateRanges(){this.daterange.endDate=new Date,this.daterange.startDate=new Date,this.daterange.startDate.setDate(this.daterange.startDate.getDate()-20);const t=new Date;t.setDate(this.daterange.startDate.getDate()-90);const e=new Date;e.setDate(this.daterange.startDate.getDate()+23),this.options={autoApply:!0,locale:{format:"DD MMM,YY"},minDate:t,maxDate:e,startDate:this.daterange.startDate,endDate:this.daterange.endDate,alwaysShowCalendars:!1}}onModechange(t){switch(this.mode=t,t){case"day":this.adjustDay(0);break;case"range":this.getItemByDateRange(this.daterange.startDate,this.daterange.endDate,t)}}selectedDate(t){this.daterange.startDate=t.start._d,this.daterange.endDate=t.end._d,this.getItemByDateRange(this.daterange.startDate,this.daterange.endDate,this.mode)}getItemByDateRange(t,e,a){this.dateRange.emit({start:t,end:e,mode:a})}adjustDay(t){let e=new Date(this.date.year,this.date.month-1,this.date.day+t);this.date=this.util.convertJsDateToNgbDate(e);const a=new Date(this.date.year,this.date.month-1,this.date.day);a.setHours(0,0,0,0);const n=new Date(this.date.year,this.date.month-1,this.date.day);n.setHours(23,59,59,999),this.getItemByDateRange(a,n,this.mode)}getDateString(){return this.date.day+"/"+this.date.month+"/"+this.date.year}getDateRangeString(){return this.util.getDateStringLocal(this.daterange.startDate)+" to "+this.util.getDateStringLocal(this.daterange.endDate)}onPrint(){window.print()}}return t.\u0275fac=function(e){return new(e||t)(s.Kb(b.a))},t.\u0275cmp=s.Eb({type:t,selectors:[["report-head"]],inputs:{label:"label"},outputs:{dateRange:"dateRange"},decls:19,vars:5,consts:[[1,"page-head","d-print-none"],[1,"d-flex","justify-content-between"],[1,""],["role","group","aria-label","Basic example",1,"btn-group"],["type","button",1,"btn","btn-sm",3,"ngClass","click"],[1,"container"],[1,"row","d-print-none"],[4,"ngIf"],["class","col-auto",4,"ngIf"],[1,"col"],[1,"ml-auto","col-auto"],[1,"btn","btn-sm","btn-primary",3,"click"],[1,"fa","fa-print"],[1,"col-auto"],[1,"btn","btn-sm","btn-light",3,"click"],[1,"fa","fa-chevron-left"],[1,"col-auto","p-0","mb-2"],[1,"input-group","input-group-sm"],[1,"input-group-prepend"],[1,"input-group-text"],["placeholder","yyyy-mm-dd","name","dp","ngbDatepicker","",1,"form-control",3,"ngModel","click","ngModelChange","dateSelect"],["rDate","ngbDatepicker"],[1,"input-group-append"],["type","button",1,"btn","btn-outline-secondary",3,"click"],[1,"fa","fa-calendar"],[1,"fa","fa-chevron-right"],[1,"input-group","input-group-sm","mb-2"],["type","text","name","daterangeInput","daterangepicker","",1,"form-control",3,"options","selected"]],template:function(t,e){1&t&&(s.Pb(0,"div",0),s.Pb(1,"div",1),s.Pb(2,"div",2),s.xc(3),s.Ob(),s.Pb(4,"div",3),s.Pb(5,"a",4),s.Zb("click",function(){return e.onModechange("day")}),s.xc(6,"Day"),s.Ob(),s.Pb(7,"a",4),s.Zb("click",function(){return e.onModechange("range")}),s.xc(8,"Range"),s.Ob(),s.Ob(),s.Lb(9,"div",2),s.Ob(),s.Ob(),s.Pb(10,"div",5),s.Pb(11,"div",6),s.vc(12,y,17,1,"ng-container",7),s.vc(13,g,6,1,"div",8),s.Lb(14,"div",9),s.Pb(15,"div",10),s.Pb(16,"button",11),s.Zb("click",function(){return e.onPrint()}),s.Lb(17,"i",12),s.xc(18," Print "),s.Ob(),s.Ob(),s.Ob(),s.Ob()),2&t&&(s.yb(3),s.yc(e.label),s.yb(2),s.hc("ngClass","day"==e.mode?"btn-primary":"btn-light"),s.yb(2),s.hc("ngClass","range"==e.mode?"btn-primary":"btn-light"),s.yb(5),s.hc("ngIf","day"==e.mode),s.yb(1),s.hc("ngIf","range"==e.mode))},directives:[u.l,u.n,h.f,p.a,p.j,p.m,r.b],styles:[""]}),t})();var v=a("lCxQ");let O=(()=>{class t{constructor(t,e){this.util=t,this.inventoryService=e,this.label="Inventory Report",this.tableTitle="",this.inventoryList=[]}getItemByDateRange({start:t,end:e,mode:a}){return Object(o.a)(this,void 0,void 0,function*(){this.inventoryService.inventorys$.pipe(Object(c.a)(2)).subscribe(n=>{this.inventoryList=n.filter(a=>a.date.seconds>=t.getTime()/1e3&&a.date.seconds<=e.getTime()/1e3),this.inventoryList.sort(this.util.dynamicSortObject("sr_no")),this.tableTitle=this.label+" for "+this.util.getReportDateString({start:t,end:e,mode:a})})})}}return t.\u0275fac=function(e){return new(e||t)(s.Kb(b.a),s.Kb(d.a))},t.\u0275cmp=s.Eb({type:t,selectors:[["app-inventory-report"]],decls:8,vars:4,consts:[[3,"label","dateRange"],[1,"container"],[1,"row"],[1,"col-12"],[1,"d-none","d-print-block","mb-4"],[1,"text-center","mt-3"],[3,"inventoryList","list"]],template:function(t,e){1&t&&(s.Pb(0,"report-head",0),s.Zb("dateRange",function(t){return e.getItemByDateRange(t)}),s.Ob(),s.Pb(1,"div",1),s.Pb(2,"div",2),s.Pb(3,"div",3),s.Lb(4,"div",4),s.Pb(5,"h4",5),s.xc(6),s.Ob(),s.Lb(7,"inventory-table",6),s.Ob(),s.Ob(),s.Ob()),2&t&&(s.hc("label",e.label),s.yb(6),s.yc(e.tableTitle),s.yb(1),s.hc("inventoryList",e.inventoryList)("list",!0))},directives:[m,v.a],styles:["[_nghost-%COMP%]{background-color:#f0f2f5;display:block;min-height:calc(100vh - 30px)}td[_ngcontent-%COMP%], th[_ngcontent-%COMP%]{font-family:SolaimanLipi}.container[_ngcontent-%COMP%]{background-color:#fff}td[_ngcontent-%COMP%]{padding:15px}@page{size[_ngcontent-%COMP%]:A4;margin[_ngcontent-%COMP%]:0;padding:15px}@media print{@page{size[_ngcontent-%COMP%]:A4;padding:15px}}.form-group.hidden[_ngcontent-%COMP%]{width:0;margin:0;border:none;padding:0}.custom-day[_ngcontent-%COMP%]{text-align:center;padding:.185rem .25rem;display:inline-block;height:2rem;width:2rem}.custom-day.focused[_ngcontent-%COMP%]{background-color:#e6e6e6}.custom-day.range[_ngcontent-%COMP%], .custom-day[_ngcontent-%COMP%]:hover{background-color:#0275d8;color:#fff}.custom-day.faded[_ngcontent-%COMP%]{background-color:rgba(2,117,216,.5)}"]}),t})();var P=a("1IUP"),f=a("r0Oy");let x=(()=>{class t{constructor(t,e){this.ledgerService=t,this.util=e,this.label="Ledger Report",this.tableTitle="",this.ledgerList=[]}getItemByDateRange({start:t,end:e,mode:a}){return Object(o.a)(this,void 0,void 0,function*(){this.ledgerService.ledgers$.pipe(Object(c.a)(2)).subscribe(n=>{this.ledgerList=n.filter(a=>a.createdAt.seconds>=t.getTime()/1e3&&a.createdAt.seconds<=e.getTime()/1e3),this.ledgerList.sort(this.util.dynamicSortObject("createdAt")),this.tableTitle=this.label+" for "+this.util.getReportDateString({start:t,end:e,mode:a})})})}}return t.\u0275fac=function(e){return new(e||t)(s.Kb(P.a),s.Kb(b.a))},t.\u0275cmp=s.Eb({type:t,selectors:[["app-ledger-report"]],decls:8,vars:3,consts:[[3,"label","dateRange"],[1,"container"],[1,"row"],[1,"col-12"],[1,"d-none","d-print-block","mb-4"],[1,"text-center","mt-3"],[3,"ledgerList"]],template:function(t,e){1&t&&(s.Pb(0,"report-head",0),s.Zb("dateRange",function(t){return e.getItemByDateRange(t)}),s.Ob(),s.Pb(1,"div",1),s.Pb(2,"div",2),s.Pb(3,"div",3),s.Lb(4,"div",4),s.Pb(5,"h4",5),s.xc(6),s.Ob(),s.Lb(7,"ledger-list",6),s.Ob(),s.Ob(),s.Ob()),2&t&&(s.hc("label",e.label),s.yb(6),s.yc(e.tableTitle),s.yb(1),s.hc("ledgerList",e.ledgerList))},directives:[m,f.a],styles:["[_nghost-%COMP%]{background-color:#f0f2f5;display:block;min-height:calc(100vh - 30px)}.container[_ngcontent-%COMP%]{background-color:#fff}"]}),t})();class L{constructor(t){this.createdAt=t.createdAt,this.year=t.year,this.customer=t.customer,this.agent=t.agent,this.sr_no=t.sr_no,this.amount=t.loan_amount,this.rate=t.loan_rate,this.profit=t.loan_profit,this.payable=t.loan_payable}}var _=a("tMLS");let D=(()=>{class t{constructor(){this.list=!1,this.tableName="Loan Table",this.columns=[{path:"#",label:"#",className:"font-weight-bold"},{path:"createdAt",label:"Date",pipe:"date",pipeArgs:"dd/MM/yyyy",totalLabel:!0},{path:"sr_no",label:"SR No.",searchable:!0},{path:"customer.name",label:"Party",searchable:!0},{path:"agent.name",label:"Agent",searchable:!0},{path:"amount",label:"Amount",pipe:"currencyBd",className:"text-right",total:!0},{path:"rate",label:"Rate",pipe:"currencyBd",className:"text-right"},{path:"profit",label:"Profit",pipe:"currencyBd",className:"text-right",total:!0},{path:"payable",label:"Payable",pipe:"currencyBd",className:"text-right",total:!0}],this.sortColumn={path:"createdAt",order:"desc"}}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=s.Eb({type:t,selectors:[["loan-table"]],inputs:{loanList:"loanList",list:"list"},decls:1,vars:5,consts:[[3,"columns","data","tableName","sortColumn","list"]],template:function(t,e){1&t&&s.Lb(0,"AppTable",0),2&t&&s.hc("columns",e.columns)("data",e.loanList)("tableName",e.tableName)("sortColumn",e.sortColumn)("list",e.list)},directives:[_.a],styles:[""]}),t})(),R=(()=>{class t{constructor(t,e){this.ledgerService=t,this.util=e,this.label="Loan Report",this.tableTitle="",this.loanList=[]}getItemByDateRange({start:t,end:e,mode:a}){return Object(o.a)(this,void 0,void 0,function*(){this.loanList=[],this.ledgerService.ledgers$.pipe(Object(c.a)(2)).subscribe(n=>{n.filter(a=>a.createdAt.seconds>=t.getTime()/1e3&&a.createdAt.seconds<=e.getTime()/1e3).forEach(t=>{this.loanList.push(new L(t))}),this.loanList.sort(this.util.dynamicSortObject("createdAt")),this.tableTitle=this.label+" for "+this.util.getReportDateString({start:t,end:e,mode:a})})})}}return t.\u0275fac=function(e){return new(e||t)(s.Kb(P.a),s.Kb(b.a))},t.\u0275cmp=s.Eb({type:t,selectors:[["app-loan-report"]],decls:8,vars:4,consts:[[3,"label","dateRange"],[1,"container"],[1,"row"],[1,"col-12"],[1,"d-none","d-print-block","mb-4"],[1,"text-center","mt-3"],[3,"loanList","list"]],template:function(t,e){1&t&&(s.Pb(0,"report-head",0),s.Zb("dateRange",function(t){return e.getItemByDateRange(t)}),s.Ob(),s.Pb(1,"div",1),s.Pb(2,"div",2),s.Pb(3,"div",3),s.Lb(4,"div",4),s.Pb(5,"h4",5),s.xc(6),s.Ob(),s.Lb(7,"loan-table",6),s.Ob(),s.Ob(),s.Ob()),2&t&&(s.hc("label",e.label),s.yb(6),s.yc(e.tableTitle),s.yb(1),s.hc("loanList",e.loanList)("list",!0))},directives:[m,D],styles:[""]}),t})();class w{constructor(t){this.createdAt=t.createdAt,this.sr_no=t.sr_no,this.year=t.year,this.customer=t.customer,this.agent=t.agent,this.quantity=t.quantity,this.rate=t.rate,this.service_amount=t.service_amount}}let S=(()=>{class t{constructor(){this.list=!1,this.tableName="Product Table",this.columns=[{path:"#",label:"#",className:"font-weight-bold"},{path:"createdAt",label:"Date",pipe:"date",pipeArgs:"dd/MM/yyyy",totalLabel:!0},{path:"sr_no",label:"SR No.",searchable:!0},{path:"customer.name",label:"Party",searchable:!0},{path:"agent.name",label:"Agent",searchable:!0},{path:"quantity",label:"Quantity",pipe:"currencyBd",className:"text-right",total:!0},{path:"rate",label:"Rate",pipe:"currencyBd",className:"text-right"},{path:"service_amount",label:"Payable",pipe:"currencyBd",className:"text-right",total:!0}],this.sortColumn={path:"createdAt",order:"desc"}}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=s.Eb({type:t,selectors:[["product-table"]],inputs:{productList:"productList",list:"list"},decls:1,vars:5,consts:[[3,"columns","data","tableName","sortColumn","list"]],template:function(t,e){1&t&&s.Lb(0,"AppTable",0),2&t&&s.hc("columns",e.columns)("data",e.productList)("tableName",e.tableName)("sortColumn",e.sortColumn)("list",e.list)},directives:[_.a],styles:[""]}),t})(),B=(()=>{class t{constructor(t,e){this.ledgerService=t,this.util=e,this.label="Product Report",this.tableTitle="",this.productList=[]}getItemByDateRange({start:t,end:e,mode:a}){return Object(o.a)(this,void 0,void 0,function*(){this.productList=[],this.ledgerService.ledgers$.pipe(Object(c.a)(2)).subscribe(n=>{n.filter(a=>a.createdAt.seconds>=t.getTime()/1e3&&a.createdAt.seconds<=e.getTime()/1e3).forEach(t=>{this.productList.push(new w(t))}),this.productList.sort(this.util.dynamicSortObject("createdAt")),this.tableTitle=this.label+" for "+this.util.getReportDateString({start:t,end:e,mode:a})})})}}return t.\u0275fac=function(e){return new(e||t)(s.Kb(P.a),s.Kb(b.a))},t.\u0275cmp=s.Eb({type:t,selectors:[["app-product-report"]],decls:8,vars:4,consts:[[3,"label","dateRange"],[1,"container"],[1,"row"],[1,"col-12"],[1,"d-none","d-print-block","mb-4"],[1,"text-center","mt-3"],[3,"productList","list"]],template:function(t,e){1&t&&(s.Pb(0,"report-head",0),s.Zb("dateRange",function(t){return e.getItemByDateRange(t)}),s.Ob(),s.Pb(1,"div",1),s.Pb(2,"div",2),s.Pb(3,"div",3),s.Lb(4,"div",4),s.Pb(5,"h4",5),s.xc(6),s.Ob(),s.Lb(7,"product-table",6),s.Ob(),s.Ob(),s.Ob()),2&t&&(s.hc("label",e.label),s.yb(6),s.yc(e.tableTitle),s.yb(1),s.hc("productList",e.productList)("list",!0))},directives:[m,S],styles:[""]}),t})();var A=a("HK7g");let N=(()=>{class t{constructor(){this.list=!1,this.tableName="Delivery Table",this.columns=[{path:"#",label:"#",className:"font-weight-bold"},{path:"createdAt",label:"Date",pipe:"date",pipeArgs:"dd/MM/yyyy",totalLabel:!0},{path:"sr_no",label:"SR No.",searchable:!0},{path:"customer.name",label:"Party",searchable:!0},{path:"customer.phone",label:"Phone",searchable:!0},{path:"quantity",label:"Quantity",pipe:"currencyBd",className:"text-right",total:!0},{path:"service_rent",label:"Rent",pipe:"currencyBd",className:"text-right",total:!0},{path:"emptyBag_amount",label:"Empty bag",pipe:"currencyBd",className:"text-right",total:!0},{path:"loan_payable",label:"Loan",pipe:"currencyBd",className:"text-right",total:!0},{path:"total",label:"Total",pipe:"currencyBd",className:"text-right",total:!0}],this.sortColumn={path:"createdAt",order:"desc"}}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=s.Eb({type:t,selectors:[["delivery-table"]],inputs:{deliveryList:"deliveryList",list:"list"},decls:1,vars:5,consts:[[3,"columns","data","tableName","sortColumn","list"]],template:function(t,e){1&t&&s.Lb(0,"AppTable",0),2&t&&s.hc("columns",e.columns)("data",e.deliveryList)("tableName",e.tableName)("sortColumn",e.sortColumn)("list",e.list)},directives:[_.a],styles:[""]}),t})(),T=(()=>{class t{constructor(t,e){this.deliveryService=t,this.util=e,this.label="Delivery Report",this.tableTitle="",this.deliveryList=[]}getItemByDateRange({start:t,end:e,mode:a}){return Object(o.a)(this,void 0,void 0,function*(){this.deliveryList=[],this.deliveryService.deliverys$.pipe(Object(c.a)(2)).subscribe(n=>{const r=n.filter(a=>a.createdAt.seconds>=t.getTime()/1e3&&a.createdAt.seconds<=e.getTime()/1e3);this.deliveryList=r,this.deliveryList.sort(this.util.dynamicSortObject("createdAt")),this.tableTitle=this.label+" for "+this.util.getReportDateString({start:t,end:e,mode:a})})})}}return t.\u0275fac=function(e){return new(e||t)(s.Kb(A.a),s.Kb(b.a))},t.\u0275cmp=s.Eb({type:t,selectors:[["app-delivery-report-date"]],decls:8,vars:4,consts:[[3,"label","dateRange"],[1,"container"],[1,"row"],[1,"col-12"],[1,"d-none","d-print-block","mb-4"],[1,"text-center","mt-3"],[3,"deliveryList","list"]],template:function(t,e){1&t&&(s.Pb(0,"report-head",0),s.Zb("dateRange",function(t){return e.getItemByDateRange(t)}),s.Ob(),s.Pb(1,"div",1),s.Pb(2,"div",2),s.Pb(3,"div",3),s.Lb(4,"div",4),s.Pb(5,"h4",5),s.xc(6),s.Ob(),s.Lb(7,"delivery-table",6),s.Ob(),s.Ob(),s.Ob()),2&t&&(s.hc("label",e.label),s.yb(6),s.yc(e.tableTitle),s.yb(1),s.hc("deliveryList",e.deliveryList)("list",!0))},directives:[m,N],styles:[""]}),t})();var C=a("Kj3r"),k=a("/uUt"),M=a("lJxs");function I(t,e){if(1&t&&(s.Pb(0,"table",13),s.Pb(1,"thead"),s.Pb(2,"tr"),s.Pb(3,"td",14),s.xc(4," Ledger info "),s.Ob(),s.Ob(),s.Pb(5,"tr"),s.Pb(6,"th",15),s.xc(7,"#"),s.Ob(),s.Pb(8,"th",15),s.xc(9,"SR_No"),s.Ob(),s.Pb(10,"th",15),s.xc(11,"Party"),s.Ob(),s.Pb(12,"th",15),s.xc(13,"Loan"),s.Ob(),s.Pb(14,"th",15),s.xc(15,"Product"),s.Ob(),s.Pb(16,"th",15),s.xc(17,"Empty bag"),s.Ob(),s.Pb(18,"th",15),s.xc(19,"Total"),s.Ob(),s.Ob(),s.Ob(),s.Pb(20,"tbody"),s.Pb(21,"tr"),s.Pb(22,"th",16),s.xc(23,"1"),s.Ob(),s.Pb(24,"td"),s.xc(25),s.Ob(),s.Pb(26,"td"),s.Pb(27,"div"),s.xc(28),s.Ob(),s.Pb(29,"div"),s.xc(30),s.Ob(),s.Pb(31,"div"),s.xc(32),s.Ob(),s.Ob(),s.Pb(33,"td"),s.Pb(34,"div"),s.Pb(35,"div"),s.xc(36),s.Ob(),s.Pb(37,"div"),s.xc(38),s.Ob(),s.Pb(39,"div"),s.xc(40),s.Ob(),s.Ob(),s.Ob(),s.Pb(41,"td"),s.Pb(42,"div"),s.xc(43),s.Ob(),s.Pb(44,"div"),s.xc(45),s.Ob(),s.Pb(46,"div"),s.xc(47),s.Ob(),s.Ob(),s.Pb(48,"td"),s.Pb(49,"div"),s.Pb(50,"div"),s.xc(51),s.Ob(),s.Pb(52,"div"),s.xc(53),s.Ob(),s.Pb(54,"div"),s.xc(55),s.Ob(),s.Ob(),s.Ob(),s.Pb(56,"td"),s.xc(57),s.Ob(),s.Ob(),s.Ob(),s.Ob()),2&t){const t=s.bc();s.yb(25),s.yc(t.ledger.sr_no),s.yb(3),s.Ac("Name : ",null==t.ledger.customer?null:t.ledger.customer.name," [",null==t.ledger.customer?null:t.ledger.customer.phone,"]"),s.yb(2),s.zc("C/O : ",null==t.ledger.customer?null:t.ledger.customer.father,""),s.yb(2),s.yc(null==t.ledger.customer?null:t.ledger.customer.address),s.yb(4),s.zc("Amount: ",t.ledger.loan_amount," "),s.yb(2),s.zc("Rate: ",t.ledger.loan_rate," "),s.yb(2),s.zc("Payable: ",t.ledger.loan_payable," "),s.yb(3),s.zc("Quanity: ",t.ledger.quantity," "),s.yb(2),s.zc("Rate: ",t.ledger.rate," "),s.yb(2),s.zc("Amount: ",t.ledger.service_amount," "),s.yb(4),s.zc("Quanity: ",t.ledger.emptyBag_quantity," "),s.yb(2),s.zc("Rate: ",t.ledger.emptyBag_rate," "),s.yb(2),s.zc("Amount: ",t.ledger.emptyBag_amount," "),s.yb(2),s.yc(t.ledger.total_amount)}}function j(t,e){if(1&t&&(s.Pb(0,"tr"),s.Pb(1,"td",16),s.xc(2),s.Ob(),s.Pb(3,"td",16),s.xc(4),s.Ob(),s.Pb(5,"td"),s.Pb(6,"div"),s.xc(7),s.Ob(),s.Pb(8,"div"),s.xc(9),s.Ob(),s.Pb(10,"div"),s.xc(11),s.Ob(),s.Ob(),s.Pb(12,"td",22),s.xc(13),s.Ob(),s.Pb(14,"td",22),s.xc(15),s.Ob(),s.Pb(16,"td",22),s.xc(17),s.Ob(),s.Pb(18,"td",22),s.xc(19),s.Ob(),s.Pb(20,"td",22),s.xc(21),s.Ob(),s.Pb(22,"td",22),s.xc(23),s.Ob(),s.Pb(24,"th",22),s.xc(25),s.Ob(),s.Ob()),2&t){const t=e.$implicit,a=e.index;s.yb(2),s.yc(a+1),s.yb(2),s.yc(t.sr_no),s.yb(3),s.yc(t.customer.name),s.yb(2),s.yc(t.customer.phone),s.yb(2),s.yc(t.customer.address),s.yb(2),s.yc(null==t?null:t.loan_amount),s.yb(2),s.yc(null==t?null:t.loan_payable),s.yb(2),s.yc(null==t?null:t.quantity),s.yb(2),s.yc(null==t?null:t.service_rent),s.yb(2),s.yc(t.emptyBag_quantity),s.yb(2),s.yc(t.emptyBag_amount),s.yb(2),s.yc(t.total)}}function E(t,e){if(1&t&&(s.Pb(0,"table",17),s.Pb(1,"thead"),s.Pb(2,"tr"),s.Pb(3,"td",18),s.xc(4," Delivery info "),s.Ob(),s.Ob(),s.Pb(5,"tr"),s.Pb(6,"th",19),s.xc(7,"#"),s.Ob(),s.Pb(8,"th",19),s.xc(9,"SR_No"),s.Ob(),s.Pb(10,"th",19),s.xc(11,"Party"),s.Ob(),s.Pb(12,"th",20),s.xc(13,"Loan"),s.Ob(),s.Pb(14,"th",20),s.xc(15,"Product"),s.Ob(),s.Pb(16,"th",20),s.xc(17,"Empty Bag"),s.Ob(),s.Pb(18,"th",19),s.xc(19,"Total"),s.Ob(),s.Ob(),s.Pb(20,"tr"),s.Pb(21,"th"),s.xc(22,"Amount"),s.Ob(),s.Pb(23,"th"),s.xc(24,"Payable"),s.Ob(),s.Pb(25,"th"),s.xc(26,"Quantity"),s.Ob(),s.Pb(27,"th"),s.xc(28,"Rent"),s.Ob(),s.Pb(29,"th"),s.xc(30,"Quanity"),s.Ob(),s.Pb(31,"th"),s.xc(32,"Price"),s.Ob(),s.Ob(),s.Ob(),s.Pb(33,"tbody"),s.vc(34,j,26,12,"tr",21),s.Pb(35,"tr"),s.Lb(36,"td"),s.Lb(37,"td"),s.Lb(38,"td"),s.Pb(39,"th",22),s.xc(40),s.Ob(),s.Pb(41,"th",22),s.xc(42),s.Ob(),s.Pb(43,"th",22),s.xc(44),s.Ob(),s.Pb(45,"th",22),s.xc(46),s.Ob(),s.Pb(47,"th",22),s.xc(48),s.Ob(),s.Pb(49,"th",22),s.xc(50),s.Ob(),s.Pb(51,"th",22),s.xc(52),s.Ob(),s.Ob(),s.Ob(),s.Ob()),2&t){const t=s.bc();s.yb(34),s.hc("ngForOf",t.deliveryList),s.yb(6),s.yc(t.delivery_total.loan_amount),s.yb(2),s.yc(t.delivery_total.loan_payable),s.yb(2),s.yc(t.delivery_total.quantity),s.yb(2),s.yc(t.delivery_total.service_rent),s.yb(2),s.yc(t.delivery_total.emptyBag_quantity),s.yb(2),s.yc(t.delivery_total.emptyBag_amount),s.yb(2),s.yc(t.delivery_total.total)}}const q=[{path:"inventory-report",component:O},{path:"loan-report",component:R},{path:"ledger-report",component:x},{path:"product-report",component:B},{path:"delivery-report-date",component:T},{path:"delivery-report-sr",component:(()=>{class t{constructor(t,e){this.ledgerService=t,this.deliveryService=e,this.searchLedger=t=>t.pipe(Object(C.a)(200),Object(k.a)(),Object(M.a)(t=>(t.length<2?[]:this.ledgerList.filter(e=>e.sr_no.indexOf(t.toLowerCase())>-1&&e.year==this.year).slice(0,10)).map(t=>t.sr_no))),this.year=(new Date).getFullYear(),this.getLedgerforyear(this.year),this.delivery_total={quantity:0,service_rent:0,loan_amount:0,loan_profit:0,loan_payable:0,emptyBag_quantity:0,emptyBag_amount:0,total:0}}ngOnInit(){}getLedgerforyear(t){return Object(o.a)(this,void 0,void 0,function*(){this.ledgerService.ledgers$.pipe(Object(c.a)(2)).subscribe(e=>{this.ledgerList=e.filter(e=>e.year==t)})})}onSelectSRNo(t){this.ledger=this.ledgerList.find(e=>e.sr_no==t.item&&e.year==this.year),this.deliveryList=this.deliveryService._getBySrAndYear(t.item,this.year);let e={quantity:0,service_rent:0,loan_amount:0,loan_profit:0,loan_payable:0,emptyBag_quantity:0,emptyBag_amount:0,total:0};this.deliveryList&&this.deliveryList.length>0&&(this.deliveryList.forEach(t=>{e.quantity+=t.quantity,e.service_rent+=t.service_rent,e.loan_amount+=t.loan_amount,e.loan_payable+=t.loan_payable,e.emptyBag_quantity+=t.emptyBag_quantity,e.emptyBag_amount+=t.emptyBag_amount,e.total+=t.total}),this.delivery_total=e,console.log(this.ledger),console.log(this.deliveryList))}}return t.\u0275fac=function(e){return new(e||t)(s.Kb(P.a),s.Kb(A.a))},t.\u0275cmp=s.Eb({type:t,selectors:[["app-delivery-report-sr-no"]],decls:14,vars:4,consts:[[1,"page-head","d-print-none"],[1,"d-flex","justify-content-between"],[1,""],[1,"container"],[1,"row","d-print-none"],[1,"col-auto"],[1,"input-group"],[1,"input-group-prepend"],[1,"input-group-text"],[1,"fa","fa-filter"],["id","sr_no","type","text","placeholder","Sr no / Invoice no.",1,"form-control","form-control-sm",3,"ngbTypeahead","editable","selectItem"],["class","table table-striped border table-sm",4,"ngIf"],["class","table table-bordered table-sm",4,"ngIf"],[1,"table","table-striped","border","table-sm"],["colspan","8",1,"form-head"],["scope","col"],["scope","row"],[1,"table","table-bordered","table-sm"],["colspan","10",1,"form-head"],["rowspan","2","scope","col"],["colspan","2","scope","col"],[4,"ngFor","ngForOf"],[1,"text-center"]],template:function(t,e){1&t&&(s.Pb(0,"div",0),s.Pb(1,"div",1),s.Pb(2,"div",2),s.xc(3,"Delivery Report by SR no."),s.Ob(),s.Ob(),s.Ob(),s.Pb(4,"div",3),s.Pb(5,"div",4),s.Pb(6,"div",5),s.Pb(7,"div",6),s.Pb(8,"div",7),s.Pb(9,"div",8),s.Lb(10,"i",9),s.Ob(),s.Ob(),s.Pb(11,"input",10),s.Zb("selectItem",function(t){return e.onSelectSRNo(t)}),s.Ob(),s.Ob(),s.Ob(),s.Ob(),s.vc(12,I,58,15,"table",11),s.vc(13,E,53,8,"table",12),s.Ob()),2&t&&(s.yb(11),s.hc("ngbTypeahead",e.searchLedger)("editable",!1),s.yb(1),s.hc("ngIf",e.ledger),s.yb(1),s.hc("ngIf",e.deliveryList&&e.deliveryList.length>0))},directives:[h.j,u.n,u.m],styles:[""]}),t})()},{path:"",component:l}];let K=(()=>{class t{}return t.\u0275mod=s.Ib({type:t}),t.\u0275inj=s.Hb({factory:function(e){return new(e||t)},imports:[[i.a,r.a,n.e.forChild(q)]]}),t})()}}]);