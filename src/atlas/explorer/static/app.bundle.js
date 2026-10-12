(()=>{var P0=Object.defineProperty;var Df=(n,e)=>{for(var t in e)P0(n,t,{get:e[t],enumerable:!0})};var ui={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ai={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ip=0,Ch=1,sp=2;var Ma=1,rp=2,vo=3,Ds=0,ri=1,hi=2,os=0,Is=1,yo=2,Ph=3,Dh=4,op=5;var qs=100,ap=101,lp=102,cp=103,up=104,hp=200,dp=201,fp=202,pp=203,kl=204,Fl=205,mp=206,gp=207,_p=208,xp=209,vp=210,yp=211,bp=212,Sp=213,Mp=214,Nl=0,Ul=1,Ol=2,Mr=3,Bl=4,zl=5,Vl=6,Hl=7,Ih=0,wp=1,Ep=2,Xi=0,Lh=1,kh=2,Fh=3,Nh=4,Uh=5,Oh=6,Bh=7;var zh=300,tr=301,Tr=302,pc=303,mc=304,wa=306,Gl=1e3,ns=1001,Wl=1002,On=1003,Ap=1004;var Ea=1005;var Vn=1006,gc=1007;var nr=1008;var Ti=1009,Vh=1010,Hh=1011,bo=1012,_c=1013,$i=1014,qi=1015,as=1016,xc=1017,vc=1018,So=1020,Gh=35902,Wh=35899,Xh=1021,$h=1022,Fi=1023,is=1026,ir=1027,qh=1028,yc=1029,sr=1030,bc=1031;var Sc=1033,Aa=33776,Ta=33777,Ra=33778,Ca=33779,Mc=35840,wc=35841,Ec=35842,Ac=35843,Tc=36196,Rc=37492,Cc=37496,Pc=37488,Dc=37489,Pa=37490,Ic=37491,Lc=37808,kc=37809,Fc=37810,Nc=37811,Uc=37812,Oc=37813,Bc=37814,zc=37815,Vc=37816,Hc=37817,Gc=37818,Wc=37819,Xc=37820,$c=37821,qc=36492,Yc=36494,Jc=36495,Zc=36283,jc=36284,Da=36285,Kc=36286;var ta=2300,Xl=2301,Ll=2302,yh=2303,bh=2400,Sh=2401,Mh=2402;var Tp=3200;var Yh=0,Rp=1,ks="",bi="srgb",na="srgb-linear",ia="linear",Qt="srgb";var br=7680;var wh=519,Cp=512,Pp=513,Dp=514,Qc=515,Ip=516,Lp=517,eu=518,kp=519,$l=35044;var Jh="300 es",Vi=2e3,sa=2001;function D0(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function I0(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function ra(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Fp(){let n=ra("canvas");return n.style.display="block",n}var If={},ho=null;function oa(...n){let e="THREE."+n.shift();ho?ho("log",e,...n):console.log(e,...n)}function Np(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function _t(...n){n=Np(n);let e="THREE."+n.shift();if(ho)ho("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function yt(...n){n=Np(n);let e="THREE."+n.shift();if(ho)ho("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Sr(...n){let e=n.join(" ");e in If||(If[e]=!0,_t(...n))}function Up(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var Op={[Nl]:Ul,[Ol]:Vl,[Bl]:Hl,[Mr]:zl,[Ul]:Nl,[Vl]:Ol,[Hl]:Bl,[zl]:Mr},Hi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Zn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Lf=1234567,co=Math.PI/180,fo=180/Math.PI;function Cs(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Zn[n&255]+Zn[n>>8&255]+Zn[n>>16&255]+Zn[n>>24&255]+"-"+Zn[e&255]+Zn[e>>8&255]+"-"+Zn[e>>16&15|64]+Zn[e>>24&255]+"-"+Zn[t&63|128]+Zn[t>>8&255]+"-"+Zn[t>>16&255]+Zn[t>>24&255]+Zn[i&255]+Zn[i>>8&255]+Zn[i>>16&255]+Zn[i>>24&255]).toLowerCase()}function Ct(n,e,t){return Math.max(e,Math.min(t,n))}function Zh(n,e){return(n%e+e)%e}function L0(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function k0(n,e,t){return n!==e?(t-n)/(e-n):0}function ea(n,e,t){return(1-t)*n+t*e}function F0(n,e,t,i){return ea(n,e,1-Math.exp(-t*i))}function N0(n,e=1){return e-Math.abs(Zh(n,e*2)-e)}function U0(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function O0(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function B0(n,e){return n+Math.floor(Math.random()*(e-n+1))}function z0(n,e){return n+Math.random()*(e-n)}function V0(n){return n*(.5-Math.random())}function H0(n){n!==void 0&&(Lf=n);let e=Lf+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function G0(n){return n*co}function W0(n){return n*fo}function X0(n){return(n&n-1)===0&&n!==0}function $0(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function q0(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Y0(n,e,t,i,s){let r=Math.cos,o=Math.sin,l=r(t/2),c=o(t/2),h=r((e+i)/2),d=o((e+i)/2),p=r((e-i)/2),m=o((e-i)/2),x=r((i-e)/2),_=o((i-e)/2);switch(s){case"XYX":n.set(l*d,c*p,c*m,l*h);break;case"YZY":n.set(c*m,l*d,c*p,l*h);break;case"ZXZ":n.set(c*p,c*m,l*d,l*h);break;case"XZX":n.set(l*d,c*_,c*x,l*h);break;case"YXY":n.set(c*x,l*d,c*_,l*h);break;case"ZYZ":n.set(c*_,c*x,l*d,l*h);break;default:_t("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function zi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function sn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var ls={DEG2RAD:co,RAD2DEG:fo,generateUUID:Cs,clamp:Ct,euclideanModulo:Zh,mapLinear:L0,inverseLerp:k0,lerp:ea,damp:F0,pingpong:N0,smoothstep:U0,smootherstep:O0,randInt:B0,randFloat:z0,randFloatSpread:V0,seededRandom:H0,degToRad:G0,radToDeg:W0,isPowerOfTwo:X0,ceilPowerOfTwo:$0,floorPowerOfTwo:q0,setQuaternionFromProperEuler:Y0,normalize:sn,denormalize:zi},bt=class n{static{n.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ct(this.x,e.x,t.x),this.y=Ct(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ct(this.x,e,t),this.y=Ct(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ct(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ct(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Si=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,l){let c=i[s+0],h=i[s+1],d=i[s+2],p=i[s+3],m=r[o+0],x=r[o+1],_=r[o+2],A=r[o+3];if(p!==A||c!==m||h!==x||d!==_){let v=c*m+h*x+d*_+p*A;v<0&&(m=-m,x=-x,_=-_,A=-A,v=-v);let y=1-l;if(v<.9995){let P=Math.acos(v),I=Math.sin(P);y=Math.sin(y*P)/I,l=Math.sin(l*P)/I,c=c*y+m*l,h=h*y+x*l,d=d*y+_*l,p=p*y+A*l}else{c=c*y+m*l,h=h*y+x*l,d=d*y+_*l,p=p*y+A*l;let P=1/Math.sqrt(c*c+h*h+d*d+p*p);c*=P,h*=P,d*=P,p*=P}}e[t]=c,e[t+1]=h,e[t+2]=d,e[t+3]=p}static multiplyQuaternionsFlat(e,t,i,s,r,o){let l=i[s],c=i[s+1],h=i[s+2],d=i[s+3],p=r[o],m=r[o+1],x=r[o+2],_=r[o+3];return e[t]=l*_+d*p+c*x-h*m,e[t+1]=c*_+d*m+h*p-l*x,e[t+2]=h*_+d*x+l*m-c*p,e[t+3]=d*_-l*p-c*m-h*x,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,o=e._order,l=Math.cos,c=Math.sin,h=l(i/2),d=l(s/2),p=l(r/2),m=c(i/2),x=c(s/2),_=c(r/2);switch(o){case"XYZ":this._x=m*d*p+h*x*_,this._y=h*x*p-m*d*_,this._z=h*d*_+m*x*p,this._w=h*d*p-m*x*_;break;case"YXZ":this._x=m*d*p+h*x*_,this._y=h*x*p-m*d*_,this._z=h*d*_-m*x*p,this._w=h*d*p+m*x*_;break;case"ZXY":this._x=m*d*p-h*x*_,this._y=h*x*p+m*d*_,this._z=h*d*_+m*x*p,this._w=h*d*p-m*x*_;break;case"ZYX":this._x=m*d*p-h*x*_,this._y=h*x*p+m*d*_,this._z=h*d*_-m*x*p,this._w=h*d*p+m*x*_;break;case"YZX":this._x=m*d*p+h*x*_,this._y=h*x*p+m*d*_,this._z=h*d*_-m*x*p,this._w=h*d*p-m*x*_;break;case"XZY":this._x=m*d*p-h*x*_,this._y=h*x*p-m*d*_,this._z=h*d*_+m*x*p,this._w=h*d*p+m*x*_;break;default:_t("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],l=t[5],c=t[9],h=t[2],d=t[6],p=t[10],m=i+l+p;if(m>0){let x=.5/Math.sqrt(m+1);this._w=.25/x,this._x=(d-c)*x,this._y=(r-h)*x,this._z=(o-s)*x}else if(i>l&&i>p){let x=2*Math.sqrt(1+i-l-p);this._w=(d-c)/x,this._x=.25*x,this._y=(s+o)/x,this._z=(r+h)/x}else if(l>p){let x=2*Math.sqrt(1+l-i-p);this._w=(r-h)/x,this._x=(s+o)/x,this._y=.25*x,this._z=(c+d)/x}else{let x=2*Math.sqrt(1+p-i-l);this._w=(o-s)/x,this._x=(r+h)/x,this._y=(c+d)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ct(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,l=t._x,c=t._y,h=t._z,d=t._w;return this._x=i*d+o*l+s*h-r*c,this._y=s*d+o*c+r*l-i*h,this._z=r*d+o*h+i*c-s*l,this._w=o*d-i*l-s*c-r*h,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,l=this.dot(e);l<0&&(i=-i,s=-s,r=-r,o=-o,l=-l);let c=1-t;if(l<.9995){let h=Math.acos(l),d=Math.sin(h);c=Math.sin(c*h)/d,t=Math.sin(t*h)/d,this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},J=class n{static{n.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(kf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(kf.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,l=e.z,c=e.w,h=2*(o*s-l*i),d=2*(l*t-r*s),p=2*(r*i-o*t);return this.x=t+c*h+o*p-l*d,this.y=i+c*d+l*h-r*p,this.z=s+c*p+r*d-o*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ct(this.x,e.x,t.x),this.y=Ct(this.y,e.y,t.y),this.z=Ct(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ct(this.x,e,t),this.y=Ct(this.y,e,t),this.z=Ct(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ct(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,o=t.x,l=t.y,c=t.z;return this.x=s*c-r*l,this.y=r*o-i*c,this.z=i*l-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ju.copy(this).projectOnVector(e),this.sub(ju)}reflect(e){return this.sub(ju.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ct(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ju=new J,kf=new Si,Rt=class n{static{n.prototype.isMatrix3=!0}constructor(e,t,i,s,r,o,l,c,h){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,l,c,h)}set(e,t,i,s,r,o,l,c,h){let d=this.elements;return d[0]=e,d[1]=s,d[2]=l,d[3]=t,d[4]=r,d[5]=c,d[6]=i,d[7]=o,d[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,o=i[0],l=i[3],c=i[6],h=i[1],d=i[4],p=i[7],m=i[2],x=i[5],_=i[8],A=s[0],v=s[3],y=s[6],P=s[1],I=s[4],E=s[7],R=s[2],L=s[5],V=s[8];return r[0]=o*A+l*P+c*R,r[3]=o*v+l*I+c*L,r[6]=o*y+l*E+c*V,r[1]=h*A+d*P+p*R,r[4]=h*v+d*I+p*L,r[7]=h*y+d*E+p*V,r[2]=m*A+x*P+_*R,r[5]=m*v+x*I+_*L,r[8]=m*y+x*E+_*V,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],l=e[5],c=e[6],h=e[7],d=e[8];return t*o*d-t*l*h-i*r*d+i*l*c+s*r*h-s*o*c}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],l=e[5],c=e[6],h=e[7],d=e[8],p=d*o-l*h,m=l*c-d*r,x=h*r-o*c,_=t*p+i*m+s*x;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let A=1/_;return e[0]=p*A,e[1]=(s*h-d*i)*A,e[2]=(l*i-s*o)*A,e[3]=m*A,e[4]=(d*t-s*c)*A,e[5]=(s*r-l*t)*A,e[6]=x*A,e[7]=(i*c-h*t)*A,e[8]=(o*t-i*r)*A,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,l){let c=Math.cos(r),h=Math.sin(r);return this.set(i*c,i*h,-i*(c*o+h*l)+o+e,-s*h,s*c,-s*(-h*o+c*l)+l+t,0,0,1),this}scale(e,t){return Sr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ku.makeScale(e,t)),this}rotate(e){return Sr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ku.makeRotation(-e)),this}translate(e,t){return Sr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ku.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ku=new Rt,Ff=new Rt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nf=new Rt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function J0(){let n={enabled:!0,workingColorSpace:na,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Qt&&(s.r=Ps(s.r),s.g=Ps(s.g),s.b=Ps(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Qt&&(s.r=uo(s.r),s.g=uo(s.g),s.b=uo(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ks?ia:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Sr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Sr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[na]:{primaries:e,whitePoint:i,transfer:ia,toXYZ:Ff,fromXYZ:Nf,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:bi},outputColorSpaceConfig:{drawingBufferColorSpace:bi}},[bi]:{primaries:e,whitePoint:i,transfer:Qt,toXYZ:Ff,fromXYZ:Nf,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:bi}}}),n}var Gt=J0();function Ps(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function uo(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Jr,ql=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Jr===void 0&&(Jr=ra("canvas")),Jr.width=e.width,Jr.height=e.height;let s=Jr.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Jr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ra("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ps(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ps(t[i]/255)*255):t[i]=Ps(t[i]);return{data:t,width:e.width,height:e.height}}else return _t("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Z0=0,po=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Z0++}),this.uuid=Cs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,l=s.length;o<l;o++)s[o].isDataTexture?r.push(Qu(s[o].image)):r.push(Qu(s[o]))}else r=Qu(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function Qu(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ql.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(_t("Texture: Unable to serialize Texture."),{})}var j0=0,eh=new J,ii=class n extends Hi{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=ns,s=ns,r=Vn,o=nr,l=Fi,c=Ti,h=n.DEFAULT_ANISOTROPY,d=ks){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:j0++}),this.uuid=Cs(),this.name="",this.source=new po(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=h,this.format=l,this.internalFormat=null,this.type=c,this.offset=new bt(0,0),this.repeat=new bt(1,1),this.center=new bt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Rt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(eh).x}get height(){return this.source.getSize(eh).y}get depth(){return this.source.getSize(eh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){_t(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){_t(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==zh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Gl:e.x=e.x-Math.floor(e.x);break;case ns:e.x=e.x<0?0:1;break;case Wl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Gl:e.y=e.y-Math.floor(e.y);break;case ns:e.y=e.y<0?0:1;break;case Wl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};ii.DEFAULT_IMAGE=null;ii.DEFAULT_MAPPING=zh;ii.DEFAULT_ANISOTROPY=1;var rn=class n{static{n.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,c=e.elements,h=c[0],d=c[4],p=c[8],m=c[1],x=c[5],_=c[9],A=c[2],v=c[6],y=c[10];if(Math.abs(d-m)<.01&&Math.abs(p-A)<.01&&Math.abs(_-v)<.01){if(Math.abs(d+m)<.1&&Math.abs(p+A)<.1&&Math.abs(_+v)<.1&&Math.abs(h+x+y-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let I=(h+1)/2,E=(x+1)/2,R=(y+1)/2,L=(d+m)/4,V=(p+A)/4,M=(_+v)/4;return I>E&&I>R?I<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(I),s=L/i,r=V/i):E>R?E<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),i=L/s,r=M/s):R<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),i=V/r,s=M/r),this.set(i,s,r,t),this}let P=Math.sqrt((v-_)*(v-_)+(p-A)*(p-A)+(m-d)*(m-d));return Math.abs(P)<.001&&(P=1),this.x=(v-_)/P,this.y=(p-A)/P,this.z=(m-d)/P,this.w=Math.acos((h+x+y-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ct(this.x,e.x,t.x),this.y=Ct(this.y,e.y,t.y),this.z=Ct(this.z,e.z,t.z),this.w=Ct(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ct(this.x,e,t),this.y=Ct(this.y,e,t),this.z=Ct(this.z,e,t),this.w=Ct(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ct(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Yl=class extends Hi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new rn(0,0,e,t),this.scissorTest=!1,this.viewport=new rn(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:i.depth},r=new ii(s),o=i.count;for(let l=0;l<o;l++)this.textures[l]=r.clone(),this.textures[l].isRenderTargetTexture=!0,this.textures[l].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Vn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new po(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Mi=class extends Yl{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},aa=class extends ii{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=On,this.minFilter=On,this.wrapR=ns,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Jl=class extends ii{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=On,this.minFilter=On,this.wrapR=ns,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var vn=class n{static{n.prototype.isMatrix4=!0}constructor(e,t,i,s,r,o,l,c,h,d,p,m,x,_,A,v){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,l,c,h,d,p,m,x,_,A,v)}set(e,t,i,s,r,o,l,c,h,d,p,m,x,_,A,v){let y=this.elements;return y[0]=e,y[4]=t,y[8]=i,y[12]=s,y[1]=r,y[5]=o,y[9]=l,y[13]=c,y[2]=h,y[6]=d,y[10]=p,y[14]=m,y[3]=x,y[7]=_,y[11]=A,y[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,s=1/Zr.setFromMatrixColumn(e,0).length(),r=1/Zr.setFromMatrixColumn(e,1).length(),o=1/Zr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),l=Math.sin(i),c=Math.cos(s),h=Math.sin(s),d=Math.cos(r),p=Math.sin(r);if(e.order==="XYZ"){let m=o*d,x=o*p,_=l*d,A=l*p;t[0]=c*d,t[4]=-c*p,t[8]=h,t[1]=x+_*h,t[5]=m-A*h,t[9]=-l*c,t[2]=A-m*h,t[6]=_+x*h,t[10]=o*c}else if(e.order==="YXZ"){let m=c*d,x=c*p,_=h*d,A=h*p;t[0]=m+A*l,t[4]=_*l-x,t[8]=o*h,t[1]=o*p,t[5]=o*d,t[9]=-l,t[2]=x*l-_,t[6]=A+m*l,t[10]=o*c}else if(e.order==="ZXY"){let m=c*d,x=c*p,_=h*d,A=h*p;t[0]=m-A*l,t[4]=-o*p,t[8]=_+x*l,t[1]=x+_*l,t[5]=o*d,t[9]=A-m*l,t[2]=-o*h,t[6]=l,t[10]=o*c}else if(e.order==="ZYX"){let m=o*d,x=o*p,_=l*d,A=l*p;t[0]=c*d,t[4]=_*h-x,t[8]=m*h+A,t[1]=c*p,t[5]=A*h+m,t[9]=x*h-_,t[2]=-h,t[6]=l*c,t[10]=o*c}else if(e.order==="YZX"){let m=o*c,x=o*h,_=l*c,A=l*h;t[0]=c*d,t[4]=A-m*p,t[8]=_*p+x,t[1]=p,t[5]=o*d,t[9]=-l*d,t[2]=-h*d,t[6]=x*p+_,t[10]=m-A*p}else if(e.order==="XZY"){let m=o*c,x=o*h,_=l*c,A=l*h;t[0]=c*d,t[4]=-p,t[8]=h*d,t[1]=m*p+A,t[5]=o*d,t[9]=x*p-_,t[2]=_*p-x,t[6]=l*d,t[10]=A*p+m}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(K0,e,Q0)}lookAt(e,t,i){let s=this.elements;return vi.subVectors(e,t),vi.lengthSq()===0&&(vi.z=1),vi.normalize(),Vs.crossVectors(i,vi),Vs.lengthSq()===0&&(Math.abs(i.z)===1?vi.x+=1e-4:vi.z+=1e-4,vi.normalize(),Vs.crossVectors(i,vi)),Vs.normalize(),al.crossVectors(vi,Vs),s[0]=Vs.x,s[4]=al.x,s[8]=vi.x,s[1]=Vs.y,s[5]=al.y,s[9]=vi.y,s[2]=Vs.z,s[6]=al.z,s[10]=vi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,o=i[0],l=i[4],c=i[8],h=i[12],d=i[1],p=i[5],m=i[9],x=i[13],_=i[2],A=i[6],v=i[10],y=i[14],P=i[3],I=i[7],E=i[11],R=i[15],L=s[0],V=s[4],M=s[8],k=s[12],X=s[1],W=s[5],F=s[9],me=s[13],K=s[2],Q=s[6],ye=s[10],de=s[14],Me=s[3],Ae=s[7],ne=s[11],Ye=s[15];return r[0]=o*L+l*X+c*K+h*Me,r[4]=o*V+l*W+c*Q+h*Ae,r[8]=o*M+l*F+c*ye+h*ne,r[12]=o*k+l*me+c*de+h*Ye,r[1]=d*L+p*X+m*K+x*Me,r[5]=d*V+p*W+m*Q+x*Ae,r[9]=d*M+p*F+m*ye+x*ne,r[13]=d*k+p*me+m*de+x*Ye,r[2]=_*L+A*X+v*K+y*Me,r[6]=_*V+A*W+v*Q+y*Ae,r[10]=_*M+A*F+v*ye+y*ne,r[14]=_*k+A*me+v*de+y*Ye,r[3]=P*L+I*X+E*K+R*Me,r[7]=P*V+I*W+E*Q+R*Ae,r[11]=P*M+I*F+E*ye+R*ne,r[15]=P*k+I*me+E*de+R*Ye,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],l=e[5],c=e[9],h=e[13],d=e[2],p=e[6],m=e[10],x=e[14],_=e[3],A=e[7],v=e[11],y=e[15],P=c*x-h*m,I=l*x-h*p,E=l*m-c*p,R=o*x-h*d,L=o*m-c*d,V=o*p-l*d;return t*(A*P-v*I+y*E)-i*(_*P-v*R+y*L)+s*(_*I-A*R+y*V)-r*(_*E-A*L+v*V)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10];return t*(o*d-l*h)-i*(r*d-l*c)+s*(r*h-o*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],l=e[5],c=e[6],h=e[7],d=e[8],p=e[9],m=e[10],x=e[11],_=e[12],A=e[13],v=e[14],y=e[15],P=t*l-i*o,I=t*c-s*o,E=t*h-r*o,R=i*c-s*l,L=i*h-r*l,V=s*h-r*c,M=d*A-p*_,k=d*v-m*_,X=d*y-x*_,W=p*v-m*A,F=p*y-x*A,me=m*y-x*v,K=P*me-I*F+E*W+R*X-L*k+V*M;if(K===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let Q=1/K;return e[0]=(l*me-c*F+h*W)*Q,e[1]=(s*F-i*me-r*W)*Q,e[2]=(A*V-v*L+y*R)*Q,e[3]=(m*L-p*V-x*R)*Q,e[4]=(c*X-o*me-h*k)*Q,e[5]=(t*me-s*X+r*k)*Q,e[6]=(v*E-_*V-y*I)*Q,e[7]=(d*V-m*E+x*I)*Q,e[8]=(o*F-l*X+h*M)*Q,e[9]=(i*X-t*F-r*M)*Q,e[10]=(_*L-A*E+y*P)*Q,e[11]=(p*E-d*L-x*P)*Q,e[12]=(l*k-o*W-c*M)*Q,e[13]=(t*W-i*k+s*M)*Q,e[14]=(A*I-_*R-v*P)*Q,e[15]=(d*R-p*I+m*P)*Q,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,l=e.y,c=e.z,h=r*o,d=r*l;return this.set(h*o+i,h*l-s*c,h*c+s*l,0,h*l+s*c,d*l+i,d*c-s*o,0,h*c-s*l,d*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,o=t._y,l=t._z,c=t._w,h=r+r,d=o+o,p=l+l,m=r*h,x=r*d,_=r*p,A=o*d,v=o*p,y=l*p,P=c*h,I=c*d,E=c*p,R=i.x,L=i.y,V=i.z;return s[0]=(1-(A+y))*R,s[1]=(x+E)*R,s[2]=(_-I)*R,s[3]=0,s[4]=(x-E)*L,s[5]=(1-(m+y))*L,s[6]=(v+P)*L,s[7]=0,s[8]=(_+I)*V,s[9]=(v-P)*V,s[10]=(1-(m+A))*V,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let o=Zr.set(s[0],s[1],s[2]).length(),l=Zr.set(s[4],s[5],s[6]).length(),c=Zr.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Ui.copy(this);let h=1/o,d=1/l,p=1/c;return Ui.elements[0]*=h,Ui.elements[1]*=h,Ui.elements[2]*=h,Ui.elements[4]*=d,Ui.elements[5]*=d,Ui.elements[6]*=d,Ui.elements[8]*=p,Ui.elements[9]*=p,Ui.elements[10]*=p,t.setFromRotationMatrix(Ui),i.x=o,i.y=l,i.z=c,this}makePerspective(e,t,i,s,r,o,l=Vi,c=!1){let h=this.elements,d=2*r/(t-e),p=2*r/(i-s),m=(t+e)/(t-e),x=(i+s)/(i-s),_,A;if(c)_=r/(o-r),A=o*r/(o-r);else if(l===Vi)_=-(o+r)/(o-r),A=-2*o*r/(o-r);else if(l===sa)_=-o/(o-r),A=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return h[0]=d,h[4]=0,h[8]=m,h[12]=0,h[1]=0,h[5]=p,h[9]=x,h[13]=0,h[2]=0,h[6]=0,h[10]=_,h[14]=A,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,t,i,s,r,o,l=Vi,c=!1){let h=this.elements,d=2/(t-e),p=2/(i-s),m=-(t+e)/(t-e),x=-(i+s)/(i-s),_,A;if(c)_=1/(o-r),A=o/(o-r);else if(l===Vi)_=-2/(o-r),A=-(o+r)/(o-r);else if(l===sa)_=-1/(o-r),A=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return h[0]=d,h[4]=0,h[8]=0,h[12]=m,h[1]=0,h[5]=p,h[9]=0,h[13]=x,h[2]=0,h[6]=0,h[10]=_,h[14]=A,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},Zr=new J,Ui=new vn,K0=new J(0,0,0),Q0=new J(1,1,1),Vs=new J,al=new J,vi=new J,Uf=new vn,Of=new Si,Ys=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],o=s[4],l=s[8],c=s[1],h=s[5],d=s[9],p=s[2],m=s[6],x=s[10];switch(t){case"XYZ":this._y=Math.asin(Ct(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,x),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(m,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Ct(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(l,x),this._z=Math.atan2(c,h)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ct(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-p,x),this._z=Math.atan2(-o,h)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ct(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(m,x),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,h));break;case"YZX":this._z=Math.asin(Ct(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,h),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(l,x));break;case"XZY":this._z=Math.asin(-Ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(m,h),this._y=Math.atan2(l,r)):(this._x=Math.atan2(-d,x),this._y=0);break;default:_t("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Uf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Uf,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Of.setFromEuler(this),this.setFromQuaternion(Of,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ys.DEFAULT_ORDER="XYZ";var mo=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},e_=0,Bf=new J,jr=new Si,Ms=new vn,ll=new J,Zo=new J,t_=new J,n_=new Si,zf=new J(1,0,0),Vf=new J(0,1,0),Hf=new J(0,0,1),Gf={type:"added"},i_={type:"removed"},Kr={type:"childadded",child:null},th={type:"childremoved",child:null},wi=class n extends Hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:e_++}),this.uuid=Cs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new J,t=new Ys,i=new Si,s=new J(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new vn},normalMatrix:{value:new Rt}}),this.matrix=new vn,this.matrixWorld=new vn,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return jr.setFromAxisAngle(e,t),this.quaternion.multiply(jr),this}rotateOnWorldAxis(e,t){return jr.setFromAxisAngle(e,t),this.quaternion.premultiply(jr),this}rotateX(e){return this.rotateOnAxis(zf,e)}rotateY(e){return this.rotateOnAxis(Vf,e)}rotateZ(e){return this.rotateOnAxis(Hf,e)}translateOnAxis(e,t){return Bf.copy(e).applyQuaternion(this.quaternion),this.position.add(Bf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zf,e)}translateY(e){return this.translateOnAxis(Vf,e)}translateZ(e){return this.translateOnAxis(Hf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ms.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ll.copy(e):ll.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Zo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ms.lookAt(Zo,ll,this.up):Ms.lookAt(ll,Zo,this.up),this.quaternion.setFromRotationMatrix(Ms),s&&(Ms.extractRotation(s.matrixWorld),jr.setFromRotationMatrix(Ms),this.quaternion.premultiply(jr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(yt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Gf),Kr.child=e,this.dispatchEvent(Kr),Kr.child=null):yt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(i_),th.child=e,this.dispatchEvent(th),th.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ms.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ms.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ms),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Gf),Kr.child=e,this.dispatchEvent(Kr),Kr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zo,e,t_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zo,n_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let r=this.children;for(let o=0,l=r.length;o<l;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(l=>({...l,boundingBox:l.boundingBox?l.boundingBox.toJSON():void 0,boundingSphere:l.boundingSphere?l.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(l=>({...l})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(l,c){return l[c.uuid]===void 0&&(l[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){let c=l.shapes;if(Array.isArray(c))for(let h=0,d=c.length;h<d;h++){let p=c[h];r(e.shapes,p)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let l=[];for(let c=0,h=this.material.length;c<h;c++)l.push(r(e.materials,this.material[c]));s.material=l}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let l=0;l<this.children.length;l++)s.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let l=0;l<this.animations.length;l++){let c=this.animations[l];s.animations.push(r(e.animations,c))}}if(t){let l=o(e.geometries),c=o(e.materials),h=o(e.textures),d=o(e.images),p=o(e.shapes),m=o(e.skeletons),x=o(e.animations),_=o(e.nodes);l.length>0&&(i.geometries=l),c.length>0&&(i.materials=c),h.length>0&&(i.textures=h),d.length>0&&(i.images=d),p.length>0&&(i.shapes=p),m.length>0&&(i.skeletons=m),x.length>0&&(i.animations=x),_.length>0&&(i.nodes=_)}return i.object=s,i;function o(l){let c=[];for(let h in l){let d=l[h];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}};wi.DEFAULT_UP=new J(0,1,0);wi.DEFAULT_MATRIX_AUTO_UPDATE=!0;wi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ki=class extends wi{constructor(){super(),this.isGroup=!0,this.type="Group"}},s_={type:"move"},go=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ki,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ki,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ki,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null,l=this._targetRay,c=this._grip,h=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(h&&e.hand){o=!0;for(let A of e.hand.values()){let v=t.getJointPose(A,i),y=this._getHandJoint(h,A);v!==null&&(y.matrix.fromArray(v.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=v.radius),y.visible=v!==null}let d=h.joints["index-finger-tip"],p=h.joints["thumb-tip"],m=d.position.distanceTo(p.position),x=.02,_=.005;h.inputState.pinching&&m>x+_?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&m<=x-_&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));l!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(s_)))}return l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),h!==null&&(h.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new ki;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},Bp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hs={h:0,s:0,l:0},cl={h:0,s:0,l:0};function nh(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Pt=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=bi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Gt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=Gt.workingColorSpace){return this.r=e,this.g=t,this.b=i,Gt.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=Gt.workingColorSpace){if(e=Zh(e,1),t=Ct(t,0,1),i=Ct(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=nh(o,r,e+1/3),this.g=nh(o,r,e),this.b=nh(o,r,e-1/3)}return Gt.colorSpaceToWorking(this,s),this}setStyle(e,t=bi){function i(r){r!==void 0&&parseFloat(r)<1&&_t("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],l=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:_t("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);_t("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=bi){let i=Bp[e.toLowerCase()];return i!==void 0?this.setHex(i,t):_t("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ps(e.r),this.g=Ps(e.g),this.b=Ps(e.b),this}copyLinearToSRGB(e){return this.r=uo(e.r),this.g=uo(e.g),this.b=uo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bi){return Gt.workingToColorSpace(jn.copy(this),e),Math.round(Ct(jn.r*255,0,255))*65536+Math.round(Ct(jn.g*255,0,255))*256+Math.round(Ct(jn.b*255,0,255))}getHexString(e=bi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Gt.workingColorSpace){Gt.workingToColorSpace(jn.copy(this),t);let i=jn.r,s=jn.g,r=jn.b,o=Math.max(i,s,r),l=Math.min(i,s,r),c,h,d=(l+o)/2;if(l===o)c=0,h=0;else{let p=o-l;switch(h=d<=.5?p/(o+l):p/(2-o-l),o){case i:c=(s-r)/p+(s<r?6:0);break;case s:c=(r-i)/p+2;break;case r:c=(i-s)/p+4;break}c/=6}return e.h=c,e.s=h,e.l=d,e}getRGB(e,t=Gt.workingColorSpace){return Gt.workingToColorSpace(jn.copy(this),t),e.r=jn.r,e.g=jn.g,e.b=jn.b,e}getStyle(e=bi){Gt.workingToColorSpace(jn.copy(this),e);let t=jn.r,i=jn.g,s=jn.b;return e!==bi?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Hs),this.setHSL(Hs.h+e,Hs.s+t,Hs.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Hs),e.getHSL(cl);let i=ea(Hs.h,cl.h,t),s=ea(Hs.s,cl.s,t),r=ea(Hs.l,cl.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},jn=new Pt;Pt.NAMES=Bp;var la=class n{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Pt(e),this.near=t,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},ca=class extends wi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ys,this.environmentIntensity=1,this.environmentRotation=new Ys,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Oi=new J,ws=new J,ih=new J,Es=new J,Qr=new J,eo=new J,Wf=new J,sh=new J,rh=new J,oh=new J,ah=new rn,lh=new rn,ch=new rn,Rs=class n{constructor(e=new J,t=new J,i=new J){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Oi.subVectors(e,t),s.cross(Oi);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Oi.subVectors(s,t),ws.subVectors(i,t),ih.subVectors(e,t);let o=Oi.dot(Oi),l=Oi.dot(ws),c=Oi.dot(ih),h=ws.dot(ws),d=ws.dot(ih),p=o*h-l*l;if(p===0)return r.set(0,0,0),null;let m=1/p,x=(h*c-l*d)*m,_=(o*d-l*c)*m;return r.set(1-x-_,_,x)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Es)===null?!1:Es.x>=0&&Es.y>=0&&Es.x+Es.y<=1}static getInterpolation(e,t,i,s,r,o,l,c){return this.getBarycoord(e,t,i,s,Es)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Es.x),c.addScaledVector(o,Es.y),c.addScaledVector(l,Es.z),c)}static getInterpolatedAttribute(e,t,i,s,r,o){return ah.setScalar(0),lh.setScalar(0),ch.setScalar(0),ah.fromBufferAttribute(e,t),lh.fromBufferAttribute(e,i),ch.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(ah,r.x),o.addScaledVector(lh,r.y),o.addScaledVector(ch,r.z),o}static isFrontFacing(e,t,i,s){return Oi.subVectors(i,t),ws.subVectors(e,t),Oi.cross(ws).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Oi.subVectors(this.c,this.b),ws.subVectors(this.a,this.b),Oi.cross(ws).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,o,l;Qr.subVectors(s,i),eo.subVectors(r,i),sh.subVectors(e,i);let c=Qr.dot(sh),h=eo.dot(sh);if(c<=0&&h<=0)return t.copy(i);rh.subVectors(e,s);let d=Qr.dot(rh),p=eo.dot(rh);if(d>=0&&p<=d)return t.copy(s);let m=c*p-d*h;if(m<=0&&c>=0&&d<=0)return o=c/(c-d),t.copy(i).addScaledVector(Qr,o);oh.subVectors(e,r);let x=Qr.dot(oh),_=eo.dot(oh);if(_>=0&&x<=_)return t.copy(r);let A=x*h-c*_;if(A<=0&&h>=0&&_<=0)return l=h/(h-_),t.copy(i).addScaledVector(eo,l);let v=d*_-x*p;if(v<=0&&p-d>=0&&x-_>=0)return Wf.subVectors(r,s),l=(p-d)/(p-d+(x-_)),t.copy(s).addScaledVector(Wf,l);let y=1/(v+A+m);return o=A*y,l=m*y,t.copy(i).addScaledVector(Qr,o).addScaledVector(eo,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Hn=class{constructor(e=new J(1/0,1/0,1/0),t=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Bi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Bi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Bi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,l=r.count;o<l;o++)e.isMesh===!0?e.getVertexPosition(o,Bi):Bi.fromBufferAttribute(r,o),Bi.applyMatrix4(e.matrixWorld),this.expandByPoint(Bi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ul.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ul.copy(i.boundingBox)),ul.applyMatrix4(e.matrixWorld),this.union(ul)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Bi),Bi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(jo),hl.subVectors(this.max,jo),to.subVectors(e.a,jo),no.subVectors(e.b,jo),io.subVectors(e.c,jo),Gs.subVectors(no,to),Ws.subVectors(io,no),_r.subVectors(to,io);let t=[0,-Gs.z,Gs.y,0,-Ws.z,Ws.y,0,-_r.z,_r.y,Gs.z,0,-Gs.x,Ws.z,0,-Ws.x,_r.z,0,-_r.x,-Gs.y,Gs.x,0,-Ws.y,Ws.x,0,-_r.y,_r.x,0];return!uh(t,to,no,io,hl)||(t=[1,0,0,0,1,0,0,0,1],!uh(t,to,no,io,hl))?!1:(dl.crossVectors(Gs,Ws),t=[dl.x,dl.y,dl.z],uh(t,to,no,io,hl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Bi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Bi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(As[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),As[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),As[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),As[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),As[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),As[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),As[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),As[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(As),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},As=[new J,new J,new J,new J,new J,new J,new J,new J],Bi=new J,ul=new Hn,to=new J,no=new J,io=new J,Gs=new J,Ws=new J,_r=new J,jo=new J,hl=new J,dl=new J,xr=new J;function uh(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){xr.fromArray(n,r);let l=s.x*Math.abs(xr.x)+s.y*Math.abs(xr.y)+s.z*Math.abs(xr.z),c=e.dot(xr),h=t.dot(xr),d=i.dot(xr);if(Math.max(-Math.max(c,h,d),Math.min(c,h,d))>l)return!1}return!0}var An=new J,fl=new bt,r_=0,zn=class extends Hi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:r_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=$l,this.updateRanges=[],this.gpuType=qi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)fl.fromBufferAttribute(this,t),fl.applyMatrix3(e),this.setXY(t,fl.x,fl.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)An.fromBufferAttribute(this,t),An.applyMatrix3(e),this.setXYZ(t,An.x,An.y,An.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)An.fromBufferAttribute(this,t),An.applyMatrix4(e),this.setXYZ(t,An.x,An.y,An.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)An.fromBufferAttribute(this,t),An.applyNormalMatrix(e),this.setXYZ(t,An.x,An.y,An.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)An.fromBufferAttribute(this,t),An.transformDirection(e),this.setXYZ(t,An.x,An.y,An.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=zi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=sn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=zi(t,this.array)),t}setX(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=zi(t,this.array)),t}setY(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=zi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=zi(t,this.array)),t}setW(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=sn(t,this.array),i=sn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=sn(t,this.array),i=sn(i,this.array),s=sn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=sn(t,this.array),i=sn(i,this.array),s=sn(s,this.array),r=sn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==$l&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var ua=class extends zn{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var ha=class extends zn{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Cn=class extends zn{constructor(e,t,i){super(new Float32Array(e),t,i)}},o_=new Hn,Ko=new J,hh=new J,Gi=class{constructor(e=new J,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):o_.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ko.subVectors(e,this.center);let t=Ko.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Ko,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(hh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ko.copy(e.center).add(hh)),this.expandByPoint(Ko.copy(e.center).sub(hh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},a_=0,Li=new vn,dh=new wi,so=new J,yi=new Hn,Qo=new Hn,Un=new J,Gn=class n extends Hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:a_++}),this.uuid=Cs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(D0(e)?ha:ua)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Rt().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Li.makeRotationFromQuaternion(e),this.applyMatrix4(Li),this}rotateX(e){return Li.makeRotationX(e),this.applyMatrix4(Li),this}rotateY(e){return Li.makeRotationY(e),this.applyMatrix4(Li),this}rotateZ(e){return Li.makeRotationZ(e),this.applyMatrix4(Li),this}translate(e,t,i){return Li.makeTranslation(e,t,i),this.applyMatrix4(Li),this}scale(e,t,i){return Li.makeScale(e,t,i),this.applyMatrix4(Li),this}lookAt(e){return dh.lookAt(e),dh.updateMatrix(),this.applyMatrix4(dh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(so).negate(),this.translate(so.x,so.y,so.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Cn(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&_t("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){yt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];yi.setFromBufferAttribute(r),this.morphTargetsRelative?(Un.addVectors(this.boundingBox.min,yi.min),this.boundingBox.expandByPoint(Un),Un.addVectors(this.boundingBox.max,yi.max),this.boundingBox.expandByPoint(Un)):(this.boundingBox.expandByPoint(yi.min),this.boundingBox.expandByPoint(yi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&yt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){yt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(e){let i=this.boundingSphere.center;if(yi.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let l=t[r];Qo.setFromBufferAttribute(l),this.morphTargetsRelative?(Un.addVectors(yi.min,Qo.min),yi.expandByPoint(Un),Un.addVectors(yi.max,Qo.max),yi.expandByPoint(Un)):(yi.expandByPoint(Qo.min),yi.expandByPoint(Qo.max))}yi.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)Un.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Un));if(t)for(let r=0,o=t.length;r<o;r++){let l=t[r],c=this.morphTargetsRelative;for(let h=0,d=l.count;h<d;h++)Un.fromBufferAttribute(l,h),c&&(so.fromBufferAttribute(e,h),Un.add(so)),s=Math.max(s,i.distanceToSquared(Un))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&yt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){yt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new zn(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));let l=[],c=[];for(let M=0;M<i.count;M++)l[M]=new J,c[M]=new J;let h=new J,d=new J,p=new J,m=new bt,x=new bt,_=new bt,A=new J,v=new J;function y(M,k,X){h.fromBufferAttribute(i,M),d.fromBufferAttribute(i,k),p.fromBufferAttribute(i,X),m.fromBufferAttribute(r,M),x.fromBufferAttribute(r,k),_.fromBufferAttribute(r,X),d.sub(h),p.sub(h),x.sub(m),_.sub(m);let W=1/(x.x*_.y-_.x*x.y);isFinite(W)&&(A.copy(d).multiplyScalar(_.y).addScaledVector(p,-x.y).multiplyScalar(W),v.copy(p).multiplyScalar(x.x).addScaledVector(d,-_.x).multiplyScalar(W),l[M].add(A),l[k].add(A),l[X].add(A),c[M].add(v),c[k].add(v),c[X].add(v))}let P=this.groups;P.length===0&&(P=[{start:0,count:e.count}]);for(let M=0,k=P.length;M<k;++M){let X=P[M],W=X.start,F=X.count;for(let me=W,K=W+F;me<K;me+=3)y(e.getX(me+0),e.getX(me+1),e.getX(me+2))}let I=new J,E=new J,R=new J,L=new J;function V(M){R.fromBufferAttribute(s,M),L.copy(R);let k=l[M];I.copy(k),I.sub(R.multiplyScalar(R.dot(k))).normalize(),E.crossVectors(L,k);let W=E.dot(c[M])<0?-1:1;o.setXYZW(M,I.x,I.y,I.z,W)}for(let M=0,k=P.length;M<k;++M){let X=P[M],W=X.start,F=X.count;for(let me=W,K=W+F;me<K;me+=3)V(e.getX(me+0)),V(e.getX(me+1)),V(e.getX(me+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new zn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let m=0,x=i.count;m<x;m++)i.setXYZ(m,0,0,0);let s=new J,r=new J,o=new J,l=new J,c=new J,h=new J,d=new J,p=new J;if(e)for(let m=0,x=e.count;m<x;m+=3){let _=e.getX(m+0),A=e.getX(m+1),v=e.getX(m+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,A),o.fromBufferAttribute(t,v),d.subVectors(o,r),p.subVectors(s,r),d.cross(p),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,A),h.fromBufferAttribute(i,v),l.add(d),c.add(d),h.add(d),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(A,c.x,c.y,c.z),i.setXYZ(v,h.x,h.y,h.z)}else for(let m=0,x=t.count;m<x;m+=3)s.fromBufferAttribute(t,m+0),r.fromBufferAttribute(t,m+1),o.fromBufferAttribute(t,m+2),d.subVectors(o,r),p.subVectors(s,r),d.cross(p),i.setXYZ(m+0,d.x,d.y,d.z),i.setXYZ(m+1,d.x,d.y,d.z),i.setXYZ(m+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Un.fromBufferAttribute(e,t),Un.normalize(),e.setXYZ(t,Un.x,Un.y,Un.z)}toNonIndexed(){function e(l,c){let h=l.array,d=l.itemSize,p=l.normalized,m=new h.constructor(c.length*d),x=0,_=0;for(let A=0,v=c.length;A<v;A++){l.isInterleavedBufferAttribute?x=c[A]*l.data.stride+l.offset:x=c[A]*d;for(let y=0;y<d;y++)m[_++]=h[x++]}return new zn(m,d,p)}if(this.index===null)return _t("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let l in s){let c=s[l],h=e(c,i);t.setAttribute(l,h)}let r=this.morphAttributes;for(let l in r){let c=[],h=r[l];for(let d=0,p=h.length;d<p;d++){let m=h[d],x=e(m,i);c.push(x)}t.morphAttributes[l]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let l=0,c=o.length;l<c;l++){let h=o[l];t.addGroup(h.start,h.count,h.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let h in c)c[h]!==void 0&&(e[h]=c[h]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let h=i[c];e.data.attributes[c]=h.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let h=this.morphAttributes[c],d=[];for(let p=0,m=h.length;p<m;p++){let x=h[p];d.push(x.toJSON(e.data))}d.length>0&&(s[c]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let l=this.boundingSphere;return l!==null&&(e.data.boundingSphere=l.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let h in s){let d=s[h];this.setAttribute(h,d.clone(t))}let r=e.morphAttributes;for(let h in r){let d=[],p=r[h];for(let m=0,x=p.length;m<x;m++)d.push(p[m].clone(t));this.morphAttributes[h]=d}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let h=0,d=o.length;h<d;h++){let p=o[h];this.addGroup(p.start,p.count,p.materialIndex)}let l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Zl=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=$l,this.updateRanges=[],this.version=0,this.uuid=Cs()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Cs()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Cs()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},ti=new J,ci=class n{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)ti.fromBufferAttribute(this,t),ti.applyMatrix4(e),this.setXYZ(t,ti.x,ti.y,ti.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ti.fromBufferAttribute(this,t),ti.applyNormalMatrix(e),this.setXYZ(t,ti.x,ti.y,ti.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ti.fromBufferAttribute(this,t),ti.transformDirection(e),this.setXYZ(t,ti.x,ti.y,ti.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=zi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=sn(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=sn(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=sn(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=sn(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=sn(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=zi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=zi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=zi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=zi(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=sn(t,this.array),i=sn(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=sn(t,this.array),i=sn(i,this.array),s=sn(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=sn(t,this.array),i=sn(i,this.array),s=sn(s,this.array),r=sn(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){oa("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new zn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){oa("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},l_=0,Js=class extends Hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:l_++}),this.uuid=Cs(),this.name="",this.type="Material",this.blending=Is,this.side=Ds,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=kl,this.blendDst=Fl,this.blendEquation=qs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pt(0,0,0),this.blendAlpha=0,this.depthFunc=Mr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=br,this.stencilZFail=br,this.stencilZPass=br,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){_t(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){_t(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Is&&(i.blending=this.blending),this.side!==Ds&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==kl&&(i.blendSrc=this.blendSrc),this.blendDst!==Fl&&(i.blendDst=this.blendDst),this.blendEquation!==qs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Mr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==wh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==br&&(i.stencilFail=this.stencilFail),this.stencilZFail!==br&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==br&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let l in r){let c=r[l];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Pt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new bt().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new bt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Ts=new J,fh=new J,pl=new J,Xs=new J,ph=new J,ml=new J,mh=new J,Zs=class{constructor(e=new J,t=new J(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ts)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ts.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ts.copy(this.origin).addScaledVector(this.direction,t),Ts.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){fh.copy(e).add(t).multiplyScalar(.5),pl.copy(t).sub(e).normalize(),Xs.copy(this.origin).sub(fh);let r=e.distanceTo(t)*.5,o=-this.direction.dot(pl),l=Xs.dot(this.direction),c=-Xs.dot(pl),h=Xs.lengthSq(),d=Math.abs(1-o*o),p,m,x,_;if(d>0)if(p=o*c-l,m=o*l-c,_=r*d,p>=0)if(m>=-_)if(m<=_){let A=1/d;p*=A,m*=A,x=p*(p+o*m+2*l)+m*(o*p+m+2*c)+h}else m=r,p=Math.max(0,-(o*m+l)),x=-p*p+m*(m+2*c)+h;else m=-r,p=Math.max(0,-(o*m+l)),x=-p*p+m*(m+2*c)+h;else m<=-_?(p=Math.max(0,-(-o*r+l)),m=p>0?-r:Math.min(Math.max(-r,-c),r),x=-p*p+m*(m+2*c)+h):m<=_?(p=0,m=Math.min(Math.max(-r,-c),r),x=m*(m+2*c)+h):(p=Math.max(0,-(o*r+l)),m=p>0?r:Math.min(Math.max(-r,-c),r),x=-p*p+m*(m+2*c)+h);else m=o>0?-r:r,p=Math.max(0,-(o*m+l)),x=-p*p+m*(m+2*c)+h;return i&&i.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(fh).addScaledVector(pl,m),x}intersectSphere(e,t){Ts.subVectors(e.center,this.origin);let i=Ts.dot(this.direction),s=Ts.dot(Ts)-i*i,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),l=i-o,c=i+o;return c<0?null:l<0?this.at(c,t):this.at(l,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,l,c,h=1/this.direction.x,d=1/this.direction.y,p=1/this.direction.z,m=this.origin;return h>=0?(i=(e.min.x-m.x)*h,s=(e.max.x-m.x)*h):(i=(e.max.x-m.x)*h,s=(e.min.x-m.x)*h),d>=0?(r=(e.min.y-m.y)*d,o=(e.max.y-m.y)*d):(r=(e.max.y-m.y)*d,o=(e.min.y-m.y)*d),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),p>=0?(l=(e.min.z-m.z)*p,c=(e.max.z-m.z)*p):(l=(e.max.z-m.z)*p,c=(e.min.z-m.z)*p),i>c||l>s)||((l>i||i!==i)&&(i=l),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Ts)!==null}intersectTriangle(e,t,i,s,r){ph.subVectors(t,e),ml.subVectors(i,e),mh.crossVectors(ph,ml);let o=this.direction.dot(mh),l;if(o>0){if(s)return null;l=1}else if(o<0)l=-1,o=-o;else return null;Xs.subVectors(this.origin,e);let c=l*this.direction.dot(ml.crossVectors(Xs,ml));if(c<0)return null;let h=l*this.direction.dot(ph.cross(Xs));if(h<0||c+h>o)return null;let d=-l*Xs.dot(mh);return d<0?null:this.at(d/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},wr=class extends Js{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ys,this.combine=Ih,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Xf=new vn,vr=new Zs,gl=new Gi,$f=new J,_l=new J,xl=new J,vl=new J,gh=new J,yl=new J,qf=new J,bl=new J,Sn=class extends wi{constructor(e=new Gn,t=new wr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let l=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let l=this.morphTargetInfluences;if(r&&l){yl.set(0,0,0);for(let c=0,h=r.length;c<h;c++){let d=l[c],p=r[c];d!==0&&(gh.fromBufferAttribute(p,e),o?yl.addScaledVector(gh,d):yl.addScaledVector(gh.sub(t),d))}t.add(yl)}return t}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),gl.copy(i.boundingSphere),gl.applyMatrix4(r),vr.copy(e.ray).recast(e.near),!(gl.containsPoint(vr.origin)===!1&&(vr.intersectSphere(gl,$f)===null||vr.origin.distanceToSquared($f)>(e.far-e.near)**2))&&(Xf.copy(r).invert(),vr.copy(e.ray).applyMatrix4(Xf),!(i.boundingBox!==null&&vr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,vr)))}_computeIntersections(e,t,i){let s,r=this.geometry,o=this.material,l=r.index,c=r.attributes.position,h=r.attributes.uv,d=r.attributes.uv1,p=r.attributes.normal,m=r.groups,x=r.drawRange;if(l!==null)if(Array.isArray(o))for(let _=0,A=m.length;_<A;_++){let v=m[_],y=o[v.materialIndex],P=Math.max(v.start,x.start),I=Math.min(l.count,Math.min(v.start+v.count,x.start+x.count));for(let E=P,R=I;E<R;E+=3){let L=l.getX(E),V=l.getX(E+1),M=l.getX(E+2);s=Sl(this,y,e,i,h,d,p,L,V,M),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=v.materialIndex,t.push(s))}}else{let _=Math.max(0,x.start),A=Math.min(l.count,x.start+x.count);for(let v=_,y=A;v<y;v+=3){let P=l.getX(v),I=l.getX(v+1),E=l.getX(v+2);s=Sl(this,o,e,i,h,d,p,P,I,E),s&&(s.faceIndex=Math.floor(v/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let _=0,A=m.length;_<A;_++){let v=m[_],y=o[v.materialIndex],P=Math.max(v.start,x.start),I=Math.min(c.count,Math.min(v.start+v.count,x.start+x.count));for(let E=P,R=I;E<R;E+=3){let L=E,V=E+1,M=E+2;s=Sl(this,y,e,i,h,d,p,L,V,M),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=v.materialIndex,t.push(s))}}else{let _=Math.max(0,x.start),A=Math.min(c.count,x.start+x.count);for(let v=_,y=A;v<y;v+=3){let P=v,I=v+1,E=v+2;s=Sl(this,o,e,i,h,d,p,P,I,E),s&&(s.faceIndex=Math.floor(v/3),t.push(s))}}}};function c_(n,e,t,i,s,r,o,l){let c;if(e.side===ri?c=i.intersectTriangle(o,r,s,!0,l):c=i.intersectTriangle(s,r,o,e.side===Ds,l),c===null)return null;bl.copy(l),bl.applyMatrix4(n.matrixWorld);let h=t.ray.origin.distanceTo(bl);return h<t.near||h>t.far?null:{distance:h,point:bl.clone(),object:n}}function Sl(n,e,t,i,s,r,o,l,c,h){n.getVertexPosition(l,_l),n.getVertexPosition(c,xl),n.getVertexPosition(h,vl);let d=c_(n,e,t,i,_l,xl,vl,qf);if(d){let p=new J;Rs.getBarycoord(qf,_l,xl,vl,p),s&&(d.uv=Rs.getInterpolatedAttribute(s,l,c,h,p,new bt)),r&&(d.uv1=Rs.getInterpolatedAttribute(r,l,c,h,p,new bt)),o&&(d.normal=Rs.getInterpolatedAttribute(o,l,c,h,p,new J),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));let m={a:l,b:c,c:h,normal:new J,materialIndex:0};Rs.getNormal(_l,xl,vl,m.normal),d.face=m,d.barycoord=p}return d}var jl=class extends ii{constructor(e=null,t=1,i=1,s,r,o,l,c,h=On,d=On,p,m){super(null,o,l,c,h,d,s,r,p,m),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var _h=new J,u_=new J,h_=new Rt,ni=class{constructor(e=new J(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=_h.subVectors(i,t).cross(u_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let s=e.delta(_h),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||h_.getNormalMatrix(e),s=this.coplanarPoint(_h).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},yr=new Gi,d_=new bt(.5,.5),Ml=new J,da=class{constructor(e=new ni,t=new ni,i=new ni,s=new ni,r=new ni,o=new ni){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){let l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(i),l[3].copy(s),l[4].copy(r),l[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Vi,i=!1){let s=this.planes,r=e.elements,o=r[0],l=r[1],c=r[2],h=r[3],d=r[4],p=r[5],m=r[6],x=r[7],_=r[8],A=r[9],v=r[10],y=r[11],P=r[12],I=r[13],E=r[14],R=r[15];if(s[0].setComponents(h-o,x-d,y-_,R-P).normalize(),s[1].setComponents(h+o,x+d,y+_,R+P).normalize(),s[2].setComponents(h+l,x+p,y+A,R+I).normalize(),s[3].setComponents(h-l,x-p,y-A,R-I).normalize(),i)s[4].setComponents(c,m,v,E).normalize(),s[5].setComponents(h-c,x-m,y-v,R-E).normalize();else if(s[4].setComponents(h-c,x-m,y-v,R-E).normalize(),t===Vi)s[5].setComponents(h+c,x+m,y+v,R+E).normalize();else if(t===sa)s[5].setComponents(c,m,v,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),yr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),yr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(yr)}intersectsSprite(e){yr.center.set(0,0,0);let t=d_.distanceTo(e.center);return yr.radius=.7071067811865476+t,yr.applyMatrix4(e.matrixWorld),this.intersectsSphere(yr)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(Ml.x=s.normal.x>0?e.max.x:e.min.x,Ml.y=s.normal.y>0?e.max.y:e.min.y,Ml.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ml)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var _o=class extends Js{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Pt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Yf=new vn,Eh=new Zs,wl=new Gi,El=new J,fa=class extends wi{constructor(e=new Gn,t=new _o){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),wl.copy(i.boundingSphere),wl.applyMatrix4(s),wl.radius+=r,e.ray.intersectsSphere(wl)===!1)return;Yf.copy(s).invert(),Eh.copy(e.ray).applyMatrix4(Yf);let l=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=l*l,h=i.index,p=i.attributes.position;if(h!==null){let m=Math.max(0,o.start),x=Math.min(h.count,o.start+o.count);for(let _=m,A=x;_<A;_++){let v=h.getX(_);El.fromBufferAttribute(p,v),Jf(El,v,c,s,e,t,this)}}else{let m=Math.max(0,o.start),x=Math.min(p.count,o.start+o.count);for(let _=m,A=x;_<A;_++)El.fromBufferAttribute(p,_),Jf(El,_,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let l=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}};function Jf(n,e,t,i,s,r,o){let l=Eh.distanceSqToPoint(n);if(l<t){let c=new J;Eh.closestPointToPoint(n,c),c.applyMatrix4(i);let h=s.ray.origin.distanceTo(c);if(h<s.near||h>s.far)return;r.push({distance:h,distanceToRay:Math.sqrt(l),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var pa=class extends ii{constructor(e=[],t=tr,i,s,r,o,l,c,h,d){super(e,t,i,s,r,o,l,c,h,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ma=class extends ii{constructor(e,t,i,s,r,o,l,c,h){super(e,t,i,s,r,o,l,c,h),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Ls=class extends ii{constructor(e,t,i=$i,s,r,o,l=On,c=On,h,d=is,p=1){if(d!==is&&d!==ir)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let m={width:e,height:t,depth:p};super(m,s,r,o,l,c,d,i,h),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new po(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Kl=class extends Ls{constructor(e,t=$i,i=tr,s,r,o=On,l=On,c,h=is){let d={width:e,height:e,depth:1},p=[d,d,d,d,d,d];super(e,e,t,i,s,r,o,l,c,h),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ga=class extends ii{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Wi=class n extends Gn{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let l=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],h=[],d=[],p=[],m=0,x=0;_("z","y","x",-1,-1,i,t,e,o,r,0),_("z","y","x",1,-1,i,t,-e,o,r,1),_("x","z","y",1,1,e,i,t,s,o,2),_("x","z","y",1,-1,e,i,-t,s,o,3),_("x","y","z",1,-1,e,t,i,s,r,4),_("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new Cn(h,3)),this.setAttribute("normal",new Cn(d,3)),this.setAttribute("uv",new Cn(p,2));function _(A,v,y,P,I,E,R,L,V,M,k){let X=E/V,W=R/M,F=E/2,me=R/2,K=L/2,Q=V+1,ye=M+1,de=0,Me=0,Ae=new J;for(let ne=0;ne<ye;ne++){let Ye=ne*W-me;for(let tt=0;tt<Q;tt++){let zt=tt*X-F;Ae[A]=zt*P,Ae[v]=Ye*I,Ae[y]=K,h.push(Ae.x,Ae.y,Ae.z),Ae[A]=0,Ae[v]=0,Ae[y]=L>0?1:-1,d.push(Ae.x,Ae.y,Ae.z),p.push(tt/V),p.push(1-ne/M),de+=1}}for(let ne=0;ne<M;ne++)for(let Ye=0;Ye<V;Ye++){let tt=m+Ye+Q*ne,zt=m+Ye+Q*(ne+1),ze=m+(Ye+1)+Q*(ne+1),je=m+(Ye+1)+Q*ne;c.push(tt,zt,je),c.push(zt,ze,je),Me+=6}l.addGroup(x,Me,k),x+=Me,m+=de}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Al=new J,Tl=new J,xh=new J,Rl=new Rs,Er=class extends Gn{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let s=Math.pow(10,4),r=Math.cos(co*t),o=e.getIndex(),l=e.getAttribute("position"),c=o?o.count:l.count,h=[0,0,0],d=["a","b","c"],p=new Array(3),m={},x=[];for(let _=0;_<c;_+=3){o?(h[0]=o.getX(_),h[1]=o.getX(_+1),h[2]=o.getX(_+2)):(h[0]=_,h[1]=_+1,h[2]=_+2);let{a:A,b:v,c:y}=Rl;if(A.fromBufferAttribute(l,h[0]),v.fromBufferAttribute(l,h[1]),y.fromBufferAttribute(l,h[2]),Rl.getNormal(xh),p[0]=`${Math.round(A.x*s)},${Math.round(A.y*s)},${Math.round(A.z*s)}`,p[1]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,p[2]=`${Math.round(y.x*s)},${Math.round(y.y*s)},${Math.round(y.z*s)}`,!(p[0]===p[1]||p[1]===p[2]||p[2]===p[0]))for(let P=0;P<3;P++){let I=(P+1)%3,E=p[P],R=p[I],L=Rl[d[P]],V=Rl[d[I]],M=`${E}_${R}`,k=`${R}_${E}`;k in m&&m[k]?(xh.dot(m[k].normal)<=r&&(x.push(L.x,L.y,L.z),x.push(V.x,V.y,V.z)),m[k]=null):M in m||(m[M]={index0:h[P],index1:h[I],normal:xh.clone()})}}for(let _ in m)if(m[_]){let{index0:A,index1:v}=m[_];Al.fromBufferAttribute(l,A),Tl.fromBufferAttribute(l,v),x.push(Al.x,Al.y,Al.z),x.push(Tl.x,Tl.y,Tl.z)}this.setAttribute("position",new Cn(x,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};var js=class n extends Gn{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,o=t/2,l=Math.floor(i),c=Math.floor(s),h=l+1,d=c+1,p=e/l,m=t/c,x=[],_=[],A=[],v=[];for(let y=0;y<d;y++){let P=y*m-o;for(let I=0;I<h;I++){let E=I*p-r;_.push(E,-P,0),A.push(0,0,1),v.push(I/l),v.push(1-y/c)}}for(let y=0;y<c;y++)for(let P=0;P<l;P++){let I=P+h*y,E=P+h*(y+1),R=P+1+h*(y+1),L=P+1+h*y;x.push(I,E,L),x.push(E,R,L)}this.setIndex(x),this.setAttribute("position",new Cn(_,3)),this.setAttribute("normal",new Cn(A,3)),this.setAttribute("uv",new Cn(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var _a=class extends Gn{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],i=new Set,s=new J,r=new J;if(e.index!==null){let o=e.attributes.position,l=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:l.count,materialIndex:0}]);for(let h=0,d=c.length;h<d;++h){let p=c[h],m=p.start,x=p.count;for(let _=m,A=m+x;_<A;_+=3)for(let v=0;v<3;v++){let y=l.getX(_+v),P=l.getX(_+(v+1)%3);s.fromBufferAttribute(o,y),r.fromBufferAttribute(o,P),Zf(s,r,i)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}}else{let o=e.attributes.position;for(let l=0,c=o.count/3;l<c;l++)for(let h=0;h<3;h++){let d=3*l+h,p=3*l+(h+1)%3;s.fromBufferAttribute(o,d),r.fromBufferAttribute(o,p),Zf(s,r,i)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new Cn(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Zf(n,e,t){let i=`${n.x},${n.y},${n.z}-${e.x},${e.y},${e.z}`,s=`${e.x},${e.y},${e.z}-${n.x},${n.y},${n.z}`;return t.has(i)===!0||t.has(s)===!0?!1:(t.add(i),t.add(s),!0)}function Rr(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];if(jf(s))s.isRenderTargetTexture?(_t("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(jf(s[0])){let r=[];for(let o=0,l=s.length;o<l;o++)r[o]=s[o].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Qn(n){let e={};for(let t=0;t<n.length;t++){let i=Rr(n[t]);for(let s in i)e[s]=i[s]}return e}function jf(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function f_(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function jh(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Gt.workingColorSpace}var Ia={clone:Rr,merge:Qn},p_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,m_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,si=class extends Js{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=p_,this.fragmentShader=m_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Rr(e.uniforms),this.uniformsGroups=f_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Pt().setHex(s.value);break;case"v2":this.uniforms[i].value=new bt().fromArray(s.value);break;case"v3":this.uniforms[i].value=new J().fromArray(s.value);break;case"v4":this.uniforms[i].value=new rn().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Rt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new vn().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ql=class extends si{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var ec=class extends Js{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Tp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},tc=class extends Js{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Cl(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}var Ks=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];e:{t:{let o;n:{i:if(!(e<s)){for(let l=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===l)break;if(r=s,s=t[++i],e<s)break t}o=t.length;break n}if(!(e>=r)){let l=t[1];e<l&&(i=2,r=l);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=t[--i-1],e>=r)break t}o=i,i=0;break n}break e}for(;i<o;){let l=i+o>>>1;e<t[l]?o=l:i=l+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=i[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},nc=class extends Ks{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:bh,endingEnd:bh}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,o=e+1,l=s[r],c=s[o];if(l===void 0)switch(this.getSettings_().endingStart){case Sh:r=e,l=2*t-i;break;case Mh:r=s.length-2,l=t+s[r]-s[r+1];break;default:r=e,l=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Sh:o=e,c=2*i-t;break;case Mh:o=1,c=i+s[1]-s[0];break;default:o=e-1,c=t}let h=(i-t)*.5,d=this.valueSize;this._weightPrev=h/(t-l),this._weightNext=h/(c-i),this._offsetPrev=r*d,this._offsetNext=o*d}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,l=this.valueSize,c=e*l,h=c-l,d=this._offsetPrev,p=this._offsetNext,m=this._weightPrev,x=this._weightNext,_=(i-t)/(s-t),A=_*_,v=A*_,y=-m*v+2*m*A-m*_,P=(1+m)*v+(-1.5-2*m)*A+(-.5+m)*_+1,I=(-1-x)*v+(1.5+x)*A+.5*_,E=x*v-x*A;for(let R=0;R!==l;++R)r[R]=y*o[d+R]+P*o[h+R]+I*o[c+R]+E*o[p+R];return r}},ic=class extends Ks{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,l=this.valueSize,c=e*l,h=c-l,d=(i-t)/(s-t),p=1-d;for(let m=0;m!==l;++m)r[m]=o[h+m]*p+o[c+m]*d;return r}},sc=class extends Ks{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},rc=class extends Ks{interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,l=this.valueSize,c=e*l,h=c-l,d=this.inTangents,p=this.outTangents;if(!d||!p){let _=(i-t)/(s-t),A=1-_;for(let v=0;v!==l;++v)r[v]=o[h+v]*A+o[c+v]*_;return r}let m=l*2,x=e-1;for(let _=0;_!==l;++_){let A=o[h+_],v=o[c+_],y=x*m+_*2,P=p[y],I=p[y+1],E=e*m+_*2,R=d[E],L=d[E+1],V=(i-t)/(s-t),M,k,X,W,F;for(let me=0;me<8;me++){M=V*V,k=M*V,X=1-V,W=X*X,F=W*X;let Q=F*t+3*W*V*P+3*X*M*R+k*s-i;if(Math.abs(Q)<1e-10)break;let ye=3*W*(P-t)+6*X*V*(R-P)+3*M*(s-R);if(Math.abs(ye)<1e-10)break;V=V-Q/ye,V=Math.max(0,Math.min(1,V))}r[_]=F*A+3*W*V*I+3*X*M*L+k*v}return r}},Ei=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Cl(t,this.TimeBufferType),this.values=Cl(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Cl(e.times,Array),values:Cl(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new sc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ic(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new nc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new rc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ta:t=this.InterpolantFactoryMethodDiscrete;break;case Xl:t=this.InterpolantFactoryMethodLinear;break;case Ll:t=this.InterpolantFactoryMethodSmooth;break;case yh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return _t("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ta;case this.InterpolantFactoryMethodLinear:return Xl;case this.InterpolantFactoryMethodSmooth:return Ll;case this.InterpolantFactoryMethodBezier:return yh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e}return this}trim(e,t){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<e;)++r;for(;o!==-1&&i[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let l=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*l,o*l)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(yt("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(yt("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let l=0;l!==r;l++){let c=i[l];if(typeof c=="number"&&isNaN(c)){yt("KeyframeTrack: Time is not a valid number.",this,l,c),e=!1;break}if(o!==null&&o>c){yt("KeyframeTrack: Out of order keys.",this,l,c,o),e=!1;break}o=c}if(s!==void 0&&I0(s))for(let l=0,c=s.length;l!==c;++l){let h=s[l];if(isNaN(h)){yt("KeyframeTrack: Value is not a valid number.",this,l,h),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Ll,r=e.length-1,o=1;for(let l=1;l<r;++l){let c=!1,h=e[l],d=e[l+1];if(h!==d&&(l!==1||h!==e[0]))if(s)c=!0;else{let p=l*i,m=p-i,x=p+i;for(let _=0;_!==i;++_){let A=t[p+_];if(A!==t[m+_]||A!==t[x+_]){c=!0;break}}}if(c){if(l!==o){e[o]=e[l];let p=l*i,m=o*i;for(let x=0;x!==i;++x)t[m+x]=t[p+x]}++o}}if(r>0){e[o]=e[r];for(let l=r*i,c=o*i,h=0;h!==i;++h)t[c+h]=t[l+h];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};Ei.prototype.ValueTypeName="";Ei.prototype.TimeBufferType=Float32Array;Ei.prototype.ValueBufferType=Float32Array;Ei.prototype.DefaultInterpolation=Xl;var Qs=class extends Ei{constructor(e,t,i){super(e,t,i)}};Qs.prototype.ValueTypeName="bool";Qs.prototype.ValueBufferType=Array;Qs.prototype.DefaultInterpolation=ta;Qs.prototype.InterpolantFactoryMethodLinear=void 0;Qs.prototype.InterpolantFactoryMethodSmooth=void 0;var oc=class extends Ei{constructor(e,t,i,s){super(e,t,i,s)}};oc.prototype.ValueTypeName="color";var ac=class extends Ei{constructor(e,t,i,s){super(e,t,i,s)}};ac.prototype.ValueTypeName="number";var lc=class extends Ks{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,l=this.valueSize,c=(i-t)/(s-t),h=e*l;for(let d=h+l;h!==d;h+=4)Si.slerpFlat(r,0,o,h-l,o,h,c);return r}},xa=class extends Ei{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new lc(this.times,this.values,this.getValueSize(),e)}};xa.prototype.ValueTypeName="quaternion";xa.prototype.InterpolantFactoryMethodSmooth=void 0;var er=class extends Ei{constructor(e,t,i){super(e,t,i)}};er.prototype.ValueTypeName="string";er.prototype.ValueBufferType=Array;er.prototype.DefaultInterpolation=ta;er.prototype.InterpolantFactoryMethodLinear=void 0;er.prototype.InterpolantFactoryMethodSmooth=void 0;var cc=class extends Ei{constructor(e,t,i,s){super(e,t,i,s)}};cc.prototype.ValueTypeName="vector";var uc=class{constructor(e,t,i){let s=this,r=!1,o=0,l=0,c,h=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(d){l++,r===!1&&s.onStart!==void 0&&s.onStart(d,o,l),r=!0},this.itemEnd=function(d){o++,s.onProgress!==void 0&&s.onProgress(d,o,l),o===l&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return d=d.normalize("NFC"),c?c(d):d},this.setURLModifier=function(d){return c=d,this},this.addHandler=function(d,p){return h.push(d,p),this},this.removeHandler=function(d){let p=h.indexOf(d);return p!==-1&&h.splice(p,2),this},this.getHandler=function(d){for(let p=0,m=h.length;p<m;p+=2){let x=h[p],_=h[p+1];if(x.global&&(x.lastIndex=0),x.test(d))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},zp=new uc,hc=class{constructor(e){this.manager=e!==void 0?e:zp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};hc.DEFAULT_MATERIAL_NAME="__DEFAULT";var Pl=new J,Dl=new Si,ts=new J,va=class extends wi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vn,this.projectionMatrix=new vn,this.projectionMatrixInverse=new vn,this.coordinateSystem=Vi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Pl,Dl,ts),ts.x===1&&ts.y===1&&ts.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Pl,Dl,ts.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Pl,Dl,ts),ts.x===1&&ts.y===1&&ts.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Pl,Dl,ts.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},$s=new J,Kf=new bt,Qf=new bt,Kn=class extends va{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=fo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(co*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return fo*2*Math.atan(Math.tan(co*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){$s.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set($s.x,$s.y).multiplyScalar(-e/$s.z),$s.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set($s.x,$s.y).multiplyScalar(-e/$s.z)}getViewSize(e,t){return this.getViewBounds(e,Kf,Qf),t.subVectors(Qf,Kf)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(co*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,h=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*i/h,s*=o.width/c,i*=o.height/h}let l=this.filmOffset;l!==0&&(r+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Ar=class extends va{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,o=i+e,l=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let h=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=h*this.view.offsetX,o=r+h*this.view.width,l-=d*this.view.offsetY,c=l-d*this.view.height}this.projectionMatrix.makeOrthographic(r,o,l,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var ya=class extends Gn{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var ro=-90,oo=1,dc=class extends wi{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Kn(ro,oo,e,t);s.layers=this.layers,this.add(s);let r=new Kn(ro,oo,e,t);r.layers=this.layers,this.add(r);let o=new Kn(ro,oo,e,t);o.layers=this.layers,this.add(o);let l=new Kn(ro,oo,e,t);l.layers=this.layers,this.add(l);let c=new Kn(ro,oo,e,t);c.layers=this.layers,this.add(c);let h=new Kn(ro,oo,e,t);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,l,c]=t;for(let h of t)this.remove(h);if(e===Vi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===sa)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let h of t)this.add(h),h.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,l,c,h,d]=this.children,p=e.getRenderTarget(),m=e.getActiveCubeFace(),x=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;let A=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let v=!1;e.isWebGLRenderer===!0?v=e.state.buffers.depth.getReversed():v=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,s),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,3,s),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,s),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),i.texture.generateMipmaps=A,e.setRenderTarget(i,5,s),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(p,m,x),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}},fc=class extends Kn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Kh="\\[\\]\\.:\\/",g_=new RegExp("["+Kh+"]","g"),Qh="[^"+Kh+"]",__="[^"+Kh.replace("\\.","")+"]",x_=/((?:WC+[\/:])*)/.source.replace("WC",Qh),v_=/(WCOD+)?/.source.replace("WCOD",__),y_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Qh),b_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Qh),S_=new RegExp("^"+x_+v_+y_+b_+"$"),M_=["material","materials","bones","map"],Ah=class{constructor(e,t,i){let s=i||xn.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},xn=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(g_,"")}static parseTrackName(e){let t=S_.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);M_.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let o=0;o<r.length;o++){let l=r[o];if(l.name===t||l.uuid===t)return l;let c=i(l.children);if(c)return c}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){_t("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let h=t.objectIndex;switch(i){case"materials":if(!e.material){yt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){yt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){yt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===h){h=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){yt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){yt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){yt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(h!==void 0){if(e[h]===void 0){yt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[h]}}let o=e[s];if(o===void 0){let h=t.nodeName;yt("PropertyBinding: Trying to update property for track: "+h+"."+s+" but it wasn't found.",e);return}let l=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?l=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){yt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){yt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};xn.Composite=Ah;xn.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};xn.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};xn.prototype.GetterByBindingType=[xn.prototype._getValue_direct,xn.prototype._getValue_array,xn.prototype._getValue_arrayElement,xn.prototype._getValue_toArray];xn.prototype.SetterByBindingTypeAndVersioning=[[xn.prototype._setValue_direct,xn.prototype._setValue_direct_setNeedsUpdate,xn.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[xn.prototype._setValue_array,xn.prototype._setValue_array_setNeedsUpdate,xn.prototype._setValue_array_setMatrixWorldNeedsUpdate],[xn.prototype._setValue_arrayElement,xn.prototype._setValue_arrayElement_setNeedsUpdate,xn.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[xn.prototype._setValue_fromArray,xn.prototype._setValue_fromArray_setNeedsUpdate,xn.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var rw=new Float32Array(1);var ss=class extends Zl{constructor(e,t,i=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}};var ep=new vn,xo=class{constructor(e,t,i=0,s=1/0){this.ray=new Zs(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new mo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):yt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ep.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ep),this}intersectObject(e,t=!0,i=[]){return Th(e,this,i,t),i.sort(tp),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Th(e[s],this,i,t);return i.sort(tp),i}};function tp(n,e){return n.distance-e.distance}function Th(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){let r=n.children;for(let o=0,l=r.length;o<l;o++)Th(r[o],e,t,!0)}}var rs=class{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ct(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ct(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Rh=class n{static{n.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};var np=new J,Il=new J,ao=new J,lo=new J,vh=new J,w_=new J,E_=new J,ba=class{constructor(e=new J,t=new J){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){np.subVectors(e,this.start),Il.subVectors(this.end,this.start);let i=Il.dot(Il);if(i===0)return 0;let r=Il.dot(np)/i;return t&&(r=Ct(r,0,1)),r}closestPointToPoint(e,t,i){let s=this.closestPointToPointParameter(e,t);return this.delta(i).multiplyScalar(s).add(this.start)}distanceSqToLine3(e,t=w_,i=E_){let s=10000000000000001e-32,r,o,l=this.start,c=e.start,h=this.end,d=e.end;ao.subVectors(h,l),lo.subVectors(d,c),vh.subVectors(l,c);let p=ao.dot(ao),m=lo.dot(lo),x=lo.dot(vh);if(p<=s&&m<=s)return t.copy(l),i.copy(c),t.sub(i),t.dot(t);if(p<=s)r=0,o=x/m,o=Ct(o,0,1);else{let _=ao.dot(vh);if(m<=s)o=0,r=Ct(-_/p,0,1);else{let A=ao.dot(lo),v=p*m-A*A;v!==0?r=Ct((A*x-_*m)/v,0,1):r=0,o=(A*r+x)/m,o<0?(o=0,r=Ct(-_/p,0,1)):o>1&&(o=1,r=Ct((A-_)/p,0,1))}}return t.copy(l).addScaledVector(ao,r),i.copy(c).addScaledVector(lo,o),t.distanceToSquared(i)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};var Sa=class extends Hi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){_t("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function ed(n,e,t,i){let s=A_(i);switch(t){case Xh:return n*e;case qh:return n*e/s.components*s.byteLength;case yc:return n*e/s.components*s.byteLength;case sr:return n*e*2/s.components*s.byteLength;case bc:return n*e*2/s.components*s.byteLength;case $h:return n*e*3/s.components*s.byteLength;case Fi:return n*e*4/s.components*s.byteLength;case Sc:return n*e*4/s.components*s.byteLength;case Aa:case Ta:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ra:case Ca:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case wc:case Ac:return Math.max(n,16)*Math.max(e,8)/4;case Mc:case Ec:return Math.max(n,8)*Math.max(e,8)/2;case Tc:case Rc:case Pc:case Dc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Cc:case Pa:case Ic:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Lc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case kc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Fc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Nc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Uc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Oc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Bc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case zc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Vc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Hc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Gc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Wc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Xc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case $c:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case qc:case Yc:case Jc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Zc:case jc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Da:case Kc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function A_(n){switch(n){case Ti:case Vh:return{byteLength:1,components:1};case bo:case Hh:case as:return{byteLength:2,components:1};case xc:case vc:return{byteLength:2,components:4};case $i:case _c:case qi:return{byteLength:4,components:1};case Gh:case Wh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?_t("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function cm(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function R_(n){let e=new WeakMap;function t(l,c){let h=l.array,d=l.usage,p=h.byteLength,m=n.createBuffer();n.bindBuffer(c,m),n.bufferData(c,h,d),l.onUploadCallback();let x;if(h instanceof Float32Array)x=n.FLOAT;else if(typeof Float16Array<"u"&&h instanceof Float16Array)x=n.HALF_FLOAT;else if(h instanceof Uint16Array)l.isFloat16BufferAttribute?x=n.HALF_FLOAT:x=n.UNSIGNED_SHORT;else if(h instanceof Int16Array)x=n.SHORT;else if(h instanceof Uint32Array)x=n.UNSIGNED_INT;else if(h instanceof Int32Array)x=n.INT;else if(h instanceof Int8Array)x=n.BYTE;else if(h instanceof Uint8Array)x=n.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)x=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:m,type:x,bytesPerElement:h.BYTES_PER_ELEMENT,version:l.version,size:p}}function i(l,c,h){let d=c.array,p=c.updateRanges;if(n.bindBuffer(h,l),p.length===0)n.bufferSubData(h,0,d);else{p.sort((x,_)=>x.start-_.start);let m=0;for(let x=1;x<p.length;x++){let _=p[m],A=p[x];A.start<=_.start+_.count+1?_.count=Math.max(_.count,A.start+A.count-_.start):(++m,p[m]=A)}p.length=m+1;for(let x=0,_=p.length;x<_;x++){let A=p[x];n.bufferSubData(h,A.start*d.BYTES_PER_ELEMENT,d,A.start,A.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(l){return l.isInterleavedBufferAttribute&&(l=l.data),e.get(l)}function r(l){l.isInterleavedBufferAttribute&&(l=l.data);let c=e.get(l);c&&(n.deleteBuffer(c.buffer),e.delete(l))}function o(l,c){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){let d=e.get(l);(!d||d.version<l.version)&&e.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}let h=e.get(l);if(h===void 0)e.set(l,t(l,c));else if(h.version<l.version){if(h.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(h.buffer,l,c),h.version=l.version}}return{get:s,remove:r,update:o}}var C_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,P_=`#ifdef USE_ALPHAHASH
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
#endif`,D_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,I_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,L_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,k_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,F_=`#ifdef USE_AOMAP
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
#endif`,N_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,U_=`#ifdef USE_BATCHING
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
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,O_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,B_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,z_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,V_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,H_=`#ifdef USE_IRIDESCENCE
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
#endif`,G_=`#ifdef USE_BUMPMAP
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
#endif`,W_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,X_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,q_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Y_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,J_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Z_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,j_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,K_=`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,Q_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ex=`vec3 transformedNormal = objectNormal;
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
#endif`,tx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,nx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ix=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,rx="gl_FragColor = linearToOutputTexel( gl_FragColor );",ox=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ax=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,lx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,cx=`#ifdef USE_ENVMAP
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
#endif`,ux=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,dx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,px=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,mx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gx=`#ifdef USE_GRADIENTMAP
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
}`,_x=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,xx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yx=`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#endif
#include <lightprobes_pars_fragment>`,bx=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
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
#endif`,Sx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Mx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ex=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ax=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,Tx=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
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
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
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
		return 0.5 / max( gv + gl, EPSILON );
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
	vec3 f0 = material.specularColorBlended;
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
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
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Rx=`
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
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Cx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
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
#endif`,Px=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Dx=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Ix=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Lx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Nx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ux=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ox=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Bx=`#if defined( USE_POINTS_UV )
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
#endif`,zx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Wx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xx=`#ifdef USE_MORPHTARGETS
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
#endif`,$x=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Yx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Jx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Kx=`#ifdef USE_NORMALMAP
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
#endif`,Qx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ev=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,tv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,nv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,iv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,sv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,rv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ov=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,av=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,lv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,cv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,uv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
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
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,dv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
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
#endif`,pv=`float getShadowMask() {
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
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
}`,mv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,gv=`#ifdef USE_SKINNING
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
#endif`,_v=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xv=`#ifdef USE_SKINNING
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
#endif`,vv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,bv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Sv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Mv=`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,wv=`#ifdef USE_TRANSMISSION
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
#endif`,Ev=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Av=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Cv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Pv=`uniform sampler2D t2D;
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
}`,Dv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Iv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fv=`#include <common>
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
}`,Nv=`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Uv=`#define DISTANCE
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
}`,Ov=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Bv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vv=`uniform float scale;
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
}`,Hv=`uniform vec3 diffuse;
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
}`,Gv=`#include <common>
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
}`,Wv=`uniform vec3 diffuse;
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
}`,Xv=`#define LAMBERT
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
}`,$v=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,qv=`#define MATCAP
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
}`,Yv=`#define MATCAP
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
}`,Jv=`#define NORMAL
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
}`,Zv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,jv=`#define PHONG
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
}`,Kv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,Qv=`#define STANDARD
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
}`,ey=`#define STANDARD
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,ty=`#define TOON
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
}`,ny=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,iy=`uniform float size;
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
}`,sy=`uniform vec3 diffuse;
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
}`,ry=`#include <common>
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
}`,oy=`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,ay=`uniform float rotation;
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
}`,ly=`uniform vec3 diffuse;
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
}`,kt={alphahash_fragment:C_,alphahash_pars_fragment:P_,alphamap_fragment:D_,alphamap_pars_fragment:I_,alphatest_fragment:L_,alphatest_pars_fragment:k_,aomap_fragment:F_,aomap_pars_fragment:N_,batching_pars_vertex:U_,batching_vertex:O_,begin_vertex:B_,beginnormal_vertex:z_,bsdfs:V_,iridescence_fragment:H_,bumpmap_pars_fragment:G_,clipping_planes_fragment:W_,clipping_planes_pars_fragment:X_,clipping_planes_pars_vertex:$_,clipping_planes_vertex:q_,color_fragment:Y_,color_pars_fragment:J_,color_pars_vertex:Z_,color_vertex:j_,common:K_,cube_uv_reflection_fragment:Q_,defaultnormal_vertex:ex,displacementmap_pars_vertex:tx,displacementmap_vertex:nx,emissivemap_fragment:ix,emissivemap_pars_fragment:sx,colorspace_fragment:rx,colorspace_pars_fragment:ox,envmap_fragment:ax,envmap_common_pars_fragment:lx,envmap_pars_fragment:cx,envmap_pars_vertex:ux,envmap_physical_pars_fragment:bx,envmap_vertex:hx,fog_vertex:dx,fog_pars_vertex:fx,fog_fragment:px,fog_pars_fragment:mx,gradientmap_pars_fragment:gx,lightmap_pars_fragment:_x,lights_lambert_fragment:xx,lights_lambert_pars_fragment:vx,lights_pars_begin:yx,lights_toon_fragment:Sx,lights_toon_pars_fragment:Mx,lights_phong_fragment:wx,lights_phong_pars_fragment:Ex,lights_physical_fragment:Ax,lights_physical_pars_fragment:Tx,lights_fragment_begin:Rx,lights_fragment_maps:Cx,lights_fragment_end:Px,lightprobes_pars_fragment:Dx,logdepthbuf_fragment:Ix,logdepthbuf_pars_fragment:Lx,logdepthbuf_pars_vertex:kx,logdepthbuf_vertex:Fx,map_fragment:Nx,map_pars_fragment:Ux,map_particle_fragment:Ox,map_particle_pars_fragment:Bx,metalnessmap_fragment:zx,metalnessmap_pars_fragment:Vx,morphinstance_vertex:Hx,morphcolor_vertex:Gx,morphnormal_vertex:Wx,morphtarget_pars_vertex:Xx,morphtarget_vertex:$x,normal_fragment_begin:qx,normal_fragment_maps:Yx,normal_pars_fragment:Jx,normal_pars_vertex:Zx,normal_vertex:jx,normalmap_pars_fragment:Kx,clearcoat_normal_fragment_begin:Qx,clearcoat_normal_fragment_maps:ev,clearcoat_pars_fragment:tv,iridescence_pars_fragment:nv,opaque_fragment:iv,packing:sv,premultiplied_alpha_fragment:rv,project_vertex:ov,dithering_fragment:av,dithering_pars_fragment:lv,roughnessmap_fragment:cv,roughnessmap_pars_fragment:uv,shadowmap_pars_fragment:hv,shadowmap_pars_vertex:dv,shadowmap_vertex:fv,shadowmask_pars_fragment:pv,skinbase_vertex:mv,skinning_pars_vertex:gv,skinning_vertex:_v,skinnormal_vertex:xv,specularmap_fragment:vv,specularmap_pars_fragment:yv,tonemapping_fragment:bv,tonemapping_pars_fragment:Sv,transmission_fragment:Mv,transmission_pars_fragment:wv,uv_pars_fragment:Ev,uv_pars_vertex:Av,uv_vertex:Tv,worldpos_vertex:Rv,background_vert:Cv,background_frag:Pv,backgroundCube_vert:Dv,backgroundCube_frag:Iv,cube_vert:Lv,cube_frag:kv,depth_vert:Fv,depth_frag:Nv,distance_vert:Uv,distance_frag:Ov,equirect_vert:Bv,equirect_frag:zv,linedashed_vert:Vv,linedashed_frag:Hv,meshbasic_vert:Gv,meshbasic_frag:Wv,meshlambert_vert:Xv,meshlambert_frag:$v,meshmatcap_vert:qv,meshmatcap_frag:Yv,meshnormal_vert:Jv,meshnormal_frag:Zv,meshphong_vert:jv,meshphong_frag:Kv,meshphysical_vert:Qv,meshphysical_frag:ey,meshtoon_vert:ty,meshtoon_frag:ny,points_vert:iy,points_frag:sy,shadow_vert:ry,shadow_frag:oy,sprite_vert:ay,sprite_frag:ly},We={common:{diffuse:{value:new Pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Rt},alphaMap:{value:null},alphaMapTransform:{value:new Rt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Rt}},envmap:{envMap:{value:null},envMapRotation:{value:new Rt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Rt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Rt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Rt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Rt},normalScale:{value:new bt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Rt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Rt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Rt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Rt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new J},probesMax:{value:new J},probesResolution:{value:new J}},points:{diffuse:{value:new Pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Rt},alphaTest:{value:0},uvTransform:{value:new Rt}},sprite:{diffuse:{value:new Pt(16777215)},opacity:{value:1},center:{value:new bt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Rt},alphaMap:{value:null},alphaMapTransform:{value:new Rt},alphaTest:{value:0}}},oi={basic:{uniforms:Qn([We.common,We.specularmap,We.envmap,We.aomap,We.lightmap,We.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:Qn([We.common,We.specularmap,We.envmap,We.aomap,We.lightmap,We.emissivemap,We.bumpmap,We.normalmap,We.displacementmap,We.fog,We.lights,{emissive:{value:new Pt(0)},envMapIntensity:{value:1}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:Qn([We.common,We.specularmap,We.envmap,We.aomap,We.lightmap,We.emissivemap,We.bumpmap,We.normalmap,We.displacementmap,We.fog,We.lights,{emissive:{value:new Pt(0)},specular:{value:new Pt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:Qn([We.common,We.envmap,We.aomap,We.lightmap,We.emissivemap,We.bumpmap,We.normalmap,We.displacementmap,We.roughnessmap,We.metalnessmap,We.fog,We.lights,{emissive:{value:new Pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:Qn([We.common,We.aomap,We.lightmap,We.emissivemap,We.bumpmap,We.normalmap,We.displacementmap,We.gradientmap,We.fog,We.lights,{emissive:{value:new Pt(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:Qn([We.common,We.bumpmap,We.normalmap,We.displacementmap,We.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:Qn([We.points,We.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:Qn([We.common,We.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:Qn([We.common,We.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:Qn([We.common,We.bumpmap,We.normalmap,We.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:Qn([We.sprite,We.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Rt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Rt}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distance:{uniforms:Qn([We.common,We.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distance_vert,fragmentShader:kt.distance_frag},shadow:{uniforms:Qn([We.lights,We.fog,{color:{value:new Pt(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};oi.physical={uniforms:Qn([oi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Rt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Rt},clearcoatNormalScale:{value:new bt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Rt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Rt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Rt},sheen:{value:0},sheenColor:{value:new Pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Rt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Rt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Rt},transmissionSamplerSize:{value:new bt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Rt},attenuationDistance:{value:0},attenuationColor:{value:new Pt(0)},specularColor:{value:new Pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Rt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Rt},anisotropyVector:{value:new bt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Rt}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};var tu={r:0,b:0,g:0},cy=new vn,um=new Rt;um.set(-1,0,0,0,1,0,0,0,1);function uy(n,e,t,i,s,r){let o=new Pt(0),l=s===!0?0:1,c,h,d=null,p=0,m=null;function x(P){let I=P.isScene===!0?P.background:null;if(I&&I.isTexture){let E=P.backgroundBlurriness>0;I=e.get(I,E)}return I}function _(P){let I=!1,E=x(P);E===null?v(o,l):E&&E.isColor&&(v(E,1),I=!0);let R=n.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,r):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||I)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function A(P,I){let E=x(I);E&&(E.isCubeTexture||E.mapping===wa)?(h===void 0&&(h=new Sn(new Wi(1,1,1),new si({name:"BackgroundCubeMaterial",uniforms:Rr(oi.backgroundCube.uniforms),vertexShader:oi.backgroundCube.vertexShader,fragmentShader:oi.backgroundCube.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,L,V){this.matrixWorld.copyPosition(V.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=E,h.material.uniforms.backgroundBlurriness.value=I.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(cy.makeRotationFromEuler(I.backgroundRotation)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&h.material.uniforms.backgroundRotation.value.premultiply(um),h.material.toneMapped=Gt.getTransfer(E.colorSpace)!==Qt,(d!==E||p!==E.version||m!==n.toneMapping)&&(h.material.needsUpdate=!0,d=E,p=E.version,m=n.toneMapping),h.layers.enableAll(),P.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new Sn(new js(2,2),new si({name:"BackgroundMaterial",uniforms:Rr(oi.background.uniforms),vertexShader:oi.background.vertexShader,fragmentShader:oi.background.fragmentShader,side:Ds,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,c.material.toneMapped=Gt.getTransfer(E.colorSpace)!==Qt,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(d!==E||p!==E.version||m!==n.toneMapping)&&(c.material.needsUpdate=!0,d=E,p=E.version,m=n.toneMapping),c.layers.enableAll(),P.unshift(c,c.geometry,c.material,0,0,null))}function v(P,I){P.getRGB(tu,jh(n)),t.buffers.color.setClear(tu.r,tu.g,tu.b,I,r)}function y(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(P,I=1){o.set(P),l=I,v(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(P){l=P,v(o,l)},render:_,addToRenderList:A,dispose:y}}function hy(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=m(null),r=s,o=!1;function l(W,F,me,K,Q){let ye=!1,de=p(W,K,me,F);r!==de&&(r=de,h(r.object)),ye=x(W,K,me,Q),ye&&_(W,K,me,Q),Q!==null&&e.update(Q,n.ELEMENT_ARRAY_BUFFER),(ye||o)&&(o=!1,E(W,F,me,K),Q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(Q).buffer))}function c(){return n.createVertexArray()}function h(W){return n.bindVertexArray(W)}function d(W){return n.deleteVertexArray(W)}function p(W,F,me,K){let Q=K.wireframe===!0,ye=i[F.id];ye===void 0&&(ye={},i[F.id]=ye);let de=W.isInstancedMesh===!0?W.id:0,Me=ye[de];Me===void 0&&(Me={},ye[de]=Me);let Ae=Me[me.id];Ae===void 0&&(Ae={},Me[me.id]=Ae);let ne=Ae[Q];return ne===void 0&&(ne=m(c()),Ae[Q]=ne),ne}function m(W){let F=[],me=[],K=[];for(let Q=0;Q<t;Q++)F[Q]=0,me[Q]=0,K[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:me,attributeDivisors:K,object:W,attributes:{},index:null}}function x(W,F,me,K){let Q=r.attributes,ye=F.attributes,de=0,Me=me.getAttributes();for(let Ae in Me)if(Me[Ae].location>=0){let Ye=Q[Ae],tt=ye[Ae];if(tt===void 0&&(Ae==="instanceMatrix"&&W.instanceMatrix&&(tt=W.instanceMatrix),Ae==="instanceColor"&&W.instanceColor&&(tt=W.instanceColor)),Ye===void 0||Ye.attribute!==tt||tt&&Ye.data!==tt.data)return!0;de++}return r.attributesNum!==de||r.index!==K}function _(W,F,me,K){let Q={},ye=F.attributes,de=0,Me=me.getAttributes();for(let Ae in Me)if(Me[Ae].location>=0){let Ye=ye[Ae];Ye===void 0&&(Ae==="instanceMatrix"&&W.instanceMatrix&&(Ye=W.instanceMatrix),Ae==="instanceColor"&&W.instanceColor&&(Ye=W.instanceColor));let tt={};tt.attribute=Ye,Ye&&Ye.data&&(tt.data=Ye.data),Q[Ae]=tt,de++}r.attributes=Q,r.attributesNum=de,r.index=K}function A(){let W=r.newAttributes;for(let F=0,me=W.length;F<me;F++)W[F]=0}function v(W){y(W,0)}function y(W,F){let me=r.newAttributes,K=r.enabledAttributes,Q=r.attributeDivisors;me[W]=1,K[W]===0&&(n.enableVertexAttribArray(W),K[W]=1),Q[W]!==F&&(n.vertexAttribDivisor(W,F),Q[W]=F)}function P(){let W=r.newAttributes,F=r.enabledAttributes;for(let me=0,K=F.length;me<K;me++)F[me]!==W[me]&&(n.disableVertexAttribArray(me),F[me]=0)}function I(W,F,me,K,Q,ye,de){de===!0?n.vertexAttribIPointer(W,F,me,Q,ye):n.vertexAttribPointer(W,F,me,K,Q,ye)}function E(W,F,me,K){A();let Q=K.attributes,ye=me.getAttributes(),de=F.defaultAttributeValues;for(let Me in ye){let Ae=ye[Me];if(Ae.location>=0){let ne=Q[Me];if(ne===void 0&&(Me==="instanceMatrix"&&W.instanceMatrix&&(ne=W.instanceMatrix),Me==="instanceColor"&&W.instanceColor&&(ne=W.instanceColor)),ne!==void 0){let Ye=ne.normalized,tt=ne.itemSize,zt=e.get(ne);if(zt===void 0)continue;let ze=zt.buffer,je=zt.type,ce=zt.bytesPerElement,xe=je===n.INT||je===n.UNSIGNED_INT||ne.gpuType===_c;if(ne.isInterleavedBufferAttribute){let Te=ne.data,xt=Te.stride,mt=ne.offset;if(Te.isInstancedInterleavedBuffer){for(let Qe=0;Qe<Ae.locationSize;Qe++)y(Ae.location+Qe,Te.meshPerAttribute);W.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=Te.meshPerAttribute*Te.count)}else for(let Qe=0;Qe<Ae.locationSize;Qe++)v(Ae.location+Qe);n.bindBuffer(n.ARRAY_BUFFER,ze);for(let Qe=0;Qe<Ae.locationSize;Qe++)I(Ae.location+Qe,tt/Ae.locationSize,je,Ye,xt*ce,(mt+tt/Ae.locationSize*Qe)*ce,xe)}else{if(ne.isInstancedBufferAttribute){for(let Te=0;Te<Ae.locationSize;Te++)y(Ae.location+Te,ne.meshPerAttribute);W.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Te=0;Te<Ae.locationSize;Te++)v(Ae.location+Te);n.bindBuffer(n.ARRAY_BUFFER,ze);for(let Te=0;Te<Ae.locationSize;Te++)I(Ae.location+Te,tt/Ae.locationSize,je,Ye,tt*ce,tt/Ae.locationSize*Te*ce,xe)}}else if(de!==void 0){let Ye=de[Me];if(Ye!==void 0)switch(Ye.length){case 2:n.vertexAttrib2fv(Ae.location,Ye);break;case 3:n.vertexAttrib3fv(Ae.location,Ye);break;case 4:n.vertexAttrib4fv(Ae.location,Ye);break;default:n.vertexAttrib1fv(Ae.location,Ye)}}}}P()}function R(){k();for(let W in i){let F=i[W];for(let me in F){let K=F[me];for(let Q in K){let ye=K[Q];for(let de in ye)d(ye[de].object),delete ye[de];delete K[Q]}}delete i[W]}}function L(W){if(i[W.id]===void 0)return;let F=i[W.id];for(let me in F){let K=F[me];for(let Q in K){let ye=K[Q];for(let de in ye)d(ye[de].object),delete ye[de];delete K[Q]}}delete i[W.id]}function V(W){for(let F in i){let me=i[F];for(let K in me){let Q=me[K];if(Q[W.id]===void 0)continue;let ye=Q[W.id];for(let de in ye)d(ye[de].object),delete ye[de];delete Q[W.id]}}}function M(W){for(let F in i){let me=i[F],K=W.isInstancedMesh===!0?W.id:0,Q=me[K];if(Q!==void 0){for(let ye in Q){let de=Q[ye];for(let Me in de)d(de[Me].object),delete de[Me];delete Q[ye]}delete me[K],Object.keys(me).length===0&&delete i[F]}}}function k(){X(),o=!0,r!==s&&(r=s,h(r.object))}function X(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:l,reset:k,resetDefaultState:X,dispose:R,releaseStatesOfGeometry:L,releaseStatesOfObject:M,releaseStatesOfProgram:V,initAttributes:A,enableAttribute:v,disableUnusedAttributes:P}}function dy(n,e,t){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),t.update(h,i,1)}function o(c,h,d){d!==0&&(n.drawArraysInstanced(i,c,h,d),t.update(h,i,d))}function l(c,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,d);let m=0;for(let x=0;x<d;x++)m+=h[x];t.update(m,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=l}function fy(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let V=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(V.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(V){return!(V!==Fi&&i.convert(V)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(V){let M=V===as&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(V!==Ti&&i.convert(V)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&V!==qi&&!M)}function c(V){if(V==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";V="mediump"}return V==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=t.precision!==void 0?t.precision:"highp",d=c(h);d!==h&&(_t("WebGLRenderer:",h,"not supported, using",d,"instead."),h=d);let p=t.logarithmicDepthBuffer===!0,m=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&m===!1&&_t("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let x=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=n.getParameter(n.MAX_TEXTURE_SIZE),v=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),y=n.getParameter(n.MAX_VERTEX_ATTRIBS),P=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),I=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=n.getParameter(n.MAX_SAMPLES),L=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:l,precision:h,logarithmicDepthBuffer:p,reversedDepthBuffer:m,maxTextures:x,maxVertexTextures:_,maxTextureSize:A,maxCubemapSize:v,maxAttributes:y,maxVertexUniforms:P,maxVaryings:I,maxFragmentUniforms:E,maxSamples:R,samples:L}}function py(n){let e=this,t=null,i=0,s=!1,r=!1,o=new ni,l=new Rt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(p,m){let x=p.length!==0||m||i!==0||s;return s=m,i=p.length,x},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,m){t=d(p,m,0)},this.setState=function(p,m,x){let _=p.clippingPlanes,A=p.clipIntersection,v=p.clipShadows,y=n.get(p);if(!s||_===null||_.length===0||r&&!v)r?d(null):h();else{let P=r?0:i,I=P*4,E=y.clippingState||null;c.value=E,E=d(_,m,I,x);for(let R=0;R!==I;++R)E[R]=t[R];y.clippingState=E,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=P}};function h(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(p,m,x,_){let A=p!==null?p.length:0,v=null;if(A!==0){if(v=c.value,_!==!0||v===null){let y=x+A*4,P=m.matrixWorldInverse;l.getNormalMatrix(P),(v===null||v.length<y)&&(v=new Float32Array(y));for(let I=0,E=x;I!==A;++I,E+=4)o.copy(p[I]).applyMatrix4(P,l),o.normal.toArray(v,E),v[E+3]=o.constant}c.value=v,c.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,v}}var rr=4,Vp=[.125,.215,.35,.446,.526,.582],Cr=20,my=256,La=new Ar,Hp=new Pt,td=null,nd=0,id=0,sd=!1,gy=new J,iu=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){let{size:o=256,position:l=gy}=r;td=this._renderer.getRenderTarget(),nd=this._renderer.getActiveCubeFace(),id=this._renderer.getActiveMipmapLevel(),sd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,s,c,l),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(td,nd,id),this._renderer.xr.enabled=sd,e.scissorTest=!1,Mo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===tr||e.mapping===Tr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),td=this._renderer.getRenderTarget(),nd=this._renderer.getActiveCubeFace(),id=this._renderer.getActiveMipmapLevel(),sd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Vn,minFilter:Vn,generateMipmaps:!1,type:as,format:Fi,colorSpace:na,depthBuffer:!1},s=Gp(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gp(e,t,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=_y(r)),this._blurMaterial=vy(r,e,t),this._ggxMaterial=xy(r,e,t)}return s}_compileMaterial(e){let t=new Sn(new Gn,e);this._renderer.compile(t,La)}_sceneToCubeUV(e,t,i,s,r){let c=new Kn(90,1,t,i),h=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],p=this._renderer,m=p.autoClear,x=p.toneMapping;p.getClearColor(Hp),p.toneMapping=Xi,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(s),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Sn(new Wi,new wr({name:"PMREM.Background",side:ri,depthWrite:!1,depthTest:!1})));let A=this._backgroundBox,v=A.material,y=!1,P=e.background;P?P.isColor&&(v.color.copy(P),e.background=null,y=!0):(v.color.copy(Hp),y=!0);for(let I=0;I<6;I++){let E=I%3;E===0?(c.up.set(0,h[I],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+d[I],r.y,r.z)):E===1?(c.up.set(0,0,h[I]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+d[I],r.z)):(c.up.set(0,h[I],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+d[I]));let R=this._cubeSize;Mo(s,E*R,I>2?R:0,R,R),p.setRenderTarget(s),y&&p.render(A,c),p.render(e,c)}p.toneMapping=x,p.autoClear=m,e.background=P}_textureToCubeUV(e,t){let i=this._renderer,s=e.mapping===tr||e.mapping===Tr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wp());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let l=r.uniforms;l.envMap.value=e;let c=this._cubeSize;Mo(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,La)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,l=this._lodMeshes[i];l.material=o;let c=o.uniforms,h=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),p=Math.sqrt(h*h-d*d),m=0+h*1.25,x=p*m,{_lodMax:_}=this,A=this._sizeLods[i],v=3*A*(i>_-rr?i-_+rr:0),y=4*(this._cubeSize-A);c.envMap.value=e.texture,c.roughness.value=x,c.mipInt.value=_-t,Mo(r,v,y,3*A,2*A),s.setRenderTarget(r),s.render(l,La),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=_-i,Mo(e,v,y,3*A,2*A),s.setRenderTarget(e),s.render(l,La)}_blur(e,t,i,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,l){let c=this._renderer,h=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&yt("blur direction must be either latitudinal or longitudinal!");let d=3,p=this._lodMeshes[s];p.material=h;let m=h.uniforms,x=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*x):2*Math.PI/(2*Cr-1),A=r/_,v=isFinite(r)?1+Math.floor(d*A):Cr;v>Cr&&_t(`sigmaRadians, ${r}, is too large and will clip, as it requested ${v} samples when the maximum is set to ${Cr}`);let y=[],P=0;for(let V=0;V<Cr;++V){let M=V/A,k=Math.exp(-M*M/2);y.push(k),V===0?P+=k:V<v&&(P+=2*k)}for(let V=0;V<y.length;V++)y[V]=y[V]/P;m.envMap.value=e.texture,m.samples.value=v,m.weights.value=y,m.latitudinal.value=o==="latitudinal",l&&(m.poleAxis.value=l);let{_lodMax:I}=this;m.dTheta.value=_,m.mipInt.value=I-i;let E=this._sizeLods[s],R=3*E*(s>I-rr?s-I+rr:0),L=4*(this._cubeSize-E);Mo(t,R,L,3*E,2*E),c.setRenderTarget(t),c.render(p,La)}};function _y(n){let e=[],t=[],i=[],s=n,r=n-rr+1+Vp.length;for(let o=0;o<r;o++){let l=Math.pow(2,s);e.push(l);let c=1/l;o>n-rr?c=Vp[o-n+rr-1]:o===0&&(c=0),t.push(c);let h=1/(l-2),d=-h,p=1+h,m=[d,d,p,d,p,p,d,d,p,p,d,p],x=6,_=6,A=3,v=2,y=1,P=new Float32Array(A*_*x),I=new Float32Array(v*_*x),E=new Float32Array(y*_*x);for(let L=0;L<x;L++){let V=L%3*2/3-1,M=L>2?0:-1,k=[V,M,0,V+2/3,M,0,V+2/3,M+1,0,V,M,0,V+2/3,M+1,0,V,M+1,0];P.set(k,A*_*L),I.set(m,v*_*L);let X=[L,L,L,L,L,L];E.set(X,y*_*L)}let R=new Gn;R.setAttribute("position",new zn(P,A)),R.setAttribute("uv",new zn(I,v)),R.setAttribute("faceIndex",new zn(E,y)),i.push(new Sn(R,null)),s>rr&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Gp(n,e,t){let i=new Mi(n,e,t);return i.texture.mapping=wa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Mo(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function xy(n,e,t){return new si({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:my,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ou(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:os,depthTest:!1,depthWrite:!1})}function vy(n,e,t){let i=new Float32Array(Cr),s=new J(0,1,0);return new si({name:"SphericalGaussianBlur",defines:{n:Cr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ou(),fragmentShader:`

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
		`,blending:os,depthTest:!1,depthWrite:!1})}function Wp(){return new si({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ou(),fragmentShader:`

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
		`,blending:os,depthTest:!1,depthWrite:!1})}function Xp(){return new si({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ou(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:os,depthTest:!1,depthWrite:!1})}function ou(){return`

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
	`}var su=class extends Mi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new pa(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Wi(5,5,5),r=new si({name:"CubemapFromEquirect",uniforms:Rr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ri,blending:os});r.uniforms.tEquirect.value=t;let o=new Sn(s,r),l=t.minFilter;return t.minFilter===nr&&(t.minFilter=Vn),new dc(1,10,this).update(e,o),t.minFilter=l,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}};function yy(n){let e=new WeakMap,t=new WeakMap,i=null;function s(m,x=!1){return m==null?null:x?o(m):r(m)}function r(m){if(m&&m.isTexture){let x=m.mapping;if(x===pc||x===mc)if(e.has(m)){let _=e.get(m).texture;return l(_,m.mapping)}else{let _=m.image;if(_&&_.height>0){let A=new su(_.height);return A.fromEquirectangularTexture(n,m),e.set(m,A),m.addEventListener("dispose",h),l(A.texture,m.mapping)}else return null}}return m}function o(m){if(m&&m.isTexture){let x=m.mapping,_=x===pc||x===mc,A=x===tr||x===Tr;if(_||A){let v=t.get(m),y=v!==void 0?v.texture.pmremVersion:0;if(m.isRenderTargetTexture&&m.pmremVersion!==y)return i===null&&(i=new iu(n)),v=_?i.fromEquirectangular(m,v):i.fromCubemap(m,v),v.texture.pmremVersion=m.pmremVersion,t.set(m,v),v.texture;if(v!==void 0)return v.texture;{let P=m.image;return _&&P&&P.height>0||A&&P&&c(P)?(i===null&&(i=new iu(n)),v=_?i.fromEquirectangular(m):i.fromCubemap(m),v.texture.pmremVersion=m.pmremVersion,t.set(m,v),m.addEventListener("dispose",d),v.texture):null}}}return m}function l(m,x){return x===pc?m.mapping=tr:x===mc&&(m.mapping=Tr),m}function c(m){let x=0,_=6;for(let A=0;A<_;A++)m[A]!==void 0&&x++;return x===_}function h(m){let x=m.target;x.removeEventListener("dispose",h);let _=e.get(x);_!==void 0&&(e.delete(x),_.dispose())}function d(m){let x=m.target;x.removeEventListener("dispose",d);let _=t.get(x);_!==void 0&&(t.delete(x),_.dispose())}function p(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:p}}function by(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&Sr("WebGLRenderer: "+i+" extension not supported."),s}}}function Sy(n,e,t,i){let s={},r=new WeakMap;function o(p){let m=p.target;m.index!==null&&e.remove(m.index);for(let _ in m.attributes)e.remove(m.attributes[_]);m.removeEventListener("dispose",o),delete s[m.id];let x=r.get(m);x&&(e.remove(x),r.delete(m)),i.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,t.memory.geometries--}function l(p,m){return s[m.id]===!0||(m.addEventListener("dispose",o),s[m.id]=!0,t.memory.geometries++),m}function c(p){let m=p.attributes;for(let x in m)e.update(m[x],n.ARRAY_BUFFER)}function h(p){let m=[],x=p.index,_=p.attributes.position,A=0;if(_===void 0)return;if(x!==null){let P=x.array;A=x.version;for(let I=0,E=P.length;I<E;I+=3){let R=P[I+0],L=P[I+1],V=P[I+2];m.push(R,L,L,V,V,R)}}else{let P=_.array;A=_.version;for(let I=0,E=P.length/3-1;I<E;I+=3){let R=I+0,L=I+1,V=I+2;m.push(R,L,L,V,V,R)}}let v=new(_.count>=65535?ha:ua)(m,1);v.version=A;let y=r.get(p);y&&e.remove(y),r.set(p,v)}function d(p){let m=r.get(p);if(m){let x=p.index;x!==null&&m.version<x.version&&h(p)}else h(p);return r.get(p)}return{get:l,update:c,getWireframeAttribute:d}}function My(n,e,t){let i;function s(p){i=p}let r,o;function l(p){r=p.type,o=p.bytesPerElement}function c(p,m){n.drawElements(i,m,r,p*o),t.update(m,i,1)}function h(p,m,x){x!==0&&(n.drawElementsInstanced(i,m,r,p*o,x),t.update(m,i,x))}function d(p,m,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,r,p,0,x);let A=0;for(let v=0;v<x;v++)A+=m[v];t.update(A,i,1)}this.setMode=s,this.setIndex=l,this.render=c,this.renderInstances=h,this.renderMultiDraw=d}function wy(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,l){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=l*(r/3);break;case n.LINES:t.lines+=l*(r/2);break;case n.LINE_STRIP:t.lines+=l*(r-1);break;case n.LINE_LOOP:t.lines+=l*r;break;case n.POINTS:t.points+=l*r;break;default:yt("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Ey(n,e,t){let i=new WeakMap,s=new rn;function r(o,l,c){let h=o.morphTargetInfluences,d=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,p=d!==void 0?d.length:0,m=i.get(l);if(m===void 0||m.count!==p){let k=function(){V.dispose(),i.delete(l),l.removeEventListener("dispose",k)};m!==void 0&&m.texture.dispose();let x=l.morphAttributes.position!==void 0,_=l.morphAttributes.normal!==void 0,A=l.morphAttributes.color!==void 0,v=l.morphAttributes.position||[],y=l.morphAttributes.normal||[],P=l.morphAttributes.color||[],I=0;x===!0&&(I=1),_===!0&&(I=2),A===!0&&(I=3);let E=l.attributes.position.count*I,R=1;E>e.maxTextureSize&&(R=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);let L=new Float32Array(E*R*4*p),V=new aa(L,E,R,p);V.type=qi,V.needsUpdate=!0;let M=I*4;for(let X=0;X<p;X++){let W=v[X],F=y[X],me=P[X],K=E*R*4*X;for(let Q=0;Q<W.count;Q++){let ye=Q*M;x===!0&&(s.fromBufferAttribute(W,Q),L[K+ye+0]=s.x,L[K+ye+1]=s.y,L[K+ye+2]=s.z,L[K+ye+3]=0),_===!0&&(s.fromBufferAttribute(F,Q),L[K+ye+4]=s.x,L[K+ye+5]=s.y,L[K+ye+6]=s.z,L[K+ye+7]=0),A===!0&&(s.fromBufferAttribute(me,Q),L[K+ye+8]=s.x,L[K+ye+9]=s.y,L[K+ye+10]=s.z,L[K+ye+11]=me.itemSize===4?s.w:1)}}m={count:p,texture:V,size:new bt(E,R)},i.set(l,m),l.addEventListener("dispose",k)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let x=0;for(let A=0;A<h.length;A++)x+=h[A];let _=l.morphTargetsRelative?1:1-x;c.getUniforms().setValue(n,"morphTargetBaseInfluence",_),c.getUniforms().setValue(n,"morphTargetInfluences",h)}c.getUniforms().setValue(n,"morphTargetsTexture",m.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",m.size)}return{update:r}}function Ay(n,e,t,i,s){let r=new WeakMap;function o(h){let d=s.render.frame,p=h.geometry,m=e.get(h,p);if(r.get(m)!==d&&(e.update(m),r.set(m,d)),h.isInstancedMesh&&(h.hasEventListener("dispose",c)===!1&&h.addEventListener("dispose",c),r.get(h)!==d&&(t.update(h.instanceMatrix,n.ARRAY_BUFFER),h.instanceColor!==null&&t.update(h.instanceColor,n.ARRAY_BUFFER),r.set(h,d))),h.isSkinnedMesh){let x=h.skeleton;r.get(x)!==d&&(x.update(),r.set(x,d))}return m}function l(){r=new WeakMap}function c(h){let d=h.target;d.removeEventListener("dispose",c),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:o,dispose:l}}var Ty={[Lh]:"LINEAR_TONE_MAPPING",[kh]:"REINHARD_TONE_MAPPING",[Fh]:"CINEON_TONE_MAPPING",[Nh]:"ACES_FILMIC_TONE_MAPPING",[Oh]:"AGX_TONE_MAPPING",[Bh]:"NEUTRAL_TONE_MAPPING",[Uh]:"CUSTOM_TONE_MAPPING"};function Ry(n,e,t,i,s,r){let o=new Mi(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new Ls(e,t):void 0}),l=new Mi(e,t,{type:as,depthBuffer:!1,stencilBuffer:!1}),c=new Gn;c.setAttribute("position",new Cn([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Cn([0,2,0,0,2,0],2));let h=new Ql({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Sn(c,h),p=new Ar(-1,1,1,-1,0,1),m=null,x=null,_=!1,A,v=null,y=[],P=!1;this.setSize=function(I,E){o.setSize(I,E),l.setSize(I,E);for(let R=0;R<y.length;R++){let L=y[R];L.setSize&&L.setSize(I,E)}},this.setEffects=function(I){y=I,P=y.length>0&&y[0].isRenderPass===!0;let E=o.width,R=o.height;for(let L=0;L<y.length;L++){let V=y[L];V.setSize&&V.setSize(E,R)}},this.begin=function(I,E){if(_||I.toneMapping===Xi&&y.length===0)return!1;if(v=E,E!==null){let R=E.width,L=E.height;(o.width!==R||o.height!==L)&&this.setSize(R,L)}return P===!1&&I.setRenderTarget(o),A=I.toneMapping,I.toneMapping=Xi,!0},this.hasRenderPass=function(){return P},this.end=function(I,E){I.toneMapping=A,_=!0;let R=o,L=l;for(let V=0;V<y.length;V++){let M=y[V];if(M.enabled!==!1&&(M.render(I,L,R,E),M.needsSwap!==!1)){let k=R;R=L,L=k}}if(m!==I.outputColorSpace||x!==I.toneMapping){m=I.outputColorSpace,x=I.toneMapping,h.defines={},Gt.getTransfer(m)===Qt&&(h.defines.SRGB_TRANSFER="");let V=Ty[x];V&&(h.defines[V]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=R.texture,I.setRenderTarget(v),I.render(d,p),v=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),l.dispose(),c.dispose(),h.dispose()}}var hm=new ii,ad=new Ls(1,1),dm=new aa,fm=new Jl,pm=new pa,$p=[],qp=[],Yp=new Float32Array(16),Jp=new Float32Array(9),Zp=new Float32Array(4);function Eo(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=$p[s];if(r===void 0&&(r=new Float32Array(s),$p[s]=r),e!==0){i.toArray(r,0);for(let o=1,l=0;o!==e;++o)l+=t,n[o].toArray(r,l)}return r}function Pn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Dn(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function au(n,e){let t=qp[e];t===void 0&&(t=new Int32Array(e),qp[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Cy(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Py(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pn(t,e))return;n.uniform2fv(this.addr,e),Dn(t,e)}}function Dy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pn(t,e))return;n.uniform3fv(this.addr,e),Dn(t,e)}}function Iy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pn(t,e))return;n.uniform4fv(this.addr,e),Dn(t,e)}}function Ly(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Pn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Dn(t,e)}else{if(Pn(t,i))return;Zp.set(i),n.uniformMatrix2fv(this.addr,!1,Zp),Dn(t,i)}}function ky(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Pn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Dn(t,e)}else{if(Pn(t,i))return;Jp.set(i),n.uniformMatrix3fv(this.addr,!1,Jp),Dn(t,i)}}function Fy(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Pn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Dn(t,e)}else{if(Pn(t,i))return;Yp.set(i),n.uniformMatrix4fv(this.addr,!1,Yp),Dn(t,i)}}function Ny(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Uy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pn(t,e))return;n.uniform2iv(this.addr,e),Dn(t,e)}}function Oy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pn(t,e))return;n.uniform3iv(this.addr,e),Dn(t,e)}}function By(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pn(t,e))return;n.uniform4iv(this.addr,e),Dn(t,e)}}function zy(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Vy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pn(t,e))return;n.uniform2uiv(this.addr,e),Dn(t,e)}}function Hy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pn(t,e))return;n.uniform3uiv(this.addr,e),Dn(t,e)}}function Gy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pn(t,e))return;n.uniform4uiv(this.addr,e),Dn(t,e)}}function Wy(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(ad.compareFunction=t.isReversedDepthBuffer()?eu:Qc,r=ad):r=hm,t.setTexture2D(e||r,s)}function Xy(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||fm,s)}function $y(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||pm,s)}function qy(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||dm,s)}function Yy(n){switch(n){case 5126:return Cy;case 35664:return Py;case 35665:return Dy;case 35666:return Iy;case 35674:return Ly;case 35675:return ky;case 35676:return Fy;case 5124:case 35670:return Ny;case 35667:case 35671:return Uy;case 35668:case 35672:return Oy;case 35669:case 35673:return By;case 5125:return zy;case 36294:return Vy;case 36295:return Hy;case 36296:return Gy;case 35678:case 36198:case 36298:case 36306:case 35682:return Wy;case 35679:case 36299:case 36307:return Xy;case 35680:case 36300:case 36308:case 36293:return $y;case 36289:case 36303:case 36311:case 36292:return qy}}function Jy(n,e){n.uniform1fv(this.addr,e)}function Zy(n,e){let t=Eo(e,this.size,2);n.uniform2fv(this.addr,t)}function jy(n,e){let t=Eo(e,this.size,3);n.uniform3fv(this.addr,t)}function Ky(n,e){let t=Eo(e,this.size,4);n.uniform4fv(this.addr,t)}function Qy(n,e){let t=Eo(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function eb(n,e){let t=Eo(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function tb(n,e){let t=Eo(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function nb(n,e){n.uniform1iv(this.addr,e)}function ib(n,e){n.uniform2iv(this.addr,e)}function sb(n,e){n.uniform3iv(this.addr,e)}function rb(n,e){n.uniform4iv(this.addr,e)}function ob(n,e){n.uniform1uiv(this.addr,e)}function ab(n,e){n.uniform2uiv(this.addr,e)}function lb(n,e){n.uniform3uiv(this.addr,e)}function cb(n,e){n.uniform4uiv(this.addr,e)}function ub(n,e,t){let i=this.cache,s=e.length,r=au(t,s);Pn(i,r)||(n.uniform1iv(this.addr,r),Dn(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=ad:o=hm;for(let l=0;l!==s;++l)t.setTexture2D(e[l]||o,r[l])}function hb(n,e,t){let i=this.cache,s=e.length,r=au(t,s);Pn(i,r)||(n.uniform1iv(this.addr,r),Dn(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||fm,r[o])}function db(n,e,t){let i=this.cache,s=e.length,r=au(t,s);Pn(i,r)||(n.uniform1iv(this.addr,r),Dn(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||pm,r[o])}function fb(n,e,t){let i=this.cache,s=e.length,r=au(t,s);Pn(i,r)||(n.uniform1iv(this.addr,r),Dn(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||dm,r[o])}function pb(n){switch(n){case 5126:return Jy;case 35664:return Zy;case 35665:return jy;case 35666:return Ky;case 35674:return Qy;case 35675:return eb;case 35676:return tb;case 5124:case 35670:return nb;case 35667:case 35671:return ib;case 35668:case 35672:return sb;case 35669:case 35673:return rb;case 5125:return ob;case 36294:return ab;case 36295:return lb;case 36296:return cb;case 35678:case 36198:case 36298:case 36306:case 35682:return ub;case 35679:case 36299:case 36307:return hb;case 35680:case 36300:case 36308:case 36293:return db;case 36289:case 36303:case 36311:case 36292:return fb}}var ld=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Yy(t.type)}},cd=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=pb(t.type)}},ud=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let l=s[r];l.setValue(e,t[l.id],i)}}},rd=/(\w+)(\])?(\[|\.)?/g;function jp(n,e){n.seq.push(e),n.map[e.id]=e}function mb(n,e,t){let i=n.name,s=i.length;for(rd.lastIndex=0;;){let r=rd.exec(i),o=rd.lastIndex,l=r[1],c=r[2]==="]",h=r[3];if(c&&(l=l|0),h===void 0||h==="["&&o+2===s){jp(t,h===void 0?new ld(l,n,e):new cd(l,n,e));break}else{let p=t.map[l];p===void 0&&(p=new ud(l),jp(t,p)),t=p}}}var wo=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let l=e.getActiveUniform(t,o),c=e.getUniformLocation(t,l.name);mb(l,c,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){let l=t[r],c=i[l.id];c.needsUpdate!==!1&&l.setValue(e,c.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&i.push(o)}return i}};function Kp(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var gb=37297,_b=0;function xb(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let l=o+1;i.push(`${l===e?">":" "} ${l}: ${t[o]}`)}return i.join(`
`)}var Qp=new Rt;function vb(n){Gt._getMatrix(Qp,Gt.workingColorSpace,n);let e=`mat3( ${Qp.elements.map(t=>t.toFixed(4))} )`;switch(Gt.getTransfer(n)){case ia:return[e,"LinearTransferOETF"];case Qt:return[e,"sRGBTransferOETF"];default:return _t("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function em(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let l=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+xb(n.getShaderSource(e),l)}else return r}function yb(n,e){let t=vb(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var bb={[Lh]:"Linear",[kh]:"Reinhard",[Fh]:"Cineon",[Nh]:"ACESFilmic",[Oh]:"AgX",[Bh]:"Neutral",[Uh]:"Custom"};function Sb(n,e){let t=bb[e];return t===void 0?(_t("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var nu=new J;function Mb(){Gt.getLuminanceCoefficients(nu);let n=nu.x.toFixed(4),e=nu.y.toFixed(4),t=nu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wb(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fa).join(`
`)}function Eb(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Ab(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),o=r.name,l=1;r.type===n.FLOAT_MAT2&&(l=2),r.type===n.FLOAT_MAT3&&(l=3),r.type===n.FLOAT_MAT4&&(l=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:l}}return t}function Fa(n){return n!==""}function tm(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function nm(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Tb=/^[ \t]*#include +<([\w\d./]+)>/gm;function hd(n){return n.replace(Tb,Cb)}var Rb=new Map;function Cb(n,e){let t=kt[e];if(t===void 0){let i=Rb.get(e);if(i!==void 0)t=kt[i],_t('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return hd(t)}var Pb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function im(n){return n.replace(Pb,Db)}function Db(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function sm(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Ib={[Ma]:"SHADOWMAP_TYPE_PCF",[vo]:"SHADOWMAP_TYPE_VSM"};function Lb(n){return Ib[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var kb={[tr]:"ENVMAP_TYPE_CUBE",[Tr]:"ENVMAP_TYPE_CUBE",[wa]:"ENVMAP_TYPE_CUBE_UV"};function Fb(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":kb[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var Nb={[Tr]:"ENVMAP_MODE_REFRACTION"};function Ub(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Nb[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Ob={[Ih]:"ENVMAP_BLENDING_MULTIPLY",[wp]:"ENVMAP_BLENDING_MIX",[Ep]:"ENVMAP_BLENDING_ADD"};function Bb(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Ob[n.combine]||"ENVMAP_BLENDING_NONE"}function zb(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Vb(n,e,t,i){let s=n.getContext(),r=t.defines,o=t.vertexShader,l=t.fragmentShader,c=Lb(t),h=Fb(t),d=Ub(t),p=Bb(t),m=zb(t),x=wb(t),_=Eb(r),A=s.createProgram(),v,y,P=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Fa).join(`
`),v.length>0&&(v+=`
`),y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Fa).join(`
`),y.length>0&&(y+=`
`)):(v=[sm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fa).join(`
`),y=[sm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",t.envMap?"#define "+p:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Xi?"#define TONE_MAPPING":"",t.toneMapping!==Xi?kt.tonemapping_pars_fragment:"",t.toneMapping!==Xi?Sb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,yb("linearToOutputTexel",t.outputColorSpace),Mb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Fa).join(`
`)),o=hd(o),o=tm(o,t),o=nm(o,t),l=hd(l),l=tm(l,t),l=nm(l,t),o=im(o),l=im(l),t.isRawShaderMaterial!==!0&&(P=`#version 300 es
`,v=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,y=["#define varying in",t.glslVersion===Jh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Jh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);let I=P+v+o,E=P+y+l,R=Kp(s,s.VERTEX_SHADER,I),L=Kp(s,s.FRAGMENT_SHADER,E);s.attachShader(A,R),s.attachShader(A,L),t.index0AttributeName!==void 0?s.bindAttribLocation(A,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(A,0,"position"),s.linkProgram(A);function V(W){if(n.debug.checkShaderErrors){let F=s.getProgramInfoLog(A)||"",me=s.getShaderInfoLog(R)||"",K=s.getShaderInfoLog(L)||"",Q=F.trim(),ye=me.trim(),de=K.trim(),Me=!0,Ae=!0;if(s.getProgramParameter(A,s.LINK_STATUS)===!1)if(Me=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,A,R,L);else{let ne=em(s,R,"vertex"),Ye=em(s,L,"fragment");yt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(A,s.VALIDATE_STATUS)+`

Material Name: `+W.name+`
Material Type: `+W.type+`

Program Info Log: `+Q+`
`+ne+`
`+Ye)}else Q!==""?_t("WebGLProgram: Program Info Log:",Q):(ye===""||de==="")&&(Ae=!1);Ae&&(W.diagnostics={runnable:Me,programLog:Q,vertexShader:{log:ye,prefix:v},fragmentShader:{log:de,prefix:y}})}s.deleteShader(R),s.deleteShader(L),M=new wo(s,A),k=Ab(s,A)}let M;this.getUniforms=function(){return M===void 0&&V(this),M};let k;this.getAttributes=function(){return k===void 0&&V(this),k};let X=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return X===!1&&(X=s.getProgramParameter(A,gb)),X},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(A),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=_b++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=R,this.fragmentShader=L,this}var Hb=0,dd=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new fd(e),t.set(e,i)),i}},fd=class{constructor(e){this.id=Hb++,this.code=e,this.usedTimes=0}};function Gb(n){return n===sr||n===Pa||n===Da}function Wb(n,e,t,i,s,r){let o=new mo,l=new dd,c=new Set,h=[],d=new Map,p=i.logarithmicDepthBuffer,m=i.precision,x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return c.add(M),M===0?"uv":`uv${M}`}function A(M,k,X,W,F,me){let K=W.fog,Q=F.geometry,ye=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?W.environment:null,de=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,Me=e.get(M.envMap||ye,de),Ae=Me&&Me.mapping===wa?Me.image.height:null,ne=x[M.type];M.precision!==null&&(m=i.getMaxPrecision(M.precision),m!==M.precision&&_t("WebGLProgram.getParameters:",M.precision,"not supported, using",m,"instead."));let Ye=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,tt=Ye!==void 0?Ye.length:0,zt=0;Q.morphAttributes.position!==void 0&&(zt=1),Q.morphAttributes.normal!==void 0&&(zt=2),Q.morphAttributes.color!==void 0&&(zt=3);let ze,je,ce,xe;if(ne){let ot=oi[ne];ze=ot.vertexShader,je=ot.fragmentShader}else{ze=M.vertexShader,je=M.fragmentShader;let ot=l.getVertexShaderStage(M),Ot=l.getFragmentShaderStage(M);l.update(M,ot,Ot),ce=ot.id,xe=Ot.id}let Te=n.getRenderTarget(),xt=n.state.buffers.depth.getReversed(),mt=F.isInstancedMesh===!0,Qe=F.isBatchedMesh===!0,on=!!M.map,Dt=!!M.matcap,Jt=!!Me,St=!!M.aoMap,Vt=!!M.lightMap,D=!!M.bumpMap&&M.wireframe===!1,Ft=!!M.normalMap,Zt=!!M.displacementMap,en=!!M.emissiveMap,an=!!M.metalnessMap,hn=!!M.roughnessMap,Z=M.anisotropy>0,Ln=M.clearcoat>0,Ut=M.dispersion>0,U=M.iridescence>0,b=M.sheen>0,ee=M.transmission>0,te=Z&&!!M.anisotropyMap,ge=Ln&&!!M.clearcoatMap,Ce=Ln&&!!M.clearcoatNormalMap,Ve=Ln&&!!M.clearcoatRoughnessMap,ie=U&&!!M.iridescenceMap,ue=U&&!!M.iridescenceThicknessMap,He=b&&!!M.sheenColorMap,dt=b&&!!M.sheenRoughnessMap,Ie=!!M.specularMap,Oe=!!M.specularColorMap,oe=!!M.specularIntensityMap,Ne=ee&&!!M.transmissionMap,Je=ee&&!!M.thicknessMap,$=!!M.gradientMap,Ue=!!M.alphaMap,ve=M.alphaTest>0,Ge=!!M.alphaHash,De=!!M.extensions,we=Xi;M.toneMapped&&(Te===null||Te.isXRRenderTarget===!0)&&(we=n.toneMapping);let at={shaderID:ne,shaderType:M.type,shaderName:M.name,vertexShader:ze,fragmentShader:je,defines:M.defines,customVertexShaderID:ce,customFragmentShaderID:xe,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:m,batching:Qe,batchingColor:Qe&&F._colorsTexture!==null,instancing:mt,instancingColor:mt&&F.instanceColor!==null,instancingMorph:mt&&F.morphTexture!==null,outputColorSpace:Te===null?n.outputColorSpace:Te.isXRRenderTarget===!0?Te.texture.colorSpace:Gt.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:on,matcap:Dt,envMap:Jt,envMapMode:Jt&&Me.mapping,envMapCubeUVHeight:Ae,aoMap:St,lightMap:Vt,bumpMap:D,normalMap:Ft,displacementMap:Zt,emissiveMap:en,normalMapObjectSpace:Ft&&M.normalMapType===Rp,normalMapTangentSpace:Ft&&M.normalMapType===Yh,packedNormalMap:Ft&&M.normalMapType===Yh&&Gb(M.normalMap.format),metalnessMap:an,roughnessMap:hn,anisotropy:Z,anisotropyMap:te,clearcoat:Ln,clearcoatMap:ge,clearcoatNormalMap:Ce,clearcoatRoughnessMap:Ve,dispersion:Ut,iridescence:U,iridescenceMap:ie,iridescenceThicknessMap:ue,sheen:b,sheenColorMap:He,sheenRoughnessMap:dt,specularMap:Ie,specularColorMap:Oe,specularIntensityMap:oe,transmission:ee,transmissionMap:Ne,thicknessMap:Je,gradientMap:$,opaque:M.transparent===!1&&M.blending===Is&&M.alphaToCoverage===!1,alphaMap:Ue,alphaTest:ve,alphaHash:Ge,combine:M.combine,mapUv:on&&_(M.map.channel),aoMapUv:St&&_(M.aoMap.channel),lightMapUv:Vt&&_(M.lightMap.channel),bumpMapUv:D&&_(M.bumpMap.channel),normalMapUv:Ft&&_(M.normalMap.channel),displacementMapUv:Zt&&_(M.displacementMap.channel),emissiveMapUv:en&&_(M.emissiveMap.channel),metalnessMapUv:an&&_(M.metalnessMap.channel),roughnessMapUv:hn&&_(M.roughnessMap.channel),anisotropyMapUv:te&&_(M.anisotropyMap.channel),clearcoatMapUv:ge&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:Ce&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ve&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ie&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:ue&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:He&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:dt&&_(M.sheenRoughnessMap.channel),specularMapUv:Ie&&_(M.specularMap.channel),specularColorMapUv:Oe&&_(M.specularColorMap.channel),specularIntensityMapUv:oe&&_(M.specularIntensityMap.channel),transmissionMapUv:Ne&&_(M.transmissionMap.channel),thicknessMapUv:Je&&_(M.thicknessMap.channel),alphaMapUv:Ue&&_(M.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(Ft||Z),vertexNormals:!!Q.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!Q.attributes.uv&&(on||Ue),fog:!!K,useFog:M.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||Q.attributes.normal===void 0&&Ft===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:xt,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:Q.attributes.position!==void 0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:tt,morphTextureStride:zt,numDirLights:k.directional.length,numPointLights:k.point.length,numSpotLights:k.spot.length,numSpotLightMaps:k.spotLightMap.length,numRectAreaLights:k.rectArea.length,numHemiLights:k.hemi.length,numDirLightShadows:k.directionalShadowMap.length,numPointLightShadows:k.pointShadowMap.length,numSpotLightShadows:k.spotShadowMap.length,numSpotLightShadowsWithMaps:k.numSpotLightShadowsWithMaps,numLightProbes:k.numLightProbes,numLightProbeGrids:me.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&X.length>0,shadowMapType:n.shadowMap.type,toneMapping:we,decodeVideoTexture:on&&M.map.isVideoTexture===!0&&Gt.getTransfer(M.map.colorSpace)===Qt,decodeVideoTextureEmissive:en&&M.emissiveMap.isVideoTexture===!0&&Gt.getTransfer(M.emissiveMap.colorSpace)===Qt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===hi,flipSided:M.side===ri,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:De&&M.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(De&&M.extensions.multiDraw===!0||Qe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return at.vertexUv1s=c.has(1),at.vertexUv2s=c.has(2),at.vertexUv3s=c.has(3),c.clear(),at}function v(M){let k=[];if(M.shaderID?k.push(M.shaderID):(k.push(M.customVertexShaderID),k.push(M.customFragmentShaderID)),M.defines!==void 0)for(let X in M.defines)k.push(X),k.push(M.defines[X]);return M.isRawShaderMaterial===!1&&(y(k,M),P(k,M),k.push(n.outputColorSpace)),k.push(M.customProgramCacheKey),k.join()}function y(M,k){M.push(k.precision),M.push(k.outputColorSpace),M.push(k.envMapMode),M.push(k.envMapCubeUVHeight),M.push(k.mapUv),M.push(k.alphaMapUv),M.push(k.lightMapUv),M.push(k.aoMapUv),M.push(k.bumpMapUv),M.push(k.normalMapUv),M.push(k.displacementMapUv),M.push(k.emissiveMapUv),M.push(k.metalnessMapUv),M.push(k.roughnessMapUv),M.push(k.anisotropyMapUv),M.push(k.clearcoatMapUv),M.push(k.clearcoatNormalMapUv),M.push(k.clearcoatRoughnessMapUv),M.push(k.iridescenceMapUv),M.push(k.iridescenceThicknessMapUv),M.push(k.sheenColorMapUv),M.push(k.sheenRoughnessMapUv),M.push(k.specularMapUv),M.push(k.specularColorMapUv),M.push(k.specularIntensityMapUv),M.push(k.transmissionMapUv),M.push(k.thicknessMapUv),M.push(k.combine),M.push(k.fogExp2),M.push(k.sizeAttenuation),M.push(k.morphTargetsCount),M.push(k.morphAttributeCount),M.push(k.numDirLights),M.push(k.numPointLights),M.push(k.numSpotLights),M.push(k.numSpotLightMaps),M.push(k.numHemiLights),M.push(k.numRectAreaLights),M.push(k.numDirLightShadows),M.push(k.numPointLightShadows),M.push(k.numSpotLightShadows),M.push(k.numSpotLightShadowsWithMaps),M.push(k.numLightProbes),M.push(k.shadowMapType),M.push(k.toneMapping),M.push(k.numClippingPlanes),M.push(k.numClipIntersection),M.push(k.depthPacking)}function P(M,k){o.disableAll(),k.instancing&&o.enable(0),k.instancingColor&&o.enable(1),k.instancingMorph&&o.enable(2),k.matcap&&o.enable(3),k.envMap&&o.enable(4),k.normalMapObjectSpace&&o.enable(5),k.normalMapTangentSpace&&o.enable(6),k.clearcoat&&o.enable(7),k.iridescence&&o.enable(8),k.alphaTest&&o.enable(9),k.vertexColors&&o.enable(10),k.vertexAlphas&&o.enable(11),k.vertexUv1s&&o.enable(12),k.vertexUv2s&&o.enable(13),k.vertexUv3s&&o.enable(14),k.vertexTangents&&o.enable(15),k.anisotropy&&o.enable(16),k.alphaHash&&o.enable(17),k.batching&&o.enable(18),k.dispersion&&o.enable(19),k.batchingColor&&o.enable(20),k.gradientMap&&o.enable(21),k.packedNormalMap&&o.enable(22),k.vertexNormals&&o.enable(23),M.push(o.mask),o.disableAll(),k.fog&&o.enable(0),k.useFog&&o.enable(1),k.flatShading&&o.enable(2),k.logarithmicDepthBuffer&&o.enable(3),k.reversedDepthBuffer&&o.enable(4),k.skinning&&o.enable(5),k.morphTargets&&o.enable(6),k.morphNormals&&o.enable(7),k.morphColors&&o.enable(8),k.premultipliedAlpha&&o.enable(9),k.shadowMapEnabled&&o.enable(10),k.doubleSided&&o.enable(11),k.flipSided&&o.enable(12),k.useDepthPacking&&o.enable(13),k.dithering&&o.enable(14),k.transmission&&o.enable(15),k.sheen&&o.enable(16),k.opaque&&o.enable(17),k.pointsUvs&&o.enable(18),k.decodeVideoTexture&&o.enable(19),k.decodeVideoTextureEmissive&&o.enable(20),k.alphaToCoverage&&o.enable(21),k.numLightProbeGrids>0&&o.enable(22),k.hasPositionAttribute&&o.enable(23),M.push(o.mask)}function I(M){let k=x[M.type],X;if(k){let W=oi[k];X=Ia.clone(W.uniforms)}else X=M.uniforms;return X}function E(M,k){let X=d.get(k);return X!==void 0?++X.usedTimes:(X=new Vb(n,k,M,s),h.push(X),d.set(k,X)),X}function R(M){if(--M.usedTimes===0){let k=h.indexOf(M);h[k]=h[h.length-1],h.pop(),d.delete(M.cacheKey),M.destroy()}}function L(M){l.remove(M)}function V(){l.dispose()}return{getParameters:A,getProgramCacheKey:v,getUniforms:I,acquireProgram:E,releaseProgram:R,releaseShaderCache:L,programs:h,dispose:V}}function Xb(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let l=n.get(o);return l===void 0&&(l={},n.set(o,l)),l}function i(o){n.delete(o)}function s(o,l,c){n.get(o)[l]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function $b(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function rm(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function om(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(m){let x=0;return m.isInstancedMesh&&(x+=2),m.isSkinnedMesh&&(x+=1),x}function l(m,x,_,A,v,y){let P=n[e];return P===void 0?(P={id:m.id,object:m,geometry:x,material:_,materialVariant:o(m),groupOrder:A,renderOrder:m.renderOrder,z:v,group:y},n[e]=P):(P.id=m.id,P.object=m,P.geometry=x,P.material=_,P.materialVariant=o(m),P.groupOrder=A,P.renderOrder=m.renderOrder,P.z=v,P.group=y),e++,P}function c(m,x,_,A,v,y){let P=l(m,x,_,A,v,y);_.transmission>0?i.push(P):_.transparent===!0?s.push(P):t.push(P)}function h(m,x,_,A,v,y){let P=l(m,x,_,A,v,y);_.transmission>0?i.unshift(P):_.transparent===!0?s.unshift(P):t.unshift(P)}function d(m,x,_){t.length>1&&t.sort(m||$b),i.length>1&&i.sort(x||rm),s.length>1&&s.sort(x||rm),_&&(t.reverse(),i.reverse(),s.reverse())}function p(){for(let m=e,x=n.length;m<x;m++){let _=n[m];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:c,unshift:h,finish:p,sort:d}}function qb(){let n=new WeakMap;function e(i,s){let r=n.get(i),o;return r===void 0?(o=new om,n.set(i,[o])):s>=r.length?(o=new om,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function Yb(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new J,color:new Pt};break;case"SpotLight":t={position:new J,direction:new J,color:new Pt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new J,color:new Pt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new J,skyColor:new Pt,groundColor:new Pt};break;case"RectAreaLight":t={color:new Pt,position:new J,halfWidth:new J,halfHeight:new J};break}return n[e.id]=t,t}}}function Jb(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var Zb=0;function jb(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Kb(n){let e=new Yb,t=Jb(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new J);let s=new J,r=new vn,o=new vn;function l(h){let d=0,p=0,m=0;for(let k=0;k<9;k++)i.probe[k].set(0,0,0);let x=0,_=0,A=0,v=0,y=0,P=0,I=0,E=0,R=0,L=0,V=0;h.sort(jb);for(let k=0,X=h.length;k<X;k++){let W=h[k],F=W.color,me=W.intensity,K=W.distance,Q=null;if(W.shadow&&W.shadow.map&&(W.shadow.map.texture.format===sr?Q=W.shadow.map.texture:Q=W.shadow.map.depthTexture||W.shadow.map.texture),W.isAmbientLight)d+=F.r*me,p+=F.g*me,m+=F.b*me;else if(W.isLightProbe){for(let ye=0;ye<9;ye++)i.probe[ye].addScaledVector(W.sh.coefficients[ye],me);V++}else if(W.isDirectionalLight){let ye=e.get(W);if(ye.color.copy(W.color).multiplyScalar(W.intensity),W.castShadow){let de=W.shadow,Me=t.get(W);Me.shadowIntensity=de.intensity,Me.shadowBias=de.bias,Me.shadowNormalBias=de.normalBias,Me.shadowRadius=de.radius,Me.shadowMapSize=de.mapSize,i.directionalShadow[x]=Me,i.directionalShadowMap[x]=Q,i.directionalShadowMatrix[x]=W.shadow.matrix,P++}i.directional[x]=ye,x++}else if(W.isSpotLight){let ye=e.get(W);ye.position.setFromMatrixPosition(W.matrixWorld),ye.color.copy(F).multiplyScalar(me),ye.distance=K,ye.coneCos=Math.cos(W.angle),ye.penumbraCos=Math.cos(W.angle*(1-W.penumbra)),ye.decay=W.decay,i.spot[A]=ye;let de=W.shadow;if(W.map&&(i.spotLightMap[R]=W.map,R++,de.updateMatrices(W),W.castShadow&&L++),i.spotLightMatrix[A]=de.matrix,W.castShadow){let Me=t.get(W);Me.shadowIntensity=de.intensity,Me.shadowBias=de.bias,Me.shadowNormalBias=de.normalBias,Me.shadowRadius=de.radius,Me.shadowMapSize=de.mapSize,i.spotShadow[A]=Me,i.spotShadowMap[A]=Q,E++}A++}else if(W.isRectAreaLight){let ye=e.get(W);ye.color.copy(F).multiplyScalar(me),ye.halfWidth.set(W.width*.5,0,0),ye.halfHeight.set(0,W.height*.5,0),i.rectArea[v]=ye,v++}else if(W.isPointLight){let ye=e.get(W);if(ye.color.copy(W.color).multiplyScalar(W.intensity),ye.distance=W.distance,ye.decay=W.decay,W.castShadow){let de=W.shadow,Me=t.get(W);Me.shadowIntensity=de.intensity,Me.shadowBias=de.bias,Me.shadowNormalBias=de.normalBias,Me.shadowRadius=de.radius,Me.shadowMapSize=de.mapSize,Me.shadowCameraNear=de.camera.near,Me.shadowCameraFar=de.camera.far,i.pointShadow[_]=Me,i.pointShadowMap[_]=Q,i.pointShadowMatrix[_]=W.shadow.matrix,I++}i.point[_]=ye,_++}else if(W.isHemisphereLight){let ye=e.get(W);ye.skyColor.copy(W.color).multiplyScalar(me),ye.groundColor.copy(W.groundColor).multiplyScalar(me),i.hemi[y]=ye,y++}}v>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=We.LTC_FLOAT_1,i.rectAreaLTC2=We.LTC_FLOAT_2):(i.rectAreaLTC1=We.LTC_HALF_1,i.rectAreaLTC2=We.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=p,i.ambient[2]=m;let M=i.hash;(M.directionalLength!==x||M.pointLength!==_||M.spotLength!==A||M.rectAreaLength!==v||M.hemiLength!==y||M.numDirectionalShadows!==P||M.numPointShadows!==I||M.numSpotShadows!==E||M.numSpotMaps!==R||M.numLightProbes!==V)&&(i.directional.length=x,i.spot.length=A,i.rectArea.length=v,i.point.length=_,i.hemi.length=y,i.directionalShadow.length=P,i.directionalShadowMap.length=P,i.pointShadow.length=I,i.pointShadowMap.length=I,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=P,i.pointShadowMatrix.length=I,i.spotLightMatrix.length=E+R-L,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=L,i.numLightProbes=V,M.directionalLength=x,M.pointLength=_,M.spotLength=A,M.rectAreaLength=v,M.hemiLength=y,M.numDirectionalShadows=P,M.numPointShadows=I,M.numSpotShadows=E,M.numSpotMaps=R,M.numLightProbes=V,i.version=Zb++)}function c(h,d){let p=0,m=0,x=0,_=0,A=0,v=d.matrixWorldInverse;for(let y=0,P=h.length;y<P;y++){let I=h[y];if(I.isDirectionalLight){let E=i.directional[p];E.direction.setFromMatrixPosition(I.matrixWorld),s.setFromMatrixPosition(I.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(v),p++}else if(I.isSpotLight){let E=i.spot[x];E.position.setFromMatrixPosition(I.matrixWorld),E.position.applyMatrix4(v),E.direction.setFromMatrixPosition(I.matrixWorld),s.setFromMatrixPosition(I.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(v),x++}else if(I.isRectAreaLight){let E=i.rectArea[_];E.position.setFromMatrixPosition(I.matrixWorld),E.position.applyMatrix4(v),o.identity(),r.copy(I.matrixWorld),r.premultiply(v),o.extractRotation(r),E.halfWidth.set(I.width*.5,0,0),E.halfHeight.set(0,I.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),_++}else if(I.isPointLight){let E=i.point[m];E.position.setFromMatrixPosition(I.matrixWorld),E.position.applyMatrix4(v),m++}else if(I.isHemisphereLight){let E=i.hemi[A];E.direction.setFromMatrixPosition(I.matrixWorld),E.direction.transformDirection(v),A++}}}return{setup:l,setupView:c,state:i}}function am(n){let e=new Kb(n),t=[],i=[],s=[];function r(m){p.camera=m,t.length=0,i.length=0,s.length=0}function o(m){t.push(m)}function l(m){i.push(m)}function c(m){s.push(m)}function h(){e.setup(t)}function d(m){e.setupView(t,m)}let p={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:p,setupLights:h,setupLightsView:d,pushLight:o,pushShadow:l,pushLightProbeGrid:c}}function Qb(n){let e=new WeakMap;function t(s,r=0){let o=e.get(s),l;return o===void 0?(l=new am(n),e.set(s,[l])):r>=o.length?(l=new am(n),o.push(l)):l=o[r],l}function i(){e=new WeakMap}return{get:t,dispose:i}}var e1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,t1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,n1=[new J(1,0,0),new J(-1,0,0),new J(0,1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1)],i1=[new J(0,-1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1),new J(0,-1,0),new J(0,-1,0)],lm=new vn,ka=new J,od=new J;function s1(n,e,t){let i=new da,s=new bt,r=new bt,o=new rn,l=new ec,c=new tc,h={},d=t.maxTextureSize,p={[Ds]:ri,[ri]:Ds,[hi]:hi},m=new si({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new bt},radius:{value:4}},vertexShader:e1,fragmentShader:t1}),x=m.clone();x.defines.HORIZONTAL_PASS=1;let _=new Gn;_.setAttribute("position",new zn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let A=new Sn(_,m),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ma;let y=this.type;this.render=function(L,V,M){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||L.length===0)return;this.type===rp&&(_t("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ma);let k=n.getRenderTarget(),X=n.getActiveCubeFace(),W=n.getActiveMipmapLevel(),F=n.state;F.setBlending(os),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let me=y!==this.type;me&&V.traverse(function(K){K.material&&(Array.isArray(K.material)?K.material.forEach(Q=>Q.needsUpdate=!0):K.material.needsUpdate=!0)});for(let K=0,Q=L.length;K<Q;K++){let ye=L[K],de=ye.shadow;if(de===void 0){_t("WebGLShadowMap:",ye,"has no shadow.");continue}if(de.autoUpdate===!1&&de.needsUpdate===!1)continue;s.copy(de.mapSize);let Me=de.getFrameExtents();s.multiply(Me),r.copy(de.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/Me.x),s.x=r.x*Me.x,de.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/Me.y),s.y=r.y*Me.y,de.mapSize.y=r.y));let Ae=n.state.buffers.depth.getReversed();if(de.camera._reversedDepth=Ae,de.map===null||me===!0){if(de.map!==null&&(de.map.depthTexture!==null&&(de.map.depthTexture.dispose(),de.map.depthTexture=null),de.map.dispose()),this.type===vo){if(ye.isPointLight){_t("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}de.map=new Mi(s.x,s.y,{format:sr,type:as,minFilter:Vn,magFilter:Vn,generateMipmaps:!1}),de.map.texture.name=ye.name+".shadowMap",de.map.depthTexture=new Ls(s.x,s.y,qi),de.map.depthTexture.name=ye.name+".shadowMapDepth",de.map.depthTexture.format=is,de.map.depthTexture.compareFunction=null,de.map.depthTexture.minFilter=On,de.map.depthTexture.magFilter=On}else ye.isPointLight?(de.map=new su(s.x),de.map.depthTexture=new Kl(s.x,$i)):(de.map=new Mi(s.x,s.y),de.map.depthTexture=new Ls(s.x,s.y,$i)),de.map.depthTexture.name=ye.name+".shadowMap",de.map.depthTexture.format=is,this.type===Ma?(de.map.depthTexture.compareFunction=Ae?eu:Qc,de.map.depthTexture.minFilter=Vn,de.map.depthTexture.magFilter=Vn):(de.map.depthTexture.compareFunction=null,de.map.depthTexture.minFilter=On,de.map.depthTexture.magFilter=On);de.camera.updateProjectionMatrix()}let ne=de.map.isWebGLCubeRenderTarget?6:1;for(let Ye=0;Ye<ne;Ye++){if(de.map.isWebGLCubeRenderTarget)n.setRenderTarget(de.map,Ye),n.clear();else{Ye===0&&(n.setRenderTarget(de.map),n.clear());let tt=de.getViewport(Ye);o.set(r.x*tt.x,r.y*tt.y,r.x*tt.z,r.y*tt.w),F.viewport(o)}if(ye.isPointLight){let tt=de.camera,zt=de.matrix,ze=ye.distance||tt.far;ze!==tt.far&&(tt.far=ze,tt.updateProjectionMatrix()),ka.setFromMatrixPosition(ye.matrixWorld),tt.position.copy(ka),od.copy(tt.position),od.add(n1[Ye]),tt.up.copy(i1[Ye]),tt.lookAt(od),tt.updateMatrixWorld(),zt.makeTranslation(-ka.x,-ka.y,-ka.z),lm.multiplyMatrices(tt.projectionMatrix,tt.matrixWorldInverse),de._frustum.setFromProjectionMatrix(lm,tt.coordinateSystem,tt.reversedDepth)}else de.updateMatrices(ye);i=de.getFrustum(),E(V,M,de.camera,ye,this.type)}de.isPointLightShadow!==!0&&this.type===vo&&P(de,M),de.needsUpdate=!1}y=this.type,v.needsUpdate=!1,n.setRenderTarget(k,X,W)};function P(L,V){let M=e.update(A);m.defines.VSM_SAMPLES!==L.blurSamples&&(m.defines.VSM_SAMPLES=L.blurSamples,x.defines.VSM_SAMPLES=L.blurSamples,m.needsUpdate=!0,x.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new Mi(s.x,s.y,{format:sr,type:as})),m.uniforms.shadow_pass.value=L.map.depthTexture,m.uniforms.resolution.value=L.mapSize,m.uniforms.radius.value=L.radius,n.setRenderTarget(L.mapPass),n.clear(),n.renderBufferDirect(V,null,M,m,A,null),x.uniforms.shadow_pass.value=L.mapPass.texture,x.uniforms.resolution.value=L.mapSize,x.uniforms.radius.value=L.radius,n.setRenderTarget(L.map),n.clear(),n.renderBufferDirect(V,null,M,x,A,null)}function I(L,V,M,k){let X=null,W=M.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(W!==void 0)X=W;else if(X=M.isPointLight===!0?c:l,n.localClippingEnabled&&V.clipShadows===!0&&Array.isArray(V.clippingPlanes)&&V.clippingPlanes.length!==0||V.displacementMap&&V.displacementScale!==0||V.alphaMap&&V.alphaTest>0||V.map&&V.alphaTest>0||V.alphaToCoverage===!0){let F=X.uuid,me=V.uuid,K=h[F];K===void 0&&(K={},h[F]=K);let Q=K[me];Q===void 0&&(Q=X.clone(),K[me]=Q,V.addEventListener("dispose",R)),X=Q}if(X.visible=V.visible,X.wireframe=V.wireframe,k===vo?X.side=V.shadowSide!==null?V.shadowSide:V.side:X.side=V.shadowSide!==null?V.shadowSide:p[V.side],X.alphaMap=V.alphaMap,X.alphaTest=V.alphaToCoverage===!0?.5:V.alphaTest,X.map=V.map,X.clipShadows=V.clipShadows,X.clippingPlanes=V.clippingPlanes,X.clipIntersection=V.clipIntersection,X.displacementMap=V.displacementMap,X.displacementScale=V.displacementScale,X.displacementBias=V.displacementBias,X.wireframeLinewidth=V.wireframeLinewidth,X.linewidth=V.linewidth,M.isPointLight===!0&&X.isMeshDistanceMaterial===!0){let F=n.properties.get(X);F.light=M}return X}function E(L,V,M,k,X){if(L.visible===!1)return;if(L.layers.test(V.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&X===vo)&&(!L.frustumCulled||i.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,L.matrixWorld);let me=e.update(L),K=L.material;if(Array.isArray(K)){let Q=me.groups;for(let ye=0,de=Q.length;ye<de;ye++){let Me=Q[ye],Ae=K[Me.materialIndex];if(Ae&&Ae.visible){let ne=I(L,Ae,k,X);L.onBeforeShadow(n,L,V,M,me,ne,Me),n.renderBufferDirect(M,null,me,ne,L,Me),L.onAfterShadow(n,L,V,M,me,ne,Me)}}}else if(K.visible){let Q=I(L,K,k,X);L.onBeforeShadow(n,L,V,M,me,Q,null),n.renderBufferDirect(M,null,me,Q,L,null),L.onAfterShadow(n,L,V,M,me,Q,null)}}let F=L.children;for(let me=0,K=F.length;me<K;me++)E(F[me],V,M,k,X)}function R(L){L.target.removeEventListener("dispose",R);for(let M in h){let k=h[M],X=L.target.uuid;X in k&&(k[X].dispose(),delete k[X])}}}function r1(n,e){function t(){let $=!1,Ue=new rn,ve=null,Ge=new rn(0,0,0,0);return{setMask:function(De){ve!==De&&!$&&(n.colorMask(De,De,De,De),ve=De)},setLocked:function(De){$=De},setClear:function(De,we,at,ot,Ot){Ot===!0&&(De*=ot,we*=ot,at*=ot),Ue.set(De,we,at,ot),Ge.equals(Ue)===!1&&(n.clearColor(De,we,at,ot),Ge.copy(Ue))},reset:function(){$=!1,ve=null,Ge.set(-1,0,0,0)}}}function i(){let $=!1,Ue=!1,ve=null,Ge=null,De=null;return{setReversed:function(we){if(Ue!==we){let at=e.get("EXT_clip_control");we?at.clipControlEXT(at.LOWER_LEFT_EXT,at.ZERO_TO_ONE_EXT):at.clipControlEXT(at.LOWER_LEFT_EXT,at.NEGATIVE_ONE_TO_ONE_EXT),Ue=we;let ot=De;De=null,this.setClear(ot)}},getReversed:function(){return Ue},setTest:function(we){we?Te(n.DEPTH_TEST):xt(n.DEPTH_TEST)},setMask:function(we){ve!==we&&!$&&(n.depthMask(we),ve=we)},setFunc:function(we){if(Ue&&(we=Op[we]),Ge!==we){switch(we){case Nl:n.depthFunc(n.NEVER);break;case Ul:n.depthFunc(n.ALWAYS);break;case Ol:n.depthFunc(n.LESS);break;case Mr:n.depthFunc(n.LEQUAL);break;case Bl:n.depthFunc(n.EQUAL);break;case zl:n.depthFunc(n.GEQUAL);break;case Vl:n.depthFunc(n.GREATER);break;case Hl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ge=we}},setLocked:function(we){$=we},setClear:function(we){De!==we&&(De=we,Ue&&(we=1-we),n.clearDepth(we))},reset:function(){$=!1,ve=null,Ge=null,De=null,Ue=!1}}}function s(){let $=!1,Ue=null,ve=null,Ge=null,De=null,we=null,at=null,ot=null,Ot=null;return{setTest:function(tn){$||(tn?Te(n.STENCIL_TEST):xt(n.STENCIL_TEST))},setMask:function(tn){Ue!==tn&&!$&&(n.stencilMask(tn),Ue=tn)},setFunc:function(tn,fi,dn){(ve!==tn||Ge!==fi||De!==dn)&&(n.stencilFunc(tn,fi,dn),ve=tn,Ge=fi,De=dn)},setOp:function(tn,fi,dn){(we!==tn||at!==fi||ot!==dn)&&(n.stencilOp(tn,fi,dn),we=tn,at=fi,ot=dn)},setLocked:function(tn){$=tn},setClear:function(tn){Ot!==tn&&(n.clearStencil(tn),Ot=tn)},reset:function(){$=!1,Ue=null,ve=null,Ge=null,De=null,we=null,at=null,ot=null,Ot=null}}}let r=new t,o=new i,l=new s,c=new WeakMap,h=new WeakMap,d={},p={},m={},x=new WeakMap,_=[],A=null,v=!1,y=null,P=null,I=null,E=null,R=null,L=null,V=null,M=new Pt(0,0,0),k=0,X=!1,W=null,F=null,me=null,K=null,Q=null,ye=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),de=!1,Me=0,Ae=n.getParameter(n.VERSION);Ae.indexOf("WebGL")!==-1?(Me=parseFloat(/^WebGL (\d)/.exec(Ae)[1]),de=Me>=1):Ae.indexOf("OpenGL ES")!==-1&&(Me=parseFloat(/^OpenGL ES (\d)/.exec(Ae)[1]),de=Me>=2);let ne=null,Ye={},tt=n.getParameter(n.SCISSOR_BOX),zt=n.getParameter(n.VIEWPORT),ze=new rn().fromArray(tt),je=new rn().fromArray(zt);function ce($,Ue,ve,Ge){let De=new Uint8Array(4),we=n.createTexture();n.bindTexture($,we),n.texParameteri($,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri($,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let at=0;at<ve;at++)$===n.TEXTURE_3D||$===n.TEXTURE_2D_ARRAY?n.texImage3D(Ue,0,n.RGBA,1,1,Ge,0,n.RGBA,n.UNSIGNED_BYTE,De):n.texImage2D(Ue+at,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,De);return we}let xe={};xe[n.TEXTURE_2D]=ce(n.TEXTURE_2D,n.TEXTURE_2D,1),xe[n.TEXTURE_CUBE_MAP]=ce(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),xe[n.TEXTURE_2D_ARRAY]=ce(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),xe[n.TEXTURE_3D]=ce(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),l.setClear(0),Te(n.DEPTH_TEST),o.setFunc(Mr),D(!1),Ft(Ch),Te(n.CULL_FACE),St(os);function Te($){d[$]!==!0&&(n.enable($),d[$]=!0)}function xt($){d[$]!==!1&&(n.disable($),d[$]=!1)}function mt($,Ue){return m[$]!==Ue?(n.bindFramebuffer($,Ue),m[$]=Ue,$===n.DRAW_FRAMEBUFFER&&(m[n.FRAMEBUFFER]=Ue),$===n.FRAMEBUFFER&&(m[n.DRAW_FRAMEBUFFER]=Ue),!0):!1}function Qe($,Ue){let ve=_,Ge=!1;if($){ve=x.get(Ue),ve===void 0&&(ve=[],x.set(Ue,ve));let De=$.textures;if(ve.length!==De.length||ve[0]!==n.COLOR_ATTACHMENT0){for(let we=0,at=De.length;we<at;we++)ve[we]=n.COLOR_ATTACHMENT0+we;ve.length=De.length,Ge=!0}}else ve[0]!==n.BACK&&(ve[0]=n.BACK,Ge=!0);Ge&&n.drawBuffers(ve)}function on($){return A!==$?(n.useProgram($),A=$,!0):!1}let Dt={[qs]:n.FUNC_ADD,[ap]:n.FUNC_SUBTRACT,[lp]:n.FUNC_REVERSE_SUBTRACT};Dt[cp]=n.MIN,Dt[up]=n.MAX;let Jt={[hp]:n.ZERO,[dp]:n.ONE,[fp]:n.SRC_COLOR,[kl]:n.SRC_ALPHA,[vp]:n.SRC_ALPHA_SATURATE,[_p]:n.DST_COLOR,[mp]:n.DST_ALPHA,[pp]:n.ONE_MINUS_SRC_COLOR,[Fl]:n.ONE_MINUS_SRC_ALPHA,[xp]:n.ONE_MINUS_DST_COLOR,[gp]:n.ONE_MINUS_DST_ALPHA,[yp]:n.CONSTANT_COLOR,[bp]:n.ONE_MINUS_CONSTANT_COLOR,[Sp]:n.CONSTANT_ALPHA,[Mp]:n.ONE_MINUS_CONSTANT_ALPHA};function St($,Ue,ve,Ge,De,we,at,ot,Ot,tn){if($===os){v===!0&&(xt(n.BLEND),v=!1);return}if(v===!1&&(Te(n.BLEND),v=!0),$!==op){if($!==y||tn!==X){if((P!==qs||R!==qs)&&(n.blendEquation(n.FUNC_ADD),P=qs,R=qs),tn)switch($){case Is:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case yo:n.blendFunc(n.ONE,n.ONE);break;case Ph:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Dh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:yt("WebGLState: Invalid blending: ",$);break}else switch($){case Is:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case yo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Ph:yt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Dh:yt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:yt("WebGLState: Invalid blending: ",$);break}I=null,E=null,L=null,V=null,M.set(0,0,0),k=0,y=$,X=tn}return}De=De||Ue,we=we||ve,at=at||Ge,(Ue!==P||De!==R)&&(n.blendEquationSeparate(Dt[Ue],Dt[De]),P=Ue,R=De),(ve!==I||Ge!==E||we!==L||at!==V)&&(n.blendFuncSeparate(Jt[ve],Jt[Ge],Jt[we],Jt[at]),I=ve,E=Ge,L=we,V=at),(ot.equals(M)===!1||Ot!==k)&&(n.blendColor(ot.r,ot.g,ot.b,Ot),M.copy(ot),k=Ot),y=$,X=!1}function Vt($,Ue){$.side===hi?xt(n.CULL_FACE):Te(n.CULL_FACE);let ve=$.side===ri;Ue&&(ve=!ve),D(ve),$.blending===Is&&$.transparent===!1?St(os):St($.blending,$.blendEquation,$.blendSrc,$.blendDst,$.blendEquationAlpha,$.blendSrcAlpha,$.blendDstAlpha,$.blendColor,$.blendAlpha,$.premultipliedAlpha),o.setFunc($.depthFunc),o.setTest($.depthTest),o.setMask($.depthWrite),r.setMask($.colorWrite);let Ge=$.stencilWrite;l.setTest(Ge),Ge&&(l.setMask($.stencilWriteMask),l.setFunc($.stencilFunc,$.stencilRef,$.stencilFuncMask),l.setOp($.stencilFail,$.stencilZFail,$.stencilZPass)),en($.polygonOffset,$.polygonOffsetFactor,$.polygonOffsetUnits),$.alphaToCoverage===!0?Te(n.SAMPLE_ALPHA_TO_COVERAGE):xt(n.SAMPLE_ALPHA_TO_COVERAGE)}function D($){W!==$&&($?n.frontFace(n.CW):n.frontFace(n.CCW),W=$)}function Ft($){$!==ip?(Te(n.CULL_FACE),$!==F&&($===Ch?n.cullFace(n.BACK):$===sp?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):xt(n.CULL_FACE),F=$}function Zt($){$!==me&&(de&&n.lineWidth($),me=$)}function en($,Ue,ve){$?(Te(n.POLYGON_OFFSET_FILL),(K!==Ue||Q!==ve)&&(K=Ue,Q=ve,o.getReversed()&&(Ue=-Ue),n.polygonOffset(Ue,ve))):xt(n.POLYGON_OFFSET_FILL)}function an($){$?Te(n.SCISSOR_TEST):xt(n.SCISSOR_TEST)}function hn($){$===void 0&&($=n.TEXTURE0+ye-1),ne!==$&&(n.activeTexture($),ne=$)}function Z($,Ue,ve){ve===void 0&&(ne===null?ve=n.TEXTURE0+ye-1:ve=ne);let Ge=Ye[ve];Ge===void 0&&(Ge={type:void 0,texture:void 0},Ye[ve]=Ge),(Ge.type!==$||Ge.texture!==Ue)&&(ne!==ve&&(n.activeTexture(ve),ne=ve),n.bindTexture($,Ue||xe[$]),Ge.type=$,Ge.texture=Ue)}function Ln(){let $=Ye[ne];$!==void 0&&$.type!==void 0&&(n.bindTexture($.type,null),$.type=void 0,$.texture=void 0)}function Ut(){try{n.compressedTexImage2D(...arguments)}catch($){yt("WebGLState:",$)}}function U(){try{n.compressedTexImage3D(...arguments)}catch($){yt("WebGLState:",$)}}function b(){try{n.texSubImage2D(...arguments)}catch($){yt("WebGLState:",$)}}function ee(){try{n.texSubImage3D(...arguments)}catch($){yt("WebGLState:",$)}}function te(){try{n.compressedTexSubImage2D(...arguments)}catch($){yt("WebGLState:",$)}}function ge(){try{n.compressedTexSubImage3D(...arguments)}catch($){yt("WebGLState:",$)}}function Ce(){try{n.texStorage2D(...arguments)}catch($){yt("WebGLState:",$)}}function Ve(){try{n.texStorage3D(...arguments)}catch($){yt("WebGLState:",$)}}function ie(){try{n.texImage2D(...arguments)}catch($){yt("WebGLState:",$)}}function ue(){try{n.texImage3D(...arguments)}catch($){yt("WebGLState:",$)}}function He($){return p[$]!==void 0?p[$]:n.getParameter($)}function dt($,Ue){p[$]!==Ue&&(n.pixelStorei($,Ue),p[$]=Ue)}function Ie($){ze.equals($)===!1&&(n.scissor($.x,$.y,$.z,$.w),ze.copy($))}function Oe($){je.equals($)===!1&&(n.viewport($.x,$.y,$.z,$.w),je.copy($))}function oe($,Ue){let ve=h.get(Ue);ve===void 0&&(ve=new WeakMap,h.set(Ue,ve));let Ge=ve.get($);Ge===void 0&&(Ge=n.getUniformBlockIndex(Ue,$.name),ve.set($,Ge))}function Ne($,Ue){let Ge=h.get(Ue).get($);c.get(Ue)!==Ge&&(n.uniformBlockBinding(Ue,Ge,$.__bindingPointIndex),c.set(Ue,Ge))}function Je(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},p={},ne=null,Ye={},m={},x=new WeakMap,_=[],A=null,v=!1,y=null,P=null,I=null,E=null,R=null,L=null,V=null,M=new Pt(0,0,0),k=0,X=!1,W=null,F=null,me=null,K=null,Q=null,ze.set(0,0,n.canvas.width,n.canvas.height),je.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),l.reset()}return{buffers:{color:r,depth:o,stencil:l},enable:Te,disable:xt,bindFramebuffer:mt,drawBuffers:Qe,useProgram:on,setBlending:St,setMaterial:Vt,setFlipSided:D,setCullFace:Ft,setLineWidth:Zt,setPolygonOffset:en,setScissorTest:an,activeTexture:hn,bindTexture:Z,unbindTexture:Ln,compressedTexImage2D:Ut,compressedTexImage3D:U,texImage2D:ie,texImage3D:ue,pixelStorei:dt,getParameter:He,updateUBOMapping:oe,uniformBlockBinding:Ne,texStorage2D:Ce,texStorage3D:Ve,texSubImage2D:b,texSubImage3D:ee,compressedTexSubImage2D:te,compressedTexSubImage3D:ge,scissor:Ie,viewport:Oe,reset:Je}}function o1(n,e,t,i,s,r,o){let l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new bt,d=new WeakMap,p=new Set,m,x=new WeakMap,_=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(U,b){return _?new OffscreenCanvas(U,b):ra("canvas")}function v(U,b,ee){let te=1,ge=Ut(U);if((ge.width>ee||ge.height>ee)&&(te=ee/Math.max(ge.width,ge.height)),te<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){let Ce=Math.floor(te*ge.width),Ve=Math.floor(te*ge.height);m===void 0&&(m=A(Ce,Ve));let ie=b?A(Ce,Ve):m;return ie.width=Ce,ie.height=Ve,ie.getContext("2d").drawImage(U,0,0,Ce,Ve),_t("WebGLRenderer: Texture has been resized from ("+ge.width+"x"+ge.height+") to ("+Ce+"x"+Ve+")."),ie}else return"data"in U&&_t("WebGLRenderer: Image in DataTexture is too big ("+ge.width+"x"+ge.height+")."),U;return U}function y(U){return U.generateMipmaps}function P(U){n.generateMipmap(U)}function I(U){return U.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?n.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(U,b,ee,te,ge,Ce=!1){if(U!==null){if(n[U]!==void 0)return n[U];_t("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let Ve;te&&(Ve=e.get("EXT_texture_norm16"),Ve||_t("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ie=b;if(b===n.RED&&(ee===n.FLOAT&&(ie=n.R32F),ee===n.HALF_FLOAT&&(ie=n.R16F),ee===n.UNSIGNED_BYTE&&(ie=n.R8),ee===n.UNSIGNED_SHORT&&Ve&&(ie=Ve.R16_EXT),ee===n.SHORT&&Ve&&(ie=Ve.R16_SNORM_EXT)),b===n.RED_INTEGER&&(ee===n.UNSIGNED_BYTE&&(ie=n.R8UI),ee===n.UNSIGNED_SHORT&&(ie=n.R16UI),ee===n.UNSIGNED_INT&&(ie=n.R32UI),ee===n.BYTE&&(ie=n.R8I),ee===n.SHORT&&(ie=n.R16I),ee===n.INT&&(ie=n.R32I)),b===n.RG&&(ee===n.FLOAT&&(ie=n.RG32F),ee===n.HALF_FLOAT&&(ie=n.RG16F),ee===n.UNSIGNED_BYTE&&(ie=n.RG8),ee===n.UNSIGNED_SHORT&&Ve&&(ie=Ve.RG16_EXT),ee===n.SHORT&&Ve&&(ie=Ve.RG16_SNORM_EXT)),b===n.RG_INTEGER&&(ee===n.UNSIGNED_BYTE&&(ie=n.RG8UI),ee===n.UNSIGNED_SHORT&&(ie=n.RG16UI),ee===n.UNSIGNED_INT&&(ie=n.RG32UI),ee===n.BYTE&&(ie=n.RG8I),ee===n.SHORT&&(ie=n.RG16I),ee===n.INT&&(ie=n.RG32I)),b===n.RGB_INTEGER&&(ee===n.UNSIGNED_BYTE&&(ie=n.RGB8UI),ee===n.UNSIGNED_SHORT&&(ie=n.RGB16UI),ee===n.UNSIGNED_INT&&(ie=n.RGB32UI),ee===n.BYTE&&(ie=n.RGB8I),ee===n.SHORT&&(ie=n.RGB16I),ee===n.INT&&(ie=n.RGB32I)),b===n.RGBA_INTEGER&&(ee===n.UNSIGNED_BYTE&&(ie=n.RGBA8UI),ee===n.UNSIGNED_SHORT&&(ie=n.RGBA16UI),ee===n.UNSIGNED_INT&&(ie=n.RGBA32UI),ee===n.BYTE&&(ie=n.RGBA8I),ee===n.SHORT&&(ie=n.RGBA16I),ee===n.INT&&(ie=n.RGBA32I)),b===n.RGB&&(ee===n.UNSIGNED_SHORT&&Ve&&(ie=Ve.RGB16_EXT),ee===n.SHORT&&Ve&&(ie=Ve.RGB16_SNORM_EXT),ee===n.UNSIGNED_INT_5_9_9_9_REV&&(ie=n.RGB9_E5),ee===n.UNSIGNED_INT_10F_11F_11F_REV&&(ie=n.R11F_G11F_B10F)),b===n.RGBA){let ue=Ce?ia:Gt.getTransfer(ge);ee===n.FLOAT&&(ie=n.RGBA32F),ee===n.HALF_FLOAT&&(ie=n.RGBA16F),ee===n.UNSIGNED_BYTE&&(ie=ue===Qt?n.SRGB8_ALPHA8:n.RGBA8),ee===n.UNSIGNED_SHORT&&Ve&&(ie=Ve.RGBA16_EXT),ee===n.SHORT&&Ve&&(ie=Ve.RGBA16_SNORM_EXT),ee===n.UNSIGNED_SHORT_4_4_4_4&&(ie=n.RGBA4),ee===n.UNSIGNED_SHORT_5_5_5_1&&(ie=n.RGB5_A1)}return(ie===n.R16F||ie===n.R32F||ie===n.RG16F||ie===n.RG32F||ie===n.RGBA16F||ie===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function R(U,b){let ee;return U?b===null||b===$i||b===So?ee=n.DEPTH24_STENCIL8:b===qi?ee=n.DEPTH32F_STENCIL8:b===bo&&(ee=n.DEPTH24_STENCIL8,_t("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===$i||b===So?ee=n.DEPTH_COMPONENT24:b===qi?ee=n.DEPTH_COMPONENT32F:b===bo&&(ee=n.DEPTH_COMPONENT16),ee}function L(U,b){return y(U)===!0||U.isFramebufferTexture&&U.minFilter!==On&&U.minFilter!==Vn?Math.log2(Math.max(b.width,b.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?b.mipmaps.length:1}function V(U){let b=U.target;b.removeEventListener("dispose",V),k(b),b.isVideoTexture&&d.delete(b),b.isHTMLTexture&&p.delete(b)}function M(U){let b=U.target;b.removeEventListener("dispose",M),W(b)}function k(U){let b=i.get(U);if(b.__webglInit===void 0)return;let ee=U.source,te=x.get(ee);if(te){let ge=te[b.__cacheKey];ge.usedTimes--,ge.usedTimes===0&&X(U),Object.keys(te).length===0&&x.delete(ee)}i.remove(U)}function X(U){let b=i.get(U);n.deleteTexture(b.__webglTexture);let ee=U.source,te=x.get(ee);delete te[b.__cacheKey],o.memory.textures--}function W(U){let b=i.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),i.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(b.__webglFramebuffer[te]))for(let ge=0;ge<b.__webglFramebuffer[te].length;ge++)n.deleteFramebuffer(b.__webglFramebuffer[te][ge]);else n.deleteFramebuffer(b.__webglFramebuffer[te]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[te])}else{if(Array.isArray(b.__webglFramebuffer))for(let te=0;te<b.__webglFramebuffer.length;te++)n.deleteFramebuffer(b.__webglFramebuffer[te]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let te=0;te<b.__webglColorRenderbuffer.length;te++)b.__webglColorRenderbuffer[te]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[te]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let ee=U.textures;for(let te=0,ge=ee.length;te<ge;te++){let Ce=i.get(ee[te]);Ce.__webglTexture&&(n.deleteTexture(Ce.__webglTexture),o.memory.textures--),i.remove(ee[te])}i.remove(U)}let F=0;function me(){F=0}function K(){return F}function Q(U){F=U}function ye(){let U=F;return U>=s.maxTextures&&_t("WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+s.maxTextures),F+=1,U}function de(U){let b=[];return b.push(U.wrapS),b.push(U.wrapT),b.push(U.wrapR||0),b.push(U.magFilter),b.push(U.minFilter),b.push(U.anisotropy),b.push(U.internalFormat),b.push(U.format),b.push(U.type),b.push(U.generateMipmaps),b.push(U.premultiplyAlpha),b.push(U.flipY),b.push(U.unpackAlignment),b.push(U.colorSpace),b.join()}function Me(U,b){let ee=i.get(U);if(U.isVideoTexture&&Z(U),U.isRenderTargetTexture===!1&&U.isExternalTexture!==!0&&U.version>0&&ee.__version!==U.version){let te=U.image;if(te===null)_t("WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)_t("WebGLRenderer: Texture marked for update but image is incomplete");else{xt(ee,U,b);return}}else U.isExternalTexture&&(ee.__webglTexture=U.sourceTexture?U.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,ee.__webglTexture,n.TEXTURE0+b)}function Ae(U,b){let ee=i.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&ee.__version!==U.version){xt(ee,U,b);return}else U.isExternalTexture&&(ee.__webglTexture=U.sourceTexture?U.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,ee.__webglTexture,n.TEXTURE0+b)}function ne(U,b){let ee=i.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&ee.__version!==U.version){xt(ee,U,b);return}t.bindTexture(n.TEXTURE_3D,ee.__webglTexture,n.TEXTURE0+b)}function Ye(U,b){let ee=i.get(U);if(U.isCubeDepthTexture!==!0&&U.version>0&&ee.__version!==U.version){mt(ee,U,b);return}t.bindTexture(n.TEXTURE_CUBE_MAP,ee.__webglTexture,n.TEXTURE0+b)}let tt={[Gl]:n.REPEAT,[ns]:n.CLAMP_TO_EDGE,[Wl]:n.MIRRORED_REPEAT},zt={[On]:n.NEAREST,[Ap]:n.NEAREST_MIPMAP_NEAREST,[Ea]:n.NEAREST_MIPMAP_LINEAR,[Vn]:n.LINEAR,[gc]:n.LINEAR_MIPMAP_NEAREST,[nr]:n.LINEAR_MIPMAP_LINEAR},ze={[Cp]:n.NEVER,[kp]:n.ALWAYS,[Pp]:n.LESS,[Qc]:n.LEQUAL,[Dp]:n.EQUAL,[eu]:n.GEQUAL,[Ip]:n.GREATER,[Lp]:n.NOTEQUAL};function je(U,b){if(b.type===qi&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Vn||b.magFilter===gc||b.magFilter===Ea||b.magFilter===nr||b.minFilter===Vn||b.minFilter===gc||b.minFilter===Ea||b.minFilter===nr)&&_t("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(U,n.TEXTURE_WRAP_S,tt[b.wrapS]),n.texParameteri(U,n.TEXTURE_WRAP_T,tt[b.wrapT]),(U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY)&&n.texParameteri(U,n.TEXTURE_WRAP_R,tt[b.wrapR]),n.texParameteri(U,n.TEXTURE_MAG_FILTER,zt[b.magFilter]),n.texParameteri(U,n.TEXTURE_MIN_FILTER,zt[b.minFilter]),b.compareFunction&&(n.texParameteri(U,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(U,n.TEXTURE_COMPARE_FUNC,ze[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===On||b.minFilter!==Ea&&b.minFilter!==nr||b.type===qi&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){let ee=e.get("EXT_texture_filter_anisotropic");n.texParameterf(U,ee.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function ce(U,b){let ee=!1;U.__webglInit===void 0&&(U.__webglInit=!0,b.addEventListener("dispose",V));let te=b.source,ge=x.get(te);ge===void 0&&(ge={},x.set(te,ge));let Ce=de(b);if(Ce!==U.__cacheKey){ge[Ce]===void 0&&(ge[Ce]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,ee=!0),ge[Ce].usedTimes++;let Ve=ge[U.__cacheKey];Ve!==void 0&&(ge[U.__cacheKey].usedTimes--,Ve.usedTimes===0&&X(b)),U.__cacheKey=Ce,U.__webglTexture=ge[Ce].texture}return ee}function xe(U,b,ee){return Math.floor(Math.floor(U/ee)/b)}function Te(U,b,ee,te){let Ce=U.updateRanges;if(Ce.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,b.width,b.height,ee,te,b.data);else{Ce.sort((dt,Ie)=>dt.start-Ie.start);let Ve=0;for(let dt=1;dt<Ce.length;dt++){let Ie=Ce[Ve],Oe=Ce[dt],oe=Ie.start+Ie.count,Ne=xe(Oe.start,b.width,4),Je=xe(Ie.start,b.width,4);Oe.start<=oe+1&&Ne===Je&&xe(Oe.start+Oe.count-1,b.width,4)===Ne?Ie.count=Math.max(Ie.count,Oe.start+Oe.count-Ie.start):(++Ve,Ce[Ve]=Oe)}Ce.length=Ve+1;let ie=t.getParameter(n.UNPACK_ROW_LENGTH),ue=t.getParameter(n.UNPACK_SKIP_PIXELS),He=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,b.width);for(let dt=0,Ie=Ce.length;dt<Ie;dt++){let Oe=Ce[dt],oe=Math.floor(Oe.start/4),Ne=Math.ceil(Oe.count/4),Je=oe%b.width,$=Math.floor(oe/b.width),Ue=Ne,ve=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Je),t.pixelStorei(n.UNPACK_SKIP_ROWS,$),t.texSubImage2D(n.TEXTURE_2D,0,Je,$,Ue,ve,ee,te,b.data)}U.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,ie),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ue),t.pixelStorei(n.UNPACK_SKIP_ROWS,He)}}function xt(U,b,ee){let te=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(te=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(te=n.TEXTURE_3D);let ge=ce(U,b),Ce=b.source;t.bindTexture(te,U.__webglTexture,n.TEXTURE0+ee);let Ve=i.get(Ce);if(Ce.version!==Ve.__version||ge===!0){if(t.activeTexture(n.TEXTURE0+ee),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){let ve=Gt.getPrimaries(Gt.workingColorSpace),Ge=b.colorSpace===ks?null:Gt.getPrimaries(b.colorSpace),De=b.colorSpace===ks||ve===Ge?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,De)}t.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment);let ue=v(b.image,!1,s.maxTextureSize);ue=Ln(b,ue);let He=r.convert(b.format,b.colorSpace),dt=r.convert(b.type),Ie=E(b.internalFormat,He,dt,b.normalized,b.colorSpace,b.isVideoTexture);je(te,b);let Oe,oe=b.mipmaps,Ne=b.isVideoTexture!==!0,Je=Ve.__version===void 0||ge===!0,$=Ce.dataReady,Ue=L(b,ue);if(b.isDepthTexture)Ie=R(b.format===ir,b.type),Je&&(Ne?t.texStorage2D(n.TEXTURE_2D,1,Ie,ue.width,ue.height):t.texImage2D(n.TEXTURE_2D,0,Ie,ue.width,ue.height,0,He,dt,null));else if(b.isDataTexture)if(oe.length>0){Ne&&Je&&t.texStorage2D(n.TEXTURE_2D,Ue,Ie,oe[0].width,oe[0].height);for(let ve=0,Ge=oe.length;ve<Ge;ve++)Oe=oe[ve],Ne?$&&t.texSubImage2D(n.TEXTURE_2D,ve,0,0,Oe.width,Oe.height,He,dt,Oe.data):t.texImage2D(n.TEXTURE_2D,ve,Ie,Oe.width,Oe.height,0,He,dt,Oe.data);b.generateMipmaps=!1}else Ne?(Je&&t.texStorage2D(n.TEXTURE_2D,Ue,Ie,ue.width,ue.height),$&&Te(b,ue,He,dt)):t.texImage2D(n.TEXTURE_2D,0,Ie,ue.width,ue.height,0,He,dt,ue.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Ne&&Je&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ue,Ie,oe[0].width,oe[0].height,ue.depth);for(let ve=0,Ge=oe.length;ve<Ge;ve++)if(Oe=oe[ve],b.format!==Fi)if(He!==null)if(Ne){if($)if(b.layerUpdates.size>0){let De=ed(Oe.width,Oe.height,b.format,b.type);for(let we of b.layerUpdates){let at=Oe.data.subarray(we*De/Oe.data.BYTES_PER_ELEMENT,(we+1)*De/Oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ve,0,0,we,Oe.width,Oe.height,1,He,at)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ve,0,0,0,Oe.width,Oe.height,ue.depth,He,Oe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ve,Ie,Oe.width,Oe.height,ue.depth,0,Oe.data,0,0);else _t("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?$&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ve,0,0,0,Oe.width,Oe.height,ue.depth,He,dt,Oe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ve,Ie,Oe.width,Oe.height,ue.depth,0,He,dt,Oe.data)}else{Ne&&Je&&t.texStorage2D(n.TEXTURE_2D,Ue,Ie,oe[0].width,oe[0].height);for(let ve=0,Ge=oe.length;ve<Ge;ve++)Oe=oe[ve],b.format!==Fi?He!==null?Ne?$&&t.compressedTexSubImage2D(n.TEXTURE_2D,ve,0,0,Oe.width,Oe.height,He,Oe.data):t.compressedTexImage2D(n.TEXTURE_2D,ve,Ie,Oe.width,Oe.height,0,Oe.data):_t("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?$&&t.texSubImage2D(n.TEXTURE_2D,ve,0,0,Oe.width,Oe.height,He,dt,Oe.data):t.texImage2D(n.TEXTURE_2D,ve,Ie,Oe.width,Oe.height,0,He,dt,Oe.data)}else if(b.isDataArrayTexture)if(Ne){if(Je&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ue,Ie,ue.width,ue.height,ue.depth),$)if(b.layerUpdates.size>0){let ve=ed(ue.width,ue.height,b.format,b.type);for(let Ge of b.layerUpdates){let De=ue.data.subarray(Ge*ve/ue.data.BYTES_PER_ELEMENT,(Ge+1)*ve/ue.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Ge,ue.width,ue.height,1,He,dt,De)}b.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,He,dt,ue.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ie,ue.width,ue.height,ue.depth,0,He,dt,ue.data);else if(b.isData3DTexture)Ne?(Je&&t.texStorage3D(n.TEXTURE_3D,Ue,Ie,ue.width,ue.height,ue.depth),$&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,He,dt,ue.data)):t.texImage3D(n.TEXTURE_3D,0,Ie,ue.width,ue.height,ue.depth,0,He,dt,ue.data);else if(b.isFramebufferTexture){if(Je)if(Ne)t.texStorage2D(n.TEXTURE_2D,Ue,Ie,ue.width,ue.height);else{let ve=ue.width,Ge=ue.height;for(let De=0;De<Ue;De++)t.texImage2D(n.TEXTURE_2D,De,Ie,ve,Ge,0,He,dt,null),ve>>=1,Ge>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in n){let ve=n.canvas;if(ve.hasAttribute("layoutsubtree")||ve.setAttribute("layoutsubtree","true"),ue.parentNode!==ve){ve.appendChild(ue),p.add(b),ve.onpaint=Ge=>{let De=Ge.changedElements;for(let we of p)De.includes(we.image)&&(we.needsUpdate=!0)},ve.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ue);else{let De=n.RGBA,we=n.RGBA,at=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,De,we,at,ue)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(oe.length>0){if(Ne&&Je){let ve=Ut(oe[0]);t.texStorage2D(n.TEXTURE_2D,Ue,Ie,ve.width,ve.height)}for(let ve=0,Ge=oe.length;ve<Ge;ve++)Oe=oe[ve],Ne?$&&t.texSubImage2D(n.TEXTURE_2D,ve,0,0,He,dt,Oe):t.texImage2D(n.TEXTURE_2D,ve,Ie,He,dt,Oe);b.generateMipmaps=!1}else if(Ne){if(Je){let ve=Ut(ue);t.texStorage2D(n.TEXTURE_2D,Ue,Ie,ve.width,ve.height)}$&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,He,dt,ue)}else t.texImage2D(n.TEXTURE_2D,0,Ie,He,dt,ue);y(b)&&P(te),Ve.__version=Ce.version,b.onUpdate&&b.onUpdate(b)}U.__version=b.version}function mt(U,b,ee){if(b.image.length!==6)return;let te=ce(U,b),ge=b.source;t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+ee);let Ce=i.get(ge);if(ge.version!==Ce.__version||te===!0){t.activeTexture(n.TEXTURE0+ee);let Ve=Gt.getPrimaries(Gt.workingColorSpace),ie=b.colorSpace===ks?null:Gt.getPrimaries(b.colorSpace),ue=b.colorSpace===ks||Ve===ie?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);let He=b.isCompressedTexture||b.image[0].isCompressedTexture,dt=b.image[0]&&b.image[0].isDataTexture,Ie=[];for(let we=0;we<6;we++)!He&&!dt?Ie[we]=v(b.image[we],!0,s.maxCubemapSize):Ie[we]=dt?b.image[we].image:b.image[we],Ie[we]=Ln(b,Ie[we]);let Oe=Ie[0],oe=r.convert(b.format,b.colorSpace),Ne=r.convert(b.type),Je=E(b.internalFormat,oe,Ne,b.normalized,b.colorSpace),$=b.isVideoTexture!==!0,Ue=Ce.__version===void 0||te===!0,ve=ge.dataReady,Ge=L(b,Oe);je(n.TEXTURE_CUBE_MAP,b);let De;if(He){$&&Ue&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ge,Je,Oe.width,Oe.height);for(let we=0;we<6;we++){De=Ie[we].mipmaps;for(let at=0;at<De.length;at++){let ot=De[at];b.format!==Fi?oe!==null?$?ve&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+we,at,0,0,ot.width,ot.height,oe,ot.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+we,at,Je,ot.width,ot.height,0,ot.data):_t("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+we,at,0,0,ot.width,ot.height,oe,Ne,ot.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+we,at,Je,ot.width,ot.height,0,oe,Ne,ot.data)}}}else{if(De=b.mipmaps,$&&Ue){De.length>0&&Ge++;let we=Ut(Ie[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ge,Je,we.width,we.height)}for(let we=0;we<6;we++)if(dt){$?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,0,0,Ie[we].width,Ie[we].height,oe,Ne,Ie[we].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,Je,Ie[we].width,Ie[we].height,0,oe,Ne,Ie[we].data);for(let at=0;at<De.length;at++){let Ot=De[at].image[we].image;$?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+we,at+1,0,0,Ot.width,Ot.height,oe,Ne,Ot.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+we,at+1,Je,Ot.width,Ot.height,0,oe,Ne,Ot.data)}}else{$?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,0,0,oe,Ne,Ie[we]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,Je,oe,Ne,Ie[we]);for(let at=0;at<De.length;at++){let ot=De[at];$?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+we,at+1,0,0,oe,Ne,ot.image[we]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+we,at+1,Je,oe,Ne,ot.image[we])}}}y(b)&&P(n.TEXTURE_CUBE_MAP),Ce.__version=ge.version,b.onUpdate&&b.onUpdate(b)}U.__version=b.version}function Qe(U,b,ee,te,ge,Ce){let Ve=r.convert(ee.format,ee.colorSpace),ie=r.convert(ee.type),ue=E(ee.internalFormat,Ve,ie,ee.normalized,ee.colorSpace),He=i.get(b),dt=i.get(ee);if(dt.__renderTarget=b,!He.__hasExternalTextures){let Ie=Math.max(1,b.width>>Ce),Oe=Math.max(1,b.height>>Ce);ge===n.TEXTURE_3D||ge===n.TEXTURE_2D_ARRAY?t.texImage3D(ge,Ce,ue,Ie,Oe,b.depth,0,Ve,ie,null):t.texImage2D(ge,Ce,ue,Ie,Oe,0,Ve,ie,null)}t.bindFramebuffer(n.FRAMEBUFFER,U),hn(b)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,ge,dt.__webglTexture,0,an(b)):(ge===n.TEXTURE_2D||ge>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ge<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,te,ge,dt.__webglTexture,Ce),t.bindFramebuffer(n.FRAMEBUFFER,null)}function on(U,b,ee){if(n.bindRenderbuffer(n.RENDERBUFFER,U),b.depthBuffer){let te=b.depthTexture,ge=te&&te.isDepthTexture?te.type:null,Ce=R(b.stencilBuffer,ge),Ve=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;hn(b)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,an(b),Ce,b.width,b.height):ee?n.renderbufferStorageMultisample(n.RENDERBUFFER,an(b),Ce,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,Ce,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ve,n.RENDERBUFFER,U)}else{let te=b.textures;for(let ge=0;ge<te.length;ge++){let Ce=te[ge],Ve=r.convert(Ce.format,Ce.colorSpace),ie=r.convert(Ce.type),ue=E(Ce.internalFormat,Ve,ie,Ce.normalized,Ce.colorSpace);hn(b)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,an(b),ue,b.width,b.height):ee?n.renderbufferStorageMultisample(n.RENDERBUFFER,an(b),ue,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,ue,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Dt(U,b,ee){let te=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,U),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ge=i.get(b.depthTexture);if(ge.__renderTarget=b,(!ge.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),te){if(ge.__webglInit===void 0&&(ge.__webglInit=!0,b.depthTexture.addEventListener("dispose",V)),ge.__webglTexture===void 0){ge.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,ge.__webglTexture),je(n.TEXTURE_CUBE_MAP,b.depthTexture);let He=r.convert(b.depthTexture.format),dt=r.convert(b.depthTexture.type),Ie;b.depthTexture.format===is?Ie=n.DEPTH_COMPONENT24:b.depthTexture.format===ir&&(Ie=n.DEPTH24_STENCIL8);for(let Oe=0;Oe<6;Oe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,0,Ie,b.width,b.height,0,He,dt,null)}}else Me(b.depthTexture,0);let Ce=ge.__webglTexture,Ve=an(b),ie=te?n.TEXTURE_CUBE_MAP_POSITIVE_X+ee:n.TEXTURE_2D,ue=b.depthTexture.format===ir?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(b.depthTexture.format===is)hn(b)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ue,ie,Ce,0,Ve):n.framebufferTexture2D(n.FRAMEBUFFER,ue,ie,Ce,0);else if(b.depthTexture.format===ir)hn(b)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ue,ie,Ce,0,Ve):n.framebufferTexture2D(n.FRAMEBUFFER,ue,ie,Ce,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Jt(U){let b=i.get(U),ee=U.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==U.depthTexture){let te=U.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),te){let ge=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,te.removeEventListener("dispose",ge)};te.addEventListener("dispose",ge),b.__depthDisposeCallback=ge}b.__boundDepthTexture=te}if(U.depthTexture&&!b.__autoAllocateDepthBuffer)if(ee)for(let te=0;te<6;te++)Dt(b.__webglFramebuffer[te],U,te);else{let te=U.texture.mipmaps;te&&te.length>0?Dt(b.__webglFramebuffer[0],U,0):Dt(b.__webglFramebuffer,U,0)}else if(ee){b.__webglDepthbuffer=[];for(let te=0;te<6;te++)if(t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[te]),b.__webglDepthbuffer[te]===void 0)b.__webglDepthbuffer[te]=n.createRenderbuffer(),on(b.__webglDepthbuffer[te],U,!1);else{let ge=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ce=b.__webglDepthbuffer[te];n.bindRenderbuffer(n.RENDERBUFFER,Ce),n.framebufferRenderbuffer(n.FRAMEBUFFER,ge,n.RENDERBUFFER,Ce)}}else{let te=U.texture.mipmaps;if(te&&te.length>0?t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),on(b.__webglDepthbuffer,U,!1);else{let ge=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ce=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Ce),n.framebufferRenderbuffer(n.FRAMEBUFFER,ge,n.RENDERBUFFER,Ce)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function St(U,b,ee){let te=i.get(U);b!==void 0&&Qe(te.__webglFramebuffer,U,U.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),ee!==void 0&&Jt(U)}function Vt(U){let b=U.texture,ee=i.get(U),te=i.get(b);U.addEventListener("dispose",M);let ge=U.textures,Ce=U.isWebGLCubeRenderTarget===!0,Ve=ge.length>1;if(Ve||(te.__webglTexture===void 0&&(te.__webglTexture=n.createTexture()),te.__version=b.version,o.memory.textures++),Ce){ee.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(b.mipmaps&&b.mipmaps.length>0){ee.__webglFramebuffer[ie]=[];for(let ue=0;ue<b.mipmaps.length;ue++)ee.__webglFramebuffer[ie][ue]=n.createFramebuffer()}else ee.__webglFramebuffer[ie]=n.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){ee.__webglFramebuffer=[];for(let ie=0;ie<b.mipmaps.length;ie++)ee.__webglFramebuffer[ie]=n.createFramebuffer()}else ee.__webglFramebuffer=n.createFramebuffer();if(Ve)for(let ie=0,ue=ge.length;ie<ue;ie++){let He=i.get(ge[ie]);He.__webglTexture===void 0&&(He.__webglTexture=n.createTexture(),o.memory.textures++)}if(U.samples>0&&hn(U)===!1){ee.__webglMultisampledFramebuffer=n.createFramebuffer(),ee.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,ee.__webglMultisampledFramebuffer);for(let ie=0;ie<ge.length;ie++){let ue=ge[ie];ee.__webglColorRenderbuffer[ie]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,ee.__webglColorRenderbuffer[ie]);let He=r.convert(ue.format,ue.colorSpace),dt=r.convert(ue.type),Ie=E(ue.internalFormat,He,dt,ue.normalized,ue.colorSpace,U.isXRRenderTarget===!0),Oe=an(U);n.renderbufferStorageMultisample(n.RENDERBUFFER,Oe,Ie,U.width,U.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ie,n.RENDERBUFFER,ee.__webglColorRenderbuffer[ie])}n.bindRenderbuffer(n.RENDERBUFFER,null),U.depthBuffer&&(ee.__webglDepthRenderbuffer=n.createRenderbuffer(),on(ee.__webglDepthRenderbuffer,U,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Ce){t.bindTexture(n.TEXTURE_CUBE_MAP,te.__webglTexture),je(n.TEXTURE_CUBE_MAP,b);for(let ie=0;ie<6;ie++)if(b.mipmaps&&b.mipmaps.length>0)for(let ue=0;ue<b.mipmaps.length;ue++)Qe(ee.__webglFramebuffer[ie][ue],U,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ue);else Qe(ee.__webglFramebuffer[ie],U,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);y(b)&&P(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ve){for(let ie=0,ue=ge.length;ie<ue;ie++){let He=ge[ie],dt=i.get(He),Ie=n.TEXTURE_2D;(U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(Ie=U.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Ie,dt.__webglTexture),je(Ie,He),Qe(ee.__webglFramebuffer,U,He,n.COLOR_ATTACHMENT0+ie,Ie,0),y(He)&&P(Ie)}t.unbindTexture()}else{let ie=n.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(ie=U.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ie,te.__webglTexture),je(ie,b),b.mipmaps&&b.mipmaps.length>0)for(let ue=0;ue<b.mipmaps.length;ue++)Qe(ee.__webglFramebuffer[ue],U,b,n.COLOR_ATTACHMENT0,ie,ue);else Qe(ee.__webglFramebuffer,U,b,n.COLOR_ATTACHMENT0,ie,0);y(b)&&P(ie),t.unbindTexture()}U.depthBuffer&&Jt(U)}function D(U){let b=U.textures;for(let ee=0,te=b.length;ee<te;ee++){let ge=b[ee];if(y(ge)){let Ce=I(U),Ve=i.get(ge).__webglTexture;t.bindTexture(Ce,Ve),P(Ce),t.unbindTexture()}}}let Ft=[],Zt=[];function en(U){if(U.samples>0){if(hn(U)===!1){let b=U.textures,ee=U.width,te=U.height,ge=n.COLOR_BUFFER_BIT,Ce=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ve=i.get(U),ie=b.length>1;if(ie)for(let He=0;He<b.length;He++)t.bindFramebuffer(n.FRAMEBUFFER,Ve.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+He,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ve.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+He,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ve.__webglMultisampledFramebuffer);let ue=U.texture.mipmaps;ue&&ue.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ve.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ve.__webglFramebuffer);for(let He=0;He<b.length;He++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(ge|=n.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(ge|=n.STENCIL_BUFFER_BIT)),ie){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ve.__webglColorRenderbuffer[He]);let dt=i.get(b[He]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,dt,0)}n.blitFramebuffer(0,0,ee,te,0,0,ee,te,ge,n.NEAREST),c===!0&&(Ft.length=0,Zt.length=0,Ft.push(n.COLOR_ATTACHMENT0+He),U.depthBuffer&&U.resolveDepthBuffer===!1&&(Ft.push(Ce),Zt.push(Ce),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Zt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ft))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ie)for(let He=0;He<b.length;He++){t.bindFramebuffer(n.FRAMEBUFFER,Ve.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+He,n.RENDERBUFFER,Ve.__webglColorRenderbuffer[He]);let dt=i.get(b[He]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ve.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+He,n.TEXTURE_2D,dt,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ve.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&c){let b=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function an(U){return Math.min(s.maxSamples,U.samples)}function hn(U){let b=i.get(U);return U.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Z(U){let b=o.render.frame;d.get(U)!==b&&(d.set(U,b),U.update())}function Ln(U,b){let ee=U.colorSpace,te=U.format,ge=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||ee!==na&&ee!==ks&&(Gt.getTransfer(ee)===Qt?(te!==Fi||ge!==Ti)&&_t("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):yt("WebGLTextures: Unsupported texture color space:",ee)),b}function Ut(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(h.width=U.naturalWidth||U.width,h.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(h.width=U.displayWidth,h.height=U.displayHeight):(h.width=U.width,h.height=U.height),h}this.allocateTextureUnit=ye,this.resetTextureUnits=me,this.getTextureUnits=K,this.setTextureUnits=Q,this.setTexture2D=Me,this.setTexture2DArray=Ae,this.setTexture3D=ne,this.setTextureCube=Ye,this.rebindTextures=St,this.setupRenderTarget=Vt,this.updateRenderTargetMipmap=D,this.updateMultisampleRenderTarget=en,this.setupDepthRenderbuffer=Jt,this.setupFrameBufferTexture=Qe,this.useMultisampledRTT=hn,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function a1(n,e){function t(i,s=ks){let r,o=Gt.getTransfer(s);if(i===Ti)return n.UNSIGNED_BYTE;if(i===xc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===vc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Gh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Wh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Vh)return n.BYTE;if(i===Hh)return n.SHORT;if(i===bo)return n.UNSIGNED_SHORT;if(i===_c)return n.INT;if(i===$i)return n.UNSIGNED_INT;if(i===qi)return n.FLOAT;if(i===as)return n.HALF_FLOAT;if(i===Xh)return n.ALPHA;if(i===$h)return n.RGB;if(i===Fi)return n.RGBA;if(i===is)return n.DEPTH_COMPONENT;if(i===ir)return n.DEPTH_STENCIL;if(i===qh)return n.RED;if(i===yc)return n.RED_INTEGER;if(i===sr)return n.RG;if(i===bc)return n.RG_INTEGER;if(i===Sc)return n.RGBA_INTEGER;if(i===Aa||i===Ta||i===Ra||i===Ca)if(o===Qt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Aa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Aa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ta)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ra)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ca)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Mc||i===wc||i===Ec||i===Ac)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Mc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===wc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ec)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ac)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Tc||i===Rc||i===Cc||i===Pc||i===Dc||i===Pa||i===Ic)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Tc||i===Rc)return o===Qt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Cc)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Pc)return r.COMPRESSED_R11_EAC;if(i===Dc)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Pa)return r.COMPRESSED_RG11_EAC;if(i===Ic)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Lc||i===kc||i===Fc||i===Nc||i===Uc||i===Oc||i===Bc||i===zc||i===Vc||i===Hc||i===Gc||i===Wc||i===Xc||i===$c)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Lc)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===kc)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Fc)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Nc)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Uc)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Oc)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Bc)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===zc)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Vc)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Hc)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Gc)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Wc)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Xc)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===$c)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===qc||i===Yc||i===Jc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===qc)return o===Qt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Yc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Jc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Zc||i===jc||i===Da||i===Kc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Zc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===jc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Da)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Kc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===So?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var l1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,c1=`
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

}`,pd=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new ga(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new si({vertexShader:l1,fragmentShader:c1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Sn(new js(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},md=class extends Hi{constructor(e,t){super();let i=this,s=null,r=1,o=null,l="local-floor",c=1,h=null,d=null,p=null,m=null,x=null,_=null,A=typeof XRWebGLBinding<"u",v=new pd,y={},P=t.getContextAttributes(),I=null,E=null,R=[],L=[],V=new bt,M=null,k=new Kn;k.viewport=new rn;let X=new Kn;X.viewport=new rn;let W=[k,X],F=new fc,me=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ce){let xe=R[ce];return xe===void 0&&(xe=new go,R[ce]=xe),xe.getTargetRaySpace()},this.getControllerGrip=function(ce){let xe=R[ce];return xe===void 0&&(xe=new go,R[ce]=xe),xe.getGripSpace()},this.getHand=function(ce){let xe=R[ce];return xe===void 0&&(xe=new go,R[ce]=xe),xe.getHandSpace()};function Q(ce){let xe=L.indexOf(ce.inputSource);if(xe===-1)return;let Te=R[xe];Te!==void 0&&(Te.update(ce.inputSource,ce.frame,h||o),Te.dispatchEvent({type:ce.type,data:ce.inputSource}))}function ye(){s.removeEventListener("select",Q),s.removeEventListener("selectstart",Q),s.removeEventListener("selectend",Q),s.removeEventListener("squeeze",Q),s.removeEventListener("squeezestart",Q),s.removeEventListener("squeezeend",Q),s.removeEventListener("end",ye),s.removeEventListener("inputsourceschange",de);for(let ce=0;ce<R.length;ce++){let xe=L[ce];xe!==null&&(L[ce]=null,R[ce].disconnect(xe))}me=null,K=null,v.reset();for(let ce in y)delete y[ce];e.setRenderTarget(I),x=null,m=null,p=null,s=null,E=null,je.stop(),i.isPresenting=!1,e.setPixelRatio(M),e.setSize(V.width,V.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ce){r=ce,i.isPresenting===!0&&_t("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ce){l=ce,i.isPresenting===!0&&_t("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||o},this.setReferenceSpace=function(ce){h=ce},this.getBaseLayer=function(){return m!==null?m:x},this.getBinding=function(){return p===null&&A&&(p=new XRWebGLBinding(s,t)),p},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(ce){if(s=ce,s!==null){if(I=e.getRenderTarget(),s.addEventListener("select",Q),s.addEventListener("selectstart",Q),s.addEventListener("selectend",Q),s.addEventListener("squeeze",Q),s.addEventListener("squeezestart",Q),s.addEventListener("squeezeend",Q),s.addEventListener("end",ye),s.addEventListener("inputsourceschange",de),P.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(V),A&&"createProjectionLayer"in XRWebGLBinding.prototype){let Te=null,xt=null,mt=null;P.depth&&(mt=P.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Te=P.stencil?ir:is,xt=P.stencil?So:$i);let Qe={colorFormat:t.RGBA8,depthFormat:mt,scaleFactor:r};p=this.getBinding(),m=p.createProjectionLayer(Qe),s.updateRenderState({layers:[m]}),e.setPixelRatio(1),e.setSize(m.textureWidth,m.textureHeight,!1),E=new Mi(m.textureWidth,m.textureHeight,{format:Fi,type:Ti,depthTexture:new Ls(m.textureWidth,m.textureHeight,xt,void 0,void 0,void 0,void 0,void 0,void 0,Te),stencilBuffer:P.stencil,colorSpace:e.outputColorSpace,samples:P.antialias?4:0,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}else{let Te={antialias:P.antialias,alpha:!0,depth:P.depth,stencil:P.stencil,framebufferScaleFactor:r};x=new XRWebGLLayer(s,t,Te),s.updateRenderState({baseLayer:x}),e.setPixelRatio(1),e.setSize(x.framebufferWidth,x.framebufferHeight,!1),E=new Mi(x.framebufferWidth,x.framebufferHeight,{format:Fi,type:Ti,colorSpace:e.outputColorSpace,stencilBuffer:P.stencil,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),h=null,o=await s.requestReferenceSpace(l),je.setContext(s),je.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function de(ce){for(let xe=0;xe<ce.removed.length;xe++){let Te=ce.removed[xe],xt=L.indexOf(Te);xt>=0&&(L[xt]=null,R[xt].disconnect(Te))}for(let xe=0;xe<ce.added.length;xe++){let Te=ce.added[xe],xt=L.indexOf(Te);if(xt===-1){for(let Qe=0;Qe<R.length;Qe++)if(Qe>=L.length){L.push(Te),xt=Qe;break}else if(L[Qe]===null){L[Qe]=Te,xt=Qe;break}if(xt===-1)break}let mt=R[xt];mt&&mt.connect(Te)}}let Me=new J,Ae=new J;function ne(ce,xe,Te){Me.setFromMatrixPosition(xe.matrixWorld),Ae.setFromMatrixPosition(Te.matrixWorld);let xt=Me.distanceTo(Ae),mt=xe.projectionMatrix.elements,Qe=Te.projectionMatrix.elements,on=mt[14]/(mt[10]-1),Dt=mt[14]/(mt[10]+1),Jt=(mt[9]+1)/mt[5],St=(mt[9]-1)/mt[5],Vt=(mt[8]-1)/mt[0],D=(Qe[8]+1)/Qe[0],Ft=on*Vt,Zt=on*D,en=xt/(-Vt+D),an=en*-Vt;if(xe.matrixWorld.decompose(ce.position,ce.quaternion,ce.scale),ce.translateX(an),ce.translateZ(en),ce.matrixWorld.compose(ce.position,ce.quaternion,ce.scale),ce.matrixWorldInverse.copy(ce.matrixWorld).invert(),mt[10]===-1)ce.projectionMatrix.copy(xe.projectionMatrix),ce.projectionMatrixInverse.copy(xe.projectionMatrixInverse);else{let hn=on+en,Z=Dt+en,Ln=Ft-an,Ut=Zt+(xt-an),U=Jt*Dt/Z*hn,b=St*Dt/Z*hn;ce.projectionMatrix.makePerspective(Ln,Ut,U,b,hn,Z),ce.projectionMatrixInverse.copy(ce.projectionMatrix).invert()}}function Ye(ce,xe){xe===null?ce.matrixWorld.copy(ce.matrix):ce.matrixWorld.multiplyMatrices(xe.matrixWorld,ce.matrix),ce.matrixWorldInverse.copy(ce.matrixWorld).invert()}this.updateCamera=function(ce){if(s===null)return;let xe=ce.near,Te=ce.far;v.texture!==null&&(v.depthNear>0&&(xe=v.depthNear),v.depthFar>0&&(Te=v.depthFar)),F.near=X.near=k.near=xe,F.far=X.far=k.far=Te,(me!==F.near||K!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),me=F.near,K=F.far),F.layers.mask=ce.layers.mask|6,k.layers.mask=F.layers.mask&-5,X.layers.mask=F.layers.mask&-3;let xt=ce.parent,mt=F.cameras;Ye(F,xt);for(let Qe=0;Qe<mt.length;Qe++)Ye(mt[Qe],xt);mt.length===2?ne(F,k,X):F.projectionMatrix.copy(k.projectionMatrix),tt(ce,F,xt)};function tt(ce,xe,Te){Te===null?ce.matrix.copy(xe.matrixWorld):(ce.matrix.copy(Te.matrixWorld),ce.matrix.invert(),ce.matrix.multiply(xe.matrixWorld)),ce.matrix.decompose(ce.position,ce.quaternion,ce.scale),ce.updateMatrixWorld(!0),ce.projectionMatrix.copy(xe.projectionMatrix),ce.projectionMatrixInverse.copy(xe.projectionMatrixInverse),ce.isPerspectiveCamera&&(ce.fov=fo*2*Math.atan(1/ce.projectionMatrix.elements[5]),ce.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(m===null&&x===null))return c},this.setFoveation=function(ce){c=ce,m!==null&&(m.fixedFoveation=ce),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=ce)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(F)},this.getCameraTexture=function(ce){return y[ce]};let zt=null;function ze(ce,xe){if(d=xe.getViewerPose(h||o),_=xe,d!==null){let Te=d.views;x!==null&&(e.setRenderTargetFramebuffer(E,x.framebuffer),e.setRenderTarget(E));let xt=!1;Te.length!==F.cameras.length&&(F.cameras.length=0,xt=!0);for(let Dt=0;Dt<Te.length;Dt++){let Jt=Te[Dt],St=null;if(x!==null)St=x.getViewport(Jt);else{let D=p.getViewSubImage(m,Jt);St=D.viewport,Dt===0&&(e.setRenderTargetTextures(E,D.colorTexture,D.depthStencilTexture),e.setRenderTarget(E))}let Vt=W[Dt];Vt===void 0&&(Vt=new Kn,Vt.layers.enable(Dt),Vt.viewport=new rn,W[Dt]=Vt),Vt.matrix.fromArray(Jt.transform.matrix),Vt.matrix.decompose(Vt.position,Vt.quaternion,Vt.scale),Vt.projectionMatrix.fromArray(Jt.projectionMatrix),Vt.projectionMatrixInverse.copy(Vt.projectionMatrix).invert(),Vt.viewport.set(St.x,St.y,St.width,St.height),Dt===0&&(F.matrix.copy(Vt.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),xt===!0&&F.cameras.push(Vt)}let mt=s.enabledFeatures;if(mt&&mt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&A){p=i.getBinding();let Dt=p.getDepthInformation(Te[0]);Dt&&Dt.isValid&&Dt.texture&&v.init(Dt,s.renderState)}if(mt&&mt.includes("camera-access")&&A){e.state.unbindTexture(),p=i.getBinding();for(let Dt=0;Dt<Te.length;Dt++){let Jt=Te[Dt].camera;if(Jt){let St=y[Jt];St||(St=new ga,y[Jt]=St);let Vt=p.getCameraImage(Jt);St.sourceTexture=Vt}}}}for(let Te=0;Te<R.length;Te++){let xt=L[Te],mt=R[Te];xt!==null&&mt!==void 0&&mt.update(xt,xe,h||o)}zt&&zt(ce,xe),xe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:xe}),_=null}let je=new cm;je.setAnimationLoop(ze),this.setAnimationLoop=function(ce){zt=ce},this.dispose=function(){}}},u1=new vn,mm=new Rt;mm.set(-1,0,0,0,1,0,0,0,1);function h1(n,e){function t(v,y){v.matrixAutoUpdate===!0&&v.updateMatrix(),y.value.copy(v.matrix)}function i(v,y){y.color.getRGB(v.fogColor.value,jh(n)),y.isFog?(v.fogNear.value=y.near,v.fogFar.value=y.far):y.isFogExp2&&(v.fogDensity.value=y.density)}function s(v,y,P,I,E){y.isNodeMaterial?y.uniformsNeedUpdate=!1:y.isMeshBasicMaterial?r(v,y):y.isMeshLambertMaterial?(r(v,y),y.envMap&&(v.envMapIntensity.value=y.envMapIntensity)):y.isMeshToonMaterial?(r(v,y),p(v,y)):y.isMeshPhongMaterial?(r(v,y),d(v,y),y.envMap&&(v.envMapIntensity.value=y.envMapIntensity)):y.isMeshStandardMaterial?(r(v,y),m(v,y),y.isMeshPhysicalMaterial&&x(v,y,E)):y.isMeshMatcapMaterial?(r(v,y),_(v,y)):y.isMeshDepthMaterial?r(v,y):y.isMeshDistanceMaterial?(r(v,y),A(v,y)):y.isMeshNormalMaterial?r(v,y):y.isLineBasicMaterial?(o(v,y),y.isLineDashedMaterial&&l(v,y)):y.isPointsMaterial?c(v,y,P,I):y.isSpriteMaterial?h(v,y):y.isShadowMaterial?(v.color.value.copy(y.color),v.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function r(v,y){v.opacity.value=y.opacity,y.color&&v.diffuse.value.copy(y.color),y.emissive&&v.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(v.map.value=y.map,t(y.map,v.mapTransform)),y.alphaMap&&(v.alphaMap.value=y.alphaMap,t(y.alphaMap,v.alphaMapTransform)),y.bumpMap&&(v.bumpMap.value=y.bumpMap,t(y.bumpMap,v.bumpMapTransform),v.bumpScale.value=y.bumpScale,y.side===ri&&(v.bumpScale.value*=-1)),y.normalMap&&(v.normalMap.value=y.normalMap,t(y.normalMap,v.normalMapTransform),v.normalScale.value.copy(y.normalScale),y.side===ri&&v.normalScale.value.negate()),y.displacementMap&&(v.displacementMap.value=y.displacementMap,t(y.displacementMap,v.displacementMapTransform),v.displacementScale.value=y.displacementScale,v.displacementBias.value=y.displacementBias),y.emissiveMap&&(v.emissiveMap.value=y.emissiveMap,t(y.emissiveMap,v.emissiveMapTransform)),y.specularMap&&(v.specularMap.value=y.specularMap,t(y.specularMap,v.specularMapTransform)),y.alphaTest>0&&(v.alphaTest.value=y.alphaTest);let P=e.get(y),I=P.envMap,E=P.envMapRotation;I&&(v.envMap.value=I,v.envMapRotation.value.setFromMatrix4(u1.makeRotationFromEuler(E)).transpose(),I.isCubeTexture&&I.isRenderTargetTexture===!1&&v.envMapRotation.value.premultiply(mm),v.reflectivity.value=y.reflectivity,v.ior.value=y.ior,v.refractionRatio.value=y.refractionRatio),y.lightMap&&(v.lightMap.value=y.lightMap,v.lightMapIntensity.value=y.lightMapIntensity,t(y.lightMap,v.lightMapTransform)),y.aoMap&&(v.aoMap.value=y.aoMap,v.aoMapIntensity.value=y.aoMapIntensity,t(y.aoMap,v.aoMapTransform))}function o(v,y){v.diffuse.value.copy(y.color),v.opacity.value=y.opacity,y.map&&(v.map.value=y.map,t(y.map,v.mapTransform))}function l(v,y){v.dashSize.value=y.dashSize,v.totalSize.value=y.dashSize+y.gapSize,v.scale.value=y.scale}function c(v,y,P,I){v.diffuse.value.copy(y.color),v.opacity.value=y.opacity,v.size.value=y.size*P,v.scale.value=I*.5,y.map&&(v.map.value=y.map,t(y.map,v.uvTransform)),y.alphaMap&&(v.alphaMap.value=y.alphaMap,t(y.alphaMap,v.alphaMapTransform)),y.alphaTest>0&&(v.alphaTest.value=y.alphaTest)}function h(v,y){v.diffuse.value.copy(y.color),v.opacity.value=y.opacity,v.rotation.value=y.rotation,y.map&&(v.map.value=y.map,t(y.map,v.mapTransform)),y.alphaMap&&(v.alphaMap.value=y.alphaMap,t(y.alphaMap,v.alphaMapTransform)),y.alphaTest>0&&(v.alphaTest.value=y.alphaTest)}function d(v,y){v.specular.value.copy(y.specular),v.shininess.value=Math.max(y.shininess,1e-4)}function p(v,y){y.gradientMap&&(v.gradientMap.value=y.gradientMap)}function m(v,y){v.metalness.value=y.metalness,y.metalnessMap&&(v.metalnessMap.value=y.metalnessMap,t(y.metalnessMap,v.metalnessMapTransform)),v.roughness.value=y.roughness,y.roughnessMap&&(v.roughnessMap.value=y.roughnessMap,t(y.roughnessMap,v.roughnessMapTransform)),y.envMap&&(v.envMapIntensity.value=y.envMapIntensity)}function x(v,y,P){v.ior.value=y.ior,y.sheen>0&&(v.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),v.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(v.sheenColorMap.value=y.sheenColorMap,t(y.sheenColorMap,v.sheenColorMapTransform)),y.sheenRoughnessMap&&(v.sheenRoughnessMap.value=y.sheenRoughnessMap,t(y.sheenRoughnessMap,v.sheenRoughnessMapTransform))),y.clearcoat>0&&(v.clearcoat.value=y.clearcoat,v.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(v.clearcoatMap.value=y.clearcoatMap,t(y.clearcoatMap,v.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(v.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,t(y.clearcoatRoughnessMap,v.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(v.clearcoatNormalMap.value=y.clearcoatNormalMap,t(y.clearcoatNormalMap,v.clearcoatNormalMapTransform),v.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===ri&&v.clearcoatNormalScale.value.negate())),y.dispersion>0&&(v.dispersion.value=y.dispersion),y.iridescence>0&&(v.iridescence.value=y.iridescence,v.iridescenceIOR.value=y.iridescenceIOR,v.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],v.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(v.iridescenceMap.value=y.iridescenceMap,t(y.iridescenceMap,v.iridescenceMapTransform)),y.iridescenceThicknessMap&&(v.iridescenceThicknessMap.value=y.iridescenceThicknessMap,t(y.iridescenceThicknessMap,v.iridescenceThicknessMapTransform))),y.transmission>0&&(v.transmission.value=y.transmission,v.transmissionSamplerMap.value=P.texture,v.transmissionSamplerSize.value.set(P.width,P.height),y.transmissionMap&&(v.transmissionMap.value=y.transmissionMap,t(y.transmissionMap,v.transmissionMapTransform)),v.thickness.value=y.thickness,y.thicknessMap&&(v.thicknessMap.value=y.thicknessMap,t(y.thicknessMap,v.thicknessMapTransform)),v.attenuationDistance.value=y.attenuationDistance,v.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(v.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(v.anisotropyMap.value=y.anisotropyMap,t(y.anisotropyMap,v.anisotropyMapTransform))),v.specularIntensity.value=y.specularIntensity,v.specularColor.value.copy(y.specularColor),y.specularColorMap&&(v.specularColorMap.value=y.specularColorMap,t(y.specularColorMap,v.specularColorMapTransform)),y.specularIntensityMap&&(v.specularIntensityMap.value=y.specularIntensityMap,t(y.specularIntensityMap,v.specularIntensityMapTransform))}function _(v,y){y.matcap&&(v.matcap.value=y.matcap)}function A(v,y){let P=e.get(y).light;v.referencePosition.value.setFromMatrixPosition(P.matrixWorld),v.nearDistance.value=P.shadow.camera.near,v.farDistance.value=P.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function d1(n,e,t,i){let s={},r={},o=[],l=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,R){let L=R.program;i.uniformBlockBinding(E,L)}function h(E,R){let L=s[E.id];L===void 0&&(v(E),L=d(E),s[E.id]=L,E.addEventListener("dispose",P));let V=R.program;i.updateUBOMapping(E,V);let M=e.render.frame;r[E.id]!==M&&(m(E),r[E.id]=M)}function d(E){let R=p();E.__bindingPointIndex=R;let L=n.createBuffer(),V=E.__size,M=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,L),n.bufferData(n.UNIFORM_BUFFER,V,M),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,R,L),L}function p(){for(let E=0;E<l;E++)if(o.indexOf(E)===-1)return o.push(E),E;return yt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(E){let R=s[E.id],L=E.uniforms,V=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,R);for(let M=0,k=L.length;M<k;M++){let X=L[M];if(Array.isArray(X))for(let W=0,F=X.length;W<F;W++)x(X[W],M,W,V);else x(X,M,0,V)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function x(E,R,L,V){if(A(E,R,L,V)===!0){let M=E.__offset,k=E.value;if(Array.isArray(k)){let X=0;for(let W=0;W<k.length;W++){let F=k[W],me=y(F);_(F,E.__data,X),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(X+=me.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(k,E.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,M,E.__data)}}function _(E,R,L){typeof E=="number"||typeof E=="boolean"?R[0]=E:E.isMatrix3?(R[0]=E.elements[0],R[1]=E.elements[1],R[2]=E.elements[2],R[3]=0,R[4]=E.elements[3],R[5]=E.elements[4],R[6]=E.elements[5],R[7]=0,R[8]=E.elements[6],R[9]=E.elements[7],R[10]=E.elements[8],R[11]=0):ArrayBuffer.isView(E)?R.set(new E.constructor(E.buffer,E.byteOffset,R.length)):E.toArray(R,L)}function A(E,R,L,V){let M=E.value,k=R+"_"+L;if(V[k]===void 0)return typeof M=="number"||typeof M=="boolean"?V[k]=M:ArrayBuffer.isView(M)?V[k]=M.slice():V[k]=M.clone(),!0;{let X=V[k];if(typeof M=="number"||typeof M=="boolean"){if(X!==M)return V[k]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(X.equals(M)===!1)return X.copy(M),!0}}return!1}function v(E){let R=E.uniforms,L=0,V=16;for(let k=0,X=R.length;k<X;k++){let W=Array.isArray(R[k])?R[k]:[R[k]];for(let F=0,me=W.length;F<me;F++){let K=W[F],Q=Array.isArray(K.value)?K.value:[K.value];for(let ye=0,de=Q.length;ye<de;ye++){let Me=Q[ye],Ae=y(Me),ne=L%V,Ye=ne%Ae.boundary,tt=ne+Ye;L+=Ye,tt!==0&&V-tt<Ae.storage&&(L+=V-tt),K.__data=new Float32Array(Ae.storage/Float32Array.BYTES_PER_ELEMENT),K.__offset=L,L+=Ae.storage}}}let M=L%V;return M>0&&(L+=V-M),E.__size=L,E.__cache={},this}function y(E){let R={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(R.boundary=4,R.storage=4):E.isVector2?(R.boundary=8,R.storage=8):E.isVector3||E.isColor?(R.boundary=16,R.storage=12):E.isVector4?(R.boundary=16,R.storage=16):E.isMatrix3?(R.boundary=48,R.storage=48):E.isMatrix4?(R.boundary=64,R.storage=64):E.isTexture?_t("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(E)?(R.boundary=16,R.storage=E.byteLength):_t("WebGLRenderer: Unsupported uniform value type.",E),R}function P(E){let R=E.target;R.removeEventListener("dispose",P);let L=o.indexOf(R.__bindingPointIndex);o.splice(L,1),n.deleteBuffer(s[R.id]),delete s[R.id],delete r[R.id]}function I(){for(let E in s)n.deleteBuffer(s[E]);o=[],s={},r={}}return{bind:c,update:h,dispose:I}}var f1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),cs=null;function p1(){return cs===null&&(cs=new jl(f1,16,16,sr,as),cs.name="DFG_LUT",cs.minFilter=Vn,cs.magFilter=Vn,cs.wrapS=ns,cs.wrapT=ns,cs.generateMipmaps=!1,cs.needsUpdate=!0),cs}var ru=class{constructor(e={}){let{canvas:t=Fp(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:l=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:h=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:m=!1,outputBufferType:x=Ti}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=o;let A=x,v=new Set([Sc,bc,yc]),y=new Set([Ti,$i,bo,So,xc,vc]),P=new Uint32Array(4),I=new Int32Array(4),E=new J,R=null,L=null,V=[],M=[],k=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Xi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let X=this,W=!1,F=null,me=null,K=null,Q=null;this._outputColorSpace=bi;let ye=0,de=0,Me=null,Ae=-1,ne=null,Ye=new rn,tt=new rn,zt=null,ze=new Pt(0),je=0,ce=t.width,xe=t.height,Te=1,xt=null,mt=null,Qe=new rn(0,0,ce,xe),on=new rn(0,0,ce,xe),Dt=!1,Jt=new da,St=!1,Vt=!1,D=new vn,Ft=new J,Zt=new rn,en={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},an=!1;function hn(){return Me===null?Te:1}let Z=i;function Ln(T,j){return t.getContext(T,j)}try{let T={alpha:!0,depth:s,stencil:r,antialias:l,premultipliedAlpha:c,preserveDrawingBuffer:h,powerPreference:d,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"185"}`),t.addEventListener("webglcontextlost",Ot,!1),t.addEventListener("webglcontextrestored",tn,!1),t.addEventListener("webglcontextcreationerror",fi,!1),Z===null){let j="webgl2";if(Z=Ln(j,T),Z===null)throw Ln(j)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(T){throw yt("WebGLRenderer: "+T.message),T}let Ut,U,b,ee,te,ge,Ce,Ve,ie,ue,He,dt,Ie,Oe,oe,Ne,Je,$,Ue,ve,Ge,De,we;function at(){Ut=new by(Z),Ut.init(),Ge=new a1(Z,Ut),U=new fy(Z,Ut,e,Ge),b=new r1(Z,Ut),U.reversedDepthBuffer&&m&&b.buffers.depth.setReversed(!0),me=Z.createFramebuffer(),K=Z.createFramebuffer(),Q=Z.createFramebuffer(),ee=new wy(Z),te=new Xb,ge=new o1(Z,Ut,b,te,U,Ge,ee),Ce=new yy(X),Ve=new R_(Z),De=new hy(Z,Ve),ie=new Sy(Z,Ve,ee,De),ue=new Ay(Z,ie,Ve,De,ee),$=new Ey(Z,U,ge),oe=new py(te),He=new Wb(X,Ce,Ut,U,De,oe),dt=new h1(X,te),Ie=new qb,Oe=new Qb(Ut),Je=new uy(X,Ce,b,ue,_,c),Ne=new s1(X,ue,U),we=new d1(Z,ee,U,b),Ue=new dy(Z,Ut,ee),ve=new My(Z,Ut,ee),ee.programs=He.programs,X.capabilities=U,X.extensions=Ut,X.properties=te,X.renderLists=Ie,X.shadowMap=Ne,X.state=b,X.info=ee}at(),A!==Ti&&(k=new Ry(A,t.width,t.height,l,s,r));let ot=new md(X,Z);this.xr=ot,this.getContext=function(){return Z},this.getContextAttributes=function(){return Z.getContextAttributes()},this.forceContextLoss=function(){let T=Ut.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=Ut.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return Te},this.setPixelRatio=function(T){T!==void 0&&(Te=T,this.setSize(ce,xe,!1))},this.getSize=function(T){return T.set(ce,xe)},this.setSize=function(T,j,le=!0){if(ot.isPresenting){_t("WebGLRenderer: Can't change size while VR device is presenting.");return}ce=T,xe=j,t.width=Math.floor(T*Te),t.height=Math.floor(j*Te),le===!0&&(t.style.width=T+"px",t.style.height=j+"px"),k!==null&&k.setSize(t.width,t.height),this.setViewport(0,0,T,j)},this.getDrawingBufferSize=function(T){return T.set(ce*Te,xe*Te).floor()},this.setDrawingBufferSize=function(T,j,le){ce=T,xe=j,Te=le,t.width=Math.floor(T*le),t.height=Math.floor(j*le),this.setViewport(0,0,T,j)},this.setEffects=function(T){if(A===Ti){yt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let j=0;j<T.length;j++)if(T[j].isOutputPass===!0){_t("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}k.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(Ye)},this.getViewport=function(T){return T.copy(Qe)},this.setViewport=function(T,j,le,ae){T.isVector4?Qe.set(T.x,T.y,T.z,T.w):Qe.set(T,j,le,ae),b.viewport(Ye.copy(Qe).multiplyScalar(Te).round())},this.getScissor=function(T){return T.copy(on)},this.setScissor=function(T,j,le,ae){T.isVector4?on.set(T.x,T.y,T.z,T.w):on.set(T,j,le,ae),b.scissor(tt.copy(on).multiplyScalar(Te).round())},this.getScissorTest=function(){return Dt},this.setScissorTest=function(T){b.setScissorTest(Dt=T)},this.setOpaqueSort=function(T){xt=T},this.setTransparentSort=function(T){mt=T},this.getClearColor=function(T){return T.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor(...arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha(...arguments)},this.clear=function(T=!0,j=!0,le=!0){let ae=0;if(T){let he=!1;if(Me!==null){let Be=Me.texture.format;he=v.has(Be)}if(he){let Be=Me.texture.type,Ke=y.has(Be),$e=Je.getClearColor(),ct=Je.getClearAlpha(),ft=$e.r,At=$e.g,wt=$e.b;Ke?(P[0]=ft,P[1]=At,P[2]=wt,P[3]=ct,Z.clearBufferuiv(Z.COLOR,0,P)):(I[0]=ft,I[1]=At,I[2]=wt,I[3]=ct,Z.clearBufferiv(Z.COLOR,0,I))}else ae|=Z.COLOR_BUFFER_BIT}j&&(ae|=Z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),le&&(ae|=Z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ae!==0&&Z.clear(ae)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),F=T},this.dispose=function(){t.removeEventListener("webglcontextlost",Ot,!1),t.removeEventListener("webglcontextrestored",tn,!1),t.removeEventListener("webglcontextcreationerror",fi,!1),Je.dispose(),Ie.dispose(),Oe.dispose(),te.dispose(),Ce.dispose(),ue.dispose(),De.dispose(),we.dispose(),He.dispose(),ot.dispose(),ot.removeEventListener("sessionstart",Do),ot.removeEventListener("sessionend",Io),Ri.stop()};function Ot(T){T.preventDefault(),oa("WebGLRenderer: Context Lost."),W=!0}function tn(){oa("WebGLRenderer: Context Restored."),W=!1;let T=ee.autoReset,j=Ne.enabled,le=Ne.autoUpdate,ae=Ne.needsUpdate,he=Ne.type;at(),ee.autoReset=T,Ne.enabled=j,Ne.autoUpdate=le,Ne.needsUpdate=ae,Ne.type=he}function fi(T){yt("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function dn(T){let j=T.target;j.removeEventListener("dispose",dn),ur(j)}function ur(T){Po(T),te.remove(T)}function Po(T){let j=te.get(T).programs;j!==void 0&&(j.forEach(function(le){He.releaseProgram(le)}),T.isShaderMaterial&&He.releaseShaderCache(T))}this.renderBufferDirect=function(T,j,le,ae,he,Be){j===null&&(j=en);let Ke=he.isMesh&&he.matrixWorld.determinantAffine()<0,$e=_s(T,j,le,ae,he);b.setMaterial(ae,Ke);let ct=le.index,ft=1;if(ae.wireframe===!0){if(ct=ie.getWireframeAttribute(le),ct===void 0)return;ft=2}let At=le.drawRange,wt=le.attributes.position,ut=At.start*ft,$t=(At.start+At.count)*ft;Be!==null&&(ut=Math.max(ut,Be.start*ft),$t=Math.min($t,(Be.start+Be.count)*ft)),ct!==null?(ut=Math.max(ut,0),$t=Math.min($t,ct.count)):wt!=null&&(ut=Math.max(ut,0),$t=Math.min($t,wt.count));let yn=$t-ut;if(yn<0||yn===1/0)return;De.setup(he,ae,$e,le,ct);let gn,qt=Ue;if(ct!==null&&(gn=Ve.get(ct),qt=ve,qt.setIndex(gn)),he.isMesh)ae.wireframe===!0?(b.setLineWidth(ae.wireframeLinewidth*hn()),qt.setMode(Z.LINES)):qt.setMode(Z.TRIANGLES);else if(he.isLine){let En=ae.linewidth;En===void 0&&(En=1),b.setLineWidth(En*hn()),he.isLineSegments?qt.setMode(Z.LINES):he.isLineLoop?qt.setMode(Z.LINE_LOOP):qt.setMode(Z.LINE_STRIP)}else he.isPoints?qt.setMode(Z.POINTS):he.isSprite&&qt.setMode(Z.TRIANGLES);if(he.isBatchedMesh)if(Ut.get("WEBGL_multi_draw"))qt.renderMultiDraw(he._multiDrawStarts,he._multiDrawCounts,he._multiDrawCount);else{let En=he._multiDrawStarts,Ze=he._multiDrawCounts,Bn=he._multiDrawCount,Ht=ct?Ve.get(ct).bytesPerElement:1,ai=te.get(ae).currentProgram.getUniforms();for(let Pi=0;Pi<Bn;Pi++)ai.setValue(Z,"_gl_DrawID",Pi),qt.render(En[Pi]/Ht,Ze[Pi])}else if(he.isInstancedMesh)qt.renderInstances(ut,yn,he.count);else if(le.isInstancedBufferGeometry){let En=le._maxInstanceCount!==void 0?le._maxInstanceCount:1/0,Ze=Math.min(le.instanceCount,En);qt.renderInstances(ut,yn,Ze)}else qt.render(ut,yn)};function wn(T,j,le){T.transparent===!0&&T.side===hi&&T.forceSinglePass===!1?(T.side=ri,T.needsUpdate=!0,Fs(T,j,le),T.side=Ds,T.needsUpdate=!0,Fs(T,j,le),T.side=hi):Fs(T,j,le)}this.compile=function(T,j,le=null){le===null&&(le=T),L=Oe.get(le),L.init(j),M.push(L),le.traverseVisible(function(he){he.isLight&&he.layers.test(j.layers)&&(L.pushLight(he),he.castShadow&&L.pushShadow(he))}),T!==le&&T.traverseVisible(function(he){he.isLight&&he.layers.test(j.layers)&&(L.pushLight(he),he.castShadow&&L.pushShadow(he))}),L.setupLights();let ae=new Set;return T.traverse(function(he){if(!(he.isMesh||he.isPoints||he.isLine||he.isSprite))return;let Be=he.material;if(Be)if(Array.isArray(Be))for(let Ke=0;Ke<Be.length;Ke++){let $e=Be[Ke];wn($e,le,he),ae.add($e)}else wn(Be,le,he),ae.add(Be)}),L=M.pop(),ae},this.compileAsync=function(T,j,le=null){let ae=this.compile(T,j,le);return new Promise(he=>{function Be(){if(ae.forEach(function(Ke){te.get(Ke).currentProgram.isReady()&&ae.delete(Ke)}),ae.size===0){he(T);return}setTimeout(Be,10)}Ut.get("KHR_parallel_shader_compile")!==null?Be():setTimeout(Be,10)})};let kr=null;function $a(T){kr&&kr(T)}function Do(){Ri.stop()}function Io(){Ri.start()}let Ri=new cm;Ri.setAnimationLoop($a),typeof self<"u"&&Ri.setContext(self),this.setAnimationLoop=function(T){kr=T,ot.setAnimationLoop(T),T===null?Ri.stop():Ri.start()},ot.addEventListener("sessionstart",Do),ot.addEventListener("sessionend",Io),this.render=function(T,j){if(j!==void 0&&j.isCamera!==!0){yt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(W===!0)return;F!==null&&F.renderStart(T,j);let le=ot.enabled===!0&&ot.isPresenting===!0,ae=k!==null&&(Me===null||le)&&k.begin(X,Me);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),ot.enabled===!0&&ot.isPresenting===!0&&(k===null||k.isCompositing()===!1)&&(ot.cameraAutoUpdate===!0&&ot.updateCamera(j),j=ot.getCamera()),T.isScene===!0&&T.onBeforeRender(X,T,j,Me),L=Oe.get(T,M.length),L.init(j),L.state.textureUnits=ge.getTextureUnits(),M.push(L),D.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),Jt.setFromProjectionMatrix(D,Vi,j.reversedDepth),Vt=this.localClippingEnabled,St=oe.init(this.clippingPlanes,Vt),R=Ie.get(T,V.length),R.init(),V.push(R),ot.enabled===!0&&ot.isPresenting===!0){let Ke=X.xr.getDepthSensingMesh();Ke!==null&&Ci(Ke,j,-1/0,X.sortObjects)}Ci(T,j,0,X.sortObjects),R.finish(),X.sortObjects===!0&&R.sort(xt,mt,j.reversedDepth),an=ot.enabled===!1||ot.isPresenting===!1||ot.hasDepthSensing()===!1,an&&Je.addToRenderList(R,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),St===!0&&oe.beginShadows();let he=L.state.shadowsArray;if(Ne.render(he,T,j),St===!0&&oe.endShadows(),(ae&&k.hasRenderPass())===!1){let Ke=R.opaque,$e=R.transmissive;if(L.setupLights(),j.isArrayCamera){let ct=j.cameras;if($e.length>0)for(let ft=0,At=ct.length;ft<At;ft++){let wt=ct[ft];qa(Ke,$e,T,wt)}an&&Je.render(T);for(let ft=0,At=ct.length;ft<At;ft++){let wt=ct[ft];Lo(R,T,wt,wt.viewport)}}else $e.length>0&&qa(Ke,$e,T,j),an&&Je.render(T),Lo(R,T,j)}Me!==null&&de===0&&(ge.updateMultisampleRenderTarget(Me),ge.updateRenderTargetMipmap(Me)),ae&&k.end(X),T.isScene===!0&&T.onAfterRender(X,T,j),De.resetDefaultState(),Ae=-1,ne=null,M.pop(),M.length>0?(L=M[M.length-1],ge.setTextureUnits(L.state.textureUnits),St===!0&&oe.setGlobalState(X.clippingPlanes,L.state.camera)):L=null,V.pop(),V.length>0?R=V[V.length-1]:R=null,F!==null&&F.renderEnd()};function Ci(T,j,le,ae){if(T.visible===!1)return;if(T.layers.test(j.layers)){if(T.isGroup)le=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(j);else if(T.isLightProbeGrid)L.pushLightProbeGrid(T);else if(T.isLight)L.pushLight(T),T.castShadow&&L.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Jt.intersectsSprite(T)){ae&&Zt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(D);let Ke=ue.update(T),$e=T.material;$e.visible&&R.push(T,Ke,$e,le,Zt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Jt.intersectsObject(T))){let Ke=ue.update(T),$e=T.material;if(ae&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Zt.copy(T.boundingSphere.center)):(Ke.boundingSphere===null&&Ke.computeBoundingSphere(),Zt.copy(Ke.boundingSphere.center)),Zt.applyMatrix4(T.matrixWorld).applyMatrix4(D)),Array.isArray($e)){let ct=Ke.groups;for(let ft=0,At=ct.length;ft<At;ft++){let wt=ct[ft],ut=$e[wt.materialIndex];ut&&ut.visible&&R.push(T,Ke,ut,le,Zt.z,wt)}}else $e.visible&&R.push(T,Ke,$e,le,Zt.z,null)}}let Be=T.children;for(let Ke=0,$e=Be.length;Ke<$e;Ke++)Ci(Be[Ke],j,le,ae)}function Lo(T,j,le,ae){let{opaque:he,transmissive:Be,transparent:Ke}=T;L.setupLightsView(le),St===!0&&oe.setGlobalState(X.clippingPlanes,le),ae&&b.viewport(Ye.copy(ae)),he.length>0&&Xt(he,j,le),Be.length>0&&Xt(Be,j,le),Ke.length>0&&Xt(Ke,j,le),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function qa(T,j,le,ae){if((le.isScene===!0?le.overrideMaterial:null)!==null)return;if(L.state.transmissionRenderTarget[ae.id]===void 0){let ut=Ut.has("EXT_color_buffer_half_float")||Ut.has("EXT_color_buffer_float");L.state.transmissionRenderTarget[ae.id]=new Mi(1,1,{generateMipmaps:!0,type:ut?as:Ti,minFilter:nr,samples:Math.max(4,U.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Gt.workingColorSpace})}let Be=L.state.transmissionRenderTarget[ae.id],Ke=ae.viewport||Ye;Be.setSize(Ke.z*X.transmissionResolutionScale,Ke.w*X.transmissionResolutionScale);let $e=X.getRenderTarget(),ct=X.getActiveCubeFace(),ft=X.getActiveMipmapLevel();X.setRenderTarget(Be),X.getClearColor(ze),je=X.getClearAlpha(),je<1&&X.setClearColor(16777215,.5),X.clear(),an&&Je.render(le);let At=X.toneMapping;X.toneMapping=Xi;let wt=ae.viewport;if(ae.viewport!==void 0&&(ae.viewport=void 0),L.setupLightsView(ae),St===!0&&oe.setGlobalState(X.clippingPlanes,ae),Xt(T,le,ae),ge.updateMultisampleRenderTarget(Be),ge.updateRenderTargetMipmap(Be),Ut.has("WEBGL_multisampled_render_to_texture")===!1){let ut=!1;for(let $t=0,yn=j.length;$t<yn;$t++){let gn=j[$t],{object:qt,geometry:En,material:Ze,group:Bn}=gn;if(Ze.side===hi&&qt.layers.test(ae.layers)){let Ht=Ze.side;Ze.side=ri,Ze.needsUpdate=!0,ko(qt,le,ae,En,Ze,Bn),Ze.side=Ht,Ze.needsUpdate=!0,ut=!0}}ut===!0&&(ge.updateMultisampleRenderTarget(Be),ge.updateRenderTargetMipmap(Be))}X.setRenderTarget($e,ct,ft),X.setClearColor(ze,je),wt!==void 0&&(ae.viewport=wt),X.toneMapping=At}function Xt(T,j,le){let ae=j.isScene===!0?j.overrideMaterial:null;for(let he=0,Be=T.length;he<Be;he++){let Ke=T[he],{object:$e,geometry:ct,group:ft}=Ke,At=Ke.material;At.allowOverride===!0&&ae!==null&&(At=ae),$e.layers.test(le.layers)&&ko($e,j,le,ct,At,ft)}}function ko(T,j,le,ae,he,Be){T.onBeforeRender(X,j,le,ae,he,Be),T.modelViewMatrix.multiplyMatrices(le.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),he.onBeforeRender(X,j,le,ae,T,Be),he.transparent===!0&&he.side===hi&&he.forceSinglePass===!1?(he.side=ri,he.needsUpdate=!0,X.renderBufferDirect(le,j,ae,he,T,Be),he.side=Ds,he.needsUpdate=!0,X.renderBufferDirect(le,j,ae,he,T,Be),he.side=hi):X.renderBufferDirect(le,j,ae,he,T,Be),T.onAfterRender(X,j,le,ae,he,Be)}function Fs(T,j,le){j.isScene!==!0&&(j=en);let ae=te.get(T),he=L.state.lights,Be=L.state.shadowsArray,Ke=he.state.version,$e=He.getParameters(T,he.state,Be,j,le,L.state.lightProbeGridArray),ct=He.getProgramCacheKey($e),ft=ae.programs;ae.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?j.environment:null,ae.fog=j.fog;let At=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;ae.envMap=Ce.get(T.envMap||ae.environment,At),ae.envMapRotation=ae.environment!==null&&T.envMap===null?j.environmentRotation:T.envMapRotation,ft===void 0&&(T.addEventListener("dispose",dn),ft=new Map,ae.programs=ft);let wt=ft.get(ct);if(wt!==void 0){if(ae.currentProgram===wt&&ae.lightsStateVersion===Ke)return Ya(T,$e),wt}else $e.uniforms=He.getUniforms(T),F!==null&&T.isNodeMaterial&&F.build(T,le,$e),T.onBeforeCompile($e,X),wt=He.acquireProgram($e,ct),ft.set(ct,wt),ae.uniforms=$e.uniforms;let ut=ae.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(ut.clippingPlanes=oe.uniform),Ya(T,$e),ae.needsLights=Eu(T),ae.lightsStateVersion=Ke,ae.needsLights&&(ut.ambientLightColor.value=he.state.ambient,ut.lightProbe.value=he.state.probe,ut.directionalLights.value=he.state.directional,ut.directionalLightShadows.value=he.state.directionalShadow,ut.spotLights.value=he.state.spot,ut.spotLightShadows.value=he.state.spotShadow,ut.rectAreaLights.value=he.state.rectArea,ut.ltc_1.value=he.state.rectAreaLTC1,ut.ltc_2.value=he.state.rectAreaLTC2,ut.pointLights.value=he.state.point,ut.pointLightShadows.value=he.state.pointShadow,ut.hemisphereLights.value=he.state.hemi,ut.directionalShadowMatrix.value=he.state.directionalShadowMatrix,ut.spotLightMatrix.value=he.state.spotLightMatrix,ut.spotLightMap.value=he.state.spotLightMap,ut.pointShadowMatrix.value=he.state.pointShadowMatrix),ae.lightProbeGrid=L.state.lightProbeGridArray.length>0,ae.currentProgram=wt,ae.uniformsList=null,wt}function Fr(T){if(T.uniformsList===null){let j=T.currentProgram.getUniforms();T.uniformsList=wo.seqWithValue(j.seq,T.uniforms)}return T.uniformsList}function Ya(T,j){let le=te.get(T);le.outputColorSpace=j.outputColorSpace,le.batching=j.batching,le.batchingColor=j.batchingColor,le.instancing=j.instancing,le.instancingColor=j.instancingColor,le.instancingMorph=j.instancingMorph,le.skinning=j.skinning,le.morphTargets=j.morphTargets,le.morphNormals=j.morphNormals,le.morphColors=j.morphColors,le.morphTargetsCount=j.morphTargetsCount,le.numClippingPlanes=j.numClippingPlanes,le.numIntersection=j.numClipIntersection,le.vertexAlphas=j.vertexAlphas,le.vertexTangents=j.vertexTangents,le.toneMapping=j.toneMapping}function Nr(T,j){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;E.setFromMatrixPosition(j.matrixWorld);for(let le=0,ae=T.length;le<ae;le++){let he=T[le];if(he.texture!==null&&he.boundingBox.containsPoint(E))return he}return null}function _s(T,j,le,ae,he){j.isScene!==!0&&(j=en),ge.resetTextureUnits();let Be=j.fog,Ke=ae.isMeshStandardMaterial||ae.isMeshLambertMaterial||ae.isMeshPhongMaterial?j.environment:null,$e=Me===null?X.outputColorSpace:Me.isXRRenderTarget===!0?Me.texture.colorSpace:Gt.workingColorSpace,ct=ae.isMeshStandardMaterial||ae.isMeshLambertMaterial&&!ae.envMap||ae.isMeshPhongMaterial&&!ae.envMap,ft=Ce.get(ae.envMap||Ke,ct),At=ae.vertexColors===!0&&!!le.attributes.color&&le.attributes.color.itemSize===4,wt=!!le.attributes.tangent&&(!!ae.normalMap||ae.anisotropy>0),ut=!!le.morphAttributes.position,$t=!!le.morphAttributes.normal,yn=!!le.morphAttributes.color,gn=Xi;ae.toneMapped&&(Me===null||Me.isXRRenderTarget===!0)&&(gn=X.toneMapping);let qt=le.morphAttributes.position||le.morphAttributes.normal||le.morphAttributes.color,En=qt!==void 0?qt.length:0,Ze=te.get(ae),Bn=L.state.lights;if(St===!0&&(Vt===!0||T!==ne)){let ln=T===ne&&ae.id===Ae;oe.setState(ae,T,ln)}let Ht=!1;ae.version===Ze.__version?(Ze.needsLights&&Ze.lightsStateVersion!==Bn.state.version||Ze.outputColorSpace!==$e||he.isBatchedMesh&&Ze.batching===!1||!he.isBatchedMesh&&Ze.batching===!0||he.isBatchedMesh&&Ze.batchingColor===!0&&he.colorTexture===null||he.isBatchedMesh&&Ze.batchingColor===!1&&he.colorTexture!==null||he.isInstancedMesh&&Ze.instancing===!1||!he.isInstancedMesh&&Ze.instancing===!0||he.isSkinnedMesh&&Ze.skinning===!1||!he.isSkinnedMesh&&Ze.skinning===!0||he.isInstancedMesh&&Ze.instancingColor===!0&&he.instanceColor===null||he.isInstancedMesh&&Ze.instancingColor===!1&&he.instanceColor!==null||he.isInstancedMesh&&Ze.instancingMorph===!0&&he.morphTexture===null||he.isInstancedMesh&&Ze.instancingMorph===!1&&he.morphTexture!==null||Ze.envMap!==ft||ae.fog===!0&&Ze.fog!==Be||Ze.numClippingPlanes!==void 0&&(Ze.numClippingPlanes!==oe.numPlanes||Ze.numIntersection!==oe.numIntersection)||Ze.vertexAlphas!==At||Ze.vertexTangents!==wt||Ze.morphTargets!==ut||Ze.morphNormals!==$t||Ze.morphColors!==yn||Ze.toneMapping!==gn||Ze.morphTargetsCount!==En||!!Ze.lightProbeGrid!=L.state.lightProbeGridArray.length>0)&&(Ht=!0):(Ht=!0,Ze.__version=ae.version);let ai=Ze.currentProgram;Ht===!0&&(ai=Fs(ae,j,he),F&&ae.isNodeMaterial&&F.onUpdateProgram(ae,ai,Ze));let Pi=!1,fn=!1,li=!1,Wt=ai.getUniforms(),pn=Ze.uniforms;if(b.useProgram(ai.program)&&(Pi=!0,fn=!0,li=!0),ae.id!==Ae&&(Ae=ae.id,fn=!0),Ze.needsLights){let ln=Nr(L.state.lightProbeGridArray,he);Ze.lightProbeGrid!==ln&&(Ze.lightProbeGrid=ln,fn=!0)}if(Pi||ne!==T){b.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Wt.setValue(Z,"projectionMatrix",T.projectionMatrix),Wt.setValue(Z,"viewMatrix",T.matrixWorldInverse);let Ji=Wt.map.cameraPosition;Ji!==void 0&&Ji.setValue(Z,Ft.setFromMatrixPosition(T.matrixWorld)),U.logarithmicDepthBuffer&&Wt.setValue(Z,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(ae.isMeshPhongMaterial||ae.isMeshToonMaterial||ae.isMeshLambertMaterial||ae.isMeshBasicMaterial||ae.isMeshStandardMaterial||ae.isShaderMaterial)&&Wt.setValue(Z,"isOrthographic",T.isOrthographicCamera===!0),ne!==T&&(ne=T,fn=!0,li=!0)}if(Ze.needsLights&&(Bn.state.directionalShadowMap.length>0&&Wt.setValue(Z,"directionalShadowMap",Bn.state.directionalShadowMap,ge),Bn.state.spotShadowMap.length>0&&Wt.setValue(Z,"spotShadowMap",Bn.state.spotShadowMap,ge),Bn.state.pointShadowMap.length>0&&Wt.setValue(Z,"pointShadowMap",Bn.state.pointShadowMap,ge)),he.isSkinnedMesh){Wt.setOptional(Z,he,"bindMatrix"),Wt.setOptional(Z,he,"bindMatrixInverse");let ln=he.skeleton;ln&&(ln.boneTexture===null&&ln.computeBoneTexture(),Wt.setValue(Z,"boneTexture",ln.boneTexture,ge))}he.isBatchedMesh&&(Wt.setOptional(Z,he,"batchingTexture"),Wt.setValue(Z,"batchingTexture",he._matricesTexture,ge),Wt.setOptional(Z,he,"batchingIdTexture"),Wt.setValue(Z,"batchingIdTexture",he._indirectTexture,ge),Wt.setOptional(Z,he,"batchingColorTexture"),he._colorsTexture!==null&&Wt.setValue(Z,"batchingColorTexture",he._colorsTexture,ge));let pi=le.morphAttributes;if((pi.position!==void 0||pi.normal!==void 0||pi.color!==void 0)&&$.update(he,le,ai),(fn||Ze.receiveShadow!==he.receiveShadow)&&(Ze.receiveShadow=he.receiveShadow,Wt.setValue(Z,"receiveShadow",he.receiveShadow)),(ae.isMeshStandardMaterial||ae.isMeshLambertMaterial||ae.isMeshPhongMaterial)&&ae.envMap===null&&j.environment!==null&&(pn.envMapIntensity.value=j.environmentIntensity),pn.dfgLUT!==void 0&&(pn.dfgLUT.value=p1()),fn){if(Wt.setValue(Z,"toneMappingExposure",X.toneMappingExposure),Ze.needsLights&&wu(pn,li),Be&&ae.fog===!0&&dt.refreshFogUniforms(pn,Be),dt.refreshMaterialUniforms(pn,ae,Te,xe,L.state.transmissionRenderTarget[T.id]),Ze.needsLights&&Ze.lightProbeGrid){let ln=Ze.lightProbeGrid;pn.probesSH.value=ln.texture,pn.probesMin.value.copy(ln.boundingBox.min),pn.probesMax.value.copy(ln.boundingBox.max),pn.probesResolution.value.copy(ln.resolution)}wo.upload(Z,Fr(Ze),pn,ge)}if(ae.isShaderMaterial&&ae.uniformsNeedUpdate===!0&&(wo.upload(Z,Fr(Ze),pn,ge),ae.uniformsNeedUpdate=!1),ae.isSpriteMaterial&&Wt.setValue(Z,"center",he.center),Wt.setValue(Z,"modelViewMatrix",he.modelViewMatrix),Wt.setValue(Z,"normalMatrix",he.normalMatrix),Wt.setValue(Z,"modelMatrix",he.matrixWorld),ae.uniformsGroups!==void 0){let ln=ae.uniformsGroups;for(let Ji=0,mi=ln.length;Ji<mi;Ji++){let gi=ln[Ji];we.update(gi,ai),we.bind(gi,ai)}}return ai}function wu(T,j){T.ambientLightColor.needsUpdate=j,T.lightProbe.needsUpdate=j,T.directionalLights.needsUpdate=j,T.directionalLightShadows.needsUpdate=j,T.pointLights.needsUpdate=j,T.pointLightShadows.needsUpdate=j,T.spotLights.needsUpdate=j,T.spotLightShadows.needsUpdate=j,T.rectAreaLights.needsUpdate=j,T.hemisphereLights.needsUpdate=j}function Eu(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return ye},this.getActiveMipmapLevel=function(){return de},this.getRenderTarget=function(){return Me},this.setRenderTargetTextures=function(T,j,le){let ae=te.get(T);ae.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,ae.__autoAllocateDepthBuffer===!1&&(ae.__useRenderToTexture=!1),te.get(T.texture).__webglTexture=j,te.get(T.depthTexture).__webglTexture=ae.__autoAllocateDepthBuffer?void 0:le,ae.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,j){let le=te.get(T);le.__webglFramebuffer=j,le.__useDefaultFramebuffer=j===void 0},this.setRenderTarget=function(T,j=0,le=0){Me=T,ye=j,de=le;let ae=null,he=!1,Be=!1;if(T){let $e=te.get(T);if($e.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(Z.FRAMEBUFFER,$e.__webglFramebuffer),Ye.copy(T.viewport),tt.copy(T.scissor),zt=T.scissorTest,b.viewport(Ye),b.scissor(tt),b.setScissorTest(zt),Ae=-1;return}else if($e.__webglFramebuffer===void 0)ge.setupRenderTarget(T);else if($e.__hasExternalTextures)ge.rebindTextures(T,te.get(T.texture).__webglTexture,te.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let At=T.depthTexture;if($e.__boundDepthTexture!==At){if(At!==null&&te.has(At)&&(T.width!==At.image.width||T.height!==At.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ge.setupDepthRenderbuffer(T)}}let ct=T.texture;(ct.isData3DTexture||ct.isDataArrayTexture||ct.isCompressedArrayTexture)&&(Be=!0);let ft=te.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(ft[j])?ae=ft[j][le]:ae=ft[j],he=!0):T.samples>0&&ge.useMultisampledRTT(T)===!1?ae=te.get(T).__webglMultisampledFramebuffer:Array.isArray(ft)?ae=ft[le]:ae=ft,Ye.copy(T.viewport),tt.copy(T.scissor),zt=T.scissorTest}else Ye.copy(Qe).multiplyScalar(Te).floor(),tt.copy(on).multiplyScalar(Te).floor(),zt=Dt;if(le!==0&&(ae=me),b.bindFramebuffer(Z.FRAMEBUFFER,ae)&&b.drawBuffers(T,ae),b.viewport(Ye),b.scissor(tt),b.setScissorTest(zt),he){let $e=te.get(T.texture);Z.framebufferTexture2D(Z.FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_CUBE_MAP_POSITIVE_X+j,$e.__webglTexture,le)}else if(Be){let $e=j;for(let ct=0;ct<T.textures.length;ct++){let ft=te.get(T.textures[ct]);Z.framebufferTextureLayer(Z.FRAMEBUFFER,Z.COLOR_ATTACHMENT0+ct,ft.__webglTexture,le,$e)}}else if(T!==null&&le!==0){let $e=te.get(T.texture);Z.framebufferTexture2D(Z.FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_2D,$e.__webglTexture,le)}Ae=-1},this.readRenderTargetPixels=function(T,j,le,ae,he,Be,Ke,$e=0){if(!(T&&T.isWebGLRenderTarget)){yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ct=te.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ke!==void 0&&(ct=ct[Ke]),ct){b.bindFramebuffer(Z.FRAMEBUFFER,ct);try{let ft=T.textures[$e],At=ft.format,wt=ft.type;if(T.textures.length>1&&Z.readBuffer(Z.COLOR_ATTACHMENT0+$e),!U.textureFormatReadable(At)){yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!U.textureTypeReadable(wt)){yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=T.width-ae&&le>=0&&le<=T.height-he&&Z.readPixels(j,le,ae,he,Ge.convert(At),Ge.convert(wt),Be)}finally{let ft=Me!==null?te.get(Me).__webglFramebuffer:null;b.bindFramebuffer(Z.FRAMEBUFFER,ft)}}},this.readRenderTargetPixelsAsync=async function(T,j,le,ae,he,Be,Ke,$e=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ct=te.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ke!==void 0&&(ct=ct[Ke]),ct)if(j>=0&&j<=T.width-ae&&le>=0&&le<=T.height-he){b.bindFramebuffer(Z.FRAMEBUFFER,ct);let ft=T.textures[$e],At=ft.format,wt=ft.type;if(T.textures.length>1&&Z.readBuffer(Z.COLOR_ATTACHMENT0+$e),!U.textureFormatReadable(At))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!U.textureTypeReadable(wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ut=Z.createBuffer();Z.bindBuffer(Z.PIXEL_PACK_BUFFER,ut),Z.bufferData(Z.PIXEL_PACK_BUFFER,Be.byteLength,Z.STREAM_READ),Z.readPixels(j,le,ae,he,Ge.convert(At),Ge.convert(wt),0);let $t=Me!==null?te.get(Me).__webglFramebuffer:null;b.bindFramebuffer(Z.FRAMEBUFFER,$t);let yn=Z.fenceSync(Z.SYNC_GPU_COMMANDS_COMPLETE,0);return Z.flush(),await Up(Z,yn,4),Z.bindBuffer(Z.PIXEL_PACK_BUFFER,ut),Z.getBufferSubData(Z.PIXEL_PACK_BUFFER,0,Be),Z.deleteBuffer(ut),Z.deleteSync(yn),Be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,j=null,le=0){let ae=Math.pow(2,-le),he=Math.floor(T.image.width*ae),Be=Math.floor(T.image.height*ae),Ke=j!==null?j.x:0,$e=j!==null?j.y:0;ge.setTexture2D(T,0),Z.copyTexSubImage2D(Z.TEXTURE_2D,le,0,0,Ke,$e,he,Be),b.unbindTexture()},this.copyTextureToTexture=function(T,j,le=null,ae=null,he=0,Be=0){let Ke,$e,ct,ft,At,wt,ut,$t,yn,gn=T.isCompressedTexture?T.mipmaps[Be]:T.image;if(le!==null)Ke=le.max.x-le.min.x,$e=le.max.y-le.min.y,ct=le.isBox3?le.max.z-le.min.z:1,ft=le.min.x,At=le.min.y,wt=le.isBox3?le.min.z:0;else{let pn=Math.pow(2,-he);Ke=Math.floor(gn.width*pn),$e=Math.floor(gn.height*pn),T.isDataArrayTexture?ct=gn.depth:T.isData3DTexture?ct=Math.floor(gn.depth*pn):ct=1,ft=0,At=0,wt=0}ae!==null?(ut=ae.x,$t=ae.y,yn=ae.z):(ut=0,$t=0,yn=0);let qt=Ge.convert(j.format),En=Ge.convert(j.type),Ze;j.isData3DTexture?(ge.setTexture3D(j,0),Ze=Z.TEXTURE_3D):j.isDataArrayTexture||j.isCompressedArrayTexture?(ge.setTexture2DArray(j,0),Ze=Z.TEXTURE_2D_ARRAY):(ge.setTexture2D(j,0),Ze=Z.TEXTURE_2D),b.activeTexture(Z.TEXTURE0),b.pixelStorei(Z.UNPACK_FLIP_Y_WEBGL,j.flipY),b.pixelStorei(Z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),b.pixelStorei(Z.UNPACK_ALIGNMENT,j.unpackAlignment);let Bn=b.getParameter(Z.UNPACK_ROW_LENGTH),Ht=b.getParameter(Z.UNPACK_IMAGE_HEIGHT),ai=b.getParameter(Z.UNPACK_SKIP_PIXELS),Pi=b.getParameter(Z.UNPACK_SKIP_ROWS),fn=b.getParameter(Z.UNPACK_SKIP_IMAGES);b.pixelStorei(Z.UNPACK_ROW_LENGTH,gn.width),b.pixelStorei(Z.UNPACK_IMAGE_HEIGHT,gn.height),b.pixelStorei(Z.UNPACK_SKIP_PIXELS,ft),b.pixelStorei(Z.UNPACK_SKIP_ROWS,At),b.pixelStorei(Z.UNPACK_SKIP_IMAGES,wt);let li=T.isDataArrayTexture||T.isData3DTexture,Wt=j.isDataArrayTexture||j.isData3DTexture;if(T.isDepthTexture){let pn=te.get(T),pi=te.get(j),ln=te.get(pn.__renderTarget),Ji=te.get(pi.__renderTarget);b.bindFramebuffer(Z.READ_FRAMEBUFFER,ln.__webglFramebuffer),b.bindFramebuffer(Z.DRAW_FRAMEBUFFER,Ji.__webglFramebuffer);for(let mi=0;mi<ct;mi++)li&&(Z.framebufferTextureLayer(Z.READ_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,te.get(T).__webglTexture,he,wt+mi),Z.framebufferTextureLayer(Z.DRAW_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,te.get(j).__webglTexture,Be,yn+mi)),Z.blitFramebuffer(ft,At,Ke,$e,ut,$t,Ke,$e,Z.DEPTH_BUFFER_BIT,Z.NEAREST);b.bindFramebuffer(Z.READ_FRAMEBUFFER,null),b.bindFramebuffer(Z.DRAW_FRAMEBUFFER,null)}else if(he!==0||T.isRenderTargetTexture||te.has(T)){let pn=te.get(T),pi=te.get(j);b.bindFramebuffer(Z.READ_FRAMEBUFFER,K),b.bindFramebuffer(Z.DRAW_FRAMEBUFFER,Q);for(let ln=0;ln<ct;ln++)li?Z.framebufferTextureLayer(Z.READ_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,pn.__webglTexture,he,wt+ln):Z.framebufferTexture2D(Z.READ_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_2D,pn.__webglTexture,he),Wt?Z.framebufferTextureLayer(Z.DRAW_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,pi.__webglTexture,Be,yn+ln):Z.framebufferTexture2D(Z.DRAW_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_2D,pi.__webglTexture,Be),he!==0?Z.blitFramebuffer(ft,At,Ke,$e,ut,$t,Ke,$e,Z.COLOR_BUFFER_BIT,Z.NEAREST):Wt?Z.copyTexSubImage3D(Ze,Be,ut,$t,yn+ln,ft,At,Ke,$e):Z.copyTexSubImage2D(Ze,Be,ut,$t,ft,At,Ke,$e);b.bindFramebuffer(Z.READ_FRAMEBUFFER,null),b.bindFramebuffer(Z.DRAW_FRAMEBUFFER,null)}else Wt?T.isDataTexture||T.isData3DTexture?Z.texSubImage3D(Ze,Be,ut,$t,yn,Ke,$e,ct,qt,En,gn.data):j.isCompressedArrayTexture?Z.compressedTexSubImage3D(Ze,Be,ut,$t,yn,Ke,$e,ct,qt,gn.data):Z.texSubImage3D(Ze,Be,ut,$t,yn,Ke,$e,ct,qt,En,gn):T.isDataTexture?Z.texSubImage2D(Z.TEXTURE_2D,Be,ut,$t,Ke,$e,qt,En,gn.data):T.isCompressedTexture?Z.compressedTexSubImage2D(Z.TEXTURE_2D,Be,ut,$t,gn.width,gn.height,qt,gn.data):Z.texSubImage2D(Z.TEXTURE_2D,Be,ut,$t,Ke,$e,qt,En,gn);b.pixelStorei(Z.UNPACK_ROW_LENGTH,Bn),b.pixelStorei(Z.UNPACK_IMAGE_HEIGHT,Ht),b.pixelStorei(Z.UNPACK_SKIP_PIXELS,ai),b.pixelStorei(Z.UNPACK_SKIP_ROWS,Pi),b.pixelStorei(Z.UNPACK_SKIP_IMAGES,fn),Be===0&&j.generateMipmaps&&Z.generateMipmap(Ze),b.unbindTexture()},this.initRenderTarget=function(T){te.get(T).__webglFramebuffer===void 0&&ge.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?ge.setTextureCube(T,0):T.isData3DTexture?ge.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?ge.setTexture2DArray(T,0):ge.setTexture2D(T,0),b.unbindTexture()},this.resetState=function(){ye=0,de=0,Me=null,b.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Vi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Gt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Gt._getUnpackColorSpace()}};var gm={type:"change"},_d={type:"start"},xm={type:"end"},lu=new Zs,_m=new ni,g1=Math.cos(70*ls.DEG2RAD),In=new J,di=2*Math.PI,un={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},gd=1e-6,cu=class extends Sa{constructor(e,t=null){super(e,t),this.state=un.NONE,this.target=new J,this.cursor=new J,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ui.ROTATE,MIDDLE:ui.DOLLY,RIGHT:ui.PAN},this.touches={ONE:Ai.ROTATE,TWO:Ai.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new J,this._lastQuaternion=new Si,this._lastTargetPosition=new J,this._quat=new Si().setFromUnitVectors(e.up,new J(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new rs,this._sphericalDelta=new rs,this._scale=1,this._panOffset=new J,this._rotateStart=new bt,this._rotateEnd=new bt,this._rotateDelta=new bt,this._panStart=new bt,this._panEnd=new bt,this._panDelta=new bt,this._dollyStart=new bt,this._dollyEnd=new bt,this._dollyDelta=new bt,this._dollyDirection=new J,this._mouse=new bt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=x1.bind(this),this._onPointerDown=_1.bind(this),this._onPointerUp=v1.bind(this),this._onContextMenu=A1.bind(this),this._onMouseWheel=S1.bind(this),this._onKeyDown=M1.bind(this),this._onTouchStart=w1.bind(this),this._onTouchMove=E1.bind(this),this._onMouseDown=y1.bind(this),this._onMouseMove=b1.bind(this),this._interceptControlDown=T1.bind(this),this._interceptControlUp=R1.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(gm),this.update(),this.state=un.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;In.copy(t).sub(this.target),In.applyQuaternion(this._quat),this._spherical.setFromVector3(In),this.autoRotate&&this.state===un.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=di:i>Math.PI&&(i-=di),s<-Math.PI?s+=di:s>Math.PI&&(s-=di),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(In.setFromSpherical(this._spherical),In.applyQuaternion(this._quatInverse),t.copy(this.target).add(In),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let l=In.length();o=this._clampDistance(l*this._scale);let c=l-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let l=new J(this._mouse.x,this._mouse.y,0);l.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let h=new J(this._mouse.x,this._mouse.y,0);h.unproject(this.object),this.object.position.sub(h).add(l),this.object.updateMatrixWorld(),o=In.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(lu.origin.copy(this.object.position),lu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(lu.direction))<g1?this.object.lookAt(this.target):(_m.setFromNormalAndCoplanarPoint(this.object.up,this.target),lu.intersectPlane(_m,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>gd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>gd||this._lastTargetPosition.distanceToSquared(this.target)>gd?(this.dispatchEvent(gm),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?di/60*this.autoRotateSpeed*e:di/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){In.setFromMatrixColumn(t,0),In.multiplyScalar(-e),this._panOffset.add(In)}_panUp(e,t){this.screenSpacePanning===!0?In.setFromMatrixColumn(t,1):(In.setFromMatrixColumn(t,0),In.crossVectors(this.object.up,In)),In.multiplyScalar(e),this._panOffset.add(In)}_pan(e,t){let i=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;In.copy(s).sub(this.target);let r=In.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,o=i.width,l=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/l)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(di*this._rotateDelta.x/t.clientHeight),this._rotateUp(di*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(di*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-di*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(di*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-di*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(di*this._rotateDelta.x/t.clientHeight),this._rotateUp(di*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,l=(e.pageY+t.y)*.5;this._updateZoomParameters(o,l)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new bt,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function _1(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function x1(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function v1(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(xm),this.state=un.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function y1(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ui.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=un.DOLLY;break;case ui.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=un.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=un.ROTATE}break;case ui.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=un.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=un.PAN}break;default:this.state=un.NONE}this.state!==un.NONE&&this.dispatchEvent(_d)}function b1(n){switch(this.state){case un.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case un.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case un.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function S1(n){this.enabled===!1||this.enableZoom===!1||this.state!==un.NONE||(n.preventDefault(),this.dispatchEvent(_d),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(xm))}function M1(n){this.enabled!==!1&&this._handleKeyDown(n)}function w1(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Ai.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=un.TOUCH_ROTATE;break;case Ai.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=un.TOUCH_PAN;break;default:this.state=un.NONE}break;case 2:switch(this.touches.TWO){case Ai.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=un.TOUCH_DOLLY_PAN;break;case Ai.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=un.TOUCH_DOLLY_ROTATE;break;default:this.state=un.NONE}break;default:this.state=un.NONE}this.state!==un.NONE&&this.dispatchEvent(_d)}function E1(n){switch(this._trackPointer(n),this.state){case un.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case un.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case un.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case un.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=un.NONE}}function A1(n){this.enabled!==!1&&n.preventDefault()}function T1(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function R1(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var vm=new Hn,uu=new J,or=class extends ya{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new Cn(e,3)),this.setAttribute("uv",new Cn(t,2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new ss(t,6,1);return this.setAttribute("instanceStart",new ci(i,3,0)),this.setAttribute("instanceEnd",new ci(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new ss(t,6,1);return this.setAttribute("instanceColorStart",new ci(i,3,0)),this.setAttribute("instanceColorEnd",new ci(i,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new _a(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hn);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),vm.setFromBufferAttribute(t),this.boundingBox.union(vm))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gi),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)uu.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(uu)),uu.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(uu));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}};We.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new bt},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};oi.line={uniforms:Ia.merge([We.common,We.fog,We.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		float trimSegmentAlpha( const in vec4 start, const in vec4 end ) {

			// compute the interpolation factor needed to trim the segment so it terminates
			// between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column

			// we need different nearEstimate formula for reversed and default depth buffer
			// a is positive with a reversed depth buffer so it can be used for controlling the code flow
			float nearEstimate = ( a > 0.0 ) ? ( - b / ( a + 1.0 ) ) : ( - 0.5 * b / a );

			return ( nearEstimate - start.z ) / ( end.z - start.z );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef USE_DASH

				float lineDistanceStart = dashScale * instanceDistanceStart;
				float lineDistanceEnd = dashScale * instanceDistanceEnd;

			#endif

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( start, end );
					end.xyz = mix( start.xyz, end.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceEnd = mix( lineDistanceStart, lineDistanceEnd, alpha );

					#endif

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( end, start );
					start.xyz = mix( end.xyz, start.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceStart = mix( lineDistanceEnd, lineDistanceStart, alpha );

					#endif

				}

			}

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? lineDistanceStart : lineDistanceEnd;
				vUv = uv;

			#endif

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};var us=class extends si{constructor(e){super({type:"LineMaterial",uniforms:Ia.clone(oi.line.uniforms),vertexShader:oi.line.vertexShader,fragmentShader:oi.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};var xd=new rn,ym=new J,bm=new J,Wn=new rn,Xn=new rn,hs=new rn,vd=new J,yd=new vn,$n=new ba,Sm=new J,hu=new Hn,du=new Gi,ds=new rn,fs,Pr;function Mm(n,e,t){return ds.set(0,0,-e,1).applyMatrix4(n.projectionMatrix),ds.multiplyScalar(1/ds.w),ds.x=Pr/t.width,ds.y=Pr/t.height,ds.applyMatrix4(n.projectionMatrixInverse),ds.multiplyScalar(1/ds.w),Math.abs(Math.max(ds.x,ds.y))}function C1(n,e){let t=n.matrixWorld,i=n.geometry,s=i.attributes.instanceStart,r=i.attributes.instanceEnd,o=Math.min(i.instanceCount,s.count);for(let l=0,c=o;l<c;l++){$n.start.fromBufferAttribute(s,l),$n.end.fromBufferAttribute(r,l),$n.applyMatrix4(t);let h=new J,d=new J;fs.distanceSqToSegment($n.start,$n.end,d,h),d.distanceTo(h)<Pr*.5&&e.push({point:d,pointOnLine:h,distance:fs.origin.distanceTo(d),object:n,face:null,faceIndex:l,uv:null,uv1:null})}}function P1(n,e,t){let i=e.projectionMatrix,r=n.material.resolution,o=n.matrixWorld,l=n.geometry,c=l.attributes.instanceStart,h=l.attributes.instanceEnd,d=Math.min(l.instanceCount,c.count),p=-e.near;fs.at(1,hs),hs.w=1,hs.applyMatrix4(e.matrixWorldInverse),hs.applyMatrix4(i),hs.multiplyScalar(1/hs.w),hs.x*=r.x/2,hs.y*=r.y/2,hs.z=0,vd.copy(hs),yd.multiplyMatrices(e.matrixWorldInverse,o);for(let m=0,x=d;m<x;m++){if(Wn.fromBufferAttribute(c,m),Xn.fromBufferAttribute(h,m),Wn.w=1,Xn.w=1,Wn.applyMatrix4(yd),Xn.applyMatrix4(yd),Wn.z>p&&Xn.z>p)continue;if(Wn.z>p){let I=Wn.z-Xn.z,E=(Wn.z-p)/I;Wn.lerp(Xn,E)}else if(Xn.z>p){let I=Xn.z-Wn.z,E=(Xn.z-p)/I;Xn.lerp(Wn,E)}Wn.applyMatrix4(i),Xn.applyMatrix4(i),Wn.multiplyScalar(1/Wn.w),Xn.multiplyScalar(1/Xn.w),Wn.x*=r.x/2,Wn.y*=r.y/2,Xn.x*=r.x/2,Xn.y*=r.y/2,$n.start.copy(Wn),$n.start.z=0,$n.end.copy(Xn),$n.end.z=0;let A=$n.closestPointToPointParameter(vd,!0);$n.at(A,Sm);let v=ls.lerp(Wn.z,Xn.z,A),y=v>=-1&&v<=1,P=vd.distanceTo(Sm)<Pr*.5;if(y&&P){$n.start.fromBufferAttribute(c,m),$n.end.fromBufferAttribute(h,m),$n.start.applyMatrix4(o),$n.end.applyMatrix4(o);let I=new J,E=new J;fs.distanceSqToSegment($n.start,$n.end,E,I),t.push({point:E,pointOnLine:I,distance:fs.origin.distanceTo(E),object:n,face:null,faceIndex:m,uv:null,uv1:null})}}}var Ao=class extends Sn{constructor(e=new or,t=new us({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,s=new Float32Array(2*t.count);for(let o=0,l=0,c=t.count;o<c;o++,l+=2)ym.fromBufferAttribute(t,o),bm.fromBufferAttribute(i,o),s[l]=l===0?0:s[l-1],s[l+1]=s[l]+ym.distanceTo(bm);let r=new ss(s,2,1);return e.setAttribute("instanceDistanceStart",new ci(r,1,0)),e.setAttribute("instanceDistanceEnd",new ci(r,1,1)),this}raycast(e,t){let i=this.material.worldUnits,s=e.camera;if(s===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),i===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;fs=e.ray;let o=this.matrixWorld,l=this.geometry,c=this.material;Pr=c.linewidth+r,l.boundingSphere===null&&l.computeBoundingSphere(),du.copy(l.boundingSphere).applyMatrix4(o);let h;if(i)h=Pr*.5;else{let p=Math.max(s.near,du.distanceToPoint(fs.origin));h=Mm(s,p,c.resolution)}if(du.radius+=h,fs.intersectsSphere(du)===!1)return;l.boundingBox===null&&l.computeBoundingBox(),hu.copy(l.boundingBox).applyMatrix4(o);let d;if(i)d=Pr*.5;else{let p=Math.max(s.near,hu.distanceToPoint(fs.origin));d=Mm(s,p,c.resolution)}hu.expandByScalar(d),fs.intersectsBox(hu)!==!1&&(i?C1(this,t):P1(this,s,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(xd),this.material.uniforms.resolution.value.set(xd.z,xd.w))}};var Dr=class extends or{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,i=new Float32Array(2*t);for(let s=0;s<t;s+=3)i[2*s]=e[s],i[2*s+1]=e[s+1],i[2*s+2]=e[s+2],i[2*s+3]=e[s+3],i[2*s+4]=e[s+4],i[2*s+5]=e[s+5];return super.setPositions(i),this}setColors(e){let t=e.length-3,i=new Float32Array(2*t);for(let s=0;s<t;s+=3)i[2*s]=e[s],i[2*s+1]=e[s+1],i[2*s+2]=e[s+2],i[2*s+3]=e[s+3],i[2*s+4]=e[s+4],i[2*s+5]=e[s+5];return super.setColors(i),this}setFromPoints(e){let t=e.length-1,i=new Float32Array(6*t);for(let s=0;s<t;s++)i[6*s]=e[s].x,i[6*s+1]=e[s].y,i[6*s+2]=e[s].z||0,i[6*s+3]=e[s+1].x,i[6*s+4]=e[s+1].y,i[6*s+5]=e[s+1].z||0;return super.setPositions(i),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}};var Na=class extends Ao{constructor(e=new Dr,t=new us({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}};function To(n){let e=[[n[0],n[1],n[2]]];for(let t=3;t+9<n.length+0;t+=10){let i=n[t],s=e[e.length-1],r=[n[t+1],n[t+2],n[t+3]],o=[n[t+4],n[t+5],n[t+6]],l=[n[t+7],n[t+8],n[t+9]];for(let c=1;c<=i;c++){let h=c/i,d=1-h,p=d*d*d,m=3*d*d*h,x=3*d*h*h,_=h*h*h;e.push([0,1,2].map(A=>p*s[A]+m*r[A]+x*o[A]+_*l[A]))}}return e}function fu(n){return[...n.rows,...n.more?[n.more]:[],...n.tail?[n.tail]:[],...n.ghosts]}function wm(n){let e=n.routes,t=new Map(n.plates.map(s=>[s.unit,s]));function i(s,r){let o=t.get(s),c=t.get(r).x>o.x,h=o.ports[c?"right":"left"];return{x:h?h.x:c?o.x+o.w:o.x,z:o.z,side:c?"right":"left"}}return{bandTop:s=>e.plates[s].band_top,skyBase:s=>e.plates[s].sky_base,sidePort:i,link:s=>To(e.links[s]),ribbon:s=>To(e.ribbons[s]),has:(s,r,o)=>!!e.calls[s][r]?.[o],raw:(s,r,o)=>e.calls[s][r]?.[o]??null,call:(s,r,o)=>{let l=e.calls[s][r]?.[o];return l?To(l):null},variants:(s,r)=>Object.keys(e.calls[s][r]??{})}}var gt=n=>parseInt(n.slice(1),16),D1={name:"dark",css:{canvas:"#010409",fill:"#0d1117",raised:"#151b23",raised2:"#212830",rule:"#262c36",edge:"#3d444d",border:"#656c76",link:"#9198a1",strong:"#b7bdc8",dim:"#9198a1",muted:"#b7bdc8",textSoft:"#d1d7e0",text:"#f0f6fc",emphasis:"#ffffff",lb:"#1e60d5",clone:"#a66bff",dead:"#c88508",cycle:"#cc1421",cloneFill:"#a66bff",cloneFillA:.3,deadFill:"#c88508",deadFillA:.3,panel:"rgba(1, 4, 9, 0.9)"}},I1={name:"light",css:{canvas:"#ffffff",fill:"#f6f8fa",raised:"#eff2f5",raised2:"#e6eaef",rule:"#d1d9e0",edge:"#c8d1da",border:"#818b98",link:"#59636e",strong:"#454c54",dim:"#59636e",muted:"#454c54",textSoft:"#393f46",text:"#25292e",emphasis:"#010409",lb:"#0349b4",clone:"#844ae7",dead:"#956400",cycle:"#a0111f",cloneFill:"#e0c5ff",cloneFillA:1,deadFill:"#f0ce53",deadFillA:1,panel:"rgba(255, 255, 255, 0.92)"}};function Em(n){let e=n.css,t=n.name==="dark",i={bg:gt(e.canvas),ground:gt(e.canvas),plate:gt(e.fill),plateLine:gt(e.rule),card:gt(t?e.fill:e.canvas),cardLine:gt(e.border),ghost:gt(e.border),lb:gt(e.lb),clone:gt(e.clone),dead:gt(e.dead),red:gt(e.cycle),cloneFill:gt(e.cloneFill),deadFill:gt(e.deadFill),cloneFillA:e.cloneFillA,deadFillA:e.deadFillA,lit:gt(e.emphasis),hover:gt(e.emphasis),same:gt(e.border),cross:gt(e.link),pkg:gt(e.link),klass:gt(e.border),intra:gt(e.border),imp:gt(e.edge),impLit:gt(e.emphasis),ribPkg:gt(e.link),boxFront:gt(t?e.raised:e.canvas),boxSide:gt(t?e.fill:e.raised2),boxTop:gt(t?e.raised2:e.fill),boxHead:gt(t?e.raised2:e.raised),boxLine:gt(e.border),modFront:gt(t?e.raised:e.fill),modHead:gt(t?e.raised2:e.raised),modLine:gt(e.border),rowLine:gt(e.rule),classRow:gt(t?e.raised2:e.raised),write:gt(e.strong),read:gt(e.border),port:gt(e.strong),column:gt(t?e.raised:e.raised2),paneLine:gt(t?"#2f3742":e.edge),fieldSep:gt(e.edge)},s={strong:gt(e.strong),link:gt(e.link),edge:gt(e.edge),rule:gt(e.rule)},r={text:e.text,muted:e.muted,dim:e.dim,soft:e.textSoft,lit:e.emphasis,ghost:e.text},o=t?{1:gt("#262c36"),2:gt(e.raised2),3:gt(e.raised)}:{1:gt("#dae0e7"),2:gt("#e0e6eb"),3:gt(e.raised2)},l=d=>[1,3,5].map(p=>parseInt(d.slice(p,p+2),16)),c=(d,p)=>`rgba(${l(d).join(",")},${p})`,h={halo:c(e.canvas,.92),backdrop:c(e.canvas,.88),pill:c(e.canvas,.94),pillLine:c(e.emphasis,.35),pillLineStrong:c(e.emphasis,.6),tooltip:t?c(e.raised,.96):c(e.canvas,.97),tooltipLine:e.edge,pulseAdditive:t};return{name:n.name,css:e,C:i,TIER:s,T:r,HEAD:o,K:h}}var bd={dark:Em(D1),light:Em(I1)},pu="atlas.theme";function Am(){let n=new URLSearchParams(location.search).get("theme");if(n==="dark"||n==="light")return n;try{let e=localStorage.getItem(pu);if(e==="dark"||e==="light")return e}catch{}return matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}var L1=new Set("and as assert async await break case class continue def del elif else except finally for from global if import in is lambda match nonlocal not or pass raise return try while with yield".split(" ")),k1=new Set(["False","None","True","Ellipsis","NotImplemented"]),F1=new Set("abs all any bool bytes callable chr classmethod dict dir enumerate filter float frozenset getattr hasattr hash help hex id int isinstance issubclass iter len list map max memoryview min next object oct open ord pow print property range repr reversed round set setattr slice sorted staticmethod str sum super tuple type vars zip".split(" "));function Tm(n,e,t){for(let i=t;i<=n.length-e.length;i++){if(n.slice(i,i+e.length)!==e)continue;let s=0;for(let r=i-1;r>=0&&n[r]==="\\";r--)s++;if(s%2===0)return i}return-1}function N1(n,e){let t=[],i=0,s=!1,r=!1;for(;i<n.length;){if(e.triple){let l=Tm(n,e.triple,i);if(l<0)return t.push(["str",i,n.length]),t;t.push(["str",i,l+e.triple.length]),i=l+e.triple.length,e.triple=null;continue}let o=n[i];if(o==="#")return t.push(["com",i,n.length]),t;if(o==="@"){t.push(["dec",i,i+1]),r=!0,i++;continue}if(o==="'"||o==='"'){let l=t[t.length-1],c=n.slice(i,i+3),h=c==="'''"||c==='"""'?c:o,d=Tm(n,h,i+h.length),p=i;if(l&&l[0]==="name"&&l[2]===i&&/^[rRbBfFuU]{1,2}$/.test(n.slice(l[1],l[2]))&&(p=l[1],t.pop()),d<0)return h.length===3&&(e.triple=h),t.push(["str",p,n.length]),t;t.push(["str",p,d+h.length]),i=d+h.length;continue}if(/[A-Za-z_]/.test(o)){let l=i+1;for(;l<n.length&&/[A-Za-z0-9_]/.test(n[l]);)l++;let c=n.slice(i,l),h="name";s?(h="def",s=!1):r?(h="dec",r=!1):L1.has(c)?(h="kw",s=c==="def"||c==="class"):k1.has(c)?h="con":F1.has(c)?h="bi":n.slice(l).trimStart()[0]==="("&&(h="call"),t.push([h,i,l]),i=l;continue}if(/[0-9]/.test(o)){let l=n.slice(i).match(/^(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|[0-9][0-9_]*(?:\.[0-9_]*)?(?:[eE][+-]?[0-9_]+)?j?)/),c=l?l[0].length:1;t.push(["num",i,i+c]),i+=c;continue}if(/[+\-*/%=&|^~<>!:]/.test(o)){let l=i+1;for(;l<n.length&&/[+\-*/%=&|^~<>!:]/.test(n[l]);)l++;t.push(["op",i,l]),i=l;continue}i++}return t}var pt=n=>String(n).replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]),U1={external:"external: outside the package, not drawn",unresolved:"unresolved: no static target, not drawn",recursive:"recursive: calls itself, not drawn",undrawn:"undrawn: the callee is not in the picture"};function Rm(n,e){let t=n.text.split(`
`),i=new Map;n.sites.forEach((o,l)=>{o[1]<0||(i.has(o[0])||i.set(o[0],[]),i.get(o[0]).push(l))});let s={triple:null},r=[];return t.forEach((o,l)=>{let c=n.start+l,h=N1(o,s),d=(i.get(c)??[]).map(P=>[P,n.sites[P]]).sort((P,I)=>P[1][1]-I[1][1]),p=new Set([0,o.length]);for(let[,P,I]of h)p.add(P),p.add(I);for(let[,P]of d)p.add(P[1]),p.add(Math.min(o.length,P[2]));let m=[...p].sort((P,I)=>P-I),x=P=>{for(let[I,E,R]of h)if(P>=E&&P<R)return I;return null},_="",A=null,v=[];for(let P=0;P<m.length-1;P++){let I=m[P],E=m[P+1];if(I===E)continue;let R=d.find(([,M])=>M[1]===I);if(R&&!A){let[M,k]=R;A=k,k[3]==="edge"?(v.push(M),_+=`<span class="site e" data-si="${M}" title="${pt(e(k))}">`):_+=`<span class="site x" data-si="${M}" title="${pt(U1[k[3]]+" \xB7 "+k[5])}">`}let L=x(I),V=pt(o.slice(I,E));_+=L&&L!=="name"?`<span class="tk-${L}">${V}</span>`:V,A&&E>=Math.min(o.length,A[2])&&(_+=A[3]==="edge"?'<i class="ul"></i></span>':'<i class="mk"></i></span>',A=null)}A&&(_+=A[3]==="edge"?'<i class="ul"></i></span>':'<i class="mk"></i></span>');let y=o.length-o.trimStart().length+4;r.push(`<div class="cl${v.length?" ce":""}" data-l="${c}"${v.length?` data-sites="${v.join(",")}"`:""}><span class="n">${c}</span><code data-indent="${y}">${_||" "}</code></div>`)}),r.join("")}function Cm(n,e,{width:t,height:i,rect:s,az:r,el:o,margin:l=.92,cutZ:c=null}){let h=(e.pts??[e.min,e.max]).filter(V=>c===null||V.z<=c),d=e.getCenter(new J),p=new J(Math.sin(r)*Math.cos(o),Math.sin(o),Math.cos(r)*Math.cos(o)),m=e.getSize(new J),x=n.clone(),_=x.isOrthographicCamera,A=_?120:Math.max(m.x,m.y,m.z)*1.6+5,v=20,y=s[1]-s[0],P=s[3]-s[2],I=0,E=0;for(let V=0;V<8;V++){x.position.copy(d).addScaledVector(p,A),_&&(x.zoom=v),x.lookAt(d),x.updateMatrixWorld(),x.updateProjectionMatrix();let M=1/0,k=-1/0,X=1/0,W=-1/0;for(let K of h){let Q=K.clone().project(x),ye=(Q.x+1)*t/2,de=(1-Q.y)*i/2;M=Math.min(M,ye),k=Math.max(k,ye),X=Math.min(X,de),W=Math.max(W,de)}let F=Math.max((k-M)/y,(W-X)/P,1e-6)/l,me=_?1/v:2*A*Math.tan(x.fov*Math.PI/360)/i;d.addScaledVector(new J().setFromMatrixColumn(x.matrixWorld,0),(M+k-s[0]-s[1])/2*me),d.addScaledVector(new J().setFromMatrixColumn(x.matrixWorld,1),-((X+W-s[2]-s[3])/2)*me),I=(k-M)/F,E=(W-X)/F,_?v/=F:A*=F}let R=(s[0]+s[1])/2,L=(s[2]+s[3])/2;return{target:d,position:d.clone().addScaledVector(p,A),ortho:!!_,..._?{zoom:v}:{},box:[R-I/2,L-E/2,R+I/2,L+E/2]}}var Sd={};Df(Sd,{decode:()=>Ua,encode:()=>ar,format:()=>Ro,parse:()=>Oa});var Pm={};function O1(n){let e=Pm[n];if(e)return e;e=Pm[n]=[];for(let t=0;t<128;t++){let i=String.fromCharCode(t);e.push(i)}for(let t=0;t<n.length;t++){let i=n.charCodeAt(t);e[i]="%"+("0"+i.toString(16).toUpperCase()).slice(-2)}return e}function mu(n,e){typeof e!="string"&&(e=mu.defaultChars);let t=O1(e);return n.replace(/(%[a-f0-9]{2})+/gi,function(i){let s="";for(let r=0,o=i.length;r<o;r+=3){let l=parseInt(i.slice(r+1,r+3),16);if(l<128){s+=t[l];continue}if((l&224)===192&&r+3<o){let c=parseInt(i.slice(r+4,r+6),16);if((c&192)===128){let h=l<<6&1984|c&63;h<128?s+="\uFFFD\uFFFD":s+=String.fromCharCode(h),r+=3;continue}}if((l&240)===224&&r+6<o){let c=parseInt(i.slice(r+4,r+6),16),h=parseInt(i.slice(r+7,r+9),16);if((c&192)===128&&(h&192)===128){let d=l<<12&61440|c<<6&4032|h&63;d<2048||d>=55296&&d<=57343?s+="\uFFFD\uFFFD\uFFFD":s+=String.fromCharCode(d),r+=6;continue}}if((l&248)===240&&r+9<o){let c=parseInt(i.slice(r+4,r+6),16),h=parseInt(i.slice(r+7,r+9),16),d=parseInt(i.slice(r+10,r+12),16);if((c&192)===128&&(h&192)===128&&(d&192)===128){let p=l<<18&1835008|c<<12&258048|h<<6&4032|d&63;p<65536||p>1114111?s+="\uFFFD\uFFFD\uFFFD\uFFFD":(p-=65536,s+=String.fromCharCode(55296+(p>>10),56320+(p&1023))),r+=9;continue}}s+="\uFFFD"}return s})}mu.defaultChars=";/?:@&=+$,#";mu.componentChars="";var Ua=mu;var Dm={};function B1(n){let e=Dm[n];if(e)return e;e=Dm[n]=[];for(let t=0;t<128;t++){let i=String.fromCharCode(t);/^[0-9a-z]$/i.test(i)?e.push(i):e.push("%"+("0"+t.toString(16).toUpperCase()).slice(-2))}for(let t=0;t<n.length;t++)e[n.charCodeAt(t)]=n[t];return e}function gu(n,e,t){typeof e!="string"&&(t=e,e=gu.defaultChars),typeof t>"u"&&(t=!0);let i=B1(e),s="";for(let r=0,o=n.length;r<o;r++){let l=n.charCodeAt(r);if(t&&l===37&&r+2<o&&/^[0-9a-f]{2}$/i.test(n.slice(r+1,r+3))){s+=n.slice(r,r+3),r+=2;continue}if(l<128){s+=i[l];continue}if(l>=55296&&l<=57343){if(l>=55296&&l<=56319&&r+1<o){let c=n.charCodeAt(r+1);if(c>=56320&&c<=57343){s+=encodeURIComponent(n[r]+n[r+1]),r++;continue}}s+="%EF%BF%BD";continue}s+=encodeURIComponent(n[r])}return s}gu.defaultChars=";/?:@&=+$,-_.!~*'()#";gu.componentChars="-_.!~*'()";var ar=gu;function Ro(n){let e="";return e+=n.protocol||"",e+=n.slashes?"//":"",e+=n.auth?n.auth+"@":"",n.hostname&&n.hostname.indexOf(":")!==-1?e+="["+n.hostname+"]":e+=n.hostname||"",e+=n.port?":"+n.port:"",e+=n.pathname||"",e+=n.search||"",e+=n.hash||"",e}function _u(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}var z1=/^([a-z0-9.+-]+:)/i,V1=/:[0-9]*$/,H1=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,G1=["<",">",'"',"`"," ","\r",`
`,"	"],W1=["{","}","|","\\","^","`"].concat(G1),X1=["'"].concat(W1),Im=["%","/","?",";","#"].concat(X1),Lm=["/","?","#"],$1=255,km=/^[+a-z0-9A-Z_-]{0,63}$/,q1=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,Fm={javascript:!0,"javascript:":!0},Nm={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function Y1(n,e){if(n&&n instanceof _u)return n;let t=new _u;return t.parse(n,e),t}_u.prototype.parse=function(n,e){let t,i,s,r=n;if(r=r.trim(),!e&&n.split("#").length===1){let h=H1.exec(r);if(h)return this.pathname=h[1],h[2]&&(this.search=h[2]),this}let o=z1.exec(r);if(o&&(o=o[0],t=o.toLowerCase(),this.protocol=o,r=r.substr(o.length)),(e||o||r.match(/^\/\/[^@\/]+@[^@\/]+/))&&(s=r.substr(0,2)==="//",s&&!(o&&Fm[o])&&(r=r.substr(2),this.slashes=!0)),!Fm[o]&&(s||o&&!Nm[o])){let h=-1;for(let _=0;_<Lm.length;_++)i=r.indexOf(Lm[_]),i!==-1&&(h===-1||i<h)&&(h=i);let d,p;h===-1?p=r.lastIndexOf("@"):p=r.lastIndexOf("@",h),p!==-1&&(d=r.slice(0,p),r=r.slice(p+1),this.auth=d),h=-1;for(let _=0;_<Im.length;_++)i=r.indexOf(Im[_]),i!==-1&&(h===-1||i<h)&&(h=i);h===-1&&(h=r.length),r[h-1]===":"&&h--;let m=r.slice(0,h);r=r.slice(h),this.parseHost(m),this.hostname=this.hostname||"";let x=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!x){let _=this.hostname.split(/\./);for(let A=0,v=_.length;A<v;A++){let y=_[A];if(y&&!y.match(km)){let P="";for(let I=0,E=y.length;I<E;I++)y.charCodeAt(I)>127?P+="x":P+=y[I];if(!P.match(km)){let I=_.slice(0,A),E=_.slice(A+1),R=y.match(q1);R&&(I.push(R[1]),E.unshift(R[2])),E.length&&(r=E.join(".")+r),this.hostname=I.join(".");break}}}}this.hostname.length>$1&&(this.hostname=""),x&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}let l=r.indexOf("#");l!==-1&&(this.hash=r.substr(l),r=r.slice(0,l));let c=r.indexOf("?");return c!==-1&&(this.search=r.substr(c),r=r.slice(0,c)),r&&(this.pathname=r),Nm[t]&&this.hostname&&!this.pathname&&(this.pathname=""),this};_u.prototype.parseHost=function(n){let e=V1.exec(n);e&&(e=e[0],e!==":"&&(this.port=e.substr(1)),n=n.substr(0,n.length-e.length)),n&&(this.hostname=n)};var Oa=Y1;var Td={};Df(Td,{Any:()=>Md,Cc:()=>wd,Cf:()=>J1,P:()=>Ba,S:()=>Ed,Z:()=>Ad});var Md=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,wd=/[\0-\x1F\x7F-\x9F]/,J1=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,Ba=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B4E\u1B4F\u1B5A-\u1B60\u1B7D-\u1B7F\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDD6E\uDEAD\uDED0\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9\uDFD4\uDFD5\uDFD7\uDFD8]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09\uDFE1]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDD6D-\uDD6F\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD839\uDDFF|\uD83A[\uDD5E\uDD5F]/,Ed=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C1\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2429\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E5\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD803[\uDD8E\uDD8F\uDED1-\uDED8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDC00-\uDCEF\uDCFA-\uDCFC\uDD00-\uDEB3\uDEBA-\uDED0\uDEE0-\uDEF0\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED8\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0-\uDCBB\uDCC0\uDCC1\uDCD0-\uDCD8\uDD00-\uDE57\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF-\uDEF8\uDF00-\uDF92\uDF94-\uDFEF\uDFFA]/,Ad=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;var Z1=[8364,0,8218,402,8222,8230,8224,8225,710,8240,352,8249,338,0,381,0,0,8216,8217,8220,8221,8226,8211,8212,732,8482,353,8250,339,0,382,376];function j1(n){return n===0||n>=55296&&n<=57343||n>1114111}function Um(n){return j1(n)?65533:n>=128&&n<=159&&Z1[n-128]||n}function Om(n){return n-1>>>0<127||n-160>>>0<55136?String.fromCharCode(n):String.fromCodePoint(Um(n))}var Yi=(()=>{let n=new Uint8Array(127),e=0;for(let t=33;t<=126;t++)t!==34&&t!==36&&t!==92&&(n[t]=e++);return n})();function Bm(n,e,t,i,s,r){let l=n.length,c=r*90,h=0,d=()=>{let k=Yi[n.charCodeAt(h++)];return k<r?k:k*91-c+Yi[n.charCodeAt(h++)]},p=t-i,m=t+s,x=new Int32Array(m);x.fill(-1,i,r),x.fill(-1,r+p,m);let _=new Int32Array(m),A=new Int32Array(m);function v(k,X){let W=0,F=X,me=X+k;for(;F<me;){let K=Yi[n.charCodeAt(h++)];if(K<89)W+=K,x[F++]=W;else if(K===89){let Q=Yi[n.charCodeAt(h++)]+2;for(;Q--;)x[F++]=++W}else{let Q=Yi[n.charCodeAt(h++)];W+=89+(Q<90?Q*91+Yi[n.charCodeAt(h++)]:Yi[n.charCodeAt(h++)]*8281+Yi[n.charCodeAt(h++)]*91+Yi[n.charCodeAt(h++)]),x[F++]=W}}}v(i,0),v(p,r);let y=new Int32Array(s*2),P=0,I=0;function E(k,X){for(let W=0;W<k;W++){let F=X+W,me=d(),K=d();y[I*2]=me,y[I*2+1]=K,I+=1,_[F]=P;let Q=(x[me]<0?A[me]:1)+(x[K]<0?A[K]:1);A[F]=Q,P+=Q}}E(s-r+i,r+p),E(r-i,i);let R=new Uint16Array(P),L=0;for(let k=0;k<I;k++)for(let X=0;X<2;X++){let W=y[k*2+X],F=x[W];if(F<0){let me=_[W],K=me+A[W];for(;me<K;)R[L++]=R[me++]}else R[L++]=F}let V=new Uint16Array(e),M=0;for(;h<l;){let k=Yi[n.charCodeAt(h++)];k>=r&&(k=k*91-c+Yi[n.charCodeAt(h++)]);let X=x[k];if(X<0){let W=_[k],F=W+A[k];for(;W<F;)V[M++]=R[W++]}else V[M++]=X}return V}var zm=Bm("!}.&u%}'&}*'~!6*)%&,~!J~!J~%L~y<~!R,~~%Lu~~#GD~~#|)1#%}^%}2%+#.##%##%}&%##%'#%##&%#%#'%#&#%#&#'#%%#&#%##%#)%''%&%#%#'%#%%#%%}%%%#%#&(23#%%#&-%0%('1#(##%#'##+%'*.:1}#%#6-+(%'%%#%%%}#L'2351&('%}&/N'(0(/*-%(%%}#'+&T%7.2}#&%&#%#36/5##%&%%#&#%%#))2%%##%&&'0~!#*+&'%1~!%).'3q?&%'1~!.##%6(~!+%%%(Gw'rT~!E#<nA%#jZ~!H%(~!42##~!*31&~!G%U~#)5~#`3~!J~!Z~%]~%Y~%C~!q~!u~#kz~%#~!6'~!D~!U~!?~#T~!c%~!G#'~%7|~!G~!J~!G&~#pb~(Df}#%}*&}#%##%##%##&#-}&'#'&%#.++}%mI,#,@&(}*%}*'%&##&#%##%}&0}#.},U},%}+%}&%}#%##&}B%(}(%}+%)})%##%#&}&%##%&}<%}>%#%&}*%}(%}9%}/%})%}*%}*%}?&}&%}3%}&*#%})%#%#)}#&#-#+*%E%%'%'#%}#*V##&##I}#&&##%&%#&&Qf%%))w/0+&%#(#.%-''''++++7}>%4'',##1,#%#&%##&#'##&#*#9)%&%}#*}%,#+P(%A&%#'&##wSD',9E00#y#@}(+}&%&>~!#~!X}#*}(&&}(&}(,%}%&#+&}#&}I%#%}%)#(},'%#*}4%%#%}(''}#/##(##),%-##%%)#&}(.}&%#&}%%}*&#%},&&}&%}#%*'#%})%}D&}&%}-&}6&#&}-,%}#%})-(~+`~,=?~I9'9%~!,#%})%})%}@%}?%}(~!?~#<~#pP~#BG~#=1#%K+~#?#~%;)~#A~#mF1~#A'~'X%'~#lR~#N~'N~#r~#m#-~#i'?%#'%~#B%##%,%#~#_%#0%~#]732~,w~2+#:&#%&'0%&>%}#>##F+)#%&&#(+_}4&}-%}(&}@&}O7Fdf0@+/v4}&WU##&/0#&'('B#%}.%}'+#%}#%%&#&%#%##+#&#)#6#'#.},%}c%},%#%##%&#&%#&~#>'*-.%##%##%}#%%}%'~#)D1}#%*&~#_%%'(~#S2%'.}#~#=##*'*-%}&'%'##&&~'E%.#&~#M4}%%##&'%#~#O1##%&#'+~#<B%##%%'%+~#;#@%}#&%#&&%#(~#H1}'%'##&&~#?A}&'~#D#%32}'&&&&~#[}'(#%}'~#;C})&}%%#%~#=&%,3}%'(#%%~#^'#&&)#%'~#Y%-~#d-%'~#^%%&#&&&}#~#b~2t*&'~&(~&@~0%~e~3}%*''0})&}+~!9##-}#%-hD*)1fC#%/&/fB#40~!+#)*4~!+~!K'&:~!/*7~!.#~!H~!L':~%x&~!H#~!*~%1~!I#~!+A~#p'~!F~~#-#~,,(~.Z~!V~%;'B'mq-W~!N~%I%#&&#&}#%},%%}'%}+X#%}#&}(%}'%}<%}#%}%%'}'%}:~![)9@~%>~#UA%-%##&~!C%~!-.9:~!1~!-^2/:a~!y,D*J#-5)/4~%23,~#G~!L1~!0X3`~!2+~!!0-~&E~!W~!o,>Y&]~%cZx_&~#O*9#A#'#+I'%#)~!0B*-5A+-((F&*M#)(-7-5+'-3a5Vi~!Y~!?+[)%3),ERHm~!+:D,VG.+)?fB%%*(%)'(#&80%1'8`K8?`+'Z#&O&'H5#*9)A%%5&3))0%39+.*7#()&&*=4@**L)<'_&*+..;(#*+)./&0#3)%')-8(4ixD(&.}%,('aI:,)%,k2231T)I'#/-W7,/'Q#.'Y24+h')37</31&83##&0#),H(?'&?/1##%#&&#%''-%&&&#(&''&#.-'%#%%(,')*'&#&#'##%(%(#%('#&##%%%%('%#%#%%#%#&%##h>w+v<ayvyvcg.uuhKr}g/v|g>u9i[~>g5uI~=RvdwEg;v/g;uk!!TTSx]@RT!U!#!@VBRUU!'UTe-d0c`e&gSdicedFcrdTaqb.kYcAohdYd@a3e+d}dMdtd.aJ#bqcK`dle/e.e'dwdPdodddjbEb}ogd^ofdpduc6j?l%d{drdqc)d7bacOdQ%T#Y)X.sR[yH>6Vyv3[xwLu>vo'!*.[yBacahoj>6Rew3[xqdZa#!a&#^(X-[yG>6Vyu3[xvg3sEr|g.u/Ri9db0T#^(Xa)!-[y;>6Vylg4wKs{JwNZt3@3r=c4Z([xlg;wKt!cpq's@v7A'*a(a+!-a#[y<3Dt?3Dt'>6Vym3[xmg9rxsNJwLZt4~?r?db1T#`-!(Xa,!0[yS>6Vz%NuQs.g4wKtnJwNZtS@3r>c4Z([y%g;wKtrdga8!a(!#&T*Y-Xa#!a0<or[yc3Dtq>6Vz43[y3JwNZtf@3s!Ju}!%Dti:pm3c_%X#tjB5pkd6q!r]u?voC'*-a.a2!0a&a+[yI3DtI3Ds~3DtH>6Vyw3[xx;:s#~<5pKJwNZtE@3r~d`a)!a2T#a.(!+U.X1[yT3Dt`3Dtv>6Vz&3[y&g9rxwzcxstPu.<rAJwLZtT~?r@dZa%!a.&^*Za(/Reu[ya>6Vz23[y1g3sEr}wkg{NuQRg{ci(U#5@b`~,cg#U(2WnH5wugcRh7dX#T(Y,a'Ta!!a,[yZ<]mj>6Vz,3[y+Pv#5ReZKu+=,%!H}7ABwkaS?Rh:BcW(X#<]mrj:ubv/ARekdg%!(!a.*Ta(Y.X1!#sP>Rl*Dt6[y>>6Vyo3Wf*jOvuumvuRgRJuq*!:9<B@bX~3jVv&v@s@5Re[d/rQt{uAvo&a&a*)a2!,0Wf!3Dt0=Bs'>6Re}3[xy~<5s%JwJZt1~Gs)c;&!#2sJkNuXvzq7rxu,Re8dka4!a8(aEZ+a@Y.X1Xa)[yd=Bs(3DtP>6Vz53[y4cX#X&Re:avRe9~<5s&JwJZtQ~Gs*i^rzvdRg+Jv{%!2sbB@bX}kdga,!Za?&^*T1/!a'Dt+[y6>6Vyf3Wf%g/u;s4hGu6?Rh-JvZ,!c%#&RoX54Rivj7uyvf8RgTKvZB%*!2sGh<vu5Rgq<=C::9bb~#dZ#T&Ta6Y.X*Dt>[y93Wf)coZ(T,6VyifluvRgC@95@B@bX~/hFu34cC#T,k/unq8w8Q5RkUklwQuzunq8w8Q5Rk8d/rJu?v8w9)-&!a0a;a&aIWejg3sEr/h1s<DtDJvyZqY5aws3Jvy!&Wei~Hr1:au5@Bag>23E~5c:Z&bX};kKv?w&unuVu5Rjc;>bs)#~@:Rh.=ay<a]C;b`}Vd6s/t{uAvoaxa()!a,a7%-a#a2Dt,[yF2Wo[>6Vyt3[xuNuPRi&NuPwpi#RoWh?vf8Ri%Jv]!%Ri:KvxD!.'2WeAjZu`q9rxu,Re7woeAg-unLq(qA_/*2Wg_g3u5q^9:4E}/jTrxrzv=Wkkd~0UX#^^Xa-a1a5T&a=U1a'*aEa]!a*aPaA-adok[y54Rn>;:p3~Dp5g9rpsFNvZqjg3uJp4~<5p0Pw;5qlJwNZt*@3p1Pw:5p/Ou!5p2JvG'!6Vye=<qnJvh_[xhg3v,Rh3kOwOw-sDuev/Re^dha[a%!%!a+#Ta7)-5TaCaO!aka!a)sf[yb2>Rl!9ARiq5E}Qg=ucRkBE|oJrJ_@Wk~@Wk{JrJ_@Wk|@WkyJrJ_@Wk}@WkzJvO_[y2g-vMRmiKuYC!)&>Ri;>Ri<@3RkNc](X#@9Rk=g5vuRmhKvDB!+'=]meg3u4Rmgd)#Y'Vz3CARmfd`a+!%T'!+#Ta1Ta6TaM-sTDt9[yA9sYd'%Y#s[[xpj:ueunaXRgEjRq,v-vuqdd2'`#6Rev<32@5>:2<E}5xIo9a*X#Y(;5RePJvD_g>vyRgNj8w)v8<wggs:RgXiZt|vjx,hSq3ah!-(~@:Ro/Ou!5RhWj^v(pyw8unRhUdx-UY#^Ua.a3a70!)%UX1TaDa)'omRiRRhE[y:3Dsz=Br,>6Vyj3[xkg6ruwjcqsrPw;5r*Ku]D'Zt-@3r(~?r.i[vwv]dU1a--U#`a4(g/vsRhPOu!5RhLj:rmu9Wo!~@:wdh@g/vsRiTjXuvvNr}:RhBj^v(pyw8unRn]dz1UYa'a+^Y(!aETZalaRY.Ta?a4[yDJw1!#qLsW>6Vyrfzq-pLflpwRe|Js>%!Dt@3Dt&Jvy_[xs~HrnjMuwpsw'RecKu+D#'!t<~Grl~?rjg5u-x,gwp{ah!-(~@:Rg~Ou!5Rh'jXuvvNr}:Rh#cW#X/c;&!#2sLi[v7u7RgpJv)(!iLrxu,Re6j7v@s@5Se[e7d`aW!Za(a`T.a#!a3!&aDa-!9)Dt_=6s+3[x~~DR|h~DS6avhGun5RkZj3w)v-]mkKunB!&*]kb97R|i<ARk<c:Z(6Vy}Juh'!wziMRoS:F|vkLuauJv5vtvQRh1d='T+Y#VyO~DR|jcF#T'7R|g97R|kJv3'!ay<Rj,Jvh&!:ReXcsa6*a+#a#_aIRf9aLRf?c,Z&Rf5Rf7c.Z&Rf;Rf>cQ#%T'p-Rf8Rf=ct#%'(*!,p,Rf4p+Rf6Rf:Rf<d~'Ua%U*^UYa(!a,-!#a4YaTalaEX0a8a<Weo3Dt/3Dsx=Br93Wen~Dr;~<5p<JwNZt2@3p=Pw:5p;Ou!5r3c7&!#:p>3Ds}KvGB)_6Vyk2sM=<r7x'eovA(!hFu1ARf}cV#X&@r5j6rvwQa^Rf3c=Za'wkghJv__g;unRggA53B9=b^}%j6uduo5Jq;!(hIv%2Re`Ou4ARe_e%a#^^^Xa&!a*a2!&a6YaP!*ad!#a:aE/5Rn?[y@>6Vyp;:pE~DrY~<5pBJwNZt8@3pCh=rt3rWPw:5pAJup_[xoNuPpF9c!#'45pD5ARn)d8#X'X*3@rU72s]h>v<<sSjJpqvewOJq/(!hNw'5ReBk0s2u3w/w'5ReE5@Jq.!a+JQ!&WeU23d(#Y&RjG5]jBk!u7w&u0udARjEe#+^^^Ub#!a2/a`Z(agT1!a-a;|@TaG!aS[yV=Re~fow'RguNuPRe?bz#'>RoUWeL>:Cbb|?JwPZtVg6ruRmzJvD'!6Vz(g/vmRh~Jvy_[y(g9voRgyx*cy(#2>Ri2B9b]~9kIw9u7rluJu3Rg]dI#a%UY'@=p%CAx.gQZ&RhwwygtRm{x5g_Z'+ABqR9Woa=Bp&dV#^*Xa'!&@o{g4v]Rk;Jv{!%Rk[wkkiA5RkiwwfUB=x,fUuqC&*!>RfTg8v0RfV~ARfSd;rJsAuAv9wR'ae+/aO!a@aza/a#[yQ@Wg!2Wemg3sEr0JvB_g>uvReWg2v+Re=KupB_+[y!2AbY~-~Hr2AJwD!(h<~El>h<~El?Kun@+_:9b`}Kg-v/Ri3g;vtwyk_9]k_d=&T#*U.6qh@Ab`|K9:H|CJv[!&3Dtex'fDwC%!Rf[9WlMd[(^X,!a%Z06Vz!@WgBg=v~Rgvg,QRe@awd,#Y+jTv|Q~EfWj]uNr|~FRfXdy#Y&^Ua%!aO.!(a)Ua;=!a@aKap!a-,a!Ta]a[rSa]p?[y82sK=Bq~;:p:~<5p8Pw:5p7d'#Y'Wf(;RnRi[u4w&RgJJvG'!6Vyh=<r#ijuuv/sIKuYD'ZtG@3p9~Gr&d2#`(g<vtRgFj`u5w&rqpxRf2CJuY!+:wfnTOu!5Rg}jNs1ucv&RfwJvA!&3@q|BDcC#T,k/unq8w8Q5RkTklwQuzunq8w8Q5Rk9dga#!a'!a=#a0!:+Tb*b@aO.a4!aba8aFJv^}?!VyR~Dr<g;u%Rn.~<5p[x'e`wNZtR@3p]Pw:5pZhNvjBp.woe_g5u-r4JwF!%DtO3:ooc7&!#:p^3DtpLuGw(!+%)Dtk6Vz#2sd=<r8d'#Y([y#<x3gJt`w@!)%}MRiowzikRij=]ilxAf3,U(#B2Rf#g0v-Rm[ck{`U#]giKv3>)!&6Ri154s,KuGB_%@r68r:dJ|t`#X(9<E|u2@H|rx3gJu?w'!+'1Nu7Reg4=H~+9<wxgY95Rm]xLggZ-`(X}U2:Ri4h<uOawRmsJv__5@bb{jbV~3dka#a'a]!,#a+U=a>b6a3b%!/aKa/)!arwve^VyJ;:pR~DpTg3uJpS~<5pOPw;5qmPw:5pNOu!5pQJvG'!6Vyx=<qoJvA!{~Jup!%@qk7Rn/KvyD!}''[xz;>wkh'?Rh,x8gyt`w5D!&),(SgyccRgztJ@3pPB5p#d'(Y#<]mmifubw&RgoJvE&!82s^JvF&!8Rf,ADb]~;x=h'rNu]vK!,%'*0RnORh)4Rh*AqQg-vaRnNg;wHwkh'ba~4cE#Ta*x3gctyw@'!+%RnFRnD<4Rn@hFvK5RnCxWg[#`&a0Ua()`1Rm75Rg[c]%X#qi8Rg^NvdRj>BwzgZauwji7Rm6A4wgg]d1#&(*,.0a#Rm;Rm<Rm=Rm>Rm?Rm@RmARmBe%#^^^Xaea?aC/b+(,!a+a#!a/!>a&Ta<aKbD!2wphBRnk[yPw}hE|.=Br-3Dtm>6Vy~g6urRf.x,hPrNav!%'RnqRo%Ro#Nu;q[Pw;5r+JwNZtM@3r)d'#Y'Weh;xChL#`&RnmRnoKu}>%(!Rne~Bs-;2wjcussJv+'!aYSO}6@B<5?ba~8LrNvj!.%*ROwungw~ng~:9;Ri^>wtnig;wHRnixDh@|(UZ.x1h@|)!#:2<H|*xHn]#-UX'3Ro)z=iT}6ARns=Bwsn_wpnaRncw]aR(#UXa&Ua*a/=]iPd'#Y&Ro'WnXf{QRm2hNvj]nZd`'T~&1`{|`#9b]{}c:'!#Wl{>@=be}]?cl{{U#:5Abb}Jds#^YaF!a*b4a#a3aPa>&Tb!bH!*a_!Eau?/a&RjY<]gj>6Vz*;:pe~DrZg,QRj1JwNZtX@wihspcJvZ&!VyX9WmOJu|!|N2WmHJvh&!]ht~Bpbcn&T(!#RmQ<s7Nu;padH#X'`+WmJ@>RmKCARhnKup=!)&Wf+:RhqNuPpf9c!#'45pd5AwghpARn(Ls@w!%,)!RmP@Wfe<E|IJva!&WmNg8vsRmLd`*.`#Y'Xa!axRn*]hrA8Rhug5s@rXg8u!RmMd8#X'X*3@rV72smdI*#UY&RmICARho~GsgxVgd)Ta'U-Y&Xa!T#RnEWnA@Wffg1uDRi0hFvK5RnBxGnG&#`%owp)@wsf+bX}Ze-*1!a*^^^Ua|!#a.aq&Ya2!a>.a6!a:aO`aJDtL[y`@Wg#>6Vz12@wzoYRoZNuPRi!NuPRhzg=ucRi,@=b`{Yg=ucRi-ACJvB!&Sh[ebSh]ebi`wUuFRm4Jw2_[y0JvB!.<Ju(!&SoG}6Shd}6<Ju(!&SoH}6She}6Kur@._g5vHRieJvx!{L2G{Kx6gd'T#?Rh82Wi5cZ#X(g1w)Rm5dW-Y(Ta#!a)!#aYa=wnfE=su2>>bU{0j9udv:<svj8uQv-7RgHdE%#^'sq9sp=>Bb_{TJv`!&g/r|snj6v(us5d,#Y(56H}[978H}]Jw5!&g1rushJvB!+j;v{u5?zDhd}6}bj;v{u5?zDhe}6}ce*#`(^^^a[aea!=!a6a*aoXb1a.!aAbL!b>,b'aL!aV@Wf|2Wlg3[y/JwNZt^@3piPw:5pgJunZou3@rsJva&!Vy_g<v~Rm#JvG'!6Vz0=<r{Ju{%!:pj@WfsiXuJu3Rm:JvZ&!WfA~Bph@c4Z&Dtwax5rubx(#:awRk1@d,#Y&RfjRfid1#,Y(@Wfp2Wlrg5s@ryKu[@!,'=]ig9wlk?Rk>g5u-rqJvy'!@9RkQcH(T#=>Ri~@<wkj(Wj(KuZB*!&<7rw@9RkRcH(T#=>Ri}@<wkj)Wj)dg(Ta2Xa9X#`-!a*CARhg@@=I}d9x;c~#X%so=<sj>2@@=aybb}XjWv0Q~EfEj3vLv;<d,#Y(56H}`978H}_dgaPaFa'a/!#a3Y0a_a;a|!1(a7-[yE3[xt;:pJNvZrrg3uJrvJwNZt=@3pIh=rt3rxPw:5pGOu!5rpJvG'!6Vys=<rz@c4Z&Dt(ax5rtJvZ!&~BpH@wsfNg-vaRlNci*U#=<wei<F}a5@Jq.!a*JQ!%@qZ23d(#Y&RjH5]jCk!u7w&u0udARjFd/prq=tyvpaEa(a:.!a1aZ(@@=I}:9wpd%=<sX55w_h}@@=I{t=ay<aU@@=I}T=ay<2@@=I})?C9:9au@9Cb]}DP~=x-fAZ(2Wl1=ay<aU@@=I}>5@d##Y+jTv|vV~EfFj]uNpn~FRfGdgaK!Z2&!a8a-Tb({E!acTbM*!a(DtY[yYd'%Y#sl[y*hHvh>Re5x2c{Z}.j4uCvcawRiMd+#X+_x&d!},<5RkX;2Hzw@x,gavfB-!{CcF&T#Roe;RodwWbBg5urRgaKvHC*_6Vz+<4opieuew&Rmq@d]&Y)X,T#X0Rh}<BqP=4qS9:ReMg/ujReNJw0!/<Jui%!bd{kawwnemRelAxUa?a3#*.&UX(Ya+a/RhvRnQ<o}9Wmtd-#Y&RgSRmw9;Rmxay=Rmyg-vaRmuxEhSrNu,v-voC!%(aR.a(a7+1Ro1>Ro5CE{A9b]{@;5x#eO{:g;urRi+KrNA!%(Ro3>Ro79;Ri_Ku@>{;&!x%gX|{KunA_+g5QRj/g3u5Rj#g>uERj%wio/xRhS&!,!#^1U}wba{8>>@=be}qC@:D5ba{7Ku+A&!}x?ba}t>>@=be}se(aA^^^Uat!b0#{pa+awUazbGa#aLb9bgaWac'a5TbS=Br!d1#`%scp_Jvl!#rT>Re0JvX&!VyN=H{Fcm#U&:pY=ReaJv2&!]h0=]nUJvG'!6Vy|=<r%JrM_=]h2@Wlud'#)U'Wf'b]{i=]h/Jvh!&~BpWg=v]RnMx+ny#'Nu;pVwjnu=]nwxJnx,T#`&Reqwjnt=]nvieu9vrRjLLuYwP(#+!th@wih5pX~Gr'g5v/Rh4KunA'!-CARnP@wwiN:Rm_9x'cvw>!|l=<saKvAA!0&3@q}>w^e1bp#&Re2Re3BDx7gH#T|f5H|eKuZ>!%(:qNAH{]Jv6!+3B2B9=b^{X<5<B92:E{ZLvhwA(a;a%!igQuyRmad+#Y}m@3Rh5d8#X'X*:AqUAHzmaxwbh<aXRnVcF}RT#Nw&cj#U(BWnug/vsRntdka)(a3+.Zb7aYYan1!bVa@Xa}[y^@b[{G=H{+hFu73Rj&Pv#5ReQcK%T#sig1v{Rj'Ku+D#'!t]~Grm~?rkKuMB!01d5#`'Vy.ta3Dtu~Hroc8#'{^45s85AwZbP&!#Rn!wghxWn#KvEA!)&2RlA2RlBx:h|#(T,=]j09Wobz>x]z/@awRoTd+#Y(az]hFhCrm4d,#Y+jTv|Q~EfMj]uNr|~FRfOdCa!Xa9_X#@<plJvf!%b`{(9;Rgwc;.!#2x7cw#T|UDb]|T5Ju={(!=@E{&Jv)&!Ab`{'awJvf!~*>>@=be{#KuY>!+&4Ezyi[ugv&RjIdea+T)#UXa&T-T&a!Rh9auRmW=]kLg5vuRn+g3u4Rn-Ow6ARn,hHus5xNk?#UX(U~)/g8v0RkD~AwkkF?Ri.OuNBwkkA?Ri/d|a2`a*^UYa.!aBTZaTa'Xa;!(!2!-a#b2[yC>6Vyq3[xr2Wi?g1rusVh%s?DtF~<5rbJs;%!DtBfswKtCj[uvuSsEu3RgVx3o:u+wN'*Zt;@3rd~Grh~?rfg8w)Lq)qE&-a%!>bI|`jWv0vV~EfCjTv|vV~Ef@j]uNpn~FRfBcK#T']gWNu7x,k7q4ai(0!hHv8<RhmkMu9vrsBuev/RhlCJvB!,g<v{wchh~@:Rhji[vrv{wchi~@:RhkdS&a5UY#Ta!RgPwwiI5BwciI~@:Rh`x'iJvj'!5]iJPu8Bwch]~@:Rhach)U#h3rp]gLh@t|Ax,hTq3ah!-(~@:Ro0Ou!5RhXj^v(pyw8unRhVd|)`,^UYas!a?/a2Z'a^Ta{Tb7Ta(a#!a,Wf&9sZ3DtAadamov=Bqt3[xig8vsRm~>waiL2b`{QJv*_Ouv2qgj<v]v2BqfdR'X*X#Y-@3qr~Gqv~?p6hHv-]glPup5Lq+q?_%*b_{qF{n9b^{rOu4ARhpKvCD!+&~Bqp:5Dbb}nwoiKl&unuTuBv]v+ueunaXRf0=Jvh!0nKufu8v1w&w7q%w&uHrz:Rgnj5w,uxDJq/(!hNw'5ReCk0s2u3w/w'5ReFd>Za&!*UaA=<wkgsRnSJv^!%Refifw3vyRgOKu_B'!,<]gkiiu:w&Rh<=C@a^<B57@2F{[<B5@aW:=3away9A5aW=<B=C@a^<B57@2F{Ie-#`(^^^bCara.b8aza6!/bZ,!adTbnTbOb+aFaS!aAT9@Wf~2Wli3Dtl2@d,#Y&RfnRfmJwJZtN~GqyJva&!VyMg<v~Rm%iXuJu3Rm9Jv[_=]ih9wlkDRkCd1#`(@Wg>2Wls3cH#T(@<Rj*=>Ri|b~'#23s9h<~El.d'#Y&Dtxi^rzvdRl#d*#U%(o|B2s`hJwSaxRmDKv4B&!1:Rmdd5#`'Vx}to~Hq{x'f1v3(!BA5ba|bJv_&!Wfug1v]ReIdO+U/Y#&G}-8wze=Rh{g1v]ReHg/uQRf/by#)ibQwERl/cH#T(@<Rj+=>Ri{cNu+vlax-!(#a0qa9<Rii2;;bU{H;x<i=&X#Rk`<4wwi=C9H~8xAI(Y#<azRi@45wXI<B9;5bb~7dL(X#Xa(+!aL6Vy{g5QqOau:5au2@ay547EzbxOcU(UX-T#Ta#:Cbb|A?wjh/b_|SOw6ARgtihr}u7Rhy<d1#T)X1@@=I|~=ay<2@@=aybb}Sj3vLv;<d,#Y(56H}A978H}@dGpvs@uAu`vcw9*!aFa+ai%(b!aXa8.a?a[ozWey=sU2@G}Nch&U#Rf_WexKu+D#'!t:~Gr`~?r^j]uNr|~FRg*j^psurwJt|RmcKv)@&!)7Rkv~Br[@wxfO:Rl3co#U'6Rezj_q#vIuavjRltwzeyh@vr5JqD0!>aY?C9:9au@9Cb]}9cl#U*5;5<H||jbuus1ucv&Rfvg1v~d/pppzqFr^a--a~!aMat1(hFv;Wiz@@=Izoj5uuv-7Rix~Cw`fk2WlVcZ#X,k)u3vWs@u2]ktg;wEx'fBq(_2Wg/jTv|vV~EfoJv]!15x'hzqG!(P~EfU~CRl_j6v(us5x4i-#T(2WmZ?C2F|d>Kq<aj1!*jTqIsBv=Wl`~Cw`fi2WlWj`v0u*~>RlR=c>Z,k#u3vWs@u2]kr<c1Z+jTqIsBv=Wla~Cw`fm2WlXdmb3!a{(arZa`bkTa%TbQTa-a9+c'!aM!/[yL=Bqug.w'RifhFvyDRj.g>vgwyk^9]k^Jv3_@WfbAARkhJw2_[x|JvB_wkoIRoKwkoJRoLd'(Y#<]gm=<9<H|yd'%_X#skDtb3awwqkgNulRkgdB#^',9:p'hJwSaxRmEBwVb8@4=H|qLu+w50&!)@3qs~?pU>Awwn;;Rn=c:Z'ARn<=<qwKvC@!/&~BqqJv6!&]eVb^z^xRge'/a%+^`#Sge}6<4Rn3=]n0Pw2>Rn8Jw0!&>Rn:>Rn6cY#a7+!a&=<wkaNw~h3z_c5Z{=wjh#=]nLKv^D!&)Vyz=bW|swYb<WetcG#T(2wxa@qVx@gD#Y&b^|V5JwG&!5bb|pg/w&RgD@x=kHs=uAvn!a%%/'+RmSRh694Ro`g-vaRmRhHv-]mlxCcS#`&ba~.5cD#Ta)P~=d,#Y(56H{>978H{Dd_#{2^Y%_+qbbb{6g3sERhsbU{?dfa.,`a(Xa<!aiX#(55RiG54RiHcI#T'WiU3RiVNvdwtfcRlKNvdd,#Y&RlHRlExQgf.1*^T'X#Sgf}6Wn4=]hfPrk>Rn7Jw0!&>Rn5>Rn9Lunw?&a2!,5<oq@@wqfdRlJj5Q~=d,#Y(~ARfcOuN]fdDKw;ay(}i!547E}j?cI#T(@5bV}iCbV}hdv(^^Tb?a40,b##Tbo!a*bR!a<b|a/!aKai!aU[yK=]o^g:v>ReGJwPZtK<7Rh+h<~El,Pv#5ReR@awwxjCg,ulRjDJv6&!]j!z?aQeeg>w=Sh<eeJw;!&axEzOg,Qosc!#*:wkeJ]eJ>x'h-u(!%Ro.w~h.zPdNZ(X,Ya![x{;9ReY;wkgxRiF:x?ap#Y&RmUg<s2Rkod]+UY0TZ'!a&A9sw<=bczLNvuw{gqzNhJwSaxRmCKuLay!#&s_Rf-55b^{uJvZa!!c%#(55Ri654wmiu5RiuawLu,vp!+}^%b_}Y9;wkgxba}o>A9:=b^}zKuh=a''!3awRk3c*'!#aHRk6c+Z&Rk5Rk4Jv)&!awRjSawd9*`#0?C2@EzMj8u<uJ5RmbjQrquJu3x,k>uq@_+=ayb^|W~ARkEOuN]k@7dhzV^X/X&a-#zRzSb`zXcJzTT#2WkVKvDBzW!%FzY9;5bbzWjQrquJu3Jw3%!b`zU=ayb^zQd:#X(T-a!6Vyywxh}=b]{Jg=u1RiAdGp~qHtzv!w(wA+a+a;<!aJaYai'anasb(=azRmV:Cbb{MLq2vb!%')RjuRjrRjtRjqx3jnqCw3!%')Rk(Rk+Rk&Rk)Lq2vb!%')Rj{RjxRjzRjwLq2vb!%')RjsRjpRjfRjex3jcqCw3!%')Rk'Rk*RjkRjl9<CbbzfOu4ARhxLq2vb!%')RjyRjvRjhRjgx=joq*uKvb!%')+-Rk.Rk%Rj~Rk-Rk#Rj}x=jdq*uKvb!%')+-Rk,Rk!Rj|RjmRjjRjidAq&qKs@uAv8Aa.'*-a@a&0!aM@a5[y73Dsy3Ds|3Dt):wxgI2sHJwJZt.~Gqxwsf0ikrzt}Rl0Jvy_[xj~HqzKv_A|D!&WfP8axRoVcf,U#k(v]v+ueunaXRf1Ju}'!g8u#Ri=jQw!sCunLprq>!,')~<5qeGzq9F{W=c##%s5au:5aU3CBE|;d4#X(D!a&6Vygx(b;#(=]ed?C2F{N<capoq2r[a&!aPa9,'Pw;5s:@@=I|,55w_h|@@=IzcP~=x'fCqB_2Wl2>aU@@=I|1OuNBc1Z+jTqIsBv=Wlc~Cw`fl2WlZ~AcTa%!Z+jTqIsBv=Wlb~Cw`fh2WlYk+uNqJsBv=WlSg,u3dca3#UXaMYa)TaB-=cM|7T#<bI}l5@B932:aV2G{BOuNBJq:|M!5Ezt=<B=C@a^<B57@2F{v>cB{/T#=ay<bI{3Jv6!a.6BKq0ah&+!5E}HP~Ef{978BaU@@=Iza<7d#.Y#978BaU@@=IzH~AJq0!(@@=IzG978BaU@@=IzFe,aU*Y&^^^bvJb,b:bFad!a,c2Ta>aL.bo6!a#CbTa'T#Re{2Wlh2@G{yg6t~Ro_NvdRfticuRQRllJv3&!x&c|zs@Jw3!%RflwpfkRlpKuL;%(!Re<@G|C2GzdhIvuBwgjAg-u0RjAKQB%!(GzZ@G|5NuuRl7d='T+Y#Vy[g<v~Rm!==G|>JvA!)@wma=]m1ifuaw&RmnLs@vT'!|/+[y,g:v>ReTJw1!#qX=x!eC{bLu+wT&)ZtZauq_~Graci&U#F|89:r_Lupvq!.)&2RlG8RfaC=x!eF{_h?rpWlmd&'!#X|&]k::xJey#`'T|+<E|&2@H|%dE#(^,g;u.RiEg6vjRiC9xCkA{O|zY#g=ucRmXKs0@!&*@G|m@awRknJuh!,3d(}gY}eJvj!%Rm):Jw3!%Rm+Rm-Ls0w(&!a(a#@b[|6cZ#X'7RkxWgAOu4ARn'dH'U#Y*Vz-Wm'CARm}d]*#a%^a*T'aK!a<9bV{PC=p*Jw4!&SgxcbB5r]idw(wBRmF7xFkt#&`(Rm/Rm8E|!JuY_9:Rl5=wrgr2:bbxd@xXfB(a*#T+!.X0X1Ta/a'T&RlDRfL>RlyARl9b[z[>RfZ:RlL:RfRwlg/ARl;9;RlxKv,A/!%7s69<74=BA5ba{-8Bde#`a<XaKYa1,a'P~=wxfB2bZ}}?C972@@=I}r8@55B9;5bb}G978B2@@=aybb}3j3vLv;<Jw3&!>Rfk=ayb^}4~Ad1#`*@@=aybb{w2@>==<bbz]dx+UY#^UaF!a9!bB'Ya1.!ajXa#%olRhD[y=3Dt#Ov5BrHKuMB%!(Rf^Wep~HrJwkiQjKr|~FRg)Ku+D#'!t5~GrF~?rDdV)UY,Z/_7RkuG{<~BrBg,rlsO:235B@bX}|d?a1!#`(6Vyn5@d##Y+jTv|vV~EfIj]uNpn~FRfH7Lq2vb1!a9-978BaU@@=Iz9978BbU}#~AJq0!(@@=Iz8978BaU@@=Iz7~AJQ|}!978BbU}!JvkaK!AdUa21-U#`a+(g/vsRn~Ou!5RPj:rmu9WhOjXuvvNr}:RhAj^v(pyw8unRn[kPr}p|u7vwv]RiSBd;pppzq@qHQa?(b.!a.a`@.|xa(hFv;Wiyj5uuv-7Riw~Cw`fg2WlU978BbU|wOuNBJqG!(P~EfD~CRlQcZ#X,k)u3vWs@u2]ksg;wEx'f@q1_2Wg.j]uNpn~FRfqJv]!15x'h{qG!(@@=IzK~CRl^j6v(us5x4i,#T(2WmY?C2F{1>Kq<aj1!*jTqIsBv=Wld~Cw`fj2Wl[j`v0u*~>RlT=c>Z,k#u3vWs@u2]kq<c1Z+jTqIsBv=Wle~Cw`fn2Wl]dn1#c(a(b^a2!b/bAT(bj!aDa7bu,a_a{c0!2T0g:v>ReD2@G{42@G{5~DpM~<5rc=Bx6i>{RT#RnI@zCx]y]z:2Jv[!zr5Awyk]9]k]dD(Y+X#6Vz.g=wKtgwhaCwgmTWj2Lu,w%_+/[y-B;b^xeg3u3Rj-2@bX{*KrJ<!+'@Wg(g?QRlC@Jv`!%b[zIwsfII}8JQ_@w|kW|=Jv(%!AqcOuNBJvEzh!bYzjLs@wP#(0!oy@>RkdJwMZtc3Dtd@BcG#T'9bWxg2@2Fznd*#Y+;2x'c}w<zizixNgwa#Z'U+!/!a'!a+w~g~z6wcn{Rn}wcnzRn|5Rh%=]nJg5vuRmvNvdRlvcprJu}w*az*a#!%.a.'Bot9qT]kj@Wg'ay2Gzv@Jv`!%b[zEwsfHI}1;ck#Ux`<Cbbx_Lu+w!a&0*!wko*wwo,So,}6Juqxf!E}PigQuyRm`d3(`#8>Rn%:A5B;bZ~%KvhCa!a2!x>k7#Uxb@b{#xaRk7Jw0!)>wwhlShl}6>wwhmShm}6CJvB!.x'hhvj{!!5Bwkhhbaz}x'hivjz~!5Bwkhibaz|xEhTrNu,v-vpD!a%&/)a3a.,%Ro2t[CE{)@3re9b]{%wjo09:rgc:Z&Ro6=<riifuaw&RmoKrNA!%(Ro4>Ro89;Ri`dSaL'UYzxZb)7Rka3xRhT&!,!#^1U}vbaz{>>@=be}yC@:D5bazzKu+A&!}{?ba}y>>@=be}wxBh[t`u~vJvr!%a!a()a,a0a4RoC=]o;Ju(!%RoGRhdwjh`=]oAg>w#Ro?g5vuRo=NvdRl|Ku]C.!&;RoEJvB!%RoORoMBx'h[v+_?w~h`}~5?w~hd~!xKh]oiptu-utv.vp!#%&a30a@a'a+(a/aOp(o~p!RoDJu(!%RoHRhewjha=]oBNvdRl}g>w#Ro@g5vuRo>c[#X']o<CauRoRAd-#Y':RkpauRoQKu]C.!&;RoFJvB!%RoNRoPBx'h]v+_?w~ha}t5?w~he}ue!/UbhYacXaW^Tc&a;b:a-c/#b&aja1(!cL+!bKbt!bmcRc9aIc?8[yW3Dtt94Rg`Jv}!&SiRMzBhEebShEMNuPRe>x7gL#TzuwjirRipc<Z&>on;>z=h-MSh.Mwqczx'a7vj&!>Re4@=ResJt__NuPRi*NuPRi)j]uNr|~FRfzKrJ>_+@Wfy@Wf]2WocKrJ<!+'@Wg%g/QRl@@Jv`!&awRl<wsfFIzgLu(w*!.*&ShBMwvhIRhI9;RhNx1hK'!#Sn]Mx1hK~0!#:2<H~7cNu+w7D*'1ZtW>Rn1~?rOc:Z&Rn2=<rQ<7wjh&=BSnLMc]#X(6Vz)w[b=a!U#9wzgMc3#&(RgMRitRis<x,gKt`ax!&+SioM=BSilMc3#&(RgKRinRimKurB,!&SiQMzBhDebShDM6BJQ!(P~Efx978B2@@=I}WLrJw!!,a*&@G}O@9wkibRid@@x'fKwC!&SlDMSfLMjUv~Q~EfKKv3@a+!(hFv-]mpx/hYZ(C5RiWz<o/MwkhY?So/M@x,gbvfB*&!SgEM:SoeeehFu3:Rgbda(,^TZa)X/7Sg[eb:2RgI~BrMC@wgkc:wwkcRerx3h(uUvK!&*,SnOM4Sh*MArRg;wHRh(x=h;rJvPwI!a4',a'0@Wg&=BSh/Mg>w=Rh=g3w*wwgGRgGcW(X#;Sg}M2Gzk@Jv`!&awRl=wsfGIz`dKZ*T'Y-:RhR7RhQg5u-p`j6v(us5d,#Y+~Awkia?RicOuNBwkibba}Ld6p~tyu_vbAa'a+!a/'a3aEa8a!>Sh,ebJv{!&Sh@ebSaReb9;SgwebNuPRi(NvdRl)NuPRi'hHu^<Rm^Jvv_@Wl(g;u1Si/ebKu'B&!*Sh?eb@Wl'z@aPeb95Si.ebcpputyvjB)!,&a+0a%ShAMWeK@G}C@WfJ9;RhMwvhH9w{ia}ix,hJvRA1(!zAn[MRhHx1hJ~*!#hFv(BSn[MBJQ!(@@=I~'978B2@@=I}2db.Ua<'X}+T#a0XaG2G}E;wkg|wuh!Rh!x,hZu,@)!&So0MVy)C5RiXACJvB!&5RiY5RiZg8w)cG}*T#2@bU}=KsA>(!a.3wkhZba~(x,h^u(A!&(SoCMRhb5Bz=h[eb?w~hb~6x,h_u(A!&(SoDMRhc5Bz=h]eb?w~hc~6e)aA1T#T,^^^c-bMb&blcPaP(a/!0!bA=b5c@a(!bfbrc#2afwmhARnjwchORnp2Wlf3DtsNvdRl-2@wpa<]m0bx(#:awRk2@Jw3!%RfhwpfgRlnKQB%!(G{V@G|'NuuRl6d='T+Y#VyUg<v~Rl~==G|<Jv+'!aYShC}6@B<5?ba~8@Jw3'!g2QRljhLrpWlOd+#Y'g.w'rIg>w*wgj@g-u0Rj@Lu+wT&)ZtUauq]~GrGci&U#F|39:rELrNvj!.%*RhCwunfw~nf~:9;Ri]>wtnhg;wHRnhx3hDs@v~!/+'@Wfr@9RkSNu&Rlo=@<5GzoKs0@_+@Wl+@awRkmJuh!-3d(}pY#qWJvj!%Rm(:Jw3!%Rm,Rm*de&!1U-U#`)Re;@G|.@9Ri82@wjfvRlq=@<5GzpLvOvr!).&2RlF8Rf`C=x!eE{.Jw3_g2QRlkhLrpWlPde(!#U{s,UXa*Ta'[y'g:v>ReS;x0PZ&RnlRnn~HrKJw1}f!=x!eB|2w]aP(#Xa&a*Ta.Ua2a7=]iOd'#Y&Ro&WnWg;u.RiDg6vjRiBNvdRlzhNvj]nYJuW_2Wm3x)kFze{9d])!a.!,Y01!#&aC!a3RndC=ox~BrC@2b^{pg,rlse7x'ksuq!%Rm.E{xidw(wBRmGx9o+)X#wwo-So-}69:Rl4@xSf@a#XZ'X)X,Ta(/ARl8b[xc>RfY:RlI:RfQwlg.ARl:9;Rlwdn'#^XafaQa1X1TaHTa)@b[{zcZ#X'7RkwWg@Ou4ARn&x)kG#{,g7u/RkGdH'U#Y*Vz'Wm&CARm|bx#(A]gUbUzJj9Q~=d,#Y(56H}l978H{U7d,0#U*2>ABb_xZ978BbU{e~AJQ{g!978BbU{hxMh?ad{oUYZ.x1h?{l!#:2<H{mx3n[t{vl!,&a%3Ro(z=iS}6ARnr=Bwsn^wvn`Rnbd`*T}B0!#^X'BG{c9b]{a>>@=be}F?JvS!&BG{d7BG}(Bde#`a1X,Ya@!a'P~=wxf@2bZ}I56B2@@=aybb}08@55B9;5bb}<j3vLv;<Jw3&!>Rfg=ayb^}&OuNBKuLA!)a!P~=x#fD{f2@>==<bbzl?C972@@=Ix^d6rSu,v7w*C(0a)a6#B+a%!sQ[y?3Dt%3[xn~<5rLOu!5p@Ku+D#'!t7~GrP~?rNKvlaya7'!h+v-5qMg=t|cd,U#5AAaa5Abb{S@52B5@a[@52B5Gx[iXueu;d<#`a(!/549C;ag>23ExY5@Dah89b^~689Jv)!~2b[~1Lv'w(%*!a#bX|aPrmawRe]keu7uhv-q6rxu,q`xTo]/a5aU!bNaDXbi!b-!ao!b<bwA!#5@B932:aV2G|:d-)Y#hJrL>RhG<7@C5<H|_=Cau:5aj5@B932:bJ|ng>vIbs)#?C2F|9jPv0w.vISh-MKvUaz(.!9ABbb|[5;5<H|Eg>unwfh;9:4E|YjQsBt|vjx'hYq3!(?C2F|J:2<BaY?C2F|GOu!5x,g|p{ah!-(?C2F|c9:4E|OjXuvvNr}:Rh&i[w*t|cd+U#jJvsu)vsSn~Mkfrmu9p}u7vwv]So!McW#Xa!ax5@A5aY:5;5<H|>kJv~vYrquJu3x4ib#T)2@SmZM?C2F|Bj:rmu9@xPhI(a*a#U#`a3-5Abb|L~@:RhK9:4E|0@52B5G|#C::aY?C2F|-:2<BaY?C2F|.5Jvk!a)javYrquJu3x4ia#T)2@SmYM?C2F|HAxPhH(!a#U#`a*-5Abb|4~@:RhJ9:4E|R@52B5G|F:2<BaY?C2F|Sc^#Xa2j=Qq5CJvB!-g<v{z;hhM?C2F|Zi[vrv{z;hiM?C2F|XKsA>!a)-g<v{z;h[eb?C2F|]i[vrv{z;h]eb?C2F|^iZu.vix,hZq3ah!.(?C2F|QOu!5ShXM:2<BaY?C2F|P",13494,2713,49,25,61);var Mn;(function(n){n[n.VALUE_LENGTH=49152]="VALUE_LENGTH",n[n.FLAG13=8192]="FLAG13",n[n.BRANCH_LENGTH=8064]="BRANCH_LENGTH",n[n.JUMP_TABLE=127]="JUMP_TABLE",n[n.VALUE_MASK=8191]="VALUE_MASK"})(Mn||(Mn={}));var qn;(function(n){n[n.AMP=38]="AMP",n[n.NUM=35]="NUM",n[n.SEMI=59]="SEMI",n[n.EQUALS=61]="EQUALS",n[n.ZERO=48]="ZERO",n[n.NINE=57]="NINE",n[n.LOWER_A=97]="LOWER_A",n[n.LOWER_X=120]="LOWER_X"})(qn||(qn={}));var xu=32,Gm=21,K1=2097151,Rd=2047,Wm=0;function Q1(n){let e=n>>>Gm;return e===Rd?Wm:e}function Xm(n){return n-qn.ZERO>>>0<=9}function eS(n){return(n|xu)-qn.LOWER_A>>>0<=5}function $m(n){return(n|xu)-qn.LOWER_A>>>0<=25}function tS(n){return n===qn.EQUALS||$m(n)||Xm(n)}var Vm;(function(n){n[n.EntityStart=0]="EntityStart",n[n.NumericStart=1]="NumericStart",n[n.NumericDecimal=2]="NumericDecimal",n[n.NumericHex=3]="NumericHex",n[n.NamedEntity=4]="NamedEntity"})(Vm||(Vm={}));var Cd;(function(n){n[n.Legacy=0]="Legacy",n[n.Strict=1]="Strict",n[n.Attribute=2]="Attribute"})(Cd||(Cd={}));function nS(n,e,t,i){let s=(e&Mn.BRANCH_LENGTH)>>7,r=e&Mn.JUMP_TABLE;if(r){if(s===0)return i===r?t:-1;let c=i-r;if(c>>>0>=s)return-1;let h=n[t+c];return h===0?-1:t+s+h-1&65535}if(s===0)return-1;let o=s+1>>1,l=t+o+s;for(let c=0;c<s;c++){let d=n[t+(c>>1)]>>((c&1)<<3)&255;if(d===i){let p=t+o+c;return l+n[p]&65535}if(d>i)return-1}return-1}function Hm(n,e,t){return t===1?String.fromCharCode(n[e]&Mn.VALUE_MASK):t===2?String.fromCharCode(n[e+1]):String.fromCharCode(n[e+1],n[e+2])}function iS(n,e,t){let i=e+1,s=0,r=i;if(i<t&&(n.charCodeAt(i)|xu)===qn.LOWER_X)for(i+=1,r=i;i<t;){let l=n.charCodeAt(i);if(Xm(l))s=s*16+(l-qn.ZERO);else if(eS(l))s=s*16+((l|xu)-qn.LOWER_A+10);else break;i+=1}else for(;i<t;){let l=n.charCodeAt(i)-qn.ZERO;if(l>>>0>9)break;s=s*10+l,i+=1}if(i===r)return 0;i<t&&n.charCodeAt(i)===qn.SEMI&&(i+=1),s>1114111&&(s=1114112);let o=i-e;return o>=Rd&&(Wm=o,o=Rd),o<<Gm|s}function sS(n,e,t){let i=zm,s=n.indexOf("&");if(s<0)return n;let r=n.length,o=0,l="",c=i[0],h=c&Mn.JUMP_TABLE,d=(c&Mn.BRANCH_LENGTH)>>7;do{let p=s+1,m=n.charCodeAt(p),x,_;if(m===qn.NUM){let A=iS(n,p,r);x=Q1(A),e&&x>0&&n.charCodeAt(p+x-1)!==qn.SEMI&&(x=0),_=x===0?"":Om(A&K1)}else if($m(m)){x=0,_="";let A=m-h,v;if(A>>>0<d){let R=i[1+A];v=R===0?-1:d+R&65535}else v=-1;let y=0,P=0,I=v<0?0:i[v],E=p+1;e:for(;E<r;){for(;(I&(Mn.VALUE_LENGTH|Mn.FLAG13))===0&&(I&Mn.JUMP_TABLE)!==0;){let M=I&Mn.JUMP_TABLE,k=(I&Mn.BRANCH_LENGTH)>>7;if(k===0){if(n.charCodeAt(E)!==M)break e;v+=1}else{let X=n.charCodeAt(E)-M;if(X>>>0>=k)break e;let W=i[v+1+X];if(W===0)break e;v=v+k+W&65535}if(I=i[v],E+=1,E>=r)break e}if((I&(Mn.VALUE_LENGTH|Mn.FLAG13))===Mn.FLAG13){let M=(I&Mn.BRANCH_LENGTH)>>7;if(n.charCodeAt(E)!==(I&Mn.JUMP_TABLE))break;E+=1;let k=M-1,X=v+1,W=0;for(;W+1<k;W+=2){let F=i[X];if(n.charCodeAt(E)!==(F&255)||(E+=1,n.charCodeAt(E)!==(F>>8&255)))break e;E+=1,X+=1}if(W<k){if(n.charCodeAt(E)!==(i[X]&255))break;E+=1}v+=1+(M>>1),I=i[v];continue}let R=I>>>14,L=n.charCodeAt(E);if(R!==0){if(L===qn.SEMI){x=E-p+1,_=R===1?String.fromCharCode(I&Mn.VALUE_MASK):Hm(i,v,R);break}if(!e&&(I&Mn.FLAG13)===0&&(x=E-p,y=v,P=R),R===1)break}let V=nS(i,I,v+(R||1),L);if(V<0)break;v=V,I=i[v],E+=1}if(_===""){let R=I>>>14;R!==0&&!e&&(I&Mn.FLAG13)===0&&(x=E-p,y=v,P=R),x>0&&(_=Hm(i,y,P))}}else x=0,_="";x===0||t&&m!==qn.NUM&&n.charCodeAt(p+x-1)!==qn.SEMI&&p+x<r&&tS(n.charCodeAt(p+x))?s=p:(o<s&&(l+=n.slice(o,s)),l+=_,s=o=p+x),n.charCodeAt(s)!==qn.AMP&&(s=n.indexOf("&",s))}while(s>=0);return l+n.slice(o)}function vu(n){return sS(n,!0,!1)}var qm;(function(n){n[n.XML=0]="XML",n[n.HTML=1]="HTML"})(qm||(qm={}));var Ym;(function(n){n[n.UTF8=0]="UTF8",n[n.ASCII=1]="ASCII",n[n.Extensive=2]="Extensive",n[n.Attribute=3]="Attribute",n[n.Text=4]="Text"})(Ym||(Ym={}));var oS=class{src_Any=Md.source;src_Cc=wd.source;src_Z=Ad.source;src_P=Ba.source;src_ZPCc=[this.src_Z,this.src_P,this.src_Cc].join("|");src_ZCc=[this.src_Z,this.src_Cc].join("|");cache={};opts={maxLength:1e4,urlAuth:!1,schema_names:[]};constructor(n={}){this.opts={...this.opts,...n}}set(n={}){return this.opts={...this.opts,...n},this.cache={},this}escapeRE(n){return n.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}nestedPairRE(n,e,t=4){let i=this.escapeRE(n),s=this.escapeRE(e),r=`(?:(?!${this.src_ZCc}|${i}|${s}).)`,o=`${i}${r}{0,1000}${s}`;for(let l=2;l<=t;l++)o=`${i}(?:${r}|${o}){0,1000}${s}`;return o}get_text_separators(){return this.cache.text_separators??=/[><\uff5c]/}get_pseudo_letter(){return this.cache.src_pseudo_letter??=new RegExp(`(?:(?!${this.get_text_separators().source}|${this.src_ZPCc})${this.src_Any})`)}get_ipv4_addr(){return this.cache.src_ip4??=new RegExp("(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])[.]){3}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])")}get_ipv6_addr(){let n="[0-9A-Fa-f]{1,4}",e=`(?:(?:${n}:${n})|${this.get_ipv4_addr().source})`;return this.cache.src_ip6_addr??=new RegExp(`(?:(?:${n}:){6}${e}|::(?:${n}:){5}${e}|(?:${n})?::(?:${n}:){4}${e}|(?:(?:${n}:){0,1}${n})?::(?:${n}:){3}${e}|(?:(?:${n}:){0,2}${n})?::(?:${n}:){2}${e}|(?:(?:${n}:){0,3}${n})?::${n}:${e}|(?:(?:${n}:){0,4}${n})?::${e}|(?:(?:${n}:){0,5}${n})?::${n}|(?:(?:${n}:){0,6}${n})?::)`)}get_ipv6_url_host(){return this.cache.src_ip6_host??=new RegExp(`\\[${this.get_ipv6_addr().source}\\]`)}get_ipv6_mail_host(){return this.cache.src_ipv6_mail_host??=new RegExp(`\\[IPv6:${this.get_ipv6_addr().source}\\]`)}get_auth(){return this.cache.src_auth??=new RegExp(`(?:(?:(?!${this.src_ZCc}|[@/\\[\\]()]).){1,50}@)?`)}get_port(){return this.cache.src_port??=new RegExp("(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?")}get_host_terminator(){return this.cache.src_host_terminator??=new RegExp(`(?=$|${this.get_text_separators().source}|${this.src_ZPCc})(?!${this.opts["---"]?"-(?!--)|":"-|"}_|:\\d|\\.-|\\.(?!$|${this.src_ZPCc}))`)}get_path_terminator(){return this.cache.src_path_terminator??=new RegExp(`${this.src_ZPCc}|${this.get_text_separators().source}`)}get_path(){return this.cache.src_path??=new RegExp(`(?:[/?#](?:${this.nestedPairRE("[","]")}|${this.nestedPairRE("(",")")}|${this.nestedPairRE("{","}")}|\\"(?:(?!${this.src_ZCc}|["]).){1,100}\\"|\\'(?:(?!${this.src_ZCc}|[']).){1,100}\\'|\\'(?=${this.get_pseudo_letter().source}|[-])|\\.{2,20}[:]?[a-zA-Z0-9%/&]|\\.(?!${this.src_ZCc}|[.]|$)|`+(this.opts["---"]?"\\-(?!--(?:[^-]|$))(?:-{0,19})|":"\\-{1,20}|")+`,(?!${this.src_ZCc}|$)|;(?!${this.src_ZCc}|$)|\\!{1,20}(?!${this.src_ZCc}|[!]|$)|\\?(?!${this.src_ZCc}|[?]|$)|`+this.get_path_extra().source+`[\\\\/:%@#&=_~*]|(?!${this.get_path_terminator().source}).){1,${this.opts.maxLength}}|\\/)?`)}get_mail_name(){return this.cache.src_mail_name??=new RegExp("[-!#$%&'*+/=?^_`{|}~a-zA-Z0-9](?:[-!#$%&'*+/=?^_`{|}~a-zA-Z0-9]|[.](?=[-!#$%&'*+/=?^_`{|}~a-zA-Z0-9])){0,63}")}get_xn(){return this.cache.src_xn??=new RegExp("xn--[a-z0-9\\-]{1,59}")}get_tld(){if(this.cache.tld)return this.cache.tld;let n=[...new Set(this.opts.tlds||[])].sort().reverse().join("|");return this.cache.tld=new RegExp(`${n||"$#none#$"}|${this.get_xn().source}`),this.cache.tld}get_domain_root(){return this.cache.src_domain_root??=new RegExp("(?:"+this.get_xn().source+`|${this.get_pseudo_letter().source}{1,63})`)}get_domain(){return this.cache.src_domain??=new RegExp("(?:"+this.get_xn().source+`|(?:${this.get_pseudo_letter().source})|(?:${this.get_pseudo_letter().source}(?:-|${this.get_pseudo_letter().source}){0,61}${this.get_pseudo_letter().source}))`)}get_url_host_port(){return this.cache.url_host_port??=new RegExp("(?:"+this.get_ipv6_url_host().source+`|(?:(?:(?:${this.get_domain().source})\\.){0,10}${this.get_domain().source}))`+this.get_port().source+this.get_host_terminator().source)}get_fuzzy_url_host_port(){return this.cache.fuzzy_url_host_port??=new RegExp("(?:"+(this.opts.fuzzyIP?this.get_ipv4_addr().source+"|":"")+`(?:(?:(?:${this.get_domain().source})\\.){1,10}(?:${this.get_tld().source})))`+this.get_host_terminator().source)}get_mail_host(){return this.cache.src_mail_host??=new RegExp("(?:"+this.get_ipv6_mail_host().source+`|(?:(?:(?:${this.get_domain().source})\\.){0,4}${this.get_domain().source}))`+this.get_host_terminator().source)}get_fuzzy_mail_host(){return this.cache.src_fuzzy_mail_host??=new RegExp("(?:"+this.get_ipv6_mail_host().source+`|(?:(?:(?:${this.get_domain().source})[.]){1,4}${this.get_domain_root().source}))`+this.get_host_terminator().source)}get_path_extra(){return this.cache.src_path_extra??=new RegExp("")}get_fuzzy_mail_host_search(){return this.cache.mail_fuzzy_host_search??=new RegExp(`@${this.get_fuzzy_mail_host().source}`,"ig")}get_fuzzy_link_search(){return this.cache.link_fuzzy_search??=new RegExp(`(^|(?![.:/\\-_@])(?:[$+<=>^\`|\uFF5C]|${this.src_ZPCc}))(?:(?![$+<=>^\`|\uFF5C])${this.get_fuzzy_url_host_port().source}${this.get_path().source})`,"ig")}get_http_validator(){return this.cache.http_validator??=new RegExp("\\/\\/"+(this.opts.urlAuth?this.get_auth().source:"")+this.get_url_host_port().source+this.get_path().source,"iy")}get_relative_proto_validator(){return this.cache.relative_proto_validator??=new RegExp((this.opts.urlAuth?this.get_auth().source:"")+`(?:localhost|${this.get_ipv6_url_host().source}|(?:(?:${this.get_domain().source})[.]){1,10}${this.get_domain_root().source})`+this.get_port().source+this.get_host_terminator().source+this.get_path().source,"iy")}get_mail_name_validator(){return this.cache.mail_name_validator??=new RegExp(`(?:^|${this.get_text_separators().source}|"|\\(|${this.src_ZCc})(${this.get_mail_name().source})$`)}get_mailto_validator(){return this.cache.mailto_validator??=new RegExp(`${this.get_mail_name().source}@${this.get_mail_host().source}`,"iy")}get_schema_names(){return this.cache.schema_names??=new RegExp((this.opts.schema_names||[]).map(n=>this.escapeRE(n)).join("|"))}get_schema_search(){return this.cache.schema_search??=new RegExp(`(^|(?!_)(?:[><\uFF5C]|${this.src_ZPCc}))(${this.get_schema_names().source})`,"ig")}get_schema_at_start(){return this.cache.schema_at_start??=new RegExp(`^${this.get_schema_search().source}`,"i")}},Pd={validate:(n,e,t)=>{let i=t.re.get_http_validator();i.lastIndex=e;let s=i.exec(n);return s?s[0].length:0},normalize:(n,e)=>e.normalize(n)},aS={"http:":Pd,"https:":Pd,"ftp:":Pd,"//":{validate:function(n,e,t){let i=t.re.get_relative_proto_validator();i.lastIndex=e;let s=i.exec(n);return s?e>=3&&n[e-3]===":"||e>=3&&n[e-3]==="/"?0:s[0].length:0},normalize:(n,e)=>e.normalize(n)},"mailto:":{validate:function(n,e,t){let i=t.re.get_mailto_validator();i.lastIndex=e;let s=i.exec(n);return s?s[0].length:0},normalize:(n,e)=>e.normalize(n)}},lS="a:cdefgilmnoqrstuwxz|b:abdefghijmnorstvwyz|c:acdfghiklmnoruvwxyz|d:ejkmoz|e:cegrstu|f:ijkmor|g:abdefghilmnpqrstuwy|h:kmnrtu|i:delmnoqrst|j:emop|k:eghimnprwyz|l:abcikrstuvy|m:acdeghklmnopqrstuvwxyz|n:acefgilopruz|o:m|p:aefghklmnrstwy|q:a|r:eosuw|s:abcdeghijklmnortuvxyz|t:cdfghjklmnortvwz|u:agksyz|v:aceginu|w:fs|y:et|z:amw",cS="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|\u0440\u0444";function uS(){let n=cS.split("|");return lS.split("|").forEach(e=>{let t=e.indexOf(":"),i=e.slice(0,t);for(let s of e.slice(t+1))n.push(i+s)}),n}var hS={fuzzyLink:!1,fuzzyEmail:!0,fuzzyIP:!1,"---":!1,tlds:uS(),urlAuth:!1,maxLength:1e4},Jm=class{schema;index;lastIndex;raw;text;url;constructor(n,e,t,i){let s=n.slice(t,i);this.schema=e.toLowerCase(),this.index=t,this.lastIndex=i,this.raw=s,this.text=s,this.url=s}},Zm=class{__opts__;__schemas__;re;constructor(n={}){let{rebuilder:e,...t}=n;this.__opts__={...hS,...t},this.__schemas__={...aS},this.re=e||new oS,this.re.set({...this.__opts__,schema_names:Object.keys(this.__schemas__)})}add(n,e=null){if(!e)delete this.__schemas__[n];else{let t={normalize:(i,s)=>s.normalize(i),...e};this.__schemas__[n]=t}return this.re.set({...this.__opts__,schema_names:Object.keys(this.__schemas__)}),this}set(n={}){return this.__opts__={...this.__opts__,...n},this.re.set({...this.__opts__,schema_names:Object.keys(this.__schemas__)}),this}test(n){if(!n.length)return!1;let e,t;for(t=this.re.get_schema_search(),t.lastIndex=0;(e=t.exec(n))!==null;)if(this.testSchemaAt(n,e[2],t.lastIndex))return!0;if(this.__opts__.fuzzyLink&&this.__schemas__["http:"]&&(t=this.re.get_fuzzy_link_search(),t.lastIndex=0,t.exec(n)!==null))return!0;if(this.__opts__.fuzzyEmail&&this.__schemas__["mailto:"]&&n.indexOf("@")>=0){let i=this.re.get_fuzzy_mail_host_search(),s=this.re.get_mail_name_validator();for(i.lastIndex=0;(e=i.exec(n))!==null;){let r=n.slice(Math.max(0,e.index-65),e.index);if(s.test(r))return!0}}return!1}testSchemaAt(n,e,t){return this.__schemas__[e.toLowerCase()]?this.__schemas__[e.toLowerCase()].validate(n.slice(0,t+this.__opts__.maxLength),t,this):0}match(n){let e=[],t=this.re.get_schema_search(),i,s,r,o,l,c,h=!1,d=!1,p=!1,m=0;if(!n.length)return null;for(t.lastIndex=0,this.__opts__.fuzzyLink&&this.__schemas__["http:"]&&(i=this.re.get_fuzzy_link_search(),i.lastIndex=0),this.__opts__.fuzzyEmail&&this.__schemas__["mailto:"]&&(s=this.re.get_fuzzy_mail_host_search(),s.lastIndex=0,r=this.re.get_mail_name_validator());;){let x=Math.max(m-1,0);if(s&&r&&!p&&(!l||l.index<m))for(s.lastIndex<x&&(s.lastIndex=x);;){let P=s.exec(n);if(!P){p=!0,l=void 0;break}let I=r.exec(n.slice(Math.max(0,P.index-65),P.index));if(I){if(l={schema:"mailto:",index:P.index-I[1].length,lastIndex:P.index+P[0].length},l.index>=m)break;s.lastIndex<x&&(s.lastIndex=x)}}if(i&&!d&&(!o||o.index<m))for(i.lastIndex<x&&(i.lastIndex=x);;){let P=i.exec(n);if(!P){d=!0,o=void 0;break}if(o={schema:"",index:P.index+P[1].length,lastIndex:P.index+P[0].length},o.index>=m)break;i.lastIndex<x&&(i.lastIndex=x)}let _=l;(!_||o&&(o.index<_.index||o.index===_.index&&o.lastIndex>_.lastIndex))&&(_=o);let A;if(!h)for(;;){if(!c){t.lastIndex<x&&(t.lastIndex=x);let E=t.exec(n);if(!E){h=!0;break}c={schema:E[2],index:E.index+E[1].length,lastIndex:E.index+E[0].length}}if(c.index<m){c=void 0;continue}if(_&&c.index>_.index)break;let P=c;c=void 0;let I=this.testSchemaAt(n,P.schema,P.lastIndex);if(I){A={schema:P.schema,index:P.index,lastIndex:P.lastIndex+I};break}}let v=A;if((!v||l&&(l.index<v.index||l.index===v.index&&l.lastIndex>v.lastIndex))&&(v=l),(!v||o&&(o.index<v.index||o.index===v.index&&o.lastIndex>v.lastIndex))&&(v=o),!v)break;v===l?l=void 0:v===o&&(o=void 0);let y=new Jm(n,v.schema,v.index,v.lastIndex);y.schema?this.__schemas__[y.schema].normalize(y,this):this.normalize(y),e.push(y),m=v.lastIndex}return e.length?e:null}matchAtStart(n){if(!n.length)return null;let e=this.re.get_schema_at_start().exec(n);if(!e)return null;let t=this.testSchemaAt(n,e[2],e[0].length);if(!t)return null;let i=new Jm(n,e[2],e.index+e[1].length,e.index+e[0].length+t);return this.__schemas__[i.schema].normalize(i,this),i}tlds(n,e=!1){return n=Array.isArray(n)?n:[n],e?this.__opts__.tlds=this.__opts__.tlds.concat(n):this.__opts__.tlds=n,this.re.set({...this.__opts__,schema_names:Object.keys(this.__schemas__)}),this}normalize(n){n.schema||(n.url=`http://${n.url}`),n.schema==="mailto:"&&!/^mailto:/i.test(n.url)&&(n.url=`mailto:${n.url}`)}};var dS=/^xn--/,fS=/[^\0-\x7F]/,pS=/[\x2E\u3002\uFF0E\uFF61]/g,mS={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},Dd=35,ps=Math.floor,Id=String.fromCharCode;function lr(n){throw new RangeError(mS[n])}function gS(n,e){let t=[],i=n.length;for(;i--;)t[i]=e(n[i]);return t}function Km(n,e){let t=n.split("@"),i="";t.length>1&&(i=t[0]+"@",n=t[1]),n=n.replace(pS,".");let s=n.split("."),r=gS(s,e).join(".");return i+r}function Qm(n){let e=[],t=0,i=n.length;for(;t<i;){let s=n.charCodeAt(t++);if(s>=55296&&s<=56319&&t<i){let r=n.charCodeAt(t++);(r&64512)==56320?e.push(((s&1023)<<10)+(r&1023)+65536):(e.push(s),t--)}else e.push(s)}return e}var _S=n=>String.fromCodePoint(...n),xS=function(n){return n>=48&&n<58?26+(n-48):n>=65&&n<91?n-65:n>=97&&n<123?n-97:36},jm=function(n,e){return n+22+75*(n<26)-((e!=0)<<5)},eg=function(n,e,t){let i=0;for(n=t?ps(n/700):n>>1,n+=ps(n/e);n>Dd*26>>1;i+=36)n=ps(n/Dd);return ps(i+(Dd+1)*n/(n+38))},tg=function(n){let e=[],t=n.length,i=0,s=128,r=72,o=n.lastIndexOf("-");o<0&&(o=0);for(let l=0;l<o;++l)n.charCodeAt(l)>=128&&lr("not-basic"),e.push(n.charCodeAt(l));for(let l=o>0?o+1:0;l<t;){let c=i;for(let d=1,p=36;;p+=36){l>=t&&lr("invalid-input");let m=xS(n.charCodeAt(l++));m>=36&&lr("invalid-input"),m>ps((2147483647-i)/d)&&lr("overflow"),i+=m*d;let x=p<=r?1:p>=r+26?26:p-r;if(m<x)break;let _=36-x;d>ps(2147483647/_)&&lr("overflow"),d*=_}let h=e.length+1;r=eg(i-c,h,c==0),ps(i/h)>2147483647-s&&lr("overflow"),s+=ps(i/h),i%=h,e.splice(i++,0,s)}return String.fromCodePoint(...e)},ng=function(n){let e=[];n=Qm(n);let t=n.length,i=128,s=0,r=72;for(let c of n)c<128&&e.push(Id(c));let o=e.length,l=o;for(o&&e.push("-");l<t;){let c=2147483647;for(let d of n)d>=i&&d<c&&(c=d);let h=l+1;c-i>ps((2147483647-s)/h)&&lr("overflow"),s+=(c-i)*h,i=c;for(let d of n)if(d<i&&++s>2147483647&&lr("overflow"),d===i){let p=s;for(let m=36;;m+=36){let x=m<=r?1:m>=r+26?26:m-r;if(p<x)break;let _=p-x,A=36-x;e.push(Id(jm(x+_%A,0))),p=ps(_/A)}e.push(Id(jm(p,0))),r=eg(s,h,l===o),s=0,++l}++s,++i}return e.join("")},vS=function(n){return Km(n,function(e){return dS.test(e)?tg(e.slice(4).toLowerCase()):e})},yS=function(n){return Km(n,function(e){return fS.test(e)?"xn--"+ng(e):e})},bS={version:"2.3.1",ucs2:{decode:Qm,encode:_S},decode:tg,encode:ng,toASCII:yS,toUnicode:vS};var Ld=bS;var ig=Object.defineProperty,mg=(n,e)=>{let t={};for(var i in n)ig(t,i,{get:n[i],enumerable:!0});return e||ig(t,Symbol.toStringTag,{value:"Module"}),t},SS=mg({arrayReplaceAt:()=>MS,asciiTrim:()=>Mu,callable:()=>gg,escapeHtml:()=>cr,escapeRE:()=>LS,fromCodePoint:()=>za,isMdAsciiPunct:()=>Ga,isPunctChar:()=>xg,isPunctCharCode:()=>Ha,isSpace:()=>mn,isValidEntityCode:()=>Od,isWhiteSpace:()=>Va,lib:()=>kS,normalizeReference:()=>Su,unescapeAll:()=>Co,unescapeMd:()=>TS});function gg(n){let e=function(...t){return Reflect.construct(n,t,new.target&&new.target!==e?new.target:n)};return Object.defineProperty(e,"name",{value:n.name}),Object.setPrototypeOf(e,n),e.prototype=n.prototype,e}function MS(n,e,t){return[].concat(n.slice(0,e),t,n.slice(e+1))}function Od(n){return!(n>=55296&&n<=57343||n>=64976&&n<=65007||(n&65535)===65535||(n&65535)===65534||n>=0&&n<=8||n===11||n>=14&&n<=31||n>=127&&n<=159||n>1114111)}function za(n){if(n>65535){n-=65536;let e=55296+(n>>10),t=56320+(n&1023);return String.fromCharCode(e,t)}return String.fromCharCode(n)}var _g=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,wS=new RegExp(`${_g.source}|${/&([a-z#][a-z0-9]{1,31});/gi.source}`,"gi"),ES=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function AS(n,e){if(e.charCodeAt(0)===35&&ES.test(e)){let i=e[1].toLowerCase()==="x"?parseInt(e.slice(2),16):parseInt(e.slice(1),10);return Od(i)?za(i):n}let t=vu(n);return t!==n?t:n}function TS(n){return n.indexOf("\\")<0?n:n.replace(_g,"$1")}function Co(n){return n.indexOf("\\")<0&&n.indexOf("&")<0?n:n.replace(wS,function(e,t,i){return t||AS(e,i)})}var RS=/[&<>"]/,CS=/[&<>"]/g,PS={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function DS(n){return PS[n]}function cr(n){return RS.test(n)?n.replace(CS,DS):n}var IS=/[.?*+^$[\]\\(){}|-]/g;function LS(n){return n.replace(IS,"\\$&")}function mn(n){switch(n){case 9:case 32:return!0}return!1}function Va(n){if(n>=8192&&n<=8202)return!0;switch(n){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function xg(n){return Ba.test(n)||Ed.test(n)}function Ha(n){return xg(za(n))}function Ga(n){switch(n){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function Su(n){return n=n.trim().replace(/\s+/g," "),n.toLowerCase().toUpperCase()}function sg(n){return n===32||n===9||n===10||n===13}function Mu(n){let e=0;for(;e<n.length&&sg(n.charCodeAt(e));e++);let t=n.length-1;for(;t>=e&&sg(n.charCodeAt(t));t--);return n.slice(e,t+1)}var kS={mdurl:Sd,ucmicro:Td};function FS(n,e,t){let i,s,r,o,l=n.posMax,c=n.pos;for(n.pos=e+1,i=1;n.pos<l;){if(r=n.src.charCodeAt(n.pos),r===93&&(i--,i===0)){s=!0;break}if(o=n.pos,n.md.inline.skipToken(n),r===91){if(o===n.pos-1)i++;else if(t)return n.pos=c,-1}}let h=-1;return s&&(h=n.pos),n.pos=c,h}function NS(n,e,t){let i,s=e,r={ok:!1,pos:0,str:""};if(n.charCodeAt(s)===60){for(s++;s<t;){if(i=n.charCodeAt(s),i===10||i===60)return r;if(i===62)return r.pos=s+1,r.str=Co(n.slice(e+1,s)),r.ok=!0,r;if(i===92&&s+1<t){s+=2;continue}s++}return r}let o=0;for(;s<t&&(i=n.charCodeAt(s),!(i===32||i<32||i===127));){if(i===92&&s+1<t){if(n.charCodeAt(s+1)===32){s++;continue}s+=2;continue}if(i===40&&(o++,o>32))return r;if(i===41){if(o===0)break;o--}s++}return e===s||o!==0||(r.str=Co(n.slice(e,s)),r.pos=s,r.ok=!0),r}function US(n,e,t,i){let s,r=e,o={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(i)o.str=i.str,o.marker=i.marker;else{if(r>=t)return o;let l=n.charCodeAt(r);if(l!==34&&l!==39&&l!==40)return o;e++,r++,l===40&&(l=41),o.marker=l}for(;r<t;){if(s=n.charCodeAt(r),s===o.marker)return o.pos=r+1,o.str+=Co(n.slice(e,r)),o.ok=!0,o;if(s===40&&o.marker===41)return o;s===92&&r+1<t&&r++,r++}return o.can_continue=!0,o.str+=Co(n.slice(e,r)),o}var OS=mg({parseLinkDestination:()=>NS,parseLinkLabel:()=>FS,parseLinkTitle:()=>US});function Wa(n){"@babel/helpers - typeof";return Wa=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Wa(n)}function BS(n,e){if(Wa(n)!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var i=t.call(n,e||"default");if(Wa(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}function zS(n){var e=BS(n,"string");return Wa(e)=="symbol"?e:e+""}function ht(n,e,t){return(e=zS(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}var Lr=class{constructor(n,e,t){ht(this,"map",null),ht(this,"level",0),ht(this,"children",null),ht(this,"content",""),ht(this,"markup",""),ht(this,"info",""),ht(this,"block",!1),ht(this,"hidden",!1),this.type=n,this.tag=e,this.attrs=null,this.nesting=t,this.meta=null}attrIndex(n){if(!this.attrs)return-1;let e=this.attrs;for(let t=0,i=e.length;t<i;t++)if(e[t][0]===n)return t;return-1}attrPush(n){this.attrs?this.attrs.push(n):this.attrs=[n]}attrSet(n,e){let t=this.attrIndex(n),i=[n,e];t<0?this.attrPush(i):this.attrs[t]=i}attrGet(n){let e=this.attrIndex(n),t=null;return e>=0&&(t=this.attrs[e][1]),t}attrJoin(n,e){let t=this.attrIndex(n);t<0?this.attrPush([n,e]):this.attrs[t][1]=`${this.attrs[t][1]} ${e}`}},Xa=class{constructor(){ht(this,"__rules__",[]),ht(this,"__cache__",null)}__find__(n){for(let e=0;e<this.__rules__.length;e++)if(this.__rules__[e].name===n)return e;return-1}__compile__(){let n=new Set;this.__rules__.forEach(e=>{e.enabled&&e.alt.forEach(t=>{t&&n.add(t)})}),this.__cache__=Object.create(null),this.__cache__[""]=[],this.__rules__.forEach(e=>{e.enabled&&this.__cache__[""].push(e.fn)}),n.forEach(e=>{this.__cache__[e]=[],this.__rules__.forEach(t=>{t.enabled&&t.alt.indexOf(e)>=0&&this.__cache__[e].push(t.fn)})})}at(n,e,t={}){let i=this.__find__(n);if(i===-1)throw new Error(`Parser rule not found: ${n}`);this.__rules__[i].fn=e,this.__rules__[i].alt=t.alt||[],this.__cache__=null}before(n,e,t,i={}){let s=this.__find__(n);if(s===-1)throw new Error(`Parser rule not found: ${n}`);this.__rules__.splice(s,0,{name:e,enabled:!0,fn:t,alt:i.alt||[]}),this.__cache__=null}after(n,e,t,i={}){let s=this.__find__(n);if(s===-1)throw new Error(`Parser rule not found: ${n}`);this.__rules__.splice(s+1,0,{name:e,enabled:!0,fn:t,alt:i.alt||[]}),this.__cache__=null}push(n,e,t={}){this.__rules__.push({name:n,enabled:!0,fn:e,alt:t.alt||[]}),this.__cache__=null}enable(n,e=!1){Array.isArray(n)||(n=[n]);let t=[];return n.forEach(i=>{let s=this.__find__(i);if(s<0){if(e)return;throw new Error(`Rules manager: invalid rule name ${i}`)}this.__rules__[s].enabled=!0,t.push(i)}),this.__cache__=null,t}enableOnly(n,e=!1){Array.isArray(n)||(n=[n]),this.__rules__.forEach(t=>{t.enabled=!1}),this.enable(n,e)}disable(n,e=!1){Array.isArray(n)||(n=[n]);let t=[];return n.forEach(i=>{let s=this.__find__(i);if(s<0){if(e)return;throw new Error(`Rules manager: invalid rule name ${i}`)}this.__rules__[s].enabled=!1,t.push(i)}),this.__cache__=null,t}getRules(n){return this.__cache__||this.__compile__(),this.__cache__[n]||[]}},ms={};ms.code_inline=function(n,e,t,i,s){let r=n[e];return`<code${s.renderAttrs(r)}>${cr(r.content)}</code>`};ms.code_block=function(n,e,t,i,s){let r=n[e];return`<pre${s.renderAttrs(r)}><code>${cr(n[e].content)}</code></pre>
`};ms.fence=function(n,e,t,i,s){let r=n[e],o=r.info?Co(r.info).trim():"",l="",c="";if(o){let d=o.split(/(\s+)/g);l=d[0],c=d.slice(2).join("")}let h;if(t.highlight?h=t.highlight(r.content,l,c)||cr(r.content):h=cr(r.content),h.indexOf("<pre")===0)return h+`
`;if(o){let d=r.attrIndex("class"),p=r.attrs?r.attrs.slice():[];d<0?p.push(["class",`${t.langPrefix}${l}`]):(p[d]=[p[d][0],p[d][1]],p[d][1]+=` ${t.langPrefix}${l}`);let m={attrs:p};return`<pre><code${s.renderAttrs(m)}>${h}</code></pre>
`}return`<pre><code${s.renderAttrs(r)}>${h}</code></pre>
`};ms.image=function(n,e,t,i,s){let r=n[e];return r.attrs[r.attrIndex("alt")][1]=s.renderInlineAsText(r.children,t,i),s.renderToken(n,e,t)};ms.hardbreak=function(n,e,t){return t.xhtmlOut?`<br />
`:`<br>
`};ms.softbreak=function(n,e,t){return t.breaks?t.xhtmlOut?`<br />
`:`<br>
`:`
`};ms.text=function(n,e){return cr(n[e].content)};ms.html_block=function(n,e){return n[e].content};ms.html_inline=function(n,e){return n[e].content};var vg=class{constructor(){ht(this,"rules",Object.assign({},ms))}renderAttrs(n){let e,t,i;if(!n.attrs)return"";for(i="",e=0,t=n.attrs.length;e<t;e++)i+=` ${cr(n.attrs[e][0])}="${cr(String(n.attrs[e][1]))}"`;return i}renderToken(n,e,t){let i=n[e],s="";if(i.hidden)return"";let r=e-1;for(;r>=0&&n[r].hidden&&n[r].nesting===0;)r--;i.block&&i.nesting!==-1&&r>=0&&n[r].hidden&&n[r].nesting===-1&&(s+=`
`),s+=(i.nesting===-1?"</":"<")+i.tag,s+=this.renderAttrs(i),i.nesting===0&&t.xhtmlOut&&(s+=" /");let o=!1;if(i.block&&(o=!0,i.nesting===1)){let l=e+1;for(;l<n.length&&n[l].hidden&&n[l].nesting===0;)l++;if(l<n.length){let c=n[l];(c.type==="inline"||c.hidden||c.nesting===-1&&c.tag===i.tag)&&(o=!1)}}return s+=o?`>
`:">",s}renderInline(n,e,t){let i="",s=this.rules;for(let r=0,o=n.length;r<o;r++){let l=n[r].type;typeof s[l]<"u"?i+=s[l](n,r,e,t,this):i+=this.renderToken(n,r,e)}return i}renderInlineAsText(n,e,t){let i="";for(let s=0,r=n.length;s<r;s++)switch(n[s].type){case"text":case"code_inline":i+=n[s].content;break;case"image":i+=this.renderInlineAsText(n[s].children,e,t);break;case"html_inline":case"html_block":i+=n[s].content;break;case"softbreak":case"hardbreak":i+=`
`}return i}render(n,e,t){let i="",s=this.rules;for(let r=0,o=n.length;r<o;r++){let l=n[r].type;l==="inline"?i+=this.renderInline(n[r].children,e,t):typeof s[l]<"u"?i+=s[l](n,r,e,t,this):i+=this.renderToken(n,r,e)}return i}},yg=class{constructor(n,e,t){ht(this,"tokens",[]),ht(this,"inlineMode",!1),ht(this,"Token",Lr),this.src=n,this.env=t,this.md=e}},VS=/\r\n?/g,HS=/\0/g;function GS(n){let e;e=n.src.replace(VS,`
`),e=e.replace(HS,"\uFFFD"),n.src=e}function WS(n){let e;n.inlineMode?(e=new n.Token("inline","",0),e.content=n.src,e.map=[0,1],e.children=[],n.tokens.push(e)):n.md.block.parse(n.src,n.md,n.env,n.tokens)}function XS(n){let e=n.tokens,t=0;for(let i=0;i<e.length;i++)e[i].type!=="reference_definition"&&(i!==t&&(e[t]=e[i]),t++);e.length!==t&&(e.length=t)}function $S(n){let e=n.tokens;for(let t=0,i=e.length;t<i;t++){let s=e[t];s.type==="inline"&&n.md.inline.parse(s.content,n.md,n.env,s.children)}}function qS(n){return/^<a[>\s]/i.test(n)}function YS(n){return/^<\/a\s*>/i.test(n)}function JS(n){let e=n.tokens;if(n.md.options.linkify)for(let t=0,i=e.length;t<i;t++){if(e[t].type!=="inline"||!n.md.linkify.test(e[t].content))continue;let s=e[t].children,r=[],o=0;for(let l=s.length-1;l>=0;l--){let c=s[l];if(c.type==="link_close"){for(l--;s[l].level!==c.level&&s[l].type!=="link_open";)l--;continue}if(c.type==="html_inline"&&(qS(c.content)&&o>0&&o--,YS(c.content)&&o++),!(o>0)&&c.type==="text"&&n.md.linkify.test(c.content)){let h=c.content,d=n.md.linkify.match(h),p=[],m=c.level,x=0;d.length>0&&d[0].index===0&&l>0&&s[l-1].type==="text_special"&&(d=d.slice(1));for(let _=0;_<d.length;_++){let A=d[_].url,v=n.md.normalizeLink(A);if(!n.md.validateLink(v))continue;let y=d[_].text;d[_].schema?d[_].schema==="mailto:"&&!/^mailto:/i.test(y)?y=n.md.normalizeLinkText(`mailto:${y}`).replace(/^mailto:/,""):y=n.md.normalizeLinkText(y):y=n.md.normalizeLinkText(`http://${y}`).replace(/^http:\/\//,"");let P=d[_].index;if(P>x){let L=new n.Token("text","",0);L.content=h.slice(x,P),L.level=m,p.push(L)}let I=new n.Token("link_open","a",1);I.attrs=[["href",v]],I.level=m++,I.markup="linkify",I.info="auto",p.push(I);let E=new n.Token("text","",0);E.content=y,E.level=m,p.push(E);let R=new n.Token("link_close","a",-1);R.level=--m,R.markup="linkify",R.info="auto",p.push(R),x=d[_].lastIndex}if(x<h.length){let _=new n.Token("text","",0);_.content=h.slice(x),_.level=m,p.push(_)}r.push({index:l,nodes:p})}}if(r.length>0){let l=s.length;for(let p of r)l+=p.nodes.length-1;let c=new Array(l),h=0,d=0;r.reverse();for(let p=0;p<s.length;p++){let m=r[h];if(m?.index===p){for(let x of m.nodes)c[d++]=x;h++}else c[d++]=s[p]}e[t].children=c}}}var bg=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,ZS=/\((c|tm|r)\)/i,jS=/\((c|tm|r)\)/gi,KS={c:"\xA9",r:"\xAE",tm:"\u2122"};function QS(n,e){return KS[e.toLowerCase()]}function eM(n){let e=0;for(let t=n.length-1;t>=0;t--){let i=n[t];i.type==="text"&&!e&&(i.content=i.content.replace(jS,QS)),i.type==="link_open"&&i.info==="auto"&&e--,i.type==="link_close"&&i.info==="auto"&&e++}}function tM(n){let e=0;for(let t=n.length-1;t>=0;t--){let i=n[t];i.type==="text"&&!e&&bg.test(i.content)&&(i.content=i.content.replace(/\+-/g,"\xB1").replace(/\.{2,}/g,"\u2026").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/gm,"$1\u2014").replace(/(^|\s)--(?=\s|$)/gm,"$1\u2013").replace(/(^|[^-\s])--(?=[^-\s]|$)/gm,"$1\u2013")),i.type==="link_open"&&i.info==="auto"&&e--,i.type==="link_close"&&i.info==="auto"&&e++}}function nM(n){let e;if(n.md.options.typographer)for(e=n.tokens.length-1;e>=0;e--)n.tokens[e].type==="inline"&&(ZS.test(n.tokens[e].content)&&eM(n.tokens[e].children),bg.test(n.tokens[e].content)&&tM(n.tokens[e].children))}var iM=/['"]/,rg=/['"]/g,og="\u2019",sM=1e3;function ag(n,e,t){for(;n.length>t;){let i=n.pop();i.isSingleQuote?e.single=i.prevSameQuoteIdx:e.double=i.prevSameQuoteIdx}}function yu(n,e,t,i){n[e]||(n[e]=[]),n[e].push({pos:t,ch:i})}function rM(n,e){let t="",i=0;e.sort((s,r)=>s.pos-r.pos);for(let s=0;s<e.length;s++){let r=e[s];t+=n.slice(i,r.pos)+r.ch,i=r.pos+1}return t+n.slice(i)}function oM(n,e){let t,i=[],s={single:-1,double:-1},r={};for(let o=0;o<n.length;o++){let l=n[o],c=n[o].level;for(t=i.length-1;t>=0&&!(i[t].level<=c);t--);if(ag(i,s,t+1),l.type!=="text")continue;let h=l.content,d=0,p=h.length;e:for(;d<p;){rg.lastIndex=d;let m=rg.exec(h);if(!m)break;let x=!0,_=!0;d=m.index+1;let A=m[0]==="'",v=32;if(m.index-1>=0)v=h.charCodeAt(m.index-1);else for(t=o-1;t>=0&&!(n[t].type==="softbreak"||n[t].type==="hardbreak");t--)if(n[t].content){v=n[t].content.charCodeAt(n[t].content.length-1);break}let y=32;if(d<p)y=h.charCodeAt(d);else for(t=o+1;t<n.length&&!(n[t].type==="softbreak"||n[t].type==="hardbreak");t++)if(n[t].content){y=n[t].content.charCodeAt(0);break}let P=Ga(v)||Ha(v),I=Ga(y)||Ha(y),E=Va(v),R=Va(y);if(R?x=!1:I&&(E||P||(x=!1)),E?_=!1:P&&(R||I||(_=!1)),y===34&&m[0]==='"'&&v>=48&&v<=57&&(_=x=!1),x&&_&&(x=P,_=I),!x&&!_){A&&yu(r,o,m.index,og);continue}if(_&&(t=A?s.single:s.double,t>=0&&i[t].level===c)){let L=i[t],V,M;A?(V=e.md.options.quotes[2],M=e.md.options.quotes[3]):(V=e.md.options.quotes[0],M=e.md.options.quotes[1]),yu(r,o,m.index,M),yu(r,L.tokenIdx,L.contentPos,V),ag(i,s,t);continue e}if(x){if(i.length>=sM)return;i.push({tokenIdx:o,contentPos:m.index,isSingleQuote:A,level:c,prevSameQuoteIdx:A?s.single:s.double}),A?s.single=i.length-1:s.double=i.length-1}else _&&A&&yu(r,o,m.index,og)}}Object.keys(r).forEach(function(o){let l=Number(o);n[l].content=rM(n[l].content,r[o])})}function aM(n){if(n.md.options.typographer)for(let e=n.tokens.length-1;e>=0;e--)n.tokens[e].type!=="inline"||!iM.test(n.tokens[e].content)||oM(n.tokens[e].children,n)}function lM(n){let e,t,i=n.length;for(e=0;e<i;e++)n[e].type==="text_special"&&(n[e].type="text");for(e=t=0;e<i;e++)n[e].type==="text"&&e+1<i&&n[e+1].type==="text"?n[e+1].content=n[e].content+n[e+1].content:(e!==t&&(n[t]=n[e]),t++);e!==t&&(n.length=t)}function cM(n){let e,t,i=n.tokens,s=i.length;for(let r=0;r<s;r++){if(i[r].type!=="inline")continue;let o=i[r].children,l=o.length;for(e=0;e<l;e++)o[e].type==="text_special"&&(o[e].type="text"),o[e].children&&lM(o[e].children);for(e=t=0;e<l;e++)o[e].type==="text"&&e+1<l&&o[e+1].type==="text"?o[e+1].content=o[e].content+o[e+1].content:(e!==t&&(o[t]=o[e]),t++);e!==t&&(o.length=t)}}var kd=[["normalize",GS],["block",WS],["strip_references",XS],["inline",$S],["linkify",JS],["replacements",nM],["smartquotes",aM],["text_join",cM]],Sg=class{constructor(){ht(this,"ruler",new Xa),ht(this,"State",yg);for(let n=0;n<kd.length;n++)this.ruler.push(kd[n][0],kd[n][1])}process(n){let e=this.ruler.getRules("");for(let t=0,i=e.length;t<i;t++)e[t](n)}},Mg=class{constructor(n,e,t,i){ht(this,"bMarks",[]),ht(this,"eMarks",[]),ht(this,"tShift",[]),ht(this,"sCount",[]),ht(this,"bsCount",[]),ht(this,"blkIndent",0),ht(this,"line",0),ht(this,"lineMax",0),ht(this,"tight",!1),ht(this,"listIndent",-1),ht(this,"parentType","root"),ht(this,"level",0),ht(this,"Token",Lr),this.src=n,this.md=e,this.env=t,this.tokens=i;let s=this.src;for(let r=0,o=0,l=0,c=0,h=s.length,d=!1;o<h;o++){let p=s.charCodeAt(o);if(!d)if(mn(p)){l++,p===9?c+=4-c%4:c++;continue}else d=!0;(p===10||o===h-1)&&(p!==10&&o++,this.bMarks.push(r),this.eMarks.push(o),this.tShift.push(l),this.sCount.push(c),this.bsCount.push(0),d=!1,l=0,c=0,r=o+1)}this.bMarks.push(s.length),this.eMarks.push(s.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}push(n,e,t){let i=new Lr(n,e,t);return i.block=!0,t<0&&this.level--,i.level=this.level,t>0&&this.level++,this.tokens.push(i),i}isEmpty(n){return this.bMarks[n]+this.tShift[n]>=this.eMarks[n]}skipEmptyLines(n){for(let e=this.lineMax;n<e&&!(this.bMarks[n]+this.tShift[n]<this.eMarks[n]);n++);return n}skipSpaces(n){for(let e=this.src.length;n<e&&mn(this.src.charCodeAt(n));n++);return n}skipSpacesBack(n,e){if(n<=e)return n;for(;n>e;)if(!mn(this.src.charCodeAt(--n)))return n+1;return n}skipChars(n,e){for(let t=this.src.length;n<t&&this.src.charCodeAt(n)===e;n++);return n}skipCharsBack(n,e,t){if(n<=t)return n;for(;n>t;)if(e!==this.src.charCodeAt(--n))return n+1;return n}getLines(n,e,t,i){if(n>=e)return"";let s=new Array(e-n);for(let r=0,o=n;o<e;o++,r++){let l=0,c=this.bMarks[o],h=c,d;for(o+1<e||i?d=this.eMarks[o]+1:d=this.eMarks[o];h<d&&l<t;){let p=this.src.charCodeAt(h);if(mn(p))p===9?l+=4-(l+this.bsCount[o])%4:l++;else if(h-c<this.tShift[o])l++;else break;h++}l>t?s[r]=new Array(l-t+1).join(" ")+this.src.slice(h,d):s[r]=this.src.slice(h,d)}return s.join("")}},uM=65536;function Fd(n,e){let t=n.bMarks[e]+n.tShift[e],i=n.eMarks[e];return n.src.slice(t,i)}function lg(n){let e=[],t=n.length,i=0,s=n.charCodeAt(i),r=!1,o=0,l="";for(;i<t;)s===124&&(r?(l+=n.substring(o,i-1),o=i):(e.push(l+n.substring(o,i)),l="",o=i+1)),r=s===92,i++,s=n.charCodeAt(i);return e.push(l+n.substring(o)),e}function hM(n,e,t,i){if(e+2>t)return!1;let s=e+1;if(n.sCount[s]<n.blkIndent||n.sCount[s]-n.blkIndent>=4)return!1;let r=n.bMarks[s]+n.tShift[s];if(r>=n.eMarks[s])return!1;let o=n.src.charCodeAt(r++);if(o!==124&&o!==45&&o!==58||r>=n.eMarks[s])return!1;let l=n.src.charCodeAt(r++);if(l!==124&&l!==45&&l!==58&&!mn(l)||o===45&&mn(l))return!1;for(;r<n.eMarks[s];){let E=n.src.charCodeAt(r);if(E!==124&&E!==45&&E!==58&&!mn(E))return!1;r++}let c=Fd(n,e+1),h=c.split("|"),d=[];for(let E=0;E<h.length;E++){let R=h[E].trim();if(!R){if(E===0||E===h.length-1)continue;return!1}if(!/^:?-+:?$/.test(R))return!1;R.charCodeAt(R.length-1)===58?d.push(R.charCodeAt(0)===58?"center":"right"):R.charCodeAt(0)===58?d.push("left"):d.push("")}if(c=Fd(n,e).trim(),c.indexOf("|")===-1||n.sCount[e]-n.blkIndent>=4)return!1;h=lg(c),h.length&&h[0]===""&&h.shift(),h.length&&h[h.length-1]===""&&h.pop();let p=h.length;if(p===0||p!==d.length)return!1;if(i)return!0;let m=n.parentType;n.parentType="table";let x=n.md.block.ruler.getRules("blockquote"),_=n.push("table_open","table",1),A=[e,0];_.map=A;let v=n.push("thead_open","thead",1);v.map=[e,e+1];let y=n.push("tr_open","tr",1);y.map=[e,e+1];for(let E=0;E<h.length;E++){let R=n.push("th_open","th",1);d[E]&&(R.attrs=[["style",`text-align:${d[E]}`]]);let L=n.push("inline","",0);L.content=h[E].trim(),L.children=[],n.push("th_close","th",-1)}n.push("tr_close","tr",-1),n.push("thead_close","thead",-1);let P,I=0;for(s=e+2;s<t&&!(n.sCount[s]<n.blkIndent);s++){let E=!1;for(let L=0,V=x.length;L<V;L++)if(x[L](n,s,t,!0)){E=!0;break}if(E||(c=Fd(n,s).trim(),!c)||n.sCount[s]-n.blkIndent>=4||(h=lg(c),h.length&&h[0]===""&&h.shift(),h.length&&h[h.length-1]===""&&h.pop(),I+=p-h.length,I>uM))break;if(s===e+2){let L=n.push("tbody_open","tbody",1);L.map=P=[e+2,0]}let R=n.push("tr_open","tr",1);R.map=[s,s+1];for(let L=0;L<p;L++){let V=n.push("td_open","td",1);d[L]&&(V.attrs=[["style",`text-align:${d[L]}`]]);let M=n.push("inline","",0);M.content=h[L]?h[L].trim():"",M.children=[],n.push("td_close","td",-1)}n.push("tr_close","tr",-1)}return P&&(n.push("tbody_close","tbody",-1),P[1]=s),n.push("table_close","table",-1),A[1]=s,n.parentType=m,n.line=s,!0}function dM(n,e,t){if(n.sCount[e]-n.blkIndent<4)return!1;let i=e+1,s=i;for(;i<t;){if(n.isEmpty(i)){i++;continue}if(n.sCount[i]-n.blkIndent>=4){i++,s=i;continue}break}n.line=s;let r=n.push("code_block","code",0);return r.content=n.getLines(e,s,4+n.blkIndent,!1)+`
`,r.map=[e,n.line],!0}function fM(n,e,t,i){let s=n.bMarks[e]+n.tShift[e],r=n.eMarks[e];if(n.sCount[e]-n.blkIndent>=4||s+3>r)return!1;let o=n.src.charCodeAt(s);if(o!==126&&o!==96)return!1;let l=s;s=n.skipChars(s,o);let c=s-l;if(c<3)return!1;let h=n.src.slice(l,s),d=n.src.slice(s,r);if(o===96&&d.indexOf(String.fromCharCode(o))>=0)return!1;if(i)return!0;let p=e,m=!1;for(;p++,!(p>=t||(s=l=n.bMarks[p]+n.tShift[p],r=n.eMarks[p],s<r&&n.sCount[p]<n.blkIndent));)if(n.src.charCodeAt(s)===o&&!(n.sCount[p]-n.blkIndent>=4)&&(s=n.skipChars(s,o),!(s-l<c)&&(s=n.skipSpaces(s),!(s<r)))){m=!0;break}c=n.sCount[e],n.line=p+(m?1:0);let x=n.push("fence","code",0);return x.info=d,x.content=n.getLines(e+1,p,c,!0),x.markup=h,x.map=[e,n.line],!0}function pM(n,e,t,i){let s=n.bMarks[e]+n.tShift[e],r=n.eMarks[e],o=n.lineMax;if(n.sCount[e]-n.blkIndent>=4||n.src.charCodeAt(s)!==62)return!1;if(i)return!0;let l=[],c=[],h=[],d=[],p=n.md.block.ruler.getRules("blockquote"),m=n.parentType;n.parentType="blockquote";let x=!1,_;for(_=e;_<t;_++){let I=n.sCount[_]<n.blkIndent;if(s=n.bMarks[_]+n.tShift[_],r=n.eMarks[_],s>=r)break;if(n.src.charCodeAt(s++)===62&&!I){let R=n.sCount[_]+1,L,V;n.src.charCodeAt(s)===32?(s++,R++,V=!1,L=!0):n.src.charCodeAt(s)===9?(L=!0,(n.bsCount[_]+R)%4===3?(s++,R++,V=!1):V=!0):L=!1;let M=R;for(l.push(n.bMarks[_]),n.bMarks[_]=s;s<r;){let k=n.src.charCodeAt(s);if(mn(k))k===9?M+=4-(M+n.bsCount[_]+(V?1:0))%4:M++;else break;s++}x=s>=r,c.push(n.bsCount[_]),n.bsCount[_]=n.sCount[_]+1+(L?1:0),h.push(n.sCount[_]),n.sCount[_]=M-R,d.push(n.tShift[_]),n.tShift[_]=s-n.bMarks[_];continue}if(x)break;let E=!1;for(let R=0,L=p.length;R<L;R++)if(p[R](n,_,t,!0)){E=!0;break}if(E){n.lineMax=_,n.blkIndent!==0&&(l.push(n.bMarks[_]),c.push(n.bsCount[_]),d.push(n.tShift[_]),h.push(n.sCount[_]),n.sCount[_]-=n.blkIndent);break}l.push(n.bMarks[_]),c.push(n.bsCount[_]),d.push(n.tShift[_]),h.push(n.sCount[_]),n.sCount[_]=-1}let A=n.blkIndent;n.blkIndent=0;let v=n.push("blockquote_open","blockquote",1);v.markup=">";let y=[e,0];v.map=y,n.md.block.tokenize(n,e,_);let P=n.push("blockquote_close","blockquote",-1);P.markup=">",n.lineMax=o,n.parentType=m,y[1]=n.line;for(let I=0;I<d.length;I++)n.bMarks[I+e]=l[I],n.tShift[I+e]=d[I],n.sCount[I+e]=h[I],n.bsCount[I+e]=c[I];return n.blkIndent=A,!0}function mM(n,e,t,i){let s=n.eMarks[e];if(n.sCount[e]-n.blkIndent>=4)return!1;let r=n.bMarks[e]+n.tShift[e],o=n.src.charCodeAt(r++);if(o!==42&&o!==45&&o!==95)return!1;let l=1;for(;r<s;){let h=n.src.charCodeAt(r++);if(h!==o&&!mn(h))return!1;h===o&&l++}if(l<3)return!1;if(i)return!0;n.line=e+1;let c=n.push("hr","hr",0);return c.map=[e,n.line],c.markup=Array(l+1).join(String.fromCharCode(o)),!0}function cg(n,e){let t=n.eMarks[e],i=n.bMarks[e]+n.tShift[e],s=n.src.charCodeAt(i++);return s!==42&&s!==45&&s!==43||i<t&&!mn(n.src.charCodeAt(i))?-1:i}function ug(n,e){let t=n.bMarks[e]+n.tShift[e],i=n.eMarks[e],s=t;if(s+1>=i)return-1;let r=n.src.charCodeAt(s++);if(r<48||r>57)return-1;for(;;){if(s>=i)return-1;if(r=n.src.charCodeAt(s++),r>=48&&r<=57){if(s-t>=10)return-1;continue}if(r===41||r===46)break;return-1}return s<i&&(r=n.src.charCodeAt(s),!mn(r))?-1:s}function gM(n,e){let t=n.level+2;for(let i=e+2,s=n.tokens.length-2;i<s;i++)n.tokens[i].level===t&&n.tokens[i].type==="paragraph_open"&&(n.tokens[i+2].hidden=!0,n.tokens[i].hidden=!0,i+=2)}function _M(n,e,t,i){let s,r,o,l,c=e,h=!0;if(n.sCount[c]-n.blkIndent>=4||n.listIndent>=0&&n.sCount[c]-n.listIndent>=4&&n.sCount[c]<n.blkIndent)return!1;let d=!1;i&&n.parentType==="paragraph"&&n.sCount[c]>=n.blkIndent&&(d=!0);let p,m,x;if((x=ug(n,c))>=0){if(p=!0,o=n.bMarks[c]+n.tShift[c],m=Number(n.src.slice(o,x-1)),d&&m!==1)return!1}else if((x=cg(n,c))>=0)p=!1;else return!1;if(d&&n.skipSpaces(x)>=n.eMarks[c])return!1;if(i)return!0;let _=n.src.charCodeAt(x-1),A=n.tokens.length;p?(l=n.push("ordered_list_open","ol",1),m!==1&&(l.attrs=[["start",m]])):l=n.push("bullet_list_open","ul",1);let v=[c,0];l.map=v,l.markup=String.fromCharCode(_);let y=!1,P=n.md.block.ruler.getRules("list"),I=n.parentType;for(n.parentType="list";c<t;){r=x,s=n.eMarks[c];let E=n.sCount[c]+x-(n.bMarks[c]+n.tShift[c]),R=E;for(;r<s;){let Q=n.src.charCodeAt(r);if(Q===9)R+=4-(R+n.bsCount[c])%4;else if(Q===32)R++;else break;r++}let L=r,V;L>=s?V=1:V=R-E,V>4&&(V=1);let M=E+V;l=n.push("list_item_open","li",1),l.markup=String.fromCharCode(_);let k=[c,0];l.map=k,p&&(l.info=n.src.slice(o,x-1));let X=n.tight,W=n.tShift[c],F=n.sCount[c],me=n.listIndent;if(n.listIndent=n.blkIndent,n.blkIndent=M,n.tight=!0,n.tShift[c]=L-n.bMarks[c],n.sCount[c]=R,L>=s&&n.isEmpty(c+1)?n.line=Math.min(n.line+2,t):n.md.block.tokenize(n,c,t),(!n.tight||y)&&(h=!1),y=n.line-c>1&&n.isEmpty(n.line-1),n.blkIndent=n.listIndent,n.listIndent=me,n.tShift[c]=W,n.sCount[c]=F,n.tight=X,l=n.push("list_item_close","li",-1),l.markup=String.fromCharCode(_),c=n.line,k[1]=c,c>=t||n.sCount[c]<n.blkIndent||n.sCount[c]-n.blkIndent>=4)break;let K=!1;for(let Q=0,ye=P.length;Q<ye;Q++)if(P[Q](n,c,t,!0)){K=!0;break}if(K)break;if(p){if(x=ug(n,c),x<0)break;o=n.bMarks[c]+n.tShift[c]}else if(x=cg(n,c),x<0)break;if(_!==n.src.charCodeAt(x-1))break}return p?l=n.push("ordered_list_close","ol",-1):l=n.push("bullet_list_close","ul",-1),l.markup=String.fromCharCode(_),v[1]=c,n.line=c,n.parentType=I,h&&gM(n,A),!0}function xM(n,e,t,i){let s=n.bMarks[e]+n.tShift[e],r=n.eMarks[e],o=e+1;if(n.sCount[e]-n.blkIndent>=4||n.src.charCodeAt(s)!==91)return!1;function l(E){let R=n.lineMax;if(E>=R||n.isEmpty(E))return null;let L=!1;if(n.sCount[E]-n.blkIndent>3&&(L=!0),n.sCount[E]<0&&(L=!0),!L){let k=n.md.block.ruler.getRules("reference"),X=n.parentType;n.parentType="reference";let W=!1;for(let F=0,me=k.length;F<me;F++)if(k[F](n,E,R,!0)){W=!0;break}if(n.parentType=X,W)return null}let V=n.bMarks[E]+n.tShift[E],M=n.eMarks[E];return n.src.slice(V,M+1)}let c=n.src.slice(s,r+1);r=c.length;let h=-1;for(s=1;s<r;s++){let E=c.charCodeAt(s);if(E===91)return!1;if(E===93){h=s;break}else if(E===10){let R=l(o);R!==null&&(c+=R,r=c.length,o++)}else if(E===92&&(s++,s<r&&c.charCodeAt(s)===10)){let R=l(o);R!==null&&(c+=R,r=c.length,o++)}}if(h<0||c.charCodeAt(h+1)!==58)return!1;for(s=h+2;s<r;s++){let E=c.charCodeAt(s);if(E===10){let R=l(o);R!==null&&(c+=R,r=c.length,o++)}else if(!mn(E))break}let d=n.md.helpers.parseLinkDestination(c,s,r);if(!d.ok)return!1;let p=n.md.normalizeLink(d.str);if(!n.md.validateLink(p))return!1;s=d.pos;let m=s,x=o,_=s;for(;s<r;s++){let E=c.charCodeAt(s);if(E===10){let R=l(o);R!==null&&(c+=R,r=c.length,o++)}else if(!mn(E))break}let A=n.md.helpers.parseLinkTitle(c,s,r);for(;A.can_continue;){let E=l(o);if(E===null)break;c+=E,s=r,r=c.length,o++,A=n.md.helpers.parseLinkTitle(c,s,r,A)}let v;for(s<r&&_!==s&&A.ok?(v=A.str,s=A.pos):(v="",s=m,o=x);s<r&&mn(c.charCodeAt(s));)s++;if(s<r&&c.charCodeAt(s)!==10&&v)for(v="",s=m,o=x;s<r&&mn(c.charCodeAt(s));)s++;if(s<r&&c.charCodeAt(s)!==10)return!1;let y=Su(c.slice(1,h));if(!y)return!1;if(i)return!0;typeof n.env.references>"u"&&(n.env.references={}),typeof n.env.references[y]>"u"&&(n.env.references[y]={title:v,href:p});let P=n.push("reference_definition","",0);P.map=[e,o],P.hidden=!0;let I=Object.create(null);return I.label=y,P.meta=I,n.line=o,!0}var vM=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],wg=`<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^"'=<>\`\\x00-\\x20]+|'[^']*'|"[^"]*"))?)*\\s*\\/?>`,Eg="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",yM=new RegExp(`^(?:${wg}|${Eg}|<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->|<[?][\\s\\S]*?[?]>|<![A-Za-z][^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)`),bM=new RegExp(`^(?:${wg}|${Eg})`),Ir=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Za-z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp(`^</?(${vM.join("|")})(?=(\\s|/?>|$))`,"i"),/^$/,!0],[new RegExp(`${bM.source}\\s*$`),/^$/,!1]];function SM(n,e,t,i){let s=n.bMarks[e]+n.tShift[e],r=n.eMarks[e];if(n.sCount[e]-n.blkIndent>=4||!n.md.options.html||n.src.charCodeAt(s)!==60)return!1;let o=n.src.slice(s,r),l=0;for(;l<Ir.length&&!Ir[l][0].test(o);l++);if(l===Ir.length)return!1;if(i)return Ir[l][2];let c=e+1,h=Ir[l][1].test("");if(!Ir[l][1].test(o)){for(;c<t&&!(n.sCount[c]<n.blkIndent&&(h||!n.isEmpty(c)));c++)if(s=n.bMarks[c]+n.tShift[c],r=n.eMarks[c],o=n.src.slice(s,r),Ir[l][1].test(o)){o.length!==0&&c++;break}}n.line=c;let d=n.push("html_block","",0);return d.map=[e,c],d.content=n.getLines(e,c,n.blkIndent,!0),!0}function MM(n,e,t,i){let s=n.bMarks[e]+n.tShift[e],r=n.eMarks[e];if(n.sCount[e]-n.blkIndent>=4)return!1;let o=n.src.charCodeAt(s);if(o!==35||s>=r)return!1;let l=1;for(o=n.src.charCodeAt(++s);o===35&&s<r&&l<=6;)l++,o=n.src.charCodeAt(++s);if(l>6||s<r&&!mn(o))return!1;if(i)return!0;r=n.skipSpacesBack(r,s);let c=n.skipCharsBack(r,35,s);c>s&&mn(n.src.charCodeAt(c-1))&&(r=c),n.line=e+1;let h=n.push("heading_open",`h${l}`,1);h.markup="########".slice(0,l),h.map=[e,n.line];let d=n.push("inline","",0);d.content=Mu(n.src.slice(s,r)),d.map=[e,n.line],d.children=[];let p=n.push("heading_close",`h${l}`,-1);return p.markup="########".slice(0,l),!0}function wM(n,e,t){let i=n.md.block.ruler.getRules("paragraph");if(n.sCount[e]-n.blkIndent>=4)return!1;let s=n.parentType;n.parentType="paragraph";let r=0,o,l=e+1;for(;l<t&&!n.isEmpty(l);l++){if(n.sCount[l]-n.blkIndent>3)continue;if(n.sCount[l]>=n.blkIndent){let x=n.bMarks[l]+n.tShift[l],_=n.eMarks[l];if(x<_&&(o=n.src.charCodeAt(x),(o===45||o===61)&&(x=n.skipChars(x,o),x=n.skipSpaces(x),x>=_))){r=o===61?1:2;break}}if(n.sCount[l]<0)continue;let m=!1;for(let x=0,_=i.length;x<_;x++)if(i[x](n,l,t,!0)){m=!0;break}if(m)break}if(!r)return n.parentType=s,!1;let c=Mu(n.getLines(e,l,n.blkIndent,!1));n.line=l+1;let h=n.push("heading_open",`h${r}`,1);h.markup=String.fromCharCode(o),h.map=[e,n.line];let d=n.push("inline","",0);d.content=c,d.map=[e,n.line-1],d.children=[];let p=n.push("heading_close",`h${r}`,-1);return p.markup=String.fromCharCode(o),n.parentType=s,!0}function EM(n,e,t){let i=n.md.block.ruler.getRules("paragraph"),s=n.parentType,r=e+1;for(n.parentType="paragraph";r<t&&!n.isEmpty(r);r++){if(n.sCount[r]-n.blkIndent>3||n.sCount[r]<0)continue;let h=!1;for(let d=0,p=i.length;d<p;d++)if(i[d](n,r,t,!0)){h=!0;break}if(h)break}let o=Mu(n.getLines(e,r,n.blkIndent,!1));n.line=r;let l=n.push("paragraph_open","p",1);l.map=[e,n.line];let c=n.push("inline","",0);return c.content=o,c.map=[e,n.line],c.children=[],n.push("paragraph_close","p",-1),n.parentType=s,!0}var bu=[["table",hM,["paragraph","reference"]],["code",dM],["fence",fM,["paragraph","reference","blockquote","list"]],["blockquote",pM,["paragraph","reference","blockquote","list"]],["hr",mM,["paragraph","reference","blockquote","list"]],["list",_M,["paragraph","reference","blockquote"]],["reference",xM],["html_block",SM,["paragraph","reference","blockquote"]],["heading",MM,["paragraph","reference","blockquote"]],["lheading",wM],["paragraph",EM]],Ag=class{constructor(){ht(this,"ruler",new Xa),ht(this,"State",Mg);for(let n=0;n<bu.length;n++)this.ruler.push(bu[n][0],bu[n][1],{alt:(bu[n][2]||[]).slice()})}tokenize(n,e,t){let i=this.ruler.getRules(""),s=i.length,r=n.md.options.maxNesting,o=e,l=!1;for(;o<t&&(n.line=o=n.skipEmptyLines(o),!(o>=t||n.sCount[o]<n.blkIndent));){if(n.level>=r){n.line=t;break}let c=n.line,h=!1;for(let d=0;d<s;d++)if(h=i[d](n,o,t,!1),h){if(c>=n.line)throw new Error("block rule didn't increment state.line");break}if(!h)throw new Error("none of the block rules matched");n.tight=!l,n.isEmpty(n.line-1)&&(l=!0),o=n.line,o<t&&n.isEmpty(o)&&(l=!0,o++,n.line=o)}}parse(n,e,t,i){if(!n)return;let s=new this.State(n,e,t,i);this.tokenize(s,s.line,s.lineMax)}},Tg=class{constructor(n,e,t,i){ht(this,"pos",0),ht(this,"level",0),ht(this,"pending",""),ht(this,"pendingLevel",0),ht(this,"cache",{}),ht(this,"backticks",{}),ht(this,"backticksScanned",!1),ht(this,"linkLevel",0),ht(this,"delimiters",[]),ht(this,"_prev_delimiters",[]),ht(this,"Token",Lr),this.src=n,this.env=t,this.md=e,this.tokens=i,this.tokens_meta=Array(i.length),this.posMax=this.src.length}pushPending(){let n=new Lr("text","",0);return n.content=this.pending,n.level=this.pendingLevel,this.tokens.push(n),this.pending="",n}push(n,e,t){this.pending&&this.pushPending();let i=new Lr(n,e,t),s;return t<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),i.level=this.level,t>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],s={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(i),this.tokens_meta.push(s),i}scanDelims(n,e){let t=this.posMax,i=this.src.charCodeAt(n),s;if(n===0)s=32;else if(n===1)s=this.src.charCodeAt(0),(s&63488)===55296&&(s=65533);else if(s=this.src.charCodeAt(n-1),(s&64512)===56320){let _=this.src.charCodeAt(n-2);s=(_&64512)===55296?65536+(_-55296<<10)+(s-56320):65533}else(s&64512)===55296&&(s=65533);let r=n;for(;r<t&&this.src.charCodeAt(r)===i;)r++;let o=r-n,l=r<t?this.src.charCodeAt(r):32;if((l&64512)===55296){let _=this.src.charCodeAt(r+1);l=(_&64512)===56320?65536+(l-55296<<10)+(_-56320):65533}else(l&64512)===56320&&(l=65533);let c=Ga(s)||Ha(s),h=Ga(l)||Ha(l),d=Va(s),p=Va(l),m=!p&&(!h||d||c),x=!d&&(!c||p||h);return{can_open:m&&(e||!x||c),can_close:x&&(e||!m||h),length:o}}};function AM(n){switch(n){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function TM(n,e){let t=n.pos;for(;t<n.posMax&&!AM(n.src.charCodeAt(t));)t++;return t===n.pos?!1:(e||(n.pending+=n.src.slice(n.pos,t)),n.pos=t,!0)}function RM(n){return n>=65&&n<=90||n>=97&&n<=122}function CM(n){return n>=65&&n<=90||n>=97&&n<=122||n>=48&&n<=57||n===43||n===45||n===46}function PM(n,e){if(!n.md.options.linkify||n.linkLevel>0)return!1;let t=n.pos,i=n.posMax;if(t+3>i||n.src.charCodeAt(t)!==58||n.src.charCodeAt(t+1)!==47||n.src.charCodeAt(t+2)!==47)return!1;let s=t-Math.min(10,n.pending.length,t),r=t;for(;r>s&&CM(n.src.charCodeAt(r-1));)r--;if(r===t||!RM(n.src.charCodeAt(r)))return!1;let o=t-r,l=n.md.linkify.matchAtStart(n.src.slice(r));if(!l)return!1;let c=l.url;if(c.length<=o)return!1;let h=c.length;for(;h>0&&c.charCodeAt(h-1)===42;)h--;h!==c.length&&(c=c.slice(0,h));let d=n.md.normalizeLink(c);if(!n.md.validateLink(d))return!1;if(!e){n.pending=n.pending.slice(0,-o);let p=n.push("link_open","a",1);p.attrs=[["href",d]],p.markup="linkify",p.info="auto";let m=n.push("text","",0);m.content=n.md.normalizeLinkText(c);let x=n.push("link_close","a",-1);x.markup="linkify",x.info="auto"}return n.pos+=c.length-o,!0}function DM(n,e){let t=n.pos;if(n.src.charCodeAt(t)!==10)return!1;let i=n.pending.length-1,s=n.posMax;if(!e)if(i>=0&&n.pending.charCodeAt(i)===32)if(i>=1&&n.pending.charCodeAt(i-1)===32){let r=i-1;for(;r>=1&&n.pending.charCodeAt(r-1)===32;)r--;n.pending=n.pending.slice(0,r),n.push("hardbreak","br",0)}else n.pending=n.pending.slice(0,-1),n.push("softbreak","br",0);else n.push("softbreak","br",0);for(t++;t<s&&mn(n.src.charCodeAt(t));)t++;return n.pos=t,!0}var Bd=[];for(let n=0;n<256;n++)Bd.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(n){Bd[n.charCodeAt(0)]=1});function IM(n,e){let t=n.pos,i=n.posMax;if(n.src.charCodeAt(t)!==92||(t++,t>=i))return!1;let s=n.src.charCodeAt(t);if(s===10){for(e||n.push("hardbreak","br",0),t++;t<i&&(s=n.src.charCodeAt(t),!!mn(s));)t++;return n.pos=t,!0}if(s===32){if(!e){let l=n.push("text_special","",0);l.content="\\",l.markup="\\",l.info="escape"}return n.pos=t,!0}let r=n.src[t];if(s>=55296&&s<=56319&&t+1<i){let l=n.src.charCodeAt(t+1);l>=56320&&l<=57343&&(r+=n.src[t+1],t++)}let o="\\"+r;if(!e){let l=n.push("text_special","",0);s<256&&Bd[s]!==0?l.content=r:l.content=o,l.markup=o,l.info="escape"}return n.pos=t+1,!0}function LM(n){let e={},t=0;for(;(t=n.indexOf("`",t))!==-1;){let i=t;for(;n.charCodeAt(++t)===96;);e[t-i]=i}return e}function kM(n,e){var t;let i=n.pos;if(n.src.charCodeAt(i)!==96)return!1;let s=n.posMax,r=i+1;for(;r<s&&n.src.charCodeAt(r)===96;)r++;let o=n.src.slice(i,r),l=o.length;if(n.backticksScanned||(n.backticks=LM(n.src),n.backticksScanned=!0),((t=n.backticks[l])!==null&&t!==void 0?t:-1)>=r){let c=r,h;for(;(h=n.src.indexOf("`",c))!==-1&&h<s;){for(c=h+1;n.src.charCodeAt(c)===96;)c++;if(c>s)break;if(c-h===l){if(!e){let d=n.push("code_inline","code",0);d.markup=o;let p=n.src.slice(r,h).replace(/\n/g," ");p.startsWith(" ")&&p.endsWith(" ")&&/[^ ]/.test(p)&&(p=p.slice(1,-1)),d.content=p}return n.pos=c,!0}}}return e||(n.pending+=o),n.pos=r,!0}function FM(n,e){let t=n.pos,i=n.src.charCodeAt(t);if(e||i!==126)return!1;let s=n.scanDelims(n.pos,!0),r=s.length,o=String.fromCharCode(i);if(r<2)return!1;let l;r%2&&(l=n.push("text","",0),l.content=o,r--);for(let c=0;c<r;c+=2)l=n.push("text","",0),l.content=o+o,n.delimiters.push({marker:i,length:0,token:n.tokens.length-1,end:-1,open:s.can_open,close:s.can_close});return n.pos+=s.length,!0}function hg(n,e){let t,i=[],s=e.length;for(let r=0;r<s;r++){let o=e[r];if(o.marker!==126||o.end===-1)continue;let l=e[o.end];t=n.tokens[o.token],t.type="s_open",t.tag="s",t.nesting=1,t.markup="~~",t.content="",t=n.tokens[l.token],t.type="s_close",t.tag="s",t.nesting=-1,t.markup="~~",t.content="",n.tokens[l.token-1].type==="text"&&n.tokens[l.token-1].content==="~"&&i.push(l.token-1)}for(;i.length;){let r=i.pop(),o=r+1;for(;o<n.tokens.length&&n.tokens[o].type==="s_close";)o++;o--,r!==o&&(t=n.tokens[o],n.tokens[o]=n.tokens[r],n.tokens[r]=t)}}function NM(n){let e=n.tokens_meta,t=n.tokens_meta.length;hg(n,n.delimiters);for(let s=0;s<t;s++){var i;let r=(i=e[s])===null||i===void 0?void 0:i.delimiters;r&&hg(n,r)}}var Rg={tokenize:FM,postProcess:NM};function UM(n,e){let t=n.pos,i=n.src.charCodeAt(t);if(e||i!==95&&i!==42)return!1;let s=n.scanDelims(n.pos,i===42);for(let r=0;r<s.length;r++){let o=n.push("text","",0);o.content=String.fromCharCode(i),n.delimiters.push({marker:i,length:s.length,token:n.tokens.length-1,end:-1,open:s.can_open,close:s.can_close})}return n.pos+=s.length,!0}function dg(n,e){let t=e.length;for(let i=t-1;i>=0;i--){let s=e[i];if(s.marker!==95&&s.marker!==42||s.end===-1)continue;let r=e[s.end],o=i>0&&e[i-1].end===s.end+1&&e[i-1].marker===s.marker&&e[i-1].token===s.token-1&&e[s.end+1].token===r.token+1,l=String.fromCharCode(s.marker),c=n.tokens[s.token];c.type=o?"strong_open":"em_open",c.tag=o?"strong":"em",c.nesting=1,c.markup=o?l+l:l,c.content="";let h=n.tokens[r.token];h.type=o?"strong_close":"em_close",h.tag=o?"strong":"em",h.nesting=-1,h.markup=o?l+l:l,h.content="",o&&(n.tokens[e[i-1].token].content="",n.tokens[e[s.end+1].token].content="",i--)}}function OM(n){let e=n.tokens_meta,t=n.tokens_meta.length;dg(n,n.delimiters);for(let s=0;s<t;s++){var i;let r=(i=e[s])===null||i===void 0?void 0:i.delimiters;r&&dg(n,r)}}var Cg={tokenize:UM,postProcess:OM};function BM(n,e){let t,i,s,r,o="",l="",c=n.pos,h=!0;if(n.src.charCodeAt(n.pos)!==91)return!1;let d=n.pos,p=n.posMax,m=n.pos+1,x=n.md.helpers.parseLinkLabel(n,n.pos,!0);if(x<0)return!1;let _=x+1;if(_<p&&n.src.charCodeAt(_)===40){for(h=!1,_++;_<p&&(t=n.src.charCodeAt(_),!(!mn(t)&&t!==10));_++);if(_>=p)return!1;if(c=_,s=n.md.helpers.parseLinkDestination(n.src,_,n.posMax),s.ok){for(o=n.md.normalizeLink(s.str),n.md.validateLink(o)?_=s.pos:o="",c=_;_<p&&(t=n.src.charCodeAt(_),!(!mn(t)&&t!==10));_++);if(s=n.md.helpers.parseLinkTitle(n.src,_,n.posMax),_<p&&c!==_&&s.ok)for(l=s.str,_=s.pos;_<p&&(t=n.src.charCodeAt(_),!(!mn(t)&&t!==10));_++);}(_>=p||n.src.charCodeAt(_)!==41)&&(h=!0),_++}if(h){if(typeof n.env.references>"u")return!1;if(_<p&&n.src.charCodeAt(_)===91?(c=_+1,_=n.md.helpers.parseLinkLabel(n,_),_>=0?i=n.src.slice(c,_++):_=x+1):_=x+1,i||(i=n.src.slice(m,x)),i=Su(i),r=n.env.references[i],!r)return n.pos=d,!1;o=r.href,l=r.title}if(!e){n.pos=m,n.posMax=x;let A=n.push("link_open","a",1),v=[["href",o]];if(A.attrs=v,l&&v.push(["title",l]),i){let y=Object.create(null);y.label=i,A.meta=y}n.linkLevel++,n.md.inline.tokenize(n),n.linkLevel--,n.push("link_close","a",-1)}return n.pos=_,n.posMax=p,!0}function zM(n,e){let t,i,s,r,o,l,c,h,d="",p=n.pos,m=n.posMax;if(n.src.charCodeAt(n.pos)!==33||n.src.charCodeAt(n.pos+1)!==91)return!1;let x=n.pos+2,_=n.md.helpers.parseLinkLabel(n,n.pos+1,!1);if(_<0)return!1;if(r=_+1,r<m&&n.src.charCodeAt(r)===40){for(r++;r<m&&(t=n.src.charCodeAt(r),!(!mn(t)&&t!==10));r++);if(r>=m)return!1;for(h=r,l=n.md.helpers.parseLinkDestination(n.src,r,n.posMax),l.ok&&(d=n.md.normalizeLink(l.str),n.md.validateLink(d)?r=l.pos:d=""),h=r;r<m&&(t=n.src.charCodeAt(r),!(!mn(t)&&t!==10));r++);if(l=n.md.helpers.parseLinkTitle(n.src,r,n.posMax),r<m&&h!==r&&l.ok)for(c=l.str,r=l.pos;r<m&&(t=n.src.charCodeAt(r),!(!mn(t)&&t!==10));r++);else c="";if(r>=m||n.src.charCodeAt(r)!==41)return n.pos=p,!1;r++}else{if(typeof n.env.references>"u")return!1;if(r<m&&n.src.charCodeAt(r)===91?(h=r+1,r=n.md.helpers.parseLinkLabel(n,r),r>=0?s=n.src.slice(h,r++):r=_+1):r=_+1,s||(s=n.src.slice(x,_)),s=Su(s),o=n.env.references[s],!o)return n.pos=p,!1;d=o.href,c=o.title}if(!e){i=n.src.slice(x,_);let A=[];n.md.inline.parse(i,n.md,n.env,A);let v=n.push("image","img",0),y=[["src",d],["alt",""]];if(v.attrs=y,v.children=A,v.content=i,c&&y.push(["title",c]),s){let P=Object.create(null);P.label=s,v.meta=P}}return n.pos=r,n.posMax=m,!0}var VM=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,HM=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function GM(n,e){let t=n.pos;if(n.src.charCodeAt(t)!==60)return!1;let i=n.pos,s=n.posMax;for(;;){if(++t>=s)return!1;let o=n.src.charCodeAt(t);if(o===60)return!1;if(o===62)break}let r=n.src.slice(i+1,t);if(HM.test(r)){let o=n.md.normalizeLink(r);if(!n.md.validateLink(o))return!1;if(!e){let l=n.push("link_open","a",1);l.attrs=[["href",o]],l.markup="autolink",l.info="auto";let c=n.push("text","",0);c.content=n.md.normalizeLinkText(r);let h=n.push("link_close","a",-1);h.markup="autolink",h.info="auto"}return n.pos+=r.length+2,!0}if(VM.test(r)){let o=n.md.normalizeLink(`mailto:${r}`);if(!n.md.validateLink(o))return!1;if(!e){let l=n.push("link_open","a",1);l.attrs=[["href",o]],l.markup="autolink",l.info="auto";let c=n.push("text","",0);c.content=n.md.normalizeLinkText(r);let h=n.push("link_close","a",-1);h.markup="autolink",h.info="auto"}return n.pos+=r.length+2,!0}return!1}function WM(n){return/^<a[>\s]/i.test(n)}function XM(n){return/^<\/a\s*>/i.test(n)}function $M(n){let e=n|32;return e>=97&&e<=122}function qM(n,e){if(!n.md.options.html)return!1;let t=n.posMax,i=n.pos;if(n.src.charCodeAt(i)!==60||i+2>=t)return!1;let s=n.src.charCodeAt(i+1);if(s!==33&&s!==63&&s!==47&&!$M(s))return!1;let r=n.src.slice(i).match(yM);if(!r)return!1;if(!e){let o=n.push("html_inline","",0);o.content=r[0],WM(o.content)&&n.linkLevel++,XM(o.content)&&n.linkLevel--}return n.pos+=r[0].length,!0}var YM=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,JM=/^&([a-z][a-z0-9]{1,31});/i;function ZM(n,e){let t=n.pos,i=n.posMax;if(n.src.charCodeAt(t)!==38||t+1>=i)return!1;if(n.src.charCodeAt(t+1)===35){let s=n.src.slice(t).match(YM);if(s){if(!e){let r=s[1][0].toLowerCase()==="x"?parseInt(s[1].slice(1),16):parseInt(s[1],10),o=n.push("text_special","",0);o.content=Od(r)?za(r):za(65533),o.markup=s[0],o.info="entity"}return n.pos+=s[0].length,!0}}else{let s=n.src.slice(t).match(JM);if(s){let r=vu(s[0]);if(r!==s[0]){if(!e){let o=n.push("text_special","",0);o.content=r,o.markup=s[0],o.info="entity"}return n.pos+=s[0].length,!0}}}return!1}function fg(n){let e={},t=n.length;if(!t)return;let i=0,s=-2,r=[];for(let o=0;o<t;o++){let l=n[o];if(r.push(0),(n[i].marker!==l.marker||s!==l.token-1)&&(i=o),s=l.token,l.length=l.length||0,!l.close)continue;e.hasOwnProperty(l.marker)||(e[l.marker]=[-1,-1,-1,-1,-1,-1]);let c=e[l.marker][(l.open?3:0)+l.length%3],h=i-r[i]-1,d=h;for(;h>c;h-=r[h]+1){let p=n[h];if(p.marker===l.marker&&p.open&&p.end<0){let m=!1;if((p.close||l.open)&&(p.length+l.length)%3===0&&(p.length%3!==0||l.length%3!==0)&&(m=!0),!m){let x=h>0&&!n[h-1].open?r[h-1]+1:0;r[o]=o-h+x,r[h]=x,l.open=!1,p.end=o,p.close=!1,d=-1,s=-2;break}}}d!==-1&&(e[l.marker][(l.open?3:0)+(l.length||0)%3]=d)}}function jM(n){let e=n.tokens_meta,t=n.tokens_meta.length;fg(n.delimiters);for(let s=0;s<t;s++){var i;let r=(i=e[s])===null||i===void 0?void 0:i.delimiters;r&&fg(r)}}function KM(n){let e,t,i=0,s=n.tokens,r=n.tokens.length;for(e=t=0;e<r;e++)s[e].nesting<0&&i--,s[e].level=i,s[e].nesting>0&&i++,s[e].type==="text"&&e+1<r&&s[e+1].type==="text"?s[e+1].content=s[e].content+s[e+1].content:(e!==t&&(s[t]=s[e]),t++);e!==t&&(s.length=t)}var Nd=[["text",TM],["linkify",PM],["newline",DM],["escape",IM],["backticks",kM],["strikethrough",Rg.tokenize],["emphasis",Cg.tokenize],["link",BM],["image",zM],["autolink",GM],["html_inline",qM],["entity",ZM]],Ud=[["balance_pairs",jM],["strikethrough",Rg.postProcess],["emphasis",Cg.postProcess],["fragments_join",KM]],Pg=class{constructor(){ht(this,"ruler",new Xa),ht(this,"ruler2",new Xa),ht(this,"State",Tg);for(let n=0;n<Nd.length;n++)this.ruler.push(Nd[n][0],Nd[n][1]);for(let n=0;n<Ud.length;n++)this.ruler2.push(Ud[n][0],Ud[n][1])}skipToken(n){let e=n.pos,t=this.ruler.getRules(""),i=t.length,s=n.md.options.maxNesting,r=n.cache;if(typeof r[e]<"u"){n.pos=r[e];return}let o=!1;if(n.level<s){for(let l=0;l<i;l++)if(n.level++,o=t[l](n,!0),n.level--,o){if(e>=n.pos)throw new Error("inline rule didn't increment state.pos");break}}else n.pos=n.posMax;o||n.pos++,r[e]=n.pos}tokenize(n){let e=this.ruler.getRules(""),t=e.length,i=n.posMax,s=n.md.options.maxNesting;for(;n.pos<i;){let r=n.pos,o=!1;if(n.level<s){for(let l=0;l<t;l++)if(o=e[l](n,!1),o){if(r>=n.pos)throw new Error("inline rule didn't increment state.pos");break}}if(o){if(n.pos>=i)break;continue}n.pending+=n.src[n.pos++]}n.pending&&n.pushPending()}parse(n,e,t,i){let s=new this.State(n,e,t,i);this.tokenize(s);let r=this.ruler2.getRules(""),o=r.length;for(let l=0;l<o;l++)r[l](s)}},QM={default:{options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"\u201C\u201D\u2018\u2019",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},zero:{options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"\u201C\u201D\u2018\u2019",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","strip_references","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},commonmark:{options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"\u201C\u201D\u2018\u2019",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","strip_references","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}}},ew=/^(vbscript|javascript|file|data):/,tw=/^data:image\/(gif|png|jpeg|webp);/,pg=["http:","https:","mailto:"],gs=class{validateLink(n){let e=n.trim().toLowerCase();return ew.test(e)?tw.test(e):!0}normalizeLink(n){let e=Oa(n,!0);if(e.hostname&&(!e.protocol||pg.indexOf(e.protocol)>=0))try{e.hostname=Ld.toASCII(e.hostname)}catch{}return e.auth&&(e.auth=ar(e.auth)),e.hostname&&(e.hostname=ar(e.hostname)),e.pathname&&(e.pathname=ar(e.pathname)),e.search&&(e.search=ar(e.search)),e.hash&&(e.hash=ar(e.hash)),Ro(e)}normalizeLinkText(n){let e=Oa(n,!0);if(e.hostname&&(!e.protocol||pg.indexOf(e.protocol)>=0))try{e.hostname=Ld.toUnicode(e.hostname)}catch{}return Ua(Ro(e),Ua.defaultChars+"%")}constructor(...n){ht(this,"inline",new Pg),ht(this,"block",new Ag),ht(this,"core",new Sg),ht(this,"renderer",new vg),ht(this,"linkify",new Zm),ht(this,"utils",SS),ht(this,"helpers",Object.assign({},OS));let[e,t]=n;typeof e=="string"?(this.configure(e),t&&this.set(t)):(this.configure("default"),this.set(e||{}))}set(n){return Object.assign(this.options,n),this}configure(n){let e;if(typeof n=="string"){let s=n;if(e=QM[s],!e)throw new Error(`Wrong 'markdown-it' preset "${s}", check name`)}else e=n;if(!e)throw new Error("Wrong `markdown-it` preset, can't be empty");e.options&&(this.options={...e.options});let t=e.components;if(t){var i;["core","block","inline"].forEach(r=>{var o;let l=(o=t[r])===null||o===void 0?void 0:o.rules;l&&this[r].ruler.enableOnly(l)});let s=(i=t.inline)===null||i===void 0?void 0:i.rules2;s&&this.inline.ruler2.enableOnly(s)}return this}enable(n,e=!1){let t=[];Array.isArray(n)||(n=[n]),["core","block","inline"].forEach(s=>{t=t.concat(this[s].ruler.enable(n,!0))}),t=t.concat(this.inline.ruler2.enable(n,!0));let i=n.filter(s=>t.indexOf(s)<0);if(i.length&&!e)throw new Error(`MarkdownIt. Failed to enable unknown rule(s): ${i}`);return this}disable(n,e=!1){let t=[];Array.isArray(n)||(n=[n]),["core","block","inline"].forEach(s=>{t=t.concat(this[s].ruler.disable(n,!0))}),t=t.concat(this.inline.ruler2.disable(n,!0));let i=n.filter(s=>t.indexOf(s)<0);if(i.length&&!e)throw new Error(`MarkdownIt. Failed to disable unknown rule(s): ${i}`);return this}use(n,...e){return n.apply(n,[this,...e]),this}parse(n,e){if(typeof n!="string")throw new Error("Input data should be a String");let t=new this.core.State(n,this,e);return this.core.process(t),t.tokens}render(n,e={}){return this.renderer.render(this.parse(n,e),this.options,e)}parseInline(n,e){let t=new this.core.State(n,this,e);return t.inlineMode=!0,this.core.process(t),t.tokens}renderInline(n,e={}){return this.renderer.render(this.parseInline(n,e),this.options,e)}};ht(gs,"Token",Lr);ht(gs,"Ruler",Xa);ht(gs,"Renderer",vg);ht(gs,"ParserCore",Sg);ht(gs,"StateCore",yg);ht(gs,"ParserBlock",Ag);ht(gs,"StateBlock",Mg);ht(gs,"ParserInline",Pg);ht(gs,"StateInline",Tg);var Dg=gg(gs);var nw=new Dg({html:!1}).disable("image");function Ig(n){return n?nw.render(n):'<p class="missing-doc">No docstring is available for this symbol. Its declared interface is shown above; open Code to inspect the implementation.</p>'}function iw(){let n=!1,e=Am(),t={},i={},s={},r={},o={L:12,M:10,S:9},l,c;function h(a){let u=bd[a];e=a,Object.assign(t,u.C),Object.assign(i,u.TIER),Object.assign(s,u.T),Object.assign(r,u.K),l={1:{edge:[i.strong,1.4],head:u.HEAD[1],rule:i.edge,internals:.75,column:.4,foot:i.edge},2:{edge:[i.link,1.2],head:u.HEAD[2],rule:i.rule,internals:.55,column:.3,foot:i.rule},3:{edge:[i.edge,1],head:u.HEAD[3],rule:i.rule,internals:.35,column:.18,foot:i.rule}},c={overview:{plate:[i.link,1.2],pkg:s.text,box:3,link:i.link,call:i.link,ribbon:i.link,imp:i.edge,card:[i.link,1],block:[i.link,1.2]},plan:{plate:[i.link,1.2],pkg:s.text,box:3,link:i.edge,call:i.edge,ribbon:i.rule,imp:i.link,card:[i.edge,1],block:[i.edge,1]},package:{plate:[i.edge,1],pkg:s.muted,box:1,link:i.link,call:i.link,ribbon:i.edge,imp:i.edge,card:[i.link,1],block:[i.link,1.2]},module:{plate:[i.rule,1],pkg:s.dim,box:3,link:i.edge,call:i.link,ribbon:i.edge,imp:i.edge,card:[i.strong,1],block:[i.strong,1.2]}}}h(e);let d=a=>a.exported,p=(a,u,g)=>new Pt(a).lerp(new Pt(u),g).getHex(),m=a=>"#"+a.toString(16).padStart(6,"0"),x=matchMedia("(prefers-reduced-motion: reduce)").matches,_='"JetBrains Mono","SF Mono","SFMono-Regular",Menlo,Consolas,monospace',A=0,v=40,y=0,P=36,I="atlas.panel.width",E=320,R=960,L=480,V=(()=>{let a=+localStorage.getItem(I);return a?Math.max(E,Math.min(R,a)):L})(),M=document.querySelector("#frame"),k=()=>M.clientWidth,X=()=>M.clientHeight,W=Math.min(devicePixelRatio,2),F=a=>document.querySelector(a),me=()=>F("#panel").classList.contains("hidden")||Ne<720?0:F("#panel").getBoundingClientRect().width+24,K=(a=0,u=0,g=0)=>new J(a,u,g),Q=(a,u,g)=>a+(u-a)*g,ye=a=>1-Math.pow(1-a,4.5),de=(a,u,g)=>Math.max(u,Math.min(g,a)),Me=a=>a<.5?4*a*a*a:1-Math.pow(-2*a+2,3)/2,Ae=a=>new Pt(a),{view:ne,source:Ye,optimization_prompt:tt}=JSON.parse(F("#atlasView").textContent);if(F("#pkg").textContent=ne.package,!ne.panes.length){F("#status").textContent="No non-test functions or classes to display.";for(let a of["panel","cameraTools","rail","modes","views"])F("#"+a).classList.add("hidden");return}let zt=Ye.symbols,ze=ne.dims,je=new Map;ne.nodes.forEach((a,u)=>{a.i=u,je.set(a.id,a)});let ce=new Map(ne.classes.map(a=>[a.id,a])),xe=new Map(ne.panes.map(a=>[a.module,a])),Te=new Map(ne.plates.map(a=>[a.unit,a])),xt=new Map(ne.districts.map(a=>[a.package,a])),mt=ne.floors;F("#pkg").textContent=ne.package;let Qe=wm(ne),on=new Map;ne.links.forEach((a,u)=>a.members.forEach(g=>on.set(g,u)));let Dt=new Map;for(let a of ne.panes)for(let u of fu(a.box))Dt.set(`${a.module}|${u.slot}`,u);let Jt=ne.guide,St=Jt.steps,Vt=new Map(St.map((a,u)=>[a.id,u])),D={scope:null,selected:null,hover:null,hoverBox:null,hoverLine:null,open:new Set,expanded:new Set,view:"axo",mouse:[0,0],guide:null,resume:0,pulse:!1,proj:"ortho",inspect:null,inspectBack:[],hoverCall:null},Ft="guide",Zt=null,en=null,an=0,hn=!1,Z=!0,Ln=!1,Ut=()=>D.guide===null?null:St[D.guide];function U(){let a=Ut();return a&&a.lod==="plate"?"overview":D.scope?D.scope.kind==="module"?"module":"package":a?"package":D.view==="plan"?"plan":"overview"}let b=F("#gl"),ee=new ru({canvas:b,antialias:!0,alpha:!0,preserveDrawingBuffer:!0});ee.setPixelRatio(W),ee.setClearColor(0,0);let te=new ca;te.fog=new la(t.bg,60,200);let ge=new Kn(24,1,.5,3e3),Ce=new Ar(-640,640,400,-400,.5,3e3),Ve=120,ie=ge,ue=new cu(ie,b);ue.enableDamping=!1,ue.enableRotate=!0,ue.zoomSpeed=.65,ue.screenSpacePanning=!0,ue.mouseButtons={LEFT:ui.ROTATE,MIDDLE:ui.DOLLY,RIGHT:ui.PAN},ue.touches={ONE:Ai.ROTATE,TWO:Ai.DOLLY_PAN},ue.minPolarAngle=.06,ue.maxPolarAngle=Math.PI/2-.02;let He=new ni(new J(0,0,-1),0),dt=new ni(new J(0,0,1),0),Ie=null,Oe=F("#labels"),oe=Oe.getContext("2d"),Ne=k(),Je=X(),$=!0;Rn();let Ue=[];function ve(a,u={}){let g=new Dr;g.setPositions(a),g.setColors(new Float32Array(a.length).fill(1));let f=new us({color:16777215,linewidth:u.width??1,vertexColors:!0,transparent:!0,opacity:u.opacity??1,dashed:!!u.dashed,dashSize:Math.max(2,(u.dash??.12)*40),gapSize:Math.max(2,(u.gap??.1)*40),depthWrite:!1,fog:!0});f.resolution.set(Ne,Je),Ue.push(f);let S=new Na(g,f);return u.dashed&&S.computeLineDistances(),S.renderOrder=u.order??3,S}function Ge(a,u){a.userData.paintKey=null,a.geometry.setPositions(u),a.material.dashed&&a.computeLineDistances()}function De(a,u,g,f){let S=`${u}|${g??u}|${f}`;if(a.userData.paintKey===S)return;a.userData.paintKey=S;let w=Ae(u),C=Ae(g??u),z=new Float32Array(f*3),O=new Pt;for(let H=0;H<f;H++)O.copy(w).lerp(C,f>1?H/(f-1):0),z[H*3]=O.r,z[H*3+1]=O.g,z[H*3+2]=O.b;a.geometry.setColors(z)}function we(a,u={}){let g=new or;g.setPositions(a);let f=new us({color:u.color??16777215,linewidth:u.width??1,transparent:!0,opacity:u.opacity??1,dashed:!!u.dashed,dashSize:Math.max(2,(u.dash??.1)*40),gapSize:Math.max(2,(u.gap??.08)*40),depthWrite:!1,fog:!0});f.resolution.set(Ne,Je),Ue.push(f);let S=new Ao(g,f);return u.dashed&&S.computeLineDistances(),S.renderOrder=u.order??3,S}function at(a,u,g,f,S){return[a,u,S,a+g,u,S,a+g,u-f,S,a,u-f,S,a,u,S]}function ot(a,u,g,f,S=24){let w=[];for(let C=0;C<=S;C++){let z=C/S,O=1-z,H=O*O*O,B=3*O*O*z,q=3*O*z*z,se=z*z*z;w.push(H*a.x+B*u.x+q*g.x+se*f.x,H*a.y+B*u.y+q*g.y+se*f.y,H*a.z+B*u.z+q*g.z+se*f.z)}return w}function Ot(a,u=1,g={}){return new wr({color:a,transparent:!0,opacity:u,...g})}let tn=[],fi=[];function dn(a,u=1,g={}){let f=Ot(t[a],u,g);return tn.push([f,a]),f}function ur(a,u,g){return De(a,t[u],null,g),fi.push([a,u,g]),a}let Po=new js(1,1);function wn(a,u,g,f,S,w,C=2.1){w.depthWrite=!1,w.polygonOffset=!0,w.polygonOffsetFactor=-1,w.polygonOffsetUnits=-4;let z=new Sn(Po,w);return z.scale.set(g,f,1),z.position.set(a+g/2,u-f/2,S),z.renderOrder=C,z}let kr=Math.min(...ne.plates.map(a=>a.x))-4,$a=Math.max(...ne.plates.map(a=>a.x+a.w))+4,Do=Math.min(...ne.plates.map(a=>a.z))-5,Io=Math.max(...ne.plates.map(a=>a.z))+6,Ri=new Sn(new js($a-kr,Io-Do),dn("ground",.82,{depthWrite:!1}));Ri.rotation.x=-Math.PI/2,Ri.position.set((kr+$a)/2,mt.ground-.01,(Do+Io)/2),Ri.renderOrder=0,te.add(Ri);let Ci=new Map;for(let a of ne.plates){let u=a.z-ze.plate_back,g=a.z+ze.plate_front,f=new Sn(Po,dn("plate",.92,{depthWrite:!1}));f.scale.set(a.w,g-u,1),f.rotation.x=-Math.PI/2,f.position.set(a.x+a.w/2,mt.ground+.004,(u+g)/2),f.renderOrder=0;let S=mt.ground+.008,w=ve([a.x,S,u,a.x+a.w,S,u,a.x+a.w,S,g,a.x,S,g,a.x,S,u],{width:1,order:1});De(w,t.plateLine,null,5);let C=Math.max(...a.modules.map(q=>xe.get(q).box.h))+.6,z=we(Array.from(new Er(new Wi(a.w,C,g-u)).attributes.position.array),{color:t.plateLine,width:1,order:1});z.position.set(a.x+a.w/2,.3-C/2,(u+g)/2);let O=new ki,H=.3-C/2,B=(u+g)/2;for(let[q,se,pe,_e,rt,Fe,nt,vt]of[[a.w,C,a.x+a.w/2,H,u,0,0,"plate"],[g-u,C,a.x,H,B,Math.PI/2,0,"boxSide"],[g-u,C,a.x+a.w,H,B,Math.PI/2,0,"boxSide"],[a.w,g-u,a.x+a.w/2,.3-C,B,0,-Math.PI/2,"plate"]]){let et=new Sn(Po,dn(vt,1,{transparent:!1,side:hi}));et.scale.set(q,se,1),et.position.set(pe,_e,rt),et.rotation.set(nt,Fe,0),O.add(et)}te.add(f,w,z,O),Ci.set(a.unit,{d:a,plate:f,outline:w,frame:z,walls:O,a:1,ta:1})}let Lo=new Wi(1,1,1),qa=Array.from(new Er(Lo).attributes.position.array),Xt=new Map,ko=220;for(let a of ne.panes){let u=a.box,g=new ki;g.position.set(u.x,0,a.z);let f=Le=>dn(Le,1,{transparent:!1,polygonOffset:!0,polygonOffsetFactor:2,polygonOffsetUnits:4}),S=[f("boxSide"),f("boxSide"),f("boxTop"),f("boxSide"),f("modFront"),f("boxSide")],w=new Sn(Lo,S);w.userData={type:"module",id:a.module},w.renderOrder=2;let C=we(qa,{color:t.modLine,width:1.2,order:2}),z=new ki;z.add(w,C),g.add(z);let O=u.d+.004,H=u.w,B=wn(0,0,H,ze.mod_header,O,Ot(t.modHead),2.1);g.add(B);let q=[],se=[],pe=[],_e=new Map,rt={cloneFill:2.2,deadFill:2.2,internals:2.3,ghost:2.4,tick:2.5},Fe=(Le,Y,re=1,Se=null)=>(Y.userData.k=re,Y.userData.role=Se,Y.isLine2||Y.isLineSegments2?Y.renderOrder=2.4:rt[Se]&&(Y.renderOrder=rt[Se]),Le.push(Y),g.add(Y),Y),nt=(Le,Y,re,Se=.1,be=!1)=>{Le.clone&&be&&Fe(se,wn(.03,Y-.015,H-.06,re-.03,O+.0012,dn("cloneFill",1,{depthWrite:!1}),2.1),t.cloneFillA,"cloneFill"),Le.lb&&Fe(se,wn(.04,Y-.05,.12,Math.max(.08,re-.1),O+.002,dn("lb"),2.5)),Le.clone&&Fe(se,ur(ve([Se+.06,Y-re+.05,O+.003,H-.1,Y-re+.05,O+.003],{width:1.5,order:2}),"clone",2))};for(let Le of u.rows){let Y=-Le.y,re=ve([.06,Y,O+.001,H-.06,Y,O+.001],{width:1,order:2});if(De(re,t.rowLine,null,2),Fe(q,re,1,"rule"),Le.kind==="class"){Fe(q,wn(.12,Y-.05,H-.22,Le.h-.1,O+.001,dn("classRow"),2.1));let Se=ve(at(.12,Y-.05,H-.22,Le.h-.1,O+.0015),{width:1,order:2});De(Se,t.boxLine,null,5),Fe(q,Se,1,"classEdge")}nt(Le,Y,Le.h,.1,!0)}if(u.more){let Le=Math.min(u.more.lines,5),Y=[];for(let re=0;re<Le;re++){let Se=-u.more.y-(re+.5)*(u.more.h/Le);Y.push(.1,Se,O+.002,H-.1,Se,O+.002)}Fe(se,we(Y,{color:t.modLine,width:1,order:2}),.9,"more"),nt(u.more,-u.more.y,u.more.h)}if(u.tail){let Le=u.tail;Fe(se,wn(.03,-Le.y-.03,H-.06,Le.h-.06,O+.001,dn("boxHead"),2.1),1,"internals"),nt(Le,-Le.y,Le.h)}for(let Le of u.ghosts){let re=-Le.y-.03,Se=H-.12,be=Le.h-.06;if(Fe(se,wn(.06,re,Se,be,O+.0012,dn("deadFill",1,{depthWrite:!1}),2.1),t.deadFillA,"deadFill"),Fe(se,ur(ve(at(.06,re,Se,be,O+.002),{width:1.2,order:2}),"dead",5),1,"ghost"),Le.id===null){let Xe=Math.min(Le.lines,4),it=[];for(let st=0;st<Xe;st++){let Yt=-Le.y-.04-(st+.5)*((Le.h-.08)/Xe);it.push(.14,Yt,O+.002,H-.14,Yt,O+.002)}Fe(se,we(it,{color:t.dead,width:1,order:2}),1,"deadLines")}}let vt=[];u.ghosts.length&&vt.push("dead"),(u.rows.some(Le=>Le.clone)||u.tail?.clone||u.more?.clone)&&vt.push("clone"),vt.forEach((Le,Y)=>{Fe(se,wn(H-.1-.3-Y*(.3+.08),-.16,.3,.3,O+.003,dn(Le),2.1),1,"tick")});for(let Le of fu(u)){let Y=ur(ve(at(.03,-Le.y-.015,H-.06,Le.h-.03,O+.004),{width:1.4,order:2.5}),"lit",5);Y.visible=!1,g.add(Y),_e.set(Le.slot,Y)}if(u.dead_top!==null){let Le=ve([.1,u.dead_top,O+.002,H-.1,u.dead_top,O+.002],{width:1,dashed:!0,dash:.08,gap:.08,order:2});ur(Le,"ghost",2),Fe(pe,Le)}te.add(g);let et=wn(u.x,-u.h,u.w,u.h+mt.ground,a.z+u.d*.5,dn("column",.45,{side:hi,depthWrite:!1}),1),Lt=ve(at(u.x,mt.ground+.012,u.w,0,a.z).slice(0,6).concat([u.x+u.w,mt.ground+.012,a.z+u.d,u.x,mt.ground+.012,a.z+u.d,u.x,mt.ground+.012,a.z]),{width:1,order:1});De(Lt,t.paneLine,null,5),te.add(et,Lt);let Et={p:a,b:u,g,bodyG:z,body:w,mats:S,edges:C,head:B,rowsG:q,sig:se,openG:pe,lit:_e,column:et,foot:Lt,a:1,ta:1,rowsA:0,rowsTa:0,zoomRows:!1,u:0,uTarget:0,h:u.h,tier:null,ts:l[3]};Fr(Et,u.h),Xt.set(a.module,Et),Fs(Et,3)}function Fs(a,u){if(a.tier===u)return;a.tier=u;let g=a.ts=l[u];a.edges.material.color.set(g.edge[0]),a.edges.material.linewidth=g.edge[1],a.head.material.color.set(g.head),a.foot.userData.paintKey=null,De(a.foot,g.foot,null,5);for(let f of[...a.rowsG,...a.sig]){let S=f.userData.role;S==="rule"?De(f,g.rule,null,2):S==="classEdge"?De(f,g.rule,null,5):S==="more"&&f.material.color.set(u===1?i.link:i.edge)}}function Fr(a,u){if(a.h=u,a.bodyG.scale.set(a.b.w,u,a.b.d),a.bodyG.position.set(a.b.w/2,-u/2,a.b.d/2),a.column){let g=-u,f=mt.ground;a.column.visible=g>f+.01,a.column.scale.y=Math.max(.001,g-f),a.column.position.y=(g+f)/2}}let Ya=a=>Me(Xt.get(a).u);function Nr(a){let u=a.a,g=Me(a.u),f=a.sil?0:1;a.mats.forEach((S,w)=>{let C=["boxSide","boxSide","boxTop","boxSide","modFront","boxSide"][w];S.color.set(p(t.bg,t[C],u))}),a.body.visible=!a.sil,a.edges.material.opacity=u,a.head.material.opacity=u*f;for(let S of a.rowsG)S.material.opacity=f*u*a.rowsA*(1-g)*S.userData.k,S.visible=S.material.opacity>.003;for(let S of a.sig)S.material.opacity=f*u*(1-g)*S.userData.k*(S.userData.role==="internals"?a.ts.internals:1),S.visible=S.material.opacity>.003;for(let S of a.openG)S.material.opacity=f*u*g,S.visible=S.material.opacity>.003;for(let S of a.lit.values())S.material.opacity=f*Math.min(1,u*1.4)*(1-g);a.column.material.opacity=f*a.ts.column*u,a.foot.material.opacity=u}let _s=new Map;function wu(a){return a.dead?{key:"dead",width:1.6}:a.clone!==null?{key:"clone",width:2}:a.lb?{key:"lb",width:1.6}:{key:"cardLine",width:1}}for(let a of ne.nodes){if(a.x===void 0)continue;let u=wn(a.x,a.y,a.w,a.h,a.z+.012,dn("card",0),2.1);u.material.depthWrite=!0,u.material.polygonOffsetFactor=1,u.material.polygonOffsetUnits=2,u.renderOrder=2,u.userData={type:"node",id:a.id};let g=wu(a),f=ve(at(a.x,a.y,a.w,a.h,a.z+.014),{width:g.width,dashed:g.dashed,dash:g.dash,gap:g.gap,order:2.4,opacity:0});De(f,t[g.key],null,5),u.visible=f.visible=!1,te.add(u,f);let S=a.dead?"dead":a.clone!==null?"clone":null,w=[];S&&(w.push([wn(a.x,a.y,a.w,a.h,a.z+.0125,dn(S+"Fill",0),2.2),S+"Fill"]),w.push([wn(a.x+a.w-.17,a.y-.04,.13,.13,a.z+.017,dn(S,0),2.5),"tick"])),a.lb&&!a.dead&&w.push([wn(a.x+.03,a.y-.05,.06,a.h-.1,a.z+.016,dn("lb",0),2.5),"bar"]);for(let[C]of w)C.visible=!1,te.add(C);_s.set(a.id,{n:a,mesh:u,border:f,extra:w,st:g,a:1,ta:1})}let Eu=a=>a==="deadFill"?t.deadFillA:a==="cloneFill"?t.cloneFillA:1;function T(a){let u=Xt.get(a.module);return a.y-a.h>=-u.h-.001}function j(a){let u=a.n,g=Xt.get(u.module),f=Me(g.u)*(T(u)?1:0)*g.a,S=a.a*f;a.mesh.material.opacity=S,a.border.material.opacity=S,a.mesh.visible=a.border.visible=S>.003;for(let[w,C]of a.extra)w.material.opacity=S*Eu(C),w.visible=S>.003}let le=new Map;function ae(a){let u=le.get(a.id),g=u?u.open:D.expanded.has(a.id),f=u?Me(u.lift):0,S=g?a.expanded.w:a.w,w=g?a.expanded.h:a.h,C=a.data_only?[]:a.public.concat(g?a.private:[]),z=a.z+a.d+f*a.expanded.lift,O=!g&&a.private.length?a.y-w+ze.box_tail/2+.03:null;return{x0:a.x,x1:a.x+a.w,xr:a.x+S,w:S,h:w,rows:C,zf:z,tailY:O,open:g,cx:a.x+S/2}}function he(a,u){return a.y-ze.box_head-ze.box_row*(u+.5)}function Be(a){let u=le.get(a.id);u&&te.remove(u.group);let g=D.expanded.has(a.id),f=new ki,S=g?a.expanded.w:a.w,w=g?a.expanded.h:a.h,C=a.d,z=[Ot(t.boxSide),Ot(t.boxSide),Ot(t.boxTop),Ot(t.boxSide),Ot(t.boxFront),Ot(t.boxSide)],O=new Sn(new Wi(S,w,C),z);O.position.set(S/2,-w/2,C/2),O.renderOrder=2,O.userData={type:"box",id:a.id},f.add(O);let H=we(Array.from(new Er(new Wi(S,w,C)).attributes.position.array),{color:t.boxLine,width:1.3,order:2});H.position.set(S/2,-w/2,C/2),f.add(H);let B=C+.004,q=[],se=wn(0,0,S,ze.box_head,B,Ot(t.boxHead),2.1);f.add(se),q.push(se);let pe=a.w,_e=a.data_only?[]:a.public.concat(g?a.private:[]);if(_e.forEach((nt,vt)=>{let et=je.get(nt),Lt=-ze.box_head-ze.box_row*vt;if(et.clone!==null){let Et=wn(.03,Lt-.01,pe-.06,ze.box_row-.02,B+8e-4,Ot(t.cloneFill,t.cloneFillA),2.2);Et.userData.alpha=t.cloneFillA,f.add(Et),q.push(Et);let Le=ve([.16,Lt-ze.box_row+.035,B+.002,pe-.12,Lt-ze.box_row+.035,B+.002],{width:1.5,order:2});De(Le,t.clone,null,2),f.add(Le)}if(et.lb){let Et=wn(.05,Lt-.05,.045,ze.box_row-.1,B+.001,Ot(t.lb),2.5);f.add(Et),q.push(Et)}}),g&&a.private.length){let nt=-ze.box_head-ze.box_row*a.public.length,vt=wn(.03,nt+.02,pe-.06,.05,B+.001,Ot(t.boxHead,.9),2.1);f.add(vt),q.push(vt)}if(!g&&a.private.length){let nt=wn(.03,-w+ze.box_tail+.01,S-.06,ze.box_tail-.04,B+.001,Ot(t.boxHead,.85),2.1);f.add(nt),q.push(nt)}let rt=[];if(g&&!a.data_only&&a.fields.length){let nt=a.w+.3,vt=ve([a.w+.15,-ze.box_head+.02,B,a.w+.15,-w+.06,B],{width:1,order:2});De(vt,t.fieldSep,null,2),f.add(vt);let et=Et=>-ze.box_head-ze.box_field*(Et+.5),Lt=new Map(a.fields.map((Et,Le)=>[Et.name,Le]));_e.forEach((Et,Le)=>{let Y=a.access[Et];if(!Y)return;let re=-ze.box_head-ze.box_row*(Le+.5);for(let[Se,be]of[[Y.writes,"w"],[Y.reads,"r"]])for(let Xe of Se){if(!Lt.has(Xe)||be==="r"&&Y.writes.includes(Xe))continue;let it=et(Lt.get(Xe)),st=ot(K(a.w-.04,re,B+.003),K(a.w+.1,re,B+.003),K(nt-.14,it,B+.003),K(nt-.02,it,B+.003),12),Yt=ve(st,{width:be==="w"?1.1:1,dashed:be==="r",dash:.03,gap:.04,opacity:.55,order:2});De(Yt,be==="w"?t.write:t.read,null,13),Yt.userData={method:Et,kind:be},f.add(Yt),rt.push(Yt)}})}for(let nt of f.children)(nt.isLine2||nt.isLineSegments2)&&(nt.renderOrder=2.4);f.position.set(a.x,a.y,a.z),te.add(f);let Fe={cl:a,group:f,box:O,mats:z,edges:H,flat:q,fieldMarks:rt,open:g,lift:u?u.lift:0,liftTarget:g?1:0,a:u?u.a:1,ta:u?u.ta:1};return f.position.z=a.z+Me(Fe.lift)*a.expanded.lift,le.set(a.id,Fe),Ke(Fe),Fe}function Ke(a){let u=Xt.get(a.cl.module),g=Me(u.u)*u.a*(a.cl.y-a.cl.h>=-u.h-.001?1:0),f=a.a*g;a.group.visible=f>.003,a.mats.forEach(S=>S.opacity=f),a.edges.material.opacity=f,a.flat.forEach(S=>S.material.opacity=f*(S.userData.alpha??1)),a.group.children.forEach(S=>{S.isLine2&&(S.material.opacity=f*(S.userData.method?.55:1))})}for(let a of ne.classes)Be(a);class $e extends us{constructor(u){super(u),this.vertexShader=this.vertexShader.replace("attribute vec3 instanceColorEnd;",`attribute vec3 instanceColorEnd;
		attribute float instanceWidthStart;
		attribute float instanceWidthEnd;
		attribute float instanceAlphaStart;
		attribute float instanceAlphaEnd;
		varying float vAlpha;`).replace("void main() {",`void main() {
			vAlpha = ( position.y < 0.5 ) ? instanceAlphaStart : instanceAlphaEnd;`).replace("offset *= linewidth;","offset *= linewidth * ( ( position.y < 0.5 ) ? instanceWidthStart : instanceWidthEnd );"),this.fragmentShader=this.fragmentShader.replace("uniform float linewidth;",`uniform float linewidth;
		varying float vAlpha;`).replace("gl_FragColor = vec4( diffuseColor.rgb, alpha );","gl_FragColor = vec4( diffuseColor.rgb, alpha * vAlpha );")}}function ct(a){let u=a.length/3,g=new Float32Array(u),f=0;for(let S=1;S<u;S++)f+=Math.hypot(a[S*3]-a[S*3-3],a[S*3+1]-a[S*3-2],a[S*3+2]-a[S*3-1]),g[S]=f;for(let S=1;S<u;S++)g[S]/=f||1;return g.len=f,g}function ft(a,u,g){let f=new ss(g,2,1);a.setAttribute(u+"Start",new ci(f,1,0)),a.setAttribute(u+"End",new ci(f,1,1))}function At(a){let u=a.n,g=new Float32Array(Math.max(0,u-1)*2);for(let f=0;f<u-1;f++)g[2*f]=1-a.taper*a.f[f],g[2*f+1]=1-a.taper*a.f[f+1];ft(a.line.geometry,"instanceWidth",g)}function wt(a,u,g,f=null){let S=`${u}|${g??u}|${a.n}|${f?`${f.start}|${f.f0}|${f.f1}`:""}`;if(a.paintKey===S)return;a.paintKey=S,a.lastA=u,a.lastB=g??u,a.lastFade=f;let w=Ae(u),C=Ae(g??u),z=new Pt,O=new Float32Array(a.n*3),H=new Float32Array(a.n);for(let q=0;q<a.n;q++){let se=a.f[q];z.copy(w).lerp(C,se),O[q*3]=z.r,O[q*3+1]=z.g,O[q*3+2]=z.b;let pe=f?f.start?se:1-se:0;H[q]=f?1-de((pe-f.f0)/Math.max(.001,f.f1-f.f0),0,1):1}a.line.geometry.setColors(O);let B=new Float32Array(Math.max(0,a.n-1)*2);for(let q=0;q<a.n-1;q++)B[2*q]=H[q],B[2*q+1]=H[q+1];ft(a.line.geometry,"instanceAlpha",B)}function ut(a,u={}){let g=Array.isArray(a[0])?a.flat():a,f=new Dr;f.setPositions(g);let S=new $e({color:16777215,linewidth:u.width??1.5,vertexColors:!0,transparent:!0,opacity:0,dashed:!!u.dashed,dashSize:Math.max(2,(u.dash??.1)*40),gapSize:Math.max(2,(u.gap??.08)*40),depthWrite:!1,fog:!0});S.resolution.set(Ne,Je),Ue.push(S);let w=new Na(f,S);u.dashed&&w.computeLineDistances(),w.renderOrder=u.order??3,w.visible=!1;let C={line:w,pts:g,n:g.length/3,f:ct(g),taper:u.taper??.5,a:0,ta:0};return At(C),wt(C,16777215),C}function $t(a,u){let g=Array.isArray(u[0])?u.flat():u;a.pts=g,a.n=g.length/3,a.f=ct(g),a.paintKey=null,a.line.geometry.setPositions(g),a.line.material.dashed&&a.line.computeLineDistances(),At(a),wt(a,a.lastA??16777215,a.lastB,a.lastFade??null)}function yn(a){if(ce.has(a))return a;let u=je.get(a);return u&&u.cls&&!u.dead&&ce.has(u.cls)?u.cls:null}function gn(a,u){if(!D.open.has(u))return null;let g=yn(a),f=g?le.get(g):null;return f?Me(f.lift):0}function qt(a,u){let g=ne.edges[a],f=gn(g.s,g.ms),S=gn(g.t,g.mt),w=se=>se===null?"f":se>=1?"x":"o",C=se=>se!==null&&se>0&&se<1;if(!C(f)&&!C(S)){let se=w(f)+w(S);return Qe.call(a,u,se)??Qe.call(a,u,se.replace(/x/g,"o"))}let z=C(f)?f:S,O=(C(f)?"o":w(f))+(C(S)?"o":w(S)),H=(C(f)?"x":w(f))+(C(S)?"x":w(S)),B=Qe.raw(a,u,O)??Qe.raw(a,u,O.replace(/x/g,"o")),q=Qe.raw(a,u,H)??B;return B?B.length!==q.length?To(z<.5?B:q):To(B.map((se,pe)=>pe>=3&&(pe-3)%10===0?se:se+(q[pe]-se)*z)):null}function En(a,u){let g=1;for(;g<a.n-1&&a.f[g]<u;)g++;let f=g-1,S=de((u-a.f[f])/(a.f[g]-a.f[f]||1),0,1);return[0,1,2].map(w=>Q(a.pts[f*3+w],a.pts[g*3+w],S))}function Ze(a,u,g,f=.02,S=.98){let w=null;for(let C=0;C<a.n;C++){let z=u?C:a.n-1-C,O=g(a.pts[z*3],a.pts[z*3+1],a.pts[z*3+2]),H=u?a.f[z]:1-a.f[z];if(O>=0)return de(w&&w.v<0?w.f+(H-w.f)*(-w.v/(O-w.v)):H,f,S);w={v:O,f:H}}return .5}let Bn={pane:{color:t.same,width:1.35,taper:.6,order:3},plate:{color:t.cross,width:1.6,taper:.5,order:3.1},row:{color:t.pkg,width:1.6,taper:.5,order:3.15},cross_row:{color:t.pkg,width:1.6,taper:.5,order:3.2},intra:{color:t.intra,width:1.1,taper:0,order:3},curve:{color:t.cross,width:1.7,taper:.62,order:3.3}},Ht=a=>de(1.4+.9*Math.log2(a),1.4,3.6),ai=a=>a.kind==="intra_class"?"loop":a.ms===a.mt?"margin":"track",Pi=(a,u)=>Qe.call(a,u,Qe.variants(a,u)[0]??"")??null,fn=ne.edges.map((a,u)=>{let g=ai(a),f=Bn[a.kind==="intra_class"?"intra":a.span],S=qt(u,g),w=ut(S??Pi(u,g)??Qe.call(u,"curve","ff"),{width:f.width,taper:f.taper,dashed:a.dead,dash:.08,gap:.08,order:f.order});return Object.assign(w,{e:a,ei:u,st:f,kind:g,inner:a.ms===a.mt,m:a.ms,hasPath:!!S,park:w.pts}),w.line.userData={type:"call",id:u},te.add(w.line),w}),li=ne.edges.map((a,u)=>{if(a.ms===a.mt||a.kind==="intra_class")return null;let g=Bn.curve,f=ut(qt(u,"curve"),{width:g.width,taper:g.taper,dashed:a.dead,dash:.08,gap:.08,order:g.order});return Object.assign(f,{e:a,ei:u,st:g,kind:"curve",bundle:ne.links[on.get(u)].bundle,hasPath:!0}),f.line.userData={type:"call",id:u},te.add(f.line),f}),Wt=li.filter(Boolean);function pn(a){let u=qt(a.ei,a.kind);a.hasPath=!!u,u?$t(a,u):a.park&&a.pts!==a.park&&$t(a,a.park)}let pi=new Map;for(let a of fn)for(let u of new Set([a.e.ms,a.e.mt]))pi.has(u)||pi.set(u,[]),pi.get(u).push(a);function ln(a){for(let u of pi.get(a)??[])pn(u),li[u.ei]&&pn(li[u.ei])}let Ji=a=>fn.filter(u=>u.e.cls===a||je.get(u.e.s)?.cls===a||je.get(u.e.t)?.cls===a);function mi(a){for(let u of Ji(a))pn(u),li[u.ei]&&pn(li[u.ei]);for(let u of Or)(je.get(u.ida)?.cls===a||je.get(u.idb)?.cls===a)&&(u.pts=Au(u.ida,u.idb),Ge(u.line,u.pts))}let gi=ne.links.map((a,u)=>{let g=Bn[a.span],f=ut(Qe.link(u),{width:Ht(a.count),taper:.5,dashed:a.members.every(S=>ne.edges[S].dead),dash:.08,gap:.08,order:g.order+.05});return Object.assign(f,{l:a,li:u,st:g,w:Ht(a.count),e:{ms:a.s,mt:a.t,span:a.span}}),f.line.userData={type:"link",id:u},te.add(f.line),f}),Lg=a=>de(2.2+1.3*Math.log2(a),2.2,5.5),Ur=ne.plate_bundles.map((a,u)=>{let g=Lg(a.count),f=ut(Qe.ribbon(u),{width:g,taper:.45,order:3.7});return Object.assign(f,{pb:a,k:u,w:g,color:t.ribPkg}),f.line.userData={type:"plateribbon",id:u},te.add(f.line),f});function zd(a){let u=je.get(a),g=u.module;if(D.open.has(g)){if(u.x!==void 0&&!(u.cls&&ce.has(u.cls)&&!u.dead))return K(u.x+u.w/2,u.y,u.z+.02);let w=ce.get(u.cls),C=ae(w),z=C.rows.indexOf(a);return K(C.xr,z>=0?he(w,z):w.y-C.h+.1,C.zf)}let f=xe.get(g).box,S=Dt.get(`${g}|${u.slot}`);return K(f.x+f.w*.62,-(S.y+S.h/2),xe.get(g).z+f.d+.02)}function Au(a,u){let g=zd(a),f=zd(u),S=g.distanceTo(f),w=.6+.2*S;return ot(g,K(g.x,g.y+w,g.z+.6+.05*S),K(f.x,f.y+w,f.z+.6+.05*S),f,32)}let Or=[];ne.clones.forEach(a=>{for(let u=0;u+1<a.length;u++){if(je.get(a[u]).module===je.get(a[u+1]).module)continue;let g=Au(a[u],a[u+1]),f=ur(ve(g,{width:2.4,dashed:!0,dash:.05,gap:.07,order:3}),"clone",g.length/3);te.add(f),Or.push({ida:a[u],idb:a[u+1],line:f,pts:g,a:1,ta:1})}});function kg(a){for(let u of Or)(je.get(u.ida).module===a||je.get(u.idb).module===a)&&(u.pts=Au(u.ida,u.idb),Ge(u.line,u.pts))}let Fo=[];{let a=new Map,u=f=>{let S=(a.get(f)??0)+1;return a.set(f,S),S},g=mt.ground+.02;for(let f of ne.imports){let S=xe.get(f.s).box,w=xe.get(f.t).box,C=xe.get(f.s).z,z=xe.get(f.t).z,O=u(f.s),H=u(f.t),B=(O%5-2)*Math.min(.18,S.w/6),q=(H%5-2)*Math.min(.18,w.w/6),se=K(S.x+S.w/2+B,g,C+.5),pe=K(w.x+w.w/2+q,g,z+.5),_e,rt;if(f.span!=="cross_row"){let be=.9+.1*Math.abs(pe.x-se.x);_e=K(se.x,g,se.z+Math.min(be,1.9)),rt=K(pe.x,g,pe.z+Math.min(be,1.9))}else _e=K(se.x,g,se.z+2.1),rt=K(pe.x,g,pe.z+2.1);let Fe=ot(se,_e,rt,pe,28),nt=ve(Fe,{width:f.cycle?1.5:1,order:1,dashed:!0,dash:.28,gap:.2}),vt=Fe.length,et=K(Fe[vt-3],g+.004,Fe[vt-1]),Lt=K(Fe[vt-9],g+.004,Fe[vt-7]),Et=et.clone().sub(Lt).normalize(),Le=K(-Et.z,0,Et.x),Y=.2,re=new Gn;re.setAttribute("position",new Cn([et.x,et.y,et.z,et.x-Et.x*Y*1.6+Le.x*Y*.7,et.y,et.z-Et.z*Y*1.6+Le.z*Y*.7,et.x-Et.x*Y*1.6-Le.x*Y*.7,et.y,et.z-Et.z*Y*1.6-Le.z*Y*.7],3));let Se=new Sn(re,Ot(f.cycle?t.red:t.imp,1,{side:hi,depthWrite:!1}));Se.renderOrder=1,te.add(nt,Se),Fo.push({imp:f,line:nt,head:Se,pts:Fe,a:1,ta:1})}}let Tu=900,Di=new Gn;Di.setAttribute("position",new zn(new Float32Array(Tu*3),3)),Di.setAttribute("color",new zn(new Float32Array(Tu*3),3)),Di.setDrawRange(0,0);let Fg=(()=>{let a=document.createElement("canvas");a.width=a.height=64;let u=a.getContext("2d"),g=u.createRadialGradient(32,32,0,32,32,32);return g.addColorStop(0,"rgba(255,255,255,1)"),g.addColorStop(.25,"rgba(255,255,255,0.75)"),g.addColorStop(1,"rgba(255,255,255,0)"),u.fillStyle=g,u.fillRect(0,0,64,64),new ma(a)})(),No=new fa(Di,new _o({size:11,sizeAttenuation:!1,map:Fg,vertexColors:!0,transparent:!0,depthWrite:!1,depthTest:!1,blending:yo}));No.renderOrder=6,No.frustumCulled=!1,te.add(No);let Ns=[],Ng=new Pt,Vd=new Pt(t.bg),Ru=new Pt(t.lit);function Hd(){Vd.set(t.bg),Ru.set(t.lit),No.material.blending=r.pulseAdditive?yo:Is,No.material.needsUpdate=!0}Hd();function Cu(){return D.scope?D.scope.kind==="module"?xe.get(D.scope.id).district:D.scope.id:null}function Uo(){let a=Cu();return a?new Set(xt.get(a).modules):null}let Br=()=>D.scope?.kind==="module"?D.scope.id:null;function Yn(a){return je.get(a)?.module??ce.get(a)?.module}function zr(a){return je.get(a)?.slot??ce.get(a)?.slot}function Gd(a,u,g){let f=new Map,S=new Set,w=new Set,C=new Set;for(let[z,O]of u){let H=on.get(z.ei);H!==void 0&&(!f.has(H)||f.get(H)>O)&&f.set(H,O),H!==void 0&&C.add(ne.links[H].bundle)}for(let z of a.keys()){let O=Yn(z);w.add(O),S.add(`${O}|${zr(z)}`)}for(let z of g){let O=ce.get(z).module;w.add(O),S.add(`${O}|${ce.get(z).slot}`)}return{links:f,slots:S,modules:w,bundles:C}}function Ug(a){let u=new Map(a.lit.map(([C,z])=>[C,z])),g=new Map(a.lit_edges.map(([C,z])=>[fn[C],z])),f=new Set(a.lit_classes),S=new Set(a.trace_edges.map(C=>fn[C])),w=new Set(a.trace_edges.map(C=>on.get(C)).filter(C=>C!==void 0));return{depth:u,edges:g,classes:f,...Gd(u,g,f),trace:S,traceLinks:w,traceNodes:new Set(a.trace),ribbon:!1,guide:!0}}function Og(){let a=Ut();if(a)return a.lit.length?Ug(a):null;let u=D.selected;if(!u)return null;let g=new Map,f=(z,O)=>{(!g.has(z)||g.get(z)>O)&&g.set(z,O)},S=new Map,w=new Set,C=!1;if(u.kind==="link"||u.kind==="ribbon"||u.kind==="plateribbon"||u.kind==="call"){C=!0;let z=u.kind==="call"?[u.id]:u.kind==="link"?ne.links[u.id].members:u.kind==="ribbon"?ne.bundles[u.id].members:ne.plate_bundles[u.id].bundles.flatMap(O=>ne.bundles[O].members);for(let O of z){let H=ne.edges[O];f(H.s,0),f(H.t,1),H.cls&&w.add(H.cls),S.set(fn[O],0)}}else{let z=(H,B=0)=>{for(let[q,se]of ne.reach[H])f(ne.nodes[q].id,B+se)},O=new Set;if(u.kind==="node"){z(u.id);for(let H of ne.callers[u.id])O.add(H)}else{let H=ce.get(u.id);for(let B of H.public.concat(H.private)){z(B,1);for(let q of ne.callers[B])je.get(q).cls!==H.id&&O.add(q)}for(let B of fn)B.e.kind==="constructs"&&B.e.cls===H.id&&O.add(B.e.s)}for(let H of g.keys())je.get(H)?.cls&&w.add(je.get(H).cls);u.kind==="class"&&w.add(u.id);for(let H of fn){let{s:B,t:q,kind:se}=H.e;se!=="constructs"&&g.has(B)&&g.has(q)?S.set(H,g.get(B)+1):se!=="constructs"&&O.has(B)&&(g.get(q)===0||u.kind==="class"&&je.get(q).cls===u.id)?S.set(H,0):se==="constructs"&&g.has(B)?(S.set(H,g.get(B)+1),w.add(H.e.cls)):se==="constructs"&&u.kind==="class"&&H.e.cls===u.id&&S.set(H,0)}for(let H of O)f(H,-1)}return{depth:g,edges:S,classes:w,...Gd(g,S,w),ribbon:C}}let Re=null;function Wd(){if(D.hoverCall)return D.hoverCall;let a=D.hover;if(!a||!Re||!Re.depth.has(a)&&!Re.classes.has(a))return null;let u=new Set;for(let[g]of Re.edges)(g.e.s===a||g.e.t===a||g.e.cls===a)&&u.add(g.ei);return{edges:u,targets:new Set([a])}}let Ja={hover:150,select:150,scope:320,unfold:ko,guide:300},Oo=150,Xd=()=>performance.now();function _i(a,u,g=0,f=!1){a.ta===u&&!g||(a.from=a.a,a.ta=u,a.t0=Xd()+g,a.dur=x?100:f||u>a.a&&Oo!==Ja.scope&&Oo!==Ja.unfold&&Oo!==Ja.guide?0:Oo)}function Us(a,u,g){return Ae(a).lerp(Ae(u),g).getHex()}function $d(a,u){let{ms:g,mt:f,span:S}=a.e,w=xe.get(u?g:f),C=xe.get(u?f:g);if(S==="row"){let z=Qe.sidePort(w.plate,C.plate),O=z.side==="right"?1:-1,H=Ze(a,u,q=>(q-z.x)*O),B=Ze(a,u,q=>(q-z.x)*O-1.1);return{fade:{start:u,f0:H,f1:B},label:{kind:"port",key:`${w.plate}|${z.side}|${u}`,at:En(a,u?H:1-H),x:z.x+O*.55,side:z.side,other:C.plate,out:u,z:w.z}}}if(S==="cross_row"){let z=Qe.skyBase(w.plate),O=u?1:a.n-2,H=a.pts[O*3],B=a.pts[O*3+2],q=Ze(a,u,(se,pe,_e)=>Math.max(pe-z,Math.hypot(se-H,_e-B)-.6),.02,.6);return{fade:{start:u,f0:.6*q,f1:q},label:{kind:"sky",key:`${w.module}|${u}`,at:En(a,u?q:1-q),other:C.plate,out:u,z:w.z,module:w.module}}}return{fade:{start:u,f0:.3,f1:.5},label:null}}function Bg(){if(D.scope||Jn||D.guide!==null)return;let a=!1;for(let u of Xt.values()){let g=u.b,f=jt(g.x,0,u.p.z+g.d),S=jt(g.x,-(g.line+ze.row_pad),u.p.z+g.d),w=f[2]<=1&&Math.abs(S[1]-f[1])>=o.S*1.15;w!==u.zoomRows&&(u.zoomRows=w,a=!0)}a&&Tn("hover")}function Tn(a="hover"){Oo=Ja[a]??150;let u=Re,g=Ut(),f=Uo(),S=Br();Re=Og();let w=U(),C=c[w],z=Re&&!Re.ribbon&&(a==="select"&&D.pulse||a==="guide"&&g&&g.pulses),O=G=>!f||f.has(G),H=D.hover,B=D.hoverBox,q=D.hoverLine,se=Yg[D.view],pe=g?new Set(g.focus):null,_e=g?new Set(g.evidence):new Set,rt=new Set([..._e].map(G=>`${Yn(G)}|${zr(G)}`)),Fe=H?`${Yn(H)}|${zr(H)}`:null,nt=q&&q.startsWith("call:")?ne.edges[+q.slice(5)]:null,vt=new Set(nt?[nt.s,nt.t]:[]),et=Wd(),Lt=et?et.targets:new Set,Et=new Set([...vt,...Lt].map(G=>`${Yn(G)}|${zr(G)}`)),Le=()=>i.link,Y=D.inspect&&(D.inspect.kind==="node"||D.inspect.kind==="class")?D.inspect.id:null,re=new Set(g&&g.stub==="pill"?g.off_edges:[]),Se=Wg();$g(Se);for(let G of Xt.values()){let Ee=G.p.module,Pe=O(Ee)?1:.05,ke=C.box;w==="module"&&(ke=Ee===S?2:3),g?g.lod==="plate"?ke=3:pe.has(Ee)?ke=2:(ke=3,Pe=O(Ee)?.4:.16):Re&&(Re.modules.has(Ee)?ke===3&&(ke=2):Pe=Math.min(Pe,.35*Pe));let Mt=!!Se&&!Se.has(Ee);Mt&&(ke=3,Pe=Math.max(Pe,.22)),Ie!==null&&G.p.z<Ie&&(Pe=0),Mt!==G.sil&&(G.sil=Mt,Nr(G)),_i(G,Pe),Fs(G,ke);let Nt=B===Ee;G.edges.material.color.set(Nt?t.lit:G.ts.edge[0]),G.edges.material.linewidth=Nt?2.2:G.ts.edge[1],G.rowsTa=(w==="package"||w==="module")&&O(Ee)&&(!g||ke<=2)?1:g?g.lod!=="plate"&&ke<=2?1:0:Re&&Re.modules.has(Ee)||w==="overview"&&G.zoomRows?1:0;for(let[It,bn]of G.lit){let _n=`${Ee}|${It}`,nn=Et.has(_n);bn.visible=!!(Re&&Re.slots.has(_n)||Fe===_n||rt.has(_n)||nn)&&G.u<.5,De(bn,et&&!nn?Le():t.lit,null,5),bn.material.linewidth=nn?2.6:1.4}}for(let G of _s.values()){let Ee=G.n,Pe=O(Ee.module)?1:.04,ke=Re&&Re.depth.has(Ee.id)||_e.has(Ee.id);Re&&!ke&&(Pe=Math.min(Pe,.3*Pe)),g&&(Pe=ke?1:pe.has(Ee.module)?.7:.2),_i(G,Pe);let Mt=H===Ee.id||D.selected?.id===Ee.id||Y===Ee.id||Lt.has(Ee.id)||vt.has(Ee.id),Nt=!Ee.dead&&Ee.clone===null&&!Ee.lb,It=Nt?g?[pe.has(Ee.module)?i.link:i.edge,1]:C.card:[t[G.st.key],G.st.width];De(G.border,Mt?t.hover:ke&&(Nt||Ee.dead&&g)?et?Le():t.lit:It[0],null,5),G.border.material.linewidth=Mt||Re?.traceNodes?.has(Ee.id)?It[1]+1:ke?Math.max(It[1],1.5):It[1]}for(let G of le.values()){let Ee=G.cl,Pe=O(Ee.module)?1:.04,ke=Re&&Re.classes.has(Ee.id)||_e.has(Ee.id);Re&&!ke&&(Pe=Math.min(Pe,.3*Pe)),g&&(Pe=ke?1:pe.has(Ee.module)?.7:.2),_i(G,Pe);let Mt=D.selected?.id===Ee.id||H===Ee.id||Y===Ee.id||Lt.has(Ee.id),Nt=g?[pe.has(Ee.module)?i.link:i.edge,1.2]:C.block;G.edges.material.color.set(Mt?t.lit:ke?et?Le():t.lit:Nt[0]),G.edges.material.linewidth=Mt?2.2:ke?1.6:Nt[1]}for(let G of Ci.values()){let Ee=!f||G.d.modules.some(ke=>f.has(ke))?1:.15;g&&(Ee=g.lod==="plate"||G.d.modules.some(ke=>pe.has(ke))?1:.45),_i(G,Ee);let Pe=Re?[i.edge,1]:C.plate;De(G.outline,Pe[0],null,5),G.outline.material.linewidth=Pe[1],G.frame.material.color.set(Pe[0]),G.frame.material.opacity=Ee*.6,G.frame.visible=!G.d.modules.some(ke=>D.open.has(ke)),G.walls.visible=G.frame.visible&&(!Se||G.d.modules.some(ke=>Se.has(ke)))}let be=Re?Math.max(1,...Re.edges.values()):1,Xe=x||!z?0:Math.min(35,350/(be+1)),it=Re?.trace?.size>0,st=G=>D.open.has(G)||Xt.get(G).rowsTa===1,Yt=[...et?et.edges:[],...q&&q.startsWith("call:")?[+q.slice(5)]:[]],N=new Set(Yt.map(G=>on.get(G)).filter(G=>G!==void 0).map(G=>ne.links[G].bundle)),fe=new Set;ne.bundles.forEach((G,Ee)=>{if(!st(G.s)||!st(G.t))return;let Pe=O(G.s)&&O(G.t);(Pe&&(D.open.has(G.s)||D.open.has(G.t))||Pe&&B&&D.scope&&(G.s===B||G.t===B)||Re&&Re.bundles.has(Ee)&&Re.modules.has(G.s)&&Re.modules.has(G.t)||N.has(Ee))&&fe.add(Ee)});for(let G of fe)for(let Ee of[ne.bundles[G].s,ne.bundles[G].t]){let Pe=Xt.get(Ee);Pe.tier===3&&!Pe.sil&&Pe.ta>.2&&Fs(Pe,2)}let qe=q&&q.startsWith("call:")?+q.slice(5):null,Tt=G=>qe===null?G:Math.min(G,.55);for(let G of fn){let{s:Ee,t:Pe,ms:ke,mt:Mt}=G.e,Nt=D.open.has(ke)||D.open.has(Mt),It=!G.inner&&G.kind!=="loop"&&fe.has(li[G.ei].bundle),bn=O(ke),_n=O(Mt),nn=Re&&Re.edges.has(G),Kt=it&&Re.trace.has(G),Nn=!!et&&et.edges.has(G.ei),Bt=H&&(Ee===H||Pe===H||G.e.cls===H)&&(!g||nn)||B&&D.scope&&(ke===B||Mt===B)||Nn||qe===G.ei,cn=0;Nt&&!It&&G.hasPath&&(G.inner?cn=bn?.75*se.call:0:D.scope?cn=bn||_n?G.e.span==="cross_row"?se.sky:se.call:0:cn=se.call,S&&!G.inner&&ke!==S&&Mt!==S&&(cn=Math.min(cn,.12)),(nn||Bt)&&(cn=1),Re&&!nn&&!Bt&&(cn=Math.min(cn,.06)),B&&D.scope&&!Bt&&!Re&&(cn=Math.min(cn,.2)),g&&!nn&&!Bt&&(!g.cross_file&&ke!==Mt||!Re)&&(cn=0),G.e.dead&&(cn*=g&&nn?.8:.45),Nn&&(cn=1),G.e.kind==="intra_class"&&!le.get(G.e.cls)?.open&&(cn=0),G.inner&&!D.open.has(ke)&&(cn=0)),qe!==null&&qe!==G.ei&&(cn=Math.min(cn,.55)),re.has(G.ei)&&(cn=0),z&&nn&&cn>0?(G.a=Math.min(G.a,.06),_i(G,cn,Xe*Re.edges.get(G),!0)):_i(G,cn);let Jo=g?pe.has(ke)&&pe.has(Mt)?i.link:i.edge:C.call,Zu=Bt||Kt?t.lit:nn?et?Le():it?Us(t.lit,t.bg,.35):t.lit:G.e.dead?t.dead:Jo;qe!==null&&qe!==G.ei&&(Zu=i.edge);let C0=Us(Zu,t.bg,Bt||nn?.35:.5);G.stub=D.scope&&!G.inner&&bn!==_n&&G.e.kind!=="intra_class"&&!(g&&pe.has(ke)&&pe.has(Mt))?$d(G,bn):null,wt(G,Zu,C0,G.stub?G.stub.fade:null),G.line.material.linewidth=Nn?G.st.width+1.8:qe===G.ei?G.st.width+1.2:Kt?G.st.width+1.4:Bt?G.st.width+1:nn?G.st.width+.6:G.st.width}for(let G of Wt){let{s:Ee,t:Pe,ms:ke,mt:Mt}=G.e,Nt=O(ke),It=O(Mt),bn=fn[G.ei],_n=Re&&Re.edges.has(bn),nn=it&&Re.trace.has(bn),Kt=!!et&&et.edges.has(G.ei),Nn=H&&(Ee===H||Pe===H||G.e.cls===H)&&(!g||_n)||B&&(ke===B||Mt===B)||Kt||qe===G.ei,Bt=0;fe.has(G.bundle)&&(Bt=D.scope?Nt&&It?se.call:0:se.call,S&&ke!==S&&Mt!==S&&(Bt=Math.min(Bt,.12)),(_n||Nn)&&(Bt=1),Re&&!_n&&!Nn&&(Bt=Math.min(Bt,.06)),B&&D.scope&&!Nn&&!Re&&(Bt=Math.min(Bt,.2)),g&&!_n&&!Nn&&(Bt=0),G.e.dead&&(Bt*=g&&_n?.8:.45),Kt&&(Bt=1)),qe!==null&&qe!==G.ei&&(Bt=Math.min(Bt,.55)),re.has(G.ei)&&(Bt=0),z&&_n&&Bt>0?(G.a=Math.min(G.a,.06),_i(G,Bt,Xe*Re.edges.get(bn),!0)):_i(G,Bt);let cn=g?pe.has(ke)&&pe.has(Mt)?i.link:i.edge:C.call,Jo=Nn||nn?t.lit:_n?et?Le():it?Us(t.lit,t.bg,.35):t.lit:G.e.dead?t.dead:cn;qe!==null&&qe!==G.ei&&(Jo=i.edge),wt(G,Jo,Us(Jo,t.bg,Nn||_n?.35:.5)),G.line.material.linewidth=Kt?G.st.width+1.8:qe===G.ei?G.st.width+1.2:Nn?G.st.width+.6:nn?G.st.width+1.4:_n?G.st.width+.5:G.st.width}for(let G of gi){let{s:Ee,t:Pe}=G.l,ke=D.open.has(Ee)||D.open.has(Pe)||fe.has(G.l.bundle),Mt=O(Ee),Nt=O(Pe),It=Re&&Re.links.has(G.li),bn=it&&Re.traceLinks?.has(G.li),_n=!!et&&G.l.members.some(Bt=>et.edges.has(Bt)),nn=B&&(Ee===B||Pe===B)||q===`link:${G.li}`||H&&(!g||It)&&G.l.members.some(Bt=>ne.edges[Bt].s===H||ne.edges[Bt].t===H)||_n,Kt;ke?Kt=0:D.scope?Kt=Mt||Nt?G.l.span==="cross_row"?se.sky:se.call:0:Kt=nn||It?1:0,!ke&&S&&Ee!==S&&Pe!==S&&(Kt=Math.min(Kt,.14)),!ke&&(It||nn&&(!D.scope||Mt||Nt))&&(Kt=Math.max(Kt,1)),Re&&!It&&(Kt=Math.min(Kt,.06)),B&&D.scope&&!nn&&!Re&&(Kt=Math.min(Kt,.2)),_n&&!ke&&(Kt=1),g&&!ke&&(Kt=It||nn?1:0),Kt=Tt(Kt),re.size&&G.l.members.every(Bt=>re.has(Bt))&&(Kt=0),z&&It&&Kt>0?(G.a=Math.min(G.a,.06),_i(G,Kt,Xe*Re.links.get(G.li),!0)):_i(G,Kt);let Nn=qe!==null?i.edge:nn||bn?t.lit:It?et?Le():it?Us(t.lit,t.bg,.35):t.lit:C.link;G.stub=D.scope&&Mt!==Nt?$d(G,Mt):null,wt(G,Nn,Us(Nn,t.bg,nn||It?.35:.5),G.stub?G.stub.fade:null),G.line.material.linewidth=G.w+(_n?1.8:bn?1.4:nn||It?.8:0)}for(let G of Ur){let Ee=D.scope?0:1,Pe=q===`plateribbon:${G.k}`||D.selected?.kind==="plateribbon"&&D.selected.id===G.k;Ee&&B?Ee=.18:Ee&&Re&&!Pe&&(Ee=.12),Ee&&D.selected?.kind==="plateribbon"&&D.selected.id===G.k&&(Ee=.25),Ee&&Pe&&!Re&&(Ee=1),g&&(Ee=g.lod==="plate"?1:0),_i(G,Tt(Ee));let ke=Pe?t.lit:C.ribbon;wt(G,ke,Us(ke,t.bg,Pe?.3:.45)),G.line.material.linewidth=G.w+(Pe?1:0)}for(let G of Or){let Ee=O(Yn(G.ida)),Pe=O(Yn(G.idb)),ke=Ee&&Pe?1:Ee||Pe?.5:.04;Re&&!(Re.depth.has(G.ida)||Re.depth.has(G.idb))&&(ke=Math.min(ke,.25)),B&&!Re&&Yn(G.ida)!==B&&Yn(G.idb)!==B&&(ke=Math.min(ke,.25)),g&&(ke=Re&&(Re.depth.has(G.ida)||Re.depth.has(G.idb))?1:.06),[Yn(G.ida),Yn(G.idb)].some(Nt=>Jd(Nt)||Xt.get(Nt).sil)&&(ke=0),_i(G,Tt(ke*se.clone))}for(let G of Fo){let Ee=B&&(G.imp.s===B||G.imp.t===B)&&D.view==="plan",Pe=O(G.imp.s)||O(G.imp.t)?D.view==="plan"?1:.85:.05;!D.scope&&D.view!=="plan"&&!G.imp.cycle&&(Pe=0),Re&&(Pe=Math.min(Pe,.2)),B&&!Ee&&(Pe=Math.min(Pe,.3)),Pe*=se.imp,Ee&&(Pe=1),g&&(Pe=0),_i(G,Tt(Pe));let ke=G.imp.cycle?t.red:Ee?t.impLit:C.imp;De(G.line,ke,G.imp.cycle?ke:Us(ke,t.bg,.45),G.pts.length/3),G.head.material.color.set(ke),G.line.material.linewidth=Ee||G.imp.cycle?1.5:1}g?a==="guide"&&(z?Du():Iu()):z?Du():(a==="select"||!Re&&u)&&Iu(),Xu(),g0(),Yr(),$=!0,Rn()}function Zi(a,u){if(a.a===a.ta||a.t0===void 0)return!1;if(u<a.t0)return!0;let g=a.dur?de((u-a.t0)/a.dur,0,1):1;return a.a=g>=1?a.ta:Q(a.from,a.ta,g),!0}function zg(a){let u=!1,g=new Set;for(let f of Xt.values()){let S=Zi(f,a);if(f.rowsA!==f.rowsTa&&(f.rowsA=x?f.rowsTa:de(f.rowsA+Math.sign(f.rowsTa-f.rowsA)*.34,0,1),S=!0),f.u!==f.uTarget){f.uT0===void 0&&(f.uT0=a,f.uFrom=f.u);let w=x?1:de((a-f.uT0)/ko,0,1);f.u=w>=1?f.uTarget:Q(f.uFrom,f.uTarget,w),w>=1&&(f.uT0=void 0),Fr(f,Q(f.b.h,f.b.open_h,Me(f.u))),S=!0}S&&(u=!0,Nr(f),g.add(f.p.module))}for(let f of _s.values())(Zi(f,a)||g.has(f.n.module))&&(u=!0,j(f));for(let f of le.values())if((Zi(f,a)||g.has(f.cl.module))&&(u=!0,Ke(f)),f.lift!==f.liftTarget){u=!0,f.liftT0===void 0&&(f.liftT0=a,f.liftFrom=f.lift);let S=x?1:de((a-f.liftT0)/220,0,1);f.lift=S>=1?f.liftTarget:Q(f.liftFrom,f.liftTarget,S),S>=1&&(f.liftT0=void 0),f.group.position.z=f.cl.z+Me(f.lift)*f.cl.expanded.lift,mi(f.cl.id),f.lift===0&&f.liftTarget===0&&f.rebuildOnClose&&(f.rebuildOnClose=!1,Be(f.cl),mi(f.cl.id),Tn())}for(let f of Ci.values())Zi(f,a)&&(u=!0,f.plate.material.opacity=.92*(.5+.5*f.a),f.outline.material.opacity=f.a,f.frame.material.opacity=f.a*.6);for(let f of fn)if(Zi(f,a)||f.inner&&g.has(f.m)){u=!0;let S=f.inner?Ya(f.m):1;f.line.material.opacity=f.a*S,f.line.visible=f.a*S>.002}for(let f of gi)Zi(f,a)&&(u=!0,f.line.material.opacity=f.a,f.line.visible=f.a>.002);for(let f of Wt)Zi(f,a)&&(u=!0,f.line.material.opacity=f.a,f.line.visible=f.a>.002);for(let f of Ur)Zi(f,a)&&(u=!0,f.line.material.opacity=f.a,f.line.visible=f.a>.002);for(let f of Or)Zi(f,a)&&(u=!0,f.line.material.opacity=f.a,f.line.visible=f.a>.002);for(let f of Fo)Zi(f,a)&&(u=!0,f.line.material.opacity=f.a,f.head.material.opacity=f.a,f.line.visible=f.head.visible=f.a>.002);return u}let Pu=.34,xs=null;function Du(){if(Ns=[],Di.setDrawRange(0,0),xs=null,!Re||x||Re.ribbon)return;for(let[g,f]of Re.edges){let S=li[g.ei];S&&S.ta>.05?Ns.push({o:S,d:f}):g.ta>.05&&Ns.push({o:g,d:f})}for(let[g,f]of Re.links)gi[g].ta>.05&&Ns.push({o:gi[g],d:f});if(!Ns.length)return;let u=(Math.max(...Ns.map(g=>g.d))+1)*Pu+.35;xs={t0:Xd()/1e3+.35,period:u,end:Math.min(3*u,4)}}function Iu(){Ns=[],Di.setDrawRange(0,0),xs=null,$=!0,Rn()}function Vg(a){if(!xs)return!1;let u=a-xs.t0;if(u<0)return!0;if(u>xs.end)return xs=null,Di.setDrawRange(0,0),$=!0,Rn(),!1;let g=u%xs.period,f=Di.attributes.position.array,S=Di.attributes.color.array,w=0;for(let{o:C,d:z}of Ns){let O=(g-z*Pu)/Pu;if(!(O<0||O>1.2))for(let[H,B]of[[0,1],[.08,.45],[.16,.2]]){let q=O-H;if(q<0||q>1||w>=Tu)continue;let se=En(C,q);f[w*3]=se[0],f[w*3+1]=se[1],f[w*3+2]=se[2];let pe=B*Math.min(1,C.a*1.2),_e=Ng.copy(Vd).lerp(Ru,pe);r.pulseAdditive&&_e.copy(Ru).multiplyScalar(pe),S[w*3]=_e.r,S[w*3+1]=_e.g,S[w*3+2]=_e.b,w++}}return Di.attributes.position.needsUpdate=!0,Di.attributes.color.needsUpdate=!0,Di.setDrawRange(0,w),!0}function Hg(){ge.aspect=Ne/Je,ge.setViewOffset(Ne,Je,(y-A)/2,(P-v)/2,Ne,Je),ge.updateProjectionMatrix(),Object.assign(Ce,{left:-Ne/2,right:Ne/2,top:Je/2,bottom:-Je/2}),Ce.setViewOffset(Ne,Je,(y-A)/2,(P-v)/2,Ne,Je),Ce.updateProjectionMatrix()}function qd(a=ie,u=ue.target){return a.isOrthographicCamera?a.zoom:Je/(2*a.position.distanceTo(u)*Math.tan(ls.degToRad(a.fov)/2))}function Gg(a){let u=a?Ce:ge;if(ie===u)return;let g=qd();(!Number.isFinite(g)||g<=0)&&(g=30);let f=ie.position.distanceTo(ue.target)>1e-6?ie.position.clone().sub(ue.target).normalize():K(0,0,1);a?(Ce.zoom=g,Ce.position.copy(ue.target).addScaledVector(f,Ve)):ge.position.copy(ue.target).addScaledVector(f,Je/(2*g*Math.tan(ls.degToRad(ge.fov)/2))),u.lookAt(ue.target),u.updateProjectionMatrix(),ie=u,ue.object=u,ue.update(),$=!0,Rn()}let Lu=3.2;function Wg(){if(D.scope)return Uo();let a=Ut();return a?Yd(a):Re&&D.selected&&(D.pulse||Bs==="sel")?new Set(Re.modules):null}function Yd(a){if(a.lod==="plate")return null;let u=a.stub==="pill"&&a.home_row!==null?a.focus.filter(g=>xe.get(g).row===a.home_row):a.focus;return new Set(u)}let Xg=2.2,Jd=a=>Ii!==null&&xe.get(a).z>Ii||Ie!==null&&xe.get(a).z<Ie;function $g(a){let u=a&&a.size?[...a].map(f=>xe.get(f).z):null;Ii=u?Math.max(...u)+Lu:null,Ie=u&&D.view==="elev"?Math.min(...u)-Xg:null;let g=[];Ii!==null&&g.push(He.set(He.normal.set(0,0,-1),Ii)),Ie!==null&&g.push(dt.set(dt.normal.set(0,0,1),-Ie)),ee.clippingPlanes=g}let ku=a=>-(D.open.has(a)?xe.get(a).box.open_h:xe.get(a).box.h);function Bo(a,{plan:u=!1,focus:g=!1}={}){let f=[],S=a.length===ne.panes.length,w=ze.gutter,C=O=>ne.links.some(H=>(H.s===O||H.t===O)&&H.span==="cross_row");for(let O of a){let H=xe.get(O),B=H.box,q=u?.6:S?.4:C(O)?Qe.skyBase(H.plate)+.6:Qe.bandTop(H.plate)+.45;for(let se of[B.x-w,B.x+B.w+w]){if(u)for(let pe of[Math.min(mt.ground,ku(O)),.9])f.push(K(se,pe,H.z+ze.plate_front),K(se,pe,H.z-ze.plate_back-.6));else f.push(K(se,q,H.z+B.d),K(se,ku(O)-.25,H.z+B.d));S&&!u&&f.push(K(se,mt.ground,H.z+ze.plate_front))}}if(!g)for(let O of new Set(a.map(H=>xe.get(H).plate))){let H=Te.get(O);if(H.modules.some(q=>D.open.has(q)))continue;let B=u?mt.ground:-Math.max(...H.modules.map(q=>xe.get(q).box.h))-.3;for(let q of[H.x,H.x+H.w])for(let se of[H.z-ze.plate_back,H.z+ze.plate_front])f.push(K(q,.9,se),K(q,B,se))}if(!S&&!u&&!g){let O=new Set(a.map(B=>xe.get(B).plate)),H=new Set(a);for(let B of O){let q=Te.get(B);for(let se of["left","right"]){if(!q.ports[se])continue;ne.links.some(_e=>{if(_e.span!=="row"||H.has(_e.s)===H.has(_e.t))return!1;let rt=H.has(_e.s)?_e.s:_e.t,Fe=rt===_e.s?_e.t:_e.s;return xe.get(rt).plate===B&&Te.get(xe.get(Fe).plate).x>q.x==(se==="right")})&&f.push(K(q.ports[se].x+(se==="right"?3.2:-3.2),Qe.bandTop(B),q.z))}}}if(S&&!u)for(let O of Ur)for(let H=0;H<O.n;H+=4)f.push(K(O.pts[H*3],O.pts[H*3+1],O.pts[H*3+2]));for(let O of ne.classes){let H=le.get(O.id);if(!H||!H.open||!a.includes(O.module)||!D.open.has(O.module))continue;let B=O.z+O.d+O.expanded.lift;f.push(K(O.x-.6,O.y+.5,B),K(O.x+O.expanded.w+.2,O.y-O.expanded.h-.2,B))}let z=new Hn().setFromPoints(f);return z.pts=f,z}function qg(a){let u=xe.get(a),g=ne.placement.rows[u.row].modules,f=g.indexOf(a);return[g[f-1],a,g[f+1]].filter(w=>w&&xe.get(w).plate===u.plate)}function Zd(){let a=Ne<720&&Ft?F("#panel").getBoundingClientRect().top-M.getBoundingClientRect().top-16:Je-P-14,u=v+12;return[18,Ne-me()-18,u,Math.max(u+100,a)]}function zo(a,u,g,f=.92,S=null){return Cm(D.proj==="ortho"?Ce:ge,a,{width:Ne,height:Je,rect:Zd(),az:u,el:g,margin:Math.min(f,.92),cutZ:S})}let Jn=null;function hr(a,u=360){if(a.box){let C=a.position.distanceTo(a.target);ue.minDistance=C/8,ue.maxDistance=C*4,ue.minZoom=(a.zoom??1)/4,ue.maxZoom=(a.zoom??1)*8,ue.cursor.copy(a.target),ue.maxTargetRadius=Math.max(...Bo(Kd()).getSize(K()).toArray())*1.5}x&&(u=0),!!a.ortho!=!!ie.isOrthographicCamera&&Gg(!!a.ortho),ie.isOrthographicCamera&&a.zoom===void 0&&(a.zoom=ie.zoom);let g={t:ue.target.clone(),p:ie.position.clone(),zoom:ie.zoom},f=new rs().setFromVector3(g.p.clone().sub(g.t)),S=new rs().setFromVector3(a.position.clone().sub(a.target)),w=S.theta-f.theta;w>Math.PI&&(w-=2*Math.PI),w<-Math.PI&&(w+=2*Math.PI),Jn={start:performance.now(),ms:u,from:g,goal:a,s0:f,s1:S,dTheta:w,near0:ie.near,far0:ie.far},$=!0,Rn(),u===0&&jd(performance.now()+1)}function jd(a){if(!Jn)return!1;let u=de((a-Jn.start)/Math.max(1,Jn.ms),0,1),g=ye(u),{from:f,goal:S,s0:w,s1:C,dTheta:z}=Jn,O=f.t.clone().lerp(S.target,g),H=new rs(Q(w.radius,C.radius,g),Q(w.phi,C.phi,g),w.theta+z*g);return ie.position.copy(O).add(K().setFromSpherical(H)),ue.target.copy(O),ie.lookAt(O),ie.isOrthographicCamera&&S.zoom&&(ie.zoom=Math.exp(Q(Math.log(f.zoom),Math.log(S.zoom),g)),ie.updateProjectionMatrix()),S.near!==void 0&&(ie.near=u>=1||S.near<=Jn.near0?S.near:Jn.near0,ie.far=u>=1||S.far>=Jn.far0?S.far:Jn.far0,ie.updateProjectionMatrix()),u>=1&&(Jn=null,ue.update()),!0}let Os={axo:{az:-.3,el:.82},plan:{az:0,el:1.5},elev:{az:0,el:.06}},Yg={axo:{call:1,sky:1,imp:.6,clone:1},plan:{call:.1,sky:.05,imp:1,clone:.3},elev:{call:1,sky:1,imp:0,clone:1}};function Kd(){let a=Br();if(a)return qg(a);let u=Uo();return u?[...u]:ne.panes.map(g=>g.module)}let Ii=null;function dr(a,u=700){D.view=a,Tn("scope"),document.querySelectorAll("#views [data-view]").forEach(S=>S.classList.toggle("on",S.dataset.view===a));let g=Os[a],f=zo(Bo(Kd(),{plan:a==="plan",focus:!!Br()}),g.az,g.el,a==="plan"?.93:1.02,Ii);hr(f,u),Bs="view",Yr()}let Bs=null;ue.addEventListener("start",()=>{Jn=null,Bs=null});let Vo=K();function jt(a,u,g){return Ii!==null&&g>Ii||Ie!==null&&g<Ie?[0,0,2]:(Vo.set(a,u,g).project(ie),[(Vo.x+1)/2*Ne,(1-Vo.y)/2*Je,Vo.z])}let Za=new Map;function Qd(a,u,g){oe.font=g;let f=g+"|"+a,S=Za.get(f);if(S===void 0&&(S=oe.measureText(a).width,Za.set(f,S)),S<=u)return a;let w=S/a.length,C=Math.floor(u/w)-1;return C>=3?a.slice(0,C)+"\u2026":null}function Vr(a,u){let g=u+"|"+a,f=Za.get(g);return f===void 0&&(oe.font=u,oe.letterSpacing="0px",f=oe.measureText(a).width,Za.set(g,f)),f}let ja=new xo,zs=new J,ef=new bt,tf=[];function Ka(a,u,g){return zs.set(a,u,g).project(ie),Math.abs(zs.x)>1||Math.abs(zs.y)>1||Math.abs(zs.z)>1?!1:(ef.set(zs.x,zs.y),ja.setFromCamera(ef,ie),zs.set(a,u,g),ja.far=ja.ray.origin.distanceTo(zs)-.04,!ja.intersectObjects(tf,!1).some(f=>(Ii===null||f.point.z<=Ii)&&(Ie===null||f.point.z>=Ie)))}let vs=[];function fr(a,u,g,f,S,w){if(![a,(a+u)/2,u].every(_e=>Ka(_e,g,f)))return!1;let C=jt(a,g,f),z=jt(u,g,f);if(C[2]>1||z[2]>1)return!1;let O=Math.hypot(z[0]-C[0],z[1]-C[1]),H=(w.h??.4)*O/Math.max(.01,u-a),B=null;for(let _e of w.sizes??[o.M,o.S]){if(H<_e*(w.room??1.15))continue;let rt=`${w.weight??400} ${_e}px ${_}`,Fe=Qd(S,O-2,rt);if(!(!Fe||Fe!==S&&(w.whole||w.minChars&&Fe.length-1<w.minChars))){if(Fe===S){B={t:Fe,font:rt,size:_e};break}(!B||Fe.length>B.t.length)&&(B={t:Fe,font:rt,size:_e})}}if(!B)return!1;let{t:q,font:se,size:pe}=B;if(oe.save(),oe.globalAlpha=w.alpha??1,oe.translate(C[0],C[1]),oe.rotate(Math.atan2(z[1]-C[1],z[0]-C[0])),oe.font=se,oe.fillStyle=w.color??s.text,oe.textBaseline="middle",w.spacing&&(oe.letterSpacing=w.spacing),w.halo&&(oe.lineWidth=3,oe.lineJoin="round",oe.strokeStyle=w.halo,oe.strokeText(q,0,0)),oe.fillText(q,0,0),oe.restore(),(w.alpha??1)>.25&&vs.push({size:pe,text:q,full:S,x:C[0],y:C[1],w:Vr(q,se),ang:Math.atan2(z[1]-C[1],z[0]-C[0]),kind:w.kind??"face",color:w.color??s.text,alpha:w.alpha??1,ground:w.halo??null}),w.obstacle){let _e=Vr(q,se),rt=(z[0]-C[0])/(O||1),Fe=(z[1]-C[1])/(O||1),nt=C[0]+rt*_e,vt=C[1]+Fe*_e;kn.push([Math.min(C[0],nt)-2,Math.min(C[1],vt)-pe*.6,Math.max(C[0],nt)+2,Math.max(C[1],vt)+pe*.6])}return q===S?"full":"cut"}function Fu(a,u,g,f,S,w,C,z){let O=jt(a,g,w),H=jt(u,g,w);if(O[2]>1||H[2]>1)return!1;let B=Math.hypot(H[0]-O[0],H[1]-O[1]),q=B/Math.max(.01,u-a),se=C.length,pe=se===1?f:S;for(let _e of z.sizes??[o.M,o.S]){if(pe*q<_e*(z.room??1.1))continue;let rt=`${z.weight??400} ${_e}px ${_}`;if(C.some(vt=>Vr(vt,rt)>B-2))continue;let Fe=Math.min(S,_e*1.3/q),nt=g-(f-se*Fe)/2;return C.forEach((vt,et)=>fr(a,u,se===1?g-f/2:nt-Fe/2-et*Fe,w,vt,{...z,h:se===1?f:S,sizes:[_e],room:z.room??1.1,whole:!0,obstacle:!0})),!0}return!1}let kn=[],xi=(a,u)=>a[0]<u[2]&&a[2]>u[0]&&a[1]<u[3]&&a[3]>u[1];function Jg(a){for(let u of kn)if(xi(a,u))return!1;return kn.push(a),!0}function Ho(a,u,g){let f=`${g.weight??400} ${g.size??11}px ${_}`;oe.font=f,oe.letterSpacing=g.spacing??"0px";let S=oe.measureText(u).width,w=g.size??11,C=a[0]+(g.dx??0)-(g.align==="center"?S/2:g.align==="right"?S:0),z=a[1]+(g.dy??0);return a[0]>=A&&a[0]<=Gr&&(C=de(C,A+6,Gr-10-S)),{w:S,x0:C,y0:z,rect:[C-(g.pill?6:3),z-w*(g.pill?1.05:.8),C+S+(g.pill?6:3),z+w*.5]}}function Qa(a,u,g){let f=g.size??11;(g.alpha??1)>.25&&vs.push({size:f,text:a,full:g.full??a,x:u.x0,y:u.y0,w:u.w,ang:0,kind:g.kind??"tag",color:g.color??s.muted,alpha:g.alpha??1,ground:g.pill?r.pill:g.halo?r.halo:null}),oe.font=`${g.weight??400} ${f}px ${_}`,oe.letterSpacing=g.spacing??"0px",oe.globalAlpha=g.alpha??1,g.pill?(oe.fillStyle=r.pill,oe.strokeStyle=g.pillLine??r.pillLine,oe.lineWidth=1,oe.beginPath(),oe.roundRect(u.x0-4,u.y0-f*.95,u.w+8,f*1.35,3),oe.fill(),oe.stroke()):g.halo&&(oe.globalAlpha=Math.min(1,(g.alpha??1)*1.6),g.backdrop&&(oe.fillStyle=r.backdrop,oe.fillRect(u.x0-2,u.y0-f*.82,u.w+4,f*1.12)),oe.lineWidth=4,oe.lineJoin="round",oe.strokeStyle=r.halo,oe.strokeText(a,u.x0,u.y0),oe.globalAlpha=g.alpha??1),oe.fillStyle=g.color??s.muted,oe.fillText(a,u.x0,u.y0),oe.letterSpacing="0px",oe.globalAlpha=1}function Zg(a,u,g,f,S={}){if(!S.at&&!Ka(a,u,g))return!1;let w=S.at??jt(a,u,g);if(w[2]>1)return!1;let C=Ho(w,f,S);if(S.inside&&(C.rect[0]<A+4||C.rect[2]>Ne-8||C.rect[1]<v+12||C.rect[3]>Je-P))return!1;if(S.force)kn.push(C.rect);else if(!Jg(C.rect))return!1;return Qa(f,C,S),!0}function Go(a,u,g,f,S,w){if(!S.at&&!Ka(a,u,g))return!1;let C=S.at??jt(a,u,g);if(C[2]>1)return!1;let z=null;for(let[O,H]of w){let B=Ho(C,f,{...S,dx:(S.dx??0)+O,dy:(S.dy??0)+H}),q=kn.reduce((se,pe)=>se+(xi(B.rect,pe)?(Math.min(B.rect[2],pe[2])-Math.max(B.rect[0],pe[0]))*(Math.min(B.rect[3],pe[3])-Math.max(B.rect[1],pe[1])):0),0);if((!z||q<z.cost)&&(z={L:B,cost:q}),q===0)break}return z.cost>0&&!S.force?!1:(kn.push(z.L.rect),Qa(f,z.L,S),!0)}function Wo(a,u,g){let f=ie.position.distanceTo(Vo.set(a,u,g));return 1-de((f-te.fog.near)/(te.fog.far-te.fog.near),0,.85)}function nf(a){let u=a.b,g=a.p.z+u.d,f=1/0,S=-1/0,w=1/0,C=-1/0;for(let[z,O]of[[u.x,0],[u.x+u.w,0],[u.x,-a.h],[u.x+u.w,-a.h]]){let H=jt(z,O,g);if(H[2]>1)return null;f=Math.min(f,H[0]),S=Math.max(S,H[0]),w=Math.min(w,H[1]),C=Math.max(C,H[1])}return[f,w,S,C]}function jg(a){let u=je.get(a),g=Yn(a);if(D.open.has(g)){if(u&&u.x!==void 0&&!(u.cls&&ce.has(u.cls)&&!u.dead))return[u.x+u.w/2,u.y,u.z+.02];let C=ce.get(u?u.cls:a),z=ae(C),O=u?z.rows.indexOf(a):-1;return O>=0?[C.x+C.w/2,he(C,O)+ze.box_row/2,z.zf]:[z.cx,C.y,z.zf]}let f=xe.get(g),S=f.box,w=Dt.get(`${g}|${zr(a)}`);return[S.x+S.w/2,-w.y,f.z+S.d+.01]}let Hr=!1,Gr=1280,Kg=6;function Qg(){oe.setTransform(W,0,0,W,0,0),oe.clearRect(0,0,Ne,Je),kn.length=0,vs.length=0,tf=[...[...Ci.values()].filter(Y=>Y.walls.visible).flatMap(Y=>Y.walls.children),...[...Xt.values()].filter(Y=>Y.body.visible&&!Jd(Y.p.module)).map(Y=>Y.body),...[...le.values()].filter(Y=>Y.group.visible).map(Y=>Y.box)],Hr=!1;let a=Ut(),u=U(),g=a?new Set(a.focus):null,f=Wd(),S=D.hoverLine?.startsWith("call:")?ne.edges[+D.hoverLine.slice(5)]:null,w=Y=>D.hover===Y||D.selected?.id===Y||D.inspect?.id===Y||!!f&&f.targets.has(Y)||!!S&&(S.s===Y||S.t===Y),C=me();Gr=Ne-C,kn.push([0,0,A,Je],[0,0,Ne,v+10],[A,Je-P+4,Ne,Je]),C&&kn.push([Ne-C,0,Ne,Je]);for(let Y of["#key","#help","#panel","#cameraTools"])if(!F(Y).classList.contains("hidden")){let re=F(Y).getBoundingClientRect(),Se=M.getBoundingClientRect();kn.push([re.left-Se.left-4,re.top-Se.top-4,re.right-Se.left+4,re.bottom-Se.top+4])}oe.textBaseline="alphabetic";let z=a?a.lod==="plate"?s.text:s.muted:u==="module"?s.dim:u==="package"||Re?s.muted:s.text,O=D.view==="plan"?[]:[...Xt.values()].filter(Y=>Y.a>.2).map(Y=>({row:Y.p.row,open:Y.u>.05,r:nf(Y)})).filter(Y=>Y.r);for(let Y of[...Ci.values()].sort((re,Se)=>Se.d.w-re.d.w)){let re=Y.d,Se=D.view==="plan"?mt.ground:.9,be=D.view==="plan"?re.z+ze.plate_front:re.z-ze.plate_back;if(Y.a<.4)continue;let Xe=jt(re.x,Se,be),it=jt(re.x+re.w,Se,be);if(Xe[2]>1||it[2]>1||Math.abs(it[0]-Xe[0])<24)continue;let st=!a||a.lod==="plate"||re.modules.some(Tt=>g.has(Tt)),Yt=re.name.toUpperCase(),N={size:o.L,spacing:"0.14em",color:st?z:s.dim,weight:700,halo:!0,dy:-4,kind:"plate"},fe=O.filter(Tt=>Tt.row>re.row||Tt.open).map(Tt=>Tt.r),qe=null;for(let Tt=0;Tt<9;Tt++){let G=re.x+.3+Tt/8*Math.max(0,re.w-.6),Ee=jt(G,Se,be),Pe=Ho(Ee,Yt,N);if(Pe.rect[2]>Math.max(Xe[0],it[0])+4)break;if(kn.some(Mt=>xi(Pe.rect,Mt)))continue;let ke=fe.reduce((Mt,Nt)=>Mt+(xi(Pe.rect,Nt)?(Math.min(Pe.rect[2],Nt[2])-Math.max(Pe.rect[0],Nt[0]))*(Math.min(Pe.rect[3],Nt[3])-Math.max(Pe.rect[1],Nt[1])):0),0);if((!qe||ke<qe.hit)&&(qe={L:Pe,hit:ke,x:G}),ke===0)break}if(!qe){let Tt=jt(re.x+.3,Se,be),G=Ho(Tt,Yt,N);if(kn.some(Ee=>xi(G.rect,Ee)))continue;qe={L:G,x:re.x+.3}}kn.push(qe.L.rect),Qa(Yt,qe.L,{...N,alpha:Y.a*Wo(qe.x,Se,be)})}let H=new Set;if(u==="overview"&&!a){let Y=D.hoverBox,re=D.hoverLine;if(Y)for(let Se of ne.links)(Se.s===Y||Se.t===Y)&&(H.add(Se.s),H.add(Se.t));if(re){let[Se,be]=re.split(":"),Xe=Se==="link"?[ne.links[+be]]:ne.plate_bundles[+be].bundles.flatMap(it=>ne.bundles[it].links.map(st=>ne.links[st]));for(let it of Xe)H.add(it.s),H.add(it.t)}if(Re)for(let Se of Re.modules)H.add(Se)}let B=[];for(let Y of Xt.values()){if(Y.a<.2)continue;let re=Y.p.module,Se=D.hoverBox===re,be,Xe,it=700;if(a&&a.lod!=="plate"){if(!g.has(re))continue;[be,Xe]=[o.L,Se?s.lit:D.open.has(re)?s.text:s.muted]}else if(a){if(!Se)continue;[be,Xe]=[o.M,s.lit]}else if(u==="package"){if(!Uo().has(re))continue;[be,Xe]=[o.L,Se?s.lit:s.text]}else if(u==="module"){if(!Uo().has(re))continue;[be,Xe]=re===Br()?[o.L,s.text]:[o.M,Se?s.lit:s.muted]}else if(u==="plan")[be,Xe,it]=[o.S,Se?s.lit:s.muted,400];else if(Se)[be,Xe]=[o.M,s.lit];else if(H.has(re))[be,Xe,it]=[o.M,s.muted,400];else continue;B.push({o:Y,size:be,color:Xe,weight:it,hot:Se})}let q=D.view==="elev",se=new Map;B.sort((Y,re)=>re.o.p.row-Y.o.p.row||Y.o.b.x-re.o.b.x);for(let Y of B){let re=Y.o,Se=re.b,be=re.p.z+Se.d+.01,Xe=q?Qe.bandTop(re.p.plate)+.42:D.view==="plan"?0:.12,it=jt(Se.x+(q?.04:Se.w/2),Xe,q?be:D.view==="plan"?re.p.z+Se.d/2:be);if(it[2]>1||!Ka(Se.x+Se.w/2,Xe,be))continue;if(q&&it[1]<v+16+2*(Y.size+4)){let ke=jt(Se.x+.04,.16,be);ke[2]<=1&&(it[0]=ke[0],it[1]=ke[1])}let st=re.p.name+(q?".py":""),Yt=`${Y.weight} ${Y.size}px ${_}`,N={size:Y.size,weight:Y.weight,color:Y.color,alpha:re.a*Wo(Se.x,0,re.p.z),halo:!0,backdrop:!0,align:q?"left":"center",dy:-4,kind:"module",full:st},fe=q?re.p.plate:"all";se.has(fe)||se.set(fe,[[],[],[]]);let qe=se.get(fe),Tt=Y.size+4,G=Math.abs(jt(Se.x+Se.w,Xe,be)[0]-jt(Se.x,Xe,be)[0]),Ee=Qd(st,Math.max(G-4,40),Yt),Pe=!1;for(let[ke,Mt]of[[0,st],[1,st],[2,st],[0,Ee]]){if(!Mt)continue;let Nt=Ho([it[0],it[1]-ke*Tt],Mt,N);if(!(Nt.rect[1]<v+12)&&!(qe[ke].some(It=>xi(Nt.rect,It))||kn.some(It=>xi(Nt.rect,It)))){qe[ke].push(Nt.rect),kn.push(Nt.rect),Qa(Mt,Nt,N),Y.hot&&Mt===st&&(Hr=!0),Pe=!0;break}}!Pe&&(Y.size,o.S)}if(D.view==="plan"||u==="overview"&&!D.selected&&!D.hover)return;let pe=[],_e=new Set,rt=[];for(let Y of le.values()){if(!Y.open||!Y.group.visible)continue;let re=Y.cl,Se=ae(re),be=jt(re.x-.1,re.y+.1,Se.zf),Xe=jt(re.x+Se.w+.1,re.y-Se.h-.1,Se.zf);be[2]<=1&&Xe[2]<=1&&rt.push([Math.min(be[0],Xe[0]),Math.min(be[1],Xe[1]),Math.max(be[0],Xe[0]),Math.max(be[1],Xe[1])])}let Fe=(Y,re,Se,be)=>{if(!rt.length)return!1;let Xe=jt(Y.x,Se,re),it=jt(Y.x+Y.w,be,re),st=[Math.min(Xe[0],it[0]),Math.min(Xe[1],it[1]),Math.max(Xe[0],it[0]),Math.max(Xe[1],it[1])];return rt.some(Yt=>xi(st,Yt))};for(let Y of Xt.values()){let re=Y.a*Y.rowsA*(1-Me(Y.u)),Se=Y.p.module;if(Re&&Re.modules.has(Se)&&Y.a>.5&&Y.u<.5)for(let st of Y.b.rows)Re.slots.has(`${Se}|${st.slot}`)&&pe.push({o:Y,r:st});if(re<.2||Y.tier===3)continue;let be=Y.b,Xe=Y.p.z+be.d+.012,it=re*Wo(be.x,0,Y.p.z);for(let st of be.rows){if(Fe(be,Xe,-st.y,-st.y-st.h))continue;let Yt=Re&&Re.slots.has(`${Se}|${st.slot}`),N=w(st.id),fe=N?s.lit:Yt?f?s.muted:s.lit:Y.tier===1?st.kind==="class"?s.soft:s.text:s.muted,qe=be.x+(st.kind==="class"?.2:.18),Tt=st.clone?m(p(t.modFront,t.cloneFill,t.cloneFillA)):lt(st.kind==="class"?t.classRow:t.modFront);if(Fu(qe,be.x+be.w-.08,-st.y,st.h,be.line,Xe,st.lines,{sizes:st.wrapper?[o.S]:[o.M,o.S],weight:d(st)?700:400,color:fe,alpha:it*(Re&&!Yt&&!a?.45:1),halo:Tt,kind:"row"})){_e.add(st.id),N&&(Hr=!0);let Ee=pe.findIndex(Pe=>Pe.r===st);Ee>=0&&pe.splice(Ee,1)}}for(let st of be.ghosts){if(st.id===null||Fe(be,Xe,-st.y,-st.y-st.h))continue;let Yt=Re&&Re.depth.has(st.id);Fu(be.x+.18,be.x+be.w-.1,-st.y,st.h,be.line,Xe,st.lines,{sizes:[o.S],color:Yt?s.lit:s.text,alpha:it,halo:m(p(t.modFront,t.deadFill,t.deadFillA)),kind:"row"})&&_e.add(st.id)}}let nt=u==="module"?s.text:s.muted,vt=new Set;for(let Y of le.values()){let re=Xt.get(Y.cl.module),Se=Y.a*re.a*Me(re.u);if(Se<.2||!Y.group.visible)continue;let be=Y.cl,Xe=ae(be),it=Xe.zf+.01,st=Se*Wo(be.x,be.y,be.z),Yt=w(be.id),N=Re&&Re.classes.has(be.id),fe=jt(be.x,be.y,it),qe=jt(be.x+Xe.w,be.y,it),G=ze.box_head*Math.hypot(qe[0]-fe[0],qe[1]-fe[1])/Xe.w>=2.4*o.S,Ee=fr(be.x+.1,be.x+Xe.w-.1,be.y-ze.box_head*(G?.36:.5),it,be.name,{h:G?ze.box_head*.5:ze.box_head,sizes:[o.M,o.S],room:1.05,weight:700,color:Yt?s.lit:N?s.text:nt,alpha:st,halo:lt(t.boxHead),kind:"card"});if(Ee&&(Ee==="full"&&_e.add(be.id),G&&fr(be.x+.1,be.x+Xe.w-.1,be.y-ze.box_head*.78,it,be.data_only?"DATACLASS":"CLASS",{h:ze.box_head*.5,sizes:[o.S],room:1,color:s.dim,alpha:st,spacing:"0.06em",kind:"caption"}),Xe.rows.forEach((Pe,ke)=>{let Mt=je.get(Pe),Nt=he(be,ke),It=Re&&Re.depth.has(Pe),bn=w(Pe)?s.lit:It?s.text:Mt.private?s.muted:nt;fr(be.x+.16,be.x+be.w-.08,Nt,it,Mt.name+(Pe===be.ctor?"("+Mt.params.filter(nn=>nn!=="self").join(", ")+")":""),{h:ze.box_row,sizes:[o.M,o.S],room:1.05,minChars:7,weight:d(Mt)?700:400,color:bn,alpha:st*(Re&&!It?.4:1),halo:lt(t.boxFront),kind:"card"})==="full"&&(vt.add(Pe),_e.add(Pe))}),be.data_only&&be.fields.forEach((Pe,ke)=>fr(be.x+.12,be.x+Xe.w-.08,be.y-ze.box_head-ze.box_field*(ke+.5),it,(Pe.kind==="owned"?"\u25C6 ":Pe.kind==="injected"?"\u25C7 ":"  ")+Pe.name,{h:ze.box_field,sizes:[o.S],room:.95,color:s.muted,alpha:st,kind:"card"})),Xe.open&&be.fields.length&&!be.data_only)){let Pe=be.x+be.w+.45;fr(Pe-.15,be.x+Xe.w-.06,be.y-ze.box_head*.78,it,"state",{h:ze.box_head*.55,sizes:[o.S],room:.95,color:s.dim,alpha:st,kind:"caption"}),be.fields.forEach((ke,Mt)=>fr(Pe-.15,be.x+Xe.w-.06,be.y-ze.box_head-ze.box_field*(Mt+.5),it,(ke.kind==="owned"?"\u25C6 ":ke.kind==="injected"?"\u25C7 ":"  ")+ke.name,{h:ze.box_field,sizes:[o.S],room:.95,color:ke.kind?nt:s.dim,alpha:st,kind:"card"}))}}let et=[];for(let Y of _s.values()){if(!Y.border.visible||Y.border.material.opacity<.3)continue;let re=Y.n,Se=Y.border.material.opacity*Wo(re.x,re.y,re.z);if(rt.length){let fe=jt(re.x,re.y,re.z),qe=jt(re.x+re.w,re.y-re.h,re.z);if(rt.some(Tt=>xi([Math.min(fe[0],qe[0]),Math.min(fe[1],qe[1]),Math.max(fe[0],qe[0]),Math.max(fe[1],qe[1])],Tt)))continue}let be=w(re.id),Xe=Re&&Re.depth.has(re.id),it=be?s.lit:re.dead||Xe||!a&&u==="module"?s.text:s.muted,st=re.dead?p(t.card,t.deadFill,t.deadFillA):re.clone!==null?p(t.card,t.cloneFill,t.cloneFillA):t.card,Yt=re.lines??[re.name];Fu(re.x+.1,re.x+re.w-.05,re.y,re.h,Math.min(.24,re.h/Yt.length),re.z+.02,Yt,{sizes:re.wrapper?[o.S]:[o.M,o.S],room:1.05,weight:d(re)?700:400,alpha:Se,color:it,halo:m(st),kind:"card"})?(_e.add(re.id),be&&(Hr=!0)):Xe&&et.push([Re.depth.get(re.id),re,re.cls?`${ce.get(re.cls).name}.${re.name}`:re.name])}let Lt=Kg;if(a)for(let Y of a.evidence){if(Lt<=0)break;let re=je.get(Y);if(_e.has(Y)||vt.has(Y))continue;let Se=jg(Y),be=re?re.cls?`${ce.get(re.cls)?.name}.${re.name}`:re.name:ce.get(Y).name;Go(Se[0],Se[1],Se[2],be,{size:o.M,align:"center",dy:-6,pill:!0,pillLine:r.pillLineStrong,color:s.lit,weight:700,kind:"callout"},[[0,0],[0,-18],[0,16],[0,-36],[-90,0],[90,0]])&&Lt--}a&&a.stub==="pill"&&n0(a,f);let Et=new Set(a&&a.part==="pipeline"?a.evidence.map(Y=>Yn(Y)):[]);{let Y=new Map;for(let{o:re,r:Se}of pe){if(!w(Se.id)||a&&a.evidence.includes(Se.id)||Fe(re.b,re.p.z+re.b.d,-Se.y,-Se.y-Se.h))continue;if(a&&a.part==="pipeline"){if(Et.has(re.p.module))continue;Et.add(re.p.module)}if(Lt--<=0)break;let be=Y.get(re)??0;Y.set(re,be+1);let Xe=re.b;Go(Xe.x+Xe.w/2,-re.h,re.p.z+Xe.d,Se.name,{size:o.M,align:"center",dy:18+be*18,pill:!0,color:s.text,weight:d(Se)?700:400,kind:"callout"},[[0,0],[0,18],[0,36],[-70,0],[70,0],[0,54],[-70,18],[70,18],[0,72]])}}et.sort((Y,re)=>(re[1].id===D.selected?.id)-(Y[1].id===D.selected?.id)||Y[0]-re[0]||Y[1].y-re[1].y);for(let[,Y,re]of et){if(a&&a.evidence.includes(Y.id))continue;if(a&&a.part==="pipeline"){if(Et.has(Y.module))continue;Et.add(Y.module)}if(Lt--<=0)break;let Se={size:o.M,align:"center",dy:-5,pill:!0,color:s.text,weight:d(Y)?700:400,force:Y.id===D.selected?.id,kind:"callout"};a?Go(Y.x+Y.w/2,Y.y,Y.z+.02,re,Se,[[0,0],[0,-16],[0,16],[-70,0],[70,0],[0,-32]]):Zg(Y.x+Y.w/2,Y.y,Y.z+.02,re,Se)}if(D.scope){let Y=new Map;for(let Se of[...fn,...gi]){if(!Se.stub?.label||Se.a<(a?.5:.3))continue;let be=Se.stub.label;Y.has(be.key)||Y.set(be.key,{...be,pts:[],others:new Set}),Y.get(be.key).pts.push(be.at),Y.get(be.key).others.add(Te.get(be.other).name)}let re=[[0,0],[0,-12],[0,-24],[0,-36],[-60,0],[60,0],[-60,-12],[60,-12],[0,-48]];for(let Se of[...Y.values()].sort((be,Xe)=>be.key.localeCompare(Xe.key))){let be=`${Se.out?"\u2192":"\u2190"} ${[...Se.others].sort().join(" \xB7 ")}`,Xe=Math.max(...Se.pts.map(it=>it[1]));if(Se.kind==="sky"){Xe=Math.max(Xe,Qe.skyBase(xe.get(Se.module).plate)-.2);let it=Se.pts.reduce((st,Yt)=>st+Yt[0],0)/Se.pts.length;Go(it,Xe,Se.z,be,{size:o.S,align:"center",color:s.muted,halo:!0,dy:-4,kind:"port"},re)}else{let it=Se.side==="right";Go(Se.x,Xe,Se.z,be,{size:o.S,align:it?"left":"right",dx:it?2:-2,color:s.muted,halo:!0,dy:-5,kind:"port"},[[0,0],[0,-12],[0,12],[0,-24],[0,24]])}}}let Le=D.hover;if(Le&&!Hr){let Y=je.get(Le),re=ce.get(Le);Nu(Y?Y.cls?`${ce.get(Y.cls).name}.${Y.name}`:Y.name:re?re.name:"",Y?Y.module:re?re.module:"")}else if(D.hoverBox&&!Le&&!Hr){let Y=xe.get(D.hoverBox),re=Y.box,Se=re.rows.length+(re.more?re.more.lines:0);Nu(Y.name+".py",Se?`${Y.module}`:`${Y.module} \xB7 no public names`)}else if(D.hoverLine?.startsWith("call:"))t0(+D.hoverLine.slice(5));else if(D.hoverLine){let[Y,re]=D.hoverLine.split(":");Nu(bf(Y,+re),Sf(Y,+re))}}let e0=a=>{let u=je.get(a);return u?u.dead?"dead":u.clone!==null?"clone":u.lb?"lb":null:null};function sf(a,u,g,f){let S=e0(f);S&&(oe.fillStyle=lt(t[S]),oe.fillRect(a+2,u+3,3,g-6))}function t0(a){let u=ne.edges[a],g=`${sl(u.s)} \u2192 ${sl(u.t)}`,f=u.ms===u.mt?`inside ${xe.get(u.ms).name}.py`:`${xe.get(u.ms).name}.py \u2192 ${xe.get(u.mt).name}.py`,[S,w]=D.mouse;oe.font=`700 ${o.M}px ${_}`,oe.letterSpacing="0px";let C=oe.measureText(g).width;oe.font=`400 ${o.S}px ${_}`;let z=oe.measureText(f).width,O=Math.max(C,z)+14,H=32,B=[u.s,u.t].map(Fe=>{let nt=nl(Fe,D.open,D.expanded),vt=jt(nt.x0,nt.y0,nt.z),et=jt(nt.x1,nt.y1,nt.z);return[Math.min(vt[0],et[0])-4,Math.min(vt[1],et[1])-4,Math.max(vt[0],et[0])+4,Math.max(vt[1],et[1])+4]}),q=[[12,-H-16],[-O-12,-H-16],[12,16],[-O-12,16],[-O-16,-H/2],[16,-H/2],[12,-H-44],[-O-12,-H-44],[12,44],[-O-12,44],[12,-H-80],[-O-12,-H-80],[-O/2,-H-110],[12,80],[-O-12,80],[-O/2,120]].map(([Fe,nt])=>[de(S+Fe,A+4,Gr-O-6),de(w+nt,v+14,Je-P-H-4)]),se=Fe=>!B.some(nt=>xi([Fe[0],Fe[1],Fe[0]+O,Fe[1]+H],nt)),pe=Fe=>se(Fe)&&!kn.some(nt=>xi([Fe[0],Fe[1],Fe[0]+O,Fe[1]+H],nt)),[_e,rt]=q.find(pe)??q.find(se)??q[0];oe.globalAlpha=1,oe.fillStyle=r.pill,oe.strokeStyle=r.pillLineStrong,oe.lineWidth=1,oe.beginPath(),oe.roundRect(_e,rt,O,H,4),oe.fill(),oe.stroke(),sf(_e,rt,H,u.t),oe.fillStyle=s.lit,oe.font=`700 ${o.M}px ${_}`,oe.fillText(g,_e+7,rt+13),oe.fillStyle=s.dim,oe.font=`400 ${o.S}px ${_}`,oe.fillText(f,_e+7,rt+26),vs.push({size:o.M,text:g,full:g,x:_e,y:rt,kind:"pill"})}function n0(a,u){let g=new Map,f=[...Xt.values()].filter(w=>w.a>.15).map(w=>({m:w.p.module,r:nf(w)})).filter(w=>w.r),S=(w,C)=>kn.some(z=>xi(w,z))||f.some(z=>z.m!==C&&xi(w,z.r));for(let w of a.pills){let C=nl(w.at,D.open,D.expanded),z=w.dir==="out",O=Yn(w.at),H=!D.open.has(O),B=(C.y0+C.y1)/2,q=jt(z?C.x1:C.x0,B,C.z);if(q[2]>1)continue;let se=H?`${O}|${w.dir}`:`${w.at}|${w.dir}`,pe=g.get(se)??0;g.set(se,pe+1);let _e=!!u&&u.edges.has(w.edge),rt=`${z?"\u2192":"\u2190"} ${w.name}`,Fe=` \xB7 ${w.package}`,nt=`700 ${o.M}px ${_}`,vt=`400 ${o.S}px ${_}`,et=Vr(rt,nt)+Vr(Fe,vt)+12,Lt=16,Et=4,Le,Y,re;if(H){let Se=Xt.get(O),be=Se.b,Xe=jt(z?be.x+be.w:be.x,-Se.h,C.z),it=q[0]+(z?5:-5);Le=z?it-8:it+8-et,Le+et>Gr-8&&(Le=it+8-et),Le<A+6&&(Le=it-8),Y=Xe[1]+8+pe*(Lt+Et);for(let st=0;st<40&&S([Le,Y,Le+et,Y+Lt],O);st++)Y+=6;re=[[q[0],q[1]],[it,q[1]],[it,Y]]}else{Le=z?q[0]+14:q[0]-14-et,Le=de(Le,A+6,Gr-8-et),Y=q[1]-Lt/2+pe*(Lt+Et);for(let Se=0;Se<12&&S([Le,Y,Le+et,Y+Lt],O);Se++)Y+=Lt+Et;re=[[q[0],q[1]],[z?Le:Le+et,Y+Lt/2]]}kn.push([Le-2,Y-2,Le+et+2,Y+Lt+2]),oe.save(),oe.globalAlpha=1,oe.strokeStyle=_e?s.lit:s.muted,oe.lineWidth=_e?1.6:1,oe.beginPath(),re.forEach(([Se,be],Xe)=>Xe?oe.lineTo(Se,be):oe.moveTo(Se,be)),oe.stroke(),oe.fillStyle=r.pill,oe.strokeStyle=_e?s.lit:r.pillLine,oe.lineWidth=1,oe.beginPath(),oe.roundRect(Le,Y,et,Lt,3),oe.fill(),oe.stroke(),sf(Le-1,Y,Lt,w.other),oe.textBaseline="middle",oe.font=nt,oe.fillStyle=_e?s.lit:s.text,oe.fillText(rt,Le+6,Y+Lt/2+.5),oe.font=vt,oe.fillStyle=s.muted,oe.fillText(Fe,Le+6+Vr(rt,nt),Y+Lt/2+.5),oe.restore(),vs.push({size:o.S,text:rt+Fe,full:rt+Fe,x:Le,y:Y,kind:"stubpill",edge:w.edge})}oe.textBaseline="alphabetic"}function Nu(a,u){let[g,f]=D.mouse;oe.font=`700 ${o.L}px ${_}`;let S=oe.measureText(a).width;oe.font=`400 ${o.S}px ${_}`;let w=oe.measureText(u).width,C=Math.max(S,w)+16,z=de(g+14,0,Ne-C-4),O=f+14;oe.globalAlpha=1,oe.fillStyle=r.tooltip,oe.strokeStyle=r.tooltipLine,oe.beginPath(),oe.roundRect(z,O,C,34,5),oe.fill(),oe.stroke(),oe.fillStyle=s.text,oe.font=`700 ${o.L}px ${_}`,oe.fillText(a,z+8,O+15),oe.fillStyle=s.dim,oe.font=`400 ${o.S}px ${_}`,oe.fillText(u,z+8,O+28),vs.push({size:o.S,text:a,full:a,x:z,y:O,kind:"tooltip"})}let Ni=new xo;function i0(a,u){for(let g of fu(a.b))if(u>=g.y&&u<g.y+g.h)return g;return null}function rf(a,u){let g=new bt(a/Ne*2-1,-(u/Je)*2+1);Ni.setFromCamera(g,ie),Ni.near=0,Ni.far=1/0;let f=ie.getWorldDirection(K()),S=pe=>{let _e=pe.point.clone().sub(ie.position).dot(f);return _e<ie.near||_e>ie.far?!1:!(Ii!==null&&pe.point.z>Ii+.001||Ie!==null&&pe.point.z<Ie-.001)},w=[...Ci.values()].filter(pe=>pe.walls.visible).flatMap(pe=>pe.walls.children),C=Ni.intersectObjects(w,!1).find(S);if(C&&(Ni.far=C.distance),D.view==="plan"){let pe=[...Xt.values()].filter(rt=>rt.a>.1&&!rt.sil).map(rt=>rt.body),_e=Ni.intersectObjects(pe,!1).find(S);return _e?{kind:"module",id:_e.object.userData.id,part:"head"}:null}Ni.params.Line2={threshold:4};let z=[...Wt,...fn].filter(pe=>pe.line.visible&&pe.a>.25).map(pe=>pe.line),O=Ni.intersectObjects(z,!1).filter(S);if(O.length)return{kind:"call",id:O[0].object.userData.id};let H=[];for(let pe of _s.values())pe.mesh.visible&&pe.border.material.opacity>.2&&H.push(pe.mesh);for(let pe of le.values())pe.group.visible&&pe.mats[4].opacity>.1&&H.push(pe.box);for(let pe of Xt.values())pe.a>.1&&!pe.sil&&H.push(pe.body);let B=Ni.intersectObjects(H,!1).filter(S);if(B.length){let pe=B[0],_e=pe.object.userData;if(_e.type==="node")return{kind:"node",id:_e.id};if(_e.type==="module"){let et=Xt.get(_e.id),Lt=-pe.point.y;if(Lt<ze.mod_header)return{kind:"module",id:_e.id,part:"head"};if(et.u>.5)return{kind:"module",id:_e.id,part:"body"};let Et=i0(et,Lt);return Et?Et.slot==="more"||Et.slot==="tail"||Et.slot==="ghost"?{kind:"module",id:_e.id,part:Et.slot==="more"?"more":"tail"}:Et.kind==="class"?{kind:"class",id:Et.id,module:_e.id}:{kind:"node",id:Et.id,module:_e.id}:{kind:"module",id:_e.id,part:"body"}}let rt=ce.get(_e.id),Fe=ae(rt),nt=rt.y-pe.point.y;if(nt<ze.box_head)return{kind:"class",id:rt.id,part:"head"};if(Fe.tailY!==null&&pe.point.y<Fe.tailY+ze.box_tail/2)return{kind:"class",id:rt.id,part:"tail"};let vt=Math.floor((nt-ze.box_head)/ze.box_row);return!rt.data_only&&vt>=0&&vt<Fe.rows.length?{kind:"node",id:Fe.rows[vt]}:{kind:"class",id:rt.id,part:"body"}}Ni.params.Line2={threshold:5};let q=[...gi,...Ur].filter(pe=>pe.a>.25).map(pe=>pe.line),se=Ni.intersectObjects(q,!1).filter(S);return se.length?{kind:se[0].object.userData.type,id:se[0].object.userData.id}:null}function of(a){let u=Ut();if(!u||!a)return null;let g=u.evidence.includes(a.id);return a.kind==="node"&&(Re?.depth.has(a.id)||g)?{kind:"node",id:a.id}:a.kind==="class"&&(Re?.classes.has(a.id)||g)?{kind:"class",id:a.id}:a.kind==="link"&&Re?.links.has(a.id)?{kind:"link",id:a.id}:a.kind==="call"&&Re?.edges.has(fn[a.id])?{kind:"call",id:a.id}:null}let ji=null,Uu=!1;b.addEventListener("pointerdown",a=>{Uu=ji!==null,ji=[a.clientX,a.clientY]}),b.addEventListener("pointercancel",()=>{ji=null}),b.addEventListener("pointermove",a=>{let u=b.getBoundingClientRect();if(D.mouse=[a.clientX-u.left,a.clientY-u.top],a.buttons){ji&&Math.hypot(a.clientX-ji[0],a.clientY-ji[1])>4&&(Uu=!0,Z&&a.buttons===1&&!a.ctrlKey&&!a.metaKey&&!a.shiftKey&&D.view!=="axo"&&(D.view="axo",document.querySelectorAll("#views [data-view]").forEach(z=>z.classList.toggle("on",z.dataset.view==="axo")),Tn("scope"),Yr()));return}let g=b.getBoundingClientRect(),f=rf(a.clientX-g.left,a.clientY-g.top),S=null,w=null,C=null;if(D.guide!==null){let z=of(f);z?.kind==="link"||z?.kind==="call"?C=`${z.kind}:${z.id}`:z&&(S=z.id)}else{let z=f?.module&&Xt.get(f.module).rowsA>.5;S=f&&(f.kind==="node"||f.kind==="class")&&(!f.module||z)?f.id:null,w=f&&(f.kind==="module"||f.module&&!z)?f.id&&f.kind==="module"?f.id:f.module:null,C=f&&(f.kind==="link"||f.kind==="plateribbon"||f.kind==="call")?`${f.kind}:${f.id}`:null}b.style.cursor=S||w||C?"pointer":"default",S!==D.hover||w!==D.hoverBox||C!==D.hoverLine?(D.hover=S,D.hoverBox=w,D.hoverLine=C,Tn()):(S||w||C)&&($=!0,Rn())}),b.addEventListener("pointerleave",()=>{(D.hover||D.hoverBox||D.hoverLine)&&(D.hover=D.hoverBox=D.hoverLine=null,Tn())}),b.addEventListener("pointerup",a=>{let u=ji&&!Uu&&Math.hypot(a.clientX-ji[0],a.clientY-ji[1])<=4&&a.button===0;if(ji=null,!u)return;let g=b.getBoundingClientRect(),f=rf(a.clientX-g.left,a.clientY-g.top);if(D.guide!==null){let S=of(f);S&&Wr(S,{fresh:!0});return}if(!f){ys(null);return}if(D.view==="plan"&&f.kind==="module"){Qi({kind:"module",id:f.id}),Fn("browse");return}if(f.module&&!D.scope){Qi({kind:"package",id:xe.get(f.module).district});return}f.kind==="node"?ys({kind:"node",id:f.id}):f.kind==="class"&&f.module?ys({kind:"class",id:f.id}):f.kind==="class"&&(f.part==="head"||f.part==="tail")?((f.part==="tail"||D.selected?.id===f.id)&&uf(f.id),ys({kind:"class",id:f.id})):f.kind==="class"?ys({kind:"class",id:f.id}):f.kind==="module"?D.scope?(f.part!=="body"||D.open.has(f.id))&&hf(f.id):Qi({kind:"package",id:xe.get(f.id).district}):(f.kind==="link"||f.kind==="plateribbon"||f.kind==="call")&&ys({kind:f.kind,id:f.id})});let s0=.15,r0=.45,el=1.25,Ou=160;function af(){return Jn?{target:Jn.goal.target.clone(),position:Jn.goal.position.clone(),zoom:Jn.goal.zoom??ie.zoom}:{target:ue.target.clone(),position:ie.position.clone(),zoom:ie.zoom}}function lf(a,u){let g=af(),f=Zd(),S=f[1]-f[0],w=f[3]-f[2],C=ie.isOrthographicCamera?1/g.zoom:2*g.position.distanceTo(g.target)*Math.tan(ls.degToRad(ge.fov)/2)/Je;ie.updateMatrixWorld();let z=K().setFromMatrixColumn(ie.matrixWorld,0),O=K().setFromMatrixColumn(ie.matrixWorld,1),H=z.multiplyScalar(a*S*C).add(O.multiplyScalar(u*w*C)),B=g.target.clone().add(H).sub(ue.cursor).clampLength(0,ue.maxTargetRadius).add(ue.cursor);H.copy(B).sub(g.target),hr({target:g.target.add(H),position:g.position.add(H),zoom:g.zoom,ortho:!!ie.isOrthographicCamera},Ou),Bs=null}function tl(a){let u=af();ie.isOrthographicCamera?hr({target:u.target,position:u.position,zoom:de(u.zoom*a,ue.minZoom,ue.maxZoom),ortho:!0},Ou):hr({target:u.target,position:u.target.clone().add(u.position.clone().sub(u.target).setLength(de(u.position.distanceTo(u.target)/a,ue.minDistance,ue.maxDistance))),ortho:!1},Ou),Bs=null}function Ki(a=360){D.guide!==null?hr(df(St[D.guide]),a):Re&&D.selected&&D.pulse?c0(a):dr(D.view,a)}function o0(){if(!F("#help").classList.contains("hidden")){Bu(!1);return}if(!F("#key").classList.contains("hidden")){Xr(!1);return}if(Ft==="source"){zu();return}if(Ft){Fn(null);return}if(D.guide!==null){let a=St[D.guide];a.scope?.kind==="module"?(bs(),Qi({kind:"package",id:xe.get(a.scope.id).district})):bs({map:!0});return}if(D.selected){ys(null);return}D.scope?.kind==="module"?Qi({kind:"package",id:xe.get(D.scope.id).district}):D.scope?Qi(null):(Bs!=="view"||D.view!=="axo")&&_f()}function cf(a){D.proj=a??(D.proj==="ortho"?"persp":"ortho"),F("#projBtn").classList.toggle("on",D.proj==="ortho"),F("#projBtn").textContent=D.proj==="ortho"?"Orthographic":"Perspective",Ki(),Yr()}function Bu(a){let u=F("#help"),g=a??u.classList.contains("hidden");u.classList.toggle("hidden",!g),F("#helpBtn").classList.toggle("on",g),$=!0,Rn()}addEventListener("keydown",a=>{if(a.metaKey||a.ctrlKey||a.altKey||a.target.closest('input, textarea, select, [contenteditable="true"]'))return;let u=a.key,g=D.guide!==null,f=a.shiftKey?r0:s0;if(u==="Backspace"){Ft&&(a.preventDefault(),zu());return}if(u==="ArrowLeft"||u==="ArrowRight"){a.preventDefault(),g?mr(D.guide+(u==="ArrowRight"?1:-1)):lf(u==="ArrowRight"?f:-f,0);return}if(u==="ArrowUp"||u==="ArrowDown"){a.preventDefault(),lf(0,u==="ArrowUp"?f:-f);return}if(g&&(u==="PageDown"||u==="PageUp")){a.preventDefault(),mr(D.guide+(u==="PageDown"?1:-1));return}if(u==="+"||u==="="){tl(el);return}if(u==="-"||u==="_"){tl(1/el);return}if(u==="Home"){a.preventDefault(),Ki();return}if(u==="Escape"){o0();return}if(u==="?"||u==="h"||u==="H"){Bu();return}if(u==="o"||u==="O"){cf();return}if(u==="k"){Xr();return}if(u==="K"){Xr();return}if(u==="b"||u==="B"){Fn("browse"),F("#symbolSearch").focus();return}if(u==="t"||u==="T"){Yu(e==="dark"?"light":"dark");return}if(u==="p"||u==="P"){Du(),$=!0,Rn();return}if(!g&&(u==="g"||u==="G")){gf();return}if(["1","2","3"].includes(u)){bs(),dr({1:"axo",2:"plan",3:"elev"}[u]);return}if(!g){if((u==="e"||u==="E")&&D.selected){let S=D.selected.kind==="class"?D.selected.id:je.get(D.selected.id)?.cls;S&&D.open.has(ce.get(S).module)&&uf(S)}if((u==="u"||u==="U")&&D.scope){let S=D.hoverBox??(D.selected&&D.selected.kind!=="call"?Yn(D.selected.id):null);S&&hf(S)}}});let a0=[["Move",null],["\u2190 \u2192 \u2191 \u2193","move the view by 15 % of the picture (in the guide \u2190 \u2192 step, \u2191 \u2193 move)"],["Shift + arrow","move by 45 %"],["+  \u2212","zoom in and out about the centre"],["Home","fit the scope again (in the guide: the step)"],["mouse / touch","drag orbits \xB7 right-drag pans \xB7 wheel or pinch zooms"],["Esc, in this order",null],["1 \xB7 overlay","close the help or the key"],["2 \xB7 panel","return to Browse or Guide, then close the panel"],["3 \xB7 selection","clear the selection"],["4 \xB7 guide","leave the guide, one level above its step"],["5 \xB7 scope","up one level: module \u2192 package \u2192 all"],["Explore",null],["click box \xB7 header","scope its package \xB7 unfold the module"],["click row \xB7 call","select it and read its source"],["Backspace","inspector: back to what it showed before"],["u \xB7 e","unfold the hovered module \xB7 open the selected class"],["Views",null],["1  2  3","Axonometric \xB7 Plan \xB7 Elevation (leaves the guide)"],["o","orthographic or perspective projection"],["b \xB7 k","browse / search symbols \xB7 show the key"],["t","dark or light theme"],["?","this help"],["Guide",null],["\u2190 \u2192 \xB7 PgUp PgDn","previous and next step"],["click a lit mark","read its source; the step stays"],["g","resume the guide where you left it"],["p","replay the pulses of the lit pipeline"],["Calls",null],["hover a call","isolate it: caller \u2192 callee in a pill"],["hover a source line","light its drawn calls and callees"]];function l0(){let a=['<div class="hh">Keys</div><div class="hg">'];for(let[u,g]of a0)a.push(g===null?`<div class="hs">${pt(u)}</div>`:`<div class="hk">${pt(u)}</div><div class="hv">${pt(g)}</div>`);a.push("</div>"),F("#help").innerHTML=a.join("")}ue.addEventListener("change",()=>{$=!0,Rn()});function ys(a,{pulse:u=!1,keepBack:g=!1}={}){D.selected=a,D.pulse=!!a&&u,g||(D.inspectBack=[]),D.inspect=a,D.hoverCall=null,a?Fn("source"):Ft==="source"&&Fn("browse"),Tn("select")}function Wr(a,{fresh:u=!1}={}){u?D.inspectBack=[]:D.inspect&&D.inspectBack.push({...D.inspect,scroll:F("#inspector .ibody")?.scrollTop??0}),D.guide!==null?(D.inspect=a,D.hoverCall=null,Fn("source"),Tn("hover")):ys(a,{keepBack:!0})}function zu(){let a=D.inspectBack.pop();if(Ft!=="source"||!a){if(Ft==="browse"&&en)en=null;else if(Ft==="browse"&&Zt)Zt=null;else{Fn(D.guide===null?"browse":"guide");return}F("#symbolSearch").value="",es();return}D.guide!==null?(D.inspect=a,D.hoverCall=null,Tn("hover")):ys(a,{keepBack:!0}),F("#inspector .ibody").scrollTop=a.scroll??0}function uf(a,u){let g=u??!D.expanded.has(a);if(g!==D.expanded.has(a)){if(g)D.expanded.add(a),Be(ce.get(a)).liftTarget=1;else{D.expanded.delete(a);let f=le.get(a);f.liftTarget=0,f.rebuildOnClose=!0}mi(a),Tn("select")}}function pr(a,u){if(u===D.open.has(a))return!1;if(u)D.open.add(a);else{D.open.delete(a);for(let g of ne.classes)if(g.module===a&&D.expanded.has(g.id)){D.expanded.delete(g.id);let f=Be(g);f.lift=0,f.liftTarget=0,f.group.position.z=g.z}}return Xt.get(a).uTarget=u?1:0,ln(a),kg(a),!0}function hf(a,u){pr(a,u??!D.open.has(a))&&(es(),Tn("unfold"))}function Qi(a,{fly:u=!0,ms:g=360}={}){D.scope=a,Zt=a?a.kind==="package"?a.id:xe.get(a.id).district:null,en=a?.kind==="module"?a.id:null;let f=new Set(a?.kind==="module"?[a.id]:[]);for(let S of[...D.open])f.has(S)||pr(S,!1);for(let S of f)pr(S,!0);es(),Xo(),Tn("scope"),u&&dr(a?D.view==="plan"?"plan":"elev":"axo",g)}function c0(a=360){if(!Re)return;let u=[...Re.modules],g=new Set(u.map(O=>xe.get(O).row)).size===1?"elev":"axo";D.view=g,document.querySelectorAll("#views [data-view]").forEach(O=>O.classList.toggle("on",O.dataset.view===g));let f=Os[g],S=Math.max(...u.map(O=>xe.get(O).z))+Lu,w=[];for(let O of u){let H=xe.get(O),B=H.box;w.push(K(B.x-ze.gutter,.4,H.z+B.d),K(B.x+B.w+ze.gutter,ku(O)-.25,H.z+B.d))}for(let O of Re.links.keys()){let H=gi[O];if(!(H.l.span==="cross_row"||!u.includes(H.l.s)||!u.includes(H.l.t)))for(let B=0;B<H.n;B+=3)w.push(K(H.pts[B*3],H.pts[B*3+1],H.pts[B*3+2]))}let C=new Hn().setFromPoints(w);C.pts=w,Bs="sel";let z=zo(C,f.az,f.el,.92,S);hr(z,a),Tn("scope")}let u0=.98;function nl(a,u,g){let f=je.get(a),S=Yn(a),w=xe.get(S),C=w.box;if(u.has(S)){if(f&&f.x!==void 0&&!(f.cls&&ce.has(f.cls)&&!f.dead))return{x0:f.x,x1:f.x+f.w,y0:f.y,y1:f.y-f.h,z:f.z};let O=ce.get(f?f.cls:a),H=g.has(O.id);return{x0:O.x,x1:O.x+(H?O.expanded.w:O.w),y0:O.y,y1:O.y-(H?O.expanded.h:O.h),z:O.z+O.d+(H?O.expanded.lift:0)}}let z=Dt.get(`${S}|${zr(a)}`);return{x0:C.x,x1:C.x+C.w,y0:-z.y,y1:-(z.y+z.h),z:w.z+C.d}}function df(a){if(a.camera==="plan")return D.view="plan",zo(Bo(ne.panes.map(se=>se.module),{plan:!0}),Os.plan.az,Os.plan.el,.93);if(a.camera==="map")return D.view="axo",zo(Bo(ne.panes.map(se=>se.module)),Os.axo.az,a.lod==="plate"?u0:Os.axo.el,1.02);D.view=a.camera==="raised"?"axo":"elev";let u=new Set(a.unfold),g=new Set(a.open),f=new Set(a.frame.modules),S=[];a.frame.modules.length&&!a.frame.nodes.length&&!a.frame.classes.length&&S.push(...Bo(a.frame.modules).pts);let w=se=>{let pe=xe.get(se),_e=pe.box;S.push(K(_e.x-ze.gutter,.7,pe.z+_e.d),K(_e.x+_e.w+ze.gutter,.7,pe.z+_e.d))};for(let se of a.frame.nodes){let pe=Yn(se),_e=nl(se,u,g);f.add(pe),S.push(K(_e.x0-.3,_e.y0+.3,_e.z),K(_e.x1+.3,_e.y1-.4,_e.z)),w(pe)}for(let se of a.frame.classes){let pe=ce.get(se),_e=nl(se,u,g);f.add(pe.module),S.push(K(_e.x0-.5,_e.y0+.9,_e.z),K(_e.x1+.5,_e.y1-.3,_e.z)),w(pe.module)}for(let[se]of a.lit_edges){let pe=ne.edges[se];if(pe.ms===pe.mt)continue;let _e=on.get(se),rt=u.has(pe.ms)||u.has(pe.mt)?fn[se]:gi[_e];if(!a.off_edges.includes(se)&&!(pe.span!=="plate"&&pe.span!=="row")&&!(a.home_row!==null&&xe.get(pe.ms).row!==xe.get(pe.mt).row))for(let Fe=0;Fe<rt.n;Fe+=3)S.push(K(rt.pts[Fe*3],rt.pts[Fe*3+1],rt.pts[Fe*3+2]))}let C=new Hn().setFromPoints(S);C.pts=S;let z=[...f],O=[...Yd(a)??[]],H=Math.max(...(O.length?O:z).map(se=>xe.get(se).z))+Lu,B=a.camera==="raised"?Os.axo:Os.elev,q=zo(C,B.az,B.el,.92,H);if(q.ortho)q.zoom=Math.min(q.zoom,ff);else{let se=q.position.clone().sub(q.target),pe=se.length(),_e=Je/(2*ff*Math.tan(ls.degToRad(ge.fov)/2));pe<_e&&q.position.copy(q.target).addScaledVector(se.normalize(),_e)}return q}let ff=64;function pf(a){let u=new Set(a);for(let g of[...D.expanded])if(!u.has(g)){D.expanded.delete(g);let f=le.get(g);f.liftTarget=0,f.rebuildOnClose=!0,mi(g)}for(let g of u)D.expanded.has(g)||(D.expanded.add(g),Be(ce.get(g)).liftTarget=1,mi(g))}function mr(a,{ms:u=360}={}){if(a<0||a>=St.length)return;let g=St[a];D.guide=a,D.resume=a,D.scope=g.scope?{kind:g.scope.kind,id:g.scope.id}:null,D.selected=g.selected?{kind:g.selected.kind,id:g.selected.id}:null,D.pulse=!1,D.hover=D.hoverBox=D.hoverLine=null,D.inspect=null,D.inspectBack=[],D.hoverCall=null,Fn("guide",!1);let f=new Set(g.unfold);for(let w of[...D.open])f.has(w)||pr(w,!1);for(let w of f)pr(w,!0);pf(g.open),es(),Xo(),Vu(),Xu();let S=df(g);Tn("guide"),document.querySelectorAll("#views [data-view]").forEach(w=>w.classList.toggle("on",w.dataset.view===D.view)),hr(S,u),Bs="guide",Yr()}function bs({map:a=!1}={}){D.guide!==null&&(D.guide=null,D.inspect=null,D.inspectBack=[],D.hoverCall=null,Fn("browse",!1),Vu(),a?(mf(),dr("axo")):(es(),Xo(),Tn("scope")),Yr())}function mf(){D.selected=null,D.scope=null,D.pulse=!1,Zt=en=null,D.inspect=null,D.inspectBack=[],D.hoverCall=null,Fn("browse",!1);for(let a of[...D.open])pr(a,!1);pf([]),Iu(),es(),Xo()}function gf(a=D.resume){mr(a)}function _f(){if(D.guide!==null){bs({map:!0});return}mf(),dr("axo")}function Vu(){let a=D.guide!==null;if(F("#guide").classList.toggle("hidden",Ft!=="guide"),h0(),!a)return;let u=D.guide,g=St[u],f=St.filter(H=>H.part===g.part),S=f.indexOf(g)+1,w=g.part==="chapter"?`Step ${g.label} \xB7 chapter ${S} of ${f.length}`:g.part==="pipeline"?`Step ${g.label} \xB7 pipeline ${S} of ${f.length}`:`Step ${g.label} \xB7 signal ${S} of ${f.length}`,C=H=>pt(H).replace(/\.(?=[A-Za-z_])/g,".\u200B"),z=['<div class="guide-content">',`<div class="gh"><b>Guide</b> \xB7 ${pt(Jt.title)}</div>`,`<div class="gp">${w}</div>`,`<h2>${pt(g.title)}</h2>`,`<p class="gb">${C(g.body)}</p>`];if(g.evidence.length&&!g.list){z.push('<div class="gs">Evidence</div><div class="fl-wrap ev-wrap">');for(let H of g.evidence){let B=je.get(H),q=ce.get(H),se=q?q.name:B.cls?`${ce.get(B.cls).name}.${B.name}`:B.name;z.push(`<div class="ev" data-ev="${pt(H)}">${pt(se)} <span>${pt((q??B).module.split(".").pop())}.py</span></div>`)}z.push("</div>")}if(z.push('<details class="guide-key"><summary>Reading this view</summary><div id="gmarks"></div></details>'),g.list){let H=g.list.reduce((B,q)=>B+q.ids.length,0);z.push(`<div class="gs">${H} functions \xB7 ${g.list.length} modules</div><div class="fl-wrap">`);for(let B of g.list){let q=g.list.filter(se=>se.name===B.name).length>1&&B.module||B.name;z.push(`<details class="fl"${B.ids.includes(g.selected?.id)?" open":""}><summary><span>${pt(q)}</span><span class="fm">${B.ids.length}</span></summary>`);for(let se of B.ids){let pe=je.get(se),_e=pe.cls?`${ce.get(pe.cls).name}.${pe.name}`:pe.name;z.push(`<button class="fn" data-ev="${pt(se)}">${pt(_e)}</button>`)}z.push("</details>")}z.push("</div>")}z.push("</div>");let O=F("#guide");O.innerHTML=z.join(""),Af(Yo),qu=null,O.querySelectorAll("[data-ev]").forEach(H=>H.addEventListener("click",()=>{let B=H.dataset.ev;Wr({kind:ce.has(B)?"class":"node",id:B},{fresh:!0})}))}function h0(){let a=D.guide===null,u=a?D.resume:D.guide;F("#guideStep").innerHTML=St.map((f,S)=>`<option value="${S}"${S===u?" selected":""}>${S+1} \xB7 ${pt(f.title)}</option>`).join(""),F("#navProgress").textContent=`${a?"Resume":"Step"} ${u+1} / ${St.length}`,F("#guidePrev").disabled=u===0;let g=u===St.length-1;F("#guideNext").textContent=g?"Prompt \u2197":"\u2192",F("#guideNext").setAttribute("aria-label",g?"Open cleanup prompt":"Next tutorial step"),F("#guideNext").title=g?"Open cleanup prompt":"Next tutorial step",F("#mapBtn").classList.toggle("on",a),F("#rail").innerHTML=`<span>${a?"Exploring":"Guide"} \xB7 ${pt(St[u].title)}</span><span class="count">${u+1} / ${St.length}</span>`}function Xr(a){let u=F("#key"),g=a??u.classList.contains("hidden");u.classList.toggle("hidden",!g),F("#keyBtn").classList.toggle("on",g),F("#keyBtn").setAttribute("aria-expanded",String(g)),$=!0,Rn()}function Fn(a,u=!0){let g=!F("#panel").classList.contains("hidden");Ft==="browse"&&(an=F("#browser").scrollTop),Ft=a,F("#panel").classList.toggle("hidden",!a),F("#browser").classList.toggle("hidden",a!=="browse"),F("#guide").classList.toggle("hidden",a!=="guide"),F("#navigation").classList.toggle("hidden",a!=="guide"),F("#inspector").classList.toggle("hidden",a!=="source"),F("#prompt").classList.toggle("hidden",a!=="prompt"),F("#legend").classList.toggle("hidden",a==="prompt");for(let f of document.querySelectorAll("[data-panel]"))f.classList.toggle("on",f.dataset.panel===a),f.setAttribute("aria-selected",String(f.dataset.panel===a)),f.tabIndex=f.dataset.panel===a?0:-1,f.disabled=f.dataset.panel==="source"&&!D.inspect;F("#browseBtn").classList.toggle("on",a==="browse"),F("#expandPanel").classList.toggle("hidden",!a),qr(V),a==="browse"&&(es(),F("#browser").scrollTop=an),a==="source"&&Xu(),F("#panelBack").disabled=a==="guide"||a==="prompt"||a==="browse"&&!Zt&&!en,$=!0,Rn(),Ln&&u&&g!==!!a&&Ki()}function xf(a){Z=a,ue.enableRotate=a,ue.mouseButtons.LEFT=a?ui.ROTATE:ui.PAN,ue.touches.ONE=a?Ai.ROTATE:Ai.PAN,F("#orbitBtn").setAttribute("aria-pressed",String(a)),F("#orbitBtn").classList.toggle("on",a),F("#cameraHint").textContent=a?"Drag to orbit \xB7 right-drag to pan \xB7 scroll to zoom":"Drag to pan \xB7 scroll to zoom"}function d0(){x0(F("#panel .grip")),xf(!0),F("#optimizationPrompt").value=tt,F("#promptMeta").textContent=`${tt.trim().split(/\s+/).length} words \xB7 full evidence in .atlas/atlas.json`,F("#copyPrompt").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(tt),F("#copyStatus").textContent="Copied. Paste into your coding agent.",F("#copyPrompt").textContent="Copied"}catch{F("#optimizationPrompt").focus(),F("#optimizationPrompt").select(),F("#copyStatus").textContent="Prompt selected. Press Ctrl+C or \u2318C to copy."}}),F("#guideStep").addEventListener("change",a=>mr(+a.target.value)),F("#guidePrev").addEventListener("click",()=>mr((D.guide??D.resume)-1)),F("#guideNext").addEventListener("click",()=>{let a=D.guide??D.resume;a===St.length-1?Fn("prompt"):mr(a+1)}),F("#panelNav").addEventListener("keydown",a=>{if(!a.target.matches("[data-panel]")||!["ArrowLeft","ArrowRight"].includes(a.key))return;a.preventDefault(),a.stopPropagation();let u=[...document.querySelectorAll("[data-panel]:not(:disabled)")],g=u[(u.indexOf(a.target)+(a.key==="ArrowRight"?1:u.length-1))%u.length];g.click(),g.focus()}),F("#browseBtn").addEventListener("click",()=>Fn("browse")),F("#panelBack").addEventListener("click",zu),F("#closePanel").addEventListener("click",()=>Fn(null)),F("#expandPanel").addEventListener("click",()=>{hn=!hn,qr(V),F("#expandPanel").setAttribute("aria-label",hn?"Restore panel width":"Expand panel"),Ki()}),document.querySelectorAll("[data-panel]").forEach(a=>a.addEventListener("click",()=>{a.dataset.panel==="guide"&&D.guide===null?gf():Fn(a.dataset.panel)})),F("#symbolSearch").addEventListener("input",()=>{an=0,es()}),F("#fitBtn").addEventListener("click",()=>Ki()),F("#zoomIn").addEventListener("click",()=>tl(el)),F("#zoomOut").addEventListener("click",()=>tl(1/el)),F("#orbitBtn").addEventListener("click",()=>xf(!Z))}function f0(a){return`<span class="counts">${[["dead",a.dead,"dead"],["clone",a.clones,"clones"],["lb",a.load_bearing,"load-bearing"]].filter(([,u])=>u).map(([u,g,f])=>`<span class="count-${u}" title="${g} ${f}">${g} ${f}</span>`).join("")}</span>`}function es(){let a=F("#symbolSearch").value.trim().toLowerCase(),u=[],g=[...ne.nodes.map(S=>({...S,kind:"node"})),...ne.classes.map(S=>({...S,kind:"class"}))],f=S=>`<button class="row symbol ${D.inspect?.id===S.id?"on":""}" data-symbol="${pt(S.id)}" data-kind="${S.kind}" title="${pt(S.id)}"><span class="symbol-icon">${S.kind==="class"?"C":"\u0192"}</span><span class="nm">${pt($r(S.id))}</span>${S.dead?'<span class="symbol-meta">dead</span>':""}</button>`;for(let S of ne.districts){let w=S.modules.map(O=>xe.get(O)).sort((O,H)=>O.name.localeCompare(H.name)),C=w.filter(O=>!a||O.module.toLowerCase().includes(a)||g.some(H=>H.module===O.module&&H.id.toLowerCase().includes(a)));if(!C.length)continue;let z=a||Zt===S.package;if(u.push(`<button class="row pkg ${Zt===S.package?"current":""}" data-pkg="${pt(S.package)}" aria-expanded="${!!z}"><span class="chevron">${z?"\u2304":"\u203A"}</span><span class="nm">${pt(S.name)}</span><span class="symbol-meta">${w.length} modules</span></button>`),!!z)for(let O of C){let H=a||en===O.module;if(u.push(`<button class="row mod ${en===O.module?"current":""}" data-mod="${pt(O.module)}" aria-expanded="${!!H}" title="${pt(O.module)}"><span class="chevron">${H?"\u2304":"\u203A"}</span><span class="nm">${pt(O.name)}.py</span></button>`),!H)continue;!a&&(O.dead||O.clones||O.load_bearing)&&u.push(`<div class="module-signals">${f0(O)}</div>`);let B=g.filter(q=>q.module===O.module&&(!a||q.id.toLowerCase().includes(a))).sort((q,se)=>q.line-se.line);u.push(...B.map(f))}}F("#tree").innerHTML=u.join("")||'<p class="empty-search">No matching modules or symbols.</p>',F("#browseSummary").textContent=`${ne.districts.length} packages \xB7 ${ne.panes.length} modules \xB7 ${ne.nodes.length} functions`,F("#tree").querySelectorAll("[data-pkg]").forEach(S=>S.addEventListener("click",()=>{let w=S.dataset.pkg,C=Zt===w;bs(),Qi(C?null:{kind:"package",id:w}),Fn("browse")})),F("#tree").querySelectorAll("[data-mod]").forEach(S=>S.addEventListener("click",()=>{let w=S.dataset.mod,C=en===w;bs(),Qi(C?{kind:"package",id:xe.get(w).district}:{kind:"module",id:w}),Fn("browse")})),F("#tree").querySelectorAll("[data-symbol]").forEach(S=>S.addEventListener("click",()=>{let w=S.dataset.symbol;an=F("#browser").scrollTop,bs(),Qi({kind:"module",id:rl(w)},{fly:!1}),Wr({kind:S.dataset.kind,id:w},{fresh:!0}),Ki()})),F("#panelBack").disabled=Ft==="guide"||Ft==="prompt"||Ft==="browse"&&!Zt&&!en}function Xo(){let a=F("#crumbs"),u=['<a data-c="">all packages</a>'];if(D.scope){let g=Cu();u.push(`<span class="gt">\u203A</span><a data-c="pkg:${g}" class="${D.scope.kind==="package"?"cur":""}">${xt.get(g).name}</a>`),D.scope.kind==="module"&&u.push(`<span class="gt">\u203A</span><a class="cur">${xe.get(D.scope.id).name}.py</a>`)}a.innerHTML=u.join(" "),a.querySelectorAll("[data-c]").forEach(g=>g.addEventListener("click",()=>{bs();let f=g.dataset.c;Qi(f?{kind:"package",id:f.slice(4)}:null)}))}function il(a){let u=je.get(a),g=u.cls?`${ce.get(u.cls)?.name}.${u.name}`:u.name;return`<button class="ln" data-sel="${pt(a)}">${pt(g)} <span class="dim">${pt(u.module.split(".").pop())}</span></button>`}let Hu={same_module:"same module",cross_module:"call",into_class:"into class",intra_class:"inside class",constructs:"constructs"},vf={plate:"same plate \xB7 track",row:"same row \xB7 via side ports",cross_row:"other row \xB7 arc"},sl=a=>{let u=je.get(a);return u?u.cls?`${ce.get(u.cls)?.name}.${u.name}`:u.name:`${ce.get(a).name}()`},yf=(a,u)=>{let g=Dt.get(`${a}|${u}`);return u==="tail"?"internals":u==="more"?"more public names":g?.name??"dead"};function bf(a,u){if(a==="plateribbon"){let f=ne.plate_bundles[u];return`${Te.get(f.s).name} \u2192 ${Te.get(f.t).name}`}let g=ne.links[u];return`${xe.get(g.s).name}.${yf(g.s,g.ss)} \u2192 ${xe.get(g.t).name}.${yf(g.t,g.ts)}`}function Sf(a,u){if(a==="plateribbon"){let f=ne.plate_bundles[u];return`package pair \xB7 ${f.count} call${f.count===1?"":"s"} in ${f.bundles.length} module pair${f.bundles.length===1?"":"s"}`}let g=ne.links[u];return`${vf[g.span]} \xB7 ${g.count} call${g.count===1?"":"s"}`}let Gu=null,Ss=null,ei=null,$o=null,gr="documentation",$r=a=>{let u=je.get(a);return u?u.cls&&ce.has(u.cls)?`${ce.get(u.cls).name}.${u.name}`:u.name:ce.get(a)?.name??String(a)},rl=a=>(je.get(a)??ce.get(a))?.module;function p0(a){let u=ne.edges[a[4]];return`calls ${$r(u.t)} \xB7 ${rl(u.t).split(".").pop()}.py \xB7 ${Hu[u.kind]} (click to open)`}function Wu(a){let u=zt[a];if(!u)return'<div class="v pad">no source excerpt in the snapshot</div>';Ss=u;let g=O=>u.sites.filter(H=>H[3]===O).length,f=g("edge"),S=u.sites.length-f,w={external:"External calls",unresolved:"Unresolved targets",excluded:"Excluded targets"},C=[...new Set(u.sites.filter(O=>O[3]!=="edge").map(O=>O[3]))],z=S?`<details class="source-note"><summary>${S} calls outside this map</summary>${C.map(O=>`<p>${pt(w[O]??O)} \xB7 ${g(O)}</p>`).join("")}<p>These calls remain in the source. Hover their dotted markers for details.</p></details>`:"";return`<div class="s">Source <span class="sk">${f} linked calls</span></div>${z}<div class="code">${Rm(u,p0)}</div>`}function m0(a){let u=[];return a.exported&&u.push(`<span class="tag bold" title="exported from ${pt(a.exported_from.join(", "))}">entry surface \xB7 ${pt(a.exported_from[0]??"")}</span>`),a.hub&&u.push('<span class="tag lb">load-bearing \xB7 hub</span>'),a.orch&&u.push('<span class="tag lb">load-bearing \xB7 orchestrator</span>'),a.clone!==null&&u.push('<span class="tag clone">structural clone</span>'),a.wrapper&&u.push('<span class="tag">pass-through wrapper</span>'),a.dead&&u.push('<span class="tag dead">dead: private, unreachable</span>'),a.slot==="tail"&&u.push('<span class="tag">folded: internals</span>'),u.join("")}function Xu(){let a=F("#inspector"),u=D.inspect;if(!u||Ft!=="source"){a.classList.contains("hidden")||(a.classList.add("hidden"),$=!0,Rn()),Gu=null,Ss=null,ei=null,$o=null;return}let g=`${u.kind}:${u.id}|${D.inspectBack.length}`;if(g===Gu&&!a.classList.contains("hidden"))return;Gu=g,Ss=null,ei=null,$o=null,a.classList.remove("hidden"),$=!0,Rn();let f=u.kind==="node"||u.kind==="class"?rl(u.id):u.kind==="call"?ne.edges[u.id].ms:null,S=xe.get(f),w=`<nav class="source-crumbs" aria-label="Source location"><button data-browse="root">${pt(ne.package)}</button>${S?`<span>/</span><button data-browse="package">${pt(xt.get(S.district).name)}</button><span>/</span><button data-browse="module">${pt(S.name)}.py</button>`:""}</nav>`,C="",z="";if(u.kind==="node"){let B=je.get(u.id),q=zt[B.id],se=m0(B);C=`<div class="t">${pt($r(B.id))}</div><div class="q">${pt(B.module)} \xB7 ${q?`lines ${q.start}\u2013${q.end}`:`line ${B.line}`}</div>${se?`<div class="tags">${se}</div>`:""}`,z+=Wu(B.id);let pe=ne.callers[B.id],_e=[...new Set(ne.edges.filter(nt=>nt.s===B.id).map(nt=>nt.t))],rt=ne.reach[B.id].filter(([,nt])=>nt>0).map(([nt])=>ne.nodes[nt].id),Fe=nt=>nt.map(vt=>je.has(vt)?il(vt):`<button class="ln" data-cls="${pt(vt)}">${pt($r(vt))}</button>`).join("");z+=`<div class="relationships"><details${pe.length?" open":""}><summary>Callers <span>${pe.length}</span></summary>${Fe(pe)||"<p>No resolved callers</p>"}</details><details><summary>Calls <span>${_e.length}</span></summary>${Fe(_e)||"<p>No resolved calls</p>"}</details><details><summary>Reaches ${rt.length} functions</summary>${Fe(rt)||"<p>No further functions</p>"}</details></div>`}else if(u.kind==="call"){let B=ne.edges[u.id];C=`<div class="t">${pt(sl(B.s))} \u2192 ${pt(sl(B.t))}</div><div class="q">${pt(xe.get(B.ms).name)}.py \u2192 ${pt(xe.get(B.mt).name)}.py \xB7 ${Hu[B.kind]}${B.ms!==B.mt?" \xB7 "+vf[B.span]:""}</div>`,z+=`<div class="s">caller</div>${il(B.s)}`,z+=`<div class="s">callee</div>${je.get(B.t)?il(B.t):`<div class="ln" data-cls="${pt(B.t)}">${pt(ce.get(B.t).name)}</div>`}`,z+=Wu(B.s)}else if(u.kind==="link"||u.kind==="plateribbon"){C=`<div class="t">${pt(bf(u.kind,u.id))}</div><div class="q">${pt(Sf(u.kind,u.id))}</div>`;let B=u.kind==="link"?[ne.links[u.id].members]:ne.plate_bundles[u.id].bundles.map(q=>ne.bundles[q].members);for(let q of B){let se=ne.edges[q[0]];z+=`<div class="s">${pt(xe.get(se.ms).name)}.py \u2192 ${pt(xe.get(se.mt).name)}.py</div>`;for(let pe of q){let _e=ne.edges[pe];z+=`<div class="ln" data-sel="${pt(_e.s)}">${pt($r(_e.s))} <span class="dim">\u2192</span> ${pt($r(_e.t))} <span class="dim">${Hu[_e.kind]}</span></div>`}}}else{let B=ce.get(u.id),q=zt[B.id];C=`<div class="t">${pt(B.name)}</div><div class="q">${pt(B.module)} \xB7 ${q?`lines ${q.start}\u2013${q.end}`:`line ${B.line}`}</div><div class="tags">${B.exported?`<span class="tag bold" title="exported from ${pt(B.exported_from.join(", "))}">entry surface \xB7 ${pt(B.exported_from[0]??"")}</span>`:""}<span class="tag">${B.data_only?"data class":"class"}</span>${B.dead_private.length?`<span class="tag dead">${B.dead_private.length} dead private</span>`:""}</div>`;let se=_e=>{let rt=je.get(_e);return`<span class="ml" data-sel="${pt(_e)}">${pt(rt.name)}${_e===B.ctor?"()":""}</span>`};B.public.length&&(z+=`<div class="s">constructor and public methods</div><div class="mls">${B.public.map(se).join("")}</div>`),B.private.length&&(z+=`<div class="s">private methods</div><div class="mls">${B.private.map(se).join("")}</div>`),B.dead_private.length&&(z+=`<div class="s">dead private methods</div><div class="mls">${B.dead_private.map(se).join("")}</div>`),B.fields.length&&(z+=`<div class="s">state</div><div class="mls">${B.fields.map(_e=>`<span class="fd">${_e.kind==="owned"?"\u25C6 ":_e.kind==="injected"?"\u25C7 ":""}${pt(_e.name)}</span>`).join("")}</div>`);let pe=[...new Set(ne.edges.filter(_e=>_e.cls===B.id&&(_e.kind==="constructs"||_e.kind==="into_class"&&_e.t===B.ctor)).map(_e=>_e.s))];z+=`<div class="s">constructed by</div>${pe.length?pe.map(il).join(""):'<div class="v">no resolved constructor call</div>'}`,z+=Wu(B.id)}let O=u.kind==="node"||u.kind==="class"?zt[u.id]:null,H="";O&&(C+=`<pre class="signature"><code>${pt(O.signature)}</code></pre>`,H=`<div class="source-tabs" role="tablist" aria-label="Symbol details">${[["documentation","Documentation"],["code","Code"]].map(([B,q])=>`<button id="source-tab-${B}" role="tab" data-source-tab="${B}" aria-controls="source-${B}" aria-selected="${gr===B}" tabindex="${gr===B?0:-1}">${q}</button>`).join("")}</div>`,z=`<section id="source-documentation" role="tabpanel" aria-labelledby="source-tab-documentation" class="docstring${gr==="documentation"?"":" hidden"}">${Ig(O.docstring)}</section><section id="source-code" role="tabpanel" aria-labelledby="source-tab-code" class="${gr==="code"?"":"hidden"}">${z}</section>`),a.innerHTML=`<div class="ihead">${w}${C}</div>${H}<div class="ibody">${z}</div>`,a.querySelectorAll("[data-source-tab]").forEach(B=>B.addEventListener("click",()=>{gr=B.dataset.sourceTab;for(let q of a.querySelectorAll("[data-source-tab]")){let se=q.dataset.sourceTab===gr;q.setAttribute("aria-selected",String(se)),q.tabIndex=se?0:-1,F(`#source-${q.dataset.sourceTab}`).classList.toggle("hidden",!se)}D.hoverCall=null,$o=null,Tn("hover")})),a.querySelector(".source-tabs")?.addEventListener("keydown",B=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(B.key))return;B.preventDefault(),B.stopPropagation();let q=B.key==="Home"?"documentation":B.key==="End"?"code":gr==="code"?"documentation":"code",se=F(`#source-tab-${q}`);se.click(),se.focus()}),a.querySelectorAll("[data-browse]").forEach(B=>B.addEventListener("click",()=>{Zt=B.dataset.browse==="root"?null:S.district,en=B.dataset.browse==="module"?f:null,F("#symbolSearch").value="",an=0,Fn("browse")})),a.querySelectorAll("[data-sel]").forEach(B=>B.addEventListener("click",()=>Wr({kind:"node",id:B.dataset.sel}))),a.querySelectorAll("[data-cls]").forEach(B=>B.addEventListener("click",()=>Wr({kind:"class",id:B.dataset.cls}))),ei=a.querySelector(".code");for(let B of a.querySelectorAll("code[data-indent]"))B.style.paddingLeft=B.dataset.indent+"ch",B.style.textIndent="-"+B.dataset.indent+"ch";ei?.querySelectorAll(".site.e").forEach(B=>{let q=ne.edges[Ss.sites[+B.dataset.si][4]].t,se=je.get(q),pe=se?se.dead?"dead":se.clone!==null?"clone":se.lb?"lb":null:null;pe&&B.classList.add(`sg-${pe}`)}),ei&&(ei.addEventListener("click",B=>{let q=B.target.closest(".site.e");if(!q)return;let se=ne.edges[Ss.sites[+q.dataset.si][4]].t;Wr({kind:ce.has(se)?"class":"node",id:se})}),ei.addEventListener("mouseover",B=>Mf(B.target)),ei.addEventListener("mouseleave",()=>Mf(null)))}function Mf(a){let u=a?.closest?.(".cl"),g=a?.closest?.(".site.e"),f=!u||!Ss?[]:g?[+g.dataset.si]:u.dataset.sites?u.dataset.sites.split(",").map(Number):[],S=f.length?f.join(","):null;if((D.hoverCall?.key??null)!==S){if(!S)D.hoverCall=null;else{let w=new Set(f.map(C=>Ss.sites[C][4]));D.hoverCall={key:S,sites:new Set(f),edges:w,targets:new Set([...w].map(C=>ne.edges[C].t)),line:+u.dataset.l}}Tn("hover")}}function g0(){if(!ei||!Ss||ei.closest(".hidden"))return;let a=new Set,u=!1;if(D.hoverCall)a=D.hoverCall.sites;else if(D.hover||D.hoverBox||D.hoverLine){u=!0;let S=D.hover,w=D.hoverBox,C=D.hoverLine,z=C&&C.startsWith("link:")?new Set(ne.links[+C.slice(5)].members):C&&C.startsWith("call:")?new Set([+C.slice(5)]):null;Ss.sites.forEach((O,H)=>{if(O[3]!=="edge")return;let B=ne.edges[O[4]],q=B.t;(S&&(q===S||je.get(q)?.cls===S||B.cls===S)||w&&rl(q)===w||z&&z.has(O[4]))&&a.add(H)})}let g=[...a].sort((S,w)=>S-w).join(",");if(g===$o)return;$o=g,ei.querySelectorAll(".hot").forEach(S=>S.classList.remove("hot"));let f=null;for(let S of a){let w=ei.querySelector(`.site[data-si="${S}"]`);if(!w)continue;w.classList.add("hot");let C=w.closest(".cl");C.classList.add("hot"),(!f||+C.dataset.l<+f.dataset.l)&&(f=C)}u&&f&&_0(f)}function _0(a){let u=F("#inspector .ibody");if(!u)return;let g=u.getBoundingClientRect(),f=a.getBoundingClientRect();f.top>=g.top+24&&f.bottom<=g.bottom-24||(u.scrollTop+=f.top-g.top-u.clientHeight/3)}function qr(a,u=!1){V=Math.round(de(a,E,R));let g=Math.min(hn?Ne*.7:V,Ne-280);F("#panel").style.width=Ne<720?"calc(100% - 24px)":`${Math.max(280,g)}px`,F("#panel .grip").setAttribute("aria-valuemin","280"),F("#panel .grip").setAttribute("aria-valuemax",String(Math.max(280,Ne-280))),F("#panel .grip").setAttribute("aria-valuenow",String(Math.round(g))),M.style.setProperty("--panel-space",Ft&&Ne>=720?`${Math.max(280,g)+12}px`:"0px"),u&&localStorage.setItem(I,String(V)),$=!0,Rn()}function x0(a){a.addEventListener("keydown",u=>{u.key!=="ArrowLeft"&&u.key!=="ArrowRight"||(u.preventDefault(),u.stopPropagation(),hn=!1,qr(V+(u.key==="ArrowLeft"?40:-40),!0),Ki(0))}),a.addEventListener("pointerdown",u=>{u.preventDefault(),hn=!1,a.setPointerCapture(u.pointerId);let g=u.clientX,f=F("#panel").getBoundingClientRect().width,S=C=>{qr(f+g-C.clientX),Ki(0)},w=()=>{a.removeEventListener("pointermove",S),a.removeEventListener("pointerup",w),a.removeEventListener("pointercancel",w),qr(V,!0),Ki(0)};a.addEventListener("pointermove",S),a.addEventListener("pointerup",w),a.addEventListener("pointercancel",w)})}function v0(a,u=34,g=14,f=u,S=g){let w=document.createElement("canvas");w.width=f*2,w.height=S*2,w.style.width=`${f}px`,w.style.height=`${S}px`;let C=w.getContext("2d");return C.scale(2*f/u,2*S/g),a(C),w}let lt=a=>"#"+a.toString(16).padStart(6,"0"),y0=(a,u)=>"#"+Ae(parseInt(a.slice(1),16)).lerp(Ae(t.bg),u).getHexString(),qo=(a,u)=>`rgba(${a>>16&255},${a>>8&255},${a&255},${u})`;function wf(){let a=c[U()],u=l[a.box],g=lt(t.modFront),f=(N,fe=i.link)=>qe=>{qe.fillStyle=g,qe.fillRect(3,2,28,10),qe.strokeStyle=lt(fe),qe.lineWidth=1,qe.strokeRect(3.5,2.5,27,9),N&&N(qe)},S=(N,fe=400,qe=8,Tt=s.text)=>G=>{G.fillStyle=Tt,G.font=`${fe} ${qe}px ${_}`,G.fillText(N,6,10)},w=(N,fe=26,qe=1)=>Tt=>{Tt.fillStyle=lt(t[N]),Tt.fillRect(fe,qe,6,6)},C=(N=u.edge[0],fe)=>qe=>{qe.fillStyle=g,qe.fillRect(7,1,20,12.5),qe.fillStyle=lt(u.head),qe.fillRect(7,1,20,3.2),qe.strokeStyle=lt(N),qe.lineWidth=1,qe.strokeRect(7.5,1.5,19,11.5),fe&&fe(qe)},z=(N,fe=1,qe=null,Tt=lt(t.card),G=9)=>Ee=>{Ee.fillStyle=Tt,Ee.strokeStyle=N,Ee.lineWidth=fe,qe&&Ee.setLineDash(qe),Ee.fillRect(4,7-G/2,26,G),Ee.strokeRect(4,7-G/2,26,G),Ee.setLineDash([])},O=(N,fe,qe,Tt,G)=>{N.beginPath(),N.moveTo(fe,qe),N.lineTo(fe-3*Tt+2*G,qe-3*G-2*Tt),N.lineTo(fe-3*Tt-2*G,qe-3*G+2*Tt),N.closePath(),N.fill()},H=(N,fe)=>N==="arc"?[3+28*fe,13-13*Math.sin(Math.PI*fe)**.8]:N==="flat"?[3+28*fe,7]:N==="metro"?fe<.2?[5,13-45*fe]:fe<.8?[5+24*(fe-.2)/.6,4]:[29,4+45*(fe-.8)]:N==="row"?fe<.15?[4,13-60*fe]:fe<.85?[4+26*(fe-.15)/.7,4]:[30,4+60*(fe-.85)]:[3,7],B=(N,fe,qe,Tt=null)=>G=>{Tt&&Tt(G);let Ee=24,Pe=[];for(let It=0;It<=Ee;It++)Pe.push(H(qe,It/Ee));let ke=[],Mt=[];Pe.forEach((It,bn)=>{let _n=Pe[Math.min(bn+1,Ee)],nn=Pe[Math.max(bn-1,0)],Kt=_n[0]-nn[0],Nn=_n[1]-nn[1],Bt=Math.hypot(Kt,Nn)||1,cn=fe/2*(1-.5*bn/Ee);ke.push([It[0]-Nn/Bt*cn,It[1]+Kt/Bt*cn]),Mt.push([It[0]+Nn/Bt*cn,It[1]-Kt/Bt*cn])});let Nt=G.createLinearGradient(3,0,31,0);Nt.addColorStop(0,N),Nt.addColorStop(1,y0(N,.5)),G.fillStyle=Nt,G.beginPath(),ke.forEach((It,bn)=>bn?G.lineTo(...It):G.moveTo(...It)),Mt.reverse().forEach(It=>G.lineTo(...It)),G.closePath(),G.fill()},q=N=>{let fe=N.createRadialGradient(17,7,0,17,7,5);fe.addColorStop(0,qo(t.lit,1)),fe.addColorStop(1,qo(t.lit,0)),N.fillStyle=fe,N.fillRect(10,0,14,14)},se=N=>{N.fillStyle=lt(t.plate),N.strokeStyle=lt(i.edge),N.lineWidth=1,N.fillRect(1,11,13,3),N.fillRect(20,11,13,3)},pe=N=>{for(let fe of[2,20])N.fillStyle=g,N.fillRect(fe,2,12,11),N.strokeStyle=lt(i.link),N.lineWidth=1,N.strokeRect(fe+.5,2.5,11,10);N.strokeStyle=lt(a.link),N.lineWidth=1.4,N.beginPath(),N.moveTo(14,9),N.lineTo(16,9),N.lineTo(16,.8),N.lineTo(18,.8),N.lineTo(18,6),N.lineTo(20,6),N.stroke()},_e=N=>fe=>{for(let qe of[1,22])fe.fillStyle=lt(t.modFront),fe.fillRect(qe,1,11,12.5),fe.strokeStyle=lt(i.link),fe.lineWidth=1,fe.strokeRect(qe,1,11,12.5);fe.strokeStyle=N,fe.lineWidth=1.2;for(let[qe,Tt]of[[4,3.5],[7,9],[10.5,12]])fe.beginPath(),fe.moveTo(12,qe),fe.bezierCurveTo(17,qe,17,Tt,22,Tt),fe.stroke()},rt=N=>fe=>{fe.strokeStyle=lt(i.strong),fe.lineWidth=1;for(let qe of[1,5.5,10])fe.strokeRect(16,qe,16,3.2);fe.strokeStyle=N,fe.lineWidth=1.1;for(let[qe,Tt,G]of[[2.6,7.1,12],[2.6,11.6,8],[7.1,11.6,12]])fe.beginPath(),fe.moveTo(16,qe),fe.lineTo(G,qe),fe.lineTo(G,Tt),fe.lineTo(16,Tt),fe.stroke()},Fe=N=>{N.fillStyle=lt(t.boxLine),N.strokeStyle=s.muted,N.lineWidth=1.2,N.fillRect(2,2,7,4),N.fillRect(15,2,7,4),N.fillRect(24,9.5,8,4),N.beginPath(),N.moveTo(9.5,4),N.lineTo(13,4),N.moveTo(22.5,4),N.lineTo(28,4),N.lineTo(28,7),N.stroke(),N.fillStyle=s.muted,O(N,14.5,4,1,0),O(N,28,9,0,1)},nt=N=>{let fe=N.createLinearGradient(0,13,0,2);fe.addColorStop(0,lt(a.link)),fe.addColorStop(.6,lt(a.link)),fe.addColorStop(1,qo(a.link,0)),N.strokeStyle=fe,N.lineWidth=1.6,N.beginPath(),N.moveTo(5,13),N.lineTo(5,2),N.stroke(),N.fillStyle=s.muted,N.font=`400 7px ${_}`,N.fillText("\u2192 pkg",9,6.5)},vt=N=>{N.fillStyle=lt(t.plate),N.strokeStyle=lt(i.link),N.lineWidth=1,N.beginPath(),N.moveTo(3,12),N.lineTo(28,12),N.lineTo(32,5),N.lineTo(7,5),N.closePath(),N.fill(),N.stroke(),N.fillStyle=s.text,N.fillRect(6,9.5,9,1.4)},et=N=>fe=>{fe.strokeStyle=N,fe.lineWidth=1.2,fe.setLineDash([4,3]),fe.beginPath(),fe.moveTo(3,10),fe.bezierCurveTo(12,4,20,4,27,8),fe.stroke(),fe.setLineDash([]),fe.fillStyle=N,fe.beginPath(),fe.moveTo(31,10),fe.lineTo(25,5.5),fe.lineTo(24,10.5),fe.closePath(),fe.fill()},Lt=N=>{N.fillStyle=g,N.fillRect(1,2,24,10),N.fillStyle=qo(t.deadFill,t.deadFillA),N.fillRect(1,2,24,10),N.strokeStyle=lt(t.dead),N.lineWidth=1.2,N.strokeRect(1.5,2.5,23,9),N.setLineDash([]),w("dead",27,4)(N)},Et=N=>{N.fillStyle=g,N.fillRect(1,2,24,10),N.fillStyle=qo(t.cloneFill,t.cloneFillA),N.fillRect(1,2,24,10),N.strokeStyle=lt(i.link),N.lineWidth=1,N.strokeRect(1.5,2.5,23,9),N.strokeStyle=lt(t.clone),N.lineWidth=2,N.beginPath(),N.moveTo(3,10),N.lineTo(23,10),N.stroke(),N.setLineDash([]),w("clone",27,4)(N)},Le=N=>{N.strokeStyle=lt(t.clone),N.lineWidth=2,N.lineCap="round",N.setLineDash([.1,3]),N.beginPath(),N.moveTo(3,12),N.bezierCurveTo(6,0,28,0,31,12),N.stroke(),N.setLineDash([]),N.lineCap="butt"},Y=f(N=>{N.fillStyle=lt(t.lb),N.fillRect(4,3,3,8)}),re=N=>{N.fillStyle=lt(t.boxFront),N.fillRect(3,1,17,12),N.fillStyle=lt(t.boxHead),N.fillRect(3,1,17,3),N.strokeStyle=lt(i.strong),N.lineWidth=1,N.strokeRect(3.5,1.5,16,11),N.fillStyle=lt(t.boxHead),N.fillRect(4,8.5,15,1.6),N.fillStyle=s.muted,N.font=`400 6px ${_}`,N.fillText("\u25C6",23,6),N.fillText("\u25C7",23,12)},Se=N=>{N.strokeStyle=lt(t.write),N.lineWidth=1,N.beginPath(),N.moveTo(3,4),N.bezierCurveTo(10,4,12,10,19,10),N.stroke(),N.fillStyle=s.text,N.font=`400 8px ${_}`,N.fillText("\u25C6 \u25C7",20,11)},be=N=>fe=>{fe.strokeStyle=N,fe.lineWidth=1.4,fe.beginPath(),fe.moveTo(2,4),fe.bezierCurveTo(10,4,12,9,20,9),fe.stroke(),fe.fillStyle=lt(t.boxFront),fe.fillRect(20,3,12,10),fe.strokeStyle=lt(i.strong),fe.lineWidth=1,fe.strokeRect(20.5,3.5,11,9),fe.fillStyle=N,fe.fillRect(19,7.5,3,3)},Xe=N=>fe=>{fe.strokeStyle=N,fe.lineWidth=1.4,fe.beginPath(),fe.moveTo(2,2),fe.bezierCurveTo(10,2,14,2,18,5),fe.stroke(),fe.fillStyle=lt(t.boxFront),fe.fillRect(14,5,18,8),fe.strokeStyle=lt(i.strong),fe.lineWidth=1,fe.strokeRect(14.5,5.5,17,7),fe.fillStyle=N,fe.fillRect(15,4,16,1.6)},it=N=>fe=>{fe.fillStyle=lt(t.boxFront),fe.fillRect(14,1,18,12),fe.strokeStyle=lt(i.strong),fe.lineWidth=1,fe.strokeRect(14.5,1.5,17,11),fe.strokeStyle=N,fe.lineWidth=1.1,fe.beginPath(),fe.moveTo(14,4),fe.bezierCurveTo(6,4,6,10,14,10),fe.stroke()},st=N=>{N.fillStyle=r.pill,N.strokeStyle=r.pillLineStrong,N.lineWidth=1,N.beginPath(),N.roundRect(3,2,28,10,2.5),N.fill(),N.stroke(),N.fillStyle=s.lit,N.font=`700 7px ${_}`,N.fillText("name",7,9.5)},Yt=f(N=>{N.strokeStyle=lt(t.lit),N.lineWidth=1.6,N.strokeRect(4,3,26,8)});return{call:B(lt(i.link),2.4,"arc"),load_bearing:Y,dead:Lt,clone:Et,clone_chord:Le,import_cycle:et(lt(t.red)),outline:N=>{N.strokeStyle=lt(i.link),N.globalAlpha=.6,N.lineWidth=1,N.strokeRect(7.5,1.5,19,11.5),N.globalAlpha=1},stub_pill:N=>{N.fillStyle=g,N.fillRect(1,3,7,9),N.strokeStyle=lt(i.link),N.lineWidth=1,N.strokeRect(1.5,3.5,6,8),N.strokeStyle=s.muted,N.beginPath(),N.moveTo(8,7.5),N.lineTo(12,7.5),N.stroke(),N.fillStyle=r.pill,N.strokeStyle=r.pillLine,N.beginPath(),N.roundRect(12,3,21,9,2.5),N.fill(),N.stroke(),N.fillStyle=s.text,N.font=`700 6px ${_}`,N.fillText("\u2192 fn",14,9.5)},site_linked:N=>{N.fillStyle=s.text,N.font=`400 8px ${_}`,N.fillText("fn()",6,9),N.fillStyle=lt(i.link),N.fillRect(6,11,14,1),N.fillStyle=lt(t.lb),N.fillRect(22,10.5,9,1.5)},site_other:N=>{N.fillStyle=s.muted,N.font=`400 8px ${_}`,N.fillText("len()",4,9),N.fillStyle=lt(i.link),N.beginPath(),N.arc(29,4,1.6,0,7),N.fill()},call_pill:N=>{N.fillStyle=r.pill,N.strokeStyle=r.pillLineStrong,N.lineWidth=1,N.beginPath(),N.roundRect(1,2,32,10,2.5),N.fill(),N.stroke(),N.fillStyle=s.lit,N.font=`700 6px ${_}`,N.fillText("a \u2192 b",4,9.3)},lit:Yt,trace:B(lt(t.lit),3,"flat"),pulse:N=>{B(lt(t.lit),2,"flat")(N),q(N)},evidence:st,plate:vt,box:C(),row:f(S("fn")),exported:f(S("fn",700)),class_row:f(N=>{N.fillStyle=lt(t.classRow),N.fillRect(6,4,22,6),N.strokeStyle=lt(i.edge),N.strokeRect(6.5,4.5,21,5)}),more:f(N=>{N.strokeStyle=lt(i.link),N.lineWidth=1;for(let fe of[5.5,7.5,9.5])N.beginPath(),N.moveTo(5,fe),N.lineTo(29,fe),N.stroke()}),tail:f(N=>{N.fillStyle=lt(t.boxHead),N.fillRect(4,3,26,8)}),wrapper:f(S("fn",400,6)),card:z(lt(a.card[0])),class_block:z(lt(a.block[0]),1.2),class_open:re,fields:Se,plate_ribbon:B(lt(a.ribbon===i.rule?i.link:a.ribbon),5,"arc"),link_track:B(lt(a.link),2.4,"metro"),link_row:B(lt(a.link),2.4,"row",se),link_arc:B(lt(a.link),2.4,"arc"),margin_arc:rt(lt(a.call)),curve:_e(lt(a.call)),into_class:be(lt(a.call)),constructs:Xe(lt(a.call)),intra:it(lt(a.call)),stub:nt,import:et(lt(i.link)),flow:Fe,ports:pe,click:C(i.link,N=>{N.strokeStyle=s.lit,N.lineWidth=1.2,N.strokeRect(7.5,1.5,19,3.2)})}}let ol=[["load_bearing","signals","Load-bearing","blue bar: widely called function or one that calls many others"],["dead","signals","Possibly unused","amber fill: unreachable from known entry points; possibly unused"],["clone","signals","Structural clone","purple fill / tick: matching code structure elsewhere"],["clone_chord","signals","clone pair","clone pair: dotted purple chord"],["import_cycle","signals","Import cycle","import cycle: red dashed line"],["lit","attention","lit","lit: named, selected or hovered"],["trace","attention","traced path","traced path: the heaviest lit line"],["pulse","attention","pulses","pulses: caller \u2192 callee, 3 runs"],["evidence","attention","name pill","pill: a lit name too small to print"],["call_pill","attention","hovered call","hovered call: caller \u2192 callee pill"],["plate","units","package","package: one enclosing box and labeled base"],["box","units","module","module: a box, rows fold inside"],["outline","units","outside scope","module outside the scope: outline only"],["row","units","public name","public name: a row on its box"],["exported","units","exported (bold)","bold name: exported (__all__)"],["class_row","units","class","class: an inset row"],["more","units","more names","more public names: hairlines"],["tail","units","internals","internals: muted band at the bottom"],["wrapper","units","wrapper","wrapper: small type"],["card","units","function","unfolded module: cards by depth"],["class_block","units","class block","class: a block of public rows"],["class_open","units","class opened","class opened: private rows below"],["fields","units","state","state: \u25C6 owned, \u25C7 injected"],["call","calls","Function call","solid line: resolved function call"],["plate_ribbon","calls","package pair","package to package: one ribbon"],["link_track","calls","module pair","call in the package: track above"],["link_row","calls","along the row","call along the row: side track"],["link_arc","calls","to another row","call to another row: arc overhead"],["curve","calls","call by call","two modules in focus: a curve per call"],["margin_arc","calls","margin lane","call inside the module: margin lane"],["into_class","calls","into a class","call into a class: side port"],["constructs","calls","constructs","constructs: bar on class header"],["intra","calls","inside a class","call inside the class: edge loop"],["stub","calls","leaves scope","call leaving: stub, \u2192 package"],["stub_pill","calls","off-row call","off-row call: pill \u2192 name \xB7 pkg"],["site_linked","source","drawn call","source: underline = a drawn call (hue: callee signal)"],["site_other","source","not drawn","source: dot = external or unresolved call"],["import","calls","import","import: dashed, on the ground"],["flow","reading","","flow: \u2192 in a row, \u2193 row to row","onp"],["ports","reading","","in on the left, out on the right","pm"],["click","reading","","box: scope \xB7 header: unfold","op"]],b0={signals:"signals",attention:"attention",units:"units",calls:"calls",source:"source",reading:"reading"},Ef={plate:"link_track",row:"link_row",cross_row:"link_arc"};function S0(a){let u=me(),g=A,f=Ne-u,S=v,w=Je-P;for(let C of a){let z=jt(C[0],C[1],C[2]);if(z[2]<=1&&z[0]>=g&&z[0]<=f&&z[1]>=S&&z[1]<=w)return!0}return!1}function M0(a=.1){let u=new Set,g=w=>S0(w),f=w=>{let C=[];for(let z=0;z<w.n;z+=Math.max(1,Math.floor(w.n/12)))C.push([w.pts[z*3],w.pts[z*3+1],w.pts[z*3+2]]);return C.push([w.pts[w.n*3-3],w.pts[w.n*3-2],w.pts[w.n*3-1]]),C},S=w=>w.userData.paintKey&&Number(w.userData.paintKey.split("|")[0])===t.lit;for(let w of Ci.values())w.a>=a&&g([[w.d.x,mt.ground,w.d.z],[w.d.x+w.d.w,mt.ground,w.d.z]])&&u.add("plate");for(let w of Xt.values()){if(w.a<a)continue;let C=w.b,z=w.p.z+C.d;if(!g([[C.x,0,z],[C.x+C.w,0,z],[C.x,-w.h,z],[C.x+C.w,-w.h,z]]))continue;if(w.sil){u.add("outline");continue}u.add("box"),w.edges.material.color.getHex()===t.lit&&u.add("lit");let O=w.a*(1-Me(w.u));if(O<a)continue;let H=(q,se)=>g([[C.x,-q,z],[C.x+C.w,-q,z],[C.x,-q-se,z],[C.x+C.w,-q-se,z]]),B=w.rowsA*O>=a;for(let q of C.rows)H(q.y,q.h)&&(B&&(u.add(q.kind==="class"?"class_row":"row"),d(q)&&u.add("exported"),q.wrapper&&u.add("wrapper")),q.lb&&u.add("load_bearing"),q.clone&&u.add("clone"));for(let q of[C.more,C.tail])!q||!H(q.y,q.h)||(u.add(q===C.more?"more":"tail"),q.lb&&u.add("load_bearing"),q.clone&&u.add("clone"));for(let q of C.ghosts)H(q.y,q.h)&&u.add("dead");H(0,ze.mod_header)&&(C.ghosts.length&&u.add("dead"),(C.rows.some(q=>q.clone)||C.tail?.clone||C.more?.clone)&&u.add("clone"));for(let q of w.lit.values())q.visible&&q.material.opacity>=a&&u.add("lit")}for(let w of _s.values()){let C=w.n;!w.border.visible||w.border.material.opacity<a||!g([[C.x,C.y,C.z],[C.x+C.w,C.y-C.h,C.z]])||(u.add("card"),C.dead?u.add("dead"):C.lb&&u.add("load_bearing"),C.clone!==null&&u.add("clone"),d(C)&&u.add("exported"),C.wrapper&&u.add("wrapper"),S(w.border)&&u.add("lit"))}for(let w of le.values()){let C=w.cl;if(!(!w.group.visible||w.mats[4].opacity<a||!g([[C.x,C.y,C.z],[C.x+C.w,C.y-C.h,C.z]]))){u.add("class_block"),w.open&&C.private.length&&u.add("class_open"),C.fields.length&&(C.data_only||w.open)&&u.add("fields");for(let z of ae(C).rows){let O=je.get(z);O.lb&&u.add("load_bearing"),O.clone!==null&&u.add("clone"),d(O)&&u.add("exported")}!w.open&&C.private.length&&u.add("tail"),w.edges.material.color.getHex()===t.lit&&u.add("lit")}}for(let w of fn){if(!w.line.visible||w.line.material.opacity<a||!g(f(w)))continue;let C=w.e;C.kind==="intra_class"?u.add("intra"):(C.kind==="constructs"&&u.add("constructs"),C.kind==="into_class"&&u.add("into_class"),u.add(w.inner?"margin_arc":Ef[C.span])),w.stub&&u.add("stub"),w.lastA===t.lit&&u.add("lit"),w.lastA===t.dead&&u.add("dead"),Re?.trace?.has(w)&&u.add("trace")}for(let w of gi)!w.line.visible||w.line.material.opacity<a||!g(f(w))||(u.add(Ef[w.l.span]),w.stub&&u.add("stub"),w.lastA===t.lit&&u.add("lit"),Re?.traceLinks?.has(w.li)&&u.add("trace"));for(let w of Wt)!w.line.visible||w.line.material.opacity<a||!g(f(w))||(u.add("curve"),w.lastA===t.lit&&u.add("lit"),w.lastA===t.dead&&u.add("dead"),Re?.trace?.has(fn[w.ei])&&u.add("trace"));for(let w of Ur)w.line.visible&&w.line.material.opacity>=a&&g(f(w))&&(u.add("plate_ribbon"),w.lastA===t.lit&&u.add("lit"));for(let w of Or)w.line.visible&&w.line.material.opacity>=a&&g(f({pts:w.pts,n:w.pts.length/3}))&&u.add("clone_chord");for(let w of Fo)w.line.visible&&w.line.material.opacity>=a&&g(f({pts:w.pts,n:w.pts.length/3}))&&u.add(w.imp.cycle?"import_cycle":"import");return xs&&u.add("pulse"),vs.some(w=>w.kind==="callout")&&u.add("evidence"),vs.some(w=>w.kind==="pill")&&u.add("call_pill"),vs.some(w=>w.kind==="stubpill")&&u.add("stub_pill"),ei&&!F("#inspector").classList.contains("hidden")&&(ei.querySelector(".site.e")&&u.add("site_linked"),ei.querySelector(".site.x")&&u.add("site_other")),u}let $u=(a,u,g,f="k",S=[34,14])=>{let w=document.createElement("div");w.className=f+(a[1]==="signals"?" sig":""),w.dataset.mark=a[0],w.appendChild(v0(g[a[0]],34,14,...S));let C=document.createElement("span");return C.textContent=u,w.appendChild(C),w},Yo=new Set,qu=null;function w0(a=Yo){let u=F("#key"),g=wf(),f={overview:"o",plan:"n",package:"p",module:"m"}[U()],S=ol.filter(z=>z[1]==="reading"?z[4].includes(f):z[1]==="signals"||z[0]==="call"||z[0]==="import"||a.has(z[0])),w=[...new Set(S.map(z=>z[1]))];u.innerHTML='<header class="legend-title"><strong>Map legend</strong><button type="button" aria-label="Close legend">\xD7</button></header>',u.querySelector("button").addEventListener("click",()=>Xr(!1));let C=F("#legendMarks");C.replaceChildren();for(let[z,O]of[["load_bearing","Load-bearing"],["clone","Structural clone"],["dead","Possibly unused"],["import_cycle","Import cycle"],["call","Solid: function call"],["import","Dashed: import"],["clone_chord","Dotted: clone pair"],["tail","Muted band: internals"]])C.appendChild($u(ol.find(H=>H[0]===z),O,g));for(let z of w){let O=document.createElement("div"),H=document.createElement("div");H.className="kh",H.textContent=b0[z],O.appendChild(H);for(let B of S.filter(q=>q[1]===z))O.appendChild($u(B,B[3],g));u.appendChild(O)}}let E0={hub:"load_bearing"};function A0(a=Yo){let u=Ut(),g=new Set((u?.marks??[]).map(f=>E0[f]??f));return g.has("row")&&g.add("exported"),g.has("clone")&&g.add("clone_chord"),new Set([...a].filter(f=>{let S=ol.find(w=>w[0]===f);return S&&(S[1]==="signals"||S[1]==="attention"||g.has(f))}))}function Af(a=Yo){let u=document.querySelector("#gmarks");if(!u)return;let g=wf(),f=A0(a);u.innerHTML="";for(let S of ol)S[1]!=="reading"&&f.has(S[0])&&u.appendChild($u(S,S[3],g))}function Tf(a=!1){let u=M0(),g=[...u].sort().join(",")+"|"+e+"|"+U();return!a&&g===qu?!1:(qu=g,Yo=u,w0(u),Af(u),!0)}function Yr(){let a=new URLSearchParams;if(D.guide!==null){a.set("guide",St[D.guide].id),D.proj!=="ortho"&&a.set("proj",D.proj),history.replaceState(null,"","#"+a.toString());return}D.scope&&a.set("scope",`${D.scope.kind}:${D.scope.id}`),D.selected&&a.set("sel",`${D.selected.kind}:${D.selected.id}`);let u=[...D.open].filter(g=>g!==Br());u.length&&a.set("unfold",u.join(",")),D.expanded.size&&a.set("open",[...D.expanded].join(",")),a.set("view",D.view),D.proj!=="ortho"&&a.set("proj",D.proj),a.set("at",St[D.resume].id),history.replaceState(null,"","#"+a.toString())}function T0(){let a=new URLSearchParams(location.hash.slice(1));if(a.get("proj")==="persp"&&(D.proj="persp"),!location.hash.slice(1)||a.has("guide"))return{guide:Vt.get(a.get("guide"))??0};D.resume=Vt.get(a.get("at"))??0;let u=f=>{if(!f)return null;let S=f.indexOf(":"),w=f.slice(0,S),C=f.slice(S+1);return{kind:w,id:w==="link"||w==="plateribbon"||w==="call"?+C:C}};D.scope=u(a.get("scope")),D.selected=u(a.get("sel")),D.inspect=D.selected;let g=[...D.scope?.kind==="module"?[D.scope.id]:[],...(a.get("unfold")||"").split(",").filter(f=>xe.has(f))];for(let f of g){pr(f,!0);let S=Xt.get(f);S.u=1,Fr(S,S.b.open_h)}for(let f of(a.get("open")||"").split(",").filter(Boolean)){if(!ce.has(f)||!D.open.has(ce.get(f).module))continue;D.expanded.add(f);let S=Be(ce.get(f));S.lift=1,S.liftTarget=1,S.group.position.z=ce.get(f).z+ce.get(f).expanded.lift,mi(f)}return D.view=a.get("view")||"axo",{guide:null}}function Rf(){Ne=k(),Je=X(),qr(V),ee.setSize(Ne,Je,!1),Oe.width=Ne*W,Oe.height=Je*W,Hg();for(let a of Ue)a.resolution.set(Ne,Je);$=!0,Rn(),Ln&&Ki(0)}addEventListener("resize",()=>{Rf()});function Rn(){n||(n=!0,requestAnimationFrame(a=>{n=!1,R0(a)}))}function R0(a){let u=jd(a),g=zg(a),f=Vg(a/1e3),S=u?!1:ue.update();if((u||g||f||S)&&Rn(),!($||u||g||f||S)){Pf();return}!u&&(S||$)&&Bg();let w=ie.position.distanceTo(ue.target);te.fog.near=w*.9,te.fog.far=w*2.6;let C=qd();for(let z of Ue)z.dashed&&(z.dashScale=C);ee.render(te,ie),Qg(),$=!1,!u&&!g&&Pf()}let Cf=0;function Pf(){clearTimeout(Cf),Cf=setTimeout(()=>{Tf()},120)}function Yu(a,{persist:u=!0}={}){if(bd[a]){if(h(a),document.documentElement.dataset.theme=a,u)try{localStorage.setItem(pu,a)}catch{}for(let[g,f]of tn)g.color.set(t[f]);for(let[g,f,S]of fi)g.userData.paintKey=null,De(g,t[f],null,S);te.fog.color.set(t.bg),Hd();for(let g of Xt.values()){for(let f of g.sig){let S=f.userData.role;S==="cloneFill"?f.userData.k=t.cloneFillA:S==="deadFill"?f.userData.k=t.deadFillA:S==="deadLines"&&f.material.color.set(t.dead)}g.tier=null,Nr(g)}for(let g of _s.values())g.border.userData.paintKey=null,j(g);for(let g of ne.classes)Be(g);for(let g of[...fn,...gi,...Ur,...Wt])g.paintKey=null;for(let g of Fo)g.line.userData.paintKey=null;for(let g of Ci.values())g.outline.userData.paintKey=null;F("#themeBtn .tn").textContent=a,es(),Tn("hover"),Tf(!0),$=!0,Rn()}}Rf();let Ju=T0();Ft=Ju.guide!==null?"guide":D.inspect?"source":"browse",Zt=Cu(),en=Br(),Fn(Ft,!1),es(),Xo(),F("#themeBtn .tn").textContent=e;for(let a of Xt.values())Nr(a);Ju.guide!==null?mr(Ju.guide,{ms:0}):(Vu(),Tn(),dr(D.view,0)),document.querySelectorAll("#views [data-view]").forEach(a=>a.addEventListener("click",()=>{bs(),dr(a.dataset.view)})),F("#mapBtn").addEventListener("click",()=>_f()),F("#keyBtn").addEventListener("click",()=>Xr()),F("#legendMore").addEventListener("click",()=>Xr(!0)),F("#helpBtn").addEventListener("click",()=>Bu()),F("#projBtn").addEventListener("click",()=>cf()),Ln=!0,d0(),l0(),F("#projBtn").classList.toggle("on",D.proj==="ortho"),F("#projBtn").textContent=D.proj==="ortho"?"Orthographic":"Perspective",F("#themeBtn").addEventListener("click",()=>Yu(e==="dark"?"light":"dark")),matchMedia("(prefers-color-scheme: light)").addEventListener("change",a=>{let u=null;try{u=localStorage.getItem(pu)}catch{}!u&&!new URLSearchParams(location.search).get("theme")&&Yu(a.matches?"light":"dark",{persist:!1})}),F("#status").classList.add("hidden"),Rn()}iw();})();
/*! For license information please see app.bundle.js.LEGAL.txt */
