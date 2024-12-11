import { scanner as listScan } from 'scripts/scanList.js'

/** @param {NS} ns */
export async function main(ns) {
  var svrs = await listScan(ns, "home", 15);
  svrs = Array.from(svrs);
  var rooted = svrs.filter(svr => ns.hasRootAccess(svr));
  var lvl = ns.getHackingLevel();
  var hackable = rooted.filter(svr => ns.getServerRequiredHackingLevel(svr) <= lvl);
  ns.tprint("User hacking level: ", lvl);
  var out = "\n";
  for (var svr of hackable){
    var money = ns.getServerMaxMoney(svr);
    var avail = ns.getServerMoneyAvailable(svr);
    var lvlreq = ns.getServerRequiredHackingLevel(svr);
    var growth = ns.getServerGrowth(svr);
    out = out.concat(svr, 
                     "\n     HAS   : $", avail.toLocaleString(),
                     "\n     MAX   : $", money.toLocaleString(),
                     "\n     GROWTH: ",  growth,
                     "\n     LVLREQ: ", lvlreq, "\n");
  }
  ns.tprint(out);
}