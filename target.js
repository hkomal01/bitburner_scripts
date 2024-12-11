export function autocomplete(data, args) {
    return [...data.servers]; // This script autocompletes the list of servers.
    //return [...data.servers, ...data.scripts]; // Autocomplete servers and scripts
    //return ["low", "medium", "high"]; // Autocomplete 3 specific strings.
}

//Assigns all servers to hack a single server

import { scan as treeScan, find as treeFind, getNode } from 'scripts/scanTree.js';
import { scanner as listScan } from 'scripts/scanList.js'

/** @param {NS} ns */
export async function main(ns) {
  var blacklist = ["home", 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];
  blacklist = blacklist.map(svr => svr.toString());
  var hackmult = .8;
  if (typeof ns.args[0] != "string") {
    ns.tprint("ERROR!\nUSAGE: run scripts/target.js [string: targetServer]");
    return;
  }
  if (typeof ns.args[1] == "number") {
    hackmult = ns.args[1];
  }
  var botmult = (1-hackmult)/2;
  var svrs = await listScan(ns, "home", 15);
  svrs = Array.from(svrs);
  var rooted = svrs.filter(svr => ns.hasRootAccess(svr));
  var target = ns.args[0];
  var lvl = ns.getHackingLevel();
  var script = "scripts/helper-target.js";
  if (!rooted.includes(target)) {
    ns.tprint("\nERROR\nTarget server not found or is NOT rooted");
    return;
  }
  var homefree = ns.getServerMaxRam("home") * .75;
  var weakthreads = parseInt((homefree/2) / (ns.getScriptRam("scripts/weakenBot.js")));
  var growthreads = parseInt((homefree/2) / (ns.getScriptRam("scripts/growBot.js")));
  ns.run("scripts/weakenBot.js", weakthreads - 2, target);
  ns.tprint("Ran weaken bot with ", weakthreads," threads... grow bot will spawn after all servers run...");
  var totalTThreads = 0;
  var totalWGThreads = 0;
  for (var svr of rooted){
    ns.scp(script, svr, "home");
    ns.scp("scripts/weakenBot.js", svr, "home");
    ns.scp("scripts/growBot.js", svr, "home");
    var ram = ns.getScriptRam(script);
    var ram2 = ns.getScriptRam("scripts/weakenBot.js");
    var free = ns.getServerMaxRam(svr) - ns.getServerUsedRam(svr);
    var threadstarg = parseInt(free*hackmult/ram);
    var threadswg = parseInt(free*botmult/ram2);
    if (!threadstarg && !threadswg){
      ns.tprint("ERROR: Failed to run on server ", svr, " with ", threadstarg, "/", threadswg, " threads [NO FREE RAM]");
      continue;
    }
    var lvlReq = ns.getServerRequiredHackingLevel(svr);
    if (blacklist.includes(svr)) {
      continue;
    }
    if (lvlReq > lvl){
      ns.tprint("ERROR: Failed to run on server ", svr, " with ", threadstarg, "/", threadswg, " threads [LVLREQ = ", lvlReq,"]");
      continue;
    }
    
    if (threadswg){ 
      totalWGThreads += threadswg;
      var pid2 = ns.exec("scripts/weakenBot.js", svr, threadswg, target);
      var pid3 = ns.exec("scripts/growBot.js", svr, threadswg, target);
    }
    var pid = ns.exec(script, svr, threadstarg, target);
    if (!pid) {
      ns.tprint("ERROR: Failed to run on server ", svr, " with ", threadstarg, "/", threadswg, " threads [EXEC FAIL]");
    } else {
      totalTThreads += threadstarg;
      ns.tprint("Ran on server ", svr, " with ", threadstarg, "/", threadswg, " threads and PID: ", pid);
    }
    await ns.sleep(10);
  }
  ns.tprint("Total target    threads ran: ", totalTThreads);
  ns.tprint("Total weak/grow threads ran: ", totalWGThreads*2, " (", totalWGThreads, " each).");
  ns.tprint("Total overall   threads ran: ", totalTThreads+totalWGThreads*2);
  ns.tprint("Grow bot will spawn in ~10 seconds...");
  ns.spawn("scripts/growBot.js", growthreads - 2, target);
}