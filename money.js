/** @param {NS} ns */
export async function main(ns) {
    navigator.clipboard.writeText(ns.getServerMoneyAvailable("home"));
    ns.tprint("Copied ", ns.getServerMoneyAvailable("home").toLocaleString());
}