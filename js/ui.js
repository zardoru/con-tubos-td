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

// Programa principal (autoactualizacion salida)
function updVars() {
  html_set("div_tfsp", temp_pelicula_supuesta(getTs(), getTi()));

}
