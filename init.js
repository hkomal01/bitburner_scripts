//Initializes a fresh start game by calling necessary scripts

import { scan as treeScan, find as treeFind, getNode } from 'scripts/scanTree.js';
import { scanner as listScan } from 'scripts/scanList.js'

/** @param {NS} ns */
export async function main(ns) {
  ns.run("scripts/buyHackNet.js");
  ns.tprint("Ran buyHacknet...");
  await ns.sleep(1000);
  ns.run("scripts/buyMoney.js");
  ns.tprint("Ran buyMoney...");
  await ns.sleep(1000);
  ns.run("scripts/findAndRoot.js");
  ns.tprint("Ran findAndRoot...");
  await ns.sleep(5000);
  ns.run("scripts/target.js", 1, "n00dles");
  ns.tprint("Ran target on n00dles...");
  await ns.sleep(10000);
  ns.run("scripts/copyAll.js");
  ns.tprint("Ran copyAll...");
  await ns.sleep(5000);
  ns.tprint("Will rerun target on n00dles every 10 seconds for 2 minutes...");
  for (var i = 0; i < 12; i++){
    ns.run("scripts/target.js", 1, "n00dles");
    await ns.sleep(10000);
  }
  ns.tprint("Finished...");
}