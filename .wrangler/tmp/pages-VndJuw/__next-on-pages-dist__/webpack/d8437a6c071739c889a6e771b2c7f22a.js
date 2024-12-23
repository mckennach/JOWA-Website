var ee={},ke=(ve,ye,xe)=>(ee.__chunk_8976=(J,H,B)=>{"use strict";function D(R){return Array.isArray(R)?R:[R]}function F(R,N){return N==="robots"?function(O){let P="";for(let g of Array.isArray(O.rules)?O.rules:[O.rules]){for(let _ of D(g.userAgent||["*"]))P+=`User-Agent: ${_}
`;if(g.allow)for(let _ of D(g.allow))P+=`Allow: ${_}
`;if(g.disallow)for(let _ of D(g.disallow))P+=`Disallow: ${_}
`;g.crawlDelay&&(P+=`Crawl-delay: ${g.crawlDelay}
`),P+=`
`}return O.host&&(P+=`Host: ${O.host}
`),O.sitemap&&D(O.sitemap).forEach(g=>{P+=`Sitemap: ${g}
`}),P}(R):N==="sitemap"?function(O){let P=O.some(s=>Object.keys(s.alternates??{}).length>0),g="";for(let s of(g+=`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`,P?g+=` xmlns:xhtml="http://www.w3.org/1999/xhtml">
`:g+=`>
`,O)){var _;g+=`<url>
<loc>${s.url}</loc>
`;let z=(_=s.alternates)==null?void 0:_.languages;if(z&&Object.keys(z).length)for(let o in z)g+=`<xhtml:link rel="alternate" hreflang="${o}" href="${z[o]}" />
`;if(s.lastModified){let o=s.lastModified instanceof Date?s.lastModified.toISOString():s.lastModified;g+=`<lastmod>${o}</lastmod>
`}s.changeFrequency&&(g+=`<changefreq>${s.changeFrequency}</changefreq>
`),typeof s.priority=="number"&&(g+=`<priority>${s.priority}</priority>
`),g+=`</url>
`}return g+`</urlset>
`}(R):N==="manifest"?JSON.stringify(R):""}B.d(H,{Nk:()=>F})},ee.__chunk_624=(J,H,B)=>{"use strict";function D(i){return i.replace(/\/$/,"")||"/"}function F(i){let e=i.indexOf("#"),n=i.indexOf("?"),h=n>-1&&(e<0||n<e);return h||e>-1?{pathname:i.substring(0,h?n:e),query:h?i.substring(n,e>-1?e:void 0):"",hash:e>-1?i.slice(e):""}:{pathname:i,query:"",hash:""}}function R(i,e){if(!i.startsWith("/")||!e)return i;let{pathname:n,query:h,hash:l}=F(i);return""+e+n+h+l}function N(i,e){if(!i.startsWith("/")||!e)return i;let{pathname:n,query:h,hash:l}=F(i);return""+n+e+h+l}function O(i,e){if(typeof i!="string")return!1;let{pathname:n}=F(i);return n===e||n.startsWith(e+"/")}function P(i,e){let n,h=i.split("/");return(e||[]).some(l=>!!h[1]&&h[1].toLowerCase()===l.toLowerCase()&&(n=l,h.splice(1,1),i=h.join("/")||"/",!0)),{pathname:i,detectedLocale:n}}B.d(H,{xk:()=>t});let g=/(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;function _(i,e){return new URL(String(i).replace(g,"localhost"),e&&String(e).replace(g,"localhost"))}let s=Symbol("NextURLInternal");class z{constructor(e,n,h){let l,u;typeof n=="object"&&"pathname"in n||typeof n=="string"?(l=n,u=h||{}):u=h||n||{},this[s]={url:_(e,l??u.base),options:u,basePath:""},this.analyze()}analyze(){var e,n,h,l,u;let c=function(A,w){var j,E;let{basePath:T,i18n:U,trailingSlash:M}=(j=w.nextConfig)!=null?j:{},S={pathname:A,trailingSlash:A!=="/"?A.endsWith("/"):M};T&&O(S.pathname,T)&&(S.pathname=function(q,X){if(!O(q,X))return q;let Z=q.slice(X.length);return Z.startsWith("/")?Z:"/"+Z}(S.pathname,T),S.basePath=T);let k=S.pathname;if(S.pathname.startsWith("/_next/data/")&&S.pathname.endsWith(".json")){let q=S.pathname.replace(/^\/_next\/data\//,"").replace(/\.json$/,"").split("/"),X=q[0];S.buildId=X,k=q[1]!=="index"?"/"+q.slice(1).join("/"):"/",w.parseData===!0&&(S.pathname=k)}if(U){let q=w.i18nProvider?w.i18nProvider.analyze(S.pathname):P(S.pathname,U.locales);S.locale=q.detectedLocale,S.pathname=(E=q.pathname)!=null?E:S.pathname,!q.detectedLocale&&S.buildId&&(q=w.i18nProvider?w.i18nProvider.analyze(k):P(k,U.locales)).detectedLocale&&(S.locale=q.detectedLocale)}return S}(this[s].url.pathname,{nextConfig:this[s].options.nextConfig,parseData:!0,i18nProvider:this[s].options.i18nProvider}),C=function(A,w){let j;if(w?.host&&!Array.isArray(w.host))j=w.host.toString().split(":",1)[0];else{if(!A.hostname)return;j=A.hostname}return j.toLowerCase()}(this[s].url,this[s].options.headers);this[s].domainLocale=this[s].options.i18nProvider?this[s].options.i18nProvider.detectDomainLocale(C):function(A,w,j){if(A)for(let U of(j&&(j=j.toLowerCase()),A)){var E,T;if(w===((E=U.domain)==null?void 0:E.split(":",1)[0].toLowerCase())||j===U.defaultLocale.toLowerCase()||((T=U.locales)==null?void 0:T.some(M=>M.toLowerCase()===j)))return U}}((n=this[s].options.nextConfig)==null||(e=n.i18n)==null?void 0:e.domains,C);let $=((h=this[s].domainLocale)==null?void 0:h.defaultLocale)||((u=this[s].options.nextConfig)==null||(l=u.i18n)==null?void 0:l.defaultLocale);this[s].url.pathname=c.pathname,this[s].defaultLocale=$,this[s].basePath=c.basePath??"",this[s].buildId=c.buildId,this[s].locale=c.locale??$,this[s].trailingSlash=c.trailingSlash}formatPathname(){var e;let n;return n=function(h,l,u,c){if(!l||l===u)return h;let C=h.toLowerCase();return!c&&(O(C,"/api")||O(C,"/"+l.toLowerCase()))?h:R(h,"/"+l)}((e={basePath:this[s].basePath,buildId:this[s].buildId,defaultLocale:this[s].options.forceLocale?void 0:this[s].defaultLocale,locale:this[s].locale,pathname:this[s].url.pathname,trailingSlash:this[s].trailingSlash}).pathname,e.locale,e.buildId?void 0:e.defaultLocale,e.ignorePrefix),(e.buildId||!e.trailingSlash)&&(n=D(n)),e.buildId&&(n=N(R(n,"/_next/data/"+e.buildId),e.pathname==="/"?"index.json":".json")),n=R(n,e.basePath),!e.buildId&&e.trailingSlash?n.endsWith("/")?n:N(n,"/"):D(n)}formatSearch(){return this[s].url.search}get buildId(){return this[s].buildId}set buildId(e){this[s].buildId=e}get locale(){return this[s].locale??""}set locale(e){var n,h;if(!this[s].locale||!(!((h=this[s].options.nextConfig)==null||(n=h.i18n)==null)&&n.locales.includes(e)))throw TypeError(`The NextURL configuration includes no locale "${e}"`);this[s].locale=e}get defaultLocale(){return this[s].defaultLocale}get domainLocale(){return this[s].domainLocale}get searchParams(){return this[s].url.searchParams}get host(){return this[s].url.host}set host(e){this[s].url.host=e}get hostname(){return this[s].url.hostname}set hostname(e){this[s].url.hostname=e}get port(){return this[s].url.port}set port(e){this[s].url.port=e}get protocol(){return this[s].url.protocol}set protocol(e){this[s].url.protocol=e}get href(){let e=this.formatPathname(),n=this.formatSearch();return`${this.protocol}//${this.host}${e}${n}${this.hash}`}set href(e){this[s].url=_(e),this.analyze()}get origin(){return this[s].url.origin}get pathname(){return this[s].url.pathname}set pathname(e){this[s].url.pathname=e}get hash(){return this[s].url.hash}set hash(e){this[s].url.hash=e}get search(){return this[s].url.search}set search(e){this[s].url.search=e}get password(){return this[s].url.password}set password(e){this[s].url.password=e}get username(){return this[s].url.username}set username(e){this[s].url.username=e}get basePath(){return this[s].basePath}set basePath(e){this[s].basePath=e.startsWith("/")?e:`/${e}`}toString(){return this.href}toJSON(){return this.href}[Symbol.for("edge-runtime.inspect.custom")](){return{href:this.href,origin:this.origin,protocol:this.protocol,username:this.username,password:this.password,host:this.host,hostname:this.hostname,port:this.port,pathname:this.pathname,search:this.search,searchParams:this.searchParams,hash:this.hash}}clone(){return new z(String(this),this[s].options)}}function o(i){try{return String(new URL(String(i)))}catch(e){throw Error(`URL is malformed "${String(i)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`,{cause:e})}}var d=B(4025);Symbol("internal request"),Symbol.for("edge-runtime.inspect.custom");class b{static get(e,n,h){let l=Reflect.get(e,n,h);return typeof l=="function"?l.bind(e):l}static set(e,n,h,l){return Reflect.set(e,n,h,l)}static has(e,n){return Reflect.has(e,n)}static deleteProperty(e,n){return Reflect.deleteProperty(e,n)}}let f=Symbol("internal response"),r=new Set([301,302,303,307,308]);function a(i,e){var n;if(!(i==null||(n=i.request)==null)&&n.headers){if(!(i.request.headers instanceof Headers))throw Error("request.headers must be an instance of Headers");let h=[];for(let[l,u]of i.request.headers)e.set("x-middleware-request-"+l,u),h.push(l);e.set("x-middleware-override-headers",h.join(","))}}class t extends Response{constructor(e,n={}){super(e,n);let h=this.headers,l=new Proxy(new d.ResponseCookies(h),{get(u,c,C){switch(c){case"delete":case"set":return(...$)=>{let A=Reflect.apply(u[c],u,$),w=new Headers(h);return A instanceof d.ResponseCookies&&h.set("x-middleware-set-cookie",A.getAll().map(j=>(0,d.stringifyCookie)(j)).join(",")),a(n,w),A};default:return b.get(u,c,C)}}});this[f]={cookies:l,url:n.url?new z(n.url,{headers:function(u){let c={},C=[];if(u)for(let[$,A]of u.entries())$.toLowerCase()==="set-cookie"?(C.push(...function(w){var j,E,T,U,M,S=[],k=0;function q(){for(;k<w.length&&/\s/.test(w.charAt(k));)k+=1;return k<w.length}for(;k<w.length;){for(j=k,M=!1;q();)if((E=w.charAt(k))===","){for(T=k,k+=1,q(),U=k;k<w.length&&(E=w.charAt(k))!=="="&&E!==";"&&E!==",";)k+=1;k<w.length&&w.charAt(k)==="="?(M=!0,k=U,S.push(w.substring(j,T)),j=k):k=T+1}else k+=1;(!M||k>=w.length)&&S.push(w.substring(j,w.length))}return S}(A)),c[$]=C.length===1?C[0]:C):c[$]=A;return c}(h),nextConfig:n.nextConfig}):void 0}}[Symbol.for("edge-runtime.inspect.custom")](){return{cookies:this.cookies,url:this.url,body:this.body,bodyUsed:this.bodyUsed,headers:Object.fromEntries(this.headers),ok:this.ok,redirected:this.redirected,status:this.status,statusText:this.statusText,type:this.type}}get cookies(){return this[f].cookies}static json(e,n){let h=Response.json(e,n);return new t(h.body,h)}static redirect(e,n){let h=typeof n=="number"?n:n?.status??307;if(!r.has(h))throw RangeError('Failed to execute "redirect" on "response": Invalid status code');let l=typeof n=="object"?n:{},u=new Headers(l?.headers);return u.set("Location",o(e)),new t(null,{...l,headers:u,status:h})}static rewrite(e,n){let h=new Headers(n?.headers);return h.set("x-middleware-rewrite",o(e)),a(n,h),new t(null,{...n,headers:h})}static next(e){let n=new Headers(e?.headers);return n.set("x-middleware-next","1"),a(e,n),new t(null,{...e,headers:n})}}B(1882),typeof URLPattern>"u"||URLPattern},ee.__chunk_1882=(J,H,B)=>{var D;(()=>{var F={226:function(P,g){(function(_,s){"use strict";var z="function",o="undefined",d="object",b="string",f="major",r="model",a="name",t="type",i="vendor",e="version",n="architecture",h="console",l="mobile",u="tablet",c="smarttv",C="wearable",$="embedded",A="Amazon",w="Apple",j="ASUS",E="BlackBerry",T="Browser",U="Chrome",M="Firefox",S="Google",k="Huawei",q="Microsoft",X="Motorola",Z="Opera",oe="Samsung",he="Sharp",ie="Sony",ae="Xiaomi",se="Zebra",de="Facebook",ce="Chromium OS",pe="Mac OS",ge=function(v,x){var m={};for(var L in v)x[L]&&x[L].length%2==0?m[L]=x[L].concat(v[L]):m[L]=v[L];return m},te=function(v){for(var x={},m=0;m<v.length;m++)x[v[m].toUpperCase()]=v[m];return x},be=function(v,x){return typeof v===b&&Q(x).indexOf(Q(v))!==-1},Q=function(v){return v.toLowerCase()},ne=function(v,x){if(typeof v===b)return v=v.replace(/^\s\s*/,""),typeof x===o?v:v.substring(0,350)},Y=function(v,x){for(var m,L,V,y,G,p,W=0;W<x.length&&!G;){var ue=x[W],fe=x[W+1];for(m=L=0;m<ue.length&&!G&&ue[m];)if(G=ue[m++].exec(v))for(V=0;V<fe.length;V++)p=G[++L],typeof(y=fe[V])===d&&y.length>0?y.length===2?typeof y[1]==z?this[y[0]]=y[1].call(this,p):this[y[0]]=y[1]:y.length===3?typeof y[1]!==z||y[1].exec&&y[1].test?this[y[0]]=p?p.replace(y[1],y[2]):void 0:this[y[0]]=p?y[1].call(this,p,y[2]):void 0:y.length===4&&(this[y[0]]=p?y[3].call(this,p.replace(y[1],y[2])):void 0):this[y]=p||s;W+=2}},le=function(v,x){for(var m in x)if(typeof x[m]===d&&x[m].length>0){for(var L=0;L<x[m].length;L++)if(be(x[m][L],v))return m==="?"?s:m}else if(be(x[m],v))return m==="?"?s:m;return v},me={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"},we={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[e,[a,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[e,[a,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[a,e],[/opios[\/ ]+([\w\.]+)/i],[e,[a,Z+" Mini"]],[/\bopr\/([\w\.]+)/i],[e,[a,Z]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,/(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,/(ba?idubrowser)[\/ ]?([\w\.]+)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,/(heytap|ovi)browser\/([\d\.]+)/i,/(weibo)__([\d\.]+)/i],[a,e],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[e,[a,"UC"+T]],[/microm.+\bqbcore\/([\w\.]+)/i,/\bqbcore\/([\w\.]+).+microm/i],[e,[a,"WeChat(Win) Desktop"]],[/micromessenger\/([\w\.]+)/i],[e,[a,"WeChat"]],[/konqueror\/([\w\.]+)/i],[e,[a,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[e,[a,"IE"]],[/ya(?:search)?browser\/([\w\.]+)/i],[e,[a,"Yandex"]],[/(avast|avg)\/([\w\.]+)/i],[[a,/(.+)/,"$1 Secure "+T],e],[/\bfocus\/([\w\.]+)/i],[e,[a,M+" Focus"]],[/\bopt\/([\w\.]+)/i],[e,[a,Z+" Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[e,[a,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[e,[a,"Dolphin"]],[/coast\/([\w\.]+)/i],[e,[a,Z+" Coast"]],[/miuibrowser\/([\w\.]+)/i],[e,[a,"MIUI "+T]],[/fxios\/([-\w\.]+)/i],[e,[a,M]],[/\bqihu|(qi?ho?o?|360)browser/i],[[a,"360 "+T]],[/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],[[a,/(.+)/,"$1 "+T],e],[/(comodo_dragon)\/([\w\.]+)/i],[[a,/_/g," "],e],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i],[a,e],[/(metasr)[\/ ]?([\w\.]+)/i,/(lbbrowser)/i,/\[(linkedin)app\]/i],[a],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[a,de],e],[/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(chromium|instagram)[\/ ]([-\w\.]+)/i],[a,e],[/\bgsa\/([\w\.]+) .*safari\//i],[e,[a,"GSA"]],[/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],[e,[a,"TikTok"]],[/headlesschrome(?:\/([\w\.]+)| )/i],[e,[a,U+" Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[a,U+" WebView"],e],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[e,[a,"Android "+T]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[a,e],[/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],[e,[a,"Mobile Safari"]],[/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],[e,a],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[a,[e,le,{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}]],[/(webkit|khtml)\/([\w\.]+)/i],[a,e],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[a,"Netscape"],e],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[e,[a,M+" Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/(links) \(([\w\.]+)/i,/panasonic;(viera)/i],[a,e],[/(cobalt)\/([\w\.]+)/i],[a,[e,/master.|lts./,""]]],cpu:[[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],[[n,"amd64"]],[/(ia32(?=;))/i],[[n,Q]],[/((?:i[346]|x)86)[;\)]/i],[[n,"ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[[n,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[n,"armhf"]],[/windows (ce|mobile); ppc;/i],[[n,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[[n,/ower/,"",Q]],[/(sun4\w)[;\)]/i],[[n,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[n,Q]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[r,[i,oe],[t,u]],[/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,/samsung[- ]([-\w]+)/i,/sec-(sgh\w+)/i],[r,[i,oe],[t,l]],[/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],[r,[i,w],[t,l]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[r,[i,w],[t,u]],[/(macintosh);/i],[r,[i,w]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[r,[i,he],[t,l]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[r,[i,k],[t,u]],[/(?:huawei|honor)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],[r,[i,k],[t,l]],[/\b(poco[\w ]+)(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],[[r,/_/g," "],[i,ae],[t,l]],[/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[r,/_/g," "],[i,ae],[t,u]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[r,[i,"OPPO"],[t,l]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[r,[i,"Vivo"],[t,l]],[/\b(rmx[12]\d{3})(?: bui|;|\))/i],[r,[i,"Realme"],[t,l]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[r,[i,X],[t,l]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[r,[i,X],[t,u]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[r,[i,"LG"],[t,u]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[r,[i,"LG"],[t,l]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[r,[i,"Lenovo"],[t,u]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[r,/_/g," "],[i,"Nokia"],[t,l]],[/(pixel c)\b/i],[r,[i,S],[t,u]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[r,[i,S],[t,l]],[/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[r,[i,ie],[t,l]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[r,"Xperia Tablet"],[i,ie],[t,u]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[r,[i,"OnePlus"],[t,l]],[/(alexa)webm/i,/(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[r,[i,A],[t,u]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[r,/(.+)/g,"Fire Phone $1"],[i,A],[t,l]],[/(playbook);[-\w\),; ]+(rim)/i],[r,i,[t,u]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[r,[i,E],[t,l]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[r,[i,j],[t,u]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[r,[i,j],[t,l]],[/(nexus 9)/i],[r,[i,"HTC"],[t,u]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i],[i,[r,/_/g," "],[t,l]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[r,[i,"Acer"],[t,u]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[r,[i,"Meizu"],[t,l]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[i,r,[t,l]],[/(kobo)\s(ereader|touch)/i,/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/(nook)[\w ]+build\/(\w+)/i,/(dell) (strea[kpr\d ]*[\dko])/i,/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,/(trinity)[- ]*(t\d{3}) bui/i,/(gigaset)[- ]+(q\w{1,9}) bui/i,/(vodafone) ([\w ]+)(?:\)| bui)/i],[i,r,[t,u]],[/(surface duo)/i],[r,[i,q],[t,u]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[r,[i,"Fairphone"],[t,l]],[/(u304aa)/i],[r,[i,"AT&T"],[t,l]],[/\bsie-(\w*)/i],[r,[i,"Siemens"],[t,l]],[/\b(rct\w+) b/i],[r,[i,"RCA"],[t,u]],[/\b(venue[\d ]{2,7}) b/i],[r,[i,"Dell"],[t,u]],[/\b(q(?:mv|ta)\w+) b/i],[r,[i,"Verizon"],[t,u]],[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],[r,[i,"Barnes & Noble"],[t,u]],[/\b(tm\d{3}\w+) b/i],[r,[i,"NuVision"],[t,u]],[/\b(k88) b/i],[r,[i,"ZTE"],[t,u]],[/\b(nx\d{3}j) b/i],[r,[i,"ZTE"],[t,l]],[/\b(gen\d{3}) b.+49h/i],[r,[i,"Swiss"],[t,l]],[/\b(zur\d{3}) b/i],[r,[i,"Swiss"],[t,u]],[/\b((zeki)?tb.*\b) b/i],[r,[i,"Zeki"],[t,u]],[/\b([yr]\d{2}) b/i,/\b(dragon[- ]+touch |dt)(\w{5}) b/i],[[i,"Dragon Touch"],r,[t,u]],[/\b(ns-?\w{0,9}) b/i],[r,[i,"Insignia"],[t,u]],[/\b((nxa|next)-?\w{0,9}) b/i],[r,[i,"NextBook"],[t,u]],[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],[[i,"Voice"],r,[t,l]],[/\b(lvtel\-)?(v1[12]) b/i],[[i,"LvTel"],r,[t,l]],[/\b(ph-1) /i],[r,[i,"Essential"],[t,l]],[/\b(v(100md|700na|7011|917g).*\b) b/i],[r,[i,"Envizen"],[t,u]],[/\b(trio[-\w\. ]+) b/i],[r,[i,"MachSpeed"],[t,u]],[/\btu_(1491) b/i],[r,[i,"Rotor"],[t,u]],[/(shield[\w ]+) b/i],[r,[i,"Nvidia"],[t,u]],[/(sprint) (\w+)/i],[i,r,[t,l]],[/(kin\.[onetw]{3})/i],[[r,/\./g," "],[i,q],[t,l]],[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[r,[i,se],[t,u]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[r,[i,se],[t,l]],[/smart-tv.+(samsung)/i],[i,[t,c]],[/hbbtv.+maple;(\d+)/i],[[r,/^/,"SmartTV"],[i,oe],[t,c]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[i,"LG"],[t,c]],[/(apple) ?tv/i],[i,[r,w+" TV"],[t,c]],[/crkey/i],[[r,U+"cast"],[i,S],[t,c]],[/droid.+aft(\w)( bui|\))/i],[r,[i,A],[t,c]],[/\(dtv[\);].+(aquos)/i,/(aquos-tv[\w ]+)\)/i],[r,[i,he],[t,c]],[/(bravia[\w ]+)( bui|\))/i],[r,[i,ie],[t,c]],[/(mitv-\w{5}) bui/i],[r,[i,ae],[t,c]],[/Hbbtv.*(technisat) (.*);/i],[i,r,[t,c]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],[[i,ne],[r,ne],[t,c]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[t,c]],[/(ouya)/i,/(nintendo) ([wids3utch]+)/i],[i,r,[t,h]],[/droid.+; (shield) bui/i],[r,[i,"Nvidia"],[t,h]],[/(playstation [345portablevi]+)/i],[r,[i,ie],[t,h]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[r,[i,q],[t,h]],[/((pebble))app/i],[i,r,[t,C]],[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],[r,[i,w],[t,C]],[/droid.+; (glass) \d/i],[r,[i,S],[t,C]],[/droid.+; (wt63?0{2,3})\)/i],[r,[i,se],[t,C]],[/(quest( 2| pro)?)/i],[r,[i,de],[t,C]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[i,[t,$]],[/(aeobc)\b/i],[r,[i,A],[t,$]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],[r,[t,l]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[r,[t,u]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[t,u]],[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],[[t,l]],[/(android[-\w\. ]{0,9});.+buil/i],[r,[i,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[e,[a,"EdgeHTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[e,[a,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i,/\b(libweb)/i],[a,e],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[e,a]],os:[[/microsoft (windows) (vista|xp)/i],[a,e],[/(windows) nt 6\.2; (arm)/i,/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,/(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i],[a,[e,le,me]],[/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[a,"Windows"],[e,le,me]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/ios;fbsv\/([\d\.]+)/i,/cfnetwork\/.+darwin/i],[[e,/_/g,"."],[a,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[a,pe],[e,/_/g,"."]],[/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],[e,a],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[a,e],[/\(bb(10);/i],[e,[a,E]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[e,[a,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[e,[a,M+" OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[e,[a,"webOS"]],[/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],[e,[a,"watchOS"]],[/crkey\/([\d\.]+)/i],[e,[a,U+"cast"]],[/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],[[a,ce],e],[/panasonic;(viera)/i,/(netrange)mmh/i,/(nettv)\/(\d+\.[\w\.]+)/i,/(nintendo|playstation) ([wids345portablevuch]+)/i,/(xbox); +xbox ([^\);]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[a,e],[/(sunos) ?([\w\.\d]*)/i],[[a,"Solaris"],e],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,/(unix) ?([\w\.]*)/i],[a,e]]},I=function(v,x){if(typeof v===d&&(x=v,v=s),!(this instanceof I))return new I(v,x).getResult();var m=typeof _!==o&&_.navigator?_.navigator:s,L=v||(m&&m.userAgent?m.userAgent:""),V=m&&m.userAgentData?m.userAgentData:s,y=x?ge(we,x):we,G=m&&m.userAgent==L;return this.getBrowser=function(){var p,W={};return W[a]=s,W[e]=s,Y.call(W,L,y.browser),W[f]=typeof(p=W[e])===b?p.replace(/[^\d\.]/g,"").split(".")[0]:s,G&&m&&m.brave&&typeof m.brave.isBrave==z&&(W[a]="Brave"),W},this.getCPU=function(){var p={};return p[n]=s,Y.call(p,L,y.cpu),p},this.getDevice=function(){var p={};return p[i]=s,p[r]=s,p[t]=s,Y.call(p,L,y.device),G&&!p[t]&&V&&V.mobile&&(p[t]=l),G&&p[r]=="Macintosh"&&m&&typeof m.standalone!==o&&m.maxTouchPoints&&m.maxTouchPoints>2&&(p[r]="iPad",p[t]=u),p},this.getEngine=function(){var p={};return p[a]=s,p[e]=s,Y.call(p,L,y.engine),p},this.getOS=function(){var p={};return p[a]=s,p[e]=s,Y.call(p,L,y.os),G&&!p[a]&&V&&V.platform!="Unknown"&&(p[a]=V.platform.replace(/chrome os/i,ce).replace(/macos/i,pe)),p},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return L},this.setUA=function(p){return L=typeof p===b&&p.length>350?ne(p,350):p,this},this.setUA(L),this};I.VERSION="1.0.35",I.BROWSER=te([a,e,f]),I.CPU=te([n]),I.DEVICE=te([r,i,t,h,l,c,u,C,$]),I.ENGINE=I.OS=te([a,e]),typeof g!==o?(P.exports&&(g=P.exports=I),g.UAParser=I):B.amdO?(D=function(){return I}.call(H,B,H,J))!==void 0&&(J.exports=D):typeof _!==o&&(_.UAParser=I);var K=typeof _!==o&&(_.jQuery||_.Zepto);if(K&&!K.ua){var re=new I;K.ua=re.getResult(),K.ua.get=function(){return re.getUA()},K.ua.set=function(v){re.setUA(v);var x=re.getResult();for(var m in x)K.ua[m]=x[m]}}})(typeof window=="object"?window:this)}},R={};function N(P){var g=R[P];if(g!==void 0)return g.exports;var _=R[P]={exports:{}},s=!0;try{F[P].call(_.exports,_,_.exports,N),s=!1}finally{s&&delete R[P]}return _.exports}N.ab="//";var O=N(226);J.exports=O})()},ee.__chunk_4025=J=>{"use strict";var H=Object.defineProperty,B=Object.getOwnPropertyDescriptor,D=Object.getOwnPropertyNames,F=Object.prototype.hasOwnProperty,R={};function N(o){var d;let b=["path"in o&&o.path&&`Path=${o.path}`,"expires"in o&&(o.expires||o.expires===0)&&`Expires=${(typeof o.expires=="number"?new Date(o.expires):o.expires).toUTCString()}`,"maxAge"in o&&typeof o.maxAge=="number"&&`Max-Age=${o.maxAge}`,"domain"in o&&o.domain&&`Domain=${o.domain}`,"secure"in o&&o.secure&&"Secure","httpOnly"in o&&o.httpOnly&&"HttpOnly","sameSite"in o&&o.sameSite&&`SameSite=${o.sameSite}`,"partitioned"in o&&o.partitioned&&"Partitioned","priority"in o&&o.priority&&`Priority=${o.priority}`].filter(Boolean),f=`${o.name}=${encodeURIComponent((d=o.value)!=null?d:"")}`;return b.length===0?f:`${f}; ${b.join("; ")}`}function O(o){let d=new Map;for(let b of o.split(/; */)){if(!b)continue;let f=b.indexOf("=");if(f===-1){d.set(b,"true");continue}let[r,a]=[b.slice(0,f),b.slice(f+1)];try{d.set(r,decodeURIComponent(a??"true"))}catch{}}return d}function P(o){var d,b;if(!o)return;let[[f,r],...a]=O(o),{domain:t,expires:i,httponly:e,maxage:n,path:h,samesite:l,secure:u,partitioned:c,priority:C}=Object.fromEntries(a.map(([$,A])=>[$.toLowerCase(),A]));return function($){let A={};for(let w in $)$[w]&&(A[w]=$[w]);return A}({name:f,value:decodeURIComponent(r),domain:t,...i&&{expires:new Date(i)},...e&&{httpOnly:!0},...typeof n=="string"&&{maxAge:Number(n)},path:h,...l&&{sameSite:g.includes(d=(d=l).toLowerCase())?d:void 0},...u&&{secure:!0},...C&&{priority:_.includes(b=(b=C).toLowerCase())?b:void 0},...c&&{partitioned:!0}})}((o,d)=>{for(var b in d)H(o,b,{get:d[b],enumerable:!0})})(R,{RequestCookies:()=>s,ResponseCookies:()=>z,parseCookie:()=>O,parseSetCookie:()=>P,stringifyCookie:()=>N}),J.exports=((o,d,b,f)=>{if(d&&typeof d=="object"||typeof d=="function")for(let r of D(d))F.call(o,r)||r===void 0||H(o,r,{get:()=>d[r],enumerable:!(f=B(d,r))||f.enumerable});return o})(H({},"__esModule",{value:!0}),R);var g=["strict","lax","none"],_=["low","medium","high"],s=class{constructor(o){this._parsed=new Map,this._headers=o;let d=o.get("cookie");if(d)for(let[b,f]of O(d))this._parsed.set(b,{name:b,value:f})}[Symbol.iterator](){return this._parsed[Symbol.iterator]()}get size(){return this._parsed.size}get(...o){let d=typeof o[0]=="string"?o[0]:o[0].name;return this._parsed.get(d)}getAll(...o){var d;let b=Array.from(this._parsed);if(!o.length)return b.map(([r,a])=>a);let f=typeof o[0]=="string"?o[0]:(d=o[0])==null?void 0:d.name;return b.filter(([r])=>r===f).map(([r,a])=>a)}has(o){return this._parsed.has(o)}set(...o){let[d,b]=o.length===1?[o[0].name,o[0].value]:o,f=this._parsed;return f.set(d,{name:d,value:b}),this._headers.set("cookie",Array.from(f).map(([r,a])=>N(a)).join("; ")),this}delete(o){let d=this._parsed,b=Array.isArray(o)?o.map(f=>d.delete(f)):d.delete(o);return this._headers.set("cookie",Array.from(d).map(([f,r])=>N(r)).join("; ")),b}clear(){return this.delete(Array.from(this._parsed.keys())),this}[Symbol.for("edge-runtime.inspect.custom")](){return`RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`}toString(){return[...this._parsed.values()].map(o=>`${o.name}=${encodeURIComponent(o.value)}`).join("; ")}},z=class{constructor(o){var d,b,f;this._parsed=new Map,this._headers=o;let r=(f=(b=(d=o.getSetCookie)==null?void 0:d.call(o))!=null?b:o.get("set-cookie"))!=null?f:[];for(let a of Array.isArray(r)?r:function(t){if(!t)return[];var i,e,n,h,l,u=[],c=0;function C(){for(;c<t.length&&/\s/.test(t.charAt(c));)c+=1;return c<t.length}for(;c<t.length;){for(i=c,l=!1;C();)if((e=t.charAt(c))===","){for(n=c,c+=1,C(),h=c;c<t.length&&(e=t.charAt(c))!=="="&&e!==";"&&e!==",";)c+=1;c<t.length&&t.charAt(c)==="="?(l=!0,c=h,u.push(t.substring(i,n)),i=c):c=n+1}else c+=1;(!l||c>=t.length)&&u.push(t.substring(i,t.length))}return u}(r)){let t=P(a);t&&this._parsed.set(t.name,t)}}get(...o){let d=typeof o[0]=="string"?o[0]:o[0].name;return this._parsed.get(d)}getAll(...o){var d;let b=Array.from(this._parsed.values());if(!o.length)return b;let f=typeof o[0]=="string"?o[0]:(d=o[0])==null?void 0:d.name;return b.filter(r=>r.name===f)}has(o){return this._parsed.has(o)}set(...o){let[d,b,f]=o.length===1?[o[0].name,o[0].value,o[0]]:o,r=this._parsed;return r.set(d,function(a={name:"",value:""}){return typeof a.expires=="number"&&(a.expires=new Date(a.expires)),a.maxAge&&(a.expires=new Date(Date.now()+1e3*a.maxAge)),(a.path===null||a.path===void 0)&&(a.path="/"),a}({name:d,value:b,...f})),function(a,t){for(let[,i]of(t.delete("set-cookie"),a)){let e=N(i);t.append("set-cookie",e)}}(r,this._headers),this}delete(...o){let[d,b,f]=typeof o[0]=="string"?[o[0]]:[o[0].name,o[0].path,o[0].domain];return this.set({name:d,path:b,domain:f,value:"",expires:new Date(0)})}[Symbol.for("edge-runtime.inspect.custom")](){return`ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`}toString(){return[...this._parsed.values()].map(N).join("; ")}}},ee);export{ke as __getNamedExports};
