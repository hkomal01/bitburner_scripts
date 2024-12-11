export function autocomplete(data, args) {
    //return [...data.servers]; // This script autocompletes the list of servers.
    return [...data.servers, ...data.scripts]; // Autocomplete servers and scripts
    //return ["low", "medium", "high"]; // Autocomplete 3 specific strings.
}
//Buys a server of requested name and size
//If name or size are not provided, next index will be given for name
//and size will be the max user can buy


/** @param {NS} ns */
export async function main(ns) {
  var name;
  var ram;
  if (typeof ns.args[0] == "number" || typeof ns.args[0] == "string")
    name = ns.args[0];
  else {
    var svrs = ns.getPurchasedServers();
    for (name = 0; svrs.includes(name.toString()); name++);
  }
  var money = ns.getServerMoneyAvailable("home");
  for (ram = 0; ns.getPurchasedServerCost(Math.pow(2, ram)) <= money; ram++);
  ram--;
  ns.tprint("Will cost: ", ns.getPurchasedServerCost(Math.pow(2, ram)).toLocaleString());
  ns.purchaseServer(name, Math.pow(2, ram));
  ns.tprint("Next available number: ", name);
  ns.tprint("Ram purchased: ", Math.pow(2, ram).toLocaleString(), "GB");
  ns.run("scripts/copyAll.js");
}