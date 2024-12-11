export function autocomplete(data, args) {
    return [...data.servers]; // This script autocompletes the list of servers.
    //return [...data.servers, ...data.scripts]; // Autocomplete servers and scripts
    //return ["low", "medium", "high"]; // Autocomplete 3 specific strings.
}
//Needs signficant ram to work well

/** @param {NS} ns */
export async function main(ns) {
  if (typeof ns.args[0] != "string") {
    ns.tprint("ERROR: USAGE run scripts/killSecurity.js {string: targetServer}");
  }
  var minlvl = ns.getServerMinSecurityLevel(ns.args[0]);
  var currlvl = ns.getServerSecurityLevel(ns.args[0]);
  if (minlvl >= currlvl) {
    //ns.tprint("Server ", ns.args[0], " already weak");
    return;
  }
  var scriptRam = ns.getScriptRam("scripts/helper-killSecurity.js");
  var free = (ns.getServerMaxRam("home") - ns.getServerUsedRam("home"));
  while(free < scriptRam) {
    free = (ns.getServerMaxRam("home") - ns.getServerUsedRam("home"));
    ns.tprint("Not enough ram for killSecurity, sleeping for 10s...");
    await ns.sleep(10000);
  }
  var reqThreads = parseInt((currlvl - minlvl) / .05) + 1;
  var numThreads = parseInt(free/scriptRam);
  while(currlvl > minlvl){
    var time = ns.getWeakenTime(ns.args[0]);
    if(reqThreads > numThreads){
      ns.run("scripts/helper-killSecurity.js", numThreads, ns.args[0]);
      reqThreads = reqThreads - numThreads;
      currlvl = currlvl - ns.weakenAnalyze(numThreads, 1);
      await ns.sleep(time + 5000);
    } else {
      ns.run("scripts/helper-killSecurity.js", reqThreads, ns.args[0]);
      currlvl = minlvl;
      //await ns.sleep(time + 5000);
    }
    reqThreads = reqThreads - numThreads;
    if (reqThreads <= 0 && currlvl > minlvl) {
      reqThreads = 1;
    }
    await ns.sleep(100);
  }
  //ns.tprint("Finished. Server ", ns.args[0], " to be weakened to: ", minlvl);
}