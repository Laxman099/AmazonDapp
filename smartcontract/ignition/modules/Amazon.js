const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { items } = require("./items.json");

module.exports = buildModule("AmazonModule", (m) => {
  const amazon = m.contract("Amazon");

  return { amazon };
});
