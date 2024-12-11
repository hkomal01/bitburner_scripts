/** @param {NS} ns */
export async function main(ns) {
  while(true){
    await ns.sleep(.1);
    ns.hacknet.spendHashes("Sell for Money");
  }
}