export function autocomplete(data, args) {
    return [...data.servers]; // This script autocompletes the list of servers.
    //return [...data.servers, ...data.scripts]; // Autocomplete servers and scripts
    //return ["low", "medium", "high"]; // Autocomplete 3 specific strings.
}

/** @param {NS} ns */
export async function main(ns) {
  if (typeof ns.args[0] != "string"){
    ns.tprint("ERROR! Usage: run scripts/continuousGrowth.js {string: server}");
    return;
  } 
  var max = 1000;
  for (var i = 0; i < max; i++) {
    ns.run("scripts/runExpand.js", 1, ns.args[0]);
    ns.run("scripts/runRetainer.js", 1, ns.args[0]);
    ns.print(i);
    //await ns.sleep(1);
  }
  ns.tprint("Finished :)");
}