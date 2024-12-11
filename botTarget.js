//Assigns all servers to hack a single server

import { scan as treeScan, find as treeFind, getNode } from 'scripts/scanTree.js';
import { scanner as listScan } from 'scripts/scanList.js'

/** @param {NS} ns */
export async function main(ns) {
  if (typeof ns.args[0] != "string") {
    ns.tprint("ERROR!\nUSAGE: run scripts/target.js [string: targetServer]");
    return;
  }
  var svrs = await listScan(ns, "home", 15);
  svrs = Array.from(svrs);
  var rooted = svrs.filter(svr => ns.hasRootAccess(svr));
  var target = ns.args[0];
  var lvl = ns.getHackingLevel();
  var script = "scripts/growBot.js";
  if (!rooted.includes(target)) {
    ns.tprint("\nERROR\nTarget server not found or is NOT rooted");
    return;
  }
  var homefree = ns.getServerMaxRam("home");
  var weakthreads = parseInt((homefree/2) / (ns.getScriptRam("scripts/weakenBot.js")));
  var growthreads = parseInt((homefree/2) / (ns.getScriptRam("scripts/growBot.js")));
  for (var svr of rooted){
    ns.scp("scripts/helper-target.js", svr, "home");
    var ram = ns.getScriptRam(script);
    var free = ns.getServerMaxRam(svr) - ns.getServerUsedRam(svr);
    var threads = parseInt(free/ram);
    if (!threads){
      ns.tprint("ERROR: Failed to run on server ", svr, " with ", threads, " threads [NO FREE RAM]");
      continue;
    }
    var lvlReq = ns.getServerRequiredHackingLevel(svr);
    if (svr == "home") {
      continue;
    }
    if (lvlReq > lvl){
      ns.tprint("ERROR: Failed to run on server ", svr, " with ", threads, " threads [LVLREQ = ", lvlReq,"]");
      continue;
    }
    var pid = ns.exec(script, svr, threads, target);
    if (!pid) {
      ns.tprint("ERROR: Failed to run on server ", svr, " with ", threads, " threads [EXEC FAIL]");
    } else {
      ns.tprint("Ran on server ", svr, " with ", threads, " threads and PID: ", pid);
    }
    await ns.sleep(100);
  }
  ns.run("scripts/weakenBot.js", weakthreads - 2, target);
  ns.tprint("Ran weaken bot... grow bot will spawn in ~10 seconds...");
  ns.spawn("scripts/growBot.js", growthreads - 2, target);
}