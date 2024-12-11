/** @param {NS} ns */
export async function main(ns) {
  if (typeof ns.args[0] != "string") {
    ns.tprint("ERROR!\nUSAGE: run spamServer.js {file: servers.txt} {file : script.js}");
    return;
  }
  if (typeof ns.args[1] != "string") {
    ns.tprint("ERROR!\nUSAGE: run spamServer.js {file: servers.txt} {file : script.js}");
    return;
  }
  var curr = ns.getHostname();
  var file = ns.read(ns.args[0]);
  var script = ns.args[1];
  var lines = file.split("\n");
  lines = lines.filter(line => line.trim() != '');
  var ramNeeded = ns.getScriptRam(script);
  ns.tprint(ramNeeded);
  // for (var i = 0; i < lines.length; i++) {
  //   ns.exec("scripts/spamServer.js", curr);
  //   var curr = lines[i];
  //   await ns.sleep(100);
  // }
  //await ns.sleep(60000);
  for (var i = 0; i < lines.length; i++) {
    var curr = lines[i];
    ns.tprint(curr);
    if (curr == "home") {
      continue;
    }
    if (ns.getServerRequiredHackingLevel(curr)
        > ns.getHackingLevel()) 
      {
        continue;
      }
    while ((ns.getServerMaxRam(curr) - ns.getServerUsedRam(curr)) >= ramNeeded)
    {
      ns.tprint("     RAN");
      ns.exec(script, curr);
      await ns.sleep(100);
    }
    await ns.sleep(100);
  }
}