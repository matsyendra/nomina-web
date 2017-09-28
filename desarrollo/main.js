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

    const formulario = document.getElementById("formulario");
    const tabla = document.getElementById("tabla");

    const et_kms = document.getElementById("et_kms");
    const _an_ti = document.getElementById("an_ti");
    const _irpf = document.getElementById("irpf");
    const _precioKmPactado = document.getElementById("precioKmPactado_ht");
    const btn = document.getElementById("btn");

    if (typeof (Storage) !== "undefined") {
        var guardado = localStorage.getItem("preciokm");
        if (guardado === null) _precioKmPactado.value = 11.5;
        else
            _precioKmPactado.value = guardado;
        _irpf.value = localStorage.getItem("irpf");
    }

    const kms_re = document.getElementById("kms_re");
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

    const tabla_salarial = 2017;
    const sa_ba = 936.78;
    const pl_as = 169.62;
    const pa_be = 78.06;
    const pl_tr = 95.86;
    const k_me10 = 0.0181;
    const k_Ma10 = 0.0323;
    const k_me10d = 0.0263;
    const k_Ma10d = 0.0474;
    const dieta_diaria = 30;


    function incrementa(raiz, variable) { //TODO: desarrollo o no: "desarrollo/" +
        var databaseRef = database.ref(raiz).child(variable).child('contador');
        databaseRef.transaction(function (searches) {
            return (searches || 0) + 1;
        });
    }

    function calcula() {
        tabla.style.display = 'block';
        formulario.style.display = 'none';
        incrementa("valores_IRPF", "Rondando el " + Math.round(_irpf.value).toString());
        incrementa("kms_totales", et_kms.value != "" ? rangoKms(et_kms.value) : "0");
        incrementa("clics_totales", "boton_calcular");
        new Nomina(et_kms.value, _an_ti.value, _irpf.value);
    };

    function recargar() {
        incrementa("clics_totales", "boton_nueva_operacion");
        tabla.style.display = 'none';
        formulario.style.display = 'block';
        et_kms.value = "";
        _an_ti.value = "";
    }

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

    function Nomina(kms, an_ti, ir_pfQ) {
        if (kms === "") kms = 0;
        if (an_ti === "") an_ti = 0;
        if (ir_pfQ === "") ir_pfQ = 0;

        var precioKmPactado = _precioKmPactado.value != "" ? _precioKmPactado.value : 0;
        _precio_km.innerHTML = precioKmPactado.toString()+" cts/km";;

        incrementa("precio_km", precioKmPactado.toString().replace(".", ","));

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
        var kilometrosFijos = kms > 10000 ? k_me10 * 10000 + ((kms - 10000) * (k_Ma10)) : kms * k_me10;
        var kilometrosDietas = kms > 10000 ? k_me10d * 10000 + ((kms - 10000) * (k_Ma10d)) : kms * k_me10d;

        var ho_ex = kilometrosFijos * (0.5);
        _ho_ex.innerHTML = ho_ex.toFixed(2);
        _pl_as.innerHTML = pl_as;
        var pl_no = kilometrosFijos * 0.1;
        _pl_no.innerHTML = pl_no.toFixed(2);
        var ho_pr = kilometrosFijos * 0.4;
        _ho_pr.innerHTML = ho_pr.toFixed(2);
        _pl_tr.innerHTML = pl_tr;
        _pa_be.innerHTML = pa_be;

        var di_et = (kms * precioKmPactado / 100) - kilometrosFijos;
        _di_et.innerHTML = di_et.toFixed(2);
        var dietas_sin_ktje = di_et - kilometrosDietas;
        var dias_a_convenio = dietas_sin_ktje / dieta_diaria;
        var dato = dias_a_convenio.toFixed(2).toString()+" días completos";
        _dias_convenio.innerHTML = dato;
        var to_dev = ho_ex + pl_no + ho_pr + di_et + sa_ba + pl_tr + pa_be + pl_as;
        _to_dev.innerHTML = to_dev.toFixed(2);
        var co_co = (pl_tr + sa_ba + ho_ex + pl_as + pa_be + (sa_ba / 6)) * co_coQ / 100;
        var de_se = (((pl_tr + sa_ba + ho_ex + pl_as + pa_be + (sa_ba / 6)) + ho_ex) * de_seQ) / 100;
        var fo_pr = (((pl_tr + sa_ba + ho_ex + pl_as + pa_be + (sa_ba / 6)) + ho_ex) * fo_prQ) / 100;
        var re_ex = ho_ex * re_exQ / 100;

        ir_pf = (to_dev - di_et) * ir_pfQ / 100;
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
    }