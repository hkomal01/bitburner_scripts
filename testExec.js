/** @param {NS} ns */
export async function main(ns) {
  var server = "max-hardware";
  var script = "scripts/spamHack.js";
  var pid = ns.exec(script, server);
  if (!pid) {
    ns.tprint("Exec failed");
  } else {
    ns.tprint("Exec success");
  }
  ns.tprint("Exiting...");
}