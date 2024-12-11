import { scan as treeScan, find as treeFind } from 'scripts/scanTree.js';
import { scanner as listScan } from 'scripts/scanList.js'

/** @param {NS} ns */
export async function main(ns) {
  var svrs = await listScan(ns, "home", 15);
  svrs = Array.from(svrs).filter(svr => svr != "home");
  var contracts = [];
  for (var svr of svrs) {
    var files = ns.ls(svr);
    var contract = files.filter(file => file.endsWith(".cct"));
    if(contract.length > 0) contracts.push({"svr": svr, "contracts": contract});
  }
  if(contracts.length > 0){
    ns.tprint("Contracts found on: \n");
    for (var contract of contracts) {
      ns.tprint(contract.svr," (", contract.contracts.length,"): ", contract.contracts,"\n");
    }
  } else {
    ns.tprint("No contracts found");
  }
}