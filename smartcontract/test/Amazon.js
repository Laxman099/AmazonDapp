const { expect } = require("chai");
const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), "ether");
};

const ID = 1;
const NAME = "Shoes";
const CATEGORY = "Clothing";
const IMAGE =
  "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg";
const COST = 1;
const RATING = 4;
const STOCK = 5;

describe("Amazon", () => {
  let amazon;
  let deployer, buyer;

  beforeEach(async () => {
    [deployer, buyer] = await ethers.getSigners();
    const Amazon = await ethers.getContractFactory("Amazon");
    amazon = await Amazon.deploy();
  });

  describe("deploymnet", () => {
    it("check owner ", async () => {
      expect(await amazon.owner()).to.equals(deployer.address);
    });
  });

  describe("Listing", async () => {
    let transaction;

    beforeEach(async () => {
      transaction = await amazon
        .connect(deployer)
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);

      transaction.wait();
    });

    it("check item Listing ", async () => {
      const item = await amazon.Items(ID);
      expect(item.id).to.equal(ID);
      expect(item.name).to.equal(NAME);
      expect(item.category).to.equal(CATEGORY);
      expect(item.image).to.equal(IMAGE);
      expect(item.cost).to.equal(COST);
      expect(item.rating).to.equal(RATING);
      expect(item.stock).to.equal(STOCK);
    });

    it("checking the List Event", async () => {
      expect(transaction).to.emit(amazon, "List");
    });
  });

  describe("Buying", () => {
    let transaction;

    beforeEach(async () => {
      // List a item
      transaction = await amazon
        .connect(deployer)
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait();

      // Buy a item
      transaction = await amazon.connect(buyer).buy(ID, { value: COST });
      await transaction.wait();
    });

    it("Emits Buy event", () => {
      expect(transaction).to.emit(amazon, "Buy");
    });
  });
});
