(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{pBHI:function(e,o,t){"use strict";t.r(o),t.d(o,"ROUTES",function(){return _}),t.d(o,"HomeModule",function(){return R});var r=t("tyNb"),n=t("KZX/"),s=t("fXoL");let a=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=s.Eb({type:e,selectors:[["app-index"]],decls:2,vars:0,template:function(e,o){1&e&&(s.Pb(0,"p"),s.xc(1,"index works!"),s.Ob())},styles:[""]}),e})();var i=t("mrSG"),c=t("3Pt+"),b=t("IzEk"),l=t("u6mN"),m=t("/7iW"),d=t("ofXK");let u=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=s.Eb({type:e,selectors:[["loading"]],decls:4,vars:0,consts:[[1,"loader"],[1,"text-center"]],template:function(e,o){1&e&&(s.Pb(0,"div",0),s.xc(1,"Loading..."),s.Ob(),s.Pb(2,"div",1),s.xc(3,"Please wait ..."),s.Ob())},styles:[".loader[_ngcontent-%COMP%]{color:#137b85;font-size:30px;text-indent:-9999em;overflow:hidden;width:1em;height:1em;border-radius:50%;margin:20px auto;position:relative;transform:translateZ(0);animation:load6 1.7s ease infinite,round 1.7s ease infinite}@keyframes load6{0%{box-shadow:0 -.83em 0 -.4em,0 -.83em 0 -.42em,0 -.83em 0 -.44em,0 -.83em 0 -.46em,0 -.83em 0 -.477em}5%,95%{box-shadow:0 -.83em 0 -.4em,0 -.83em 0 -.42em,0 -.83em 0 -.44em,0 -.83em 0 -.46em,0 -.83em 0 -.477em}10%,59%{box-shadow:0 -.83em 0 -.4em,-.087em -.825em 0 -.42em,-.173em -.812em 0 -.44em,-.256em -.789em 0 -.46em,-.297em -.775em 0 -.477em}20%{box-shadow:0 -.83em 0 -.4em,-.338em -.758em 0 -.42em,-.555em -.617em 0 -.44em,-.671em -.488em 0 -.46em,-.749em -.34em 0 -.477em}38%{box-shadow:0 -.83em 0 -.4em,-.377em -.74em 0 -.42em,-.645em -.522em 0 -.44em,-.775em -.297em 0 -.46em,-.82em -.09em 0 -.477em}to{box-shadow:0 -.83em 0 -.4em,0 -.83em 0 -.42em,0 -.83em 0 -.44em,0 -.83em 0 -.46em,0 -.83em 0 -.477em}}@keyframes round{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}"]}),e})();function g(e,o){if(1&e&&(s.Pb(0,"div",12),s.xc(1),s.Ob()),2&e){const e=s.bc();s.yb(1),s.zc(" ",e.errorMessage," ")}}function h(e,o){1&e&&s.Lb(0,"loading")}function f(e,o){1&e&&(s.Pb(0,"small",22),s.xc(1," Username required "),s.Ob())}function p(e,o){if(1&e&&(s.Pb(0,"small",22),s.Pb(1,"div",23),s.xc(2," Password required "),s.Ob(),s.Pb(3,"div",23),s.xc(4," Minimum passwor length required 6 "),s.Ob(),s.Ob()),2&e){const e=s.bc(2);s.yb(1),s.hc("hidden",!e.form.controls.password.errors.required),s.yb(2),s.hc("hidden",!e.form.controls.password.errors.minlength)}}function v(e,o){if(1&e){const e=s.Qb();s.Pb(0,"form",13),s.Zb("ngSubmit",function(){return s.pc(e),s.bc().submit()}),s.Lb(1,"input",14),s.vc(2,f,2,0,"small",15),s.Pb(3,"div",16),s.Lb(4,"input",17),s.Pb(5,"div",18),s.Pb(6,"button",19),s.Zb("click",function(){s.pc(e);const o=s.bc();return o.showPassword=!o.showPassword}),s.Lb(7,"i",20),s.Ob(),s.Ob(),s.Ob(),s.vc(8,p,5,2,"small",15),s.Pb(9,"button",21),s.xc(10,"SIGN IN"),s.Ob(),s.Ob()}if(2&e){const e=s.bc();s.hc("formGroup",e.form),s.yb(2),s.hc("ngIf",e.form.controls.username.errors&&e.form.controls.username.touched),s.yb(2),s.hc("type",e.showPassword?"text":"password"),s.yb(3),s.hc("ngClass",e.showPassword?"fa-eye-slash":"fa-eye"),s.yb(1),s.hc("ngIf",e.form.controls.password.errors&&e.form.controls.password.touched)}}function y(e,o){1&e&&(s.Pb(0,"div",24),s.xc(1,"Forgot your password ? "),s.Pb(2,"a",5),s.xc(3,"Reset"),s.Ob(),s.Ob())}function P(e,o){1&e&&(s.Pb(0,"div",24),s.xc(1,"Not register yet? "),s.Pb(2,"a",25),s.Pb(3,"strong"),s.xc(4,"Register"),s.Ob(),s.Ob(),s.Ob())}let O=(()=>{class e{constructor(e,o,t,r){this.fb=e,this.auth=o,this.userService=t,this.router=r,this.errorMessage="",this.loading=!1,this.showPassword=!1}ngOnInit(){this.createForm(),this.auth.user$.subscribe(e=>{e&&e.uid&&this.router.navigate(["/dashboard"])})}createForm(){this.form=this.fb.group({username:["",c.q.required],password:["",[c.q.required,c.q.minLength(6)]]})}submit(){return Object(i.a)(this,void 0,void 0,function*(){if(this.form.valid){this.errorMessage="";try{this.loading=!0;const e=yield this.auth.loginWithEmail(this.form.controls.username.value,this.form.controls.password.value);this.loading=!1,console.log(e.user),e.user.email&&(console.log(e.user.email),this.getUser(e))}catch(e){console.log(e),this.errorMessage=e.message,this.loading=!1}}else this.errorMessage="Form data missing"})}getUser(e){return Object(i.a)(this,void 0,void 0,function*(){this.loading=!0,yield this.userService.get(e.user.uid).pipe(Object(b.a)(2)).subscribe(e=>{this.loading=!1,this.router.navigate(["/dashboard"]),console.log(e)},e=>{this.loading=!1,this.errorMessage=e.message})})}}return e.\u0275fac=function(o){return new(o||e)(s.Kb(c.b),s.Kb(l.a),s.Kb(m.a),s.Kb(r.b))},e.\u0275cmp=s.Eb({type:e,selectors:[["app-login"]],decls:14,vars:5,consts:[[1,"container"],[1,"row"],[1,"col-md-6","mt-5","d-none","d-md-block"],["src","assets/images/titlebg.png","alt","logo",2,"max-width","100%","max-height","90vh"],[1,"col-md-6","mt-5"],["routerLink","/"],["src","assets/images/logo.png","alt","logo",1,"company-logo"],[1,"text-center","my-4",2,"font-size","24px"],["class","alert alert-danger","role","alert",4,"ngIf"],[4,"ngIf"],["class","mx-md-5",3,"formGroup","ngSubmit",4,"ngIf"],["class","text-center my-3",4,"ngIf"],["role","alert",1,"alert","alert-danger"],[1,"mx-md-5",3,"formGroup","ngSubmit"],["type","text","placeholder","User name","formControlName","username","autocomplete","no",1,"form-control"],["class","text-danger",4,"ngIf"],[1,"input-group","mb-1","mb-sm-0"],["placeholder","Password","formControlName","password",1,"form-control",3,"type"],[1,"input-group-append","mt-3"],["type","button",1,"btn","btn-outline-secondary",3,"click"],[1,"fa","fa-eye","fa-2x",3,"ngClass"],["type","submit",1,"btn","btn-block","btn-success","py-2","mt-3"],[1,"text-danger"],[3,"hidden"],[1,"text-center","my-3"],["routerLink","/register"]],template:function(e,o){1&e&&(s.Pb(0,"div",0),s.Pb(1,"div",1),s.Pb(2,"div",2),s.Lb(3,"img",3),s.Ob(),s.Pb(4,"div",4),s.Pb(5,"a",5),s.Lb(6,"img",6),s.Ob(),s.Pb(7,"div",7),s.xc(8,"ACCOUNT LOGIN"),s.Ob(),s.vc(9,g,2,1,"div",8),s.vc(10,h,1,0,"loading",9),s.vc(11,v,11,5,"form",10),s.vc(12,y,4,0,"div",11),s.vc(13,P,5,0,"div",11),s.Ob(),s.Ob(),s.Ob()),2&e&&(s.yb(9),s.hc("ngIf",o.errorMessage.length>0),s.yb(1),s.hc("ngIf",o.loading),s.yb(1),s.hc("ngIf",!o.loading),s.yb(1),s.hc("ngIf",!o.loading),s.yb(1),s.hc("ngIf",!o.loading))},directives:[r.d,d.n,u,c.s,c.j,c.d,c.a,c.i,c.c,d.l],styles:[".company-logo[_ngcontent-%COMP%]{width:160px;height:auto;margin:40px auto auto;display:block}.form-control[_ngcontent-%COMP%]{font-size:18px;height:55px;border-radius:0;margin-top:16px}"]}),e})();function x(e,o){if(1&e&&(s.Pb(0,"div",12),s.xc(1),s.Ob()),2&e){const e=s.bc();s.yb(1),s.zc(" ",e.errorMessage," ")}}function w(e,o){1&e&&(s.Pb(0,"div"),s.Lb(1,"i",13),s.xc(2," Thank you for registration with UNOLO Technology Limited bulk SMS. You can now "),s.Pb(3,"a",14),s.Pb(4,"strong"),s.xc(5,"Login"),s.Ob(),s.Ob(),s.xc(6," at our login page. "),s.Ob())}function k(e,o){1&e&&s.Lb(0,"loading")}function I(e,o){1&e&&(s.Pb(0,"small",27),s.xc(1," Name required "),s.Ob())}function L(e,o){if(1&e&&(s.Pb(0,"small",27),s.Pb(1,"div",28),s.xc(2," Phone required "),s.Ob(),s.Pb(3,"div",28),s.xc(4," Phone patter should be 01945564841 "),s.Ob(),s.Ob()),2&e){const e=s.bc(2);s.yb(1),s.hc("hidden",!e.form.controls.phone.errors.required),s.yb(2),s.hc("hidden",!e.form.controls.phone.errors.pattern)}}function M(e,o){if(1&e&&(s.Pb(0,"small",27),s.Pb(1,"div",28),s.xc(2," Email required "),s.Ob(),s.Pb(3,"div",28),s.xc(4," Invalid email "),s.Ob(),s.Ob()),2&e){const e=s.bc(2);s.yb(1),s.hc("hidden",!e.form.controls.email.errors.required),s.yb(2),s.hc("hidden",!e.form.controls.email.errors.email)}}function C(e,o){if(1&e&&(s.Pb(0,"small",27),s.Pb(1,"div",28),s.xc(2," Password required "),s.Ob(),s.Pb(3,"div",28),s.xc(4," Minimum passwor length required 6 "),s.Ob(),s.Ob()),2&e){const e=s.bc(2);s.yb(1),s.hc("hidden",!e.form.controls.password.errors.required),s.yb(2),s.hc("hidden",!e.form.controls.password.errors.minlength)}}function q(e,o){if(1&e){const e=s.Qb();s.Pb(0,"form",15),s.Zb("ngSubmit",function(){return s.pc(e),s.bc().submit()}),s.Pb(1,"div",16),s.Lb(2,"input",17),s.vc(3,I,2,0,"small",18),s.Lb(4,"input",19),s.vc(5,L,5,2,"small",18),s.Lb(6,"input",20),s.vc(7,M,5,2,"small",18),s.Pb(8,"div",21),s.Lb(9,"input",22),s.Pb(10,"div",23),s.Pb(11,"button",24),s.Zb("click",function(){s.pc(e);const o=s.bc();return o.showPassword=!o.showPassword}),s.Lb(12,"i",25),s.Ob(),s.Ob(),s.Ob(),s.vc(13,C,5,2,"small",18),s.Ob(),s.Pb(14,"button",26),s.xc(15,"REGISTER"),s.Ob(),s.Ob()}if(2&e){const e=s.bc();s.hc("formGroup",e.form),s.yb(3),s.hc("ngIf",e.form.controls.name.errors&&e.form.controls.name.touched),s.yb(2),s.hc("ngIf",e.form.controls.phone.errors&&e.form.controls.phone.touched),s.yb(2),s.hc("ngIf",e.form.controls.email.errors&&e.form.controls.email.touched),s.yb(2),s.hc("type",e.showPassword?"text":"password"),s.yb(3),s.hc("ngClass",e.showPassword?"fa-eye-slash":"fa-eye"),s.yb(1),s.hc("ngIf",e.form.controls.password.errors&&e.form.controls.password.touched)}}function N(e,o){1&e&&(s.Pb(0,"div",29),s.xc(1,"Already registered? "),s.Pb(2,"a",14),s.Pb(3,"strong"),s.xc(4,"Login"),s.Ob(),s.Ob(),s.Ob())}let S=(()=>{class e{constructor(e,o,t,r){this.fb=e,this.auth=o,this.userService=t,this.router=r,this.errorMessage="",this.thankyouMessage=!1,this.loading=!1,this.showPassword=!1}ngOnInit(){this.createForm()}createForm(){this.form=this.fb.group({name:["",c.q.required],email:["",[c.q.required,c.q.email]],phone:["",[c.q.required,c.q.pattern("^01[3-9][ ]?[0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{3}$")]],password:["",[c.q.required,c.q.minLength(6)]]})}submit(){if(this.form.valid){this.errorMessage="",this.loading=!0;const e=Object.assign({role:"USER"},this.form.value);this.auth.register(e.email,e.password).then(o=>{this.userService.saveRegisteredUser(o.user.uid,e.name,e.email,e.password).then(()=>{this.loading=!1,this.thankyouMessage=!0}).catch(e=>{this.errorMessage=e.message})}).catch(e=>{this.errorMessage=e.message})}else this.errorMessage="Form data missing"}}return e.\u0275fac=function(o){return new(o||e)(s.Kb(c.b),s.Kb(l.a),s.Kb(m.a),s.Kb(r.b))},e.\u0275cmp=s.Eb({type:e,selectors:[["app-register"]],decls:14,vars:5,consts:[[1,"container"],[1,"row"],[1,"col-md-6","mt-5","d-none","d-md-block"],["src","assets/images/titlebg.png","alt","logo",2,"width","100%"],[1,"col-md-6","mt-5"],["routerLink","/"],["src","assets/images/logo.png","alt","logo",1,"company-logo"],[1,"text-center","my-4",2,"font-size","24px"],["class","alert alert-danger","role","alert",4,"ngIf"],[4,"ngIf"],["class","mx-md-5",3,"formGroup","ngSubmit",4,"ngIf"],["class","text-center my-3",4,"ngIf"],["role","alert",1,"alert","alert-danger"],[1,"fa","fa-thumbs-o-up"],["routerLink","/login"],[1,"mx-md-5",3,"formGroup","ngSubmit"],[1,"form-row","mb-4"],["type","text","placeholder","Name","formControlName","name",1,"form-control"],["class","text-danger",4,"ngIf"],["type","text","placeholder","Phone","formControlName","phone",1,"form-control"],["type","text","placeholder","Email","formControlName","email",1,"form-control"],[1,"input-group","mb-1","mb-sm-0"],["placeholder","Password","formControlName","password",1,"form-control",3,"type"],[1,"input-group-append","mt-3"],["type","button",1,"btn","btn-outline-secondary",3,"click"],[1,"fa","fa-eye","fa-2x",3,"ngClass"],[1,"btn","btn-block","btn-success","py-2"],[1,"text-danger"],[3,"hidden"],[1,"text-center","my-3"]],template:function(e,o){1&e&&(s.Pb(0,"div",0),s.Pb(1,"div",1),s.Pb(2,"div",2),s.Lb(3,"img",3),s.Ob(),s.Pb(4,"div",4),s.Pb(5,"a",5),s.Lb(6,"img",6),s.Ob(),s.Pb(7,"div",7),s.xc(8,"REGISTRATION"),s.Ob(),s.vc(9,x,2,1,"div",8),s.vc(10,w,7,0,"div",9),s.vc(11,k,1,0,"loading",9),s.vc(12,q,16,7,"form",10),s.vc(13,N,5,0,"div",11),s.Ob(),s.Ob(),s.Ob()),2&e&&(s.yb(9),s.hc("ngIf",o.errorMessage.length>0),s.yb(1),s.hc("ngIf",o.thankyouMessage),s.yb(1),s.hc("ngIf",o.loading),s.yb(1),s.hc("ngIf",!o.thankyouMessage&&!o.loading),s.yb(1),s.hc("ngIf",!o.thankyouMessage))},directives:[r.d,d.n,u,c.s,c.j,c.d,c.a,c.i,c.c,d.l],styles:[".company-logo[_ngcontent-%COMP%]{width:160px;height:auto;margin:100px auto auto;display:block}.form-control[_ngcontent-%COMP%]{font-size:18px;height:55px;border-radius:0;margin-top:16px}"]}),e})();var E=t("1kSV");function G(e,o){if(1&e){const e=s.Qb();s.Pb(0,"li",9),s.Pb(1,"a",10),s.Zb("click",function(){return s.pc(e),s.bc().toggleCollapse()}),s.xc(2,"Dashboard"),s.Ob(),s.Ob()}}function K(e,o){if(1&e){const e=s.Qb();s.Pb(0,"li",9),s.Pb(1,"a",11),s.Zb("click",function(){return s.pc(e),s.bc().toggleCollapse()}),s.xc(2,"Login"),s.Ob(),s.Ob()}}function Z(e,o){if(1&e){const e=s.Qb();s.Pb(0,"li",9),s.Pb(1,"a",12),s.Zb("click",function(){s.pc(e);const o=s.bc();return o.toggleCollapse(),o.logout()}),s.xc(2,"Logout"),s.Ob(),s.Ob()}}let U=(()=>{class e{constructor(e){this.auth=e,this.show=!1}ngOnInit(){this.auth.user$.subscribe(e=>{this.user=e?{_id:e.uid,email:e.email}:null})}toggleCollapse(){this.show=!this.show}isAuthenticated(){return!!this.user}logout(){this.auth.logout()}}return e.\u0275fac=function(o){return new(o||e)(s.Kb(l.a))},e.\u0275cmp=s.Eb({type:e,selectors:[["top-nav"]],decls:12,vars:5,consts:[["aria-label","Fourth navbar example",1,"navbar","navbar-expand-md","navbar-dark","bg-primary-dark"],[1,"container-fluid"],["routerLink","/",1,"navbar-brand",3,"click"],["type","button","data-bs-toggle","collapse","data-bs-target","#homeNabBar","aria-controls","homeNabBar","aria-expanded","false","aria-label","Toggle navigation",1,"navbar-toggler",3,"click"],[1,"navbar-toggler-icon"],["id","homeNabBar",1,"collapse","navbar-collapse"],[1,"navbar-nav","mr-auto","mb-2","mb-md-0"],["class","nav-item ",4,"ngIf"],[1,"navbar-nav","mb-2","mb-md-0"],[1,"nav-item"],["routerLink","/dashboard",1,"nav-link",3,"click"],["routerLink","/login",1,"nav-link",3,"click"],[1,"nav-link",3,"click"]],template:function(e,o){1&e&&(s.Pb(0,"nav",0),s.Pb(1,"div",1),s.Pb(2,"a",2),s.Zb("click",function(){return o.toggleCollapse()}),s.xc(3,"UNOLO Ltd."),s.Ob(),s.Pb(4,"button",3),s.Zb("click",function(){return o.toggleCollapse()}),s.Lb(5,"span",4),s.Ob(),s.Pb(6,"div",5),s.Pb(7,"ul",6),s.vc(8,G,3,0,"li",7),s.Ob(),s.Pb(9,"ul",8),s.vc(10,K,3,0,"li",7),s.vc(11,Z,3,0,"li",7),s.Ob(),s.Ob(),s.Ob(),s.Ob()),2&e&&(s.yb(6),s.Cb("show",o.show),s.yb(2),s.hc("ngIf",o.isAuthenticated()),s.yb(2),s.hc("ngIf",!o.isAuthenticated()),s.yb(1),s.hc("ngIf",o.isAuthenticated()))},directives:[E.h,r.d,d.n],styles:[".nav-link[_ngcontent-%COMP%], .navbar[_ngcontent-%COMP%], .navbar-brand[_ngcontent-%COMP%]{display:block;padding:0}.nav-link[_ngcontent-%COMP%]{cursor:pointer}"]}),e})();const _=[{path:"login",component:O},{path:"register",component:S},{path:"",component:(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=s.Eb({type:e,selectors:[["app-home"]],decls:2,vars:0,template:function(e,o){1&e&&(s.Lb(0,"top-nav"),s.Lb(1,"router-outlet"))},directives:[U,r.f],styles:[""]}),e})(),children:[{path:"",component:a}]}];let R=(()=>{class e{}return e.\u0275mod=s.Ib({type:e}),e.\u0275inj=s.Hb({factory:function(o){return new(o||e)},imports:[[n.a,r.e.forChild(_)]]}),e})()}}]);