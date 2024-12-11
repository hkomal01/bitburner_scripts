/** @param {NS} ns */
export async function main(ns) {
  if (typeof ns.args[0] != "string" && typeof ns.args[0] != "number") {
    ns.tprint("ERROR: USAGE run scripts/exp.js {string: targetServer}");
  }
  var svr = ns.args[0].toString();
  //var ram = ns.getScriptRam("scripts/exp.js");
  var scriptram = ns.getScriptRam("scripts/weakenBot.js");
  var free = ns.getServerMaxRam(svr) - ns.getServerUsedRam(svr);
  var threads = parseInt(free/scriptram);
  if (threads){
    ns.exec("scripts/weakenBot.js", svr, threads, "n00dles");
    ns.tprint("Success! Ran ", threads, " weakenBots on ", svr);
  }
  else ns.tprint("No free ram!");
}