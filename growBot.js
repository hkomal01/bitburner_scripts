/** @param {NS} ns */
export async function main(ns) {
  //arg 1L server to grow
  var svr = ns.args[0];
  while(true){
    await ns.grow(svr);
    await ns.sleep(1);
  }
}