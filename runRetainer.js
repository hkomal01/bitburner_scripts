import { scanner as listScan } from 'scripts/scanList.js'

export function autocomplete(data, args) {
    return [...data.servers]; // This script autocompletes the list of servers.
    //return [...data.servers, ...data.scripts]; // Autocomplete servers and scripts
    //return ["low", "medium", "high"]; // Autocomplete 3 specific strings.
}


/** @param {NS} ns */
export async function main(ns) {
  if (typeof ns.args[0] != "string") {
    ns.tprint("ERROR! USAGE: run scripts/runRetainer {string : targetServer}");
    return;
  }
  var target = ns.args[0];
  var all = Array.from(await listScan(ns, "home", 15));
  all = all.filter(svr => ns.hasRootAccess(svr));
  if (!all.includes(target)) {
    ns.tprint("ERROR! Target server does NOT exist OR is NOT rooted");
    return;
  }
  ns.run("scripts/copyAll.js");
  //ns.tprint("Running copyAll, going to run retainer...");
  var svrs = ns.getPurchasedServers();
  var purchased = svrs.filter(svr => parseInt(svr) % 2 == 0)
  if (purchased.length == 0){
    ns.tprint("No even number servers found... no instances run!");
  }
  for (var svr of purchased) { 
    ns.exec("scripts/retainSecurity.js", svr, 1, target);
    //ns.tprint("Ran on server: ", svr);
    await ns.sleep(10);
  }
  //ns.tprint("Finished.");
}