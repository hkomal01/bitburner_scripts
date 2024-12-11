import { scan as treeScan, find as treeFind } from 'scripts/scanTree.js';
import { scanner as listScan } from 'scripts/scanList.js'

/** @param {NS} ns */
export async function main(ns) {
  var svrs = Array.from(await listScan(ns, "home", 16));
  var purchased = ns.getPurchasedServers();
  purchased.push("home");
  ns.tprint("Built server list...");
  var notb = svrs.filter(svr => !ns.getServer(svr).backdoorInstalled);
  var b = svrs.filter(svr => ns.getServer(svr).backdoorInstalled);
  svrs = svrs.filter(svr => !purchased.includes(svr));
  b = b.filter(svr => !purchased.includes(svr));
  notb = notb.filter(svr => !purchased.includes(svr));
  ns.tprint("Have backdoored (", b.length,"/", svrs.length, "): \n", b, "\n");
  ns.tprint("Haven't backdoored (", notb.length,"/", svrs.length, "): \n", notb);
}