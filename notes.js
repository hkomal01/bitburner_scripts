/** @param {NS} ns */
export async function main(ns) {
  //Targeting script v2:
  //Determine time for weaken/hack/grow and stagger them so that they continuosly spawn
  //In conjunction, calculate number of weaken threads needed to weaken a server fully in a certain time (by running them concurrently)
  //Same thing for growth (determine num grwoths needed to go from 0 to max)
  //Then run growBot and weakenBot on all servers until we reach threads needed for a continuous growth/weaken
  //The rest of the threads are hacker threads which will continuously hack the server and there is always a staggered 'grow' b/w them
  //This way the hack always produces money

  //Hacknet node script v1:
  //For each hacknet node, determine the one node that produces the most amount of 'upgrades'
  //Maybe certain upgrades are worth more (lvl to 100 > ram > cores > lvl 100 to 200)
  //Weight them and then on each cycle, use the money in account to buy the best combination of upgrades
  //Then we will continuously gain hacknet nodes/upgrades

  //BuyServer script v2:
  //Add functionality to continue buying a certain sized server at a certain interval
  //Copy all (or just important) scripts to this server
  //Kill everything and rerun target (IFF v2 is made; with v1 you can just run bots/target)
  
  //Targeting script v3:
  //It's probably best to perform v2's functions on every server, sorted by some mix of time to hack + growth rate perhaps
  //This script will automatically allocate threads for every single server
  //Then run helper-target.js for diff servers w the server's num of alloc threads

  //formulas api testing:
  // ns.formulas.hacking.growPercent(svr, threads, player, cores);
  // ns.formulas.hacking.growThreads(svr, player, targetMoney, cores);
  // ns.formulas.hacking.growTime(svr, player);
  var x = ns.formulas.hacknetNodes.constants();
  x = ns.formulas.reputation.calculateFavorToRep(150);
  x = ns.formulas.reputation.calculateRepToFavor(15000);
  x = ns.formulas.mockServer();
  ns.tprint(x);

}