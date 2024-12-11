/** @param {NS} ns */
export async function main(ns) {

  await ns.sleep(1000);
  var cap = 1;
  if (typeof ns.args[0] == "number") {
    cap = ns.args[0];
  }
  while(true) {
    await ns.sleep(100);
    var money = ns.getServerMoneyAvailable("home");
    var max = 30;
    var len = ns.hacknet.numNodes();
    var nodeNums = [...Array(len).keys()];
    var tier1 = nodeNums.filter(node => ns.hacknet.getNodeStats(node).level < 60 
                                        || ns.hacknet.getNodeStats(node).ram < 128 
                                        || ns.hacknet.getNodeStats(node).cores < 12);
    var toMax = nodeNums.filter(node => ns.hacknet.getNodeStats(node).level >= 60 
                                        && ns.hacknet.getNodeStats(node).ram >= 128 
                                        && ns.hacknet.getNodeStats(node).cores >= 12);
    var maxed = nodeNums.filter(node => ns.hacknet.getNodeStats(node).level == 200 
                                        && ns.hacknet.getNodeStats(node).ram == 2048 
                                        && ns.hacknet.getNodeStats(node).cores == 32);
    if ((money >= ns.hacknet.getPurchaseNodeCost() || nodeNums.length <= 0) && (nodeNums.length <= 30 || !cap)) {
      ns.hacknet.purchaseNode();
      continue;
    }
    if(maxed.length == len) {
      ns.print("All nodes maxed, waiting one minute");
      await ns.sleep(60000);
      continue;
    }
    //Get number of upgrades each node can do
    var nodes = [];
    for (var node of tier1) {
      var stats = ns.hacknet.getNodeStats(node);
      var lvl, ram, core, cache;
      var curr = stats.level;
      var mon = money;
      for (lvl = 0; (lvl + curr) < 60 && mon >= ns.hacknet.getLevelUpgradeCost(node, lvl + 1); lvl++);
      mon -= ns.hacknet.getLevelUpgradeCost(node, lvl);
      curr = stats.ram;
      for (ram = 0; (Math.pow(2, ram) * curr) < 128 && mon >= ns.hacknet.getRamUpgradeCost(node, ram + 1); ram++);
      mon -= ns.hacknet.getLevelUpgradeCost(node, ram);
      curr = stats.cores;
      for(core = 0; (core + curr + 1) <= 12 && mon >= ns.hacknet.getCoreUpgradeCost(node, core + 1); core++);
      mon -= ns.hacknet.getCoreUpgradeCost(node, core);
      curr = stats.cache;
      for(cache = 0; (cache + curr) < 5 && mon >= ns.hacknet.getCacheUpgradeCost(node, cache + 1); cache++);
      nodes.push({"node": node, "lvl": lvl, "ram": ram, "core": core, "cache": cache});
    }
    var max = {"node": -1, "lvl": -1, "ram": -1, "core": -1, "cache": -1};
    for (var node of nodes){
      if (max == null) max = node;
      var msum = (max.lvl + max.ram + max.core + max.cache);
      var sum = (node.lvl + node.ram + node.core + node.cache);
      if (sum > msum) max = node;
    }
    ns.print("Buying ", max);
    if (max.node >= 0) {
      ns.hacknet.upgradeLevel(max.node, max.lvl);
      ns.hacknet.upgradeRam(max.node, max.ram);
      ns.hacknet.upgradeCore(max.node, max.core);
      ns.hacknet.upgradeCache(max.node, max.cache);
      continue;
    }
    nodes = [];
    for (var node of toMax) {
      var stats = ns.hacknet.getNodeStats(node);
      var lvl, ram, core, cache;
      var curr = stats.level;
      var mon = money;
      for (lvl = 0; (lvl + curr) < 200 && mon >= ns.hacknet.getLevelUpgradeCost(node, lvl + 1); lvl++);
      mon -= ns.hacknet.getLevelUpgradeCost(node, lvl);
      curr = stats.ram;
      //ns.print(curr);
      for (ram = 0; (Math.pow(2, ram) * curr) < 2048 && mon >= ns.hacknet.getRamUpgradeCost(node, ram + 1); ram++);
      mon -= ns.hacknet.getLevelUpgradeCost(node, ram);
      curr = stats.cores;
      //ns.print(curr);
      for(core = 0; (core + curr) < 32 && mon >= ns.hacknet.getCoreUpgradeCost(node, core + 1); core++);
      mon -= ns.hacknet.getCoreUpgradeCost(node, core);
      curr = stats.cache;
      for(cache = 0; (cache + curr) < 20 && mon >= ns.hacknet.getCacheUpgradeCost(node, cache + 1); cache++);
      nodes.push({"node": node, "lvl": lvl, "ram": ram, "core": core, "cache": cache});
    }
    var max = {"node": -1, "lvl": -1, "ram": -1, "core": -1, "cache": -1};
    for (var node of nodes){
      if (max == null) max = node;
      var msum = (max.lvl + max.ram * 30 + max.core + max.cache);
      var sum = (node.lvl + node.ram * 30 + node.core + node.cache);
      if (sum > msum) max = node;
    }
    ns.print("Buying (2) ", max);
    if (max.node != -1){
      ns.hacknet.upgradeLevel(max.node, max.lvl);
      ns.hacknet.upgradeRam(max.node, max.ram);
      ns.hacknet.upgradeCore(max.node, max.core);
      ns.hacknet.upgradeCache(max.node, max.cache);
    }
    //await ns.sleep(1);
  }
  ns.tprint("Hacknet node count above ", len, " won't be profitable. Aborted.");
  //ns.hacknet.purchaseNode();
  //ns.hacknet.getPurchaseNodeCost();
  //ns.hacknet.getNodeStats(IDX);
  //ns.hacknet.upgradeLevel(IDX,NUM);
  //ns.hacknet.upgradeRam(IDX, NUM);
  //ns.hacknet.upgradeCore(idx, num);
  //ns.hacknet.getLevelUpgradeCost(idx, num);
  //ns.hacknet.getRamUpgradeCost(idx, num);
  //ns.hacknet.getCoreUpgradeCost(idx, num);
}