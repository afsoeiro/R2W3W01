/*const ContractInfo = {
    Address : "Contract Deployed Address goes here.",
    ABI : "Contract ABI gets loaded here.",
    Instance : "Contract instance goes here"
}*/

const currentHref = window.location.href;
let smartPlug = undefined;
let walletPlug = undefined;
let userName = undefined;
let walletAddress = undefined;

async function connectUser() {
    if(walletPlug == undefined)
        walletPlug = new WalletPlug();
    let result = await walletPlug.connectToWallet(); // In WalletPlug.js
    if(result == "Connection rejected") {
        alert("You have refused to connect to the wallet.\n" +
              "You won't interact with the website now."
              );
        return;
    }
    result = await callPlugContract(); // Below in this file
    if(result != "Plugged")
        throw new Error("Could not connect to contract \"GospelsJiuJitsuNFT\".");
}

async function callPlugContract() {
    let signerOrProvider = undefined;
    if(walletPlug != undefined) {
        const ws = await walletPlug.fetchWalletStatus();
        if(ws == "Connected")
            signerOrProvider = walletPlug.Signer;
    }

    if(smartPlug == undefined)
        smartPlug = new SmartPlug();
    if(smartPlug.Status != "Contract and Wallet connected") {
        let res = await smartPlug.plugContract(
            "GospelsJiuJitsuNFT",
            "https://ethereum-goerli-rpc.allthatnode.com",
            signerOrProvider
        );
        if(res != "Plugged")
            throw new Error("Could not connect to contract \"GospelsJiuJitsuNFT\".");
    }
    return "Plugged";
}



/**
 * @function setNewUserName - sets a given username in the contract for the wallet holder
 * @param {string} _newUsername - the desired username
 * @throws Error "A wallet is needed to connect to the contract."
 */
async function setNewUsername(_newUsername) {
    if(smartPlug == undefined || smartPlug.Status != "Contract and Wallet connected")
        // Can't do anything without a wallet and the contract connected.
        throw new Error("A wallet is needed to connect to the contract.");

        //let tx = smartPlug.fullContract.setUserName(_newUsername);
        //.send({from: smartPlug.signer})
        let userName = smartPlug.fullContract.setUserName(_newUsername)
            .then(
                () => {
                    userName = _newUsername;
                },
                (error) => {
                    userName = undefined;
                })
            .finally(
                () => {
                    updateUser(userName, walletAddress);
                });
         /*
        .on('transactionHash', function(hash){
            console.log("Got a transaction hash: \"" + hash + "\".");
        })
        .on('receipt', function(receipt){
            console.log("Got a receipt: \"" + receipt + "\".");
        })
        .on('confirmation', function(confirmationNumber, receipt) {
            console.log("Got confirmation number \"" + confirmationNumber +
                        "\" and receipt \"" + receipt + "\".");
            updateGreeting(_newUsername);
        })
        .on('error', function(error, receipt) {
            console.log("Got error \"" + error + "\" and receipt \"" + receipt + "\".");
        }); */
}

/**
 * @function mintNFT - mints an NFT
 * @param {string} _destination - destination address for the NFT, or (null) for self mint.
 * @param {string} _metadata - url of the metadata.json file
 */
async function mintNFT(_destination, _metadata) {
    // Can't do anything without a wallet and the contract connected.
    if(smartPlug == undefined || smartPlug.Status != "Contract and Wallet connected")
        throw new Error("A wallet is needed to connect to the contract."); 
    if(_metadata == undefined || _metadata == null)
        throw new Error("We need the url for the \"metadata.json\" file.");
    smartPlug.fullContract.safeMint(_destination, _metadata)
        //.send({from: smartPlug.signer})
        .on('transactionHash', function(hash){
            console.log("Got a transaction hash: \"" + hash + "\".");
        })
        .on('receipt', function(receipt){
            console.log("Got a receipt: \"" + receipt + "\".");
        })
        .on('confirmation', function(confirmationNumber, receipt) {
            console.log("Got confirmation number \"" + confirmationNumber +
                        "\" and receipt \"" + receipt + "\".");
            smartPlug.readerContract.getUserMintedTokens()
                .then(
                    (userMintedTokens) => {
                        updateUserMintingInfo(userMintedTokens);
                    },
                    (error) => {
                        throw new Error(error);
                });
        })
        .on('error', function(error, receipt) {
            console.log("Got error \"" + error + "\" and receipt \"" + receipt + "\".");
        });
}
async function startDapp(_callingSituation) {
    if(_callingSituation == "General run") {
        if(walletPlug == undefined)
            walletPlug = new WalletPlug();
        await walletPlug.accountsChanged();
    }
    let walletStatus = await walletPlug.fetchWalletStatus();
    // const connectionButton = document.getElementById("connectionButton");
    // const loggedUI = document.getElementById("loggedUI");
    // const unknownUser = document.getElementById("unknownUser");
    // const welcomeParagraph = document.getElementById("welcomeParagraph");
    if(walletStatus == "No wallet installed") {
        setWalletNotPresent();
        return;
    } else if(walletStatus == "Disconnected") {
        updateUser(undefined, undefined);
    } else { // Connected
        // When the wallet is connected, fetch user information and send to the View
        await callPlugContract();
        walletAddress = walletPlug.Address;
        
        userName = await smartPlug.sendFunction("getUserName");
        userName = userName[0];
        /*
        userName = smartPlug.readerContract.getUserName()
            .then(
                (gottenName) => {
                    userName = gottenName;
                },
                (error) => {
                    userName = undefined;
                })
            .finally(
                () => {
                    updateUser(userName, walletAddress);
                });*/
        
        updateUser(userName, walletAddress);
        let result = await smartPlug.sendFunction("getUserMintedTokens");
        userMintedTokens = result[0];
        updateUserMintingInfo(userMintedTokens, smartPlug.Address);        
    }
    updateHeaders();
    updateLabels();
    updateStandardButtonCaptions();
}
    
// Runs whenever the user changes account state;
// Checking if there is a wallet installed first, of coure!
if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('accountsChanged', async (_accounts) => {
        if(walletPlug != undefined)
            await walletPlug.accountsChanged();
        startDapp("Accounts changed");
        });
    }

// Since we got all scripts with the 'defer' tag, we start the dapp here:
startDapp("General run");
