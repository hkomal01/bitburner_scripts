import { scanner as listScan } from 'scripts/scanList.js'

export function autocomplete(data, args) {
    return [...data.servers]; // This script autocompletes the list of servers.
    //return [...data.servers, ...data.scripts]; // Autocomplete servers and scripts
    //return ["low", "medium", "high"]; // Autocomplete 3 specific strings.
}

/** @param {NS} ns */
export async function main(ns) {
  if (typeof ns.args[0] != "string") {
    ns.tprint("ERROR! USAGE: \"run incMoney.js {string : server name}\"\n");
    return;
  }
  var svrs = Array.from(await listScan(ns, "home", 15));
  var rooted = svrs.filter(svr => ns.hasRootAccess(svr));
  if (!rooted.includes(ns.args[0])) {
    ns.tprint("ERROR! Server does NOT exist OR is NOT rooted\n");
  }
  while(true){
    await ns.sleep(10);
    ns.hacknet.spendHashes("Increase Maximum Money", ns.args[0]);
  }
}