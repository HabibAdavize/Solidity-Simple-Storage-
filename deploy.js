const { ethers } = require("ethers");
const fs = require("fs-extra");

async function main() {
  
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );

  // Initialize the wallet with a private key and the provider
  const wallet = new ethers.Wallet(
    "0x56b8ae52a7aabed6838411e5b83f658c179313fc240fee048409f2614a87513f",
    provider
  );

  // Read the ABI and binary code from the file system
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  // Create a ContractFactory instance
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");

  // Deploy the contract
  const contractInstance = await contractFactory.deploy();
  console.log("Contract deployed to:", contractInstance);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
