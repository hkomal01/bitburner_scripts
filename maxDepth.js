//Finds max depth on connections on the continent
import { scanner } from 'scripts/scanList.js'

/** @param {NS} ns */
export async function main(ns) {
  var prev = -1;
  var curr = 0;
  var depth = 0;
  while (prev != curr) {
    depth++;
    prev = curr;
    var scanned = await scanner(ns, "home", depth);
    scanned = Array.from(scanned);
    curr = scanned.length;
  }
  ns.tprint("Max depth is ", depth-1);
}