// imports
const { ethers, run } = require("hardhat");

// async main
async function main() {
    const hexString = "0";
    const index = BigInt(hexString);

    console.log ("Deploying contract...");
    const StorageFactory = await ethers.getContractFactory("StorageFactory");
    const sfContract = await StorageFactory.deploy();
    await sfContract.deployed();

    console.log (`Contract deployed to: ${sfContract.address}`);
    console.log ("-----------------------------------------\n");

    if (network.config.chainID === 11155111 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(6);
        await verify (simpleStorage.address, []);
    }

    // createSimpleStorage function
    console.log ("createSimpleStorage function");
    const response = await sfContract.createSimpleStorage();
    console.log ("-----------------------------------------\n");

    // sfStore function
    console.log ("sfStore function");
    const sfStoreResponse = await sfContract.sfStore(0, 321);
    console.log ("-----------------------------------------\n");

    // sfGet function
    console.log ("sfGet function");
    const updatedValue = await sfContract.sfGet(0);
    console.log (`Updated value: ${updatedValue}`);
    console.log ("-----------------------------------------\n");

    // sfAddPerson
    console.log ("sfAddPerson");
    const sfAddPersonResponse = await sfContract.sfAddPerson(0, "Jack", 987);

    const personName = await sfContract.personName();
    const personNum = await sfContract.personNum();
    
    console.log (`Name: ${personName}`);
    console.log (`Number: ${personNum}`);
    console.log ("-----------------------------------------\n");
}

async function verify (contractAddress, args) {
    console.log ("Verifying contract...");
    try {
        await run ("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log ("Already verified");
        } else {
            console.log (e);
        }
    }
}

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
