//Methods to get paths to connect to another hostname
//Check 'scripts/testTree' for usage

/** @param {NS} ns */
export async function main(ns) {
}

//Returns root of the tree data structure
export async function scan(ns, depth) {
  var root = 
    await buildTree(ns, depth, "", "home", new Set());
  return root;
}

export async function buildTree(ns, depth, prev, curr, serverSet){
  var currNode = {name: curr, prev: prev, children: []}
  if (depth <= 0 || serverSet.has(curr)){
    return currNode;
  }
  serverSet.add(curr);

  var childs = await ns.scan(curr);
  for (let child of childs){
    var node = await buildTree(ns, depth - 1, currNode.name, child, serverSet);
    currNode.children.push(node);
  }

  return currNode;
}

//Returns a list of all nodes on the path from
//fro to to (except fro)
//Node : root, String : fro, String : to
export function find(root, fro, to) {
  fro = getNode(root, fro);
  to = getNode(root, to);
  if (to == null || fro == null) {
    return [];
  }
  var path = [];
  var queue = [fro];
  while (queue.length != 0) {
    var curr = queue.shift();
    if (curr == to) {
      while (curr != fro) {
        path.unshift(curr);
        var prev = curr.prev;
        curr = getNode(root, prev);
      }
      return path;
    }
    for (var child of curr.children) {
      queue.unshift(child); 
    }
  }
  return path;
}

//Converts a string to the earliest occurence of 
//a given node in the tree
//Returns a node
//Node: root, String: name
export function getNode(root, name){
  var q = [root];
  while (q.length != 0) {
    var curr = q.shift();
    if (curr.name == name){
      return curr;
    }
    for (var child of curr.children) {
      q.unshift(child); 
    }
  }
  return null;
}
