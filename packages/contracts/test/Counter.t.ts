import { expect } from "chai";
import { network } from "hardhat";

describe("Counter contract", function () {
  let ethers;
  let networkHelpers;
  before(async function () {
    ({ ethers, networkHelpers } = await network.connect());
  });

  async function CounterLockFixture() {
    const counter = await ethers.deployContract("Counter");
    await counter.setNumber(0);

    return { counter };
  }

  it("Should increment the number correctly", async function () {
    const { counter } = await networkHelpers.loadFixture(CounterLockFixture);
    await counter.increment();
    expect(await counter.number()).to.equal(1);
  });

  // This is not a fuzz test because Hardhat does not support fuzzing yet.
  it("Should set the number correctly", async function () {
    const { counter } = await networkHelpers.loadFixture(CounterLockFixture);
    await counter.setNumber(100);
    expect(await counter.number()).to.equal(100);
  });
});
