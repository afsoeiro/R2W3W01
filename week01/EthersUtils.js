
/*async function connectToWhat() {
    if (typeof web3 !== 'undefined') {
        console.log('Web3 Detected! ' + web3.currentProvider.constructor.name);
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('No Web3 Detected... using HTTP Provider')
        //window.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/<APIKEY>"));
        window.web3 = new Web3(
            new Web3.providers.HttpProvider("https://ethereum-goerli-rpc.allthatnode.com")
            );
    }
}*/



/*
If there is no web3, create it.
*/
/*
window.addEventListener('load', function () {
    if (typeof web3 !== 'undefined') {
        console.log('Web3 Detected! ' + web3.currentProvider.constructor.name);
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('No Web3 Detected... using HTTP Provider');
        // Adding a personal infura APP ID here, to be switched to a public provider
        window.web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/034ecc36538b49bb89c3a61e8466495a"));
    }
});
*/



/*
            currentHref + "GospelsJiuJitsuNFT.address",
            currentHref + "GospelsJiuJitsuNFT.abi",
            "https://ethereum-goerli-rpc.allthatnode.com"

*/

/*
async function startWalletConnection() {
    // 4. Ask for a connection to a wallet:
    if(accounts == undefined) {
        // Do it by prompting user for a connection.
        try {
            accounts = await web3.send("eth_requestAccounts", []);
        } catch (error) {
            if(error.code === 4001) {
                // user rejected request, leave it unconnected.
                return;
            }
        }
        //await web3Provider.send("eth_requestAccounts", []);
        // Then grab the sigher!
        //signer = await web3.getSigner();//  web3Provider.getSigner();
    }
    // 5. Connect to the contract:
    if(connectedContract == undefined) {
        connectedContract = new web3.eth.Contract(
        //ethers.Contract(
            smartPlug.ABI,
            smartPlug.Address,
        );
    }
    // Once connected. any interaction can be made with the smart contract
    // If we connect with the public provider, we can't sign transactions and burn Goerlies.
}*/
/*
async function makePublicConnectionToContract() {
    // Steps tp connect to a Smart Contract:
    // 1. Load Contract Address to a string
    // 2. Load Contract ABI to a JSON Object
    if(smartPlug == undefined) {
        smartPlug = new SmartPlug(
            currentHref + "GospelsJiuJitsuNFT.address",
            currentHref + "GospelsJiuJitsuNFT.abi"
        );    
    }
    // 3. Get a provider: ==> use signer to write to the chain (and usse gas)
    if(provider == undefined) {
        provider = new ethers.providers.JsonRpcProvider(
            'https://ethereum-goerli-rpc.allthatnode.com'
            );
        }
    if(publicProvider == undefined) {
        if(typeof window.web3 !== 'undefined') {

        }
        publicProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    }
    // 5. Connect to the contract:
    if(publicConnectionToContract == undefined) {
        publicConnectionToContract = new ethers.Contract(
            smartPlug.Address,
            smartPlug.ABI,
            publicProvider
        );
    }
    // Once connected. reading interaction can be made with the smart contract
    // If we connect with the public provider, we can't sign transactions and burn Goerlies.
}*/

