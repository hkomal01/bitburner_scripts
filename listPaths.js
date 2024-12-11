//List paths to all rooted directories

import { scan as treeScan, find as treeFind } from 'scripts/scanTree.js';
import { scanner as listScan } from 'scripts/scanList.js'

/** @param {NS} ns */
export async function main(ns) {
  var root = await treeScan(ns, 15);
  ns.tprint("Built server tree...");
  var svrs = Array.from(await listScan(ns, "home", 15));
  ns.tprint("Built server list...");
  var string = "\n";
  //Future: Use DP to store paths we already have to certain nodes
  for (var svr of svrs) {
    if (svr == "home") continue;
    string = string.concat("home -> ");
    var path = treeFind(root, "home", svr);
    if (path.length == 0) continue;
    for (var p of path) {
      string = string.concat(p.name, " -> ");
    }
    string = string.substring(0, string.lastIndexOf(" -> "));
    string = string.concat("\n");  
  }
  ns.tprint(string);
}