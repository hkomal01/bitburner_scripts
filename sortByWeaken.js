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
  var purchased = ns.getPurchasedServers();
  svrs = svrs.filter(svr => !purchased.includes(svr));
  svrs = svrs.sort((svr1, svr2) => ns.getWeakenTime(svr1) - ns.getWeakenTime(svr2));
  ns.tprint(svrs);
  for (var svr of svrs){
    var time = new Date(0);
    time.setSeconds(parseInt(ns.getWeakenTime(svr)/1000));
    //ns.tprint(ns.getWeakenTime(svr)/1000)
    var str = time.toISOString().substring(14, 19);
    ns.tprint("Server: ", svr, " weakens in ", str, " minutes.");
  }
} 