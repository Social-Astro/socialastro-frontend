import{a as P}from"./chunk-GFFBMY3N.js";import{S as q,T as g,Z as A}from"./chunk-7TJXTN3F.js";import{j as Q,l as E,n as N,p as O}from"./chunk-GT6PACLV.js";import{Aa as o,Gb as z,Ka as b,La as C,M as v,N as h,Oa as $,Pa as r,S as T,Wa as i,Wb as B,Za as k,_a as I,aa as p,eb as u,fb as d,gb as x,hb as M,ib as w,ob as l,pb as D,qb as F,sb as f,ub as m,vb as y,xb as j,yb as S}from"./chunk-W4ZOI5UP.js";var V=["icon"],H=["*"];function G(e,c){if(e&1&&x(0,"span",4),e&2){let t=l(2);i("ngClass",t.icon)}}function J(e,c){if(e&1&&(M(0),r(1,G,1,1,"span",3),w()),e&2){let t=l();o(),i("ngIf",t.icon)}}function K(e,c){}function L(e,c){e&1&&r(0,K,0,0,"ng-template")}function U(e,c){if(e&1&&(u(0,"span",5),r(1,L,1,0,null,6),d()),e&2){let t=l();o(),i("ngTemplateOutlet",t.iconTemplate||t._iconTemplate)}}var W=({dt:e})=>`
.p-tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${e("tag.primary.background")};
    color: ${e("tag.primary.color")};
    font-size: ${e("tag.font.size")};
    font-weight: ${e("tag.font.weight")};
    padding: ${e("tag.padding")};
    border-radius: ${e("tag.border.radius")};
    gap: ${e("tag.gap")};
}

.p-tag-icon {
    font-size: ${e("tag.icon.size")};
    width: ${e("tag.icon.size")};
    height:${e("tag.icon.size")};
}

.p-tag-rounded {
    border-radius: ${e("tag.rounded.border.radius")};
}

.p-tag-success {
    background: ${e("tag.success.background")};
    color: ${e("tag.success.color")};
}

.p-tag-info {
    background: ${e("tag.info.background")};
    color: ${e("tag.info.color")};
}

.p-tag-warn {
    background: ${e("tag.warn.background")};
    color: ${e("tag.warn.color")};
}

.p-tag-danger {
    background: ${e("tag.danger.background")};
    color: ${e("tag.danger.color")};
}

.p-tag-secondary {
    background: ${e("tag.secondary.background")};
    color: ${e("tag.secondary.color")};
}

.p-tag-contrast {
    background: ${e("tag.contrast.background")};
    color: ${e("tag.contrast.color")};
}
`,X={root:({props:e})=>["p-tag p-component",{"p-tag-info":e.severity==="info","p-tag-success":e.severity==="success","p-tag-warn":e.severity==="warn","p-tag-danger":e.severity==="danger","p-tag-secondary":e.severity==="secondary","p-tag-contrast":e.severity==="contrast","p-tag-rounded":e.rounded}],icon:"p-tag-icon",label:"p-tag-label"},R=(()=>{class e extends A{name="tag";theme=W;classes=X;static \u0275fac=(()=>{let t;return function(n){return(t||(t=p(e)))(n||e)}})();static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})();var Y=(()=>{class e extends P{get style(){return this._style}set style(t){this._style=t,this.cd.markForCheck()}styleClass;severity;value;icon;rounded;iconTemplate;templates;_iconTemplate;_style;_componentStyle=T(R);ngAfterContentInit(){this.templates?.forEach(t=>{switch(t.getType()){case"icon":this._iconTemplate=t.template;break}})}containerClass(){let t="p-tag p-component";return this.severity&&(t+=` p-tag-${this.severity}`),this.rounded&&(t+=" p-tag-rounded"),this.styleClass&&(t+=` ${this.styleClass}`),t}static \u0275fac=(()=>{let t;return function(n){return(t||(t=p(e)))(n||e)}})();static \u0275cmp=b({type:e,selectors:[["p-tag"]],contentQueries:function(a,n,_){if(a&1&&(f(_,V,4),f(_,q,4)),a&2){let s;m(s=y())&&(n.iconTemplate=s.first),m(s=y())&&(n.templates=s)}},hostVars:4,hostBindings:function(a,n){a&2&&(k(n.style),I(n.containerClass()))},inputs:{style:"style",styleClass:"styleClass",severity:"severity",value:"value",icon:"icon",rounded:[2,"rounded","rounded",B]},features:[z([R]),$],ngContentSelectors:H,decls:5,vars:3,consts:[[4,"ngIf"],["class","p-tag-icon",4,"ngIf"],[1,"p-tag-label"],["class","p-tag-icon",3,"ngClass",4,"ngIf"],[1,"p-tag-icon",3,"ngClass"],[1,"p-tag-icon"],[4,"ngTemplateOutlet"]],template:function(a,n){a&1&&(D(),F(0),r(1,J,2,1,"ng-container",0)(2,U,2,1,"span",1),u(3,"span",2),j(4),d()),a&2&&(o(),i("ngIf",!n.iconTemplate&&!n._iconTemplate),o(),i("ngIf",n.iconTemplate||n._iconTemplate),o(2),S(n.value))},dependencies:[O,Q,E,N,g],encapsulation:2,changeDetection:0})}return e})(),fe=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275mod=C({type:e});static \u0275inj=h({imports:[Y,g,g]})}return e})();export{Y as a,fe as b};
