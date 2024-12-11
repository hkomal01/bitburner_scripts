/** @param {NS} ns */
export async function main(ns) {
  if (typeof ns.args[0] != "string") {
    ns.tprint("ERROR!\nUSAGE: run scripts/helper-target.js [string: targetServer]");
    return;
  }
  var curr = ns.args[0];
  while(true) {
    var mult = 2;
    while (mult > 1){
      mult = await ns.grow(curr);
      await ns.sleep(1);
    }
    var hack = 1;
    while (hack > 0) {
      hack = await ns.hack(curr);
      await ns.sleep(1);
    }
    //await ns.weaken(curr);
    await ns.sleep(1);
  }
}