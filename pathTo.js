export function autocomplete(data, args) {
    return [...data.servers]; // This script autocompletes the list of servers.
    //return [...data.servers, ...data.scripts]; // Autocomplete servers and scripts
    //return ["low", "medium", "high"]; // Autocomplete 3 specific strings.
}
//List paths to all rooted directories

import { scan as treeScan, find as treeFind } from 'scripts/scanTree.js';
import { scanner as listScan } from 'scripts/scanList.js'

/** @param {NS} ns */
export async function main(ns) {
  if (typeof ns.args[0] != "string") {
    ns.tprint("ERROR: USAGE run scripts/pathTo.js {string: targetServer}");
  }
  var curr = ns.getHostname();
  var root = await treeScan(ns, 16);
  ns.tprint("Built server tree...");
  var svr = ns.args[0];
  var string = "\n";
  //string = string.concat("home -> ");
  var path = treeFind(root, curr, svr);
  if (path.length == 0) {
    ns.tprint("No path to ", svr);
    return;
  }
  for (var p of path) {
    string = string.concat("connect ", p.name, "; ");
  }
  string = string.substring(0, string.lastIndexOf("; "));
  string = string.concat("\n");  
  ns.tprint(string);
  navigator.clipboard.writeText(string);
}