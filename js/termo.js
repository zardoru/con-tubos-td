function sq(x) {
  return x * x;
}

function vmax_alineado(st, D, Vm) {
  return st / (st - D) * Vm;
}

function vmax_escalonado(st, sl, D, Vm) {
  return st / (2 * (Math.sqrt(sq(sl) + sq(st / 2)) - D));
}

function reynolds(Vmax, D, ro, mu) {
  return Vmax * D * ro / mu;
}

function temp_pelicula_supuesta(Ts, Ti) {
  return (Ts + Ti) / 2;
}


var enRango = R.curry (function (min, max, s) {
  return s >= min && s < max;
});

var nusselt = R.curry(function (a,b,c,d, St, Sl, Re, Pr, Prs) {
  var r1 = Math.pow(Pr / Prs, 0.25);
  var r2 = Math.pow(Pr, d);
  var r3 = Math.pow(Re, c);
  var r4 = Math.pow(St / Sl, b);
  return a * r4 * r3 * r2 * r1;
})

var tabla_nusselt = {
  ecuaciones: [{
    rg: enRango(0, 100),
    val: nusselt(0.9, 0, 0.4, 0.36),
    alineado: true,
    aplicarStSl: false
  },
  {
    rg: enRango(100, 1000),
    val: nusselt(0.52, 0, 0.5, 0.36),
    alineado: true,
    aplicarStSl: false
  },
  {
    rg: enRango(1000, 200000),
    val: nusselt(0.27, 0, 0.63, 0.36),
    alineado: true,
    aplicarStSl: false
  },
  {
    rg: enRango(200000, 2000000),
    val: nusselt(0.033, 0, 0.8, 0.4),
    alineado: true,
    aplicarStSl: false
  },

  {
    rg: enRango(0, 500),
    val: nusselt(1.04, 0, 0.4, 0.36),
    alineado: false,
    aplicarStSl: false
  },
  {
    rg: enRango(500, 1000),
    val: nusselt(0.71, 0, 0.5, 0.36),
    alineado: false,
    aplicarStSl: false
  },
  {
    rg: enRango(1000, 200000),
    val: nusselt(0.35, 0.2, 0.6, 0.36),
    alineado: false,
    aplicarStSl: true
  },
  {
    rg: enRango(200000, 2000000),
    val: nusselt(0.031, 0.2, 0.8, 0.36),
    alineado: false,
    aplicarStSl: true
  },
]
}

function correccion_nusselt(F, Nu, n_tubos) {
  // generar tabla interpolada linealmente en excel (7-3)
}

function transf_calor_conveccion (Nu, k, D) {
  return Nu * k / D;
}

function flujo_masico(ro, Vm, Nt, St, L) {
  return ro * Vm * Nt * St * L;
}
