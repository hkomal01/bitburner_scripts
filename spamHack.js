/** @param {NS} ns */
export async function main(ns) {
  var curr = ns.getHostname();
  var lvl = ns.getHackingLevel();
  while(!ns.hasRootAccess(curr)) {
    if (lvl < ns.getServerMinSecurityLevel(curr)) {
      await ns.sleep(60000);
      continue;
    } else if (lvl < ns.getServerMinSecurityLevel(curr)) {
      await ns.weaken(curr);
      continue;
    }
    ns.nuke(curr);
  }
  while(true) {
    await ns.weaken(curr);
    await ns.hack(curr);
    await ns.grow(curr);
    await ns.sleep(100);
  }
}