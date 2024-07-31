# Amazon Dapp Clone

## Technology Stack & Tools

- Solidity (Writing Smart Contracts & Tests)
- Javascript (React & Testing)
- [Hardhat](https://hardhat.org/) (Development Framework)
- [Ethers.js](https://docs.ethers.io/v5/) (Blockchain Interaction)
- [React.js](https://reactjs.org/) (Frontend Framework)

## Requirements For Initial Setup
- Install [NodeJS](https://nodejs.org/en/)

## Setting Up
### 1. Clone/Download the Repository

### 2. Install Dependencies:
`$ npm install`

### 3. Run tests
`$ npx hardhat test`

### 4. Start Hardhat node
`$ npx hardhat node`

### 5. Run deployment script
In a separate terminal execute:
`npx hardhat ignition deploy ./ignition/modules/Amazon.js --network localhost`

In a separate terminal execute: for seeding items 
`npx hardhat run  ./ignition/modules/seed.js --network localhost`

### 6. Start frontend
`$ npm run dev`
## contribution 
- feel free to contribute to the codebase.
## Dev
- Laxman 
