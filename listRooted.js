//Returns a list of rooted servers to the home 

//Finds max depth on connections on the continent
import { scanner } from 'scripts/scanList.js'

/** @param {NS} ns */
export async function main(ns) {
  var depth = 15;
  if (typeof ns.args[0] == "number") {
    depth = ns.args[0];
  }
  var servers = await scanner(ns, "home", depth);
  var rooted = [];
  
  ns.write("rooted.txt", "", "w");
  for (var server of servers){
    if (ns.hasRootAccess(server)){
      ns.write("rooted.txt", server);
      ns.write("rooted.txt", "\n");
      rooted.push(server);
    }
  }
  ns.tprint("Rooted ", rooted.length, "/", servers.size
            , " servers.");
  ns.tprint(rooted);
}