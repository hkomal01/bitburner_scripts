/** @param {NS} ns */
export async function main(ns) {
  if (typeof ns.args[0] != "number") {
    ns.tprint("ERROR!\nUSAGE: run hackAll.js {int: depth}");
    return;
  }
  var servers = await scanner(ns, "home", ns.args[0]);
  var rooted = [];
  
  for (var server of servers){
    if (ns.hasRootAccess(server)){
      rooted.push(server);
    }
  }
}