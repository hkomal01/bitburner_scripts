//Method to get servers connected to home within a depth
//Check 'scripts/listScanned' for usage

/** @param {NS} ns */
export async function main(ns) {
}

export async function scanner(ns, rootDir, depth) {
  var homeScans = await ns.scan(rootDir);
  var serverSet = new Set(homeScans);
  var scanCache = new Map();
  //var count = 0;

  for (var i = 0; i < (depth - 1); i++) {
    //await ns.sleep(1);
    var toUnion = new Set();
    
    for (let svr of serverSet) {
      //await ns.sleep(1);
      //count++;
      var scans = new Set();

      if (scanCache.has(svr)) scans = scanCache.get(svr);
      else {
        scans = new Set(await ns.scan(svr));
        scanCache.set(svr, scans);
      }

      if (!scans.size) continue;
      toUnion = new Set([...toUnion, ...scans]);
    }


    serverSet = new Set([...serverSet, ...toUnion]);
  }

  //ns.tprint("Counted: ", count);
  return serverSet;
}