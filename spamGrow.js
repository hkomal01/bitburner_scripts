/** @param {NS} ns */
export async function main(ns) {
var curr = ns.getHostname();
  var lvl = ns.getHackingLevel();
  while(!ns.hasRootAccess(curr)) {
    ns.nuke(curr);
  }

  while(true) {
    await ns.grow(curr);
    await ns.sleep(1000);
  }
}