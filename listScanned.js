//Returns single set list of all scanned servers within a 
//certain depth of the home directory

import { scanner } from 'scripts/scanList.js'

/** @param {NS} ns */
export async function main(ns) {
  var scanned = await scanner(ns, "home", 16);
  var arr = Array.from(scanned);
  var file = ns.read("servers.txt");
  ns.write("servers.txt", "", "w");
  for (var i = 0; i < arr.length; i++) {
    ns.write("servers.txt", arr[i]);
    ns.write("servers.txt", "\n");
  }
  ns.tprint(Array.from(scanned));
}