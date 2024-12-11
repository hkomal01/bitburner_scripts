import { scan as treeScan, buildTree as treeBuildTree, find as treeFind, getNode as treeGetNode } from 'scripts/scanTree.js';
/** @param {NS} ns */
export async function main(ns) {
  var root = await treeScan(ns, 3);
  var path = treeFind(root, "home", "CSEC");

  ns.tprint(JSON.stringify(root, null, 3));
  for (var node of path) {
    ns.tprint(JSON.stringify(node, null, 1));
  }
}