//Copy certain script to all servers in a txt file
export function autocomplete(data, args) {
    //return [...data.servers]; // This script autocompletes the list of servers.
    return [...data.servers, ...data.scripts]; // Autocomplete servers and scripts
    //return ["low", "medium", "high"]; // Autocomplete 3 specific strings.
}
import { scan as treeScan, find as treeFind } from 'scripts/scanTree.js';
import { scanner as listScan } from 'scripts/scanList.js'

/** @param {NS} ns */
export async function main(ns) {
  if (typeof ns.args[0] != "string"){
    ns.tprint("ERROR\nUSAGE: run scripts/copyToScanned.js {file : fileToCopy}")
  }
  var lines = await listScan(ns, "home", 15);
  var script = ns.args[0];
  lines = Array.from(lines).filter(line => ns.hasRootAccess(line));
  ns.tprint(script);
  ns.tprint(lines);
  for (var line of lines){
    var status = await ns.scp(script, line, "home");
    if (!status) {
      ns.tprint("Failed to SCP to server ", line);
    }
  }
}