const { ethers } = require("ethers"); // Use object destructuring to import ethers
const fs = require("fs-extra");

async function main() {
  // Set up the provider with the correct URL
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");

  // Initialize the wallet with a private key and the provider
  const wallet = new ethers.Wallet(
    "0xe3e4bceddd36c817dff2e7a6027dfcef6e6a31e2bd19b82aa8ee93f97e05ebdf",
    provider
  );

  // Read the ABI and binary code from the file system
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");

  // Create a ContractFactory instance
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");

  // Deploy the contract
  const contractInstance = await contractFactory.deploy();
  await contractInstance.deployed(); // Wait for the deployment to be mined
  console.log("Contract deployed to:", contractInstance.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
