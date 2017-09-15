    const formulario = document.getElementById("formulario");
    const tabla = document.getElementById("tabla");

    const et_kms = document.getElementById("et_kms");
    const _an_ti = document.getElementById("an_ti");
    const _irpf = document.getElementById("irpf");
    const _precioKmPactado = document.getElementById("precioKmPactado");
    const btn = document.getElementById("btn");

    if (typeof (Storage) !== "undefined") {
        _precioKmPactado.value = localStorage.getItem("preciokm");
        _irpf.value = localStorage.getItem("irpf");
    }

    const kms_re = document.getElementById("kms_re");
    const _precio_km = document.getElementById("precio_km");
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

    const tabla_salarial = 2017;
    const sa_ba = 936.78;
    const pl_as = 169.62;
    const pa_be = 78.06;
    const pl_tr = 95.86;
    const k_me10 = 0.0181;
    const k_Ma10 = 0.0323;    

    function calcula() {
        tabla.style.display = 'block';
        formulario.style.display = 'none'
        new Nomina(et_kms.value, _an_ti.value, _irpf.value);
    };

    function Nomina(kms, an_ti, ir_pfQ) {
        let precioKmPactado = _precioKmPactado.value;
        _precio_km.innerHTML = precioKmPactado;        

        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("irpf", ir_pfQ);
            localStorage.setItem("preciokm", precioKmPactado);
        }
        let co_coQ = 4.7,
            de_seQ = 1.55,
            fo_prQ = 0.1,
            re_exQ = 4.7;

        kms_re.innerHTML = kms;
        _sa_ba.innerHTML = sa_ba;
        let kilometrosFijos = kms > 10000 ? k_me10 * 10000 + ((kms - 10000) * (k_Ma10)) : kms * k_me10;

        let ho_ex = kilometrosFijos * (0.5);
        _ho_ex.innerHTML = ho_ex.toFixed(2);
        _pl_as.innerHTML = pl_as;
        let pl_no = kilometrosFijos * 0.1;
        _pl_no.innerHTML = pl_no.toFixed(2);
        let ho_pr = kilometrosFijos * 0.4;
        _ho_pr.innerHTML = ho_pr.toFixed(2);
        _pl_tr.innerHTML = pl_tr;
        _pa_be.innerHTML = pa_be;

        let di_et = (kms * precioKmPactado) - kilometrosFijos;
        _di_et.innerHTML = di_et.toFixed(2);
        let to_dev = ho_ex + pl_no + ho_pr + di_et + sa_ba + pl_tr + pa_be + pl_as;
        _to_dev.innerHTML = to_dev.toFixed(2);
        let co_co = (pl_tr + sa_ba + ho_ex + pl_as + pa_be + (sa_ba / 6)) * co_coQ / 100;
        let de_se = (((pl_tr + sa_ba + ho_ex + pl_as + pa_be + (sa_ba / 6)) + ho_ex) * de_seQ) / 100;
        let fo_pr = (((pl_tr + sa_ba + ho_ex + pl_as + pa_be + (sa_ba / 6)) + ho_ex) * fo_prQ) / 100;
        let re_ex = ho_ex * re_exQ / 100;

        ir_pf = (to_dev - di_et) * ir_pfQ / 100;
        to_ap = co_co + de_se + fo_pr + re_ex;
        _to_aportaciones.innerHTML = to_ap.toFixed(2);
        let msg = "IRPF (".concat(ir_pfQ, "%)");
        _irpf_p.innerHTML = msg;
        _irpf_r.innerHTML = ir_pf.toFixed(2);
        let anticipos = parseFloat(an_ti);
        _anticipos.innerHTML = anticipos
        let to_ded = to_ap + ir_pf + anticipos;
        _to_deducir.innerHTML = parseFloat(to_ded).toFixed(2);
        to_a_percibir = to_dev - to_ded;
        _li_percibir.innerHTML = parseFloat(to_a_percibir).toFixed(2);
        let TT_RE = to_a_percibir + anticipos;
        _to_retribuido.innerHTML = parseFloat(TT_RE).toFixed(2);
    }