export function autocomplete(data, args) {
    return [...data.servers]; // This script autocompletes the list of servers.
    //return [...data.servers, ...data.scripts]; // Autocomplete servers and scripts
    //return ["low", "medium", "high"]; // Autocomplete 3 specific strings.
}

import { scanner as listScan } from 'scripts/scanList.js'

//Needs signficant ram to work well

/** @param {NS} ns */
export async function main(ns) {
  var svrs = await listScan(ns, "home", 15);
  svrs = Array.from(svrs).filter(svr => ns.hasRootAccess(svr));
  for (var svr of svrs){
    await ns.sleep(100);
    var minlvl = ns.getServerMinSecurityLevel(svr);
    var currlvl = ns.getServerSecurityLevel(svr);
    if (minlvl >= currlvl) {
      ns.tprint("Server ", svr, " already weak");
      continue;
    }
    var scriptRam = ns.getScriptRam("scripts/helper-killSecurity.js");
    var free = (ns.getServerMaxRam("home") - ns.getServerUsedRam("home"));
    while(free < scriptRam) {
      free = (ns.getServerMaxRam("home") - ns.getServerUsedRam("home"));
      ns.tprint("Not enough ram for murderSecurity, sleeping for 10s...");
      await ns.sleep(10000);
    }
    var reqThreads = parseInt((currlvl - minlvl) / .05) + 1;
    var numThreads = parseInt(free/scriptRam);
    while(currlvl > minlvl){
      await ns.sleep(100);
      var time = ns.getWeakenTime(svr);
      if(reqThreads > numThreads){
        ns.run("scripts/helper-killSecurity.js", numThreads, svr);
        reqThreads = reqThreads - numThreads;
        currlvl = currlvl - ns.weakenAnalyze(numThreads, 5);
        //await ns.sleep(time);
      } else {
        ns.run("scripts/helper-killSecurity.js", reqThreads, svr);
        currlvl = minlvl;
        //await ns.sleep(time);
      }
    }
    ns.tprint("Finished. Server ", svr, " to be weakened to: ", minlvl);
  }
  ns.tprint("All servers maximally weakened.");
}