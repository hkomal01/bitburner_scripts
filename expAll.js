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
  var svrs = Array.from(await listScan(ns, "home", 15));
  //var purchased = ns.getPurchasedServers();
  svrs = svrs.filter(svr => svr != "home");
  for (var svr of svrs){
    ns.run("scripts/exp.js", 1, svr);
    ns.tprint("Ran on server: ", svr);
    await ns.sleep(250);
  }
  ns.tprint("Finished expAll.js");

}