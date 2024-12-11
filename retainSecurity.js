export function autocomplete(data, args) {
    return [...data.servers]; // This script autocompletes the list of servers.
    //return [...data.servers, ...data.scripts]; // Autocomplete servers and scripts
    //return ["low", "medium", "high"]; // Autocomplete 3 specific strings.
}

/** @param {NS} ns */
export async function main(ns) {
  if (typeof ns.args[0] != "string"){
    ns.tprint("ERROR! Usage: run scripts/retainSecurity {string: server}");
    return;
  } 
  var crackmode = true;
  var svr = ns.args[0];
  var curr = ns.getHostname();
  var sram = ns.getScriptRam("scripts/helper-killSecurity.js");
  var reqlvl = ns.getServerMinSecurityLevel(svr);
  while (true) {
    await ns.sleep(1);
    var time = ns.getWeakenTime(svr);
    var free = ns.getServerMaxRam(curr) - ns.getServerUsedRam(curr);
    var ts = parseInt(free/sram);
    if(free < sram) {
      //ns.print("No free ram...");
      await ns.sleep(100);
      continue;
    }
    var currlvl = ns.getServerSecurityLevel(svr);
    if (currlvl <= reqlvl) {
      var weaks = 20;
      if (crackmode) weaks = 100;
      if (ts < weaks) {
        ns.run("scripts/helper-killSecurity.js", ts, svr);
        await ns.sleep(time);
        continue;
      }
      ns.run("scripts/helper-killSecurity.js", weaks, svr);
      continue;
    }
    var weaks = Math.ceil((currlvl - reqlvl) / .05) * 2;
    weaks = weaks < 20 ? 20 : weaks;
    if (ts < weaks) {
      //ns.print("Not enough free ram to full weaken...");
      ns.run("scripts/helper-killSecurity.js", ts, svr);
      await ns.sleep(time/2);
      continue;
    }
    var div = ts/weaks;
    var split = time/div;
    while (ts >= weaks) {
      //ns.print("Ran split");
      ns.run("scripts/helper-killSecurity.js", weaks, svr);
      ts -= weaks;
      if (crackmode) await ns.sleep(1);
      else await ns.sleep(split);
    }
  }
}