/** @param {NS} ns */
export async function main(ns) {
  var connArr = ns.scan("home");
  for (var i = 0; i < connArr.length; i++) {
    var curr = connArr[i];
    if (curr == null) continue;
    var toCon = await ns.scan(connArr[i]);
    for (var j = 0; j < toCon.length; j++) {
      if (toCon[j] == "home" || toCon[j] == curr) {
        toCon[j] = null;
      }
    }
    connArr = connArr.concat(toCon);
    if (!ns.hasRootAccess(curr)) {
      if (ns.getServerSecurityLevel(curr) > ns.getHackingLevel())
        continue;
      if (ns.getServerNumPortsRequired(curr) > 1)
        continue;
      do {
        ns.nuke(curr);
        await ns.sleep(1000);
      } while (ns.hasRootAccess(curr))
      ns.write("rooted.txt", curr);
      ns.write("rooted.txt", "\n");
    }
    await ns.sleep(1000);
  }
}