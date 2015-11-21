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
  },
  {
    rg: enRango(100, 1000),
    val: nusselt(0.52, 0, 0.5, 0.36),
    alineado: true,
  },
  {
    rg: enRango(1000, 200000),
    val: nusselt(0.27, 0, 0.63, 0.36),
    alineado: true,
  },
  {
    rg: enRango(200000, 2000000),
    val: nusselt(0.033, 0, 0.8, 0.4),
    alineado: true,
  },

  {
    rg: enRango(0, 500),
    val: nusselt(1.04, 0, 0.4, 0.36),
    alineado: false,
  },
  {
    rg: enRango(500, 1000),
    val: nusselt(0.71, 0, 0.5, 0.36),
    alineado: false,
  },
  {
    rg: enRango(1000, 200000),
    val: nusselt(0.35, 0.2, 0.6, 0.36),
    alineado: false,
  },
  {
    rg: enRango(200000, 2000000),
    val: nusselt(0.031, 0.2, 0.8, 0.36),
    alineado: false,
  },
]
}

function correccion_nusselt(alineado, Nl) {
  var arr_alin = [0.7, 0.8, 0.86, 0.9, 0.93, 0.93, 0.96, 0.96, 0.96, 0.98, 0.98, 0.98, 0.99, 0.99, 0.99];
  var arr_escal = [0.64, 0.76, 0.84, 0.89, 0.93, 0.93, 0.96, 0.96, 0.96, 0.98, 0.98, 0.98, 0.99, 0.99, 0.99];

  if (Nl < 16 && Nl >= 1)
  {
    if (alineado) return arr_alin[Nl - 1];
    else return arr_escal[Nl - 1];
  }
  else return 1;
}

function transf_calor_conveccion (Nu, k, D) {
  return Nu * k / D;
}

function flujo_masico(ro, Vm, Nt, St, L) {
  return ro * Vm * Nt * St * L;
}

function area_superficial(D, L, Nt, Nl) {
  return Math.PI * D * L * Nt * Nl;
}

function temp_salida(Ts, Ti, h, As, m, Cp) {
  return Ts - (Ts - Ti) * Math.exp( - (h * As) / (m * Cp) );
}

function ratio_comprob(Ti, Te, Tfsp) {
  return (Ti + Te) * 0.5 / Tfsp;
}

function diferencial_temperatura(Ti, Ts, Te) {
  return (Ti - Te) / Math.log( (Ts - Te) / (Ts - Ti) );
}

function calor(h, as, dt) {
  return h * as * dt;
}

function vmax(alineado, St, Sl, Vm, D) {
  if (alineado) return vmax_alineado(St, D, Vm);
  else return vmax_escalonado(St, Sl, D, Vm);
}

function nusselt_promedio(alineado, Nl, St, Sl, Re, Pr, Prs) {
  var ecu = tabla_nusselt.ecuaciones;
  var val_correccion = correccion_nusselt(alineado, Nl);

  // buscar ecuacion en rango y con mismo tipo de configuracion geométrica
  for (var i in ecu) {
    if (ecu[i].alineado == alineado && ecu[i].rg(Re)) {
      var correlacion = ecu[i].val;
      return correlacion(St, Sl, Re, Pr, Prs);
    }
  }
}
