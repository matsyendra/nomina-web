!function(e){function t(o){if(n[o])return n[o].exports;var a=n[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t){!function(){function e(e){return e<6e3?"con menos de 6000 kms":e<9e3?"entre 6000 y 9000 kms":e<1e4?"entre 9000 y 10000 kms":e<11e3?"10000 y pico":e<12e3?"11000 y pico":e<13e3?"12000 y pico":e<14e3?"13000 y pico":e<15e3?"14000 y pico":e<16e3?"15000 y pico":e<17e3?"16000 y pico":e<18e3?"17000 y pico":e<19e3?"18000 y pico":e>19e3?"con más de 19000 kms":void 0}navigator;var t={apiKey:"AIzaSyDyvTK1lG1dxtidqrBZAz5fO4zGQC3YafU",authDomain:"nomina-6e781.firebaseapp.com",databaseURL:"https://nomina-6e781.firebaseio.com",projectId:"nomina-6e781",storageBucket:"nomina-6e781.appspot.com",messagingSenderId:"984370076661"},o=(firebase.initializeApp(t),firebase.database()),a=function(e,t){o.ref(e).child(t).child("contador").transaction(function(e){return(e||0)+1})};window.addEventListener("online",function(){console.log(" - online")}),window.addEventListener("offline",function(){console.log(" - offline")});const i=document.getElementById("formulario"),r=document.getElementById("tabla"),l=document.getElementById("an_ti"),c=document.getElementById("pl_empresa"),d=document.getElementById("irpf"),u=document.getElementById("et_kms"),m=document.getElementById("in_gr"),p=document.getElementById("precioKmPactado_ht"),s=document.getElementById("calcula");if("undefined"!=typeof Storage){var y=localStorage.getItem("preciokm");p.value=null===y?11.5:y,d.value=localStorage.getItem("irpf")}const v=document.querySelector("#kms_re"),g=document.getElementById("precio_km"),f=document.getElementById("ta_salarial"),_=document.getElementById("sa_ba"),I=document.getElementById("ho_ex"),E=document.getElementById("pl_as"),B=document.getElementById("pl_no"),b=document.getElementById("ho_pr"),k=document.getElementById("pl_tr"),L=document.getElementById("pa_be"),h=document.getElementById("di_et"),F=document.getElementById("to_dev"),M=document.getElementById("to_aportaciones"),x=document.getElementById("irpf_p"),T=document.getElementById("irpf_r"),H=document.getElementById("anticipos"),S=document.getElementById("to_deducir"),w=document.getElementById("li_percibir"),P=document.getElementById("to_retribuido");document.getElementById("compartir").addEventListener("click",function(e){navigator.share&&navigator.share({text:"Prueba la calculadora de Nómina en: ",url:"https://nomina-6e781.firebaseapp.com/"})});s.addEventListener("click",function(t){t.preventDefault(),document.activeElement&&document.activeElement.blur(),document.getElementById("tabla").style.display="block",i.style.display="none",navigator.onLine?(console.log("calcula online"),a("valores_IRPF","Rondando el "+Math.round(d.value).toString()),a("kms_totales",""!=u.value?e(u.value):"0"),a("clics_totales","boton_calcular")):console.log("calcula offline")}),document.getElementById("recargar").addEventListener("click",function(e){e.preventDefault(),navigator.onLine&&a("clics_totales","boton_nueva_operacion"),r.style.display="none",i.style.display="grid",u.value="",l.value="",c.value="",m.value=""});const z=document.getElementById("bb"),D=function(){if(""!=u.value&&""!=p.value){n=new K(u.value,l.value,d.value,c.value,-1);var e=n.ingreso;m.value=e,z.style.display="grid"}else m.value="",z.style.display="none"},O=function(){if(""!=u.value&&""!=m.value){var e=new K(u.value,l.value,d.value,c.value,m.value),t=e.pk;console.log("valor",t),p.value=t}};m.oninput=O;const R=document.getElementById("check_importe"),j=document.getElementById("check_preciokm"),A=function(){j.checked=!1,u.oninput=D,d.oninput=D,p.oninput=D,l.oninput=D,c.oninput=D,m.disabled=!0,p.disabled=!1};R.checked?A():R.checked||(m.disabled=!1,j.checked=!0,p.disabled=!0,z.style.display="none"),R.addEventListener("change",function(){this.checked?A():this.checked||(z.style.display="none",m.disabled=!1,j.checked=!0,p.disabled=!0)});var K=function(e,t,n,o,i){""===e&&(e=0),""===t&&(t=0),""===n&&(n=0),o=""===o?0:parseInt(o);var r=""!=p.value?p.value:0;g.innerHTML=r.toString()+" cts/km",navigator.onLine&&a("precio_km",r.toString().replace(".",",")),"undefined"!=typeof Storage&&(localStorage.setItem("irpf",n),localStorage.setItem("preciokm",r)),v.innerHTML=e,f.innerHTML=2018,_.innerHTML=955.52;var l=e>1e4?185+.0329*(e-1e4):.0185*e,c=.5*l;I.innerHTML=c.toFixed(2),E.innerHTML=173.01;var d=.1*l;B.innerHTML=d.toFixed(2);var u=.4*l;b.innerHTML=u.toFixed(2),k.innerHTML=97.77,L.innerHTML=79.63;var m=4.7*(1053.29+c+173.01+79.63+955.52/6)/100,s=1.55*(1053.29+l+173.01+79.63+955.52/6)/100,y=.1*(1053.29+l+173.01+79.63+955.52/6)/100,z=4.7*c/100;ir_pf=(c+d+u+955.52+97.77+79.63+173.01)*n/100,to_ap=m+s+y+z,M.innerHTML=to_ap.toFixed(2);var D="IRPF (".concat(n,"%)");x.innerHTML=D,T.innerHTML=ir_pf.toFixed(2);var O=parseFloat(t);H.innerHTML=O;var R=to_ap+ir_pf+O;if(S.innerHTML=parseFloat(R).toFixed(2),-1==i){var j=e*r/100-l+o;h.innerHTML=j.toFixed(2);var A=c+d+u+j+955.52+97.77+79.63+173.01;F.innerHTML=A.toFixed(2),to_a_percibir=A-R,w.innerHTML=parseFloat(to_a_percibir).toFixed(2);var q=to_a_percibir+O;P.innerHTML=parseFloat(q).toFixed(2),K.prototype.ingreso=parseFloat(to_a_percibir).toFixed(2)}if(-1!=i){var G=c+d+u+955.52+97.77+79.63+173.01,U=100*(parseFloat(i)+to_ap+ir_pf-G+l+O)/parseFloat(e);K.prototype.pk=U.toFixed(4)}}}()}]);