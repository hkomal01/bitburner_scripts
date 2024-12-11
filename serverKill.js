import { scanner as listScan } from 'scripts/scanList.js'

/** @param {NS} ns */
export async function main(ns) {
  var svrs = await listScan(ns, "home", 15);
  svrs = Array.from(svrs);
  var rooted = svrs.filter(svr => ns.hasRootAccess(svr));
  rooted = rooted.filter(svr => svr.startsWith("hacknet-server-"));
  for (var svr of rooted){
    ns.killall(svr);
  }
  ns.tprint("All scripts killed on servers...");
}