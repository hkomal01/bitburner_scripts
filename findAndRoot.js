//Finds and roots every *rootable* server from home

import { scan as treeScan, find as treeFind } from 'scripts/scanTree.js';
import { scanner as listScan } from 'scripts/scanList.js'


/** @param {NS} ns */
export async function main(ns) {
  var servers = await listScan(ns, "home", 16);
  ns.tprint("Built server list...");
  //var root = await treeScan(ns, 15);
  //ns.tprint("Built server tree...");
  var home = "home";
  var rooted = 0;
  var port = 0;
  if (ns.fileExists("BruteSSH.exe", home)) port++;
  if (ns.fileExists("FTPCrack.exe", home)) port++;
  if (ns.fileExists("relaySMTP.exe", home)) port++;
  if (ns.fileExists("HTTPWorm.exe", home)) port++;
  if (ns.fileExists("SQLInject.exe", home)) port++;

  for (var server of servers){
    if (!ns.hasRootAccess(server)){
      if (ns.getServerNumPortsRequired(server) > port){
        //ns.tprint("Could not root ", server, "...");
        continue;
      }

      if (port >= 1) ns.brutessh(server);
      if (port >= 2) ns.ftpcrack(server);
      if (port >= 3) ns.relaysmtp(server);
      if (port >= 4) ns.httpworm(server);
      if (port >= 5) ns.sqlinject(server);
      
      ns.nuke(server);
      ns.tprint("Rooted ", server);
      rooted++;
    }
  }

  ns.tprint("Total: ", rooted, " servers.");
}