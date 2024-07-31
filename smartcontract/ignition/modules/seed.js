const { ethers } = require("hardhat");
const { items } = require("./items.json");

// const tokens = (n) => {
//   return ethers.utils.parseUnits(n.toString(), "ether");
// };

async function seedAmazonContract() {
  const [deployer] = await ethers.getSigners();
  const amazonAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const Amazon = await ethers.getContractFactory("Amazon");
  const amazon = Amazon.attach(amazonAddress);

  for (let i = 0; i < items.length; i++) {
    const transaction = await amazon
      .connect(deployer)
      .list(
        items[i].id,
        items[i].name,
        items[i].category,
        items[i].image,
        items[i].price,
        items[i].rating,
        items[i].stock
      );

    await transaction.wait();

    console.log(`Listed item ${items[i].id}: ${items[i].name}`);
  }
}

seedAmazonContract()
  .then(() => {
    console.log("Seeding completed.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding contract:", error);
    process.exit(1);
  });

seedAmazonContract();
