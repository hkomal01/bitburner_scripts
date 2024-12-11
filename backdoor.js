//List paths to all rooted directories

import { scan as treeScan, find as treeFind } from 'scripts/scanTree.js';
import { scanner as listScan } from 'scripts/scanList.js'

/** @param {NS} ns */
export async function main(ns) {
  var root = await treeScan(ns, 16);
  //ns.tprint(ns.getServer("n00dles"));
  ns.tprint("Built server tree...");
  var svrs = Array.from(await listScan(ns, "home", 16));
  var purchased = ns.getPurchasedServers();
  ns.tprint("Built server list...");
  svrs = svrs.filter(svr => ns.hasRootAccess(svr));
  svrs = svrs.filter(svr => !ns.getServer(svr).backdoorInstalled);
  svrs = svrs.filter(svr => !purchased.includes(svr));
  svrs = svrs.filter(svr => ns.getServerRequiredHackingLevel(svr) <= ns.getHackingLevel());
  svrs = svrs.sort((svr1, svr2) => ns.getServerRequiredHackingLevel(svr1) - ns.getServerRequiredHackingLevel(svr2));
  //var makeram = ns.weakenAnalyze(1, 8);

  var string = "\n";
  var terminalInput = document.getElementById("terminal-input");
  //Future: Use DP to store paths we already have to certain nodes
  var count = 0;
  for (var svr of svrs) {
    if (svr == "home") continue;
    var path = treeFind(root, "home", svr);
    if (path.length == 0) continue;
    count++;
    for (var p of path) {
      string = string.concat("connect ", p.name, "; ");
    }
    string = string.concat("backdoor;\n");  
    //terminal.setAttribute("value", string);
    terminalInput.value = string;
    // Get a reference to the React event handler.
    const handler = Object.keys(terminalInput)[1];

    // Perform an onChange event to set some internal values.
    terminalInput[handler].onChange({target:terminalInput});

    // Simulate an enter press
    terminalInput[handler].onKeyDown({key:'Enter',preventDefault:()=>null});
    //document.dispatchEvent(new KeyboardEvent('keydown', {'key' : 'k'}));
    //terminal.dispatchEvent(new KeyboardEvent('keydown', {'key' : 'Enter'}));
    //var time = ns.getWeakenTime(svr);
    var time = 1000;
    //var mult = count > svrs.length/1 ? 1/10 : 2;
    var mult = 1;
    await ns.sleep(time*mult);
    string = "connect home\n";
    //terminal.setAttribute("value", string);
    terminalInput.value = string;
    // Get a reference to the React event handler.
    //const handler = Object.keys(terminalInput)[1];

    // Perform an onChange event to set some internal values.
    terminalInput[handler].onChange({target:terminalInput});

    // Simulate an enter press
    terminalInput[handler].onKeyDown({key:'Enter',preventDefault:()=>null});
    //terminal.dispatchEvent(new KeyboardEvent('keydown', {'key' : 'ArrowLeft'}));
    //terminal.dispatchEvent(new KeyboardEvent('keydown', {'key' : 'Enter'}));
    await ns.sleep(10);
    string="";
  }

  ns.tprint("All backdoorable servers backdoored!");
}