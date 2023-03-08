// SPDX-License-Identifier: MIT

const { accounts, contract } = require('@openzeppelin/test-environment');

const { constants, expectEvent } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;

const { expect } = require('chai');

// Load compiled artifacts
const AstrometerToken = contract.fromArtifact('AstrometerToken');

// Start test block
describe('AstrometerToken', function () {
  const [ creator ] = accounts;
  const NAME = 'AstroMeter';
  const SYMBOL = 'AM';
  const TOTAL_SUPPLY = new BN('210000000');

  beforeEach(async function () {
    this.token = await AstrometerToken.new({ from: creator });
  });

  it('retrieve returns a value previously stored', async function () {
    // Use large integer comparisons
    expect(await this.token.totalSupply()).to.be.bignumber.equal(TOTAL_SUPPLY);
  });

  it('has a name', async function () {
    expect(await this.token.name()).to.be.equal(NAME);
  });

  it('has a symbol', async function () {
    expect(await this.token.symbol()).to.be.equal(SYMBOL);
  });

  it('assigns the initial total supply to the creator', async function () {
    expect(await this.token.balanceOf(creator)).to.be.bignumber.equal(TOTAL_SUPPLY);
  });

  await expectEvent.inConstruction(this.token, 'Transfer', {
      from: ZERO_ADDRESS,
      to: creator,
      value: totalSupply,
    });
    
});
