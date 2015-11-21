// Funciones de utilidad
var doc_elem = document.getElementById.bind(document);
var comp_num = R.compose(parseFloat, R.prop("value"), doc_elem);
var comp_bool = R.compose(R.prop("checked"), doc_elem);

function html_set(elem, cnt) {
  doc_elem(elem).innerHTML = cnt;
}

// Funciones de datos
function esAlineado() {
  return comp_bool("ra_Alineados");
}

function getNt() {
  return comp_num("tb_N_t");
}

function getNl() {
  return comp_num("tb_N_l");
}

function getSt() {
  return comp_num("tb_S_t");
}

function getSl() {
  return comp_num("tb_S_l");
}

function getTs() {
  return comp_num("tb_T_s");
}

function getTi() {
  return comp_num("tb_T_i");
}

function getVm() {
  return comp_num("tb_V_m");
}

function getD() {
  return comp_num("tb_D");
}

function getRo() {
  return comp_num("tb_Ro");
}

function getMu() {
  return comp_num("tb_Mu");
}

function getPr() {
  return comp_num("tb_Pr");
}

function getPrs() {
  return comp_num("tb_Pr_s");
}

function getk() {
  return comp_num("tb_k");
}

function getL() {
  return comp_num("tb_l");
}

function getCp() {
  return comp_num("tb_C_p");
}

// Programa principal (autoactualizacion salida)
function msg(q) {
  if (q < 0) return "El calor se transmite en sentido contrario." + q;
  else return q;
}

function updVars() {
  var tfsp = temp_pelicula_supuesta(getTs(), getTi());
  var v_vmax = vmax(esAlineado(), getSt(), getSl(), getVm(), getD());
  var re = reynolds(v_vmax, getD(), getRo(), getMu());
  var nus = nusselt_promedio(esAlineado(), getNl(), getSt(), getSl(), re, getPr(), getPrs());
  var h = transf_calor_conveccion(nus, getk(), getD());
  var As = area_superficial(getD(), getL())
  var m = flujo_masico(getRo(), getVm(), getNt(), getSt(), getL());
  var Te = temp_salida(getTs(), getTi(), h, As, m, getCp());
  var tfspr = ratio_comprob(getTi(), Te, tfsp);
  var dt = diferencial_temperatura(getTi(), getTs(), Te);
  var q = calor(h, As, dt);
  html_set("div_tfsp", tfsp);
  html_set("div_vmax", v_vmax);
  html_set("div_re", re);
  html_set("div_Nu", nus);
  html_set("div_h", h);
  html_set("div_As", As);
  html_set("div_m", m);
  html_set("div_Te", Te);
  html_set("div_tfspr", tfspr);
  html_set("div_dt", dt);
  html_set("div_Q", msg(q));
}
