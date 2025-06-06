import{b as y}from"./chunk-UZKQSB4C.js";import{c as K,d as x,f as v,g as b,h as L}from"./chunk-QDXQE2EN.js";import{b as le}from"./chunk-6R4RIIF6.js";import{a as ae}from"./chunk-GFFBMY3N.js";import{A as te,P as ie,S as oe,T as ne,W as re,Z as se,b as U,h as X,j as G,m as J,t as O,z as ee}from"./chunk-7TJXTN3F.js";import{j as N,l as Q,m as Y,n as W,p as q,s as m}from"./chunk-GT6PACLV.js";import{Aa as V,Gb as B,Ib as M,Jb as S,Ka as $,M as I,Oa as H,Pa as d,S as p,Va as z,Wa as h,Wb as f,Xb as j,Z as l,_ as c,_a as E,aa as g,eb as _,fb as A,ga as C,ha as P,kb as F,nb as u,ob as r,pb as R,qb as Z,sb as w,ub as k,vb as T,za as D}from"./chunk-W4ZOI5UP.js";var pe=["content"],de=["*"],he=(t,s)=>({showTransitionParams:t,hideTransitionParams:s}),ue=(t,s)=>({value:t,params:s}),fe=t=>({closeCallback:t});function me(t,s){}function ve(t,s){t&1&&d(0,me,0,0,"ng-template")}function be(t,s){if(t&1){let e=F();_(0,"div",1),u("click",function(o){l(e);let n=r();return c(n.onOverlayClick(o))})("@animation.start",function(o){l(e);let n=r();return c(n.onAnimationStart(o))})("@animation.done",function(o){l(e);let n=r();return c(n.onAnimationEnd(o))}),_(1,"div",2),u("click",function(o){l(e);let n=r();return c(n.onContentClick(o))})("mousedown",function(o){l(e);let n=r();return c(n.onContentClick(o))}),Z(2),d(3,ve,1,0,null,3),A()()}if(t&2){let e=r();E(e.styleClass),h("ngClass","p-popover p-component")("ngStyle",e.style)("@animation",S(13,ue,e.overlayVisible?"open":"close",S(10,he,e.showTransitionOptions,e.hideTransitionOptions))),z("aria-modal",e.overlayVisible)("aria-label",e.ariaLabel)("aria-labelledBy",e.ariaLabelledBy),V(3),h("ngTemplateOutlet",e.contentTemplate||e._contentTemplate)("ngTemplateOutletContext",M(16,fe,e.onCloseClick.bind(e)))}}var ye=({dt:t})=>`
.p-popover {
    margin-top: ${t("popover.gutter")};
    background: ${t("popover.background")};
    color: ${t("popover.color")};
    border: 1px solid ${t("popover.border.color")};
    border-radius: ${t("popover.border.radius")};
    box-shadow: ${t("popover.shadow")};
    position: absolute
}

.p-popover-content {
    padding: ${t("popover.content.padding")};
}

.p-popover-flipped {
    margin-top: calc(${t("popover.gutter")} * -1);
    margin-bottom: ${t("popover.gutter")};
}

.p-popover-enter-from {
    opacity: 0;
    transform: scaleY(0.8);
}

.p-popover-leave-to {
    opacity: 0;
}

.p-popover-enter-active {
    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1), opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
}

.p-popover-leave-active {
    transition: opacity 0.1s linear;
}

.p-popover:after,
.p-popover:before {
    bottom: 100%;
    left: calc(${t("popover.arrow.offset")} + ${t("popover.arrow.left")});
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
}

.p-popover:after {
    border-width: calc(${t("popover.gutter")} - 2px);
    margin-left: calc(-1 * (${t("popover.gutter")} - 2px));
    border-style: solid;
    border-color: transparent;
    border-bottom-color: ${t("popover.background")};
}

.p-popover:before {
    border-width: ${t("popover.gutter")};
    margin-left: calc(-1 * ${t("popover.gutter")});
    border-style: solid;
    border-color: transparent;
    border-bottom-color: ${t("popover.border.color")};
}

.p-popover-flipped:after,
.p-popover-flipped:before {
    bottom: auto;
    top: 100%;
}

.p-popover.p-popover-flipped:after {
    border-bottom-color: transparent;
    border-top-color: ${t("popover.background")};
}

.p-popover.p-popover-flipped:before {
    border-bottom-color: transparent;
    border-top-color: ${t("popover.border.color")};
}

`,ge={root:"p-popover p-component",content:"p-popover-content"},ce=(()=>{class t extends se{name="popover";theme=ye;classes=ge;static \u0275fac=(()=>{let e;return function(o){return(e||(e=g(t)))(o||t)}})();static \u0275prov=I({token:t,factory:t.\u0275fac})}return t})(),Ne=(()=>{class t extends ae{ariaLabel;ariaLabelledBy;dismissable=!0;style;styleClass;appendTo="body";autoZIndex=!0;ariaCloseLabel;baseZIndex=0;focusOnShow=!0;showTransitionOptions=".12s cubic-bezier(0, 0, 0.2, 1)";hideTransitionOptions=".1s linear";onShow=new C;onHide=new C;container;overlayVisible=!1;render=!1;isOverlayAnimationInProgress=!1;selfClick=!1;documentClickListener;target;willHide;scrollHandler;documentResizeListener;contentTemplate;templates;_contentTemplate;destroyCallback;overlayEventListener;overlaySubscription;_componentStyle=p(ce);zone=p(P);overlayService=p(ie);ngAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"content":this._contentTemplate=e.template;break}})}bindDocumentClickListener(){if(m(this.platformId)&&!this.documentClickListener){let e=ee()?"touchstart":"click",i=this.el?this.el.nativeElement.ownerDocument:this.document;this.documentClickListener=this.renderer.listen(i,e,o=>{this.dismissable&&(!this.container?.contains(o.target)&&this.target!==o.target&&!this.target.contains(o.target)&&!this.selfClick&&this.hide(),this.selfClick=!1,this.cd.markForCheck())})}}unbindDocumentClickListener(){this.documentClickListener&&(this.documentClickListener(),this.documentClickListener=null,this.selfClick=!1)}toggle(e,i){this.isOverlayAnimationInProgress||(this.overlayVisible?(this.hasTargetChanged(e,i)&&(this.destroyCallback=()=>{this.show(null,i||e.currentTarget||e.target)}),this.hide()):this.show(e,i))}show(e,i){i&&e&&e.stopPropagation(),!this.isOverlayAnimationInProgress&&(this.target=i||e.currentTarget||e.target,this.overlayVisible=!0,this.render=!0,this.cd.markForCheck())}onOverlayClick(e){this.overlayService.add({originalEvent:e,target:this.el.nativeElement}),this.selfClick=!0}onContentClick(e){let i=e.target;this.selfClick=e.offsetX<i.clientWidth&&e.offsetY<i.clientHeight}hasTargetChanged(e,i){return this.target!=null&&this.target!==(i||e.currentTarget||e.target)}appendContainer(){this.appendTo&&(this.appendTo==="body"?this.renderer.appendChild(this.document.body,this.container):G(this.appendTo,this.container))}restoreAppend(){this.container&&this.appendTo&&this.renderer.appendChild(this.el.nativeElement,this.container)}align(){this.autoZIndex&&y.set("overlay",this.container,this.baseZIndex+this.config.zIndex.overlay),X(this.container,this.target,!1);let e=O(this.container),i=O(this.target),o=this.document.defaultView?.getComputedStyle(this.container).getPropertyValue("border-radius"),n=0;e.left<i.left&&(n=i.left-e.left-parseFloat(o)*2),this.container?.style.setProperty(re("popover.arrow.left").name,`${n}px`),e.top<i.top&&(this.container.setAttribute("data-p-popover-flipped","true"),U(this.container,"p-popover-flipped"))}onAnimationStart(e){e.toState==="open"&&(this.container=e.element,this.appendContainer(),this.align(),this.bindDocumentClickListener(),this.bindDocumentResizeListener(),this.bindScrollListener(),this.focusOnShow&&this.focus(),this.overlayEventListener=i=>{this.container&&this.container.contains(i.target)&&(this.selfClick=!0)},this.overlaySubscription=this.overlayService.clickObservable.subscribe(this.overlayEventListener),this.onShow.emit(null)),this.isOverlayAnimationInProgress=!0}onAnimationEnd(e){switch(e.toState){case"void":this.destroyCallback&&(this.destroyCallback(),this.destroyCallback=null),this.overlaySubscription&&this.overlaySubscription.unsubscribe();break;case"close":this.autoZIndex&&y.clear(this.container),this.overlaySubscription&&this.overlaySubscription.unsubscribe(),this.onContainerDestroy(),this.onHide.emit({}),this.render=!1;break}this.isOverlayAnimationInProgress=!1}focus(){let e=J(this.container,"[autofocus]");e&&this.zone.runOutsideAngular(()=>{setTimeout(()=>e.focus(),5)})}hide(){this.overlayVisible=!1,this.cd.markForCheck()}onCloseClick(e){this.hide(),e.preventDefault()}onEscapeKeydown(e){this.hide()}onWindowResize(){this.overlayVisible&&!te()&&this.hide()}bindDocumentResizeListener(){if(m(this.platformId)&&!this.documentResizeListener){let e=this.document.defaultView;this.documentResizeListener=this.renderer.listen(e,"resize",this.onWindowResize.bind(this))}}unbindDocumentResizeListener(){this.documentResizeListener&&(this.documentResizeListener(),this.documentResizeListener=null)}bindScrollListener(){m(this.platformId)&&(this.scrollHandler||(this.scrollHandler=new le(this.target,()=>{this.overlayVisible&&this.hide()})),this.scrollHandler.bindScrollListener())}unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()}onContainerDestroy(){this.cd.destroyed||(this.target=null),this.unbindDocumentClickListener(),this.unbindDocumentResizeListener(),this.unbindScrollListener()}ngOnDestroy(){this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.container&&this.autoZIndex&&y.clear(this.container),this.cd.destroyed||(this.target=null),this.destroyCallback=null,this.container&&(this.restoreAppend(),this.onContainerDestroy()),this.overlaySubscription&&this.overlaySubscription.unsubscribe(),super.ngOnDestroy()}static \u0275fac=(()=>{let e;return function(o){return(e||(e=g(t)))(o||t)}})();static \u0275cmp=$({type:t,selectors:[["p-popover"]],contentQueries:function(i,o,n){if(i&1&&(w(n,pe,4),w(n,oe,4)),i&2){let a;k(a=T())&&(o.contentTemplate=a.first),k(a=T())&&(o.templates=a)}},hostBindings:function(i,o){i&1&&u("keydown.escape",function(a){return o.onEscapeKeydown(a)},!1,D)},inputs:{ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",dismissable:[2,"dismissable","dismissable",f],style:"style",styleClass:"styleClass",appendTo:"appendTo",autoZIndex:[2,"autoZIndex","autoZIndex",f],ariaCloseLabel:"ariaCloseLabel",baseZIndex:[2,"baseZIndex","baseZIndex",j],focusOnShow:[2,"focusOnShow","focusOnShow",f],showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions"},outputs:{onShow:"onShow",onHide:"onHide"},features:[B([ce]),H],ngContentSelectors:de,decls:1,vars:1,consts:[["role","dialog",3,"ngClass","ngStyle","class","click",4,"ngIf"],["role","dialog",3,"click","ngClass","ngStyle"],[1,"p-popover-content",3,"click","mousedown"],[4,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(i,o){i&1&&(R(),d(0,be,4,18,"div",0)),i&2&&h("ngIf",o.render)},dependencies:[q,N,Q,W,Y,ne],encapsulation:2,data:{animation:[K("animation",[b("void",v({transform:"scaleY(0.8)",opacity:0})),b("close",v({opacity:0})),b("open",v({transform:"translateY(0)",opacity:1})),L("void => open",x("{{showTransitionParams}}")),L("open => close",x("{{hideTransitionParams}}"))])]},changeDetection:0})}return t})();export{Ne as a};
