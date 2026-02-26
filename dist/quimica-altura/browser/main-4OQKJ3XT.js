var ES=Object.defineProperty,TS=Object.defineProperties;var CS=Object.getOwnPropertyDescriptors;var Gg=Object.getOwnPropertySymbols;var IS=Object.prototype.hasOwnProperty,AS=Object.prototype.propertyIsEnumerable;var Wg=(i,e,t)=>e in i?ES(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,Zn=(i,e)=>{for(var t in e||={})IS.call(e,t)&&Wg(i,t,e[t]);if(Gg)for(var t of Gg(e))AS.call(e,t)&&Wg(i,t,e[t]);return i},bi=(i,e)=>TS(i,CS(e));var Ea=(i,e,t)=>new Promise((n,r)=>{var s=c=>{try{a(t.next(c))}catch(l){r(l)}},o=c=>{try{a(t.throw(c))}catch(l){r(l)}},a=c=>c.done?n(c.value):Promise.resolve(c.value).then(s,o);a((t=t.apply(i,e)).next())});var wd=null;var jg=1,Ta=Symbol("SIGNAL");function lt(i){let e=wd;return wd=i,e}function Td(){return wd}var Cd={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function $g(i){if(!(Pd(i)&&!i.dirty)&&!(!i.dirty&&i.lastCleanEpoch===jg)){if(!i.producerMustRecompute(i)&&!Ad(i)){Ed(i);return}i.producerRecomputeValue(i),Ed(i)}}function Ed(i){i.dirty=!1,i.lastCleanEpoch=jg}function Id(i){return i&&(i.nextProducerIndex=0),lt(i)}function qg(i,e){if(lt(e),!(!i||i.producerNode===void 0||i.producerIndexOfThis===void 0||i.producerLastReadVersion===void 0)){if(Pd(i))for(let t=i.nextProducerIndex;t<i.producerNode.length;t++)Rd(i.producerNode[t],i.producerIndexOfThis[t]);for(;i.producerNode.length>i.nextProducerIndex;)i.producerNode.pop(),i.producerLastReadVersion.pop(),i.producerIndexOfThis.pop()}}function Ad(i){Nd(i);for(let e=0;e<i.producerNode.length;e++){let t=i.producerNode[e],n=i.producerLastReadVersion[e];if(n!==t.version||($g(t),n!==t.version))return!0}return!1}function Dd(i){if(Nd(i),Pd(i))for(let e=0;e<i.producerNode.length;e++)Rd(i.producerNode[e],i.producerIndexOfThis[e]);i.producerNode.length=i.producerLastReadVersion.length=i.producerIndexOfThis.length=0,i.liveConsumerNode&&(i.liveConsumerNode.length=i.liveConsumerIndexOfThis.length=0)}function Rd(i,e){if(DS(i),i.liveConsumerNode.length===1&&RS(i))for(let n=0;n<i.producerNode.length;n++)Rd(i.producerNode[n],i.producerIndexOfThis[n]);let t=i.liveConsumerNode.length-1;if(i.liveConsumerNode[e]=i.liveConsumerNode[t],i.liveConsumerIndexOfThis[e]=i.liveConsumerIndexOfThis[t],i.liveConsumerNode.length--,i.liveConsumerIndexOfThis.length--,e<i.liveConsumerNode.length){let n=i.liveConsumerIndexOfThis[e],r=i.liveConsumerNode[e];Nd(r),r.producerIndexOfThis[n]=e}}function Pd(i){return i.consumerIsAlwaysLive||(i?.liveConsumerNode?.length??0)>0}function Nd(i){i.producerNode??=[],i.producerIndexOfThis??=[],i.producerLastReadVersion??=[]}function DS(i){i.liveConsumerNode??=[],i.liveConsumerIndexOfThis??=[]}function RS(i){return i.producerNode!==void 0}function PS(){throw new Error}var NS=PS;function Ld(i){NS=i}var Od;function Ca(){return Od}function er(i){let e=Od;return Od=i,e}var zc=Symbol("NotFound");function Un(i){return typeof i=="function"}function Hc(i){let t=i(n=>{Error.call(n),n.stack=new Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var Gc=Hc(i=>function(t){i(this),this.message=t?`${t.length} errors occurred during unsubscription:
${t.map((n,r)=>`${r+1}) ${n.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=t});function Ia(i,e){if(i){let t=i.indexOf(e);0<=t&&i.splice(t,1)}}var Cn=class i{constructor(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let e;if(!this.closed){this.closed=!0;let{_parentage:t}=this;if(t)if(this._parentage=null,Array.isArray(t))for(let s of t)s.remove(this);else t.remove(this);let{initialTeardown:n}=this;if(Un(n))try{n()}catch(s){e=s instanceof Gc?s.errors:[s]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let s of r)try{Xg(s)}catch(o){e=e??[],o instanceof Gc?e=[...e,...o.errors]:e.push(o)}}if(e)throw new Gc(e)}}add(e){var t;if(e&&e!==this)if(this.closed)Xg(e);else{if(e instanceof i){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(e)}}_hasParent(e){let{_parentage:t}=this;return t===e||Array.isArray(t)&&t.includes(e)}_addParent(e){let{_parentage:t}=this;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e}_removeParent(e){let{_parentage:t}=this;t===e?this._parentage=null:Array.isArray(t)&&Ia(t,e)}remove(e){let{_finalizers:t}=this;t&&Ia(t,e),e instanceof i&&e._removeParent(this)}};Cn.EMPTY=(()=>{let i=new Cn;return i.closed=!0,i})();var kd=Cn.EMPTY;function Wc(i){return i instanceof Cn||i&&"closed"in i&&Un(i.remove)&&Un(i.add)&&Un(i.unsubscribe)}function Xg(i){Un(i)?i():i.unsubscribe()}var wi={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var lo={setTimeout(i,e,...t){let{delegate:n}=lo;return n?.setTimeout?n.setTimeout(i,e,...t):setTimeout(i,e,...t)},clearTimeout(i){let{delegate:e}=lo;return(e?.clearTimeout||clearTimeout)(i)},delegate:void 0};function Yg(i){lo.setTimeout(()=>{let{onUnhandledError:e}=wi;if(e)e(i);else throw i})}function Fd(){}var Zg=Ud("C",void 0,void 0);function Jg(i){return Ud("E",void 0,i)}function Kg(i){return Ud("N",i,void 0)}function Ud(i,e,t){return{kind:i,value:e,error:t}}var hs=null;function uo(i){if(wi.useDeprecatedSynchronousErrorHandling){let e=!hs;if(e&&(hs={errorThrown:!1,error:null}),i(),e){let{errorThrown:t,error:n}=hs;if(hs=null,t)throw n}}else i()}function Qg(i){wi.useDeprecatedSynchronousErrorHandling&&hs&&(hs.errorThrown=!0,hs.error=i)}var ps=class extends Cn{constructor(e){super(),this.isStopped=!1,e?(this.destination=e,Wc(e)&&e.add(this)):this.destination=$S}static create(e,t,n){return new fo(e,t,n)}next(e){this.isStopped?Vd(Kg(e),this):this._next(e)}error(e){this.isStopped?Vd(Jg(e),this):(this.isStopped=!0,this._error(e))}complete(){this.isStopped?Vd(Zg,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(e){this.destination.next(e)}_error(e){try{this.destination.error(e)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},WS=Function.prototype.bind;function Bd(i,e){return WS.call(i,e)}var zd=class{constructor(e){this.partialObserver=e}next(e){let{partialObserver:t}=this;if(t.next)try{t.next(e)}catch(n){jc(n)}}error(e){let{partialObserver:t}=this;if(t.error)try{t.error(e)}catch(n){jc(n)}else jc(e)}complete(){let{partialObserver:e}=this;if(e.complete)try{e.complete()}catch(t){jc(t)}}},fo=class extends ps{constructor(e,t,n){super();let r;if(Un(e)||!e)r={next:e??void 0,error:t??void 0,complete:n??void 0};else{let s;this&&wi.useDeprecatedNextContext?(s=Object.create(e),s.unsubscribe=()=>this.unsubscribe(),r={next:e.next&&Bd(e.next,s),error:e.error&&Bd(e.error,s),complete:e.complete&&Bd(e.complete,s)}):r=e}this.destination=new zd(r)}};function jc(i){wi.useDeprecatedSynchronousErrorHandling?Qg(i):Yg(i)}function jS(i){throw i}function Vd(i,e){let{onStoppedNotification:t}=wi;t&&lo.setTimeout(()=>t(i,e))}var $S={closed:!0,next:Fd,error:jS,complete:Fd};var e_=typeof Symbol=="function"&&Symbol.observable||"@@observable";function t_(i){return i}function n_(i){return i.length===0?t_:i.length===1?i[0]:function(t){return i.reduce((n,r)=>r(n),t)}}var Hd=(()=>{class i{constructor(t){t&&(this._subscribe=t)}lift(t){let n=new i;return n.source=this,n.operator=t,n}subscribe(t,n,r){let s=XS(t)?t:new fo(t,n,r);return uo(()=>{let{operator:o,source:a}=this;s.add(o?o.call(s,a):a?this._subscribe(s):this._trySubscribe(s))}),s}_trySubscribe(t){try{return this._subscribe(t)}catch(n){t.error(n)}}forEach(t,n){return n=i_(n),new n((r,s)=>{let o=new fo({next:a=>{try{t(a)}catch(c){s(c),o.unsubscribe()}},error:s,complete:r});this.subscribe(o)})}_subscribe(t){var n;return(n=this.source)===null||n===void 0?void 0:n.subscribe(t)}[e_](){return this}pipe(...t){return n_(t)(this)}toPromise(t){return t=i_(t),new t((n,r)=>{let s;this.subscribe(o=>s=o,o=>r(o),()=>n(s))})}}return i.create=e=>new i(e),i})();function i_(i){var e;return(e=i??wi.Promise)!==null&&e!==void 0?e:Promise}function qS(i){return i&&Un(i.next)&&Un(i.error)&&Un(i.complete)}function XS(i){return i&&i instanceof ps||qS(i)&&Wc(i)}function YS(i){return Un(i?.lift)}function r_(i){return e=>{if(YS(e))return e.lift(function(t){try{return i(t,this)}catch(n){this.error(n)}});throw new TypeError("Unable to lift unknown Observable type")}}function s_(i,e,t,n,r){return new Gd(i,e,t,n,r)}var Gd=class extends ps{constructor(e,t,n,r,s,o){super(e),this.onFinalize=s,this.shouldUnsubscribe=o,this._next=t?function(a){try{t(a)}catch(c){e.error(c)}}:super._next,this._error=r?function(a){try{r(a)}catch(c){e.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=n?function(){try{n()}catch(a){e.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:t}=this;super.unsubscribe(),!t&&((e=this.onFinalize)===null||e===void 0||e.call(this))}}};var o_=Hc(i=>function(){i(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var Or=(()=>{class i extends Hd{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(t){let n=new $c(this,this);return n.operator=t,n}_throwIfClosed(){if(this.closed)throw new o_}next(t){uo(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let n of this.currentObservers)n.next(t)}})}error(t){uo(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=t;let{observers:n}=this;for(;n.length;)n.shift().error(t)}})}complete(){uo(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:t}=this;for(;t.length;)t.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var t;return((t=this.observers)===null||t===void 0?void 0:t.length)>0}_trySubscribe(t){return this._throwIfClosed(),super._trySubscribe(t)}_subscribe(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)}_innerSubscribe(t){let{hasError:n,isStopped:r,observers:s}=this;return n||r?kd:(this.currentObservers=null,s.push(t),new Cn(()=>{this.currentObservers=null,Ia(s,t)}))}_checkFinalizedStatuses(t){let{hasError:n,thrownError:r,isStopped:s}=this;n?t.error(r):s&&t.complete()}asObservable(){let t=new Hd;return t.source=this,t}}return i.create=(e,t)=>new $c(e,t),i})(),$c=class extends Or{constructor(e,t){super(),this.destination=e,this.source=t}next(e){var t,n;(n=(t=this.destination)===null||t===void 0?void 0:t.next)===null||n===void 0||n.call(t,e)}error(e){var t,n;(n=(t=this.destination)===null||t===void 0?void 0:t.error)===null||n===void 0||n.call(t,e)}complete(){var e,t;(t=(e=this.destination)===null||e===void 0?void 0:e.complete)===null||t===void 0||t.call(e)}_subscribe(e){var t,n;return(n=(t=this.source)===null||t===void 0?void 0:t.subscribe(e))!==null&&n!==void 0?n:kd}};var Aa=class extends Or{constructor(e){super(),this._value=e}get value(){return this.getValue()}_subscribe(e){let t=super._subscribe(e);return!t.closed&&e.next(this._value),t}getValue(){let{hasError:e,thrownError:t,_value:n}=this;if(e)throw t;return this._throwIfClosed(),n}next(e){super.next(this._value=e)}};function Wd(i,e){return r_((t,n)=>{let r=0;t.subscribe(s_(n,s=>{n.next(i.call(e,s,r++))}))})}var ht=class extends Error{code;constructor(e,t){super(JS(e,t)),this.code=e}};function ZS(i){return`NG0${Math.abs(i)}`}function JS(i,e){return`${ZS(i)}${e?": "+e:""}`}function KS(i){return{toString:i}.toString()}function Ot(i){for(let e in i)if(i[e]===Ot)return e;throw Error("Could not find renamed property on target object.")}function Ci(i){if(typeof i=="string")return i;if(Array.isArray(i))return`[${i.map(Ci).join(", ")}]`;if(i==null)return""+i;let e=i.overriddenName||i.name;if(e)return`${e}`;let t=i.toString();if(t==null)return""+t;let n=t.indexOf(`
`);return n>=0?t.slice(0,n):t}function a_(i,e){return i?e?`${i} ${e}`:i:e||""}var QS=Ot({__forward_ref__:Ot});function $_(i){return i.__forward_ref__=$_,i.toString=function(){return Ci(this())},i}function Ti(i){return eb(i)?i():i}function eb(i){return typeof i=="function"&&i.hasOwnProperty(QS)&&i.__forward_ref__===$_}function Yt(i){return{token:i.token,providedIn:i.providedIn||null,factory:i.factory,value:void 0}}function kf(i){return c_(i,q_)||c_(i,X_)}function c_(i,e){return i.hasOwnProperty(e)?i[e]:null}function tb(i){let e=i&&(i[q_]||i[X_]);return e||null}function l_(i){return i&&(i.hasOwnProperty(u_)||i.hasOwnProperty(nb))?i[u_]:null}var q_=Ot({\u0275prov:Ot}),u_=Ot({\u0275inj:Ot}),X_=Ot({ngInjectableDef:Ot}),nb=Ot({ngInjectorDef:Ot}),pt=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(e,t){this._desc=e,this.\u0275prov=void 0,typeof t=="number"?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.\u0275prov=Yt({token:this,providedIn:t.providedIn||"root",factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Y_(i){return i&&!!i.\u0275providers}var ib=Ot({\u0275cmp:Ot}),rb=Ot({\u0275dir:Ot}),sb=Ot({\u0275pipe:Ot});var d_=Ot({\u0275fac:Ot}),Na=Ot({__NG_ELEMENT_ID__:Ot}),f_=Ot({__NG_ENV_ID__:Ot});function ob(i){return typeof i=="string"?i:i==null?"":String(i)}function ab(i){return typeof i=="function"?i.name||i.toString():typeof i=="object"&&i!=null&&typeof i.type=="function"?i.type.name||i.type.toString():ob(i)}function Z_(i,e){throw new ht(-200,i)}function Ff(i,e){throw new ht(-201,!1)}var nt=function(i){return i[i.Default=0]="Default",i[i.Host=1]="Host",i[i.Self=2]="Self",i[i.SkipSelf=4]="SkipSelf",i[i.Optional=8]="Optional",i}(nt||{}),Qd;function J_(){return Qd}function li(i){let e=Qd;return Qd=i,e}function K_(i,e,t){let n=kf(i);if(n&&n.providedIn=="root")return n.value===void 0?n.value=n.factory():n.value;if(t&nt.Optional)return null;if(e!==void 0)return e;Ff(i,"Injector")}var cb={},ms=cb,lb="__NG_DI_FLAG__",Qc=class{injector;constructor(e){this.injector=e}retrieve(e,t){let n=t;return this.injector.get(e,n.optional?zc:ms,n)}},el="ngTempTokenPath",ub="ngTokenPath",db=/\n/gm,fb="\u0275",h_="__source";function hb(i,e=nt.Default){if(Ca()===void 0)throw new ht(-203,!1);if(Ca()===null)return K_(i,void 0,e);{let t=Ca(),n;return t instanceof Qc?n=t.injector:n=t,n.get(i,e&nt.Optional?null:void 0,e)}}function Tt(i,e=nt.Default){return(J_()||hb)(Ti(i),e)}function Mt(i,e=nt.Default){return Tt(i,xl(e))}function xl(i){return typeof i>"u"||typeof i=="number"?i:0|(i.optional&&8)|(i.host&&1)|(i.self&&2)|(i.skipSelf&&4)}function ef(i){let e=[];for(let t=0;t<i.length;t++){let n=Ti(i[t]);if(Array.isArray(n)){if(n.length===0)throw new ht(900,!1);let r,s=nt.Default;for(let o=0;o<n.length;o++){let a=n[o],c=pb(a);typeof c=="number"?c===-1?r=a.token:s|=c:r=a}e.push(Tt(r,s))}else e.push(Tt(n))}return e}function pb(i){return i[lb]}function mb(i,e,t,n){let r=i[el];throw e[h_]&&r.unshift(e[h_]),i.message=gb(`
`+i.message,r,t,n),i[ub]=r,i[el]=null,i}function gb(i,e,t,n=null){i=i&&i.charAt(0)===`
`&&i.charAt(1)==fb?i.slice(2):i;let r=Ci(e);if(Array.isArray(e))r=e.map(Ci).join(" -> ");else if(typeof e=="object"){let s=[];for(let o in e)if(e.hasOwnProperty(o)){let a=e[o];s.push(o+":"+(typeof a=="string"?JSON.stringify(a):Ci(a)))}r=`{${s.join(", ")}}`}return`${t}${n?"("+n+")":""}[${r}]: ${i.replace(db,`
  `)}`}function La(i,e){let t=i.hasOwnProperty(d_);return t?i[d_]:null}function _b(i,e,t){if(i.length!==e.length)return!1;for(let n=0;n<i.length;n++){let r=i[n],s=e[n];if(t&&(r=t(r),s=t(s)),s!==r)return!1}return!0}function vb(i){return i.flat(Number.POSITIVE_INFINITY)}function Uf(i,e){i.forEach(t=>Array.isArray(t)?Uf(t,e):e(t))}function Q_(i,e,t){e>=i.length?i.push(t):i.splice(e,0,t)}function tl(i,e){return e>=i.length-1?i.pop():i.splice(e,1)[0]}var _o={},vo=[],nl=new pt(""),ev=new pt("",-1),tv=new pt(""),il=class{get(e,t=ms){if(t===ms){let n=new Error(`NullInjectorError: No provider for ${Ci(e)}!`);throw n.name="NullInjectorError",n}return t}};function Oa(i){return i[ib]||null}function yb(i){return i[rb]||null}function xb(i){return i[sb]||null}function Mb(...i){return{\u0275providers:nv(!0,i),\u0275fromNgModule:!0}}function nv(i,...e){let t=[],n=new Set,r,s=o=>{t.push(o)};return Uf(e,o=>{let a=o;tf(a,s,[],n)&&(r||=[],r.push(a))}),r!==void 0&&iv(r,s),t}function iv(i,e){for(let t=0;t<i.length;t++){let{ngModule:n,providers:r}=i[t];Bf(r,s=>{e(s,n)})}}function tf(i,e,t,n){if(i=Ti(i),!i)return!1;let r=null,s=l_(i),o=!s&&Oa(i);if(!s&&!o){let c=i.ngModule;if(s=l_(c),s)r=c;else return!1}else{if(o&&!o.standalone)return!1;r=i}let a=n.has(r);if(o){if(a)return!1;if(n.add(r),o.dependencies){let c=typeof o.dependencies=="function"?o.dependencies():o.dependencies;for(let l of c)tf(l,e,t,n)}}else if(s){if(s.imports!=null&&!a){n.add(r);let l;try{Uf(s.imports,u=>{tf(u,e,t,n)&&(l||=[],l.push(u))})}finally{}l!==void 0&&iv(l,e)}if(!a){let l=La(r)||(()=>new r);e({provide:r,useFactory:l,deps:vo},r),e({provide:tv,useValue:r,multi:!0},r),e({provide:nl,useValue:()=>Tt(r),multi:!0},r)}let c=s.providers;if(c!=null&&!a){let l=i;Bf(c,u=>{e(u,l)})}}else return!1;return r!==i&&i.providers!==void 0}function Bf(i,e){for(let t of i)Y_(t)&&(t=t.\u0275providers),Array.isArray(t)?Bf(t,e):e(t)}var Sb=Ot({provide:String,useValue:Ot});function rv(i){return i!==null&&typeof i=="object"&&Sb in i}function bb(i){return!!(i&&i.useExisting)}function wb(i){return!!(i&&i.useFactory)}function nf(i){return typeof i=="function"}var Ml=new pt(""),qc={},p_={},jd;function Vf(){return jd===void 0&&(jd=new il),jd}var Ur=class{},ka=class extends Ur{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(e,t,n,r){super(),this.parent=t,this.source=n,this.scopes=r,sf(e,o=>this.processProvider(o)),this.records.set(ev,ho(void 0,this)),r.has("environment")&&this.records.set(Ur,ho(void 0,this));let s=this.records.get(Ml);s!=null&&typeof s.value=="string"&&this.scopes.add(s.value),this.injectorDefTypes=new Set(this.get(tv,vo,nt.Self))}retrieve(e,t){let n=t;return this.get(e,n.optional?zc:ms,n)}destroy(){Ra(this),this._destroyed=!0;let e=lt(null);try{for(let n of this._ngOnDestroyHooks)n.ngOnDestroy();let t=this._onDestroyHooks;this._onDestroyHooks=[];for(let n of t)n()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),lt(e)}}onDestroy(e){return Ra(this),this._onDestroyHooks.push(e),()=>this.removeOnDestroy(e)}runInContext(e){Ra(this);let t=er(this),n=li(void 0),r;try{return e()}finally{er(t),li(n)}}get(e,t=ms,n=nt.Default){if(Ra(this),e.hasOwnProperty(f_))return e[f_](this);n=xl(n);let r,s=er(this),o=li(void 0);try{if(!(n&nt.SkipSelf)){let c=this.records.get(e);if(c===void 0){let l=Db(e)&&kf(e);l&&this.injectableDefInScope(l)?c=ho(rf(e),qc):c=null,this.records.set(e,c)}if(c!=null)return this.hydrate(e,c,n)}let a=n&nt.Self?Vf():this.parent;return t=n&nt.Optional&&t===ms?null:t,a.get(e,t)}catch(a){if(a.name==="NullInjectorError"){if((a[el]=a[el]||[]).unshift(Ci(e)),s)throw a;return mb(a,e,"R3InjectorError",this.source)}else throw a}finally{li(o),er(s)}}resolveInjectorInitializers(){let e=lt(null),t=er(this),n=li(void 0),r;try{let s=this.get(nl,vo,nt.Self);for(let o of s)o()}finally{er(t),li(n),lt(e)}}toString(){let e=[],t=this.records;for(let n of t.keys())e.push(Ci(n));return`R3Injector[${e.join(", ")}]`}processProvider(e){e=Ti(e);let t=nf(e)?e:Ti(e&&e.provide),n=Tb(e);if(!nf(e)&&e.multi===!0){let r=this.records.get(t);r||(r=ho(void 0,qc,!0),r.factory=()=>ef(r.multi),this.records.set(t,r)),t=e,r.multi.push(e)}this.records.set(t,n)}hydrate(e,t,n){let r=lt(null);try{return t.value===p_?Z_(Ci(e)):t.value===qc&&(t.value=p_,t.value=t.factory(void 0,n)),typeof t.value=="object"&&t.value&&Ab(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{lt(r)}}injectableDefInScope(e){if(!e.providedIn)return!1;let t=Ti(e.providedIn);return typeof t=="string"?t==="any"||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(e){let t=this._onDestroyHooks.indexOf(e);t!==-1&&this._onDestroyHooks.splice(t,1)}};function rf(i){let e=kf(i),t=e!==null?e.factory:La(i);if(t!==null)return t;if(i instanceof pt)throw new ht(204,!1);if(i instanceof Function)return Eb(i);throw new ht(204,!1)}function Eb(i){if(i.length>0)throw new ht(204,!1);let t=tb(i);return t!==null?()=>t.factory(i):()=>new i}function Tb(i){if(rv(i))return ho(void 0,i.useValue);{let e=Cb(i);return ho(e,qc)}}function Cb(i,e,t){let n;if(nf(i)){let r=Ti(i);return La(r)||rf(r)}else if(rv(i))n=()=>Ti(i.useValue);else if(wb(i))n=()=>i.useFactory(...ef(i.deps||[]));else if(bb(i))n=(r,s)=>Tt(Ti(i.useExisting),s!==void 0&&s&nt.Optional?nt.Optional:void 0);else{let r=Ti(i&&(i.useClass||i.provide));if(Ib(i))n=()=>new r(...ef(i.deps));else return La(r)||rf(r)}return n}function Ra(i){if(i.destroyed)throw new ht(205,!1)}function ho(i,e,t=!1){return{factory:i,value:e,multi:t?[]:void 0}}function Ib(i){return!!i.deps}function Ab(i){return i!==null&&typeof i=="object"&&typeof i.ngOnDestroy=="function"}function Db(i){return typeof i=="function"||typeof i=="object"&&i instanceof pt}function sf(i,e){for(let t of i)Array.isArray(t)?sf(t,e):t&&Y_(t)?sf(t.\u0275providers,e):e(t)}function sv(i,e){let t;i instanceof ka?(Ra(i),t=i):t=new Qc(i);let n,r=er(t),s=li(void 0);try{return e()}finally{er(r),li(s)}}function Rb(){return J_()!==void 0||Ca()!=null}function Pb(i){return typeof i=="function"}var sr=0,rt=1,qe=2,_n=3,Ii=4,Di=5,rl=6,sl=7,di=8,yo=9,Br=10,Ai=11,Fa=12,m_=13,Ha=14,tr=15,vs=16,po=17,nr=18,Sl=19,ov=20,Fr=21,$d=22,ol=23,ui=24,qd=25,Vr=26,av=1;var ys=7,al=8,xo=9,Jn=10;function gs(i){return Array.isArray(i)&&typeof i[av]=="object"}function or(i){return Array.isArray(i)&&i[av]===!0}function cv(i){return(i.flags&4)!==0}function bl(i){return i.componentOffset>-1}function lv(i){return(i.flags&1)===1}function bs(i){return!!i.template}function cl(i){return(i[qe]&512)!==0}function So(i){return(i[qe]&256)===256}var of=class{previousValue;currentValue;firstChange;constructor(e,t,n){this.previousValue=e,this.currentValue=t,this.firstChange=n}isFirstChange(){return this.firstChange}};function uv(i,e,t,n){e!==null?e.applyValueToInputSignal(e,n):i[t]=n}function Nb(i){return i.type.prototype.ngOnChanges&&(i.setInput=Ob),Lb}function Lb(){let i=fv(this),e=i?.current;if(e){let t=i.previous;if(t===_o)i.previous=e;else for(let n in e)t[n]=e[n];i.current=null,this.ngOnChanges(e)}}function Ob(i,e,t,n,r){let s=this.declaredInputs[n],o=fv(i)||kb(i,{previous:_o,current:null}),a=o.current||(o.current={}),c=o.previous,l=c[s];a[s]=new of(l&&l.currentValue,t,c===_o),uv(i,e,r,t)}var dv="__ngSimpleChanges__";function fv(i){return i[dv]||null}function kb(i,e){return i[dv]=e}var g_=null;var Rt=function(i,e=null,t){g_?.(i,e,t)},Fb="svg",Ub="math";function ir(i){for(;Array.isArray(i);)i=i[sr];return i}function zr(i,e){return ir(e[i.index])}function Bb(i,e){return i.data[e]}function xs(i,e){let t=e[i];return gs(t)?t:t[sr]}function Vb(i){return(i[qe]&4)===4}function zf(i){return(i[qe]&128)===128}function zb(i){return or(i[_n])}function __(i,e){return e==null?null:i[e]}function hv(i){i[po]=0}function pv(i){i[qe]&1024||(i[qe]|=1024,zf(i)&&El(i))}function wl(i){return!!(i[qe]&9216||i[ui]?.dirty)}function af(i){i[Br].changeDetectionScheduler?.notify(8),i[qe]&64&&(i[qe]|=1024),wl(i)&&El(i)}function El(i){i[Br].changeDetectionScheduler?.notify(0);let e=Ms(i);for(;e!==null&&!(e[qe]&8192||(e[qe]|=8192,!zf(e)));)e=Ms(e)}function mv(i,e){if(So(i))throw new ht(911,!1);i[Fr]===null&&(i[Fr]=[]),i[Fr].push(e)}function Hb(i,e){if(i[Fr]===null)return;let t=i[Fr].indexOf(e);t!==-1&&i[Fr].splice(t,1)}function Ms(i){let e=i[_n];return or(e)?e[_n]:e}function Hf(i){return i[sl]??=[]}function Gf(i){return i.cleanup??=[]}function Gb(i,e,t,n){let r=Hf(e);r.push(t),i.firstCreatePass&&Gf(i).push(n,r.length-1)}var xt={lFrame:Sv(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var cf=!1;function Wb(){return xt.lFrame.elementDepthCount}function jb(){xt.lFrame.elementDepthCount++}function $b(){xt.lFrame.elementDepthCount--}function qb(){return xt.bindingsEnabled}function Xb(){return xt.skipHydrationRootTNode!==null}function Yb(i){return xt.skipHydrationRootTNode===i}function Zb(){xt.skipHydrationRootTNode=null}function Bn(){return xt.lFrame.lView}function bo(){return xt.lFrame.tView}function Hr(){let i=gv();for(;i!==null&&i.type===64;)i=i.parent;return i}function gv(){return xt.lFrame.currentTNode}function Jb(){let i=xt.lFrame,e=i.currentTNode;return i.isParent?e:e.parent}function Tl(i,e){let t=xt.lFrame;t.currentTNode=i,t.isParent=e}function _v(){return xt.lFrame.isParent}function Kb(){xt.lFrame.isParent=!1}function vv(){return cf}function v_(i){let e=cf;return cf=i,e}function Qb(i){return xt.lFrame.bindingIndex=i}function ew(){return xt.lFrame.inI18n}function tw(i,e){let t=xt.lFrame;t.bindingIndex=t.bindingRootIndex=i,lf(e)}function nw(){return xt.lFrame.currentDirectiveIndex}function lf(i){xt.lFrame.currentDirectiveIndex=i}function yv(){return xt.lFrame.currentQueryIndex}function Wf(i){xt.lFrame.currentQueryIndex=i}function iw(i){let e=i[rt];return e.type===2?e.declTNode:e.type===1?i[Di]:null}function xv(i,e,t){if(t&nt.SkipSelf){let r=e,s=i;for(;r=r.parent,r===null&&!(t&nt.Host);)if(r=iw(s),r===null||(s=s[Ha],r.type&10))break;if(r===null)return!1;e=r,i=s}let n=xt.lFrame=Mv();return n.currentTNode=e,n.lView=i,!0}function jf(i){let e=Mv(),t=i[rt];xt.lFrame=e,e.currentTNode=t.firstChild,e.lView=i,e.tView=t,e.contextLView=i,e.bindingIndex=t.bindingStartIndex,e.inI18n=!1}function Mv(){let i=xt.lFrame,e=i===null?null:i.child;return e===null?Sv(i):e}function Sv(i){let e={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:i,child:null,inI18n:!1};return i!==null&&(i.child=e),e}function bv(){let i=xt.lFrame;return xt.lFrame=i.parent,i.currentTNode=null,i.lView=null,i}var wv=bv;function $f(){let i=bv();i.isParent=!0,i.tView=null,i.selectedIndex=-1,i.contextLView=null,i.elementDepthCount=0,i.currentDirectiveIndex=-1,i.currentNamespace=null,i.bindingRootIndex=-1,i.bindingIndex=-1,i.currentQueryIndex=0}function rw(){return xt.lFrame.selectedIndex}function Ss(i){xt.lFrame.selectedIndex=i}function sw(){return xt.lFrame.currentNamespace}var Ev=!0;function Tv(){return Ev}function Cv(i){Ev=i}function ow(i,e,t){let{ngOnChanges:n,ngOnInit:r,ngDoCheck:s}=e.type.prototype;if(n){let o=Nb(e);(t.preOrderHooks??=[]).push(i,o),(t.preOrderCheckHooks??=[]).push(i,o)}r&&(t.preOrderHooks??=[]).push(0-i,r),s&&((t.preOrderHooks??=[]).push(i,s),(t.preOrderCheckHooks??=[]).push(i,s))}function aw(i,e){for(let t=e.directiveStart,n=e.directiveEnd;t<n;t++){let s=i.data[t].type.prototype,{ngAfterContentInit:o,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:u}=s;o&&(i.contentHooks??=[]).push(-t,o),a&&((i.contentHooks??=[]).push(t,a),(i.contentCheckHooks??=[]).push(t,a)),c&&(i.viewHooks??=[]).push(-t,c),l&&((i.viewHooks??=[]).push(t,l),(i.viewCheckHooks??=[]).push(t,l)),u!=null&&(i.destroyHooks??=[]).push(t,u)}}function Xc(i,e,t){Iv(i,e,3,t)}function Yc(i,e,t,n){(i[qe]&3)===t&&Iv(i,e,t,n)}function Xd(i,e){let t=i[qe];(t&3)===e&&(t&=16383,t+=1,i[qe]=t)}function Iv(i,e,t,n){let r=n!==void 0?i[po]&65535:0,s=n??-1,o=e.length-1,a=0;for(let c=r;c<o;c++)if(typeof e[c+1]=="number"){if(a=e[c],n!=null&&a>=n)break}else e[c]<0&&(i[po]+=65536),(a<s||s==-1)&&(cw(i,t,e,c),i[po]=(i[po]&4294901760)+c+2),c++}function y_(i,e){Rt(4,i,e);let t=lt(null);try{e.call(i)}finally{lt(t),Rt(5,i,e)}}function cw(i,e,t,n){let r=t[n]<0,s=t[n+1],o=r?-t[n]:t[n],a=i[o];r?i[qe]>>14<i[po]>>16&&(i[qe]&3)===e&&(i[qe]+=16384,y_(a,s)):y_(a,s)}var go=-1,Ua=class{factory;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(e,t,n){this.factory=e,this.canSeeViewProviders=t,this.injectImpl=n}};function lw(i){return(i.flags&8)!==0}function uw(i){return(i.flags&16)!==0}function dw(i,e,t){let n=0;for(;n<t.length;){let r=t[n];if(typeof r=="number"){if(r!==0)break;n++;let s=t[n++],o=t[n++],a=t[n++];i.setAttribute(e,o,a,s)}else{let s=r,o=t[++n];hw(s)?i.setProperty(e,s,o):i.setAttribute(e,s,o),n++}}return n}function fw(i){return i===3||i===4||i===6}function hw(i){return i.charCodeAt(0)===64}function Av(i,e){if(!(e===null||e.length===0))if(i===null||i.length===0)i=e.slice();else{let t=-1;for(let n=0;n<e.length;n++){let r=e[n];typeof r=="number"?t=r:t===0||(t===-1||t===2?x_(i,t,r,null,e[++n]):x_(i,t,r,null,null))}}return i}function x_(i,e,t,n,r){let s=0,o=i.length;if(e===-1)o=-1;else for(;s<i.length;){let a=i[s++];if(typeof a=="number"){if(a===e){o=-1;break}else if(a>e){o=s-1;break}}}for(;s<i.length;){let a=i[s];if(typeof a=="number")break;if(a===t){r!==null&&(i[s+1]=r);return}s++,r!==null&&s++}o!==-1&&(i.splice(o,0,e),s=o+1),i.splice(s++,0,t),r!==null&&i.splice(s++,0,r)}function Dv(i){return i!==go}function ll(i){return i&32767}function pw(i){return i>>16}function ul(i,e){let t=pw(i),n=e;for(;t>0;)n=n[Ha],t--;return n}var uf=!0;function M_(i){let e=uf;return uf=i,e}var mw=256,Rv=mw-1,Pv=5,gw=0,zi={};function _w(i,e,t){let n;typeof t=="string"?n=t.charCodeAt(0)||0:t.hasOwnProperty(Na)&&(n=t[Na]),n==null&&(n=t[Na]=gw++);let r=n&Rv,s=1<<r;e.data[i+(r>>Pv)]|=s}function Nv(i,e){let t=Lv(i,e);if(t!==-1)return t;let n=e[rt];n.firstCreatePass&&(i.injectorIndex=e.length,Yd(n.data,i),Yd(e,null),Yd(n.blueprint,null));let r=qf(i,e),s=i.injectorIndex;if(Dv(r)){let o=ll(r),a=ul(r,e),c=a[rt].data;for(let l=0;l<8;l++)e[s+l]=a[o+l]|c[o+l]}return e[s+8]=r,s}function Yd(i,e){i.push(0,0,0,0,0,0,0,0,e)}function Lv(i,e){return i.injectorIndex===-1||i.parent&&i.parent.injectorIndex===i.injectorIndex||e[i.injectorIndex+8]===null?-1:i.injectorIndex}function qf(i,e){if(i.parent&&i.parent.injectorIndex!==-1)return i.parent.injectorIndex;let t=0,n=null,r=e;for(;r!==null;){if(n=Bv(r),n===null)return go;if(t++,r=r[Ha],n.injectorIndex!==-1)return n.injectorIndex|t<<16}return go}function vw(i,e,t){_w(i,e,t)}function Ov(i,e,t){if(t&nt.Optional||i!==void 0)return i;Ff(e,"NodeInjector")}function kv(i,e,t,n){if(t&nt.Optional&&n===void 0&&(n=null),(t&(nt.Self|nt.Host))===0){let r=i[yo],s=li(void 0);try{return r?r.get(e,n,t&nt.Optional):K_(e,n,t&nt.Optional)}finally{li(s)}}return Ov(n,e,t)}function Fv(i,e,t,n=nt.Default,r){if(i!==null){if(e[qe]&2048&&!(n&nt.Self)){let o=Sw(i,e,t,n,zi);if(o!==zi)return o}let s=Uv(i,e,t,n,zi);if(s!==zi)return s}return kv(e,t,n,r)}function Uv(i,e,t,n,r){let s=xw(t);if(typeof s=="function"){if(!xv(e,i,n))return n&nt.Host?Ov(r,t,n):kv(e,t,n,r);try{let o;if(o=s(n),o==null&&!(n&nt.Optional))Ff(t);else return o}finally{wv()}}else if(typeof s=="number"){let o=null,a=Lv(i,e),c=go,l=n&nt.Host?e[tr][Di]:null;for((a===-1||n&nt.SkipSelf)&&(c=a===-1?qf(i,e):e[a+8],c===go||!b_(n,!1)?a=-1:(o=e[rt],a=ll(c),e=ul(c,e)));a!==-1;){let u=e[rt];if(S_(s,a,u.data)){let f=yw(a,e,t,o,n,l);if(f!==zi)return f}c=e[a+8],c!==go&&b_(n,e[rt].data[a+8]===l)&&S_(s,a,e)?(o=u,a=ll(c),e=ul(c,e)):a=-1}}return r}function yw(i,e,t,n,r,s){let o=e[rt],a=o.data[i+8],c=n==null?bl(a)&&uf:n!=o&&(a.type&3)!==0,l=r&nt.Host&&s===a,u=Zc(a,o,t,c,l);return u!==null?dl(e,o,u,a,r):zi}function Zc(i,e,t,n,r){let s=i.providerIndexes,o=e.data,a=s&1048575,c=i.directiveStart,l=i.directiveEnd,u=s>>20,f=n?a:a+u,h=r?a+u:l;for(let d=f;d<h;d++){let g=o[d];if(d<c&&t===g||d>=c&&g.type===t)return d}if(r){let d=o[c];if(d&&bs(d)&&d.type===t)return c}return null}function dl(i,e,t,n,r){let s=i[t],o=e.data;if(s instanceof Ua){let a=s;a.resolving&&Z_(ab(o[t]));let c=M_(a.canSeeViewProviders);a.resolving=!0;let l,u=a.injectImpl?li(a.injectImpl):null,f=xv(i,n,nt.Default);try{s=i[t]=a.factory(void 0,r,o,i,n),e.firstCreatePass&&t>=n.directiveStart&&ow(t,o[t],e)}finally{u!==null&&li(u),M_(c),a.resolving=!1,wv()}}return s}function xw(i){if(typeof i=="string")return i.charCodeAt(0)||0;let e=i.hasOwnProperty(Na)?i[Na]:void 0;return typeof e=="number"?e>=0?e&Rv:Mw:e}function S_(i,e,t){let n=1<<i;return!!(t[e+(i>>Pv)]&n)}function b_(i,e){return!(i&nt.Self)&&!(i&nt.Host&&e)}var _s=class{_tNode;_lView;constructor(e,t){this._tNode=e,this._lView=t}get(e,t,n){return Fv(this._tNode,this._lView,e,xl(n),t)}};function Mw(){return new _s(Hr(),Bn())}function Sw(i,e,t,n,r){let s=i,o=e;for(;s!==null&&o!==null&&o[qe]&2048&&!cl(o);){let a=Uv(s,o,t,n|nt.Self,zi);if(a!==zi)return a;let c=s.parent;if(!c){let l=o[ov];if(l){let u=l.get(t,zi,n);if(u!==zi)return u}c=Bv(o),o=o[Ha]}s=c}return r}function Bv(i){let e=i[rt],t=e.type;return t===2?e.declTNode:t===1?i[Di]:null}function w_(i,e=null,t=null,n){let r=bw(i,e,t,n);return r.resolveInjectorInitializers(),r}function bw(i,e=null,t=null,n,r=new Set){let s=[t||vo,Mb(i)];return n=n||(typeof i=="object"?void 0:Ci(i)),new ka(s,e||Vf(),n||null,r)}var Ba=class i{static THROW_IF_NOT_FOUND=ms;static NULL=new il;static create(e,t){if(Array.isArray(e))return w_({name:""},t,e,"");{let n=e.name??"";return w_({name:n},e.parent,e.providers,n)}}static \u0275prov=Yt({token:i,providedIn:"any",factory:()=>Tt(ev)});static __NG_ELEMENT_ID__=-1};var ww=new pt("");ww.__NG_ELEMENT_ID__=i=>{let e=Hr();if(e===null)throw new ht(204,!1);if(e.type&2)return e.value;if(i&nt.Optional)return null;throw new ht(204,!1)};var Vv=!1,zv=(()=>{class i{static __NG_ELEMENT_ID__=Ew;static __NG_ENV_ID__=t=>t}return i})(),df=class extends zv{_lView;constructor(e){super(),this._lView=e}onDestroy(e){let t=this._lView;return So(t)?(e(),()=>{}):(mv(t,e),()=>Hb(t,e))}};function Ew(){return new df(Bn())}var Va=class{},Hv=new pt("",{providedIn:"root",factory:()=>!1});var Gv=new pt(""),Wv=new pt(""),Cl=(()=>{class i{taskId=0;pendingTasks=new Set;get _hasPendingTasks(){return this.hasPendingTasks.value}hasPendingTasks=new Aa(!1);add(){this._hasPendingTasks||this.hasPendingTasks.next(!0);let t=this.taskId++;return this.pendingTasks.add(t),t}has(t){return this.pendingTasks.has(t)}remove(t){this.pendingTasks.delete(t),this.pendingTasks.size===0&&this._hasPendingTasks&&this.hasPendingTasks.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this._hasPendingTasks&&this.hasPendingTasks.next(!1)}static \u0275prov=Yt({token:i,providedIn:"root",factory:()=>new i})}return i})();var ff=class extends Or{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(e=!1){super(),this.__isAsync=e,Rb()&&(this.destroyRef=Mt(zv,{optional:!0})??void 0,this.pendingTasks=Mt(Cl,{optional:!0})??void 0)}emit(e){let t=lt(null);try{super.next(e)}finally{lt(t)}}subscribe(e,t,n){let r=e,s=t||(()=>null),o=n;if(e&&typeof e=="object"){let c=e;r=c.next?.bind(c),s=c.error?.bind(c),o=c.complete?.bind(c)}this.__isAsync&&(s=this.wrapInTimeout(s),r&&(r=this.wrapInTimeout(r)),o&&(o=this.wrapInTimeout(o)));let a=super.subscribe({next:r,error:s,complete:o});return e instanceof Cn&&e.add(a),a}wrapInTimeout(e){return t=>{let n=this.pendingTasks?.add();setTimeout(()=>{try{e(t)}finally{n!==void 0&&this.pendingTasks?.remove(n)}})}}},kr=ff;function fl(...i){}function jv(i){let e,t;function n(){i=fl;try{t!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(t),e!==void 0&&clearTimeout(e)}catch{}}return e=setTimeout(()=>{i(),n()}),typeof requestAnimationFrame=="function"&&(t=requestAnimationFrame(()=>{i(),n()})),()=>n()}function E_(i){return queueMicrotask(()=>i()),()=>{i=fl}}var Xf="isAngularZone",hl=Xf+"_ID",Tw=0,dn=class i{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new kr(!1);onMicrotaskEmpty=new kr(!1);onStable=new kr(!1);onError=new kr(!1);constructor(e){let{enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:n=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:s=Vv}=e;if(typeof Zone>"u")throw new ht(908,!1);Zone.assertZonePatched();let o=this;o._nesting=0,o._outer=o._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(o._inner=o._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(o._inner=o._inner.fork(Zone.longStackTraceZoneSpec)),o.shouldCoalesceEventChangeDetection=!r&&n,o.shouldCoalesceRunChangeDetection=r,o.callbackScheduled=!1,o.scheduleInRootZone=s,Aw(o)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(Xf)===!0}static assertInAngularZone(){if(!i.isInAngularZone())throw new ht(909,!1)}static assertNotInAngularZone(){if(i.isInAngularZone())throw new ht(909,!1)}run(e,t,n){return this._inner.run(e,t,n)}runTask(e,t,n,r){let s=this._inner,o=s.scheduleEventTask("NgZoneEvent: "+r,e,Cw,fl,fl);try{return s.runTask(o,t,n)}finally{s.cancelTask(o)}}runGuarded(e,t,n){return this._inner.runGuarded(e,t,n)}runOutsideAngular(e){return this._outer.run(e)}},Cw={};function Yf(i){if(i._nesting==0&&!i.hasPendingMicrotasks&&!i.isStable)try{i._nesting++,i.onMicrotaskEmpty.emit(null)}finally{if(i._nesting--,!i.hasPendingMicrotasks)try{i.runOutsideAngular(()=>i.onStable.emit(null))}finally{i.isStable=!0}}}function Iw(i){if(i.isCheckStableRunning||i.callbackScheduled)return;i.callbackScheduled=!0;function e(){jv(()=>{i.callbackScheduled=!1,hf(i),i.isCheckStableRunning=!0,Yf(i),i.isCheckStableRunning=!1})}i.scheduleInRootZone?Zone.root.run(()=>{e()}):i._outer.run(()=>{e()}),hf(i)}function Aw(i){let e=()=>{Iw(i)},t=Tw++;i._inner=i._inner.fork({name:"angular",properties:{[Xf]:!0,[hl]:t,[hl+t]:!0},onInvokeTask:(n,r,s,o,a,c)=>{if(Dw(c))return n.invokeTask(s,o,a,c);try{return T_(i),n.invokeTask(s,o,a,c)}finally{(i.shouldCoalesceEventChangeDetection&&o.type==="eventTask"||i.shouldCoalesceRunChangeDetection)&&e(),C_(i)}},onInvoke:(n,r,s,o,a,c,l)=>{try{return T_(i),n.invoke(s,o,a,c,l)}finally{i.shouldCoalesceRunChangeDetection&&!i.callbackScheduled&&!Rw(c)&&e(),C_(i)}},onHasTask:(n,r,s,o)=>{n.hasTask(s,o),r===s&&(o.change=="microTask"?(i._hasPendingMicrotasks=o.microTask,hf(i),Yf(i)):o.change=="macroTask"&&(i.hasPendingMacrotasks=o.macroTask))},onHandleError:(n,r,s,o)=>(n.handleError(s,o),i.runOutsideAngular(()=>i.onError.emit(o)),!1)})}function hf(i){i._hasPendingMicrotasks||(i.shouldCoalesceEventChangeDetection||i.shouldCoalesceRunChangeDetection)&&i.callbackScheduled===!0?i.hasPendingMicrotasks=!0:i.hasPendingMicrotasks=!1}function T_(i){i._nesting++,i.isStable&&(i.isStable=!1,i.onUnstable.emit(null))}function C_(i){i._nesting--,Yf(i)}var pf=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new kr;onMicrotaskEmpty=new kr;onStable=new kr;onError=new kr;run(e,t,n){return e.apply(t,n)}runGuarded(e,t,n){return e.apply(t,n)}runOutsideAngular(e){return e()}runTask(e,t,n,r){return e.apply(t,n)}};function Dw(i){return $v(i,"__ignore_ng_zone__")}function Rw(i){return $v(i,"__scheduler_tick__")}function $v(i,e){return!Array.isArray(i)||i.length!==1?!1:i[0]?.data?.[e]===!0}var rr=class{_console=console;handleError(e){this._console.error("ERROR",e)}},Pw=new pt("",{providedIn:"root",factory:()=>{let i=Mt(dn),e=Mt(rr);return t=>i.runOutsideAngular(()=>e.handleError(t))}});function Nw(){return wo(Hr(),Bn())}function wo(i,e){return new Il(zr(i,e))}var Il=(()=>{class i{nativeElement;constructor(t){this.nativeElement=t}static __NG_ELEMENT_ID__=Nw}return i})();function Lw(i){return i instanceof Il?i.nativeElement:i}function Ow(){return this._results[Symbol.iterator]()}var mf=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new Or}constructor(e=!1){this._emitDistinctChangesOnly=e}get(e){return this._results[e]}map(e){return this._results.map(e)}filter(e){return this._results.filter(e)}find(e){return this._results.find(e)}reduce(e,t){return this._results.reduce(e,t)}forEach(e){this._results.forEach(e)}some(e){return this._results.some(e)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(e,t){this.dirty=!1;let n=vb(e);(this._changesDetected=!_b(this._results,n,t))&&(this._results=n,this.length=n.length,this.last=n[this.length-1],this.first=n[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(e){this._onDirty=e}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=Ow};function qv(i){return(i.flags&128)===128}var Xv=function(i){return i[i.OnPush=0]="OnPush",i[i.Default=1]="Default",i}(Xv||{}),Yv=new Map,kw=0;function Fw(){return kw++}function Uw(i){Yv.set(i[Sl],i)}function gf(i){Yv.delete(i[Sl])}var I_="__ngContext__";function Al(i,e){gs(e)?(i[I_]=e[Sl],Uw(e)):i[I_]=e}function Zv(i){return Kv(i[Fa])}function Jv(i){return Kv(i[Ii])}function Kv(i){for(;i!==null&&!or(i);)i=i[Ii];return i}var _f;function Qv(i){_f=i}function Bw(){if(_f!==void 0)return _f;if(typeof document<"u")return document;throw new ht(210,!1)}var Zf=new pt("",{providedIn:"root",factory:()=>Vw}),Vw="ng",Jf=new pt(""),Ga=new pt("",{providedIn:"platform",factory:()=>"unknown"});var Kf=new pt("",{providedIn:"root",factory:()=>Bw().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var zw="h",Hw="b";var ey=!1,Gw=new pt("",{providedIn:"root",factory:()=>ey});var ty=function(i){return i[i.CHANGE_DETECTION=0]="CHANGE_DETECTION",i[i.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",i}(ty||{}),Dl=new pt(""),A_=new Set;function Ww(i){A_.has(i)||(A_.add(i),performance?.mark?.("mark_feature_usage",{detail:{feature:i}}))}var jw=(()=>{class i{impl=null;execute(){this.impl?.execute()}static \u0275prov=Yt({token:i,providedIn:"root",factory:()=>new i})}return i})();var $w=(i,e,t,n)=>{};function qw(i,e,t,n){$w(i,e,t,n)}var Xw=()=>null;function ny(i,e,t=!1){return Xw(i,e,t)}function iy(i,e){let t=i.contentQueries;if(t!==null){let n=lt(null);try{for(let r=0;r<t.length;r+=2){let s=t[r],o=t[r+1];if(o!==-1){let a=i.data[o];Wf(s),a.contentQueries(2,e[o],o)}}}finally{lt(n)}}}function vf(i,e,t){Wf(0);let n=lt(null);try{e(i,t)}finally{lt(n)}}function ry(i,e,t){if(cv(e)){let n=lt(null);try{let r=e.directiveStart,s=e.directiveEnd;for(let o=r;o<s;o++){let a=i.data[o];if(a.contentQueries){let c=t[o];a.contentQueries(1,c,o)}}}finally{lt(n)}}}var Hi=function(i){return i[i.Emulated=0]="Emulated",i[i.None=2]="None",i[i.ShadowDom=3]="ShadowDom",i}(Hi||{});function Yw(i,e){return i.createText(e)}function sy(i,e,t){return i.createElement(e,t)}function pl(i,e,t,n,r){i.insertBefore(e,t,n,r)}function oy(i,e,t){i.appendChild(e,t)}function D_(i,e,t,n,r){n!==null?pl(i,e,t,n,r):oy(i,e,t)}function Zw(i,e,t){i.removeChild(null,e,t)}function Jw(i,e,t){i.setAttribute(e,"style",t)}function Kw(i,e,t){t===""?i.removeAttribute(e,"class"):i.setAttribute(e,"class",t)}function ay(i,e,t){let{mergedAttrs:n,classes:r,styles:s}=t;n!==null&&dw(i,e,n),r!==null&&Kw(i,e,r),s!==null&&Jw(i,e,s)}function Qf(i){return i.ownerDocument.defaultView}function Qw(i,e,t){let n=i.length;for(;;){let r=i.indexOf(e,t);if(r===-1)return r;if(r===0||i.charCodeAt(r-1)<=32){let s=e.length;if(r+s===n||i.charCodeAt(r+s)<=32)return r}t=r+1}}var cy="ng-template";function eE(i,e,t,n){let r=0;if(n){for(;r<e.length&&typeof e[r]=="string";r+=2)if(e[r]==="class"&&Qw(e[r+1].toLowerCase(),t,0)!==-1)return!0}else if(eh(i))return!1;if(r=e.indexOf(1,r),r>-1){let s;for(;++r<e.length&&typeof(s=e[r])=="string";)if(s.toLowerCase()===t)return!0}return!1}function eh(i){return i.type===4&&i.value!==cy}function tE(i,e,t){let n=i.type===4&&!t?cy:i.value;return e===n}function nE(i,e,t){let n=4,r=i.attrs,s=r!==null?sE(r):0,o=!1;for(let a=0;a<e.length;a++){let c=e[a];if(typeof c=="number"){if(!o&&!Ei(n)&&!Ei(c))return!1;if(o&&Ei(c))continue;o=!1,n=c|n&1;continue}if(!o)if(n&4){if(n=2|n&1,c!==""&&!tE(i,c,t)||c===""&&e.length===1){if(Ei(n))return!1;o=!0}}else if(n&8){if(r===null||!eE(i,r,c,t)){if(Ei(n))return!1;o=!0}}else{let l=e[++a],u=iE(c,r,eh(i),t);if(u===-1){if(Ei(n))return!1;o=!0;continue}if(l!==""){let f;if(u>s?f="":f=r[u+1].toLowerCase(),n&2&&l!==f){if(Ei(n))return!1;o=!0}}}}return Ei(n)||o}function Ei(i){return(i&1)===0}function iE(i,e,t,n){if(e===null)return-1;let r=0;if(n||!t){let s=!1;for(;r<e.length;){let o=e[r];if(o===i)return r;if(o===3||o===6)s=!0;else if(o===1||o===2){let a=e[++r];for(;typeof a=="string";)a=e[++r];continue}else{if(o===4)break;if(o===0){r+=4;continue}}r+=s?1:2}return-1}else return oE(e,i)}function rE(i,e,t=!1){for(let n=0;n<e.length;n++)if(nE(i,e[n],t))return!0;return!1}function sE(i){for(let e=0;e<i.length;e++){let t=i[e];if(fw(t))return e}return i.length}function oE(i,e){let t=i.indexOf(4);if(t>-1)for(t++;t<i.length;){let n=i[t];if(typeof n=="number")return-1;if(n===e)return t;t++}return-1}function R_(i,e){return i?":not("+e.trim()+")":e}function aE(i){let e=i[0],t=1,n=2,r="",s=!1;for(;t<i.length;){let o=i[t];if(typeof o=="string")if(n&2){let a=i[++t];r+="["+o+(a.length>0?'="'+a+'"':"")+"]"}else n&8?r+="."+o:n&4&&(r+=" "+o);else r!==""&&!Ei(o)&&(e+=R_(s,r),r=""),n=o,s=s||!Ei(n);t++}return r!==""&&(e+=R_(s,r)),e}function cE(i){return i.map(aE).join(",")}function lE(i){let e=[],t=[],n=1,r=2;for(;n<i.length;){let s=i[n];if(typeof s=="string")r===2?s!==""&&e.push(s,i[++n]):r===8&&t.push(s);else{if(!Ei(r))break;r=s}n++}return t.length&&e.push(1,...t),e}var ly={};function uy(i,e,t,n,r,s,o,a,c,l,u){let f=Vr+n,h=f+r,d=uE(f,h),g=typeof l=="function"?l():l;return d[rt]={type:i,blueprint:d,template:t,queries:null,viewQuery:a,declTNode:e,data:d.slice().fill(null,f),bindingStartIndex:f,expandoStartIndex:h,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof s=="function"?s():s,pipeRegistry:typeof o=="function"?o():o,firstChild:null,schemas:c,consts:g,incompleteFirstPass:!1,ssrId:u}}function uE(i,e){let t=[];for(let n=0;n<e;n++)t.push(n<i?null:ly);return t}function dE(i){let e=i.tView;return e===null||e.incompleteFirstPass?i.tView=uy(1,null,i.template,i.decls,i.vars,i.directiveDefs,i.pipeDefs,i.viewQuery,i.schemas,i.consts,i.id):e}function th(i,e,t,n,r,s,o,a,c,l,u){let f=e.blueprint.slice();return f[sr]=r,f[qe]=n|4|128|8|64|1024,(l!==null||i&&i[qe]&2048)&&(f[qe]|=2048),hv(f),f[_n]=f[Ha]=i,f[di]=t,f[Br]=o||i&&i[Br],f[Ai]=a||i&&i[Ai],f[yo]=c||i&&i[yo]||null,f[Di]=s,f[Sl]=Fw(),f[rl]=u,f[ov]=l,f[tr]=e.type==2?i[tr]:f,f}function fE(i,e,t){let n=zr(e,i),r=dE(t),s=i[Br].rendererFactory,o=hy(i,th(i,r,null,dy(t),n,e,null,s.createRenderer(n,t),null,null,null));return i[e.index]=o}function dy(i){let e=16;return i.signals?e=4096:i.onPush&&(e=64),e}function fy(i,e,t,n){if(t===0)return-1;let r=e.length;for(let s=0;s<t;s++)e.push(n),i.blueprint.push(n),i.data.push(null);return r}function hy(i,e){return i[Fa]?i[m_][Ii]=e:i[Fa]=e,i[m_]=e,e}function hE(i,e,t,n){if(!n)if((e[qe]&3)===3){let s=i.preOrderCheckHooks;s!==null&&Xc(e,s,t)}else{let s=i.preOrderHooks;s!==null&&Yc(e,s,0,t)}Ss(t)}var Rl=function(i){return i[i.None=0]="None",i[i.SignalBased=1]="SignalBased",i[i.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",i}(Rl||{});function yf(i,e,t,n){let r=lt(null);try{let[s,o,a]=i.inputs[t],c=null;(o&Rl.SignalBased)!==0&&(c=e[s][Ta]),c!==null&&c.transformFn!==void 0?n=c.transformFn(n):a!==null&&(n=a.call(e,n)),i.setInput!==null?i.setInput(e,c,n,t,s):uv(e,c,s,n)}finally{lt(r)}}function py(i,e,t,n,r){let s=rw(),o=n&2;try{Ss(-1),o&&e.length>Vr&&hE(i,e,Vr,!1),Rt(o?2:0,r),t(n,r)}finally{Ss(s),Rt(o?3:1,r)}}function my(i,e,t){vE(i,e,t),(t.flags&64)===64&&yE(i,e,t)}function pE(i,e,t=zr){let n=e.localNames;if(n!==null){let r=e.index+1;for(let s=0;s<n.length;s+=2){let o=n[s+1],a=o===-1?t(e,i):i[o];i[r++]=a}}}function mE(i,e,t,n){let s=n.get(Gw,ey)||t===Hi.ShadowDom,o=i.selectRootElement(e,s);return gE(o),o}function gE(i){_E(i)}var _E=()=>null;function vE(i,e,t){let n=t.directiveStart,r=t.directiveEnd;bl(t)&&fE(e,t,i.data[n+t.componentOffset]),i.firstCreatePass||Nv(t,e);let s=t.initialInputs;for(let o=n;o<r;o++){let a=i.data[o],c=dl(e,i,o,t);if(Al(c,e),s!==null&&SE(e,o-n,c,a,t,s),bs(a)){let l=xs(t.index,e);l[di]=dl(e,i,o,t)}}}function yE(i,e,t){let n=t.directiveStart,r=t.directiveEnd,s=t.index,o=nw();try{Ss(s);for(let a=n;a<r;a++){let c=i.data[a],l=e[a];lf(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&xE(c,l)}}finally{Ss(-1),lf(o)}}function xE(i,e){i.hostBindings!==null&&i.hostBindings(1,e)}function ME(i,e){let t=i.directiveRegistry,n=null;if(t)for(let r=0;r<t.length;r++){let s=t[r];rE(e,s.selectors,!1)&&(n??=[],bs(s)?n.unshift(s):n.push(s))}return n}function SE(i,e,t,n,r,s){let o=s[e];if(o!==null)for(let a=0;a<o.length;a+=2){let c=o[a],l=o[a+1];yf(n,t,c,l)}}function bE(i,e){let t=i[yo],n=t?t.get(rr,null):null;n&&n.handleError(e)}function gy(i,e,t,n,r){let s=i.inputs?.[n],o=i.hostDirectiveInputs?.[n],a=!1;if(o)for(let c=0;c<o.length;c+=2){let l=o[c],u=o[c+1],f=e.data[l];yf(f,t[l],u,r),a=!0}if(s)for(let c of s){let l=t[c],u=e.data[c];yf(u,l,n,r),a=!0}return a}function wE(i,e){let t=xs(e,i),n=t[rt];EE(n,t);let r=t[sr];r!==null&&t[rl]===null&&(t[rl]=ny(r,t[yo])),Rt(18),nh(n,t,t[di]),Rt(19,t[di])}function EE(i,e){for(let t=e.length;t<i.blueprint.length;t++)e.push(i.blueprint[t])}function nh(i,e,t){jf(e);try{let n=i.viewQuery;n!==null&&vf(1,n,t);let r=i.template;r!==null&&py(i,e,r,1,t),i.firstCreatePass&&(i.firstCreatePass=!1),e[nr]?.finishViewCreation(i),i.staticContentQueries&&iy(i,e),i.staticViewQueries&&vf(2,i.viewQuery,t);let s=i.components;s!==null&&TE(e,s)}catch(n){throw i.firstCreatePass&&(i.incompleteFirstPass=!0,i.firstCreatePass=!1),n}finally{e[qe]&=-5,$f()}}function TE(i,e){for(let t=0;t<e.length;t++)wE(i,e[t])}function CE(i,e,t,n){let r=lt(null);try{let s=e.tView,a=i[qe]&4096?4096:16,c=th(i,s,t,a,null,e,null,null,n?.injector??null,n?.embeddedViewInjector??null,n?.dehydratedView??null),l=i[e.index];c[vs]=l;let u=i[nr];return u!==null&&(c[nr]=u.createEmbeddedView(s)),nh(s,c,t),c}finally{lt(r)}}function P_(i,e){return!e||e.firstChild===null||qv(i)}var IE;function ih(i,e){return IE(i,e)}var Eo=function(i){return i[i.Important=1]="Important",i[i.DashCase=2]="DashCase",i}(Eo||{});function _y(i){return(i.flags&32)===32}function mo(i,e,t,n,r){if(n!=null){let s,o=!1;or(n)?s=n:gs(n)&&(o=!0,n=n[sr]);let a=ir(n);i===0&&t!==null?r==null?oy(e,t,a):pl(e,t,a,r||null,!0):i===1&&t!==null?pl(e,t,a,r||null,!0):i===2?Zw(e,a,o):i===3&&e.destroyNode(a),s!=null&&VE(e,i,s,t,r)}}function AE(i,e){vy(i,e),e[sr]=null,e[Di]=null}function DE(i,e,t,n,r,s){n[sr]=r,n[Di]=e,Pl(i,n,t,1,r,s)}function vy(i,e){e[Br].changeDetectionScheduler?.notify(9),Pl(i,e,e[Ai],2,null,null)}function RE(i){let e=i[Fa];if(!e)return Zd(i[rt],i);for(;e;){let t=null;if(gs(e))t=e[Fa];else{let n=e[Jn];n&&(t=n)}if(!t){for(;e&&!e[Ii]&&e!==i;)gs(e)&&Zd(e[rt],e),e=e[_n];e===null&&(e=i),gs(e)&&Zd(e[rt],e),t=e&&e[Ii]}e=t}}function rh(i,e){let t=i[xo],n=t.indexOf(e);t.splice(n,1)}function yy(i,e){if(So(e))return;let t=e[Ai];t.destroyNode&&Pl(i,e,t,3,null,null),RE(e)}function Zd(i,e){if(So(e))return;let t=lt(null);try{e[qe]&=-129,e[qe]|=256,e[ui]&&Dd(e[ui]),NE(i,e),PE(i,e),e[rt].type===1&&e[Ai].destroy();let n=e[vs];if(n!==null&&or(e[_n])){n!==e[_n]&&rh(n,e);let r=e[nr];r!==null&&r.detachView(i)}gf(e)}finally{lt(t)}}function PE(i,e){let t=i.cleanup,n=e[sl];if(t!==null)for(let o=0;o<t.length-1;o+=2)if(typeof t[o]=="string"){let a=t[o+3];a>=0?n[a]():n[-a].unsubscribe(),o+=2}else{let a=n[t[o+1]];t[o].call(a)}n!==null&&(e[sl]=null);let r=e[Fr];if(r!==null){e[Fr]=null;for(let o=0;o<r.length;o++){let a=r[o];a()}}let s=e[ol];if(s!==null){e[ol]=null;for(let o of s)o.destroy()}}function NE(i,e){let t;if(i!=null&&(t=i.destroyHooks)!=null)for(let n=0;n<t.length;n+=2){let r=e[t[n]];if(!(r instanceof Ua)){let s=t[n+1];if(Array.isArray(s))for(let o=0;o<s.length;o+=2){let a=r[s[o]],c=s[o+1];Rt(4,a,c);try{c.call(a)}finally{Rt(5,a,c)}}else{Rt(4,r,s);try{s.call(r)}finally{Rt(5,r,s)}}}}}function LE(i,e,t){return OE(i,e.parent,t)}function OE(i,e,t){let n=e;for(;n!==null&&n.type&168;)e=n,n=e.parent;if(n===null)return t[sr];if(bl(n)){let{encapsulation:r}=i.data[n.directiveStart+n.componentOffset];if(r===Hi.None||r===Hi.Emulated)return null}return zr(n,t)}function kE(i,e,t){return UE(i,e,t)}function FE(i,e,t){return i.type&40?zr(i,t):null}var UE=FE,N_;function xy(i,e,t,n){let r=LE(i,n,e),s=e[Ai],o=n.parent||e[Di],a=kE(o,n,e);if(r!=null)if(Array.isArray(t))for(let c=0;c<t.length;c++)D_(s,r,t[c],a,!1);else D_(s,r,t,a,!1);N_!==void 0&&N_(s,n,e,t,r)}function Pa(i,e){if(e!==null){let t=e.type;if(t&3)return zr(e,i);if(t&4)return xf(-1,i[e.index]);if(t&8){let n=e.child;if(n!==null)return Pa(i,n);{let r=i[e.index];return or(r)?xf(-1,r):ir(r)}}else{if(t&128)return Pa(i,e.next);if(t&32)return ih(e,i)()||ir(i[e.index]);{let n=My(i,e);if(n!==null){if(Array.isArray(n))return n[0];let r=Ms(i[tr]);return Pa(r,n)}else return Pa(i,e.next)}}}return null}function My(i,e){if(e!==null){let n=i[tr][Di],r=e.projection;return n.projection[r]}return null}function xf(i,e){let t=Jn+i+1;if(t<e.length){let n=e[t],r=n[rt].firstChild;if(r!==null)return Pa(n,r)}return e[ys]}function sh(i,e,t,n,r,s,o){for(;t!=null;){if(t.type===128){t=t.next;continue}let a=n[t.index],c=t.type;if(o&&e===0&&(a&&Al(ir(a),n),t.flags|=2),!_y(t))if(c&8)sh(i,e,t.child,n,r,s,!1),mo(e,i,r,a,s);else if(c&32){let l=ih(t,n),u;for(;u=l();)mo(e,i,r,u,s);mo(e,i,r,a,s)}else c&16?BE(i,e,n,t,r,s):mo(e,i,r,a,s);t=o?t.projectionNext:t.next}}function Pl(i,e,t,n,r,s){sh(t,n,i.firstChild,e,r,s,!1)}function BE(i,e,t,n,r,s){let o=t[tr],c=o[Di].projection[n.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];mo(e,i,r,u,s)}else{let l=c,u=o[_n];qv(n)&&(l.flags|=128),sh(i,e,l,u,r,s,!0)}}function VE(i,e,t,n,r){let s=t[ys],o=ir(t);s!==o&&mo(e,i,n,s,r);for(let a=Jn;a<t.length;a++){let c=t[a];Pl(c[rt],c,i,e,n,s)}}function ml(i,e,t,n,r=!1){for(;t!==null;){if(t.type===128){t=r?t.projectionNext:t.next;continue}let s=e[t.index];s!==null&&n.push(ir(s)),or(s)&&zE(s,n);let o=t.type;if(o&8)ml(i,e,t.child,n);else if(o&32){let a=ih(t,e),c;for(;c=a();)n.push(c)}else if(o&16){let a=My(e,t);if(Array.isArray(a))n.push(...a);else{let c=Ms(e[tr]);ml(c[rt],c,a,n,!0)}}t=r?t.projectionNext:t.next}return n}function zE(i,e){for(let t=Jn;t<i.length;t++){let n=i[t],r=n[rt].firstChild;r!==null&&ml(n[rt],n,r,e)}i[ys]!==i[sr]&&e.push(i[ys])}function Sy(i){if(i[qd]!==null){for(let e of i[qd])e.impl.addSequence(e);i[qd].length=0}}var by=[];function HE(i){return i[ui]??GE(i)}function GE(i){let e=by.pop()??Object.create(jE);return e.lView=i,e}function WE(i){i.lView[ui]!==i&&(i.lView=null,by.push(i))}var jE=bi(Zn({},Cd),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:i=>{El(i.lView)},consumerOnSignalRead(){this.lView[ui]=this}});function $E(i){let e=i[ui]??Object.create(qE);return e.lView=i,e}var qE=bi(Zn({},Cd),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:i=>{let e=Ms(i.lView);for(;e&&!wy(e[rt]);)e=Ms(e);e&&pv(e)},consumerOnSignalRead(){this.lView[ui]=this}});function wy(i){return i.type!==2}function Ey(i){if(i[ol]===null)return;let e=!0;for(;e;){let t=!1;for(let n of i[ol])n.dirty&&(t=!0,n.zone===null||Zone.current===n.zone?n.run():n.zone.run(()=>n.run()));e=t&&!!(i[qe]&8192)}}var XE=100;function Ty(i,e=!0,t=0){let r=i[Br].rendererFactory,s=!1;s||r.begin?.();try{YE(i,t)}catch(o){throw e&&bE(i,o),o}finally{s||r.end?.()}}function YE(i,e){let t=vv();try{v_(!0),Mf(i,e);let n=0;for(;wl(i);){if(n===XE)throw new ht(103,!1);n++,Mf(i,1)}}finally{v_(t)}}function ZE(i,e,t,n){if(So(e))return;let r=e[qe],s=!1,o=!1;jf(e);let a=!0,c=null,l=null;s||(wy(i)?(l=HE(e),c=Id(l)):Td()===null?(a=!1,l=$E(e),c=Id(l)):e[ui]&&(Dd(e[ui]),e[ui]=null));try{hv(e),Qb(i.bindingStartIndex),t!==null&&py(i,e,t,2,n);let u=(r&3)===3;if(!s)if(u){let d=i.preOrderCheckHooks;d!==null&&Xc(e,d,null)}else{let d=i.preOrderHooks;d!==null&&Yc(e,d,0,null),Xd(e,0)}if(o||JE(e),Ey(e),Cy(e,0),i.contentQueries!==null&&iy(i,e),!s)if(u){let d=i.contentCheckHooks;d!==null&&Xc(e,d)}else{let d=i.contentHooks;d!==null&&Yc(e,d,1),Xd(e,1)}QE(i,e);let f=i.components;f!==null&&Ay(e,f,0);let h=i.viewQuery;if(h!==null&&vf(2,h,n),!s)if(u){let d=i.viewCheckHooks;d!==null&&Xc(e,d)}else{let d=i.viewHooks;d!==null&&Yc(e,d,2),Xd(e,2)}if(i.firstUpdatePass===!0&&(i.firstUpdatePass=!1),e[$d]){for(let d of e[$d])d();e[$d]=null}s||(Sy(e),e[qe]&=-73)}catch(u){throw s||El(e),u}finally{l!==null&&(qg(l,c),a&&WE(l)),$f()}}function Cy(i,e){for(let t=Zv(i);t!==null;t=Jv(t))for(let n=Jn;n<t.length;n++){let r=t[n];Iy(r,e)}}function JE(i){for(let e=Zv(i);e!==null;e=Jv(e)){if(!(e[qe]&2))continue;let t=e[xo];for(let n=0;n<t.length;n++){let r=t[n];pv(r)}}}function KE(i,e,t){Rt(18);let n=xs(e,i);Iy(n,t),Rt(19,n[di])}function Iy(i,e){zf(i)&&Mf(i,e)}function Mf(i,e){let n=i[rt],r=i[qe],s=i[ui],o=!!(e===0&&r&16);if(o||=!!(r&64&&e===0),o||=!!(r&1024),o||=!!(s?.dirty&&Ad(s)),o||=!1,s&&(s.dirty=!1),i[qe]&=-9217,o)ZE(n,i,n.template,i[di]);else if(r&8192){Ey(i),Cy(i,1);let a=n.components;a!==null&&Ay(i,a,1),Sy(i)}}function Ay(i,e,t){for(let n=0;n<e.length;n++)KE(i,e[n],t)}function QE(i,e){let t=i.hostBindingOpCodes;if(t!==null)try{for(let n=0;n<t.length;n++){let r=t[n];if(r<0)Ss(~r);else{let s=r,o=t[++n],a=t[++n];tw(o,s);let c=e[s];Rt(24,c),a(2,c),Rt(25,c)}}}finally{Ss(-1)}}function oh(i,e){let t=vv()?64:1088;for(i[Br].changeDetectionScheduler?.notify(e);i;){i[qe]|=t;let n=Ms(i);if(cl(i)&&!n)return i;i=n}return null}function eT(i,e,t,n){return[i,!0,0,e,null,n,null,t,null,null]}function tT(i,e,t,n=!0){let r=e[rt];if(nT(r,e,i,t),n){let o=xf(t,i),a=e[Ai],c=a.parentNode(i[ys]);c!==null&&DE(r,i[Di],a,e,c,o)}let s=e[rl];s!==null&&s.firstChild!==null&&(s.firstChild=null)}function Sf(i,e){if(i.length<=Jn)return;let t=Jn+e,n=i[t];if(n){let r=n[vs];r!==null&&r!==i&&rh(r,n),e>0&&(i[t-1][Ii]=n[Ii]);let s=tl(i,Jn+e);AE(n[rt],n);let o=s[nr];o!==null&&o.detachView(s[rt]),n[_n]=null,n[Ii]=null,n[qe]&=-129}return n}function nT(i,e,t,n){let r=Jn+n,s=t.length;n>0&&(t[r-1][Ii]=e),n<s-Jn?(e[Ii]=t[r],Q_(t,Jn+n,e)):(t.push(e),e[Ii]=null),e[_n]=t;let o=e[vs];o!==null&&t!==o&&Dy(o,e);let a=e[nr];a!==null&&a.insertView(i),af(e),e[qe]|=128}function Dy(i,e){let t=i[xo],n=e[_n];if(gs(n))i[qe]|=2;else{let r=n[_n][tr];e[tr]!==r&&(i[qe]|=2)}t===null?i[xo]=[e]:t.push(e)}var ah=class{_lView;_cdRefInjectingView;notifyErrorHandler;_appRef=null;_attachedToViewContainer=!1;get rootNodes(){let e=this._lView,t=e[rt];return ml(t,e,t.firstChild,[])}constructor(e,t,n=!0){this._lView=e,this._cdRefInjectingView=t,this.notifyErrorHandler=n}get context(){return this._lView[di]}set context(e){this._lView[di]=e}get destroyed(){return So(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let e=this._lView[_n];if(or(e)){let t=e[al],n=t?t.indexOf(this):-1;n>-1&&(Sf(e,n),tl(t,n))}this._attachedToViewContainer=!1}yy(this._lView[rt],this._lView)}onDestroy(e){mv(this._lView,e)}markForCheck(){oh(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[qe]&=-129}reattach(){af(this._lView),this._lView[qe]|=128}detectChanges(){this._lView[qe]|=1024,Ty(this._lView,this.notifyErrorHandler)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new ht(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let e=cl(this._lView),t=this._lView[vs];t!==null&&!e&&rh(t,this._lView),vy(this._lView[rt],this._lView)}attachToAppRef(e){if(this._attachedToViewContainer)throw new ht(902,!1);this._appRef=e;let t=cl(this._lView),n=this._lView[vs];n!==null&&!t&&Dy(n,this._lView),af(this._lView)}};var gl=(()=>{class i{static __NG_ELEMENT_ID__=sT}return i})(),iT=gl,rT=class extends iT{_declarationLView;_declarationTContainer;elementRef;constructor(e,t,n){super(),this._declarationLView=e,this._declarationTContainer=t,this.elementRef=n}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(e,t){return this.createEmbeddedViewImpl(e,t)}createEmbeddedViewImpl(e,t,n){let r=CE(this._declarationLView,this._declarationTContainer,e,{embeddedViewInjector:t,dehydratedView:n});return new ah(r)}};function sT(){return ch(Hr(),Bn())}function ch(i,e){return i.type&4?new rT(e,i,wo(i,e)):null}function Ry(i,e,t,n,r){let s=i.data[e];if(s===null)s=oT(i,e,t,n,r),ew()&&(s.flags|=32);else if(s.type&64){s.type=t,s.value=n,s.attrs=r;let o=Jb();s.injectorIndex=o===null?-1:o.injectorIndex}return Tl(s,!0),s}function oT(i,e,t,n,r){let s=gv(),o=_v(),a=o?s:s&&s.parent,c=i.data[e]=cT(i,a,t,e,n,r);return aT(i,c,s,o),c}function aT(i,e,t,n){i.firstChild===null&&(i.firstChild=e),t!==null&&(n?t.child==null&&e.parent!==null&&(t.child=e):t.next===null&&(t.next=e,e.prev=t))}function cT(i,e,t,n,r,s){let o=e?e.injectorIndex:-1,a=0;return Xb()&&(a|=128),{type:t,index:n,insertBeforeIndex:null,injectorIndex:o,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,attrs:s,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:e,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}var E2=new RegExp(`^(\\d+)*(${Hw}|${zw})*(.*)`);var lT=()=>null;function L_(i,e){return lT(i,e)}var uT=class{},Py=class{},bf=class{resolveComponentFactory(e){throw Error(`No component factory found for ${Ci(e)}.`)}},lh=class{static NULL=new bf},Mo=class{};var dT=(()=>{class i{static \u0275prov=Yt({token:i,providedIn:"root",factory:()=>null})}return i})();var Jd={},wf=class{injector;parentInjector;constructor(e,t){this.injector=e,this.parentInjector=t}get(e,t,n){n=xl(n);let r=this.injector.get(e,Jd,n);return r!==Jd||t===Jd?r:this.parentInjector.get(e,t,n)}};function O_(i,e,t){let n=t?i.styles:null,r=t?i.classes:null,s=0;if(e!==null)for(let o=0;o<e.length;o++){let a=e[o];if(typeof a=="number")s=a;else if(s==1)r=a_(r,a);else if(s==2){let c=a,l=e[++o];n=a_(n,c+": "+l+";")}}t?i.styles=n:i.stylesWithoutHost=n,t?i.classes=r:i.classesWithoutHost=r}function uh(i,e=nt.Default){let t=Bn();if(t===null)return Tt(i,e);let n=Hr();return Fv(n,t,Ti(i),e)}function fT(i,e,t,n,r){let s=n===null?null:{"":-1},o=r(i,t);if(o!==null){let a,c=null,l=null,u=pT(o);u===null?a=o:[a,c,l]=u,_T(i,e,t,a,s,c,l)}s!==null&&n!==null&&hT(t,n,s)}function hT(i,e,t){let n=i.localNames=[];for(let r=0;r<e.length;r+=2){let s=t[e[r+1]];if(s==null)throw new ht(-301,!1);n.push(e[r],s)}}function pT(i){let e=null,t=!1;for(let o=0;o<i.length;o++){let a=i[o];if(o===0&&bs(a)&&(e=a),a.findHostDirectiveDefs!==null){t=!0;break}}if(!t)return null;let n=null,r=null,s=null;for(let o of i)o.findHostDirectiveDefs!==null&&(n??=[],r??=new Map,s??=new Map,mT(o,n,s,r)),o===e&&(n??=[],n.push(o));return n!==null?(n.push(...e===null?i:i.slice(1)),[n,r,s]):null}function mT(i,e,t,n){let r=e.length;i.findHostDirectiveDefs(i,e,n),t.set(i,[r,e.length-1])}function gT(i,e,t){e.componentOffset=t,(i.components??=[]).push(e.index)}function _T(i,e,t,n,r,s,o){let a=n.length,c=!1;for(let h=0;h<a;h++){let d=n[h];!c&&bs(d)&&(c=!0,gT(i,t,h)),vw(Nv(t,e),i,d.type)}bT(t,i.data.length,a);for(let h=0;h<a;h++){let d=n[h];d.providersResolver&&d.providersResolver(d)}let l=!1,u=!1,f=fy(i,e,a,null);a>0&&(t.directiveToIndex=new Map);for(let h=0;h<a;h++){let d=n[h];if(t.mergedAttrs=Av(t.mergedAttrs,d.hostAttrs),yT(i,t,e,f,d),ST(f,d,r),o!==null&&o.has(d)){let[_,m]=o.get(d);t.directiveToIndex.set(d.type,[f,_+t.directiveStart,m+t.directiveStart])}else(s===null||!s.has(d))&&t.directiveToIndex.set(d.type,f);d.contentQueries!==null&&(t.flags|=4),(d.hostBindings!==null||d.hostAttrs!==null||d.hostVars!==0)&&(t.flags|=64);let g=d.type.prototype;!l&&(g.ngOnChanges||g.ngOnInit||g.ngDoCheck)&&((i.preOrderHooks??=[]).push(t.index),l=!0),!u&&(g.ngOnChanges||g.ngDoCheck)&&((i.preOrderCheckHooks??=[]).push(t.index),u=!0),f++}vT(i,t,s)}function vT(i,e,t){for(let n=e.directiveStart;n<e.directiveEnd;n++){let r=i.data[n];if(t===null||!t.has(r))k_(0,e,r,n),k_(1,e,r,n),U_(e,n,!1);else{let s=t.get(r);F_(0,e,s,n),F_(1,e,s,n),U_(e,n,!0)}}}function k_(i,e,t,n){let r=i===0?t.inputs:t.outputs;for(let s in r)if(r.hasOwnProperty(s)){let o;i===0?o=e.inputs??={}:o=e.outputs??={},o[s]??=[],o[s].push(n),Ny(e,s)}}function F_(i,e,t,n){let r=i===0?t.inputs:t.outputs;for(let s in r)if(r.hasOwnProperty(s)){let o=r[s],a;i===0?a=e.hostDirectiveInputs??={}:a=e.hostDirectiveOutputs??={},a[o]??=[],a[o].push(n,s),Ny(e,o)}}function Ny(i,e){e==="class"?i.flags|=8:e==="style"&&(i.flags|=16)}function U_(i,e,t){let{attrs:n,inputs:r,hostDirectiveInputs:s}=i;if(n===null||!t&&r===null||t&&s===null||eh(i)){i.initialInputs??=[],i.initialInputs.push(null);return}let o=null,a=0;for(;a<n.length;){let c=n[a];if(c===0){a+=4;continue}else if(c===5){a+=2;continue}else if(typeof c=="number")break;if(!t&&r.hasOwnProperty(c)){let l=r[c];for(let u of l)if(u===e){o??=[],o.push(c,n[a+1]);break}}else if(t&&s.hasOwnProperty(c)){let l=s[c];for(let u=0;u<l.length;u+=2)if(l[u]===e){o??=[],o.push(l[u+1],n[a+1]);break}}a+=2}i.initialInputs??=[],i.initialInputs.push(o)}function yT(i,e,t,n,r){i.data[n]=r;let s=r.factory||(r.factory=La(r.type,!0)),o=new Ua(s,bs(r),uh);i.blueprint[n]=o,t[n]=o,xT(i,e,n,fy(i,t,r.hostVars,ly),r)}function xT(i,e,t,n,r){let s=r.hostBindings;if(s){let o=i.hostBindingOpCodes;o===null&&(o=i.hostBindingOpCodes=[]);let a=~e.index;MT(o)!=a&&o.push(a),o.push(t,n,s)}}function MT(i){let e=i.length;for(;e>0;){let t=i[--e];if(typeof t=="number"&&t<0)return t}return 0}function ST(i,e,t){if(t){if(e.exportAs)for(let n=0;n<e.exportAs.length;n++)t[e.exportAs[n]]=i;bs(e)&&(t[""]=i)}}function bT(i,e,t){i.flags|=1,i.directiveStart=e,i.directiveEnd=e+t,i.providerIndexes=e}function Ly(i,e,t,n,r,s,o,a){let c=e.consts,l=__(c,o),u=Ry(e,i,2,n,l);return s&&fT(e,t,u,__(c,a),r),u.mergedAttrs=Av(u.mergedAttrs,u.attrs),u.attrs!==null&&O_(u,u.attrs,!1),u.mergedAttrs!==null&&O_(u,u.mergedAttrs,!0),e.queries!==null&&e.queries.elementStart(e,u),u}function Oy(i,e){aw(i,e),cv(e)&&i.queries.elementEnd(e)}var Ef=class extends lh{ngModule;constructor(e){super(),this.ngModule=e}resolveComponentFactory(e){let t=Oa(e);return new _l(t,this.ngModule)}};function wT(i){return Object.keys(i).map(e=>{let[t,n,r]=i[e],s={propName:t,templateName:e,isSignal:(n&Rl.SignalBased)!==0};return r&&(s.transform=r),s})}function ET(i){return Object.keys(i).map(e=>({propName:i[e],templateName:e}))}function TT(i,e,t){let n=e instanceof Ur?e:e?.injector;return n&&i.getStandaloneInjector!==null&&(n=i.getStandaloneInjector(n)||n),n?new wf(t,n):t}function CT(i){let e=i.get(Mo,null);if(e===null)throw new ht(407,!1);let t=i.get(dT,null),n=i.get(Va,null);return{rendererFactory:e,sanitizer:t,changeDetectionScheduler:n}}function IT(i,e){let t=(i.selectors[0][0]||"div").toLowerCase();return sy(e,t,t==="svg"?Fb:t==="math"?Ub:null)}var _l=class extends Py{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=wT(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=ET(this.componentDef.outputs),this.cachedOutputs}constructor(e,t){super(),this.componentDef=e,this.ngModule=t,this.componentType=e.type,this.selector=cE(e.selectors),this.ngContentSelectors=e.ngContentSelectors??[],this.isBoundToModule=!!t}create(e,t,n,r){Rt(22);let s=lt(null);try{let o=this.componentDef,a=n?["ng-version","19.2.18"]:lE(this.componentDef.selectors[0]),c=uy(0,null,null,1,0,null,null,null,null,[a],null),l=TT(o,r||this.ngModule,e),u=CT(l),f=u.rendererFactory.createRenderer(null,o),h=n?mE(f,n,o.encapsulation,l):IT(o,f),d=th(null,c,null,512|dy(o),null,null,u,f,l,null,ny(h,l,!0));d[Vr]=h,jf(d);let g=null;try{let _=Ly(Vr,c,d,"#host",()=>[this.componentDef],!0,0);h&&(ay(f,h,_),Al(h,d)),my(c,d,_),ry(c,_,d),Oy(c,_),t!==void 0&&AT(_,this.ngContentSelectors,t),g=xs(_.index,d),d[di]=g[di],nh(c,d,null)}catch(_){throw g!==null&&gf(g),gf(d),_}finally{Rt(23),$f()}return new Tf(this.componentType,d)}finally{lt(s)}}},Tf=class extends uT{_rootLView;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(e,t){super(),this._rootLView=t,this._tNode=Bb(t[rt],Vr),this.location=wo(this._tNode,t),this.instance=xs(this._tNode.index,t)[di],this.hostView=this.changeDetectorRef=new ah(t,void 0,!1),this.componentType=e}setInput(e,t){let n=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(e)&&Object.is(this.previousInputValues.get(e),t))return;let r=this._rootLView,s=gy(n,r[rt],r,e,t);this.previousInputValues.set(e,t);let o=xs(n.index,r);oh(o,1)}get injector(){return new _s(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(e){this.hostView.onDestroy(e)}};function AT(i,e,t){let n=i.projection=[];for(let r=0;r<e.length;r++){let s=t[r];n.push(s!=null&&s.length?Array.from(s):null)}}var dh=(()=>{class i{static __NG_ELEMENT_ID__=DT}return i})();function DT(){let i=Hr();return Fy(i,Bn())}var RT=dh,ky=class extends RT{_lContainer;_hostTNode;_hostLView;constructor(e,t,n){super(),this._lContainer=e,this._hostTNode=t,this._hostLView=n}get element(){return wo(this._hostTNode,this._hostLView)}get injector(){return new _s(this._hostTNode,this._hostLView)}get parentInjector(){let e=qf(this._hostTNode,this._hostLView);if(Dv(e)){let t=ul(e,this._hostLView),n=ll(e),r=t[rt].data[n+8];return new _s(r,t)}else return new _s(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(e){let t=B_(this._lContainer);return t!==null&&t[e]||null}get length(){return this._lContainer.length-Jn}createEmbeddedView(e,t,n){let r,s;typeof n=="number"?r=n:n!=null&&(r=n.index,s=n.injector);let o=L_(this._lContainer,e.ssrId),a=e.createEmbeddedViewImpl(t||{},s,o);return this.insertImpl(a,r,P_(this._hostTNode,o)),a}createComponent(e,t,n,r,s){let o=e&&!Pb(e),a;if(o)a=t;else{let g=t||{};a=g.index,n=g.injector,r=g.projectableNodes,s=g.environmentInjector||g.ngModuleRef}let c=o?e:new _l(Oa(e)),l=n||this.parentInjector;if(!s&&c.ngModule==null){let _=(o?l:this.parentInjector).get(Ur,null);_&&(s=_)}let u=Oa(c.componentType??{}),f=L_(this._lContainer,u?.id??null),h=f?.firstChild??null,d=c.create(l,r,h,s);return this.insertImpl(d.hostView,a,P_(this._hostTNode,f)),d}insert(e,t){return this.insertImpl(e,t,!0)}insertImpl(e,t,n){let r=e._lView;if(zb(r)){let a=this.indexOf(e);if(a!==-1)this.detach(a);else{let c=r[_n],l=new ky(c,c[Di],c[_n]);l.detach(l.indexOf(e))}}let s=this._adjustIndex(t),o=this._lContainer;return tT(o,r,s,n),e.attachToViewContainerRef(),Q_(Kd(o),s,e),e}move(e,t){return this.insert(e,t)}indexOf(e){let t=B_(this._lContainer);return t!==null?t.indexOf(e):-1}remove(e){let t=this._adjustIndex(e,-1),n=Sf(this._lContainer,t);n&&(tl(Kd(this._lContainer),t),yy(n[rt],n))}detach(e){let t=this._adjustIndex(e,-1),n=Sf(this._lContainer,t);return n&&tl(Kd(this._lContainer),t)!=null?new ah(n):null}_adjustIndex(e,t=0){return e??this.length+t}};function B_(i){return i[al]}function Kd(i){return i[al]||(i[al]=[])}function Fy(i,e){let t,n=e[i.index];return or(n)?t=n:(t=eT(n,e,null,i),e[i.index]=t,hy(e,t)),NT(t,e,i,n),new ky(t,i,e)}function PT(i,e){let t=i[Ai],n=t.createComment(""),r=zr(e,i),s=t.parentNode(r);return pl(t,s,n,t.nextSibling(r),!1),n}var NT=LT;function LT(i,e,t,n){if(i[ys])return;let r;t.type&8?r=ir(n):r=PT(e,t),i[ys]=r}var Cf=class i{queryList;matches=null;constructor(e){this.queryList=e}clone(){return new i(this.queryList)}setDirty(){this.queryList.setDirty()}},If=class i{queries;constructor(e=[]){this.queries=e}createEmbeddedView(e){let t=e.queries;if(t!==null){let n=e.contentQueries!==null?e.contentQueries[0]:t.length,r=[];for(let s=0;s<n;s++){let o=t.getByIndex(s),a=this.queries[o.indexInDeclarationView];r.push(a.clone())}return new i(r)}return null}insertView(e){this.dirtyQueriesWithMatches(e)}detachView(e){this.dirtyQueriesWithMatches(e)}finishViewCreation(e){this.dirtyQueriesWithMatches(e)}dirtyQueriesWithMatches(e){for(let t=0;t<this.queries.length;t++)fh(e,t).matches!==null&&this.queries[t].setDirty()}},Af=class{flags;read;predicate;constructor(e,t,n=null){this.flags=t,this.read=n,typeof e=="string"?this.predicate=HT(e):this.predicate=e}},Df=class i{queries;constructor(e=[]){this.queries=e}elementStart(e,t){for(let n=0;n<this.queries.length;n++)this.queries[n].elementStart(e,t)}elementEnd(e){for(let t=0;t<this.queries.length;t++)this.queries[t].elementEnd(e)}embeddedTView(e){let t=null;for(let n=0;n<this.length;n++){let r=t!==null?t.length:0,s=this.getByIndex(n).embeddedTView(e,r);s&&(s.indexInDeclarationView=n,t!==null?t.push(s):t=[s])}return t!==null?new i(t):null}template(e,t){for(let n=0;n<this.queries.length;n++)this.queries[n].template(e,t)}getByIndex(e){return this.queries[e]}get length(){return this.queries.length}track(e){this.queries.push(e)}},Rf=class i{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(e,t=-1){this.metadata=e,this._declarationNodeIndex=t}elementStart(e,t){this.isApplyingToNode(t)&&this.matchTNode(e,t)}elementEnd(e){this._declarationNodeIndex===e.index&&(this._appliesToNextNode=!1)}template(e,t){this.elementStart(e,t)}embeddedTView(e,t){return this.isApplyingToNode(e)?(this.crossesNgTemplate=!0,this.addMatch(-e.index,t),new i(this.metadata)):null}isApplyingToNode(e){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let t=this._declarationNodeIndex,n=e.parent;for(;n!==null&&n.type&8&&n.index!==t;)n=n.parent;return t===(n!==null?n.index:-1)}return this._appliesToNextNode}matchTNode(e,t){let n=this.metadata.predicate;if(Array.isArray(n))for(let r=0;r<n.length;r++){let s=n[r];this.matchTNodeWithReadOption(e,t,OT(t,s)),this.matchTNodeWithReadOption(e,t,Zc(t,e,s,!1,!1))}else n===gl?t.type&4&&this.matchTNodeWithReadOption(e,t,-1):this.matchTNodeWithReadOption(e,t,Zc(t,e,n,!1,!1))}matchTNodeWithReadOption(e,t,n){if(n!==null){let r=this.metadata.read;if(r!==null)if(r===Il||r===dh||r===gl&&t.type&4)this.addMatch(t.index,-2);else{let s=Zc(t,e,r,!1,!1);s!==null&&this.addMatch(t.index,s)}else this.addMatch(t.index,n)}}addMatch(e,t){this.matches===null?this.matches=[e,t]:this.matches.push(e,t)}};function OT(i,e){let t=i.localNames;if(t!==null){for(let n=0;n<t.length;n+=2)if(t[n]===e)return t[n+1]}return null}function kT(i,e){return i.type&11?wo(i,e):i.type&4?ch(i,e):null}function FT(i,e,t,n){return t===-1?kT(e,i):t===-2?UT(i,e,n):dl(i,i[rt],t,e)}function UT(i,e,t){if(t===Il)return wo(e,i);if(t===gl)return ch(e,i);if(t===dh)return Fy(e,i)}function Uy(i,e,t,n){let r=e[nr].queries[n];if(r.matches===null){let s=i.data,o=t.matches,a=[];for(let c=0;o!==null&&c<o.length;c+=2){let l=o[c];if(l<0)a.push(null);else{let u=s[l];a.push(FT(e,u,o[c+1],t.metadata.read))}}r.matches=a}return r.matches}function Pf(i,e,t,n){let r=i.queries.getByIndex(t),s=r.matches;if(s!==null){let o=Uy(i,e,r,t);for(let a=0;a<s.length;a+=2){let c=s[a];if(c>0)n.push(o[a/2]);else{let l=s[a+1],u=e[-c];for(let f=Jn;f<u.length;f++){let h=u[f];h[vs]===h[_n]&&Pf(h[rt],h,l,n)}if(u[xo]!==null){let f=u[xo];for(let h=0;h<f.length;h++){let d=f[h];Pf(d[rt],d,l,n)}}}}}return n}function BT(i,e){return i[nr].queries[e].queryList}function VT(i,e,t){let n=new mf((t&4)===4);return Gb(i,e,n,n.destroy),(e[nr]??=new If).queries.push(new Cf(n))-1}function zT(i,e,t){let n=bo();return n.firstCreatePass&&(GT(n,new Af(i,e,t),-1),(e&2)===2&&(n.staticViewQueries=!0)),VT(n,Bn(),e)}function HT(i){return i.split(",").map(e=>e.trim())}function GT(i,e,t){i.queries===null&&(i.queries=new Df),i.queries.track(new Rf(e,t))}function fh(i,e){return i.queries.getByIndex(e)}function WT(i,e){let t=i[rt],n=fh(t,e);return n.crossesNgTemplate?Pf(t,i,e,[]):Uy(t,i,n,e)}var Nf=class{};var vl=class extends Nf{injector;componentFactoryResolver=new Ef(this);instance=null;constructor(e){super();let t=new ka([...e.providers,{provide:Nf,useValue:this},{provide:lh,useValue:this.componentFactoryResolver}],e.parent||Vf(),e.debugName,new Set(["environment"]));this.injector=t,e.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(e){this.injector.onDestroy(e)}};function jT(i,e,t=null){return new vl({providers:i,parent:e,debugName:t,runEnvironmentInitializers:!0}).injector}var $T=(()=>{class i{_injector;cachedInjectors=new Map;constructor(t){this._injector=t}getOrCreateStandaloneInjector(t){if(!t.standalone)return null;if(!this.cachedInjectors.has(t)){let n=nv(!1,t.type),r=n.length>0?jT([n],this._injector,`Standalone[${t.type.name}]`):null;this.cachedInjectors.set(t,r)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=Yt({token:i,providedIn:"environment",factory:()=>new i(Tt(Ur))})}return i})();function By(i){return KS(()=>{let e=JT(i),t=bi(Zn({},e),{decls:i.decls,vars:i.vars,template:i.template,consts:i.consts||null,ngContentSelectors:i.ngContentSelectors,onPush:i.changeDetection===Xv.OnPush,directiveDefs:null,pipeDefs:null,dependencies:e.standalone&&i.dependencies||null,getStandaloneInjector:e.standalone?r=>r.get($T).getOrCreateStandaloneInjector(t):null,getExternalStyles:null,signals:i.signals??!1,data:i.data||{},encapsulation:i.encapsulation||Hi.Emulated,styles:i.styles||vo,_:null,schemas:i.schemas||null,tView:null,id:""});e.standalone&&Ww("NgStandalone"),KT(t);let n=i.dependencies;return t.directiveDefs=V_(n,!1),t.pipeDefs=V_(n,!0),t.id=QT(t),t})}function qT(i){return Oa(i)||yb(i)}function XT(i){return i!==null}function YT(i,e){if(i==null)return _o;let t={};for(let n in i)if(i.hasOwnProperty(n)){let r=i[n],s,o,a,c;Array.isArray(r)?(a=r[0],s=r[1],o=r[2]??s,c=r[3]||null):(s=r,o=r,a=Rl.None,c=null),t[s]=[n,a,c],e[s]=o}return t}function ZT(i){if(i==null)return _o;let e={};for(let t in i)i.hasOwnProperty(t)&&(e[i[t]]=t);return e}function JT(i){let e={};return{type:i.type,providersResolver:null,factory:null,hostBindings:i.hostBindings||null,hostVars:i.hostVars||0,hostAttrs:i.hostAttrs||null,contentQueries:i.contentQueries||null,declaredInputs:e,inputConfig:i.inputs||_o,exportAs:i.exportAs||null,standalone:i.standalone??!0,signals:i.signals===!0,selectors:i.selectors||vo,viewQuery:i.viewQuery||null,features:i.features||null,setInput:null,findHostDirectiveDefs:null,hostDirectives:null,inputs:YT(i.inputs,e),outputs:ZT(i.outputs),debugInfo:null}}function KT(i){i.features?.forEach(e=>e(i))}function V_(i,e){if(!i)return null;let t=e?xb:qT;return()=>(typeof i=="function"?i():i).map(n=>t(n)).filter(XT)}function QT(i){let e=0,t=typeof i.consts=="function"?"":i.consts,n=[i.selectors,i.ngContentSelectors,i.hostVars,i.hostAttrs,t,i.vars,i.decls,i.encapsulation,i.standalone,i.signals,i.exportAs,JSON.stringify(i.inputs),JSON.stringify(i.outputs),Object.getOwnPropertyNames(i.type.prototype),!!i.contentQueries,!!i.viewQuery];for(let s of n.join("|"))e=Math.imul(31,e)+s.charCodeAt(0)<<0;return e+=2147483648,"c"+e}var Vy=new pt("");var eC=(()=>{class i{static \u0275prov=Yt({token:i,providedIn:"root",factory:()=>new Lf})}return i})(),Lf=class{queuedEffectCount=0;queues=new Map;schedule(e){this.enqueue(e)}remove(e){let t=e.zone,n=this.queues.get(t);n.has(e)&&(n.delete(e),this.queuedEffectCount--)}enqueue(e){let t=e.zone;this.queues.has(t)||this.queues.set(t,new Set);let n=this.queues.get(t);n.has(e)||(this.queuedEffectCount++,n.add(e))}flush(){for(;this.queuedEffectCount>0;)for(let[e,t]of this.queues)e===null?this.flushQueue(t):e.run(()=>this.flushQueue(t))}flushQueue(e){for(let t of e)e.delete(t),this.queuedEffectCount--,t.run()}};function zy(i){return!!i&&typeof i.then=="function"}function tC(i){return!!i&&typeof i.subscribe=="function"}var nC=new pt("");var Hy=(()=>{class i{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((t,n)=>{this.resolve=t,this.reject=n});appInits=Mt(nC,{optional:!0})??[];injector=Mt(Ba);constructor(){}runInitializers(){if(this.initialized)return;let t=[];for(let r of this.appInits){let s=sv(this.injector,r);if(zy(s))t.push(s);else if(tC(s)){let o=new Promise((a,c)=>{s.subscribe({complete:a,error:c})});t.push(o)}}let n=()=>{this.done=!0,this.resolve()};Promise.all(t).then(()=>{n()}).catch(r=>{this.reject(r)}),t.length===0&&n(),this.initialized=!0}static \u0275fac=function(n){return new(n||i)};static \u0275prov=Yt({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})(),iC=new pt("");function rC(){Ld(()=>{throw new ht(600,!1)})}function sC(i){return i.isBoundToModule}var oC=10;var za=(()=>{class i{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=Mt(Pw);afterRenderManager=Mt(jw);zonelessEnabled=Mt(Hv);rootEffectScheduler=Mt(eC);dirtyFlags=0;tracingSnapshot=null;externalTestViews=new Set;afterTick=new Or;get allViews(){return[...this.externalTestViews.keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];isStable=Mt(Cl).hasPendingTasks.pipe(Wd(t=>!t));constructor(){Mt(Dl,{optional:!0})}whenStable(){let t;return new Promise(n=>{t=this.isStable.subscribe({next:r=>{r&&n()}})}).finally(()=>{t.unsubscribe()})}_injector=Mt(Ur);_rendererFactory=null;get injector(){return this._injector}bootstrap(t,n){return this.bootstrapImpl(t,n)}bootstrapImpl(t,n,r=Ba.NULL){Rt(10);let s=t instanceof Py;if(!this._injector.get(Hy).done){let d="";throw new ht(405,d)}let a;s?a=t:a=this._injector.get(lh).resolveComponentFactory(t),this.componentTypes.push(a.componentType);let c=sC(a)?void 0:this._injector.get(Nf),l=n||a.selector,u=a.create(r,[],l,c),f=u.location.nativeElement,h=u.injector.get(Vy,null);return h?.registerApplication(f),u.onDestroy(()=>{this.detachView(u.hostView),Jc(this.components,u),h?.unregisterApplication(f)}),this._loadComponent(u),Rt(11,u),u}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){Rt(12),this.tracingSnapshot!==null?this.tracingSnapshot.run(ty.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw new ht(101,!1);let t=lt(null);try{this._runningTick=!0,this.synchronize()}catch(n){this.internalErrorHandler(n)}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,lt(t),this.afterTick.next(),Rt(13)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(Mo,null,{optional:!0}));let t=0;for(;this.dirtyFlags!==0&&t++<oC;)Rt(14),this.synchronizeOnce(),Rt(15)}synchronizeOnce(){if(this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush()),this.dirtyFlags&7){let t=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:n,notifyErrorHandler:r}of this.allViews)aC(n,r,t,this.zonelessEnabled);if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}else this._rendererFactory?.begin?.(),this._rendererFactory?.end?.();this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:t})=>wl(t))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(t){let n=t;this._views.push(n),n.attachToAppRef(this)}detachView(t){let n=t;Jc(this._views,n),n.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView),this.tick(),this.components.push(t),this._injector.get(iC,[]).forEach(r=>r(t))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(t=>t()),this._views.slice().forEach(t=>t.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(t){return this._destroyListeners.push(t),()=>Jc(this._destroyListeners,t)}destroy(){if(this._destroyed)throw new ht(406,!1);let t=this._injector;t.destroy&&!t.destroyed&&t.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(n){return new(n||i)};static \u0275prov=Yt({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();function Jc(i,e){let t=i.indexOf(e);t>-1&&i.splice(t,1)}function aC(i,e,t,n){if(!t&&!wl(i))return;Ty(i,e,t&&!n?0:1)}function z_(i,e,t,n,r){gy(e,i,t,r?"class":"style",n)}function fn(i,e,t,n){let r=Bn(),s=bo(),o=Vr+i,a=r[Ai],c=s.firstCreatePass?Ly(o,s,r,e,ME,qb(),t,n):s.data[o],l=cC(s,r,c,a,e,i);r[o]=l;let u=lv(c);return Tl(c,!0),ay(a,l,c),!_y(c)&&Tv()&&xy(s,r,l,c),(Wb()===0||u)&&Al(l,r),jb(),u&&(my(s,r,c),ry(s,c,r)),n!==null&&pE(r,c),fn}function Zt(){let i=Hr();_v()?Kb():(i=i.parent,Tl(i,!1));let e=i;Yb(e)&&Zb(),$b();let t=bo();return t.firstCreatePass&&Oy(t,e),e.classesWithoutHost!=null&&lw(e)&&z_(t,e,Bn(),e.classesWithoutHost,!0),e.stylesWithoutHost!=null&&uw(e)&&z_(t,e,Bn(),e.stylesWithoutHost,!1),Zt}function ar(i,e,t,n){return fn(i,e,t,n),Zt(),ar}var cC=(i,e,t,n,r,s)=>(Cv(!0),sy(n,r,sw()));var yl="en-US";var lC=yl;function uC(i){typeof i=="string"&&(lC=i.toLowerCase().replace(/_/g,"-"))}function H_(i,e,t){return function n(r){if(r===Function)return t;let s=bl(i)?xs(i.index,e):e;oh(s,5);let o=e[di],a=G_(e,o,t,r),c=n.__ngNextListenerFn__;for(;c;)a=G_(e,o,c,r)&&a,c=c.__ngNextListenerFn__;return a}}function G_(i,e,t,n){let r=lt(null);try{return Rt(6,e,t),t(n)!==!1}catch(s){return dC(i,s),!1}finally{Rt(7,e,t),lt(r)}}function dC(i,e){let t=i[yo],n=t?t.get(rr,null):null;n&&n.handleError(e)}function W_(i,e,t,n,r,s){let o=e[t],a=e[rt],l=a.data[t].outputs[n],u=o[l],f=a.firstCreatePass?Gf(a):null,h=Hf(e),d=u.subscribe(s),g=h.length;h.push(s,d),f&&f.push(r,i.index,g,-(g+1))}function hh(i,e,t,n){let r=Bn(),s=bo(),o=Hr();return hC(s,r,r[Ai],o,i,e,n),hh}function fC(i,e,t,n){let r=i.cleanup;if(r!=null)for(let s=0;s<r.length-1;s+=2){let o=r[s];if(o===t&&r[s+1]===n){let a=e[sl],c=r[s+2];return a.length>c?a[c]:null}typeof o=="string"&&(s+=2)}return null}function hC(i,e,t,n,r,s,o){let a=lv(n),l=i.firstCreatePass?Gf(i):null,u=Hf(e),f=!0;if(n.type&3||o){let h=zr(n,e),d=o?o(h):h,g=u.length,_=o?p=>o(ir(p[n.index])):n.index,m=null;if(!o&&a&&(m=fC(i,e,r,n.index)),m!==null){let p=m.__ngLastListenerFn__||m;p.__ngNextListenerFn__=s,m.__ngLastListenerFn__=s,f=!1}else{s=H_(n,e,s),qw(e,d,r,s);let p=t.listen(d,r,s);u.push(s,p),l&&l.push(r,_,g,g+1)}}else s=H_(n,e,s);if(f){let h=n.outputs?.[r],d=n.hostDirectiveOutputs?.[r];if(d&&d.length)for(let g=0;g<d.length;g+=2){let _=d[g],m=d[g+1];W_(n,e,_,m,r,s)}if(h&&h.length)for(let g of h)W_(n,e,g,r,r,s)}}function Gy(i,e,t){zT(i,e,t)}function Wy(i){let e=Bn(),t=bo(),n=yv();Wf(n+1);let r=fh(t,n);if(i.dirty&&Vb(e)===((r.metadata.flags&2)===2)){if(r.matches===null)i.reset([]);else{let s=WT(e,n);i.reset(s,Lw),i.notifyOnChanges()}return!0}return!1}function jy(){return BT(Bn(),yv())}function fi(i,e=""){let t=Bn(),n=bo(),r=i+Vr,s=n.firstCreatePass?Ry(n,r,1,e,null):n.data[r],o=pC(n,t,s,e,i);t[r]=o,Tv()&&xy(n,t,o,s),Tl(s,!1)}var pC=(i,e,t,n,r)=>(Cv(!0),Yw(e[Ai],n));var mC=(()=>{class i{zone=Mt(dn);changeDetectionScheduler=Mt(Va);applicationRef=Mt(za);_onMicrotaskEmptySubscription;initialize(){this._onMicrotaskEmptySubscription||(this._onMicrotaskEmptySubscription=this.zone.onMicrotaskEmpty.subscribe({next:()=>{this.changeDetectionScheduler.runningTick||this.zone.run(()=>{this.applicationRef.tick()})}}))}ngOnDestroy(){this._onMicrotaskEmptySubscription?.unsubscribe()}static \u0275fac=function(n){return new(n||i)};static \u0275prov=Yt({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();function gC({ngZoneFactory:i,ignoreChangesOutsideZone:e,scheduleInRootZone:t}){return i??=()=>new dn(bi(Zn({},_C()),{scheduleInRootZone:t})),[{provide:dn,useFactory:i},{provide:nl,multi:!0,useFactory:()=>{let n=Mt(mC,{optional:!0});return()=>n.initialize()}},{provide:nl,multi:!0,useFactory:()=>{let n=Mt(vC);return()=>{n.initialize()}}},e===!0?{provide:Gv,useValue:!0}:[],{provide:Wv,useValue:t??Vv}]}function _C(i){return{enableLongStackTrace:!1,shouldCoalesceEventChangeDetection:i?.eventCoalescing??!1,shouldCoalesceRunChangeDetection:i?.runCoalescing??!1}}var vC=(()=>{class i{subscription=new Cn;initialized=!1;zone=Mt(dn);pendingTasks=Mt(Cl);initialize(){if(this.initialized)return;this.initialized=!0;let t=null;!this.zone.isStable&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(t=this.pendingTasks.add()),this.zone.runOutsideAngular(()=>{this.subscription.add(this.zone.onStable.subscribe(()=>{dn.assertNotInAngularZone(),queueMicrotask(()=>{t!==null&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(this.pendingTasks.remove(t),t=null)})}))}),this.subscription.add(this.zone.onUnstable.subscribe(()=>{dn.assertInAngularZone(),t??=this.pendingTasks.add()}))}ngOnDestroy(){this.subscription.unsubscribe()}static \u0275fac=function(n){return new(n||i)};static \u0275prov=Yt({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();var yC=(()=>{class i{appRef=Mt(za);taskService=Mt(Cl);ngZone=Mt(dn);zonelessEnabled=Mt(Hv);tracing=Mt(Dl,{optional:!0});disableScheduling=Mt(Gv,{optional:!0})??!1;zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new Cn;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(hl):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(Mt(Wv,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{this.runningTick||this.cleanup()})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()})),this.disableScheduling||=!this.zonelessEnabled&&(this.ngZone instanceof pf||!this.zoneIsDefined)}notify(t){if(!this.zonelessEnabled&&t===5)return;let n=!1;switch(t){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2,n=!0;break}case 12:{this.appRef.dirtyFlags|=16,n=!0;break}case 13:{this.appRef.dirtyFlags|=2,n=!0;break}case 11:{n=!0;break}case 9:case 8:case 7:case 10:default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick(n))return;let r=this.useMicrotaskScheduler?E_:jv;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>r(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>r(()=>this.tick()))}shouldScheduleTick(t){return!(this.disableScheduling&&!t||this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(hl+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let t=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(n){throw this.taskService.remove(t),n}finally{this.cleanup()}this.useMicrotaskScheduler=!0,E_(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(t)})}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let t=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(t)}}static \u0275fac=function(n){return new(n||i)};static \u0275prov=Yt({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();function xC(){return typeof $localize<"u"&&$localize.locale||yl}var $y=new pt("",{providedIn:"root",factory:()=>Mt($y,nt.Optional|nt.SkipSelf)||xC()});var Of=new pt(""),MC=new pt("");function Da(i){return!i.moduleRef}function SC(i){let e=Da(i)?i.r3Injector:i.moduleRef.injector,t=e.get(dn);return t.run(()=>{Da(i)?i.r3Injector.resolveInjectorInitializers():i.moduleRef.resolveInjectorInitializers();let n=e.get(rr,null),r;if(t.runOutsideAngular(()=>{r=t.onError.subscribe({next:s=>{n.handleError(s)}})}),Da(i)){let s=()=>e.destroy(),o=i.platformInjector.get(Of);o.add(s),e.onDestroy(()=>{r.unsubscribe(),o.delete(s)})}else{let s=()=>i.moduleRef.destroy(),o=i.platformInjector.get(Of);o.add(s),i.moduleRef.onDestroy(()=>{Jc(i.allPlatformModules,i.moduleRef),r.unsubscribe(),o.delete(s)})}return wC(n,t,()=>{let s=e.get(Hy);return s.runInitializers(),s.donePromise.then(()=>{let o=e.get($y,yl);if(uC(o||yl),!e.get(MC,!0))return Da(i)?e.get(za):(i.allPlatformModules.push(i.moduleRef),i.moduleRef);if(Da(i)){let c=e.get(za);return i.rootComponent!==void 0&&c.bootstrap(i.rootComponent),c}else return bC(i.moduleRef,i.allPlatformModules),i.moduleRef})})})}function bC(i,e){let t=i.injector.get(za);if(i._bootstrapComponents.length>0)i._bootstrapComponents.forEach(n=>t.bootstrap(n));else if(i.instance.ngDoBootstrap)i.instance.ngDoBootstrap(t);else throw new ht(-403,!1);e.push(i)}function wC(i,e,t){try{let n=t();return zy(n)?n.catch(r=>{throw e.runOutsideAngular(()=>i.handleError(r)),r}):n}catch(n){throw e.runOutsideAngular(()=>i.handleError(n)),n}}var Kc=null;function EC(i=[],e){return Ba.create({name:e,providers:[{provide:Ml,useValue:"platform"},{provide:Of,useValue:new Set([()=>Kc=null])},...i]})}function TC(i=[]){if(Kc)return Kc;let e=EC(i);return Kc=e,rC(),CC(e),e}function CC(i){let e=i.get(Jf,null);sv(i,()=>{e?.forEach(t=>t())})}function qy(i){let{rootComponent:e,appProviders:t,platformProviders:n,platformRef:r}=i;Rt(8);try{let s=r?.injector??TC(n),o=[gC({}),{provide:Va,useExisting:yC},...t||[]],a=new vl({providers:o,parent:s,debugName:"",runEnvironmentInitializers:!1});return SC({r3Injector:a.injector,platformInjector:s,rootComponent:e})}catch(s){return Promise.reject(s)}finally{Rt(9)}}var j_=class{[Ta];constructor(e){this[Ta]=e}destroy(){this[Ta].destroy()}};var Gi=new pt("");var Xy=null;function ja(){return Xy}function mh(i){Xy??=i}var Wa=class{};function gh(i,e){e=encodeURIComponent(e);for(let t of i.split(";")){let n=t.indexOf("="),[r,s]=n==-1?[t,""]:[t.slice(0,n),t.slice(n+1)];if(r.trim()===e)return decodeURIComponent(s)}return null}var _h="browser",Yy="server";function Nl(i){return i===Yy}var $a=class{};var kl=new pt(""),Mh=(()=>{class i{_zone;_plugins;_eventNameToPlugin=new Map;constructor(t,n){this._zone=n,t.forEach(r=>{r.manager=this}),this._plugins=t.slice().reverse()}addEventListener(t,n,r,s){return this._findPluginFor(n).addEventListener(t,n,r,s)}getZone(){return this._zone}_findPluginFor(t){let n=this._eventNameToPlugin.get(t);if(n)return n;if(n=this._plugins.find(s=>s.supports(t)),!n)throw new ht(5101,!1);return this._eventNameToPlugin.set(t,n),n}static \u0275fac=function(n){return new(n||i)(Tt(kl),Tt(dn))};static \u0275prov=Yt({token:i,factory:i.\u0275fac})}return i})(),qa=class{_doc;constructor(e){this._doc=e}manager},Ll="ng-app-id";function Zy(i){for(let e of i)e.remove()}function Jy(i,e){let t=e.createElement("style");return t.textContent=i,t}function IC(i,e,t,n){let r=i.head?.querySelectorAll(`style[${Ll}="${e}"],link[${Ll}="${e}"]`);if(r)for(let s of r)s.removeAttribute(Ll),s instanceof HTMLLinkElement?n.set(s.href.slice(s.href.lastIndexOf("/")+1),{usage:0,elements:[s]}):s.textContent&&t.set(s.textContent,{usage:0,elements:[s]})}function yh(i,e){let t=e.createElement("link");return t.setAttribute("rel","stylesheet"),t.setAttribute("href",i),t}var Sh=(()=>{class i{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;isServer;constructor(t,n,r,s={}){this.doc=t,this.appId=n,this.nonce=r,this.isServer=Nl(s),IC(t,n,this.inline,this.external),this.hosts.add(t.head)}addStyles(t,n){for(let r of t)this.addUsage(r,this.inline,Jy);n?.forEach(r=>this.addUsage(r,this.external,yh))}removeStyles(t,n){for(let r of t)this.removeUsage(r,this.inline);n?.forEach(r=>this.removeUsage(r,this.external))}addUsage(t,n,r){let s=n.get(t);s?s.usage++:n.set(t,{usage:1,elements:[...this.hosts].map(o=>this.addElement(o,r(t,this.doc)))})}removeUsage(t,n){let r=n.get(t);r&&(r.usage--,r.usage<=0&&(Zy(r.elements),n.delete(t)))}ngOnDestroy(){for(let[,{elements:t}]of[...this.inline,...this.external])Zy(t);this.hosts.clear()}addHost(t){this.hosts.add(t);for(let[n,{elements:r}]of this.inline)r.push(this.addElement(t,Jy(n,this.doc)));for(let[n,{elements:r}]of this.external)r.push(this.addElement(t,yh(n,this.doc)))}removeHost(t){this.hosts.delete(t)}addElement(t,n){return this.nonce&&n.setAttribute("nonce",this.nonce),this.isServer&&n.setAttribute(Ll,this.appId),t.appendChild(n)}static \u0275fac=function(n){return new(n||i)(Tt(Gi),Tt(Zf),Tt(Kf,8),Tt(Ga))};static \u0275prov=Yt({token:i,factory:i.\u0275fac})}return i})(),vh={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},bh=/%COMP%/g;var Qy="%COMP%",AC=`_nghost-${Qy}`,DC=`_ngcontent-${Qy}`,RC=!0,PC=new pt("",{providedIn:"root",factory:()=>RC});function NC(i){return DC.replace(bh,i)}function LC(i){return AC.replace(bh,i)}function e0(i,e){return e.map(t=>t.replace(bh,i))}var wh=(()=>{class i{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;platformId;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;platformIsServer;constructor(t,n,r,s,o,a,c,l=null,u=null){this.eventManager=t,this.sharedStylesHost=n,this.appId=r,this.removeStylesOnCompDestroy=s,this.doc=o,this.platformId=a,this.ngZone=c,this.nonce=l,this.tracingService=u,this.platformIsServer=Nl(a),this.defaultRenderer=new Xa(t,o,c,this.platformIsServer,this.tracingService)}createRenderer(t,n){if(!t||!n)return this.defaultRenderer;this.platformIsServer&&n.encapsulation===Hi.ShadowDom&&(n=bi(Zn({},n),{encapsulation:Hi.Emulated}));let r=this.getOrCreateRenderer(t,n);return r instanceof Ol?r.applyToHost(t):r instanceof Ya&&r.applyStyles(),r}getOrCreateRenderer(t,n){let r=this.rendererByCompId,s=r.get(n.id);if(!s){let o=this.doc,a=this.ngZone,c=this.eventManager,l=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,f=this.platformIsServer,h=this.tracingService;switch(n.encapsulation){case Hi.Emulated:s=new Ol(c,l,n,this.appId,u,o,a,f,h);break;case Hi.ShadowDom:return new xh(c,l,t,n,o,a,this.nonce,f,h);default:s=new Ya(c,l,n,u,o,a,f,h);break}r.set(n.id,s)}return s}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(t){this.rendererByCompId.delete(t)}static \u0275fac=function(n){return new(n||i)(Tt(Mh),Tt(Sh),Tt(Zf),Tt(PC),Tt(Gi),Tt(Ga),Tt(dn),Tt(Kf),Tt(Dl,8))};static \u0275prov=Yt({token:i,factory:i.\u0275fac})}return i})(),Xa=class{eventManager;doc;ngZone;platformIsServer;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(e,t,n,r,s){this.eventManager=e,this.doc=t,this.ngZone=n,this.platformIsServer=r,this.tracingService=s}destroy(){}destroyNode=null;createElement(e,t){return t?this.doc.createElementNS(vh[t]||t,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,t){(Ky(e)?e.content:e).appendChild(t)}insertBefore(e,t,n){e&&(Ky(e)?e.content:e).insertBefore(t,n)}removeChild(e,t){t.remove()}selectRootElement(e,t){let n=typeof e=="string"?this.doc.querySelector(e):e;if(!n)throw new ht(-5104,!1);return t||(n.textContent=""),n}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,t,n,r){if(r){t=r+":"+t;let s=vh[r];s?e.setAttributeNS(s,t,n):e.setAttribute(t,n)}else e.setAttribute(t,n)}removeAttribute(e,t,n){if(n){let r=vh[n];r?e.removeAttributeNS(r,t):e.removeAttribute(`${n}:${t}`)}else e.removeAttribute(t)}addClass(e,t){e.classList.add(t)}removeClass(e,t){e.classList.remove(t)}setStyle(e,t,n,r){r&(Eo.DashCase|Eo.Important)?e.style.setProperty(t,n,r&Eo.Important?"important":""):e.style[t]=n}removeStyle(e,t,n){n&Eo.DashCase?e.style.removeProperty(t):e.style[t]=""}setProperty(e,t,n){e!=null&&(e[t]=n)}setValue(e,t){e.nodeValue=t}listen(e,t,n,r){if(typeof e=="string"&&(e=ja().getGlobalEventTarget(this.doc,e),!e))throw new ht(5102,!1);let s=this.decoratePreventDefault(n);return this.tracingService?.wrapEventListener&&(s=this.tracingService.wrapEventListener(e,t,s)),this.eventManager.addEventListener(e,t,s,r)}decoratePreventDefault(e){return t=>{if(t==="__ngUnwrap__")return e;(this.platformIsServer?this.ngZone.runGuarded(()=>e(t)):e(t))===!1&&t.preventDefault()}}};function Ky(i){return i.tagName==="TEMPLATE"&&i.content!==void 0}var xh=class extends Xa{sharedStylesHost;hostEl;shadowRoot;constructor(e,t,n,r,s,o,a,c,l){super(e,s,o,c,l),this.sharedStylesHost=t,this.hostEl=n,this.shadowRoot=n.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let u=r.styles;u=e0(r.id,u);for(let h of u){let d=document.createElement("style");a&&d.setAttribute("nonce",a),d.textContent=h,this.shadowRoot.appendChild(d)}let f=r.getExternalStyles?.();if(f)for(let h of f){let d=yh(h,s);a&&d.setAttribute("nonce",a),this.shadowRoot.appendChild(d)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,t){return super.appendChild(this.nodeOrShadowRoot(e),t)}insertBefore(e,t,n){return super.insertBefore(this.nodeOrShadowRoot(e),t,n)}removeChild(e,t){return super.removeChild(null,t)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},Ya=class extends Xa{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(e,t,n,r,s,o,a,c,l){super(e,s,o,a,c),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=r;let u=n.styles;this.styles=l?e0(l,u):u,this.styleUrls=n.getExternalStyles?.(l)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Ol=class extends Ya{contentAttr;hostAttr;constructor(e,t,n,r,s,o,a,c,l){let u=r+"-"+n.id;super(e,t,n,s,o,a,c,l,u),this.contentAttr=NC(u),this.hostAttr=LC(u)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,t){let n=super.createElement(e,t);return super.setAttribute(n,this.contentAttr,""),n}};var Fl=class i extends Wa{supportsDOMEvents=!0;static makeCurrent(){mh(new i)}onAndCancel(e,t,n,r){return e.addEventListener(t,n,r),()=>{e.removeEventListener(t,n,r)}}dispatchEvent(e,t){e.dispatchEvent(t)}remove(e){e.remove()}createElement(e,t){return t=t||this.getDefaultDocument(),t.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,t){return t==="window"?window:t==="document"?e:t==="body"?e.body:null}getBaseHref(e){let t=OC();return t==null?null:kC(t)}resetBaseElement(){Za=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return gh(document.cookie,e)}},Za=null;function OC(){return Za=Za||document.head.querySelector("base"),Za?Za.getAttribute("href"):null}function kC(i){return new URL(i,document.baseURI).pathname}var FC=(()=>{class i{build(){return new XMLHttpRequest}static \u0275fac=function(n){return new(n||i)};static \u0275prov=Yt({token:i,factory:i.\u0275fac})}return i})(),n0=(()=>{class i extends qa{constructor(t){super(t)}supports(t){return!0}addEventListener(t,n,r,s){return t.addEventListener(n,r,s),()=>this.removeEventListener(t,n,r,s)}removeEventListener(t,n,r,s){return t.removeEventListener(n,r,s)}static \u0275fac=function(n){return new(n||i)(Tt(Gi))};static \u0275prov=Yt({token:i,factory:i.\u0275fac})}return i})(),t0=["alt","control","meta","shift"],UC={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},BC={alt:i=>i.altKey,control:i=>i.ctrlKey,meta:i=>i.metaKey,shift:i=>i.shiftKey},i0=(()=>{class i extends qa{constructor(t){super(t)}supports(t){return i.parseEventName(t)!=null}addEventListener(t,n,r,s){let o=i.parseEventName(n),a=i.eventCallback(o.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>ja().onAndCancel(t,o.domEventName,a,s))}static parseEventName(t){let n=t.toLowerCase().split("."),r=n.shift();if(n.length===0||!(r==="keydown"||r==="keyup"))return null;let s=i._normalizeKey(n.pop()),o="",a=n.indexOf("code");if(a>-1&&(n.splice(a,1),o="code."),t0.forEach(l=>{let u=n.indexOf(l);u>-1&&(n.splice(u,1),o+=l+".")}),o+=s,n.length!=0||s.length===0)return null;let c={};return c.domEventName=r,c.fullKey=o,c}static matchEventFullKeyCode(t,n){let r=UC[t.key]||t.key,s="";return n.indexOf("code.")>-1&&(r=t.code,s="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),t0.forEach(o=>{if(o!==r){let a=BC[o];a(t)&&(s+=o+".")}}),s+=r,s===n)}static eventCallback(t,n,r){return s=>{i.matchEventFullKeyCode(s,t)&&r.runGuarded(()=>n(s))}}static _normalizeKey(t){return t==="esc"?"escape":t}static \u0275fac=function(n){return new(n||i)(Tt(Gi))};static \u0275prov=Yt({token:i,factory:i.\u0275fac})}return i})();function Eh(i,e,t){return qy(Zn({rootComponent:i,platformRef:t?.platformRef},VC(e)))}function VC(i){return{appProviders:[...jC,...i?.providers??[]],platformProviders:WC}}function zC(){Fl.makeCurrent()}function HC(){return new rr}function GC(){return Qv(document),document}var WC=[{provide:Ga,useValue:_h},{provide:Jf,useValue:zC,multi:!0},{provide:Gi,useFactory:GC}];var jC=[{provide:Ml,useValue:"root"},{provide:rr,useFactory:HC},{provide:kl,useClass:n0,multi:!0,deps:[Gi]},{provide:kl,useClass:i0,multi:!0,deps:[Gi]},wh,Sh,Mh,{provide:Mo,useExisting:wh},{provide:$a,useClass:FC},[]];var gm="170";var $C=0,r0=1,qC=2;var ox=1,XC=2,hr=3,Kr=0,Hn=1,mr=2,Zr=0,Ho=1,hu=2,s0=3,o0=4,YC=5,Rs=100,ZC=101,JC=102,KC=103,QC=104,eI=200,tI=201,nI=202,iI=203,np=204,ip=205,rI=206,sI=207,oI=208,aI=209,cI=210,lI=211,uI=212,dI=213,fI=214,rp=0,sp=1,op=2,$o=3,ap=4,cp=5,lp=6,up=7,ax=0,hI=1,pI=2,Jr=0,mI=1,gI=2,_I=3,vI=4,yI=5,xI=6,MI=7;var a0=300,qo=301,Xo=302,dp=303,fp=304,Lu=306,hp=1e3,Ls=1001,pp=1002,ki=1003,SI=1004;var Ul=1005;var ji=1006,Th=1007;var Os=1008;var xr=1009,cx=1010,lx=1011,sc=1012,_m=1013,ks=1014,gr=1015,ac=1016,vm=1017,ym=1018,Yo=1020,ux=35902,dx=1021,fx=1022,Li=1023,hx=1024,px=1025,Go=1026,Zo=1027,mx=1028,xm=1029,gx=1030,Mm=1031;var Sm=1033,cu=33776,lu=33777,uu=33778,du=33779,mp=35840,gp=35841,_p=35842,vp=35843,yp=36196,xp=37492,Mp=37496,Sp=37808,bp=37809,wp=37810,Ep=37811,Tp=37812,Cp=37813,Ip=37814,Ap=37815,Dp=37816,Rp=37817,Pp=37818,Np=37819,Lp=37820,Op=37821,fu=36492,kp=36494,Fp=36495,_x=36283,Up=36284,Bp=36285,Vp=36286;var pu=2300,zp=2301,Ch=2302,c0=2400,l0=2401,u0=2402;var bI=3200,wI=3201;var EI=0,TI=1,Yr="",pi="srgb",ta="srgb-linear",Ou="linear",St="srgb";var To=7680;var d0=519,CI=512,II=513,AI=514,vx=515,DI=516,RI=517,PI=518,NI=519,f0=35044;var h0="300 es",_r=2e3,mu=2001,Qr=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let r=this._listeners[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},vn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Ih=Math.PI/180,Hp=180/Math.PI;function cc(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(vn[i&255]+vn[i>>8&255]+vn[i>>16&255]+vn[i>>24&255]+"-"+vn[e&255]+vn[e>>8&255]+"-"+vn[e>>16&15|64]+vn[e>>24&255]+"-"+vn[t&63|128]+vn[t>>8&255]+"-"+vn[t>>16&255]+vn[t>>24&255]+vn[n&255]+vn[n>>8&255]+vn[n>>16&255]+vn[n>>24&255]).toLowerCase()}function zn(i,e,t){return Math.max(e,Math.min(t,i))}function LI(i,e){return(i%e+e)%e}function Ah(i,e,t){return(1-t)*i+t*e}function Ja(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Vn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Ct=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(zn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Xe=class i{constructor(e,t,n,r,s,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l)}set(e,t,n,r,s,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],f=n[7],h=n[2],d=n[5],g=n[8],_=r[0],m=r[3],p=r[6],b=r[1],w=r[4],v=r[7],I=r[2],C=r[5],E=r[8];return s[0]=o*_+a*b+c*I,s[3]=o*m+a*w+c*C,s[6]=o*p+a*v+c*E,s[1]=l*_+u*b+f*I,s[4]=l*m+u*w+f*C,s[7]=l*p+u*v+f*E,s[2]=h*_+d*b+g*I,s[5]=h*m+d*w+g*C,s[8]=h*p+d*v+g*E,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*s*u+n*a*c+r*s*l-r*o*c}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],f=u*o-a*l,h=a*c-u*s,d=l*s-o*c,g=t*f+n*h+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return e[0]=f*_,e[1]=(r*l-u*n)*_,e[2]=(a*n-r*o)*_,e[3]=h*_,e[4]=(u*t-r*c)*_,e[5]=(r*s-a*t)*_,e[6]=d*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Dh.makeScale(e,t)),this}rotate(e){return this.premultiply(Dh.makeRotation(-e)),this}translate(e,t){return this.premultiply(Dh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Dh=new Xe;function yx(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function gu(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function OI(){let i=gu("canvas");return i.style.display="block",i}var p0={};function nc(i){i in p0||(p0[i]=!0,console.warn(i))}function kI(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function FI(i){let e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function UI(i){let e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var ut={enabled:!0,workingColorSpace:ta,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===St&&(i.r=vr(i.r),i.g=vr(i.g),i.b=vr(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===St&&(i.r=Wo(i.r),i.g=Wo(i.g),i.b=Wo(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Yr?Ou:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function vr(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Wo(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var m0=[.64,.33,.3,.6,.15,.06],g0=[.2126,.7152,.0722],_0=[.3127,.329],v0=new Xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),y0=new Xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ut.define({[ta]:{primaries:m0,whitePoint:_0,transfer:Ou,toXYZ:v0,fromXYZ:y0,luminanceCoefficients:g0,workingColorSpaceConfig:{unpackColorSpace:pi},outputColorSpaceConfig:{drawingBufferColorSpace:pi}},[pi]:{primaries:m0,whitePoint:_0,transfer:St,toXYZ:v0,fromXYZ:y0,luminanceCoefficients:g0,outputColorSpaceConfig:{drawingBufferColorSpace:pi}}});var Co,Gp=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Co===void 0&&(Co=gu("canvas")),Co.width=e.width,Co.height=e.height;let n=Co.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Co}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=gu("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=vr(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(vr(t[n]/255)*255):t[n]=vr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},BI=0,_u=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:BI++}),this.uuid=cc(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Rh(r[o].image)):s.push(Rh(r[o]))}else s=Rh(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function Rh(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Gp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var VI=0,zs=(()=>{class i extends Qr{constructor(t=i.DEFAULT_IMAGE,n=i.DEFAULT_MAPPING,r=Ls,s=Ls,o=ji,a=Os,c=Li,l=xr,u=i.DEFAULT_ANISOTROPY,f=Yr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:VI++}),this.uuid=cc(),this.name="",this.source=new _u(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=s,this.magFilter=o,this.minFilter=a,this.anisotropy=u,this.format=c,this.internalFormat=null,this.type=l,this.offset=new Ct(0,0),this.repeat=new Ct(1,1),this.center=new Ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),n||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==a0)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case hp:t.x=t.x-Math.floor(t.x);break;case Ls:t.x=t.x<0?0:1;break;case pp:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case hp:t.y=t.y-Math.floor(t.y);break;case Ls:t.y=t.y<0?0:1;break;case pp:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}return i.DEFAULT_IMAGE=null,i.DEFAULT_MAPPING=a0,i.DEFAULT_ANISOTROPY=1,i})(),qt=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,c=e.elements,l=c[0],u=c[4],f=c[8],h=c[1],d=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(l+1)/2,v=(d+1)/2,I=(p+1)/2,C=(u+h)/4,E=(f+_)/4,A=(g+m)/4;return w>v&&w>I?w<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(w),r=C/n,s=E/n):v>I?v<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),n=C/r,s=A/r):I<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(I),n=E/s,r=A/s),this.set(n,r,s,t),this}let b=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(f-_)/b,this.z=(h-u)/b,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Wp=class extends Qr{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new qt(0,0,e,t),this.scissorTest=!1,this.viewport=new qt(0,0,e,t);let r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ji,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let s=new zs(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new _u(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Mr=class extends Wp{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},vu=class extends zs{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=ki,this.minFilter=ki,this.wrapR=Ls,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var jp=class extends zs{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=ki,this.minFilter=ki,this.wrapR=Ls,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var es=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let c=n[r+0],l=n[r+1],u=n[r+2],f=n[r+3],h=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f;return}if(a===1){e[t+0]=h,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(f!==_||c!==h||l!==d||u!==g){let m=1-a,p=c*h+l*d+u*g+f*_,b=p>=0?1:-1,w=1-p*p;if(w>Number.EPSILON){let I=Math.sqrt(w),C=Math.atan2(I,p*b);m=Math.sin(m*C)/I,a=Math.sin(a*C)/I}let v=a*b;if(c=c*m+h*v,l=l*m+d*v,u=u*m+g*v,f=f*m+_*v,m===1-a){let I=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=I,l*=I,u*=I,f*=I}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,r,s,o){let a=n[r],c=n[r+1],l=n[r+2],u=n[r+3],f=s[o],h=s[o+1],d=s[o+2],g=s[o+3];return e[t]=a*g+u*f+c*d-l*h,e[t+1]=c*g+u*h+l*f-a*d,e[t+2]=l*g+u*d+a*h-c*f,e[t+3]=u*g-a*f-c*h-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(r/2),f=a(s/2),h=c(n/2),d=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=h*u*f+l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f+h*d*g;break;case"YZX":this._x=h*u*f+l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f-h*d*g;break;case"XZY":this._x=h*u*f-l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f+h*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],f=t[10],h=n+a+f;if(h>0){let d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-c)*d,this._y=(s-l)*d,this._z=(o-r)*d}else if(n>a&&n>f){let d=2*Math.sqrt(1+n-a-f);this._w=(u-c)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+l)/d}else if(a>f){let d=2*Math.sqrt(1+a-n-f);this._w=(s-l)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(c+u)/d}else{let d=2*Math.sqrt(1+f-n-a);this._w=(o-r)/d,this._x=(s+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(zn(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-n*l,this._z=s*u+o*l+n*c-r*a,this._w=o*u-n*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,s=this._z,o=this._w,a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;let c=1-a*a;if(c<=Number.EPSILON){let d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*r+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,a),f=Math.sin((1-t)*u)/l,h=Math.sin(t*u)/l;return this._w=o*f+this._w*h,this._x=n*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},$=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(x0.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(x0.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*n),u=2*(a*t-s*r),f=2*(s*n-o*t);return this.x=t+c*l+o*f-a*u,this.y=n+c*u+a*l-s*f,this.z=r+c*f+s*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-n*c,this.z=n*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ph.copy(this).projectOnVector(e),this.sub(Ph)}reflect(e){return this.sub(Ph.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(zn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ph=new $,x0=new es,Fs=class{constructor(e=new $(1/0,1/0,1/0),t=new $(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ri.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ri.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Ri.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Ri):Ri.fromBufferAttribute(s,o),Ri.applyMatrix4(e.matrixWorld),this.expandByPoint(Ri);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Bl.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Bl.copy(n.boundingBox)),Bl.applyMatrix4(e.matrixWorld),this.union(Bl)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ri),Ri.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ka),Vl.subVectors(this.max,Ka),Io.subVectors(e.a,Ka),Ao.subVectors(e.b,Ka),Do.subVectors(e.c,Ka),Gr.subVectors(Ao,Io),Wr.subVectors(Do,Ao),ws.subVectors(Io,Do);let t=[0,-Gr.z,Gr.y,0,-Wr.z,Wr.y,0,-ws.z,ws.y,Gr.z,0,-Gr.x,Wr.z,0,-Wr.x,ws.z,0,-ws.x,-Gr.y,Gr.x,0,-Wr.y,Wr.x,0,-ws.y,ws.x,0];return!Nh(t,Io,Ao,Do,Vl)||(t=[1,0,0,0,1,0,0,0,1],!Nh(t,Io,Ao,Do,Vl))?!1:(zl.crossVectors(Gr,Wr),t=[zl.x,zl.y,zl.z],Nh(t,Io,Ao,Do,Vl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ri).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ri).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(cr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),cr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),cr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),cr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),cr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),cr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),cr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),cr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(cr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},cr=[new $,new $,new $,new $,new $,new $,new $,new $],Ri=new $,Bl=new Fs,Io=new $,Ao=new $,Do=new $,Gr=new $,Wr=new $,ws=new $,Ka=new $,Vl=new $,zl=new $,Es=new $;function Nh(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){Es.fromArray(i,s);let a=r.x*Math.abs(Es.x)+r.y*Math.abs(Es.y)+r.z*Math.abs(Es.z),c=e.dot(Es),l=t.dot(Es),u=n.dot(Es);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var zI=new Fs,Qa=new $,Lh=new $,Jo=class{constructor(e=new $,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):zI.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Qa.subVectors(e,this.center);let t=Qa.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Qa,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Lh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Qa.copy(e.center).add(Lh)),this.expandByPoint(Qa.copy(e.center).sub(Lh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},lr=new $,Oh=new $,Hl=new $,jr=new $,kh=new $,Gl=new $,Fh=new $,yu=class{constructor(e=new $,t=new $(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,lr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=lr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(lr.copy(this.origin).addScaledVector(this.direction,t),lr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Oh.copy(e).add(t).multiplyScalar(.5),Hl.copy(t).sub(e).normalize(),jr.copy(this.origin).sub(Oh);let s=e.distanceTo(t)*.5,o=-this.direction.dot(Hl),a=jr.dot(this.direction),c=-jr.dot(Hl),l=jr.lengthSq(),u=Math.abs(1-o*o),f,h,d,g;if(u>0)if(f=o*c-a,h=o*a-c,g=s*u,f>=0)if(h>=-g)if(h<=g){let _=1/u;f*=_,h*=_,d=f*(f+o*h+2*a)+h*(o*f+h+2*c)+l}else h=s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;else h=-s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;else h<=-g?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-c),s),d=-f*f+h*(h+2*c)+l):h<=g?(f=0,h=Math.min(Math.max(-s,-c),s),d=h*(h+2*c)+l):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-c),s),d=-f*f+h*(h+2*c)+l);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Oh).addScaledVector(Hl,h),d}intersectSphere(e,t){lr.subVectors(e.center,this.origin);let n=lr.dot(this.direction),r=lr.dot(lr)-n*n,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,c,l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(n=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(n=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-h.z)*f,c=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,c=(e.min.z-h.z)*f),n>c||a>r)||((a>n||n!==n)&&(n=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,lr)!==null}intersectTriangle(e,t,n,r,s){kh.subVectors(t,e),Gl.subVectors(n,e),Fh.crossVectors(kh,Gl);let o=this.direction.dot(Fh),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;jr.subVectors(this.origin,e);let c=a*this.direction.dot(Gl.crossVectors(jr,Gl));if(c<0)return null;let l=a*this.direction.dot(kh.cross(jr));if(l<0||c+l>o)return null;let u=-a*jr.dot(Fh);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Kt=class i{constructor(e,t,n,r,s,o,a,c,l,u,f,h,d,g,_,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l,u,f,h,d,g,_,m)}set(e,t,n,r,s,o,a,c,l,u,f,h,d,g,_,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/Ro.setFromMatrixColumn(e,0).length(),s=1/Ro.setFromMatrixColumn(e,1).length(),o=1/Ro.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){let h=o*u,d=o*f,g=a*u,_=a*f;t[0]=c*u,t[4]=-c*f,t[8]=l,t[1]=d+g*l,t[5]=h-_*l,t[9]=-a*c,t[2]=_-h*l,t[6]=g+d*l,t[10]=o*c}else if(e.order==="YXZ"){let h=c*u,d=c*f,g=l*u,_=l*f;t[0]=h+_*a,t[4]=g*a-d,t[8]=o*l,t[1]=o*f,t[5]=o*u,t[9]=-a,t[2]=d*a-g,t[6]=_+h*a,t[10]=o*c}else if(e.order==="ZXY"){let h=c*u,d=c*f,g=l*u,_=l*f;t[0]=h-_*a,t[4]=-o*f,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*u,t[9]=_-h*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let h=o*u,d=o*f,g=a*u,_=a*f;t[0]=c*u,t[4]=g*l-d,t[8]=h*l+_,t[1]=c*f,t[5]=_*l+h,t[9]=d*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let h=o*c,d=o*l,g=a*c,_=a*l;t[0]=c*u,t[4]=_-h*f,t[8]=g*f+d,t[1]=f,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=d*f+g,t[10]=h-_*f}else if(e.order==="XZY"){let h=o*c,d=o*l,g=a*c,_=a*l;t[0]=c*u,t[4]=-f,t[8]=l*u,t[1]=h*f+_,t[5]=o*u,t[9]=d*f-g,t[2]=g*f-d,t[6]=a*u,t[10]=_*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(HI,e,GI)}lookAt(e,t,n){let r=this.elements;return Kn.subVectors(e,t),Kn.lengthSq()===0&&(Kn.z=1),Kn.normalize(),$r.crossVectors(n,Kn),$r.lengthSq()===0&&(Math.abs(n.z)===1?Kn.x+=1e-4:Kn.z+=1e-4,Kn.normalize(),$r.crossVectors(n,Kn)),$r.normalize(),Wl.crossVectors(Kn,$r),r[0]=$r.x,r[4]=Wl.x,r[8]=Kn.x,r[1]=$r.y,r[5]=Wl.y,r[9]=Kn.y,r[2]=$r.z,r[6]=Wl.z,r[10]=Kn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],f=n[5],h=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],b=n[3],w=n[7],v=n[11],I=n[15],C=r[0],E=r[4],A=r[8],x=r[12],y=r[1],D=r[5],N=r[9],F=r[13],G=r[2],X=r[6],W=r[10],j=r[14],H=r[3],te=r[7],R=r[11],ue=r[15];return s[0]=o*C+a*y+c*G+l*H,s[4]=o*E+a*D+c*X+l*te,s[8]=o*A+a*N+c*W+l*R,s[12]=o*x+a*F+c*j+l*ue,s[1]=u*C+f*y+h*G+d*H,s[5]=u*E+f*D+h*X+d*te,s[9]=u*A+f*N+h*W+d*R,s[13]=u*x+f*F+h*j+d*ue,s[2]=g*C+_*y+m*G+p*H,s[6]=g*E+_*D+m*X+p*te,s[10]=g*A+_*N+m*W+p*R,s[14]=g*x+_*F+m*j+p*ue,s[3]=b*C+w*y+v*G+I*H,s[7]=b*E+w*D+v*X+I*te,s[11]=b*A+w*N+v*W+I*R,s[15]=b*x+w*F+v*j+I*ue,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],f=e[6],h=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+s*c*f-r*l*f-s*a*h+n*l*h+r*a*d-n*c*d)+_*(+t*c*d-t*l*h+s*o*h-r*o*d+r*l*u-s*c*u)+m*(+t*l*f-t*a*d-s*o*f+n*o*d+s*a*u-n*l*u)+p*(-r*a*u-t*c*f+t*a*h+r*o*f-n*o*h+n*c*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],f=e[9],h=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],b=f*m*l-_*h*l+_*c*d-a*m*d-f*c*p+a*h*p,w=g*h*l-u*m*l-g*c*d+o*m*d+u*c*p-o*h*p,v=u*_*l-g*f*l+g*a*d-o*_*d-u*a*p+o*f*p,I=g*f*c-u*_*c-g*a*h+o*_*h+u*a*m-o*f*m,C=t*b+n*w+r*v+s*I;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let E=1/C;return e[0]=b*E,e[1]=(_*h*s-f*m*s-_*r*d+n*m*d+f*r*p-n*h*p)*E,e[2]=(a*m*s-_*c*s+_*r*l-n*m*l-a*r*p+n*c*p)*E,e[3]=(f*c*s-a*h*s-f*r*l+n*h*l+a*r*d-n*c*d)*E,e[4]=w*E,e[5]=(u*m*s-g*h*s+g*r*d-t*m*d-u*r*p+t*h*p)*E,e[6]=(g*c*s-o*m*s-g*r*l+t*m*l+o*r*p-t*c*p)*E,e[7]=(o*h*s-u*c*s+u*r*l-t*h*l-o*r*d+t*c*d)*E,e[8]=v*E,e[9]=(g*f*s-u*_*s-g*n*d+t*_*d+u*n*p-t*f*p)*E,e[10]=(o*_*s-g*a*s+g*n*l-t*_*l-o*n*p+t*a*p)*E,e[11]=(u*a*s-o*f*s-u*n*l+t*f*l+o*n*d-t*a*d)*E,e[12]=I*E,e[13]=(u*_*r-g*f*r+g*n*h-t*_*h-u*n*m+t*f*m)*E,e[14]=(g*a*r-o*_*r-g*n*c+t*_*c+o*n*m-t*a*m)*E,e[15]=(o*f*r-u*a*r+u*n*c-t*f*c-o*n*h+t*a*h)*E,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,c=e.z,l=s*o,u=s*a;return this.set(l*o+n,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+n,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,u=o+o,f=a+a,h=s*l,d=s*u,g=s*f,_=o*u,m=o*f,p=a*f,b=c*l,w=c*u,v=c*f,I=n.x,C=n.y,E=n.z;return r[0]=(1-(_+p))*I,r[1]=(d+v)*I,r[2]=(g-w)*I,r[3]=0,r[4]=(d-v)*C,r[5]=(1-(h+p))*C,r[6]=(m+b)*C,r[7]=0,r[8]=(g+w)*E,r[9]=(m-b)*E,r[10]=(1-(h+_))*E,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,s=Ro.set(r[0],r[1],r[2]).length(),o=Ro.set(r[4],r[5],r[6]).length(),a=Ro.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Pi.copy(this);let l=1/s,u=1/o,f=1/a;return Pi.elements[0]*=l,Pi.elements[1]*=l,Pi.elements[2]*=l,Pi.elements[4]*=u,Pi.elements[5]*=u,Pi.elements[6]*=u,Pi.elements[8]*=f,Pi.elements[9]*=f,Pi.elements[10]*=f,t.setFromRotationMatrix(Pi),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=_r){let c=this.elements,l=2*s/(t-e),u=2*s/(n-r),f=(t+e)/(t-e),h=(n+r)/(n-r),d,g;if(a===_r)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===mu)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=_r){let c=this.elements,l=1/(t-e),u=1/(n-r),f=1/(o-s),h=(t+e)*l,d=(n+r)*u,g,_;if(a===_r)g=(o+s)*f,_=-2*f;else if(a===mu)g=s*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ro=new $,Pi=new Kt,HI=new $(0,0,0),GI=new $(1,1,1),$r=new $,Wl=new $,Kn=new $,M0=new Kt,S0=new es,Ko=(()=>{class i{constructor(t=0,n=0,r=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,r,s=this._order){return this._x=t,this._y=n,this._z=r,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,r=!0){let s=t.elements,o=s[0],a=s[4],c=s[8],l=s[1],u=s[5],f=s[9],h=s[2],d=s[6],g=s[10];switch(n){case"XYZ":this._y=Math.asin(zn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,g),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(d,u),this._z=0);break;case"YXZ":this._x=Math.asin(-zn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(c,g),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-h,o),this._z=0);break;case"ZXY":this._x=Math.asin(zn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,g),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-zn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,g),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(zn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,u),this._y=Math.atan2(-h,o)):(this._x=0,this._y=Math.atan2(c,g));break;case"XZY":this._z=Math.asin(-zn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,u),this._y=Math.atan2(c,o)):(this._x=Math.atan2(-f,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,r){return M0.makeRotationFromQuaternion(t),this.setFromRotationMatrix(M0,n,r)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return S0.setFromEuler(this),this.setFromQuaternion(S0,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}return i.DEFAULT_ORDER="XYZ",i})(),xu=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},WI=0,b0=new $,Po=new es,ur=new Kt,jl=new $,ec=new $,jI=new $,$I=new es,w0=new $(1,0,0),E0=new $(0,1,0),T0=new $(0,0,1),C0={type:"added"},qI={type:"removed"},No={type:"childadded",child:null},Uh={type:"childremoved",child:null},Hs=(()=>{class i extends Qr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:WI++}),this.uuid=cc(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new $,n=new Ko,r=new es,s=new $(1,1,1);function o(){r.setFromEuler(n,!1)}function a(){n.setFromQuaternion(r,void 0,!1)}n._onChange(o),r._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Kt},normalMatrix:{value:new Xe}}),this.matrix=new Kt,this.matrixWorld=new Kt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Po.setFromAxisAngle(t,n),this.quaternion.multiply(Po),this}rotateOnWorldAxis(t,n){return Po.setFromAxisAngle(t,n),this.quaternion.premultiply(Po),this}rotateX(t){return this.rotateOnAxis(w0,t)}rotateY(t){return this.rotateOnAxis(E0,t)}rotateZ(t){return this.rotateOnAxis(T0,t)}translateOnAxis(t,n){return b0.copy(t).applyQuaternion(this.quaternion),this.position.add(b0.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(w0,t)}translateY(t){return this.translateOnAxis(E0,t)}translateZ(t){return this.translateOnAxis(T0,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ur.copy(this.matrixWorld).invert())}lookAt(t,n,r){t.isVector3?jl.copy(t):jl.set(t,n,r);let s=this.parent;this.updateWorldMatrix(!0,!1),ec.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ur.lookAt(ec,jl,this.up):ur.lookAt(jl,ec,this.up),this.quaternion.setFromRotationMatrix(ur),s&&(ur.extractRotation(s.matrixWorld),Po.setFromRotationMatrix(ur),this.quaternion.premultiply(Po.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(C0),No.child=t,this.dispatchEvent(No),No.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}let n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(qI),Uh.child=t,this.dispatchEvent(Uh),Uh.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ur.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ur.multiply(t.parent.matrixWorld)),t.applyMatrix4(ur),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(C0),No.child=t,this.dispatchEvent(No),No.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let r=0,s=this.children.length;r<s;r++){let a=this.children[r].getObjectByProperty(t,n);if(a!==void 0)return a}}getObjectsByProperty(t,n,r=[]){this[t]===n&&r.push(this);let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].getObjectsByProperty(t,n,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ec,t,jI),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ec,$I,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);let n=this.children;for(let r=0,s=n.length;r<s;r++)n[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let n=this.children;for(let r=0,s=n.length;r<s;r++)n[r].traverseVisible(t)}traverseAncestors(t){let n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let n=this.children;for(let r=0,s=n.length;r<s;r++)n[r].updateMatrixWorld(t)}updateWorldMatrix(t,n){let r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(t){let n=t===void 0||typeof t=="string",r={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(c=>({boxInitialized:c.boxInitialized,boxMin:c.box.min.toArray(),boxMax:c.box.max.toArray(),sphereInitialized:c.sphereInitialized,sphereRadius:c.sphere.radius,sphereCenter:c.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function o(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);let c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){let l=c.shapes;if(Array.isArray(l))for(let u=0,f=l.length;u<f;u++){let h=l[u];o(t.shapes,h)}else o(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let c=[];for(let l=0,u=this.material.length;l<u;l++)c.push(o(t.materials,this.material[l]));s.material=c}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){let l=this.animations[c];s.animations.push(o(t.animations,l))}}if(n){let c=a(t.geometries),l=a(t.materials),u=a(t.textures),f=a(t.images),h=a(t.shapes),d=a(t.skeletons),g=a(t.animations),_=a(t.nodes);c.length>0&&(r.geometries=c),l.length>0&&(r.materials=l),u.length>0&&(r.textures=u),f.length>0&&(r.images=f),h.length>0&&(r.shapes=h),d.length>0&&(r.skeletons=d),g.length>0&&(r.animations=g),_.length>0&&(r.nodes=_)}return r.object=s,r;function a(c){let l=[];for(let u in c){let f=c[u];delete f.metadata,l.push(f)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let r=0;r<t.children.length;r++){let s=t.children[r];this.add(s.clone())}return this}}return i.DEFAULT_UP=new $(0,1,0),i.DEFAULT_MATRIX_AUTO_UPDATE=!0,i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,i})(),Ni=new $,dr=new $,Bh=new $,fr=new $,Lo=new $,Oo=new $,I0=new $,Vh=new $,zh=new $,Hh=new $,Gh=new qt,Wh=new qt,jh=new qt,Ps=class i{constructor(e=new $,t=new $,n=new $){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Ni.subVectors(e,t),r.cross(Ni);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Ni.subVectors(r,t),dr.subVectors(n,t),Bh.subVectors(e,t);let o=Ni.dot(Ni),a=Ni.dot(dr),c=Ni.dot(Bh),l=dr.dot(dr),u=dr.dot(Bh),f=o*l-a*a;if(f===0)return s.set(0,0,0),null;let h=1/f,d=(l*c-a*u)*h,g=(o*u-a*c)*h;return s.set(1-d-g,g,d)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,fr)===null?!1:fr.x>=0&&fr.y>=0&&fr.x+fr.y<=1}static getInterpolation(e,t,n,r,s,o,a,c){return this.getBarycoord(e,t,n,r,fr)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,fr.x),c.addScaledVector(o,fr.y),c.addScaledVector(a,fr.z),c)}static getInterpolatedAttribute(e,t,n,r,s,o){return Gh.setScalar(0),Wh.setScalar(0),jh.setScalar(0),Gh.fromBufferAttribute(e,t),Wh.fromBufferAttribute(e,n),jh.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Gh,s.x),o.addScaledVector(Wh,s.y),o.addScaledVector(jh,s.z),o}static isFrontFacing(e,t,n,r){return Ni.subVectors(n,t),dr.subVectors(e,t),Ni.cross(dr).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ni.subVectors(this.c,this.b),dr.subVectors(this.a,this.b),Ni.cross(dr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,o,a;Lo.subVectors(r,n),Oo.subVectors(s,n),Vh.subVectors(e,n);let c=Lo.dot(Vh),l=Oo.dot(Vh);if(c<=0&&l<=0)return t.copy(n);zh.subVectors(e,r);let u=Lo.dot(zh),f=Oo.dot(zh);if(u>=0&&f<=u)return t.copy(r);let h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(Lo,o);Hh.subVectors(e,s);let d=Lo.dot(Hh),g=Oo.dot(Hh);if(g>=0&&d<=g)return t.copy(s);let _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Oo,a);let m=u*g-d*f;if(m<=0&&f-u>=0&&d-g>=0)return I0.subVectors(s,r),a=(f-u)/(f-u+(d-g)),t.copy(r).addScaledVector(I0,a);let p=1/(m+_+h);return o=_*p,a=h*p,t.copy(n).addScaledVector(Lo,o).addScaledVector(Oo,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},xx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qr={h:0,s:0,l:0},$l={h:0,s:0,l:0};function $h(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var ot=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=pi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ut.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=ut.workingColorSpace){return this.r=e,this.g=t,this.b=n,ut.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=ut.workingColorSpace){if(e=LI(e,1),t=zn(t,0,1),n=zn(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=$h(o,s,e+1/3),this.g=$h(o,s,e),this.b=$h(o,s,e-1/3)}return ut.toWorkingColorSpace(this,r),this}setStyle(e,t=pi){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=pi){let n=xx[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=vr(e.r),this.g=vr(e.g),this.b=vr(e.b),this}copyLinearToSRGB(e){return this.r=Wo(e.r),this.g=Wo(e.g),this.b=Wo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=pi){return ut.fromWorkingColorSpace(yn.copy(this),e),Math.round(zn(yn.r*255,0,255))*65536+Math.round(zn(yn.g*255,0,255))*256+Math.round(zn(yn.b*255,0,255))}getHexString(e=pi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ut.workingColorSpace){ut.fromWorkingColorSpace(yn.copy(this),t);let n=yn.r,r=yn.g,s=yn.b,o=Math.max(n,r,s),a=Math.min(n,r,s),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let f=o-a;switch(l=u<=.5?f/(o+a):f/(2-o-a),o){case n:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-n)/f+2;break;case s:c=(n-r)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=ut.workingColorSpace){return ut.fromWorkingColorSpace(yn.copy(this),t),e.r=yn.r,e.g=yn.g,e.b=yn.b,e}getStyle(e=pi){ut.fromWorkingColorSpace(yn.copy(this),e);let t=yn.r,n=yn.g,r=yn.b;return e!==pi?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(qr),this.setHSL(qr.h+e,qr.s+t,qr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(qr),e.getHSL($l);let n=Ah(qr.h,$l.h,t),r=Ah(qr.s,$l.s,t),s=Ah(qr.l,$l.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},yn=new ot;ot.NAMES=xx;var XI=0,Us=class extends Qr{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:XI++}),this.uuid=cc(),this.name="",this.blending=Ho,this.side=Kr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=np,this.blendDst=ip,this.blendEquation=Rs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ot(0,0,0),this.blendAlpha=0,this.depthFunc=$o,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=d0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=To,this.stencilZFail=To,this.stencilZPass=To,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ho&&(n.blending=this.blending),this.side!==Kr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==np&&(n.blendSrc=this.blendSrc),this.blendDst!==ip&&(n.blendDst=this.blendDst),this.blendEquation!==Rs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==$o&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==d0&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==To&&(n.stencilFail=this.stencilFail),this.stencilZFail!==To&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==To&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let o=[];for(let a in s){let c=s[a];delete c.metadata,o.push(c)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Mu=class extends Us{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ko,this.combine=ax,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Jt=new $,ql=new Ct,cn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=f0,this.updateRanges=[],this.gpuType=gr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ql.fromBufferAttribute(this,t),ql.applyMatrix3(e),this.setXY(t,ql.x,ql.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix3(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix4(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyNormalMatrix(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.transformDirection(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ja(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Vn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ja(t,this.array)),t}setX(e,t){return this.normalized&&(t=Vn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ja(t,this.array)),t}setY(e,t){return this.normalized&&(t=Vn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ja(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Vn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ja(t,this.array)),t}setW(e,t){return this.normalized&&(t=Vn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Vn(t,this.array),n=Vn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Vn(t,this.array),n=Vn(n,this.array),r=Vn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Vn(t,this.array),n=Vn(n,this.array),r=Vn(r,this.array),s=Vn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==f0&&(e.usage=this.usage),e}};var Su=class extends cn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var bu=class extends cn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var yr=class extends cn{constructor(e,t,n){super(new Float32Array(e),t,n)}},YI=0,hi=new Kt,qh=new Hs,ko=new $,Qn=new Fs,tc=new Fs,an=new $,$i=class i extends Qr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:YI++}),this.uuid=cc(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(yx(e)?bu:Su)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Xe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return hi.makeRotationFromQuaternion(e),this.applyMatrix4(hi),this}rotateX(e){return hi.makeRotationX(e),this.applyMatrix4(hi),this}rotateY(e){return hi.makeRotationY(e),this.applyMatrix4(hi),this}rotateZ(e){return hi.makeRotationZ(e),this.applyMatrix4(hi),this}translate(e,t,n){return hi.makeTranslation(e,t,n),this.applyMatrix4(hi),this}scale(e,t,n){return hi.makeScale(e,t,n),this.applyMatrix4(hi),this}lookAt(e){return qh.lookAt(e),qh.updateMatrix(),this.applyMatrix4(qh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ko).negate(),this.translate(ko.x,ko.y,ko.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new yr(n,3))}else{for(let n=0,r=t.count;n<r;n++){let s=e[n];t.setXYZ(n,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fs);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new $(-1/0,-1/0,-1/0),new $(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];Qn.setFromBufferAttribute(s),this.morphTargetsRelative?(an.addVectors(this.boundingBox.min,Qn.min),this.boundingBox.expandByPoint(an),an.addVectors(this.boundingBox.max,Qn.max),this.boundingBox.expandByPoint(an)):(this.boundingBox.expandByPoint(Qn.min),this.boundingBox.expandByPoint(Qn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Jo);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new $,1/0);return}if(e){let n=this.boundingSphere.center;if(Qn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];tc.setFromBufferAttribute(a),this.morphTargetsRelative?(an.addVectors(Qn.min,tc.min),Qn.expandByPoint(an),an.addVectors(Qn.max,tc.max),Qn.expandByPoint(an)):(Qn.expandByPoint(tc.min),Qn.expandByPoint(tc.max))}Qn.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)an.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(an));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)an.fromBufferAttribute(a,l),c&&(ko.fromBufferAttribute(e,l),an.add(ko)),r=Math.max(r,n.distanceToSquared(an))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new cn(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let A=0;A<n.count;A++)a[A]=new $,c[A]=new $;let l=new $,u=new $,f=new $,h=new Ct,d=new Ct,g=new Ct,_=new $,m=new $;function p(A,x,y){l.fromBufferAttribute(n,A),u.fromBufferAttribute(n,x),f.fromBufferAttribute(n,y),h.fromBufferAttribute(s,A),d.fromBufferAttribute(s,x),g.fromBufferAttribute(s,y),u.sub(l),f.sub(l),d.sub(h),g.sub(h);let D=1/(d.x*g.y-g.x*d.y);isFinite(D)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(D),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(D),a[A].add(_),a[x].add(_),a[y].add(_),c[A].add(m),c[x].add(m),c[y].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let A=0,x=b.length;A<x;++A){let y=b[A],D=y.start,N=y.count;for(let F=D,G=D+N;F<G;F+=3)p(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let w=new $,v=new $,I=new $,C=new $;function E(A){I.fromBufferAttribute(r,A),C.copy(I);let x=a[A];w.copy(x),w.sub(I.multiplyScalar(I.dot(x))).normalize(),v.crossVectors(C,x);let D=v.dot(c[A])<0?-1:1;o.setXYZW(A,w.x,w.y,w.z,D)}for(let A=0,x=b.length;A<x;++A){let y=b[A],D=y.start,N=y.count;for(let F=D,G=D+N;F<G;F+=3)E(e.getX(F+0)),E(e.getX(F+1)),E(e.getX(F+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new cn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);let r=new $,s=new $,o=new $,a=new $,c=new $,l=new $,u=new $,f=new $;if(e)for(let h=0,d=e.count;h<d;h+=3){let g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,d=t.count;h<d;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)an.fromBufferAttribute(e,t),an.normalize(),e.setXYZ(t,an.x,an.y,an.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,f=a.normalized,h=new l.constructor(c.length*u),d=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*u;for(let p=0;p<u;p++)h[g++]=l[d++]}return new cn(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let a in r){let c=r[a],l=e(c,n);t.setAttribute(a,l)}let s=this.morphAttributes;for(let a in s){let c=[],l=s[a];for(let u=0,f=l.length;u<f;u++){let h=l[u],d=e(h,n);c.push(d)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){let d=l[f];u.push(d.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let s=e.morphAttributes;for(let l in s){let u=[],f=s[l];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},A0=new Kt,Ts=new yu,Xl=new Jo,D0=new $,Yl=new $,Zl=new $,Jl=new $,Xh=new $,Kl=new $,R0=new $,Ql=new $,Oi=class extends Hs{constructor(e=new $i,t=new Mu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){Kl.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let u=a[c],f=s[c];u!==0&&(Xh.fromBufferAttribute(f,e),o?Kl.addScaledVector(Xh,u):Kl.addScaledVector(Xh.sub(t),u))}t.add(Kl)}return t}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Xl.copy(n.boundingSphere),Xl.applyMatrix4(s),Ts.copy(e.ray).recast(e.near),!(Xl.containsPoint(Ts.origin)===!1&&(Ts.intersectSphere(Xl,D0)===null||Ts.origin.distanceToSquared(D0)>(e.far-e.near)**2))&&(A0.copy(s).invert(),Ts.copy(e.ray).applyMatrix4(A0),!(n.boundingBox!==null&&Ts.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ts)))}_computeIntersections(e,t,n){let r,s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){let m=h[g],p=o[m.materialIndex],b=Math.max(m.start,d.start),w=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let v=b,I=w;v<I;v+=3){let C=a.getX(v),E=a.getX(v+1),A=a.getX(v+2);r=eu(this,p,e,n,l,u,f,C,E,A),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let b=a.getX(m),w=a.getX(m+1),v=a.getX(m+2);r=eu(this,o,e,n,l,u,f,b,w,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){let m=h[g],p=o[m.materialIndex],b=Math.max(m.start,d.start),w=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let v=b,I=w;v<I;v+=3){let C=v,E=v+1,A=v+2;r=eu(this,p,e,n,l,u,f,C,E,A),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let b=m,w=m+1,v=m+2;r=eu(this,o,e,n,l,u,f,b,w,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function ZI(i,e,t,n,r,s,o,a){let c;if(e.side===Hn?c=n.intersectTriangle(o,s,r,!0,a):c=n.intersectTriangle(r,s,o,e.side===Kr,a),c===null)return null;Ql.copy(a),Ql.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Ql);return l<t.near||l>t.far?null:{distance:l,point:Ql.clone(),object:i}}function eu(i,e,t,n,r,s,o,a,c,l){i.getVertexPosition(a,Yl),i.getVertexPosition(c,Zl),i.getVertexPosition(l,Jl);let u=ZI(i,e,t,n,Yl,Zl,Jl,R0);if(u){let f=new $;Ps.getBarycoord(R0,Yl,Zl,Jl,f),r&&(u.uv=Ps.getInterpolatedAttribute(r,a,c,l,f,new Ct)),s&&(u.uv1=Ps.getInterpolatedAttribute(s,a,c,l,f,new Ct)),o&&(u.normal=Ps.getInterpolatedAttribute(o,a,c,l,f,new $),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:c,c:l,normal:new $,materialIndex:0};Ps.getNormal(Yl,Zl,Jl,h.normal),u.face=h,u.barycoord=f}return u}var oc=class i extends $i{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let c=[],l=[],u=[],f=[],h=0,d=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,r,o,2),g("x","z","y",1,-1,e,n,-t,r,o,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new yr(l,3)),this.setAttribute("normal",new yr(u,3)),this.setAttribute("uv",new yr(f,2));function g(_,m,p,b,w,v,I,C,E,A,x){let y=v/E,D=I/A,N=v/2,F=I/2,G=C/2,X=E+1,W=A+1,j=0,H=0,te=new $;for(let R=0;R<W;R++){let ue=R*D-F;for(let Pe=0;Pe<X;Pe++){let Ze=Pe*y-N;te[_]=Ze*b,te[m]=ue*w,te[p]=G,l.push(te.x,te.y,te.z),te[_]=0,te[m]=0,te[p]=C>0?1:-1,u.push(te.x,te.y,te.z),f.push(Pe/E),f.push(1-R/A),j+=1}}for(let R=0;R<A;R++)for(let ue=0;ue<E;ue++){let Pe=h+ue+X*R,Ze=h+ue+X*(R+1),Y=h+(ue+1)+X*(R+1),ee=h+(ue+1)+X*R;c.push(Pe,Ze,ee),c.push(Ze,Y,ee),H+=6}a.addGroup(d,H,x),d+=H,h+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Qo(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function In(i){let e={};for(let t=0;t<i.length;t++){let n=Qo(i[t]);for(let r in n)e[r]=n[r]}return e}function JI(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Mx(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ut.workingColorSpace}var KI={clone:Qo,merge:In},QI=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,eA=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,mi=class extends Us{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=QI,this.fragmentShader=eA,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Qo(e.uniforms),this.uniformsGroups=JI(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},wu=class extends Hs{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Kt,this.projectionMatrix=new Kt,this.projectionMatrixInverse=new Kt,this.coordinateSystem=_r}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Xr=new $,P0=new Ct,N0=new Ct,An=class extends wu{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Hp*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ih*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Hp*2*Math.atan(Math.tan(Ih*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Xr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Xr.x,Xr.y).multiplyScalar(-e/Xr.z),Xr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xr.x,Xr.y).multiplyScalar(-e/Xr.z)}getViewSize(e,t){return this.getViewBounds(e,P0,N0),t.subVectors(N0,P0)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ih*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*n/l,r*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Fo=-90,Uo=1,$p=class extends Hs{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new An(Fo,Uo,e,t);r.layers=this.layers,this.add(r);let s=new An(Fo,Uo,e,t);s.layers=this.layers,this.add(s);let o=new An(Fo,Uo,e,t);o.layers=this.layers,this.add(o);let a=new An(Fo,Uo,e,t);a.layers=this.layers,this.add(a);let c=new An(Fo,Uo,e,t);c.layers=this.layers,this.add(c);let l=new An(Fo,Uo,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,c]=t;for(let l of t)this.remove(l);if(e===_r)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===mu)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,c,l,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,c),e.setRenderTarget(n,4,r),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Eu=class extends zs{constructor(e,t,n,r,s,o,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:qo,super(e,t,n,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},qp=class extends Mr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Eu(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ji}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new oc(5,5,5),s=new mi({name:"CubemapFromEquirect",uniforms:Qo(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Hn,blending:Zr});s.uniforms.tEquirect.value=t;let o=new Oi(r,s),a=t.minFilter;return t.minFilter===Os&&(t.minFilter=ji),new $p(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,r){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}},Yh=new $,tA=new $,nA=new Xe,pr=class{constructor(e=new $(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Yh.subVectors(n,t).cross(tA.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Yh),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||nA.getNormalMatrix(e),r=this.coplanarPoint(Yh).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Cs=new Jo,tu=new $,Tu=class{constructor(e=new pr,t=new pr,n=new pr,r=new pr,s=new pr,o=new pr){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=_r){let n=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],c=r[3],l=r[4],u=r[5],f=r[6],h=r[7],d=r[8],g=r[9],_=r[10],m=r[11],p=r[12],b=r[13],w=r[14],v=r[15];if(n[0].setComponents(c-s,h-l,m-d,v-p).normalize(),n[1].setComponents(c+s,h+l,m+d,v+p).normalize(),n[2].setComponents(c+o,h+u,m+g,v+b).normalize(),n[3].setComponents(c-o,h-u,m-g,v-b).normalize(),n[4].setComponents(c-a,h-f,m-_,v-w).normalize(),t===_r)n[5].setComponents(c+a,h+f,m+_,v+w).normalize();else if(t===mu)n[5].setComponents(a,f,_,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Cs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Cs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Cs)}intersectsSprite(e){return Cs.center.set(0,0,0),Cs.radius=.7071067811865476,Cs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Cs)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(tu.x=r.normal.x>0?e.max.x:e.min.x,tu.y=r.normal.y>0?e.max.y:e.min.y,tu.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(tu)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Sx(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function iA(i){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,f=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,c,l){let u=c.array,f=c.updateRanges;if(i.bindBuffer(l,a),f.length===0)i.bufferSubData(l,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){let g=f[h],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,f[h]=_)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){let _=f[d];i.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var Cu=class i extends $i{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(n),c=Math.floor(r),l=a+1,u=c+1,f=e/a,h=t/c,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){let b=p*h-o;for(let w=0;w<l;w++){let v=w*f-s;g.push(v,-b,0),_.push(0,0,1),m.push(w/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let b=0;b<a;b++){let w=b+l*p,v=b+l*(p+1),I=b+1+l*(p+1),C=b+1+l*p;d.push(w,v,C),d.push(v,I,C)}this.setIndex(d),this.setAttribute("position",new yr(g,3)),this.setAttribute("normal",new yr(_,3)),this.setAttribute("uv",new yr(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},rA=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sA=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,oA=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,aA=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cA=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,lA=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,uA=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,dA=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fA=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,hA=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,pA=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mA=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gA=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,_A=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,vA=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,yA=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,xA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,MA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,SA=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bA=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,wA=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,EA=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,TA=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,CA=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,IA=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,AA=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,DA=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,RA=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,PA=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,NA=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,LA="gl_FragColor = linearToOutputTexel( gl_FragColor );",OA=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,kA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,FA=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,UA=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,BA=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,VA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,zA=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,HA=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,GA=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,WA=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jA=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,$A=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qA=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,XA=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,YA=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,ZA=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,JA=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,KA=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,QA=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,e1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,t1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,n1=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,i1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,r1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,s1=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,o1=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,a1=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,c1=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,l1=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,u1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,d1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,f1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,h1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,p1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,m1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,g1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,v1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,y1=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,x1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,M1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,S1=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,b1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,w1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,E1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,T1=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,C1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,I1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,A1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,D1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,R1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,P1=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,N1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,L1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,O1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,k1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,F1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,U1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,B1=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,V1=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,z1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,H1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,G1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,W1=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,j1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,q1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,X1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Y1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Z1=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,J1=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,K1=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Q1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,eD=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tD=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,nD=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,iD=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,rD=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sD=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,oD=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aD=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cD=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lD=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,uD=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,dD=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,fD=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,hD=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pD=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mD=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gD=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_D=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,vD=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yD=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xD=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,MD=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,SD=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bD=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,wD=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ED=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,TD=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,CD=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ID=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,AD=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,DD=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,RD=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,PD=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ND=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,LD=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,OD=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,kD=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ye={alphahash_fragment:rA,alphahash_pars_fragment:sA,alphamap_fragment:oA,alphamap_pars_fragment:aA,alphatest_fragment:cA,alphatest_pars_fragment:lA,aomap_fragment:uA,aomap_pars_fragment:dA,batching_pars_vertex:fA,batching_vertex:hA,begin_vertex:pA,beginnormal_vertex:mA,bsdfs:gA,iridescence_fragment:_A,bumpmap_pars_fragment:vA,clipping_planes_fragment:yA,clipping_planes_pars_fragment:xA,clipping_planes_pars_vertex:MA,clipping_planes_vertex:SA,color_fragment:bA,color_pars_fragment:wA,color_pars_vertex:EA,color_vertex:TA,common:CA,cube_uv_reflection_fragment:IA,defaultnormal_vertex:AA,displacementmap_pars_vertex:DA,displacementmap_vertex:RA,emissivemap_fragment:PA,emissivemap_pars_fragment:NA,colorspace_fragment:LA,colorspace_pars_fragment:OA,envmap_fragment:kA,envmap_common_pars_fragment:FA,envmap_pars_fragment:UA,envmap_pars_vertex:BA,envmap_physical_pars_fragment:ZA,envmap_vertex:VA,fog_vertex:zA,fog_pars_vertex:HA,fog_fragment:GA,fog_pars_fragment:WA,gradientmap_pars_fragment:jA,lightmap_pars_fragment:$A,lights_lambert_fragment:qA,lights_lambert_pars_fragment:XA,lights_pars_begin:YA,lights_toon_fragment:JA,lights_toon_pars_fragment:KA,lights_phong_fragment:QA,lights_phong_pars_fragment:e1,lights_physical_fragment:t1,lights_physical_pars_fragment:n1,lights_fragment_begin:i1,lights_fragment_maps:r1,lights_fragment_end:s1,logdepthbuf_fragment:o1,logdepthbuf_pars_fragment:a1,logdepthbuf_pars_vertex:c1,logdepthbuf_vertex:l1,map_fragment:u1,map_pars_fragment:d1,map_particle_fragment:f1,map_particle_pars_fragment:h1,metalnessmap_fragment:p1,metalnessmap_pars_fragment:m1,morphinstance_vertex:g1,morphcolor_vertex:_1,morphnormal_vertex:v1,morphtarget_pars_vertex:y1,morphtarget_vertex:x1,normal_fragment_begin:M1,normal_fragment_maps:S1,normal_pars_fragment:b1,normal_pars_vertex:w1,normal_vertex:E1,normalmap_pars_fragment:T1,clearcoat_normal_fragment_begin:C1,clearcoat_normal_fragment_maps:I1,clearcoat_pars_fragment:A1,iridescence_pars_fragment:D1,opaque_fragment:R1,packing:P1,premultiplied_alpha_fragment:N1,project_vertex:L1,dithering_fragment:O1,dithering_pars_fragment:k1,roughnessmap_fragment:F1,roughnessmap_pars_fragment:U1,shadowmap_pars_fragment:B1,shadowmap_pars_vertex:V1,shadowmap_vertex:z1,shadowmask_pars_fragment:H1,skinbase_vertex:G1,skinning_pars_vertex:W1,skinning_vertex:j1,skinnormal_vertex:$1,specularmap_fragment:q1,specularmap_pars_fragment:X1,tonemapping_fragment:Y1,tonemapping_pars_fragment:Z1,transmission_fragment:J1,transmission_pars_fragment:K1,uv_pars_fragment:Q1,uv_pars_vertex:eD,uv_vertex:tD,worldpos_vertex:nD,background_vert:iD,background_frag:rD,backgroundCube_vert:sD,backgroundCube_frag:oD,cube_vert:aD,cube_frag:cD,depth_vert:lD,depth_frag:uD,distanceRGBA_vert:dD,distanceRGBA_frag:fD,equirect_vert:hD,equirect_frag:pD,linedashed_vert:mD,linedashed_frag:gD,meshbasic_vert:_D,meshbasic_frag:vD,meshlambert_vert:yD,meshlambert_frag:xD,meshmatcap_vert:MD,meshmatcap_frag:SD,meshnormal_vert:bD,meshnormal_frag:wD,meshphong_vert:ED,meshphong_frag:TD,meshphysical_vert:CD,meshphysical_frag:ID,meshtoon_vert:AD,meshtoon_frag:DD,points_vert:RD,points_frag:PD,shadow_vert:ND,shadow_frag:LD,sprite_vert:OD,sprite_frag:kD},ge={common:{diffuse:{value:new ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new Ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new ot(16777215)},opacity:{value:1},center:{value:new Ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},Wi={basic:{uniforms:In([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:Ye.meshbasic_vert,fragmentShader:Ye.meshbasic_frag},lambert:{uniforms:In([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new ot(0)}}]),vertexShader:Ye.meshlambert_vert,fragmentShader:Ye.meshlambert_frag},phong:{uniforms:In([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new ot(0)},specular:{value:new ot(1118481)},shininess:{value:30}}]),vertexShader:Ye.meshphong_vert,fragmentShader:Ye.meshphong_frag},standard:{uniforms:In([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag},toon:{uniforms:In([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new ot(0)}}]),vertexShader:Ye.meshtoon_vert,fragmentShader:Ye.meshtoon_frag},matcap:{uniforms:In([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:Ye.meshmatcap_vert,fragmentShader:Ye.meshmatcap_frag},points:{uniforms:In([ge.points,ge.fog]),vertexShader:Ye.points_vert,fragmentShader:Ye.points_frag},dashed:{uniforms:In([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ye.linedashed_vert,fragmentShader:Ye.linedashed_frag},depth:{uniforms:In([ge.common,ge.displacementmap]),vertexShader:Ye.depth_vert,fragmentShader:Ye.depth_frag},normal:{uniforms:In([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:Ye.meshnormal_vert,fragmentShader:Ye.meshnormal_frag},sprite:{uniforms:In([ge.sprite,ge.fog]),vertexShader:Ye.sprite_vert,fragmentShader:Ye.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ye.background_vert,fragmentShader:Ye.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:Ye.backgroundCube_vert,fragmentShader:Ye.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ye.cube_vert,fragmentShader:Ye.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ye.equirect_vert,fragmentShader:Ye.equirect_frag},distanceRGBA:{uniforms:In([ge.common,ge.displacementmap,{referencePosition:{value:new $},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ye.distanceRGBA_vert,fragmentShader:Ye.distanceRGBA_frag},shadow:{uniforms:In([ge.lights,ge.fog,{color:{value:new ot(0)},opacity:{value:1}}]),vertexShader:Ye.shadow_vert,fragmentShader:Ye.shadow_frag}};Wi.physical={uniforms:In([Wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new Ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new Ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new ot(0)},specularColor:{value:new ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new Ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag};var nu={r:0,b:0,g:0},Is=new Ko,FD=new Kt;function UD(i,e,t,n,r,s,o){let a=new ot(0),c=s===!0?0:1,l,u,f=null,h=0,d=null;function g(b){let w=b.isScene===!0?b.background:null;return w&&w.isTexture&&(w=(b.backgroundBlurriness>0?t:e).get(w)),w}function _(b){let w=!1,v=g(b);v===null?p(a,c):v&&v.isColor&&(p(v,1),w=!0);let I=i.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,o):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||w)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,w){let v=g(w);v&&(v.isCubeTexture||v.mapping===Lu)?(u===void 0&&(u=new Oi(new oc(1,1,1),new mi({name:"BackgroundCubeMaterial",uniforms:Qo(Wi.backgroundCube.uniforms),vertexShader:Wi.backgroundCube.vertexShader,fragmentShader:Wi.backgroundCube.fragmentShader,side:Hn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(I,C,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Is.copy(w.backgroundRotation),Is.x*=-1,Is.y*=-1,Is.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Is.y*=-1,Is.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(FD.makeRotationFromEuler(Is)),u.material.toneMapped=ut.getTransfer(v.colorSpace)!==St,(f!==v||h!==v.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,f=v,h=v.version,d=i.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Oi(new Cu(2,2),new mi({name:"BackgroundMaterial",uniforms:Qo(Wi.background.uniforms),vertexShader:Wi.background.vertexShader,fragmentShader:Wi.background.fragmentShader,side:Kr,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=ut.getTransfer(v.colorSpace)!==St,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(f!==v||h!==v.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,f=v,h=v.version,d=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function p(b,w){b.getRGB(nu,Mx(i)),n.buffers.color.setClear(nu.r,nu.g,nu.b,w,o)}return{getClearColor:function(){return a},setClearColor:function(b,w=1){a.set(b),c=w,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,p(a,c)},render:_,addToRenderList:m}}function BD(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null),s=r,o=!1;function a(y,D,N,F,G){let X=!1,W=f(F,N,D);s!==W&&(s=W,l(s.object)),X=d(y,F,N,G),X&&g(y,F,N,G),G!==null&&e.update(G,i.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,v(y,D,N,F),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function c(){return i.createVertexArray()}function l(y){return i.bindVertexArray(y)}function u(y){return i.deleteVertexArray(y)}function f(y,D,N){let F=N.wireframe===!0,G=n[y.id];G===void 0&&(G={},n[y.id]=G);let X=G[D.id];X===void 0&&(X={},G[D.id]=X);let W=X[F];return W===void 0&&(W=h(c()),X[F]=W),W}function h(y){let D=[],N=[],F=[];for(let G=0;G<t;G++)D[G]=0,N[G]=0,F[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:N,attributeDivisors:F,object:y,attributes:{},index:null}}function d(y,D,N,F){let G=s.attributes,X=D.attributes,W=0,j=N.getAttributes();for(let H in j)if(j[H].location>=0){let R=G[H],ue=X[H];if(ue===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(ue=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(ue=y.instanceColor)),R===void 0||R.attribute!==ue||ue&&R.data!==ue.data)return!0;W++}return s.attributesNum!==W||s.index!==F}function g(y,D,N,F){let G={},X=D.attributes,W=0,j=N.getAttributes();for(let H in j)if(j[H].location>=0){let R=X[H];R===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(R=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(R=y.instanceColor));let ue={};ue.attribute=R,R&&R.data&&(ue.data=R.data),G[H]=ue,W++}s.attributes=G,s.attributesNum=W,s.index=F}function _(){let y=s.newAttributes;for(let D=0,N=y.length;D<N;D++)y[D]=0}function m(y){p(y,0)}function p(y,D){let N=s.newAttributes,F=s.enabledAttributes,G=s.attributeDivisors;N[y]=1,F[y]===0&&(i.enableVertexAttribArray(y),F[y]=1),G[y]!==D&&(i.vertexAttribDivisor(y,D),G[y]=D)}function b(){let y=s.newAttributes,D=s.enabledAttributes;for(let N=0,F=D.length;N<F;N++)D[N]!==y[N]&&(i.disableVertexAttribArray(N),D[N]=0)}function w(y,D,N,F,G,X,W){W===!0?i.vertexAttribIPointer(y,D,N,G,X):i.vertexAttribPointer(y,D,N,F,G,X)}function v(y,D,N,F){_();let G=F.attributes,X=N.getAttributes(),W=D.defaultAttributeValues;for(let j in X){let H=X[j];if(H.location>=0){let te=G[j];if(te===void 0&&(j==="instanceMatrix"&&y.instanceMatrix&&(te=y.instanceMatrix),j==="instanceColor"&&y.instanceColor&&(te=y.instanceColor)),te!==void 0){let R=te.normalized,ue=te.itemSize,Pe=e.get(te);if(Pe===void 0)continue;let Ze=Pe.buffer,Y=Pe.type,ee=Pe.bytesPerElement,_e=Y===i.INT||Y===i.UNSIGNED_INT||te.gpuType===_m;if(te.isInterleavedBufferAttribute){let ne=te.data,be=ne.stride,Ce=te.offset;if(ne.isInstancedInterleavedBuffer){for(let Ve=0;Ve<H.locationSize;Ve++)p(H.location+Ve,ne.meshPerAttribute);y.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Ve=0;Ve<H.locationSize;Ve++)m(H.location+Ve);i.bindBuffer(i.ARRAY_BUFFER,Ze);for(let Ve=0;Ve<H.locationSize;Ve++)w(H.location+Ve,ue/H.locationSize,Y,R,be*ee,(Ce+ue/H.locationSize*Ve)*ee,_e)}else{if(te.isInstancedBufferAttribute){for(let ne=0;ne<H.locationSize;ne++)p(H.location+ne,te.meshPerAttribute);y.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let ne=0;ne<H.locationSize;ne++)m(H.location+ne);i.bindBuffer(i.ARRAY_BUFFER,Ze);for(let ne=0;ne<H.locationSize;ne++)w(H.location+ne,ue/H.locationSize,Y,R,ue*ee,ue/H.locationSize*ne*ee,_e)}}else if(W!==void 0){let R=W[j];if(R!==void 0)switch(R.length){case 2:i.vertexAttrib2fv(H.location,R);break;case 3:i.vertexAttrib3fv(H.location,R);break;case 4:i.vertexAttrib4fv(H.location,R);break;default:i.vertexAttrib1fv(H.location,R)}}}}b()}function I(){A();for(let y in n){let D=n[y];for(let N in D){let F=D[N];for(let G in F)u(F[G].object),delete F[G];delete D[N]}delete n[y]}}function C(y){if(n[y.id]===void 0)return;let D=n[y.id];for(let N in D){let F=D[N];for(let G in F)u(F[G].object),delete F[G];delete D[N]}delete n[y.id]}function E(y){for(let D in n){let N=n[D];if(N[y.id]===void 0)continue;let F=N[y.id];for(let G in F)u(F[G].object),delete F[G];delete N[y.id]}}function A(){x(),o=!0,s!==r&&(s=r,l(s.object))}function x(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:A,resetDefaultState:x,dispose:I,releaseStatesOfGeometry:C,releaseStatesOfProgram:E,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function VD(i,e,t){let n;function r(l){n=l}function s(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function o(l,u,f){f!==0&&(i.drawArraysInstanced(n,l,u,f),t.update(u,n,f))}function a(l,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,f);let d=0;for(let g=0;g<f;g++)d+=u[g];t.update(d,n,1)}function c(l,u,f,h){if(f===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],u[g],h[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,u,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_]*h[_];t.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function zD(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let E=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(E){return!(E!==Li&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){let A=E===ac&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==xr&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==gr&&!A)}function c(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let f=t.logarithmicDepthBuffer===!0,h=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),I=g>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reverseDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:w,maxFragmentUniforms:v,vertexTextures:I,maxSamples:C}}function HD(i){let e=this,t=null,n=0,r=!1,s=!1,o=new pr,a=new Xe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){let d=f.length!==0||h||n!==0||r;return r=h,n=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){let g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=i.get(f);if(!r||g===null||g.length===0||s&&!m)s?u(null):l();else{let b=s?0:n,w=b*4,v=p.clippingState||null;c.value=v,v=u(g,h,w,d);for(let I=0;I!==w;++I)v[I]=t[I];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,h,d,g){let _=f!==null?f.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let p=d+_*4,b=h.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,v=d;w!==_;++w,v+=4)o.copy(f[w]).applyMatrix4(b,a),o.normal.toArray(m,v),m[v+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function GD(i){let e=new WeakMap;function t(o,a){return a===dp?o.mapping=qo:a===fp&&(o.mapping=Xo),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===dp||a===fp)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new qp(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",r),t(l.texture,o.mapping)}else return null}}return o}function r(o){let a=o.target;a.removeEventListener("dispose",r);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}var Xp=class extends wu{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,o=n+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Vo=4,L0=[.125,.215,.35,.446,.526,.582],Ns=20,Zh=new Xp,O0=new ot,Jh=null,Kh=0,Qh=0,ep=!1,Ds=(1+Math.sqrt(5))/2,Bo=1/Ds,k0=[new $(-Ds,Bo,0),new $(Ds,Bo,0),new $(-Bo,0,Ds),new $(Bo,0,Ds),new $(0,Ds,-Bo),new $(0,Ds,Bo),new $(-1,1,-1),new $(1,1,-1),new $(-1,1,1),new $(1,1,1)],Iu=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){Jh=this._renderer.getRenderTarget(),Kh=this._renderer.getActiveCubeFace(),Qh=this._renderer.getActiveMipmapLevel(),ep=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=B0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=U0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Jh,Kh,Qh),this._renderer.xr.enabled=ep,e.scissorTest=!1,iu(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===qo||e.mapping===Xo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Jh=this._renderer.getRenderTarget(),Kh=this._renderer.getActiveCubeFace(),Qh=this._renderer.getActiveMipmapLevel(),ep=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ji,minFilter:ji,generateMipmaps:!1,type:ac,format:Li,colorSpace:ta,depthBuffer:!1},r=F0(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=F0(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=WD(s)),this._blurMaterial=jD(s,e,t)}return r}_compileMaterial(e){let t=new Oi(this._lodPlanes[0],e);this._renderer.compile(t,Zh)}_sceneToCubeUV(e,t,n,r){let a=new An(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(O0),u.toneMapping=Jr,u.autoClear=!1;let d=new Mu({name:"PMREM.Background",side:Hn,depthWrite:!1,depthTest:!1}),g=new Oi(new oc,d),_=!1,m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,_=!0):(d.color.copy(O0),_=!0);for(let p=0;p<6;p++){let b=p%3;b===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):b===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let w=this._cubeSize;iu(r,b*w,p>2?w:0,w,w),u.setRenderTarget(r),_&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=f,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===qo||e.mapping===Xo;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=B0()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=U0());let s=r?this._cubemapMaterial:this._equirectMaterial,o=new Oi(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;let c=this._cubeSize;iu(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Zh)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let s=1;s<r;s++){let o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=k0[(r-s-1)%k0.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,r,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,f=new Oi(this._lodPlanes[r],l),h=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Ns-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):Ns;m>Ns&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ns}`);let p=[],b=0;for(let E=0;E<Ns;++E){let A=E/_,x=Math.exp(-A*A/2);p.push(x),E===0?b+=x:E<m&&(b+=2*x)}for(let E=0;E<p.length;E++)p[E]=p[E]/b;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);let{_lodMax:w}=this;h.dTheta.value=g,h.mipInt.value=w-n;let v=this._sizeLods[r],I=3*v*(r>w-Vo?r-w+Vo:0),C=4*(this._cubeSize-v);iu(t,I,C,3*v,2*v),c.setRenderTarget(t),c.render(f,Zh)}};function WD(i){let e=[],t=[],n=[],r=i,s=i-Vo+1+L0.length;for(let o=0;o<s;o++){let a=Math.pow(2,r);t.push(a);let c=1/a;o>i-Vo?c=L0[o-i+Vo-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),u=-l,f=1+l,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,_=3,m=2,p=1,b=new Float32Array(_*g*d),w=new Float32Array(m*g*d),v=new Float32Array(p*g*d);for(let C=0;C<d;C++){let E=C%3*2/3-1,A=C>2?0:-1,x=[E,A,0,E+2/3,A,0,E+2/3,A+1,0,E,A,0,E+2/3,A+1,0,E,A+1,0];b.set(x,_*g*C),w.set(h,m*g*C);let y=[C,C,C,C,C,C];v.set(y,p*g*C)}let I=new $i;I.setAttribute("position",new cn(b,_)),I.setAttribute("uv",new cn(w,m)),I.setAttribute("faceIndex",new cn(v,p)),e.push(I),r>Vo&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function F0(i,e,t){let n=new Mr(i,e,t);return n.texture.mapping=Lu,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function iu(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function jD(i,e,t){let n=new Float32Array(Ns),r=new $(0,1,0);return new mi({name:"SphericalGaussianBlur",defines:{n:Ns,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:bm(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Zr,depthTest:!1,depthWrite:!1})}function U0(){return new mi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bm(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Zr,depthTest:!1,depthWrite:!1})}function B0(){return new mi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bm(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zr,depthTest:!1,depthWrite:!1})}function bm(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function $D(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===dp||c===fp,u=c===qo||c===Xo;if(l||u){let f=e.get(a),h=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return t===null&&(t=new Iu(i)),f=l?t.fromEquirectangular(a,f):t.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),f.texture;if(f!==void 0)return f.texture;{let d=a.image;return l&&d&&d.height>0||u&&d&&r(d)?(t===null&&(t=new Iu(i)),f=l?t.fromEquirectangular(a):t.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function r(a){let c=0,l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function s(a){let c=a.target;c.removeEventListener("dispose",s);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function qD(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&nc("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function XD(i,e,t,n){let r={},s=new WeakMap;function o(f){let h=f.target;h.index!==null&&e.remove(h.index);for(let g in h.attributes)e.remove(h.attributes[g]);for(let g in h.morphAttributes){let _=h.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}h.removeEventListener("dispose",o),delete r[h.id];let d=s.get(h);d&&(e.remove(d),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,t.memory.geometries++),h}function c(f){let h=f.attributes;for(let g in h)e.update(h[g],i.ARRAY_BUFFER);let d=f.morphAttributes;for(let g in d){let _=d[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],i.ARRAY_BUFFER)}}function l(f){let h=[],d=f.index,g=f.attributes.position,_=0;if(d!==null){let b=d.array;_=d.version;for(let w=0,v=b.length;w<v;w+=3){let I=b[w+0],C=b[w+1],E=b[w+2];h.push(I,C,C,E,E,I)}}else if(g!==void 0){let b=g.array;_=g.version;for(let w=0,v=b.length/3-1;w<v;w+=3){let I=w+0,C=w+1,E=w+2;h.push(I,C,C,E,E,I)}}else return;let m=new(yx(h)?bu:Su)(h,1);m.version=_;let p=s.get(f);p&&e.remove(p),s.set(f,m)}function u(f){let h=s.get(f);if(h){let d=f.index;d!==null&&h.version<d.version&&l(f)}else l(f);return s.get(f)}return{get:a,update:c,getWireframeAttribute:u}}function YD(i,e,t){let n;function r(h){n=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function c(h,d){i.drawElements(n,d,s,h*o),t.update(d,n,1)}function l(h,d,g){g!==0&&(i.drawElementsInstanced(n,d,s,h*o,g),t.update(d,n,g))}function u(h,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,h,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];t.update(m,n,1)}function f(h,d,g,_){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)l(h[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,h,0,_,0,g);let p=0;for(let b=0;b<g;b++)p+=d[b]*_[b];t.update(p,n,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function ZD(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function JD(i,e,t){let n=new WeakMap,r=new qt;function s(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0,h=n.get(a);if(h===void 0||h.count!==f){let y=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var d=y;h!==void 0&&h.texture.dispose();let g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],v=0;g===!0&&(v=1),_===!0&&(v=2),m===!0&&(v=3);let I=a.attributes.position.count*v,C=1;I>e.maxTextureSize&&(C=Math.ceil(I/e.maxTextureSize),I=e.maxTextureSize);let E=new Float32Array(I*C*4*f),A=new vu(E,I,C,f);A.type=gr,A.needsUpdate=!0;let x=v*4;for(let D=0;D<f;D++){let N=p[D],F=b[D],G=w[D],X=I*C*4*D;for(let W=0;W<N.count;W++){let j=W*x;g===!0&&(r.fromBufferAttribute(N,W),E[X+j+0]=r.x,E[X+j+1]=r.y,E[X+j+2]=r.z,E[X+j+3]=0),_===!0&&(r.fromBufferAttribute(F,W),E[X+j+4]=r.x,E[X+j+5]=r.y,E[X+j+6]=r.z,E[X+j+7]=0),m===!0&&(r.fromBufferAttribute(G,W),E[X+j+8]=r.x,E[X+j+9]=r.y,E[X+j+10]=r.z,E[X+j+11]=G.itemSize===4?r.w:1)}}h={count:f,texture:A,size:new Ct(I,C)},n.set(a,h),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];let _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function KD(i,e,t,n){let r=new WeakMap;function s(c){let l=n.render.frame,u=c.geometry,f=e.get(c,u);if(r.get(f)!==l&&(e.update(f),r.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){let h=c.skeleton;r.get(h)!==l&&(h.update(),r.set(h,l))}return f}function o(){r=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}var Au=class extends zs{constructor(e,t,n,r,s,o,a,c,l,u=Go){if(u!==Go&&u!==Zo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Go&&(n=ks),n===void 0&&u===Zo&&(n=Yo),super(null,r,s,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:ki,this.minFilter=c!==void 0?c:ki,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},bx=new zs,V0=new Au(1,1),wx=new vu,Ex=new jp,Tx=new Eu,z0=[],H0=[],G0=new Float32Array(16),W0=new Float32Array(9),j0=new Float32Array(4);function na(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=z0[r];if(s===void 0&&(s=new Float32Array(r),z0[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function nn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function rn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ku(i,e){let t=H0[e];t===void 0&&(t=new Int32Array(e),H0[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function QD(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function eR(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;i.uniform2fv(this.addr,e),rn(t,e)}}function tR(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(nn(t,e))return;i.uniform3fv(this.addr,e),rn(t,e)}}function nR(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;i.uniform4fv(this.addr,e),rn(t,e)}}function iR(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(nn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),rn(t,e)}else{if(nn(t,n))return;j0.set(n),i.uniformMatrix2fv(this.addr,!1,j0),rn(t,n)}}function rR(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(nn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),rn(t,e)}else{if(nn(t,n))return;W0.set(n),i.uniformMatrix3fv(this.addr,!1,W0),rn(t,n)}}function sR(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(nn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),rn(t,e)}else{if(nn(t,n))return;G0.set(n),i.uniformMatrix4fv(this.addr,!1,G0),rn(t,n)}}function oR(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function aR(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;i.uniform2iv(this.addr,e),rn(t,e)}}function cR(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(nn(t,e))return;i.uniform3iv(this.addr,e),rn(t,e)}}function lR(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;i.uniform4iv(this.addr,e),rn(t,e)}}function uR(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function dR(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;i.uniform2uiv(this.addr,e),rn(t,e)}}function fR(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(nn(t,e))return;i.uniform3uiv(this.addr,e),rn(t,e)}}function hR(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;i.uniform4uiv(this.addr,e),rn(t,e)}}function pR(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(V0.compareFunction=vx,s=V0):s=bx,t.setTexture2D(e||s,r)}function mR(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Ex,r)}function gR(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Tx,r)}function _R(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||wx,r)}function vR(i){switch(i){case 5126:return QD;case 35664:return eR;case 35665:return tR;case 35666:return nR;case 35674:return iR;case 35675:return rR;case 35676:return sR;case 5124:case 35670:return oR;case 35667:case 35671:return aR;case 35668:case 35672:return cR;case 35669:case 35673:return lR;case 5125:return uR;case 36294:return dR;case 36295:return fR;case 36296:return hR;case 35678:case 36198:case 36298:case 36306:case 35682:return pR;case 35679:case 36299:case 36307:return mR;case 35680:case 36300:case 36308:case 36293:return gR;case 36289:case 36303:case 36311:case 36292:return _R}}function yR(i,e){i.uniform1fv(this.addr,e)}function xR(i,e){let t=na(e,this.size,2);i.uniform2fv(this.addr,t)}function MR(i,e){let t=na(e,this.size,3);i.uniform3fv(this.addr,t)}function SR(i,e){let t=na(e,this.size,4);i.uniform4fv(this.addr,t)}function bR(i,e){let t=na(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function wR(i,e){let t=na(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function ER(i,e){let t=na(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function TR(i,e){i.uniform1iv(this.addr,e)}function CR(i,e){i.uniform2iv(this.addr,e)}function IR(i,e){i.uniform3iv(this.addr,e)}function AR(i,e){i.uniform4iv(this.addr,e)}function DR(i,e){i.uniform1uiv(this.addr,e)}function RR(i,e){i.uniform2uiv(this.addr,e)}function PR(i,e){i.uniform3uiv(this.addr,e)}function NR(i,e){i.uniform4uiv(this.addr,e)}function LR(i,e,t){let n=this.cache,r=e.length,s=ku(t,r);nn(n,s)||(i.uniform1iv(this.addr,s),rn(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||bx,s[o])}function OR(i,e,t){let n=this.cache,r=e.length,s=ku(t,r);nn(n,s)||(i.uniform1iv(this.addr,s),rn(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Ex,s[o])}function kR(i,e,t){let n=this.cache,r=e.length,s=ku(t,r);nn(n,s)||(i.uniform1iv(this.addr,s),rn(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Tx,s[o])}function FR(i,e,t){let n=this.cache,r=e.length,s=ku(t,r);nn(n,s)||(i.uniform1iv(this.addr,s),rn(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||wx,s[o])}function UR(i){switch(i){case 5126:return yR;case 35664:return xR;case 35665:return MR;case 35666:return SR;case 35674:return bR;case 35675:return wR;case 35676:return ER;case 5124:case 35670:return TR;case 35667:case 35671:return CR;case 35668:case 35672:return IR;case 35669:case 35673:return AR;case 5125:return DR;case 36294:return RR;case 36295:return PR;case 36296:return NR;case 35678:case 36198:case 36298:case 36306:case 35682:return LR;case 35679:case 36299:case 36307:return OR;case 35680:case 36300:case 36308:case 36293:return kR;case 36289:case 36303:case 36311:case 36292:return FR}}var Yp=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=vR(t.type)}},Zp=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=UR(t.type)}},Jp=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],n)}}},tp=/(\w+)(\])?(\[|\.)?/g;function $0(i,e){i.seq.push(e),i.map[e.id]=e}function BR(i,e,t){let n=i.name,r=n.length;for(tp.lastIndex=0;;){let s=tp.exec(n),o=tp.lastIndex,a=s[1],c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){$0(t,l===void 0?new Yp(a,i,e):new Zp(a,i,e));break}else{let f=t.map[a];f===void 0&&(f=new Jp(a),$0(t,f)),t=f}}}var jo=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);BR(s,o,this)}}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&n.push(o)}return n}};function q0(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var VR=37297,zR=0;function HR(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var X0=new Xe;function GR(i){ut._getMatrix(X0,ut.workingColorSpace,i);let e=`mat3( ${X0.elements.map(t=>t.toFixed(4))} )`;switch(ut.getTransfer(i)){case Ou:return[e,"LinearTransferOETF"];case St:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Y0(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+HR(i.getShaderSource(e),o)}else return r}function WR(i,e){let t=GR(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function jR(i,e){let t;switch(e){case mI:t="Linear";break;case gI:t="Reinhard";break;case _I:t="Cineon";break;case vI:t="ACESFilmic";break;case xI:t="AgX";break;case MI:t="Neutral";break;case yI:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ru=new $;function $R(){ut.getLuminanceCoefficients(ru);let i=ru.x.toFixed(4),e=ru.y.toFixed(4),t=ru.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function qR(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ic).join(`
`)}function XR(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function YR(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),o=s.name,a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function ic(i){return i!==""}function Z0(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function J0(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var ZR=/^[ \t]*#include +<([\w\d./]+)>/gm;function Kp(i){return i.replace(ZR,KR)}var JR=new Map;function KR(i,e){let t=Ye[e];if(t===void 0){let n=JR.get(e);if(n!==void 0)t=Ye[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Kp(t)}var QR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function K0(i){return i.replace(QR,eP)}function eP(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Q0(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function tP(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ox?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===XC?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===hr&&(e="SHADOWMAP_TYPE_VSM"),e}function nP(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case qo:case Xo:e="ENVMAP_TYPE_CUBE";break;case Lu:e="ENVMAP_TYPE_CUBE_UV";break}return e}function iP(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Xo:e="ENVMAP_MODE_REFRACTION";break}return e}function rP(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ax:e="ENVMAP_BLENDING_MULTIPLY";break;case hI:e="ENVMAP_BLENDING_MIX";break;case pI:e="ENVMAP_BLENDING_ADD";break}return e}function sP(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function oP(i,e,t,n){let r=i.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,c=tP(t),l=nP(t),u=iP(t),f=rP(t),h=sP(t),d=qR(t),g=XR(s),_=r.createProgram(),m,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ic).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ic).join(`
`),p.length>0&&(p+=`
`)):(m=[Q0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ic).join(`
`),p=[Q0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Jr?"#define TONE_MAPPING":"",t.toneMapping!==Jr?Ye.tonemapping_pars_fragment:"",t.toneMapping!==Jr?jR("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ye.colorspace_pars_fragment,WR("linearToOutputTexel",t.outputColorSpace),$R(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ic).join(`
`)),o=Kp(o),o=Z0(o,t),o=J0(o,t),a=Kp(a),a=Z0(a,t),a=J0(a,t),o=K0(o),a=K0(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===h0?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===h0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let w=b+m+o,v=b+p+a,I=q0(r,r.VERTEX_SHADER,w),C=q0(r,r.FRAGMENT_SHADER,v);r.attachShader(_,I),r.attachShader(_,C),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function E(D){if(i.debug.checkShaderErrors){let N=r.getProgramInfoLog(_).trim(),F=r.getShaderInfoLog(I).trim(),G=r.getShaderInfoLog(C).trim(),X=!0,W=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,I,C);else{let j=Y0(r,I,"vertex"),H=Y0(r,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+N+`
`+j+`
`+H)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(F===""||G==="")&&(W=!1);W&&(D.diagnostics={runnable:X,programLog:N,vertexShader:{log:F,prefix:m},fragmentShader:{log:G,prefix:p}})}r.deleteShader(I),r.deleteShader(C),A=new jo(r,_),x=YR(r,_)}let A;this.getUniforms=function(){return A===void 0&&E(this),A};let x;this.getAttributes=function(){return x===void 0&&E(this),x};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(_,VR)),y},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=zR++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=I,this.fragmentShader=C,this}var aP=0,Qp=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new em(e),t.set(e,n)),n}},em=class{constructor(e){this.id=aP++,this.code=e,this.usedTimes=0}};function cP(i,e,t,n,r,s,o){let a=new xu,c=new Qp,l=new Set,u=[],f=r.logarithmicDepthBuffer,h=r.vertexTextures,d=r.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return l.add(x),x===0?"uv":`uv${x}`}function m(x,y,D,N,F){let G=N.fog,X=F.geometry,W=x.isMeshStandardMaterial?N.environment:null,j=(x.isMeshStandardMaterial?t:e).get(x.envMap||W),H=j&&j.mapping===Lu?j.image.height:null,te=g[x.type];x.precision!==null&&(d=r.getMaxPrecision(x.precision),d!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));let R=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ue=R!==void 0?R.length:0,Pe=0;X.morphAttributes.position!==void 0&&(Pe=1),X.morphAttributes.normal!==void 0&&(Pe=2),X.morphAttributes.color!==void 0&&(Pe=3);let Ze,Y,ee,_e;if(te){let ve=Wi[te];Ze=ve.vertexShader,Y=ve.fragmentShader}else Ze=x.vertexShader,Y=x.fragmentShader,c.update(x),ee=c.getVertexShaderID(x),_e=c.getFragmentShaderID(x);let ne=i.getRenderTarget(),be=i.state.buffers.depth.getReversed(),Ce=F.isInstancedMesh===!0,Ve=F.isBatchedMesh===!0,Je=!!x.map,Le=!!x.matcap,De=!!j,L=!!x.aoMap,bt=!!x.lightMap,ke=!!x.bumpMap,U=!!x.normalMap,we=!!x.displacementMap,st=!!x.emissiveMap,Ie=!!x.metalnessMap,T=!!x.roughnessMap,M=x.anisotropy>0,V=x.clearcoat>0,Q=x.dispersion>0,K=x.iridescence>0,Z=x.sheen>0,de=x.transmission>0,ae=M&&!!x.anisotropyMap,pe=V&&!!x.clearcoatMap,Ge=V&&!!x.clearcoatNormalMap,ie=V&&!!x.clearcoatRoughnessMap,oe=K&&!!x.iridescenceMap,Ne=K&&!!x.iridescenceThicknessMap,Re=Z&&!!x.sheenColorMap,ye=Z&&!!x.sheenRoughnessMap,je=!!x.specularMap,Oe=!!x.specularColorMap,ct=!!x.specularIntensityMap,P=de&&!!x.transmissionMap,le=de&&!!x.thicknessMap,q=!!x.gradientMap,J=!!x.alphaMap,ce=x.alphaTest>0,fe=!!x.alphaHash,Fe=!!x.extensions,dt=Jr;x.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(dt=i.toneMapping);let zt={shaderID:te,shaderType:x.type,shaderName:x.name,vertexShader:Ze,fragmentShader:Y,defines:x.defines,customVertexShaderID:ee,customFragmentShaderID:_e,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:Ve,batchingColor:Ve&&F._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&F.instanceColor!==null,instancingMorph:Ce&&F.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:ne===null?i.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:ta,alphaToCoverage:!!x.alphaToCoverage,map:Je,matcap:Le,envMap:De,envMapMode:De&&j.mapping,envMapCubeUVHeight:H,aoMap:L,lightMap:bt,bumpMap:ke,normalMap:U,displacementMap:h&&we,emissiveMap:st,normalMapObjectSpace:U&&x.normalMapType===TI,normalMapTangentSpace:U&&x.normalMapType===EI,metalnessMap:Ie,roughnessMap:T,anisotropy:M,anisotropyMap:ae,clearcoat:V,clearcoatMap:pe,clearcoatNormalMap:Ge,clearcoatRoughnessMap:ie,dispersion:Q,iridescence:K,iridescenceMap:oe,iridescenceThicknessMap:Ne,sheen:Z,sheenColorMap:Re,sheenRoughnessMap:ye,specularMap:je,specularColorMap:Oe,specularIntensityMap:ct,transmission:de,transmissionMap:P,thicknessMap:le,gradientMap:q,opaque:x.transparent===!1&&x.blending===Ho&&x.alphaToCoverage===!1,alphaMap:J,alphaTest:ce,alphaHash:fe,combine:x.combine,mapUv:Je&&_(x.map.channel),aoMapUv:L&&_(x.aoMap.channel),lightMapUv:bt&&_(x.lightMap.channel),bumpMapUv:ke&&_(x.bumpMap.channel),normalMapUv:U&&_(x.normalMap.channel),displacementMapUv:we&&_(x.displacementMap.channel),emissiveMapUv:st&&_(x.emissiveMap.channel),metalnessMapUv:Ie&&_(x.metalnessMap.channel),roughnessMapUv:T&&_(x.roughnessMap.channel),anisotropyMapUv:ae&&_(x.anisotropyMap.channel),clearcoatMapUv:pe&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:Ge&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ie&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:oe&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:Ne&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:ye&&_(x.sheenRoughnessMap.channel),specularMapUv:je&&_(x.specularMap.channel),specularColorMapUv:Oe&&_(x.specularColorMap.channel),specularIntensityMapUv:ct&&_(x.specularIntensityMap.channel),transmissionMapUv:P&&_(x.transmissionMap.channel),thicknessMapUv:le&&_(x.thicknessMap.channel),alphaMapUv:J&&_(x.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(U||M),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!X.attributes.uv&&(Je||J),fog:!!G,useFog:x.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:be,skinning:F.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:ue,morphTextureStride:Pe,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:dt,decodeVideoTexture:Je&&x.map.isVideoTexture===!0&&ut.getTransfer(x.map.colorSpace)===St,decodeVideoTextureEmissive:st&&x.emissiveMap.isVideoTexture===!0&&ut.getTransfer(x.emissiveMap.colorSpace)===St,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===mr,flipSided:x.side===Hn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Fe&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Fe&&x.extensions.multiDraw===!0||Ve)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return zt.vertexUv1s=l.has(1),zt.vertexUv2s=l.has(2),zt.vertexUv3s=l.has(3),l.clear(),zt}function p(x){let y=[];if(x.shaderID?y.push(x.shaderID):(y.push(x.customVertexShaderID),y.push(x.customFragmentShaderID)),x.defines!==void 0)for(let D in x.defines)y.push(D),y.push(x.defines[D]);return x.isRawShaderMaterial===!1&&(b(y,x),w(y,x),y.push(i.outputColorSpace)),y.push(x.customProgramCacheKey),y.join()}function b(x,y){x.push(y.precision),x.push(y.outputColorSpace),x.push(y.envMapMode),x.push(y.envMapCubeUVHeight),x.push(y.mapUv),x.push(y.alphaMapUv),x.push(y.lightMapUv),x.push(y.aoMapUv),x.push(y.bumpMapUv),x.push(y.normalMapUv),x.push(y.displacementMapUv),x.push(y.emissiveMapUv),x.push(y.metalnessMapUv),x.push(y.roughnessMapUv),x.push(y.anisotropyMapUv),x.push(y.clearcoatMapUv),x.push(y.clearcoatNormalMapUv),x.push(y.clearcoatRoughnessMapUv),x.push(y.iridescenceMapUv),x.push(y.iridescenceThicknessMapUv),x.push(y.sheenColorMapUv),x.push(y.sheenRoughnessMapUv),x.push(y.specularMapUv),x.push(y.specularColorMapUv),x.push(y.specularIntensityMapUv),x.push(y.transmissionMapUv),x.push(y.thicknessMapUv),x.push(y.combine),x.push(y.fogExp2),x.push(y.sizeAttenuation),x.push(y.morphTargetsCount),x.push(y.morphAttributeCount),x.push(y.numDirLights),x.push(y.numPointLights),x.push(y.numSpotLights),x.push(y.numSpotLightMaps),x.push(y.numHemiLights),x.push(y.numRectAreaLights),x.push(y.numDirLightShadows),x.push(y.numPointLightShadows),x.push(y.numSpotLightShadows),x.push(y.numSpotLightShadowsWithMaps),x.push(y.numLightProbes),x.push(y.shadowMapType),x.push(y.toneMapping),x.push(y.numClippingPlanes),x.push(y.numClipIntersection),x.push(y.depthPacking)}function w(x,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),x.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),x.push(a.mask)}function v(x){let y=g[x.type],D;if(y){let N=Wi[y];D=KI.clone(N.uniforms)}else D=x.uniforms;return D}function I(x,y){let D;for(let N=0,F=u.length;N<F;N++){let G=u[N];if(G.cacheKey===y){D=G,++D.usedTimes;break}}return D===void 0&&(D=new oP(i,y,x,s),u.push(D)),D}function C(x){if(--x.usedTimes===0){let y=u.indexOf(x);u[y]=u[u.length-1],u.pop(),x.destroy()}}function E(x){c.remove(x)}function A(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:I,releaseProgram:C,releaseShaderCache:E,programs:u,dispose:A}}function lP(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,c){i.get(o)[a]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function uP(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function ex(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function tx(){let i=[],e=0,t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(f,h,d,g,_,m){let p=i[e];return p===void 0?(p={id:f.id,object:f,geometry:h,material:d,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},i[e]=p):(p.id=f.id,p.object=f,p.geometry=h,p.material=d,p.groupOrder=g,p.renderOrder=f.renderOrder,p.z=_,p.group=m),e++,p}function a(f,h,d,g,_,m){let p=o(f,h,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?r.push(p):t.push(p)}function c(f,h,d,g,_,m){let p=o(f,h,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?r.unshift(p):t.unshift(p)}function l(f,h){t.length>1&&t.sort(f||uP),n.length>1&&n.sort(h||ex),r.length>1&&r.sort(h||ex)}function u(){for(let f=e,h=i.length;f<h;f++){let d=i[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:c,finish:u,sort:l}}function dP(){let i=new WeakMap;function e(n,r){let s=i.get(n),o;return s===void 0?(o=new tx,i.set(n,[o])):r>=s.length?(o=new tx,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function fP(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new $,color:new ot};break;case"SpotLight":t={position:new $,direction:new $,color:new ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new $,color:new ot,distance:0,decay:0};break;case"HemisphereLight":t={direction:new $,skyColor:new ot,groundColor:new ot};break;case"RectAreaLight":t={color:new ot,position:new $,halfWidth:new $,halfHeight:new $};break}return i[e.id]=t,t}}}function hP(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var pP=0;function mP(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function gP(i){let e=new fP,t=hP(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new $);let r=new $,s=new Kt,o=new Kt;function a(l){let u=0,f=0,h=0;for(let x=0;x<9;x++)n.probe[x].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,b=0,w=0,v=0,I=0,C=0,E=0;l.sort(mP);for(let x=0,y=l.length;x<y;x++){let D=l[x],N=D.color,F=D.intensity,G=D.distance,X=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)u+=N.r*F,f+=N.g*F,h+=N.b*F;else if(D.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(D.sh.coefficients[W],F);E++}else if(D.isDirectionalLight){let W=e.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let j=D.shadow,H=t.get(D);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,n.directionalShadow[d]=H,n.directionalShadowMap[d]=X,n.directionalShadowMatrix[d]=D.shadow.matrix,b++}n.directional[d]=W,d++}else if(D.isSpotLight){let W=e.get(D);W.position.setFromMatrixPosition(D.matrixWorld),W.color.copy(N).multiplyScalar(F),W.distance=G,W.coneCos=Math.cos(D.angle),W.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),W.decay=D.decay,n.spot[_]=W;let j=D.shadow;if(D.map&&(n.spotLightMap[I]=D.map,I++,j.updateMatrices(D),D.castShadow&&C++),n.spotLightMatrix[_]=j.matrix,D.castShadow){let H=t.get(D);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,n.spotShadow[_]=H,n.spotShadowMap[_]=X,v++}_++}else if(D.isRectAreaLight){let W=e.get(D);W.color.copy(N).multiplyScalar(F),W.halfWidth.set(D.width*.5,0,0),W.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=W,m++}else if(D.isPointLight){let W=e.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity),W.distance=D.distance,W.decay=D.decay,D.castShadow){let j=D.shadow,H=t.get(D);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,H.shadowCameraNear=j.camera.near,H.shadowCameraFar=j.camera.far,n.pointShadow[g]=H,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=D.shadow.matrix,w++}n.point[g]=W,g++}else if(D.isHemisphereLight){let W=e.get(D);W.skyColor.copy(D.color).multiplyScalar(F),W.groundColor.copy(D.groundColor).multiplyScalar(F),n.hemi[p]=W,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ge.LTC_FLOAT_1,n.rectAreaLTC2=ge.LTC_FLOAT_2):(n.rectAreaLTC1=ge.LTC_HALF_1,n.rectAreaLTC2=ge.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;let A=n.hash;(A.directionalLength!==d||A.pointLength!==g||A.spotLength!==_||A.rectAreaLength!==m||A.hemiLength!==p||A.numDirectionalShadows!==b||A.numPointShadows!==w||A.numSpotShadows!==v||A.numSpotMaps!==I||A.numLightProbes!==E)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=v+I-C,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=E,A.directionalLength=d,A.pointLength=g,A.spotLength=_,A.rectAreaLength=m,A.hemiLength=p,A.numDirectionalShadows=b,A.numPointShadows=w,A.numSpotShadows=v,A.numSpotMaps=I,A.numLightProbes=E,n.version=pP++)}function c(l,u){let f=0,h=0,d=0,g=0,_=0,m=u.matrixWorldInverse;for(let p=0,b=l.length;p<b;p++){let w=l[p];if(w.isDirectionalLight){let v=n.directional[f];v.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),f++}else if(w.isSpotLight){let v=n.spot[d];v.position.setFromMatrixPosition(w.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),d++}else if(w.isRectAreaLight){let v=n.rectArea[g];v.position.setFromMatrixPosition(w.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(w.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(w.width*.5,0,0),v.halfHeight.set(0,w.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(w.isPointLight){let v=n.point[h];v.position.setFromMatrixPosition(w.matrixWorld),v.position.applyMatrix4(m),h++}else if(w.isHemisphereLight){let v=n.hemi[_];v.direction.setFromMatrixPosition(w.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function nx(i){let e=new gP(i),t=[],n=[];function r(u){l.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}let l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function _P(i){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new nx(i),e.set(r,[a])):s>=o.length?(a=new nx(i),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var tm=class extends Us{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=bI,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},nm=class extends Us{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},vP=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,yP=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function xP(i,e,t){let n=new Tu,r=new Ct,s=new Ct,o=new qt,a=new tm({depthPacking:wI}),c=new nm,l={},u=t.maxTextureSize,f={[Kr]:Hn,[Hn]:Kr,[mr]:mr},h=new mi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ct},radius:{value:4}},vertexShader:vP,fragmentShader:yP}),d=h.clone();d.defines.HORIZONTAL_PASS=1;let g=new $i;g.setAttribute("position",new cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Oi(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ox;let p=this.type;this.render=function(C,E,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;let x=i.getRenderTarget(),y=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),N=i.state;N.setBlending(Zr),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let F=p!==hr&&this.type===hr,G=p===hr&&this.type!==hr;for(let X=0,W=C.length;X<W;X++){let j=C[X],H=j.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);let te=H.getFrameExtents();if(r.multiply(te),s.copy(H.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/te.x),r.x=s.x*te.x,H.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/te.y),r.y=s.y*te.y,H.mapSize.y=s.y)),H.map===null||F===!0||G===!0){let ue=this.type!==hr?{minFilter:ki,magFilter:ki}:{};H.map!==null&&H.map.dispose(),H.map=new Mr(r.x,r.y,ue),H.map.texture.name=j.name+".shadowMap",H.camera.updateProjectionMatrix()}i.setRenderTarget(H.map),i.clear();let R=H.getViewportCount();for(let ue=0;ue<R;ue++){let Pe=H.getViewport(ue);o.set(s.x*Pe.x,s.y*Pe.y,s.x*Pe.z,s.y*Pe.w),N.viewport(o),H.updateMatrices(j,ue),n=H.getFrustum(),v(E,A,H.camera,j,this.type)}H.isPointLightShadow!==!0&&this.type===hr&&b(H,A),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(x,y,D)};function b(C,E){let A=e.update(_);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,d.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Mr(r.x,r.y)),h.uniforms.shadow_pass.value=C.map.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(E,null,A,h,_,null),d.uniforms.shadow_pass.value=C.mapPass.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(E,null,A,d,_,null)}function w(C,E,A,x){let y=null,D=A.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(D!==void 0)y=D;else if(y=A.isPointLight===!0?c:a,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){let N=y.uuid,F=E.uuid,G=l[N];G===void 0&&(G={},l[N]=G);let X=G[F];X===void 0&&(X=y.clone(),G[F]=X,E.addEventListener("dispose",I)),y=X}if(y.visible=E.visible,y.wireframe=E.wireframe,x===hr?y.side=E.shadowSide!==null?E.shadowSide:E.side:y.side=E.shadowSide!==null?E.shadowSide:f[E.side],y.alphaMap=E.alphaMap,y.alphaTest=E.alphaTest,y.map=E.map,y.clipShadows=E.clipShadows,y.clippingPlanes=E.clippingPlanes,y.clipIntersection=E.clipIntersection,y.displacementMap=E.displacementMap,y.displacementScale=E.displacementScale,y.displacementBias=E.displacementBias,y.wireframeLinewidth=E.wireframeLinewidth,y.linewidth=E.linewidth,A.isPointLight===!0&&y.isMeshDistanceMaterial===!0){let N=i.properties.get(y);N.light=A}return y}function v(C,E,A,x,y){if(C.visible===!1)return;if(C.layers.test(E.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&y===hr)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,C.matrixWorld);let F=e.update(C),G=C.material;if(Array.isArray(G)){let X=F.groups;for(let W=0,j=X.length;W<j;W++){let H=X[W],te=G[H.materialIndex];if(te&&te.visible){let R=w(C,te,x,y);C.onBeforeShadow(i,C,E,A,F,R,H),i.renderBufferDirect(A,null,F,R,C,H),C.onAfterShadow(i,C,E,A,F,R,H)}}}else if(G.visible){let X=w(C,G,x,y);C.onBeforeShadow(i,C,E,A,F,X,null),i.renderBufferDirect(A,null,F,X,C,null),C.onAfterShadow(i,C,E,A,F,X,null)}}let N=C.children;for(let F=0,G=N.length;F<G;F++)v(N[F],E,A,x,y)}function I(C){C.target.removeEventListener("dispose",I);for(let A in l){let x=l[A],y=C.target.uuid;y in x&&(x[y].dispose(),delete x[y])}}}var MP={[rp]:sp,[op]:lp,[ap]:up,[$o]:cp,[sp]:rp,[lp]:op,[up]:ap,[cp]:$o};function SP(i,e){function t(){let P=!1,le=new qt,q=null,J=new qt(0,0,0,0);return{setMask:function(ce){q!==ce&&!P&&(i.colorMask(ce,ce,ce,ce),q=ce)},setLocked:function(ce){P=ce},setClear:function(ce,fe,Fe,dt,zt){zt===!0&&(ce*=dt,fe*=dt,Fe*=dt),le.set(ce,fe,Fe,dt),J.equals(le)===!1&&(i.clearColor(ce,fe,Fe,dt),J.copy(le))},reset:function(){P=!1,q=null,J.set(-1,0,0,0)}}}function n(){let P=!1,le=!1,q=null,J=null,ce=null;return{setReversed:function(fe){if(le!==fe){let Fe=e.get("EXT_clip_control");le?Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.ZERO_TO_ONE_EXT):Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.NEGATIVE_ONE_TO_ONE_EXT);let dt=ce;ce=null,this.setClear(dt)}le=fe},getReversed:function(){return le},setTest:function(fe){fe?ne(i.DEPTH_TEST):be(i.DEPTH_TEST)},setMask:function(fe){q!==fe&&!P&&(i.depthMask(fe),q=fe)},setFunc:function(fe){if(le&&(fe=MP[fe]),J!==fe){switch(fe){case rp:i.depthFunc(i.NEVER);break;case sp:i.depthFunc(i.ALWAYS);break;case op:i.depthFunc(i.LESS);break;case $o:i.depthFunc(i.LEQUAL);break;case ap:i.depthFunc(i.EQUAL);break;case cp:i.depthFunc(i.GEQUAL);break;case lp:i.depthFunc(i.GREATER);break;case up:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}J=fe}},setLocked:function(fe){P=fe},setClear:function(fe){ce!==fe&&(le&&(fe=1-fe),i.clearDepth(fe),ce=fe)},reset:function(){P=!1,q=null,J=null,ce=null,le=!1}}}function r(){let P=!1,le=null,q=null,J=null,ce=null,fe=null,Fe=null,dt=null,zt=null;return{setTest:function(ve){P||(ve?ne(i.STENCIL_TEST):be(i.STENCIL_TEST))},setMask:function(ve){le!==ve&&!P&&(i.stencilMask(ve),le=ve)},setFunc:function(ve,Ee,$e){(q!==ve||J!==Ee||ce!==$e)&&(i.stencilFunc(ve,Ee,$e),q=ve,J=Ee,ce=$e)},setOp:function(ve,Ee,$e){(fe!==ve||Fe!==Ee||dt!==$e)&&(i.stencilOp(ve,Ee,$e),fe=ve,Fe=Ee,dt=$e)},setLocked:function(ve){P=ve},setClear:function(ve){zt!==ve&&(i.clearStencil(ve),zt=ve)},reset:function(){P=!1,le=null,q=null,J=null,ce=null,fe=null,Fe=null,dt=null,zt=null}}}let s=new t,o=new n,a=new r,c=new WeakMap,l=new WeakMap,u={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,b=null,w=null,v=null,I=null,C=null,E=new ot(0,0,0),A=0,x=!1,y=null,D=null,N=null,F=null,G=null,X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,j=0,H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(H)[1]),W=j>=1):H.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),W=j>=2);let te=null,R={},ue=i.getParameter(i.SCISSOR_BOX),Pe=i.getParameter(i.VIEWPORT),Ze=new qt().fromArray(ue),Y=new qt().fromArray(Pe);function ee(P,le,q,J){let ce=new Uint8Array(4),fe=i.createTexture();i.bindTexture(P,fe),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Fe=0;Fe<q;Fe++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(le,0,i.RGBA,1,1,J,0,i.RGBA,i.UNSIGNED_BYTE,ce):i.texImage2D(le+Fe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ce);return fe}let _e={};_e[i.TEXTURE_2D]=ee(i.TEXTURE_2D,i.TEXTURE_2D,1),_e[i.TEXTURE_CUBE_MAP]=ee(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),_e[i.TEXTURE_2D_ARRAY]=ee(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),_e[i.TEXTURE_3D]=ee(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ne(i.DEPTH_TEST),o.setFunc($o),ke(!1),U(r0),ne(i.CULL_FACE),L(Zr);function ne(P){u[P]!==!0&&(i.enable(P),u[P]=!0)}function be(P){u[P]!==!1&&(i.disable(P),u[P]=!1)}function Ce(P,le){return f[P]!==le?(i.bindFramebuffer(P,le),f[P]=le,P===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=le),P===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=le),!0):!1}function Ve(P,le){let q=d,J=!1;if(P){q=h.get(le),q===void 0&&(q=[],h.set(le,q));let ce=P.textures;if(q.length!==ce.length||q[0]!==i.COLOR_ATTACHMENT0){for(let fe=0,Fe=ce.length;fe<Fe;fe++)q[fe]=i.COLOR_ATTACHMENT0+fe;q.length=ce.length,J=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,J=!0);J&&i.drawBuffers(q)}function Je(P){return g!==P?(i.useProgram(P),g=P,!0):!1}let Le={[Rs]:i.FUNC_ADD,[ZC]:i.FUNC_SUBTRACT,[JC]:i.FUNC_REVERSE_SUBTRACT};Le[KC]=i.MIN,Le[QC]=i.MAX;let De={[eI]:i.ZERO,[tI]:i.ONE,[nI]:i.SRC_COLOR,[np]:i.SRC_ALPHA,[cI]:i.SRC_ALPHA_SATURATE,[oI]:i.DST_COLOR,[rI]:i.DST_ALPHA,[iI]:i.ONE_MINUS_SRC_COLOR,[ip]:i.ONE_MINUS_SRC_ALPHA,[aI]:i.ONE_MINUS_DST_COLOR,[sI]:i.ONE_MINUS_DST_ALPHA,[lI]:i.CONSTANT_COLOR,[uI]:i.ONE_MINUS_CONSTANT_COLOR,[dI]:i.CONSTANT_ALPHA,[fI]:i.ONE_MINUS_CONSTANT_ALPHA};function L(P,le,q,J,ce,fe,Fe,dt,zt,ve){if(P===Zr){_===!0&&(be(i.BLEND),_=!1);return}if(_===!1&&(ne(i.BLEND),_=!0),P!==YC){if(P!==m||ve!==x){if((p!==Rs||v!==Rs)&&(i.blendEquation(i.FUNC_ADD),p=Rs,v=Rs),ve)switch(P){case Ho:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case hu:i.blendFunc(i.ONE,i.ONE);break;case s0:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case o0:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case Ho:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case hu:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case s0:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case o0:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}b=null,w=null,I=null,C=null,E.set(0,0,0),A=0,m=P,x=ve}return}ce=ce||le,fe=fe||q,Fe=Fe||J,(le!==p||ce!==v)&&(i.blendEquationSeparate(Le[le],Le[ce]),p=le,v=ce),(q!==b||J!==w||fe!==I||Fe!==C)&&(i.blendFuncSeparate(De[q],De[J],De[fe],De[Fe]),b=q,w=J,I=fe,C=Fe),(dt.equals(E)===!1||zt!==A)&&(i.blendColor(dt.r,dt.g,dt.b,zt),E.copy(dt),A=zt),m=P,x=!1}function bt(P,le){P.side===mr?be(i.CULL_FACE):ne(i.CULL_FACE);let q=P.side===Hn;le&&(q=!q),ke(q),P.blending===Ho&&P.transparent===!1?L(Zr):L(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),o.setFunc(P.depthFunc),o.setTest(P.depthTest),o.setMask(P.depthWrite),s.setMask(P.colorWrite);let J=P.stencilWrite;a.setTest(J),J&&(a.setMask(P.stencilWriteMask),a.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),a.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),st(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?ne(i.SAMPLE_ALPHA_TO_COVERAGE):be(i.SAMPLE_ALPHA_TO_COVERAGE)}function ke(P){y!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),y=P)}function U(P){P!==$C?(ne(i.CULL_FACE),P!==D&&(P===r0?i.cullFace(i.BACK):P===qC?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):be(i.CULL_FACE),D=P}function we(P){P!==N&&(W&&i.lineWidth(P),N=P)}function st(P,le,q){P?(ne(i.POLYGON_OFFSET_FILL),(F!==le||G!==q)&&(i.polygonOffset(le,q),F=le,G=q)):be(i.POLYGON_OFFSET_FILL)}function Ie(P){P?ne(i.SCISSOR_TEST):be(i.SCISSOR_TEST)}function T(P){P===void 0&&(P=i.TEXTURE0+X-1),te!==P&&(i.activeTexture(P),te=P)}function M(P,le,q){q===void 0&&(te===null?q=i.TEXTURE0+X-1:q=te);let J=R[q];J===void 0&&(J={type:void 0,texture:void 0},R[q]=J),(J.type!==P||J.texture!==le)&&(te!==q&&(i.activeTexture(q),te=q),i.bindTexture(P,le||_e[P]),J.type=P,J.texture=le)}function V(){let P=R[te];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function Q(){try{i.compressedTexImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function K(){try{i.compressedTexImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Z(){try{i.texSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function de(){try{i.texSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ae(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function pe(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ge(){try{i.texStorage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ie(){try{i.texStorage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function oe(){try{i.texImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ne(){try{i.texImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Re(P){Ze.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),Ze.copy(P))}function ye(P){Y.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),Y.copy(P))}function je(P,le){let q=l.get(le);q===void 0&&(q=new WeakMap,l.set(le,q));let J=q.get(P);J===void 0&&(J=i.getUniformBlockIndex(le,P.name),q.set(P,J))}function Oe(P,le){let J=l.get(le).get(P);c.get(le)!==J&&(i.uniformBlockBinding(le,J,P.__bindingPointIndex),c.set(le,J))}function ct(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},te=null,R={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,b=null,w=null,v=null,I=null,C=null,E=new ot(0,0,0),A=0,x=!1,y=null,D=null,N=null,F=null,G=null,Ze.set(0,0,i.canvas.width,i.canvas.height),Y.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ne,disable:be,bindFramebuffer:Ce,drawBuffers:Ve,useProgram:Je,setBlending:L,setMaterial:bt,setFlipSided:ke,setCullFace:U,setLineWidth:we,setPolygonOffset:st,setScissorTest:Ie,activeTexture:T,bindTexture:M,unbindTexture:V,compressedTexImage2D:Q,compressedTexImage3D:K,texImage2D:oe,texImage3D:Ne,updateUBOMapping:je,uniformBlockBinding:Oe,texStorage2D:Ge,texStorage3D:ie,texSubImage2D:Z,texSubImage3D:de,compressedTexSubImage2D:ae,compressedTexSubImage3D:pe,scissor:Re,viewport:ye,reset:ct}}function ix(i,e,t,n){let r=bP(n);switch(t){case dx:return i*e;case hx:return i*e;case px:return i*e*2;case mx:return i*e/r.components*r.byteLength;case xm:return i*e/r.components*r.byteLength;case gx:return i*e*2/r.components*r.byteLength;case Mm:return i*e*2/r.components*r.byteLength;case fx:return i*e*3/r.components*r.byteLength;case Li:return i*e*4/r.components*r.byteLength;case Sm:return i*e*4/r.components*r.byteLength;case cu:case lu:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case uu:case du:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case gp:case vp:return Math.max(i,16)*Math.max(e,8)/4;case mp:case _p:return Math.max(i,8)*Math.max(e,8)/2;case yp:case xp:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Mp:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Sp:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case bp:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case wp:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ep:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Tp:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Cp:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ip:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ap:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Dp:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Rp:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Pp:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Np:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Lp:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Op:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case fu:case kp:case Fp:return Math.ceil(i/4)*Math.ceil(e/4)*16;case _x:case Up:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Bp:case Vp:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function bP(i){switch(i){case xr:case cx:return{byteLength:1,components:1};case sc:case lx:case ac:return{byteLength:2,components:1};case vm:case ym:return{byteLength:2,components:4};case ks:case _m:case gr:return{byteLength:4,components:1};case ux:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function wP(i,e,t,n,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ct,u=new WeakMap,f,h=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,M){return d?new OffscreenCanvas(T,M):gu("canvas")}function _(T,M,V){let Q=1,K=Ie(T);if((K.width>V||K.height>V)&&(Q=V/Math.max(K.width,K.height)),Q<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let Z=Math.floor(Q*K.width),de=Math.floor(Q*K.height);f===void 0&&(f=g(Z,de));let ae=M?g(Z,de):f;return ae.width=Z,ae.height=de,ae.getContext("2d").drawImage(T,0,0,Z,de),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+Z+"x"+de+")."),ae}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){i.generateMipmap(T)}function b(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function w(T,M,V,Q,K=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let Z=M;if(M===i.RED&&(V===i.FLOAT&&(Z=i.R32F),V===i.HALF_FLOAT&&(Z=i.R16F),V===i.UNSIGNED_BYTE&&(Z=i.R8)),M===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.R8UI),V===i.UNSIGNED_SHORT&&(Z=i.R16UI),V===i.UNSIGNED_INT&&(Z=i.R32UI),V===i.BYTE&&(Z=i.R8I),V===i.SHORT&&(Z=i.R16I),V===i.INT&&(Z=i.R32I)),M===i.RG&&(V===i.FLOAT&&(Z=i.RG32F),V===i.HALF_FLOAT&&(Z=i.RG16F),V===i.UNSIGNED_BYTE&&(Z=i.RG8)),M===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.RG8UI),V===i.UNSIGNED_SHORT&&(Z=i.RG16UI),V===i.UNSIGNED_INT&&(Z=i.RG32UI),V===i.BYTE&&(Z=i.RG8I),V===i.SHORT&&(Z=i.RG16I),V===i.INT&&(Z=i.RG32I)),M===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),V===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),V===i.UNSIGNED_INT&&(Z=i.RGB32UI),V===i.BYTE&&(Z=i.RGB8I),V===i.SHORT&&(Z=i.RGB16I),V===i.INT&&(Z=i.RGB32I)),M===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),V===i.UNSIGNED_INT&&(Z=i.RGBA32UI),V===i.BYTE&&(Z=i.RGBA8I),V===i.SHORT&&(Z=i.RGBA16I),V===i.INT&&(Z=i.RGBA32I)),M===i.RGB&&V===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),M===i.RGBA){let de=K?Ou:ut.getTransfer(Q);V===i.FLOAT&&(Z=i.RGBA32F),V===i.HALF_FLOAT&&(Z=i.RGBA16F),V===i.UNSIGNED_BYTE&&(Z=de===St?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function v(T,M){let V;return T?M===null||M===ks||M===Yo?V=i.DEPTH24_STENCIL8:M===gr?V=i.DEPTH32F_STENCIL8:M===sc&&(V=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===ks||M===Yo?V=i.DEPTH_COMPONENT24:M===gr?V=i.DEPTH_COMPONENT32F:M===sc&&(V=i.DEPTH_COMPONENT16),V}function I(T,M){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==ki&&T.minFilter!==ji?Math.log2(Math.max(M.width,M.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?M.mipmaps.length:1}function C(T){let M=T.target;M.removeEventListener("dispose",C),A(M),M.isVideoTexture&&u.delete(M)}function E(T){let M=T.target;M.removeEventListener("dispose",E),y(M)}function A(T){let M=n.get(T);if(M.__webglInit===void 0)return;let V=T.source,Q=h.get(V);if(Q){let K=Q[M.__cacheKey];K.usedTimes--,K.usedTimes===0&&x(T),Object.keys(Q).length===0&&h.delete(V)}n.remove(T)}function x(T){let M=n.get(T);i.deleteTexture(M.__webglTexture);let V=T.source,Q=h.get(V);delete Q[M.__cacheKey],o.memory.textures--}function y(T){let M=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(M.__webglFramebuffer[Q]))for(let K=0;K<M.__webglFramebuffer[Q].length;K++)i.deleteFramebuffer(M.__webglFramebuffer[Q][K]);else i.deleteFramebuffer(M.__webglFramebuffer[Q]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[Q])}else{if(Array.isArray(M.__webglFramebuffer))for(let Q=0;Q<M.__webglFramebuffer.length;Q++)i.deleteFramebuffer(M.__webglFramebuffer[Q]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let Q=0;Q<M.__webglColorRenderbuffer.length;Q++)M.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[Q]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let V=T.textures;for(let Q=0,K=V.length;Q<K;Q++){let Z=n.get(V[Q]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),o.memory.textures--),n.remove(V[Q])}n.remove(T)}let D=0;function N(){D=0}function F(){let T=D;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),D+=1,T}function G(T){let M=[];return M.push(T.wrapS),M.push(T.wrapT),M.push(T.wrapR||0),M.push(T.magFilter),M.push(T.minFilter),M.push(T.anisotropy),M.push(T.internalFormat),M.push(T.format),M.push(T.type),M.push(T.generateMipmaps),M.push(T.premultiplyAlpha),M.push(T.flipY),M.push(T.unpackAlignment),M.push(T.colorSpace),M.join()}function X(T,M){let V=n.get(T);if(T.isVideoTexture&&we(T),T.isRenderTargetTexture===!1&&T.version>0&&V.__version!==T.version){let Q=T.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(V,T,M);return}}t.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+M)}function W(T,M){let V=n.get(T);if(T.version>0&&V.__version!==T.version){Y(V,T,M);return}t.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+M)}function j(T,M){let V=n.get(T);if(T.version>0&&V.__version!==T.version){Y(V,T,M);return}t.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+M)}function H(T,M){let V=n.get(T);if(T.version>0&&V.__version!==T.version){ee(V,T,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+M)}let te={[hp]:i.REPEAT,[Ls]:i.CLAMP_TO_EDGE,[pp]:i.MIRRORED_REPEAT},R={[ki]:i.NEAREST,[SI]:i.NEAREST_MIPMAP_NEAREST,[Ul]:i.NEAREST_MIPMAP_LINEAR,[ji]:i.LINEAR,[Th]:i.LINEAR_MIPMAP_NEAREST,[Os]:i.LINEAR_MIPMAP_LINEAR},ue={[CI]:i.NEVER,[NI]:i.ALWAYS,[II]:i.LESS,[vx]:i.LEQUAL,[AI]:i.EQUAL,[PI]:i.GEQUAL,[DI]:i.GREATER,[RI]:i.NOTEQUAL};function Pe(T,M){if(M.type===gr&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===ji||M.magFilter===Th||M.magFilter===Ul||M.magFilter===Os||M.minFilter===ji||M.minFilter===Th||M.minFilter===Ul||M.minFilter===Os)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,te[M.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,te[M.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,te[M.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,R[M.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,R[M.minFilter]),M.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,ue[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===ki||M.minFilter!==Ul&&M.minFilter!==Os||M.type===gr&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let V=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Ze(T,M){let V=!1;T.__webglInit===void 0&&(T.__webglInit=!0,M.addEventListener("dispose",C));let Q=M.source,K=h.get(Q);K===void 0&&(K={},h.set(Q,K));let Z=G(M);if(Z!==T.__cacheKey){K[Z]===void 0&&(K[Z]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),K[Z].usedTimes++;let de=K[T.__cacheKey];de!==void 0&&(K[T.__cacheKey].usedTimes--,de.usedTimes===0&&x(M)),T.__cacheKey=Z,T.__webglTexture=K[Z].texture}return V}function Y(T,M,V){let Q=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Q=i.TEXTURE_3D);let K=Ze(T,M),Z=M.source;t.bindTexture(Q,T.__webglTexture,i.TEXTURE0+V);let de=n.get(Z);if(Z.version!==de.__version||K===!0){t.activeTexture(i.TEXTURE0+V);let ae=ut.getPrimaries(ut.workingColorSpace),pe=M.colorSpace===Yr?null:ut.getPrimaries(M.colorSpace),Ge=M.colorSpace===Yr||ae===pe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ge);let ie=_(M.image,!1,r.maxTextureSize);ie=st(M,ie);let oe=s.convert(M.format,M.colorSpace),Ne=s.convert(M.type),Re=w(M.internalFormat,oe,Ne,M.colorSpace,M.isVideoTexture);Pe(Q,M);let ye,je=M.mipmaps,Oe=M.isVideoTexture!==!0,ct=de.__version===void 0||K===!0,P=Z.dataReady,le=I(M,ie);if(M.isDepthTexture)Re=v(M.format===Zo,M.type),ct&&(Oe?t.texStorage2D(i.TEXTURE_2D,1,Re,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,Re,ie.width,ie.height,0,oe,Ne,null));else if(M.isDataTexture)if(je.length>0){Oe&&ct&&t.texStorage2D(i.TEXTURE_2D,le,Re,je[0].width,je[0].height);for(let q=0,J=je.length;q<J;q++)ye=je[q],Oe?P&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,ye.width,ye.height,oe,Ne,ye.data):t.texImage2D(i.TEXTURE_2D,q,Re,ye.width,ye.height,0,oe,Ne,ye.data);M.generateMipmaps=!1}else Oe?(ct&&t.texStorage2D(i.TEXTURE_2D,le,Re,ie.width,ie.height),P&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ie.width,ie.height,oe,Ne,ie.data)):t.texImage2D(i.TEXTURE_2D,0,Re,ie.width,ie.height,0,oe,Ne,ie.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Oe&&ct&&t.texStorage3D(i.TEXTURE_2D_ARRAY,le,Re,je[0].width,je[0].height,ie.depth);for(let q=0,J=je.length;q<J;q++)if(ye=je[q],M.format!==Li)if(oe!==null)if(Oe){if(P)if(M.layerUpdates.size>0){let ce=ix(ye.width,ye.height,M.format,M.type);for(let fe of M.layerUpdates){let Fe=ye.data.subarray(fe*ce/ye.data.BYTES_PER_ELEMENT,(fe+1)*ce/ye.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,fe,ye.width,ye.height,1,oe,Fe)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,ye.width,ye.height,ie.depth,oe,ye.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,Re,ye.width,ye.height,ie.depth,0,ye.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?P&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,ye.width,ye.height,ie.depth,oe,Ne,ye.data):t.texImage3D(i.TEXTURE_2D_ARRAY,q,Re,ye.width,ye.height,ie.depth,0,oe,Ne,ye.data)}else{Oe&&ct&&t.texStorage2D(i.TEXTURE_2D,le,Re,je[0].width,je[0].height);for(let q=0,J=je.length;q<J;q++)ye=je[q],M.format!==Li?oe!==null?Oe?P&&t.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,ye.width,ye.height,oe,ye.data):t.compressedTexImage2D(i.TEXTURE_2D,q,Re,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?P&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,ye.width,ye.height,oe,Ne,ye.data):t.texImage2D(i.TEXTURE_2D,q,Re,ye.width,ye.height,0,oe,Ne,ye.data)}else if(M.isDataArrayTexture)if(Oe){if(ct&&t.texStorage3D(i.TEXTURE_2D_ARRAY,le,Re,ie.width,ie.height,ie.depth),P)if(M.layerUpdates.size>0){let q=ix(ie.width,ie.height,M.format,M.type);for(let J of M.layerUpdates){let ce=ie.data.subarray(J*q/ie.data.BYTES_PER_ELEMENT,(J+1)*q/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,J,ie.width,ie.height,1,oe,Ne,ce)}M.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,oe,Ne,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Re,ie.width,ie.height,ie.depth,0,oe,Ne,ie.data);else if(M.isData3DTexture)Oe?(ct&&t.texStorage3D(i.TEXTURE_3D,le,Re,ie.width,ie.height,ie.depth),P&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,oe,Ne,ie.data)):t.texImage3D(i.TEXTURE_3D,0,Re,ie.width,ie.height,ie.depth,0,oe,Ne,ie.data);else if(M.isFramebufferTexture){if(ct)if(Oe)t.texStorage2D(i.TEXTURE_2D,le,Re,ie.width,ie.height);else{let q=ie.width,J=ie.height;for(let ce=0;ce<le;ce++)t.texImage2D(i.TEXTURE_2D,ce,Re,q,J,0,oe,Ne,null),q>>=1,J>>=1}}else if(je.length>0){if(Oe&&ct){let q=Ie(je[0]);t.texStorage2D(i.TEXTURE_2D,le,Re,q.width,q.height)}for(let q=0,J=je.length;q<J;q++)ye=je[q],Oe?P&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,oe,Ne,ye):t.texImage2D(i.TEXTURE_2D,q,Re,oe,Ne,ye);M.generateMipmaps=!1}else if(Oe){if(ct){let q=Ie(ie);t.texStorage2D(i.TEXTURE_2D,le,Re,q.width,q.height)}P&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,oe,Ne,ie)}else t.texImage2D(i.TEXTURE_2D,0,Re,oe,Ne,ie);m(M)&&p(Q),de.__version=Z.version,M.onUpdate&&M.onUpdate(M)}T.__version=M.version}function ee(T,M,V){if(M.image.length!==6)return;let Q=Ze(T,M),K=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+V);let Z=n.get(K);if(K.version!==Z.__version||Q===!0){t.activeTexture(i.TEXTURE0+V);let de=ut.getPrimaries(ut.workingColorSpace),ae=M.colorSpace===Yr?null:ut.getPrimaries(M.colorSpace),pe=M.colorSpace===Yr||de===ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);let Ge=M.isCompressedTexture||M.image[0].isCompressedTexture,ie=M.image[0]&&M.image[0].isDataTexture,oe=[];for(let J=0;J<6;J++)!Ge&&!ie?oe[J]=_(M.image[J],!0,r.maxCubemapSize):oe[J]=ie?M.image[J].image:M.image[J],oe[J]=st(M,oe[J]);let Ne=oe[0],Re=s.convert(M.format,M.colorSpace),ye=s.convert(M.type),je=w(M.internalFormat,Re,ye,M.colorSpace),Oe=M.isVideoTexture!==!0,ct=Z.__version===void 0||Q===!0,P=K.dataReady,le=I(M,Ne);Pe(i.TEXTURE_CUBE_MAP,M);let q;if(Ge){Oe&&ct&&t.texStorage2D(i.TEXTURE_CUBE_MAP,le,je,Ne.width,Ne.height);for(let J=0;J<6;J++){q=oe[J].mipmaps;for(let ce=0;ce<q.length;ce++){let fe=q[ce];M.format!==Li?Re!==null?Oe?P&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ce,0,0,fe.width,fe.height,Re,fe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ce,je,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Oe?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ce,0,0,fe.width,fe.height,Re,ye,fe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ce,je,fe.width,fe.height,0,Re,ye,fe.data)}}}else{if(q=M.mipmaps,Oe&&ct){q.length>0&&le++;let J=Ie(oe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,le,je,J.width,J.height)}for(let J=0;J<6;J++)if(ie){Oe?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,oe[J].width,oe[J].height,Re,ye,oe[J].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,je,oe[J].width,oe[J].height,0,Re,ye,oe[J].data);for(let ce=0;ce<q.length;ce++){let Fe=q[ce].image[J].image;Oe?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ce+1,0,0,Fe.width,Fe.height,Re,ye,Fe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ce+1,je,Fe.width,Fe.height,0,Re,ye,Fe.data)}}else{Oe?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Re,ye,oe[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,je,Re,ye,oe[J]);for(let ce=0;ce<q.length;ce++){let fe=q[ce];Oe?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ce+1,0,0,Re,ye,fe.image[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ce+1,je,Re,ye,fe.image[J])}}}m(M)&&p(i.TEXTURE_CUBE_MAP),Z.__version=K.version,M.onUpdate&&M.onUpdate(M)}T.__version=M.version}function _e(T,M,V,Q,K,Z){let de=s.convert(V.format,V.colorSpace),ae=s.convert(V.type),pe=w(V.internalFormat,de,ae,V.colorSpace),Ge=n.get(M),ie=n.get(V);if(ie.__renderTarget=M,!Ge.__hasExternalTextures){let oe=Math.max(1,M.width>>Z),Ne=Math.max(1,M.height>>Z);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?t.texImage3D(K,Z,pe,oe,Ne,M.depth,0,de,ae,null):t.texImage2D(K,Z,pe,oe,Ne,0,de,ae,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),U(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,K,ie.__webglTexture,0,ke(M)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,K,ie.__webglTexture,Z),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ne(T,M,V){if(i.bindRenderbuffer(i.RENDERBUFFER,T),M.depthBuffer){let Q=M.depthTexture,K=Q&&Q.isDepthTexture?Q.type:null,Z=v(M.stencilBuffer,K),de=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=ke(M);U(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ae,Z,M.width,M.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,ae,Z,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,Z,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,de,i.RENDERBUFFER,T)}else{let Q=M.textures;for(let K=0;K<Q.length;K++){let Z=Q[K],de=s.convert(Z.format,Z.colorSpace),ae=s.convert(Z.type),pe=w(Z.internalFormat,de,ae,Z.colorSpace),Ge=ke(M);V&&U(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ge,pe,M.width,M.height):U(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ge,pe,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,pe,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function be(T,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Q=n.get(M.depthTexture);Q.__renderTarget=M,(!Q.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),X(M.depthTexture,0);let K=Q.__webglTexture,Z=ke(M);if(M.depthTexture.format===Go)U(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(M.depthTexture.format===Zo)U(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Ce(T){let M=n.get(T),V=T.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==T.depthTexture){let Q=T.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),Q){let K=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,Q.removeEventListener("dispose",K)};Q.addEventListener("dispose",K),M.__depthDisposeCallback=K}M.__boundDepthTexture=Q}if(T.depthTexture&&!M.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");be(M.__webglFramebuffer,T)}else if(V){M.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[Q]),M.__webglDepthbuffer[Q]===void 0)M.__webglDepthbuffer[Q]=i.createRenderbuffer(),ne(M.__webglDepthbuffer[Q],T,!1);else{let K=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=M.__webglDepthbuffer[Q];i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,Z)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),ne(M.__webglDepthbuffer,T,!1);else{let Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,K)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ve(T,M,V){let Q=n.get(T);M!==void 0&&_e(Q.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&Ce(T)}function Je(T){let M=T.texture,V=n.get(T),Q=n.get(M);T.addEventListener("dispose",E);let K=T.textures,Z=T.isWebGLCubeRenderTarget===!0,de=K.length>1;if(de||(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=M.version,o.memory.textures++),Z){V.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(M.mipmaps&&M.mipmaps.length>0){V.__webglFramebuffer[ae]=[];for(let pe=0;pe<M.mipmaps.length;pe++)V.__webglFramebuffer[ae][pe]=i.createFramebuffer()}else V.__webglFramebuffer[ae]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){V.__webglFramebuffer=[];for(let ae=0;ae<M.mipmaps.length;ae++)V.__webglFramebuffer[ae]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(de)for(let ae=0,pe=K.length;ae<pe;ae++){let Ge=n.get(K[ae]);Ge.__webglTexture===void 0&&(Ge.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&U(T)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ae=0;ae<K.length;ae++){let pe=K[ae];V.__webglColorRenderbuffer[ae]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[ae]);let Ge=s.convert(pe.format,pe.colorSpace),ie=s.convert(pe.type),oe=w(pe.internalFormat,Ge,ie,pe.colorSpace,T.isXRRenderTarget===!0),Ne=ke(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ne,oe,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,V.__webglColorRenderbuffer[ae])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),ne(V.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),Pe(i.TEXTURE_CUBE_MAP,M);for(let ae=0;ae<6;ae++)if(M.mipmaps&&M.mipmaps.length>0)for(let pe=0;pe<M.mipmaps.length;pe++)_e(V.__webglFramebuffer[ae][pe],T,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,pe);else _e(V.__webglFramebuffer[ae],T,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);m(M)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(de){for(let ae=0,pe=K.length;ae<pe;ae++){let Ge=K[ae],ie=n.get(Ge);t.bindTexture(i.TEXTURE_2D,ie.__webglTexture),Pe(i.TEXTURE_2D,Ge),_e(V.__webglFramebuffer,T,Ge,i.COLOR_ATTACHMENT0+ae,i.TEXTURE_2D,0),m(Ge)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let ae=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ae=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ae,Q.__webglTexture),Pe(ae,M),M.mipmaps&&M.mipmaps.length>0)for(let pe=0;pe<M.mipmaps.length;pe++)_e(V.__webglFramebuffer[pe],T,M,i.COLOR_ATTACHMENT0,ae,pe);else _e(V.__webglFramebuffer,T,M,i.COLOR_ATTACHMENT0,ae,0);m(M)&&p(ae),t.unbindTexture()}T.depthBuffer&&Ce(T)}function Le(T){let M=T.textures;for(let V=0,Q=M.length;V<Q;V++){let K=M[V];if(m(K)){let Z=b(T),de=n.get(K).__webglTexture;t.bindTexture(Z,de),p(Z),t.unbindTexture()}}}let De=[],L=[];function bt(T){if(T.samples>0){if(U(T)===!1){let M=T.textures,V=T.width,Q=T.height,K=i.COLOR_BUFFER_BIT,Z=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=n.get(T),ae=M.length>1;if(ae)for(let pe=0;pe<M.length;pe++)t.bindFramebuffer(i.FRAMEBUFFER,de.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,de.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,de.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let pe=0;pe<M.length;pe++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),ae){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,de.__webglColorRenderbuffer[pe]);let Ge=n.get(M[pe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ge,0)}i.blitFramebuffer(0,0,V,Q,0,0,V,Q,K,i.NEAREST),c===!0&&(De.length=0,L.length=0,De.push(i.COLOR_ATTACHMENT0+pe),T.depthBuffer&&T.resolveDepthBuffer===!1&&(De.push(Z),L.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,L)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,De))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ae)for(let pe=0;pe<M.length;pe++){t.bindFramebuffer(i.FRAMEBUFFER,de.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,de.__webglColorRenderbuffer[pe]);let Ge=n.get(M[pe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,de.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,Ge,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,de.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){let M=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function ke(T){return Math.min(r.maxSamples,T.samples)}function U(T){let M=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function we(T){let M=o.render.frame;u.get(T)!==M&&(u.set(T,M),T.update())}function st(T,M){let V=T.colorSpace,Q=T.format,K=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||V!==ta&&V!==Yr&&(ut.getTransfer(V)===St?(Q!==Li||K!==xr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),M}function Ie(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=N,this.setTexture2D=X,this.setTexture2DArray=W,this.setTexture3D=j,this.setTextureCube=H,this.rebindTextures=Ve,this.setupRenderTarget=Je,this.updateRenderTargetMipmap=Le,this.updateMultisampleRenderTarget=bt,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=U}function EP(i,e){function t(n,r=Yr){let s,o=ut.getTransfer(r);if(n===xr)return i.UNSIGNED_BYTE;if(n===vm)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ym)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ux)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===cx)return i.BYTE;if(n===lx)return i.SHORT;if(n===sc)return i.UNSIGNED_SHORT;if(n===_m)return i.INT;if(n===ks)return i.UNSIGNED_INT;if(n===gr)return i.FLOAT;if(n===ac)return i.HALF_FLOAT;if(n===dx)return i.ALPHA;if(n===fx)return i.RGB;if(n===Li)return i.RGBA;if(n===hx)return i.LUMINANCE;if(n===px)return i.LUMINANCE_ALPHA;if(n===Go)return i.DEPTH_COMPONENT;if(n===Zo)return i.DEPTH_STENCIL;if(n===mx)return i.RED;if(n===xm)return i.RED_INTEGER;if(n===gx)return i.RG;if(n===Mm)return i.RG_INTEGER;if(n===Sm)return i.RGBA_INTEGER;if(n===cu||n===lu||n===uu||n===du)if(o===St)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===cu)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===lu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===uu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===du)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===cu)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===lu)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===uu)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===du)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===mp||n===gp||n===_p||n===vp)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===mp)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===gp)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===_p)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===vp)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===yp||n===xp||n===Mp)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===yp||n===xp)return o===St?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Mp)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Sp||n===bp||n===wp||n===Ep||n===Tp||n===Cp||n===Ip||n===Ap||n===Dp||n===Rp||n===Pp||n===Np||n===Lp||n===Op)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Sp)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===bp)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===wp)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ep)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Tp)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Cp)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ip)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ap)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Dp)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Rp)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Pp)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Np)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Lp)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Op)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===fu||n===kp||n===Fp)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===fu)return o===St?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===kp)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Fp)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===_x||n===Up||n===Bp||n===Vp)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===fu)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Up)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Bp)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Vp)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Yo?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var im=class extends An{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},zo=class extends Hs{constructor(){super(),this.isGroup=!0,this.type="Group"}},TP={type:"move"},rc=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zo,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zo,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new $,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new $),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zo,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new $,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new $),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;l.inputState.pinching&&h>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(TP)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new zo;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},CP=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,IP=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,rm=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let r=new zs,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new mi({vertexShader:CP,fragmentShader:IP,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Oi(new Cu(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},sm=class extends Qr{constructor(e,t){super();let n=this,r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,f=null,h=null,d=null,g=null,_=new rm,m=t.getContextAttributes(),p=null,b=null,w=[],v=[],I=new Ct,C=null,E=new An;E.viewport=new qt;let A=new An;A.viewport=new qt;let x=[E,A],y=new im,D=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ee=w[Y];return ee===void 0&&(ee=new rc,w[Y]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(Y){let ee=w[Y];return ee===void 0&&(ee=new rc,w[Y]=ee),ee.getGripSpace()},this.getHand=function(Y){let ee=w[Y];return ee===void 0&&(ee=new rc,w[Y]=ee),ee.getHandSpace()};function F(Y){let ee=v.indexOf(Y.inputSource);if(ee===-1)return;let _e=w[ee];_e!==void 0&&(_e.update(Y.inputSource,Y.frame,l||o),_e.dispatchEvent({type:Y.type,data:Y.inputSource}))}function G(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",X);for(let Y=0;Y<w.length;Y++){let ee=v[Y];ee!==null&&(v[Y]=null,w[Y].disconnect(ee))}D=null,N=null,_.reset(),e.setRenderTarget(p),d=null,h=null,f=null,r=null,b=null,Ze.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=function(Y){return Ea(this,null,function*(){if(r=Y,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",G),r.addEventListener("inputsourceschange",X),m.xrCompatible!==!0&&(yield t.makeXRCompatible()),C=e.getPixelRatio(),e.getSize(I),r.renderState.layers===void 0){let ee={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,ee),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),b=new Mr(d.framebufferWidth,d.framebufferHeight,{format:Li,type:xr,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ee=null,_e=null,ne=null;m.depth&&(ne=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=m.stencil?Zo:Go,_e=m.stencil?Yo:ks);let be={colorFormat:t.RGBA8,depthFormat:ne,scaleFactor:s};f=new XRWebGLBinding(r,t),h=f.createProjectionLayer(be),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),b=new Mr(h.textureWidth,h.textureHeight,{format:Li,type:xr,depthTexture:new Au(h.textureWidth,h.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=yield r.requestReferenceSpace(a),Ze.setContext(r),Ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}})},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function X(Y){for(let ee=0;ee<Y.removed.length;ee++){let _e=Y.removed[ee],ne=v.indexOf(_e);ne>=0&&(v[ne]=null,w[ne].disconnect(_e))}for(let ee=0;ee<Y.added.length;ee++){let _e=Y.added[ee],ne=v.indexOf(_e);if(ne===-1){for(let Ce=0;Ce<w.length;Ce++)if(Ce>=v.length){v.push(_e),ne=Ce;break}else if(v[Ce]===null){v[Ce]=_e,ne=Ce;break}if(ne===-1)break}let be=w[ne];be&&be.connect(_e)}}let W=new $,j=new $;function H(Y,ee,_e){W.setFromMatrixPosition(ee.matrixWorld),j.setFromMatrixPosition(_e.matrixWorld);let ne=W.distanceTo(j),be=ee.projectionMatrix.elements,Ce=_e.projectionMatrix.elements,Ve=be[14]/(be[10]-1),Je=be[14]/(be[10]+1),Le=(be[9]+1)/be[5],De=(be[9]-1)/be[5],L=(be[8]-1)/be[0],bt=(Ce[8]+1)/Ce[0],ke=Ve*L,U=Ve*bt,we=ne/(-L+bt),st=we*-L;if(ee.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(st),Y.translateZ(we),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),be[10]===-1)Y.projectionMatrix.copy(ee.projectionMatrix),Y.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{let Ie=Ve+we,T=Je+we,M=ke-st,V=U+(ne-st),Q=Le*Je/T*Ie,K=De*Je/T*Ie;Y.projectionMatrix.makePerspective(M,V,Q,K,Ie,T),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function te(Y,ee){ee===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ee.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;let ee=Y.near,_e=Y.far;_.texture!==null&&(_.depthNear>0&&(ee=_.depthNear),_.depthFar>0&&(_e=_.depthFar)),y.near=A.near=E.near=ee,y.far=A.far=E.far=_e,(D!==y.near||N!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),D=y.near,N=y.far),E.layers.mask=Y.layers.mask|2,A.layers.mask=Y.layers.mask|4,y.layers.mask=E.layers.mask|A.layers.mask;let ne=Y.parent,be=y.cameras;te(y,ne);for(let Ce=0;Ce<be.length;Ce++)te(be[Ce],ne);be.length===2?H(y,E,A):y.projectionMatrix.copy(E.projectionMatrix),R(Y,y,ne)};function R(Y,ee,_e){_e===null?Y.matrix.copy(ee.matrixWorld):(Y.matrix.copy(_e.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ee.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ee.projectionMatrix),Y.projectionMatrixInverse.copy(ee.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Hp*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(h===null&&d===null))return c},this.setFoveation=function(Y){c=Y,h!==null&&(h.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let ue=null;function Pe(Y,ee){if(u=ee.getViewerPose(l||o),g=ee,u!==null){let _e=u.views;d!==null&&(e.setRenderTargetFramebuffer(b,d.framebuffer),e.setRenderTarget(b));let ne=!1;_e.length!==y.cameras.length&&(y.cameras.length=0,ne=!0);for(let Ce=0;Ce<_e.length;Ce++){let Ve=_e[Ce],Je=null;if(d!==null)Je=d.getViewport(Ve);else{let De=f.getViewSubImage(h,Ve);Je=De.viewport,Ce===0&&(e.setRenderTargetTextures(b,De.colorTexture,h.ignoreDepthValues?void 0:De.depthStencilTexture),e.setRenderTarget(b))}let Le=x[Ce];Le===void 0&&(Le=new An,Le.layers.enable(Ce),Le.viewport=new qt,x[Ce]=Le),Le.matrix.fromArray(Ve.transform.matrix),Le.matrix.decompose(Le.position,Le.quaternion,Le.scale),Le.projectionMatrix.fromArray(Ve.projectionMatrix),Le.projectionMatrixInverse.copy(Le.projectionMatrix).invert(),Le.viewport.set(Je.x,Je.y,Je.width,Je.height),Ce===0&&(y.matrix.copy(Le.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ne===!0&&y.cameras.push(Le)}let be=r.enabledFeatures;if(be&&be.includes("depth-sensing")){let Ce=f.getDepthInformation(_e[0]);Ce&&Ce.isValid&&Ce.texture&&_.init(e,Ce,r.renderState)}}for(let _e=0;_e<w.length;_e++){let ne=v[_e],be=w[_e];ne!==null&&be!==void 0&&be.update(ne,ee,l||o)}ue&&ue(Y,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),g=null}let Ze=new Sx;Ze.setAnimationLoop(Pe),this.setAnimationLoop=function(Y){ue=Y},this.dispose=function(){}}},As=new Ko,AP=new Kt;function DP(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Mx(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,b,w,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),f(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),h(m,p),p.isMeshPhysicalMaterial&&d(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,b,w):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Hn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Hn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let b=e.get(p),w=b.envMap,v=b.envMapRotation;w&&(m.envMap.value=w,As.copy(v),As.x*=-1,As.y*=-1,As.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(As.y*=-1,As.z*=-1),m.envMapRotation.value.setFromMatrix4(AP.makeRotationFromEuler(As)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,b,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=w*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Hn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function RP(i,e,t,n){let r={},s={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,w){let v=w.program;n.uniformBlockBinding(b,v)}function l(b,w){let v=r[b.id];v===void 0&&(g(b),v=u(b),r[b.id]=v,b.addEventListener("dispose",m));let I=w.program;n.updateUBOMapping(b,I);let C=e.render.frame;s[b.id]!==C&&(h(b),s[b.id]=C)}function u(b){let w=f();b.__bindingPointIndex=w;let v=i.createBuffer(),I=b.__size,C=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,I,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,v),v}function f(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(b){let w=r[b.id],v=b.uniforms,I=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let C=0,E=v.length;C<E;C++){let A=Array.isArray(v[C])?v[C]:[v[C]];for(let x=0,y=A.length;x<y;x++){let D=A[x];if(d(D,C,x,I)===!0){let N=D.__offset,F=Array.isArray(D.value)?D.value:[D.value],G=0;for(let X=0;X<F.length;X++){let W=F[X],j=_(W);typeof W=="number"||typeof W=="boolean"?(D.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,N+G,D.__data)):W.isMatrix3?(D.__data[0]=W.elements[0],D.__data[1]=W.elements[1],D.__data[2]=W.elements[2],D.__data[3]=0,D.__data[4]=W.elements[3],D.__data[5]=W.elements[4],D.__data[6]=W.elements[5],D.__data[7]=0,D.__data[8]=W.elements[6],D.__data[9]=W.elements[7],D.__data[10]=W.elements[8],D.__data[11]=0):(W.toArray(D.__data,G),G+=j.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,N,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(b,w,v,I){let C=b.value,E=w+"_"+v;if(I[E]===void 0)return typeof C=="number"||typeof C=="boolean"?I[E]=C:I[E]=C.clone(),!0;{let A=I[E];if(typeof C=="number"||typeof C=="boolean"){if(A!==C)return I[E]=C,!0}else if(A.equals(C)===!1)return A.copy(C),!0}return!1}function g(b){let w=b.uniforms,v=0,I=16;for(let E=0,A=w.length;E<A;E++){let x=Array.isArray(w[E])?w[E]:[w[E]];for(let y=0,D=x.length;y<D;y++){let N=x[y],F=Array.isArray(N.value)?N.value:[N.value];for(let G=0,X=F.length;G<X;G++){let W=F[G],j=_(W),H=v%I,te=H%j.boundary,R=H+te;v+=te,R!==0&&I-R<j.storage&&(v+=I-R),N.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=v,v+=j.storage}}}let C=v%I;return C>0&&(v+=I-C),b.__size=v,b.__cache={},this}function _(b){let w={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(w.boundary=4,w.storage=4):b.isVector2?(w.boundary=8,w.storage=8):b.isVector3||b.isColor?(w.boundary=16,w.storage=12):b.isVector4?(w.boundary=16,w.storage=16):b.isMatrix3?(w.boundary=48,w.storage=48):b.isMatrix4?(w.boundary=64,w.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),w}function m(b){let w=b.target;w.removeEventListener("dispose",m);let v=o.indexOf(w.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function p(){for(let b in r)i.deleteBuffer(r[b]);o=[],r={},s={}}return{bind:c,update:l,dispose:p}}var Du=class{constructor(e={}){let{canvas:t=OI(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;let g=new Uint32Array(4),_=new Int32Array(4),m=null,p=null,b=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=pi,this.toneMapping=Jr,this.toneMappingExposure=1;let v=this,I=!1,C=0,E=0,A=null,x=-1,y=null,D=new qt,N=new qt,F=null,G=new ot(0),X=0,W=t.width,j=t.height,H=1,te=null,R=null,ue=new qt(0,0,W,j),Pe=new qt(0,0,W,j),Ze=!1,Y=new Tu,ee=!1,_e=!1,ne=new Kt,be=new Kt,Ce=new $,Ve=new qt,Je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Le=!1;function De(){return A===null?H:1}let L=n;function bt(S,O){return t.getContext(S,O)}try{let S={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${gm}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",ce,!1),t.addEventListener("webglcontextcreationerror",fe,!1),L===null){let O="webgl2";if(L=bt(O,S),L===null)throw bt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let ke,U,we,st,Ie,T,M,V,Q,K,Z,de,ae,pe,Ge,ie,oe,Ne,Re,ye,je,Oe,ct,P;function le(){ke=new qD(L),ke.init(),Oe=new EP(L,ke),U=new zD(L,ke,e,Oe),we=new SP(L,ke),U.reverseDepthBuffer&&h&&we.buffers.depth.setReversed(!0),st=new ZD(L),Ie=new lP,T=new wP(L,ke,we,Ie,U,Oe,st),M=new GD(v),V=new $D(v),Q=new iA(L),ct=new BD(L,Q),K=new XD(L,Q,st,ct),Z=new KD(L,K,Q,st),Re=new JD(L,U,T),ie=new HD(Ie),de=new cP(v,M,V,ke,U,ct,ie),ae=new DP(v,Ie),pe=new dP,Ge=new _P(ke),Ne=new UD(v,M,V,we,Z,d,c),oe=new xP(v,Z,U),P=new RP(L,st,U,we),ye=new VD(L,ke,st),je=new YD(L,ke,st),st.programs=de.programs,v.capabilities=U,v.extensions=ke,v.properties=Ie,v.renderLists=pe,v.shadowMap=oe,v.state=we,v.info=st}le();let q=new sm(v,L);this.xr=q,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let S=ke.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=ke.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(S){S!==void 0&&(H=S,this.setSize(W,j,!1))},this.getSize=function(S){return S.set(W,j)},this.setSize=function(S,O,B=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=S,j=O,t.width=Math.floor(S*H),t.height=Math.floor(O*H),B===!0&&(t.style.width=S+"px",t.style.height=O+"px"),this.setViewport(0,0,S,O)},this.getDrawingBufferSize=function(S){return S.set(W*H,j*H).floor()},this.setDrawingBufferSize=function(S,O,B){W=S,j=O,H=B,t.width=Math.floor(S*B),t.height=Math.floor(O*B),this.setViewport(0,0,S,O)},this.getCurrentViewport=function(S){return S.copy(D)},this.getViewport=function(S){return S.copy(ue)},this.setViewport=function(S,O,B,z){S.isVector4?ue.set(S.x,S.y,S.z,S.w):ue.set(S,O,B,z),we.viewport(D.copy(ue).multiplyScalar(H).round())},this.getScissor=function(S){return S.copy(Pe)},this.setScissor=function(S,O,B,z){S.isVector4?Pe.set(S.x,S.y,S.z,S.w):Pe.set(S,O,B,z),we.scissor(N.copy(Pe).multiplyScalar(H).round())},this.getScissorTest=function(){return Ze},this.setScissorTest=function(S){we.setScissorTest(Ze=S)},this.setOpaqueSort=function(S){te=S},this.setTransparentSort=function(S){R=S},this.getClearColor=function(S){return S.copy(Ne.getClearColor())},this.setClearColor=function(){Ne.setClearColor.apply(Ne,arguments)},this.getClearAlpha=function(){return Ne.getClearAlpha()},this.setClearAlpha=function(){Ne.setClearAlpha.apply(Ne,arguments)},this.clear=function(S=!0,O=!0,B=!0){let z=0;if(S){let k=!1;if(A!==null){let re=A.texture.format;k=re===Sm||re===Mm||re===xm}if(k){let re=A.texture.type,se=re===xr||re===ks||re===sc||re===Yo||re===vm||re===ym,he=Ne.getClearColor(),xe=Ne.getClearAlpha(),Ue=he.r,He=he.g,Se=he.b;se?(g[0]=Ue,g[1]=He,g[2]=Se,g[3]=xe,L.clearBufferuiv(L.COLOR,0,g)):(_[0]=Ue,_[1]=He,_[2]=Se,_[3]=xe,L.clearBufferiv(L.COLOR,0,_))}else z|=L.COLOR_BUFFER_BIT}O&&(z|=L.DEPTH_BUFFER_BIT),B&&(z|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",ce,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),pe.dispose(),Ge.dispose(),Ie.dispose(),M.dispose(),V.dispose(),Z.dispose(),ct.dispose(),P.dispose(),de.dispose(),q.dispose(),q.removeEventListener("sessionstart",me),q.removeEventListener("sessionend",ze),Te.stop()};function J(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function ce(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;let S=st.autoReset,O=oe.enabled,B=oe.autoUpdate,z=oe.needsUpdate,k=oe.type;le(),st.autoReset=S,oe.enabled=O,oe.autoUpdate=B,oe.needsUpdate=z,oe.type=k}function fe(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Fe(S){let O=S.target;O.removeEventListener("dispose",Fe),dt(O)}function dt(S){zt(S),Ie.remove(S)}function zt(S){let O=Ie.get(S).programs;O!==void 0&&(O.forEach(function(B){de.releaseProgram(B)}),S.isShaderMaterial&&de.releaseShaderCache(S))}this.renderBufferDirect=function(S,O,B,z,k,re){O===null&&(O=Je);let se=k.isMesh&&k.matrixWorld.determinant()<0,he=Xn(S,O,B,z,k);we.setMaterial(z,se);let xe=B.index,Ue=1;if(z.wireframe===!0){if(xe=K.getWireframeAttribute(B),xe===void 0)return;Ue=2}let He=B.drawRange,Se=B.attributes.position,We=He.start*Ue,ft=(He.start+He.count)*Ue;re!==null&&(We=Math.max(We,re.start*Ue),ft=Math.min(ft,(re.start+re.count)*Ue)),xe!==null?(We=Math.max(We,0),ft=Math.min(ft,xe.count)):Se!=null&&(We=Math.max(We,0),ft=Math.min(ft,Se.count));let gt=ft-We;if(gt<0||gt===1/0)return;ct.setup(k,z,he,B,xe);let Ft,_t=ye;if(xe!==null&&(Ft=Q.get(xe),_t=je,_t.setIndex(Ft)),k.isMesh)z.wireframe===!0?(we.setLineWidth(z.wireframeLinewidth*De()),_t.setMode(L.LINES)):_t.setMode(L.TRIANGLES);else if(k.isLine){let Ae=z.linewidth;Ae===void 0&&(Ae=1),we.setLineWidth(Ae*De()),k.isLineSegments?_t.setMode(L.LINES):k.isLineLoop?_t.setMode(L.LINE_LOOP):_t.setMode(L.LINE_STRIP)}else k.isPoints?_t.setMode(L.POINTS):k.isSprite&&_t.setMode(L.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)_t.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(ke.get("WEBGL_multi_draw"))_t.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Ae=k._multiDrawStarts,Qi=k._multiDrawCounts,vt=k._multiDrawCount,Si=xe?Q.get(xe).bytesPerElement:1,co=Ie.get(z).currentProgram.getUniforms();for(let Yn=0;Yn<vt;Yn++)co.setValue(L,"_gl_DrawID",Yn),_t.render(Ae[Yn]/Si,Qi[Yn])}else if(k.isInstancedMesh)_t.renderInstances(We,gt,k.count);else if(B.isInstancedBufferGeometry){let Ae=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Qi=Math.min(B.instanceCount,Ae);_t.renderInstances(We,gt,Qi)}else _t.render(We,gt)};function ve(S,O,B){S.transparent===!0&&S.side===mr&&S.forceSinglePass===!1?(S.side=Hn,S.needsUpdate=!0,wt(S,O,B),S.side=Kr,S.needsUpdate=!0,wt(S,O,B),S.side=mr):wt(S,O,B)}this.compile=function(S,O,B=null){B===null&&(B=S),p=Ge.get(B),p.init(O),w.push(p),B.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),S!==B&&S.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();let z=new Set;return S.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let re=k.material;if(re)if(Array.isArray(re))for(let se=0;se<re.length;se++){let he=re[se];ve(he,B,k),z.add(he)}else ve(re,B,k),z.add(re)}),w.pop(),p=null,z},this.compileAsync=function(S,O,B=null){let z=this.compile(S,O,B);return new Promise(k=>{function re(){if(z.forEach(function(se){Ie.get(se).currentProgram.isReady()&&z.delete(se)}),z.size===0){k(S);return}setTimeout(re,10)}ke.get("KHR_parallel_shader_compile")!==null?re():setTimeout(re,10)})};let Ee=null;function $e(S){Ee&&Ee(S)}function me(){Te.stop()}function ze(){Te.start()}let Te=new Sx;Te.setAnimationLoop($e),typeof self<"u"&&Te.setContext(self),this.setAnimationLoop=function(S){Ee=S,q.setAnimationLoop(S),S===null?Te.stop():Te.start()},q.addEventListener("sessionstart",me),q.addEventListener("sessionend",ze),this.render=function(S,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(O),O=q.getCamera()),S.isScene===!0&&S.onBeforeRender(v,S,O,A),p=Ge.get(S,w.length),p.init(O),w.push(p),be.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Y.setFromProjectionMatrix(be),_e=this.localClippingEnabled,ee=ie.init(this.clippingPlanes,_e),m=pe.get(S,b.length),m.init(),b.push(m),q.enabled===!0&&q.isPresenting===!0){let re=v.xr.getDepthSensingMesh();re!==null&&Be(re,O,-1/0,v.sortObjects)}Be(S,O,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(te,R),Le=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,Le&&Ne.addToRenderList(m,S),this.info.render.frame++,ee===!0&&ie.beginShadows();let B=p.state.shadowsArray;oe.render(B,S,O),ee===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset();let z=m.opaque,k=m.transmissive;if(p.setupLights(),O.isArrayCamera){let re=O.cameras;if(k.length>0)for(let se=0,he=re.length;se<he;se++){let xe=re[se];tt(z,k,S,xe)}Le&&Ne.render(S);for(let se=0,he=re.length;se<he;se++){let xe=re[se];jt(m,S,xe,xe.viewport)}}else k.length>0&&tt(z,k,S,O),Le&&Ne.render(S),jt(m,S,O);A!==null&&(T.updateMultisampleRenderTarget(A),T.updateRenderTargetMipmap(A)),S.isScene===!0&&S.onAfterRender(v,S,O),ct.resetDefaultState(),x=-1,y=null,w.pop(),w.length>0?(p=w[w.length-1],ee===!0&&ie.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function Be(S,O,B,z){if(S.visible===!1)return;if(S.layers.test(O.layers)){if(S.isGroup)B=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(O);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Y.intersectsSprite(S)){z&&Ve.setFromMatrixPosition(S.matrixWorld).applyMatrix4(be);let se=Z.update(S),he=S.material;he.visible&&m.push(S,se,he,B,Ve.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Y.intersectsObject(S))){let se=Z.update(S),he=S.material;if(z&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ve.copy(S.boundingSphere.center)):(se.boundingSphere===null&&se.computeBoundingSphere(),Ve.copy(se.boundingSphere.center)),Ve.applyMatrix4(S.matrixWorld).applyMatrix4(be)),Array.isArray(he)){let xe=se.groups;for(let Ue=0,He=xe.length;Ue<He;Ue++){let Se=xe[Ue],We=he[Se.materialIndex];We&&We.visible&&m.push(S,se,We,B,Ve.z,Se)}}else he.visible&&m.push(S,se,he,B,Ve.z,null)}}let re=S.children;for(let se=0,he=re.length;se<he;se++)Be(re[se],O,B,z)}function jt(S,O,B,z){let k=S.opaque,re=S.transmissive,se=S.transparent;p.setupLightsView(B),ee===!0&&ie.setGlobalState(v.clippingPlanes,B),z&&we.viewport(D.copy(z)),k.length>0&&Dt(k,O,B),re.length>0&&Dt(re,O,B),se.length>0&&Dt(se,O,B),we.buffers.depth.setTest(!0),we.buffers.depth.setMask(!0),we.buffers.color.setMask(!0),we.setPolygonOffset(!1)}function tt(S,O,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[z.id]===void 0&&(p.state.transmissionRenderTarget[z.id]=new Mr(1,1,{generateMipmaps:!0,type:ke.has("EXT_color_buffer_half_float")||ke.has("EXT_color_buffer_float")?ac:xr,minFilter:Os,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ut.workingColorSpace}));let re=p.state.transmissionRenderTarget[z.id],se=z.viewport||D;re.setSize(se.z,se.w);let he=v.getRenderTarget();v.setRenderTarget(re),v.getClearColor(G),X=v.getClearAlpha(),X<1&&v.setClearColor(16777215,.5),v.clear(),Le&&Ne.render(B);let xe=v.toneMapping;v.toneMapping=Jr;let Ue=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),p.setupLightsView(z),ee===!0&&ie.setGlobalState(v.clippingPlanes,z),Dt(S,B,z),T.updateMultisampleRenderTarget(re),T.updateRenderTargetMipmap(re),ke.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let Se=0,We=O.length;Se<We;Se++){let ft=O[Se],gt=ft.object,Ft=ft.geometry,_t=ft.material,Ae=ft.group;if(_t.side===mr&&gt.layers.test(z.layers)){let Qi=_t.side;_t.side=Hn,_t.needsUpdate=!0,tn(gt,B,z,Ft,_t,Ae),_t.side=Qi,_t.needsUpdate=!0,He=!0}}He===!0&&(T.updateMultisampleRenderTarget(re),T.updateRenderTargetMipmap(re))}v.setRenderTarget(he),v.setClearColor(G,X),Ue!==void 0&&(z.viewport=Ue),v.toneMapping=xe}function Dt(S,O,B){let z=O.isScene===!0?O.overrideMaterial:null;for(let k=0,re=S.length;k<re;k++){let se=S[k],he=se.object,xe=se.geometry,Ue=z===null?se.material:z,He=se.group;he.layers.test(B.layers)&&tn(he,O,B,xe,Ue,He)}}function tn(S,O,B,z,k,re){S.onBeforeRender(v,O,B,z,k,re),S.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),k.onBeforeRender(v,O,B,z,S,re),k.transparent===!0&&k.side===mr&&k.forceSinglePass===!1?(k.side=Hn,k.needsUpdate=!0,v.renderBufferDirect(B,O,z,k,S,re),k.side=Kr,k.needsUpdate=!0,v.renderBufferDirect(B,O,z,k,S,re),k.side=mr):v.renderBufferDirect(B,O,z,k,S,re),S.onAfterRender(v,O,B,z,k,re)}function wt(S,O,B){O.isScene!==!0&&(O=Je);let z=Ie.get(S),k=p.state.lights,re=p.state.shadowsArray,se=k.state.version,he=de.getParameters(S,k.state,re,O,B),xe=de.getProgramCacheKey(he),Ue=z.programs;z.environment=S.isMeshStandardMaterial?O.environment:null,z.fog=O.fog,z.envMap=(S.isMeshStandardMaterial?V:M).get(S.envMap||z.environment),z.envMapRotation=z.environment!==null&&S.envMap===null?O.environmentRotation:S.envMapRotation,Ue===void 0&&(S.addEventListener("dispose",Fe),Ue=new Map,z.programs=Ue);let He=Ue.get(xe);if(He!==void 0){if(z.currentProgram===He&&z.lightsStateVersion===se)return mt(S,he),He}else he.uniforms=de.getUniforms(S),S.onBeforeCompile(he,v),He=de.acquireProgram(he,xe),Ue.set(xe,He),z.uniforms=he.uniforms;let Se=z.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Se.clippingPlanes=ie.uniform),mt(S,he),z.needsLights=Tn(S),z.lightsStateVersion=se,z.needsLights&&(Se.ambientLightColor.value=k.state.ambient,Se.lightProbe.value=k.state.probe,Se.directionalLights.value=k.state.directional,Se.directionalLightShadows.value=k.state.directionalShadow,Se.spotLights.value=k.state.spot,Se.spotLightShadows.value=k.state.spotShadow,Se.rectAreaLights.value=k.state.rectArea,Se.ltc_1.value=k.state.rectAreaLTC1,Se.ltc_2.value=k.state.rectAreaLTC2,Se.pointLights.value=k.state.point,Se.pointLightShadows.value=k.state.pointShadow,Se.hemisphereLights.value=k.state.hemi,Se.directionalShadowMap.value=k.state.directionalShadowMap,Se.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Se.spotShadowMap.value=k.state.spotShadowMap,Se.spotLightMatrix.value=k.state.spotLightMatrix,Se.spotLightMap.value=k.state.spotLightMap,Se.pointShadowMap.value=k.state.pointShadowMap,Se.pointShadowMatrix.value=k.state.pointShadowMatrix),z.currentProgram=He,z.uniformsList=null,He}function Et(S){if(S.uniformsList===null){let O=S.currentProgram.getUniforms();S.uniformsList=jo.seqWithValue(O.seq,S.uniforms)}return S.uniformsList}function mt(S,O){let B=Ie.get(S);B.outputColorSpace=O.outputColorSpace,B.batching=O.batching,B.batchingColor=O.batchingColor,B.instancing=O.instancing,B.instancingColor=O.instancingColor,B.instancingMorph=O.instancingMorph,B.skinning=O.skinning,B.morphTargets=O.morphTargets,B.morphNormals=O.morphNormals,B.morphColors=O.morphColors,B.morphTargetsCount=O.morphTargetsCount,B.numClippingPlanes=O.numClippingPlanes,B.numIntersection=O.numClipIntersection,B.vertexAlphas=O.vertexAlphas,B.vertexTangents=O.vertexTangents,B.toneMapping=O.toneMapping}function Xn(S,O,B,z,k){O.isScene!==!0&&(O=Je),T.resetTextureUnits();let re=O.fog,se=z.isMeshStandardMaterial?O.environment:null,he=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:ta,xe=(z.isMeshStandardMaterial?V:M).get(z.envMap||se),Ue=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,He=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Se=!!B.morphAttributes.position,We=!!B.morphAttributes.normal,ft=!!B.morphAttributes.color,gt=Jr;z.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(gt=v.toneMapping);let Ft=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,_t=Ft!==void 0?Ft.length:0,Ae=Ie.get(z),Qi=p.state.lights;if(ee===!0&&(_e===!0||S!==y)){let ci=S===y&&z.id===x;ie.setState(z,S,ci)}let vt=!1;z.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==Qi.state.version||Ae.outputColorSpace!==he||k.isBatchedMesh&&Ae.batching===!1||!k.isBatchedMesh&&Ae.batching===!0||k.isBatchedMesh&&Ae.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Ae.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Ae.instancing===!1||!k.isInstancedMesh&&Ae.instancing===!0||k.isSkinnedMesh&&Ae.skinning===!1||!k.isSkinnedMesh&&Ae.skinning===!0||k.isInstancedMesh&&Ae.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Ae.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Ae.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Ae.instancingMorph===!1&&k.morphTexture!==null||Ae.envMap!==xe||z.fog===!0&&Ae.fog!==re||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==ie.numPlanes||Ae.numIntersection!==ie.numIntersection)||Ae.vertexAlphas!==Ue||Ae.vertexTangents!==He||Ae.morphTargets!==Se||Ae.morphNormals!==We||Ae.morphColors!==ft||Ae.toneMapping!==gt||Ae.morphTargetsCount!==_t)&&(vt=!0):(vt=!0,Ae.__version=z.version);let Si=Ae.currentProgram;vt===!0&&(Si=wt(z,O,k));let co=!1,Yn=!1,ba=!1,Lt=Si.getUniforms(),Vi=Ae.uniforms;if(we.useProgram(Si.program)&&(co=!0,Yn=!0,ba=!0),z.id!==x&&(x=z.id,Yn=!0),co||y!==S){we.buffers.depth.getReversed()?(ne.copy(S.projectionMatrix),FI(ne),UI(ne),Lt.setValue(L,"projectionMatrix",ne)):Lt.setValue(L,"projectionMatrix",S.projectionMatrix),Lt.setValue(L,"viewMatrix",S.matrixWorldInverse);let Nr=Lt.map.cameraPosition;Nr!==void 0&&Nr.setValue(L,Ce.setFromMatrixPosition(S.matrixWorld)),U.logarithmicDepthBuffer&&Lt.setValue(L,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&Lt.setValue(L,"isOrthographic",S.isOrthographicCamera===!0),y!==S&&(y=S,Yn=!0,ba=!0)}if(k.isSkinnedMesh){Lt.setOptional(L,k,"bindMatrix"),Lt.setOptional(L,k,"bindMatrixInverse");let ci=k.skeleton;ci&&(ci.boneTexture===null&&ci.computeBoneTexture(),Lt.setValue(L,"boneTexture",ci.boneTexture,T))}k.isBatchedMesh&&(Lt.setOptional(L,k,"batchingTexture"),Lt.setValue(L,"batchingTexture",k._matricesTexture,T),Lt.setOptional(L,k,"batchingIdTexture"),Lt.setValue(L,"batchingIdTexture",k._indirectTexture,T),Lt.setOptional(L,k,"batchingColorTexture"),k._colorsTexture!==null&&Lt.setValue(L,"batchingColorTexture",k._colorsTexture,T));let wa=B.morphAttributes;if((wa.position!==void 0||wa.normal!==void 0||wa.color!==void 0)&&Re.update(k,B,Si),(Yn||Ae.receiveShadow!==k.receiveShadow)&&(Ae.receiveShadow=k.receiveShadow,Lt.setValue(L,"receiveShadow",k.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Vi.envMap.value=xe,Vi.flipEnvMap.value=xe.isCubeTexture&&xe.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&O.environment!==null&&(Vi.envMapIntensity.value=O.environmentIntensity),Yn&&(Lt.setValue(L,"toneMappingExposure",v.toneMappingExposure),Ae.needsLights&&Nt(Vi,ba),re&&z.fog===!0&&ae.refreshFogUniforms(Vi,re),ae.refreshMaterialUniforms(Vi,z,H,j,p.state.transmissionRenderTarget[S.id]),jo.upload(L,Et(Ae),Vi,T)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(jo.upload(L,Et(Ae),Vi,T),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&Lt.setValue(L,"center",k.center),Lt.setValue(L,"modelViewMatrix",k.modelViewMatrix),Lt.setValue(L,"normalMatrix",k.normalMatrix),Lt.setValue(L,"modelMatrix",k.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){let ci=z.uniformsGroups;for(let Nr=0,Lr=ci.length;Nr<Lr;Nr++){let Hg=ci[Nr];P.update(Hg,Si),P.bind(Hg,Si)}}return Si}function Nt(S,O){S.ambientLightColor.needsUpdate=O,S.lightProbe.needsUpdate=O,S.directionalLights.needsUpdate=O,S.directionalLightShadows.needsUpdate=O,S.pointLights.needsUpdate=O,S.pointLightShadows.needsUpdate=O,S.spotLights.needsUpdate=O,S.spotLightShadows.needsUpdate=O,S.rectAreaLights.needsUpdate=O,S.hemisphereLights.needsUpdate=O}function Tn(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(S,O,B){Ie.get(S.texture).__webglTexture=O,Ie.get(S.depthTexture).__webglTexture=B;let z=Ie.get(S);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=B===void 0,z.__autoAllocateDepthBuffer||ke.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,O){let B=Ie.get(S);B.__webglFramebuffer=O,B.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(S,O=0,B=0){A=S,C=O,E=B;let z=!0,k=null,re=!1,se=!1;if(S){let xe=Ie.get(S);if(xe.__useDefaultFramebuffer!==void 0)we.bindFramebuffer(L.FRAMEBUFFER,null),z=!1;else if(xe.__webglFramebuffer===void 0)T.setupRenderTarget(S);else if(xe.__hasExternalTextures)T.rebindTextures(S,Ie.get(S.texture).__webglTexture,Ie.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let Se=S.depthTexture;if(xe.__boundDepthTexture!==Se){if(Se!==null&&Ie.has(Se)&&(S.width!==Se.image.width||S.height!==Se.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(S)}}let Ue=S.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(se=!0);let He=Ie.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(He[O])?k=He[O][B]:k=He[O],re=!0):S.samples>0&&T.useMultisampledRTT(S)===!1?k=Ie.get(S).__webglMultisampledFramebuffer:Array.isArray(He)?k=He[B]:k=He,D.copy(S.viewport),N.copy(S.scissor),F=S.scissorTest}else D.copy(ue).multiplyScalar(H).floor(),N.copy(Pe).multiplyScalar(H).floor(),F=Ze;if(we.bindFramebuffer(L.FRAMEBUFFER,k)&&z&&we.drawBuffers(S,k),we.viewport(D),we.scissor(N),we.setScissorTest(F),re){let xe=Ie.get(S.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+O,xe.__webglTexture,B)}else if(se){let xe=Ie.get(S.texture),Ue=O||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,xe.__webglTexture,B||0,Ue)}x=-1},this.readRenderTargetPixels=function(S,O,B,z,k,re,se){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let he=Ie.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&se!==void 0&&(he=he[se]),he){we.bindFramebuffer(L.FRAMEBUFFER,he);try{let xe=S.texture,Ue=xe.format,He=xe.type;if(!U.textureFormatReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!U.textureTypeReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=S.width-z&&B>=0&&B<=S.height-k&&L.readPixels(O,B,z,k,Oe.convert(Ue),Oe.convert(He),re)}finally{let xe=A!==null?Ie.get(A).__webglFramebuffer:null;we.bindFramebuffer(L.FRAMEBUFFER,xe)}}},this.readRenderTargetPixelsAsync=function(S,O,B,z,k,re,se){return Ea(this,null,function*(){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let he=Ie.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&se!==void 0&&(he=he[se]),he){let xe=S.texture,Ue=xe.format,He=xe.type;if(!U.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!U.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=S.width-z&&B>=0&&B<=S.height-k){we.bindFramebuffer(L.FRAMEBUFFER,he);let Se=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Se),L.bufferData(L.PIXEL_PACK_BUFFER,re.byteLength,L.STREAM_READ),L.readPixels(O,B,z,k,Oe.convert(Ue),Oe.convert(He),0);let We=A!==null?Ie.get(A).__webglFramebuffer:null;we.bindFramebuffer(L.FRAMEBUFFER,We);let ft=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),yield kI(L,ft,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Se),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,re),L.deleteBuffer(Se),L.deleteSync(ft),re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}})},this.copyFramebufferToTexture=function(S,O=null,B=0){S.isTexture!==!0&&(nc("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,S=arguments[1]);let z=Math.pow(2,-B),k=Math.floor(S.image.width*z),re=Math.floor(S.image.height*z),se=O!==null?O.x:0,he=O!==null?O.y:0;T.setTexture2D(S,0),L.copyTexSubImage2D(L.TEXTURE_2D,B,0,0,se,he,k,re),we.unbindTexture()},this.copyTextureToTexture=function(S,O,B=null,z=null,k=0){S.isTexture!==!0&&(nc("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,S=arguments[1],O=arguments[2],k=arguments[3]||0,B=null);let re,se,he,xe,Ue,He,Se,We,ft,gt=S.isCompressedTexture?S.mipmaps[k]:S.image;B!==null?(re=B.max.x-B.min.x,se=B.max.y-B.min.y,he=B.isBox3?B.max.z-B.min.z:1,xe=B.min.x,Ue=B.min.y,He=B.isBox3?B.min.z:0):(re=gt.width,se=gt.height,he=gt.depth||1,xe=0,Ue=0,He=0),z!==null?(Se=z.x,We=z.y,ft=z.z):(Se=0,We=0,ft=0);let Ft=Oe.convert(O.format),_t=Oe.convert(O.type),Ae;O.isData3DTexture?(T.setTexture3D(O,0),Ae=L.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(T.setTexture2DArray(O,0),Ae=L.TEXTURE_2D_ARRAY):(T.setTexture2D(O,0),Ae=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,O.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,O.unpackAlignment);let Qi=L.getParameter(L.UNPACK_ROW_LENGTH),vt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Si=L.getParameter(L.UNPACK_SKIP_PIXELS),co=L.getParameter(L.UNPACK_SKIP_ROWS),Yn=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,gt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,gt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,xe),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ue),L.pixelStorei(L.UNPACK_SKIP_IMAGES,He);let ba=S.isDataArrayTexture||S.isData3DTexture,Lt=O.isDataArrayTexture||O.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){let Vi=Ie.get(S),wa=Ie.get(O),ci=Ie.get(Vi.__renderTarget),Nr=Ie.get(wa.__renderTarget);we.bindFramebuffer(L.READ_FRAMEBUFFER,ci.__webglFramebuffer),we.bindFramebuffer(L.DRAW_FRAMEBUFFER,Nr.__webglFramebuffer);for(let Lr=0;Lr<he;Lr++)ba&&L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ie.get(S).__webglTexture,k,He+Lr),S.isDepthTexture?(Lt&&L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ie.get(O).__webglTexture,k,ft+Lr),L.blitFramebuffer(xe,Ue,re,se,Se,We,re,se,L.DEPTH_BUFFER_BIT,L.NEAREST)):Lt?L.copyTexSubImage3D(Ae,k,Se,We,ft+Lr,xe,Ue,re,se):L.copyTexSubImage2D(Ae,k,Se,We,ft+Lr,xe,Ue,re,se);we.bindFramebuffer(L.READ_FRAMEBUFFER,null),we.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Lt?S.isDataTexture||S.isData3DTexture?L.texSubImage3D(Ae,k,Se,We,ft,re,se,he,Ft,_t,gt.data):O.isCompressedArrayTexture?L.compressedTexSubImage3D(Ae,k,Se,We,ft,re,se,he,Ft,gt.data):L.texSubImage3D(Ae,k,Se,We,ft,re,se,he,Ft,_t,gt):S.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,k,Se,We,re,se,Ft,_t,gt.data):S.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,k,Se,We,gt.width,gt.height,Ft,gt.data):L.texSubImage2D(L.TEXTURE_2D,k,Se,We,re,se,Ft,_t,gt);L.pixelStorei(L.UNPACK_ROW_LENGTH,Qi),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,vt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Si),L.pixelStorei(L.UNPACK_SKIP_ROWS,co),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Yn),k===0&&O.generateMipmaps&&L.generateMipmap(Ae),we.unbindTexture()},this.copyTextureToTexture3D=function(S,O,B=null,z=null,k=0){return S.isTexture!==!0&&(nc("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,z=arguments[1]||null,S=arguments[2],O=arguments[3],k=arguments[4]||0),nc('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,O,B,z,k)},this.initRenderTarget=function(S){Ie.get(S).__webglFramebuffer===void 0&&T.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?T.setTextureCube(S,0):S.isData3DTexture?T.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?T.setTexture2DArray(S,0):T.setTexture2D(S,0),we.unbindTexture()},this.resetState=function(){C=0,E=0,A=null,we.reset(),ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _r}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=ut._getDrawingBufferColorSpace(e),t.unpackColorSpace=ut._getUnpackColorSpace()}};var Ru=class extends Hs{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ko,this.environmentIntensity=1,this.environmentRotation=new Ko,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var om=class extends Us{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new ot(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},rx=new Kt,am=new yu,su=new Jo,ou=new $,Pu=class extends Hs{constructor(e=new $i,t=new om){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),su.copy(n.boundingSphere),su.applyMatrix4(r),su.radius+=s,e.ray.intersectsSphere(su)===!1)return;rx.copy(r).invert(),am.copy(e.ray).applyMatrix4(rx);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,f=n.attributes.position;if(l!==null){let h=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=h,_=d;g<_;g++){let m=l.getX(g);ou.fromBufferAttribute(f,m),sx(ou,m,c,r,e,t,this)}}else{let h=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let g=h,_=d;g<_;g++)ou.fromBufferAttribute(f,g),sx(ou,g,c,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function sx(i,e,t,n,r,s,o){let a=am.distanceSqToPoint(i);if(a<t){let c=new $;am.closestPointToPoint(i,c),c.applyMatrix4(n);let l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}function au(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function PP(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var ea=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=r,r=t[++n],e<r)break e}o=t.length;break t}if(!(e>=s)){let a=t[1];e<a&&(n=2,s=a);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(r=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},cm=class extends ea{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:c0,endingEnd:c0}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],c=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case l0:s=e,a=2*t-n;break;case u0:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case l0:o=e,c=2*n-t;break;case u0:o=1,c=n+r[1]-r[0];break;default:o=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,d=this._weightNext,g=(n-t)/(r-t),_=g*g,m=_*g,p=-h*m+2*h*_-h*g,b=(1+h)*m+(-1.5-2*h)*_+(-.5+h)*g+1,w=(-1-d)*m+(1.5+d)*_+.5*g,v=d*m-d*_;for(let I=0;I!==a;++I)s[I]=p*o[u+I]+b*o[l+I]+w*o[c+I]+v*o[f+I];return s}},lm=class extends ea{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(r-t),f=1-u;for(let h=0;h!==a;++h)s[h]=o[l+h]*f+o[c+h]*u;return s}},um=class extends ea{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Fi=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=au(t,this.TimeBufferType),this.values=au(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:au(e.times,Array),values:au(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new um(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new lm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new cm(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case pu:t=this.InterpolantFactoryMethodDiscrete;break;case zp:t=this.InterpolantFactoryMethodLinear;break;case Ch:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return pu;case this.InterpolantFactoryMethodLinear:return zp;case this.InterpolantFactoryMethodSmooth:return Ch}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,s=0,o=r-1;for(;s!==r&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(r!==void 0&&PP(r))for(let a=0,c=r.length;a!==c;++a){let l=r[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Ch,s=e.length-1,o=1;for(let a=1;a<s;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{let f=a*n,h=f-n,d=f+n;for(let g=0;g!==n;++g){let _=t[f+g];if(_!==t[h+g]||_!==t[d+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let f=a*n,h=o*n;for(let d=0;d!==n;++d)t[h+d]=t[f+d]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Fi.prototype.TimeBufferType=Float32Array;Fi.prototype.ValueBufferType=Float32Array;Fi.prototype.DefaultInterpolation=zp;var Bs=class extends Fi{constructor(e,t,n){super(e,t,n)}};Bs.prototype.ValueTypeName="bool";Bs.prototype.ValueBufferType=Array;Bs.prototype.DefaultInterpolation=pu;Bs.prototype.InterpolantFactoryMethodLinear=void 0;Bs.prototype.InterpolantFactoryMethodSmooth=void 0;var dm=class extends Fi{};dm.prototype.ValueTypeName="color";var fm=class extends Fi{};fm.prototype.ValueTypeName="number";var hm=class extends ea{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(r-t),l=e*a;for(let u=l+a;l!==u;l+=4)es.slerpFlat(s,0,o,l-a,o,l,c);return s}},Nu=class extends Fi{InterpolantFactoryMethodLinear(e){return new hm(this.times,this.values,this.getValueSize(),e)}};Nu.prototype.ValueTypeName="quaternion";Nu.prototype.InterpolantFactoryMethodSmooth=void 0;var Vs=class extends Fi{constructor(e,t,n){super(e,t,n)}};Vs.prototype.ValueTypeName="string";Vs.prototype.ValueBufferType=Array;Vs.prototype.DefaultInterpolation=pu;Vs.prototype.InterpolantFactoryMethodLinear=void 0;Vs.prototype.InterpolantFactoryMethodSmooth=void 0;var pm=class extends Fi{};pm.prototype.ValueTypeName="vector";var wm="\\[\\]\\.:\\/",NP=new RegExp("["+wm+"]","g"),Em="[^"+wm+"]",LP="[^"+wm.replace("\\.","")+"]",OP=/((?:WC+[\/:])*)/.source.replace("WC",Em),kP=/(WCOD+)?/.source.replace("WCOD",LP),FP=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Em),UP=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Em),BP=new RegExp("^"+OP+kP+FP+UP+"$"),VP=["material","materials","bones","map"],mm=class{constructor(e,t,n){let r=n||$t.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},$t=(()=>{class i{constructor(t,n,r){this.path=n,this.parsedPath=r||i.parseTrackName(n),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new i.Composite(t,n,r):new i(t,n,r)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(NP,"")}static parseTrackName(t){let n=BP.exec(t);if(n===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let r={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},s=r.nodeName&&r.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let o=r.nodeName.substring(s+1);VP.indexOf(o)!==-1&&(r.nodeName=r.nodeName.substring(0,s),r.objectName=o)}if(r.propertyName===null||r.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return r}static findNode(t,n){if(n===void 0||n===""||n==="."||n===-1||n===t.name||n===t.uuid)return t;if(t.skeleton){let r=t.skeleton.getBoneByName(n);if(r!==void 0)return r}if(t.children){let r=function(o){for(let a=0;a<o.length;a++){let c=o[a];if(c.name===n||c.uuid===n)return c;let l=r(c.children);if(l)return l}return null},s=r(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,n){t[n]=this.targetObject[this.propertyName]}_getValue_array(t,n){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)t[n++]=r[s]}_getValue_arrayElement(t,n){t[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,n){this.resolvedProperty.toArray(t,n)}_setValue_direct(t,n){this.targetObject[this.propertyName]=t[n]}_setValue_direct_setNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,n){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[n++]}_setValue_array_setNeedsUpdate(t,n){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,n){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,n){this.resolvedProperty[this.propertyIndex]=t[n]}_setValue_arrayElement_setNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,n){this.resolvedProperty.fromArray(t,n)}_setValue_fromArray_setNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,n){this.bind(),this.getValue(t,n)}_setValue_unbound(t,n){this.bind(),this.setValue(t,n)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,s=n.propertyName,o=n.propertyIndex;if(t||(t=i.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let u=n.objectIndex;switch(r){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let f=0;f<t.length;f++)if(t[f].name===u){u=f;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[r]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[r]}if(u!==void 0){if(t[u]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[u]}}let a=t[s];if(a===void 0){let u=n.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+u+"."+s+" but it wasn't found.",t);return}let c=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?c=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(o!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[o]!==void 0&&(o=t.morphTargetDictionary[o])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=o}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}return i.Composite=mm,i})();$t.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};$t.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};$t.prototype.GetterByBindingType=[$t.prototype._getValue_direct,$t.prototype._getValue_array,$t.prototype._getValue_arrayElement,$t.prototype._getValue_toArray];$t.prototype.SetterByBindingTypeAndVersioning=[[$t.prototype._setValue_direct,$t.prototype._setValue_direct_setNeedsUpdate,$t.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[$t.prototype._setValue_array,$t.prototype._setValue_array_setNeedsUpdate,$t.prototype._setValue_array_setMatrixWorldNeedsUpdate],[$t.prototype._setValue_arrayElement,$t.prototype._setValue_arrayElement_setNeedsUpdate,$t.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[$t.prototype._setValue_fromArray,$t.prototype._setValue_fromArray_setNeedsUpdate,$t.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ik=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:gm}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=gm);function Sr(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function Ox(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,i.__proto__=e}var $n={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},ra={duration:.5,overwrite:!1,delay:0},Gm,pn,kt,_i=1e8,At=1/_i,Nm=Math.PI*2,HP=Nm/4,GP=0,kx=Math.sqrt,WP=Math.cos,jP=Math.sin,sn=function(e){return typeof e=="string"},Ht=function(e){return typeof e=="function"},wr=function(e){return typeof e=="number"},$u=function(e){return typeof e>"u"},Yi=function(e){return typeof e=="object"},jn=function(e){return e!==!1},Wm=function(){return typeof window<"u"},Fu=function(e){return Ht(e)||sn(e)},Fx=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},xn=Array.isArray,$P=/random\([^)]+\)/g,qP=/,\s*/g,Cx=/(?:-?\.?\d|\.)+/gi,jm=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,$s=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Tm=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,$m=/[+-]=-?[.\d]+/,XP=/[^,'"\[\]\s]+/gi,YP=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Bt,qi,Lm,qm,ti={},zu={},Ux,Bx=function(e){return(zu=sa(e,ti))&&Mn},qu=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},pc=function(e,t){return!t&&console.warn(e)},Vx=function(e,t){return e&&(ti[e]=t)&&zu&&(zu[e]=t)||ti},mc=function(){return 0},ZP={suppressEvents:!0,isStart:!0,kill:!1},Uu={suppressEvents:!0,kill:!1},JP={suppressEvents:!0},Xm={},ns=[],Om={},zx,Gn={},Cm={},Ix=30,Bu=[],Ym="",Zm=function(e){var t=e[0],n,r;if(Yi(t)||Ht(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=Bu.length;r--&&!Bu[r].targetTest(t););n=Bu[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new eg(e[r],n)))||e.splice(r,1);return e},is=function(e){return e._gsap||Zm(vi(e))[0]._gsap},Jm=function(e,t,n){return(n=e[t])&&Ht(n)?e[t]():$u(n)&&e.getAttribute&&e.getAttribute(t)||n},Dn=function(e,t){return(e=e.split(",")).forEach(t)||e},Gt=function(e){return Math.round(e*1e5)/1e5||0},Ut=function(e){return Math.round(e*1e7)/1e7||0},qs=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+r:n==="-"?e-r:n==="*"?e*r:e/r},KP=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},Hu=function(){var e=ns.length,t=ns.slice(0),n,r;for(Om={},ns.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},Km=function(e){return!!(e._initted||e._startAt||e.add)},Hx=function(e,t,n,r){ns.length&&!pn&&Hu(),e.render(t,n,r||!!(pn&&t<0&&Km(e))),ns.length&&!pn&&Hu()},Gx=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(XP).length<2?t:sn(e)?e.trim():e},Wx=function(e){return e},ni=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},QP=function(e){return function(t,n){for(var r in n)r in t||r==="duration"&&e||r==="ease"||(t[r]=n[r])}},sa=function(e,t){for(var n in t)e[n]=t[n];return e},Ax=function i(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=Yi(t[n])?i(e[n]||(e[n]={}),t[n]):t[n]);return e},Gu=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},dc=function(e){var t=e.parent||Bt,n=e.keyframes?QP(xn(e.keyframes)):ni;if(jn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},eN=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},jx=function(e,t,n,r,s){n===void 0&&(n="_first"),r===void 0&&(r="_last");var o=e[r],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=o,t.parent=t._dp=e,t},Xu=function(e,t,n,r){n===void 0&&(n="_first"),r===void 0&&(r="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[r]===t&&(e[r]=s),t._next=t._prev=t.parent=null},rs=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Gs=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},tN=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},km=function(e,t,n,r){return e._startAt&&(pn?e._startAt.revert(Uu):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},nN=function i(e){return!e||e._ts&&i(e.parent)},Dx=function(e){return e._repeat?oa(e._tTime,e=e.duration()+e._rDelay)*e:0},oa=function(e,t){var n=Math.floor(e=Ut(e/t));return e&&n===e?n-1:n},Wu=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Yu=function(e){return e._end=Ut(e._start+(e._tDur/Math.abs(e._ts||e._rts||At)||0))},Zu=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=Ut(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Yu(e),n._dirty||Gs(n,e)),e},$x=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Wu(e.rawTime(),t),(!t._dur||vc(0,t.totalDuration(),n)-t._tTime>At)&&t.render(n,!0)),Gs(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-At}},Xi=function(e,t,n,r){return t.parent&&rs(t),t._start=Ut((wr(n)?n:n||e!==Bt?gi(e,n,t):e._time)+t._delay),t._end=Ut(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),jx(e,t,"_first","_last",e._sort?"_start":0),Fm(t)||(e._recent=t),r||$x(e,t),e._ts<0&&Zu(e,e._tTime),e},qx=function(e,t){return(ti.ScrollTrigger||qu("scrollTrigger",t))&&ti.ScrollTrigger.create(t,e)},Xx=function(e,t,n,r,s){if(ig(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!pn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&zx!==Wn.frame)return ns.push(e),e._lazy=[s,r],1},iN=function i(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||i(t))},Fm=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},rN=function(e,t,n,r){var s=e.ratio,o=t<0||!t&&(!e._start&&iN(e)&&!(!e._initted&&Fm(e))||(e._ts<0||e._dp._ts<0)&&!Fm(e))?0:1,a=e._rDelay,c=0,l,u,f;if(a&&e._repeat&&(c=vc(0,e._tDur,t),u=oa(c,a),e._yoyo&&u&1&&(o=1-o),u!==oa(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||pn||r||e._zTime===At||!t&&e._zTime){if(!e._initted&&Xx(e,t,r,n,c))return;for(f=e._zTime,e._zTime=t||(n?At:0),n||(n=t&&!f),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=c,l=e._pt;l;)l.r(o,l.d),l=l._next;t<0&&km(e,t,n,!0),e._onUpdate&&!n&&ei(e,"onUpdate"),c&&e._repeat&&!n&&e.parent&&ei(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&rs(e,1),!n&&!pn&&(ei(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},sN=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},aa=function(e,t,n,r){var s=e._repeat,o=Ut(t)||0,a=e._tTime/e._tDur;return a&&!r&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:Ut(o*(s+1)+e._rDelay*s):o,a>0&&!r&&Zu(e,e._tTime=e._tDur*a),e.parent&&Yu(e),n||Gs(e.parent,e),e},Rx=function(e){return e instanceof hn?Gs(e):aa(e,e._dur)},oN={_start:0,endTime:mc,totalDuration:mc},gi=function i(e,t,n){var r=e.labels,s=e._recent||oN,o=e.duration()>=_i?s.endTime(!1):e._dur,a,c,l;return sn(t)&&(isNaN(t)||t in r)?(c=t.charAt(0),l=t.substr(-1)==="%",a=t.indexOf("="),c==="<"||c===">"?(a>=0&&(t=t.replace(/=/,"")),(c==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(l?(a<0?s:n).totalDuration()/100:1)):a<0?(t in r||(r[t]=o),r[t]):(c=parseFloat(t.charAt(a-1)+t.substr(a+1)),l&&n&&(c=c/100*(xn(n)?n[0]:n).totalDuration()),a>1?i(e,t.substr(0,a-1),n)+c:o+c)):t==null?o:+t},fc=function(e,t,n){var r=wr(t[1]),s=(r?2:1)+(e<2?0:1),o=t[s],a,c;if(r&&(o.duration=t[1]),o.parent=n,e){for(a=o,c=n;c&&!("immediateRender"in a);)a=c.vars.defaults||{},c=jn(c.vars.inherit)&&c.parent;o.immediateRender=jn(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new Xt(t[0],o,t[s+1])},ss=function(e,t){return e||e===0?t(e):t},vc=function(e,t,n){return n<e?e:n>t?t:n},mn=function(e,t){return!sn(e)||!(t=YP.exec(e))?"":t[1]},aN=function(e,t,n){return ss(n,function(r){return vc(e,t,r)})},Um=[].slice,Yx=function(e,t){return e&&Yi(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Yi(e[0]))&&!e.nodeType&&e!==qi},cN=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(r){var s;return sn(r)&&!t||Yx(r,1)?(s=n).push.apply(s,vi(r)):n.push(r)})||n},vi=function(e,t,n){return kt&&!t&&kt.selector?kt.selector(e):sn(e)&&!n&&(Lm||!ca())?Um.call((t||qm).querySelectorAll(e),0):xn(e)?cN(e,n):Yx(e)?Um.call(e,0):e?[e]:[]},Bm=function(e){return e=vi(e)[0]||pc("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return vi(t,n.querySelectorAll?n:n===e?pc("Invalid scope")||qm.createElement("div"):e)}},Zx=function(e){return e.sort(function(){return .5-Math.random()})},Jx=function(e){if(Ht(e))return e;var t=Yi(e)?e:{each:e},n=Ws(t.ease),r=t.from||0,s=parseFloat(t.base)||0,o={},a=r>0&&r<1,c=isNaN(r)||a,l=t.axis,u=r,f=r;return sn(r)?u=f={center:.5,edges:.5,end:1}[r]||0:!a&&c&&(u=r[0],f=r[1]),function(h,d,g){var _=(g||t).length,m=o[_],p,b,w,v,I,C,E,A,x;if(!m){if(x=t.grid==="auto"?0:(t.grid||[1,_i])[1],!x){for(E=-_i;E<(E=g[x++].getBoundingClientRect().left)&&x<_;);x<_&&x--}for(m=o[_]=[],p=c?Math.min(x,_)*u-.5:r%x,b=x===_i?0:c?_*f/x-.5:r/x|0,E=0,A=_i,C=0;C<_;C++)w=C%x-p,v=b-(C/x|0),m[C]=I=l?Math.abs(l==="y"?v:w):kx(w*w+v*v),I>E&&(E=I),I<A&&(A=I);r==="random"&&Zx(m),m.max=E-A,m.min=A,m.v=_=(parseFloat(t.amount)||parseFloat(t.each)*(x>_?_-1:l?l==="y"?_/x:x:Math.max(x,_/x))||0)*(r==="edges"?-1:1),m.b=_<0?s-_:s,m.u=mn(t.amount||t.each)||0,n=n&&_<0?oM(n):n}return _=(m[h]-m.min)/m.max||0,Ut(m.b+(n?n(_):_)*m.v)+m.u}},Vm=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var r=Ut(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(wr(n)?0:mn(n))}},Kx=function(e,t){var n=xn(e),r,s;return!n&&Yi(e)&&(r=n=e.radius||_i,e.values?(e=vi(e.values),(s=!wr(e[0]))&&(r*=r)):e=Vm(e.increment)),ss(t,n?Ht(e)?function(o){return s=e(o),Math.abs(s-o)<=r?s:o}:function(o){for(var a=parseFloat(s?o.x:o),c=parseFloat(s?o.y:0),l=_i,u=0,f=e.length,h,d;f--;)s?(h=e[f].x-a,d=e[f].y-c,h=h*h+d*d):h=Math.abs(e[f]-a),h<l&&(l=h,u=f);return u=!r||l<=r?e[u]:o,s||u===o||wr(o)?u:u+mn(o)}:Vm(e))},Qx=function(e,t,n,r){return ss(xn(e)?!t:n===!0?!!(n=0):!r,function(){return xn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(r=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},lN=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(r){return t.reduce(function(s,o){return o(s)},r)}},uN=function(e,t){return function(n){return e(parseFloat(n))+(t||mn(n))}},dN=function(e,t,n){return tM(e,t,0,1,n)},eM=function(e,t,n){return ss(n,function(r){return e[~~t(r)]})},fN=function i(e,t,n){var r=t-e;return xn(e)?eM(e,i(0,e.length),t):ss(n,function(s){return(r+(s-e)%r)%r+e})},hN=function i(e,t,n){var r=t-e,s=r*2;return xn(e)?eM(e,i(0,e.length-1),t):ss(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>r?s-o:o)})},la=function(e){return e.replace($P,function(t){var n=t.indexOf("[")+1,r=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(qP);return Qx(n?r:+r[0],n?0:+r[1],+r[2]||1e-5)})},tM=function(e,t,n,r,s){var o=t-e,a=r-n;return ss(s,function(c){return n+((c-e)/o*a||0)})},pN=function i(e,t,n,r){var s=isNaN(e+t)?0:function(d){return(1-d)*e+d*t};if(!s){var o=sn(e),a={},c,l,u,f,h;if(n===!0&&(r=1)&&(n=null),o)e={p:e},t={p:t};else if(xn(e)&&!xn(t)){for(u=[],f=e.length,h=f-2,l=1;l<f;l++)u.push(i(e[l-1],e[l]));f--,s=function(g){g*=f;var _=Math.min(h,~~g);return u[_](g-_)},n=t}else r||(e=sa(xn(e)?[]:{},e));if(!u){for(c in t)tg.call(a,e,c,"get",t[c]);s=function(g){return og(g,a)||(o?e.p:e)}}}return ss(n,s)},Px=function(e,t,n){var r=e.labels,s=_i,o,a,c;for(o in r)a=r[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(c=o,s=a);return c},ei=function(e,t,n){var r=e.vars,s=r[t],o=kt,a=e._ctx,c,l,u;if(s)return c=r[t+"Params"],l=r.callbackScope||e,n&&ns.length&&Hu(),a&&(kt=a),u=c?s.apply(l,c):s.call(l),kt=o,u},lc=function(e){return rs(e),e.scrollTrigger&&e.scrollTrigger.kill(!!pn),e.progress()<1&&ei(e,"onInterrupt"),e},ia,nM=[],iM=function(e){if(e)if(e=!e.name&&e.default||e,Wm()||e.headless){var t=e.name,n=Ht(e),r=t&&!n&&e.init?function(){this._props=[]}:e,s={init:mc,render:og,add:tg,kill:DN,modifier:AN,rawVars:0},o={targetTest:0,get:0,getSetter:Ju,aliases:{},register:0};if(ca(),e!==r){if(Gn[t])return;ni(r,ni(Gu(e,s),o)),sa(r.prototype,sa(s,Gu(e,o))),Gn[r.prop=t]=r,e.targetTest&&(Bu.push(r),Xm[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}Vx(t,r),e.register&&e.register(Mn,r,Rn)}else nM.push(e)},It=255,uc={aqua:[0,It,It],lime:[0,It,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,It],navy:[0,0,128],white:[It,It,It],olive:[128,128,0],yellow:[It,It,0],orange:[It,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[It,0,0],pink:[It,192,203],cyan:[0,It,It],transparent:[It,It,It,0]},Im=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*It+.5|0},rM=function(e,t,n){var r=e?wr(e)?[e>>16,e>>8&It,e&It]:0:uc.black,s,o,a,c,l,u,f,h,d,g;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),uc[e])r=uc[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&It,r&It,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&It,e&It]}else if(e.substr(0,3)==="hsl"){if(r=g=e.match(Cx),!t)c=+r[0]%360/360,l=+r[1]/100,u=+r[2]/100,o=u<=.5?u*(l+1):u+l-u*l,s=u*2-o,r.length>3&&(r[3]*=1),r[0]=Im(c+1/3,s,o),r[1]=Im(c,s,o),r[2]=Im(c-1/3,s,o);else if(~e.indexOf("="))return r=e.match(jm),n&&r.length<4&&(r[3]=1),r}else r=e.match(Cx)||uc.transparent;r=r.map(Number)}return t&&!g&&(s=r[0]/It,o=r[1]/It,a=r[2]/It,f=Math.max(s,o,a),h=Math.min(s,o,a),u=(f+h)/2,f===h?c=l=0:(d=f-h,l=u>.5?d/(2-f-h):d/(f+h),c=f===s?(o-a)/d+(o<a?6:0):f===o?(a-s)/d+2:(s-o)/d+4,c*=60),r[0]=~~(c+.5),r[1]=~~(l*100+.5),r[2]=~~(u*100+.5)),n&&r.length<4&&(r[3]=1),r},sM=function(e){var t=[],n=[],r=-1;return e.split(br).forEach(function(s){var o=s.match($s)||[];t.push.apply(t,o),n.push(r+=o.length+1)}),t.c=n,t},Nx=function(e,t,n){var r="",s=(e+r).match(br),o=t?"hsla(":"rgba(",a=0,c,l,u,f;if(!s)return e;if(s=s.map(function(h){return(h=rM(h,t,1))&&o+(t?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),n&&(u=sM(e),c=n.c,c.join(r)!==u.c.join(r)))for(l=e.replace(br,"1").split($s),f=l.length-1;a<f;a++)r+=l[a]+(~c.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!l)for(l=e.split(br),f=l.length-1;a<f;a++)r+=l[a]+s[a];return r+l[f]},br=function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in uc)i+="|"+e+"\\b";return new RegExp(i+")","gi")}(),mN=/hsl[a]?\(/,Qm=function(e){var t=e.join(" "),n;if(br.lastIndex=0,br.test(t))return n=mN.test(t),e[1]=Nx(e[1],n),e[0]=Nx(e[0],n,sM(e[1])),!0},gc,Wn=function(){var i=Date.now,e=500,t=33,n=i(),r=n,s=1e3/240,o=s,a=[],c,l,u,f,h,d,g=function _(m){var p=i()-r,b=m===!0,w,v,I,C;if((p>e||p<0)&&(n+=p-t),r+=p,I=r-n,w=I-o,(w>0||b)&&(C=++f.frame,h=I-f.time*1e3,f.time=I=I/1e3,o+=w+(w>=s?4:s-w),v=1),b||(c=l(_)),v)for(d=0;d<a.length;d++)a[d](I,h,C,m)};return f={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return h/(1e3/(m||60))},wake:function(){Ux&&(!Lm&&Wm()&&(qi=Lm=window,qm=qi.document||{},ti.gsap=Mn,(qi.gsapVersions||(qi.gsapVersions=[])).push(Mn.version),Bx(zu||qi.GreenSockGlobals||!qi.gsap&&qi||{}),nM.forEach(iM)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,c&&f.sleep(),l=u||function(m){return setTimeout(m,o-f.time*1e3+1|0)},gc=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),gc=0,l=mc},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),o=f.time*1e3+s},add:function(m,p,b){var w=p?function(v,I,C,E){m(v,I,C,E),f.remove(w)}:m;return f.remove(m),a[b?"unshift":"push"](w),ca(),w},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&d>=p&&d--},_listeners:a},f}(),ca=function(){return!gc&&Wn.wake()},at={},gN=/^[\d.\-M][\d.\-,\s]/,_N=/["']/g,vN=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),r=n[0],s=1,o=n.length,a,c,l;s<o;s++)c=n[s],a=s!==o-1?c.lastIndexOf(","):c.length,l=c.substr(0,a),t[r]=isNaN(l)?l.replace(_N,"").trim():+l,r=c.substr(a+1).trim();return t},yN=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<n?e.indexOf(")",n+1):n)},xN=function(e){var t=(e+"").split("("),n=at[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[vN(t[1])]:yN(e).split(",").map(Gx)):at._CE&&gN.test(e)?at._CE("",e):n},oM=function(e){return function(t){return 1-e(1-t)}},aM=function i(e,t){for(var n=e._first,r;n;)n instanceof hn?i(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?i(n.timeline,t):(r=n._ease,n._ease=n._yEase,n._yEase=r,n._yoyo=t)),n=n._next},Ws=function(e,t){return e&&(Ht(e)?e:at[e]||xN(e))||t},Xs=function(e,t,n,r){n===void 0&&(n=function(c){return 1-t(1-c)}),r===void 0&&(r=function(c){return c<.5?t(c*2)/2:1-t((1-c)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:r},o;return Dn(e,function(a){at[a]=ti[a]=s,at[o=a.toLowerCase()]=n;for(var c in s)at[o+(c==="easeIn"?".in":c==="easeOut"?".out":".inOut")]=at[a+"."+c]=s[c]}),s},cM=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Am=function i(e,t,n){var r=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/Nm*(Math.asin(1/r)||0),a=function(u){return u===1?1:r*Math.pow(2,-10*u)*jP((u-o)*s)+1},c=e==="out"?a:e==="in"?function(l){return 1-a(1-l)}:cM(a);return s=Nm/s,c.config=function(l,u){return i(e,l,u)},c},Dm=function i(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},r=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:cM(n);return r.config=function(s){return i(e,s)},r};Dn("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,e){var t=e<5?e+1:e;Xs(i+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});at.Linear.easeNone=at.none=at.Linear.easeIn;Xs("Elastic",Am("in"),Am("out"),Am());(function(i,e){var t=1/e,n=2*t,r=2.5*t,s=function(a){return a<t?i*a*a:a<n?i*Math.pow(a-1.5/e,2)+.75:a<r?i*(a-=2.25/e)*a+.9375:i*Math.pow(a-2.625/e,2)+.984375};Xs("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);Xs("Expo",function(i){return Math.pow(2,10*(i-1))*i+i*i*i*i*i*i*(1-i)});Xs("Circ",function(i){return-(kx(1-i*i)-1)});Xs("Sine",function(i){return i===1?1:-WP(i*HP)+1});Xs("Back",Dm("in"),Dm("out"),Dm());at.SteppedEase=at.steps=ti.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+(t?0:1),s=t?1:0,o=1-At;return function(a){return((r*vc(0,o,a)|0)+s)*n}}};ra.ease=at["quad.out"];Dn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return Ym+=i+","+i+"Params,"});var eg=function(e,t){this.id=GP++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Jm,this.set=t?t.getSetter:Ju},_c=function(){function i(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,aa(this,+t.duration,1,1),this.data=t.data,kt&&(this._ctx=kt,kt.data.push(this)),gc||Wn.wake()}var e=i.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,aa(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,r){if(ca(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Zu(this,n),!s._dp||s.parent||$x(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Xi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===At||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Hx(this,n,r)),this},e.time=function(n,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Dx(this))%(this._dur+this._rDelay)||(n?this._dur:0),r):this._time},e.totalProgress=function(n,r){return arguments.length?this.totalTime(this.totalDuration()*n,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Dx(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,r):this._repeat?oa(this._tTime,s)+1:1},e.timeScale=function(n,r){if(!arguments.length)return this._rts===-At?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Wu(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-At?0:this._rts,this.totalTime(vc(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),Yu(this),tN(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(ca(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==At&&(this._tTime-=At)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=Ut(n);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&Xi(r,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(jn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var r=this.parent||this._dp;return r?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Wu(r.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=JP);var r=pn;return pn=n,Km(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),pn=r,this},e.globalTime=function(n){for(var r=this,s=arguments.length?n:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Rx(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var r=this._time;return this._rDelay=n,Rx(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,r){return this.totalTime(gi(this,n),jn(r))},e.restart=function(n,r){return this.play().totalTime(n?-this._delay:0,jn(r)),this._dur||(this._zTime=-At),this},e.play=function(n,r){return n!=null&&this.seek(n,r),this.reversed(!1).paused(!1)},e.reverse=function(n,r){return n!=null&&this.seek(n||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(n,r){return n!=null&&this.seek(n,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-At:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-At,this},e.isActive=function(){var n=this.parent||this._dp,r=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=r&&s<this.endTime(!0)-At)},e.eventCallback=function(n,r,s){var o=this.vars;return arguments.length>1?(r?(o[n]=r,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=r)):delete o[n],this):o[n]},e.then=function(n){var r=this,s=r._prom;return new Promise(function(o){var a=Ht(n)?n:Wx,c=function(){var u=r.then;r.then=null,s&&s(),Ht(a)&&(a=a(r))&&(a.then||a===r)&&(r.then=u),o(a),r.then=u};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?c():r._prom=c})},e.kill=function(){lc(this)},i}();ni(_c.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-At,_prom:0,_ps:!1,_rts:1});var hn=function(i){Ox(e,i);function e(n,r){var s;return n===void 0&&(n={}),s=i.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=jn(n.sortChildren),Bt&&Xi(n.parent||Bt,Sr(s),r),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&qx(Sr(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(r,s,o){return fc(0,arguments,this),this},t.from=function(r,s,o){return fc(1,arguments,this),this},t.fromTo=function(r,s,o,a){return fc(2,arguments,this),this},t.set=function(r,s,o){return s.duration=0,s.parent=this,dc(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Xt(r,s,gi(this,o),1),this},t.call=function(r,s,o){return Xi(this,Xt.delayedCall(0,r,s),o)},t.staggerTo=function(r,s,o,a,c,l,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=l,o.onCompleteParams=u,o.parent=this,new Xt(r,o,gi(this,c)),this},t.staggerFrom=function(r,s,o,a,c,l,u){return o.runBackwards=1,dc(o).immediateRender=jn(o.immediateRender),this.staggerTo(r,s,o,a,c,l,u)},t.staggerFromTo=function(r,s,o,a,c,l,u,f){return a.startAt=o,dc(a).immediateRender=jn(a.immediateRender),this.staggerTo(r,s,a,c,l,u,f)},t.render=function(r,s,o){var a=this._time,c=this._dirty?this.totalDuration():this._tDur,l=this._dur,u=r<=0?0:Ut(r),f=this._zTime<0!=r<0&&(this._initted||!l),h,d,g,_,m,p,b,w,v,I,C,E;if(this!==Bt&&u>c&&r>=0&&(u=c),u!==this._tTime||o||f){if(a!==this._time&&l&&(u+=this._time-a,r+=this._time-a),h=u,v=this._start,w=this._ts,p=!w,f&&(l||(a=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(C=this._yoyo,m=l+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,s,o);if(h=Ut(u%m),u===c?(_=this._repeat,h=l):(I=Ut(u/m),_=~~I,_&&_===I&&(h=l,_--),h>l&&(h=l)),I=oa(this._tTime,m),!a&&this._tTime&&I!==_&&this._tTime-I*m-this._dur<=0&&(I=_),C&&_&1&&(h=l-h,E=1),_!==I&&!this._lock){var A=C&&I&1,x=A===(C&&_&1);if(_<I&&(A=!A),a=A?0:u%l?l:u,this._lock=1,this.render(a||(E?0:Ut(_*m)),s,!l)._lock=0,this._tTime=u,!s&&this.parent&&ei(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1,I=_),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(l=this._dur,c=this._tDur,x&&(this._lock=2,a=A?l:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;aM(this,E)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(b=sN(this,Ut(a),Ut(h)),b&&(u-=h-(h=b._start))),this._tTime=u,this._time=h,this._act=!w,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&u&&l&&!s&&!I&&(ei(this,"onStart"),this._tTime!==u))return this;if(h>=a&&r>=0)for(d=this._first;d;){if(g=d._next,(d._act||h>=d._start)&&d._ts&&b!==d){if(d.parent!==this)return this.render(r,s,o);if(d.render(d._ts>0?(h-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(h-d._start)*d._ts,s,o),h!==this._time||!this._ts&&!p){b=0,g&&(u+=this._zTime=-At);break}}d=g}else{d=this._last;for(var y=r<0?r:h;d;){if(g=d._prev,(d._act||y<=d._end)&&d._ts&&b!==d){if(d.parent!==this)return this.render(r,s,o);if(d.render(d._ts>0?(y-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(y-d._start)*d._ts,s,o||pn&&Km(d)),h!==this._time||!this._ts&&!p){b=0,g&&(u+=this._zTime=y?-At:At);break}}d=g}}if(b&&!s&&(this.pause(),b.render(h>=a?0:-At)._zTime=h>=a?1:-1,this._ts))return this._start=v,Yu(this),this.render(r,s,o);this._onUpdate&&!s&&ei(this,"onUpdate",!0),(u===c&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(w)!==Math.abs(this._ts))&&(this._lock||((r||!l)&&(u===c&&this._ts>0||!u&&this._ts<0)&&rs(this,1),!s&&!(r<0&&!a)&&(u||a||!c)&&(ei(this,u===c&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<c&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,s){var o=this;if(wr(s)||(s=gi(this,s,r)),!(r instanceof _c)){if(xn(r))return r.forEach(function(a){return o.add(a,s)}),this;if(sn(r))return this.addLabel(r,s);if(Ht(r))r=Xt.delayedCall(0,r);else return this}return this!==r?Xi(this,r,s):this},t.getChildren=function(r,s,o,a){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-_i);for(var c=[],l=this._first;l;)l._start>=a&&(l instanceof Xt?s&&c.push(l):(o&&c.push(l),r&&c.push.apply(c,l.getChildren(!0,s,o)))),l=l._next;return c},t.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},t.remove=function(r){return sn(r)?this.removeLabel(r):Ht(r)?this.killTweensOf(r):(r.parent===this&&Xu(this,r),r===this._recent&&(this._recent=this._last),Gs(this))},t.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Ut(Wn.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),i.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},t.addLabel=function(r,s){return this.labels[r]=gi(this,s),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,s,o){var a=Xt.delayedCall(0,s||mc,o);return a.data="isPause",this._hasPause=1,Xi(this,a,gi(this,r))},t.removePause=function(r){var s=this._first;for(r=gi(this,r);s;)s._start===r&&s.data==="isPause"&&rs(s),s=s._next},t.killTweensOf=function(r,s,o){for(var a=this.getTweensOf(r,o),c=a.length;c--;)ts!==a[c]&&a[c].kill(r,s);return this},t.getTweensOf=function(r,s){for(var o=[],a=vi(r),c=this._first,l=wr(s),u;c;)c instanceof Xt?KP(c._targets,a)&&(l?(!ts||c._initted&&c._ts)&&c.globalTime(0)<=s&&c.globalTime(c.totalDuration())>s:!s||c.isActive())&&o.push(c):(u=c.getTweensOf(a,s)).length&&o.push.apply(o,u),c=c._next;return o},t.tweenTo=function(r,s){s=s||{};var o=this,a=gi(o,r),c=s,l=c.startAt,u=c.onStart,f=c.onStartParams,h=c.immediateRender,d,g=Xt.to(o,ni({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(l&&"time"in l?l.time:o._time))/o.timeScale())||At,onStart:function(){if(o.pause(),!d){var m=s.duration||Math.abs((a-(l&&"time"in l?l.time:o._time))/o.timeScale());g._dur!==m&&aa(g,m,0,1).render(g._time,!0,!0),d=1}u&&u.apply(g,f||[])}},s));return h?g.render(0):g},t.tweenFromTo=function(r,s,o){return this.tweenTo(s,ni({startAt:{time:gi(this,r)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),Px(this,gi(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),Px(this,gi(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+At)},t.shiftChildren=function(r,s,o){o===void 0&&(o=0);var a=this._first,c=this.labels,l;for(r=Ut(r);a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(s)for(l in c)c[l]>=o&&(c[l]+=r);return Gs(this)},t.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return i.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Gs(this)},t.totalDuration=function(r){var s=0,o=this,a=o._last,c=_i,l,u,f;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(f=o.parent;a;)l=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>c&&o._sort&&a._ts&&!o._lock?(o._lock=1,Xi(o,a,u-a._delay,1)._lock=0):c=u,u<0&&a._ts&&(s-=u,(!f&&!o._dp||f&&f.smoothChildTiming)&&(o._start+=Ut(u/o._ts),o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),c=0),a._end>s&&a._ts&&(s=a._end),a=l;aa(o,o===Bt&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(r){if(Bt._ts&&(Hx(Bt,Wu(r,Bt)),zx=Wn.frame),Wn.frame>=Ix){Ix+=$n.autoSleep||120;var s=Bt._first;if((!s||!s._ts)&&$n.autoSleep&&Wn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Wn.sleep()}}},e}(_c);ni(hn.prototype,{_lock:0,_hasPause:0,_forcing:0});var MN=function(e,t,n,r,s,o,a){var c=new Rn(this._pt,e,t,0,1,sg,null,s),l=0,u=0,f,h,d,g,_,m,p,b;for(c.b=n,c.e=r,n+="",r+="",(p=~r.indexOf("random("))&&(r=la(r)),o&&(b=[n,r],o(b,e,t),n=b[0],r=b[1]),h=n.match(Tm)||[];f=Tm.exec(r);)g=f[0],_=r.substring(l,f.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),g!==h[u++]&&(m=parseFloat(h[u-1])||0,c._pt={_next:c._pt,p:_||u===1?_:",",s:m,c:g.charAt(1)==="="?qs(m,g)-m:parseFloat(g)-m,m:d&&d<4?Math.round:0},l=Tm.lastIndex);return c.c=l<r.length?r.substring(l,r.length):"",c.fp=a,($m.test(r)||p)&&(c.e=0),this._pt=c,c},tg=function(e,t,n,r,s,o,a,c,l,u){Ht(r)&&(r=r(s||0,e,o));var f=e[t],h=n!=="get"?n:Ht(f)?l?e[t.indexOf("set")||!Ht(e["get"+t.substr(3)])?t:"get"+t.substr(3)](l):e[t]():f,d=Ht(f)?l?TN:dM:rg,g;if(sn(r)&&(~r.indexOf("random(")&&(r=la(r)),r.charAt(1)==="="&&(g=qs(h,r)+(mn(h)||0),(g||g===0)&&(r=g))),!u||h!==r||zm)return!isNaN(h*r)&&r!==""?(g=new Rn(this._pt,e,t,+h||0,r-(h||0),typeof f=="boolean"?IN:fM,0,d),l&&(g.fp=l),a&&g.modifier(a,this,e),this._pt=g):(!f&&!(t in e)&&qu(t,r),MN.call(this,e,t,h,r,d,c||$n.stringFilter,l))},SN=function(e,t,n,r,s){if(Ht(e)&&(e=hc(e,s,t,n,r)),!Yi(e)||e.style&&e.nodeType||xn(e)||Fx(e))return sn(e)?hc(e,s,t,n,r):e;var o={},a;for(a in e)o[a]=hc(e[a],s,t,n,r);return o},ng=function(e,t,n,r,s,o){var a,c,l,u;if(Gn[e]&&(a=new Gn[e]).init(s,a.rawVars?t[e]:SN(t[e],r,s,o,n),n,r,o)!==!1&&(n._pt=c=new Rn(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==ia))for(l=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)l[a._props[u]]=c;return a},ts,zm,ig=function i(e,t,n){var r=e.vars,s=r.ease,o=r.startAt,a=r.immediateRender,c=r.lazy,l=r.onUpdate,u=r.runBackwards,f=r.yoyoEase,h=r.keyframes,d=r.autoRevert,g=e._dur,_=e._startAt,m=e._targets,p=e.parent,b=p&&p.data==="nested"?p.vars.targets:m,w=e._overwrite==="auto"&&!Gm,v=e.timeline,I,C,E,A,x,y,D,N,F,G,X,W,j;if(v&&(!h||!s)&&(s="none"),e._ease=Ws(s,ra.ease),e._yEase=f?oM(Ws(f===!0?s:f,ra.ease)):0,f&&e._yoyo&&!e._repeat&&(f=e._yEase,e._yEase=e._ease,e._ease=f),e._from=!v&&!!r.runBackwards,!v||h&&!r.stagger){if(N=m[0]?is(m[0]).harness:0,W=N&&r[N.prop],I=Gu(r,Xm),_&&(_._zTime<0&&_.progress(1),t<0&&u&&a&&!d?_.render(-1,!0):_.revert(u&&g?Uu:ZP),_._lazy=0),o){if(rs(e._startAt=Xt.set(m,ni({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!_&&jn(c),startAt:null,delay:0,onUpdate:l&&function(){return ei(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(pn||!a&&!d)&&e._startAt.revert(Uu),a&&g&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&g&&!_){if(t&&(a=!1),E=ni({overwrite:!1,data:"isFromStart",lazy:a&&!_&&jn(c),immediateRender:a,stagger:0,parent:p},I),W&&(E[N.prop]=W),rs(e._startAt=Xt.set(m,E)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(pn?e._startAt.revert(Uu):e._startAt.render(-1,!0)),e._zTime=t,!a)i(e._startAt,At,At);else if(!t)return}for(e._pt=e._ptCache=0,c=g&&jn(c)||c&&!g,C=0;C<m.length;C++){if(x=m[C],D=x._gsap||Zm(m)[C]._gsap,e._ptLookup[C]=G={},Om[D.id]&&ns.length&&Hu(),X=b===m?C:b.indexOf(x),N&&(F=new N).init(x,W||I,e,X,b)!==!1&&(e._pt=A=new Rn(e._pt,x,F.name,0,1,F.render,F,0,F.priority),F._props.forEach(function(H){G[H]=A}),F.priority&&(y=1)),!N||W)for(E in I)Gn[E]&&(F=ng(E,I,e,X,x,b))?F.priority&&(y=1):G[E]=A=tg.call(e,x,E,"get",I[E],X,b,0,r.stringFilter);e._op&&e._op[C]&&e.kill(x,e._op[C]),w&&e._pt&&(ts=e,Bt.killTweensOf(x,G,e.globalTime(t)),j=!e.parent,ts=0),e._pt&&c&&(Om[D.id]=1)}y&&ag(e),e._onInit&&e._onInit(e)}e._onUpdate=l,e._initted=(!e._op||e._pt)&&!j,h&&t<=0&&v.render(_i,!0,!0)},bN=function(e,t,n,r,s,o,a,c){var l=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,f,h,d;if(!l)for(l=e._ptCache[t]=[],h=e._ptLookup,d=e._targets.length;d--;){if(u=h[d][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return zm=1,e.vars[t]="+=0",ig(e,a),zm=0,c?pc(t+" not eligible for reset"):1;l.push(u)}for(d=l.length;d--;)f=l[d],u=f._pt||f,u.s=(r||r===0)&&!s?r:u.s+(r||0)+o*u.c,u.c=n-u.s,f.e&&(f.e=Gt(n)+mn(f.e)),f.b&&(f.b=u.s+mn(f.b))},wN=function(e,t){var n=e[0]?is(e[0]).harness:0,r=n&&n.aliases,s,o,a,c;if(!r)return t;s=sa({},t);for(o in r)if(o in s)for(c=r[o].split(","),a=c.length;a--;)s[c[a]]=s[o];return s},EN=function(e,t,n,r){var s=t.ease||r||"power1.inOut",o,a;if(xn(t))a=n[e]||(n[e]=[]),t.forEach(function(c,l){return a.push({t:l/(t.length-1)*100,v:c,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},hc=function(e,t,n,r,s){return Ht(e)?e.call(t,n,r,s):sn(e)&&~e.indexOf("random(")?la(e):e},lM=Ym+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",uM={};Dn(lM+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return uM[i]=1});var Xt=function(i){Ox(e,i);function e(n,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=i.call(this,o?r:dc(r))||this;var c=a.vars,l=c.duration,u=c.delay,f=c.immediateRender,h=c.stagger,d=c.overwrite,g=c.keyframes,_=c.defaults,m=c.scrollTrigger,p=c.yoyoEase,b=r.parent||Bt,w=(xn(n)||Fx(n)?wr(n[0]):"length"in r)?[n]:vi(n),v,I,C,E,A,x,y,D;if(a._targets=w.length?Zm(w):pc("GSAP target "+n+" not found. https://gsap.com",!$n.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,g||h||Fu(l)||Fu(u)){if(r=a.vars,v=a.timeline=new hn({data:"nested",defaults:_||{},targets:b&&b.data==="nested"?b.vars.targets:w}),v.kill(),v.parent=v._dp=Sr(a),v._start=0,h||Fu(l)||Fu(u)){if(E=w.length,y=h&&Jx(h),Yi(h))for(A in h)~lM.indexOf(A)&&(D||(D={}),D[A]=h[A]);for(I=0;I<E;I++)C=Gu(r,uM),C.stagger=0,p&&(C.yoyoEase=p),D&&sa(C,D),x=w[I],C.duration=+hc(l,Sr(a),I,x,w),C.delay=(+hc(u,Sr(a),I,x,w)||0)-a._delay,!h&&E===1&&C.delay&&(a._delay=u=C.delay,a._start+=u,C.delay=0),v.to(x,C,y?y(I,x,w):0),v._ease=at.none;v.duration()?l=u=0:a.timeline=0}else if(g){dc(ni(v.vars.defaults,{ease:"none"})),v._ease=Ws(g.ease||r.ease||"none");var N=0,F,G,X;if(xn(g))g.forEach(function(W){return v.to(w,W,">")}),v.duration();else{C={};for(A in g)A==="ease"||A==="easeEach"||EN(A,g[A],C,g.easeEach);for(A in C)for(F=C[A].sort(function(W,j){return W.t-j.t}),N=0,I=0;I<F.length;I++)G=F[I],X={ease:G.e,duration:(G.t-(I?F[I-1].t:0))/100*l},X[A]=G.v,v.to(w,X,N),N+=X.duration;v.duration()<l&&v.to({},{duration:l-v.duration()})}}l||a.duration(l=v.duration())}else a.timeline=0;return d===!0&&!Gm&&(ts=Sr(a),Bt.killTweensOf(w),ts=0),Xi(b,Sr(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(f||!l&&!g&&a._start===Ut(b._time)&&jn(f)&&nN(Sr(a))&&b.data!=="nested")&&(a._tTime=-At,a.render(Math.max(0,-u)||0)),m&&qx(Sr(a),m),a}var t=e.prototype;return t.render=function(r,s,o){var a=this._time,c=this._tDur,l=this._dur,u=r<0,f=r>c-At&&!u?c:r<At?0:r,h,d,g,_,m,p,b,w,v;if(!l)rN(this,r,s,o);else if(f!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(h=f,w=this.timeline,this._repeat){if(_=l+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+r,s,o);if(h=Ut(f%_),f===c?(g=this._repeat,h=l):(m=Ut(f/_),g=~~m,g&&g===m?(h=l,g--):h>l&&(h=l)),p=this._yoyo&&g&1,p&&(v=this._yEase,h=l-h),m=oa(this._tTime,_),h===a&&!o&&this._initted&&g===m)return this._tTime=f,this;g!==m&&(w&&this._yEase&&aM(w,p),this.vars.repeatRefresh&&!p&&!this._lock&&h!==_&&this._initted&&(this._lock=o=1,this.render(Ut(_*g),!0).invalidate()._lock=0))}if(!this._initted){if(Xx(this,u?r:h,o,s,f))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==m))return this;if(l!==this._dur)return this.render(r,s,o)}if(this._tTime=f,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=b=(v||this._ease)(h/l),this._from&&(this.ratio=b=1-b),!a&&f&&!s&&!m&&(ei(this,"onStart"),this._tTime!==f))return this;for(d=this._pt;d;)d.r(b,d.d),d=d._next;w&&w.render(r<0?r:w._dur*w._ease(h/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&km(this,r,s,o),ei(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&ei(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(u&&!this._onUpdate&&km(this,r,!0,!0),(r||!l)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&rs(this,1),!s&&!(u&&!a)&&(f||a||p)&&(ei(this,f===c?"onComplete":"onReverseComplete",!0),this._prom&&!(f<c&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),i.prototype.invalidate.call(this,r)},t.resetTo=function(r,s,o,a,c){gc||Wn.wake(),this._ts||this.play();var l=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||ig(this,l),u=this._ease(l/this._dur),bN(this,r,s,o,a,u,l,c)?this.resetTo(r,s,o,a,1):(Zu(this,0),this.parent||jx(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?lc(this):this.scrollTrigger&&this.scrollTrigger.kill(!!pn),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,ts&&ts.vars.overwrite!==!0)._first||lc(this),this.parent&&o!==this.timeline.totalDuration()&&aa(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,c=r?vi(r):a,l=this._ptLookup,u=this._pt,f,h,d,g,_,m,p;if((!s||s==="all")&&eN(a,c))return s==="all"&&(this._pt=0),lc(this);for(f=this._op=this._op||[],s!=="all"&&(sn(s)&&(_={},Dn(s,function(b){return _[b]=1}),s=_),s=wN(a,s)),p=a.length;p--;)if(~c.indexOf(a[p])){h=l[p],s==="all"?(f[p]=s,g=h,d={}):(d=f[p]=f[p]||{},g=s);for(_ in g)m=h&&h[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&Xu(this,m,"_pt"),delete h[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&u&&lc(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return fc(1,arguments)},e.delayedCall=function(r,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(r,s,o){return fc(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,o){return Bt.killTweensOf(r,s,o)},e}(_c);ni(Xt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Dn("staggerTo,staggerFrom,staggerFromTo",function(i){Xt[i]=function(){var e=new hn,t=Um.call(arguments,0);return t.splice(i==="staggerFromTo"?5:4,0,0),e[i].apply(e,t)}});var rg=function(e,t,n){return e[t]=n},dM=function(e,t,n){return e[t](n)},TN=function(e,t,n,r){return e[t](r.fp,n)},CN=function(e,t,n){return e.setAttribute(t,n)},Ju=function(e,t){return Ht(e[t])?dM:$u(e[t])&&e.setAttribute?CN:rg},fM=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},IN=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},sg=function(e,t){var n=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},og=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},AN=function(e,t,n,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(e,t,n),s=o},DN=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?Xu(this,t,"_pt"):t.dep||(n=1),t=r;return!n},RN=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},ag=function(e){for(var t=e._pt,n,r,s,o;t;){for(n=t._next,r=s;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:o)?t._prev._next=t:s=t,(t._next=r)?r._prev=t:o=t,t=n}e._pt=s},Rn=function(){function i(t,n,r,s,o,a,c,l,u){this.t=n,this.s=s,this.c=o,this.p=r,this.r=a||fM,this.d=c||this,this.set=l||rg,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=i.prototype;return e.modifier=function(n,r,s){this.mSet=this.mSet||this.set,this.set=RN,this.m=n,this.mt=s,this.tween=r},i}();Dn(Ym+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(i){return Xm[i]=1});ti.TweenMax=ti.TweenLite=Xt;ti.TimelineLite=ti.TimelineMax=hn;Bt=new hn({sortChildren:!1,defaults:ra,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});$n.stringFilter=Qm;var js=[],Vu={},PN=[],Lx=0,NN=0,Rm=function(e){return(Vu[e]||PN).map(function(t){return t()})},Hm=function(){var e=Date.now(),t=[];e-Lx>2&&(Rm("matchMediaInit"),js.forEach(function(n){var r=n.queries,s=n.conditions,o,a,c,l;for(a in r)o=qi.matchMedia(r[a]).matches,o&&(c=1),o!==s[a]&&(s[a]=o,l=1);l&&(n.revert(),c&&t.push(n))}),Rm("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(r){return n.add(null,r)})}),Lx=e,Rm("matchMedia"))},hM=function(){function i(t,n){this.selector=n&&Bm(n),this.data=[],this._r=[],this.isReverted=!1,this.id=NN++,t&&this.add(t)}var e=i.prototype;return e.add=function(n,r,s){Ht(n)&&(s=r,r=n,n=Ht);var o=this,a=function(){var l=kt,u=o.selector,f;return l&&l!==o&&l.data.push(o),s&&(o.selector=Bm(s)),kt=o,f=r.apply(o,arguments),Ht(f)&&o._r.push(f),kt=l,o.selector=u,o.isReverted=!1,f};return o.last=a,n===Ht?a(o,function(c){return o.add(null,c)}):n?o[n]=a:a},e.ignore=function(n){var r=kt;kt=null,n(this),kt=r},e.getTweens=function(){var n=[];return this.data.forEach(function(r){return r instanceof i?n.push.apply(n,r.getTweens()):r instanceof Xt&&!(r.parent&&r.parent.data==="nested")&&n.push(r)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,r){var s=this;if(n?function(){for(var a=s.getTweens(),c=s.data.length,l;c--;)l=s.data[c],l.data==="isFlip"&&(l.revert(),l.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,f){return f.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),c=s.data.length;c--;)l=s.data[c],l instanceof hn?l.data!=="nested"&&(l.scrollTrigger&&l.scrollTrigger.revert(),l.kill()):!(l instanceof Xt)&&l.revert&&l.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=js.length;o--;)js[o].id===this.id&&js.splice(o,1)},e.revert=function(n){this.kill(n||{})},i}(),LN=function(){function i(t){this.contexts=[],this.scope=t,kt&&kt.data.push(this)}var e=i.prototype;return e.add=function(n,r,s){Yi(n)||(n={matches:n});var o=new hM(0,s||this.scope),a=o.conditions={},c,l,u;kt&&!o.selector&&(o.selector=kt.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=n;for(l in n)l==="all"?u=1:(c=qi.matchMedia(n[l]),c&&(js.indexOf(o)<0&&js.push(o),(a[l]=c.matches)&&(u=1),c.addListener?c.addListener(Hm):c.addEventListener("change",Hm)));return u&&r(o,function(f){return o.add(null,f)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(r){return r.kill(n,!0)})},i}(),ju={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(r){return iM(r)})},timeline:function(e){return new hn(e)},getTweensOf:function(e,t){return Bt.getTweensOf(e,t)},getProperty:function(e,t,n,r){sn(e)&&(e=vi(e)[0]);var s=is(e||{}).get,o=n?Wx:Gx;return n==="native"&&(n=""),e&&(t?o((Gn[t]&&Gn[t].get||s)(e,t,n,r)):function(a,c,l){return o((Gn[a]&&Gn[a].get||s)(e,a,c,l))})},quickSetter:function(e,t,n){if(e=vi(e),e.length>1){var r=e.map(function(u){return Mn.quickSetter(u,t,n)}),s=r.length;return function(u){for(var f=s;f--;)r[f](u)}}e=e[0]||{};var o=Gn[t],a=is(e),c=a.harness&&(a.harness.aliases||{})[t]||t,l=o?function(u){var f=new o;ia._pt=0,f.init(e,n?u+n:u,ia,0,[e]),f.render(1,f),ia._pt&&og(1,ia)}:a.set(e,c);return o?l:function(u){return l(e,c,n?u+n:u,a,1)}},quickTo:function(e,t,n){var r,s=Mn.to(e,ni((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),n||{})),o=function(c,l,u){return s.resetTo(t,c,l,u)};return o.tween=s,o},isTweening:function(e){return Bt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Ws(e.ease,ra.ease)),Ax(ra,e||{})},config:function(e){return Ax($n,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,s=e.defaults,o=e.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!Gn[a]&&!ti[a]&&pc(t+" effect requires "+a+" plugin.")}),Cm[t]=function(a,c,l){return n(vi(a),ni(c||{},s),l)},o&&(hn.prototype[t]=function(a,c,l){return this.add(Cm[t](a,Yi(c)?c:(l=c)&&{},this),l)})},registerEase:function(e,t){at[e]=Ws(t)},parseEase:function(e,t){return arguments.length?Ws(e,t):at},getById:function(e){return Bt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new hn(e),r,s;for(n.smoothChildTiming=jn(e.smoothChildTiming),Bt.remove(n),n._dp=0,n._time=n._tTime=Bt._time,r=Bt._first;r;)s=r._next,(t||!(!r._dur&&r instanceof Xt&&r.vars.onComplete===r._targets[0]))&&Xi(n,r,r._start-r._delay),r=s;return Xi(Bt,n,0),n},context:function(e,t){return e?new hM(e,t):kt},matchMedia:function(e){return new LN(e)},matchMediaRefresh:function(){return js.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||Hm()},addEventListener:function(e,t){var n=Vu[e]||(Vu[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Vu[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:fN,wrapYoyo:hN,distribute:Jx,random:Qx,snap:Kx,normalize:dN,getUnit:mn,clamp:aN,splitColor:rM,toArray:vi,selector:Bm,mapRange:tM,pipe:lN,unitize:uN,interpolate:pN,shuffle:Zx},install:Bx,effects:Cm,ticker:Wn,updateRoot:hn.updateRoot,plugins:Gn,globalTimeline:Bt,core:{PropTween:Rn,globals:Vx,Tween:Xt,Timeline:hn,Animation:_c,getCache:is,_removeLinkedListItem:Xu,reverting:function(){return pn},context:function(e){return e&&kt&&(kt.data.push(e),e._ctx=kt),kt},suppressOverwrites:function(e){return Gm=e}}};Dn("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return ju[i]=Xt[i]});Wn.add(hn.updateRoot);ia=ju.to({},{duration:0});var ON=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},kN=function(e,t){var n=e._targets,r,s,o;for(r in t)for(s=n.length;s--;)o=e._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=ON(o,r)),o&&o.modifier&&o.modifier(t[r],e,n[s],r))},Pm=function(e,t){return{name:e,headless:1,rawVars:1,init:function(r,s,o){o._onInit=function(a){var c,l;if(sn(s)&&(c={},Dn(s,function(u){return c[u]=1}),s=c),t){c={};for(l in s)c[l]=t(s[l]);s=c}kN(a,s)}}}},Mn=ju.registerPlugin({name:"attr",init:function(e,t,n,r,s){var o,a,c;this.tween=n;for(o in t)c=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(c||0)+"",t[o],r,s,0,0,o),a.op=o,a.b=c,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)pn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Pm("roundProps",Vm),Pm("modifiers"),Pm("snap",Kx))||ju;Xt.version=hn.version=Mn.version="3.14.2";Ux=1;Wm()&&ca();var FN=at.Power0,UN=at.Power1,BN=at.Power2,VN=at.Power3,zN=at.Power4,HN=at.Linear,GN=at.Quad,WN=at.Cubic,jN=at.Quart,$N=at.Quint,qN=at.Strong,XN=at.Elastic,YN=at.Back,ZN=at.SteppedEase,JN=at.Bounce,KN=at.Sine,QN=at.Expo,eL=at.Circ;var pM,os,da,hg,Ks,tL,mM,pg,nL=function(){return typeof window<"u"},Tr={},Js=180/Math.PI,fa=Math.PI/180,ua=Math.atan2,gM=1e8,mg=/([A-Z])/g,iL=/(left|right|width|margin|padding|x)/i,rL=/[\s,\(]\S/,Zi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},lg=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},sL=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},oL=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},aL=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},cL=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},wM=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},EM=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},lL=function(e,t,n){return e.style[t]=n},uL=function(e,t,n){return e.style.setProperty(t,n)},dL=function(e,t,n){return e._gsap[t]=n},fL=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},hL=function(e,t,n,r,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},pL=function(e,t,n,r,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},Vt="transform",qn=Vt+"Origin",mL=function i(e,t){var n=this,r=this.target,s=r.style,o=r._gsap;if(e in Tr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Zi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=Er(r,a)}):this.tfm[e]=o.x?o[e]:Er(r,e),e===qn&&(this.tfm.zOrigin=o.zOrigin);else return Zi.transform.split(",").forEach(function(a){return i.call(n,a,t)});if(this.props.indexOf(Vt)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(qn,t,"")),e=Vt}(s||t)&&this.props.push(e,t,s[e])},TM=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},gL=function(){var e=this.props,t=this.target,n=t.style,r=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(mg,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=pg(),(!s||!s.isStart)&&!n[Vt]&&(TM(n),r.zOrigin&&n[qn]&&(n[qn]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},CM=function(e,t){var n={target:e,props:[],revert:gL,save:mL};return e._gsap||Mn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return n.save(r)}),n},IM,ug=function(e,t){var n=os.createElementNS?os.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):os.createElement(e);return n&&n.style?n:os.createElement(e)},ii=function i(e,t,n){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(mg,"-$1").toLowerCase())||r.getPropertyValue(t)||!n&&i(e,ha(t)||t,1)||""},_M="O,Moz,ms,Ms,Webkit".split(","),ha=function(e,t,n){var r=t||Ks,s=r.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(_M[o]+e in s););return o<0?null:(o===3?"ms":o>=0?_M[o]:"")+e},dg=function(){nL()&&window.document&&(pM=window,os=pM.document,da=os.documentElement,Ks=ug("div")||{style:{}},tL=ug("div"),Vt=ha(Vt),qn=Vt+"Origin",Ks.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",IM=!!ha("perspective"),pg=Mn.core.reverting,hg=1)},vM=function(e){var t=e.ownerSVGElement,n=ug("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),s;r.style.display="block",n.appendChild(r),da.appendChild(n);try{s=r.getBBox()}catch{}return n.removeChild(r),da.removeChild(n),s},yM=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},AM=function(e){var t,n;try{t=e.getBBox()}catch{t=vM(e),n=1}return t&&(t.width||t.height)||n||(t=vM(e)),t&&!t.width&&!t.x&&!t.y?{x:+yM(e,["x","cx","x1"])||0,y:+yM(e,["y","cy","y1"])||0,width:0,height:0}:t},DM=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&AM(e))},cs=function(e,t){if(t){var n=e.style,r;t in Tr&&t!==qn&&(t=Vt),n.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(r==="--"?t:t.replace(mg,"-$1").toLowerCase())):n.removeAttribute(t)}},as=function(e,t,n,r,s,o){var a=new Rn(e._pt,t,n,0,1,o?EM:wM);return e._pt=a,a.b=r,a.e=s,e._props.push(n),a},xM={deg:1,rad:1,turn:1},_L={grid:1,flex:1},ls=function i(e,t,n,r){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=Ks.style,c=iL.test(t),l=e.tagName.toLowerCase()==="svg",u=(l?"client":"offset")+(c?"Width":"Height"),f=100,h=r==="px",d=r==="%",g,_,m,p;if(r===o||!s||xM[r]||xM[o])return s;if(o!=="px"&&!h&&(s=i(e,t,n,"px")),p=e.getCTM&&DM(e),(d||o==="%")&&(Tr[t]||~t.indexOf("adius")))return g=p?e.getBBox()[c?"width":"height"]:e[u],Gt(d?s/g*f:s/100*g);if(a[c?"width":"height"]=f+(h?o:r),_=r!=="rem"&&~t.indexOf("adius")||r==="em"&&e.appendChild&&!l?e:e.parentNode,p&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===os||!_.appendChild)&&(_=os.body),m=_._gsap,m&&d&&m.width&&c&&m.time===Wn.time&&!m.uncache)return Gt(s/m.width*f);if(d&&(t==="height"||t==="width")){var b=e.style[t];e.style[t]=f+r,g=e[u],b?e.style[t]=b:cs(e,t)}else(d||o==="%")&&!_L[ii(_,"display")]&&(a.position=ii(e,"position")),_===e&&(a.position="static"),_.appendChild(Ks),g=Ks[u],_.removeChild(Ks),a.position="absolute";return c&&d&&(m=is(_),m.time=Wn.time,m.width=_[u]),Gt(h?g*s/f:g&&s?f/g*s:0)},Er=function(e,t,n,r){var s;return hg||dg(),t in Zi&&t!=="transform"&&(t=Zi[t],~t.indexOf(",")&&(t=t.split(",")[0])),Tr[t]&&t!=="transform"?(s=Mc(e,r),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Qu(ii(e,qn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=Ku[t]&&Ku[t](e,t,n)||ii(e,t)||Jm(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?ls(e,t,s,n)+n:s},vL=function(e,t,n,r){if(!n||n==="none"){var s=ha(t,e,1),o=s&&ii(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=ii(e,"borderTopColor"))}var a=new Rn(this._pt,e.style,t,0,1,sg),c=0,l=0,u,f,h,d,g,_,m,p,b,w,v,I;if(a.b=n,a.e=r,n+="",r+="",r.substring(0,6)==="var(--"&&(r=ii(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(_=e.style[t],e.style[t]=r,r=ii(e,t)||r,_?e.style[t]=_:cs(e,t)),u=[n,r],Qm(u),n=u[0],r=u[1],h=n.match($s)||[],I=r.match($s)||[],I.length){for(;f=$s.exec(r);)m=f[0],b=r.substring(c,f.index),g?g=(g+1)%5:(b.substr(-5)==="rgba("||b.substr(-5)==="hsla(")&&(g=1),m!==(_=h[l++]||"")&&(d=parseFloat(_)||0,v=_.substr((d+"").length),m.charAt(1)==="="&&(m=qs(d,m)+v),p=parseFloat(m),w=m.substr((p+"").length),c=$s.lastIndex-w.length,w||(w=w||$n.units[t]||v,c===r.length&&(r+=w,a.e+=w)),v!==w&&(d=ls(e,t,_,w)||0),a._pt={_next:a._pt,p:b||l===1?b:",",s:d,c:p-d,m:g&&g<4||t==="zIndex"?Math.round:0});a.c=c<r.length?r.substring(c,r.length):""}else a.r=t==="display"&&r==="none"?EM:wM;return $m.test(r)&&(a.e=0),this._pt=a,a},MM={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},yL=function(e){var t=e.split(" "),n=t[0],r=t[1]||"50%";return(n==="top"||n==="bottom"||r==="left"||r==="right")&&(e=n,n=r,r=e),t[0]=MM[n]||n,t[1]=MM[r]||r,t.join(" ")},xL=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,s=t.u,o=n._gsap,a,c,l;if(s==="all"||s===!0)r.cssText="",c=1;else for(s=s.split(","),l=s.length;--l>-1;)a=s[l],Tr[a]&&(c=1,a=a==="transformOrigin"?qn:Vt),cs(n,a);c&&(cs(n,Vt),o&&(o.svg&&n.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",Mc(n,1),o.uncache=1,TM(r)))}},Ku={clearProps:function(e,t,n,r,s){if(s.data!=="isFromStart"){var o=e._pt=new Rn(e._pt,t,n,0,0,xL);return o.u=r,o.pr=-10,o.tween=s,e._props.push(n),1}}},xc=[1,0,0,1,0,0],RM={},PM=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},SM=function(e){var t=ii(e,Vt);return PM(t)?xc:t.substr(7).match(jm).map(Gt)},gg=function(e,t){var n=e._gsap||is(e),r=e.style,s=SM(e),o,a,c,l;return n.svg&&e.getAttribute("transform")?(c=e.transform.baseVal.consolidate().matrix,s=[c.a,c.b,c.c,c.d,c.e,c.f],s.join(",")==="1,0,0,1,0,0"?xc:s):(s===xc&&!e.offsetParent&&e!==da&&!n.svg&&(c=r.display,r.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(l=1,a=e.nextElementSibling,da.appendChild(e)),s=SM(e),c?r.display=c:cs(e,"display"),l&&(a?o.insertBefore(e,a):o?o.appendChild(e):da.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},fg=function(e,t,n,r,s,o){var a=e._gsap,c=s||gg(e,!0),l=a.xOrigin||0,u=a.yOrigin||0,f=a.xOffset||0,h=a.yOffset||0,d=c[0],g=c[1],_=c[2],m=c[3],p=c[4],b=c[5],w=t.split(" "),v=parseFloat(w[0])||0,I=parseFloat(w[1])||0,C,E,A,x;n?c!==xc&&(E=d*m-g*_)&&(A=v*(m/E)+I*(-_/E)+(_*b-m*p)/E,x=v*(-g/E)+I*(d/E)-(d*b-g*p)/E,v=A,I=x):(C=AM(e),v=C.x+(~w[0].indexOf("%")?v/100*C.width:v),I=C.y+(~(w[1]||w[0]).indexOf("%")?I/100*C.height:I)),r||r!==!1&&a.smooth?(p=v-l,b=I-u,a.xOffset=f+(p*d+b*_)-p,a.yOffset=h+(p*g+b*m)-b):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=I,a.smooth=!!r,a.origin=t,a.originIsAbsolute=!!n,e.style[qn]="0px 0px",o&&(as(o,a,"xOrigin",l,v),as(o,a,"yOrigin",u,I),as(o,a,"xOffset",f,a.xOffset),as(o,a,"yOffset",h,a.yOffset)),e.setAttribute("data-svg-origin",v+" "+I)},Mc=function(e,t){var n=e._gsap||new eg(e);if("x"in n&&!t&&!n.uncache)return n;var r=e.style,s=n.scaleX<0,o="px",a="deg",c=getComputedStyle(e),l=ii(e,qn)||"0",u,f,h,d,g,_,m,p,b,w,v,I,C,E,A,x,y,D,N,F,G,X,W,j,H,te,R,ue,Pe,Ze,Y,ee;return u=f=h=_=m=p=b=w=v=0,d=g=1,n.svg=!!(e.getCTM&&DM(e)),c.translate&&((c.translate!=="none"||c.scale!=="none"||c.rotate!=="none")&&(r[Vt]=(c.translate!=="none"?"translate3d("+(c.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(c.rotate!=="none"?"rotate("+c.rotate+") ":"")+(c.scale!=="none"?"scale("+c.scale.split(" ").join(",")+") ":"")+(c[Vt]!=="none"?c[Vt]:"")),r.scale=r.rotate=r.translate="none"),E=gg(e,n.svg),n.svg&&(n.uncache?(H=e.getBBox(),l=n.xOrigin-H.x+"px "+(n.yOrigin-H.y)+"px",j=""):j=!t&&e.getAttribute("data-svg-origin"),fg(e,j||l,!!j||n.originIsAbsolute,n.smooth!==!1,E)),I=n.xOrigin||0,C=n.yOrigin||0,E!==xc&&(D=E[0],N=E[1],F=E[2],G=E[3],u=X=E[4],f=W=E[5],E.length===6?(d=Math.sqrt(D*D+N*N),g=Math.sqrt(G*G+F*F),_=D||N?ua(N,D)*Js:0,b=F||G?ua(F,G)*Js+_:0,b&&(g*=Math.abs(Math.cos(b*fa))),n.svg&&(u-=I-(I*D+C*F),f-=C-(I*N+C*G))):(ee=E[6],Ze=E[7],R=E[8],ue=E[9],Pe=E[10],Y=E[11],u=E[12],f=E[13],h=E[14],A=ua(ee,Pe),m=A*Js,A&&(x=Math.cos(-A),y=Math.sin(-A),j=X*x+R*y,H=W*x+ue*y,te=ee*x+Pe*y,R=X*-y+R*x,ue=W*-y+ue*x,Pe=ee*-y+Pe*x,Y=Ze*-y+Y*x,X=j,W=H,ee=te),A=ua(-F,Pe),p=A*Js,A&&(x=Math.cos(-A),y=Math.sin(-A),j=D*x-R*y,H=N*x-ue*y,te=F*x-Pe*y,Y=G*y+Y*x,D=j,N=H,F=te),A=ua(N,D),_=A*Js,A&&(x=Math.cos(A),y=Math.sin(A),j=D*x+N*y,H=X*x+W*y,N=N*x-D*y,W=W*x-X*y,D=j,X=H),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,p=180-p),d=Gt(Math.sqrt(D*D+N*N+F*F)),g=Gt(Math.sqrt(W*W+ee*ee)),A=ua(X,W),b=Math.abs(A)>2e-4?A*Js:0,v=Y?1/(Y<0?-Y:Y):0),n.svg&&(j=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!PM(ii(e,Vt)),j&&e.setAttribute("transform",j))),Math.abs(b)>90&&Math.abs(b)<270&&(s?(d*=-1,b+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,b+=b<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=f-((n.yPercent=f&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-f)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=h+o,n.scaleX=Gt(d),n.scaleY=Gt(g),n.rotation=Gt(_)+a,n.rotationX=Gt(m)+a,n.rotationY=Gt(p)+a,n.skewX=b+a,n.skewY=w+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(l.split(" ")[2])||!t&&n.zOrigin||0)&&(r[qn]=Qu(l)),n.xOffset=n.yOffset=0,n.force3D=$n.force3D,n.renderTransform=n.svg?SL:IM?NM:ML,n.uncache=0,n},Qu=function(e){return(e=e.split(" "))[0]+" "+e[1]},cg=function(e,t,n){var r=mn(t);return Gt(parseFloat(t)+parseFloat(ls(e,"x",n+"px",r)))+r},ML=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,NM(e,t)},Ys="0deg",yc="0px",Zs=") ",NM=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,o=n.x,a=n.y,c=n.z,l=n.rotation,u=n.rotationY,f=n.rotationX,h=n.skewX,d=n.skewY,g=n.scaleX,_=n.scaleY,m=n.transformPerspective,p=n.force3D,b=n.target,w=n.zOrigin,v="",I=p==="auto"&&e&&e!==1||p===!0;if(w&&(f!==Ys||u!==Ys)){var C=parseFloat(u)*fa,E=Math.sin(C),A=Math.cos(C),x;C=parseFloat(f)*fa,x=Math.cos(C),o=cg(b,o,E*x*-w),a=cg(b,a,-Math.sin(C)*-w),c=cg(b,c,A*x*-w+w)}m!==yc&&(v+="perspective("+m+Zs),(r||s)&&(v+="translate("+r+"%, "+s+"%) "),(I||o!==yc||a!==yc||c!==yc)&&(v+=c!==yc||I?"translate3d("+o+", "+a+", "+c+") ":"translate("+o+", "+a+Zs),l!==Ys&&(v+="rotate("+l+Zs),u!==Ys&&(v+="rotateY("+u+Zs),f!==Ys&&(v+="rotateX("+f+Zs),(h!==Ys||d!==Ys)&&(v+="skew("+h+", "+d+Zs),(g!==1||_!==1)&&(v+="scale("+g+", "+_+Zs),b.style[Vt]=v||"translate(0, 0)"},SL=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,o=n.x,a=n.y,c=n.rotation,l=n.skewX,u=n.skewY,f=n.scaleX,h=n.scaleY,d=n.target,g=n.xOrigin,_=n.yOrigin,m=n.xOffset,p=n.yOffset,b=n.forceCSS,w=parseFloat(o),v=parseFloat(a),I,C,E,A,x;c=parseFloat(c),l=parseFloat(l),u=parseFloat(u),u&&(u=parseFloat(u),l+=u,c+=u),c||l?(c*=fa,l*=fa,I=Math.cos(c)*f,C=Math.sin(c)*f,E=Math.sin(c-l)*-h,A=Math.cos(c-l)*h,l&&(u*=fa,x=Math.tan(l-u),x=Math.sqrt(1+x*x),E*=x,A*=x,u&&(x=Math.tan(u),x=Math.sqrt(1+x*x),I*=x,C*=x)),I=Gt(I),C=Gt(C),E=Gt(E),A=Gt(A)):(I=f,A=h,C=E=0),(w&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(w=ls(d,"x",o,"px"),v=ls(d,"y",a,"px")),(g||_||m||p)&&(w=Gt(w+g-(g*I+_*E)+m),v=Gt(v+_-(g*C+_*A)+p)),(r||s)&&(x=d.getBBox(),w=Gt(w+r/100*x.width),v=Gt(v+s/100*x.height)),x="matrix("+I+","+C+","+E+","+A+","+w+","+v+")",d.setAttribute("transform",x),b&&(d.style[Vt]=x)},bL=function(e,t,n,r,s){var o=360,a=sn(s),c=parseFloat(s)*(a&&~s.indexOf("rad")?Js:1),l=c-r,u=r+l+"deg",f,h;return a&&(f=s.split("_")[1],f==="short"&&(l%=o,l!==l%(o/2)&&(l+=l<0?o:-o)),f==="cw"&&l<0?l=(l+o*gM)%o-~~(l/o)*o:f==="ccw"&&l>0&&(l=(l-o*gM)%o-~~(l/o)*o)),e._pt=h=new Rn(e._pt,t,n,r,l,sL),h.e=u,h.u="deg",e._props.push(n),h},bM=function(e,t){for(var n in t)e[n]=t[n];return e},wL=function(e,t,n){var r=bM({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,c,l,u,f,h,d,g;r.svg?(l=n.getAttribute("transform"),n.setAttribute("transform",""),o[Vt]=t,a=Mc(n,1),cs(n,Vt),n.setAttribute("transform",l)):(l=getComputedStyle(n)[Vt],o[Vt]=t,a=Mc(n,1),o[Vt]=l);for(c in Tr)l=r[c],u=a[c],l!==u&&s.indexOf(c)<0&&(d=mn(l),g=mn(u),f=d!==g?ls(n,c,l,g):parseFloat(l),h=parseFloat(u),e._pt=new Rn(e._pt,a,c,f,h-f,lg),e._pt.u=g||0,e._props.push(c));bM(a,r)};Dn("padding,margin,Width,Radius",function(i,e){var t="Top",n="Right",r="Bottom",s="Left",o=(e<3?[t,n,r,s]:[t+s,t+n,r+n,r+s]).map(function(a){return e<2?i+a:"border"+a+i});Ku[e>1?"border"+i:i]=function(a,c,l,u,f){var h,d;if(arguments.length<4)return h=o.map(function(g){return Er(a,g,l)}),d=h.join(" "),d.split(h[0]).length===5?h[0]:d;h=(u+"").split(" "),d={},o.forEach(function(g,_){return d[g]=h[_]=h[_]||h[(_-1)/2|0]}),a.init(c,d,f)}});var _g={name:"css",register:dg,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,s){var o=this._props,a=e.style,c=n.vars.startAt,l,u,f,h,d,g,_,m,p,b,w,v,I,C,E,A,x;hg||dg(),this.styles=this.styles||CM(e),A=this.styles.props,this.tween=n;for(_ in t)if(_!=="autoRound"&&(u=t[_],!(Gn[_]&&ng(_,t,n,r,e,s)))){if(d=typeof u,g=Ku[_],d==="function"&&(u=u.call(n,r,e,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=la(u)),g)g(this,e,_,u,n)&&(E=1);else if(_.substr(0,2)==="--")l=(getComputedStyle(e).getPropertyValue(_)+"").trim(),u+="",br.lastIndex=0,br.test(l)||(m=mn(l),p=mn(u),p?m!==p&&(l=ls(e,_,l,p)+p):m&&(u+=m)),this.add(a,"setProperty",l,u,r,s,0,0,_),o.push(_),A.push(_,0,a[_]);else if(d!=="undefined"){if(c&&_ in c?(l=typeof c[_]=="function"?c[_].call(n,r,e,s):c[_],sn(l)&&~l.indexOf("random(")&&(l=la(l)),mn(l+"")||l==="auto"||(l+=$n.units[_]||mn(Er(e,_))||""),(l+"").charAt(1)==="="&&(l=Er(e,_))):l=Er(e,_),h=parseFloat(l),b=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),b&&(u=u.substr(2)),f=parseFloat(u),_ in Zi&&(_==="autoAlpha"&&(h===1&&Er(e,"visibility")==="hidden"&&f&&(h=0),A.push("visibility",0,a.visibility),as(this,a,"visibility",h?"inherit":"hidden",f?"inherit":"hidden",!f)),_!=="scale"&&_!=="transform"&&(_=Zi[_],~_.indexOf(",")&&(_=_.split(",")[0]))),w=_ in Tr,w){if(this.styles.save(_),x=u,d==="string"&&u.substring(0,6)==="var(--"){if(u=ii(e,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var y=e.style.perspective;e.style.perspective=u,u=ii(e,"perspective"),y?e.style.perspective=y:cs(e,"perspective")}f=parseFloat(u)}if(v||(I=e._gsap,I.renderTransform&&!t.parseTransform||Mc(e,t.parseTransform),C=t.smoothOrigin!==!1&&I.smooth,v=this._pt=new Rn(this._pt,a,Vt,0,1,I.renderTransform,I,0,-1),v.dep=1),_==="scale")this._pt=new Rn(this._pt,I,"scaleY",I.scaleY,(b?qs(I.scaleY,b+f):f)-I.scaleY||0,lg),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){A.push(qn,0,a[qn]),u=yL(u),I.svg?fg(e,u,0,C,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==I.zOrigin&&as(this,I,"zOrigin",I.zOrigin,p),as(this,a,_,Qu(l),Qu(u)));continue}else if(_==="svgOrigin"){fg(e,u,1,C,0,this);continue}else if(_ in RM){bL(this,I,_,h,b?qs(h,b+u):u);continue}else if(_==="smoothOrigin"){as(this,I,"smooth",I.smooth,u);continue}else if(_==="force3D"){I[_]=u;continue}else if(_==="transform"){wL(this,u,e);continue}}else _ in a||(_=ha(_)||_);if(w||(f||f===0)&&(h||h===0)&&!rL.test(u)&&_ in a)m=(l+"").substr((h+"").length),f||(f=0),p=mn(u)||(_ in $n.units?$n.units[_]:m),m!==p&&(h=ls(e,_,l,p)),this._pt=new Rn(this._pt,w?I:a,_,h,(b?qs(h,b+f):f)-h,!w&&(p==="px"||_==="zIndex")&&t.autoRound!==!1?cL:lg),this._pt.u=p||0,w&&x!==u?(this._pt.b=l,this._pt.e=x,this._pt.r=aL):m!==p&&p!=="%"&&(this._pt.b=l,this._pt.r=oL);else if(_ in a)vL.call(this,e,_,l,b?b+u:u);else if(_ in e)this.add(e,_,l||e[_],b?b+u:u,r,s);else if(_!=="parseTransform"){qu(_,u);continue}w||(_ in a?A.push(_,0,a[_]):typeof e[_]=="function"?A.push(_,2,e[_]()):A.push(_,1,l||e[_])),o.push(_)}}E&&ag(this)},render:function(e,t){if(t.tween._time||!pg())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Er,aliases:Zi,getSetter:function(e,t,n){var r=Zi[t];return r&&r.indexOf(",")<0&&(t=r),t in Tr&&t!==qn&&(e._gsap.x||Er(e,"x"))?n&&mM===n?t==="scale"?fL:dL:(mM=n||{})&&(t==="scale"?hL:pL):e.style&&!$u(e.style[t])?lL:~t.indexOf("-")?uL:Ju(e,t)},core:{_removeProperty:cs,_getMatrix:gg}};Mn.utils.checkPrefix=ha;Mn.core.getStyleSaver=CM;(function(i,e,t,n){var r=Dn(i+","+e+","+t,function(s){Tr[s]=1});Dn(e,function(s){$n.units[s]="deg",RM[s]=1}),Zi[r[13]]=i+","+e,Dn(n,function(s){var o=s.split(":");Zi[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Dn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){$n.units[i]="px"});Mn.registerPlugin(_g);var Cr=Mn.registerPlugin(_g)||Mn,Fk=Cr.core.Tween;function LM(i,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,n.key,n)}}function EL(i,e,t){return e&&LM(i.prototype,e),t&&LM(i,t),i}var gn,nd,TL,ri,us,ds,ma,kM,Qs,bc,FM,Ir,Ui,UM,BM=function(){return gn||typeof window<"u"&&(gn=window.gsap)&&gn.registerPlugin&&gn},VM=1,pa=[],Ke=[],Bi=[],wc=Date.now,vg=function(e,t){return t},CL=function(){var e=bc.core,t=e.bridge||{},n=e._scrollers,r=e._proxies;n.push.apply(n,Ke),r.push.apply(r,Bi),Ke=n,Bi=r,vg=function(o,a){return t[o](a)}},Dr=function(e,t){return~Bi.indexOf(e)&&Bi[Bi.indexOf(e)+1][t]},Ec=function(e){return!!~FM.indexOf(e)},Nn=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:r!==!1,capture:!!s})},Pn=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},ed="scrollLeft",td="scrollTop",yg=function(){return Ir&&Ir.isPressed||Ke.cache++},id=function(e,t){var n=function r(s){if(s||s===0){VM&&(ri.history.scrollRestoration="manual");var o=Ir&&Ir.isPressed;s=r.v=Math.round(s)||(Ir&&Ir.iOS?1:0),e(s),r.cacheID=Ke.cache,o&&vg("ss",s)}else(t||Ke.cache!==r.cacheID||vg("ref"))&&(r.cacheID=Ke.cache,r.v=e());return r.v+r.offset};return n.offset=0,e&&n},Sn={s:ed,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:id(function(i){return arguments.length?ri.scrollTo(i,Qt.sc()):ri.pageXOffset||us[ed]||ds[ed]||ma[ed]||0})},Qt={s:td,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Sn,sc:id(function(i){return arguments.length?ri.scrollTo(Sn.sc(),i):ri.pageYOffset||us[td]||ds[td]||ma[td]||0})},Ln=function(e,t){return(t&&t._ctx&&t._ctx.selector||gn.utils.toArray)(e)[0]||(typeof e=="string"&&gn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},IL=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},Ar=function(e,t){var n=t.s,r=t.sc;Ec(e)&&(e=us.scrollingElement||ds);var s=Ke.indexOf(e),o=r===Qt.sc?1:2;!~s&&(s=Ke.push(e)-1),Ke[s+o]||Nn(e,"scroll",yg);var a=Ke[s+o],c=a||(Ke[s+o]=id(Dr(e,n),!0)||(Ec(e)?r:id(function(l){return arguments.length?e[n]=l:e[n]})));return c.target=e,a||(c.smooth=gn.getProperty(e,"scrollBehavior")==="smooth"),c},rd=function(e,t,n){var r=e,s=e,o=wc(),a=o,c=t||50,l=Math.max(500,c*3),u=function(g,_){var m=wc();_||m-o>c?(s=r,r=g,a=o,o=m):n?r+=g:r=s+(g-s)/(m-a)*(o-a)},f=function(){s=r=n?0:r,a=o=0},h=function(g){var _=a,m=s,p=wc();return(g||g===0)&&g!==r&&u(g),o===a||p-a>l?0:(r+(n?m:-m))/((n?p:o)-_)*1e3};return{update:u,reset:f,getVelocity:h}},Sc=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},OM=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},zM=function(){bc=gn.core.globals().ScrollTrigger,bc&&bc.core&&CL()},HM=function(e){return gn=e||BM(),!nd&&gn&&typeof document<"u"&&document.body&&(ri=window,us=document,ds=us.documentElement,ma=us.body,FM=[ri,us,ds,ma],TL=gn.utils.clamp,UM=gn.core.context||function(){},Qs="onpointerenter"in ma?"pointer":"mouse",kM=Wt.isTouch=ri.matchMedia&&ri.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in ri||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Ui=Wt.eventTypes=("ontouchstart"in ds?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in ds?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return VM=0},500),zM(),nd=1),nd};Sn.op=Qt;Ke.cache=0;var Wt=function(){function i(t){this.init(t)}var e=i.prototype;return e.init=function(n){nd||HM(gn)||console.warn("Please gsap.registerPlugin(Observer)"),bc||zM();var r=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,c=n.lineHeight,l=n.debounce,u=n.preventDefault,f=n.onStop,h=n.onStopDelay,d=n.ignore,g=n.wheelSpeed,_=n.event,m=n.onDragStart,p=n.onDragEnd,b=n.onDrag,w=n.onPress,v=n.onRelease,I=n.onRight,C=n.onLeft,E=n.onUp,A=n.onDown,x=n.onChangeX,y=n.onChangeY,D=n.onChange,N=n.onToggleX,F=n.onToggleY,G=n.onHover,X=n.onHoverEnd,W=n.onMove,j=n.ignoreCheck,H=n.isNormalizer,te=n.onGestureStart,R=n.onGestureEnd,ue=n.onWheel,Pe=n.onEnable,Ze=n.onDisable,Y=n.onClick,ee=n.scrollSpeed,_e=n.capture,ne=n.allowClicks,be=n.lockAxis,Ce=n.onLockAxis;this.target=a=Ln(a)||ds,this.vars=n,d&&(d=gn.utils.toArray(d)),r=r||1e-9,s=s||0,g=g||1,ee=ee||1,o=o||"wheel,touch,pointer",l=l!==!1,c||(c=parseFloat(ri.getComputedStyle(ma).lineHeight)||22);var Ve,Je,Le,De,L,bt,ke,U=this,we=0,st=0,Ie=n.passive||!u&&n.passive!==!1,T=Ar(a,Sn),M=Ar(a,Qt),V=T(),Q=M(),K=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Ui[0]==="pointerdown",Z=Ec(a),de=a.ownerDocument||us,ae=[0,0,0],pe=[0,0,0],Ge=0,ie=function(){return Ge=wc()},oe=function(Ee,$e){return(U.event=Ee)&&d&&IL(Ee.target,d)||$e&&K&&Ee.pointerType!=="touch"||j&&j(Ee,$e)},Ne=function(){U._vx.reset(),U._vy.reset(),Je.pause(),f&&f(U)},Re=function(){var Ee=U.deltaX=OM(ae),$e=U.deltaY=OM(pe),me=Math.abs(Ee)>=r,ze=Math.abs($e)>=r;D&&(me||ze)&&D(U,Ee,$e,ae,pe),me&&(I&&U.deltaX>0&&I(U),C&&U.deltaX<0&&C(U),x&&x(U),N&&U.deltaX<0!=we<0&&N(U),we=U.deltaX,ae[0]=ae[1]=ae[2]=0),ze&&(A&&U.deltaY>0&&A(U),E&&U.deltaY<0&&E(U),y&&y(U),F&&U.deltaY<0!=st<0&&F(U),st=U.deltaY,pe[0]=pe[1]=pe[2]=0),(De||Le)&&(W&&W(U),Le&&(m&&Le===1&&m(U),b&&b(U),Le=0),De=!1),bt&&!(bt=!1)&&Ce&&Ce(U),L&&(ue(U),L=!1),Ve=0},ye=function(Ee,$e,me){ae[me]+=Ee,pe[me]+=$e,U._vx.update(Ee),U._vy.update($e),l?Ve||(Ve=requestAnimationFrame(Re)):Re()},je=function(Ee,$e){be&&!ke&&(U.axis=ke=Math.abs(Ee)>Math.abs($e)?"x":"y",bt=!0),ke!=="y"&&(ae[2]+=Ee,U._vx.update(Ee,!0)),ke!=="x"&&(pe[2]+=$e,U._vy.update($e,!0)),l?Ve||(Ve=requestAnimationFrame(Re)):Re()},Oe=function(Ee){if(!oe(Ee,1)){Ee=Sc(Ee,u);var $e=Ee.clientX,me=Ee.clientY,ze=$e-U.x,Te=me-U.y,Be=U.isDragging;U.x=$e,U.y=me,(Be||(ze||Te)&&(Math.abs(U.startX-$e)>=s||Math.abs(U.startY-me)>=s))&&(Le||(Le=Be?2:1),Be||(U.isDragging=!0),je(ze,Te))}},ct=U.onPress=function(ve){oe(ve,1)||ve&&ve.button||(U.axis=ke=null,Je.pause(),U.isPressed=!0,ve=Sc(ve),we=st=0,U.startX=U.x=ve.clientX,U.startY=U.y=ve.clientY,U._vx.reset(),U._vy.reset(),Nn(H?a:de,Ui[1],Oe,Ie,!0),U.deltaX=U.deltaY=0,w&&w(U))},P=U.onRelease=function(ve){if(!oe(ve,1)){Pn(H?a:de,Ui[1],Oe,!0);var Ee=!isNaN(U.y-U.startY),$e=U.isDragging,me=$e&&(Math.abs(U.x-U.startX)>3||Math.abs(U.y-U.startY)>3),ze=Sc(ve);!me&&Ee&&(U._vx.reset(),U._vy.reset(),u&&ne&&gn.delayedCall(.08,function(){if(wc()-Ge>300&&!ve.defaultPrevented){if(ve.target.click)ve.target.click();else if(de.createEvent){var Te=de.createEvent("MouseEvents");Te.initMouseEvent("click",!0,!0,ri,1,ze.screenX,ze.screenY,ze.clientX,ze.clientY,!1,!1,!1,!1,0,null),ve.target.dispatchEvent(Te)}}})),U.isDragging=U.isGesturing=U.isPressed=!1,f&&$e&&!H&&Je.restart(!0),Le&&Re(),p&&$e&&p(U),v&&v(U,me)}},le=function(Ee){return Ee.touches&&Ee.touches.length>1&&(U.isGesturing=!0)&&te(Ee,U.isDragging)},q=function(){return(U.isGesturing=!1)||R(U)},J=function(Ee){if(!oe(Ee)){var $e=T(),me=M();ye(($e-V)*ee,(me-Q)*ee,1),V=$e,Q=me,f&&Je.restart(!0)}},ce=function(Ee){if(!oe(Ee)){Ee=Sc(Ee,u),ue&&(L=!0);var $e=(Ee.deltaMode===1?c:Ee.deltaMode===2?ri.innerHeight:1)*g;ye(Ee.deltaX*$e,Ee.deltaY*$e,0),f&&!H&&Je.restart(!0)}},fe=function(Ee){if(!oe(Ee)){var $e=Ee.clientX,me=Ee.clientY,ze=$e-U.x,Te=me-U.y;U.x=$e,U.y=me,De=!0,f&&Je.restart(!0),(ze||Te)&&je(ze,Te)}},Fe=function(Ee){U.event=Ee,G(U)},dt=function(Ee){U.event=Ee,X(U)},zt=function(Ee){return oe(Ee)||Sc(Ee,u)&&Y(U)};Je=U._dc=gn.delayedCall(h||.25,Ne).pause(),U.deltaX=U.deltaY=0,U._vx=rd(0,50,!0),U._vy=rd(0,50,!0),U.scrollX=T,U.scrollY=M,U.isDragging=U.isGesturing=U.isPressed=!1,UM(this),U.enable=function(ve){return U.isEnabled||(Nn(Z?de:a,"scroll",yg),o.indexOf("scroll")>=0&&Nn(Z?de:a,"scroll",J,Ie,_e),o.indexOf("wheel")>=0&&Nn(a,"wheel",ce,Ie,_e),(o.indexOf("touch")>=0&&kM||o.indexOf("pointer")>=0)&&(Nn(a,Ui[0],ct,Ie,_e),Nn(de,Ui[2],P),Nn(de,Ui[3],P),ne&&Nn(a,"click",ie,!0,!0),Y&&Nn(a,"click",zt),te&&Nn(de,"gesturestart",le),R&&Nn(de,"gestureend",q),G&&Nn(a,Qs+"enter",Fe),X&&Nn(a,Qs+"leave",dt),W&&Nn(a,Qs+"move",fe)),U.isEnabled=!0,U.isDragging=U.isGesturing=U.isPressed=De=Le=!1,U._vx.reset(),U._vy.reset(),V=T(),Q=M(),ve&&ve.type&&ct(ve),Pe&&Pe(U)),U},U.disable=function(){U.isEnabled&&(pa.filter(function(ve){return ve!==U&&Ec(ve.target)}).length||Pn(Z?de:a,"scroll",yg),U.isPressed&&(U._vx.reset(),U._vy.reset(),Pn(H?a:de,Ui[1],Oe,!0)),Pn(Z?de:a,"scroll",J,_e),Pn(a,"wheel",ce,_e),Pn(a,Ui[0],ct,_e),Pn(de,Ui[2],P),Pn(de,Ui[3],P),Pn(a,"click",ie,!0),Pn(a,"click",zt),Pn(de,"gesturestart",le),Pn(de,"gestureend",q),Pn(a,Qs+"enter",Fe),Pn(a,Qs+"leave",dt),Pn(a,Qs+"move",fe),U.isEnabled=U.isPressed=U.isDragging=!1,Ze&&Ze(U))},U.kill=U.revert=function(){U.disable();var ve=pa.indexOf(U);ve>=0&&pa.splice(ve,1),Ir===U&&(Ir=0)},pa.push(U),H&&Ec(a)&&(Ir=U),U.enable(_)},EL(i,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),i}();Wt.version="3.14.2";Wt.create=function(i){return new Wt(i)};Wt.register=HM;Wt.getAll=function(){return pa.slice()};Wt.getById=function(i){return pa.filter(function(e){return e.vars.id===i})[0]};BM()&&gn.registerPlugin(Wt);var Me,va,it,Pt,ai,yt,Lg,xd,Bc,Pc,Cc,sd,bn,bd,Cg,kn,GM,WM,ya,oS,xg,aS,On,Ig,cS,lS,fs,Ag,Og,xa,kg,Nc,Dg,Mg,od=1,wn=Date.now,Sg=wn(),Mi=0,Ic=0,jM=function(e,t,n){var r=oi(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=r,r?e.substr(6,e.length-7):e},$M=function(e,t){return t&&(!oi(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},AL=function i(){return Ic&&requestAnimationFrame(i)},qM=function(){return bd=1},XM=function(){return bd=0},Ji=function(e){return e},Ac=function(e){return Math.round(e*1e5)/1e5||0},uS=function(){return typeof window<"u"},dS=function(){return Me||uS()&&(Me=window.gsap)&&Me.registerPlugin&&Me},so=function(e){return!!~Lg.indexOf(e)},fS=function(e){return(e==="Height"?kg:it["inner"+e])||ai["client"+e]||yt["client"+e]},hS=function(e){return Dr(e,"getBoundingClientRect")||(so(e)?function(){return yd.width=it.innerWidth,yd.height=kg,yd}:function(){return Rr(e)})},DL=function(e,t,n){var r=n.d,s=n.d2,o=n.a;return(o=Dr(e,"getBoundingClientRect"))?function(){return o()[r]}:function(){return(t?fS(s):e["client"+s])||0}},RL=function(e,t){return!t||~Bi.indexOf(e)?hS(e):function(){return yd}},Ki=function(e,t){var n=t.s,r=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+r)&&(o=Dr(e,n))?o()-hS(e)()[s]:so(e)?(ai[n]||yt[n])-fS(r):e[n]-e["offset"+r])},ad=function(e,t){for(var n=0;n<ya.length;n+=3)(!t||~t.indexOf(ya[n+1]))&&e(ya[n],ya[n+1],ya[n+2])},oi=function(e){return typeof e=="string"},En=function(e){return typeof e=="function"},Dc=function(e){return typeof e=="number"},eo=function(e){return typeof e=="object"},Tc=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},bg=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},ga=Math.abs,pS="left",mS="top",Fg="right",Ug="bottom",no="width",io="height",Lc="Right",Oc="Left",kc="Top",Fc="Bottom",en="padding",yi="margin",Sa="Width",Bg="Height",on="px",xi=function(e){return it.getComputedStyle(e)},PL=function(e){var t=xi(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},YM=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Rr=function(e,t){var n=t&&xi(e)[Cg]!=="matrix(1, 0, 0, 1, 0, 0)"&&Me.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect();return n&&n.progress(0).kill(),r},Md=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},gS=function(e){var t=[],n=e.labels,r=e.duration(),s;for(s in n)t.push(n[s]/r);return t},NL=function(e){return function(t){return Me.utils.snap(gS(e),t)}},Vg=function(e){var t=Me.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(r,s){return r-s});return n?function(r,s,o){o===void 0&&(o=.001);var a;if(!s)return t(r);if(s>0){for(r-=o,a=0;a<n.length;a++)if(n[a]>=r)return n[a];return n[a-1]}else for(a=n.length,r+=o;a--;)if(n[a]<=r)return n[a];return n[0]}:function(r,s,o){o===void 0&&(o=.001);var a=t(r);return!s||Math.abs(a-r)<o||a-r<0==s<0?a:t(s<0?r-e:r+e)}},LL=function(e){return function(t,n){return Vg(gS(e))(t,n.direction)}},cd=function(e,t,n,r){return n.split(",").forEach(function(s){return e(t,s,r)})},un=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:!r,capture:!!s})},ln=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},ld=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},ZM={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},ud={toggleActions:"play",anticipatePin:0},Sd={top:0,left:0,center:.5,bottom:1,right:1},md=function(e,t){if(oi(e)){var n=e.indexOf("="),r=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(r*=t/100),e=e.substr(0,n-1)),e=r+(e in Sd?Sd[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},dd=function(e,t,n,r,s,o,a,c){var l=s.startColor,u=s.endColor,f=s.fontSize,h=s.indent,d=s.fontWeight,g=Pt.createElement("div"),_=so(n)||Dr(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=_?yt:n,b=e.indexOf("start")!==-1,w=b?l:u,v="border-color:"+w+";font-size:"+f+";color:"+w+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||c)&&_?"fixed;":"absolute;"),(m||c||!_)&&(v+=(r===Qt?Fg:Ug)+":"+(o+parseFloat(h))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),g._isStart=b,g.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),g.style.cssText=v,g.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(g,p.children[0]):p.appendChild(g),g._offset=g["offset"+r.op.d2],gd(g,0,r,b),g},gd=function(e,t,n,r){var s={display:"block"},o=n[r?"os2":"p2"],a=n[r?"p2":"os2"];e._isFlipped=r,s[n.a+"Percent"]=r?-100:0,s[n.a]=r?"1px":0,s["border"+o+Sa]=1,s["border"+a+Sa]=0,s[n.p]=t+"px",Me.set(e,s)},Qe=[],Rg={},Vc,JM=function(){return wn()-Mi>34&&(Vc||(Vc=requestAnimationFrame(Pr)))},_a=function(){(!On||!On.isPressed||On.startX>yt.clientWidth)&&(Ke.cache++,On?Vc||(Vc=requestAnimationFrame(Pr)):Pr(),Mi||ao("scrollStart"),Mi=wn())},wg=function(){lS=it.innerWidth,cS=it.innerHeight},Rc=function(e){Ke.cache++,(e===!0||!bn&&!aS&&!Pt.fullscreenElement&&!Pt.webkitFullscreenElement&&(!Ig||lS!==it.innerWidth||Math.abs(it.innerHeight-cS)>it.innerHeight*.25))&&xd.restart(!0)},oo={},OL=[],_S=function i(){return ln(et,"scrollEnd",i)||to(!0)},ao=function(e){return oo[e]&&oo[e].map(function(t){return t()})||OL},si=[],vS=function(e){for(var t=0;t<si.length;t+=5)(!e||si[t+4]&&si[t+4].query===e)&&(si[t].style.cssText=si[t+1],si[t].getBBox&&si[t].setAttribute("transform",si[t+2]||""),si[t+3].uncache=1)},yS=function(){return Ke.forEach(function(e){return En(e)&&++e.cacheID&&(e.rec=e())})},zg=function(e,t){var n;for(kn=0;kn<Qe.length;kn++)n=Qe[kn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Nc=!0,t&&vS(t),t||ao("revert")},xS=function(e,t){Ke.cache++,(t||!Fn)&&Ke.forEach(function(n){return En(n)&&n.cacheID++&&(n.rec=0)}),oi(e)&&(it.history.scrollRestoration=Og=e)},Fn,ro=0,KM,kL=function(){if(KM!==ro){var e=KM=ro;requestAnimationFrame(function(){return e===ro&&to(!0)})}},MS=function(){yt.appendChild(xa),kg=!On&&xa.offsetHeight||it.innerHeight,yt.removeChild(xa)},QM=function(e){return Bc(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},to=function(e,t){if(ai=Pt.documentElement,yt=Pt.body,Lg=[it,Pt,ai,yt],Mi&&!e&&!Nc){un(et,"scrollEnd",_S);return}MS(),Fn=et.isRefreshing=!0,Nc||yS();var n=ao("refreshInit");oS&&et.sort(),t||zg(),Ke.forEach(function(r){En(r)&&(r.smooth&&(r.target.style.scrollBehavior="auto"),r(0))}),Qe.slice(0).forEach(function(r){return r.refresh()}),Nc=!1,Qe.forEach(function(r){if(r._subPinOffset&&r.pin){var s=r.vars.horizontal?"offsetWidth":"offsetHeight",o=r.pin[s];r.revert(!0,1),r.adjustPinSpacing(r.pin[s]-o),r.refresh()}}),Dg=1,QM(!0),Qe.forEach(function(r){var s=Ki(r.scroller,r._dir),o=r.vars.end==="max"||r._endClamp&&r.end>s,a=r._startClamp&&r.start>=s;(o||a)&&r.setPositions(a?s-1:r.start,o?Math.max(a?s:r.start+1,s):r.end,!0)}),QM(!1),Dg=0,n.forEach(function(r){return r&&r.render&&r.render(-1)}),Ke.forEach(function(r){En(r)&&(r.smooth&&requestAnimationFrame(function(){return r.target.style.scrollBehavior="smooth"}),r.rec&&r(r.rec))}),xS(Og,1),xd.pause(),ro++,Fn=2,Pr(2),Qe.forEach(function(r){return En(r.vars.onRefresh)&&r.vars.onRefresh(r)}),Fn=et.isRefreshing=!1,ao("refresh")},Pg=0,_d=1,Uc,Pr=function(e){if(e===2||!Fn&&!Nc){et.isUpdating=!0,Uc&&Uc.update(0);var t=Qe.length,n=wn(),r=n-Sg>=50,s=t&&Qe[0].scroll();if(_d=Pg>s?-1:1,Fn||(Pg=s),r&&(Mi&&!bd&&n-Mi>200&&(Mi=0,ao("scrollEnd")),Cc=Sg,Sg=n),_d<0){for(kn=t;kn-- >0;)Qe[kn]&&Qe[kn].update(0,r);_d=1}else for(kn=0;kn<t;kn++)Qe[kn]&&Qe[kn].update(0,r);et.isUpdating=!1}Vc=0},Ng=[pS,mS,Ug,Fg,yi+Fc,yi+Lc,yi+kc,yi+Oc,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],vd=Ng.concat([no,io,"boxSizing","max"+Sa,"max"+Bg,"position",yi,en,en+kc,en+Lc,en+Fc,en+Oc]),FL=function(e,t,n){Ma(n);var r=e._gsap;if(r.spacerIsNative)Ma(r.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},Eg=function(e,t,n,r){if(!e._gsap.swappedIn){for(var s=Ng.length,o=t.style,a=e.style,c;s--;)c=Ng[s],o[c]=n[c];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[Ug]=a[Fg]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[no]=Md(e,Sn)+on,o[io]=Md(e,Qt)+on,o[en]=a[yi]=a[mS]=a[pS]="0",Ma(r),a[no]=a["max"+Sa]=n[no],a[io]=a["max"+Bg]=n[io],a[en]=n[en],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},UL=/([A-Z])/g,Ma=function(e){if(e){var t=e.t.style,n=e.length,r=0,s,o;for((e.t._gsap||Me.core.getCache(e.t)).uncache=1;r<n;r+=2)o=e[r+1],s=e[r],o?t[s]=o:t[s]&&t.removeProperty(s.replace(UL,"-$1").toLowerCase())}},fd=function(e){for(var t=vd.length,n=e.style,r=[],s=0;s<t;s++)r.push(vd[s],n[vd[s]]);return r.t=e,r},BL=function(e,t,n){for(var r=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],r.push(a,a in t?t[a]:e[o+1]);return r.t=e.t,r},yd={left:0,top:0},eS=function(e,t,n,r,s,o,a,c,l,u,f,h,d,g){En(e)&&(e=e(c)),oi(e)&&e.substr(0,3)==="max"&&(e=h+(e.charAt(4)==="="?md("0"+e.substr(3),n):0));var _=d?d.time():0,m,p,b;if(d&&d.seek(0),isNaN(e)||(e=+e),Dc(e))d&&(e=Me.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,h,e)),a&&gd(a,n,r,!0);else{En(t)&&(t=t(c));var w=(e||"0").split(" "),v,I,C,E;b=Ln(t,c)||yt,v=Rr(b)||{},(!v||!v.left&&!v.top)&&xi(b).display==="none"&&(E=b.style.display,b.style.display="block",v=Rr(b),E?b.style.display=E:b.style.removeProperty("display")),I=md(w[0],v[r.d]),C=md(w[1]||"0",n),e=v[r.p]-l[r.p]-u+I+s-C,a&&gd(a,C,r,n-C<20||a._isStart&&C>20),n-=n-C}if(g&&(c[g]=e||-.001,e<0&&(e=0)),o){var A=e+n,x=o._isStart;m="scroll"+r.d2,gd(o,A,r,x&&A>20||!x&&(f?Math.max(yt[m],ai[m]):o.parentNode[m])<=A+1),f&&(l=Rr(a),f&&(o.style[r.op.p]=l[r.op.p]-r.op.m-o._offset+on))}return d&&b&&(m=Rr(b),d.seek(h),p=Rr(b),d._caScrollDist=m[r.p]-p[r.p],e=e/d._caScrollDist*h),d&&d.seek(_),d?e:Math.round(e)},VL=/(webkit|moz|length|cssText|inset)/i,tS=function(e,t,n,r){if(e.parentNode!==t){var s=e.style,o,a;if(t===yt){e._stOrig=s.cssText,a=xi(e);for(o in a)!+o&&!VL.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=r}else s.cssText=e._stOrig;Me.core.getCache(e).uncache=1,t.appendChild(e)}},SS=function(e,t,n){var r=t,s=r;return function(o){var a=Math.round(e());return a!==r&&a!==s&&Math.abs(a-r)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=r,r=Math.round(o),r}},hd=function(e,t,n){var r={};r[t.p]="+="+n,Me.set(e,r)},nS=function(e,t){var n=Ar(e,t),r="_scroll"+t.p2,s=function o(a,c,l,u,f){var h=o.tween,d=c.onComplete,g={};l=l||n();var _=SS(n,l,function(){h.kill(),o.tween=0});return f=u&&f||0,u=u||a-l,h&&h.kill(),c[r]=a,c.inherit=!1,c.modifiers=g,g[r]=function(){return _(l+u*h.ratio+f*h.ratio*h.ratio)},c.onUpdate=function(){Ke.cache++,o.tween&&Pr()},c.onComplete=function(){o.tween=0,d&&d.call(h)},h=o.tween=Me.to(e,c),h};return e[r]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},un(e,"wheel",n.wheelHandler),et.isTouch&&un(e,"touchmove",n.wheelHandler),s},et=function(){function i(t,n){va||i.register(Me)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Ag(this),this.init(t,n)}var e=i.prototype;return e.init=function(n,r){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Ic){this.update=this.refresh=this.kill=Ji;return}n=YM(oi(n)||Dc(n)||n.nodeType?{trigger:n}:n,ud);var s=n,o=s.onUpdate,a=s.toggleClass,c=s.id,l=s.onToggle,u=s.onRefresh,f=s.scrub,h=s.trigger,d=s.pin,g=s.pinSpacing,_=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,b=s.onSnapComplete,w=s.once,v=s.snap,I=s.pinReparent,C=s.pinSpacer,E=s.containerAnimation,A=s.fastScrollEnd,x=s.preventOverlaps,y=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Sn:Qt,D=!f&&f!==0,N=Ln(n.scroller||it),F=Me.core.getCache(N),G=so(N),X=("pinType"in n?n.pinType:Dr(N,"pinType")||G&&"fixed")==="fixed",W=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],j=D&&n.toggleActions.split(" "),H="markers"in n?n.markers:ud.markers,te=G?0:parseFloat(xi(N)["border"+y.p2+Sa])||0,R=this,ue=n.onRefreshInit&&function(){return n.onRefreshInit(R)},Pe=DL(N,G,y),Ze=RL(N,G),Y=0,ee=0,_e=0,ne=Ar(N,y),be,Ce,Ve,Je,Le,De,L,bt,ke,U,we,st,Ie,T,M,V,Q,K,Z,de,ae,pe,Ge,ie,oe,Ne,Re,ye,je,Oe,ct,P,le,q,J,ce,fe,Fe,dt;if(R._startClamp=R._endClamp=!1,R._dir=y,m*=45,R.scroller=N,R.scroll=E?E.time.bind(E):ne,Je=ne(),R.vars=n,r=r||n.animation,"refreshPriority"in n&&(oS=1,n.refreshPriority===-9999&&(Uc=R)),F.tweenScroll=F.tweenScroll||{top:nS(N,Qt),left:nS(N,Sn)},R.tweenTo=be=F.tweenScroll[y.p],R.scrubDuration=function(me){le=Dc(me)&&me,le?P?P.duration(me):P=Me.to(r,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:le,paused:!0,onComplete:function(){return p&&p(R)}}):(P&&P.progress(1).kill(),P=0)},r&&(r.vars.lazy=!1,r._initted&&!R.isReverted||r.vars.immediateRender!==!1&&n.immediateRender!==!1&&r.duration()&&r.render(0,!0,!0),R.animation=r.pause(),r.scrollTrigger=R,R.scrubDuration(f),Oe=0,c||(c=r.vars.id)),v&&((!eo(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in yt.style&&Me.set(G?[yt,ai]:N,{scrollBehavior:"auto"}),Ke.forEach(function(me){return En(me)&&me.target===(G?Pt.scrollingElement||ai:N)&&(me.smooth=!1)}),Ve=En(v.snapTo)?v.snapTo:v.snapTo==="labels"?NL(r):v.snapTo==="labelsDirectional"?LL(r):v.directional!==!1?function(me,ze){return Vg(v.snapTo)(me,wn()-ee<500?0:ze.direction)}:Me.utils.snap(v.snapTo),q=v.duration||{min:.1,max:2},q=eo(q)?Pc(q.min,q.max):Pc(q,q),J=Me.delayedCall(v.delay||le/2||.1,function(){var me=ne(),ze=wn()-ee<500,Te=be.tween;if((ze||Math.abs(R.getVelocity())<10)&&!Te&&!bd&&Y!==me){var Be=(me-De)/T,jt=r&&!D?r.totalProgress():Be,tt=ze?0:(jt-ct)/(wn()-Cc)*1e3||0,Dt=Me.utils.clamp(-Be,1-Be,ga(tt/2)*tt/.185),tn=Be+(v.inertia===!1?0:Dt),wt,Et,mt=v,Xn=mt.onStart,Nt=mt.onInterrupt,Tn=mt.onComplete;if(wt=Ve(tn,R),Dc(wt)||(wt=tn),Et=Math.max(0,Math.round(De+wt*T)),me<=L&&me>=De&&Et!==me){if(Te&&!Te._initted&&Te.data<=ga(Et-me))return;v.inertia===!1&&(Dt=wt-Be),be(Et,{duration:q(ga(Math.max(ga(tn-jt),ga(wt-jt))*.185/tt/.05||0)),ease:v.ease||"power3",data:ga(Et-me),onInterrupt:function(){return J.restart(!0)&&Nt&&Nt(R)},onComplete:function(){R.update(),Y=ne(),r&&!D&&(P?P.resetTo("totalProgress",wt,r._tTime/r._tDur):r.progress(wt)),Oe=ct=r&&!D?r.totalProgress():R.progress,b&&b(R),Tn&&Tn(R)}},me,Dt*T,Et-me-Dt*T),Xn&&Xn(R,be.tween)}}else R.isActive&&Y!==me&&J.restart(!0)}).pause()),c&&(Rg[c]=R),h=R.trigger=Ln(h||d!==!0&&d),dt=h&&h._gsap&&h._gsap.stRevert,dt&&(dt=dt(R)),d=d===!0?h:Ln(d),oi(a)&&(a={targets:h,className:a}),d&&(g===!1||g===yi||(g=!g&&d.parentNode&&d.parentNode.style&&xi(d.parentNode).display==="flex"?!1:en),R.pin=d,Ce=Me.core.getCache(d),Ce.spacer?M=Ce.pinState:(C&&(C=Ln(C),C&&!C.nodeType&&(C=C.current||C.nativeElement),Ce.spacerIsNative=!!C,C&&(Ce.spacerState=fd(C))),Ce.spacer=K=C||Pt.createElement("div"),K.classList.add("pin-spacer"),c&&K.classList.add("pin-spacer-"+c),Ce.pinState=M=fd(d)),n.force3D!==!1&&Me.set(d,{force3D:!0}),R.spacer=K=Ce.spacer,je=xi(d),ie=je[g+y.os2],de=Me.getProperty(d),ae=Me.quickSetter(d,y.a,on),Eg(d,K,je),Q=fd(d)),H){st=eo(H)?YM(H,ZM):ZM,U=dd("scroller-start",c,N,y,st,0),we=dd("scroller-end",c,N,y,st,0,U),Z=U["offset"+y.op.d2];var zt=Ln(Dr(N,"content")||N);bt=this.markerStart=dd("start",c,zt,y,st,Z,0,E),ke=this.markerEnd=dd("end",c,zt,y,st,Z,0,E),E&&(Fe=Me.quickSetter([bt,ke],y.a,on)),!X&&!(Bi.length&&Dr(N,"fixedMarkers")===!0)&&(PL(G?yt:N),Me.set([U,we],{force3D:!0}),Ne=Me.quickSetter(U,y.a,on),ye=Me.quickSetter(we,y.a,on))}if(E){var ve=E.vars.onUpdate,Ee=E.vars.onUpdateParams;E.eventCallback("onUpdate",function(){R.update(0,0,1),ve&&ve.apply(E,Ee||[])})}if(R.previous=function(){return Qe[Qe.indexOf(R)-1]},R.next=function(){return Qe[Qe.indexOf(R)+1]},R.revert=function(me,ze){if(!ze)return R.kill(!0);var Te=me!==!1||!R.enabled,Be=bn;Te!==R.isReverted&&(Te&&(ce=Math.max(ne(),R.scroll.rec||0),_e=R.progress,fe=r&&r.progress()),bt&&[bt,ke,U,we].forEach(function(jt){return jt.style.display=Te?"none":"block"}),Te&&(bn=R,R.update(Te)),d&&(!I||!R.isActive)&&(Te?FL(d,K,M):Eg(d,K,xi(d),oe)),Te||R.update(Te),bn=Be,R.isReverted=Te)},R.refresh=function(me,ze,Te,Be){if(!((bn||!R.enabled)&&!ze)){if(d&&me&&Mi){un(i,"scrollEnd",_S);return}!Fn&&ue&&ue(R),bn=R,be.tween&&!Te&&(be.tween.kill(),be.tween=0),P&&P.pause(),_&&r&&(r.revert({kill:!1}).invalidate(),r.getChildren?r.getChildren(!0,!0,!1).forEach(function(Ft){return Ft.vars.immediateRender&&Ft.render(0,!0,!0)}):r.vars.immediateRender&&r.render(0,!0,!0)),R.isReverted||R.revert(!0,!0),R._subPinOffset=!1;var jt=Pe(),tt=Ze(),Dt=E?E.duration():Ki(N,y),tn=T<=.01||!T,wt=0,Et=Be||0,mt=eo(Te)?Te.end:n.end,Xn=n.endTrigger||h,Nt=eo(Te)?Te.start:n.start||(n.start===0||!h?0:d?"0 0":"0 100%"),Tn=R.pinnedContainer=n.pinnedContainer&&Ln(n.pinnedContainer,R),S=h&&Math.max(0,Qe.indexOf(R))||0,O=S,B,z,k,re,se,he,xe,Ue,He,Se,We,ft,gt;for(H&&eo(Te)&&(ft=Me.getProperty(U,y.p),gt=Me.getProperty(we,y.p));O-- >0;)he=Qe[O],he.end||he.refresh(0,1)||(bn=R),xe=he.pin,xe&&(xe===h||xe===d||xe===Tn)&&!he.isReverted&&(Se||(Se=[]),Se.unshift(he),he.revert(!0,!0)),he!==Qe[O]&&(S--,O--);for(En(Nt)&&(Nt=Nt(R)),Nt=jM(Nt,"start",R),De=eS(Nt,h,jt,y,ne(),bt,U,R,tt,te,X,Dt,E,R._startClamp&&"_startClamp")||(d?-.001:0),En(mt)&&(mt=mt(R)),oi(mt)&&!mt.indexOf("+=")&&(~mt.indexOf(" ")?mt=(oi(Nt)?Nt.split(" ")[0]:"")+mt:(wt=md(mt.substr(2),jt),mt=oi(Nt)?Nt:(E?Me.utils.mapRange(0,E.duration(),E.scrollTrigger.start,E.scrollTrigger.end,De):De)+wt,Xn=h)),mt=jM(mt,"end",R),L=Math.max(De,eS(mt||(Xn?"100% 0":Dt),Xn,jt,y,ne()+wt,ke,we,R,tt,te,X,Dt,E,R._endClamp&&"_endClamp"))||-.001,wt=0,O=S;O--;)he=Qe[O]||{},xe=he.pin,xe&&he.start-he._pinPush<=De&&!E&&he.end>0&&(B=he.end-(R._startClamp?Math.max(0,he.start):he.start),(xe===h&&he.start-he._pinPush<De||xe===Tn)&&isNaN(Nt)&&(wt+=B*(1-he.progress)),xe===d&&(Et+=B));if(De+=wt,L+=wt,R._startClamp&&(R._startClamp+=wt),R._endClamp&&!Fn&&(R._endClamp=L||-.001,L=Math.min(L,Ki(N,y))),T=L-De||(De-=.01)&&.001,tn&&(_e=Me.utils.clamp(0,1,Me.utils.normalize(De,L,ce))),R._pinPush=Et,bt&&wt&&(B={},B[y.a]="+="+wt,Tn&&(B[y.p]="-="+ne()),Me.set([bt,ke],B)),d&&!(Dg&&R.end>=Ki(N,y)))B=xi(d),re=y===Qt,k=ne(),pe=parseFloat(de(y.a))+Et,!Dt&&L>1&&(We=(G?Pt.scrollingElement||ai:N).style,We={style:We,value:We["overflow"+y.a.toUpperCase()]},G&&xi(yt)["overflow"+y.a.toUpperCase()]!=="scroll"&&(We.style["overflow"+y.a.toUpperCase()]="scroll")),Eg(d,K,B),Q=fd(d),z=Rr(d,!0),Ue=X&&Ar(N,re?Sn:Qt)(),g?(oe=[g+y.os2,T+Et+on],oe.t=K,O=g===en?Md(d,y)+T+Et:0,O&&(oe.push(y.d,O+on),K.style.flexBasis!=="auto"&&(K.style.flexBasis=O+on)),Ma(oe),Tn&&Qe.forEach(function(Ft){Ft.pin===Tn&&Ft.vars.pinSpacing!==!1&&(Ft._subPinOffset=!0)}),X&&ne(ce)):(O=Md(d,y),O&&K.style.flexBasis!=="auto"&&(K.style.flexBasis=O+on)),X&&(se={top:z.top+(re?k-De:Ue)+on,left:z.left+(re?Ue:k-De)+on,boxSizing:"border-box",position:"fixed"},se[no]=se["max"+Sa]=Math.ceil(z.width)+on,se[io]=se["max"+Bg]=Math.ceil(z.height)+on,se[yi]=se[yi+kc]=se[yi+Lc]=se[yi+Fc]=se[yi+Oc]="0",se[en]=B[en],se[en+kc]=B[en+kc],se[en+Lc]=B[en+Lc],se[en+Fc]=B[en+Fc],se[en+Oc]=B[en+Oc],V=BL(M,se,I),Fn&&ne(0)),r?(He=r._initted,xg(1),r.render(r.duration(),!0,!0),Ge=de(y.a)-pe+T+Et,Re=Math.abs(T-Ge)>1,X&&Re&&V.splice(V.length-2,2),r.render(0,!0,!0),He||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),xg(0)):Ge=T,We&&(We.value?We.style["overflow"+y.a.toUpperCase()]=We.value:We.style.removeProperty("overflow-"+y.a));else if(h&&ne()&&!E)for(z=h.parentNode;z&&z!==yt;)z._pinOffset&&(De-=z._pinOffset,L-=z._pinOffset),z=z.parentNode;Se&&Se.forEach(function(Ft){return Ft.revert(!1,!0)}),R.start=De,R.end=L,Je=Le=Fn?ce:ne(),!E&&!Fn&&(Je<ce&&ne(ce),R.scroll.rec=0),R.revert(!1,!0),ee=wn(),J&&(Y=-1,J.restart(!0)),bn=0,r&&D&&(r._initted||fe)&&r.progress()!==fe&&r.progress(fe||0,!0).render(r.time(),!0,!0),(tn||_e!==R.progress||E||_||r&&!r._initted)&&(r&&!D&&(r._initted||_e||r.vars.immediateRender!==!1)&&r.totalProgress(E&&De<-.001&&!_e?Me.utils.normalize(De,L,0):_e,!0),R.progress=tn||(Je-De)/T===_e?0:_e),d&&g&&(K._pinOffset=Math.round(R.progress*Ge)),P&&P.invalidate(),isNaN(ft)||(ft-=Me.getProperty(U,y.p),gt-=Me.getProperty(we,y.p),hd(U,y,ft),hd(bt,y,ft-(Be||0)),hd(we,y,gt),hd(ke,y,gt-(Be||0))),tn&&!Fn&&R.update(),u&&!Fn&&!Ie&&(Ie=!0,u(R),Ie=!1)}},R.getVelocity=function(){return(ne()-Le)/(wn()-Cc)*1e3||0},R.endAnimation=function(){Tc(R.callbackAnimation),r&&(P?P.progress(1):r.paused()?D||Tc(r,R.direction<0,1):Tc(r,r.reversed()))},R.labelToScroll=function(me){return r&&r.labels&&(De||R.refresh()||De)+r.labels[me]/r.duration()*T||0},R.getTrailing=function(me){var ze=Qe.indexOf(R),Te=R.direction>0?Qe.slice(0,ze).reverse():Qe.slice(ze+1);return(oi(me)?Te.filter(function(Be){return Be.vars.preventOverlaps===me}):Te).filter(function(Be){return R.direction>0?Be.end<=De:Be.start>=L})},R.update=function(me,ze,Te){if(!(E&&!Te&&!me)){var Be=Fn===!0?ce:R.scroll(),jt=me?0:(Be-De)/T,tt=jt<0?0:jt>1?1:jt||0,Dt=R.progress,tn,wt,Et,mt,Xn,Nt,Tn,S;if(ze&&(Le=Je,Je=E?ne():Be,v&&(ct=Oe,Oe=r&&!D?r.totalProgress():tt)),m&&d&&!bn&&!od&&Mi&&(!tt&&De<Be+(Be-Le)/(wn()-Cc)*m?tt=1e-4:tt===1&&L>Be+(Be-Le)/(wn()-Cc)*m&&(tt=.9999)),tt!==Dt&&R.enabled){if(tn=R.isActive=!!tt&&tt<1,wt=!!Dt&&Dt<1,Nt=tn!==wt,Xn=Nt||!!tt!=!!Dt,R.direction=tt>Dt?1:-1,R.progress=tt,Xn&&!bn&&(Et=tt&&!Dt?0:tt===1?1:Dt===1?2:3,D&&(mt=!Nt&&j[Et+1]!=="none"&&j[Et+1]||j[Et],S=r&&(mt==="complete"||mt==="reset"||mt in r))),x&&(Nt||S)&&(S||f||!r)&&(En(x)?x(R):R.getTrailing(x).forEach(function(k){return k.endAnimation()})),D||(P&&!bn&&!od?(P._dp._time-P._start!==P._time&&P.render(P._dp._time-P._start),P.resetTo?P.resetTo("totalProgress",tt,r._tTime/r._tDur):(P.vars.totalProgress=tt,P.invalidate().restart())):r&&r.totalProgress(tt,!!(bn&&(ee||me)))),d){if(me&&g&&(K.style[g+y.os2]=ie),!X)ae(Ac(pe+Ge*tt));else if(Xn){if(Tn=!me&&tt>Dt&&L+1>Be&&Be+1>=Ki(N,y),I)if(!me&&(tn||Tn)){var O=Rr(d,!0),B=Be-De;tS(d,yt,O.top+(y===Qt?B:0)+on,O.left+(y===Qt?0:B)+on)}else tS(d,K);Ma(tn||Tn?V:Q),Re&&tt<1&&tn||ae(pe+(tt===1&&!Tn?Ge:0))}}v&&!be.tween&&!bn&&!od&&J.restart(!0),a&&(Nt||w&&tt&&(tt<1||!Mg))&&Bc(a.targets).forEach(function(k){return k.classList[tn||w?"add":"remove"](a.className)}),o&&!D&&!me&&o(R),Xn&&!bn?(D&&(S&&(mt==="complete"?r.pause().totalProgress(1):mt==="reset"?r.restart(!0).pause():mt==="restart"?r.restart(!0):r[mt]()),o&&o(R)),(Nt||!Mg)&&(l&&Nt&&bg(R,l),W[Et]&&bg(R,W[Et]),w&&(tt===1?R.kill(!1,1):W[Et]=0),Nt||(Et=tt===1?1:3,W[Et]&&bg(R,W[Et]))),A&&!tn&&Math.abs(R.getVelocity())>(Dc(A)?A:2500)&&(Tc(R.callbackAnimation),P?P.progress(1):Tc(r,mt==="reverse"?1:!tt,1))):D&&o&&!bn&&o(R)}if(ye){var z=E?Be/E.duration()*(E._caScrollDist||0):Be;Ne(z+(U._isFlipped?1:0)),ye(z)}Fe&&Fe(-Be/E.duration()*(E._caScrollDist||0))}},R.enable=function(me,ze){R.enabled||(R.enabled=!0,un(N,"resize",Rc),G||un(N,"scroll",_a),ue&&un(i,"refreshInit",ue),me!==!1&&(R.progress=_e=0,Je=Le=Y=ne()),ze!==!1&&R.refresh())},R.getTween=function(me){return me&&be?be.tween:P},R.setPositions=function(me,ze,Te,Be){if(E){var jt=E.scrollTrigger,tt=E.duration(),Dt=jt.end-jt.start;me=jt.start+Dt*me/tt,ze=jt.start+Dt*ze/tt}R.refresh(!1,!1,{start:$M(me,Te&&!!R._startClamp),end:$M(ze,Te&&!!R._endClamp)},Be),R.update()},R.adjustPinSpacing=function(me){if(oe&&me){var ze=oe.indexOf(y.d)+1;oe[ze]=parseFloat(oe[ze])+me+on,oe[1]=parseFloat(oe[1])+me+on,Ma(oe)}},R.disable=function(me,ze){if(me!==!1&&R.revert(!0,!0),R.enabled&&(R.enabled=R.isActive=!1,ze||P&&P.pause(),ce=0,Ce&&(Ce.uncache=1),ue&&ln(i,"refreshInit",ue),J&&(J.pause(),be.tween&&be.tween.kill()&&(be.tween=0)),!G)){for(var Te=Qe.length;Te--;)if(Qe[Te].scroller===N&&Qe[Te]!==R)return;ln(N,"resize",Rc),G||ln(N,"scroll",_a)}},R.kill=function(me,ze){R.disable(me,ze),P&&!ze&&P.kill(),c&&delete Rg[c];var Te=Qe.indexOf(R);Te>=0&&Qe.splice(Te,1),Te===kn&&_d>0&&kn--,Te=0,Qe.forEach(function(Be){return Be.scroller===R.scroller&&(Te=1)}),Te||Fn||(R.scroll.rec=0),r&&(r.scrollTrigger=null,me&&r.revert({kill:!1}),ze||r.kill()),bt&&[bt,ke,U,we].forEach(function(Be){return Be.parentNode&&Be.parentNode.removeChild(Be)}),Uc===R&&(Uc=0),d&&(Ce&&(Ce.uncache=1),Te=0,Qe.forEach(function(Be){return Be.pin===d&&Te++}),Te||(Ce.spacer=0)),n.onKill&&n.onKill(R)},Qe.push(R),R.enable(!1,!1),dt&&dt(R),r&&r.add&&!T){var $e=R.update;R.update=function(){R.update=$e,Ke.cache++,De||L||R.refresh()},Me.delayedCall(.01,R.update),T=.01,De=L=0}else R.refresh();d&&kL()},i.register=function(n){return va||(Me=n||dS(),uS()&&window.document&&i.enable(),va=Ic),va},i.defaults=function(n){if(n)for(var r in n)ud[r]=n[r];return ud},i.disable=function(n,r){Ic=0,Qe.forEach(function(o){return o[r?"kill":"disable"](n)}),ln(it,"wheel",_a),ln(Pt,"scroll",_a),clearInterval(sd),ln(Pt,"touchcancel",Ji),ln(yt,"touchstart",Ji),cd(ln,Pt,"pointerdown,touchstart,mousedown",qM),cd(ln,Pt,"pointerup,touchend,mouseup",XM),xd.kill(),ad(ln);for(var s=0;s<Ke.length;s+=3)ld(ln,Ke[s],Ke[s+1]),ld(ln,Ke[s],Ke[s+2])},i.enable=function(){if(it=window,Pt=document,ai=Pt.documentElement,yt=Pt.body,Me&&(Bc=Me.utils.toArray,Pc=Me.utils.clamp,Ag=Me.core.context||Ji,xg=Me.core.suppressOverwrites||Ji,Og=it.history.scrollRestoration||"auto",Pg=it.pageYOffset||0,Me.core.globals("ScrollTrigger",i),yt)){Ic=1,xa=document.createElement("div"),xa.style.height="100vh",xa.style.position="absolute",MS(),AL(),Wt.register(Me),i.isTouch=Wt.isTouch,fs=Wt.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Ig=Wt.isTouch===1,un(it,"wheel",_a),Lg=[it,Pt,ai,yt],Me.matchMedia?(i.matchMedia=function(l){var u=Me.matchMedia(),f;for(f in l)u.add(f,l[f]);return u},Me.addEventListener("matchMediaInit",function(){yS(),zg()}),Me.addEventListener("matchMediaRevert",function(){return vS()}),Me.addEventListener("matchMedia",function(){to(0,1),ao("matchMedia")}),Me.matchMedia().add("(orientation: portrait)",function(){return wg(),wg})):console.warn("Requires GSAP 3.11.0 or later"),wg(),un(Pt,"scroll",_a);var n=yt.hasAttribute("style"),r=yt.style,s=r.borderTopStyle,o=Me.core.Animation.prototype,a,c;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),r.borderTopStyle="solid",a=Rr(yt),Qt.m=Math.round(a.top+Qt.sc())||0,Sn.m=Math.round(a.left+Sn.sc())||0,s?r.borderTopStyle=s:r.removeProperty("border-top-style"),n||(yt.setAttribute("style",""),yt.removeAttribute("style")),sd=setInterval(JM,250),Me.delayedCall(.5,function(){return od=0}),un(Pt,"touchcancel",Ji),un(yt,"touchstart",Ji),cd(un,Pt,"pointerdown,touchstart,mousedown",qM),cd(un,Pt,"pointerup,touchend,mouseup",XM),Cg=Me.utils.checkPrefix("transform"),vd.push(Cg),va=wn(),xd=Me.delayedCall(.2,to).pause(),ya=[Pt,"visibilitychange",function(){var l=it.innerWidth,u=it.innerHeight;Pt.hidden?(GM=l,WM=u):(GM!==l||WM!==u)&&Rc()},Pt,"DOMContentLoaded",to,it,"load",to,it,"resize",Rc],ad(un),Qe.forEach(function(l){return l.enable(0,1)}),c=0;c<Ke.length;c+=3)ld(ln,Ke[c],Ke[c+1]),ld(ln,Ke[c],Ke[c+2])}},i.config=function(n){"limitCallbacks"in n&&(Mg=!!n.limitCallbacks);var r=n.syncInterval;r&&clearInterval(sd)||(sd=r)&&setInterval(JM,r),"ignoreMobileResize"in n&&(Ig=i.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(ad(ln)||ad(un,n.autoRefreshEvents||"none"),aS=(n.autoRefreshEvents+"").indexOf("resize")===-1)},i.scrollerProxy=function(n,r){var s=Ln(n),o=Ke.indexOf(s),a=so(s);~o&&Ke.splice(o,a?6:2),r&&(a?Bi.unshift(it,r,yt,r,ai,r):Bi.unshift(s,r))},i.clearMatchMedia=function(n){Qe.forEach(function(r){return r._ctx&&r._ctx.query===n&&r._ctx.kill(!0,!0)})},i.isInViewport=function(n,r,s){var o=(oi(n)?Ln(n):n).getBoundingClientRect(),a=o[s?no:io]*r||0;return s?o.right-a>0&&o.left+a<it.innerWidth:o.bottom-a>0&&o.top+a<it.innerHeight},i.positionInViewport=function(n,r,s){oi(n)&&(n=Ln(n));var o=n.getBoundingClientRect(),a=o[s?no:io],c=r==null?a/2:r in Sd?Sd[r]*a:~r.indexOf("%")?parseFloat(r)*a/100:parseFloat(r)||0;return s?(o.left+c)/it.innerWidth:(o.top+c)/it.innerHeight},i.killAll=function(n){if(Qe.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var r=oo.killAll||[];oo={},r.forEach(function(s){return s()})}},i}();et.version="3.14.2";et.saveStyles=function(i){return i?Bc(i).forEach(function(e){if(e&&e.style){var t=si.indexOf(e);t>=0&&si.splice(t,5),si.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Me.core.getCache(e),Ag())}}):si};et.revert=function(i,e){return zg(!i,e)};et.create=function(i,e){return new et(i,e)};et.refresh=function(i){return i?Rc(!0):(va||et.register())&&to(!0)};et.update=function(i){return++Ke.cache&&Pr(i===!0?2:0)};et.clearScrollMemory=xS;et.maxScroll=function(i,e){return Ki(i,e?Sn:Qt)};et.getScrollFunc=function(i,e){return Ar(Ln(i),e?Sn:Qt)};et.getById=function(i){return Rg[i]};et.getAll=function(){return Qe.filter(function(i){return i.vars.id!=="ScrollSmoother"})};et.isScrolling=function(){return!!Mi};et.snapDirectional=Vg;et.addEventListener=function(i,e){var t=oo[i]||(oo[i]=[]);~t.indexOf(e)||t.push(e)};et.removeEventListener=function(i,e){var t=oo[i],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};et.batch=function(i,e){var t=[],n={},r=e.interval||.016,s=e.batchMax||1e9,o=function(l,u){var f=[],h=[],d=Me.delayedCall(r,function(){u(f,h),f=[],h=[]}).pause();return function(g){f.length||d.restart(!0),f.push(g.trigger),h.push(g),s<=f.length&&d.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&En(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return En(s)&&(s=s(),un(et,"refresh",function(){return s=e.batchMax()})),Bc(i).forEach(function(c){var l={};for(a in n)l[a]=n[a];l.trigger=c,t.push(et.create(l))}),t};var iS=function(e,t,n,r){return t>r?e(r):t<0&&e(0),n>r?(r-t)/(n-t):n<0?t/(t-n):1},Tg=function i(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Wt.isTouch?" pinch-zoom":""):"none",e===ai&&i(yt,t)},pd={auto:1,scroll:1},zL=function(e){var t=e.event,n=e.target,r=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||Me.core.getCache(s),a=wn(),c;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==yt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(pd[(c=xi(s)).overflowY]||pd[c.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!so(s)&&(pd[(c=xi(s)).overflowY]||pd[c.overflowX]),o._isScrollT=a}(o._isScroll||r==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},bS=function(e,t,n,r){return Wt.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:r=r&&zL,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return n&&un(Pt,Wt.eventTypes[0],sS,!1,!0)},onDisable:function(){return ln(Pt,Wt.eventTypes[0],sS,!0)}})},HL=/(input|label|select|textarea)/i,rS,sS=function(e){var t=HL.test(e.target.tagName);(t||rS)&&(e._gsapAllow=!0,rS=t)},GL=function(e){eo(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,r=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,c,l=Ln(e.target)||ai,u=Me.core.globals().ScrollSmoother,f=u&&u.get(),h=fs&&(e.content&&Ln(e.content)||f&&e.content!==!1&&!f.smooth()&&f.content()),d=Ar(l,Qt),g=Ar(l,Sn),_=1,m=(Wt.isTouch&&it.visualViewport?it.visualViewport.scale*it.visualViewport.width:it.outerWidth)/it.innerWidth,p=0,b=En(r)?function(){return r(a)}:function(){return r||2.8},w,v,I=bS(l,e.type,!0,s),C=function(){return v=!1},E=Ji,A=Ji,x=function(){c=Ki(l,Qt),A=Pc(fs?1:0,c),n&&(E=Pc(0,Ki(l,Sn))),w=ro},y=function(){h._gsap.y=Ac(parseFloat(h._gsap.y)+d.offset)+"px",h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(h._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},D=function(){if(v){requestAnimationFrame(C);var H=Ac(a.deltaY/2),te=A(d.v-H);if(h&&te!==d.v+d.offset){d.offset=te-d.v;var R=Ac((parseFloat(h&&h._gsap.y)||0)-d.offset);h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+R+", 0, 1)",h._gsap.y=R+"px",d.cacheID=Ke.cache,Pr()}return!0}d.offset&&y(),v=!0},N,F,G,X,W=function(){x(),N.isActive()&&N.vars.scrollY>c&&(d()>c?N.progress(1)&&d(c):N.resetTo("scrollY",c))};return h&&Me.set(h,{y:"+=0"}),e.ignoreCheck=function(j){return fs&&j.type==="touchmove"&&D(j)||_>1.05&&j.type!=="touchstart"||a.isGesturing||j.touches&&j.touches.length>1},e.onPress=function(){v=!1;var j=_;_=Ac((it.visualViewport&&it.visualViewport.scale||1)/m),N.pause(),j!==_&&Tg(l,_>1.01?!0:n?!1:"x"),F=g(),G=d(),x(),w=ro},e.onRelease=e.onGestureStart=function(j,H){if(d.offset&&y(),!H)X.restart(!0);else{Ke.cache++;var te=b(),R,ue;n&&(R=g(),ue=R+te*.05*-j.velocityX/.227,te*=iS(g,R,ue,Ki(l,Sn)),N.vars.scrollX=E(ue)),R=d(),ue=R+te*.05*-j.velocityY/.227,te*=iS(d,R,ue,Ki(l,Qt)),N.vars.scrollY=A(ue),N.invalidate().duration(te).play(.01),(fs&&N.vars.scrollY>=c||R>=c-1)&&Me.to({},{onUpdate:W,duration:te})}o&&o(j)},e.onWheel=function(){N._ts&&N.pause(),wn()-p>1e3&&(w=0,p=wn())},e.onChange=function(j,H,te,R,ue){if(ro!==w&&x(),H&&n&&g(E(R[2]===H?F+(j.startX-j.x):g()+H-R[1])),te){d.offset&&y();var Pe=ue[2]===te,Ze=Pe?G+j.startY-j.y:d()+te-ue[1],Y=A(Ze);Pe&&Ze!==Y&&(G+=Y-Ze),d(Y)}(te||H)&&Pr()},e.onEnable=function(){Tg(l,n?!1:"x"),et.addEventListener("refresh",W),un(it,"resize",W),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=g.smooth=!1),I.enable()},e.onDisable=function(){Tg(l,!0),ln(it,"resize",W),et.removeEventListener("refresh",W),I.kill()},e.lockAxis=e.lockAxis!==!1,a=new Wt(e),a.iOS=fs,fs&&!d()&&d(1),fs&&Me.ticker.add(Ji),X=a._dc,N=Me.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:SS(d,d(),function(){return N.pause()})},onUpdate:Pr,onComplete:X.vars.onComplete}),a};et.sort=function(i){if(En(i))return Qe.sort(i);var e=it.pageYOffset||0;return et.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+it.innerHeight}),Qe.sort(i||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};et.observe=function(i){return new Wt(i)};et.normalizeScroll=function(i){if(typeof i>"u")return On;if(i===!0&&On)return On.enable();if(i===!1){On&&On.kill(),On=i;return}var e=i instanceof Wt?i:GL(i);return On&&On.target===e.target&&On.kill(),so(e.target)&&(On=e),e};et.core={_getVelocityProp:rd,_inputObserver:bS,_scrollers:Ke,_proxies:Bi,bridge:{ss:function(){Mi||ao("scrollStart"),Mi=wn()},ref:function(){return bn}}};dS()&&Me.registerPlugin(et);var WL=["webglCanvas"];Cr.registerPlugin(et);var wS=(()=>{class i{ngZone;canvasRef;scene;camera;renderer;particlesMesh;requestID=null;uniformTime={value:0};uniformProgress={value:0};mouseX=0;mouseY=0;constructor(t){this.ngZone=t}ngAfterViewInit(){this.initThree(),this.initGSAP(),this.initCursor()}ngOnDestroy(){this.requestID!==null&&cancelAnimationFrame(this.requestID),et.getAll().forEach(t=>t.kill())}onMouseMove(t){this.mouseX=(t.clientX/window.innerWidth-.5)*2,this.mouseY=(t.clientY/window.innerHeight-.5)*2;let n=document.querySelector(".custom-cursor");n&&Cr.to(n,{x:t.clientX,y:t.clientY,duration:.1,ease:"power2.out"})}onResize(){this.camera&&this.renderer&&(this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight))}initThree(){let t=this.canvasRef.nativeElement;this.renderer=new Du({canvas:t,alpha:!0,antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.scene=new Ru,this.camera=new An(75,window.innerWidth/window.innerHeight,.1,1e3),this.camera.position.z=5;let n=new $i,r=12e3,s=new Float32Array(r*3),o=new Float32Array(r*3),a=new Float32Array(r*3),c=new Float32Array(r*3),l=new Float32Array(r),u=new ot(4906624),f=new ot(13938487),h=new ot(10980346);for(let g=0;g<r;g++){let _=g/r,m,p,b;if(_<.1){let N=_*10;m=(Math.random()-.5)*.1,p=N*8-4,b=(Math.random()-.5)*.1}else{let N=(_-.1)/.9,F=g*2.39996,G=Math.sin(N*Math.PI)*2.5+Math.random()*.2;p=N*7-3,m=Math.cos(F)*G,b=Math.sin(F)*G}s[g*3]=m,s[g*3+1]=p,s[g*3+2]=b;let w,v,I;if(_<.1){let N=_*10;w=Math.sin(N*5)*.2,v=-N*8+2,I=Math.cos(N*5)*.2}else{let N=(_-.1)/.9,F=g*1.7+Math.sin(N*10),G=Math.pow(N,1.2)*5+Math.random()*.5;v=-N*7+1,w=Math.cos(F)*G,I=Math.sin(F)*G}o[g*3]=w,o[g*3+1]=v,o[g*3+2]=I;let C=Math.random(),E=Math.random(),A=C*2*Math.PI,x=Math.acos(2*E-1),y=Math.cbrt(Math.random())*8;a[g*3]=y*Math.sin(x)*Math.cos(A),a[g*3+1]=y*Math.sin(x)*Math.sin(A),a[g*3+2]=y*Math.cos(x);let D;Math.random()>.5?D=u.clone().lerp(f,Math.random()):D=f.clone().lerp(h,Math.random()),c[g*3]=D.r,c[g*3+1]=D.g,c[g*3+2]=D.b,l[g]=Math.random()}n.setAttribute("position",new cn(s,3)),n.setAttribute("rootPosition",new cn(o,3)),n.setAttribute("sporePosition",new cn(a,3)),n.setAttribute("color",new cn(c,3)),n.setAttribute("aRandom",new cn(l,1));let d=new mi({uniforms:{uProgress:this.uniformProgress,uTime:this.uniformTime},vertexShader:`
                uniform float uProgress;
                uniform float uTime;
                attribute vec3 rootPosition;
                attribute vec3 sporePosition;
                attribute vec3 color;
                attribute float aRandom;
                varying vec3 vColor;
                
                void main() {
                    // Stage 1: Plant(0) to Root(1)
                    float step1 = clamp(uProgress, 0.0, 1.0);
                    vec3 mix1 = mix(position, rootPosition, step1);
                    
                    // Stage 2: Root(1) to Spores(2)
                    float step2 = clamp(uProgress - 1.0, 0.0, 1.0);
                    vec3 finalPos = mix(mix1, sporePosition, step2);
                    
                    // Add subtle floating motion using aRandom and uTime
                    finalPos.x += sin(uTime * 0.5 + aRandom * 10.0) * 0.1;
                    finalPos.y += cos(uTime * 0.5 + aRandom * 10.0) * 0.05;
                    finalPos.z += sin(uTime * 0.5 + aRandom * 10.0) * 0.1;
                    
                    vColor = color;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
                    // Point size shrinks as it gets further, also depends on Stage 2 to make spores smaller
                    gl_PointSize = (20.0 - (step2 * 10.0)) * (1.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,fragmentShader:`
                varying vec3 vColor;
                void main() {
                    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
                    float r = dot(cxy, cxy);
                    if (r > 1.0) discard; // Circular point
                    
                    // Soft gradient fade for particles
                    float alpha = (1.0 - sqrt(r)) * 0.8;
                    gl_FragColor = vec4(vColor, alpha);
                }
            `,transparent:!0,blending:hu,depthWrite:!1});this.particlesMesh=new Pu(n,d),this.scene.add(this.particlesMesh),this.ngZone.runOutsideAngular(()=>{let g=()=>{this.uniformTime.value+=.02,this.camera.position.x+=(this.mouseX*.5-this.camera.position.x)*.05,this.camera.position.y+=(-this.mouseY*.5-this.camera.position.y)*.05,this.camera.lookAt(this.scene.position),this.particlesMesh.rotation.y+=.001,this.particlesMesh.rotation.y+=this.uniformProgress.value*.002,this.renderer.render(this.scene,this.camera),this.requestID=requestAnimationFrame(g)};g()})}initGSAP(){Cr.to(this.uniformProgress,{value:2,scrollTrigger:{trigger:".scroll-container",start:"top top",end:"bottom bottom",scrub:1}}),Cr.to(this.particlesMesh.rotation,{y:Math.PI*2,z:Math.PI*.2,scrollTrigger:{trigger:".scroll-container",start:"top top",end:"bottom bottom",scrub:1}}),Cr.to(this.particlesMesh.scale,{x:1.2,y:1.2,z:1.2,scrollTrigger:{trigger:".scroll-container",start:"top top",end:"bottom bottom",scrub:1}}),Cr.utils.toArray(".panel").forEach(n=>{let r=n.querySelector(".content");r&&Cr.fromTo(r,{opacity:0,y:100},{opacity:1,y:0,duration:1,scrollTrigger:{trigger:n,start:"top 70%",end:"center center",scrub:1}})})}initCursor(){let t=document.querySelectorAll(".circle-btn, .menu-btn, .dot"),n=document.querySelector(".custom-cursor");t.forEach(r=>{r.addEventListener("mouseenter",()=>n.classList.add("active")),r.addEventListener("mouseleave",()=>n.classList.remove("active"))})}static \u0275fac=function(n){return new(n||i)(uh(dn))};static \u0275cmp=By({type:i,selectors:[["app-root"]],viewQuery:function(n,r){if(n&1&&Gy(WL,5),n&2){let s;Wy(s=jy())&&(r.canvasRef=s.first)}},hostBindings:function(n,r){n&1&&hh("mousemove",function(o){return r.onMouseMove(o)},!1,Qf)("resize",function(){return r.onResize()},!1,Qf)},decls:50,vars:0,consts:[["webglCanvas",""],[1,"webgl-container"],["id","webgl-canvas"],[1,"vignette"],[1,"side-nav"],[1,"dot","active"],[1,"dot"],[1,"menu-btn"],[1,"line"],[1,"scroll-container"],[1,"panel","hero-panel"],[1,"content"],["data-text","PLANT. REVOLUTIONIZED.",1,"glitch"],[1,"panel"],[1,"content","right"],[1,"section-title"],[1,"section-desc"],[1,"circle-btn"],[1,"btn-text"],[1,"btn-ring"],[1,"content","left"],[1,"panel","testing-panel"],[1,"content","center"],[1,"custom-cursor"]],template:function(n,r){n&1&&(fn(0,"div",1),ar(1,"canvas",2,0)(3,"div",3),Zt(),fn(4,"nav",4),ar(5,"div",5)(6,"div",6)(7,"div",6)(8,"div",6),Zt(),fn(9,"div",7),ar(10,"div",8)(11,"div",8),Zt(),fn(12,"div",9)(13,"section",10)(14,"div",11)(15,"h1",12),fi(16,"PLANT. REVOLUTIONIZED."),Zt(),fn(17,"p"),fi(18,"Scroll down to explore the future of nature."),Zt()()(),fn(19,"section",13)(20,"div",14)(21,"h2",15),fi(22,"FIRST, A SOLID FOUNDATION"),Zt(),fn(23,"p",16),fi(24,"Nature and AI combined for your health. We study the traditional medicines with the power of modern deep learning to uncover hidden bonds."),Zt(),fn(25,"button",17)(26,"span",18),fi(27,"EXPLORE THE LIBRARY"),Zt(),ar(28,"div",19),Zt()()(),fn(29,"section",13)(30,"div",20)(31,"h2",15),fi(32,"THE SEED OF KNOWLEDGE"),Zt(),fn(33,"p",16),fi(34,"Traditional wisdom meets modern analysis. Our process carefully cultivates ancient knowledge and transforms it into actionable scientific data."),Zt(),fn(35,"button",17)(36,"span",18),fi(37,"LEARN MORE"),Zt(),ar(38,"div",19),Zt()()(),fn(39,"section",21)(40,"div",22)(41,"h2",15),fi(42,"WE TAKE IT TO THE FIELD"),Zt(),fn(43,"p",16),fi(44,"Testing the boundaries of natural remedies. Every discovery undergoes rigorous simulated trials."),Zt(),fn(45,"button",17)(46,"span",18),fi(47,"EXPERIENCE THE TESTS"),Zt(),ar(48,"div",19),Zt()()()(),ar(49,"div",23))},styles:['[_nghost-%COMP%]{display:block;width:100%;min-height:100vh}.webgl-container[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:0;pointer-events:none}.webgl-container[_ngcontent-%COMP%]   .vignette[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;box-shadow:inset 0 0 150px #000000e6;pointer-events:none}.scroll-container[_ngcontent-%COMP%]{position:relative;z-index:10}.panel[_ngcontent-%COMP%]{height:100vh;width:100vw;display:flex;align-items:center;padding:0 10vw;position:relative}.panel[_ngcontent-%COMP%]:after{content:"";position:absolute;bottom:0;left:0;width:100%;height:1px;background:radial-gradient(circle,#4ade8033,#0000 80%)}.hero-panel[_ngcontent-%COMP%]{justify-content:center;text-align:center}.hero-panel[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#9abfa7;font-size:1.2rem;letter-spacing:2px;text-transform:uppercase;margin-top:1rem;opacity:.7}.content[_ngcontent-%COMP%]{max-width:500px;width:100%}.content.right[_ngcontent-%COMP%]{margin-left:auto}.content.left[_ngcontent-%COMP%]{margin-right:auto}.content.center[_ngcontent-%COMP%]{margin:0 auto;text-align:center;display:flex;flex-direction:column;align-items:center}h1.glitch[_ngcontent-%COMP%]{font-family:Anton,sans-serif;font-size:6rem;font-weight:400;letter-spacing:4px;margin:0;color:#e5ffe8;text-shadow:0 0 20px rgba(74,222,128,.5);line-height:1}.section-title[_ngcontent-%COMP%]{font-family:Anton,sans-serif;font-size:3.5rem;color:#e5ffe8;margin:0 0 1.5rem;line-height:1.1;letter-spacing:1px;text-shadow:0 0 10px rgba(74,222,128,.3)}.section-desc[_ngcontent-%COMP%]{font-size:1.2rem;color:#9abfa7;margin-bottom:3rem;line-height:1.6;font-weight:300}.circle-btn[_ngcontent-%COMP%]{background:transparent;border:none;position:relative;width:150px;height:150px;display:flex;align-items:center;justify-content:center;border-radius:50%;color:#fff;font-weight:600;font-size:.8rem;letter-spacing:1.5px;padding:20px;text-align:center;transition:all .4s cubic-bezier(.25,1,.5,1)}.circle-btn[_ngcontent-%COMP%]   .btn-ring[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;border:1px solid rgba(255,255,255,.15);border-radius:50%;transition:all .6s cubic-bezier(.25,1,.5,1)}.circle-btn[_ngcontent-%COMP%]:hover   .btn-ring[_ngcontent-%COMP%]{border-color:#4ade80;transform:scale(1.15);box-shadow:0 0 30px #4ade804d,inset 0 0 15px #4ade801a}.circle-btn[_ngcontent-%COMP%]:hover   .btn-text[_ngcontent-%COMP%]{color:#4ade80;text-shadow:0 0 8px rgba(74,222,128,.8)}.circle-btn[_ngcontent-%COMP%]   .btn-text[_ngcontent-%COMP%]{position:relative;z-index:2;transition:color .3s}.side-nav[_ngcontent-%COMP%]{position:fixed;right:3vw;top:50%;transform:translateY(-50%);z-index:100;display:flex;flex-direction:column;gap:1.5rem}.side-nav[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%]{width:6px;height:6px;border-radius:50%;background:#fff3;transition:all .3s ease}.side-nav[_ngcontent-%COMP%]   .dot.active[_ngcontent-%COMP%]{background:#4ade80;transform:scale(1.8);box-shadow:0 0 10px #4ade80cc}.side-nav[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%]:hover{background:#fffc}.menu-btn[_ngcontent-%COMP%]{position:fixed;top:3vw;left:3vw;z-index:100;width:40px;height:40px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:8px}.menu-btn[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]{width:30px;height:2px;background:#fff;transition:all .4s ease}.menu-btn[_ngcontent-%COMP%]:hover   .line[_ngcontent-%COMP%]:nth-child(1){transform:translateY(-4px);background:#4ade80}.menu-btn[_ngcontent-%COMP%]:hover   .line[_ngcontent-%COMP%]:nth-child(2){transform:translateY(4px);background:#4ade80}.custom-cursor[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:15px;height:15px;border-radius:50%;background-color:#fff;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .3s cubic-bezier(.25,1,.5,1),height .3s cubic-bezier(.25,1,.5,1),background-color .3s ease;mix-blend-mode:exclusion}.custom-cursor.active[_ngcontent-%COMP%]{width:80px;height:80px;background-color:transparent;border:1px solid #4ade80;mix-blend-mode:screen;box-shadow:inset 0 0 10px #4ade804d}@media (max-width: 768px){.panel[_ngcontent-%COMP%]{padding:0 30px}h1.glitch[_ngcontent-%COMP%]{font-size:3.5rem}.section-title[_ngcontent-%COMP%]{font-size:2.5rem}.side-nav[_ngcontent-%COMP%]{display:none}}']})}return i})();Eh(wS,{providers:[]}).catch(i=>console.error(i));
