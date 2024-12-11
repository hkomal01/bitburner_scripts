import { scan as treeScan, find as treeFind } from 'scripts/scanTree.js';
import { scanner as listScan } from 'scripts/scanList.js'

/** @param {NS} ns */
export async function main(ns) {
  var svrs = await listScan(ns, "home", 15);
  svrs = Array.from(svrs).filter(svr => svr != "home");
  var scripts = ns.ls("home");
  scripts = scripts.filter(script => script.startsWith("scripts/"));
  for (var svr of svrs) {
    ns.scp(scripts, svr, "home");
  }
}