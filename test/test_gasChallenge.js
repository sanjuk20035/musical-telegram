const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Deploy Gas Challenge Contract", () => {
  let gas_contract;

  beforeEach(async () => {
    const gas_challenge_contract = await ethers.getContractFactory(
      "gasChallenge"
    );
    gas_contract = await gas_challenge_contract.deploy();
  });

  describe("Compute Gas", () => {
    it("Should return lower gas", async () => {
      const txn1 = await gas_contract.notOptimizedFunction();
      const unOptimizedGas = await txn1.wait().then((receipt) => receipt.gasUsed);
      const txn2 = await gas_contract.optimizedFunction();
      const optimizedGas = await txn2.wait().then((receipt) => receipt.gasUsed);
      expect(Number(unOptimizedGas)).to.be.greaterThan(Number(optimizedGas));
    });
  });

  describe("Check Sum Of Array", () => {
    it("Should return 0", async () => {
      // Write test block here to check sum of array equals 0
      await gas_contract.optimizedFunction();
      expect(Number(await gas_contract.getSumOfArray())).to.equal(0);
    });
  });
});
