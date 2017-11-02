"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("/sw-1.js").then(function(a){console.log("ServiceWorker registration successful with scope: ",a.scope)})["catch"](function(a){console.log("ServiceWorker registration failed: ",a)})});
var config={apiKey:"AIzaSyDyvTK1lG1dxtidqrBZAz5fO4zGQC3YafU",authDomain:"nomina-6e781.firebaseapp.com",databaseURL:"https://nomina-6e781.firebaseio.com",projectId:"nomina-6e781",storageBucket:"nomina-6e781.appspot.com",messagingSenderId:"984370076661"},incrementa_var;window.addEventListener("online",is_online());window.addEventListener("offline",function(){incrementa_var=null});
function is_online(){firebase.initializeApp(config);var a=firebase.database();incrementa_var=function(c,b){a.ref(c).child(b).child("contador").transaction(function(a){return(a||0)+1})}}var formulario=document.getElementById("formulario"),tabla=document.getElementById("tabla"),et_kms=document.getElementById("et_kms"),_an_ti=document.getElementById("an_ti"),_irpf=document.getElementById("irpf"),_precioKmPactado=document.getElementById("precioKmPactado_ht"),btn=document.getElementById("btn");
if("undefined"!==typeof Storage){var guardado=localStorage.getItem("preciokm");_precioKmPactado.value=null===guardado?11.5:guardado;_irpf.value=localStorage.getItem("irpf")}
var kms_re=document.querySelector("#kms_re"),_precio_km=document.getElementById("precio_km"),_ta_salarial=document.getElementById("ta_salarial"),_sa_ba=document.getElementById("sa_ba"),_ho_ex=document.getElementById("ho_ex"),_pl_as=document.getElementById("pl_as"),_pl_no=document.getElementById("pl_no"),_ho_pr=document.getElementById("ho_pr"),_pl_tr=document.getElementById("pl_tr"),_pa_be=document.getElementById("pa_be"),_di_et=document.getElementById("di_et"),_to_dev=document.getElementById("to_dev"),
_to_aportaciones=document.getElementById("to_aportaciones"),_irpf_p=document.getElementById("irpf_p"),_irpf_r=document.getElementById("irpf_r"),_anticipos=document.getElementById("anticipos"),_to_deducir=document.getElementById("to_deducir"),_li_percibir=document.getElementById("li_percibir"),_to_retribuido=document.getElementById("to_retribuido"),_dias_convenio=document.getElementById("dias_convenio"),tabla_salarial=2017,sa_ba=936.78,pl_as=169.62,pa_be=78.06,pl_tr=95.86,k_me10=.0181,k_Ma10=.0323,
k_me10d=.0263,k_Ma10d=.0474,dieta_diaria=30;function compartir(){navigator.share&&navigator.share({text:"Prueba la calculadora de N\u00f3mina en: ",url:"https://nomina-6e781.firebaseapp.com/"})}
function calcula(){document.getElementById("tabla").style.display="block";formulario.style.display="none";incrementa_var("valores_IRPF","Rondando el "+Math.round(_irpf.value).toString());incrementa_var("kms_totales",""!=et_kms.value?rangoKms(et_kms.value):"0");incrementa_var("clics_totales","boton_calcular");new Nomina(et_kms.value,_an_ti.value,_irpf.value)}
function recargar(){incrementa_var("clics_totales","boton_nueva_operacion");tabla.style.display="none";formulario.style.display="block";et_kms.value="";_an_ti.value=""}
function rangoKms(a){if(6E3>a)return"con menos de 6000 kms";if(9E3>a)return"entre 6000 y 9000 kms";if(1E4>a)return"entre 9000 y 10000 kms";if(11E3>a)return"10000 y pico";if(12E3>a)return"11000 y pico";if(13E3>a)return"12000 y pico";if(14E3>a)return"13000 y pico";if(15E3>a)return"14000 y pico";if(16E3>a)return"15000 y pico";if(17E3>a)return"16000 y pico";if(18E3>a)return"17000 y pico";if(19E3>a)return"18000 y pico";if(19E3<a)return"con m\u00e1s de 19000 kms"}
function Nomina(a,c,b){""===a&&(a=0);""===c&&(c=0);""===b&&(b=0);var e=""!=_precioKmPactado.value?_precioKmPactado.value:0;_precio_km.innerHTML=e.toString()+" cts/km";incrementa_var("precio_km",e.toString().replace(".",","));"undefined"!==typeof Storage&&(localStorage.setItem("irpf",b),localStorage.setItem("preciokm",e));kms_re.innerHTML=a;_ta_salarial.innerHTML=tabla_salarial;_sa_ba.innerHTML=sa_ba;var h=1E4<a?1E4*k_me10+(a-1E4)*k_Ma10:a*k_me10,g=1E4<a?1E4*k_me10d+(a-1E4)*k_Ma10d:a*k_me10d,d=.5*
h;_ho_ex.innerHTML=d.toFixed(2);_pl_as.innerHTML=pl_as;var f=.1*h;_pl_no.innerHTML=f.toFixed(2);var k=.4*h;_ho_pr.innerHTML=k.toFixed(2);_pl_tr.innerHTML=pl_tr;_pa_be.innerHTML=pa_be;a=a*e/100-h;_di_et.innerHTML=a.toFixed(2);g=((a-g)/dieta_diaria).toFixed(2).toString()+" d\u00edas completos";_dias_convenio.innerHTML=g;f=d+f+k+a+sa_ba+pl_tr+pa_be+pl_as;_to_dev.innerHTML=f.toFixed(2);k=4.7*(pl_tr+sa_ba+d+pl_as+pa_be+sa_ba/6)/100;g=1.55*(pl_tr+sa_ba+d+pl_as+pa_be+sa_ba/6+d)/100;e=.1*(pl_tr+sa_ba+d+pl_as+
pa_be+sa_ba/6+d)/100;ir_pf=(f-a)*b/100;to_ap=k+g+e+4.7*d/100;_to_aportaciones.innerHTML=to_ap.toFixed(2);b="IRPF (".concat(b,"%)");_irpf_p.innerHTML=b;_irpf_r.innerHTML=ir_pf.toFixed(2);c=parseFloat(c);_anticipos.innerHTML=c;b=to_ap+ir_pf+c;_to_deducir.innerHTML=parseFloat(b).toFixed(2);to_a_percibir=f-b;_li_percibir.innerHTML=parseFloat(to_a_percibir).toFixed(2);_to_retribuido.innerHTML=parseFloat(to_a_percibir+c).toFixed(2)};