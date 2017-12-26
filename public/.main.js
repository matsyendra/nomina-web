(function () {
    if ('serviceWorker' in navigator && false) { //TODO: ATENCION NO REGISTRO PARA DEV
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/sw.js').then(function (registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch(function (err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
    var config = {
        apiKey: "AIzaSyDyvTK1lG1dxtidqrBZAz5fO4zGQC3YafU",
        authDomain: "nomina-6e781.firebaseapp.com",
        databaseURL: "https://nomina-6e781.firebaseio.com",
        projectId: "nomina-6e781",
        storageBucket: "nomina-6e781.appspot.com",
        messagingSenderId: "984370076661"
    };

    var r = firebase.initializeApp(config);
    var database = firebase.database();
    var incrementa_var = function incrementa(raiz, variable) { //TODO: desarrollo o no: "desarrollo/" +
        var databaseRef = database.ref(raiz).child(variable).child('contador');
        databaseRef.transaction(function (searches) {
            return (searches || 0) + 1;
        });
    }

    window.addEventListener('online', function () {
        console.log(' - online');

    });
    window.addEventListener('offline', function () {
        console.log(' - offline');
    });

    const formulario = document.getElementById("formulario");
    const tabla = document.getElementById("tabla");
    const _an_ti = document.getElementById("an_ti");
    const pl_empresa = document.getElementById("pl_empresa");
    const _irpf = document.getElementById("irpf");
    const et_kms = document.getElementById("et_kms");
    const in_gr = document.getElementById("in_gr");
    const _precioKmPactado = document.getElementById("precioKmPactado_ht");
    const b_calcula = document.getElementById('calcula');

    if (typeof (Storage) !== "undefined") {
        var guardado = localStorage.getItem("preciokm");
        if (guardado === null) _precioKmPactado.value = 11.5;
        else
            _precioKmPactado.value = guardado;
        _irpf.value = localStorage.getItem("irpf");
    }

    const kms_re = document.querySelector("#kms_re");
    const _precio_km = document.getElementById("precio_km");
    const _ta_salarial = document.getElementById("ta_salarial");
    const _sa_ba = document.getElementById("sa_ba");
    const _ho_ex = document.getElementById("ho_ex");
    const _pl_as = document.getElementById("pl_as");
    const _pl_no = document.getElementById("pl_no");
    const _ho_pr = document.getElementById("ho_pr");
    const _pl_tr = document.getElementById("pl_tr");
    const _pa_be = document.getElementById("pa_be");
    const _di_et = document.getElementById("di_et");
    const _to_dev = document.getElementById("to_dev");
    const _to_aportaciones = document.getElementById("to_aportaciones");
    const _irpf_p = document.getElementById("irpf_p");
    const _irpf_r = document.getElementById("irpf_r");
    const _anticipos = document.getElementById("anticipos");
    const _to_deducir = document.getElementById("to_deducir");
    const _li_percibir = document.getElementById("li_percibir");
    const _to_retribuido = document.getElementById("to_retribuido");
    const _dias_convenio = document.getElementById("dias_convenio");

    /* const tabla_salarial = 2017;
    const sa_ba = 936.78;
    const pl_as = 169.62;
    const pa_be = 78.06;
    const pl_tr = 95.86;
    const k_me10 = 0.0181;
    const k_Ma10 = 0.0323;
    const k_me10d = 0.0263;
    const k_Ma10d = 0.0474;
    const dieta_diaria = 30; */

    const tabla_salarial = 2018;
    const sa_ba = 955.52;
    const pl_as = 173.01;
    const pa_be = 79.63;
    const pl_tr = 97.77;
    const k_me10 = 0.0185;
    const k_Ma10 = 0.0329;
    const k_me10d = 0.0268;
    const k_Ma10d = 0.0484;
    const dieta_diaria = 30.1;

    document.getElementById('compartir').addEventListener("click", function (event) {
        if (navigator.share) {
            navigator.share({
                text: 'Prueba la calculadora de Nómina en: ',
                url: 'https://nomina-6e781.firebaseapp.com/',
            })
        }
    });

    b_calcula.addEventListener("click", function (event) {
        event.preventDefault();
        if (document.activeElement) { //FIXME: OBSERVAR
            document.activeElement.blur();
        }
        document.getElementById("tabla").style.display = 'block';
        formulario.style.display = 'none';
        if (navigator.onLine) {
            console.log('calcula online');
            incrementa_var("valores_IRPF", "Rondando el " + Math.round(_irpf.value).toString());
            incrementa_var("kms_totales", et_kms.value != "" ? rangoKms(et_kms.value) : "0");
            incrementa_var("clics_totales", "boton_calcular");
        } else console.log('calcula offline');
        //new Nomina(et_kms.value, _an_ti.value, _irpf.value);
    });

    document.getElementById('recargar').addEventListener("click", function (event) {
        event.preventDefault();
        if (navigator.onLine) {
            incrementa_var("clics_totales", "boton_nueva_operacion");
        }
        tabla.style.display = 'none';
        formulario.style.display = 'grid';
        et_kms.value = "";
        _an_ti.value = "";
        pl_empresa.value = "";
        in_gr.value = "";
    });

    function rangoKms(kms) {
        if (kms < 6000) return "con menos de 6000 kms";
        if (kms < 9000) return "entre 6000 y 9000 kms";
        if (kms < 10000) return "entre 9000 y 10000 kms";
        if (kms < 11000) return "10000 y pico";
        if (kms < 12000) return "11000 y pico";
        if (kms < 13000) return "12000 y pico";
        if (kms < 14000) return "13000 y pico";
        if (kms < 15000) return "14000 y pico";
        if (kms < 16000) return "15000 y pico";
        if (kms < 17000) return "16000 y pico";
        if (kms < 18000) return "17000 y pico";
        if (kms < 19000) return "18000 y pico";
        if (kms > 19000) return "con más de 19000 kms";
    }

    const bb = document.getElementById('bb');
    const calcula_auto = function () {
        if (et_kms.value != "" && _precioKmPactado.value != "") {
            n = new Nomina(et_kms.value, _an_ti.value, _irpf.value, pl_empresa.value);
            var v = n.ingreso;
            in_gr.value = v;
            bb.style.display = "grid";
        } else {
            in_gr.value = "";
            bb.style.display = 'none';
        }
    };

    const check_ingreso = document.getElementById('check_importe');
    const check_preciokm = document.getElementById('check_preciokm');
    if (check_ingreso.checked) checkeando_ingreso;
    check_preciokm.checked = false;
    check_ingreso.addEventListener('change', function () {
        if (this.checked) {
            checkeando_ingreso;
        }
    });

    var checkeando_ingreso = function () {
        check_preciokm.checked = false;
        et_kms.oninput = calcula_auto;
        _irpf.oninput = calcula_auto;
        _precioKmPactado.oninput = calcula_auto;
        _an_ti.oninput = calcula_auto;
        pl_empresa.oninput = calcula_auto;
        in_gr.oninput = function () {
            in_gr.value = "";
            bb.style.display = 'none';
        }
    }



    var Nomina = function (kms, an_ti, ir_pfQ, pl_empresa) {
        if (kms === "") kms = 0;
        if (an_ti === "") an_ti = 0;
        if (ir_pfQ === "") ir_pfQ = 0;
        if (pl_empresa === "") pl_empresa = 0;
        else pl_empresa = parseInt(pl_empresa);

        var precioKmPactado = _precioKmPactado.value != "" ? _precioKmPactado.value : 0;
        _precio_km.innerHTML = precioKmPactado.toString() + " cts/km";;

        if (navigator.onLine)
            incrementa_var("precio_km", precioKmPactado.toString().replace(".", ","));

        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("irpf", ir_pfQ);
            localStorage.setItem("preciokm", precioKmPactado);
        }
        var co_coQ = 4.7,
            de_seQ = 1.55,
            fo_prQ = 0.1,
            re_exQ = 4.7;

        kms_re.innerHTML = kms;
        _ta_salarial.innerHTML = tabla_salarial;
        _sa_ba.innerHTML = sa_ba;
        var kilometrosFijos = kms > 10000 ? k_me10 * 10000 + (kms - 10000) * (k_Ma10) : kms * k_me10;
        var kilometrosDietas = kms > 10000 ? k_me10d * 10000 + (kms - 10000) * (k_Ma10d) : kms * k_me10d;

        var ho_ex = kilometrosFijos * (0.5);
        _ho_ex.innerHTML = ho_ex.toFixed(2);
        _pl_as.innerHTML = pl_as;
        var pl_no = kilometrosFijos * 0.1;
        _pl_no.innerHTML = pl_no.toFixed(2);
        var ho_pr = kilometrosFijos * 0.4;
        _ho_pr.innerHTML = ho_pr.toFixed(2);
        _pl_tr.innerHTML = pl_tr;
        _pa_be.innerHTML = pa_be;

        var di_et = (kms * precioKmPactado / 100) - kilometrosFijos + pl_empresa;
        console.log(di_et);
        _di_et.innerHTML = di_et.toFixed(2);
        var dietas_sin_ktje = di_et - kilometrosDietas - pl_empresa;
        var dias_a_convenio = dietas_sin_ktje / dieta_diaria;
        var dato = dias_a_convenio.toFixed(2).toString() + " días completos";
        _dias_convenio.innerHTML = dato;
        var to_dev = ho_ex + pl_no + ho_pr + di_et + sa_ba + pl_tr + pa_be + pl_as;
        _to_dev.innerHTML = to_dev.toFixed(2);
        var co_co = (pl_tr + sa_ba + ho_ex + pl_as + pa_be + sa_ba / 6) * co_coQ / 100;
        var de_se = (pl_tr + sa_ba + kilometrosFijos + pl_as + pa_be + sa_ba / 6) * de_seQ / 100;
        var fo_pr = (pl_tr + sa_ba + kilometrosFijos + pl_as + pa_be + sa_ba / 6) * fo_prQ / 100;
        var re_ex = ho_ex * re_exQ / 100;

        ir_pf = (ho_ex + pl_no + ho_pr + sa_ba + pl_tr + pa_be + pl_as) * ir_pfQ / 100;
        to_ap = co_co + de_se + fo_pr + re_ex;
        _to_aportaciones.innerHTML = to_ap.toFixed(2);
        var msg = "IRPF (".concat(ir_pfQ, "%)");
        _irpf_p.innerHTML = msg;
        _irpf_r.innerHTML = ir_pf.toFixed(2);
        var anticipos = parseFloat(an_ti);
        _anticipos.innerHTML = anticipos
        var to_ded = to_ap + ir_pf + anticipos;
        _to_deducir.innerHTML = parseFloat(to_ded).toFixed(2);
        to_a_percibir = to_dev - to_ded;
        _li_percibir.innerHTML = parseFloat(to_a_percibir).toFixed(2);
        var TT_RE = to_a_percibir + anticipos;
        _to_retribuido.innerHTML = parseFloat(TT_RE).toFixed(2);

        Nomina.prototype.ingreso = parseFloat(to_a_percibir).toFixed(2);
    }
})();