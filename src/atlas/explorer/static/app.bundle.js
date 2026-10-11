(()=>{var yi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ws={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},sf=0,Wh=1,rf=2;var ta=1,of=2,to=3,xs=0,Qn=1,mi=2,Zi=0,vs=1,no=2,Xh=3,$h=4,af=5;var Fs=100,lf=101,cf=102,hf=103,uf=104,df=200,ff=201,pf=202,mf=203,nl=204,il=205,gf=206,_f=207,xf=208,vf=209,yf=210,bf=211,Sf=212,Mf=213,wf=214,sl=0,rl=1,ol=2,hr=3,al=4,ll=5,cl=6,hl=7,qh=0,Ef=1,Tf=2,Li=0,Yh=1,Zh=2,Kh=3,Jh=4,jh=5,Qh=6,eu=7;var tu=300,Xs=301,fr=302,Nl=303,Fl=304,na=306,$r=1e3,Wi=1001,ul=1002,In=1003,Af=1004;var ia=1005;var Nn=1006,Ol=1007;var $s=1008;var gi=1009,nu=1010,iu=1011,io=1012,Bl=1013,Di=1014,Ui=1015,Ki=1016,kl=1017,zl=1018,so=1020,su=35902,ru=35899,ou=1021,au=1022,bi=1023,Xi=1026,qs=1027,lu=1028,Vl=1029,Ys=1030,Hl=1031;var Gl=1033,sa=33776,ra=33777,oa=33778,aa=33779,Wl=35840,Xl=35841,$l=35842,ql=35843,Yl=36196,Zl=37492,Kl=37496,Jl=37488,jl=37489,la=37490,Ql=37491,ec=37808,tc=37809,nc=37810,ic=37811,sc=37812,rc=37813,oc=37814,ac=37815,lc=37816,cc=37817,hc=37818,uc=37819,dc=37820,fc=37821,pc=36492,mc=36494,gc=36495,_c=36283,xc=36284,ca=36285,vc=36286;var Do=2300,dl=2301,tl=2302,Nh=2303,Fh=2400,Oh=2401,Bh=2402;var Cf=3200;var cu=0,Rf=1,bs="",Zn="srgb",Uo="srgb-linear",No="linear",Jt="srgb";var lr=7680;var kh=519,Pf=512,If=513,Lf=514,yc=515,Df=516,Uf=517,bc=518,Nf=519,fl=35044;var hu="300 es",Ci=2e3,Fo=2001;function Im(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Lm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Oo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ff(){let i=Oo("canvas");return i.style.display="block",i}var Ld={},qr=null;function Bo(...i){let e="THREE."+i.shift();qr?qr("log",e,...i):console.log(e,...i)}function Of(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function _t(...i){i=Of(i);let e="THREE."+i.shift();if(qr)qr("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function vt(...i){i=Of(i);let e="THREE."+i.shift();if(qr)qr("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function cr(...i){let e=i.join(" ");e in Ld||(Ld[e]=!0,_t(...i))}function Bf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var kf={[sl]:rl,[ol]:cl,[al]:hl,[hr]:ll,[rl]:sl,[cl]:ol,[hl]:al,[ll]:hr},Pi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Hn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Dd=1234567,Wr=Math.PI/180,Yr=180/Math.PI;function gs(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Hn[i&255]+Hn[i>>8&255]+Hn[i>>16&255]+Hn[i>>24&255]+"-"+Hn[e&255]+Hn[e>>8&255]+"-"+Hn[e>>16&15|64]+Hn[e>>24&255]+"-"+Hn[t&63|128]+Hn[t>>8&255]+"-"+Hn[t>>16&255]+Hn[t>>24&255]+Hn[n&255]+Hn[n>>8&255]+Hn[n>>16&255]+Hn[n>>24&255]).toLowerCase()}function At(i,e,t){return Math.max(e,Math.min(t,i))}function uu(i,e){return(i%e+e)%e}function Dm(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Um(i,e,t){return i!==e?(t-i)/(e-i):0}function Lo(i,e,t){return(1-t)*i+t*e}function Nm(i,e,t,n){return Lo(i,e,1-Math.exp(-t*n))}function Fm(i,e=1){return e-Math.abs(uu(i,e*2)-e)}function Om(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Bm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function km(i,e){return i+Math.floor(Math.random()*(e-i+1))}function zm(i,e){return i+Math.random()*(e-i)}function Vm(i){return i*(.5-Math.random())}function Hm(i){i!==void 0&&(Dd=i);let e=Dd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Gm(i){return i*Wr}function Wm(i){return i*Yr}function Xm(i){return(i&i-1)===0&&i!==0}function $m(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function qm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ym(i,e,t,n,s){let r=Math.cos,a=Math.sin,c=r(t/2),d=a(t/2),u=r((e+n)/2),m=a((e+n)/2),g=r((e-n)/2),p=a((e-n)/2),b=r((n-e)/2),M=a((n-e)/2);switch(s){case"XYX":i.set(c*m,d*g,d*p,c*u);break;case"YZY":i.set(d*p,c*m,d*g,c*u);break;case"ZXZ":i.set(d*g,d*p,c*m,c*u);break;case"XZX":i.set(c*m,d*M,d*b,c*u);break;case"YXY":i.set(d*b,c*m,d*M,c*u);break;case"ZYZ":i.set(d*M,d*b,c*m,c*u);break;default:_t("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ai(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function en(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Si={DEG2RAD:Wr,RAD2DEG:Yr,generateUUID:gs,clamp:At,euclideanModulo:uu,mapLinear:Dm,inverseLerp:Um,lerp:Lo,damp:Nm,pingpong:Fm,smoothstep:Om,smootherstep:Bm,randInt:km,randFloat:zm,randFloatSpread:Vm,seededRandom:Hm,degToRad:Gm,radToDeg:Wm,isPowerOfTwo:Xm,ceilPowerOfTwo:$m,floorPowerOfTwo:qm,setQuaternionFromProperEuler:Ym,normalize:en,denormalize:Ai},yt=class i{static{i.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=At(this.x,e.x,t.x),this.y=At(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=At(this.x,e,t),this.y=At(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(At(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(At(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ui=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,c){let d=n[s+0],u=n[s+1],m=n[s+2],g=n[s+3],p=r[a+0],b=r[a+1],M=r[a+2],A=r[a+3];if(g!==A||d!==p||u!==b||m!==M){let v=d*p+u*b+m*M+g*A;v<0&&(p=-p,b=-b,M=-M,A=-A,v=-v);let x=1-c;if(v<.9995){let F=Math.acos(v),H=Math.sin(F);x=Math.sin(x*F)/H,c=Math.sin(c*F)/H,d=d*x+p*c,u=u*x+b*c,m=m*x+M*c,g=g*x+A*c}else{d=d*x+p*c,u=u*x+b*c,m=m*x+M*c,g=g*x+A*c;let F=1/Math.sqrt(d*d+u*u+m*m+g*g);d*=F,u*=F,m*=F,g*=F}}e[t]=d,e[t+1]=u,e[t+2]=m,e[t+3]=g}static multiplyQuaternionsFlat(e,t,n,s,r,a){let c=n[s],d=n[s+1],u=n[s+2],m=n[s+3],g=r[a],p=r[a+1],b=r[a+2],M=r[a+3];return e[t]=c*M+m*g+d*b-u*p,e[t+1]=d*M+m*p+u*g-c*b,e[t+2]=u*M+m*b+c*p-d*g,e[t+3]=m*M-c*g-d*p-u*b,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,c=Math.cos,d=Math.sin,u=c(n/2),m=c(s/2),g=c(r/2),p=d(n/2),b=d(s/2),M=d(r/2);switch(a){case"XYZ":this._x=p*m*g+u*b*M,this._y=u*b*g-p*m*M,this._z=u*m*M+p*b*g,this._w=u*m*g-p*b*M;break;case"YXZ":this._x=p*m*g+u*b*M,this._y=u*b*g-p*m*M,this._z=u*m*M-p*b*g,this._w=u*m*g+p*b*M;break;case"ZXY":this._x=p*m*g-u*b*M,this._y=u*b*g+p*m*M,this._z=u*m*M+p*b*g,this._w=u*m*g-p*b*M;break;case"ZYX":this._x=p*m*g-u*b*M,this._y=u*b*g+p*m*M,this._z=u*m*M-p*b*g,this._w=u*m*g+p*b*M;break;case"YZX":this._x=p*m*g+u*b*M,this._y=u*b*g+p*m*M,this._z=u*m*M-p*b*g,this._w=u*m*g-p*b*M;break;case"XZY":this._x=p*m*g-u*b*M,this._y=u*b*g-p*m*M,this._z=u*m*M+p*b*g,this._w=u*m*g+p*b*M;break;default:_t("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],c=t[5],d=t[9],u=t[2],m=t[6],g=t[10],p=n+c+g;if(p>0){let b=.5/Math.sqrt(p+1);this._w=.25/b,this._x=(m-d)*b,this._y=(r-u)*b,this._z=(a-s)*b}else if(n>c&&n>g){let b=2*Math.sqrt(1+n-c-g);this._w=(m-d)/b,this._x=.25*b,this._y=(s+a)/b,this._z=(r+u)/b}else if(c>g){let b=2*Math.sqrt(1+c-n-g);this._w=(r-u)/b,this._x=(s+a)/b,this._y=.25*b,this._z=(d+m)/b}else{let b=2*Math.sqrt(1+g-n-c);this._w=(a-s)/b,this._x=(r+u)/b,this._y=(d+m)/b,this._z=.25*b}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(At(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,c=t._x,d=t._y,u=t._z,m=t._w;return this._x=n*m+a*c+s*u-r*d,this._y=s*m+a*d+r*c-n*u,this._z=r*m+a*u+n*d-s*c,this._w=a*m-n*c-s*d-r*u,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,c=this.dot(e);c<0&&(n=-n,s=-s,r=-r,a=-a,c=-c);let d=1-t;if(c<.9995){let u=Math.acos(c),m=Math.sin(u);d=Math.sin(d*u)/m,t=Math.sin(t*u)/m,this._x=this._x*d+n*t,this._y=this._y*d+s*t,this._z=this._z*d+r*t,this._w=this._w*d+a*t,this._onChangeCallback()}else this._x=this._x*d+n*t,this._y=this._y*d+s*t,this._z=this._z*d+r*t,this._w=this._w*d+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Z=class i{static{i.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ud.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ud.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,c=e.z,d=e.w,u=2*(a*s-c*n),m=2*(c*t-r*s),g=2*(r*n-a*t);return this.x=t+d*u+a*g-c*m,this.y=n+d*m+c*u-r*g,this.z=s+d*g+r*m-a*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=At(this.x,e.x,t.x),this.y=At(this.y,e.y,t.y),this.z=At(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=At(this.x,e,t),this.y=At(this.y,e,t),this.z=At(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(At(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,c=t.y,d=t.z;return this.x=s*d-r*c,this.y=r*a-n*d,this.z=n*c-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return dh.copy(this).projectOnVector(e),this.sub(dh)}reflect(e){return this.sub(dh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(At(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},dh=new Z,Ud=new ui,Tt=class i{static{i.prototype.isMatrix3=!0}constructor(e,t,n,s,r,a,c,d,u){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,c,d,u)}set(e,t,n,s,r,a,c,d,u){let m=this.elements;return m[0]=e,m[1]=s,m[2]=c,m[3]=t,m[4]=r,m[5]=d,m[6]=n,m[7]=a,m[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],c=n[3],d=n[6],u=n[1],m=n[4],g=n[7],p=n[2],b=n[5],M=n[8],A=s[0],v=s[3],x=s[6],F=s[1],H=s[4],I=s[7],z=s[2],O=s[5],G=s[8];return r[0]=a*A+c*F+d*z,r[3]=a*v+c*H+d*O,r[6]=a*x+c*I+d*G,r[1]=u*A+m*F+g*z,r[4]=u*v+m*H+g*O,r[7]=u*x+m*I+g*G,r[2]=p*A+b*F+M*z,r[5]=p*v+b*H+M*O,r[8]=p*x+b*I+M*G,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],d=e[6],u=e[7],m=e[8];return t*a*m-t*c*u-n*r*m+n*c*d+s*r*u-s*a*d}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],d=e[6],u=e[7],m=e[8],g=m*a-c*u,p=c*d-m*r,b=u*r-a*d,M=t*g+n*p+s*b;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);let A=1/M;return e[0]=g*A,e[1]=(s*u-m*n)*A,e[2]=(c*n-s*a)*A,e[3]=p*A,e[4]=(m*t-s*d)*A,e[5]=(s*r-c*t)*A,e[6]=b*A,e[7]=(n*d-u*t)*A,e[8]=(a*t-n*r)*A,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,c){let d=Math.cos(r),u=Math.sin(r);return this.set(n*d,n*u,-n*(d*a+u*c)+a+e,-s*u,s*d,-s*(-u*a+d*c)+c+t,0,0,1),this}scale(e,t){return cr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(fh.makeScale(e,t)),this}rotate(e){return cr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(fh.makeRotation(-e)),this}translate(e,t){return cr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(fh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},fh=new Tt,Nd=new Tt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fd=new Tt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Zm(){let i={enabled:!0,workingColorSpace:Uo,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Jt&&(s.r=_s(s.r),s.g=_s(s.g),s.b=_s(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Jt&&(s.r=Xr(s.r),s.g=Xr(s.g),s.b=Xr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===bs?No:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return cr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return cr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Uo]:{primaries:e,whitePoint:n,transfer:No,toXYZ:Nd,fromXYZ:Fd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Zn},outputColorSpaceConfig:{drawingBufferColorSpace:Zn}},[Zn]:{primaries:e,whitePoint:n,transfer:Jt,toXYZ:Nd,fromXYZ:Fd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Zn}}}),i}var kt=Zm();function _s(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Xr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Pr,pl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Pr===void 0&&(Pr=Oo("canvas")),Pr.width=e.width,Pr.height=e.height;let s=Pr.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Pr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Oo("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=_s(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(_s(t[n]/255)*255):t[n]=_s(t[n]);return{data:t,width:e.width,height:e.height}}else return _t("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Km=0,Zr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Km++}),this.uuid=gs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,c=s.length;a<c;a++)s[a].isDataTexture?r.push(ph(s[a].image)):r.push(ph(s[a]))}else r=ph(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function ph(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?pl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(_t("Texture: Unable to serialize Texture."),{})}var Jm=0,mh=new Z,Jn=class i extends Pi{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Wi,s=Wi,r=Nn,a=$s,c=bi,d=gi,u=i.DEFAULT_ANISOTROPY,m=bs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Jm++}),this.uuid=gs(),this.name="",this.source=new Zr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=u,this.format=c,this.internalFormat=null,this.type=d,this.offset=new yt(0,0),this.repeat=new yt(1,1),this.center=new yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Tt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(mh).x}get height(){return this.source.getSize(mh).y}get depth(){return this.source.getSize(mh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){_t(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){_t(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==tu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case $r:e.x=e.x-Math.floor(e.x);break;case Wi:e.x=e.x<0?0:1;break;case ul:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case $r:e.y=e.y-Math.floor(e.y);break;case Wi:e.y=e.y<0?0:1;break;case ul:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Jn.DEFAULT_IMAGE=null;Jn.DEFAULT_MAPPING=tu;Jn.DEFAULT_ANISOTROPY=1;var tn=class i{static{i.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,d=e.elements,u=d[0],m=d[4],g=d[8],p=d[1],b=d[5],M=d[9],A=d[2],v=d[6],x=d[10];if(Math.abs(m-p)<.01&&Math.abs(g-A)<.01&&Math.abs(M-v)<.01){if(Math.abs(m+p)<.1&&Math.abs(g+A)<.1&&Math.abs(M+v)<.1&&Math.abs(u+b+x-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let H=(u+1)/2,I=(b+1)/2,z=(x+1)/2,O=(m+p)/4,G=(g+A)/4,w=(M+v)/4;return H>I&&H>z?H<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(H),s=O/n,r=G/n):I>z?I<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(I),n=O/s,r=w/s):z<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(z),n=G/r,s=w/r),this.set(n,s,r,t),this}let F=Math.sqrt((v-M)*(v-M)+(g-A)*(g-A)+(p-m)*(p-m));return Math.abs(F)<.001&&(F=1),this.x=(v-M)/F,this.y=(g-A)/F,this.z=(p-m)/F,this.w=Math.acos((u+b+x-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=At(this.x,e.x,t.x),this.y=At(this.y,e.y,t.y),this.z=At(this.z,e.z,t.z),this.w=At(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=At(this.x,e,t),this.y=At(this.y,e,t),this.z=At(this.z,e,t),this.w=At(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(At(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ml=class extends Pi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new tn(0,0,e,t),this.scissorTest=!1,this.viewport=new tn(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new Jn(s),a=n.count;for(let c=0;c<a;c++)this.textures[c]=r.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Nn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Zr(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},di=class extends ml{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ko=class extends Jn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=In,this.minFilter=In,this.wrapR=Wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var gl=class extends Jn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=In,this.minFilter=In,this.wrapR=Wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var dn=class i{static{i.prototype.isMatrix4=!0}constructor(e,t,n,s,r,a,c,d,u,m,g,p,b,M,A,v){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,c,d,u,m,g,p,b,M,A,v)}set(e,t,n,s,r,a,c,d,u,m,g,p,b,M,A,v){let x=this.elements;return x[0]=e,x[4]=t,x[8]=n,x[12]=s,x[1]=r,x[5]=a,x[9]=c,x[13]=d,x[2]=u,x[6]=m,x[10]=g,x[14]=p,x[3]=b,x[7]=M,x[11]=A,x[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Ir.setFromMatrixColumn(e,0).length(),r=1/Ir.setFromMatrixColumn(e,1).length(),a=1/Ir.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),c=Math.sin(n),d=Math.cos(s),u=Math.sin(s),m=Math.cos(r),g=Math.sin(r);if(e.order==="XYZ"){let p=a*m,b=a*g,M=c*m,A=c*g;t[0]=d*m,t[4]=-d*g,t[8]=u,t[1]=b+M*u,t[5]=p-A*u,t[9]=-c*d,t[2]=A-p*u,t[6]=M+b*u,t[10]=a*d}else if(e.order==="YXZ"){let p=d*m,b=d*g,M=u*m,A=u*g;t[0]=p+A*c,t[4]=M*c-b,t[8]=a*u,t[1]=a*g,t[5]=a*m,t[9]=-c,t[2]=b*c-M,t[6]=A+p*c,t[10]=a*d}else if(e.order==="ZXY"){let p=d*m,b=d*g,M=u*m,A=u*g;t[0]=p-A*c,t[4]=-a*g,t[8]=M+b*c,t[1]=b+M*c,t[5]=a*m,t[9]=A-p*c,t[2]=-a*u,t[6]=c,t[10]=a*d}else if(e.order==="ZYX"){let p=a*m,b=a*g,M=c*m,A=c*g;t[0]=d*m,t[4]=M*u-b,t[8]=p*u+A,t[1]=d*g,t[5]=A*u+p,t[9]=b*u-M,t[2]=-u,t[6]=c*d,t[10]=a*d}else if(e.order==="YZX"){let p=a*d,b=a*u,M=c*d,A=c*u;t[0]=d*m,t[4]=A-p*g,t[8]=M*g+b,t[1]=g,t[5]=a*m,t[9]=-c*m,t[2]=-u*m,t[6]=b*g+M,t[10]=p-A*g}else if(e.order==="XZY"){let p=a*d,b=a*u,M=c*d,A=c*u;t[0]=d*m,t[4]=-g,t[8]=u*m,t[1]=p*g+A,t[5]=a*m,t[9]=b*g-M,t[2]=M*g-b,t[6]=c*m,t[10]=A*g+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(jm,e,Qm)}lookAt(e,t,n){let s=this.elements;return ci.subVectors(e,t),ci.lengthSq()===0&&(ci.z=1),ci.normalize(),Ps.crossVectors(n,ci),Ps.lengthSq()===0&&(Math.abs(n.z)===1?ci.x+=1e-4:ci.z+=1e-4,ci.normalize(),Ps.crossVectors(n,ci)),Ps.normalize(),Ra.crossVectors(ci,Ps),s[0]=Ps.x,s[4]=Ra.x,s[8]=ci.x,s[1]=Ps.y,s[5]=Ra.y,s[9]=ci.y,s[2]=Ps.z,s[6]=Ra.z,s[10]=ci.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],c=n[4],d=n[8],u=n[12],m=n[1],g=n[5],p=n[9],b=n[13],M=n[2],A=n[6],v=n[10],x=n[14],F=n[3],H=n[7],I=n[11],z=n[15],O=s[0],G=s[4],w=s[8],N=s[12],j=s[1],Y=s[5],X=s[9],xe=s[13],ne=s[2],ae=s[6],ge=s[10],he=s[14],ve=s[3],Te=s[7],se=s[11],Ze=s[15];return r[0]=a*O+c*j+d*ne+u*ve,r[4]=a*G+c*Y+d*ae+u*Te,r[8]=a*w+c*X+d*ge+u*se,r[12]=a*N+c*xe+d*he+u*Ze,r[1]=m*O+g*j+p*ne+b*ve,r[5]=m*G+g*Y+p*ae+b*Te,r[9]=m*w+g*X+p*ge+b*se,r[13]=m*N+g*xe+p*he+b*Ze,r[2]=M*O+A*j+v*ne+x*ve,r[6]=M*G+A*Y+v*ae+x*Te,r[10]=M*w+A*X+v*ge+x*se,r[14]=M*N+A*xe+v*he+x*Ze,r[3]=F*O+H*j+I*ne+z*ve,r[7]=F*G+H*Y+I*ae+z*Te,r[11]=F*w+H*X+I*ge+z*se,r[15]=F*N+H*xe+I*he+z*Ze,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],c=e[5],d=e[9],u=e[13],m=e[2],g=e[6],p=e[10],b=e[14],M=e[3],A=e[7],v=e[11],x=e[15],F=d*b-u*p,H=c*b-u*g,I=c*p-d*g,z=a*b-u*m,O=a*p-d*m,G=a*g-c*m;return t*(A*F-v*H+x*I)-n*(M*F-v*z+x*O)+s*(M*H-A*z+x*G)-r*(M*I-A*O+v*G)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],c=e[9],d=e[2],u=e[6],m=e[10];return t*(a*m-c*u)-n*(r*m-c*d)+s*(r*u-a*d)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],d=e[6],u=e[7],m=e[8],g=e[9],p=e[10],b=e[11],M=e[12],A=e[13],v=e[14],x=e[15],F=t*c-n*a,H=t*d-s*a,I=t*u-r*a,z=n*d-s*c,O=n*u-r*c,G=s*u-r*d,w=m*A-g*M,N=m*v-p*M,j=m*x-b*M,Y=g*v-p*A,X=g*x-b*A,xe=p*x-b*v,ne=F*xe-H*X+I*Y+z*j-O*N+G*w;if(ne===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let ae=1/ne;return e[0]=(c*xe-d*X+u*Y)*ae,e[1]=(s*X-n*xe-r*Y)*ae,e[2]=(A*G-v*O+x*z)*ae,e[3]=(p*O-g*G-b*z)*ae,e[4]=(d*j-a*xe-u*N)*ae,e[5]=(t*xe-s*j+r*N)*ae,e[6]=(v*I-M*G-x*H)*ae,e[7]=(m*G-p*I+b*H)*ae,e[8]=(a*X-c*j+u*w)*ae,e[9]=(n*j-t*X-r*w)*ae,e[10]=(M*O-A*I+x*F)*ae,e[11]=(g*I-m*O-b*F)*ae,e[12]=(c*N-a*Y-d*w)*ae,e[13]=(t*Y-n*N+s*w)*ae,e[14]=(A*H-M*z-v*F)*ae,e[15]=(m*z-g*H+p*F)*ae,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,c=e.y,d=e.z,u=r*a,m=r*c;return this.set(u*a+n,u*c-s*d,u*d+s*c,0,u*c+s*d,m*c+n,m*d-s*a,0,u*d-s*c,m*d+s*a,r*d*d+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,c=t._z,d=t._w,u=r+r,m=a+a,g=c+c,p=r*u,b=r*m,M=r*g,A=a*m,v=a*g,x=c*g,F=d*u,H=d*m,I=d*g,z=n.x,O=n.y,G=n.z;return s[0]=(1-(A+x))*z,s[1]=(b+I)*z,s[2]=(M-H)*z,s[3]=0,s[4]=(b-I)*O,s[5]=(1-(p+x))*O,s[6]=(v+F)*O,s[7]=0,s[8]=(M+H)*G,s[9]=(v-F)*G,s[10]=(1-(p+A))*G,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Ir.set(s[0],s[1],s[2]).length(),c=Ir.set(s[4],s[5],s[6]).length(),d=Ir.set(s[8],s[9],s[10]).length();r<0&&(a=-a),wi.copy(this);let u=1/a,m=1/c,g=1/d;return wi.elements[0]*=u,wi.elements[1]*=u,wi.elements[2]*=u,wi.elements[4]*=m,wi.elements[5]*=m,wi.elements[6]*=m,wi.elements[8]*=g,wi.elements[9]*=g,wi.elements[10]*=g,t.setFromRotationMatrix(wi),n.x=a,n.y=c,n.z=d,this}makePerspective(e,t,n,s,r,a,c=Ci,d=!1){let u=this.elements,m=2*r/(t-e),g=2*r/(n-s),p=(t+e)/(t-e),b=(n+s)/(n-s),M,A;if(d)M=r/(a-r),A=a*r/(a-r);else if(c===Ci)M=-(a+r)/(a-r),A=-2*a*r/(a-r);else if(c===Fo)M=-a/(a-r),A=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return u[0]=m,u[4]=0,u[8]=p,u[12]=0,u[1]=0,u[5]=g,u[9]=b,u[13]=0,u[2]=0,u[6]=0,u[10]=M,u[14]=A,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(e,t,n,s,r,a,c=Ci,d=!1){let u=this.elements,m=2/(t-e),g=2/(n-s),p=-(t+e)/(t-e),b=-(n+s)/(n-s),M,A;if(d)M=1/(a-r),A=a/(a-r);else if(c===Ci)M=-2/(a-r),A=-(a+r)/(a-r);else if(c===Fo)M=-1/(a-r),A=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return u[0]=m,u[4]=0,u[8]=0,u[12]=p,u[1]=0,u[5]=g,u[9]=0,u[13]=b,u[2]=0,u[6]=0,u[10]=M,u[14]=A,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ir=new Z,wi=new dn,jm=new Z(0,0,0),Qm=new Z(1,1,1),Ps=new Z,Ra=new Z,ci=new Z,Od=new dn,Bd=new ui,Os=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],c=s[8],d=s[1],u=s[5],m=s[9],g=s[2],p=s[6],b=s[10];switch(t){case"XYZ":this._y=Math.asin(At(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-m,b),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,u),this._z=0);break;case"YXZ":this._x=Math.asin(-At(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(c,b),this._z=Math.atan2(d,u)):(this._y=Math.atan2(-g,r),this._z=0);break;case"ZXY":this._x=Math.asin(At(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-g,b),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(d,r));break;case"ZYX":this._y=Math.asin(-At(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(p,b),this._z=Math.atan2(d,r)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(At(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-m,u),this._y=Math.atan2(-g,r)):(this._x=0,this._y=Math.atan2(c,b));break;case"XZY":this._z=Math.asin(-At(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,u),this._y=Math.atan2(c,r)):(this._x=Math.atan2(-m,b),this._y=0);break;default:_t("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Od.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Od,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Bd.setFromEuler(this),this.setFromQuaternion(Bd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Os.DEFAULT_ORDER="XYZ";var Kr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},eg=0,kd=new Z,Lr=new ui,hs=new dn,Pa=new Z,Co=new Z,tg=new Z,ng=new ui,zd=new Z(1,0,0),Vd=new Z(0,1,0),Hd=new Z(0,0,1),Gd={type:"added"},ig={type:"removed"},Dr={type:"childadded",child:null},gh={type:"childremoved",child:null},fi=class i extends Pi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:eg++}),this.uuid=gs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new Z,t=new Os,n=new ui,s=new Z(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new dn},normalMatrix:{value:new Tt}}),this.matrix=new dn,this.matrixWorld=new dn,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Kr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Lr.setFromAxisAngle(e,t),this.quaternion.multiply(Lr),this}rotateOnWorldAxis(e,t){return Lr.setFromAxisAngle(e,t),this.quaternion.premultiply(Lr),this}rotateX(e){return this.rotateOnAxis(zd,e)}rotateY(e){return this.rotateOnAxis(Vd,e)}rotateZ(e){return this.rotateOnAxis(Hd,e)}translateOnAxis(e,t){return kd.copy(e).applyQuaternion(this.quaternion),this.position.add(kd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zd,e)}translateY(e){return this.translateOnAxis(Vd,e)}translateZ(e){return this.translateOnAxis(Hd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hs.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Pa.copy(e):Pa.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Co.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hs.lookAt(Co,Pa,this.up):hs.lookAt(Pa,Co,this.up),this.quaternion.setFromRotationMatrix(hs),s&&(hs.extractRotation(s.matrixWorld),Lr.setFromRotationMatrix(hs),this.quaternion.premultiply(Lr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(vt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Gd),Dr.child=e,this.dispatchEvent(Dr),Dr.child=null):vt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ig),gh.child=e,this.dispatchEvent(gh),gh.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hs.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hs.multiply(e.parent.matrixWorld)),e.applyMatrix4(hs),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Gd),Dr.child=e,this.dispatchEvent(Dr),Dr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Co,e,tg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Co,ng,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,c=r.length;a<c;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>({...c})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(c,d){return c[d.uuid]===void 0&&(c[d.uuid]=d.toJSON(e)),d.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){let d=c.shapes;if(Array.isArray(d))for(let u=0,m=d.length;u<m;u++){let g=d[u];r(e.shapes,g)}else r(e.shapes,d)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let c=[];for(let d=0,u=this.material.length;d<u;d++)c.push(r(e.materials,this.material[d]));s.material=c}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){let d=this.animations[c];s.animations.push(r(e.animations,d))}}if(t){let c=a(e.geometries),d=a(e.materials),u=a(e.textures),m=a(e.images),g=a(e.shapes),p=a(e.skeletons),b=a(e.animations),M=a(e.nodes);c.length>0&&(n.geometries=c),d.length>0&&(n.materials=d),u.length>0&&(n.textures=u),m.length>0&&(n.images=m),g.length>0&&(n.shapes=g),p.length>0&&(n.skeletons=p),b.length>0&&(n.animations=b),M.length>0&&(n.nodes=M)}return n.object=s,n;function a(c){let d=[];for(let u in c){let m=c[u];delete m.metadata,d.push(m)}return d}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};fi.DEFAULT_UP=new Z(0,1,0);fi.DEFAULT_MATRIX_AUTO_UPDATE=!0;fi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ri=class extends fi{constructor(){super(),this.isGroup=!0,this.type="Group"}},sg={type:"move"},Jr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ri,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ri,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ri,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,c=this._targetRay,d=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){a=!0;for(let A of e.hand.values()){let v=t.getJointPose(A,n),x=this._getHandJoint(u,A);v!==null&&(x.matrix.fromArray(v.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.matrixWorldNeedsUpdate=!0,x.jointRadius=v.radius),x.visible=v!==null}let m=u.joints["index-finger-tip"],g=u.joints["thumb-tip"],p=m.position.distanceTo(g.position),b=.02,M=.005;u.inputState.pinching&&p>b+M?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&p<=b-M&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else d!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(d.matrix.fromArray(r.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,r.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(r.linearVelocity)):d.hasLinearVelocity=!1,r.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(r.angularVelocity)):d.hasAngularVelocity=!1,d.eventsEnabled&&d.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(sg)))}return c!==null&&(c.visible=s!==null),d!==null&&(d.visible=r!==null),u!==null&&(u.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ri;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},zf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Is={h:0,s:0,l:0},Ia={h:0,s:0,l:0};function _h(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ct=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Zn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,kt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=kt.workingColorSpace){return this.r=e,this.g=t,this.b=n,kt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=kt.workingColorSpace){if(e=uu(e,1),t=At(t,0,1),n=At(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=_h(a,r,e+1/3),this.g=_h(a,r,e),this.b=_h(a,r,e-1/3)}return kt.colorSpaceToWorking(this,s),this}setStyle(e,t=Zn){function n(r){r!==void 0&&parseFloat(r)<1&&_t("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],c=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:_t("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);_t("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Zn){let n=zf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):_t("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=_s(e.r),this.g=_s(e.g),this.b=_s(e.b),this}copyLinearToSRGB(e){return this.r=Xr(e.r),this.g=Xr(e.g),this.b=Xr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Zn){return kt.workingToColorSpace(Gn.copy(this),e),Math.round(At(Gn.r*255,0,255))*65536+Math.round(At(Gn.g*255,0,255))*256+Math.round(At(Gn.b*255,0,255))}getHexString(e=Zn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=kt.workingColorSpace){kt.workingToColorSpace(Gn.copy(this),t);let n=Gn.r,s=Gn.g,r=Gn.b,a=Math.max(n,s,r),c=Math.min(n,s,r),d,u,m=(c+a)/2;if(c===a)d=0,u=0;else{let g=a-c;switch(u=m<=.5?g/(a+c):g/(2-a-c),a){case n:d=(s-r)/g+(s<r?6:0);break;case s:d=(r-n)/g+2;break;case r:d=(n-s)/g+4;break}d/=6}return e.h=d,e.s=u,e.l=m,e}getRGB(e,t=kt.workingColorSpace){return kt.workingToColorSpace(Gn.copy(this),t),e.r=Gn.r,e.g=Gn.g,e.b=Gn.b,e}getStyle(e=Zn){kt.workingToColorSpace(Gn.copy(this),e);let t=Gn.r,n=Gn.g,s=Gn.b;return e!==Zn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Is),this.setHSL(Is.h+e,Is.s+t,Is.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Is),e.getHSL(Ia);let n=Lo(Is.h,Ia.h,t),s=Lo(Is.s,Ia.s,t),r=Lo(Is.l,Ia.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Gn=new Ct;Ct.NAMES=zf;var zo=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ct(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Vo=class extends fi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Os,this.environmentIntensity=1,this.environmentRotation=new Os,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ei=new Z,us=new Z,xh=new Z,ds=new Z,Ur=new Z,Nr=new Z,Wd=new Z,vh=new Z,yh=new Z,bh=new Z,Sh=new tn,Mh=new tn,wh=new tn,ms=class i{constructor(e=new Z,t=new Z,n=new Z){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Ei.subVectors(e,t),s.cross(Ei);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Ei.subVectors(s,t),us.subVectors(n,t),xh.subVectors(e,t);let a=Ei.dot(Ei),c=Ei.dot(us),d=Ei.dot(xh),u=us.dot(us),m=us.dot(xh),g=a*u-c*c;if(g===0)return r.set(0,0,0),null;let p=1/g,b=(u*d-c*m)*p,M=(a*m-c*d)*p;return r.set(1-b-M,M,b)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,ds)===null?!1:ds.x>=0&&ds.y>=0&&ds.x+ds.y<=1}static getInterpolation(e,t,n,s,r,a,c,d){return this.getBarycoord(e,t,n,s,ds)===null?(d.x=0,d.y=0,"z"in d&&(d.z=0),"w"in d&&(d.w=0),null):(d.setScalar(0),d.addScaledVector(r,ds.x),d.addScaledVector(a,ds.y),d.addScaledVector(c,ds.z),d)}static getInterpolatedAttribute(e,t,n,s,r,a){return Sh.setScalar(0),Mh.setScalar(0),wh.setScalar(0),Sh.fromBufferAttribute(e,t),Mh.fromBufferAttribute(e,n),wh.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Sh,r.x),a.addScaledVector(Mh,r.y),a.addScaledVector(wh,r.z),a}static isFrontFacing(e,t,n,s){return Ei.subVectors(n,t),us.subVectors(e,t),Ei.cross(us).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ei.subVectors(this.c,this.b),us.subVectors(this.a,this.b),Ei.cross(us).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,c;Ur.subVectors(s,n),Nr.subVectors(r,n),vh.subVectors(e,n);let d=Ur.dot(vh),u=Nr.dot(vh);if(d<=0&&u<=0)return t.copy(n);yh.subVectors(e,s);let m=Ur.dot(yh),g=Nr.dot(yh);if(m>=0&&g<=m)return t.copy(s);let p=d*g-m*u;if(p<=0&&d>=0&&m<=0)return a=d/(d-m),t.copy(n).addScaledVector(Ur,a);bh.subVectors(e,r);let b=Ur.dot(bh),M=Nr.dot(bh);if(M>=0&&b<=M)return t.copy(r);let A=b*u-d*M;if(A<=0&&u>=0&&M<=0)return c=u/(u-M),t.copy(n).addScaledVector(Nr,c);let v=m*M-b*g;if(v<=0&&g-m>=0&&b-M>=0)return Wd.subVectors(r,s),c=(g-m)/(g-m+(b-M)),t.copy(s).addScaledVector(Wd,c);let x=1/(v+A+p);return a=A*x,c=p*x,t.copy(n).addScaledVector(Ur,a).addScaledVector(Nr,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Fn=class{constructor(e=new Z(1/0,1/0,1/0),t=new Z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ti.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ti.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Ti.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,c=r.count;a<c;a++)e.isMesh===!0?e.getVertexPosition(a,Ti):Ti.fromBufferAttribute(r,a),Ti.applyMatrix4(e.matrixWorld),this.expandByPoint(Ti);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),La.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),La.copy(n.boundingBox)),La.applyMatrix4(e.matrixWorld),this.union(La)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ti),Ti.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ro),Da.subVectors(this.max,Ro),Fr.subVectors(e.a,Ro),Or.subVectors(e.b,Ro),Br.subVectors(e.c,Ro),Ls.subVectors(Or,Fr),Ds.subVectors(Br,Or),sr.subVectors(Fr,Br);let t=[0,-Ls.z,Ls.y,0,-Ds.z,Ds.y,0,-sr.z,sr.y,Ls.z,0,-Ls.x,Ds.z,0,-Ds.x,sr.z,0,-sr.x,-Ls.y,Ls.x,0,-Ds.y,Ds.x,0,-sr.y,sr.x,0];return!Eh(t,Fr,Or,Br,Da)||(t=[1,0,0,0,1,0,0,0,1],!Eh(t,Fr,Or,Br,Da))?!1:(Ua.crossVectors(Ls,Ds),t=[Ua.x,Ua.y,Ua.z],Eh(t,Fr,Or,Br,Da))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ti).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ti).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fs),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},fs=[new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z],Ti=new Z,La=new Fn,Fr=new Z,Or=new Z,Br=new Z,Ls=new Z,Ds=new Z,sr=new Z,Ro=new Z,Da=new Z,Ua=new Z,rr=new Z;function Eh(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){rr.fromArray(i,r);let c=s.x*Math.abs(rr.x)+s.y*Math.abs(rr.y)+s.z*Math.abs(rr.z),d=e.dot(rr),u=t.dot(rr),m=n.dot(rr);if(Math.max(-Math.max(d,u,m),Math.min(d,u,m))>c)return!1}return!0}var Mn=new Z,Na=new yt,rg=0,Un=class extends Pi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:rg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=fl,this.updateRanges=[],this.gpuType=Ui,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Na.fromBufferAttribute(this,t),Na.applyMatrix3(e),this.setXY(t,Na.x,Na.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Mn.fromBufferAttribute(this,t),Mn.applyMatrix3(e),this.setXYZ(t,Mn.x,Mn.y,Mn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Mn.fromBufferAttribute(this,t),Mn.applyMatrix4(e),this.setXYZ(t,Mn.x,Mn.y,Mn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Mn.fromBufferAttribute(this,t),Mn.applyNormalMatrix(e),this.setXYZ(t,Mn.x,Mn.y,Mn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Mn.fromBufferAttribute(this,t),Mn.transformDirection(e),this.setXYZ(t,Mn.x,Mn.y,Mn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ai(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=en(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ai(t,this.array)),t}setX(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ai(t,this.array)),t}setY(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ai(t,this.array)),t}setZ(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ai(t,this.array)),t}setW(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array),s=en(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array),s=en(s,this.array),r=en(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==fl&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var Ho=class extends Un{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Go=class extends Un{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var wn=class extends Un{constructor(e,t,n){super(new Float32Array(e),t,n)}},og=new Fn,Po=new Z,Th=new Z,Ii=class{constructor(e=new Z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):og.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Po.subVectors(e,this.center);let t=Po.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Po,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Th.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Po.copy(e.center).add(Th)),this.expandByPoint(Po.copy(e.center).sub(Th))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},ag=0,vi=new dn,Ah=new fi,kr=new Z,hi=new Fn,Io=new Fn,Pn=new Z,On=class i extends Pi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ag++}),this.uuid=gs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Im(e)?Go:Ho)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Tt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return vi.makeRotationFromQuaternion(e),this.applyMatrix4(vi),this}rotateX(e){return vi.makeRotationX(e),this.applyMatrix4(vi),this}rotateY(e){return vi.makeRotationY(e),this.applyMatrix4(vi),this}rotateZ(e){return vi.makeRotationZ(e),this.applyMatrix4(vi),this}translate(e,t,n){return vi.makeTranslation(e,t,n),this.applyMatrix4(vi),this}scale(e,t,n){return vi.makeScale(e,t,n),this.applyMatrix4(vi),this}lookAt(e){return Ah.lookAt(e),Ah.updateMatrix(),this.applyMatrix4(Ah.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(kr).negate(),this.translate(kr.x,kr.y,kr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new wn(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&_t("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){vt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Z(-1/0,-1/0,-1/0),new Z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];hi.setFromBufferAttribute(r),this.morphTargetsRelative?(Pn.addVectors(this.boundingBox.min,hi.min),this.boundingBox.expandByPoint(Pn),Pn.addVectors(this.boundingBox.max,hi.max),this.boundingBox.expandByPoint(Pn)):(this.boundingBox.expandByPoint(hi.min),this.boundingBox.expandByPoint(hi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&vt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ii);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){vt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Z,1/0);return}if(e){let n=this.boundingSphere.center;if(hi.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let c=t[r];Io.setFromBufferAttribute(c),this.morphTargetsRelative?(Pn.addVectors(hi.min,Io.min),hi.expandByPoint(Pn),Pn.addVectors(hi.max,Io.max),hi.expandByPoint(Pn)):(hi.expandByPoint(Io.min),hi.expandByPoint(Io.max))}hi.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Pn.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Pn));if(t)for(let r=0,a=t.length;r<a;r++){let c=t[r],d=this.morphTargetsRelative;for(let u=0,m=c.count;u<m;u++)Pn.fromBufferAttribute(c,u),d&&(kr.fromBufferAttribute(e,u),Pn.add(kr)),s=Math.max(s,n.distanceToSquared(Pn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&vt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){vt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Un(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let c=[],d=[];for(let w=0;w<n.count;w++)c[w]=new Z,d[w]=new Z;let u=new Z,m=new Z,g=new Z,p=new yt,b=new yt,M=new yt,A=new Z,v=new Z;function x(w,N,j){u.fromBufferAttribute(n,w),m.fromBufferAttribute(n,N),g.fromBufferAttribute(n,j),p.fromBufferAttribute(r,w),b.fromBufferAttribute(r,N),M.fromBufferAttribute(r,j),m.sub(u),g.sub(u),b.sub(p),M.sub(p);let Y=1/(b.x*M.y-M.x*b.y);isFinite(Y)&&(A.copy(m).multiplyScalar(M.y).addScaledVector(g,-b.y).multiplyScalar(Y),v.copy(g).multiplyScalar(b.x).addScaledVector(m,-M.x).multiplyScalar(Y),c[w].add(A),c[N].add(A),c[j].add(A),d[w].add(v),d[N].add(v),d[j].add(v))}let F=this.groups;F.length===0&&(F=[{start:0,count:e.count}]);for(let w=0,N=F.length;w<N;++w){let j=F[w],Y=j.start,X=j.count;for(let xe=Y,ne=Y+X;xe<ne;xe+=3)x(e.getX(xe+0),e.getX(xe+1),e.getX(xe+2))}let H=new Z,I=new Z,z=new Z,O=new Z;function G(w){z.fromBufferAttribute(s,w),O.copy(z);let N=c[w];H.copy(N),H.sub(z.multiplyScalar(z.dot(N))).normalize(),I.crossVectors(O,N);let Y=I.dot(d[w])<0?-1:1;a.setXYZW(w,H.x,H.y,H.z,Y)}for(let w=0,N=F.length;w<N;++w){let j=F[w],Y=j.start,X=j.count;for(let xe=Y,ne=Y+X;xe<ne;xe+=3)G(e.getX(xe+0)),G(e.getX(xe+1)),G(e.getX(xe+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Un(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let p=0,b=n.count;p<b;p++)n.setXYZ(p,0,0,0);let s=new Z,r=new Z,a=new Z,c=new Z,d=new Z,u=new Z,m=new Z,g=new Z;if(e)for(let p=0,b=e.count;p<b;p+=3){let M=e.getX(p+0),A=e.getX(p+1),v=e.getX(p+2);s.fromBufferAttribute(t,M),r.fromBufferAttribute(t,A),a.fromBufferAttribute(t,v),m.subVectors(a,r),g.subVectors(s,r),m.cross(g),c.fromBufferAttribute(n,M),d.fromBufferAttribute(n,A),u.fromBufferAttribute(n,v),c.add(m),d.add(m),u.add(m),n.setXYZ(M,c.x,c.y,c.z),n.setXYZ(A,d.x,d.y,d.z),n.setXYZ(v,u.x,u.y,u.z)}else for(let p=0,b=t.count;p<b;p+=3)s.fromBufferAttribute(t,p+0),r.fromBufferAttribute(t,p+1),a.fromBufferAttribute(t,p+2),m.subVectors(a,r),g.subVectors(s,r),m.cross(g),n.setXYZ(p+0,m.x,m.y,m.z),n.setXYZ(p+1,m.x,m.y,m.z),n.setXYZ(p+2,m.x,m.y,m.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Pn.fromBufferAttribute(e,t),Pn.normalize(),e.setXYZ(t,Pn.x,Pn.y,Pn.z)}toNonIndexed(){function e(c,d){let u=c.array,m=c.itemSize,g=c.normalized,p=new u.constructor(d.length*m),b=0,M=0;for(let A=0,v=d.length;A<v;A++){c.isInterleavedBufferAttribute?b=d[A]*c.data.stride+c.offset:b=d[A]*m;for(let x=0;x<m;x++)p[M++]=u[b++]}return new Un(p,m,g)}if(this.index===null)return _t("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let c in s){let d=s[c],u=e(d,n);t.setAttribute(c,u)}let r=this.morphAttributes;for(let c in r){let d=[],u=r[c];for(let m=0,g=u.length;m<g;m++){let p=u[m],b=e(p,n);d.push(b)}t.morphAttributes[c]=d}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let c=0,d=a.length;c<d;c++){let u=a[c];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let d=this.parameters;for(let u in d)d[u]!==void 0&&(e[u]=d[u]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let d in n){let u=n[d];e.data.attributes[d]=u.toJSON(e.data)}let s={},r=!1;for(let d in this.morphAttributes){let u=this.morphAttributes[d],m=[];for(let g=0,p=u.length;g<p;g++){let b=u[g];m.push(b.toJSON(e.data))}m.length>0&&(s[d]=m,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let u in s){let m=s[u];this.setAttribute(u,m.clone(t))}let r=e.morphAttributes;for(let u in r){let m=[],g=r[u];for(let p=0,b=g.length;p<b;p++)m.push(g[p].clone(t));this.morphAttributes[u]=m}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let u=0,m=a.length;u<m;u++){let g=a[u];this.addGroup(g.start,g.count,g.materialIndex)}let c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());let d=e.boundingSphere;return d!==null&&(this.boundingSphere=d.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},_l=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=fl,this.updateRanges=[],this.version=0,this.uuid=gs()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=gs()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=gs()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Yn=new Z,ii=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Yn.fromBufferAttribute(this,t),Yn.applyMatrix4(e),this.setXYZ(t,Yn.x,Yn.y,Yn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Yn.fromBufferAttribute(this,t),Yn.applyNormalMatrix(e),this.setXYZ(t,Yn.x,Yn.y,Yn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Yn.fromBufferAttribute(this,t),Yn.transformDirection(e),this.setXYZ(t,Yn.x,Yn.y,Yn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Ai(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=en(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=en(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=en(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=en(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=en(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ai(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ai(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ai(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ai(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=en(t,this.array),n=en(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=en(t,this.array),n=en(n,this.array),s=en(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=en(t,this.array),n=en(n,this.array),s=en(s,this.array),r=en(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Bo("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Un(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Bo("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},lg=0,Bs=class extends Pi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:lg++}),this.uuid=gs(),this.name="",this.type="Material",this.blending=vs,this.side=xs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=nl,this.blendDst=il,this.blendEquation=Fs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ct(0,0,0),this.blendAlpha=0,this.depthFunc=hr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=kh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=lr,this.stencilZFail=lr,this.stencilZPass=lr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){_t(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){_t(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==vs&&(n.blending=this.blending),this.side!==xs&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==nl&&(n.blendSrc=this.blendSrc),this.blendDst!==il&&(n.blendDst=this.blendDst),this.blendEquation!==Fs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==hr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==kh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==lr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==lr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==lr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let c in r){let d=r[c];delete d.metadata,a.push(d)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ct().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new yt().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new yt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var ps=new Z,Ch=new Z,Fa=new Z,Us=new Z,Rh=new Z,Oa=new Z,Ph=new Z,ks=class{constructor(e=new Z,t=new Z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ps)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ps.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ps.copy(this.origin).addScaledVector(this.direction,t),ps.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Ch.copy(e).add(t).multiplyScalar(.5),Fa.copy(t).sub(e).normalize(),Us.copy(this.origin).sub(Ch);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Fa),c=Us.dot(this.direction),d=-Us.dot(Fa),u=Us.lengthSq(),m=Math.abs(1-a*a),g,p,b,M;if(m>0)if(g=a*d-c,p=a*c-d,M=r*m,g>=0)if(p>=-M)if(p<=M){let A=1/m;g*=A,p*=A,b=g*(g+a*p+2*c)+p*(a*g+p+2*d)+u}else p=r,g=Math.max(0,-(a*p+c)),b=-g*g+p*(p+2*d)+u;else p=-r,g=Math.max(0,-(a*p+c)),b=-g*g+p*(p+2*d)+u;else p<=-M?(g=Math.max(0,-(-a*r+c)),p=g>0?-r:Math.min(Math.max(-r,-d),r),b=-g*g+p*(p+2*d)+u):p<=M?(g=0,p=Math.min(Math.max(-r,-d),r),b=p*(p+2*d)+u):(g=Math.max(0,-(a*r+c)),p=g>0?r:Math.min(Math.max(-r,-d),r),b=-g*g+p*(p+2*d)+u);else p=a>0?-r:r,g=Math.max(0,-(a*p+c)),b=-g*g+p*(p+2*d)+u;return n&&n.copy(this.origin).addScaledVector(this.direction,g),s&&s.copy(Ch).addScaledVector(Fa,p),b}intersectSphere(e,t){ps.subVectors(e.center,this.origin);let n=ps.dot(this.direction),s=ps.dot(ps)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),c=n-a,d=n+a;return d<0?null:c<0?this.at(d,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,c,d,u=1/this.direction.x,m=1/this.direction.y,g=1/this.direction.z,p=this.origin;return u>=0?(n=(e.min.x-p.x)*u,s=(e.max.x-p.x)*u):(n=(e.max.x-p.x)*u,s=(e.min.x-p.x)*u),m>=0?(r=(e.min.y-p.y)*m,a=(e.max.y-p.y)*m):(r=(e.max.y-p.y)*m,a=(e.min.y-p.y)*m),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),g>=0?(c=(e.min.z-p.z)*g,d=(e.max.z-p.z)*g):(c=(e.max.z-p.z)*g,d=(e.min.z-p.z)*g),n>d||c>s)||((c>n||n!==n)&&(n=c),(d<s||s!==s)&&(s=d),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ps)!==null}intersectTriangle(e,t,n,s,r){Rh.subVectors(t,e),Oa.subVectors(n,e),Ph.crossVectors(Rh,Oa);let a=this.direction.dot(Ph),c;if(a>0){if(s)return null;c=1}else if(a<0)c=-1,a=-a;else return null;Us.subVectors(this.origin,e);let d=c*this.direction.dot(Oa.crossVectors(Us,Oa));if(d<0)return null;let u=c*this.direction.dot(Rh.cross(Us));if(u<0||d+u>a)return null;let m=-c*Us.dot(Ph);return m<0?null:this.at(m/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ur=class extends Bs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Os,this.combine=qh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Xd=new dn,or=new ks,Ba=new Ii,$d=new Z,ka=new Z,za=new Z,Va=new Z,Ih=new Z,Ha=new Z,qd=new Z,Ga=new Z,yn=class extends fi{constructor(e=new On,t=new ur){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let c=this.morphTargetInfluences;if(r&&c){Ha.set(0,0,0);for(let d=0,u=r.length;d<u;d++){let m=c[d],g=r[d];m!==0&&(Ih.fromBufferAttribute(g,e),a?Ha.addScaledVector(Ih,m):Ha.addScaledVector(Ih.sub(t),m))}t.add(Ha)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ba.copy(n.boundingSphere),Ba.applyMatrix4(r),or.copy(e.ray).recast(e.near),!(Ba.containsPoint(or.origin)===!1&&(or.intersectSphere(Ba,$d)===null||or.origin.distanceToSquared($d)>(e.far-e.near)**2))&&(Xd.copy(r).invert(),or.copy(e.ray).applyMatrix4(Xd),!(n.boundingBox!==null&&or.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,or)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,c=r.index,d=r.attributes.position,u=r.attributes.uv,m=r.attributes.uv1,g=r.attributes.normal,p=r.groups,b=r.drawRange;if(c!==null)if(Array.isArray(a))for(let M=0,A=p.length;M<A;M++){let v=p[M],x=a[v.materialIndex],F=Math.max(v.start,b.start),H=Math.min(c.count,Math.min(v.start+v.count,b.start+b.count));for(let I=F,z=H;I<z;I+=3){let O=c.getX(I),G=c.getX(I+1),w=c.getX(I+2);s=Wa(this,x,e,n,u,m,g,O,G,w),s&&(s.faceIndex=Math.floor(I/3),s.face.materialIndex=v.materialIndex,t.push(s))}}else{let M=Math.max(0,b.start),A=Math.min(c.count,b.start+b.count);for(let v=M,x=A;v<x;v+=3){let F=c.getX(v),H=c.getX(v+1),I=c.getX(v+2);s=Wa(this,a,e,n,u,m,g,F,H,I),s&&(s.faceIndex=Math.floor(v/3),t.push(s))}}else if(d!==void 0)if(Array.isArray(a))for(let M=0,A=p.length;M<A;M++){let v=p[M],x=a[v.materialIndex],F=Math.max(v.start,b.start),H=Math.min(d.count,Math.min(v.start+v.count,b.start+b.count));for(let I=F,z=H;I<z;I+=3){let O=I,G=I+1,w=I+2;s=Wa(this,x,e,n,u,m,g,O,G,w),s&&(s.faceIndex=Math.floor(I/3),s.face.materialIndex=v.materialIndex,t.push(s))}}else{let M=Math.max(0,b.start),A=Math.min(d.count,b.start+b.count);for(let v=M,x=A;v<x;v+=3){let F=v,H=v+1,I=v+2;s=Wa(this,a,e,n,u,m,g,F,H,I),s&&(s.faceIndex=Math.floor(v/3),t.push(s))}}}};function cg(i,e,t,n,s,r,a,c){let d;if(e.side===Qn?d=n.intersectTriangle(a,r,s,!0,c):d=n.intersectTriangle(s,r,a,e.side===xs,c),d===null)return null;Ga.copy(c),Ga.applyMatrix4(i.matrixWorld);let u=t.ray.origin.distanceTo(Ga);return u<t.near||u>t.far?null:{distance:u,point:Ga.clone(),object:i}}function Wa(i,e,t,n,s,r,a,c,d,u){i.getVertexPosition(c,ka),i.getVertexPosition(d,za),i.getVertexPosition(u,Va);let m=cg(i,e,t,n,ka,za,Va,qd);if(m){let g=new Z;ms.getBarycoord(qd,ka,za,Va,g),s&&(m.uv=ms.getInterpolatedAttribute(s,c,d,u,g,new yt)),r&&(m.uv1=ms.getInterpolatedAttribute(r,c,d,u,g,new yt)),a&&(m.normal=ms.getInterpolatedAttribute(a,c,d,u,g,new Z),m.normal.dot(n.direction)>0&&m.normal.multiplyScalar(-1));let p={a:c,b:d,c:u,normal:new Z,materialIndex:0};ms.getNormal(ka,za,Va,p.normal),m.face=p,m.barycoord=g}return m}var xl=class extends Jn{constructor(e=null,t=1,n=1,s,r,a,c,d,u=In,m=In,g,p){super(null,a,c,d,u,m,s,r,g,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Lh=new Z,hg=new Z,ug=new Tt,Kn=class{constructor(e=new Z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Lh.subVectors(n,t).cross(hg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Lh),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||ug.getNormalMatrix(e),s=this.coplanarPoint(Lh).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ar=new Ii,dg=new yt(.5,.5),Xa=new Z,Wo=class{constructor(e=new Kn,t=new Kn,n=new Kn,s=new Kn,r=new Kn,a=new Kn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(n),c[3].copy(s),c[4].copy(r),c[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ci,n=!1){let s=this.planes,r=e.elements,a=r[0],c=r[1],d=r[2],u=r[3],m=r[4],g=r[5],p=r[6],b=r[7],M=r[8],A=r[9],v=r[10],x=r[11],F=r[12],H=r[13],I=r[14],z=r[15];if(s[0].setComponents(u-a,b-m,x-M,z-F).normalize(),s[1].setComponents(u+a,b+m,x+M,z+F).normalize(),s[2].setComponents(u+c,b+g,x+A,z+H).normalize(),s[3].setComponents(u-c,b-g,x-A,z-H).normalize(),n)s[4].setComponents(d,p,v,I).normalize(),s[5].setComponents(u-d,b-p,x-v,z-I).normalize();else if(s[4].setComponents(u-d,b-p,x-v,z-I).normalize(),t===Ci)s[5].setComponents(u+d,b+p,x+v,z+I).normalize();else if(t===Fo)s[5].setComponents(d,p,v,I).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ar.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ar.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ar)}intersectsSprite(e){ar.center.set(0,0,0);let t=dg.distanceTo(e.center);return ar.radius=.7071067811865476+t,ar.applyMatrix4(e.matrixWorld),this.intersectsSphere(ar)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Xa.x=s.normal.x>0?e.max.x:e.min.x,Xa.y=s.normal.y>0?e.max.y:e.min.y,Xa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Xa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var jr=class extends Bs{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ct(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Yd=new dn,zh=new ks,$a=new Ii,qa=new Z,Xo=class extends fi{constructor(e=new On,t=new jr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),$a.copy(n.boundingSphere),$a.applyMatrix4(s),$a.radius+=r,e.ray.intersectsSphere($a)===!1)return;Yd.copy(s).invert(),zh.copy(e.ray).applyMatrix4(Yd);let c=r/((this.scale.x+this.scale.y+this.scale.z)/3),d=c*c,u=n.index,g=n.attributes.position;if(u!==null){let p=Math.max(0,a.start),b=Math.min(u.count,a.start+a.count);for(let M=p,A=b;M<A;M++){let v=u.getX(M);qa.fromBufferAttribute(g,v),Zd(qa,v,d,s,e,t,this)}}else{let p=Math.max(0,a.start),b=Math.min(g.count,a.start+a.count);for(let M=p,A=b;M<A;M++)qa.fromBufferAttribute(g,M),Zd(qa,M,d,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}};function Zd(i,e,t,n,s,r,a){let c=zh.distanceSqToPoint(i);if(c<t){let d=new Z;zh.closestPointToPoint(i,d),d.applyMatrix4(n);let u=s.ray.origin.distanceTo(d);if(u<s.near||u>s.far)return;r.push({distance:u,distanceToRay:Math.sqrt(c),point:d,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var $o=class extends Jn{constructor(e=[],t=Xs,n,s,r,a,c,d,u,m){super(e,t,n,s,r,a,c,d,u,m),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Qr=class extends Jn{constructor(e,t,n,s,r,a,c,d,u){super(e,t,n,s,r,a,c,d,u),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ys=class extends Jn{constructor(e,t,n=Di,s,r,a,c=In,d=In,u,m=Xi,g=1){if(m!==Xi&&m!==qs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let p={width:e,height:t,depth:g};super(p,s,r,a,c,d,m,n,u),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Zr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},vl=class extends ys{constructor(e,t=Di,n=Xs,s,r,a=In,c=In,d,u=Xi){let m={width:e,height:e,depth:1},g=[m,m,m,m,m,m];super(e,e,t,n,s,r,a,c,d,u),this.image=g,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},qo=class extends Jn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},$i=class i extends On{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let c=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let d=[],u=[],m=[],g=[],p=0,b=0;M("z","y","x",-1,-1,n,t,e,a,r,0),M("z","y","x",1,-1,n,t,-e,a,r,1),M("x","z","y",1,1,e,n,t,s,a,2),M("x","z","y",1,-1,e,n,-t,s,a,3),M("x","y","z",1,-1,e,t,n,s,r,4),M("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(d),this.setAttribute("position",new wn(u,3)),this.setAttribute("normal",new wn(m,3)),this.setAttribute("uv",new wn(g,2));function M(A,v,x,F,H,I,z,O,G,w,N){let j=I/G,Y=z/w,X=I/2,xe=z/2,ne=O/2,ae=G+1,ge=w+1,he=0,ve=0,Te=new Z;for(let se=0;se<ge;se++){let Ze=se*Y-xe;for(let et=0;et<ae;et++){let De=et*j-X;Te[A]=De*F,Te[v]=Ze*H,Te[x]=ne,u.push(Te.x,Te.y,Te.z),Te[A]=0,Te[v]=0,Te[x]=O>0?1:-1,m.push(Te.x,Te.y,Te.z),g.push(et/G),g.push(1-se/w),he+=1}}for(let se=0;se<w;se++)for(let Ze=0;Ze<G;Ze++){let et=p+Ze+ae*se,De=p+Ze+ae*(se+1),at=p+(Ze+1)+ae*(se+1),qe=p+(Ze+1)+ae*se;d.push(et,De,qe),d.push(De,at,qe),ve+=6}c.addGroup(b,ve,N),b+=ve,p+=he}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Ya=new Z,Za=new Z,Dh=new Z,Ka=new ms,eo=class extends On{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let s=Math.pow(10,4),r=Math.cos(Wr*t),a=e.getIndex(),c=e.getAttribute("position"),d=a?a.count:c.count,u=[0,0,0],m=["a","b","c"],g=new Array(3),p={},b=[];for(let M=0;M<d;M+=3){a?(u[0]=a.getX(M),u[1]=a.getX(M+1),u[2]=a.getX(M+2)):(u[0]=M,u[1]=M+1,u[2]=M+2);let{a:A,b:v,c:x}=Ka;if(A.fromBufferAttribute(c,u[0]),v.fromBufferAttribute(c,u[1]),x.fromBufferAttribute(c,u[2]),Ka.getNormal(Dh),g[0]=`${Math.round(A.x*s)},${Math.round(A.y*s)},${Math.round(A.z*s)}`,g[1]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,g[2]=`${Math.round(x.x*s)},${Math.round(x.y*s)},${Math.round(x.z*s)}`,!(g[0]===g[1]||g[1]===g[2]||g[2]===g[0]))for(let F=0;F<3;F++){let H=(F+1)%3,I=g[F],z=g[H],O=Ka[m[F]],G=Ka[m[H]],w=`${I}_${z}`,N=`${z}_${I}`;N in p&&p[N]?(Dh.dot(p[N].normal)<=r&&(b.push(O.x,O.y,O.z),b.push(G.x,G.y,G.z)),p[N]=null):w in p||(p[w]={index0:u[F],index1:u[H],normal:Dh.clone()})}}for(let M in p)if(p[M]){let{index0:A,index1:v}=p[M];Ya.fromBufferAttribute(c,A),Za.fromBufferAttribute(c,v),b.push(Ya.x,Ya.y,Ya.z),b.push(Za.x,Za.y,Za.z)}this.setAttribute("position",new wn(b,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};var zs=class i extends On{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,c=Math.floor(n),d=Math.floor(s),u=c+1,m=d+1,g=e/c,p=t/d,b=[],M=[],A=[],v=[];for(let x=0;x<m;x++){let F=x*p-a;for(let H=0;H<u;H++){let I=H*g-r;M.push(I,-F,0),A.push(0,0,1),v.push(H/c),v.push(1-x/d)}}for(let x=0;x<d;x++)for(let F=0;F<c;F++){let H=F+u*x,I=F+u*(x+1),z=F+1+u*(x+1),O=F+1+u*x;b.push(H,I,O),b.push(I,z,O)}this.setIndex(b),this.setAttribute("position",new wn(M,3)),this.setAttribute("normal",new wn(A,3)),this.setAttribute("uv",new wn(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Yo=class extends On{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,s=new Z,r=new Z;if(e.index!==null){let a=e.attributes.position,c=e.index,d=e.groups;d.length===0&&(d=[{start:0,count:c.count,materialIndex:0}]);for(let u=0,m=d.length;u<m;++u){let g=d[u],p=g.start,b=g.count;for(let M=p,A=p+b;M<A;M+=3)for(let v=0;v<3;v++){let x=c.getX(M+v),F=c.getX(M+(v+1)%3);s.fromBufferAttribute(a,x),r.fromBufferAttribute(a,F),Kd(s,r,n)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}}else{let a=e.attributes.position;for(let c=0,d=a.count/3;c<d;c++)for(let u=0;u<3;u++){let m=3*c+u,g=3*c+(u+1)%3;s.fromBufferAttribute(a,m),r.fromBufferAttribute(a,g),Kd(s,r,n)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new wn(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Kd(i,e,t){let n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,s=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)===!0||t.has(s)===!0?!1:(t.add(n),t.add(s),!0)}function pr(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Jd(s))s.isRenderTargetTexture?(_t("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Jd(s[0])){let r=[];for(let a=0,c=s.length;a<c;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Xn(i){let e={};for(let t=0;t<i.length;t++){let n=pr(i[t]);for(let s in n)e[s]=n[s]}return e}function Jd(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function fg(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function du(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:kt.workingColorSpace}var ha={clone:pr,merge:Xn},pg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,jn=class extends Bs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pg,this.fragmentShader=mg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=pr(e.uniforms),this.uniformsGroups=fg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Ct().setHex(s.value);break;case"v2":this.uniforms[n].value=new yt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new Z().fromArray(s.value);break;case"v4":this.uniforms[n].value=new tn().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Tt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new dn().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},yl=class extends jn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var bl=class extends Bs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Cf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Sl=class extends Bs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ja(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}var Vs=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let c=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===c)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let c=t[1];e<c&&(n=2,r=c);for(let d=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===d)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let c=n+a>>>1;e<t[c]?a=c:n=c+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ml=class extends Vs{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Fh,endingEnd:Fh}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,c=s[r],d=s[a];if(c===void 0)switch(this.getSettings_().endingStart){case Oh:r=e,c=2*t-n;break;case Bh:r=s.length-2,c=t+s[r]-s[r+1];break;default:r=e,c=n}if(d===void 0)switch(this.getSettings_().endingEnd){case Oh:a=e,d=2*n-t;break;case Bh:a=1,d=n+s[1]-s[0];break;default:a=e-1,d=t}let u=(n-t)*.5,m=this.valueSize;this._weightPrev=u/(t-c),this._weightNext=u/(d-n),this._offsetPrev=r*m,this._offsetNext=a*m}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,c=this.valueSize,d=e*c,u=d-c,m=this._offsetPrev,g=this._offsetNext,p=this._weightPrev,b=this._weightNext,M=(n-t)/(s-t),A=M*M,v=A*M,x=-p*v+2*p*A-p*M,F=(1+p)*v+(-1.5-2*p)*A+(-.5+p)*M+1,H=(-1-b)*v+(1.5+b)*A+.5*M,I=b*v-b*A;for(let z=0;z!==c;++z)r[z]=x*a[m+z]+F*a[u+z]+H*a[d+z]+I*a[g+z];return r}},wl=class extends Vs{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,c=this.valueSize,d=e*c,u=d-c,m=(n-t)/(s-t),g=1-m;for(let p=0;p!==c;++p)r[p]=a[u+p]*g+a[d+p]*m;return r}},El=class extends Vs{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Tl=class extends Vs{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,c=this.valueSize,d=e*c,u=d-c,m=this.inTangents,g=this.outTangents;if(!m||!g){let M=(n-t)/(s-t),A=1-M;for(let v=0;v!==c;++v)r[v]=a[u+v]*A+a[d+v]*M;return r}let p=c*2,b=e-1;for(let M=0;M!==c;++M){let A=a[u+M],v=a[d+M],x=b*p+M*2,F=g[x],H=g[x+1],I=e*p+M*2,z=m[I],O=m[I+1],G=(n-t)/(s-t),w,N,j,Y,X;for(let xe=0;xe<8;xe++){w=G*G,N=w*G,j=1-G,Y=j*j,X=Y*j;let ae=X*t+3*Y*G*F+3*j*w*z+N*s-n;if(Math.abs(ae)<1e-10)break;let ge=3*Y*(F-t)+6*j*G*(z-F)+3*w*(s-z);if(Math.abs(ge)<1e-10)break;G=G-ae/ge,G=Math.max(0,Math.min(1,G))}r[M]=X*A+3*Y*G*H+3*j*w*O+N*v}return r}},pi=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ja(t,this.TimeBufferType),this.values=Ja(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ja(e.times,Array),values:Ja(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new El(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new wl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ml(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Tl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Do:t=this.InterpolantFactoryMethodDiscrete;break;case dl:t=this.InterpolantFactoryMethodLinear;break;case tl:t=this.InterpolantFactoryMethodSmooth;break;case Nh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return _t("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Do;case this.InterpolantFactoryMethodLinear:return dl;case this.InterpolantFactoryMethodSmooth:return tl;case this.InterpolantFactoryMethodBezier:return Nh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let c=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*c,a*c)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(vt("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(vt("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let c=0;c!==r;c++){let d=n[c];if(typeof d=="number"&&isNaN(d)){vt("KeyframeTrack: Time is not a valid number.",this,c,d),e=!1;break}if(a!==null&&a>d){vt("KeyframeTrack: Out of order keys.",this,c,d,a),e=!1;break}a=d}if(s!==void 0&&Lm(s))for(let c=0,d=s.length;c!==d;++c){let u=s[c];if(isNaN(u)){vt("KeyframeTrack: Value is not a valid number.",this,c,u),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===tl,r=e.length-1,a=1;for(let c=1;c<r;++c){let d=!1,u=e[c],m=e[c+1];if(u!==m&&(c!==1||u!==e[0]))if(s)d=!0;else{let g=c*n,p=g-n,b=g+n;for(let M=0;M!==n;++M){let A=t[g+M];if(A!==t[p+M]||A!==t[b+M]){d=!0;break}}}if(d){if(c!==a){e[a]=e[c];let g=c*n,p=a*n;for(let b=0;b!==n;++b)t[p+b]=t[g+b]}++a}}if(r>0){e[a]=e[r];for(let c=r*n,d=a*n,u=0;u!==n;++u)t[d+u]=t[c+u];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};pi.prototype.ValueTypeName="";pi.prototype.TimeBufferType=Float32Array;pi.prototype.ValueBufferType=Float32Array;pi.prototype.DefaultInterpolation=dl;var Hs=class extends pi{constructor(e,t,n){super(e,t,n)}};Hs.prototype.ValueTypeName="bool";Hs.prototype.ValueBufferType=Array;Hs.prototype.DefaultInterpolation=Do;Hs.prototype.InterpolantFactoryMethodLinear=void 0;Hs.prototype.InterpolantFactoryMethodSmooth=void 0;var Al=class extends pi{constructor(e,t,n,s){super(e,t,n,s)}};Al.prototype.ValueTypeName="color";var Cl=class extends pi{constructor(e,t,n,s){super(e,t,n,s)}};Cl.prototype.ValueTypeName="number";var Rl=class extends Vs{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,c=this.valueSize,d=(n-t)/(s-t),u=e*c;for(let m=u+c;u!==m;u+=4)ui.slerpFlat(r,0,a,u-c,a,u,d);return r}},Zo=class extends pi{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Rl(this.times,this.values,this.getValueSize(),e)}};Zo.prototype.ValueTypeName="quaternion";Zo.prototype.InterpolantFactoryMethodSmooth=void 0;var Gs=class extends pi{constructor(e,t,n){super(e,t,n)}};Gs.prototype.ValueTypeName="string";Gs.prototype.ValueBufferType=Array;Gs.prototype.DefaultInterpolation=Do;Gs.prototype.InterpolantFactoryMethodLinear=void 0;Gs.prototype.InterpolantFactoryMethodSmooth=void 0;var Pl=class extends pi{constructor(e,t,n,s){super(e,t,n,s)}};Pl.prototype.ValueTypeName="vector";var Il=class{constructor(e,t,n){let s=this,r=!1,a=0,c=0,d,u=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(m){c++,r===!1&&s.onStart!==void 0&&s.onStart(m,a,c),r=!0},this.itemEnd=function(m){a++,s.onProgress!==void 0&&s.onProgress(m,a,c),a===c&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(m){s.onError!==void 0&&s.onError(m)},this.resolveURL=function(m){return m=m.normalize("NFC"),d?d(m):m},this.setURLModifier=function(m){return d=m,this},this.addHandler=function(m,g){return u.push(m,g),this},this.removeHandler=function(m){let g=u.indexOf(m);return g!==-1&&u.splice(g,2),this},this.getHandler=function(m){for(let g=0,p=u.length;g<p;g+=2){let b=u[g],M=u[g+1];if(b.global&&(b.lastIndex=0),b.test(m))return M}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Vf=new Il,Ll=class{constructor(e){this.manager=e!==void 0?e:Vf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Ll.DEFAULT_MATERIAL_NAME="__DEFAULT";var ja=new Z,Qa=new ui,Gi=new Z,Ko=class extends fi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new dn,this.projectionMatrix=new dn,this.projectionMatrixInverse=new dn,this.coordinateSystem=Ci,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ja,Qa,Gi),Gi.x===1&&Gi.y===1&&Gi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ja,Qa,Gi.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(ja,Qa,Gi),Gi.x===1&&Gi.y===1&&Gi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ja,Qa,Gi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ns=new Z,jd=new yt,Qd=new yt,Wn=class extends Ko{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Yr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Wr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Yr*2*Math.atan(Math.tan(Wr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ns.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ns.x,Ns.y).multiplyScalar(-e/Ns.z),Ns.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ns.x,Ns.y).multiplyScalar(-e/Ns.z)}getViewSize(e,t){return this.getViewBounds(e,jd,Qd),t.subVectors(Qd,jd)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Wr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let d=a.fullWidth,u=a.fullHeight;r+=a.offsetX*s/d,t-=a.offsetY*n/u,s*=a.width/d,n*=a.height/u}let c=this.filmOffset;c!==0&&(r+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var dr=class extends Ko{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,c=s+t,d=s-t;if(this.view!==null&&this.view.enabled){let u=(this.right-this.left)/this.view.fullWidth/this.zoom,m=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=u*this.view.offsetX,a=r+u*this.view.width,c-=m*this.view.offsetY,d=c-m*this.view.height}this.projectionMatrix.makeOrthographic(r,a,c,d,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var Jo=class extends On{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var zr=-90,Vr=1,Dl=class extends fi{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Wn(zr,Vr,e,t);s.layers=this.layers,this.add(s);let r=new Wn(zr,Vr,e,t);r.layers=this.layers,this.add(r);let a=new Wn(zr,Vr,e,t);a.layers=this.layers,this.add(a);let c=new Wn(zr,Vr,e,t);c.layers=this.layers,this.add(c);let d=new Wn(zr,Vr,e,t);d.layers=this.layers,this.add(d);let u=new Wn(zr,Vr,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,c,d]=t;for(let u of t)this.remove(u);if(e===Ci)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),d.up.set(0,1,0),d.lookAt(0,0,-1);else if(e===Fo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),d.up.set(0,-1,0),d.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,c,d,u,m]=this.children,g=e.getRenderTarget(),p=e.getActiveCubeFace(),b=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;let A=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let v=!1;e.isWebGLRenderer===!0?v=e.state.buffers.depth.getReversed():v=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,3,s),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(n,4,s),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),n.texture.generateMipmaps=A,e.setRenderTarget(n,5,s),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,m),e.setRenderTarget(g,p,b),e.xr.enabled=M,n.texture.needsPMREMUpdate=!0}},Ul=class extends Wn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var fu="\\[\\]\\.:\\/",gg=new RegExp("["+fu+"]","g"),pu="[^"+fu+"]",_g="[^"+fu.replace("\\.","")+"]",xg=/((?:WC+[\/:])*)/.source.replace("WC",pu),vg=/(WCOD+)?/.source.replace("WCOD",_g),yg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",pu),bg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",pu),Sg=new RegExp("^"+xg+vg+yg+bg+"$"),Mg=["material","materials","bones","map"],Vh=class{constructor(e,t,n){let s=n||un.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},un=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(gg,"")}static parseTrackName(e){let t=Sg.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Mg.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let c=r[a];if(c.name===t||c.uuid===t)return c;let d=n(c.children);if(d)return d}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){_t("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let u=t.objectIndex;switch(n){case"materials":if(!e.material){vt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){vt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){vt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let m=0;m<e.length;m++)if(e[m].name===u){u=m;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){vt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){vt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){vt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(u!==void 0){if(e[u]===void 0){vt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[u]}}let a=e[s];if(a===void 0){let u=t.nodeName;vt("PropertyBinding: Trying to update property for track: "+u+"."+s+" but it wasn't found.",e);return}let c=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?c=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let d=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){vt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){vt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}d=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(d=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(d=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[d],this.setValue=this.SetterByBindingTypeAndVersioning[d][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};un.Composite=Vh;un.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};un.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};un.prototype.GetterByBindingType=[un.prototype._getValue_direct,un.prototype._getValue_array,un.prototype._getValue_arrayElement,un.prototype._getValue_toArray];un.prototype.SetterByBindingTypeAndVersioning=[[un.prototype._setValue_direct,un.prototype._setValue_direct_setNeedsUpdate,un.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[un.prototype._setValue_array,un.prototype._setValue_array_setNeedsUpdate,un.prototype._setValue_array_setMatrixWorldNeedsUpdate],[un.prototype._setValue_arrayElement,un.prototype._setValue_arrayElement_setNeedsUpdate,un.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[un.prototype._setValue_fromArray,un.prototype._setValue_fromArray_setNeedsUpdate,un.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var zy=new Float32Array(1);var qi=class extends _l{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}};var ef=new dn,jo=class{constructor(e,t,n=0,s=1/0){this.ray=new ks(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Kr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):vt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ef.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ef),this}intersectObject(e,t=!0,n=[]){return Hh(e,this,n,t),n.sort(tf),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Hh(e[s],this,n,t);return n.sort(tf),n}};function tf(i,e){return i.distance-e.distance}function Hh(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,c=r.length;a<c;a++)Hh(r[a],e,t,!0)}}var Yi=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=At(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(At(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Gh=class i{static{i.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};var nf=new Z,el=new Z,Hr=new Z,Gr=new Z,Uh=new Z,wg=new Z,Eg=new Z,Qo=class{constructor(e=new Z,t=new Z){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){nf.subVectors(e,this.start),el.subVectors(this.end,this.start);let n=el.dot(el);if(n===0)return 0;let r=el.dot(nf)/n;return t&&(r=At(r,0,1)),r}closestPointToPoint(e,t,n){let s=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(s).add(this.start)}distanceSqToLine3(e,t=wg,n=Eg){let s=10000000000000001e-32,r,a,c=this.start,d=e.start,u=this.end,m=e.end;Hr.subVectors(u,c),Gr.subVectors(m,d),Uh.subVectors(c,d);let g=Hr.dot(Hr),p=Gr.dot(Gr),b=Gr.dot(Uh);if(g<=s&&p<=s)return t.copy(c),n.copy(d),t.sub(n),t.dot(t);if(g<=s)r=0,a=b/p,a=At(a,0,1);else{let M=Hr.dot(Uh);if(p<=s)a=0,r=At(-M/g,0,1);else{let A=Hr.dot(Gr),v=g*p-A*A;v!==0?r=At((A*b-M*p)/v,0,1):r=0,a=(A*r+b)/p,a<0?(a=0,r=At(-M/g,0,1)):a>1&&(a=1,r=At((A-M)/g,0,1))}}return t.copy(c).addScaledVector(Hr,r),n.copy(d).addScaledVector(Gr,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};var ea=class extends Pi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){_t("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function mu(i,e,t,n){let s=Tg(n);switch(t){case ou:return i*e;case lu:return i*e/s.components*s.byteLength;case Vl:return i*e/s.components*s.byteLength;case Ys:return i*e*2/s.components*s.byteLength;case Hl:return i*e*2/s.components*s.byteLength;case au:return i*e*3/s.components*s.byteLength;case bi:return i*e*4/s.components*s.byteLength;case Gl:return i*e*4/s.components*s.byteLength;case sa:case ra:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case oa:case aa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Xl:case ql:return Math.max(i,16)*Math.max(e,8)/4;case Wl:case $l:return Math.max(i,8)*Math.max(e,8)/2;case Yl:case Zl:case Jl:case jl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Kl:case la:case Ql:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ec:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case tc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case nc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ic:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case sc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case rc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case oc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ac:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case lc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case cc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case hc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case uc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case dc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case fc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case pc:case mc:case gc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case _c:case xc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ca:case vc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Tg(i){switch(i){case gi:case nu:return{byteLength:1,components:1};case io:case iu:case Ki:return{byteLength:2,components:1};case kl:case zl:return{byteLength:2,components:4};case Di:case Bl:case Ui:return{byteLength:4,components:1};case su:case ru:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?_t("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function hp(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Cg(i){let e=new WeakMap;function t(c,d){let u=c.array,m=c.usage,g=u.byteLength,p=i.createBuffer();i.bindBuffer(d,p),i.bufferData(d,u,m),c.onUploadCallback();let b;if(u instanceof Float32Array)b=i.FLOAT;else if(typeof Float16Array<"u"&&u instanceof Float16Array)b=i.HALF_FLOAT;else if(u instanceof Uint16Array)c.isFloat16BufferAttribute?b=i.HALF_FLOAT:b=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)b=i.SHORT;else if(u instanceof Uint32Array)b=i.UNSIGNED_INT;else if(u instanceof Int32Array)b=i.INT;else if(u instanceof Int8Array)b=i.BYTE;else if(u instanceof Uint8Array)b=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)b=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:p,type:b,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:g}}function n(c,d,u){let m=d.array,g=d.updateRanges;if(i.bindBuffer(u,c),g.length===0)i.bufferSubData(u,0,m);else{g.sort((b,M)=>b.start-M.start);let p=0;for(let b=1;b<g.length;b++){let M=g[p],A=g[b];A.start<=M.start+M.count+1?M.count=Math.max(M.count,A.start+A.count-M.start):(++p,g[p]=A)}g.length=p+1;for(let b=0,M=g.length;b<M;b++){let A=g[b];i.bufferSubData(u,A.start*m.BYTES_PER_ELEMENT,m,A.start,A.count)}d.clearUpdateRanges()}d.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function r(c){c.isInterleavedBufferAttribute&&(c=c.data);let d=e.get(c);d&&(i.deleteBuffer(d.buffer),e.delete(c))}function a(c,d){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){let m=e.get(c);(!m||m.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}let u=e.get(c);if(u===void 0)e.set(c,t(c,d));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(u.buffer,c,d),u.version=c.version}}return{get:s,remove:r,update:a}}var Rg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pg=`#ifdef USE_ALPHAHASH
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
#endif`,Ig=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ug=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ng=`#ifdef USE_AOMAP
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
#endif`,Fg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Og=`#ifdef USE_BATCHING
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
#endif`,Bg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,kg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,zg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Hg=`#ifdef USE_IRIDESCENCE
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
#endif`,Gg=`#ifdef USE_BUMPMAP
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
#endif`,Wg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Xg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$g=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Zg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Kg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Jg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,jg=`#define PI 3.141592653589793
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
} // validated`,Qg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,e0=`vec3 transformedNormal = objectNormal;
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
#endif`,t0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,n0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,i0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,s0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,r0="gl_FragColor = linearToOutputTexel( gl_FragColor );",o0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,a0=`#ifdef USE_ENVMAP
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
#endif`,l0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,c0=`#ifdef USE_ENVMAP
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
#endif`,h0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,u0=`#ifdef USE_ENVMAP
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
#endif`,d0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,f0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,p0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,m0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,g0=`#ifdef USE_GRADIENTMAP
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
}`,_0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,x0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,v0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,y0=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,b0=`#ifdef USE_ENVMAP
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
#endif`,S0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,M0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,w0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,E0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,T0=`PhysicalMaterial material;
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
#endif`,A0=`uniform sampler2D dfgLUT;
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
}`,C0=`
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
#endif`,R0=`#if defined( RE_IndirectDiffuse )
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
#endif`,P0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,I0=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,L0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,D0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,U0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,N0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,F0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,O0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,B0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,k0=`#if defined( USE_POINTS_UV )
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
#endif`,z0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,V0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,H0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,G0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,W0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,X0=`#ifdef USE_MORPHTARGETS
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
#endif`,$0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,q0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Y0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Z0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,K0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,J0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,j0=`#ifdef USE_NORMALMAP
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
#endif`,Q0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,e_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,t_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,n_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,i_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,s_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,r_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,o_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,a_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,l_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,c_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,h_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,u_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,d_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,f_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,p_=`float getShadowMask() {
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
}`,m_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,g_=`#ifdef USE_SKINNING
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
#endif`,__=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,x_=`#ifdef USE_SKINNING
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
#endif`,v_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,y_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,b_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,S_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,M_=`#ifdef USE_TRANSMISSION
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
#endif`,w_=`#ifdef USE_TRANSMISSION
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
#endif`,E_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,T_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,A_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,C_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,R_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,P_=`uniform sampler2D t2D;
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
}`,I_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,L_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,D_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,U_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N_=`#include <common>
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
}`,F_=`#if DEPTH_PACKING == 3200
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
}`,O_=`#define DISTANCE
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
}`,B_=`#define DISTANCE
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
}`,k_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,z_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,V_=`uniform float scale;
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
}`,H_=`uniform vec3 diffuse;
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
}`,G_=`#include <common>
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
}`,W_=`uniform vec3 diffuse;
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
}`,X_=`#define LAMBERT
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
}`,$_=`#define LAMBERT
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
}`,q_=`#define MATCAP
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
}`,Y_=`#define MATCAP
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
}`,Z_=`#define NORMAL
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
}`,K_=`#define NORMAL
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
}`,J_=`#define PHONG
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
}`,j_=`#define PHONG
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
}`,Q_=`#define STANDARD
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
}`,ex=`#define STANDARD
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
}`,tx=`#define TOON
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
}`,nx=`#define TOON
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
}`,ix=`uniform float size;
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
}`,sx=`uniform vec3 diffuse;
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
}`,rx=`#include <common>
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
}`,ox=`uniform vec3 color;
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
}`,ax=`uniform float rotation;
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
}`,lx=`uniform vec3 diffuse;
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
}`,Lt={alphahash_fragment:Rg,alphahash_pars_fragment:Pg,alphamap_fragment:Ig,alphamap_pars_fragment:Lg,alphatest_fragment:Dg,alphatest_pars_fragment:Ug,aomap_fragment:Ng,aomap_pars_fragment:Fg,batching_pars_vertex:Og,batching_vertex:Bg,begin_vertex:kg,beginnormal_vertex:zg,bsdfs:Vg,iridescence_fragment:Hg,bumpmap_pars_fragment:Gg,clipping_planes_fragment:Wg,clipping_planes_pars_fragment:Xg,clipping_planes_pars_vertex:$g,clipping_planes_vertex:qg,color_fragment:Yg,color_pars_fragment:Zg,color_pars_vertex:Kg,color_vertex:Jg,common:jg,cube_uv_reflection_fragment:Qg,defaultnormal_vertex:e0,displacementmap_pars_vertex:t0,displacementmap_vertex:n0,emissivemap_fragment:i0,emissivemap_pars_fragment:s0,colorspace_fragment:r0,colorspace_pars_fragment:o0,envmap_fragment:a0,envmap_common_pars_fragment:l0,envmap_pars_fragment:c0,envmap_pars_vertex:h0,envmap_physical_pars_fragment:b0,envmap_vertex:u0,fog_vertex:d0,fog_pars_vertex:f0,fog_fragment:p0,fog_pars_fragment:m0,gradientmap_pars_fragment:g0,lightmap_pars_fragment:_0,lights_lambert_fragment:x0,lights_lambert_pars_fragment:v0,lights_pars_begin:y0,lights_toon_fragment:S0,lights_toon_pars_fragment:M0,lights_phong_fragment:w0,lights_phong_pars_fragment:E0,lights_physical_fragment:T0,lights_physical_pars_fragment:A0,lights_fragment_begin:C0,lights_fragment_maps:R0,lights_fragment_end:P0,lightprobes_pars_fragment:I0,logdepthbuf_fragment:L0,logdepthbuf_pars_fragment:D0,logdepthbuf_pars_vertex:U0,logdepthbuf_vertex:N0,map_fragment:F0,map_pars_fragment:O0,map_particle_fragment:B0,map_particle_pars_fragment:k0,metalnessmap_fragment:z0,metalnessmap_pars_fragment:V0,morphinstance_vertex:H0,morphcolor_vertex:G0,morphnormal_vertex:W0,morphtarget_pars_vertex:X0,morphtarget_vertex:$0,normal_fragment_begin:q0,normal_fragment_maps:Y0,normal_pars_fragment:Z0,normal_pars_vertex:K0,normal_vertex:J0,normalmap_pars_fragment:j0,clearcoat_normal_fragment_begin:Q0,clearcoat_normal_fragment_maps:e_,clearcoat_pars_fragment:t_,iridescence_pars_fragment:n_,opaque_fragment:i_,packing:s_,premultiplied_alpha_fragment:r_,project_vertex:o_,dithering_fragment:a_,dithering_pars_fragment:l_,roughnessmap_fragment:c_,roughnessmap_pars_fragment:h_,shadowmap_pars_fragment:u_,shadowmap_pars_vertex:d_,shadowmap_vertex:f_,shadowmask_pars_fragment:p_,skinbase_vertex:m_,skinning_pars_vertex:g_,skinning_vertex:__,skinnormal_vertex:x_,specularmap_fragment:v_,specularmap_pars_fragment:y_,tonemapping_fragment:b_,tonemapping_pars_fragment:S_,transmission_fragment:M_,transmission_pars_fragment:w_,uv_pars_fragment:E_,uv_pars_vertex:T_,uv_vertex:A_,worldpos_vertex:C_,background_vert:R_,background_frag:P_,backgroundCube_vert:I_,backgroundCube_frag:L_,cube_vert:D_,cube_frag:U_,depth_vert:N_,depth_frag:F_,distance_vert:O_,distance_frag:B_,equirect_vert:k_,equirect_frag:z_,linedashed_vert:V_,linedashed_frag:H_,meshbasic_vert:G_,meshbasic_frag:W_,meshlambert_vert:X_,meshlambert_frag:$_,meshmatcap_vert:q_,meshmatcap_frag:Y_,meshnormal_vert:Z_,meshnormal_frag:K_,meshphong_vert:J_,meshphong_frag:j_,meshphysical_vert:Q_,meshphysical_frag:ex,meshtoon_vert:tx,meshtoon_frag:nx,points_vert:ix,points_frag:sx,shadow_vert:rx,shadow_frag:ox,sprite_vert:ax,sprite_frag:lx},Ve={common:{diffuse:{value:new Ct(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Tt},alphaMap:{value:null},alphaMapTransform:{value:new Tt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Tt}},envmap:{envMap:{value:null},envMapRotation:{value:new Tt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Tt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Tt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Tt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Tt},normalScale:{value:new yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Tt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Tt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Tt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Tt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ct(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Z},probesMax:{value:new Z},probesResolution:{value:new Z}},points:{diffuse:{value:new Ct(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Tt},alphaTest:{value:0},uvTransform:{value:new Tt}},sprite:{diffuse:{value:new Ct(16777215)},opacity:{value:1},center:{value:new yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Tt},alphaMap:{value:null},alphaMapTransform:{value:new Tt},alphaTest:{value:0}}},ei={basic:{uniforms:Xn([Ve.common,Ve.specularmap,Ve.envmap,Ve.aomap,Ve.lightmap,Ve.fog]),vertexShader:Lt.meshbasic_vert,fragmentShader:Lt.meshbasic_frag},lambert:{uniforms:Xn([Ve.common,Ve.specularmap,Ve.envmap,Ve.aomap,Ve.lightmap,Ve.emissivemap,Ve.bumpmap,Ve.normalmap,Ve.displacementmap,Ve.fog,Ve.lights,{emissive:{value:new Ct(0)},envMapIntensity:{value:1}}]),vertexShader:Lt.meshlambert_vert,fragmentShader:Lt.meshlambert_frag},phong:{uniforms:Xn([Ve.common,Ve.specularmap,Ve.envmap,Ve.aomap,Ve.lightmap,Ve.emissivemap,Ve.bumpmap,Ve.normalmap,Ve.displacementmap,Ve.fog,Ve.lights,{emissive:{value:new Ct(0)},specular:{value:new Ct(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Lt.meshphong_vert,fragmentShader:Lt.meshphong_frag},standard:{uniforms:Xn([Ve.common,Ve.envmap,Ve.aomap,Ve.lightmap,Ve.emissivemap,Ve.bumpmap,Ve.normalmap,Ve.displacementmap,Ve.roughnessmap,Ve.metalnessmap,Ve.fog,Ve.lights,{emissive:{value:new Ct(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Lt.meshphysical_vert,fragmentShader:Lt.meshphysical_frag},toon:{uniforms:Xn([Ve.common,Ve.aomap,Ve.lightmap,Ve.emissivemap,Ve.bumpmap,Ve.normalmap,Ve.displacementmap,Ve.gradientmap,Ve.fog,Ve.lights,{emissive:{value:new Ct(0)}}]),vertexShader:Lt.meshtoon_vert,fragmentShader:Lt.meshtoon_frag},matcap:{uniforms:Xn([Ve.common,Ve.bumpmap,Ve.normalmap,Ve.displacementmap,Ve.fog,{matcap:{value:null}}]),vertexShader:Lt.meshmatcap_vert,fragmentShader:Lt.meshmatcap_frag},points:{uniforms:Xn([Ve.points,Ve.fog]),vertexShader:Lt.points_vert,fragmentShader:Lt.points_frag},dashed:{uniforms:Xn([Ve.common,Ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Lt.linedashed_vert,fragmentShader:Lt.linedashed_frag},depth:{uniforms:Xn([Ve.common,Ve.displacementmap]),vertexShader:Lt.depth_vert,fragmentShader:Lt.depth_frag},normal:{uniforms:Xn([Ve.common,Ve.bumpmap,Ve.normalmap,Ve.displacementmap,{opacity:{value:1}}]),vertexShader:Lt.meshnormal_vert,fragmentShader:Lt.meshnormal_frag},sprite:{uniforms:Xn([Ve.sprite,Ve.fog]),vertexShader:Lt.sprite_vert,fragmentShader:Lt.sprite_frag},background:{uniforms:{uvTransform:{value:new Tt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Lt.background_vert,fragmentShader:Lt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Tt}},vertexShader:Lt.backgroundCube_vert,fragmentShader:Lt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Lt.cube_vert,fragmentShader:Lt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Lt.equirect_vert,fragmentShader:Lt.equirect_frag},distance:{uniforms:Xn([Ve.common,Ve.displacementmap,{referencePosition:{value:new Z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Lt.distance_vert,fragmentShader:Lt.distance_frag},shadow:{uniforms:Xn([Ve.lights,Ve.fog,{color:{value:new Ct(0)},opacity:{value:1}}]),vertexShader:Lt.shadow_vert,fragmentShader:Lt.shadow_frag}};ei.physical={uniforms:Xn([ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Tt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Tt},clearcoatNormalScale:{value:new yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Tt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Tt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Tt},sheen:{value:0},sheenColor:{value:new Ct(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Tt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Tt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Tt},transmissionSamplerSize:{value:new yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Tt},attenuationDistance:{value:0},attenuationColor:{value:new Ct(0)},specularColor:{value:new Ct(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Tt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Tt},anisotropyVector:{value:new yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Tt}}]),vertexShader:Lt.meshphysical_vert,fragmentShader:Lt.meshphysical_frag};var Sc={r:0,b:0,g:0},cx=new dn,up=new Tt;up.set(-1,0,0,0,1,0,0,0,1);function hx(i,e,t,n,s,r){let a=new Ct(0),c=s===!0?0:1,d,u,m=null,g=0,p=null;function b(F){let H=F.isScene===!0?F.background:null;if(H&&H.isTexture){let I=F.backgroundBlurriness>0;H=e.get(H,I)}return H}function M(F){let H=!1,I=b(F);I===null?v(a,c):I&&I.isColor&&(v(I,1),H=!0);let z=i.xr.getEnvironmentBlendMode();z==="additive"?t.buffers.color.setClear(0,0,0,1,r):z==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||H)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function A(F,H){let I=b(H);I&&(I.isCubeTexture||I.mapping===na)?(u===void 0&&(u=new yn(new $i(1,1,1),new jn({name:"BackgroundCubeMaterial",uniforms:pr(ei.backgroundCube.uniforms),vertexShader:ei.backgroundCube.vertexShader,fragmentShader:ei.backgroundCube.fragmentShader,side:Qn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(z,O,G){this.matrixWorld.copyPosition(G.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(u)),u.material.uniforms.envMap.value=I,u.material.uniforms.backgroundBlurriness.value=H.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=H.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(cx.makeRotationFromEuler(H.backgroundRotation)).transpose(),I.isCubeTexture&&I.isRenderTargetTexture===!1&&u.material.uniforms.backgroundRotation.value.premultiply(up),u.material.toneMapped=kt.getTransfer(I.colorSpace)!==Jt,(m!==I||g!==I.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,m=I,g=I.version,p=i.toneMapping),u.layers.enableAll(),F.unshift(u,u.geometry,u.material,0,0,null)):I&&I.isTexture&&(d===void 0&&(d=new yn(new zs(2,2),new jn({name:"BackgroundMaterial",uniforms:pr(ei.background.uniforms),vertexShader:ei.background.vertexShader,fragmentShader:ei.background.fragmentShader,side:xs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(d)),d.material.uniforms.t2D.value=I,d.material.uniforms.backgroundIntensity.value=H.backgroundIntensity,d.material.toneMapped=kt.getTransfer(I.colorSpace)!==Jt,I.matrixAutoUpdate===!0&&I.updateMatrix(),d.material.uniforms.uvTransform.value.copy(I.matrix),(m!==I||g!==I.version||p!==i.toneMapping)&&(d.material.needsUpdate=!0,m=I,g=I.version,p=i.toneMapping),d.layers.enableAll(),F.unshift(d,d.geometry,d.material,0,0,null))}function v(F,H){F.getRGB(Sc,du(i)),t.buffers.color.setClear(Sc.r,Sc.g,Sc.b,H,r)}function x(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0)}return{getClearColor:function(){return a},setClearColor:function(F,H=1){a.set(F),c=H,v(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(F){c=F,v(a,c)},render:M,addToRenderList:A,dispose:x}}function ux(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null),r=s,a=!1;function c(Y,X,xe,ne,ae){let ge=!1,he=g(Y,ne,xe,X);r!==he&&(r=he,u(r.object)),ge=b(Y,ne,xe,ae),ge&&M(Y,ne,xe,ae),ae!==null&&e.update(ae,i.ELEMENT_ARRAY_BUFFER),(ge||a)&&(a=!1,I(Y,X,xe,ne),ae!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(ae).buffer))}function d(){return i.createVertexArray()}function u(Y){return i.bindVertexArray(Y)}function m(Y){return i.deleteVertexArray(Y)}function g(Y,X,xe,ne){let ae=ne.wireframe===!0,ge=n[X.id];ge===void 0&&(ge={},n[X.id]=ge);let he=Y.isInstancedMesh===!0?Y.id:0,ve=ge[he];ve===void 0&&(ve={},ge[he]=ve);let Te=ve[xe.id];Te===void 0&&(Te={},ve[xe.id]=Te);let se=Te[ae];return se===void 0&&(se=p(d()),Te[ae]=se),se}function p(Y){let X=[],xe=[],ne=[];for(let ae=0;ae<t;ae++)X[ae]=0,xe[ae]=0,ne[ae]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:X,enabledAttributes:xe,attributeDivisors:ne,object:Y,attributes:{},index:null}}function b(Y,X,xe,ne){let ae=r.attributes,ge=X.attributes,he=0,ve=xe.getAttributes();for(let Te in ve)if(ve[Te].location>=0){let Ze=ae[Te],et=ge[Te];if(et===void 0&&(Te==="instanceMatrix"&&Y.instanceMatrix&&(et=Y.instanceMatrix),Te==="instanceColor"&&Y.instanceColor&&(et=Y.instanceColor)),Ze===void 0||Ze.attribute!==et||et&&Ze.data!==et.data)return!0;he++}return r.attributesNum!==he||r.index!==ne}function M(Y,X,xe,ne){let ae={},ge=X.attributes,he=0,ve=xe.getAttributes();for(let Te in ve)if(ve[Te].location>=0){let Ze=ge[Te];Ze===void 0&&(Te==="instanceMatrix"&&Y.instanceMatrix&&(Ze=Y.instanceMatrix),Te==="instanceColor"&&Y.instanceColor&&(Ze=Y.instanceColor));let et={};et.attribute=Ze,Ze&&Ze.data&&(et.data=Ze.data),ae[Te]=et,he++}r.attributes=ae,r.attributesNum=he,r.index=ne}function A(){let Y=r.newAttributes;for(let X=0,xe=Y.length;X<xe;X++)Y[X]=0}function v(Y){x(Y,0)}function x(Y,X){let xe=r.newAttributes,ne=r.enabledAttributes,ae=r.attributeDivisors;xe[Y]=1,ne[Y]===0&&(i.enableVertexAttribArray(Y),ne[Y]=1),ae[Y]!==X&&(i.vertexAttribDivisor(Y,X),ae[Y]=X)}function F(){let Y=r.newAttributes,X=r.enabledAttributes;for(let xe=0,ne=X.length;xe<ne;xe++)X[xe]!==Y[xe]&&(i.disableVertexAttribArray(xe),X[xe]=0)}function H(Y,X,xe,ne,ae,ge,he){he===!0?i.vertexAttribIPointer(Y,X,xe,ae,ge):i.vertexAttribPointer(Y,X,xe,ne,ae,ge)}function I(Y,X,xe,ne){A();let ae=ne.attributes,ge=xe.getAttributes(),he=X.defaultAttributeValues;for(let ve in ge){let Te=ge[ve];if(Te.location>=0){let se=ae[ve];if(se===void 0&&(ve==="instanceMatrix"&&Y.instanceMatrix&&(se=Y.instanceMatrix),ve==="instanceColor"&&Y.instanceColor&&(se=Y.instanceColor)),se!==void 0){let Ze=se.normalized,et=se.itemSize,De=e.get(se);if(De===void 0)continue;let at=De.buffer,qe=De.type,ie=De.bytesPerElement,Ne=qe===i.INT||qe===i.UNSIGNED_INT||se.gpuType===Bl;if(se.isInterleavedBufferAttribute){let Ie=se.data,tt=Ie.stride,lt=se.offset;if(Ie.isInstancedInterleavedBuffer){for(let dt=0;dt<Te.locationSize;dt++)x(Te.location+dt,Ie.meshPerAttribute);Y.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=Ie.meshPerAttribute*Ie.count)}else for(let dt=0;dt<Te.locationSize;dt++)v(Te.location+dt);i.bindBuffer(i.ARRAY_BUFFER,at);for(let dt=0;dt<Te.locationSize;dt++)H(Te.location+dt,et/Te.locationSize,qe,Ze,tt*ie,(lt+et/Te.locationSize*dt)*ie,Ne)}else{if(se.isInstancedBufferAttribute){for(let Ie=0;Ie<Te.locationSize;Ie++)x(Te.location+Ie,se.meshPerAttribute);Y.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Ie=0;Ie<Te.locationSize;Ie++)v(Te.location+Ie);i.bindBuffer(i.ARRAY_BUFFER,at);for(let Ie=0;Ie<Te.locationSize;Ie++)H(Te.location+Ie,et/Te.locationSize,qe,Ze,et*ie,et/Te.locationSize*Ie*ie,Ne)}}else if(he!==void 0){let Ze=he[ve];if(Ze!==void 0)switch(Ze.length){case 2:i.vertexAttrib2fv(Te.location,Ze);break;case 3:i.vertexAttrib3fv(Te.location,Ze);break;case 4:i.vertexAttrib4fv(Te.location,Ze);break;default:i.vertexAttrib1fv(Te.location,Ze)}}}}F()}function z(){N();for(let Y in n){let X=n[Y];for(let xe in X){let ne=X[xe];for(let ae in ne){let ge=ne[ae];for(let he in ge)m(ge[he].object),delete ge[he];delete ne[ae]}}delete n[Y]}}function O(Y){if(n[Y.id]===void 0)return;let X=n[Y.id];for(let xe in X){let ne=X[xe];for(let ae in ne){let ge=ne[ae];for(let he in ge)m(ge[he].object),delete ge[he];delete ne[ae]}}delete n[Y.id]}function G(Y){for(let X in n){let xe=n[X];for(let ne in xe){let ae=xe[ne];if(ae[Y.id]===void 0)continue;let ge=ae[Y.id];for(let he in ge)m(ge[he].object),delete ge[he];delete ae[Y.id]}}}function w(Y){for(let X in n){let xe=n[X],ne=Y.isInstancedMesh===!0?Y.id:0,ae=xe[ne];if(ae!==void 0){for(let ge in ae){let he=ae[ge];for(let ve in he)m(he[ve].object),delete he[ve];delete ae[ge]}delete xe[ne],Object.keys(xe).length===0&&delete n[X]}}}function N(){j(),a=!0,r!==s&&(r=s,u(r.object))}function j(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:N,resetDefaultState:j,dispose:z,releaseStatesOfGeometry:O,releaseStatesOfObject:w,releaseStatesOfProgram:G,initAttributes:A,enableAttribute:v,disableUnusedAttributes:F}}function dx(i,e,t){let n;function s(d){n=d}function r(d,u){i.drawArrays(n,d,u),t.update(u,n,1)}function a(d,u,m){m!==0&&(i.drawArraysInstanced(n,d,u,m),t.update(u,n,m))}function c(d,u,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,d,0,u,0,m);let p=0;for(let b=0;b<m;b++)p+=u[b];t.update(p,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=c}function fx(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let G=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(G.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(G){return!(G!==bi&&n.convert(G)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(G){let w=G===Ki&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(G!==gi&&n.convert(G)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&G!==Ui&&!w)}function d(G){if(G==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";G="mediump"}return G==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=t.precision!==void 0?t.precision:"highp",m=d(u);m!==u&&(_t("WebGLRenderer:",u,"not supported, using",m,"instead."),u=m);let g=t.logarithmicDepthBuffer===!0,p=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&p===!1&&_t("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let b=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=i.getParameter(i.MAX_TEXTURE_SIZE),v=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),x=i.getParameter(i.MAX_VERTEX_ATTRIBS),F=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),H=i.getParameter(i.MAX_VARYING_VECTORS),I=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),z=i.getParameter(i.MAX_SAMPLES),O=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:d,textureFormatReadable:a,textureTypeReadable:c,precision:u,logarithmicDepthBuffer:g,reversedDepthBuffer:p,maxTextures:b,maxVertexTextures:M,maxTextureSize:A,maxCubemapSize:v,maxAttributes:x,maxVertexUniforms:F,maxVaryings:H,maxFragmentUniforms:I,maxSamples:z,samples:O}}function px(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Kn,c=new Tt,d={value:null,needsUpdate:!1};this.uniform=d,this.numPlanes=0,this.numIntersection=0,this.init=function(g,p){let b=g.length!==0||p||n!==0||s;return s=p,n=g.length,b},this.beginShadows=function(){r=!0,m(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(g,p){t=m(g,p,0)},this.setState=function(g,p,b){let M=g.clippingPlanes,A=g.clipIntersection,v=g.clipShadows,x=i.get(g);if(!s||M===null||M.length===0||r&&!v)r?m(null):u();else{let F=r?0:n,H=F*4,I=x.clippingState||null;d.value=I,I=m(M,p,H,b);for(let z=0;z!==H;++z)I[z]=t[z];x.clippingState=I,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=F}};function u(){d.value!==t&&(d.value=t,d.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function m(g,p,b,M){let A=g!==null?g.length:0,v=null;if(A!==0){if(v=d.value,M!==!0||v===null){let x=b+A*4,F=p.matrixWorldInverse;c.getNormalMatrix(F),(v===null||v.length<x)&&(v=new Float32Array(x));for(let H=0,I=b;H!==A;++H,I+=4)a.copy(g[H]).applyMatrix4(F,c),a.normal.toArray(v,I),v[I+3]=a.constant}d.value=v,d.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,v}}var Zs=4,Hf=[.125,.215,.35,.446,.526,.582],mr=20,mx=256,ua=new dr,Gf=new Ct,gu=null,_u=0,xu=0,vu=!1,gx=new Z,wc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:c=gx}=r;gu=this._renderer.getRenderTarget(),_u=this._renderer.getActiveCubeFace(),xu=this._renderer.getActiveMipmapLevel(),vu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let d=this._allocateTargets();return d.depthBuffer=!0,this._sceneToCubeUV(e,n,s,d,c),t>0&&this._blur(d,0,0,t),this._applyPMREM(d),this._cleanup(d),d}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$f(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(gu,_u,xu),this._renderer.xr.enabled=vu,e.scissorTest=!1,ro(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Xs||e.mapping===fr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),gu=this._renderer.getRenderTarget(),_u=this._renderer.getActiveCubeFace(),xu=this._renderer.getActiveMipmapLevel(),vu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Nn,minFilter:Nn,generateMipmaps:!1,type:Ki,format:bi,colorSpace:Uo,depthBuffer:!1},s=Wf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wf(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=_x(r)),this._blurMaterial=vx(r,e,t),this._ggxMaterial=xx(r,e,t)}return s}_compileMaterial(e){let t=new yn(new On,e);this._renderer.compile(t,ua)}_sceneToCubeUV(e,t,n,s,r){let d=new Wn(90,1,t,n),u=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],g=this._renderer,p=g.autoClear,b=g.toneMapping;g.getClearColor(Gf),g.toneMapping=Li,g.autoClear=!1,g.state.buffers.depth.getReversed()&&(g.setRenderTarget(s),g.clearDepth(),g.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new yn(new $i,new ur({name:"PMREM.Background",side:Qn,depthWrite:!1,depthTest:!1})));let A=this._backgroundBox,v=A.material,x=!1,F=e.background;F?F.isColor&&(v.color.copy(F),e.background=null,x=!0):(v.color.copy(Gf),x=!0);for(let H=0;H<6;H++){let I=H%3;I===0?(d.up.set(0,u[H],0),d.position.set(r.x,r.y,r.z),d.lookAt(r.x+m[H],r.y,r.z)):I===1?(d.up.set(0,0,u[H]),d.position.set(r.x,r.y,r.z),d.lookAt(r.x,r.y+m[H],r.z)):(d.up.set(0,u[H],0),d.position.set(r.x,r.y,r.z),d.lookAt(r.x,r.y,r.z+m[H]));let z=this._cubeSize;ro(s,I*z,H>2?z:0,z,z),g.setRenderTarget(s),x&&g.render(A,d),g.render(e,d)}g.toneMapping=b,g.autoClear=p,e.background=F}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Xs||e.mapping===fr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=$f()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xf());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let c=r.uniforms;c.envMap.value=e;let d=this._cubeSize;ro(t,0,0,3*d,2*d),n.setRenderTarget(t),n.render(a,ua)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,c=this._lodMeshes[n];c.material=a;let d=a.uniforms,u=n/(this._lodMeshes.length-1),m=t/(this._lodMeshes.length-1),g=Math.sqrt(u*u-m*m),p=0+u*1.25,b=g*p,{_lodMax:M}=this,A=this._sizeLods[n],v=3*A*(n>M-Zs?n-M+Zs:0),x=4*(this._cubeSize-A);d.envMap.value=e.texture,d.roughness.value=b,d.mipInt.value=M-t,ro(r,v,x,3*A,2*A),s.setRenderTarget(r),s.render(c,ua),d.envMap.value=r.texture,d.roughness.value=0,d.mipInt.value=M-n,ro(e,v,x,3*A,2*A),s.setRenderTarget(e),s.render(c,ua)}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,c){let d=this._renderer,u=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&vt("blur direction must be either latitudinal or longitudinal!");let m=3,g=this._lodMeshes[s];g.material=u;let p=u.uniforms,b=this._sizeLods[n]-1,M=isFinite(r)?Math.PI/(2*b):2*Math.PI/(2*mr-1),A=r/M,v=isFinite(r)?1+Math.floor(m*A):mr;v>mr&&_t(`sigmaRadians, ${r}, is too large and will clip, as it requested ${v} samples when the maximum is set to ${mr}`);let x=[],F=0;for(let G=0;G<mr;++G){let w=G/A,N=Math.exp(-w*w/2);x.push(N),G===0?F+=N:G<v&&(F+=2*N)}for(let G=0;G<x.length;G++)x[G]=x[G]/F;p.envMap.value=e.texture,p.samples.value=v,p.weights.value=x,p.latitudinal.value=a==="latitudinal",c&&(p.poleAxis.value=c);let{_lodMax:H}=this;p.dTheta.value=M,p.mipInt.value=H-n;let I=this._sizeLods[s],z=3*I*(s>H-Zs?s-H+Zs:0),O=4*(this._cubeSize-I);ro(t,z,O,3*I,2*I),d.setRenderTarget(t),d.render(g,ua)}};function _x(i){let e=[],t=[],n=[],s=i,r=i-Zs+1+Hf.length;for(let a=0;a<r;a++){let c=Math.pow(2,s);e.push(c);let d=1/c;a>i-Zs?d=Hf[a-i+Zs-1]:a===0&&(d=0),t.push(d);let u=1/(c-2),m=-u,g=1+u,p=[m,m,g,m,g,g,m,m,g,g,m,g],b=6,M=6,A=3,v=2,x=1,F=new Float32Array(A*M*b),H=new Float32Array(v*M*b),I=new Float32Array(x*M*b);for(let O=0;O<b;O++){let G=O%3*2/3-1,w=O>2?0:-1,N=[G,w,0,G+2/3,w,0,G+2/3,w+1,0,G,w,0,G+2/3,w+1,0,G,w+1,0];F.set(N,A*M*O),H.set(p,v*M*O);let j=[O,O,O,O,O,O];I.set(j,x*M*O)}let z=new On;z.setAttribute("position",new Un(F,A)),z.setAttribute("uv",new Un(H,v)),z.setAttribute("faceIndex",new Un(I,x)),n.push(new yn(z,null)),s>Zs&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Wf(i,e,t){let n=new di(i,e,t);return n.texture.mapping=na,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ro(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function xx(i,e,t){return new jn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:mx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ac(),fragmentShader:`

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
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function vx(i,e,t){let n=new Float32Array(mr),s=new Z(0,1,0);return new jn({name:"SphericalGaussianBlur",defines:{n:mr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ac(),fragmentShader:`

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
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function Xf(){return new jn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ac(),fragmentShader:`

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
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function $f(){return new jn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ac(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function Ac(){return`

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
	`}var Ec=class extends di{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new $o(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new $i(5,5,5),r=new jn({name:"CubemapFromEquirect",uniforms:pr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Qn,blending:Zi});r.uniforms.tEquirect.value=t;let a=new yn(s,r),c=t.minFilter;return t.minFilter===$s&&(t.minFilter=Nn),new Dl(1,10,this).update(e,a),t.minFilter=c,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function yx(i){let e=new WeakMap,t=new WeakMap,n=null;function s(p,b=!1){return p==null?null:b?a(p):r(p)}function r(p){if(p&&p.isTexture){let b=p.mapping;if(b===Nl||b===Fl)if(e.has(p)){let M=e.get(p).texture;return c(M,p.mapping)}else{let M=p.image;if(M&&M.height>0){let A=new Ec(M.height);return A.fromEquirectangularTexture(i,p),e.set(p,A),p.addEventListener("dispose",u),c(A.texture,p.mapping)}else return null}}return p}function a(p){if(p&&p.isTexture){let b=p.mapping,M=b===Nl||b===Fl,A=b===Xs||b===fr;if(M||A){let v=t.get(p),x=v!==void 0?v.texture.pmremVersion:0;if(p.isRenderTargetTexture&&p.pmremVersion!==x)return n===null&&(n=new wc(i)),v=M?n.fromEquirectangular(p,v):n.fromCubemap(p,v),v.texture.pmremVersion=p.pmremVersion,t.set(p,v),v.texture;if(v!==void 0)return v.texture;{let F=p.image;return M&&F&&F.height>0||A&&F&&d(F)?(n===null&&(n=new wc(i)),v=M?n.fromEquirectangular(p):n.fromCubemap(p),v.texture.pmremVersion=p.pmremVersion,t.set(p,v),p.addEventListener("dispose",m),v.texture):null}}}return p}function c(p,b){return b===Nl?p.mapping=Xs:b===Fl&&(p.mapping=fr),p}function d(p){let b=0,M=6;for(let A=0;A<M;A++)p[A]!==void 0&&b++;return b===M}function u(p){let b=p.target;b.removeEventListener("dispose",u);let M=e.get(b);M!==void 0&&(e.delete(b),M.dispose())}function m(p){let b=p.target;b.removeEventListener("dispose",m);let M=t.get(b);M!==void 0&&(t.delete(b),M.dispose())}function g(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:g}}function bx(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&cr("WebGLRenderer: "+n+" extension not supported."),s}}}function Sx(i,e,t,n){let s={},r=new WeakMap;function a(g){let p=g.target;p.index!==null&&e.remove(p.index);for(let M in p.attributes)e.remove(p.attributes[M]);p.removeEventListener("dispose",a),delete s[p.id];let b=r.get(p);b&&(e.remove(b),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function c(g,p){return s[p.id]===!0||(p.addEventListener("dispose",a),s[p.id]=!0,t.memory.geometries++),p}function d(g){let p=g.attributes;for(let b in p)e.update(p[b],i.ARRAY_BUFFER)}function u(g){let p=[],b=g.index,M=g.attributes.position,A=0;if(M===void 0)return;if(b!==null){let F=b.array;A=b.version;for(let H=0,I=F.length;H<I;H+=3){let z=F[H+0],O=F[H+1],G=F[H+2];p.push(z,O,O,G,G,z)}}else{let F=M.array;A=M.version;for(let H=0,I=F.length/3-1;H<I;H+=3){let z=H+0,O=H+1,G=H+2;p.push(z,O,O,G,G,z)}}let v=new(M.count>=65535?Go:Ho)(p,1);v.version=A;let x=r.get(g);x&&e.remove(x),r.set(g,v)}function m(g){let p=r.get(g);if(p){let b=g.index;b!==null&&p.version<b.version&&u(g)}else u(g);return r.get(g)}return{get:c,update:d,getWireframeAttribute:m}}function Mx(i,e,t){let n;function s(g){n=g}let r,a;function c(g){r=g.type,a=g.bytesPerElement}function d(g,p){i.drawElements(n,p,r,g*a),t.update(p,n,1)}function u(g,p,b){b!==0&&(i.drawElementsInstanced(n,p,r,g*a,b),t.update(p,n,b))}function m(g,p,b){if(b===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,g,0,b);let A=0;for(let v=0;v<b;v++)A+=p[v];t.update(A,n,1)}this.setMode=s,this.setIndex=c,this.render=d,this.renderInstances=u,this.renderMultiDraw=m}function wx(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,c){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=c*(r/3);break;case i.LINES:t.lines+=c*(r/2);break;case i.LINE_STRIP:t.lines+=c*(r-1);break;case i.LINE_LOOP:t.lines+=c*r;break;case i.POINTS:t.points+=c*r;break;default:vt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Ex(i,e,t){let n=new WeakMap,s=new tn;function r(a,c,d){let u=a.morphTargetInfluences,m=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,g=m!==void 0?m.length:0,p=n.get(c);if(p===void 0||p.count!==g){let N=function(){G.dispose(),n.delete(c),c.removeEventListener("dispose",N)};p!==void 0&&p.texture.dispose();let b=c.morphAttributes.position!==void 0,M=c.morphAttributes.normal!==void 0,A=c.morphAttributes.color!==void 0,v=c.morphAttributes.position||[],x=c.morphAttributes.normal||[],F=c.morphAttributes.color||[],H=0;b===!0&&(H=1),M===!0&&(H=2),A===!0&&(H=3);let I=c.attributes.position.count*H,z=1;I>e.maxTextureSize&&(z=Math.ceil(I/e.maxTextureSize),I=e.maxTextureSize);let O=new Float32Array(I*z*4*g),G=new ko(O,I,z,g);G.type=Ui,G.needsUpdate=!0;let w=H*4;for(let j=0;j<g;j++){let Y=v[j],X=x[j],xe=F[j],ne=I*z*4*j;for(let ae=0;ae<Y.count;ae++){let ge=ae*w;b===!0&&(s.fromBufferAttribute(Y,ae),O[ne+ge+0]=s.x,O[ne+ge+1]=s.y,O[ne+ge+2]=s.z,O[ne+ge+3]=0),M===!0&&(s.fromBufferAttribute(X,ae),O[ne+ge+4]=s.x,O[ne+ge+5]=s.y,O[ne+ge+6]=s.z,O[ne+ge+7]=0),A===!0&&(s.fromBufferAttribute(xe,ae),O[ne+ge+8]=s.x,O[ne+ge+9]=s.y,O[ne+ge+10]=s.z,O[ne+ge+11]=xe.itemSize===4?s.w:1)}}p={count:g,texture:G,size:new yt(I,z)},n.set(c,p),c.addEventListener("dispose",N)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)d.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let b=0;for(let A=0;A<u.length;A++)b+=u[A];let M=c.morphTargetsRelative?1:1-b;d.getUniforms().setValue(i,"morphTargetBaseInfluence",M),d.getUniforms().setValue(i,"morphTargetInfluences",u)}d.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),d.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function Tx(i,e,t,n,s){let r=new WeakMap;function a(u){let m=s.render.frame,g=u.geometry,p=e.get(u,g);if(r.get(p)!==m&&(e.update(p),r.set(p,m)),u.isInstancedMesh&&(u.hasEventListener("dispose",d)===!1&&u.addEventListener("dispose",d),r.get(u)!==m&&(t.update(u.instanceMatrix,i.ARRAY_BUFFER),u.instanceColor!==null&&t.update(u.instanceColor,i.ARRAY_BUFFER),r.set(u,m))),u.isSkinnedMesh){let b=u.skeleton;r.get(b)!==m&&(b.update(),r.set(b,m))}return p}function c(){r=new WeakMap}function d(u){let m=u.target;m.removeEventListener("dispose",d),n.releaseStatesOfObject(m),t.remove(m.instanceMatrix),m.instanceColor!==null&&t.remove(m.instanceColor)}return{update:a,dispose:c}}var Ax={[Yh]:"LINEAR_TONE_MAPPING",[Zh]:"REINHARD_TONE_MAPPING",[Kh]:"CINEON_TONE_MAPPING",[Jh]:"ACES_FILMIC_TONE_MAPPING",[Qh]:"AGX_TONE_MAPPING",[eu]:"NEUTRAL_TONE_MAPPING",[jh]:"CUSTOM_TONE_MAPPING"};function Cx(i,e,t,n,s,r){let a=new di(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new ys(e,t):void 0}),c=new di(e,t,{type:Ki,depthBuffer:!1,stencilBuffer:!1}),d=new On;d.setAttribute("position",new wn([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new wn([0,2,0,0,2,0],2));let u=new yl({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),m=new yn(d,u),g=new dr(-1,1,1,-1,0,1),p=null,b=null,M=!1,A,v=null,x=[],F=!1;this.setSize=function(H,I){a.setSize(H,I),c.setSize(H,I);for(let z=0;z<x.length;z++){let O=x[z];O.setSize&&O.setSize(H,I)}},this.setEffects=function(H){x=H,F=x.length>0&&x[0].isRenderPass===!0;let I=a.width,z=a.height;for(let O=0;O<x.length;O++){let G=x[O];G.setSize&&G.setSize(I,z)}},this.begin=function(H,I){if(M||H.toneMapping===Li&&x.length===0)return!1;if(v=I,I!==null){let z=I.width,O=I.height;(a.width!==z||a.height!==O)&&this.setSize(z,O)}return F===!1&&H.setRenderTarget(a),A=H.toneMapping,H.toneMapping=Li,!0},this.hasRenderPass=function(){return F},this.end=function(H,I){H.toneMapping=A,M=!0;let z=a,O=c;for(let G=0;G<x.length;G++){let w=x[G];if(w.enabled!==!1&&(w.render(H,O,z,I),w.needsSwap!==!1)){let N=z;z=O,O=N}}if(p!==H.outputColorSpace||b!==H.toneMapping){p=H.outputColorSpace,b=H.toneMapping,u.defines={},kt.getTransfer(p)===Jt&&(u.defines.SRGB_TRANSFER="");let G=Ax[b];G&&(u.defines[G]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=z.texture,H.setRenderTarget(v),H.render(m,g),v=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),c.dispose(),d.dispose(),u.dispose()}}var dp=new Jn,Su=new ys(1,1),fp=new ko,pp=new gl,mp=new $o,qf=[],Yf=[],Zf=new Float32Array(16),Kf=new Float32Array(9),Jf=new Float32Array(4);function ao(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=qf[s];if(r===void 0&&(r=new Float32Array(s),qf[s]=r),e!==0){n.toArray(r,0);for(let a=1,c=0;a!==e;++a)c+=t,i[a].toArray(r,c)}return r}function En(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Tn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Cc(i,e){let t=Yf[e];t===void 0&&(t=new Int32Array(e),Yf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Rx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Px(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(En(t,e))return;i.uniform2fv(this.addr,e),Tn(t,e)}}function Ix(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(En(t,e))return;i.uniform3fv(this.addr,e),Tn(t,e)}}function Lx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(En(t,e))return;i.uniform4fv(this.addr,e),Tn(t,e)}}function Dx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(En(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Tn(t,e)}else{if(En(t,n))return;Jf.set(n),i.uniformMatrix2fv(this.addr,!1,Jf),Tn(t,n)}}function Ux(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(En(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Tn(t,e)}else{if(En(t,n))return;Kf.set(n),i.uniformMatrix3fv(this.addr,!1,Kf),Tn(t,n)}}function Nx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(En(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Tn(t,e)}else{if(En(t,n))return;Zf.set(n),i.uniformMatrix4fv(this.addr,!1,Zf),Tn(t,n)}}function Fx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Ox(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(En(t,e))return;i.uniform2iv(this.addr,e),Tn(t,e)}}function Bx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(En(t,e))return;i.uniform3iv(this.addr,e),Tn(t,e)}}function kx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(En(t,e))return;i.uniform4iv(this.addr,e),Tn(t,e)}}function zx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Vx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(En(t,e))return;i.uniform2uiv(this.addr,e),Tn(t,e)}}function Hx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(En(t,e))return;i.uniform3uiv(this.addr,e),Tn(t,e)}}function Gx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(En(t,e))return;i.uniform4uiv(this.addr,e),Tn(t,e)}}function Wx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Su.compareFunction=t.isReversedDepthBuffer()?bc:yc,r=Su):r=dp,t.setTexture2D(e||r,s)}function Xx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||pp,s)}function $x(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||mp,s)}function qx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||fp,s)}function Yx(i){switch(i){case 5126:return Rx;case 35664:return Px;case 35665:return Ix;case 35666:return Lx;case 35674:return Dx;case 35675:return Ux;case 35676:return Nx;case 5124:case 35670:return Fx;case 35667:case 35671:return Ox;case 35668:case 35672:return Bx;case 35669:case 35673:return kx;case 5125:return zx;case 36294:return Vx;case 36295:return Hx;case 36296:return Gx;case 35678:case 36198:case 36298:case 36306:case 35682:return Wx;case 35679:case 36299:case 36307:return Xx;case 35680:case 36300:case 36308:case 36293:return $x;case 36289:case 36303:case 36311:case 36292:return qx}}function Zx(i,e){i.uniform1fv(this.addr,e)}function Kx(i,e){let t=ao(e,this.size,2);i.uniform2fv(this.addr,t)}function Jx(i,e){let t=ao(e,this.size,3);i.uniform3fv(this.addr,t)}function jx(i,e){let t=ao(e,this.size,4);i.uniform4fv(this.addr,t)}function Qx(i,e){let t=ao(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function ev(i,e){let t=ao(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function tv(i,e){let t=ao(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function nv(i,e){i.uniform1iv(this.addr,e)}function iv(i,e){i.uniform2iv(this.addr,e)}function sv(i,e){i.uniform3iv(this.addr,e)}function rv(i,e){i.uniform4iv(this.addr,e)}function ov(i,e){i.uniform1uiv(this.addr,e)}function av(i,e){i.uniform2uiv(this.addr,e)}function lv(i,e){i.uniform3uiv(this.addr,e)}function cv(i,e){i.uniform4uiv(this.addr,e)}function hv(i,e,t){let n=this.cache,s=e.length,r=Cc(t,s);En(n,r)||(i.uniform1iv(this.addr,r),Tn(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Su:a=dp;for(let c=0;c!==s;++c)t.setTexture2D(e[c]||a,r[c])}function uv(i,e,t){let n=this.cache,s=e.length,r=Cc(t,s);En(n,r)||(i.uniform1iv(this.addr,r),Tn(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||pp,r[a])}function dv(i,e,t){let n=this.cache,s=e.length,r=Cc(t,s);En(n,r)||(i.uniform1iv(this.addr,r),Tn(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||mp,r[a])}function fv(i,e,t){let n=this.cache,s=e.length,r=Cc(t,s);En(n,r)||(i.uniform1iv(this.addr,r),Tn(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||fp,r[a])}function pv(i){switch(i){case 5126:return Zx;case 35664:return Kx;case 35665:return Jx;case 35666:return jx;case 35674:return Qx;case 35675:return ev;case 35676:return tv;case 5124:case 35670:return nv;case 35667:case 35671:return iv;case 35668:case 35672:return sv;case 35669:case 35673:return rv;case 5125:return ov;case 36294:return av;case 36295:return lv;case 36296:return cv;case 35678:case 36198:case 36298:case 36306:case 35682:return hv;case 35679:case 36299:case 36307:return uv;case 35680:case 36300:case 36308:case 36293:return dv;case 36289:case 36303:case 36311:case 36292:return fv}}var Mu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Yx(t.type)}},wu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=pv(t.type)}},Eu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let c=s[r];c.setValue(e,t[c.id],n)}}},yu=/(\w+)(\])?(\[|\.)?/g;function jf(i,e){i.seq.push(e),i.map[e.id]=e}function mv(i,e,t){let n=i.name,s=n.length;for(yu.lastIndex=0;;){let r=yu.exec(n),a=yu.lastIndex,c=r[1],d=r[2]==="]",u=r[3];if(d&&(c=c|0),u===void 0||u==="["&&a+2===s){jf(t,u===void 0?new Mu(c,i,e):new wu(c,i,e));break}else{let g=t.map[c];g===void 0&&(g=new Eu(c),jf(t,g)),t=g}}}var oo=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let c=e.getActiveUniform(t,a),d=e.getUniformLocation(t,c.name);mv(c,d,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let c=t[r],d=n[c.id];d.needsUpdate!==!1&&c.setValue(e,d.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function Qf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var gv=37297,_v=0;function xv(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let c=a+1;n.push(`${c===e?">":" "} ${c}: ${t[a]}`)}return n.join(`
`)}var ep=new Tt;function vv(i){kt._getMatrix(ep,kt.workingColorSpace,i);let e=`mat3( ${ep.elements.map(t=>t.toFixed(4))} )`;switch(kt.getTransfer(i)){case No:return[e,"LinearTransferOETF"];case Jt:return[e,"sRGBTransferOETF"];default:return _t("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function tp(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let c=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+xv(i.getShaderSource(e),c)}else return r}function yv(i,e){let t=vv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var bv={[Yh]:"Linear",[Zh]:"Reinhard",[Kh]:"Cineon",[Jh]:"ACESFilmic",[Qh]:"AgX",[eu]:"Neutral",[jh]:"Custom"};function Sv(i,e){let t=bv[e];return t===void 0?(_t("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Mc=new Z;function Mv(){kt.getLuminanceCoefficients(Mc);let i=Mc.x.toFixed(4),e=Mc.y.toFixed(4),t=Mc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fa).join(`
`)}function Ev(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Tv(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,c=1;r.type===i.FLOAT_MAT2&&(c=2),r.type===i.FLOAT_MAT3&&(c=3),r.type===i.FLOAT_MAT4&&(c=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:c}}return t}function fa(i){return i!==""}function np(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ip(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Av=/^[ \t]*#include +<([\w\d./]+)>/gm;function Tu(i){return i.replace(Av,Rv)}var Cv=new Map;function Rv(i,e){let t=Lt[e];if(t===void 0){let n=Cv.get(e);if(n!==void 0)t=Lt[n],_t('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Tu(t)}var Pv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function sp(i){return i.replace(Pv,Iv)}function Iv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function rp(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var Lv={[ta]:"SHADOWMAP_TYPE_PCF",[to]:"SHADOWMAP_TYPE_VSM"};function Dv(i){return Lv[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Uv={[Xs]:"ENVMAP_TYPE_CUBE",[fr]:"ENVMAP_TYPE_CUBE",[na]:"ENVMAP_TYPE_CUBE_UV"};function Nv(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Uv[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Fv={[fr]:"ENVMAP_MODE_REFRACTION"};function Ov(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Fv[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Bv={[qh]:"ENVMAP_BLENDING_MULTIPLY",[Ef]:"ENVMAP_BLENDING_MIX",[Tf]:"ENVMAP_BLENDING_ADD"};function kv(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Bv[i.combine]||"ENVMAP_BLENDING_NONE"}function zv(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Vv(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,c=t.fragmentShader,d=Dv(t),u=Nv(t),m=Ov(t),g=kv(t),p=zv(t),b=wv(t),M=Ev(r),A=s.createProgram(),v,x,F=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(fa).join(`
`),v.length>0&&(v+=`
`),x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(fa).join(`
`),x.length>0&&(x+=`
`)):(v=[rp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+m:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fa).join(`
`),x=[rp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+m:"",t.envMap?"#define "+g:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Li?"#define TONE_MAPPING":"",t.toneMapping!==Li?Lt.tonemapping_pars_fragment:"",t.toneMapping!==Li?Sv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Lt.colorspace_pars_fragment,yv("linearToOutputTexel",t.outputColorSpace),Mv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(fa).join(`
`)),a=Tu(a),a=np(a,t),a=ip(a,t),c=Tu(c),c=np(c,t),c=ip(c,t),a=sp(a),c=sp(c),t.isRawShaderMaterial!==!0&&(F=`#version 300 es
`,v=[b,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,x=["#define varying in",t.glslVersion===hu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===hu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);let H=F+v+a,I=F+x+c,z=Qf(s,s.VERTEX_SHADER,H),O=Qf(s,s.FRAGMENT_SHADER,I);s.attachShader(A,z),s.attachShader(A,O),t.index0AttributeName!==void 0?s.bindAttribLocation(A,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(A,0,"position"),s.linkProgram(A);function G(Y){if(i.debug.checkShaderErrors){let X=s.getProgramInfoLog(A)||"",xe=s.getShaderInfoLog(z)||"",ne=s.getShaderInfoLog(O)||"",ae=X.trim(),ge=xe.trim(),he=ne.trim(),ve=!0,Te=!0;if(s.getProgramParameter(A,s.LINK_STATUS)===!1)if(ve=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,A,z,O);else{let se=tp(s,z,"vertex"),Ze=tp(s,O,"fragment");vt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(A,s.VALIDATE_STATUS)+`

Material Name: `+Y.name+`
Material Type: `+Y.type+`

Program Info Log: `+ae+`
`+se+`
`+Ze)}else ae!==""?_t("WebGLProgram: Program Info Log:",ae):(ge===""||he==="")&&(Te=!1);Te&&(Y.diagnostics={runnable:ve,programLog:ae,vertexShader:{log:ge,prefix:v},fragmentShader:{log:he,prefix:x}})}s.deleteShader(z),s.deleteShader(O),w=new oo(s,A),N=Tv(s,A)}let w;this.getUniforms=function(){return w===void 0&&G(this),w};let N;this.getAttributes=function(){return N===void 0&&G(this),N};let j=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return j===!1&&(j=s.getProgramParameter(A,gv)),j},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(A),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=_v++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=z,this.fragmentShader=O,this}var Hv=0,Au=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Cu(e),t.set(e,n)),n}},Cu=class{constructor(e){this.id=Hv++,this.code=e,this.usedTimes=0}};function Gv(i){return i===Ys||i===la||i===ca}function Wv(i,e,t,n,s,r){let a=new Kr,c=new Au,d=new Set,u=[],m=new Map,g=n.logarithmicDepthBuffer,p=n.precision,b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(w){return d.add(w),w===0?"uv":`uv${w}`}function A(w,N,j,Y,X,xe){let ne=Y.fog,ae=X.geometry,ge=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?Y.environment:null,he=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap,ve=e.get(w.envMap||ge,he),Te=ve&&ve.mapping===na?ve.image.height:null,se=b[w.type];w.precision!==null&&(p=n.getMaxPrecision(w.precision),p!==w.precision&&_t("WebGLProgram.getParameters:",w.precision,"not supported, using",p,"instead."));let Ze=ae.morphAttributes.position||ae.morphAttributes.normal||ae.morphAttributes.color,et=Ze!==void 0?Ze.length:0,De=0;ae.morphAttributes.position!==void 0&&(De=1),ae.morphAttributes.normal!==void 0&&(De=2),ae.morphAttributes.color!==void 0&&(De=3);let at,qe,ie,Ne;if(se){let it=ei[se];at=it.vertexShader,qe=it.fragmentShader}else{at=w.vertexShader,qe=w.fragmentShader;let it=c.getVertexShaderStage(w),Pt=c.getFragmentShaderStage(w);c.update(w,it,Pt),ie=it.id,Ne=Pt.id}let Ie=i.getRenderTarget(),tt=i.state.buffers.depth.getReversed(),lt=X.isInstancedMesh===!0,dt=X.isBatchedMesh===!0,_n=!!w.map,Rt=!!w.matcap,Yt=!!ve,wt=!!w.aoMap,Ft=!!w.lightMap,xn=!!w.bumpMap&&w.wireframe===!1,P=!!w.normalMap,ln=!!w.displacementMap,fn=!!w.emissiveMap,Vt=!!w.metalnessMap,cn=!!w.roughnessMap,W=w.anisotropy>0,hn=w.clearcoat>0,Ut=w.dispersion>0,D=w.iridescence>0,_=w.sheen>0,K=w.transmission>0,ce=W&&!!w.anisotropyMap,me=hn&&!!w.clearcoatMap,Re=hn&&!!w.clearcoatNormalMap,Oe=hn&&!!w.clearcoatRoughnessMap,V=D&&!!w.iridescenceMap,ue=D&&!!w.iridescenceThicknessMap,Se=_&&!!w.sheenColorMap,Ge=_&&!!w.sheenRoughnessMap,Be=!!w.specularMap,Le=!!w.specularColorMap,ft=!!w.specularIntensityMap,Qe=K&&!!w.transmissionMap,bt=K&&!!w.thicknessMap,$=!!w.gradientMap,Fe=!!w.alphaMap,pe=w.alphaTest>0,ke=!!w.alphaHash,$e=!!w.extensions,ye=Li;w.toneMapped&&(Ie===null||Ie.isXRRenderTarget===!0)&&(ye=i.toneMapping);let nt={shaderID:se,shaderType:w.type,shaderName:w.name,vertexShader:at,fragmentShader:qe,defines:w.defines,customVertexShaderID:ie,customFragmentShaderID:Ne,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:p,batching:dt,batchingColor:dt&&X._colorsTexture!==null,instancing:lt,instancingColor:lt&&X.instanceColor!==null,instancingMorph:lt&&X.morphTexture!==null,outputColorSpace:Ie===null?i.outputColorSpace:Ie.isXRRenderTarget===!0?Ie.texture.colorSpace:kt.workingColorSpace,alphaToCoverage:!!w.alphaToCoverage,map:_n,matcap:Rt,envMap:Yt,envMapMode:Yt&&ve.mapping,envMapCubeUVHeight:Te,aoMap:wt,lightMap:Ft,bumpMap:xn,normalMap:P,displacementMap:ln,emissiveMap:fn,normalMapObjectSpace:P&&w.normalMapType===Rf,normalMapTangentSpace:P&&w.normalMapType===cu,packedNormalMap:P&&w.normalMapType===cu&&Gv(w.normalMap.format),metalnessMap:Vt,roughnessMap:cn,anisotropy:W,anisotropyMap:ce,clearcoat:hn,clearcoatMap:me,clearcoatNormalMap:Re,clearcoatRoughnessMap:Oe,dispersion:Ut,iridescence:D,iridescenceMap:V,iridescenceThicknessMap:ue,sheen:_,sheenColorMap:Se,sheenRoughnessMap:Ge,specularMap:Be,specularColorMap:Le,specularIntensityMap:ft,transmission:K,transmissionMap:Qe,thicknessMap:bt,gradientMap:$,opaque:w.transparent===!1&&w.blending===vs&&w.alphaToCoverage===!1,alphaMap:Fe,alphaTest:pe,alphaHash:ke,combine:w.combine,mapUv:_n&&M(w.map.channel),aoMapUv:wt&&M(w.aoMap.channel),lightMapUv:Ft&&M(w.lightMap.channel),bumpMapUv:xn&&M(w.bumpMap.channel),normalMapUv:P&&M(w.normalMap.channel),displacementMapUv:ln&&M(w.displacementMap.channel),emissiveMapUv:fn&&M(w.emissiveMap.channel),metalnessMapUv:Vt&&M(w.metalnessMap.channel),roughnessMapUv:cn&&M(w.roughnessMap.channel),anisotropyMapUv:ce&&M(w.anisotropyMap.channel),clearcoatMapUv:me&&M(w.clearcoatMap.channel),clearcoatNormalMapUv:Re&&M(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Oe&&M(w.clearcoatRoughnessMap.channel),iridescenceMapUv:V&&M(w.iridescenceMap.channel),iridescenceThicknessMapUv:ue&&M(w.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&M(w.sheenColorMap.channel),sheenRoughnessMapUv:Ge&&M(w.sheenRoughnessMap.channel),specularMapUv:Be&&M(w.specularMap.channel),specularColorMapUv:Le&&M(w.specularColorMap.channel),specularIntensityMapUv:ft&&M(w.specularIntensityMap.channel),transmissionMapUv:Qe&&M(w.transmissionMap.channel),thicknessMapUv:bt&&M(w.thicknessMap.channel),alphaMapUv:Fe&&M(w.alphaMap.channel),vertexTangents:!!ae.attributes.tangent&&(P||W),vertexNormals:!!ae.attributes.normal,vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!ae.attributes.color&&ae.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!ae.attributes.uv&&(_n||Fe),fog:!!ne,useFog:w.fog===!0,fogExp2:!!ne&&ne.isFogExp2,flatShading:w.wireframe===!1&&(w.flatShading===!0||ae.attributes.normal===void 0&&P===!1&&(w.isMeshLambertMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isMeshPhysicalMaterial)),sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:g,reversedDepthBuffer:tt,skinning:X.isSkinnedMesh===!0,hasPositionAttribute:ae.attributes.position!==void 0,morphTargets:ae.morphAttributes.position!==void 0,morphNormals:ae.morphAttributes.normal!==void 0,morphColors:ae.morphAttributes.color!==void 0,morphTargetsCount:et,morphTextureStride:De,numDirLights:N.directional.length,numPointLights:N.point.length,numSpotLights:N.spot.length,numSpotLightMaps:N.spotLightMap.length,numRectAreaLights:N.rectArea.length,numHemiLights:N.hemi.length,numDirLightShadows:N.directionalShadowMap.length,numPointLightShadows:N.pointShadowMap.length,numSpotLightShadows:N.spotShadowMap.length,numSpotLightShadowsWithMaps:N.numSpotLightShadowsWithMaps,numLightProbes:N.numLightProbes,numLightProbeGrids:xe.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&j.length>0,shadowMapType:i.shadowMap.type,toneMapping:ye,decodeVideoTexture:_n&&w.map.isVideoTexture===!0&&kt.getTransfer(w.map.colorSpace)===Jt,decodeVideoTextureEmissive:fn&&w.emissiveMap.isVideoTexture===!0&&kt.getTransfer(w.emissiveMap.colorSpace)===Jt,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===mi,flipSided:w.side===Qn,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:$e&&w.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($e&&w.extensions.multiDraw===!0||dt)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return nt.vertexUv1s=d.has(1),nt.vertexUv2s=d.has(2),nt.vertexUv3s=d.has(3),d.clear(),nt}function v(w){let N=[];if(w.shaderID?N.push(w.shaderID):(N.push(w.customVertexShaderID),N.push(w.customFragmentShaderID)),w.defines!==void 0)for(let j in w.defines)N.push(j),N.push(w.defines[j]);return w.isRawShaderMaterial===!1&&(x(N,w),F(N,w),N.push(i.outputColorSpace)),N.push(w.customProgramCacheKey),N.join()}function x(w,N){w.push(N.precision),w.push(N.outputColorSpace),w.push(N.envMapMode),w.push(N.envMapCubeUVHeight),w.push(N.mapUv),w.push(N.alphaMapUv),w.push(N.lightMapUv),w.push(N.aoMapUv),w.push(N.bumpMapUv),w.push(N.normalMapUv),w.push(N.displacementMapUv),w.push(N.emissiveMapUv),w.push(N.metalnessMapUv),w.push(N.roughnessMapUv),w.push(N.anisotropyMapUv),w.push(N.clearcoatMapUv),w.push(N.clearcoatNormalMapUv),w.push(N.clearcoatRoughnessMapUv),w.push(N.iridescenceMapUv),w.push(N.iridescenceThicknessMapUv),w.push(N.sheenColorMapUv),w.push(N.sheenRoughnessMapUv),w.push(N.specularMapUv),w.push(N.specularColorMapUv),w.push(N.specularIntensityMapUv),w.push(N.transmissionMapUv),w.push(N.thicknessMapUv),w.push(N.combine),w.push(N.fogExp2),w.push(N.sizeAttenuation),w.push(N.morphTargetsCount),w.push(N.morphAttributeCount),w.push(N.numDirLights),w.push(N.numPointLights),w.push(N.numSpotLights),w.push(N.numSpotLightMaps),w.push(N.numHemiLights),w.push(N.numRectAreaLights),w.push(N.numDirLightShadows),w.push(N.numPointLightShadows),w.push(N.numSpotLightShadows),w.push(N.numSpotLightShadowsWithMaps),w.push(N.numLightProbes),w.push(N.shadowMapType),w.push(N.toneMapping),w.push(N.numClippingPlanes),w.push(N.numClipIntersection),w.push(N.depthPacking)}function F(w,N){a.disableAll(),N.instancing&&a.enable(0),N.instancingColor&&a.enable(1),N.instancingMorph&&a.enable(2),N.matcap&&a.enable(3),N.envMap&&a.enable(4),N.normalMapObjectSpace&&a.enable(5),N.normalMapTangentSpace&&a.enable(6),N.clearcoat&&a.enable(7),N.iridescence&&a.enable(8),N.alphaTest&&a.enable(9),N.vertexColors&&a.enable(10),N.vertexAlphas&&a.enable(11),N.vertexUv1s&&a.enable(12),N.vertexUv2s&&a.enable(13),N.vertexUv3s&&a.enable(14),N.vertexTangents&&a.enable(15),N.anisotropy&&a.enable(16),N.alphaHash&&a.enable(17),N.batching&&a.enable(18),N.dispersion&&a.enable(19),N.batchingColor&&a.enable(20),N.gradientMap&&a.enable(21),N.packedNormalMap&&a.enable(22),N.vertexNormals&&a.enable(23),w.push(a.mask),a.disableAll(),N.fog&&a.enable(0),N.useFog&&a.enable(1),N.flatShading&&a.enable(2),N.logarithmicDepthBuffer&&a.enable(3),N.reversedDepthBuffer&&a.enable(4),N.skinning&&a.enable(5),N.morphTargets&&a.enable(6),N.morphNormals&&a.enable(7),N.morphColors&&a.enable(8),N.premultipliedAlpha&&a.enable(9),N.shadowMapEnabled&&a.enable(10),N.doubleSided&&a.enable(11),N.flipSided&&a.enable(12),N.useDepthPacking&&a.enable(13),N.dithering&&a.enable(14),N.transmission&&a.enable(15),N.sheen&&a.enable(16),N.opaque&&a.enable(17),N.pointsUvs&&a.enable(18),N.decodeVideoTexture&&a.enable(19),N.decodeVideoTextureEmissive&&a.enable(20),N.alphaToCoverage&&a.enable(21),N.numLightProbeGrids>0&&a.enable(22),N.hasPositionAttribute&&a.enable(23),w.push(a.mask)}function H(w){let N=b[w.type],j;if(N){let Y=ei[N];j=ha.clone(Y.uniforms)}else j=w.uniforms;return j}function I(w,N){let j=m.get(N);return j!==void 0?++j.usedTimes:(j=new Vv(i,N,w,s),u.push(j),m.set(N,j)),j}function z(w){if(--w.usedTimes===0){let N=u.indexOf(w);u[N]=u[u.length-1],u.pop(),m.delete(w.cacheKey),w.destroy()}}function O(w){c.remove(w)}function G(){c.dispose()}return{getParameters:A,getProgramCacheKey:v,getUniforms:H,acquireProgram:I,releaseProgram:z,releaseShaderCache:O,programs:u,dispose:G}}function Xv(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let c=i.get(a);return c===void 0&&(c={},i.set(a,c)),c}function n(a){i.delete(a)}function s(a,c,d){i.get(a)[c]=d}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function $v(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function op(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function ap(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(p){let b=0;return p.isInstancedMesh&&(b+=2),p.isSkinnedMesh&&(b+=1),b}function c(p,b,M,A,v,x){let F=i[e];return F===void 0?(F={id:p.id,object:p,geometry:b,material:M,materialVariant:a(p),groupOrder:A,renderOrder:p.renderOrder,z:v,group:x},i[e]=F):(F.id=p.id,F.object=p,F.geometry=b,F.material=M,F.materialVariant=a(p),F.groupOrder=A,F.renderOrder=p.renderOrder,F.z=v,F.group=x),e++,F}function d(p,b,M,A,v,x){let F=c(p,b,M,A,v,x);M.transmission>0?n.push(F):M.transparent===!0?s.push(F):t.push(F)}function u(p,b,M,A,v,x){let F=c(p,b,M,A,v,x);M.transmission>0?n.unshift(F):M.transparent===!0?s.unshift(F):t.unshift(F)}function m(p,b,M){t.length>1&&t.sort(p||$v),n.length>1&&n.sort(b||op),s.length>1&&s.sort(b||op),M&&(t.reverse(),n.reverse(),s.reverse())}function g(){for(let p=e,b=i.length;p<b;p++){let M=i[p];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:d,unshift:u,finish:g,sort:m}}function qv(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new ap,i.set(n,[a])):s>=r.length?(a=new ap,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Yv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new Z,color:new Ct};break;case"SpotLight":t={position:new Z,direction:new Z,color:new Ct,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Z,color:new Ct,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Z,skyColor:new Ct,groundColor:new Ct};break;case"RectAreaLight":t={color:new Ct,position:new Z,halfWidth:new Z,halfHeight:new Z};break}return i[e.id]=t,t}}}function Zv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Kv=0;function Jv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function jv(i){let e=new Yv,t=Zv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)n.probe.push(new Z);let s=new Z,r=new dn,a=new dn;function c(u){let m=0,g=0,p=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let b=0,M=0,A=0,v=0,x=0,F=0,H=0,I=0,z=0,O=0,G=0;u.sort(Jv);for(let N=0,j=u.length;N<j;N++){let Y=u[N],X=Y.color,xe=Y.intensity,ne=Y.distance,ae=null;if(Y.shadow&&Y.shadow.map&&(Y.shadow.map.texture.format===Ys?ae=Y.shadow.map.texture:ae=Y.shadow.map.depthTexture||Y.shadow.map.texture),Y.isAmbientLight)m+=X.r*xe,g+=X.g*xe,p+=X.b*xe;else if(Y.isLightProbe){for(let ge=0;ge<9;ge++)n.probe[ge].addScaledVector(Y.sh.coefficients[ge],xe);G++}else if(Y.isDirectionalLight){let ge=e.get(Y);if(ge.color.copy(Y.color).multiplyScalar(Y.intensity),Y.castShadow){let he=Y.shadow,ve=t.get(Y);ve.shadowIntensity=he.intensity,ve.shadowBias=he.bias,ve.shadowNormalBias=he.normalBias,ve.shadowRadius=he.radius,ve.shadowMapSize=he.mapSize,n.directionalShadow[b]=ve,n.directionalShadowMap[b]=ae,n.directionalShadowMatrix[b]=Y.shadow.matrix,F++}n.directional[b]=ge,b++}else if(Y.isSpotLight){let ge=e.get(Y);ge.position.setFromMatrixPosition(Y.matrixWorld),ge.color.copy(X).multiplyScalar(xe),ge.distance=ne,ge.coneCos=Math.cos(Y.angle),ge.penumbraCos=Math.cos(Y.angle*(1-Y.penumbra)),ge.decay=Y.decay,n.spot[A]=ge;let he=Y.shadow;if(Y.map&&(n.spotLightMap[z]=Y.map,z++,he.updateMatrices(Y),Y.castShadow&&O++),n.spotLightMatrix[A]=he.matrix,Y.castShadow){let ve=t.get(Y);ve.shadowIntensity=he.intensity,ve.shadowBias=he.bias,ve.shadowNormalBias=he.normalBias,ve.shadowRadius=he.radius,ve.shadowMapSize=he.mapSize,n.spotShadow[A]=ve,n.spotShadowMap[A]=ae,I++}A++}else if(Y.isRectAreaLight){let ge=e.get(Y);ge.color.copy(X).multiplyScalar(xe),ge.halfWidth.set(Y.width*.5,0,0),ge.halfHeight.set(0,Y.height*.5,0),n.rectArea[v]=ge,v++}else if(Y.isPointLight){let ge=e.get(Y);if(ge.color.copy(Y.color).multiplyScalar(Y.intensity),ge.distance=Y.distance,ge.decay=Y.decay,Y.castShadow){let he=Y.shadow,ve=t.get(Y);ve.shadowIntensity=he.intensity,ve.shadowBias=he.bias,ve.shadowNormalBias=he.normalBias,ve.shadowRadius=he.radius,ve.shadowMapSize=he.mapSize,ve.shadowCameraNear=he.camera.near,ve.shadowCameraFar=he.camera.far,n.pointShadow[M]=ve,n.pointShadowMap[M]=ae,n.pointShadowMatrix[M]=Y.shadow.matrix,H++}n.point[M]=ge,M++}else if(Y.isHemisphereLight){let ge=e.get(Y);ge.skyColor.copy(Y.color).multiplyScalar(xe),ge.groundColor.copy(Y.groundColor).multiplyScalar(xe),n.hemi[x]=ge,x++}}v>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ve.LTC_FLOAT_1,n.rectAreaLTC2=Ve.LTC_FLOAT_2):(n.rectAreaLTC1=Ve.LTC_HALF_1,n.rectAreaLTC2=Ve.LTC_HALF_2)),n.ambient[0]=m,n.ambient[1]=g,n.ambient[2]=p;let w=n.hash;(w.directionalLength!==b||w.pointLength!==M||w.spotLength!==A||w.rectAreaLength!==v||w.hemiLength!==x||w.numDirectionalShadows!==F||w.numPointShadows!==H||w.numSpotShadows!==I||w.numSpotMaps!==z||w.numLightProbes!==G)&&(n.directional.length=b,n.spot.length=A,n.rectArea.length=v,n.point.length=M,n.hemi.length=x,n.directionalShadow.length=F,n.directionalShadowMap.length=F,n.pointShadow.length=H,n.pointShadowMap.length=H,n.spotShadow.length=I,n.spotShadowMap.length=I,n.directionalShadowMatrix.length=F,n.pointShadowMatrix.length=H,n.spotLightMatrix.length=I+z-O,n.spotLightMap.length=z,n.numSpotLightShadowsWithMaps=O,n.numLightProbes=G,w.directionalLength=b,w.pointLength=M,w.spotLength=A,w.rectAreaLength=v,w.hemiLength=x,w.numDirectionalShadows=F,w.numPointShadows=H,w.numSpotShadows=I,w.numSpotMaps=z,w.numLightProbes=G,n.version=Kv++)}function d(u,m){let g=0,p=0,b=0,M=0,A=0,v=m.matrixWorldInverse;for(let x=0,F=u.length;x<F;x++){let H=u[x];if(H.isDirectionalLight){let I=n.directional[g];I.direction.setFromMatrixPosition(H.matrixWorld),s.setFromMatrixPosition(H.target.matrixWorld),I.direction.sub(s),I.direction.transformDirection(v),g++}else if(H.isSpotLight){let I=n.spot[b];I.position.setFromMatrixPosition(H.matrixWorld),I.position.applyMatrix4(v),I.direction.setFromMatrixPosition(H.matrixWorld),s.setFromMatrixPosition(H.target.matrixWorld),I.direction.sub(s),I.direction.transformDirection(v),b++}else if(H.isRectAreaLight){let I=n.rectArea[M];I.position.setFromMatrixPosition(H.matrixWorld),I.position.applyMatrix4(v),a.identity(),r.copy(H.matrixWorld),r.premultiply(v),a.extractRotation(r),I.halfWidth.set(H.width*.5,0,0),I.halfHeight.set(0,H.height*.5,0),I.halfWidth.applyMatrix4(a),I.halfHeight.applyMatrix4(a),M++}else if(H.isPointLight){let I=n.point[p];I.position.setFromMatrixPosition(H.matrixWorld),I.position.applyMatrix4(v),p++}else if(H.isHemisphereLight){let I=n.hemi[A];I.direction.setFromMatrixPosition(H.matrixWorld),I.direction.transformDirection(v),A++}}}return{setup:c,setupView:d,state:n}}function lp(i){let e=new jv(i),t=[],n=[],s=[];function r(p){g.camera=p,t.length=0,n.length=0,s.length=0}function a(p){t.push(p)}function c(p){n.push(p)}function d(p){s.push(p)}function u(){e.setup(t)}function m(p){e.setupView(t,p)}let g={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:g,setupLights:u,setupLightsView:m,pushLight:a,pushShadow:c,pushLightProbeGrid:d}}function Qv(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),c;return a===void 0?(c=new lp(i),e.set(s,[c])):r>=a.length?(c=new lp(i),a.push(c)):c=a[r],c}function n(){e=new WeakMap}return{get:t,dispose:n}}var ey=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ty=`uniform sampler2D shadow_pass;
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
}`,ny=[new Z(1,0,0),new Z(-1,0,0),new Z(0,1,0),new Z(0,-1,0),new Z(0,0,1),new Z(0,0,-1)],iy=[new Z(0,-1,0),new Z(0,-1,0),new Z(0,0,1),new Z(0,0,-1),new Z(0,-1,0),new Z(0,-1,0)],cp=new dn,da=new Z,bu=new Z;function sy(i,e,t){let n=new Wo,s=new yt,r=new yt,a=new tn,c=new bl,d=new Sl,u={},m=t.maxTextureSize,g={[xs]:Qn,[Qn]:xs,[mi]:mi},p=new jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new yt},radius:{value:4}},vertexShader:ey,fragmentShader:ty}),b=p.clone();b.defines.HORIZONTAL_PASS=1;let M=new On;M.setAttribute("position",new Un(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let A=new yn(M,p),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ta;let x=this.type;this.render=function(O,G,w){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||O.length===0)return;this.type===of&&(_t("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=ta);let N=i.getRenderTarget(),j=i.getActiveCubeFace(),Y=i.getActiveMipmapLevel(),X=i.state;X.setBlending(Zi),X.buffers.depth.getReversed()===!0?X.buffers.color.setClear(0,0,0,0):X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);let xe=x!==this.type;xe&&G.traverse(function(ne){ne.material&&(Array.isArray(ne.material)?ne.material.forEach(ae=>ae.needsUpdate=!0):ne.material.needsUpdate=!0)});for(let ne=0,ae=O.length;ne<ae;ne++){let ge=O[ne],he=ge.shadow;if(he===void 0){_t("WebGLShadowMap:",ge,"has no shadow.");continue}if(he.autoUpdate===!1&&he.needsUpdate===!1)continue;s.copy(he.mapSize);let ve=he.getFrameExtents();s.multiply(ve),r.copy(he.mapSize),(s.x>m||s.y>m)&&(s.x>m&&(r.x=Math.floor(m/ve.x),s.x=r.x*ve.x,he.mapSize.x=r.x),s.y>m&&(r.y=Math.floor(m/ve.y),s.y=r.y*ve.y,he.mapSize.y=r.y));let Te=i.state.buffers.depth.getReversed();if(he.camera._reversedDepth=Te,he.map===null||xe===!0){if(he.map!==null&&(he.map.depthTexture!==null&&(he.map.depthTexture.dispose(),he.map.depthTexture=null),he.map.dispose()),this.type===to){if(ge.isPointLight){_t("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}he.map=new di(s.x,s.y,{format:Ys,type:Ki,minFilter:Nn,magFilter:Nn,generateMipmaps:!1}),he.map.texture.name=ge.name+".shadowMap",he.map.depthTexture=new ys(s.x,s.y,Ui),he.map.depthTexture.name=ge.name+".shadowMapDepth",he.map.depthTexture.format=Xi,he.map.depthTexture.compareFunction=null,he.map.depthTexture.minFilter=In,he.map.depthTexture.magFilter=In}else ge.isPointLight?(he.map=new Ec(s.x),he.map.depthTexture=new vl(s.x,Di)):(he.map=new di(s.x,s.y),he.map.depthTexture=new ys(s.x,s.y,Di)),he.map.depthTexture.name=ge.name+".shadowMap",he.map.depthTexture.format=Xi,this.type===ta?(he.map.depthTexture.compareFunction=Te?bc:yc,he.map.depthTexture.minFilter=Nn,he.map.depthTexture.magFilter=Nn):(he.map.depthTexture.compareFunction=null,he.map.depthTexture.minFilter=In,he.map.depthTexture.magFilter=In);he.camera.updateProjectionMatrix()}let se=he.map.isWebGLCubeRenderTarget?6:1;for(let Ze=0;Ze<se;Ze++){if(he.map.isWebGLCubeRenderTarget)i.setRenderTarget(he.map,Ze),i.clear();else{Ze===0&&(i.setRenderTarget(he.map),i.clear());let et=he.getViewport(Ze);a.set(r.x*et.x,r.y*et.y,r.x*et.z,r.y*et.w),X.viewport(a)}if(ge.isPointLight){let et=he.camera,De=he.matrix,at=ge.distance||et.far;at!==et.far&&(et.far=at,et.updateProjectionMatrix()),da.setFromMatrixPosition(ge.matrixWorld),et.position.copy(da),bu.copy(et.position),bu.add(ny[Ze]),et.up.copy(iy[Ze]),et.lookAt(bu),et.updateMatrixWorld(),De.makeTranslation(-da.x,-da.y,-da.z),cp.multiplyMatrices(et.projectionMatrix,et.matrixWorldInverse),he._frustum.setFromProjectionMatrix(cp,et.coordinateSystem,et.reversedDepth)}else he.updateMatrices(ge);n=he.getFrustum(),I(G,w,he.camera,ge,this.type)}he.isPointLightShadow!==!0&&this.type===to&&F(he,w),he.needsUpdate=!1}x=this.type,v.needsUpdate=!1,i.setRenderTarget(N,j,Y)};function F(O,G){let w=e.update(A);p.defines.VSM_SAMPLES!==O.blurSamples&&(p.defines.VSM_SAMPLES=O.blurSamples,b.defines.VSM_SAMPLES=O.blurSamples,p.needsUpdate=!0,b.needsUpdate=!0),O.mapPass===null&&(O.mapPass=new di(s.x,s.y,{format:Ys,type:Ki})),p.uniforms.shadow_pass.value=O.map.depthTexture,p.uniforms.resolution.value=O.mapSize,p.uniforms.radius.value=O.radius,i.setRenderTarget(O.mapPass),i.clear(),i.renderBufferDirect(G,null,w,p,A,null),b.uniforms.shadow_pass.value=O.mapPass.texture,b.uniforms.resolution.value=O.mapSize,b.uniforms.radius.value=O.radius,i.setRenderTarget(O.map),i.clear(),i.renderBufferDirect(G,null,w,b,A,null)}function H(O,G,w,N){let j=null,Y=w.isPointLight===!0?O.customDistanceMaterial:O.customDepthMaterial;if(Y!==void 0)j=Y;else if(j=w.isPointLight===!0?d:c,i.localClippingEnabled&&G.clipShadows===!0&&Array.isArray(G.clippingPlanes)&&G.clippingPlanes.length!==0||G.displacementMap&&G.displacementScale!==0||G.alphaMap&&G.alphaTest>0||G.map&&G.alphaTest>0||G.alphaToCoverage===!0){let X=j.uuid,xe=G.uuid,ne=u[X];ne===void 0&&(ne={},u[X]=ne);let ae=ne[xe];ae===void 0&&(ae=j.clone(),ne[xe]=ae,G.addEventListener("dispose",z)),j=ae}if(j.visible=G.visible,j.wireframe=G.wireframe,N===to?j.side=G.shadowSide!==null?G.shadowSide:G.side:j.side=G.shadowSide!==null?G.shadowSide:g[G.side],j.alphaMap=G.alphaMap,j.alphaTest=G.alphaToCoverage===!0?.5:G.alphaTest,j.map=G.map,j.clipShadows=G.clipShadows,j.clippingPlanes=G.clippingPlanes,j.clipIntersection=G.clipIntersection,j.displacementMap=G.displacementMap,j.displacementScale=G.displacementScale,j.displacementBias=G.displacementBias,j.wireframeLinewidth=G.wireframeLinewidth,j.linewidth=G.linewidth,w.isPointLight===!0&&j.isMeshDistanceMaterial===!0){let X=i.properties.get(j);X.light=w}return j}function I(O,G,w,N,j){if(O.visible===!1)return;if(O.layers.test(G.layers)&&(O.isMesh||O.isLine||O.isPoints)&&(O.castShadow||O.receiveShadow&&j===to)&&(!O.frustumCulled||n.intersectsObject(O))){O.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,O.matrixWorld);let xe=e.update(O),ne=O.material;if(Array.isArray(ne)){let ae=xe.groups;for(let ge=0,he=ae.length;ge<he;ge++){let ve=ae[ge],Te=ne[ve.materialIndex];if(Te&&Te.visible){let se=H(O,Te,N,j);O.onBeforeShadow(i,O,G,w,xe,se,ve),i.renderBufferDirect(w,null,xe,se,O,ve),O.onAfterShadow(i,O,G,w,xe,se,ve)}}}else if(ne.visible){let ae=H(O,ne,N,j);O.onBeforeShadow(i,O,G,w,xe,ae,null),i.renderBufferDirect(w,null,xe,ae,O,null),O.onAfterShadow(i,O,G,w,xe,ae,null)}}let X=O.children;for(let xe=0,ne=X.length;xe<ne;xe++)I(X[xe],G,w,N,j)}function z(O){O.target.removeEventListener("dispose",z);for(let w in u){let N=u[w],j=O.target.uuid;j in N&&(N[j].dispose(),delete N[j])}}}function ry(i,e){function t(){let $=!1,Fe=new tn,pe=null,ke=new tn(0,0,0,0);return{setMask:function($e){pe!==$e&&!$&&(i.colorMask($e,$e,$e,$e),pe=$e)},setLocked:function($e){$=$e},setClear:function($e,ye,nt,it,Pt){Pt===!0&&($e*=it,ye*=it,nt*=it),Fe.set($e,ye,nt,it),ke.equals(Fe)===!1&&(i.clearColor($e,ye,nt,it),ke.copy(Fe))},reset:function(){$=!1,pe=null,ke.set(-1,0,0,0)}}}function n(){let $=!1,Fe=!1,pe=null,ke=null,$e=null;return{setReversed:function(ye){if(Fe!==ye){let nt=e.get("EXT_clip_control");ye?nt.clipControlEXT(nt.LOWER_LEFT_EXT,nt.ZERO_TO_ONE_EXT):nt.clipControlEXT(nt.LOWER_LEFT_EXT,nt.NEGATIVE_ONE_TO_ONE_EXT),Fe=ye;let it=$e;$e=null,this.setClear(it)}},getReversed:function(){return Fe},setTest:function(ye){ye?Ie(i.DEPTH_TEST):tt(i.DEPTH_TEST)},setMask:function(ye){pe!==ye&&!$&&(i.depthMask(ye),pe=ye)},setFunc:function(ye){if(Fe&&(ye=kf[ye]),ke!==ye){switch(ye){case sl:i.depthFunc(i.NEVER);break;case rl:i.depthFunc(i.ALWAYS);break;case ol:i.depthFunc(i.LESS);break;case hr:i.depthFunc(i.LEQUAL);break;case al:i.depthFunc(i.EQUAL);break;case ll:i.depthFunc(i.GEQUAL);break;case cl:i.depthFunc(i.GREATER);break;case hl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ke=ye}},setLocked:function(ye){$=ye},setClear:function(ye){$e!==ye&&($e=ye,Fe&&(ye=1-ye),i.clearDepth(ye))},reset:function(){$=!1,pe=null,ke=null,$e=null,Fe=!1}}}function s(){let $=!1,Fe=null,pe=null,ke=null,$e=null,ye=null,nt=null,it=null,Pt=null;return{setTest:function(jt){$||(jt?Ie(i.STENCIL_TEST):tt(i.STENCIL_TEST))},setMask:function(jt){Fe!==jt&&!$&&(i.stencilMask(jt),Fe=jt)},setFunc:function(jt,ri,oi){(pe!==jt||ke!==ri||$e!==oi)&&(i.stencilFunc(jt,ri,oi),pe=jt,ke=ri,$e=oi)},setOp:function(jt,ri,oi){(ye!==jt||nt!==ri||it!==oi)&&(i.stencilOp(jt,ri,oi),ye=jt,nt=ri,it=oi)},setLocked:function(jt){$=jt},setClear:function(jt){Pt!==jt&&(i.clearStencil(jt),Pt=jt)},reset:function(){$=!1,Fe=null,pe=null,ke=null,$e=null,ye=null,nt=null,it=null,Pt=null}}}let r=new t,a=new n,c=new s,d=new WeakMap,u=new WeakMap,m={},g={},p={},b=new WeakMap,M=[],A=null,v=!1,x=null,F=null,H=null,I=null,z=null,O=null,G=null,w=new Ct(0,0,0),N=0,j=!1,Y=null,X=null,xe=null,ne=null,ae=null,ge=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),he=!1,ve=0,Te=i.getParameter(i.VERSION);Te.indexOf("WebGL")!==-1?(ve=parseFloat(/^WebGL (\d)/.exec(Te)[1]),he=ve>=1):Te.indexOf("OpenGL ES")!==-1&&(ve=parseFloat(/^OpenGL ES (\d)/.exec(Te)[1]),he=ve>=2);let se=null,Ze={},et=i.getParameter(i.SCISSOR_BOX),De=i.getParameter(i.VIEWPORT),at=new tn().fromArray(et),qe=new tn().fromArray(De);function ie($,Fe,pe,ke){let $e=new Uint8Array(4),ye=i.createTexture();i.bindTexture($,ye),i.texParameteri($,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri($,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let nt=0;nt<pe;nt++)$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?i.texImage3D(Fe,0,i.RGBA,1,1,ke,0,i.RGBA,i.UNSIGNED_BYTE,$e):i.texImage2D(Fe+nt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,$e);return ye}let Ne={};Ne[i.TEXTURE_2D]=ie(i.TEXTURE_2D,i.TEXTURE_2D,1),Ne[i.TEXTURE_CUBE_MAP]=ie(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ne[i.TEXTURE_2D_ARRAY]=ie(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ne[i.TEXTURE_3D]=ie(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),c.setClear(0),Ie(i.DEPTH_TEST),a.setFunc(hr),xn(!1),P(Wh),Ie(i.CULL_FACE),wt(Zi);function Ie($){m[$]!==!0&&(i.enable($),m[$]=!0)}function tt($){m[$]!==!1&&(i.disable($),m[$]=!1)}function lt($,Fe){return p[$]!==Fe?(i.bindFramebuffer($,Fe),p[$]=Fe,$===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=Fe),$===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=Fe),!0):!1}function dt($,Fe){let pe=M,ke=!1;if($){pe=b.get(Fe),pe===void 0&&(pe=[],b.set(Fe,pe));let $e=$.textures;if(pe.length!==$e.length||pe[0]!==i.COLOR_ATTACHMENT0){for(let ye=0,nt=$e.length;ye<nt;ye++)pe[ye]=i.COLOR_ATTACHMENT0+ye;pe.length=$e.length,ke=!0}}else pe[0]!==i.BACK&&(pe[0]=i.BACK,ke=!0);ke&&i.drawBuffers(pe)}function _n($){return A!==$?(i.useProgram($),A=$,!0):!1}let Rt={[Fs]:i.FUNC_ADD,[lf]:i.FUNC_SUBTRACT,[cf]:i.FUNC_REVERSE_SUBTRACT};Rt[hf]=i.MIN,Rt[uf]=i.MAX;let Yt={[df]:i.ZERO,[ff]:i.ONE,[pf]:i.SRC_COLOR,[nl]:i.SRC_ALPHA,[yf]:i.SRC_ALPHA_SATURATE,[xf]:i.DST_COLOR,[gf]:i.DST_ALPHA,[mf]:i.ONE_MINUS_SRC_COLOR,[il]:i.ONE_MINUS_SRC_ALPHA,[vf]:i.ONE_MINUS_DST_COLOR,[_f]:i.ONE_MINUS_DST_ALPHA,[bf]:i.CONSTANT_COLOR,[Sf]:i.ONE_MINUS_CONSTANT_COLOR,[Mf]:i.CONSTANT_ALPHA,[wf]:i.ONE_MINUS_CONSTANT_ALPHA};function wt($,Fe,pe,ke,$e,ye,nt,it,Pt,jt){if($===Zi){v===!0&&(tt(i.BLEND),v=!1);return}if(v===!1&&(Ie(i.BLEND),v=!0),$!==af){if($!==x||jt!==j){if((F!==Fs||z!==Fs)&&(i.blendEquation(i.FUNC_ADD),F=Fs,z=Fs),jt)switch($){case vs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case no:i.blendFunc(i.ONE,i.ONE);break;case Xh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case $h:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:vt("WebGLState: Invalid blending: ",$);break}else switch($){case vs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case no:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Xh:vt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case $h:vt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:vt("WebGLState: Invalid blending: ",$);break}H=null,I=null,O=null,G=null,w.set(0,0,0),N=0,x=$,j=jt}return}$e=$e||Fe,ye=ye||pe,nt=nt||ke,(Fe!==F||$e!==z)&&(i.blendEquationSeparate(Rt[Fe],Rt[$e]),F=Fe,z=$e),(pe!==H||ke!==I||ye!==O||nt!==G)&&(i.blendFuncSeparate(Yt[pe],Yt[ke],Yt[ye],Yt[nt]),H=pe,I=ke,O=ye,G=nt),(it.equals(w)===!1||Pt!==N)&&(i.blendColor(it.r,it.g,it.b,Pt),w.copy(it),N=Pt),x=$,j=!1}function Ft($,Fe){$.side===mi?tt(i.CULL_FACE):Ie(i.CULL_FACE);let pe=$.side===Qn;Fe&&(pe=!pe),xn(pe),$.blending===vs&&$.transparent===!1?wt(Zi):wt($.blending,$.blendEquation,$.blendSrc,$.blendDst,$.blendEquationAlpha,$.blendSrcAlpha,$.blendDstAlpha,$.blendColor,$.blendAlpha,$.premultipliedAlpha),a.setFunc($.depthFunc),a.setTest($.depthTest),a.setMask($.depthWrite),r.setMask($.colorWrite);let ke=$.stencilWrite;c.setTest(ke),ke&&(c.setMask($.stencilWriteMask),c.setFunc($.stencilFunc,$.stencilRef,$.stencilFuncMask),c.setOp($.stencilFail,$.stencilZFail,$.stencilZPass)),fn($.polygonOffset,$.polygonOffsetFactor,$.polygonOffsetUnits),$.alphaToCoverage===!0?Ie(i.SAMPLE_ALPHA_TO_COVERAGE):tt(i.SAMPLE_ALPHA_TO_COVERAGE)}function xn($){Y!==$&&($?i.frontFace(i.CW):i.frontFace(i.CCW),Y=$)}function P($){$!==sf?(Ie(i.CULL_FACE),$!==X&&($===Wh?i.cullFace(i.BACK):$===rf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):tt(i.CULL_FACE),X=$}function ln($){$!==xe&&(he&&i.lineWidth($),xe=$)}function fn($,Fe,pe){$?(Ie(i.POLYGON_OFFSET_FILL),(ne!==Fe||ae!==pe)&&(ne=Fe,ae=pe,a.getReversed()&&(Fe=-Fe),i.polygonOffset(Fe,pe))):tt(i.POLYGON_OFFSET_FILL)}function Vt($){$?Ie(i.SCISSOR_TEST):tt(i.SCISSOR_TEST)}function cn($){$===void 0&&($=i.TEXTURE0+ge-1),se!==$&&(i.activeTexture($),se=$)}function W($,Fe,pe){pe===void 0&&(se===null?pe=i.TEXTURE0+ge-1:pe=se);let ke=Ze[pe];ke===void 0&&(ke={type:void 0,texture:void 0},Ze[pe]=ke),(ke.type!==$||ke.texture!==Fe)&&(se!==pe&&(i.activeTexture(pe),se=pe),i.bindTexture($,Fe||Ne[$]),ke.type=$,ke.texture=Fe)}function hn(){let $=Ze[se];$!==void 0&&$.type!==void 0&&(i.bindTexture($.type,null),$.type=void 0,$.texture=void 0)}function Ut(){try{i.compressedTexImage2D(...arguments)}catch($){vt("WebGLState:",$)}}function D(){try{i.compressedTexImage3D(...arguments)}catch($){vt("WebGLState:",$)}}function _(){try{i.texSubImage2D(...arguments)}catch($){vt("WebGLState:",$)}}function K(){try{i.texSubImage3D(...arguments)}catch($){vt("WebGLState:",$)}}function ce(){try{i.compressedTexSubImage2D(...arguments)}catch($){vt("WebGLState:",$)}}function me(){try{i.compressedTexSubImage3D(...arguments)}catch($){vt("WebGLState:",$)}}function Re(){try{i.texStorage2D(...arguments)}catch($){vt("WebGLState:",$)}}function Oe(){try{i.texStorage3D(...arguments)}catch($){vt("WebGLState:",$)}}function V(){try{i.texImage2D(...arguments)}catch($){vt("WebGLState:",$)}}function ue(){try{i.texImage3D(...arguments)}catch($){vt("WebGLState:",$)}}function Se($){return g[$]!==void 0?g[$]:i.getParameter($)}function Ge($,Fe){g[$]!==Fe&&(i.pixelStorei($,Fe),g[$]=Fe)}function Be($){at.equals($)===!1&&(i.scissor($.x,$.y,$.z,$.w),at.copy($))}function Le($){qe.equals($)===!1&&(i.viewport($.x,$.y,$.z,$.w),qe.copy($))}function ft($,Fe){let pe=u.get(Fe);pe===void 0&&(pe=new WeakMap,u.set(Fe,pe));let ke=pe.get($);ke===void 0&&(ke=i.getUniformBlockIndex(Fe,$.name),pe.set($,ke))}function Qe($,Fe){let ke=u.get(Fe).get($);d.get(Fe)!==ke&&(i.uniformBlockBinding(Fe,ke,$.__bindingPointIndex),d.set(Fe,ke))}function bt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),m={},g={},se=null,Ze={},p={},b=new WeakMap,M=[],A=null,v=!1,x=null,F=null,H=null,I=null,z=null,O=null,G=null,w=new Ct(0,0,0),N=0,j=!1,Y=null,X=null,xe=null,ne=null,ae=null,at.set(0,0,i.canvas.width,i.canvas.height),qe.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),c.reset()}return{buffers:{color:r,depth:a,stencil:c},enable:Ie,disable:tt,bindFramebuffer:lt,drawBuffers:dt,useProgram:_n,setBlending:wt,setMaterial:Ft,setFlipSided:xn,setCullFace:P,setLineWidth:ln,setPolygonOffset:fn,setScissorTest:Vt,activeTexture:cn,bindTexture:W,unbindTexture:hn,compressedTexImage2D:Ut,compressedTexImage3D:D,texImage2D:V,texImage3D:ue,pixelStorei:Ge,getParameter:Se,updateUBOMapping:ft,uniformBlockBinding:Qe,texStorage2D:Re,texStorage3D:Oe,texSubImage2D:_,texSubImage3D:K,compressedTexSubImage2D:ce,compressedTexSubImage3D:me,scissor:Be,viewport:Le,reset:bt}}function oy(i,e,t,n,s,r,a){let c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,d=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new yt,m=new WeakMap,g=new Set,p,b=new WeakMap,M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(D,_){return M?new OffscreenCanvas(D,_):Oo("canvas")}function v(D,_,K){let ce=1,me=Ut(D);if((me.width>K||me.height>K)&&(ce=K/Math.max(me.width,me.height)),ce<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){let Re=Math.floor(ce*me.width),Oe=Math.floor(ce*me.height);p===void 0&&(p=A(Re,Oe));let V=_?A(Re,Oe):p;return V.width=Re,V.height=Oe,V.getContext("2d").drawImage(D,0,0,Re,Oe),_t("WebGLRenderer: Texture has been resized from ("+me.width+"x"+me.height+") to ("+Re+"x"+Oe+")."),V}else return"data"in D&&_t("WebGLRenderer: Image in DataTexture is too big ("+me.width+"x"+me.height+")."),D;return D}function x(D){return D.generateMipmaps}function F(D){i.generateMipmap(D)}function H(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function I(D,_,K,ce,me,Re=!1){if(D!==null){if(i[D]!==void 0)return i[D];_t("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let Oe;ce&&(Oe=e.get("EXT_texture_norm16"),Oe||_t("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let V=_;if(_===i.RED&&(K===i.FLOAT&&(V=i.R32F),K===i.HALF_FLOAT&&(V=i.R16F),K===i.UNSIGNED_BYTE&&(V=i.R8),K===i.UNSIGNED_SHORT&&Oe&&(V=Oe.R16_EXT),K===i.SHORT&&Oe&&(V=Oe.R16_SNORM_EXT)),_===i.RED_INTEGER&&(K===i.UNSIGNED_BYTE&&(V=i.R8UI),K===i.UNSIGNED_SHORT&&(V=i.R16UI),K===i.UNSIGNED_INT&&(V=i.R32UI),K===i.BYTE&&(V=i.R8I),K===i.SHORT&&(V=i.R16I),K===i.INT&&(V=i.R32I)),_===i.RG&&(K===i.FLOAT&&(V=i.RG32F),K===i.HALF_FLOAT&&(V=i.RG16F),K===i.UNSIGNED_BYTE&&(V=i.RG8),K===i.UNSIGNED_SHORT&&Oe&&(V=Oe.RG16_EXT),K===i.SHORT&&Oe&&(V=Oe.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(K===i.UNSIGNED_BYTE&&(V=i.RG8UI),K===i.UNSIGNED_SHORT&&(V=i.RG16UI),K===i.UNSIGNED_INT&&(V=i.RG32UI),K===i.BYTE&&(V=i.RG8I),K===i.SHORT&&(V=i.RG16I),K===i.INT&&(V=i.RG32I)),_===i.RGB_INTEGER&&(K===i.UNSIGNED_BYTE&&(V=i.RGB8UI),K===i.UNSIGNED_SHORT&&(V=i.RGB16UI),K===i.UNSIGNED_INT&&(V=i.RGB32UI),K===i.BYTE&&(V=i.RGB8I),K===i.SHORT&&(V=i.RGB16I),K===i.INT&&(V=i.RGB32I)),_===i.RGBA_INTEGER&&(K===i.UNSIGNED_BYTE&&(V=i.RGBA8UI),K===i.UNSIGNED_SHORT&&(V=i.RGBA16UI),K===i.UNSIGNED_INT&&(V=i.RGBA32UI),K===i.BYTE&&(V=i.RGBA8I),K===i.SHORT&&(V=i.RGBA16I),K===i.INT&&(V=i.RGBA32I)),_===i.RGB&&(K===i.UNSIGNED_SHORT&&Oe&&(V=Oe.RGB16_EXT),K===i.SHORT&&Oe&&(V=Oe.RGB16_SNORM_EXT),K===i.UNSIGNED_INT_5_9_9_9_REV&&(V=i.RGB9_E5),K===i.UNSIGNED_INT_10F_11F_11F_REV&&(V=i.R11F_G11F_B10F)),_===i.RGBA){let ue=Re?No:kt.getTransfer(me);K===i.FLOAT&&(V=i.RGBA32F),K===i.HALF_FLOAT&&(V=i.RGBA16F),K===i.UNSIGNED_BYTE&&(V=ue===Jt?i.SRGB8_ALPHA8:i.RGBA8),K===i.UNSIGNED_SHORT&&Oe&&(V=Oe.RGBA16_EXT),K===i.SHORT&&Oe&&(V=Oe.RGBA16_SNORM_EXT),K===i.UNSIGNED_SHORT_4_4_4_4&&(V=i.RGBA4),K===i.UNSIGNED_SHORT_5_5_5_1&&(V=i.RGB5_A1)}return(V===i.R16F||V===i.R32F||V===i.RG16F||V===i.RG32F||V===i.RGBA16F||V===i.RGBA32F)&&e.get("EXT_color_buffer_float"),V}function z(D,_){let K;return D?_===null||_===Di||_===so?K=i.DEPTH24_STENCIL8:_===Ui?K=i.DEPTH32F_STENCIL8:_===io&&(K=i.DEPTH24_STENCIL8,_t("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Di||_===so?K=i.DEPTH_COMPONENT24:_===Ui?K=i.DEPTH_COMPONENT32F:_===io&&(K=i.DEPTH_COMPONENT16),K}function O(D,_){return x(D)===!0||D.isFramebufferTexture&&D.minFilter!==In&&D.minFilter!==Nn?Math.log2(Math.max(_.width,_.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?_.mipmaps.length:1}function G(D){let _=D.target;_.removeEventListener("dispose",G),N(_),_.isVideoTexture&&m.delete(_),_.isHTMLTexture&&g.delete(_)}function w(D){let _=D.target;_.removeEventListener("dispose",w),Y(_)}function N(D){let _=n.get(D);if(_.__webglInit===void 0)return;let K=D.source,ce=b.get(K);if(ce){let me=ce[_.__cacheKey];me.usedTimes--,me.usedTimes===0&&j(D),Object.keys(ce).length===0&&b.delete(K)}n.remove(D)}function j(D){let _=n.get(D);i.deleteTexture(_.__webglTexture);let K=D.source,ce=b.get(K);delete ce[_.__cacheKey],a.memory.textures--}function Y(D){let _=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let ce=0;ce<6;ce++){if(Array.isArray(_.__webglFramebuffer[ce]))for(let me=0;me<_.__webglFramebuffer[ce].length;me++)i.deleteFramebuffer(_.__webglFramebuffer[ce][me]);else i.deleteFramebuffer(_.__webglFramebuffer[ce]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[ce])}else{if(Array.isArray(_.__webglFramebuffer))for(let ce=0;ce<_.__webglFramebuffer.length;ce++)i.deleteFramebuffer(_.__webglFramebuffer[ce]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let ce=0;ce<_.__webglColorRenderbuffer.length;ce++)_.__webglColorRenderbuffer[ce]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[ce]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let K=D.textures;for(let ce=0,me=K.length;ce<me;ce++){let Re=n.get(K[ce]);Re.__webglTexture&&(i.deleteTexture(Re.__webglTexture),a.memory.textures--),n.remove(K[ce])}n.remove(D)}let X=0;function xe(){X=0}function ne(){return X}function ae(D){X=D}function ge(){let D=X;return D>=s.maxTextures&&_t("WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),X+=1,D}function he(D){let _=[];return _.push(D.wrapS),_.push(D.wrapT),_.push(D.wrapR||0),_.push(D.magFilter),_.push(D.minFilter),_.push(D.anisotropy),_.push(D.internalFormat),_.push(D.format),_.push(D.type),_.push(D.generateMipmaps),_.push(D.premultiplyAlpha),_.push(D.flipY),_.push(D.unpackAlignment),_.push(D.colorSpace),_.join()}function ve(D,_){let K=n.get(D);if(D.isVideoTexture&&W(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&K.__version!==D.version){let ce=D.image;if(ce===null)_t("WebGLRenderer: Texture marked for update but no image data found.");else if(ce.complete===!1)_t("WebGLRenderer: Texture marked for update but image is incomplete");else{tt(K,D,_);return}}else D.isExternalTexture&&(K.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,K.__webglTexture,i.TEXTURE0+_)}function Te(D,_){let K=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&K.__version!==D.version){tt(K,D,_);return}else D.isExternalTexture&&(K.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,K.__webglTexture,i.TEXTURE0+_)}function se(D,_){let K=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&K.__version!==D.version){tt(K,D,_);return}t.bindTexture(i.TEXTURE_3D,K.__webglTexture,i.TEXTURE0+_)}function Ze(D,_){let K=n.get(D);if(D.isCubeDepthTexture!==!0&&D.version>0&&K.__version!==D.version){lt(K,D,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture,i.TEXTURE0+_)}let et={[$r]:i.REPEAT,[Wi]:i.CLAMP_TO_EDGE,[ul]:i.MIRRORED_REPEAT},De={[In]:i.NEAREST,[Af]:i.NEAREST_MIPMAP_NEAREST,[ia]:i.NEAREST_MIPMAP_LINEAR,[Nn]:i.LINEAR,[Ol]:i.LINEAR_MIPMAP_NEAREST,[$s]:i.LINEAR_MIPMAP_LINEAR},at={[Pf]:i.NEVER,[Nf]:i.ALWAYS,[If]:i.LESS,[yc]:i.LEQUAL,[Lf]:i.EQUAL,[bc]:i.GEQUAL,[Df]:i.GREATER,[Uf]:i.NOTEQUAL};function qe(D,_){if(_.type===Ui&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Nn||_.magFilter===Ol||_.magFilter===ia||_.magFilter===$s||_.minFilter===Nn||_.minFilter===Ol||_.minFilter===ia||_.minFilter===$s)&&_t("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,et[_.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,et[_.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,et[_.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,De[_.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,De[_.minFilter]),_.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,at[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===In||_.minFilter!==ia&&_.minFilter!==$s||_.type===Ui&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let K=e.get("EXT_texture_filter_anisotropic");i.texParameterf(D,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function ie(D,_){let K=!1;D.__webglInit===void 0&&(D.__webglInit=!0,_.addEventListener("dispose",G));let ce=_.source,me=b.get(ce);me===void 0&&(me={},b.set(ce,me));let Re=he(_);if(Re!==D.__cacheKey){me[Re]===void 0&&(me[Re]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,K=!0),me[Re].usedTimes++;let Oe=me[D.__cacheKey];Oe!==void 0&&(me[D.__cacheKey].usedTimes--,Oe.usedTimes===0&&j(_)),D.__cacheKey=Re,D.__webglTexture=me[Re].texture}return K}function Ne(D,_,K){return Math.floor(Math.floor(D/K)/_)}function Ie(D,_,K,ce){let Re=D.updateRanges;if(Re.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,K,ce,_.data);else{Re.sort((Ge,Be)=>Ge.start-Be.start);let Oe=0;for(let Ge=1;Ge<Re.length;Ge++){let Be=Re[Oe],Le=Re[Ge],ft=Be.start+Be.count,Qe=Ne(Le.start,_.width,4),bt=Ne(Be.start,_.width,4);Le.start<=ft+1&&Qe===bt&&Ne(Le.start+Le.count-1,_.width,4)===Qe?Be.count=Math.max(Be.count,Le.start+Le.count-Be.start):(++Oe,Re[Oe]=Le)}Re.length=Oe+1;let V=t.getParameter(i.UNPACK_ROW_LENGTH),ue=t.getParameter(i.UNPACK_SKIP_PIXELS),Se=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Ge=0,Be=Re.length;Ge<Be;Ge++){let Le=Re[Ge],ft=Math.floor(Le.start/4),Qe=Math.ceil(Le.count/4),bt=ft%_.width,$=Math.floor(ft/_.width),Fe=Qe,pe=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,bt),t.pixelStorei(i.UNPACK_SKIP_ROWS,$),t.texSubImage2D(i.TEXTURE_2D,0,bt,$,Fe,pe,K,ce,_.data)}D.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,V),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ue),t.pixelStorei(i.UNPACK_SKIP_ROWS,Se)}}function tt(D,_,K){let ce=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(ce=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(ce=i.TEXTURE_3D);let me=ie(D,_),Re=_.source;t.bindTexture(ce,D.__webglTexture,i.TEXTURE0+K);let Oe=n.get(Re);if(Re.version!==Oe.__version||me===!0){if(t.activeTexture(i.TEXTURE0+K),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let pe=kt.getPrimaries(kt.workingColorSpace),ke=_.colorSpace===bs?null:kt.getPrimaries(_.colorSpace),$e=_.colorSpace===bs||pe===ke?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$e)}t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let ue=v(_.image,!1,s.maxTextureSize);ue=hn(_,ue);let Se=r.convert(_.format,_.colorSpace),Ge=r.convert(_.type),Be=I(_.internalFormat,Se,Ge,_.normalized,_.colorSpace,_.isVideoTexture);qe(ce,_);let Le,ft=_.mipmaps,Qe=_.isVideoTexture!==!0,bt=Oe.__version===void 0||me===!0,$=Re.dataReady,Fe=O(_,ue);if(_.isDepthTexture)Be=z(_.format===qs,_.type),bt&&(Qe?t.texStorage2D(i.TEXTURE_2D,1,Be,ue.width,ue.height):t.texImage2D(i.TEXTURE_2D,0,Be,ue.width,ue.height,0,Se,Ge,null));else if(_.isDataTexture)if(ft.length>0){Qe&&bt&&t.texStorage2D(i.TEXTURE_2D,Fe,Be,ft[0].width,ft[0].height);for(let pe=0,ke=ft.length;pe<ke;pe++)Le=ft[pe],Qe?$&&t.texSubImage2D(i.TEXTURE_2D,pe,0,0,Le.width,Le.height,Se,Ge,Le.data):t.texImage2D(i.TEXTURE_2D,pe,Be,Le.width,Le.height,0,Se,Ge,Le.data);_.generateMipmaps=!1}else Qe?(bt&&t.texStorage2D(i.TEXTURE_2D,Fe,Be,ue.width,ue.height),$&&Ie(_,ue,Se,Ge)):t.texImage2D(i.TEXTURE_2D,0,Be,ue.width,ue.height,0,Se,Ge,ue.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Qe&&bt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Fe,Be,ft[0].width,ft[0].height,ue.depth);for(let pe=0,ke=ft.length;pe<ke;pe++)if(Le=ft[pe],_.format!==bi)if(Se!==null)if(Qe){if($)if(_.layerUpdates.size>0){let $e=mu(Le.width,Le.height,_.format,_.type);for(let ye of _.layerUpdates){let nt=Le.data.subarray(ye*$e/Le.data.BYTES_PER_ELEMENT,(ye+1)*$e/Le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,pe,0,0,ye,Le.width,Le.height,1,Se,nt)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,pe,0,0,0,Le.width,Le.height,ue.depth,Se,Le.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,pe,Be,Le.width,Le.height,ue.depth,0,Le.data,0,0);else _t("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Qe?$&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,pe,0,0,0,Le.width,Le.height,ue.depth,Se,Ge,Le.data):t.texImage3D(i.TEXTURE_2D_ARRAY,pe,Be,Le.width,Le.height,ue.depth,0,Se,Ge,Le.data)}else{Qe&&bt&&t.texStorage2D(i.TEXTURE_2D,Fe,Be,ft[0].width,ft[0].height);for(let pe=0,ke=ft.length;pe<ke;pe++)Le=ft[pe],_.format!==bi?Se!==null?Qe?$&&t.compressedTexSubImage2D(i.TEXTURE_2D,pe,0,0,Le.width,Le.height,Se,Le.data):t.compressedTexImage2D(i.TEXTURE_2D,pe,Be,Le.width,Le.height,0,Le.data):_t("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qe?$&&t.texSubImage2D(i.TEXTURE_2D,pe,0,0,Le.width,Le.height,Se,Ge,Le.data):t.texImage2D(i.TEXTURE_2D,pe,Be,Le.width,Le.height,0,Se,Ge,Le.data)}else if(_.isDataArrayTexture)if(Qe){if(bt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Fe,Be,ue.width,ue.height,ue.depth),$)if(_.layerUpdates.size>0){let pe=mu(ue.width,ue.height,_.format,_.type);for(let ke of _.layerUpdates){let $e=ue.data.subarray(ke*pe/ue.data.BYTES_PER_ELEMENT,(ke+1)*pe/ue.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ke,ue.width,ue.height,1,Se,Ge,$e)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,Se,Ge,ue.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Be,ue.width,ue.height,ue.depth,0,Se,Ge,ue.data);else if(_.isData3DTexture)Qe?(bt&&t.texStorage3D(i.TEXTURE_3D,Fe,Be,ue.width,ue.height,ue.depth),$&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,Se,Ge,ue.data)):t.texImage3D(i.TEXTURE_3D,0,Be,ue.width,ue.height,ue.depth,0,Se,Ge,ue.data);else if(_.isFramebufferTexture){if(bt)if(Qe)t.texStorage2D(i.TEXTURE_2D,Fe,Be,ue.width,ue.height);else{let pe=ue.width,ke=ue.height;for(let $e=0;$e<Fe;$e++)t.texImage2D(i.TEXTURE_2D,$e,Be,pe,ke,0,Se,Ge,null),pe>>=1,ke>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){let pe=i.canvas;if(pe.hasAttribute("layoutsubtree")||pe.setAttribute("layoutsubtree","true"),ue.parentNode!==pe){pe.appendChild(ue),g.add(_),pe.onpaint=ke=>{let $e=ke.changedElements;for(let ye of g)$e.includes(ye.image)&&(ye.needsUpdate=!0)},pe.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ue);else{let $e=i.RGBA,ye=i.RGBA,nt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,$e,ye,nt,ue)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ft.length>0){if(Qe&&bt){let pe=Ut(ft[0]);t.texStorage2D(i.TEXTURE_2D,Fe,Be,pe.width,pe.height)}for(let pe=0,ke=ft.length;pe<ke;pe++)Le=ft[pe],Qe?$&&t.texSubImage2D(i.TEXTURE_2D,pe,0,0,Se,Ge,Le):t.texImage2D(i.TEXTURE_2D,pe,Be,Se,Ge,Le);_.generateMipmaps=!1}else if(Qe){if(bt){let pe=Ut(ue);t.texStorage2D(i.TEXTURE_2D,Fe,Be,pe.width,pe.height)}$&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Se,Ge,ue)}else t.texImage2D(i.TEXTURE_2D,0,Be,Se,Ge,ue);x(_)&&F(ce),Oe.__version=Re.version,_.onUpdate&&_.onUpdate(_)}D.__version=_.version}function lt(D,_,K){if(_.image.length!==6)return;let ce=ie(D,_),me=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+K);let Re=n.get(me);if(me.version!==Re.__version||ce===!0){t.activeTexture(i.TEXTURE0+K);let Oe=kt.getPrimaries(kt.workingColorSpace),V=_.colorSpace===bs?null:kt.getPrimaries(_.colorSpace),ue=_.colorSpace===bs||Oe===V?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);let Se=_.isCompressedTexture||_.image[0].isCompressedTexture,Ge=_.image[0]&&_.image[0].isDataTexture,Be=[];for(let ye=0;ye<6;ye++)!Se&&!Ge?Be[ye]=v(_.image[ye],!0,s.maxCubemapSize):Be[ye]=Ge?_.image[ye].image:_.image[ye],Be[ye]=hn(_,Be[ye]);let Le=Be[0],ft=r.convert(_.format,_.colorSpace),Qe=r.convert(_.type),bt=I(_.internalFormat,ft,Qe,_.normalized,_.colorSpace),$=_.isVideoTexture!==!0,Fe=Re.__version===void 0||ce===!0,pe=me.dataReady,ke=O(_,Le);qe(i.TEXTURE_CUBE_MAP,_);let $e;if(Se){$&&Fe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ke,bt,Le.width,Le.height);for(let ye=0;ye<6;ye++){$e=Be[ye].mipmaps;for(let nt=0;nt<$e.length;nt++){let it=$e[nt];_.format!==bi?ft!==null?$?pe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,nt,0,0,it.width,it.height,ft,it.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,nt,bt,it.width,it.height,0,it.data):_t("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,nt,0,0,it.width,it.height,ft,Qe,it.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,nt,bt,it.width,it.height,0,ft,Qe,it.data)}}}else{if($e=_.mipmaps,$&&Fe){$e.length>0&&ke++;let ye=Ut(Be[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ke,bt,ye.width,ye.height)}for(let ye=0;ye<6;ye++)if(Ge){$?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,0,0,Be[ye].width,Be[ye].height,ft,Qe,Be[ye].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,bt,Be[ye].width,Be[ye].height,0,ft,Qe,Be[ye].data);for(let nt=0;nt<$e.length;nt++){let Pt=$e[nt].image[ye].image;$?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,nt+1,0,0,Pt.width,Pt.height,ft,Qe,Pt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,nt+1,bt,Pt.width,Pt.height,0,ft,Qe,Pt.data)}}else{$?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,0,0,ft,Qe,Be[ye]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,bt,ft,Qe,Be[ye]);for(let nt=0;nt<$e.length;nt++){let it=$e[nt];$?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,nt+1,0,0,ft,Qe,it.image[ye]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,nt+1,bt,ft,Qe,it.image[ye])}}}x(_)&&F(i.TEXTURE_CUBE_MAP),Re.__version=me.version,_.onUpdate&&_.onUpdate(_)}D.__version=_.version}function dt(D,_,K,ce,me,Re){let Oe=r.convert(K.format,K.colorSpace),V=r.convert(K.type),ue=I(K.internalFormat,Oe,V,K.normalized,K.colorSpace),Se=n.get(_),Ge=n.get(K);if(Ge.__renderTarget=_,!Se.__hasExternalTextures){let Be=Math.max(1,_.width>>Re),Le=Math.max(1,_.height>>Re);me===i.TEXTURE_3D||me===i.TEXTURE_2D_ARRAY?t.texImage3D(me,Re,ue,Be,Le,_.depth,0,Oe,V,null):t.texImage2D(me,Re,ue,Be,Le,0,Oe,V,null)}t.bindFramebuffer(i.FRAMEBUFFER,D),cn(_)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ce,me,Ge.__webglTexture,0,Vt(_)):(me===i.TEXTURE_2D||me>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&me<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ce,me,Ge.__webglTexture,Re),t.bindFramebuffer(i.FRAMEBUFFER,null)}function _n(D,_,K){if(i.bindRenderbuffer(i.RENDERBUFFER,D),_.depthBuffer){let ce=_.depthTexture,me=ce&&ce.isDepthTexture?ce.type:null,Re=z(_.stencilBuffer,me),Oe=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;cn(_)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Vt(_),Re,_.width,_.height):K?i.renderbufferStorageMultisample(i.RENDERBUFFER,Vt(_),Re,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,Re,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Oe,i.RENDERBUFFER,D)}else{let ce=_.textures;for(let me=0;me<ce.length;me++){let Re=ce[me],Oe=r.convert(Re.format,Re.colorSpace),V=r.convert(Re.type),ue=I(Re.internalFormat,Oe,V,Re.normalized,Re.colorSpace);cn(_)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Vt(_),ue,_.width,_.height):K?i.renderbufferStorageMultisample(i.RENDERBUFFER,Vt(_),ue,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ue,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Rt(D,_,K){let ce=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,D),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let me=n.get(_.depthTexture);if(me.__renderTarget=_,(!me.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),ce){if(me.__webglInit===void 0&&(me.__webglInit=!0,_.depthTexture.addEventListener("dispose",G)),me.__webglTexture===void 0){me.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,me.__webglTexture),qe(i.TEXTURE_CUBE_MAP,_.depthTexture);let Se=r.convert(_.depthTexture.format),Ge=r.convert(_.depthTexture.type),Be;_.depthTexture.format===Xi?Be=i.DEPTH_COMPONENT24:_.depthTexture.format===qs&&(Be=i.DEPTH24_STENCIL8);for(let Le=0;Le<6;Le++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,Be,_.width,_.height,0,Se,Ge,null)}}else ve(_.depthTexture,0);let Re=me.__webglTexture,Oe=Vt(_),V=ce?i.TEXTURE_CUBE_MAP_POSITIVE_X+K:i.TEXTURE_2D,ue=_.depthTexture.format===qs?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===Xi)cn(_)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ue,V,Re,0,Oe):i.framebufferTexture2D(i.FRAMEBUFFER,ue,V,Re,0);else if(_.depthTexture.format===qs)cn(_)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ue,V,Re,0,Oe):i.framebufferTexture2D(i.FRAMEBUFFER,ue,V,Re,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Yt(D){let _=n.get(D),K=D.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==D.depthTexture){let ce=D.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),ce){let me=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,ce.removeEventListener("dispose",me)};ce.addEventListener("dispose",me),_.__depthDisposeCallback=me}_.__boundDepthTexture=ce}if(D.depthTexture&&!_.__autoAllocateDepthBuffer)if(K)for(let ce=0;ce<6;ce++)Rt(_.__webglFramebuffer[ce],D,ce);else{let ce=D.texture.mipmaps;ce&&ce.length>0?Rt(_.__webglFramebuffer[0],D,0):Rt(_.__webglFramebuffer,D,0)}else if(K){_.__webglDepthbuffer=[];for(let ce=0;ce<6;ce++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[ce]),_.__webglDepthbuffer[ce]===void 0)_.__webglDepthbuffer[ce]=i.createRenderbuffer(),_n(_.__webglDepthbuffer[ce],D,!1);else{let me=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Re=_.__webglDepthbuffer[ce];i.bindRenderbuffer(i.RENDERBUFFER,Re),i.framebufferRenderbuffer(i.FRAMEBUFFER,me,i.RENDERBUFFER,Re)}}else{let ce=D.texture.mipmaps;if(ce&&ce.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),_n(_.__webglDepthbuffer,D,!1);else{let me=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Re=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Re),i.framebufferRenderbuffer(i.FRAMEBUFFER,me,i.RENDERBUFFER,Re)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function wt(D,_,K){let ce=n.get(D);_!==void 0&&dt(ce.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),K!==void 0&&Yt(D)}function Ft(D){let _=D.texture,K=n.get(D),ce=n.get(_);D.addEventListener("dispose",w);let me=D.textures,Re=D.isWebGLCubeRenderTarget===!0,Oe=me.length>1;if(Oe||(ce.__webglTexture===void 0&&(ce.__webglTexture=i.createTexture()),ce.__version=_.version,a.memory.textures++),Re){K.__webglFramebuffer=[];for(let V=0;V<6;V++)if(_.mipmaps&&_.mipmaps.length>0){K.__webglFramebuffer[V]=[];for(let ue=0;ue<_.mipmaps.length;ue++)K.__webglFramebuffer[V][ue]=i.createFramebuffer()}else K.__webglFramebuffer[V]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){K.__webglFramebuffer=[];for(let V=0;V<_.mipmaps.length;V++)K.__webglFramebuffer[V]=i.createFramebuffer()}else K.__webglFramebuffer=i.createFramebuffer();if(Oe)for(let V=0,ue=me.length;V<ue;V++){let Se=n.get(me[V]);Se.__webglTexture===void 0&&(Se.__webglTexture=i.createTexture(),a.memory.textures++)}if(D.samples>0&&cn(D)===!1){K.__webglMultisampledFramebuffer=i.createFramebuffer(),K.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let V=0;V<me.length;V++){let ue=me[V];K.__webglColorRenderbuffer[V]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,K.__webglColorRenderbuffer[V]);let Se=r.convert(ue.format,ue.colorSpace),Ge=r.convert(ue.type),Be=I(ue.internalFormat,Se,Ge,ue.normalized,ue.colorSpace,D.isXRRenderTarget===!0),Le=Vt(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,Le,Be,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+V,i.RENDERBUFFER,K.__webglColorRenderbuffer[V])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(K.__webglDepthRenderbuffer=i.createRenderbuffer(),_n(K.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Re){t.bindTexture(i.TEXTURE_CUBE_MAP,ce.__webglTexture),qe(i.TEXTURE_CUBE_MAP,_);for(let V=0;V<6;V++)if(_.mipmaps&&_.mipmaps.length>0)for(let ue=0;ue<_.mipmaps.length;ue++)dt(K.__webglFramebuffer[V][ue],D,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+V,ue);else dt(K.__webglFramebuffer[V],D,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+V,0);x(_)&&F(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Oe){for(let V=0,ue=me.length;V<ue;V++){let Se=me[V],Ge=n.get(Se),Be=i.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(Be=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Be,Ge.__webglTexture),qe(Be,Se),dt(K.__webglFramebuffer,D,Se,i.COLOR_ATTACHMENT0+V,Be,0),x(Se)&&F(Be)}t.unbindTexture()}else{let V=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(V=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(V,ce.__webglTexture),qe(V,_),_.mipmaps&&_.mipmaps.length>0)for(let ue=0;ue<_.mipmaps.length;ue++)dt(K.__webglFramebuffer[ue],D,_,i.COLOR_ATTACHMENT0,V,ue);else dt(K.__webglFramebuffer,D,_,i.COLOR_ATTACHMENT0,V,0);x(_)&&F(V),t.unbindTexture()}D.depthBuffer&&Yt(D)}function xn(D){let _=D.textures;for(let K=0,ce=_.length;K<ce;K++){let me=_[K];if(x(me)){let Re=H(D),Oe=n.get(me).__webglTexture;t.bindTexture(Re,Oe),F(Re),t.unbindTexture()}}}let P=[],ln=[];function fn(D){if(D.samples>0){if(cn(D)===!1){let _=D.textures,K=D.width,ce=D.height,me=i.COLOR_BUFFER_BIT,Re=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Oe=n.get(D),V=_.length>1;if(V)for(let Se=0;Se<_.length;Se++)t.bindFramebuffer(i.FRAMEBUFFER,Oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Oe.__webglMultisampledFramebuffer);let ue=D.texture.mipmaps;ue&&ue.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Oe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Oe.__webglFramebuffer);for(let Se=0;Se<_.length;Se++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(me|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(me|=i.STENCIL_BUFFER_BIT)),V){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Oe.__webglColorRenderbuffer[Se]);let Ge=n.get(_[Se]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ge,0)}i.blitFramebuffer(0,0,K,ce,0,0,K,ce,me,i.NEAREST),d===!0&&(P.length=0,ln.length=0,P.push(i.COLOR_ATTACHMENT0+Se),D.depthBuffer&&D.resolveDepthBuffer===!1&&(P.push(Re),ln.push(Re),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ln)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,P))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),V)for(let Se=0;Se<_.length;Se++){t.bindFramebuffer(i.FRAMEBUFFER,Oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.RENDERBUFFER,Oe.__webglColorRenderbuffer[Se]);let Ge=n.get(_[Se]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.TEXTURE_2D,Ge,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Oe.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&d){let _=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function Vt(D){return Math.min(s.maxSamples,D.samples)}function cn(D){let _=n.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function W(D){let _=a.render.frame;m.get(D)!==_&&(m.set(D,_),D.update())}function hn(D,_){let K=D.colorSpace,ce=D.format,me=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||K!==Uo&&K!==bs&&(kt.getTransfer(K)===Jt?(ce!==bi||me!==gi)&&_t("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):vt("WebGLTextures: Unsupported texture color space:",K)),_}function Ut(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(u.width=D.naturalWidth||D.width,u.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(u.width=D.displayWidth,u.height=D.displayHeight):(u.width=D.width,u.height=D.height),u}this.allocateTextureUnit=ge,this.resetTextureUnits=xe,this.getTextureUnits=ne,this.setTextureUnits=ae,this.setTexture2D=ve,this.setTexture2DArray=Te,this.setTexture3D=se,this.setTextureCube=Ze,this.rebindTextures=wt,this.setupRenderTarget=Ft,this.updateRenderTargetMipmap=xn,this.updateMultisampleRenderTarget=fn,this.setupDepthRenderbuffer=Yt,this.setupFrameBufferTexture=dt,this.useMultisampledRTT=cn,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function ay(i,e){function t(n,s=bs){let r,a=kt.getTransfer(s);if(n===gi)return i.UNSIGNED_BYTE;if(n===kl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===zl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===su)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ru)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===nu)return i.BYTE;if(n===iu)return i.SHORT;if(n===io)return i.UNSIGNED_SHORT;if(n===Bl)return i.INT;if(n===Di)return i.UNSIGNED_INT;if(n===Ui)return i.FLOAT;if(n===Ki)return i.HALF_FLOAT;if(n===ou)return i.ALPHA;if(n===au)return i.RGB;if(n===bi)return i.RGBA;if(n===Xi)return i.DEPTH_COMPONENT;if(n===qs)return i.DEPTH_STENCIL;if(n===lu)return i.RED;if(n===Vl)return i.RED_INTEGER;if(n===Ys)return i.RG;if(n===Hl)return i.RG_INTEGER;if(n===Gl)return i.RGBA_INTEGER;if(n===sa||n===ra||n===oa||n===aa)if(a===Jt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===sa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===oa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===sa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ra)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===oa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===aa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Wl||n===Xl||n===$l||n===ql)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Wl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Xl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===$l)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ql)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Yl||n===Zl||n===Kl||n===Jl||n===jl||n===la||n===Ql)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Yl||n===Zl)return a===Jt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Kl)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Jl)return r.COMPRESSED_R11_EAC;if(n===jl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===la)return r.COMPRESSED_RG11_EAC;if(n===Ql)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ec||n===tc||n===nc||n===ic||n===sc||n===rc||n===oc||n===ac||n===lc||n===cc||n===hc||n===uc||n===dc||n===fc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ec)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===tc)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===nc)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ic)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===sc)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===rc)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===oc)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ac)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===lc)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===cc)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===hc)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===uc)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===dc)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===fc)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===pc||n===mc||n===gc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===pc)return a===Jt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===mc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===gc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===_c||n===xc||n===ca||n===vc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===_c)return r.COMPRESSED_RED_RGTC1_EXT;if(n===xc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ca)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===vc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===so?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var ly=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,cy=`
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

}`,Ru=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new qo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new jn({vertexShader:ly,fragmentShader:cy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new yn(new zs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Pu=class extends Pi{constructor(e,t){super();let n=this,s=null,r=1,a=null,c="local-floor",d=1,u=null,m=null,g=null,p=null,b=null,M=null,A=typeof XRWebGLBinding<"u",v=new Ru,x={},F=t.getContextAttributes(),H=null,I=null,z=[],O=[],G=new yt,w=null,N=new Wn;N.viewport=new tn;let j=new Wn;j.viewport=new tn;let Y=[N,j],X=new Ul,xe=null,ne=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let Ne=z[ie];return Ne===void 0&&(Ne=new Jr,z[ie]=Ne),Ne.getTargetRaySpace()},this.getControllerGrip=function(ie){let Ne=z[ie];return Ne===void 0&&(Ne=new Jr,z[ie]=Ne),Ne.getGripSpace()},this.getHand=function(ie){let Ne=z[ie];return Ne===void 0&&(Ne=new Jr,z[ie]=Ne),Ne.getHandSpace()};function ae(ie){let Ne=O.indexOf(ie.inputSource);if(Ne===-1)return;let Ie=z[Ne];Ie!==void 0&&(Ie.update(ie.inputSource,ie.frame,u||a),Ie.dispatchEvent({type:ie.type,data:ie.inputSource}))}function ge(){s.removeEventListener("select",ae),s.removeEventListener("selectstart",ae),s.removeEventListener("selectend",ae),s.removeEventListener("squeeze",ae),s.removeEventListener("squeezestart",ae),s.removeEventListener("squeezeend",ae),s.removeEventListener("end",ge),s.removeEventListener("inputsourceschange",he);for(let ie=0;ie<z.length;ie++){let Ne=O[ie];Ne!==null&&(O[ie]=null,z[ie].disconnect(Ne))}xe=null,ne=null,v.reset();for(let ie in x)delete x[ie];e.setRenderTarget(H),b=null,p=null,g=null,s=null,I=null,qe.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(G.width,G.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){r=ie,n.isPresenting===!0&&_t("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){c=ie,n.isPresenting===!0&&_t("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||a},this.setReferenceSpace=function(ie){u=ie},this.getBaseLayer=function(){return p!==null?p:b},this.getBinding=function(){return g===null&&A&&(g=new XRWebGLBinding(s,t)),g},this.getFrame=function(){return M},this.getSession=function(){return s},this.setSession=async function(ie){if(s=ie,s!==null){if(H=e.getRenderTarget(),s.addEventListener("select",ae),s.addEventListener("selectstart",ae),s.addEventListener("selectend",ae),s.addEventListener("squeeze",ae),s.addEventListener("squeezestart",ae),s.addEventListener("squeezeend",ae),s.addEventListener("end",ge),s.addEventListener("inputsourceschange",he),F.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(G),A&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ie=null,tt=null,lt=null;F.depth&&(lt=F.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ie=F.stencil?qs:Xi,tt=F.stencil?so:Di);let dt={colorFormat:t.RGBA8,depthFormat:lt,scaleFactor:r};g=this.getBinding(),p=g.createProjectionLayer(dt),s.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),I=new di(p.textureWidth,p.textureHeight,{format:bi,type:gi,depthTexture:new ys(p.textureWidth,p.textureHeight,tt,void 0,void 0,void 0,void 0,void 0,void 0,Ie),stencilBuffer:F.stencil,colorSpace:e.outputColorSpace,samples:F.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{let Ie={antialias:F.antialias,alpha:!0,depth:F.depth,stencil:F.stencil,framebufferScaleFactor:r};b=new XRWebGLLayer(s,t,Ie),s.updateRenderState({baseLayer:b}),e.setPixelRatio(1),e.setSize(b.framebufferWidth,b.framebufferHeight,!1),I=new di(b.framebufferWidth,b.framebufferHeight,{format:bi,type:gi,colorSpace:e.outputColorSpace,stencilBuffer:F.stencil,resolveDepthBuffer:b.ignoreDepthValues===!1,resolveStencilBuffer:b.ignoreDepthValues===!1})}I.isXRRenderTarget=!0,this.setFoveation(d),u=null,a=await s.requestReferenceSpace(c),qe.setContext(s),qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function he(ie){for(let Ne=0;Ne<ie.removed.length;Ne++){let Ie=ie.removed[Ne],tt=O.indexOf(Ie);tt>=0&&(O[tt]=null,z[tt].disconnect(Ie))}for(let Ne=0;Ne<ie.added.length;Ne++){let Ie=ie.added[Ne],tt=O.indexOf(Ie);if(tt===-1){for(let dt=0;dt<z.length;dt++)if(dt>=O.length){O.push(Ie),tt=dt;break}else if(O[dt]===null){O[dt]=Ie,tt=dt;break}if(tt===-1)break}let lt=z[tt];lt&&lt.connect(Ie)}}let ve=new Z,Te=new Z;function se(ie,Ne,Ie){ve.setFromMatrixPosition(Ne.matrixWorld),Te.setFromMatrixPosition(Ie.matrixWorld);let tt=ve.distanceTo(Te),lt=Ne.projectionMatrix.elements,dt=Ie.projectionMatrix.elements,_n=lt[14]/(lt[10]-1),Rt=lt[14]/(lt[10]+1),Yt=(lt[9]+1)/lt[5],wt=(lt[9]-1)/lt[5],Ft=(lt[8]-1)/lt[0],xn=(dt[8]+1)/dt[0],P=_n*Ft,ln=_n*xn,fn=tt/(-Ft+xn),Vt=fn*-Ft;if(Ne.matrixWorld.decompose(ie.position,ie.quaternion,ie.scale),ie.translateX(Vt),ie.translateZ(fn),ie.matrixWorld.compose(ie.position,ie.quaternion,ie.scale),ie.matrixWorldInverse.copy(ie.matrixWorld).invert(),lt[10]===-1)ie.projectionMatrix.copy(Ne.projectionMatrix),ie.projectionMatrixInverse.copy(Ne.projectionMatrixInverse);else{let cn=_n+fn,W=Rt+fn,hn=P-Vt,Ut=ln+(tt-Vt),D=Yt*Rt/W*cn,_=wt*Rt/W*cn;ie.projectionMatrix.makePerspective(hn,Ut,D,_,cn,W),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert()}}function Ze(ie,Ne){Ne===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(Ne.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(s===null)return;let Ne=ie.near,Ie=ie.far;v.texture!==null&&(v.depthNear>0&&(Ne=v.depthNear),v.depthFar>0&&(Ie=v.depthFar)),X.near=j.near=N.near=Ne,X.far=j.far=N.far=Ie,(xe!==X.near||ne!==X.far)&&(s.updateRenderState({depthNear:X.near,depthFar:X.far}),xe=X.near,ne=X.far),X.layers.mask=ie.layers.mask|6,N.layers.mask=X.layers.mask&-5,j.layers.mask=X.layers.mask&-3;let tt=ie.parent,lt=X.cameras;Ze(X,tt);for(let dt=0;dt<lt.length;dt++)Ze(lt[dt],tt);lt.length===2?se(X,N,j):X.projectionMatrix.copy(N.projectionMatrix),et(ie,X,tt)};function et(ie,Ne,Ie){Ie===null?ie.matrix.copy(Ne.matrixWorld):(ie.matrix.copy(Ie.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(Ne.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(Ne.projectionMatrix),ie.projectionMatrixInverse.copy(Ne.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=Yr*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return X},this.getFoveation=function(){if(!(p===null&&b===null))return d},this.setFoveation=function(ie){d=ie,p!==null&&(p.fixedFoveation=ie),b!==null&&b.fixedFoveation!==void 0&&(b.fixedFoveation=ie)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(X)},this.getCameraTexture=function(ie){return x[ie]};let De=null;function at(ie,Ne){if(m=Ne.getViewerPose(u||a),M=Ne,m!==null){let Ie=m.views;b!==null&&(e.setRenderTargetFramebuffer(I,b.framebuffer),e.setRenderTarget(I));let tt=!1;Ie.length!==X.cameras.length&&(X.cameras.length=0,tt=!0);for(let Rt=0;Rt<Ie.length;Rt++){let Yt=Ie[Rt],wt=null;if(b!==null)wt=b.getViewport(Yt);else{let xn=g.getViewSubImage(p,Yt);wt=xn.viewport,Rt===0&&(e.setRenderTargetTextures(I,xn.colorTexture,xn.depthStencilTexture),e.setRenderTarget(I))}let Ft=Y[Rt];Ft===void 0&&(Ft=new Wn,Ft.layers.enable(Rt),Ft.viewport=new tn,Y[Rt]=Ft),Ft.matrix.fromArray(Yt.transform.matrix),Ft.matrix.decompose(Ft.position,Ft.quaternion,Ft.scale),Ft.projectionMatrix.fromArray(Yt.projectionMatrix),Ft.projectionMatrixInverse.copy(Ft.projectionMatrix).invert(),Ft.viewport.set(wt.x,wt.y,wt.width,wt.height),Rt===0&&(X.matrix.copy(Ft.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),tt===!0&&X.cameras.push(Ft)}let lt=s.enabledFeatures;if(lt&&lt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&A){g=n.getBinding();let Rt=g.getDepthInformation(Ie[0]);Rt&&Rt.isValid&&Rt.texture&&v.init(Rt,s.renderState)}if(lt&&lt.includes("camera-access")&&A){e.state.unbindTexture(),g=n.getBinding();for(let Rt=0;Rt<Ie.length;Rt++){let Yt=Ie[Rt].camera;if(Yt){let wt=x[Yt];wt||(wt=new qo,x[Yt]=wt);let Ft=g.getCameraImage(Yt);wt.sourceTexture=Ft}}}}for(let Ie=0;Ie<z.length;Ie++){let tt=O[Ie],lt=z[Ie];tt!==null&&lt!==void 0&&lt.update(tt,Ne,u||a)}De&&De(ie,Ne),Ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Ne}),M=null}let qe=new hp;qe.setAnimationLoop(at),this.setAnimationLoop=function(ie){De=ie},this.dispose=function(){}}},hy=new dn,gp=new Tt;gp.set(-1,0,0,0,1,0,0,0,1);function uy(i,e){function t(v,x){v.matrixAutoUpdate===!0&&v.updateMatrix(),x.value.copy(v.matrix)}function n(v,x){x.color.getRGB(v.fogColor.value,du(i)),x.isFog?(v.fogNear.value=x.near,v.fogFar.value=x.far):x.isFogExp2&&(v.fogDensity.value=x.density)}function s(v,x,F,H,I){x.isNodeMaterial?x.uniformsNeedUpdate=!1:x.isMeshBasicMaterial?r(v,x):x.isMeshLambertMaterial?(r(v,x),x.envMap&&(v.envMapIntensity.value=x.envMapIntensity)):x.isMeshToonMaterial?(r(v,x),g(v,x)):x.isMeshPhongMaterial?(r(v,x),m(v,x),x.envMap&&(v.envMapIntensity.value=x.envMapIntensity)):x.isMeshStandardMaterial?(r(v,x),p(v,x),x.isMeshPhysicalMaterial&&b(v,x,I)):x.isMeshMatcapMaterial?(r(v,x),M(v,x)):x.isMeshDepthMaterial?r(v,x):x.isMeshDistanceMaterial?(r(v,x),A(v,x)):x.isMeshNormalMaterial?r(v,x):x.isLineBasicMaterial?(a(v,x),x.isLineDashedMaterial&&c(v,x)):x.isPointsMaterial?d(v,x,F,H):x.isSpriteMaterial?u(v,x):x.isShadowMaterial?(v.color.value.copy(x.color),v.opacity.value=x.opacity):x.isShaderMaterial&&(x.uniformsNeedUpdate=!1)}function r(v,x){v.opacity.value=x.opacity,x.color&&v.diffuse.value.copy(x.color),x.emissive&&v.emissive.value.copy(x.emissive).multiplyScalar(x.emissiveIntensity),x.map&&(v.map.value=x.map,t(x.map,v.mapTransform)),x.alphaMap&&(v.alphaMap.value=x.alphaMap,t(x.alphaMap,v.alphaMapTransform)),x.bumpMap&&(v.bumpMap.value=x.bumpMap,t(x.bumpMap,v.bumpMapTransform),v.bumpScale.value=x.bumpScale,x.side===Qn&&(v.bumpScale.value*=-1)),x.normalMap&&(v.normalMap.value=x.normalMap,t(x.normalMap,v.normalMapTransform),v.normalScale.value.copy(x.normalScale),x.side===Qn&&v.normalScale.value.negate()),x.displacementMap&&(v.displacementMap.value=x.displacementMap,t(x.displacementMap,v.displacementMapTransform),v.displacementScale.value=x.displacementScale,v.displacementBias.value=x.displacementBias),x.emissiveMap&&(v.emissiveMap.value=x.emissiveMap,t(x.emissiveMap,v.emissiveMapTransform)),x.specularMap&&(v.specularMap.value=x.specularMap,t(x.specularMap,v.specularMapTransform)),x.alphaTest>0&&(v.alphaTest.value=x.alphaTest);let F=e.get(x),H=F.envMap,I=F.envMapRotation;H&&(v.envMap.value=H,v.envMapRotation.value.setFromMatrix4(hy.makeRotationFromEuler(I)).transpose(),H.isCubeTexture&&H.isRenderTargetTexture===!1&&v.envMapRotation.value.premultiply(gp),v.reflectivity.value=x.reflectivity,v.ior.value=x.ior,v.refractionRatio.value=x.refractionRatio),x.lightMap&&(v.lightMap.value=x.lightMap,v.lightMapIntensity.value=x.lightMapIntensity,t(x.lightMap,v.lightMapTransform)),x.aoMap&&(v.aoMap.value=x.aoMap,v.aoMapIntensity.value=x.aoMapIntensity,t(x.aoMap,v.aoMapTransform))}function a(v,x){v.diffuse.value.copy(x.color),v.opacity.value=x.opacity,x.map&&(v.map.value=x.map,t(x.map,v.mapTransform))}function c(v,x){v.dashSize.value=x.dashSize,v.totalSize.value=x.dashSize+x.gapSize,v.scale.value=x.scale}function d(v,x,F,H){v.diffuse.value.copy(x.color),v.opacity.value=x.opacity,v.size.value=x.size*F,v.scale.value=H*.5,x.map&&(v.map.value=x.map,t(x.map,v.uvTransform)),x.alphaMap&&(v.alphaMap.value=x.alphaMap,t(x.alphaMap,v.alphaMapTransform)),x.alphaTest>0&&(v.alphaTest.value=x.alphaTest)}function u(v,x){v.diffuse.value.copy(x.color),v.opacity.value=x.opacity,v.rotation.value=x.rotation,x.map&&(v.map.value=x.map,t(x.map,v.mapTransform)),x.alphaMap&&(v.alphaMap.value=x.alphaMap,t(x.alphaMap,v.alphaMapTransform)),x.alphaTest>0&&(v.alphaTest.value=x.alphaTest)}function m(v,x){v.specular.value.copy(x.specular),v.shininess.value=Math.max(x.shininess,1e-4)}function g(v,x){x.gradientMap&&(v.gradientMap.value=x.gradientMap)}function p(v,x){v.metalness.value=x.metalness,x.metalnessMap&&(v.metalnessMap.value=x.metalnessMap,t(x.metalnessMap,v.metalnessMapTransform)),v.roughness.value=x.roughness,x.roughnessMap&&(v.roughnessMap.value=x.roughnessMap,t(x.roughnessMap,v.roughnessMapTransform)),x.envMap&&(v.envMapIntensity.value=x.envMapIntensity)}function b(v,x,F){v.ior.value=x.ior,x.sheen>0&&(v.sheenColor.value.copy(x.sheenColor).multiplyScalar(x.sheen),v.sheenRoughness.value=x.sheenRoughness,x.sheenColorMap&&(v.sheenColorMap.value=x.sheenColorMap,t(x.sheenColorMap,v.sheenColorMapTransform)),x.sheenRoughnessMap&&(v.sheenRoughnessMap.value=x.sheenRoughnessMap,t(x.sheenRoughnessMap,v.sheenRoughnessMapTransform))),x.clearcoat>0&&(v.clearcoat.value=x.clearcoat,v.clearcoatRoughness.value=x.clearcoatRoughness,x.clearcoatMap&&(v.clearcoatMap.value=x.clearcoatMap,t(x.clearcoatMap,v.clearcoatMapTransform)),x.clearcoatRoughnessMap&&(v.clearcoatRoughnessMap.value=x.clearcoatRoughnessMap,t(x.clearcoatRoughnessMap,v.clearcoatRoughnessMapTransform)),x.clearcoatNormalMap&&(v.clearcoatNormalMap.value=x.clearcoatNormalMap,t(x.clearcoatNormalMap,v.clearcoatNormalMapTransform),v.clearcoatNormalScale.value.copy(x.clearcoatNormalScale),x.side===Qn&&v.clearcoatNormalScale.value.negate())),x.dispersion>0&&(v.dispersion.value=x.dispersion),x.iridescence>0&&(v.iridescence.value=x.iridescence,v.iridescenceIOR.value=x.iridescenceIOR,v.iridescenceThicknessMinimum.value=x.iridescenceThicknessRange[0],v.iridescenceThicknessMaximum.value=x.iridescenceThicknessRange[1],x.iridescenceMap&&(v.iridescenceMap.value=x.iridescenceMap,t(x.iridescenceMap,v.iridescenceMapTransform)),x.iridescenceThicknessMap&&(v.iridescenceThicknessMap.value=x.iridescenceThicknessMap,t(x.iridescenceThicknessMap,v.iridescenceThicknessMapTransform))),x.transmission>0&&(v.transmission.value=x.transmission,v.transmissionSamplerMap.value=F.texture,v.transmissionSamplerSize.value.set(F.width,F.height),x.transmissionMap&&(v.transmissionMap.value=x.transmissionMap,t(x.transmissionMap,v.transmissionMapTransform)),v.thickness.value=x.thickness,x.thicknessMap&&(v.thicknessMap.value=x.thicknessMap,t(x.thicknessMap,v.thicknessMapTransform)),v.attenuationDistance.value=x.attenuationDistance,v.attenuationColor.value.copy(x.attenuationColor)),x.anisotropy>0&&(v.anisotropyVector.value.set(x.anisotropy*Math.cos(x.anisotropyRotation),x.anisotropy*Math.sin(x.anisotropyRotation)),x.anisotropyMap&&(v.anisotropyMap.value=x.anisotropyMap,t(x.anisotropyMap,v.anisotropyMapTransform))),v.specularIntensity.value=x.specularIntensity,v.specularColor.value.copy(x.specularColor),x.specularColorMap&&(v.specularColorMap.value=x.specularColorMap,t(x.specularColorMap,v.specularColorMapTransform)),x.specularIntensityMap&&(v.specularIntensityMap.value=x.specularIntensityMap,t(x.specularIntensityMap,v.specularIntensityMapTransform))}function M(v,x){x.matcap&&(v.matcap.value=x.matcap)}function A(v,x){let F=e.get(x).light;v.referencePosition.value.setFromMatrixPosition(F.matrixWorld),v.nearDistance.value=F.shadow.camera.near,v.farDistance.value=F.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function dy(i,e,t,n){let s={},r={},a=[],c=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function d(I,z){let O=z.program;n.uniformBlockBinding(I,O)}function u(I,z){let O=s[I.id];O===void 0&&(v(I),O=m(I),s[I.id]=O,I.addEventListener("dispose",F));let G=z.program;n.updateUBOMapping(I,G);let w=e.render.frame;r[I.id]!==w&&(p(I),r[I.id]=w)}function m(I){let z=g();I.__bindingPointIndex=z;let O=i.createBuffer(),G=I.__size,w=I.usage;return i.bindBuffer(i.UNIFORM_BUFFER,O),i.bufferData(i.UNIFORM_BUFFER,G,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,z,O),O}function g(){for(let I=0;I<c;I++)if(a.indexOf(I)===-1)return a.push(I),I;return vt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(I){let z=s[I.id],O=I.uniforms,G=I.__cache;i.bindBuffer(i.UNIFORM_BUFFER,z);for(let w=0,N=O.length;w<N;w++){let j=O[w];if(Array.isArray(j))for(let Y=0,X=j.length;Y<X;Y++)b(j[Y],w,Y,G);else b(j,w,0,G)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function b(I,z,O,G){if(A(I,z,O,G)===!0){let w=I.__offset,N=I.value;if(Array.isArray(N)){let j=0;for(let Y=0;Y<N.length;Y++){let X=N[Y],xe=x(X);M(X,I.__data,j),typeof X!="number"&&typeof X!="boolean"&&!X.isMatrix3&&!ArrayBuffer.isView(X)&&(j+=xe.storage/Float32Array.BYTES_PER_ELEMENT)}}else M(N,I.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,w,I.__data)}}function M(I,z,O){typeof I=="number"||typeof I=="boolean"?z[0]=I:I.isMatrix3?(z[0]=I.elements[0],z[1]=I.elements[1],z[2]=I.elements[2],z[3]=0,z[4]=I.elements[3],z[5]=I.elements[4],z[6]=I.elements[5],z[7]=0,z[8]=I.elements[6],z[9]=I.elements[7],z[10]=I.elements[8],z[11]=0):ArrayBuffer.isView(I)?z.set(new I.constructor(I.buffer,I.byteOffset,z.length)):I.toArray(z,O)}function A(I,z,O,G){let w=I.value,N=z+"_"+O;if(G[N]===void 0)return typeof w=="number"||typeof w=="boolean"?G[N]=w:ArrayBuffer.isView(w)?G[N]=w.slice():G[N]=w.clone(),!0;{let j=G[N];if(typeof w=="number"||typeof w=="boolean"){if(j!==w)return G[N]=w,!0}else{if(ArrayBuffer.isView(w))return!0;if(j.equals(w)===!1)return j.copy(w),!0}}return!1}function v(I){let z=I.uniforms,O=0,G=16;for(let N=0,j=z.length;N<j;N++){let Y=Array.isArray(z[N])?z[N]:[z[N]];for(let X=0,xe=Y.length;X<xe;X++){let ne=Y[X],ae=Array.isArray(ne.value)?ne.value:[ne.value];for(let ge=0,he=ae.length;ge<he;ge++){let ve=ae[ge],Te=x(ve),se=O%G,Ze=se%Te.boundary,et=se+Ze;O+=Ze,et!==0&&G-et<Te.storage&&(O+=G-et),ne.__data=new Float32Array(Te.storage/Float32Array.BYTES_PER_ELEMENT),ne.__offset=O,O+=Te.storage}}}let w=O%G;return w>0&&(O+=G-w),I.__size=O,I.__cache={},this}function x(I){let z={boundary:0,storage:0};return typeof I=="number"||typeof I=="boolean"?(z.boundary=4,z.storage=4):I.isVector2?(z.boundary=8,z.storage=8):I.isVector3||I.isColor?(z.boundary=16,z.storage=12):I.isVector4?(z.boundary=16,z.storage=16):I.isMatrix3?(z.boundary=48,z.storage=48):I.isMatrix4?(z.boundary=64,z.storage=64):I.isTexture?_t("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(I)?(z.boundary=16,z.storage=I.byteLength):_t("WebGLRenderer: Unsupported uniform value type.",I),z}function F(I){let z=I.target;z.removeEventListener("dispose",F);let O=a.indexOf(z.__bindingPointIndex);a.splice(O,1),i.deleteBuffer(s[z.id]),delete s[z.id],delete r[z.id]}function H(){for(let I in s)i.deleteBuffer(s[I]);a=[],s={},r={}}return{bind:d,update:u,dispose:H}}var fy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ji=null;function py(){return Ji===null&&(Ji=new xl(fy,16,16,Ys,Ki),Ji.name="DFG_LUT",Ji.minFilter=Nn,Ji.magFilter=Nn,Ji.wrapS=Wi,Ji.wrapT=Wi,Ji.generateMipmaps=!1,Ji.needsUpdate=!0),Ji}var Tc=class{constructor(e={}){let{canvas:t=Ff(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:c=!1,premultipliedAlpha:d=!0,preserveDrawingBuffer:u=!1,powerPreference:m="default",failIfMajorPerformanceCaveat:g=!1,reversedDepthBuffer:p=!1,outputBufferType:b=gi}=e;this.isWebGLRenderer=!0;let M;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=n.getContextAttributes().alpha}else M=a;let A=b,v=new Set([Gl,Hl,Vl]),x=new Set([gi,Di,io,so,kl,zl]),F=new Uint32Array(4),H=new Int32Array(4),I=new Z,z=null,O=null,G=[],w=[],N=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Li,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let j=this,Y=!1,X=null,xe=null,ne=null,ae=null;this._outputColorSpace=Zn;let ge=0,he=0,ve=null,Te=-1,se=null,Ze=new tn,et=new tn,De=null,at=new Ct(0),qe=0,ie=t.width,Ne=t.height,Ie=1,tt=null,lt=null,dt=new tn(0,0,ie,Ne),_n=new tn(0,0,ie,Ne),Rt=!1,Yt=new Wo,wt=!1,Ft=!1,xn=new dn,P=new Z,ln=new tn,fn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Vt=!1;function cn(){return ve===null?Ie:1}let W=n;function hn(E,Q){return t.getContext(E,Q)}try{let E={alpha:!0,depth:s,stencil:r,antialias:c,premultipliedAlpha:d,preserveDrawingBuffer:u,powerPreference:m,failIfMajorPerformanceCaveat:g};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"185"}`),t.addEventListener("webglcontextlost",Pt,!1),t.addEventListener("webglcontextrestored",jt,!1),t.addEventListener("webglcontextcreationerror",ri,!1),W===null){let Q="webgl2";if(W=hn(Q,E),W===null)throw hn(Q)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(E){throw vt("WebGLRenderer: "+E.message),E}let Ut,D,_,K,ce,me,Re,Oe,V,ue,Se,Ge,Be,Le,ft,Qe,bt,$,Fe,pe,ke,$e,ye;function nt(){Ut=new bx(W),Ut.init(),ke=new ay(W,Ut),D=new fx(W,Ut,e,ke),_=new ry(W,Ut),D.reversedDepthBuffer&&p&&_.buffers.depth.setReversed(!0),xe=W.createFramebuffer(),ne=W.createFramebuffer(),ae=W.createFramebuffer(),K=new wx(W),ce=new Xv,me=new oy(W,Ut,_,ce,D,ke,K),Re=new yx(j),Oe=new Cg(W),$e=new ux(W,Oe),V=new Sx(W,Oe,K,$e),ue=new Tx(W,V,Oe,$e,K),$=new Ex(W,D,me),ft=new px(ce),Se=new Wv(j,Re,Ut,D,$e,ft),Ge=new uy(j,ce),Be=new qv,Le=new Qv(Ut),bt=new hx(j,Re,_,ue,M,d),Qe=new sy(j,ue,D),ye=new dy(W,K,D,_),Fe=new dx(W,Ut,K),pe=new Mx(W,Ut,K),K.programs=Se.programs,j.capabilities=D,j.extensions=Ut,j.properties=ce,j.renderLists=Be,j.shadowMap=Qe,j.state=_,j.info=K}nt(),A!==gi&&(N=new Cx(A,t.width,t.height,c,s,r));let it=new Pu(j,W);this.xr=it,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){let E=Ut.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=Ut.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Ie},this.setPixelRatio=function(E){E!==void 0&&(Ie=E,this.setSize(ie,Ne,!1))},this.getSize=function(E){return E.set(ie,Ne)},this.setSize=function(E,Q,de=!0){if(it.isPresenting){_t("WebGLRenderer: Can't change size while VR device is presenting.");return}ie=E,Ne=Q,t.width=Math.floor(E*Ie),t.height=Math.floor(Q*Ie),de===!0&&(t.style.width=E+"px",t.style.height=Q+"px"),N!==null&&N.setSize(t.width,t.height),this.setViewport(0,0,E,Q)},this.getDrawingBufferSize=function(E){return E.set(ie*Ie,Ne*Ie).floor()},this.setDrawingBufferSize=function(E,Q,de){ie=E,Ne=Q,Ie=de,t.width=Math.floor(E*de),t.height=Math.floor(Q*de),this.setViewport(0,0,E,Q)},this.setEffects=function(E){if(A===gi){vt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let Q=0;Q<E.length;Q++)if(E[Q].isOutputPass===!0){_t("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}N.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(Ze)},this.getViewport=function(E){return E.copy(dt)},this.setViewport=function(E,Q,de,te){E.isVector4?dt.set(E.x,E.y,E.z,E.w):dt.set(E,Q,de,te),_.viewport(Ze.copy(dt).multiplyScalar(Ie).round())},this.getScissor=function(E){return E.copy(_n)},this.setScissor=function(E,Q,de,te){E.isVector4?_n.set(E.x,E.y,E.z,E.w):_n.set(E,Q,de,te),_.scissor(et.copy(_n).multiplyScalar(Ie).round())},this.getScissorTest=function(){return Rt},this.setScissorTest=function(E){_.setScissorTest(Rt=E)},this.setOpaqueSort=function(E){tt=E},this.setTransparentSort=function(E){lt=E},this.getClearColor=function(E){return E.copy(bt.getClearColor())},this.setClearColor=function(){bt.setClearColor(...arguments)},this.getClearAlpha=function(){return bt.getClearAlpha()},this.setClearAlpha=function(){bt.setClearAlpha(...arguments)},this.clear=function(E=!0,Q=!0,de=!0){let te=0;if(E){let re=!1;if(ve!==null){let We=ve.texture.format;re=v.has(We)}if(re){let We=ve.texture.type,Ye=x.has(We),Xe=bt.getClearColor(),ot=bt.getClearAlpha(),ct=Xe.r,Et=Xe.g,It=Xe.b;Ye?(F[0]=ct,F[1]=Et,F[2]=It,F[3]=ot,W.clearBufferuiv(W.COLOR,0,F)):(H[0]=ct,H[1]=Et,H[2]=It,H[3]=ot,W.clearBufferiv(W.COLOR,0,H))}else te|=W.COLOR_BUFFER_BIT}Q&&(te|=W.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),de&&(te|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),te!==0&&W.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),X=E},this.dispose=function(){t.removeEventListener("webglcontextlost",Pt,!1),t.removeEventListener("webglcontextrestored",jt,!1),t.removeEventListener("webglcontextcreationerror",ri,!1),bt.dispose(),Be.dispose(),Le.dispose(),ce.dispose(),Re.dispose(),ue.dispose(),$e.dispose(),ye.dispose(),Se.dispose(),it.dispose(),it.removeEventListener("sessionstart",uo),it.removeEventListener("sessionend",fo),Ni.stop()};function Pt(E){E.preventDefault(),Bo("WebGLRenderer: Context Lost."),Y=!0}function jt(){Bo("WebGLRenderer: Context Restored."),Y=!1;let E=K.autoReset,Q=Qe.enabled,de=Qe.autoUpdate,te=Qe.needsUpdate,re=Qe.type;nt(),K.autoReset=E,Qe.enabled=Q,Qe.autoUpdate=de,Qe.needsUpdate=te,Qe.type=re}function ri(E){vt("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function oi(E){let Q=E.target;Q.removeEventListener("dispose",oi),ma(Q)}function ma(E){ho(E),ce.remove(E)}function ho(E){let Q=ce.get(E).programs;Q!==void 0&&(Q.forEach(function(de){Se.releaseProgram(de)}),E.isShaderMaterial&&Se.releaseShaderCache(E))}this.renderBufferDirect=function(E,Q,de,te,re,We){Q===null&&(Q=fn);let Ye=re.isMesh&&re.matrixWorld.determinantAffine()<0,Xe=br(E,Q,de,te,re);_.setMaterial(te,Ye);let ot=de.index,ct=1;if(te.wireframe===!0){if(ot=V.getWireframeAttribute(de),ot===void 0)return;ct=2}let Et=de.drawRange,It=de.attributes.position,st=Et.start*ct,Ht=(Et.start+Et.count)*ct;We!==null&&(st=Math.max(st,We.start*ct),Ht=Math.min(Ht,(We.start+We.count)*ct)),ot!==null?(st=Math.max(st,0),Ht=Math.min(Ht,ot.count)):It!=null&&(st=Math.max(st,0),Ht=Math.min(Ht,It.count));let pn=Ht-st;if(pn<0||pn===1/0)return;$e.setup(re,te,Xe,de,ot);let mn,Zt=Fe;if(ot!==null&&(mn=Oe.get(ot),Zt=pe,Zt.setIndex(mn)),re.isMesh)te.wireframe===!0?(_.setLineWidth(te.wireframeLinewidth*cn()),Zt.setMode(W.LINES)):Zt.setMode(W.TRIANGLES);else if(re.isLine){let bn=te.linewidth;bn===void 0&&(bn=1),_.setLineWidth(bn*cn()),re.isLineSegments?Zt.setMode(W.LINES):re.isLineLoop?Zt.setMode(W.LINE_LOOP):Zt.setMode(W.LINE_STRIP)}else re.isPoints?Zt.setMode(W.POINTS):re.isSprite&&Zt.setMode(W.TRIANGLES);if(re.isBatchedMesh)if(Ut.get("WEBGL_multi_draw"))Zt.renderMultiDraw(re._multiDrawStarts,re._multiDrawCounts,re._multiDrawCount);else{let bn=re._multiDrawStarts,je=re._multiDrawCounts,Ln=re._multiDrawCount,Nt=ot?Oe.get(ot).bytesPerElement:1,$n=ce.get(te).currentProgram.getUniforms();for(let _i=0;_i<Ln;_i++)$n.setValue(W,"_gl_DrawID",_i),Zt.render(bn[_i]/Nt,je[_i])}else if(re.isInstancedMesh)Zt.renderInstances(st,pn,re.count);else if(de.isInstancedBufferGeometry){let bn=de._maxInstanceCount!==void 0?de._maxInstanceCount:1/0,je=Math.min(de.instanceCount,bn);Zt.renderInstances(st,pn,je)}else Zt.render(st,pn)};function ga(E,Q,de){E.transparent===!0&&E.side===mi&&E.forceSinglePass===!1?(E.side=Qn,E.needsUpdate=!0,js(E,Q,de),E.side=xs,E.needsUpdate=!0,js(E,Q,de),E.side=mi):js(E,Q,de)}this.compile=function(E,Q,de=null){de===null&&(de=E),O=Le.get(de),O.init(Q),w.push(O),de.traverseVisible(function(re){re.isLight&&re.layers.test(Q.layers)&&(O.pushLight(re),re.castShadow&&O.pushShadow(re))}),E!==de&&E.traverseVisible(function(re){re.isLight&&re.layers.test(Q.layers)&&(O.pushLight(re),re.castShadow&&O.pushShadow(re))}),O.setupLights();let te=new Set;return E.traverse(function(re){if(!(re.isMesh||re.isPoints||re.isLine||re.isSprite))return;let We=re.material;if(We)if(Array.isArray(We))for(let Ye=0;Ye<We.length;Ye++){let Xe=We[Ye];ga(Xe,de,re),te.add(Xe)}else ga(We,de,re),te.add(We)}),O=w.pop(),te},this.compileAsync=function(E,Q,de=null){let te=this.compile(E,Q,de);return new Promise(re=>{function We(){if(te.forEach(function(Ye){ce.get(Ye).currentProgram.isReady()&&te.delete(Ye)}),te.size===0){re(E);return}setTimeout(We,10)}Ut.get("KHR_parallel_shader_compile")!==null?We():setTimeout(We,10)})};let Js=null;function _a(E){Js&&Js(E)}function uo(){Ni.stop()}function fo(){Ni.start()}let Ni=new hp;Ni.setAnimationLoop(_a),typeof self<"u"&&Ni.setContext(self),this.setAnimationLoop=function(E){Js=E,it.setAnimationLoop(E),E===null?Ni.stop():Ni.start()},it.addEventListener("sessionstart",uo),it.addEventListener("sessionend",fo),this.render=function(E,Q){if(Q!==void 0&&Q.isCamera!==!0){vt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(Y===!0)return;X!==null&&X.renderStart(E,Q);let de=it.enabled===!0&&it.isPresenting===!0,te=N!==null&&(ve===null||de)&&N.begin(j,ve);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),Q.parent===null&&Q.matrixWorldAutoUpdate===!0&&Q.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(N===null||N.isCompositing()===!1)&&(it.cameraAutoUpdate===!0&&it.updateCamera(Q),Q=it.getCamera()),E.isScene===!0&&E.onBeforeRender(j,E,Q,ve),O=Le.get(E,w.length),O.init(Q),O.state.textureUnits=me.getTextureUnits(),w.push(O),xn.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),Yt.setFromProjectionMatrix(xn,Ci,Q.reversedDepth),Ft=this.localClippingEnabled,wt=ft.init(this.clippingPlanes,Ft),z=Be.get(E,G.length),z.init(),G.push(z),it.enabled===!0&&it.isPresenting===!0){let Ye=j.xr.getDepthSensingMesh();Ye!==null&&Ss(Ye,Q,-1/0,j.sortObjects)}Ss(E,Q,0,j.sortObjects),z.finish(),j.sortObjects===!0&&z.sort(tt,lt,Q.reversedDepth),Vt=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,Vt&&bt.addToRenderList(z,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),wt===!0&&ft.beginShadows();let re=O.state.shadowsArray;if(Qe.render(re,E,Q),wt===!0&&ft.endShadows(),(te&&N.hasRenderPass())===!1){let Ye=z.opaque,Xe=z.transmissive;if(O.setupLights(),Q.isArrayCamera){let ot=Q.cameras;if(Xe.length>0)for(let ct=0,Et=ot.length;ct<Et;ct++){let It=ot[ct];po(Ye,Xe,E,It)}Vt&&bt.render(E);for(let ct=0,Et=ot.length;ct<Et;ct++){let It=ot[ct];ns(z,E,It,It.viewport)}}else Xe.length>0&&po(Ye,Xe,E,Q),Vt&&bt.render(E),ns(z,E,Q)}ve!==null&&he===0&&(me.updateMultisampleRenderTarget(ve),me.updateRenderTargetMipmap(ve)),te&&N.end(j),E.isScene===!0&&E.onAfterRender(j,E,Q),$e.resetDefaultState(),Te=-1,se=null,w.pop(),w.length>0?(O=w[w.length-1],me.setTextureUnits(O.state.textureUnits),wt===!0&&ft.setGlobalState(j.clippingPlanes,O.state.camera)):O=null,G.pop(),G.length>0?z=G[G.length-1]:z=null,X!==null&&X.renderEnd()};function Ss(E,Q,de,te){if(E.visible===!1)return;if(E.layers.test(Q.layers)){if(E.isGroup)de=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(Q);else if(E.isLightProbeGrid)O.pushLightProbeGrid(E);else if(E.isLight)O.pushLight(E),E.castShadow&&O.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Yt.intersectsSprite(E)){te&&ln.setFromMatrixPosition(E.matrixWorld).applyMatrix4(xn);let Ye=ue.update(E),Xe=E.material;Xe.visible&&z.push(E,Ye,Xe,de,ln.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Yt.intersectsObject(E))){let Ye=ue.update(E),Xe=E.material;if(te&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),ln.copy(E.boundingSphere.center)):(Ye.boundingSphere===null&&Ye.computeBoundingSphere(),ln.copy(Ye.boundingSphere.center)),ln.applyMatrix4(E.matrixWorld).applyMatrix4(xn)),Array.isArray(Xe)){let ot=Ye.groups;for(let ct=0,Et=ot.length;ct<Et;ct++){let It=ot[ct],st=Xe[It.materialIndex];st&&st.visible&&z.push(E,Ye,st,de,ln.z,It)}}else Xe.visible&&z.push(E,Ye,Xe,de,ln.z,null)}}let We=E.children;for(let Ye=0,Xe=We.length;Ye<Xe;Ye++)Ss(We[Ye],Q,de,te)}function ns(E,Q,de,te){let{opaque:re,transmissive:We,transparent:Ye}=E;O.setupLightsView(de),wt===!0&&ft.setGlobalState(j.clippingPlanes,de),te&&_.viewport(Ze.copy(te)),re.length>0&&xr(re,Q,de),We.length>0&&xr(We,Q,de),Ye.length>0&&xr(Ye,Q,de),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function po(E,Q,de,te){if((de.isScene===!0?de.overrideMaterial:null)!==null)return;if(O.state.transmissionRenderTarget[te.id]===void 0){let st=Ut.has("EXT_color_buffer_half_float")||Ut.has("EXT_color_buffer_float");O.state.transmissionRenderTarget[te.id]=new di(1,1,{generateMipmaps:!0,type:st?Ki:gi,minFilter:$s,samples:Math.max(4,D.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:kt.workingColorSpace})}let We=O.state.transmissionRenderTarget[te.id],Ye=te.viewport||Ze;We.setSize(Ye.z*j.transmissionResolutionScale,Ye.w*j.transmissionResolutionScale);let Xe=j.getRenderTarget(),ot=j.getActiveCubeFace(),ct=j.getActiveMipmapLevel();j.setRenderTarget(We),j.getClearColor(at),qe=j.getClearAlpha(),qe<1&&j.setClearColor(16777215,.5),j.clear(),Vt&&bt.render(de);let Et=j.toneMapping;j.toneMapping=Li;let It=te.viewport;if(te.viewport!==void 0&&(te.viewport=void 0),O.setupLightsView(te),wt===!0&&ft.setGlobalState(j.clippingPlanes,te),xr(E,de,te),me.updateMultisampleRenderTarget(We),me.updateRenderTargetMipmap(We),Ut.has("WEBGL_multisampled_render_to_texture")===!1){let st=!1;for(let Ht=0,pn=Q.length;Ht<pn;Ht++){let mn=Q[Ht],{object:Zt,geometry:bn,material:je,group:Ln}=mn;if(je.side===mi&&Zt.layers.test(te.layers)){let Nt=je.side;je.side=Qn,je.needsUpdate=!0,nn(Zt,de,te,bn,je,Ln),je.side=Nt,je.needsUpdate=!0,st=!0}}st===!0&&(me.updateMultisampleRenderTarget(We),me.updateRenderTargetMipmap(We))}j.setRenderTarget(Xe,ot,ct),j.setClearColor(at,qe),It!==void 0&&(te.viewport=It),j.toneMapping=Et}function xr(E,Q,de){let te=Q.isScene===!0?Q.overrideMaterial:null;for(let re=0,We=E.length;re<We;re++){let Ye=E[re],{object:Xe,geometry:ot,group:ct}=Ye,Et=Ye.material;Et.allowOverride===!0&&te!==null&&(Et=te),Xe.layers.test(de.layers)&&nn(Xe,Q,de,ot,Et,ct)}}function nn(E,Q,de,te,re,We){E.onBeforeRender(j,Q,de,te,re,We),E.modelViewMatrix.multiplyMatrices(de.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),re.onBeforeRender(j,Q,de,te,E,We),re.transparent===!0&&re.side===mi&&re.forceSinglePass===!1?(re.side=Qn,re.needsUpdate=!0,j.renderBufferDirect(de,Q,te,re,E,We),re.side=xs,re.needsUpdate=!0,j.renderBufferDirect(de,Q,te,re,E,We),re.side=mi):j.renderBufferDirect(de,Q,te,re,E,We),E.onAfterRender(j,Q,de,te,re,We)}function js(E,Q,de){Q.isScene!==!0&&(Q=fn);let te=ce.get(E),re=O.state.lights,We=O.state.shadowsArray,Ye=re.state.version,Xe=Se.getParameters(E,re.state,We,Q,de,O.state.lightProbeGridArray),ot=Se.getProgramCacheKey(Xe),ct=te.programs;te.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?Q.environment:null,te.fog=Q.fog;let Et=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;te.envMap=Re.get(E.envMap||te.environment,Et),te.envMapRotation=te.environment!==null&&E.envMap===null?Q.environmentRotation:E.envMapRotation,ct===void 0&&(E.addEventListener("dispose",oi),ct=new Map,te.programs=ct);let It=ct.get(ot);if(It!==void 0){if(te.currentProgram===It&&te.lightsStateVersion===Ye)return yr(E,Xe),It}else Xe.uniforms=Se.getUniforms(E),X!==null&&E.isNodeMaterial&&X.build(E,de,Xe),E.onBeforeCompile(Xe,j),It=Se.acquireProgram(Xe,ot),ct.set(ot,It),te.uniforms=Xe.uniforms;let st=te.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(st.clippingPlanes=ft.uniform),yr(E,Xe),te.needsLights=Oc(E),te.lightsStateVersion=Ye,te.needsLights&&(st.ambientLightColor.value=re.state.ambient,st.lightProbe.value=re.state.probe,st.directionalLights.value=re.state.directional,st.directionalLightShadows.value=re.state.directionalShadow,st.spotLights.value=re.state.spot,st.spotLightShadows.value=re.state.spotShadow,st.rectAreaLights.value=re.state.rectArea,st.ltc_1.value=re.state.rectAreaLTC1,st.ltc_2.value=re.state.rectAreaLTC2,st.pointLights.value=re.state.point,st.pointLightShadows.value=re.state.pointShadow,st.hemisphereLights.value=re.state.hemi,st.directionalShadowMatrix.value=re.state.directionalShadowMatrix,st.spotLightMatrix.value=re.state.spotLightMatrix,st.spotLightMap.value=re.state.spotLightMap,st.pointShadowMatrix.value=re.state.pointShadowMatrix),te.lightProbeGrid=O.state.lightProbeGridArray.length>0,te.currentProgram=It,te.uniformsList=null,It}function vr(E){if(E.uniformsList===null){let Q=E.currentProgram.getUniforms();E.uniformsList=oo.seqWithValue(Q.seq,E.uniforms)}return E.uniformsList}function yr(E,Q){let de=ce.get(E);de.outputColorSpace=Q.outputColorSpace,de.batching=Q.batching,de.batchingColor=Q.batchingColor,de.instancing=Q.instancing,de.instancingColor=Q.instancingColor,de.instancingMorph=Q.instancingMorph,de.skinning=Q.skinning,de.morphTargets=Q.morphTargets,de.morphNormals=Q.morphNormals,de.morphColors=Q.morphColors,de.morphTargetsCount=Q.morphTargetsCount,de.numClippingPlanes=Q.numClippingPlanes,de.numIntersection=Q.numClipIntersection,de.vertexAlphas=Q.vertexAlphas,de.vertexTangents=Q.vertexTangents,de.toneMapping=Q.toneMapping}function Fc(E,Q){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;I.setFromMatrixPosition(Q.matrixWorld);for(let de=0,te=E.length;de<te;de++){let re=E[de];if(re.texture!==null&&re.boundingBox.containsPoint(I))return re}return null}function br(E,Q,de,te,re){Q.isScene!==!0&&(Q=fn),me.resetTextureUnits();let We=Q.fog,Ye=te.isMeshStandardMaterial||te.isMeshLambertMaterial||te.isMeshPhongMaterial?Q.environment:null,Xe=ve===null?j.outputColorSpace:ve.isXRRenderTarget===!0?ve.texture.colorSpace:kt.workingColorSpace,ot=te.isMeshStandardMaterial||te.isMeshLambertMaterial&&!te.envMap||te.isMeshPhongMaterial&&!te.envMap,ct=Re.get(te.envMap||Ye,ot),Et=te.vertexColors===!0&&!!de.attributes.color&&de.attributes.color.itemSize===4,It=!!de.attributes.tangent&&(!!te.normalMap||te.anisotropy>0),st=!!de.morphAttributes.position,Ht=!!de.morphAttributes.normal,pn=!!de.morphAttributes.color,mn=Li;te.toneMapped&&(ve===null||ve.isXRRenderTarget===!0)&&(mn=j.toneMapping);let Zt=de.morphAttributes.position||de.morphAttributes.normal||de.morphAttributes.color,bn=Zt!==void 0?Zt.length:0,je=ce.get(te),Ln=O.state.lights;if(wt===!0&&(Ft===!0||E!==se)){let qt=E===se&&te.id===Te;ft.setState(te,E,qt)}let Nt=!1;te.version===je.__version?(je.needsLights&&je.lightsStateVersion!==Ln.state.version||je.outputColorSpace!==Xe||re.isBatchedMesh&&je.batching===!1||!re.isBatchedMesh&&je.batching===!0||re.isBatchedMesh&&je.batchingColor===!0&&re.colorTexture===null||re.isBatchedMesh&&je.batchingColor===!1&&re.colorTexture!==null||re.isInstancedMesh&&je.instancing===!1||!re.isInstancedMesh&&je.instancing===!0||re.isSkinnedMesh&&je.skinning===!1||!re.isSkinnedMesh&&je.skinning===!0||re.isInstancedMesh&&je.instancingColor===!0&&re.instanceColor===null||re.isInstancedMesh&&je.instancingColor===!1&&re.instanceColor!==null||re.isInstancedMesh&&je.instancingMorph===!0&&re.morphTexture===null||re.isInstancedMesh&&je.instancingMorph===!1&&re.morphTexture!==null||je.envMap!==ct||te.fog===!0&&je.fog!==We||je.numClippingPlanes!==void 0&&(je.numClippingPlanes!==ft.numPlanes||je.numIntersection!==ft.numIntersection)||je.vertexAlphas!==Et||je.vertexTangents!==It||je.morphTargets!==st||je.morphNormals!==Ht||je.morphColors!==pn||je.toneMapping!==mn||je.morphTargetsCount!==bn||!!je.lightProbeGrid!=O.state.lightProbeGridArray.length>0)&&(Nt=!0):(Nt=!0,je.__version=te.version);let $n=je.currentProgram;Nt===!0&&($n=js(te,Q,re),X&&te.isNodeMaterial&&X.onUpdateProgram(te,$n,je));let _i=!1,Fi=!1,gn=!1,zt=$n.getUniforms(),on=je.uniforms;if(_.useProgram($n.program)&&(_i=!0,Fi=!0,gn=!0),te.id!==Te&&(Te=te.id,Fi=!0),je.needsLights){let qt=Fc(O.state.lightProbeGridArray,re);je.lightProbeGrid!==qt&&(je.lightProbeGrid=qt,Fi=!0)}if(_i||se!==E){_.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),zt.setValue(W,"projectionMatrix",E.projectionMatrix),zt.setValue(W,"viewMatrix",E.matrixWorldInverse);let Oi=zt.map.cameraPosition;Oi!==void 0&&Oi.setValue(W,P.setFromMatrixPosition(E.matrixWorld)),D.logarithmicDepthBuffer&&zt.setValue(W,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial)&&zt.setValue(W,"isOrthographic",E.isOrthographicCamera===!0),se!==E&&(se=E,Fi=!0,gn=!0)}if(je.needsLights&&(Ln.state.directionalShadowMap.length>0&&zt.setValue(W,"directionalShadowMap",Ln.state.directionalShadowMap,me),Ln.state.spotShadowMap.length>0&&zt.setValue(W,"spotShadowMap",Ln.state.spotShadowMap,me),Ln.state.pointShadowMap.length>0&&zt.setValue(W,"pointShadowMap",Ln.state.pointShadowMap,me)),re.isSkinnedMesh){zt.setOptional(W,re,"bindMatrix"),zt.setOptional(W,re,"bindMatrixInverse");let qt=re.skeleton;qt&&(qt.boneTexture===null&&qt.computeBoneTexture(),zt.setValue(W,"boneTexture",qt.boneTexture,me))}re.isBatchedMesh&&(zt.setOptional(W,re,"batchingTexture"),zt.setValue(W,"batchingTexture",re._matricesTexture,me),zt.setOptional(W,re,"batchingIdTexture"),zt.setValue(W,"batchingIdTexture",re._indirectTexture,me),zt.setOptional(W,re,"batchingColorTexture"),re._colorsTexture!==null&&zt.setValue(W,"batchingColorTexture",re._colorsTexture,me));let ai=de.morphAttributes;if((ai.position!==void 0||ai.normal!==void 0||ai.color!==void 0)&&$.update(re,de,$n),(Fi||je.receiveShadow!==re.receiveShadow)&&(je.receiveShadow=re.receiveShadow,zt.setValue(W,"receiveShadow",re.receiveShadow)),(te.isMeshStandardMaterial||te.isMeshLambertMaterial||te.isMeshPhongMaterial)&&te.envMap===null&&Q.environment!==null&&(on.envMapIntensity.value=Q.environmentIntensity),on.dfgLUT!==void 0&&(on.dfgLUT.value=py()),Fi){if(zt.setValue(W,"toneMappingExposure",j.toneMappingExposure),je.needsLights&&is(on,gn),We&&te.fog===!0&&Ge.refreshFogUniforms(on,We),Ge.refreshMaterialUniforms(on,te,Ie,Ne,O.state.transmissionRenderTarget[E.id]),je.needsLights&&je.lightProbeGrid){let qt=je.lightProbeGrid;on.probesSH.value=qt.texture,on.probesMin.value.copy(qt.boundingBox.min),on.probesMax.value.copy(qt.boundingBox.max),on.probesResolution.value.copy(qt.resolution)}oo.upload(W,vr(je),on,me)}if(te.isShaderMaterial&&te.uniformsNeedUpdate===!0&&(oo.upload(W,vr(je),on,me),te.uniformsNeedUpdate=!1),te.isSpriteMaterial&&zt.setValue(W,"center",re.center),zt.setValue(W,"modelViewMatrix",re.modelViewMatrix),zt.setValue(W,"normalMatrix",re.normalMatrix),zt.setValue(W,"modelMatrix",re.matrixWorld),te.uniformsGroups!==void 0){let qt=te.uniformsGroups;for(let Oi=0,Ms=qt.length;Oi<Ms;Oi++){let ss=qt[Oi];ye.update(ss,$n),ye.bind(ss,$n)}}return $n}function is(E,Q){E.ambientLightColor.needsUpdate=Q,E.lightProbe.needsUpdate=Q,E.directionalLights.needsUpdate=Q,E.directionalLightShadows.needsUpdate=Q,E.pointLights.needsUpdate=Q,E.pointLightShadows.needsUpdate=Q,E.spotLights.needsUpdate=Q,E.spotLightShadows.needsUpdate=Q,E.rectAreaLights.needsUpdate=Q,E.hemisphereLights.needsUpdate=Q}function Oc(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return ge},this.getActiveMipmapLevel=function(){return he},this.getRenderTarget=function(){return ve},this.setRenderTargetTextures=function(E,Q,de){let te=ce.get(E);te.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,te.__autoAllocateDepthBuffer===!1&&(te.__useRenderToTexture=!1),ce.get(E.texture).__webglTexture=Q,ce.get(E.depthTexture).__webglTexture=te.__autoAllocateDepthBuffer?void 0:de,te.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,Q){let de=ce.get(E);de.__webglFramebuffer=Q,de.__useDefaultFramebuffer=Q===void 0},this.setRenderTarget=function(E,Q=0,de=0){ve=E,ge=Q,he=de;let te=null,re=!1,We=!1;if(E){let Xe=ce.get(E);if(Xe.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(W.FRAMEBUFFER,Xe.__webglFramebuffer),Ze.copy(E.viewport),et.copy(E.scissor),De=E.scissorTest,_.viewport(Ze),_.scissor(et),_.setScissorTest(De),Te=-1;return}else if(Xe.__webglFramebuffer===void 0)me.setupRenderTarget(E);else if(Xe.__hasExternalTextures)me.rebindTextures(E,ce.get(E.texture).__webglTexture,ce.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Et=E.depthTexture;if(Xe.__boundDepthTexture!==Et){if(Et!==null&&ce.has(Et)&&(E.width!==Et.image.width||E.height!==Et.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");me.setupDepthRenderbuffer(E)}}let ot=E.texture;(ot.isData3DTexture||ot.isDataArrayTexture||ot.isCompressedArrayTexture)&&(We=!0);let ct=ce.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(ct[Q])?te=ct[Q][de]:te=ct[Q],re=!0):E.samples>0&&me.useMultisampledRTT(E)===!1?te=ce.get(E).__webglMultisampledFramebuffer:Array.isArray(ct)?te=ct[de]:te=ct,Ze.copy(E.viewport),et.copy(E.scissor),De=E.scissorTest}else Ze.copy(dt).multiplyScalar(Ie).floor(),et.copy(_n).multiplyScalar(Ie).floor(),De=Rt;if(de!==0&&(te=xe),_.bindFramebuffer(W.FRAMEBUFFER,te)&&_.drawBuffers(E,te),_.viewport(Ze),_.scissor(et),_.setScissorTest(De),re){let Xe=ce.get(E.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Xe.__webglTexture,de)}else if(We){let Xe=Q;for(let ot=0;ot<E.textures.length;ot++){let ct=ce.get(E.textures[ot]);W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0+ot,ct.__webglTexture,de,Xe)}}else if(E!==null&&de!==0){let Xe=ce.get(E.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,Xe.__webglTexture,de)}Te=-1},this.readRenderTargetPixels=function(E,Q,de,te,re,We,Ye,Xe=0){if(!(E&&E.isWebGLRenderTarget)){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ot=ce.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ye!==void 0&&(ot=ot[Ye]),ot){_.bindFramebuffer(W.FRAMEBUFFER,ot);try{let ct=E.textures[Xe],Et=ct.format,It=ct.type;if(E.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+Xe),!D.textureFormatReadable(Et)){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!D.textureTypeReadable(It)){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Q>=0&&Q<=E.width-te&&de>=0&&de<=E.height-re&&W.readPixels(Q,de,te,re,ke.convert(Et),ke.convert(It),We)}finally{let ct=ve!==null?ce.get(ve).__webglFramebuffer:null;_.bindFramebuffer(W.FRAMEBUFFER,ct)}}},this.readRenderTargetPixelsAsync=async function(E,Q,de,te,re,We,Ye,Xe=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ot=ce.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ye!==void 0&&(ot=ot[Ye]),ot)if(Q>=0&&Q<=E.width-te&&de>=0&&de<=E.height-re){_.bindFramebuffer(W.FRAMEBUFFER,ot);let ct=E.textures[Xe],Et=ct.format,It=ct.type;if(E.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+Xe),!D.textureFormatReadable(Et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!D.textureTypeReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let st=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,st),W.bufferData(W.PIXEL_PACK_BUFFER,We.byteLength,W.STREAM_READ),W.readPixels(Q,de,te,re,ke.convert(Et),ke.convert(It),0);let Ht=ve!==null?ce.get(ve).__webglFramebuffer:null;_.bindFramebuffer(W.FRAMEBUFFER,Ht);let pn=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await Bf(W,pn,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,st),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,We),W.deleteBuffer(st),W.deleteSync(pn),We}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,Q=null,de=0){let te=Math.pow(2,-de),re=Math.floor(E.image.width*te),We=Math.floor(E.image.height*te),Ye=Q!==null?Q.x:0,Xe=Q!==null?Q.y:0;me.setTexture2D(E,0),W.copyTexSubImage2D(W.TEXTURE_2D,de,0,0,Ye,Xe,re,We),_.unbindTexture()},this.copyTextureToTexture=function(E,Q,de=null,te=null,re=0,We=0){let Ye,Xe,ot,ct,Et,It,st,Ht,pn,mn=E.isCompressedTexture?E.mipmaps[We]:E.image;if(de!==null)Ye=de.max.x-de.min.x,Xe=de.max.y-de.min.y,ot=de.isBox3?de.max.z-de.min.z:1,ct=de.min.x,Et=de.min.y,It=de.isBox3?de.min.z:0;else{let on=Math.pow(2,-re);Ye=Math.floor(mn.width*on),Xe=Math.floor(mn.height*on),E.isDataArrayTexture?ot=mn.depth:E.isData3DTexture?ot=Math.floor(mn.depth*on):ot=1,ct=0,Et=0,It=0}te!==null?(st=te.x,Ht=te.y,pn=te.z):(st=0,Ht=0,pn=0);let Zt=ke.convert(Q.format),bn=ke.convert(Q.type),je;Q.isData3DTexture?(me.setTexture3D(Q,0),je=W.TEXTURE_3D):Q.isDataArrayTexture||Q.isCompressedArrayTexture?(me.setTexture2DArray(Q,0),je=W.TEXTURE_2D_ARRAY):(me.setTexture2D(Q,0),je=W.TEXTURE_2D),_.activeTexture(W.TEXTURE0),_.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,Q.flipY),_.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),_.pixelStorei(W.UNPACK_ALIGNMENT,Q.unpackAlignment);let Ln=_.getParameter(W.UNPACK_ROW_LENGTH),Nt=_.getParameter(W.UNPACK_IMAGE_HEIGHT),$n=_.getParameter(W.UNPACK_SKIP_PIXELS),_i=_.getParameter(W.UNPACK_SKIP_ROWS),Fi=_.getParameter(W.UNPACK_SKIP_IMAGES);_.pixelStorei(W.UNPACK_ROW_LENGTH,mn.width),_.pixelStorei(W.UNPACK_IMAGE_HEIGHT,mn.height),_.pixelStorei(W.UNPACK_SKIP_PIXELS,ct),_.pixelStorei(W.UNPACK_SKIP_ROWS,Et),_.pixelStorei(W.UNPACK_SKIP_IMAGES,It);let gn=E.isDataArrayTexture||E.isData3DTexture,zt=Q.isDataArrayTexture||Q.isData3DTexture;if(E.isDepthTexture){let on=ce.get(E),ai=ce.get(Q),qt=ce.get(on.__renderTarget),Oi=ce.get(ai.__renderTarget);_.bindFramebuffer(W.READ_FRAMEBUFFER,qt.__webglFramebuffer),_.bindFramebuffer(W.DRAW_FRAMEBUFFER,Oi.__webglFramebuffer);for(let Ms=0;Ms<ot;Ms++)gn&&(W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,ce.get(E).__webglTexture,re,It+Ms),W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,ce.get(Q).__webglTexture,We,pn+Ms)),W.blitFramebuffer(ct,Et,Ye,Xe,st,Ht,Ye,Xe,W.DEPTH_BUFFER_BIT,W.NEAREST);_.bindFramebuffer(W.READ_FRAMEBUFFER,null),_.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else if(re!==0||E.isRenderTargetTexture||ce.has(E)){let on=ce.get(E),ai=ce.get(Q);_.bindFramebuffer(W.READ_FRAMEBUFFER,ne),_.bindFramebuffer(W.DRAW_FRAMEBUFFER,ae);for(let qt=0;qt<ot;qt++)gn?W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,on.__webglTexture,re,It+qt):W.framebufferTexture2D(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,on.__webglTexture,re),zt?W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,ai.__webglTexture,We,pn+qt):W.framebufferTexture2D(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,ai.__webglTexture,We),re!==0?W.blitFramebuffer(ct,Et,Ye,Xe,st,Ht,Ye,Xe,W.COLOR_BUFFER_BIT,W.NEAREST):zt?W.copyTexSubImage3D(je,We,st,Ht,pn+qt,ct,Et,Ye,Xe):W.copyTexSubImage2D(je,We,st,Ht,ct,Et,Ye,Xe);_.bindFramebuffer(W.READ_FRAMEBUFFER,null),_.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else zt?E.isDataTexture||E.isData3DTexture?W.texSubImage3D(je,We,st,Ht,pn,Ye,Xe,ot,Zt,bn,mn.data):Q.isCompressedArrayTexture?W.compressedTexSubImage3D(je,We,st,Ht,pn,Ye,Xe,ot,Zt,mn.data):W.texSubImage3D(je,We,st,Ht,pn,Ye,Xe,ot,Zt,bn,mn):E.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,We,st,Ht,Ye,Xe,Zt,bn,mn.data):E.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,We,st,Ht,mn.width,mn.height,Zt,mn.data):W.texSubImage2D(W.TEXTURE_2D,We,st,Ht,Ye,Xe,Zt,bn,mn);_.pixelStorei(W.UNPACK_ROW_LENGTH,Ln),_.pixelStorei(W.UNPACK_IMAGE_HEIGHT,Nt),_.pixelStorei(W.UNPACK_SKIP_PIXELS,$n),_.pixelStorei(W.UNPACK_SKIP_ROWS,_i),_.pixelStorei(W.UNPACK_SKIP_IMAGES,Fi),We===0&&Q.generateMipmaps&&W.generateMipmap(je),_.unbindTexture()},this.initRenderTarget=function(E){ce.get(E).__webglFramebuffer===void 0&&me.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?me.setTextureCube(E,0):E.isData3DTexture?me.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?me.setTexture2DArray(E,0):me.setTexture2D(E,0),_.unbindTexture()},this.resetState=function(){ge=0,he=0,ve=null,_.reset(),$e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=kt._getDrawingBufferColorSpace(e),t.unpackColorSpace=kt._getUnpackColorSpace()}};var _p={type:"change"},Lu={type:"start"},vp={type:"end"},Rc=new ks,xp=new Kn,gy=Math.cos(70*Si.DEG2RAD),An=new Z,si=2*Math.PI,rn={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Iu=1e-6,Pc=class extends ea{constructor(e,t=null){super(e,t),this.state=rn.NONE,this.target=new Z,this.cursor=new Z,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:yi.ROTATE,MIDDLE:yi.DOLLY,RIGHT:yi.PAN},this.touches={ONE:Ws.ROTATE,TWO:Ws.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new Z,this._lastQuaternion=new ui,this._lastTargetPosition=new Z,this._quat=new ui().setFromUnitVectors(e.up,new Z(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Yi,this._sphericalDelta=new Yi,this._scale=1,this._panOffset=new Z,this._rotateStart=new yt,this._rotateEnd=new yt,this._rotateDelta=new yt,this._panStart=new yt,this._panEnd=new yt,this._panDelta=new yt,this._dollyStart=new yt,this._dollyEnd=new yt,this._dollyDelta=new yt,this._dollyDirection=new Z,this._mouse=new yt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=xy.bind(this),this._onPointerDown=_y.bind(this),this._onPointerUp=vy.bind(this),this._onContextMenu=Ty.bind(this),this._onMouseWheel=Sy.bind(this),this._onKeyDown=My.bind(this),this._onTouchStart=wy.bind(this),this._onTouchMove=Ey.bind(this),this._onMouseDown=yy.bind(this),this._onMouseMove=by.bind(this),this._interceptControlDown=Ay.bind(this),this._interceptControlUp=Cy.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(_p),this.update(),this.state=rn.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;An.copy(t).sub(this.target),An.applyQuaternion(this._quat),this._spherical.setFromVector3(An),this.autoRotate&&this.state===rn.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=si:n>Math.PI&&(n-=si),s<-Math.PI?s+=si:s>Math.PI&&(s-=si),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(An.setFromSpherical(this._spherical),An.applyQuaternion(this._quatInverse),t.copy(this.target).add(An),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let c=An.length();a=this._clampDistance(c*this._scale);let d=c-a;this.object.position.addScaledVector(this._dollyDirection,d),this.object.updateMatrixWorld(),r=!!d}else if(this.object.isOrthographicCamera){let c=new Z(this._mouse.x,this._mouse.y,0);c.unproject(this.object);let d=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=d!==this.object.zoom;let u=new Z(this._mouse.x,this._mouse.y,0);u.unproject(this.object),this.object.position.sub(u).add(c),this.object.updateMatrixWorld(),a=An.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Rc.origin.copy(this.object.position),Rc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Rc.direction))<gy?this.object.lookAt(this.target):(xp.setFromNormalAndCoplanarPoint(this.object.up,this.target),Rc.intersectPlane(xp,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Iu||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Iu||this._lastTargetPosition.distanceToSquared(this.target)>Iu?(this.dispatchEvent(_p),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?si/60*this.autoRotateSpeed*e:si/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){An.setFromMatrixColumn(t,0),An.multiplyScalar(-e),this._panOffset.add(An)}_panUp(e,t){this.screenSpacePanning===!0?An.setFromMatrixColumn(t,1):(An.setFromMatrixColumn(t,0),An.crossVectors(this.object.up,An)),An.multiplyScalar(e),this._panOffset.add(An)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;An.copy(s).sub(this.target);let r=An.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,c=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/c)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(si*this._rotateDelta.x/t.clientHeight),this._rotateUp(si*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(si*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-si*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(si*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-si*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(si*this._rotateDelta.x/t.clientHeight),this._rotateUp(si*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,c=(e.pageY+t.y)*.5;this._updateZoomParameters(a,c)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new yt,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function _y(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function xy(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function vy(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(vp),this.state=rn.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function yy(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case yi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=rn.DOLLY;break;case yi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=rn.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=rn.ROTATE}break;case yi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=rn.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=rn.PAN}break;default:this.state=rn.NONE}this.state!==rn.NONE&&this.dispatchEvent(Lu)}function by(i){switch(this.state){case rn.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case rn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case rn.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Sy(i){this.enabled===!1||this.enableZoom===!1||this.state!==rn.NONE||(i.preventDefault(),this.dispatchEvent(Lu),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(vp))}function My(i){this.enabled!==!1&&this._handleKeyDown(i)}function wy(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ws.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=rn.TOUCH_ROTATE;break;case Ws.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=rn.TOUCH_PAN;break;default:this.state=rn.NONE}break;case 2:switch(this.touches.TWO){case Ws.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=rn.TOUCH_DOLLY_PAN;break;case Ws.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=rn.TOUCH_DOLLY_ROTATE;break;default:this.state=rn.NONE}break;default:this.state=rn.NONE}this.state!==rn.NONE&&this.dispatchEvent(Lu)}function Ey(i){switch(this._trackPointer(i),this.state){case rn.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case rn.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case rn.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case rn.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=rn.NONE}}function Ty(i){this.enabled!==!1&&i.preventDefault()}function Ay(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Cy(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var yp=new Fn,Ic=new Z,Ks=class extends Jo{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new wn(e,3)),this.setAttribute("uv",new wn(t,2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new qi(t,6,1);return this.setAttribute("instanceStart",new ii(n,3,0)),this.setAttribute("instanceEnd",new ii(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new qi(t,6,1);return this.setAttribute("instanceColorStart",new ii(n,3,0)),this.setAttribute("instanceColorEnd",new ii(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new Yo(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fn);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),yp.setFromBufferAttribute(t),this.boundingBox.union(yp))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ii),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Ic.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ic)),Ic.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ic));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}};Ve.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new yt},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};ei.line={uniforms:ha.merge([Ve.common,Ve.fog,Ve.line]),vertexShader:`
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
		`};var ji=class extends jn{constructor(e){super({type:"LineMaterial",uniforms:ha.clone(ei.line.uniforms),vertexShader:ei.line.vertexShader,fragmentShader:ei.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};var Du=new tn,bp=new Z,Sp=new Z,Bn=new tn,kn=new tn,Qi=new tn,Uu=new Z,Nu=new dn,zn=new Qo,Mp=new Z,Lc=new Fn,Dc=new Ii,es=new tn,ts,gr;function wp(i,e,t){return es.set(0,0,-e,1).applyMatrix4(i.projectionMatrix),es.multiplyScalar(1/es.w),es.x=gr/t.width,es.y=gr/t.height,es.applyMatrix4(i.projectionMatrixInverse),es.multiplyScalar(1/es.w),Math.abs(Math.max(es.x,es.y))}function Ry(i,e){let t=i.matrixWorld,n=i.geometry,s=n.attributes.instanceStart,r=n.attributes.instanceEnd,a=Math.min(n.instanceCount,s.count);for(let c=0,d=a;c<d;c++){zn.start.fromBufferAttribute(s,c),zn.end.fromBufferAttribute(r,c),zn.applyMatrix4(t);let u=new Z,m=new Z;ts.distanceSqToSegment(zn.start,zn.end,m,u),m.distanceTo(u)<gr*.5&&e.push({point:m,pointOnLine:u,distance:ts.origin.distanceTo(m),object:i,face:null,faceIndex:c,uv:null,uv1:null})}}function Py(i,e,t){let n=e.projectionMatrix,r=i.material.resolution,a=i.matrixWorld,c=i.geometry,d=c.attributes.instanceStart,u=c.attributes.instanceEnd,m=Math.min(c.instanceCount,d.count),g=-e.near;ts.at(1,Qi),Qi.w=1,Qi.applyMatrix4(e.matrixWorldInverse),Qi.applyMatrix4(n),Qi.multiplyScalar(1/Qi.w),Qi.x*=r.x/2,Qi.y*=r.y/2,Qi.z=0,Uu.copy(Qi),Nu.multiplyMatrices(e.matrixWorldInverse,a);for(let p=0,b=m;p<b;p++){if(Bn.fromBufferAttribute(d,p),kn.fromBufferAttribute(u,p),Bn.w=1,kn.w=1,Bn.applyMatrix4(Nu),kn.applyMatrix4(Nu),Bn.z>g&&kn.z>g)continue;if(Bn.z>g){let H=Bn.z-kn.z,I=(Bn.z-g)/H;Bn.lerp(kn,I)}else if(kn.z>g){let H=kn.z-Bn.z,I=(kn.z-g)/H;kn.lerp(Bn,I)}Bn.applyMatrix4(n),kn.applyMatrix4(n),Bn.multiplyScalar(1/Bn.w),kn.multiplyScalar(1/kn.w),Bn.x*=r.x/2,Bn.y*=r.y/2,kn.x*=r.x/2,kn.y*=r.y/2,zn.start.copy(Bn),zn.start.z=0,zn.end.copy(kn),zn.end.z=0;let A=zn.closestPointToPointParameter(Uu,!0);zn.at(A,Mp);let v=Si.lerp(Bn.z,kn.z,A),x=v>=-1&&v<=1,F=Uu.distanceTo(Mp)<gr*.5;if(x&&F){zn.start.fromBufferAttribute(d,p),zn.end.fromBufferAttribute(u,p),zn.start.applyMatrix4(a),zn.end.applyMatrix4(a);let H=new Z,I=new Z;ts.distanceSqToSegment(zn.start,zn.end,I,H),t.push({point:I,pointOnLine:H,distance:ts.origin.distanceTo(I),object:i,face:null,faceIndex:p,uv:null,uv1:null})}}}var lo=class extends yn{constructor(e=new Ks,t=new ji({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,s=new Float32Array(2*t.count);for(let a=0,c=0,d=t.count;a<d;a++,c+=2)bp.fromBufferAttribute(t,a),Sp.fromBufferAttribute(n,a),s[c]=c===0?0:s[c-1],s[c+1]=s[c]+bp.distanceTo(Sp);let r=new qi(s,2,1);return e.setAttribute("instanceDistanceStart",new ii(r,1,0)),e.setAttribute("instanceDistanceEnd",new ii(r,1,1)),this}raycast(e,t){let n=this.material.worldUnits,s=e.camera;if(s===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;ts=e.ray;let a=this.matrixWorld,c=this.geometry,d=this.material;gr=d.linewidth+r,c.boundingSphere===null&&c.computeBoundingSphere(),Dc.copy(c.boundingSphere).applyMatrix4(a);let u;if(n)u=gr*.5;else{let g=Math.max(s.near,Dc.distanceToPoint(ts.origin));u=wp(s,g,d.resolution)}if(Dc.radius+=u,ts.intersectsSphere(Dc)===!1)return;c.boundingBox===null&&c.computeBoundingBox(),Lc.copy(c.boundingBox).applyMatrix4(a);let m;if(n)m=gr*.5;else{let g=Math.max(s.near,Lc.distanceToPoint(ts.origin));m=wp(s,g,d.resolution)}Lc.expandByScalar(m),ts.intersectsBox(Lc)!==!1&&(n?Ry(this,t):Py(this,s,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Du),this.material.uniforms.resolution.value.set(Du.z,Du.w))}};var _r=class extends Ks{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let s=0;s<t;s+=3)n[2*s]=e[s],n[2*s+1]=e[s+1],n[2*s+2]=e[s+2],n[2*s+3]=e[s+3],n[2*s+4]=e[s+4],n[2*s+5]=e[s+5];return super.setPositions(n),this}setColors(e){let t=e.length-3,n=new Float32Array(2*t);for(let s=0;s<t;s+=3)n[2*s]=e[s],n[2*s+1]=e[s+1],n[2*s+2]=e[s+2],n[2*s+3]=e[s+3],n[2*s+4]=e[s+4],n[2*s+5]=e[s+5];return super.setColors(n),this}setFromPoints(e){let t=e.length-1,n=new Float32Array(6*t);for(let s=0;s<t;s++)n[6*s]=e[s].x,n[6*s+1]=e[s].y,n[6*s+2]=e[s].z||0,n[6*s+3]=e[s+1].x,n[6*s+4]=e[s+1].y,n[6*s+5]=e[s+1].z||0;return super.setPositions(n),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}};var pa=class extends lo{constructor(e=new _r,t=new ji({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}};function co(i){let e=[[i[0],i[1],i[2]]];for(let t=3;t+9<i.length+0;t+=10){let n=i[t],s=e[e.length-1],r=[i[t+1],i[t+2],i[t+3]],a=[i[t+4],i[t+5],i[t+6]],c=[i[t+7],i[t+8],i[t+9]];for(let d=1;d<=n;d++){let u=d/n,m=1-u,g=m*m*m,p=3*m*m*u,b=3*m*u*u,M=u*u*u;e.push([0,1,2].map(A=>g*s[A]+p*r[A]+b*a[A]+M*c[A]))}}return e}function Uc(i){return[...i.rows,...i.more?[i.more]:[],...i.tail?[i.tail]:[],...i.ghosts]}function Ep(i){let e=i.routes,t=new Map(i.plates.map(s=>[s.unit,s]));function n(s,r){let a=t.get(s),d=t.get(r).x>a.x,u=a.ports[d?"right":"left"];return{x:u?u.x:d?a.x+a.w:a.x,z:a.z,side:d?"right":"left"}}return{bandTop:s=>e.plates[s].band_top,skyBase:s=>e.plates[s].sky_base,sidePort:n,link:s=>co(e.links[s]),ribbon:s=>co(e.ribbons[s]),has:(s,r,a)=>!!e.calls[s][r]?.[a],raw:(s,r,a)=>e.calls[s][r]?.[a]??null,call:(s,r,a)=>{let c=e.calls[s][r]?.[a];return c?co(c):null},variants:(s,r)=>Object.keys(e.calls[s][r]??{})}}var ht=i=>parseInt(i.slice(1),16),Iy={name:"dark",css:{canvas:"#010409",fill:"#0d1117",raised:"#151b23",raised2:"#212830",rule:"#262c36",edge:"#3d444d",border:"#656c76",link:"#9198a1",strong:"#b7bdc8",dim:"#9198a1",muted:"#b7bdc8",textSoft:"#d1d7e0",text:"#f0f6fc",emphasis:"#ffffff",lb:"#1e60d5",clone:"#a66bff",dead:"#c88508",cycle:"#cc1421",cloneFill:"#a66bff",cloneFillA:.3,deadFill:"#c88508",deadFillA:.3,panel:"rgba(1, 4, 9, 0.9)"}},Ly={name:"light",css:{canvas:"#ffffff",fill:"#f6f8fa",raised:"#eff2f5",raised2:"#e6eaef",rule:"#d1d9e0",edge:"#c8d1da",border:"#818b98",link:"#59636e",strong:"#454c54",dim:"#59636e",muted:"#454c54",textSoft:"#393f46",text:"#25292e",emphasis:"#010409",lb:"#0349b4",clone:"#844ae7",dead:"#956400",cycle:"#a0111f",cloneFill:"#e0c5ff",cloneFillA:1,deadFill:"#f0ce53",deadFillA:1,panel:"rgba(255, 255, 255, 0.92)"}};function Tp(i){let e=i.css,t=i.name==="dark",n={bg:ht(e.canvas),ground:ht(e.canvas),plate:ht(e.fill),plateLine:ht(e.rule),card:ht(t?e.fill:e.canvas),cardLine:ht(e.border),ghost:ht(e.border),lb:ht(e.lb),clone:ht(e.clone),dead:ht(e.dead),red:ht(e.cycle),cloneFill:ht(e.cloneFill),deadFill:ht(e.deadFill),cloneFillA:e.cloneFillA,deadFillA:e.deadFillA,lit:ht(e.emphasis),hover:ht(e.emphasis),same:ht(e.border),cross:ht(e.link),pkg:ht(e.link),klass:ht(e.border),intra:ht(e.border),imp:ht(e.edge),impLit:ht(e.emphasis),ribPkg:ht(e.link),boxFront:ht(t?e.raised:e.canvas),boxSide:ht(t?e.fill:e.raised2),boxTop:ht(t?e.raised2:e.fill),boxHead:ht(t?e.raised2:e.raised),boxLine:ht(e.border),modFront:ht(t?e.raised:e.fill),modHead:ht(t?e.raised2:e.raised),modLine:ht(e.border),rowLine:ht(e.rule),classRow:ht(t?e.raised2:e.raised),write:ht(e.strong),read:ht(e.border),port:ht(e.strong),column:ht(t?e.raised:e.raised2),paneLine:ht(t?"#2f3742":e.edge),fieldSep:ht(e.edge)},s={strong:ht(e.strong),link:ht(e.link),edge:ht(e.edge),rule:ht(e.rule)},r={text:e.text,muted:e.muted,dim:e.dim,soft:e.textSoft,lit:e.emphasis,ghost:e.text},a=t?{1:ht("#262c36"),2:ht(e.raised2),3:ht(e.raised)}:{1:ht("#dae0e7"),2:ht("#e0e6eb"),3:ht(e.raised2)},c=m=>[1,3,5].map(g=>parseInt(m.slice(g,g+2),16)),d=(m,g)=>`rgba(${c(m).join(",")},${g})`,u={halo:d(e.canvas,.92),backdrop:d(e.canvas,.88),pill:d(e.canvas,.94),pillLine:d(e.emphasis,.35),pillLineStrong:d(e.emphasis,.6),tooltip:t?d(e.raised,.96):d(e.canvas,.97),tooltipLine:e.edge,hatch:t?d(e.link,.55):d(e.link,.5),hatchKey:t?d(e.link,.75):d(e.link,.7),pulseAdditive:t};return{name:i.name,css:e,C:n,TIER:s,T:r,HEAD:a,K:u}}var Fu={dark:Tp(Iy),light:Tp(Ly)},Nc="atlas.theme";function Ap(){let i=new URLSearchParams(location.search).get("theme");if(i==="dark"||i==="light")return i;try{let e=localStorage.getItem(Nc);if(e==="dark"||e==="light")return e}catch{}return matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}var Dy=new Set("and as assert async await break case class continue def del elif else except finally for from global if import in is lambda match nonlocal not or pass raise return try while with yield".split(" ")),Uy=new Set(["False","None","True","Ellipsis","NotImplemented"]),Ny=new Set("abs all any bool bytes callable chr classmethod dict dir enumerate filter float frozenset getattr hasattr hash help hex id int isinstance issubclass iter len list map max memoryview min next object oct open ord pow print property range repr reversed round set setattr slice sorted staticmethod str sum super tuple type vars zip".split(" "));function Cp(i,e,t){for(let n=t;n<=i.length-e.length;n++){if(i.slice(n,n+e.length)!==e)continue;let s=0;for(let r=n-1;r>=0&&i[r]==="\\";r--)s++;if(s%2===0)return n}return-1}function Fy(i,e){let t=[],n=0,s=!1,r=!1;for(;n<i.length;){if(e.triple){let c=Cp(i,e.triple,n);if(c<0)return t.push(["str",n,i.length]),t;t.push(["str",n,c+e.triple.length]),n=c+e.triple.length,e.triple=null;continue}let a=i[n];if(a==="#")return t.push(["com",n,i.length]),t;if(a==="@"){t.push(["dec",n,n+1]),r=!0,n++;continue}if(a==="'"||a==='"'){let c=t[t.length-1],d=i.slice(n,n+3),u=d==="'''"||d==='"""'?d:a,m=Cp(i,u,n+u.length),g=n;if(c&&c[0]==="name"&&c[2]===n&&/^[rRbBfFuU]{1,2}$/.test(i.slice(c[1],c[2]))&&(g=c[1],t.pop()),m<0)return u.length===3&&(e.triple=u),t.push(["str",g,i.length]),t;t.push(["str",g,m+u.length]),n=m+u.length;continue}if(/[A-Za-z_]/.test(a)){let c=n+1;for(;c<i.length&&/[A-Za-z0-9_]/.test(i[c]);)c++;let d=i.slice(n,c),u="name";s?(u="def",s=!1):r?(u="dec",r=!1):Dy.has(d)?(u="kw",s=d==="def"||d==="class"):Uy.has(d)?u="con":Ny.has(d)?u="bi":i.slice(c).trimStart()[0]==="("&&(u="call"),t.push([u,n,c]),n=c;continue}if(/[0-9]/.test(a)){let c=i.slice(n).match(/^(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|[0-9][0-9_]*(?:\.[0-9_]*)?(?:[eE][+-]?[0-9_]+)?j?)/),d=c?c[0].length:1;t.push(["num",n,n+d]),n+=d;continue}if(/[+\-*/%=&|^~<>!:]/.test(a)){let c=n+1;for(;c<i.length&&/[+\-*/%=&|^~<>!:]/.test(i[c]);)c++;t.push(["op",n,c]),n=c;continue}n++}return t}var mt=i=>String(i).replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]),Oy={external:"external: outside the package, not drawn",unresolved:"unresolved: no static target, not drawn",recursive:"recursive: calls itself, not drawn",undrawn:"undrawn: the callee is not in the picture"};function Rp(i,e){let t=i.text.split(`
`),n=new Map;i.sites.forEach((a,c)=>{a[1]<0||(n.has(a[0])||n.set(a[0],[]),n.get(a[0]).push(c))});let s={triple:null},r=[];return t.forEach((a,c)=>{let d=i.start+c,u=Fy(a,s),m=(n.get(d)??[]).map(F=>[F,i.sites[F]]).sort((F,H)=>F[1][1]-H[1][1]),g=new Set([0,a.length]);for(let[,F,H]of u)g.add(F),g.add(H);for(let[,F]of m)g.add(F[1]),g.add(Math.min(a.length,F[2]));let p=[...g].sort((F,H)=>F-H),b=F=>{for(let[H,I,z]of u)if(F>=I&&F<z)return H;return null},M="",A=null,v=[];for(let F=0;F<p.length-1;F++){let H=p[F],I=p[F+1];if(H===I)continue;let z=m.find(([,w])=>w[1]===H);if(z&&!A){let[w,N]=z;A=N,N[3]==="edge"?(v.push(w),M+=`<span class="site e" data-si="${w}" title="${mt(e(N))}">`):M+=`<span class="site x" data-si="${w}" title="${mt(Oy[N[3]]+" \xB7 "+N[5])}">`}let O=b(H),G=mt(a.slice(H,I));M+=O&&O!=="name"?`<span class="tk-${O}">${G}</span>`:G,A&&I>=Math.min(a.length,A[2])&&(M+=A[3]==="edge"?'<i class="ul"></i></span>':'<i class="mk"></i></span>',A=null)}A&&(M+=A[3]==="edge"?'<i class="ul"></i></span>':'<i class="mk"></i></span>');let x=a.length-a.trimStart().length+4;r.push(`<div class="cl${v.length?" ce":""}" data-l="${d}"${v.length?` data-sites="${v.join(",")}"`:""}><span class="n">${d}</span><code data-indent="${x}">${M||" "}</code></div>`)}),r.join("")}function By(){let i=!1,e=Ap(),t={},n={},s={},r={},a={L:12,M:10,S:9},c,d;function u(o){let l=Fu[o];e=o,Object.assign(t,l.C),Object.assign(n,l.TIER),Object.assign(s,l.T),Object.assign(r,l.K),c={1:{edge:[n.strong,1.4],head:l.HEAD[1],rule:n.edge,hatch:.75,column:.4,foot:n.edge},2:{edge:[n.link,1.2],head:l.HEAD[2],rule:n.rule,hatch:.55,column:.3,foot:n.rule},3:{edge:[n.edge,1],head:l.HEAD[3],rule:n.rule,hatch:.35,column:.18,foot:n.rule}},d={overview:{plate:[n.link,1.2],pkg:s.text,box:3,link:n.link,call:n.link,ribbon:n.link,imp:n.edge,card:[n.link,1],block:[n.link,1.2]},plan:{plate:[n.link,1.2],pkg:s.text,box:3,link:n.edge,call:n.edge,ribbon:n.rule,imp:n.link,card:[n.edge,1],block:[n.edge,1]},package:{plate:[n.edge,1],pkg:s.muted,box:1,link:n.link,call:n.link,ribbon:n.edge,imp:n.edge,card:[n.link,1],block:[n.link,1.2]},module:{plate:[n.rule,1],pkg:s.dim,box:3,link:n.edge,call:n.link,ribbon:n.edge,imp:n.edge,card:[n.strong,1],block:[n.strong,1.2]}}}u(e);let m=o=>o.exported,g=(o,l,h)=>new Ct(o).lerp(new Ct(l),h).getHex(),p=o=>"#"+o.toString(16).padStart(6,"0"),b=matchMedia("(prefers-reduced-motion: reduce)").matches,M='"JetBrains Mono","SF Mono","SFMono-Regular",Menlo,Consolas,monospace',A=324,v=52,x=0,F=64,H="strata.inspector.width",I=300,z=820,O=420,G=(()=>{let o=+localStorage.getItem(H);return o?Math.max(I,Math.min(z,o)):O})(),w=document.querySelector("#frame"),N=()=>w.clientWidth,j=()=>w.clientHeight,Y=Math.min(devicePixelRatio,2),X=o=>document.querySelector(o),xe=()=>X("#inspector").classList.contains("hidden")?0:G+18,ne=(o=0,l=0,h=0)=>new Z(o,l,h),ae=(o,l,h)=>o+(l-o)*h,ge=o=>1-Math.pow(1-o,4.5),he=(o,l,h)=>Math.max(l,Math.min(h,o)),ve=o=>o<.5?4*o*o*o:1-Math.pow(-2*o+2,3)/2,Te=o=>new Ct(o),{view:se,source:Ze}=JSON.parse(X("#atlasView").textContent);if(X("#pkg").textContent=se.package,!se.panes.length){X("#status").textContent="No non-test functions or classes to display.";for(let o of["guide","legend","rail","modes","views"])X("#"+o).classList.add("hidden");return}let et=Ze.symbols,De=se.dims,at=new Map;se.nodes.forEach((o,l)=>{o.i=l,at.set(o.id,o)});let qe=new Map(se.classes.map(o=>[o.id,o])),ie=new Map(se.panes.map(o=>[o.module,o])),Ne=new Map(se.plates.map(o=>[o.unit,o])),Ie=new Map(se.districts.map(o=>[o.package,o])),tt=se.floors;X("#pkg").textContent=se.package;let lt=Ep(se),dt=new Map;se.links.forEach((o,l)=>o.members.forEach((h,f)=>dt.set(h,l)));let _n=new Map;se.links.forEach(o=>o.members.forEach((l,h)=>_n.set(l,{j:h,m:o.members.length})));let Rt=new Map;for(let o of se.panes)for(let l of Uc(o.box))Rt.set(`${o.module}|${l.slot}`,l);let Yt=se.guide,wt=Yt.steps,Ft=new Map(wt.map((o,l)=>[o.id,l])),xn=new Set,P={scope:null,selected:null,hover:null,hoverBox:null,hoverLine:null,open:new Set,expanded:new Set,view:"axo",mouse:[0,0],guide:null,resume:0,pulse:!1,proj:"ortho",inspect:null,inspectBack:[],hoverCall:null},ln=()=>P.guide===null?null:wt[P.guide];function fn(){let o=ln();return o&&o.lod==="plate"?"overview":P.scope?P.scope.kind==="module"?"module":"package":o?"package":P.view==="plan"?"plan":"overview"}let Vt=X("#gl"),cn=new Tc({canvas:Vt,antialias:!0,alpha:!0,preserveDrawingBuffer:!0});cn.setPixelRatio(Y),cn.setClearColor(0,0);let W=new Vo;W.fog=new zo(t.bg,60,200);let hn=new Wn(24,1,.5,3e3),Ut=new dr(-640,640,400,-400,.5,3e3),D=120,_=hn,K=new Pc(_,Vt);K.enableDamping=!0,K.dampingFactor=.12,K.screenSpacePanning=!0,K.mouseButtons={LEFT:yi.ROTATE,MIDDLE:yi.DOLLY,RIGHT:yi.PAN},K.maxPolarAngle=Math.PI*.62;let ce=new Kn(new Z(0,0,-1),0),me=new Kn(new Z(0,0,1),0),Re=null,Oe=X("#labels"),V=Oe.getContext("2d"),ue=N(),Se=j(),Ge=!0;Sn();let Be=[];function Le(o,l={}){let h=new _r;h.setPositions(o),h.setColors(new Float32Array(o.length).fill(1));let f=new ji({color:16777215,linewidth:l.width??1,vertexColors:!0,transparent:!0,opacity:l.opacity??1,dashed:!!l.dashed,dashSize:l.dash??.12,gapSize:l.gap??.1,depthWrite:!1,fog:!0});f.resolution.set(ue,Se),Be.push(f);let S=new pa(h,f);return l.dashed&&S.computeLineDistances(),S.renderOrder=l.order??3,S}function ft(o,l){o.userData.paintKey=null,o.geometry.setPositions(l),o.material.dashed&&o.computeLineDistances()}function Qe(o,l,h,f){let S=`${l}|${h??l}|${f}`;if(o.userData.paintKey===S)return;o.userData.paintKey=S;let y=Te(l),T=Te(h??l),R=new Float32Array(f*3),L=new Ct;for(let U=0;U<f;U++)L.copy(y).lerp(T,f>1?U/(f-1):0),R[U*3]=L.r,R[U*3+1]=L.g,R[U*3+2]=L.b;o.geometry.setColors(R)}function bt(o,l={}){let h=new Ks;h.setPositions(o);let f=new ji({color:l.color??16777215,linewidth:l.width??1,transparent:!0,opacity:l.opacity??1,dashed:!!l.dashed,dashSize:l.dash??.1,gapSize:l.gap??.08,depthWrite:!1,fog:!0});f.resolution.set(ue,Se),Be.push(f);let S=new lo(h,f);return l.dashed&&S.computeLineDistances(),S.renderOrder=l.order??3,S}function $(o,l,h,f,S){return[o,l,S,o+h,l,S,o+h,l-f,S,o,l-f,S,o,l,S]}function Fe(o,l,h,f,S=24){let y=[];for(let T=0;T<=S;T++){let R=T/S,L=1-R,U=L*L*L,J=3*L*L*R,k=3*L*R*R,oe=R*R*R;y.push(U*o.x+J*l.x+k*h.x+oe*f.x,U*o.y+J*l.y+k*h.y+oe*f.y,U*o.z+J*l.z+k*h.z+oe*f.z)}return y}function pe(o,l=1,h={}){return new ur({color:o,transparent:!0,opacity:l,...h})}let ke=[],$e=[];function ye(o,l=1,h={}){let f=pe(t[o],l,h);return ke.push([f,o]),f}function nt(o,l,h){return Qe(o,t[l],null,h),$e.push([o,l,h]),o}let it=new zs(1,1);function Pt(o,l,h,f,S,y,T=2){let R=new yn(it,y);return R.scale.set(h,f,1),R.position.set(o+h/2,l-f/2,S),R.renderOrder=T,R}let jt=[];function ri(o,l){let h=o.getContext("2d");h.clearRect(0,0,32,32),h.strokeStyle=l==="dead"?p(t.dead):r.hatch,h.lineWidth=l==="dead"?3:2;for(let f=-32;f<64;f+=8)h.beginPath(),l==="dead"?(h.moveTo(f,0),h.lineTo(f+32,32)):(h.moveTo(f,32),h.lineTo(f+32,0)),h.stroke()}function oi(o=4,l=1,h="tail"){let f=document.createElement("canvas");f.width=f.height=32,ri(f,h);let S=new Qr(f);return S.wrapS=S.wrapT=$r,S.colorSpace=Zn,S.repeat.set(o,l),jt.push({c:f,t:S,kind:h}),S}let ma=oi(),ho=new Map;function ga(o,l,h="tail"){let f=`${o.toFixed(2)}|${l.toFixed(2)}|${h}`,S=h==="dead"?.5:.3;return ho.has(f)||ho.set(f,oi(o/S,l/S,h)),ho.get(f)}let Js=(o,l,h,f=1)=>pe(16777215,f,{map:ga(o,l,h),depthWrite:!1}),_a=Math.min(...se.plates.map(o=>o.x))-4,uo=Math.max(...se.plates.map(o=>o.x+o.w))+4,fo=Math.min(...se.plates.map(o=>o.z))-5,Ni=Math.max(...se.plates.map(o=>o.z))+6,Ss=new yn(new zs(uo-_a,Ni-fo),ye("ground",.82,{depthWrite:!1}));Ss.rotation.x=-Math.PI/2,Ss.position.set((_a+uo)/2,tt.ground-.01,(fo+Ni)/2),Ss.renderOrder=0,W.add(Ss);let ns=new Map;for(let o of se.plates){let l=o.z-De.plate_back,h=o.z+De.plate_front,f=new yn(it,ye("plate",.92,{depthWrite:!1}));f.scale.set(o.w,h-l,1),f.rotation.x=-Math.PI/2,f.position.set(o.x+o.w/2,tt.ground+.004,(l+h)/2),f.renderOrder=0;let S=tt.ground+.008,y=Le([o.x,S,l,o.x+o.w,S,l,o.x+o.w,S,h,o.x,S,h,o.x,S,l],{width:1,order:1});Qe(y,t.plateLine,null,5),W.add(f,y),ns.set(o.unit,{d:o,plate:f,outline:y,a:1,ta:1})}let po=new $i(1,1,1),xr=Array.from(new eo(po).attributes.position.array),nn=new Map,js=220;for(let o of se.panes){let l=o.box,h=new Ri;h.position.set(l.x,0,o.z);let f=Ae=>ye(Ae,1,{polygonOffset:!0,polygonOffsetFactor:2,polygonOffsetUnits:4}),S=[f("boxSide"),f("boxSide"),f("boxTop"),f("boxSide"),f("modFront"),f("boxSide")],y=new yn(po,S);y.userData={type:"module",id:o.module},y.renderOrder=2;let T=bt(xr,{color:t.modLine,width:1.2,order:2}),R=new Ri;R.add(y,T),h.add(R);let L=l.d+.004,U=l.w,J=Pt(0,0,U,De.mod_header,L,pe(t.modHead,1,{polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:2}),2);h.add(J);let k=[],oe=[],Ee=[],we=new Map,pt={cloneFill:2.01,deadFill:2.01,hatch:2.02,deadHatch:2.02,ghost:2.04,tick:2.05},Ue=(Ae,q,ee=1,_e=null)=>(q.userData.k=ee,q.userData.role=_e,pt[_e]&&(q.renderOrder=pt[_e]),Ae.push(q),h.add(q),q),ut=(Ae,q,ee,_e=.1,fe=!1)=>{Ae.clone&&fe&&Ue(oe,Pt(.03,q-.015,U-.06,ee-.03,L+.0012,ye("cloneFill",1,{depthWrite:!1}),2),t.cloneFillA,"cloneFill"),Ae.lb&&Ue(oe,Pt(.04,q-.05,.12,Math.max(.08,ee-.1),L+.002,ye("lb"),2)),Ae.clone&&Ue(oe,nt(Le([_e+.06,q-ee+.05,L+.003,U-.1,q-ee+.05,L+.003],{width:2.4,dashed:!0,dash:.03,gap:.045,order:2}),"clone",2))};for(let Ae of l.rows){let q=-Ae.y,ee=Le([.06,q,L+.001,U-.06,q,L+.001],{width:1,order:2});if(Qe(ee,t.rowLine,null,2),Ue(k,ee,1,"rule"),Ae.kind==="class"){Ue(k,Pt(.12,q-.05,U-.22,Ae.h-.1,L+.001,ye("classRow"),2));let _e=Le($(.12,q-.05,U-.22,Ae.h-.1,L+.0015),{width:1,order:2});Qe(_e,t.boxLine,null,5),Ue(k,_e,1,"classEdge")}ut(Ae,q,Ae.h,.1,!0)}if(l.more){let Ae=Math.min(l.more.lines,5),q=[];for(let ee=0;ee<Ae;ee++){let _e=-l.more.y-(ee+.5)*(l.more.h/Ae);q.push(.1,_e,L+.002,U-.1,_e,L+.002)}Ue(oe,bt(q,{color:t.modLine,width:1,order:2}),.9,"more"),ut(l.more,-l.more.y,l.more.h)}if(l.tail){let Ae=l.tail;Ue(oe,Pt(.03,-Ae.y-.03,U-.06,Ae.h-.06,L+.001,Js(U-.06,Ae.h-.06,"tail",.85),2),1,"hatch"),ut(Ae,-Ae.y,Ae.h)}for(let Ae of l.ghosts){let ee=-Ae.y-.03,_e=U-.12,fe=Ae.h-.06;if(Ue(oe,Pt(.06,ee,_e,fe,L+.0012,ye("deadFill",1,{depthWrite:!1}),2),t.deadFillA,"deadFill"),Ue(oe,Pt(.06,ee,_e,fe,L+.0016,Js(_e,fe,"dead"),2),.9,"deadHatch"),Ue(oe,nt(Le($(.06,ee,_e,fe,L+.002),{width:1.6,dashed:!0,dash:.08,gap:.06,order:2}),"dead",5),1,"ghost"),Ae.id===null){let He=Math.min(Ae.lines,4),Ke=[];for(let Je=0;Je<He;Je++){let Wt=-Ae.y-.04-(Je+.5)*((Ae.h-.08)/He);Ke.push(.14,Wt,L+.002,U-.14,Wt,L+.002)}Ue(oe,bt(Ke,{color:t.dead,width:1,dashed:!0,dash:.05,gap:.05,order:2}),1,"deadLines")}}let gt=[];l.ghosts.length&&gt.push("dead"),(l.rows.some(Ae=>Ae.clone)||l.tail?.clone||l.more?.clone)&&gt.push("clone"),gt.forEach((Ae,q)=>{Ue(oe,Pt(U-.1-.3-q*(.3+.08),-.16,.3,.3,L+.003,ye(Ae),2),1,"tick")});for(let Ae of Uc(l)){let q=nt(Le($(.03,-Ae.y-.015,U-.06,Ae.h-.03,L+.004),{width:1.4,order:2.5}),"lit",5);q.visible=!1,h.add(q),we.set(Ae.slot,q)}if(l.dead_top!==null){let Ae=Le([.1,l.dead_top,L+.002,U-.1,l.dead_top,L+.002],{width:1,dashed:!0,dash:.08,gap:.08,order:2});nt(Ae,"ghost",2),Ue(Ee,Ae)}W.add(h);let ze=Pt(l.x,-l.h,l.w,l.h+tt.ground,o.z+l.d*.5,ye("column",.45,{side:mi,depthWrite:!1}),1),St=Le($(l.x,tt.ground+.012,l.w,0,o.z).slice(0,6).concat([l.x+l.w,tt.ground+.012,o.z+l.d,l.x,tt.ground+.012,o.z+l.d,l.x,tt.ground+.012,o.z]),{width:1,order:1});Qe(St,t.paneLine,null,5),W.add(ze,St);let xt={p:o,b:l,g:h,bodyG:R,body:y,mats:S,edges:T,head:J,rowsG:k,sig:oe,openG:Ee,lit:we,column:ze,foot:St,a:1,ta:1,rowsA:0,rowsTa:0,zoomRows:!1,u:0,uTarget:0,h:l.h,tier:null,ts:c[3]};yr(xt,l.h),nn.set(o.module,xt),vr(xt,3)}function vr(o,l){if(o.tier===l)return;o.tier=l;let h=o.ts=c[l];o.edges.material.color.set(h.edge[0]),o.edges.material.linewidth=h.edge[1],o.head.material.color.set(h.head),o.foot.userData.paintKey=null,Qe(o.foot,h.foot,null,5);for(let f of[...o.rowsG,...o.sig]){let S=f.userData.role;S==="rule"?Qe(f,h.rule,null,2):S==="classEdge"?Qe(f,h.rule,null,5):S==="more"&&f.material.color.set(l===1?n.link:n.edge)}}function yr(o,l){if(o.h=l,o.bodyG.scale.set(o.b.w,l,o.b.d),o.bodyG.position.set(o.b.w/2,-l/2,o.b.d/2),o.column){let h=-l,f=tt.ground;o.column.visible=h>f+.01,o.column.scale.y=Math.max(.001,h-f),o.column.position.y=(h+f)/2}}let Fc=o=>ve(nn.get(o).u);function br(o){let l=o.a,h=ve(o.u),f=o.sil?0:1;o.mats.forEach(S=>{S.opacity=l*f,S.depthWrite=!o.sil}),o.body.visible=!o.sil,o.edges.material.opacity=l,o.head.material.opacity=l*f;for(let S of o.rowsG)S.material.opacity=f*l*o.rowsA*(1-h)*S.userData.k,S.visible=S.material.opacity>.003;for(let S of o.sig)S.material.opacity=f*l*(1-h)*S.userData.k*(S.userData.role==="hatch"?o.ts.hatch:1),S.visible=S.material.opacity>.003;for(let S of o.openG)S.material.opacity=f*l*h,S.visible=S.material.opacity>.003;for(let S of o.lit.values())S.material.opacity=f*Math.min(1,l*1.4)*(1-h);o.column.material.opacity=f*o.ts.column*l,o.foot.material.opacity=l}let is=new Map;function Oc(o){return o.dead?{key:"dead",width:1.6,dashed:!0,dash:.06,gap:.05}:o.clone!==null?{key:"clone",width:2,dashed:!0,dash:.02,gap:.045}:o.lb?{key:"lb",width:1.6}:{key:"cardLine",width:1}}for(let o of se.nodes){if(o.x===void 0)continue;let l=Pt(o.x,o.y,o.w,o.h,o.z+.012,ye("card",0),2);l.userData={type:"node",id:o.id};let h=Oc(o),f=Le($(o.x,o.y,o.w,o.h,o.z+.014),{width:h.width,dashed:h.dashed,dash:h.dash,gap:h.gap,order:2,opacity:0});Qe(f,t[h.key],null,5),l.visible=f.visible=!1,W.add(l,f);let S=o.dead?"dead":o.clone!==null?"clone":null,y=[];S&&(y.push([Pt(o.x,o.y,o.w,o.h,o.z+.0125,ye(S+"Fill",0),2),S+"Fill"]),o.dead&&y.push([Pt(o.x,o.y,o.w,o.h,o.z+.013,Js(o.w,o.h,"dead",0),2),"hatch"]),y.push([Pt(o.x+o.w-.17,o.y-.04,.13,.13,o.z+.017,ye(S,0),2),"tick"])),o.lb&&!o.dead&&y.push([Pt(o.x+.03,o.y-.05,.06,o.h-.1,o.z+.016,ye("lb",0),2),"bar"]);for(let[T]of y)T.visible=!1,W.add(T);is.set(o.id,{n:o,mesh:l,border:f,extra:y,st:h,a:1,ta:1})}let E=o=>o==="deadFill"?t.deadFillA:o==="cloneFill"?t.cloneFillA:o==="hatch"?.9:1;function Q(o){let l=nn.get(o.module);return o.y-o.h>=-l.h-.001}function de(o){let l=o.n,h=nn.get(l.module),f=ve(h.u)*(Q(l)?1:0)*h.a,S=o.a*f;o.mesh.material.opacity=S,o.border.material.opacity=S,o.mesh.visible=o.border.visible=S>.003;for(let[y,T]of o.extra)y.material.opacity=S*E(T),y.visible=S>.003}let te=new Map;function re(o){let l=te.get(o.id),h=l?l.open:P.expanded.has(o.id),f=l?ve(l.lift):0,S=h?o.expanded.w:o.w,y=h?o.expanded.h:o.h,T=o.data_only?[]:o.public.concat(h?o.private:[]),R=o.z+o.d+f*o.expanded.lift,L=!h&&o.private.length?o.y-y+De.box_tail/2+.03:null;return{x0:o.x,x1:o.x+o.w,xr:o.x+S,w:S,h:y,rows:T,zf:R,tailY:L,open:h,cx:o.x+S/2}}function We(o,l){return o.y-De.box_head-De.box_row*(l+.5)}function Ye(o){let l=te.get(o.id);l&&W.remove(l.group);let h=P.expanded.has(o.id),f=new Ri,S=h?o.expanded.w:o.w,y=h?o.expanded.h:o.h,T=o.d,R=[pe(t.boxSide),pe(t.boxSide),pe(t.boxTop),pe(t.boxSide),pe(t.boxFront),pe(t.boxSide)],L=new yn(new $i(S,y,T),R);L.position.set(S/2,-y/2,T/2),L.renderOrder=2,L.userData={type:"box",id:o.id},f.add(L);let U=bt(Array.from(new eo(new $i(S,y,T)).attributes.position.array),{color:t.boxLine,width:1.3,order:2});U.position.set(S/2,-y/2,T/2),f.add(U);let J=T+.004,k=[],oe=Pt(0,0,S,De.box_head,J,pe(t.boxHead),2);f.add(oe),k.push(oe);let Ee=o.w,we=o.data_only?[]:o.public.concat(h?o.private:[]);if(we.forEach((ut,gt)=>{let ze=at.get(ut),St=-De.box_head-De.box_row*gt;if(ze.clone!==null){let xt=Pt(.03,St-.01,Ee-.06,De.box_row-.02,J+8e-4,pe(t.cloneFill,t.cloneFillA),2);xt.userData.alpha=t.cloneFillA,f.add(xt),k.push(xt);let Ae=Le([.16,St-De.box_row+.035,J+.002,Ee-.12,St-De.box_row+.035,J+.002],{width:2.2,dashed:!0,dash:.03,gap:.045,order:2});Qe(Ae,t.clone,null,2),f.add(Ae)}if(ze.lb){let xt=Pt(.05,St-.05,.045,De.box_row-.1,J+.001,pe(t.lb),2);f.add(xt),k.push(xt)}}),h&&o.private.length){let ut=-De.box_head-De.box_row*o.public.length,gt=Pt(.03,ut+.02,Ee-.06,.05,J+.001,pe(16777215,.9,{map:ma}),2);f.add(gt),k.push(gt)}if(!h&&o.private.length){let ut=Pt(.03,-y+De.box_tail+.01,S-.06,De.box_tail-.04,J+.001,pe(16777215,.85,{map:ma}),2);f.add(ut),k.push(ut)}let pt=[];if(h&&!o.data_only&&o.fields.length){let ut=o.w+.3,gt=Le([o.w+.15,-De.box_head+.02,J,o.w+.15,-y+.06,J],{width:1,order:2});Qe(gt,t.fieldSep,null,2),f.add(gt);let ze=xt=>-De.box_head-De.box_field*(xt+.5),St=new Map(o.fields.map((xt,Ae)=>[xt.name,Ae]));we.forEach((xt,Ae)=>{let q=o.access[xt];if(!q)return;let ee=-De.box_head-De.box_row*(Ae+.5);for(let[_e,fe]of[[q.writes,"w"],[q.reads,"r"]])for(let He of _e){if(!St.has(He)||fe==="r"&&q.writes.includes(He))continue;let Ke=ze(St.get(He)),Je=Fe(ne(o.w-.04,ee,J+.003),ne(o.w+.1,ee,J+.003),ne(ut-.14,Ke,J+.003),ne(ut-.02,Ke,J+.003),12),Wt=Le(Je,{width:fe==="w"?1.1:1,dashed:fe==="r",dash:.03,gap:.04,opacity:.55,order:2});Qe(Wt,fe==="w"?t.write:t.read,null,13),Wt.userData={method:xt,kind:fe},f.add(Wt),pt.push(Wt)}})}f.position.set(o.x,o.y,o.z),W.add(f);let Ue={cl:o,group:f,box:L,mats:R,edges:U,flat:k,fieldMarks:pt,open:h,lift:l?l.lift:0,liftTarget:h?1:0,a:l?l.a:1,ta:l?l.ta:1};return f.position.z=o.z+ve(Ue.lift)*o.expanded.lift,te.set(o.id,Ue),Xe(Ue),Ue}function Xe(o){let l=nn.get(o.cl.module),h=ve(l.u)*l.a*(o.cl.y-o.cl.h>=-l.h-.001?1:0),f=o.a*h;o.group.visible=f>.003,o.mats.forEach(S=>S.opacity=f),o.edges.material.opacity=f,o.flat.forEach(S=>S.material.opacity=f*(S.material.map?.85:S.userData.alpha??1)),o.group.children.forEach(S=>{S.isLine2&&(S.material.opacity=f*(S.userData.method?.55:1))})}for(let o of se.classes)Ye(o);class ot extends ji{constructor(l){super(l),this.vertexShader=this.vertexShader.replace("attribute vec3 instanceColorEnd;",`attribute vec3 instanceColorEnd;
		attribute float instanceWidthStart;
		attribute float instanceWidthEnd;
		attribute float instanceAlphaStart;
		attribute float instanceAlphaEnd;
		varying float vAlpha;`).replace("void main() {",`void main() {
			vAlpha = ( position.y < 0.5 ) ? instanceAlphaStart : instanceAlphaEnd;`).replace("offset *= linewidth;","offset *= linewidth * ( ( position.y < 0.5 ) ? instanceWidthStart : instanceWidthEnd );"),this.fragmentShader=this.fragmentShader.replace("uniform float linewidth;",`uniform float linewidth;
		varying float vAlpha;`).replace("gl_FragColor = vec4( diffuseColor.rgb, alpha );","gl_FragColor = vec4( diffuseColor.rgb, alpha * vAlpha );")}}function ct(o){let l=o.length/3,h=new Float32Array(l),f=0;for(let S=1;S<l;S++)f+=Math.hypot(o[S*3]-o[S*3-3],o[S*3+1]-o[S*3-2],o[S*3+2]-o[S*3-1]),h[S]=f;for(let S=1;S<l;S++)h[S]/=f||1;return h.len=f,h}function Et(o,l,h){let f=new qi(h,2,1);o.setAttribute(l+"Start",new ii(f,1,0)),o.setAttribute(l+"End",new ii(f,1,1))}function It(o){let l=o.n,h=new Float32Array(Math.max(0,l-1)*2);for(let f=0;f<l-1;f++)h[2*f]=1-o.taper*o.f[f],h[2*f+1]=1-o.taper*o.f[f+1];Et(o.line.geometry,"instanceWidth",h)}function st(o,l,h,f=null){let S=`${l}|${h??l}|${o.n}|${f?`${f.start}|${f.f0}|${f.f1}`:""}`;if(o.paintKey===S)return;o.paintKey=S,o.lastA=l,o.lastB=h??l,o.lastFade=f;let y=Te(l),T=Te(h??l),R=new Ct,L=new Float32Array(o.n*3),U=new Float32Array(o.n);for(let k=0;k<o.n;k++){let oe=o.f[k];R.copy(y).lerp(T,oe),L[k*3]=R.r,L[k*3+1]=R.g,L[k*3+2]=R.b;let Ee=f?f.start?oe:1-oe:0;U[k]=f?1-he((Ee-f.f0)/Math.max(.001,f.f1-f.f0),0,1):1}o.line.geometry.setColors(L);let J=new Float32Array(Math.max(0,o.n-1)*2);for(let k=0;k<o.n-1;k++)J[2*k]=U[k],J[2*k+1]=U[k+1];Et(o.line.geometry,"instanceAlpha",J)}function Ht(o,l={}){let h=Array.isArray(o[0])?o.flat():o,f=new _r;f.setPositions(h);let S=new ot({color:16777215,linewidth:l.width??1.5,vertexColors:!0,transparent:!0,opacity:0,dashed:!!l.dashed,dashSize:l.dash??.1,gapSize:l.gap??.08,depthWrite:!1,fog:!0});S.resolution.set(ue,Se),Be.push(S);let y=new pa(f,S);l.dashed&&y.computeLineDistances(),y.renderOrder=l.order??3,y.visible=!1;let T={line:y,pts:h,n:h.length/3,f:ct(h),taper:l.taper??.5,a:0,ta:0};return It(T),st(T,16777215),T}function pn(o,l){let h=Array.isArray(l[0])?l.flat():l;o.pts=h,o.n=h.length/3,o.f=ct(h),o.paintKey=null,o.line.geometry.setPositions(h),o.line.material.dashed&&o.line.computeLineDistances(),It(o),st(o,o.lastA??16777215,o.lastB,o.lastFade??null)}function mn(o){if(qe.has(o))return o;let l=at.get(o);return l&&l.cls&&!l.dead&&qe.has(l.cls)?l.cls:null}function Zt(o,l){if(!P.open.has(l))return null;let h=mn(o),f=h?te.get(h):null;return f?ve(f.lift):0}function bn(o,l){let h=se.edges[o],f=Zt(h.s,h.ms),S=Zt(h.t,h.mt),y=oe=>oe===null?"f":oe>=1?"x":"o",T=oe=>oe!==null&&oe>0&&oe<1;if(!T(f)&&!T(S)){let oe=y(f)+y(S);return lt.call(o,l,oe)??lt.call(o,l,oe.replace(/x/g,"o"))}let R=T(f)?f:S,L=(T(f)?"o":y(f))+(T(S)?"o":y(S)),U=(T(f)?"x":y(f))+(T(S)?"x":y(S)),J=lt.raw(o,l,L)??lt.raw(o,l,L.replace(/x/g,"o")),k=lt.raw(o,l,U)??J;return J?J.length!==k.length?co(R<.5?J:k):co(J.map((oe,Ee)=>Ee>=3&&(Ee-3)%10===0?oe:oe+(k[Ee]-oe)*R)):null}function je(o,l){let h=1;for(;h<o.n-1&&o.f[h]<l;)h++;let f=h-1,S=he((l-o.f[f])/(o.f[h]-o.f[f]||1),0,1);return[0,1,2].map(y=>ae(o.pts[f*3+y],o.pts[h*3+y],S))}function Ln(o,l,h,f=.02,S=.98){let y=null;for(let T=0;T<o.n;T++){let R=l?T:o.n-1-T,L=h(o.pts[R*3],o.pts[R*3+1],o.pts[R*3+2]),U=l?o.f[R]:1-o.f[R];if(L>=0)return he(y&&y.v<0?y.f+(U-y.f)*(-y.v/(L-y.v)):U,f,S);y={v:L,f:U}}return .5}let Nt={pane:{color:t.same,width:1.35,taper:.6,order:3},plate:{color:t.cross,width:1.6,taper:.5,order:3.1},row:{color:t.pkg,width:1.6,taper:.5,order:3.15},cross_row:{color:t.pkg,width:1.6,taper:.5,order:3.2},intra:{color:t.intra,width:1.1,taper:0,order:3},curve:{color:t.cross,width:1.7,taper:.62,order:3.3}},$n=o=>he(1.4+.9*Math.log2(o),1.4,3.6),_i=o=>o.kind==="intra_class"?"loop":o.ms===o.mt?"margin":"track",Fi=(o,l)=>lt.call(o,l,lt.variants(o,l)[0]??"")??null,gn=se.edges.map((o,l)=>{let h=_i(o),f=Nt[o.kind==="intra_class"?"intra":o.span],S=bn(l,h),y=Ht(S??Fi(l,h)??lt.call(l,"curve","ff"),{width:f.width,taper:f.taper,dashed:o.dead,dash:.08,gap:.08,order:f.order});return Object.assign(y,{e:o,ei:l,st:f,kind:h,inner:o.ms===o.mt,m:o.ms,hasPath:!!S,park:y.pts}),y.line.userData={type:"call",id:l},W.add(y.line),y}),zt=se.edges.map((o,l)=>{if(o.ms===o.mt||o.kind==="intra_class")return null;let h=Nt.curve,f=Ht(bn(l,"curve"),{width:h.width,taper:h.taper,dashed:o.dead,dash:.08,gap:.08,order:h.order});return Object.assign(f,{e:o,ei:l,st:h,kind:"curve",bundle:se.links[dt.get(l)].bundle,hasPath:!0}),f.line.userData={type:"call",id:l},W.add(f.line),f}),on=zt.filter(Boolean);function ai(o){let l=bn(o.ei,o.kind);o.hasPath=!!l,l?pn(o,l):o.park&&o.pts!==o.park&&pn(o,o.park)}let qt=new Map;for(let o of gn)for(let l of new Set([o.e.ms,o.e.mt]))qt.has(l)||qt.set(l,[]),qt.get(l).push(o);function Oi(o){for(let l of qt.get(o)??[])ai(l),zt[l.ei]&&ai(zt[l.ei])}let Ms=o=>gn.filter(l=>l.e.cls===o||at.get(l.e.s)?.cls===o||at.get(l.e.t)?.cls===o);function ss(o){for(let l of Ms(o))ai(l),zt[l.ei]&&ai(zt[l.ei]);for(let l of Mr)(at.get(l.ida)?.cls===o||at.get(l.idb)?.cls===o)&&(l.pts=Bc(l.ida,l.idb),ft(l.line,l.pts))}let Bi=se.links.map((o,l)=>{let h=Nt[o.span],f=Ht(lt.link(l),{width:$n(o.count),taper:.5,dashed:o.members.every(S=>se.edges[S].dead),dash:.08,gap:.08,order:h.order+.05});return Object.assign(f,{l:o,li:l,st:h,w:$n(o.count),e:{ms:o.s,mt:o.t,span:o.span}}),f.line.userData={type:"link",id:l},W.add(f.line),f}),Pp=o=>he(2.2+1.3*Math.log2(o),2.2,5.5),Sr=se.plate_bundles.map((o,l)=>{let h=Pp(o.count),f=Ht(lt.ribbon(l),{width:h,taper:.45,order:3.7});return Object.assign(f,{pb:o,k:l,w:h,color:t.ribPkg}),f.line.userData={type:"plateribbon",id:l},W.add(f.line),f});function Ou(o){let l=at.get(o),h=l.module;if(P.open.has(h)){if(l.x!==void 0&&!(l.cls&&qe.has(l.cls)&&!l.dead))return ne(l.x+l.w/2,l.y,l.z+.02);let y=qe.get(l.cls),T=re(y),R=T.rows.indexOf(o);return ne(T.xr,R>=0?We(y,R):y.y-T.h+.1,T.zf)}let f=ie.get(h).box,S=Rt.get(`${h}|${l.slot}`);return ne(f.x+f.w*.62,-(S.y+S.h/2),ie.get(h).z+f.d+.02)}function Bc(o,l){let h=Ou(o),f=Ou(l),S=h.distanceTo(f),y=.6+.2*S;return Fe(h,ne(h.x,h.y+y,h.z+.6+.05*S),ne(f.x,f.y+y,f.z+.6+.05*S),f,32)}let Mr=[];se.clones.forEach(o=>{for(let l=0;l+1<o.length;l++){if(at.get(o[l]).module===at.get(o[l+1]).module)continue;let h=Bc(o[l],o[l+1]),f=nt(Le(h,{width:2.4,dashed:!0,dash:.05,gap:.07,order:3}),"clone",h.length/3);W.add(f),Mr.push({ida:o[l],idb:o[l+1],line:f,pts:h,a:1,ta:1})}});function Ip(o){for(let l of Mr)(at.get(l.ida).module===o||at.get(l.idb).module===o)&&(l.pts=Bc(l.ida,l.idb),ft(l.line,l.pts))}let mo=[];{let o=new Map,l=f=>{let S=(o.get(f)??0)+1;return o.set(f,S),S},h=tt.ground+.02;for(let f of se.imports){let S=ie.get(f.s).box,y=ie.get(f.t).box,T=ie.get(f.s).z,R=ie.get(f.t).z,L=l(f.s),U=l(f.t),J=(L%5-2)*Math.min(.18,S.w/6),k=(U%5-2)*Math.min(.18,y.w/6),oe=ne(S.x+S.w/2+J,h,T+.5),Ee=ne(y.x+y.w/2+k,h,R+.5),we,pt;if(f.span!=="cross_row"){let fe=.9+.1*Math.abs(Ee.x-oe.x);we=ne(oe.x,h,oe.z+Math.min(fe,1.9)),pt=ne(Ee.x,h,Ee.z+Math.min(fe,1.9))}else we=ne(oe.x,h,oe.z+2.1),pt=ne(Ee.x,h,Ee.z+2.1);let Ue=Fe(oe,we,pt,Ee,28),ut=Le(Ue,{width:f.cycle?1.5:1,order:1,dashed:!0,dash:.28,gap:.2}),gt=Ue.length,ze=ne(Ue[gt-3],h+.004,Ue[gt-1]),St=ne(Ue[gt-9],h+.004,Ue[gt-7]),xt=ze.clone().sub(St).normalize(),Ae=ne(-xt.z,0,xt.x),q=.2,ee=new On;ee.setAttribute("position",new wn([ze.x,ze.y,ze.z,ze.x-xt.x*q*1.6+Ae.x*q*.7,ze.y,ze.z-xt.z*q*1.6+Ae.z*q*.7,ze.x-xt.x*q*1.6-Ae.x*q*.7,ze.y,ze.z-xt.z*q*1.6-Ae.z*q*.7],3));let _e=new yn(ee,pe(f.cycle?t.red:t.imp,1,{side:mi,depthWrite:!1}));_e.renderOrder=1,W.add(ut,_e),mo.push({imp:f,line:ut,head:_e,pts:Ue,a:1,ta:1})}}let kc=900,xi=new On;xi.setAttribute("position",new Un(new Float32Array(kc*3),3)),xi.setAttribute("color",new Un(new Float32Array(kc*3),3)),xi.setDrawRange(0,0);let Lp=(()=>{let o=document.createElement("canvas");o.width=o.height=64;let l=o.getContext("2d"),h=l.createRadialGradient(32,32,0,32,32,32);return h.addColorStop(0,"rgba(255,255,255,1)"),h.addColorStop(.25,"rgba(255,255,255,0.75)"),h.addColorStop(1,"rgba(255,255,255,0)"),l.fillStyle=h,l.fillRect(0,0,64,64),new Qr(o)})(),go=new Xo(xi,new jr({size:11,sizeAttenuation:!1,map:Lp,vertexColors:!0,transparent:!0,depthWrite:!1,depthTest:!1,blending:no}));go.renderOrder=6,go.frustumCulled=!1,W.add(go);let ws=[],Dp=new Ct,Bu=new Ct(t.bg),zc=new Ct(t.lit);function ku(){Bu.set(t.bg),zc.set(t.lit),go.material.blending=r.pulseAdditive?no:vs,go.material.needsUpdate=!0}ku();function zu(){return P.scope?P.scope.kind==="module"?ie.get(P.scope.id).district:P.scope.id:null}function wr(){let o=zu();return o?new Set(Ie.get(o).modules):null}let _o=()=>P.scope?.kind==="module"?P.scope.id:null;function Vn(o){return at.get(o)?.module??qe.get(o)?.module}function Er(o){return at.get(o)?.slot??qe.get(o)?.slot}function Vu(o,l,h){let f=new Map,S=new Set,y=new Set,T=new Set;for(let[R,L]of l){let U=dt.get(R.ei);U!==void 0&&(!f.has(U)||f.get(U)>L)&&f.set(U,L),U!==void 0&&T.add(se.links[U].bundle)}for(let R of o.keys()){let L=Vn(R);y.add(L),S.add(`${L}|${Er(R)}`)}for(let R of h){let L=qe.get(R).module;y.add(L),S.add(`${L}|${qe.get(R).slot}`)}return{links:f,slots:S,modules:y,bundles:T}}function Up(o){let l=new Map(o.lit.map(([T,R])=>[T,R])),h=new Map(o.lit_edges.map(([T,R])=>[gn[T],R])),f=new Set(o.lit_classes),S=new Set(o.trace_edges.map(T=>gn[T])),y=new Set(o.trace_edges.map(T=>dt.get(T)).filter(T=>T!==void 0));return{depth:l,edges:h,classes:f,...Vu(l,h,f),trace:S,traceLinks:y,traceNodes:new Set(o.trace),ribbon:!1,guide:!0}}function Np(){let o=ln();if(o)return o.lit.length?Up(o):null;let l=P.selected;if(!l)return null;let h=new Map,f=(R,L)=>{(!h.has(R)||h.get(R)>L)&&h.set(R,L)},S=new Map,y=new Set,T=!1;if(l.kind==="link"||l.kind==="ribbon"||l.kind==="plateribbon"||l.kind==="call"){T=!0;let R=l.kind==="call"?[l.id]:l.kind==="link"?se.links[l.id].members:l.kind==="ribbon"?se.bundles[l.id].members:se.plate_bundles[l.id].bundles.flatMap(L=>se.bundles[L].members);for(let L of R){let U=se.edges[L];f(U.s,0),f(U.t,1),U.cls&&y.add(U.cls),S.set(gn[L],0)}}else{let R=(U,J=0)=>{for(let[k,oe]of se.reach[U])f(se.nodes[k].id,J+oe)},L=new Set;if(l.kind==="node"){R(l.id);for(let U of se.callers[l.id])L.add(U)}else{let U=qe.get(l.id);for(let J of U.public.concat(U.private)){R(J,1);for(let k of se.callers[J])at.get(k).cls!==U.id&&L.add(k)}for(let J of gn)J.e.kind==="constructs"&&J.e.cls===U.id&&L.add(J.e.s)}for(let U of h.keys())at.get(U)?.cls&&y.add(at.get(U).cls);l.kind==="class"&&y.add(l.id);for(let U of gn){let{s:J,t:k,kind:oe}=U.e;oe!=="constructs"&&h.has(J)&&h.has(k)?S.set(U,h.get(J)+1):oe!=="constructs"&&L.has(J)&&(h.get(k)===0||l.kind==="class"&&at.get(k).cls===l.id)?S.set(U,0):oe==="constructs"&&h.has(J)?(S.set(U,h.get(J)+1),y.add(U.e.cls)):oe==="constructs"&&l.kind==="class"&&U.e.cls===l.id&&S.set(U,0)}for(let U of L)f(U,-1)}return{depth:h,edges:S,classes:y,...Vu(h,S,y),ribbon:T}}let Pe=null,Fp=new Set;function Hu(){if(P.hoverCall)return P.hoverCall;let o=P.hover;if(!o||!Pe||!Pe.depth.has(o)&&!Pe.classes.has(o))return null;let l=new Set;for(let[h]of Pe.edges)(h.e.s===o||h.e.t===o||h.e.cls===o)&&l.add(h.ei);return{edges:l,targets:new Set([o])}}let xa={hover:150,select:150,scope:320,unfold:js,guide:300},xo=150,Gu=()=>performance.now();function li(o,l,h=0,f=!1){o.ta===l&&!h||(o.from=o.a,o.ta=l,o.t0=Gu()+h,o.dur=b?100:f||l>o.a&&xo!==xa.scope&&xo!==xa.unfold&&xo!==xa.guide?0:xo)}function Es(o,l,h){return Te(o).lerp(Te(l),h).getHex()}function Wu(o,l){let{ms:h,mt:f,span:S}=o.e,y=ie.get(l?h:f),T=ie.get(l?f:h);if(S==="row"){let R=lt.sidePort(y.plate,T.plate),L=R.side==="right"?1:-1,U=Ln(o,l,k=>(k-R.x)*L),J=Ln(o,l,k=>(k-R.x)*L-1.1);return{fade:{start:l,f0:U,f1:J},label:{kind:"port",key:`${y.plate}|${R.side}|${l}`,at:je(o,l?U:1-U),x:R.x+L*.55,side:R.side,other:T.plate,out:l,z:y.z}}}if(S==="cross_row"){let R=lt.skyBase(y.plate),L=l?1:o.n-2,U=o.pts[L*3],J=o.pts[L*3+2],k=Ln(o,l,(oe,Ee,we)=>Math.max(Ee-R,Math.hypot(oe-U,we-J)-.6),.02,.6);return{fade:{start:l,f0:.6*k,f1:k},label:{kind:"sky",key:`${y.module}|${l}`,at:je(o,l?k:1-k),other:T.plate,out:l,z:y.z,module:y.module}}}return{fade:{start:l,f0:.3,f1:.5},label:null}}function Op(){if(P.scope||qn||P.guide!==null)return;let o=!1;for(let l of nn.values()){let h=l.b,f=Kt(h.x,0,l.p.z+h.d),S=Kt(h.x,-(h.line+De.row_pad),l.p.z+h.d),y=f[2]<=1&&Math.abs(S[1]-f[1])>=a.S*1.15;y!==l.zoomRows&&(l.zoomRows=y,o=!0)}o&&Cn("hover")}function Cn(o="hover"){xo=xa[o]??150;let l=Pe,h=ln(),f=wr(),S=_o();Pe=Np();let y=fn(),T=d[y],R=Pe&&!Pe.ribbon&&(o==="select"&&P.pulse||o==="guide"&&h&&h.pulses),L=B=>!f||f.has(B),U=P.hover,J=P.hoverBox,k=P.hoverLine,oe=Kp[P.view],Ee=h?new Set(h.focus):null,we=h?new Set(h.evidence):new Set,pt=new Set([...we].map(B=>`${Vn(B)}|${Er(B)}`)),Ue=U?`${Vn(U)}|${Er(U)}`:null,ut=k&&k.startsWith("call:")?se.edges[+k.slice(5)]:null,gt=new Set(ut?[ut.s,ut.t]:[]),ze=Hu(),St=ze?ze.targets:new Set,xt=new Set([...gt,...St].map(B=>`${Vn(B)}|${Er(B)}`)),Ae=()=>n.link,q=P.inspect&&(P.inspect.kind==="node"||P.inspect.kind==="class")?P.inspect.id:null,ee=new Set(h&&h.stub==="pill"?h.off_edges:[]),_e=Gp();$p(_e);for(let B of nn.values()){let Me=B.p.module,be=L(Me)?1:.05,Ce=T.box;y==="module"&&(Ce=Me===S?2:3),h?h.lod==="plate"?Ce=3:Ee.has(Me)?Ce=2:(Ce=3,be=L(Me)?.4:.16):Pe&&(Pe.modules.has(Me)?Ce===3&&(Ce=2):be=Math.min(be,.35*be));let Mt=!!_e&&!_e.has(Me);Mt&&(Ce=3,be=Math.max(be,.22)),Re!==null&&B.p.z<Re&&(be=0),Mt!==B.sil&&(B.sil=Mt,br(B)),li(B,be),vr(B,Ce);let Gt=J===Me;B.edges.material.color.set(Gt?t.lit:B.ts.edge[0]),B.edges.material.linewidth=Gt?2.2:B.ts.edge[1],B.rowsTa=(y==="package"||y==="module")&&L(Me)&&(!h||Ce<=2)?1:h?h.lod!=="plate"&&Ce<=2?1:0:Pe&&Pe.modules.has(Me)||y==="overview"&&B.zoomRows?1:0;for(let[Xt,sn]of B.lit){let Ot=`${Me}|${Xt}`,$t=xt.has(Ot);sn.visible=!!(Pe&&Pe.slots.has(Ot)||Ue===Ot||pt.has(Ot)||$t)&&B.u<.5,Qe(sn,ze&&!$t?Ae():t.lit,null,5),sn.material.linewidth=$t?2.6:1.4}}for(let B of is.values()){let Me=B.n,be=L(Me.module)?1:.04,Ce=Pe&&Pe.depth.has(Me.id)||we.has(Me.id);Pe&&!Ce&&(be=Math.min(be,.3*be)),h&&(be=Ce?1:Ee.has(Me.module)?.7:.2),li(B,be);let Mt=U===Me.id||P.selected?.id===Me.id||q===Me.id||St.has(Me.id)||gt.has(Me.id),Gt=!Me.dead&&Me.clone===null&&!Me.lb,Xt=Gt?h?[Ee.has(Me.module)?n.link:n.edge,1]:T.card:[t[B.st.key],B.st.width];Qe(B.border,Mt?t.hover:Ce&&(Gt||Me.dead&&h)?ze?Ae():t.lit:Xt[0],null,5),B.border.material.linewidth=Mt||Pe?.traceNodes?.has(Me.id)?Xt[1]+1:Ce?Math.max(Xt[1],1.5):Xt[1]}for(let B of te.values()){let Me=B.cl,be=L(Me.module)?1:.04,Ce=Pe&&Pe.classes.has(Me.id)||we.has(Me.id);Pe&&!Ce&&(be=Math.min(be,.3*be)),h&&(be=Ce?1:Ee.has(Me.module)?.7:.2),li(B,be);let Mt=P.selected?.id===Me.id||U===Me.id||q===Me.id||St.has(Me.id),Gt=h?[Ee.has(Me.module)?n.link:n.edge,1.2]:T.block;B.edges.material.color.set(Mt?t.lit:Ce?ze?Ae():t.lit:Gt[0]),B.edges.material.linewidth=Mt?2.2:Ce?1.6:Gt[1]}for(let B of ns.values()){let Me=!f||B.d.modules.some(Ce=>f.has(Ce))?1:.15;h&&(Me=h.lod==="plate"||B.d.modules.some(Ce=>Ee.has(Ce))?1:.45),li(B,Me);let be=Pe?[n.edge,1]:T.plate;Qe(B.outline,be[0],null,5),B.outline.material.linewidth=be[1]}let fe=Pe?Math.max(1,...Pe.edges.values()):1,He=b||!R?0:Math.min(35,350/(fe+1)),Ke=Pe?.trace?.size>0,Je=B=>P.open.has(B)||nn.get(B).rowsTa===1,Wt=[...ze?ze.edges:[],...k&&k.startsWith("call:")?[+k.slice(5)]:[]],vn=new Set(Wt.map(B=>dt.get(B)).filter(B=>B!==void 0).map(B=>se.links[B].bundle)),Dt=new Set;se.bundles.forEach((B,Me)=>{if(!Je(B.s)||!Je(B.t))return;let be=L(B.s)&&L(B.t);(be&&(P.open.has(B.s)||P.open.has(B.t))||be&&J&&P.scope&&(B.s===J||B.t===J)||Pe&&Pe.bundles.has(Me)&&Pe.modules.has(B.s)&&Pe.modules.has(B.t)||vn.has(Me))&&Dt.add(Me)}),Fp=Dt;for(let B of Dt)for(let Me of[se.bundles[B].s,se.bundles[B].t]){let be=nn.get(Me);be.tier===3&&!be.sil&&be.ta>.2&&vr(be,2)}let C=k&&k.startsWith("call:")?+k.slice(5):null,le=B=>C===null?B:Math.min(B,.55);for(let B of gn){let{s:Me,t:be,ms:Ce,mt:Mt}=B.e,Gt=P.open.has(Ce)||P.open.has(Mt),Xt=!B.inner&&B.kind!=="loop"&&Dt.has(zt[B.ei].bundle),sn=L(Ce),Ot=L(Mt),$t=Pe&&Pe.edges.has(B),Qt=Ke&&Pe.trace.has(B),Dn=!!ze&&ze.edges.has(B.ei),Bt=U&&(Me===U||be===U||B.e.cls===U)&&(!h||$t)||J&&P.scope&&(Ce===J||Mt===J)||Dn||C===B.ei,an=0;Gt&&!Xt&&B.hasPath&&(B.inner?an=sn?.75*oe.call:0:P.scope?an=sn||Ot?B.e.span==="cross_row"?oe.sky:oe.call:0:an=oe.call,S&&!B.inner&&Ce!==S&&Mt!==S&&(an=Math.min(an,.12)),($t||Bt)&&(an=1),Pe&&!$t&&!Bt&&(an=Math.min(an,.06)),J&&P.scope&&!Bt&&!Pe&&(an=Math.min(an,.2)),h&&!$t&&!Bt&&(!h.cross_file&&Ce!==Mt||!Pe)&&(an=0),B.e.dead&&(an*=h&&$t?.8:.45),Dn&&(an=1),B.e.kind==="intra_class"&&!te.get(B.e.cls)?.open&&(an=0),B.inner&&!P.open.has(Ce)&&(an=0)),C!==null&&C!==B.ei&&(an=Math.min(an,.55)),ee.has(B.ei)&&(an=0),R&&$t&&an>0?(B.a=Math.min(B.a,.06),li(B,an,He*Pe.edges.get(B),!0)):li(B,an);let Hi=h?Ee.has(Ce)&&Ee.has(Mt)?n.link:n.edge:T.call,Rs=Bt||Qt?t.lit:$t?ze?Ae():Ke?Es(t.lit,t.bg,.35):t.lit:B.e.dead?t.dead:Hi;C!==null&&C!==B.ei&&(Rs=n.edge);let Pm=Es(Rs,t.bg,Bt||$t?.35:.5);B.stub=P.scope&&!B.inner&&sn!==Ot&&B.e.kind!=="intra_class"&&!(h&&Ee.has(Ce)&&Ee.has(Mt))?Wu(B,sn):null,st(B,Rs,Pm,B.stub?B.stub.fade:null),B.line.material.linewidth=Dn?B.st.width+1.8:C===B.ei?B.st.width+1.2:Qt?B.st.width+1.4:Bt?B.st.width+1:$t?B.st.width+.6:B.st.width}for(let B of on){let{s:Me,t:be,ms:Ce,mt:Mt}=B.e,Gt=L(Ce),Xt=L(Mt),sn=gn[B.ei],Ot=Pe&&Pe.edges.has(sn),$t=Ke&&Pe.trace.has(sn),Qt=!!ze&&ze.edges.has(B.ei),Dn=U&&(Me===U||be===U||B.e.cls===U)&&(!h||Ot)||J&&(Ce===J||Mt===J)||Qt||C===B.ei,Bt=0;Dt.has(B.bundle)&&(Bt=P.scope?Gt&&Xt?oe.call:0:oe.call,S&&Ce!==S&&Mt!==S&&(Bt=Math.min(Bt,.12)),(Ot||Dn)&&(Bt=1),Pe&&!Ot&&!Dn&&(Bt=Math.min(Bt,.06)),J&&P.scope&&!Dn&&!Pe&&(Bt=Math.min(Bt,.2)),h&&!Ot&&!Dn&&(Bt=0),B.e.dead&&(Bt*=h&&Ot?.8:.45),Qt&&(Bt=1)),C!==null&&C!==B.ei&&(Bt=Math.min(Bt,.55)),ee.has(B.ei)&&(Bt=0),R&&Ot&&Bt>0?(B.a=Math.min(B.a,.06),li(B,Bt,He*Pe.edges.get(sn),!0)):li(B,Bt);let an=h?Ee.has(Ce)&&Ee.has(Mt)?n.link:n.edge:T.call,Hi=Dn||$t?t.lit:Ot?ze?Ae():Ke?Es(t.lit,t.bg,.35):t.lit:B.e.dead?t.dead:an;C!==null&&C!==B.ei&&(Hi=n.edge),st(B,Hi,Es(Hi,t.bg,Dn||Ot?.35:.5)),B.line.material.linewidth=Qt?B.st.width+1.8:C===B.ei?B.st.width+1.2:Dn?B.st.width+.6:$t?B.st.width+1.4:Ot?B.st.width+.5:B.st.width}for(let B of Bi){let{s:Me,t:be}=B.l,Ce=P.open.has(Me)||P.open.has(be)||Dt.has(B.l.bundle),Mt=L(Me),Gt=L(be),Xt=Pe&&Pe.links.has(B.li),sn=Ke&&Pe.traceLinks?.has(B.li),Ot=!!ze&&B.l.members.some(Bt=>ze.edges.has(Bt)),$t=J&&(Me===J||be===J)||k===`link:${B.li}`||U&&(!h||Xt)&&B.l.members.some(Bt=>se.edges[Bt].s===U||se.edges[Bt].t===U)||Ot,Qt;Ce?Qt=0:P.scope?Qt=Mt||Gt?B.l.span==="cross_row"?oe.sky:oe.call:0:Qt=$t||Xt?1:0,!Ce&&S&&Me!==S&&be!==S&&(Qt=Math.min(Qt,.14)),!Ce&&(Xt||$t&&(!P.scope||Mt||Gt))&&(Qt=Math.max(Qt,1)),Pe&&!Xt&&(Qt=Math.min(Qt,.06)),J&&P.scope&&!$t&&!Pe&&(Qt=Math.min(Qt,.2)),Ot&&!Ce&&(Qt=1),h&&!Ce&&(Qt=Xt||$t?1:0),Qt=le(Qt),ee.size&&B.l.members.every(Bt=>ee.has(Bt))&&(Qt=0),R&&Xt&&Qt>0?(B.a=Math.min(B.a,.06),li(B,Qt,He*Pe.links.get(B.li),!0)):li(B,Qt);let Dn=C!==null?n.edge:$t||sn?t.lit:Xt?ze?Ae():Ke?Es(t.lit,t.bg,.35):t.lit:T.link;B.stub=P.scope&&Mt!==Gt?Wu(B,Mt):null,st(B,Dn,Es(Dn,t.bg,$t||Xt?.35:.5),B.stub?B.stub.fade:null),B.line.material.linewidth=B.w+(Ot?1.8:sn?1.4:$t||Xt?.8:0)}for(let B of Sr){let Me=P.scope?0:1,be=k===`plateribbon:${B.k}`||P.selected?.kind==="plateribbon"&&P.selected.id===B.k;Me&&J?Me=.18:Me&&Pe&&!be&&(Me=.12),Me&&P.selected?.kind==="plateribbon"&&P.selected.id===B.k&&(Me=.25),Me&&be&&!Pe&&(Me=1),h&&(Me=h.lod==="plate"?1:0),li(B,le(Me));let Ce=be?t.lit:T.ribbon;st(B,Ce,Es(Ce,t.bg,be?.3:.45)),B.line.material.linewidth=B.w+(be?1:0)}for(let B of Mr){let Me=L(Vn(B.ida)),be=L(Vn(B.idb)),Ce=Me&&be?1:Me||be?.5:.04;Pe&&!(Pe.depth.has(B.ida)||Pe.depth.has(B.idb))&&(Ce=Math.min(Ce,.25)),J&&!Pe&&Vn(B.ida)!==J&&Vn(B.idb)!==J&&(Ce=Math.min(Ce,.25)),h&&(Ce=Pe&&(Pe.depth.has(B.ida)||Pe.depth.has(B.idb))?1:.06),[Vn(B.ida),Vn(B.idb)].some(Gt=>Xp(Gt)||nn.get(Gt).sil)&&(Ce=0),li(B,le(Ce*oe.clone))}for(let B of mo){let Me=J&&(B.imp.s===J||B.imp.t===J)&&P.view==="plan",be=L(B.imp.s)||L(B.imp.t)?P.view==="plan"?1:.85:.05;!P.scope&&P.view!=="plan"&&!B.imp.cycle&&(be=0),Pe&&(be=Math.min(be,.2)),J&&!Me&&(be=Math.min(be,.3)),be*=oe.imp,Me&&(be=1),h&&(be=0),li(B,le(be));let Ce=B.imp.cycle?t.red:Me?t.impLit:T.imp;Qe(B.line,Ce,B.imp.cycle?Ce:Es(Ce,t.bg,.45),B.pts.length/3),B.head.material.color.set(Ce),B.line.material.linewidth=Me||B.imp.cycle?1.5:1}h?o==="guide"&&(R?Hc():Gc()):R?Hc():(o==="select"||!Pe&&l)&&Gc(),yd(),xm(),Ao(),Ge=!0,Sn()}function ki(o,l){if(o.a===o.ta||o.t0===void 0)return!1;if(l<o.t0)return!0;let h=o.dur?he((l-o.t0)/o.dur,0,1):1;return o.a=h>=1?o.ta:ae(o.from,o.ta,h),!0}function Bp(o){let l=!1,h=new Set;for(let f of nn.values()){let S=ki(f,o);if(f.rowsA!==f.rowsTa&&(f.rowsA=b?f.rowsTa:he(f.rowsA+Math.sign(f.rowsTa-f.rowsA)*.34,0,1),S=!0),f.u!==f.uTarget){f.uT0===void 0&&(f.uT0=o,f.uFrom=f.u);let y=b?1:he((o-f.uT0)/js,0,1);f.u=y>=1?f.uTarget:ae(f.uFrom,f.uTarget,y),y>=1&&(f.uT0=void 0),yr(f,ae(f.b.h,f.b.open_h,ve(f.u))),S=!0}S&&(l=!0,br(f),h.add(f.p.module))}for(let f of is.values())(ki(f,o)||h.has(f.n.module))&&(l=!0,de(f));for(let f of te.values())if((ki(f,o)||h.has(f.cl.module))&&(l=!0,Xe(f)),f.lift!==f.liftTarget){l=!0,f.liftT0===void 0&&(f.liftT0=o,f.liftFrom=f.lift);let S=b?1:he((o-f.liftT0)/220,0,1);f.lift=S>=1?f.liftTarget:ae(f.liftFrom,f.liftTarget,S),S>=1&&(f.liftT0=void 0),f.group.position.z=f.cl.z+ve(f.lift)*f.cl.expanded.lift,ss(f.cl.id),f.lift===0&&f.liftTarget===0&&f.rebuildOnClose&&(f.rebuildOnClose=!1,Ye(f.cl),ss(f.cl.id),Cn())}for(let f of ns.values())ki(f,o)&&(l=!0,f.plate.material.opacity=.92*(.5+.5*f.a),f.outline.material.opacity=f.a);for(let f of gn)if(ki(f,o)||f.inner&&h.has(f.m)){l=!0;let S=f.inner?Fc(f.m):1;f.line.material.opacity=f.a*S,f.line.visible=f.a*S>.002}for(let f of Bi)ki(f,o)&&(l=!0,f.line.material.opacity=f.a,f.line.visible=f.a>.002);for(let f of on)ki(f,o)&&(l=!0,f.line.material.opacity=f.a,f.line.visible=f.a>.002);for(let f of Sr)ki(f,o)&&(l=!0,f.line.material.opacity=f.a,f.line.visible=f.a>.002);for(let f of Mr)ki(f,o)&&(l=!0,f.line.material.opacity=f.a,f.line.visible=f.a>.002);for(let f of mo)ki(f,o)&&(l=!0,f.line.material.opacity=f.a,f.head.material.opacity=f.a,f.line.visible=f.head.visible=f.a>.002);return l}let Vc=.34,rs=null;function Hc(){if(ws=[],xi.setDrawRange(0,0),rs=null,!Pe||b||Pe.ribbon)return;for(let[h,f]of Pe.edges){let S=zt[h.ei];S&&S.ta>.05?ws.push({o:S,d:f}):h.ta>.05&&ws.push({o:h,d:f})}for(let[h,f]of Pe.links)Bi[h].ta>.05&&ws.push({o:Bi[h],d:f});if(!ws.length)return;let l=(Math.max(...ws.map(h=>h.d))+1)*Vc+.35;rs={t0:Gu()/1e3+.35,period:l,end:Math.min(3*l,4)}}function Gc(){ws=[],xi.setDrawRange(0,0),rs=null,Ge=!0,Sn()}function kp(o){if(!rs)return!1;let l=o-rs.t0;if(l<0)return!0;if(l>rs.end)return rs=null,xi.setDrawRange(0,0),Ge=!0,Sn(),!1;let h=l%rs.period,f=xi.attributes.position.array,S=xi.attributes.color.array,y=0;for(let{o:T,d:R}of ws){let L=(h-R*Vc)/Vc;if(!(L<0||L>1.2))for(let[U,J]of[[0,1],[.08,.45],[.16,.2]]){let k=L-U;if(k<0||k>1||y>=kc)continue;let oe=je(T,k);f[y*3]=oe[0],f[y*3+1]=oe[1],f[y*3+2]=oe[2];let Ee=J*Math.min(1,T.a*1.2),we=Dp.copy(Bu).lerp(zc,Ee);r.pulseAdditive&&we.copy(zc).multiplyScalar(Ee),S[y*3]=we.r,S[y*3+1]=we.g,S[y*3+2]=we.b,y++}}return xi.attributes.position.needsUpdate=!0,xi.attributes.color.needsUpdate=!0,xi.setDrawRange(0,y),!0}function zp(){hn.aspect=ue/Se,hn.setViewOffset(ue,Se,(x-A)/2,(F-v)/2,ue,Se),hn.updateProjectionMatrix(),Object.assign(Ut,{left:-ue/2,right:ue/2,top:Se/2,bottom:-Se/2}),Ut.setViewOffset(ue,Se,(x-A)/2,(F-v)/2,ue,Se),Ut.updateProjectionMatrix()}function Vp(o=_,l=K.target){return o.isOrthographicCamera?o.zoom:Se/(2*o.position.distanceTo(l)*Math.tan(Si.degToRad(o.fov)/2))}function Hp(o){let l=o?Ut:hn;if(_===l)return;let h=Vp();(!Number.isFinite(h)||h<=0)&&(h=30);let f=_.position.distanceTo(K.target)>1e-6?_.position.clone().sub(K.target).normalize():ne(0,0,1);o?(Ut.zoom=h,Ut.position.copy(K.target).addScaledVector(f,D)):hn.position.copy(K.target).addScaledVector(f,Se/(2*h*Math.tan(Si.degToRad(hn.fov)/2))),l.lookAt(K.target),l.updateProjectionMatrix(),_=l,K.object=l,K.update(),Ge=!0,Sn()}let Wc=3.2;function Gp(){if(P.scope)return wr();let o=ln();return o?Xu(o):Pe&&P.selected&&(P.pulse||Mi==="sel")?new Set(Pe.modules):null}function Xu(o){if(o.lod==="plate")return null;let l=o.stub==="pill"&&o.home_row!==null?o.focus.filter(h=>ie.get(h).row===o.home_row):o.focus;return new Set(l)}let Wp=2.2,Xp=o=>zi!==null&&ie.get(o).z>zi||Re!==null&&ie.get(o).z<Re;function $p(o){let l=o&&o.size?[...o].map(f=>ie.get(f).z):null;zi=l?Math.max(...l)+Wc:null,Re=l&&P.view==="elev"?Math.min(...l)-Wp:null;let h=[];zi!==null&&h.push(ce.set(ce.normal.set(0,0,-1),zi)),Re!==null&&h.push(me.set(me.normal.set(0,0,1),-Re)),cn.clippingPlanes=h}let $u=o=>-(P.open.has(o)?ie.get(o).box.open_h:ie.get(o).box.h);function va(o,{plan:l=!1,focus:h=!1}={}){let f=[],S=o.length===se.panes.length,y=De.gutter,T=L=>se.links.some(U=>(U.s===L||U.t===L)&&U.span==="cross_row");for(let L of o){let U=ie.get(L),J=U.box,k=l?.6:S?.4:T(L)?lt.skyBase(U.plate)+.6:lt.bandTop(U.plate)+.45;for(let oe of[J.x-y,J.x+J.w+y])l?f.push(ne(oe,tt.ground,U.z+De.plate_front),ne(oe,tt.ground,U.z-De.plate_back-.6)):f.push(ne(oe,k,U.z+J.d),ne(oe,$u(L)-.25,U.z+J.d)),S&&!l&&f.push(ne(oe,tt.ground,U.z+De.plate_front))}if(!S&&!l&&!h){let L=new Set(o.map(J=>ie.get(J).plate)),U=new Set(o);for(let J of L){let k=Ne.get(J);for(let oe of["left","right"]){if(!k.ports[oe])continue;se.links.some(we=>{if(we.span!=="row"||U.has(we.s)===U.has(we.t))return!1;let pt=U.has(we.s)?we.s:we.t,Ue=pt===we.s?we.t:we.s;return ie.get(pt).plate===J&&Ne.get(ie.get(Ue).plate).x>k.x==(oe==="right")})&&f.push(ne(k.ports[oe].x+(oe==="right"?3.2:-3.2),lt.bandTop(J),k.z))}}}if(S&&!l)for(let L of Sr)for(let U=0;U<L.n;U+=4)f.push(ne(L.pts[U*3],L.pts[U*3+1],L.pts[U*3+2]));for(let L of se.classes){let U=te.get(L.id);if(!U||!U.open||!o.includes(L.module)||!P.open.has(L.module))continue;let J=L.z+L.d+L.expanded.lift;f.push(ne(L.x-.6,L.y+.5,J),ne(L.x+L.expanded.w+.2,L.y-L.expanded.h-.2,J))}let R=new Fn().setFromPoints(f);return R.pts=f,R}function qp(o){let l=ie.get(o),h=se.placement.rows[l.row].modules,f=h.indexOf(o);return[h[f-1],o,h[f+1]].filter(y=>y&&ie.get(y).plate===l.plate)}function Xc(){return[A+18,ue-Math.max(x,xe())-18,v+16,Se-F-14]}function $c(o,l,h,f=1.04,S=null,y=Xc()){let T=(o.pts??[o.min,o.max]).filter(gt=>S===null||gt.z<=S),R=o.getCenter(ne()),L=ne(Math.sin(l)*Math.cos(h),Math.sin(h),Math.cos(l)*Math.cos(h)),U=o.getSize(ne()),J=Math.max(U.x,U.y,U.z)*1.6+5,k=hn.clone(),oe=y[1]-y[0],Ee=y[3]-y[2],we=0,pt=0;for(let gt=0;gt<6;gt++){k.position.copy(R).addScaledVector(L,J),k.near=.5,k.lookAt(R),k.updateMatrixWorld(),k.updateProjectionMatrix();let ze=1/0,St=-1/0,xt=1/0,Ae=-1/0;for(let He of T){let Ke=He.clone().project(k),Je=(Ke.x+1)/2*ue,Wt=(1-Ke.y)/2*Se;ze=Math.min(ze,Je),St=Math.max(St,Je),xt=Math.min(xt,Wt),Ae=Math.max(Ae,Wt)}let q=Math.max((St-ze)/oe,(Ae-xt)/Ee)/f;we=(St-ze)/q,pt=(Ae-xt)/q;let ee=2*J*Math.tan(Si.degToRad(k.fov)/2)/Se,_e=ne().setFromMatrixColumn(k.matrixWorld,0),fe=ne().setFromMatrixColumn(k.matrixWorld,1);R.addScaledVector(_e,((ze+St)/2-(y[0]+y[1])/2)*ee),R.addScaledVector(fe,-((xt+Ae)/2-(y[2]+y[3])/2)*ee),J*=q}let Ue=(y[0]+y[1])/2,ut=(y[2]+y[3])/2;return{target:R,position:R.clone().addScaledVector(L,J),ortho:!1,box:[Ue-we/2,ut-pt/2,Ue+we/2,ut+pt/2],ppu:Se/(2*J*Math.tan(Si.degToRad(hn.fov)/2))}}function Yp(o,l,h,f=1.04,S=null,y=Xc()){let T=(o.pts??[o.min,o.max]).filter(ut=>S===null||ut.z<=S),R=o.getCenter(ne()),L=ne(Math.sin(l)*Math.cos(h),Math.sin(h),Math.cos(l)*Math.cos(h)),U=Ut.clone(),J=y[1]-y[0],k=y[3]-y[2],oe=20,Ee=0,we=0;for(let ut=0;ut<5;ut++){U.position.copy(R).addScaledVector(L,D),U.zoom=oe,U.lookAt(R),U.updateMatrixWorld(),U.updateProjectionMatrix();let gt=1/0,ze=-1/0,St=1/0,xt=-1/0;for(let _e of T){let fe=_e.clone().project(U),He=(fe.x+1)/2*ue,Ke=(1-fe.y)/2*Se;gt=Math.min(gt,He),ze=Math.max(ze,He),St=Math.min(St,Ke),xt=Math.max(xt,Ke)}let Ae=ne().setFromMatrixColumn(U.matrixWorld,0),q=ne().setFromMatrixColumn(U.matrixWorld,1);R.addScaledVector(Ae,((gt+ze)/2-(y[0]+y[1])/2)/oe),R.addScaledVector(q,-((St+xt)/2-(y[2]+y[3])/2)/oe);let ee=Math.max((ze-gt)/J,(xt-St)/k,1e-6)/f;Ee=(ze-gt)/ee,we=(xt-St)/ee,oe/=ee}let pt=(y[0]+y[1])/2,Ue=(y[2]+y[3])/2;return{target:R,position:R.clone().addScaledVector(L,D),zoom:oe,ortho:!0,box:[pt-Ee/2,Ue-we/2,pt+Ee/2,Ue+we/2],ppu:oe}}function Zp(){let o=X("#legend");if(o.classList.contains("hidden")||o.classList.contains("pill"))return null;let l=o.getBoundingClientRect(),h=w.getBoundingClientRect();return l.width?[l.left-h.left-6,l.top-h.top-6,l.right-h.left+6,l.bottom-h.top+6]:null}function qc(o,l,h,f,S,y){let T=y&&P.proj==="ortho"?Yp:$c,R=T(o,l,h,f,S),L=y?Zp():null;if(!L||!ti(R.box,L))return R;let U=Xc(),J=T(o,l,h,f,S,[U[0],U[1],U[2],Math.max(U[2]+200,L[1])]),k=T(o,l,h,f,S,[Math.min(U[1]-200,L[2]),U[1],U[2],U[3]]);return J.ppu>=k.ppu?J:k}let qn=null;function Ts(o,l=360){b&&(l=0),!!o.ortho!=!!_.isOrthographicCamera&&Hp(!!o.ortho),_.isOrthographicCamera&&o.zoom===void 0&&(o.zoom=_.zoom);let h={t:K.target.clone(),p:_.position.clone(),zoom:_.zoom},f=new Yi().setFromVector3(h.p.clone().sub(h.t)),S=new Yi().setFromVector3(o.position.clone().sub(o.target)),y=S.theta-f.theta;y>Math.PI&&(y-=2*Math.PI),y<-Math.PI&&(y+=2*Math.PI),qn={start:performance.now(),ms:l,from:h,goal:o,s0:f,s1:S,dTheta:y,near0:_.near,far0:_.far},Ge=!0,Sn(),l===0&&qu(performance.now()+1)}function qu(o){if(!qn)return!1;let l=he((o-qn.start)/Math.max(1,qn.ms),0,1),h=ge(l),{from:f,goal:S,s0:y,s1:T,dTheta:R}=qn,L=f.t.clone().lerp(S.target,h),U=new Yi(ae(y.radius,T.radius,h),ae(y.phi,T.phi,h),y.theta+R*h);return _.position.copy(L).add(ne().setFromSpherical(U)),K.target.copy(L),_.lookAt(L),_.isOrthographicCamera&&S.zoom&&(_.zoom=Math.exp(ae(Math.log(f.zoom),Math.log(S.zoom),h)),_.updateProjectionMatrix()),S.near!==void 0&&(_.near=l>=1||S.near<=qn.near0?S.near:qn.near0,_.far=l>=1||S.far>=qn.far0?S.far:qn.far0,_.updateProjectionMatrix()),l>=1&&(qn=null,K.update()),!0}let os={axo:{az:-.3,el:.82},plan:{az:0,el:1.5},elev:{az:0,el:.06},elevRaised:{az:-.12,el:.5}},Kp={axo:{call:1,sky:1,imp:.6,clone:1},plan:{call:.1,sky:.05,imp:1,clone:.3},elev:{call:1,sky:1,imp:0,clone:1}};function Jp(){let o=_o();if(o)return qp(o);let l=wr();return l?[...l]:se.panes.map(h=>h.module)}let zi=null;function Vi(o,l=700){P.view=o,Cn("scope"),document.querySelectorAll("#views [data-view]").forEach(T=>T.classList.toggle("on",T.dataset.view===o));let h=wr(),f=h&&new Set([...h].map(T=>ie.get(T).row)).size>1,S=o==="elev"&&f?os.elevRaised:os[o],y=qc(va(Jp(),{plan:o==="plan",focus:!!_o()}),S.az,S.el,o==="plan"?.93:1.02,zi,o==="elev"&&!!h);Ts(y,l),Mi="view",Ao()}let Mi=null;K.addEventListener("start",()=>{Mi=null});let vo=ne();function Kt(o,l,h){return zi!==null&&h>zi||Re!==null&&h<Re?[0,0,2]:(vo.set(o,l,h).project(_),[(vo.x+1)/2*ue,(1-vo.y)/2*Se,vo.z])}let ya=new Map;function Yu(o,l,h){V.font=h;let f=h+"|"+o,S=ya.get(f);if(S===void 0&&(S=V.measureText(o).width,ya.set(f,S)),S<=l)return o;let y=S/o.length,T=Math.floor(l/y)-1;return T>=3?o.slice(0,T)+"\u2026":null}function Tr(o,l){let h=l+"|"+o,f=ya.get(h);return f===void 0&&(V.font=l,V.letterSpacing="0px",f=V.measureText(o).width,ya.set(h,f)),f}let as=[];function Qs(o,l,h,f,S,y){let T=Kt(o,h,f),R=Kt(l,h,f);if(T[2]>1||R[2]>1)return!1;let L=Math.hypot(R[0]-T[0],R[1]-T[1]),U=(y.h??.4)*L/Math.max(.01,l-o),J=null;for(let we of y.sizes??[a.M,a.S]){if(U<we*(y.room??1.15))continue;let pt=`${y.weight??400} ${we}px ${M}`,Ue=Yu(S,L-2,pt);if(!(!Ue||Ue!==S&&(y.whole||y.minChars&&Ue.length-1<y.minChars))){if(Ue===S){J={t:Ue,font:pt,size:we};break}(!J||Ue.length>J.t.length)&&(J={t:Ue,font:pt,size:we})}}if(!J)return!1;let{t:k,font:oe,size:Ee}=J;if(V.save(),V.globalAlpha=y.alpha??1,V.translate(T[0],T[1]),V.rotate(Math.atan2(R[1]-T[1],R[0]-T[0])),V.font=oe,V.fillStyle=y.color??s.text,V.textBaseline="middle",y.spacing&&(V.letterSpacing=y.spacing),y.halo&&(V.lineWidth=3,V.lineJoin="round",V.strokeStyle=y.halo,V.strokeText(k,0,0)),V.fillText(k,0,0),V.restore(),(y.alpha??1)>.25&&as.push({size:Ee,text:k,full:S,x:T[0],y:T[1],w:Tr(k,oe),ang:Math.atan2(R[1]-T[1],R[0]-T[0]),kind:y.kind??"face",color:y.color??s.text,alpha:y.alpha??1,ground:y.halo??null}),y.obstacle){let we=Tr(k,oe),pt=(R[0]-T[0])/(L||1),Ue=(R[1]-T[1])/(L||1),ut=T[0]+pt*we,gt=T[1]+Ue*we;Rn.push([Math.min(T[0],ut)-2,Math.min(T[1],gt)-Ee*.6,Math.max(T[0],ut)+2,Math.max(T[1],gt)+Ee*.6])}return k===S?"full":"cut"}function Yc(o,l,h,f,S,y,T,R){let L=Kt(o,h,y),U=Kt(l,h,y);if(L[2]>1||U[2]>1)return!1;let J=Math.hypot(U[0]-L[0],U[1]-L[1]),k=J/Math.max(.01,l-o),oe=T.length,Ee=oe===1?f:S;for(let we of R.sizes??[a.M,a.S]){if(Ee*k<we*(R.room??1.1))continue;let pt=`${R.weight??400} ${we}px ${M}`;if(T.some(gt=>Tr(gt,pt)>J-2))continue;let Ue=Math.min(S,we*1.3/k),ut=h-(f-oe*Ue)/2;return T.forEach((gt,ze)=>Qs(o,l,oe===1?h-f/2:ut-Ue/2-ze*Ue,y,gt,{...R,h:oe===1?f:S,sizes:[we],room:R.room??1.1,whole:!0,obstacle:!0})),!0}return!1}let Rn=[],ti=(o,l)=>o[0]<l[2]&&o[2]>l[0]&&o[1]<l[3]&&o[3]>l[1];function jp(o){for(let l of Rn)if(ti(o,l))return!1;return Rn.push(o),!0}function yo(o,l,h){let f=`${h.weight??400} ${h.size??11}px ${M}`;V.font=f,V.letterSpacing=h.spacing??"0px";let S=V.measureText(l).width,y=h.size??11,T=o[0]+(h.dx??0)-(h.align==="center"?S/2:h.align==="right"?S:0),R=o[1]+(h.dy??0);return o[0]>=A&&o[0]<=Cr&&(T=he(T,A+6,Cr-10-S)),{w:S,x0:T,y0:R,rect:[T-(h.pill?6:3),R-y*(h.pill?1.05:.8),T+S+(h.pill?6:3),R+y*.5]}}function ba(o,l,h){let f=h.size??11;(h.alpha??1)>.25&&as.push({size:f,text:o,full:h.full??o,x:l.x0,y:l.y0,w:l.w,ang:0,kind:h.kind??"tag",color:h.color??s.muted,alpha:h.alpha??1,ground:h.pill?r.pill:h.halo?r.halo:null}),V.font=`${h.weight??400} ${f}px ${M}`,V.letterSpacing=h.spacing??"0px",V.globalAlpha=h.alpha??1,h.pill?(V.fillStyle=r.pill,V.strokeStyle=h.pillLine??r.pillLine,V.lineWidth=1,V.beginPath(),V.roundRect(l.x0-4,l.y0-f*.95,l.w+8,f*1.35,3),V.fill(),V.stroke()):h.halo&&(V.globalAlpha=Math.min(1,(h.alpha??1)*1.6),h.backdrop&&(V.fillStyle=r.backdrop,V.fillRect(l.x0-2,l.y0-f*.82,l.w+4,f*1.12)),V.lineWidth=4,V.lineJoin="round",V.strokeStyle=r.halo,V.strokeText(o,l.x0,l.y0),V.globalAlpha=h.alpha??1),V.fillStyle=h.color??s.muted,V.fillText(o,l.x0,l.y0),V.letterSpacing="0px",V.globalAlpha=1}function Qp(o,l,h,f,S={}){let y=S.at??Kt(o,l,h);if(y[2]>1)return!1;let T=yo(y,f,S);if(S.inside&&(T.rect[0]<A+4||T.rect[2]>ue-8||T.rect[1]<v+12||T.rect[3]>Se-F))return!1;if(S.force)Rn.push(T.rect);else if(!jp(T.rect))return!1;return ba(f,T,S),!0}function bo(o,l,h,f,S,y){let T=S.at??Kt(o,l,h);if(T[2]>1)return!1;let R=null;for(let[L,U]of y){let J=yo(T,f,{...S,dx:(S.dx??0)+L,dy:(S.dy??0)+U}),k=Rn.reduce((oe,Ee)=>oe+(ti(J.rect,Ee)?(Math.min(J.rect[2],Ee[2])-Math.max(J.rect[0],Ee[0]))*(Math.min(J.rect[3],Ee[3])-Math.max(J.rect[1],Ee[1])):0),0);if((!R||k<R.cost)&&(R={L:J,cost:k}),k===0)break}return Rn.push(R.L.rect),ba(f,R.L,S),!0}function So(o,l,h){let f=_.position.distanceTo(vo.set(o,l,h));return 1-he((f-W.fog.near)/(W.fog.far-W.fog.near),0,.85)}function Zu(o){let l=o.b,h=o.p.z+l.d,f=1/0,S=-1/0,y=1/0,T=-1/0;for(let[R,L]of[[l.x,0],[l.x+l.w,0],[l.x,-o.h],[l.x+l.w,-o.h]]){let U=Kt(R,L,h);if(U[2]>1)return null;f=Math.min(f,U[0]),S=Math.max(S,U[0]),y=Math.min(y,U[1]),T=Math.max(T,U[1])}return[f,y,S,T]}function em(o){let l=at.get(o),h=Vn(o);if(P.open.has(h)){if(l&&l.x!==void 0&&!(l.cls&&qe.has(l.cls)&&!l.dead))return[l.x+l.w/2,l.y,l.z+.02];let T=qe.get(l?l.cls:o),R=re(T),L=l?R.rows.indexOf(o):-1;return L>=0?[T.x+T.w/2,We(T,L)+De.box_row/2,R.zf]:[R.cx,T.y,R.zf]}let f=ie.get(h),S=f.box,y=Rt.get(`${h}|${Er(o)}`);return[S.x+S.w/2,-y.y,f.z+S.d+.01]}let Ar=!1,Cr=1280,tm=8;function nm(){V.setTransform(Y,0,0,Y,0,0),V.clearRect(0,0,ue,Se),Rn.length=0,as.length=0,Ar=!1;let o=ln(),l=fn(),h=o?new Set(o.focus):null,f=Hu(),S=P.hoverLine?.startsWith("call:")?se.edges[+P.hoverLine.slice(5)]:null,y=q=>P.hover===q||P.selected?.id===q||P.inspect?.id===q||!!f&&f.targets.has(q)||!!S&&(S.s===q||S.t===q),T=xe();Cr=ue-T,Rn.push([0,0,A,Se],[0,0,ue,v+10],[A,Se-F+4,ue,Se]),T&&Rn.push([ue-T,0,ue,Se]);for(let q of["#key","#help","#legend"])if(!X(q).classList.contains("hidden")){let ee=X(q).getBoundingClientRect(),_e=w.getBoundingClientRect();Rn.push([ee.left-_e.left-4,ee.top-_e.top-4,ee.right-_e.left+4,ee.bottom-_e.top+4])}V.textBaseline="alphabetic";let R=o?o.lod==="plate"?s.text:s.muted:l==="module"?s.dim:l==="package"||Pe?s.muted:s.text,L=P.view==="plan"?[]:[...nn.values()].filter(q=>q.a>.2).map(q=>({row:q.p.row,open:q.u>.05,r:Zu(q)})).filter(q=>q.r);for(let q of[...ns.values()].sort((ee,_e)=>_e.d.w-ee.d.w)){let ee=q.d;if(q.a<.4)continue;let _e=Kt(ee.x,tt.ground,ee.z+De.plate_front),fe=Kt(ee.x+ee.w,tt.ground,ee.z+De.plate_front);if(_e[2]>1||fe[2]>1||Math.abs(fe[0]-_e[0])<24)continue;let He=!o||o.lod==="plate"||ee.modules.some(Dt=>h.has(Dt)),Ke=ee.name.toUpperCase(),Je={size:a.L,spacing:"0.14em",color:He?R:s.dim,weight:700,halo:!0,dy:-4,kind:"plate"},Wt=L.filter(Dt=>Dt.row>ee.row||Dt.open).map(Dt=>Dt.r),vn=null;for(let Dt=0;Dt<9;Dt++){let C=ee.x+.3+Dt/8*Math.max(0,ee.w-.6),le=Kt(C,tt.ground,ee.z+De.plate_front),B=yo(le,Ke,Je);if(B.rect[2]>Math.max(_e[0],fe[0])+4)break;if(Rn.some(be=>ti(B.rect,be)))continue;let Me=Wt.reduce((be,Ce)=>be+(ti(B.rect,Ce)?(Math.min(B.rect[2],Ce[2])-Math.max(B.rect[0],Ce[0]))*(Math.min(B.rect[3],Ce[3])-Math.max(B.rect[1],Ce[1])):0),0);if((!vn||Me<vn.hit)&&(vn={L:B,hit:Me,x:C}),Me===0)break}if(!vn){let Dt=Kt(ee.x+.3,tt.ground,ee.z+De.plate_front),C=yo(Dt,Ke,Je);if(Rn.some(le=>ti(C.rect,le)))continue;vn={L:C,x:ee.x+.3}}Rn.push(vn.L.rect),ba(Ke,vn.L,{...Je,alpha:q.a*So(vn.x,tt.ground,ee.z)})}let U=new Set;if(l==="overview"&&!o){let q=P.hoverBox,ee=P.hoverLine;if(q)for(let _e of se.links)(_e.s===q||_e.t===q)&&(U.add(_e.s),U.add(_e.t));if(ee){let[_e,fe]=ee.split(":"),He=_e==="link"?[se.links[+fe]]:se.plate_bundles[+fe].bundles.flatMap(Ke=>se.bundles[Ke].links.map(Je=>se.links[Je]));for(let Ke of He)U.add(Ke.s),U.add(Ke.t)}if(Pe)for(let _e of Pe.modules)U.add(_e)}let J=[];for(let q of nn.values()){if(q.a<.2)continue;let ee=q.p.module,_e=P.hoverBox===ee,fe,He,Ke=700;if(o&&o.lod!=="plate"){if(!h.has(ee))continue;[fe,He]=[a.L,_e?s.lit:P.open.has(ee)?s.text:s.muted]}else if(o){if(!_e)continue;[fe,He]=[a.M,s.lit]}else if(l==="package"){if(!wr().has(ee))continue;[fe,He]=[a.L,_e?s.lit:s.text]}else if(l==="module"){if(!wr().has(ee))continue;[fe,He]=ee===_o()?[a.L,s.text]:[a.M,_e?s.lit:s.muted]}else if(l==="plan")[fe,He,Ke]=[a.S,_e?s.lit:s.muted,400];else if(_e)[fe,He]=[a.M,s.lit];else if(U.has(ee))[fe,He,Ke]=[a.M,s.muted,400];else continue;J.push({o:q,size:fe,color:He,weight:Ke,hot:_e})}let k=P.view==="elev",oe=new Map;J.sort((q,ee)=>ee.o.p.row-q.o.p.row||q.o.b.x-ee.o.b.x);for(let q of J){let ee=q.o,_e=ee.b,fe=ee.p.z+_e.d+.01,He=k?lt.bandTop(ee.p.plate)+.42:P.view==="plan"?0:.12,Ke=Kt(_e.x+(k?.04:_e.w/2),He,k?fe:P.view==="plan"?ee.p.z+_e.d/2:fe);if(Ke[2]>1)continue;if(k&&Ke[1]<v+16+2*(q.size+4)){let Ce=Kt(_e.x+.04,.16,fe);Ce[2]<=1&&(Ke[0]=Ce[0],Ke[1]=Ce[1])}let Je=ee.p.name+(k?".py":""),Wt=`${q.weight} ${q.size}px ${M}`,vn={size:q.size,weight:q.weight,color:q.color,alpha:ee.a*So(_e.x,0,ee.p.z),halo:!0,backdrop:!0,align:k?"left":"center",dy:-4,kind:"module",full:Je},Dt=k?ee.p.plate:"all";oe.has(Dt)||oe.set(Dt,[[],[],[]]);let C=oe.get(Dt),le=q.size+4,B=Math.abs(Kt(_e.x+_e.w,He,fe)[0]-Kt(_e.x,He,fe)[0]),Me=Yu(Je,Math.max(B-4,40),Wt),be=!1;for(let[Ce,Mt]of[[0,Je],[1,Je],[2,Je],[0,Me]]){if(!Mt)continue;let Gt=yo([Ke[0],Ke[1]-Ce*le],Mt,vn);if(!(Gt.rect[1]<v+12)&&!(C[Ce].some(Xt=>ti(Gt.rect,Xt))||Rn.some(Xt=>ti(Gt.rect,Xt)))){C[Ce].push(Gt.rect),Rn.push(Gt.rect),ba(Mt,Gt,vn),q.hot&&Mt===Je&&(Ar=!0),be=!0;break}}!be&&(q.size,a.S)}let Ee=[],we=new Set,pt=[];for(let q of te.values()){if(!q.open||!q.group.visible)continue;let ee=q.cl,_e=re(ee),fe=Kt(ee.x-.1,ee.y+.1,_e.zf),He=Kt(ee.x+_e.w+.1,ee.y-_e.h-.1,_e.zf);fe[2]<=1&&He[2]<=1&&pt.push([Math.min(fe[0],He[0]),Math.min(fe[1],He[1]),Math.max(fe[0],He[0]),Math.max(fe[1],He[1])])}let Ue=(q,ee,_e,fe)=>{if(!pt.length)return!1;let He=Kt(q.x,_e,ee),Ke=Kt(q.x+q.w,fe,ee),Je=[Math.min(He[0],Ke[0]),Math.min(He[1],Ke[1]),Math.max(He[0],Ke[0]),Math.max(He[1],Ke[1])];return pt.some(Wt=>ti(Je,Wt))};for(let q of nn.values()){let ee=q.a*q.rowsA*(1-ve(q.u)),_e=q.p.module;if(Pe&&Pe.modules.has(_e)&&q.a>.5&&q.u<.5)for(let Je of q.b.rows)Pe.slots.has(`${_e}|${Je.slot}`)&&Ee.push({o:q,r:Je});if(ee<.2||q.tier===3)continue;let fe=q.b,He=q.p.z+fe.d+.012,Ke=ee*So(fe.x,0,q.p.z);for(let Je of fe.rows){if(Ue(fe,He,-Je.y,-Je.y-Je.h))continue;let Wt=Pe&&Pe.slots.has(`${_e}|${Je.slot}`),vn=y(Je.id),Dt=vn?s.lit:Wt?f?s.muted:s.lit:q.tier===1?Je.kind==="class"?s.soft:s.text:s.muted,C=fe.x+(Je.kind==="class"?.2:.18),le=Je.clone?p(g(t.modFront,t.cloneFill,t.cloneFillA)):rt(Je.kind==="class"?t.classRow:t.modFront);if(Yc(C,fe.x+fe.w-.08,-Je.y,Je.h,fe.line,He,Je.lines,{sizes:Je.wrapper?[a.S]:[a.M,a.S],weight:m(Je)?700:400,color:Dt,alpha:Ke*(Pe&&!Wt&&!o?.45:1),halo:le,kind:"row"})){we.add(Je.id),vn&&(Ar=!0);let Me=Ee.findIndex(be=>be.r===Je);Me>=0&&Ee.splice(Me,1)}}for(let Je of fe.ghosts){if(Je.id===null||Ue(fe,He,-Je.y,-Je.y-Je.h))continue;let Wt=Pe&&Pe.depth.has(Je.id);Yc(fe.x+.18,fe.x+fe.w-.1,-Je.y,Je.h,fe.line,He,Je.lines,{sizes:[a.S],color:Wt?s.lit:s.text,alpha:Ke,halo:p(g(t.modFront,t.deadFill,t.deadFillA)),kind:"row"})&&we.add(Je.id)}}let ut=l==="module"?s.text:s.muted,gt=new Set;for(let q of te.values()){let ee=nn.get(q.cl.module),_e=q.a*ee.a*ve(ee.u);if(_e<.2||!q.group.visible)continue;let fe=q.cl,He=re(fe),Ke=He.zf+.01,Je=_e*So(fe.x,fe.y,fe.z),Wt=y(fe.id),vn=Pe&&Pe.classes.has(fe.id),Dt=Kt(fe.x,fe.y,Ke),C=Kt(fe.x+He.w,fe.y,Ke),B=De.box_head*Math.hypot(C[0]-Dt[0],C[1]-Dt[1])/He.w>=2.4*a.S,Me=Qs(fe.x+.1,fe.x+He.w-.1,fe.y-De.box_head*(B?.36:.5),Ke,fe.name,{h:B?De.box_head*.5:De.box_head,sizes:[a.M,a.S],room:1.05,weight:700,color:Wt?s.lit:vn?s.text:ut,alpha:Je,halo:rt(t.boxHead),kind:"card"});if(Me&&(Me==="full"&&we.add(fe.id),B&&Qs(fe.x+.1,fe.x+He.w-.1,fe.y-De.box_head*.78,Ke,fe.data_only?"DATACLASS":"CLASS",{h:De.box_head*.5,sizes:[a.S],room:1,color:s.dim,alpha:Je,spacing:"0.06em",kind:"caption"}),He.rows.forEach((be,Ce)=>{let Mt=at.get(be),Gt=We(fe,Ce),Xt=Pe&&Pe.depth.has(be),sn=y(be)?s.lit:Xt?s.text:Mt.private?s.muted:ut;Qs(fe.x+.16,fe.x+fe.w-.08,Gt,Ke,Mt.name+(be===fe.ctor?"("+Mt.params.filter($t=>$t!=="self").join(", ")+")":""),{h:De.box_row,sizes:[a.M,a.S],room:1.05,minChars:7,weight:m(Mt)?700:400,color:sn,alpha:Je*(Pe&&!Xt?.4:1),halo:rt(t.boxFront),kind:"card"})==="full"&&(gt.add(be),we.add(be))}),fe.data_only&&fe.fields.forEach((be,Ce)=>Qs(fe.x+.12,fe.x+He.w-.08,fe.y-De.box_head-De.box_field*(Ce+.5),Ke,(be.kind==="owned"?"\u25C6 ":be.kind==="injected"?"\u25C7 ":"  ")+be.name,{h:De.box_field,sizes:[a.S],room:.95,color:s.muted,alpha:Je,kind:"card"})),He.open&&fe.fields.length&&!fe.data_only)){let be=fe.x+fe.w+.45;Qs(be-.15,fe.x+He.w-.06,fe.y-De.box_head*.78,Ke,"state",{h:De.box_head*.55,sizes:[a.S],room:.95,color:s.dim,alpha:Je,kind:"caption"}),fe.fields.forEach((Ce,Mt)=>Qs(be-.15,fe.x+He.w-.06,fe.y-De.box_head-De.box_field*(Mt+.5),Ke,(Ce.kind==="owned"?"\u25C6 ":Ce.kind==="injected"?"\u25C7 ":"  ")+Ce.name,{h:De.box_field,sizes:[a.S],room:.95,color:Ce.kind?ut:s.dim,alpha:Je,kind:"card"}))}}let ze=[];for(let q of is.values()){if(!q.border.visible||q.border.material.opacity<.3)continue;let ee=q.n,_e=q.border.material.opacity*So(ee.x,ee.y,ee.z);if(pt.length){let Dt=Kt(ee.x,ee.y,ee.z),C=Kt(ee.x+ee.w,ee.y-ee.h,ee.z);if(pt.some(le=>ti([Math.min(Dt[0],C[0]),Math.min(Dt[1],C[1]),Math.max(Dt[0],C[0]),Math.max(Dt[1],C[1])],le)))continue}let fe=y(ee.id),He=Pe&&Pe.depth.has(ee.id),Ke=fe?s.lit:ee.dead||He||!o&&l==="module"?s.text:s.muted,Je=ee.dead?g(t.card,t.deadFill,t.deadFillA):ee.clone!==null?g(t.card,t.cloneFill,t.cloneFillA):t.card,Wt=ee.lines??[ee.name];Yc(ee.x+.1,ee.x+ee.w-.05,ee.y,ee.h,Math.min(.24,ee.h/Wt.length),ee.z+.02,Wt,{sizes:ee.wrapper?[a.S]:[a.M,a.S],room:1.05,weight:m(ee)?700:400,alpha:_e,color:Ke,halo:p(Je),kind:"card"})?(we.add(ee.id),fe&&(Ar=!0)):He&&ze.push([Pe.depth.get(ee.id),ee,ee.cls?`${qe.get(ee.cls).name}.${ee.name}`:ee.name])}if(o)for(let q of o.evidence){let ee=at.get(q);if(we.has(q)||gt.has(q))continue;let _e=em(q),fe=ee?ee.cls?`${qe.get(ee.cls)?.name}.${ee.name}`:ee.name:qe.get(q).name;bo(_e[0],_e[1],_e[2],fe,{size:a.M,align:"center",dy:-6,pill:!0,pillLine:r.pillLineStrong,color:s.lit,weight:700,kind:"callout"},[[0,0],[0,-18],[0,16],[0,-36],[-90,0],[90,0]])}o&&o.stub==="pill"&&rm(o,f);let St=o?tm:1/0,xt=new Set(o&&o.part==="pipeline"?o.evidence.map(q=>Vn(q)):[]);{let q=new Map;for(let{o:ee,r:_e}of Ee){if(o&&o.evidence.includes(_e.id)||Ue(ee.b,ee.p.z+ee.b.d,-_e.y,-_e.y-_e.h))continue;if(o&&o.part==="pipeline"){if(xt.has(ee.p.module))continue;xt.add(ee.p.module)}if(St--<=0)break;let fe=q.get(ee)??0;q.set(ee,fe+1);let He=ee.b;bo(He.x+He.w/2,-ee.h,ee.p.z+He.d,_e.name,{size:a.M,align:"center",dy:18+fe*18,pill:!0,color:s.text,weight:m(_e)?700:400,kind:"callout"},[[0,0],[0,18],[0,36],[-70,0],[70,0],[0,54],[-70,18],[70,18],[0,72]])}}ze.sort((q,ee)=>(ee[1].id===P.selected?.id)-(q[1].id===P.selected?.id)||q[0]-ee[0]||q[1].y-ee[1].y);for(let[,q,ee]of ze){if(o&&o.evidence.includes(q.id))continue;if(o&&o.part==="pipeline"){if(xt.has(q.module))continue;xt.add(q.module)}if(St--<=0)break;let _e={size:a.M,align:"center",dy:-5,pill:!0,color:s.text,weight:m(q)?700:400,force:q.id===P.selected?.id,kind:"callout"};o?bo(q.x+q.w/2,q.y,q.z+.02,ee,_e,[[0,0],[0,-16],[0,16],[-70,0],[70,0],[0,-32]]):Qp(q.x+q.w/2,q.y,q.z+.02,ee,_e)}if(P.scope){let q=new Map;for(let _e of[...gn,...Bi]){if(!_e.stub?.label||_e.a<(o?.5:.3))continue;let fe=_e.stub.label;q.has(fe.key)||q.set(fe.key,{...fe,pts:[],others:new Set}),q.get(fe.key).pts.push(fe.at),q.get(fe.key).others.add(Ne.get(fe.other).name)}let ee=[[0,0],[0,-12],[0,-24],[0,-36],[-60,0],[60,0],[-60,-12],[60,-12],[0,-48]];for(let _e of[...q.values()].sort((fe,He)=>fe.key.localeCompare(He.key))){let fe=`${_e.out?"\u2192":"\u2190"} ${[..._e.others].sort().join(" \xB7 ")}`,He=Math.max(..._e.pts.map(Ke=>Ke[1]));if(_e.kind==="sky"){He=Math.max(He,lt.skyBase(ie.get(_e.module).plate)-.2);let Ke=_e.pts.reduce((Je,Wt)=>Je+Wt[0],0)/_e.pts.length;bo(Ke,He,_e.z,fe,{size:a.S,align:"center",color:s.muted,halo:!0,dy:-4,kind:"port"},ee)}else{let Ke=_e.side==="right";bo(_e.x,He,_e.z,fe,{size:a.S,align:Ke?"left":"right",dx:Ke?2:-2,color:s.muted,halo:!0,dy:-5,kind:"port"},[[0,0],[0,-12],[0,12],[0,-24],[0,24]])}}}let Ae=P.hover;if(Ae&&!Ar){let q=at.get(Ae),ee=qe.get(Ae);Zc(q?q.cls?`${qe.get(q.cls).name}.${q.name}`:q.name:ee?ee.name:"",q?q.module:ee?ee.module:"")}else if(P.hoverBox&&!Ae&&!Ar){let q=ie.get(P.hoverBox),ee=q.box,_e=ee.rows.length+(ee.more?ee.more.lines:0);Zc(q.name+".py",_e?`${q.module}`:`${q.module} \xB7 no public names`)}else if(P.hoverLine?.startsWith("call:"))sm(+P.hoverLine.slice(5));else if(P.hoverLine){let[q,ee]=P.hoverLine.split(":");Zc(ih(q,+ee),xd(q,+ee))}}let im=o=>{let l=at.get(o);return l?l.dead?"dead":l.clone!==null?"clone":l.lb?"lb":null:null};function Ku(o,l,h,f){let S=im(f);S&&(V.fillStyle=rt(t[S]),V.fillRect(o+2,l+3,3,h-6))}function sm(o){let l=se.edges[o],h=`${Ea(l.s)} \u2192 ${Ea(l.t)}`,f=l.ms===l.mt?`inside ${ie.get(l.ms).name}.py`:`${ie.get(l.ms).name}.py \u2192 ${ie.get(l.mt).name}.py`,[S,y]=P.mouse;V.font=`700 ${a.M}px ${M}`,V.letterSpacing="0px";let T=V.measureText(h).width;V.font=`400 ${a.S}px ${M}`;let R=V.measureText(f).width,L=Math.max(T,R)+14,U=32,J=[l.s,l.t].map(Ue=>{let ut=Ma(Ue,P.open,P.expanded),gt=Kt(ut.x0,ut.y0,ut.z),ze=Kt(ut.x1,ut.y1,ut.z);return[Math.min(gt[0],ze[0])-4,Math.min(gt[1],ze[1])-4,Math.max(gt[0],ze[0])+4,Math.max(gt[1],ze[1])+4]}),k=[[12,-U-16],[-L-12,-U-16],[12,16],[-L-12,16],[-L-16,-U/2],[16,-U/2],[12,-U-44],[-L-12,-U-44],[12,44],[-L-12,44],[12,-U-80],[-L-12,-U-80],[-L/2,-U-110],[12,80],[-L-12,80],[-L/2,120]].map(([Ue,ut])=>[he(S+Ue,A+4,Cr-L-6),he(y+ut,v+14,Se-F-U-4)]),oe=Ue=>!J.some(ut=>ti([Ue[0],Ue[1],Ue[0]+L,Ue[1]+U],ut)),Ee=Ue=>oe(Ue)&&!Rn.some(ut=>ti([Ue[0],Ue[1],Ue[0]+L,Ue[1]+U],ut)),[we,pt]=k.find(Ee)??k.find(oe)??k[0];V.globalAlpha=1,V.fillStyle=r.pill,V.strokeStyle=r.pillLineStrong,V.lineWidth=1,V.beginPath(),V.roundRect(we,pt,L,U,4),V.fill(),V.stroke(),Ku(we,pt,U,l.t),V.fillStyle=s.lit,V.font=`700 ${a.M}px ${M}`,V.fillText(h,we+7,pt+13),V.fillStyle=s.dim,V.font=`400 ${a.S}px ${M}`,V.fillText(f,we+7,pt+26),as.push({size:a.M,text:h,full:h,x:we,y:pt,kind:"pill"})}function rm(o,l){let h=new Map,f=[...nn.values()].filter(y=>y.a>.15).map(y=>({m:y.p.module,r:Zu(y)})).filter(y=>y.r),S=(y,T)=>Rn.some(R=>ti(y,R))||f.some(R=>R.m!==T&&ti(y,R.r));for(let y of o.pills){let T=Ma(y.at,P.open,P.expanded),R=y.dir==="out",L=Vn(y.at),U=!P.open.has(L),J=(T.y0+T.y1)/2,k=Kt(R?T.x1:T.x0,J,T.z);if(k[2]>1)continue;let oe=U?`${L}|${y.dir}`:`${y.at}|${y.dir}`,Ee=h.get(oe)??0;h.set(oe,Ee+1);let we=!!l&&l.edges.has(y.edge),pt=`${R?"\u2192":"\u2190"} ${y.name}`,Ue=` \xB7 ${y.package}`,ut=`700 ${a.M}px ${M}`,gt=`400 ${a.S}px ${M}`,ze=Tr(pt,ut)+Tr(Ue,gt)+12,St=16,xt=4,Ae,q,ee;if(U){let _e=nn.get(L),fe=_e.b,He=Kt(R?fe.x+fe.w:fe.x,-_e.h,T.z),Ke=k[0]+(R?5:-5);Ae=R?Ke-8:Ke+8-ze,Ae+ze>Cr-8&&(Ae=Ke+8-ze),Ae<A+6&&(Ae=Ke-8),q=He[1]+8+Ee*(St+xt);for(let Je=0;Je<40&&S([Ae,q,Ae+ze,q+St],L);Je++)q+=6;ee=[[k[0],k[1]],[Ke,k[1]],[Ke,q]]}else{Ae=R?k[0]+14:k[0]-14-ze,Ae=he(Ae,A+6,Cr-8-ze),q=k[1]-St/2+Ee*(St+xt);for(let _e=0;_e<12&&S([Ae,q,Ae+ze,q+St],L);_e++)q+=St+xt;ee=[[k[0],k[1]],[R?Ae:Ae+ze,q+St/2]]}Rn.push([Ae-2,q-2,Ae+ze+2,q+St+2]),V.save(),V.globalAlpha=1,V.strokeStyle=we?s.lit:s.muted,V.lineWidth=we?1.6:1,V.beginPath(),ee.forEach(([_e,fe],He)=>He?V.lineTo(_e,fe):V.moveTo(_e,fe)),V.stroke(),V.fillStyle=r.pill,V.strokeStyle=we?s.lit:r.pillLine,V.lineWidth=1,V.beginPath(),V.roundRect(Ae,q,ze,St,3),V.fill(),V.stroke(),Ku(Ae-1,q,St,y.other),V.textBaseline="middle",V.font=ut,V.fillStyle=we?s.lit:s.text,V.fillText(pt,Ae+6,q+St/2+.5),V.font=gt,V.fillStyle=s.muted,V.fillText(Ue,Ae+6+Tr(pt,ut),q+St/2+.5),V.restore(),as.push({size:a.S,text:pt+Ue,full:pt+Ue,x:Ae,y:q,kind:"stubpill",edge:y.edge})}V.textBaseline="alphabetic"}function Zc(o,l){let[h,f]=P.mouse;V.font=`700 ${a.L}px ${M}`;let S=V.measureText(o).width;V.font=`400 ${a.S}px ${M}`;let y=V.measureText(l).width,T=Math.max(S,y)+16,R=he(h+14,0,ue-T-4),L=f+14;V.globalAlpha=1,V.fillStyle=r.tooltip,V.strokeStyle=r.tooltipLine,V.beginPath(),V.roundRect(R,L,T,34,5),V.fill(),V.stroke(),V.fillStyle=s.text,V.font=`700 ${a.L}px ${M}`,V.fillText(o,R+8,L+15),V.fillStyle=s.dim,V.font=`400 ${a.S}px ${M}`,V.fillText(l,R+8,L+28),as.push({size:a.S,text:o,full:o,x:R,y:L,kind:"tooltip"})}let As=new jo;function om(o,l){for(let h of Uc(o.b))if(l>=h.y&&l<h.y+h.h)return h;return null}let am=!1;function Ju(o,l){let h=new yt(o/ue*2-1,-(l/Se)*2+1);As.setFromCamera(h,_),As.near=0,As.far=1/0;let f=_.getWorldDirection(ne()),S=k=>{if(am)return!0;let oe=k.point.clone().sub(_.position).dot(f);return oe<_.near||oe>_.far?!1:!(zi!==null&&k.point.z>zi+.001||Re!==null&&k.point.z<Re-.001)};As.params.Line2={threshold:4};let y=[...on,...gn].filter(k=>k.line.visible&&k.a>.25).map(k=>k.line),T=As.intersectObjects(y,!1).filter(S);if(T.length)return{kind:"call",id:T[0].object.userData.id};let R=[];for(let k of is.values())k.mesh.visible&&k.border.material.opacity>.2&&R.push(k.mesh);for(let k of te.values())k.group.visible&&k.mats[4].opacity>.1&&R.push(k.box);for(let k of nn.values())k.a>.1&&!k.sil&&R.push(k.body);let L=As.intersectObjects(R,!1).filter(S);if(L.length){let k=L[0],oe=k.object.userData;if(oe.type==="node")return{kind:"node",id:oe.id};if(oe.type==="module"){let ut=nn.get(oe.id),gt=-k.point.y;if(gt<De.mod_header)return{kind:"module",id:oe.id,part:"head"};if(ut.u>.5)return{kind:"module",id:oe.id,part:"body"};let ze=om(ut,gt);return ze?ze.slot==="more"||ze.slot==="tail"||ze.slot==="ghost"?{kind:"module",id:oe.id,part:ze.slot==="more"?"more":"tail"}:ze.kind==="class"?{kind:"class",id:ze.id,module:oe.id}:{kind:"node",id:ze.id,module:oe.id}:{kind:"module",id:oe.id,part:"body"}}let Ee=qe.get(oe.id),we=re(Ee),pt=Ee.y-k.point.y;if(pt<De.box_head)return{kind:"class",id:Ee.id,part:"head"};if(we.tailY!==null&&k.point.y<we.tailY+De.box_tail/2)return{kind:"class",id:Ee.id,part:"tail"};let Ue=Math.floor((pt-De.box_head)/De.box_row);return!Ee.data_only&&Ue>=0&&Ue<we.rows.length?{kind:"node",id:we.rows[Ue]}:{kind:"class",id:Ee.id,part:"body"}}As.params.Line2={threshold:5};let U=[...Bi,...Sr].filter(k=>k.a>.25).map(k=>k.line),J=As.intersectObjects(U,!1).filter(S);return J.length?{kind:J[0].object.userData.type,id:J[0].object.userData.id}:null}function ju(o){let l=ln();if(!l||!o)return null;let h=l.evidence.includes(o.id);return o.kind==="node"&&(Pe?.depth.has(o.id)||h)?{kind:"node",id:o.id}:o.kind==="class"&&(Pe?.classes.has(o.id)||h)?{kind:"class",id:o.id}:o.kind==="link"&&Pe?.links.has(o.id)?{kind:"link",id:o.id}:o.kind==="call"&&Pe?.edges.has(gn[o.id])?{kind:"call",id:o.id}:null}let Sa=null;Vt.addEventListener("pointerdown",o=>{Sa=[o.clientX,o.clientY]}),Vt.addEventListener("pointermove",o=>{let l=Vt.getBoundingClientRect();if(P.mouse=[o.clientX-l.left,o.clientY-l.top],o.buttons)return;let h=Vt.getBoundingClientRect(),f=Ju(o.clientX-h.left,o.clientY-h.top),S=null,y=null,T=null;if(P.guide!==null){let R=ju(f);R?.kind==="link"||R?.kind==="call"?T=`${R.kind}:${R.id}`:R&&(S=R.id)}else{let R=f?.module&&nn.get(f.module).rowsA>.5;S=f&&(f.kind==="node"||f.kind==="class")&&(!f.module||R)?f.id:null,y=f&&(f.kind==="module"||f.module&&!R)?f.id&&f.kind==="module"?f.id:f.module:null,T=f&&(f.kind==="link"||f.kind==="plateribbon"||f.kind==="call")?`${f.kind}:${f.id}`:null}Vt.style.cursor=S||y||T?"pointer":"default",S!==P.hover||y!==P.hoverBox||T!==P.hoverLine?(P.hover=S,P.hoverBox=y,P.hoverLine=T,Cn()):(S||y||T)&&(Ge=!0,Sn())}),Vt.addEventListener("pointerleave",()=>{(P.hover||P.hoverBox||P.hoverLine)&&(P.hover=P.hoverBox=P.hoverLine=null,Cn())}),Vt.addEventListener("pointerup",o=>{if(!Sa||Math.hypot(o.clientX-Sa[0],o.clientY-Sa[1])>4||o.button!==0)return;let l=Vt.getBoundingClientRect(),h=Ju(o.clientX-l.left,o.clientY-l.top);if(P.guide!==null){let f=ju(h);f&&Mo(f,{fresh:!0});return}if(!h){ls(null);return}if(h.module&&!P.scope){Cs({kind:"package",id:ie.get(h.module).district});return}h.kind==="node"?ls({kind:"node",id:h.id}):h.kind==="class"&&h.module?ls({kind:"class",id:h.id}):h.kind==="class"&&(h.part==="head"||h.part==="tail")?((h.part==="tail"||P.selected?.id===h.id)&&ad(h.id),ls({kind:"class",id:h.id})):h.kind==="class"?ls({kind:"class",id:h.id}):h.kind==="module"?P.scope?(h.part!=="body"||P.open.has(h.id))&&ld(h.id):Cs({kind:"package",id:ie.get(h.id).district}):(h.kind==="link"||h.kind==="plateribbon"||h.kind==="call")&&ls({kind:h.kind,id:h.id})});let lm=.15,cm=.45,Qu=1.25,Kc=160;function ed(){return qn?{target:qn.goal.target.clone(),position:qn.goal.position.clone(),zoom:qn.goal.zoom??_.zoom}:{target:K.target.clone(),position:_.position.clone(),zoom:_.zoom}}function td(o,l){let h=ed(),f=xe(),S=ue-A-Math.max(x,f),y=Se-v-F,T=_.isOrthographicCamera?1/h.zoom:2*h.position.distanceTo(h.target)*Math.tan(Si.degToRad(hn.fov)/2)/Se;_.updateMatrixWorld();let R=ne().setFromMatrixColumn(_.matrixWorld,0),L=ne().setFromMatrixColumn(_.matrixWorld,1),U=R.multiplyScalar(o*S*T).add(L.multiplyScalar(l*y*T));Ts({target:h.target.add(U),position:h.position.add(U),zoom:h.zoom,ortho:!!_.isOrthographicCamera},Kc),Mi=null}function nd(o){let l=ed();_.isOrthographicCamera?Ts({target:l.target,position:l.position,zoom:l.zoom*o,ortho:!0},Kc):Ts({target:l.target,position:l.target.clone().add(l.position.clone().sub(l.target).multiplyScalar(1/o)),ortho:!1},Kc),Mi=null}function id(){P.guide!==null?Ts(jc(wt[P.guide])):Pe&&P.selected&&P.pulse?cd():Vi(P.view)}function hm(){if(!X("#help").classList.contains("hidden")){Jc(!1);return}if(!X("#key").classList.contains("hidden")){th(!1);return}if(P.inspect){od();return}if(P.guide!==null){let o=wt[P.guide];o.scope?.kind==="module"?(Qc(),Cs({kind:"package",id:ie.get(o.scope.id).district})):Qc({map:!0});return}if(P.selected){ls(null);return}P.scope?.kind==="module"?Cs({kind:"package",id:ie.get(P.scope.id).district}):P.scope?Cs(null):(Mi!=="view"||P.view!=="axo")&&pd()}function sd(o){P.proj=o??(P.proj==="ortho"?"persp":"ortho"),X("#projBtn").classList.toggle("on",P.proj==="ortho"),X("#projBtn").textContent=P.proj==="ortho"?"Orthographic":"Perspective",id(),Ao()}function Jc(o){let l=X("#help"),h=o??l.classList.contains("hidden");l.classList.toggle("hidden",!h),X("#helpBtn").classList.toggle("on",h),Ge=!0,Sn()}addEventListener("keydown",o=>{if(o.metaKey||o.ctrlKey||o.altKey)return;let l=o.key,h=P.guide!==null,f=o.shiftKey?cm:lm;if(l==="Backspace"){P.inspectBack.length&&(o.preventDefault(),rd());return}if(l==="ArrowLeft"||l==="ArrowRight"){o.preventDefault(),h?tr(P.guide+(l==="ArrowRight"?1:-1)):td(l==="ArrowRight"?f:-f,0);return}if(l==="ArrowUp"||l==="ArrowDown"){o.preventDefault(),td(0,l==="ArrowUp"?f:-f);return}if(h&&(l==="PageDown"||l==="PageUp")){o.preventDefault(),tr(P.guide+(l==="PageDown"?1:-1));return}if(l==="+"||l==="="){nd(Qu);return}if(l==="-"||l==="_"){nd(1/Qu);return}if(l==="Home"){o.preventDefault(),id();return}if(l==="Escape"){hm();return}if(l==="?"||l==="h"||l==="H"){Jc();return}if(l==="o"||l==="O"){sd();return}if(l==="k"){th();return}if(l==="K"){hh(!ir);return}if(l==="t"||l==="T"){uh(e==="dark"?"light":"dark");return}if(l==="p"||l==="P"){Hc(),Ge=!0,Sn();return}if(!h&&(l==="g"||l==="G")){fd();return}if(!h){if(l==="1"&&Vi("axo"),l==="2"&&Vi("plan"),l==="3"&&Vi("elev"),(l==="e"||l==="E")&&P.selected){let S=P.selected.kind==="class"?P.selected.id:at.get(P.selected.id)?.cls;S&&P.open.has(qe.get(S).module)&&ad(S)}if((l==="u"||l==="U")&&P.scope){let S=P.hoverBox??(P.selected&&P.selected.kind!=="call"?Vn(P.selected.id):null);S&&ld(S)}}});let um=[["Move",null],["\u2190 \u2192 \u2191 \u2193","move the view by 15 % of the picture (in the guide \u2190 \u2192 step, \u2191 \u2193 move)"],["Shift + arrow","move by 45 %"],["+  \u2212","zoom in and out about the centre"],["Home","fit the scope again (in the guide: the step)"],["mouse","drag orbits \xB7 right-drag pans \xB7 wheel zooms"],["Esc, in this order",null],["1 \xB7 overlay","close the help or the key"],["2 \xB7 inspector","close the inspector (what is lit stays)"],["3 \xB7 selection","clear the selection"],["4 \xB7 guide","leave the guide, one level above its step"],["5 \xB7 scope","up one level: module \u2192 package \u2192 all"],["Explore",null],["click box \xB7 header","scope its package \xB7 unfold the module"],["click row \xB7 call","select it and read its source"],["Backspace","inspector: back to what it showed before"],["u \xB7 e","unfold the hovered module \xB7 open the selected class"],["Views",null],["1  2  3","Axonometric \xB7 Plan \xB7 Elevation (off the guide)"],["o","orthographic or perspective Elevation"],["k \xB7 Shift+K","the key \xB7 collapse or show the legend"],["t","dark or light theme"],["?","this help"],["Guide",null],["\u2190 \u2192 \xB7 PgUp PgDn","previous and next step"],["click a lit mark","read its source; the step stays"],["g","resume the guide where you left it"],["p","replay the pulses of the lit pipeline"],["Calls",null],["hover a call","isolate it: caller \u2192 callee in a pill"],["hover a source line","light its drawn calls and callees"]];function dm(){let o=['<div class="hh">Keys</div><div class="hg">'];for(let[l,h]of um)o.push(h===null?`<div class="hs">${mt(l)}</div>`:`<div class="hk">${mt(l)}</div><div class="hv">${mt(h)}</div>`);o.push("</div>"),X("#help").innerHTML=o.join("")}K.addEventListener("change",()=>{Ge=!0,Sn()});function ls(o,{pulse:l=!1,keepBack:h=!1}={}){P.selected=o,P.pulse=!!o&&l,h||(P.inspectBack=[]),P.inspect=o,P.hoverCall=null,Cn("select")}function Mo(o,{fresh:l=!1}={}){l?P.inspectBack=[]:P.inspect&&P.inspectBack.push(P.inspect),P.guide!==null?(P.inspect=o,P.hoverCall=null,Cn("hover")):ls(o,{keepBack:!0})}function rd(){let o=P.inspectBack.pop();o&&(P.guide!==null?(P.inspect=o,P.hoverCall=null,Cn("hover")):ls(o,{keepBack:!0}))}function od(){P.inspectBack=[],P.hoverCall=null,P.inspect=null,Cn("hover")}function ad(o,l){let h=l??!P.expanded.has(o);if(h!==P.expanded.has(o)){if(h)P.expanded.add(o),Ye(qe.get(o)).liftTarget=1;else{P.expanded.delete(o);let f=te.get(o);f.liftTarget=0,f.rebuildOnClose=!0}ss(o),Cn("select")}}function er(o,l){if(l===P.open.has(o))return!1;if(l)P.open.add(o);else{P.open.delete(o);for(let h of se.classes)if(h.module===o&&P.expanded.has(h.id)){P.expanded.delete(h.id);let f=Ye(h);f.lift=0,f.liftTarget=0,f.group.position.z=h.z}}return nn.get(o).uTarget=l?1:0,Oi(o),Ip(o),!0}function ld(o,l){er(o,l??!P.open.has(o))&&(nr(),Cn("unfold"))}function Cs(o,{fly:l=!0,ms:h=360}={}){P.scope=o;let f=new Set(o?.kind==="module"?[o.id]:[]);for(let S of[...P.open])f.has(S)||er(S,!1);for(let S of f)er(S,!0);nr(),wo(),Cn("scope"),l&&Vi(o?P.view==="plan"?"plan":"elev":"axo",h)}function cd(o=360){if(!Pe)return;let l=[...Pe.modules],h=new Set(l.map(L=>ie.get(L).row)).size===1?"elev":"axo";P.view=h,document.querySelectorAll("#views [data-view]").forEach(L=>L.classList.toggle("on",L.dataset.view===h));let f=os[h],S=Math.max(...l.map(L=>ie.get(L).z))+Wc,y=[];for(let L of l){let U=ie.get(L),J=U.box;y.push(ne(J.x-De.gutter,.4,U.z+J.d),ne(J.x+J.w+De.gutter,$u(L)-.25,U.z+J.d))}for(let L of Pe.links.keys()){let U=Bi[L];if(!(U.l.span==="cross_row"||!l.includes(U.l.s)||!l.includes(U.l.t)))for(let J=0;J<U.n;J+=3)y.push(ne(U.pts[J*3],U.pts[J*3+1],U.pts[J*3+2]))}let T=new Fn().setFromPoints(y);T.pts=y,Mi="sel";let R=qc(T,f.az,f.el,.92,S,h==="elev");Ts(R,o),Cn("scope")}let fm=.98;function Ma(o,l,h){let f=at.get(o),S=Vn(o),y=ie.get(S),T=y.box;if(l.has(S)){if(f&&f.x!==void 0&&!(f.cls&&qe.has(f.cls)&&!f.dead))return{x0:f.x,x1:f.x+f.w,y0:f.y,y1:f.y-f.h,z:f.z};let L=qe.get(f?f.cls:o),U=h.has(L.id);return{x0:L.x,x1:L.x+(U?L.expanded.w:L.w),y0:L.y,y1:L.y-(U?L.expanded.h:L.h),z:L.z+L.d+(U?L.expanded.lift:0)}}let R=Rt.get(`${S}|${Er(o)}`);return{x0:T.x,x1:T.x+T.w,y0:-R.y,y1:-(R.y+R.h),z:y.z+T.d}}function jc(o){if(o.camera==="plan")return P.view="plan",$c(va(se.panes.map(oe=>oe.module),{plan:!0}),os.plan.az,os.plan.el,.93);if(o.camera==="map")return P.view="axo",$c(va(se.panes.map(oe=>oe.module)),os.axo.az,o.lod==="plate"?fm:os.axo.el,1.02);P.view="elev";let l=new Set(o.unfold),h=new Set(o.open),f=new Set(o.frame.modules),S=[];o.frame.modules.length&&!o.frame.nodes.length&&!o.frame.classes.length&&S.push(...va(o.frame.modules).pts);let y=oe=>{let Ee=ie.get(oe),we=Ee.box;S.push(ne(we.x-De.gutter,.7,Ee.z+we.d),ne(we.x+we.w+De.gutter,.7,Ee.z+we.d))};for(let oe of o.frame.nodes){let Ee=Vn(oe),we=Ma(oe,l,h);f.add(Ee),S.push(ne(we.x0-.3,we.y0+.3,we.z),ne(we.x1+.3,we.y1-.4,we.z)),y(Ee)}for(let oe of o.frame.classes){let Ee=qe.get(oe),we=Ma(oe,l,h);f.add(Ee.module),S.push(ne(we.x0-.5,we.y0+.9,we.z),ne(we.x1+.5,we.y1-.3,we.z)),y(Ee.module)}for(let[oe]of o.lit_edges){let Ee=se.edges[oe];if(Ee.ms===Ee.mt)continue;let we=dt.get(oe),pt=l.has(Ee.ms)||l.has(Ee.mt)?gn[oe]:Bi[we];if(!o.off_edges.includes(oe)&&!(Ee.span!=="plate"&&Ee.span!=="row")&&!(o.home_row!==null&&ie.get(Ee.ms).row!==ie.get(Ee.mt).row))for(let Ue=0;Ue<pt.n;Ue+=3)S.push(ne(pt.pts[Ue*3],pt.pts[Ue*3+1],pt.pts[Ue*3+2]))}let T=new Fn().setFromPoints(S);T.pts=S;let R=[...f],L=[...Xu(o)??[]],U=Math.max(...(L.length?L:R).map(oe=>ie.get(oe).z))+Wc,J=o.camera==="raised"?os.elevRaised:os.elev,k=qc(T,J.az,J.el,.92,U,!0);if(k.ortho)k.zoom=Math.min(k.zoom,hd);else{let oe=k.position.clone().sub(k.target),Ee=oe.length(),we=Se/(2*hd*Math.tan(Si.degToRad(hn.fov)/2));Ee<we&&k.position.copy(k.target).addScaledVector(oe.normalize(),we)}return k}let hd=64;function ud(o){let l=new Set(o);for(let h of[...P.expanded])if(!l.has(h)){P.expanded.delete(h);let f=te.get(h);f.liftTarget=0,f.rebuildOnClose=!0,ss(h)}for(let h of l)P.expanded.has(h)||(P.expanded.add(h),Ye(qe.get(h)).liftTarget=1,ss(h))}function tr(o,{ms:l=360}={}){if(o<0||o>=wt.length)return;let h=wt[o];P.guide=o,P.resume=o,xn.add(o),P.scope=h.scope?{kind:h.scope.kind,id:h.scope.id}:null,P.selected=h.selected?{kind:h.selected.kind,id:h.selected.id}:null,P.pulse=!1,P.hover=P.hoverBox=P.hoverLine=null,P.inspect=null,P.inspectBack=[],P.hoverCall=null;let f=new Set(h.unfold);for(let y of[...P.open])f.has(y)||er(y,!1);for(let y of f)er(y,!0);ud(h.open),nr(),wo(),eh(),yd();let S=jc(h);Cn("guide"),document.querySelectorAll("#views [data-view]").forEach(y=>y.classList.toggle("on",y.dataset.view===P.view)),Ts(S,l),Mi="guide",Ao()}function Qc({map:o=!1}={}){P.guide!==null&&(P.guide=null,P.inspect=null,P.inspectBack=[],P.hoverCall=null,eh(),o?(dd(),Vi("axo")):(nr(),wo(),Cn("scope")),Ao())}function dd(){P.selected=null,P.scope=null,P.pulse=!1,P.inspect=null,P.inspectBack=[],P.hoverCall=null;for(let o of[...P.open])er(o,!1);ud([]),Gc(),nr(),wo()}function fd(o=P.resume){tr(o)}function pd(){if(P.guide!==null){Qc({map:!0});return}dd(),Vi("axo")}function eh(){let o=P.guide!==null;if(X("#guide").classList.toggle("hidden",!o),X("#side").classList.toggle("hidden",o),X("#top").classList.toggle("guiding",o),pm(),!o)return;let l=P.guide,h=wt[l],f=wt.filter(J=>J.part===h.part),S=f.indexOf(h)+1,y=h.part==="chapter"?`Step ${h.label} \xB7 chapter ${S} of ${f.length}`:h.part==="pipeline"?`Step ${h.label} \xB7 pipeline ${S} of ${f.length}`:`Step ${h.label} \xB7 signal ${S} of ${f.length}`,T=J=>mt(J).replace(/\.(?=[A-Za-z_])/g,".\u200B"),R=[`<div class="gh"><b>Guide</b> \xB7 ${mt(Yt.title)}</div>`,`<div class="gp">${y}</div>`,`<h2>${mt(h.title)}</h2>`,`<p class="gb">${T(h.body)}</p>`];if(h.evidence.length&&!h.list){R.push('<div class="gs">Evidence</div><div class="fl-wrap ev-wrap">');for(let J of h.evidence){let k=at.get(J),oe=qe.get(J),Ee=oe?oe.name:k.cls?`${qe.get(k.cls).name}.${k.name}`:k.name;R.push(`<div class="ev" data-ev="${mt(J)}">${mt(Ee)} <span>${mt((oe??k).module.split(".").pop())}.py</span></div>`)}R.push("</div>")}if(R.push('<div class="gs">In the picture</div><div id="gmarks"></div>'),h.list){let J=h.list.reduce((k,oe)=>k+oe.ids.length,0);R.push(`<div class="gs">${h.part==="pipeline"?`${J} functions, in call order`:`${J} function${J===1?"":"s"}`}</div><div class="fl-wrap">`);for(let k of h.list){let oe=k.ids.map(Ee=>{let we=at.get(Ee);return`<span class="fn" data-ev="${mt(Ee)}">${mt(we.cls&&!k.module?`${qe.get(we.cls).name}.${we.name}`:we.name)}</span>`});R.push(`<div class="fl"><span class="fm">${mt(k.name)}</span> ${oe.join("\xA0\xB7 ")}</div>`)}R.push("</div>")}else R.push('<div class="grow"></div>');let L=wt[l+1];R.push(`<div class="gnav"><button class="prev" ${l===0?"disabled":""} title="Previous step (\u2190)">\u2190</button><button class="next" ${L?"":"disabled"} title="Next step (\u2192)">${L?`Next \xB7 ${mt(L.title)} \u2192`:"End of the guide"}</button></div>`),R.push('<div class="hint">\u2190 \u2192 step \xB7 \u2191 \u2193 move \xB7 + \u2212 zoom \xB7 click a lit name to read its source \xB7 esc leaves the guide \xB7 ? keys</div>');let U=X("#guide");U.innerHTML=R.join(""),Ed(Rr),lh=null,U.querySelector(".prev").addEventListener("click",()=>tr(l-1)),U.querySelector(".next").addEventListener("click",()=>tr(l+1)),U.querySelectorAll("[data-ev]").forEach(J=>J.addEventListener("click",()=>{let k=J.dataset.ev;Mo({kind:qe.has(k)?"class":"node",id:k},{fresh:!0})}))}function pm(){let o=X("#rail"),l=P.guide===null,h=l?P.resume:P.guide;o.classList.toggle("away",l);let f=[];l&&f.push('<button class="resume" title="Back to the step you left (g)">Resume guide \u25B8</button>');let S=null;wt.forEach((y,T)=>{let R=`${T===h?" cur":""}${xn.has(T)?" seen":""}`;y.part==="chapter"?f.push(`<span class="seg${R}" data-i="${T}" title="${mt(y.title)}"><b>${mt(y.label)}</b>${mt(y.title)}</span>`):(y.part!==S&&f.push(`<span class="gl">${y.part==="pipeline"?"pipelines":"signals"}</span>`),f.push(`<i class="dot${R}" data-i="${T}" title="${mt(y.title)}"></i>`)),S=y.part}),f.push('<span class="sp"></span>',`<span class="count">${l?"exploring \xB7 ":""}step ${h+1} of ${wt.length}</span>`),o.innerHTML=f.join(""),o.querySelectorAll("[data-i]").forEach(y=>y.addEventListener("click",()=>tr(+y.dataset.i))),o.querySelector(".resume")?.addEventListener("click",()=>fd())}function th(o){let l=X("#key"),h=o??l.classList.contains("hidden");l.classList.toggle("hidden",!h),X("#keyBtn").classList.toggle("on",h),X("#legend").classList.toggle("hidden",h),Ge=!0,Sn()}function md(o){let l=[],h=(f,S)=>`${f} ${S}${f===1?"":"s"}`;return o.dead&&l.push(`<span title="${h(o.dead,"dead function")}"><i class="dead"></i> ${o.dead}</span>`),o.clones&&l.push(`<span title="${h(o.clones,"clone")}"><i class="clone"></i> ${o.clones}</span>`),o.load_bearing&&l.push(`<span title="${h(o.load_bearing,"load-bearing function")}"><i class="lb"></i> ${o.load_bearing}</span>`),`<span class="mk">${l.join(" ")}</span>`}function nr(){let o=X("#tree"),l=[];for(let S of se.districts){let y=S.modules.map(U=>ie.get(U)).sort((U,J)=>U.row-J.row||U.x-J.x),T=U=>y.reduce((J,k)=>J+k[U],0),R=P.scope?.kind==="package"&&P.scope.id===S.package;if(l.push(`<div class="row pkg ${R?"on":""}" data-pkg="${mt(S.package)}"><span class="nm">${mt(S.name)}</span>${md({dead:T("dead"),clones:T("clones"),load_bearing:T("load_bearing")})}</div>`),P.scope&&(P.scope.id===S.package||S.modules.includes(P.scope.id)))for(let U of y){let J=P.scope?.kind==="module"&&P.scope.id===U.module||P.open.has(U.module);l.push(`<div class="row mod ${J?"on":""}" data-mod="${mt(U.module)}"><span class="nm">${mt(U.name)}.py</span>${md(U)}</div>`)}}o.innerHTML=l.join("");let h=Aa(),f={dead:"dead",clone:"clone",lb:"load_bearing"};o.querySelectorAll(".mk i").forEach(S=>S.replaceWith(oh(h[f[S.className]],34,14,22,9))),o.querySelectorAll("[data-pkg]").forEach(S=>S.addEventListener("click",()=>Cs(P.scope?.id===S.dataset.pkg?null:{kind:"package",id:S.dataset.pkg}))),o.querySelectorAll("[data-mod]").forEach(S=>S.addEventListener("click",()=>Cs({kind:"module",id:S.dataset.mod})))}function wo(){let o=X("#crumbs"),l=['<a data-c="">all packages</a>'];if(P.scope){let h=zu();l.push(`<span class="gt">\u203A</span><a data-c="pkg:${h}" class="${P.scope.kind==="package"?"cur":""}">${Ie.get(h).name}</a>`),P.scope.kind==="module"&&l.push(`<span class="gt">\u203A</span><a class="cur">${ie.get(P.scope.id).name}.py</a>`)}o.innerHTML=l.join(" "),o.querySelectorAll("[data-c]").forEach(h=>h.addEventListener("click",()=>{if(P.guide!==null)return;let f=h.dataset.c;Cs(f?{kind:"package",id:f.slice(4)}:null)}))}function wa(o){let l=at.get(o),h=l.cls?`${qe.get(l.cls)?.name}.${l.name}`:l.name;return`<div class="ln" data-sel="${mt(o)}">${mt(h)} <span class="dim">${mt(l.module.split(".").pop())}</span></div>`}let nh={same_module:"same module",cross_module:"call",into_class:"into class",intra_class:"inside class",constructs:"constructs"},gd={plate:"same plate \xB7 track",row:"same row \xB7 via side ports",cross_row:"other row \xB7 arc"},Ea=o=>{let l=at.get(o);return l?l.cls?`${qe.get(l.cls)?.name}.${l.name}`:l.name:`${qe.get(o).name}()`},_d=(o,l)=>{let h=Rt.get(`${o}|${l}`);return l==="tail"?"internals":l==="more"?"more public names":h?.name??"dead"};function ih(o,l){if(o==="plateribbon"){let f=se.plate_bundles[l];return`${Ne.get(f.s).name} \u2192 ${Ne.get(f.t).name}`}let h=se.links[l];return`${ie.get(h.s).name}.${_d(h.s,h.ss)} \u2192 ${ie.get(h.t).name}.${_d(h.t,h.ts)}`}function xd(o,l){if(o==="plateribbon"){let f=se.plate_bundles[l];return`package pair \xB7 ${f.count} call${f.count===1?"":"s"} in ${f.bundles.length} module pair${f.bundles.length===1?"":"s"}`}let h=se.links[l];return`${gd[h.span]} \xB7 ${h.count} call${h.count===1?"":"s"}`}let sh=null,cs=null,ni=null,Ta=null,Eo=o=>{let l=at.get(o);return l?l.cls&&qe.has(l.cls)?`${qe.get(l.cls).name}.${l.name}`:l.name:qe.get(o)?.name??String(o)},mm=o=>o.kind==="node"||o.kind==="class"?Eo(o.id):ih(o.kind,o.id),vd=o=>(at.get(o)??qe.get(o))?.module;function gm(o){let l=se.edges[o[4]];return`calls ${Eo(l.t)} \xB7 ${vd(l.t).split(".").pop()}.py \xB7 ${nh[l.kind]} (click to open)`}function rh(o){let l=et[o];if(!l)return'<div class="v pad">no source excerpt in the snapshot</div>';cs=l;let f=(y=>l.sites.filter(T=>T[3]===y).length)("edge"),S=l.sites.length-f;return`<div class="s">source <span class="sk"><span class="u">${f} linked</span>${S?` \xB7 <i class="mk"></i> ${S} not drawn`:""}</span></div><div class="code">${Rp(l,gm)}</div>`}function _m(o){let l=[];return o.exported&&l.push(`<span class="tag bold" title="exported from ${mt(o.exported_from.join(", "))}">entry surface \xB7 ${mt(o.exported_from[0]??"")}</span>`),o.hub&&l.push('<span class="tag lb">load-bearing \xB7 hub</span>'),o.orch&&l.push('<span class="tag lb">load-bearing \xB7 orchestrator</span>'),o.clone!==null&&l.push('<span class="tag clone">structural clone</span>'),o.wrapper&&l.push('<span class="tag">pass-through wrapper</span>'),o.dead&&l.push('<span class="tag dead">dead: private, unreachable</span>'),o.slot==="tail"&&l.push('<span class="tag">folded: internals</span>'),l.join("")}function yd(){let o=X("#inspector"),l=P.inspect;if(!l){o.classList.contains("hidden")||(o.classList.add("hidden"),Ge=!0,Sn()),sh=null,cs=null,ni=null,Ta=null;return}let h=`${l.kind}:${l.id}|${P.inspectBack.length}`;if(h===sh&&!o.classList.contains("hidden"))return;sh=h,cs=null,ni=null,Ta=null,o.classList.remove("hidden"),o.style.width=`${G}px`,Ge=!0,Sn();let f=P.inspectBack[P.inspectBack.length-1],S=`<div class="inav">${f?`<button class="back" title="Back (Backspace)">\u2190 ${mt(mm(f))}</button>`:'<span class="ik">inspector</span>'}<span class="sp"></span><button class="close" title="Close (Esc)">\xD7</button></div>`,y="",T="";if(l.kind==="node"){let R=at.get(l.id),L=et[R.id],U=_m(R);y=`<div class="t">${mt(Eo(R.id))}</div><div class="q">${mt(R.module)} \xB7 ${L?`lines ${L.start}\u2013${L.end}`:`line ${R.line}`}</div>${U?`<div class="tags">${U}</div>`:""}`,R.doc&&R.doc!=="No docstring"&&(T+=`<div class="note">${mt(R.doc)}</div>`),T+=rh(R.id);let J=se.callers[R.id];T+=`<div class="s">called by</div>${J.length?J.map(wa).join(""):'<div class="v">no resolved caller</div>'}`;let k=se.reach[R.id].length-1;T+=`<div class="s">static reach</div><div class="v">${k} function${k===1?"":"s"} below this one</div>`}else if(l.kind==="call"){let R=se.edges[l.id];y=`<div class="t">${mt(Ea(R.s))} \u2192 ${mt(Ea(R.t))}</div><div class="q">${mt(ie.get(R.ms).name)}.py \u2192 ${mt(ie.get(R.mt).name)}.py \xB7 ${nh[R.kind]}${R.ms!==R.mt?" \xB7 "+gd[R.span]:""}</div>`,T+=`<div class="s">caller</div>${wa(R.s)}`,T+=`<div class="s">callee</div>${at.get(R.t)?wa(R.t):`<div class="ln" data-cls="${mt(R.t)}">${mt(qe.get(R.t).name)}</div>`}`,T+=rh(R.s)}else if(l.kind==="link"||l.kind==="plateribbon"){y=`<div class="t">${mt(ih(l.kind,l.id))}</div><div class="q">${mt(xd(l.kind,l.id))}</div>`;let R=l.kind==="link"?[se.links[l.id].members]:se.plate_bundles[l.id].bundles.map(L=>se.bundles[L].members);for(let L of R){let U=se.edges[L[0]];T+=`<div class="s">${mt(ie.get(U.ms).name)}.py \u2192 ${mt(ie.get(U.mt).name)}.py</div>`;for(let J of L){let k=se.edges[J];T+=`<div class="ln" data-sel="${mt(k.s)}">${mt(Eo(k.s))} <span class="dim">\u2192</span> ${mt(Eo(k.t))} <span class="dim">${nh[k.kind]}</span></div>`}}}else{let R=qe.get(l.id),L=et[R.id];y=`<div class="t">${mt(R.name)}</div><div class="q">${mt(R.module)} \xB7 ${L?`lines ${L.start}\u2013${L.end}`:`line ${R.line}`}</div><div class="tags">${R.exported?`<span class="tag bold" title="exported from ${mt(R.exported_from.join(", "))}">entry surface \xB7 ${mt(R.exported_from[0]??"")}</span>`:""}<span class="tag">${R.data_only?"data class":"class"}</span>${R.dead_private.length?`<span class="tag dead">${R.dead_private.length} dead private</span>`:""}</div>`,R.doc&&R.doc!=="No docstring"&&(T+=`<div class="note">${mt(R.doc)}</div>`);let U=k=>{let oe=at.get(k);return`<span class="ml" data-sel="${mt(k)}">${mt(oe.name)}${k===R.ctor?"()":""}</span>`};R.public.length&&(T+=`<div class="s">constructor and public methods</div><div class="mls">${R.public.map(U).join("")}</div>`),R.private.length&&(T+=`<div class="s">private methods</div><div class="mls">${R.private.map(U).join("")}</div>`),R.dead_private.length&&(T+=`<div class="s">dead private methods</div><div class="mls">${R.dead_private.map(U).join("")}</div>`),R.fields.length&&(T+=`<div class="s">state</div><div class="mls">${R.fields.map(k=>`<span class="fd">${k.kind==="owned"?"\u25C6 ":k.kind==="injected"?"\u25C7 ":""}${mt(k.name)}</span>`).join("")}</div>`);let J=[...new Set(se.edges.filter(k=>k.cls===R.id&&(k.kind==="constructs"||k.kind==="into_class"&&k.t===R.ctor)).map(k=>k.s))];T+=`<div class="s">constructed by</div>${J.length?J.map(wa).join(""):'<div class="v">no resolved constructor call</div>'}`,T+=rh(R.id)}o.innerHTML=`<div class="grip" title="Drag to resize"><i></i></div><div class="ihead">${S}${y}</div><div class="ibody">${T}</div>`,o.querySelector(".back")?.addEventListener("click",()=>rd()),o.querySelector(".close").addEventListener("click",()=>od()),o.querySelectorAll("[data-sel]").forEach(R=>R.addEventListener("click",()=>Mo({kind:"node",id:R.dataset.sel}))),o.querySelectorAll("[data-cls]").forEach(R=>R.addEventListener("click",()=>Mo({kind:"class",id:R.dataset.cls}))),ym(o.querySelector(".grip")),ni=o.querySelector(".code");for(let R of o.querySelectorAll("code[data-indent]"))R.style.paddingLeft=R.dataset.indent+"ch",R.style.textIndent="-"+R.dataset.indent+"ch";ni?.querySelectorAll(".site.e").forEach(R=>{let L=se.edges[cs.sites[+R.dataset.si][4]].t,U=at.get(L),J=U?U.dead?"dead":U.clone!==null?"clone":U.lb?"lb":null:null;J&&R.classList.add(`sg-${J}`)}),ni&&(ni.addEventListener("click",R=>{let L=R.target.closest(".site.e");if(!L)return;let U=se.edges[cs.sites[+L.dataset.si][4]].t;Mo({kind:qe.has(U)?"class":"node",id:U})}),ni.addEventListener("mouseover",R=>bd(R.target)),ni.addEventListener("mouseleave",()=>bd(null)))}function bd(o){let l=o?.closest?.(".cl"),h=o?.closest?.(".site.e"),f=!l||!cs?[]:h?[+h.dataset.si]:l.dataset.sites?l.dataset.sites.split(",").map(Number):[],S=f.length?f.join(","):null;if((P.hoverCall?.key??null)!==S){if(!S)P.hoverCall=null;else{let y=new Set(f.map(T=>cs.sites[T][4]));P.hoverCall={key:S,sites:new Set(f),edges:y,targets:new Set([...y].map(T=>se.edges[T].t)),line:+l.dataset.l}}Cn("hover")}}function xm(){if(!ni||!cs)return;let o=new Set,l=!1;if(P.hoverCall)o=P.hoverCall.sites;else if(P.hover||P.hoverBox||P.hoverLine){l=!0;let S=P.hover,y=P.hoverBox,T=P.hoverLine,R=T&&T.startsWith("link:")?new Set(se.links[+T.slice(5)].members):T&&T.startsWith("call:")?new Set([+T.slice(5)]):null;cs.sites.forEach((L,U)=>{if(L[3]!=="edge")return;let J=se.edges[L[4]],k=J.t;(S&&(k===S||at.get(k)?.cls===S||J.cls===S)||y&&vd(k)===y||R&&R.has(L[4]))&&o.add(U)})}let h=[...o].sort((S,y)=>S-y).join(",");if(h===Ta)return;Ta=h,ni.querySelectorAll(".hot").forEach(S=>S.classList.remove("hot"));let f=null;for(let S of o){let y=ni.querySelector(`.site[data-si="${S}"]`);if(!y)continue;y.classList.add("hot");let T=y.closest(".cl");T.classList.add("hot"),(!f||+T.dataset.l<+f.dataset.l)&&(f=T)}l&&f&&vm(f)}function vm(o){let l=X("#inspector .ibody");if(!l)return;let h=l.getBoundingClientRect(),f=o.getBoundingClientRect();f.top>=h.top+24&&f.bottom<=h.bottom-24||(l.scrollTop+=f.top-h.top-l.clientHeight/3)}function Sd(o,l=!1){G=Math.round(he(o,I,Math.min(z,ue-A-160))),X("#inspector").style.width=`${G}px`,l&&localStorage.setItem(H,String(G)),Ge=!0,Sn()}function ym(o){o.addEventListener("pointerdown",l=>{l.preventDefault(),o.setPointerCapture(l.pointerId);let h=l.clientX,f=G,S=T=>Sd(f+(h-T.clientX)),y=()=>{o.removeEventListener("pointermove",S),o.removeEventListener("pointerup",y),Sd(G,!0)};o.addEventListener("pointermove",S),o.addEventListener("pointerup",y)})}function oh(o,l=34,h=14,f=l,S=h){let y=document.createElement("canvas");y.width=f*2,y.height=S*2,y.style.width=`${f}px`,y.style.height=`${S}px`;let T=y.getContext("2d");return T.scale(2*f/l,2*S/h),o(T),y}let rt=o=>"#"+o.toString(16).padStart(6,"0"),bm=(o,l)=>"#"+Te(parseInt(o.slice(1),16)).lerp(Te(t.bg),l).getHexString(),To=(o,l)=>`rgba(${o>>16&255},${o>>8&255},${o&255},${l})`;function Aa(){let o=d[fn()],l=c[o.box],h=rt(t.modFront),f=(C,le,B,Me,be,Ce=r.hatchKey,Mt=3,Gt=1,Xt=1)=>{C.save(),C.beginPath(),C.rect(le,B,Me,be),C.clip(),C.strokeStyle=Ce,C.lineWidth=Xt;for(let sn=-be;sn<Me+be;sn+=Mt)C.beginPath(),Gt>0?(C.moveTo(le+sn,B+be),C.lineTo(le+sn+be,B)):(C.moveTo(le+sn,B),C.lineTo(le+sn+be,B+be)),C.stroke();C.restore()},S=(C,le=n.link)=>B=>{B.fillStyle=h,B.fillRect(3,2,28,10),B.strokeStyle=rt(le),B.lineWidth=1,B.strokeRect(3.5,2.5,27,9),C&&C(B)},y=(C,le=400,B=8,Me=s.text)=>be=>{be.fillStyle=Me,be.font=`${le} ${B}px ${M}`,be.fillText(C,6,10)},T=(C,le=26,B=1)=>Me=>{Me.fillStyle=rt(t[C]),Me.fillRect(le,B,6,6)},R=(C=l.edge[0],le)=>B=>{B.fillStyle=h,B.fillRect(7,1,20,12.5),B.fillStyle=rt(l.head),B.fillRect(7,1,20,3.2),B.strokeStyle=rt(C),B.lineWidth=1,B.strokeRect(7.5,1.5,19,11.5),le&&le(B)},L=(C,le=1,B=null,Me=rt(t.card),be=9)=>Ce=>{Ce.fillStyle=Me,Ce.strokeStyle=C,Ce.lineWidth=le,B&&Ce.setLineDash(B),Ce.fillRect(4,7-be/2,26,be),Ce.strokeRect(4,7-be/2,26,be),Ce.setLineDash([])},U=(C,le,B,Me,be)=>{C.beginPath(),C.moveTo(le,B),C.lineTo(le-3*Me+2*be,B-3*be-2*Me),C.lineTo(le-3*Me-2*be,B-3*be+2*Me),C.closePath(),C.fill()},J=(C,le)=>C==="arc"?[3+28*le,13-13*Math.sin(Math.PI*le)**.8]:C==="flat"?[3+28*le,7]:C==="metro"?le<.2?[5,13-45*le]:le<.8?[5+24*(le-.2)/.6,4]:[29,4+45*(le-.8)]:C==="row"?le<.15?[4,13-60*le]:le<.85?[4+26*(le-.15)/.7,4]:[30,4+60*(le-.85)]:[3,7],k=(C,le,B,Me=null)=>be=>{Me&&Me(be);let Ce=24,Mt=[];for(let Ot=0;Ot<=Ce;Ot++)Mt.push(J(B,Ot/Ce));let Gt=[],Xt=[];Mt.forEach((Ot,$t)=>{let Qt=Mt[Math.min($t+1,Ce)],Dn=Mt[Math.max($t-1,0)],Bt=Qt[0]-Dn[0],an=Qt[1]-Dn[1],Hi=Math.hypot(Bt,an)||1,Rs=le/2*(1-.5*$t/Ce);Gt.push([Ot[0]-an/Hi*Rs,Ot[1]+Bt/Hi*Rs]),Xt.push([Ot[0]+an/Hi*Rs,Ot[1]-Bt/Hi*Rs])});let sn=be.createLinearGradient(3,0,31,0);sn.addColorStop(0,C),sn.addColorStop(1,bm(C,.5)),be.fillStyle=sn,be.beginPath(),Gt.forEach((Ot,$t)=>$t?be.lineTo(...Ot):be.moveTo(...Ot)),Xt.reverse().forEach(Ot=>be.lineTo(...Ot)),be.closePath(),be.fill()},oe=C=>{let le=C.createRadialGradient(17,7,0,17,7,5);le.addColorStop(0,To(t.lit,1)),le.addColorStop(1,To(t.lit,0)),C.fillStyle=le,C.fillRect(10,0,14,14)},Ee=C=>{C.fillStyle=rt(t.plate),C.strokeStyle=rt(n.edge),C.lineWidth=1,C.fillRect(1,11,13,3),C.fillRect(20,11,13,3)},we=C=>{for(let le of[2,20])C.fillStyle=h,C.fillRect(le,2,12,11),C.strokeStyle=rt(n.link),C.lineWidth=1,C.strokeRect(le+.5,2.5,11,10);C.strokeStyle=rt(o.link),C.lineWidth=1.4,C.beginPath(),C.moveTo(14,9),C.lineTo(16,9),C.lineTo(16,.8),C.lineTo(18,.8),C.lineTo(18,6),C.lineTo(20,6),C.stroke()},pt=C=>le=>{for(let B of[1,22])le.fillStyle=rt(t.modFront),le.fillRect(B,1,11,12.5),le.strokeStyle=rt(n.link),le.lineWidth=1,le.strokeRect(B,1,11,12.5);le.strokeStyle=C,le.lineWidth=1.2;for(let[B,Me]of[[4,3.5],[7,9],[10.5,12]])le.beginPath(),le.moveTo(12,B),le.bezierCurveTo(17,B,17,Me,22,Me),le.stroke()},Ue=C=>le=>{le.strokeStyle=rt(n.strong),le.lineWidth=1;for(let B of[1,5.5,10])le.strokeRect(16,B,16,3.2);le.strokeStyle=C,le.lineWidth=1.1;for(let[B,Me,be]of[[2.6,7.1,12],[2.6,11.6,8],[7.1,11.6,12]])le.beginPath(),le.moveTo(16,B),le.lineTo(be,B),le.lineTo(be,Me),le.lineTo(16,Me),le.stroke()},ut=C=>le=>{le.strokeStyle=rt(n.strong),le.lineWidth=1,le.strokeRect(14,1,18,4.5),le.strokeRect(14,8.5,18,4.5),le.strokeStyle=C,le.lineWidth=1.3,le.beginPath(),le.moveTo(14,3),le.bezierCurveTo(7,3,7,11,14,11),le.stroke()},gt=C=>{C.fillStyle=rt(t.boxLine),C.strokeStyle=s.muted,C.lineWidth=1.2,C.fillRect(2,2,7,4),C.fillRect(15,2,7,4),C.fillRect(24,9.5,8,4),C.beginPath(),C.moveTo(9.5,4),C.lineTo(13,4),C.moveTo(22.5,4),C.lineTo(28,4),C.lineTo(28,7),C.stroke(),C.fillStyle=s.muted,U(C,14.5,4,1,0),U(C,28,9,0,1)},ze=C=>{let le=C.createLinearGradient(0,13,0,2);le.addColorStop(0,rt(o.link)),le.addColorStop(.6,rt(o.link)),le.addColorStop(1,To(o.link,0)),C.strokeStyle=le,C.lineWidth=1.6,C.beginPath(),C.moveTo(5,13),C.lineTo(5,2),C.stroke(),C.fillStyle=s.muted,C.font=`400 7px ${M}`,C.fillText("\u2192 pkg",9,6.5)},St=C=>{C.fillStyle=rt(t.plate),C.strokeStyle=rt(n.link),C.lineWidth=1,C.beginPath(),C.moveTo(3,12),C.lineTo(28,12),C.lineTo(32,5),C.lineTo(7,5),C.closePath(),C.fill(),C.stroke(),C.fillStyle=s.text,C.fillRect(6,9.5,9,1.4)},xt=C=>le=>{le.strokeStyle=C,le.lineWidth=1.2,le.setLineDash([4,3]),le.beginPath(),le.moveTo(3,10),le.bezierCurveTo(12,4,20,4,27,8),le.stroke(),le.setLineDash([]),le.fillStyle=C,le.beginPath(),le.moveTo(31,10),le.lineTo(25,5.5),le.lineTo(24,10.5),le.closePath(),le.fill()},Ae=C=>{C.fillStyle=h,C.fillRect(1,2,24,10),C.fillStyle=To(t.deadFill,t.deadFillA),C.fillRect(1,2,24,10),f(C,1,2,24,10,rt(t.dead),3.2,-1,1.2),C.strokeStyle=rt(t.dead),C.lineWidth=1.2,C.setLineDash([2.5,1.5]),C.strokeRect(1.5,2.5,23,9),C.setLineDash([]),T("dead",27,4)(C)},q=C=>{C.fillStyle=h,C.fillRect(1,2,24,10),C.fillStyle=To(t.cloneFill,t.cloneFillA),C.fillRect(1,2,24,10),C.strokeStyle=rt(n.link),C.lineWidth=1,C.strokeRect(1.5,2.5,23,9),C.strokeStyle=rt(t.clone),C.lineWidth=2,C.setLineDash([1,1.6]),C.beginPath(),C.moveTo(3,10),C.lineTo(23,10),C.stroke(),C.setLineDash([]),T("clone",27,4)(C)},ee=C=>{C.strokeStyle=rt(t.clone),C.lineWidth=2,C.lineCap="round",C.setLineDash([.1,3]),C.beginPath(),C.moveTo(3,12),C.bezierCurveTo(6,0,28,0,31,12),C.stroke(),C.setLineDash([]),C.lineCap="butt"},_e=S(C=>{C.fillStyle=rt(t.lb),C.fillRect(4,3,3,8)}),fe=C=>{C.fillStyle=rt(t.boxFront),C.fillRect(3,1,17,12),C.fillStyle=rt(t.boxHead),C.fillRect(3,1,17,3),C.strokeStyle=rt(n.strong),C.lineWidth=1,C.strokeRect(3.5,1.5,16,11),f(C,4,8.5,15,1.6),C.fillStyle=s.muted,C.font=`400 6px ${M}`,C.fillText("\u25C6",23,6),C.fillText("\u25C7",23,12)},He=C=>{C.strokeStyle=rt(t.write),C.lineWidth=1,C.beginPath(),C.moveTo(3,4),C.bezierCurveTo(10,4,12,10,19,10),C.stroke(),C.fillStyle=s.text,C.font=`400 8px ${M}`,C.fillText("\u25C6 \u25C7",20,11)},Ke=C=>le=>{le.strokeStyle=C,le.lineWidth=1.4,le.beginPath(),le.moveTo(2,4),le.bezierCurveTo(10,4,12,9,20,9),le.stroke(),le.fillStyle=rt(t.boxFront),le.fillRect(20,3,12,10),le.strokeStyle=rt(n.strong),le.lineWidth=1,le.strokeRect(20.5,3.5,11,9),le.fillStyle=C,le.fillRect(19,7.5,3,3)},Je=C=>le=>{le.strokeStyle=C,le.lineWidth=1.4,le.beginPath(),le.moveTo(2,2),le.bezierCurveTo(10,2,14,2,18,5),le.stroke(),le.fillStyle=rt(t.boxFront),le.fillRect(14,5,18,8),le.strokeStyle=rt(n.strong),le.lineWidth=1,le.strokeRect(14.5,5.5,17,7),le.fillStyle=C,le.fillRect(15,4,16,1.6)},Wt=C=>le=>{le.fillStyle=rt(t.boxFront),le.fillRect(14,1,18,12),le.strokeStyle=rt(n.strong),le.lineWidth=1,le.strokeRect(14.5,1.5,17,11),le.strokeStyle=C,le.lineWidth=1.1,le.beginPath(),le.moveTo(14,4),le.bezierCurveTo(6,4,6,10,14,10),le.stroke()},vn=C=>{C.fillStyle=r.pill,C.strokeStyle=r.pillLineStrong,C.lineWidth=1,C.beginPath(),C.roundRect(3,2,28,10,2.5),C.fill(),C.stroke(),C.fillStyle=s.lit,C.font=`700 7px ${M}`,C.fillText("name",7,9.5)},Dt=S(C=>{C.strokeStyle=rt(t.lit),C.lineWidth=1.6,C.strokeRect(4,3,26,8)});return{load_bearing:_e,dead:Ae,clone:q,clone_chord:ee,import_cycle:xt(rt(t.red)),outline:C=>{C.strokeStyle=rt(n.link),C.globalAlpha=.6,C.lineWidth=1,C.strokeRect(7.5,1.5,19,11.5),C.globalAlpha=1},stub_pill:C=>{C.fillStyle=h,C.fillRect(1,3,7,9),C.strokeStyle=rt(n.link),C.lineWidth=1,C.strokeRect(1.5,3.5,6,8),C.strokeStyle=s.muted,C.beginPath(),C.moveTo(8,7.5),C.lineTo(12,7.5),C.stroke(),C.fillStyle=r.pill,C.strokeStyle=r.pillLine,C.beginPath(),C.roundRect(12,3,21,9,2.5),C.fill(),C.stroke(),C.fillStyle=s.text,C.font=`700 6px ${M}`,C.fillText("\u2192 fn",14,9.5)},site_linked:C=>{C.fillStyle=s.text,C.font=`400 8px ${M}`,C.fillText("fn()",6,9),C.fillStyle=rt(n.link),C.fillRect(6,11,14,1),C.fillStyle=rt(t.lb),C.fillRect(22,10.5,9,1.5)},site_other:C=>{C.fillStyle=s.muted,C.font=`400 8px ${M}`,C.fillText("len()",4,9),C.fillStyle=rt(n.link),C.beginPath(),C.arc(29,4,1.6,0,7),C.fill()},call_pill:C=>{C.fillStyle=r.pill,C.strokeStyle=r.pillLineStrong,C.lineWidth=1,C.beginPath(),C.roundRect(1,2,32,10,2.5),C.fill(),C.stroke(),C.fillStyle=s.lit,C.font=`700 6px ${M}`,C.fillText("a \u2192 b",4,9.3)},lit:Dt,trace:k(rt(t.lit),3,"flat"),pulse:C=>{k(rt(t.lit),2,"flat")(C),oe(C)},evidence:vn,plate:St,box:R(),row:S(y("fn")),exported:S(y("fn",700)),class_row:S(C=>{C.fillStyle=rt(t.classRow),C.fillRect(6,4,22,6),C.strokeStyle=rt(n.edge),C.strokeRect(6.5,4.5,21,5)}),more:S(C=>{C.strokeStyle=rt(n.link),C.lineWidth=1;for(let le of[5.5,7.5,9.5])C.beginPath(),C.moveTo(5,le),C.lineTo(29,le),C.stroke()}),tail:S(C=>f(C,4,3,26,8)),wrapper:S(y("fn",400,6)),card:L(rt(o.card[0])),class_block:L(rt(o.block[0]),1.2),class_open:fe,fields:He,plate_ribbon:k(rt(o.ribbon===n.rule?n.link:o.ribbon),5,"arc"),link_track:k(rt(o.link),2.4,"metro"),link_row:k(rt(o.link),2.4,"row",Ee),link_arc:k(rt(o.link),2.4,"arc"),margin_arc:Ue(rt(o.call)),curve:pt(rt(o.call)),into_class:Ke(rt(o.call)),constructs:Je(rt(o.call)),intra:Wt(rt(o.call)),stub:ze,import:xt(rt(fn()==="plan"?o.imp:n.edge)),flow:gt,ports:we,click:R(n.link,C=>{C.strokeStyle=s.lit,C.lineWidth=1.2,C.strokeRect(7.5,1.5,19,3.2)})}}let Ca=[["load_bearing","signals","load-bearing","load-bearing: blue bar on the row"],["dead","signals","dead","dead: yellow hatched row, dashed call"],["clone","signals","clone","clone: purple row, box tick"],["clone_chord","signals","clone pair","clone pair: dotted purple chord"],["import_cycle","signals","import cycle","import cycle: red dashed line"],["lit","attention","lit","lit: named, selected or hovered"],["trace","attention","traced path","traced path: the heaviest lit line"],["pulse","attention","pulses","pulses: caller \u2192 callee, 3 runs"],["evidence","attention","name pill","pill: a lit name too small to print"],["call_pill","attention","hovered call","hovered call: caller \u2192 callee pill"],["plate","units","package","package: a plate, name at the front"],["box","units","module","module: a box, rows fold inside"],["outline","units","outside scope","module outside the scope: outline only"],["row","units","public name","public name: a row on its box"],["exported","units","exported (bold)","bold name: exported (__all__)"],["class_row","units","class","class: an inset row"],["more","units","more names","more public names: hairlines"],["tail","units","internals","internals: the hatched tail"],["wrapper","units","wrapper","wrapper: small type"],["card","units","function","unfolded module: cards by depth"],["class_block","units","class block","class: a block of public rows"],["class_open","units","class opened","class opened: private rows below"],["fields","units","state","state: \u25C6 owned, \u25C7 injected"],["plate_ribbon","calls","package pair","package to package: one ribbon"],["link_track","calls","module pair","call in the package: track above"],["link_row","calls","along the row","call along the row: side track"],["link_arc","calls","to another row","call to another row: arc overhead"],["curve","calls","call by call","two modules in focus: a curve per call"],["margin_arc","calls","margin lane","call inside the module: margin lane"],["into_class","calls","into a class","call into a class: side port"],["constructs","calls","constructs","constructs: bar on class header"],["intra","calls","inside a class","call inside the class: edge loop"],["stub","calls","leaves scope","call leaving: stub, \u2192 package"],["stub_pill","calls","off-row call","off-row call: pill \u2192 name \xB7 pkg"],["site_linked","source","drawn call","source: underline = a drawn call (hue: callee signal)"],["site_other","source","not drawn","source: dot = external or unresolved call"],["import","calls","import","import: dashed, on the ground"],["flow","reading","","flow: \u2192 in a row, \u2193 row to row","onp"],["ports","reading","","in on the left, out on the right","pm"],["click","reading","","box: scope \xB7 header: unfold","op"]],Sm={signals:"signals",attention:"attention",units:"units",calls:"calls",source:"source",reading:"reading"},Md={plate:"link_track",row:"link_row",cross_row:"link_arc"};function Mm(o){let l=xe(),h=A,f=ue-l,S=v,y=Se-F;for(let T of o){let R=Kt(T[0],T[1],T[2]);if(R[2]<=1&&R[0]>=h&&R[0]<=f&&R[1]>=S&&R[1]<=y)return!0}return!1}let ky=o=>{let l=[];for(let h=0;h<o.n;h+=Math.max(1,Math.floor(o.n/12)))l.push([o.pts[h*3],o.pts[h*3+1],o.pts[h*3+2]]);return l.push([o.pts[o.n*3-3],o.pts[o.n*3-2],o.pts[o.n*3-1]]),l};function wm(o=.1){let l=new Set,h=y=>Mm(y),f=y=>{let T=[];for(let R=0;R<y.n;R+=Math.max(1,Math.floor(y.n/12)))T.push([y.pts[R*3],y.pts[R*3+1],y.pts[R*3+2]]);return T.push([y.pts[y.n*3-3],y.pts[y.n*3-2],y.pts[y.n*3-1]]),T},S=y=>y.userData.paintKey&&Number(y.userData.paintKey.split("|")[0])===t.lit;for(let y of ns.values())y.a>=o&&h([[y.d.x,tt.ground,y.d.z],[y.d.x+y.d.w,tt.ground,y.d.z]])&&l.add("plate");for(let y of nn.values()){if(y.a<o)continue;let T=y.b,R=y.p.z+T.d;if(!h([[T.x,0,R],[T.x+T.w,0,R],[T.x,-y.h,R],[T.x+T.w,-y.h,R]]))continue;if(y.sil){l.add("outline");continue}l.add("box"),y.edges.material.color.getHex()===t.lit&&l.add("lit");let L=y.a*(1-ve(y.u));if(L<o)continue;let U=(k,oe)=>h([[T.x,-k,R],[T.x+T.w,-k,R],[T.x,-k-oe,R],[T.x+T.w,-k-oe,R]]),J=y.rowsA*L>=o;for(let k of T.rows)U(k.y,k.h)&&(J&&(l.add(k.kind==="class"?"class_row":"row"),m(k)&&l.add("exported"),k.wrapper&&l.add("wrapper")),k.lb&&l.add("load_bearing"),k.clone&&l.add("clone"));for(let k of[T.more,T.tail])!k||!U(k.y,k.h)||(l.add(k===T.more?"more":"tail"),k.lb&&l.add("load_bearing"),k.clone&&l.add("clone"));for(let k of T.ghosts)U(k.y,k.h)&&l.add("dead");U(0,De.mod_header)&&(T.ghosts.length&&l.add("dead"),(T.rows.some(k=>k.clone)||T.tail?.clone||T.more?.clone)&&l.add("clone"));for(let k of y.lit.values())k.visible&&k.material.opacity>=o&&l.add("lit")}for(let y of is.values()){let T=y.n;!y.border.visible||y.border.material.opacity<o||!h([[T.x,T.y,T.z],[T.x+T.w,T.y-T.h,T.z]])||(l.add("card"),T.dead?l.add("dead"):T.lb&&l.add("load_bearing"),T.clone!==null&&l.add("clone"),m(T)&&l.add("exported"),T.wrapper&&l.add("wrapper"),S(y.border)&&l.add("lit"))}for(let y of te.values()){let T=y.cl;if(!(!y.group.visible||y.mats[4].opacity<o||!h([[T.x,T.y,T.z],[T.x+T.w,T.y-T.h,T.z]]))){l.add("class_block"),y.open&&T.private.length&&l.add("class_open"),T.fields.length&&(T.data_only||y.open)&&l.add("fields");for(let R of re(T).rows){let L=at.get(R);L.lb&&l.add("load_bearing"),L.clone!==null&&l.add("clone"),m(L)&&l.add("exported")}!y.open&&T.private.length&&l.add("tail"),y.edges.material.color.getHex()===t.lit&&l.add("lit")}}for(let y of gn){if(!y.line.visible||y.line.material.opacity<o||!h(f(y)))continue;let T=y.e;T.kind==="intra_class"?l.add("intra"):(T.kind==="constructs"&&l.add("constructs"),T.kind==="into_class"&&l.add("into_class"),l.add(y.inner?"margin_arc":Md[T.span])),y.stub&&l.add("stub"),y.lastA===t.lit&&l.add("lit"),y.lastA===t.dead&&l.add("dead"),Pe?.trace?.has(y)&&l.add("trace")}for(let y of Bi)!y.line.visible||y.line.material.opacity<o||!h(f(y))||(l.add(Md[y.l.span]),y.stub&&l.add("stub"),y.lastA===t.lit&&l.add("lit"),Pe?.traceLinks?.has(y.li)&&l.add("trace"));for(let y of on)!y.line.visible||y.line.material.opacity<o||!h(f(y))||(l.add("curve"),y.lastA===t.lit&&l.add("lit"),y.lastA===t.dead&&l.add("dead"),Pe?.trace?.has(gn[y.ei])&&l.add("trace"));for(let y of Sr)y.line.visible&&y.line.material.opacity>=o&&h(f(y))&&(l.add("plate_ribbon"),y.lastA===t.lit&&l.add("lit"));for(let y of Mr)y.line.visible&&y.line.material.opacity>=o&&h(f({pts:y.pts,n:y.pts.length/3}))&&l.add("clone_chord");for(let y of mo)y.line.visible&&y.line.material.opacity>=o&&h(f({pts:y.pts,n:y.pts.length/3}))&&l.add(y.imp.cycle?"import_cycle":"import");return rs&&l.add("pulse"),as.some(y=>y.kind==="callout")&&l.add("evidence"),as.some(y=>y.kind==="pill")&&l.add("call_pill"),as.some(y=>y.kind==="stubpill")&&l.add("stub_pill"),ni&&!X("#inspector").classList.contains("hidden")&&(ni.querySelector(".site.e")&&l.add("site_linked"),ni.querySelector(".site.x")&&l.add("site_other")),l}let ah=(o,l,h,f="k",S=[34,14])=>{let y=document.createElement("div");y.className=f+(o[1]==="signals"?" sig":""),y.dataset.mark=o[0],y.appendChild(oh(h[o[0]],34,14,...S));let T=document.createElement("span");return T.textContent=l,y.appendChild(T),y},Rr=new Set,lh=null,wd="atlas.legend",ir=(()=>{try{return localStorage.getItem(wd)!=="closed"}catch{return!0}})();function ch(o=Rr){let l=X("#legend"),h=Aa(),f=Ca.filter(L=>L[1]!=="reading"&&o.has(L[0]));l.innerHTML="",l.classList.toggle("pill",!ir),l.classList.toggle("hidden",!X("#key").classList.contains("hidden"));let S=document.createElement("div");S.className="lh",S.innerHTML=`<span>Legend</span><span class="mini"></span><span class="sp"></span><button title="${ir?"Collapse the legend":"Show the legend"} (shift+k)">${ir?"\u2013":"+"}</button>`;let y=S.querySelector(".mini");for(let L of f.filter(U=>U[1]==="signals"))y.appendChild(oh(h[L[0]],34,14,26,10.7));l.appendChild(S);let T=document.createElement("div");T.className="lb-grid";let R=Math.ceil(f.length/Math.min(3,Math.ceil(f.length/5)));T.style.gridTemplateRows=`repeat(${Math.max(1,R)}, auto)`,T.style.gridAutoFlow="column",T.style.gridTemplateColumns="none";for(let L of f)T.appendChild(ah(L,L[2],h,"k",[30,12.4]));l.appendChild(T),S.querySelector("button").addEventListener("click",L=>{L.stopPropagation(),hh(!ir)}),l.onclick=ir?null:()=>hh(!0)}function hh(o){ir=o;try{localStorage.setItem(wd,o?"open":"closed")}catch{}ch(),Ge=!0,Sn()}function Em(o=Rr){let l=X("#key"),h=Aa(),f={overview:"o",plan:"n",package:"p",module:"m"}[fn()],S=Ca.filter(T=>T[1]==="reading"?T[4].includes(f):o.has(T[0])),y=[...new Set(S.map(T=>T[1]))];l.innerHTML="";for(let T of y){let R=document.createElement("div"),L=document.createElement("div");L.className="kh",L.textContent=Sm[T],R.appendChild(L);for(let U of S.filter(J=>J[1]===T))R.appendChild(ah(U,U[3],h));l.appendChild(R)}}let Tm={hub:"load_bearing"};function Am(o=Rr){let l=ln(),h=new Set((l?.marks??[]).map(f=>Tm[f]??f));return h.has("row")&&h.add("exported"),h.has("clone")&&h.add("clone_chord"),new Set([...o].filter(f=>{let S=Ca.find(y=>y[0]===f);return S&&(S[1]==="signals"||S[1]==="attention"||h.has(f))}))}function Ed(o=Rr){let l=document.querySelector("#gmarks");if(!l)return;let h=Aa(),f=Am(o);l.innerHTML="";for(let S of Ca)S[1]!=="reading"&&f.has(S[0])&&l.appendChild(ah(S,S[3],h))}function Td(o=!1){let l=wm(),h=[...l].sort().join(",")+"|"+e+"|"+fn();return!o&&h===lh?!1:(lh=h,Rr=l,ch(l),Em(l),Ed(l),!0)}function Ao(){let o=new URLSearchParams;if(P.guide!==null){o.set("guide",wt[P.guide].id),history.replaceState(null,"","#"+o.toString());return}P.scope&&o.set("scope",`${P.scope.kind}:${P.scope.id}`),P.selected&&o.set("sel",`${P.selected.kind}:${P.selected.id}`);let l=[...P.open].filter(h=>h!==_o());l.length&&o.set("unfold",l.join(",")),P.expanded.size&&o.set("open",[...P.expanded].join(",")),P.view!=="axo"&&o.set("view",P.view),P.proj!=="ortho"&&o.set("proj",P.proj),o.set("at",wt[P.resume].id),history.replaceState(null,"","#"+o.toString())}function Cm(){let o=new URLSearchParams(location.hash.slice(1));if(!location.hash.slice(1)||o.has("guide"))return{guide:Ft.get(o.get("guide"))??0};P.resume=Ft.get(o.get("at"))??0;let l=f=>{if(!f)return null;let S=f.indexOf(":"),y=f.slice(0,S),T=f.slice(S+1);return{kind:y,id:y==="link"||y==="plateribbon"||y==="call"?+T:T}};P.scope=l(o.get("scope")),P.selected=l(o.get("sel")),P.inspect=P.selected;let h=[...P.scope?.kind==="module"?[P.scope.id]:[],...(o.get("unfold")||"").split(",").filter(f=>ie.has(f))];for(let f of h){er(f,!0);let S=nn.get(f);S.u=1,yr(S,S.b.open_h)}for(let f of(o.get("open")||"").split(",").filter(Boolean)){if(!qe.has(f)||!P.open.has(qe.get(f).module))continue;P.expanded.add(f);let S=Ye(qe.get(f));S.lift=1,S.liftTarget=1,S.group.position.z=qe.get(f).z+qe.get(f).expanded.lift,ss(f)}return P.view=o.get("view")||(P.scope?"elev":"axo"),o.get("proj")==="persp"&&(P.proj="persp"),{guide:null}}function Ad(){ue=N(),Se=j(),cn.setSize(ue,Se,!1),Oe.width=ue*Y,Oe.height=Se*Y,zp();for(let o of Be)o.resolution.set(ue,Se);Ge=!0,Sn(),Mi==="view"?Vi(P.view,0):Mi==="sel"?cd(0):Mi==="guide"&&P.guide!==null&&Ts(jc(wt[P.guide]),0)}addEventListener("resize",()=>{Ad()});function Sn(){i||(i=!0,requestAnimationFrame(o=>{i=!1,Rm(o)}))}function Rm(o){let l=qu(o),h=Bp(o),f=kp(o/1e3),S=K.update();if((l||h||f||S)&&Sn(),!(Ge||l||h||f||S)){Pd();return}!l&&(S||Ge)&&Op();let y=_.position.distanceTo(K.target);W.fog.near=y*.9,W.fog.far=y*2.6,cn.render(W,_),nm(),Ge=!1,!l&&!h&&Pd()}let Cd="",Rd=0;function Pd(){clearTimeout(Rd),Rd=setTimeout(()=>{if(!Td())return;let o=X("#legend").getBoundingClientRect(),l=`${o.width}|${o.height}`;l!==Cd&&(Cd=l,Ge=!0,Sn())},120)}function uh(o,{persist:l=!0}={}){if(Fu[o]){if(u(o),document.documentElement.dataset.theme=o,l)try{localStorage.setItem(Nc,o)}catch{}for(let[h,f]of ke)h.color.set(t[f]);for(let[h,f,S]of $e)h.userData.paintKey=null,Qe(h,t[f],null,S);for(let h of jt)ri(h.c,h.kind),h.t.needsUpdate=!0;W.fog.color.set(t.bg),ku();for(let h of nn.values()){for(let f of h.sig){let S=f.userData.role;S==="cloneFill"?f.userData.k=t.cloneFillA:S==="deadFill"?f.userData.k=t.deadFillA:S==="deadLines"&&f.material.color.set(t.dead)}h.tier=null,br(h)}for(let h of is.values())h.border.userData.paintKey=null,de(h);for(let h of se.classes)Ye(h);for(let h of[...gn,...Bi,...Sr,...on])h.paintKey=null;for(let h of mo)h.line.userData.paintKey=null;for(let h of ns.values())h.outline.userData.paintKey=null;X("#themeBtn .tn").textContent=o,nr(),Cn("hover"),Td(!0),Ge=!0,Sn()}}Ad();let Id=Cm();nr(),wo(),X("#themeBtn .tn").textContent=e,ch();for(let o of nn.values())br(o);Id.guide!==null?tr(Id.guide,{ms:0}):(eh(),Cn(),Vi(P.view,0)),document.querySelectorAll("#views [data-view]").forEach(o=>o.addEventListener("click",()=>{P.guide===null&&Vi(o.dataset.view)})),X("#mapBtn").addEventListener("click",()=>pd()),X("#keyBtn").addEventListener("click",()=>th()),X("#helpBtn").addEventListener("click",()=>Jc()),X("#projBtn").addEventListener("click",()=>sd()),dm(),X("#projBtn").classList.toggle("on",P.proj==="ortho"),X("#projBtn").textContent=P.proj==="ortho"?"Orthographic":"Perspective",X("#themeBtn").addEventListener("click",()=>uh(e==="dark"?"light":"dark")),matchMedia("(prefers-color-scheme: light)").addEventListener("change",o=>{let l=null;try{l=localStorage.getItem(Nc)}catch{}!l&&!new URLSearchParams(location.search).get("theme")&&uh(o.matches?"light":"dark",{persist:!1})}),X("#status").classList.add("hidden"),Sn()}By();})();
/*! For license information please see app.bundle.js.LEGAL.txt */
