export function autocomplete(data, args) {
    return [...data.servers]; // This script autocompletes the list of servers.
    //return [...data.servers, ...data.scripts]; // Autocomplete servers and scripts
    //return ["low", "medium", "high"]; // Autocomplete 3 specific strings.
}

/** @param {NS} ns */
export async function main(ns) {
  if (typeof ns.args[0] != "string"){
    ns.tprint("ERROR! Usage: run scripts/continuousGrowth.js {string: server}");
    return;
  } 
  var svr = ns.args[0];
  var svro = ns.getServer(svr);
  var me = ns.getPlayer();
  var curr = ns.getHostname();
  var sram = ns.getScriptRam("scripts/helper-continuousGrowth.js");
  var reqlvl = ns.getServerMinSecurityLevel(svr);
  var currlvl = ns.getServerSecurityLevel(svr);
  var crackmode = true;
  //TODO: make sure we have enough ram to run this script before running,
  if (currlvl > reqlvl) {
    ns.run("scripts/killSecurity.js", 1, svr);
    //ns.tprint("Server security not at minimum on launch... killing security.");
    await ns.sleep(10);
    while (ns.isRunning("scripts/killSecurity.js", undefined, svr)) {
      //ns.tprint("Waiting for weaken, sleeping for 10 seconds...");
      await ns.sleep(10);
    }
  }
  while(true){
    await ns.sleep(1);
    var time = ns.getGrowTime(svr);
    var free = ns.getServerMaxRam(curr) - ns.getServerUsedRam(curr);
    var ts = parseInt(free/sram);
    if(free < sram) {
      //ns.print("No free ram...");
      await ns.sleep(100);
      continue;
    }

    //ANOTHER script like this BUT instead fpr [hacking] (like we did weaekn and now grow) 
    //continuously would increase monetary gains exponentially....

    //var growthrate = ns.formulas.hacking.growPercent(svr);
    var grows = ns.formulas.hacking.growThreads(svro, me, ns.getServerMaxMoney(svr), 8);
    
    grows = grows < 20 ? 20 : grows;
    if (ts < grows) {
      //ns.print("Not enough free ram to full weaken...");
      ns.run("scripts/helper-continuousGrowth.js", ts, svr);
      await ns.sleep(time/2);
      continue;
    }
    var div = ts/grows;
    var split = time/div;
    while (ts >= grows) {
      //ns.print("Ran split");
      ns.run("scripts/helper-continuousGrowth.js", grows, svr);
      ts -= grows;
      if (crackmode) await ns.sleep(1);
      else await ns.sleep(split);
    }
  }
}