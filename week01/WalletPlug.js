/**
 * WalletPlug - a class that helps connecting a JavaScript frontend website to a smart contract
 */
 class WalletPlug {
 constructor() { 
    }
/**
 * @variable accounts - a list of accounts from the Metamask wallet.
 *  Currently lists only the connected one.
 */
#accounts = undefined;
 /**
 * @variable provider - the wallet provider object, received from window.ethereum.
 */
#provider = undefined; 
/**
 * @variable signer - a connected wallet's signer. It is used to make a full (read/write)
 * connection to a contract.
 */
#signer = undefined;

#status = undefined;

/**
 * @function detectInjectedWallet - detects if there is a crypto wallet extension installed
 * in the browser.
 * @returns boolean - true when there is a crypto wallet extension installed in the browser,
 * false otherwise
 */

async detectInjectedWallet() {
    if (typeof window.ethereum !== 'undefined') 
        return true;
    return false;
}

async accountsChanged() {
    let result = await this.detectInjectedWallet();
    if(result == false) { // We don't even have a wallet installed, so...
        this.#status = "No wallet installed";
        this.#accounts = undefined;
        this.#provider = undefined;
        this.#signer = undefined;
        return;
    }
this.#accounts = await ethereum.request({method: 'eth_accounts'});
if (this.#accounts.length) {
    // A wallet is connected to the website at this time.
    this.#provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
    this.#signer = await this.#provider.getSigner(this.#accounts[0]);
    this.#status = "Connected";
    return;
}
//No wallet is connected to the website at this time.
this.#provider = undefined;
this.#signer = undefined;
this.#status = "Disconnected"; 
}

/**
 * @function fetchWalletStatus - Queries if there is a wallet connected to the website.
 * This is the recommended method in the Metamask website.
 * @returns string - "No wallet installed", "Disconnected", "Connected".
 */
 async fetchWalletStatus() { // FLAG - check after 'web3'.
    return this.#status;
}

/**
 * @function getWalletAddress - fetches the accounts of a connected wallet, if connected,
 *  and returns the accounts. In MetaMask, returns only the address of the connected account.
 * @returns 'accounts', the list of connected accounts, currently single.
 */
 get Address() { // FLAG - check after 'web3'.
    if(this.#accounts != undefined)
        return this.#accounts[0];
    throw new Error("There is no wallet connected at this time.");
}

get Provider() {
    if(this.#provider != undefined)
        return this.#provider;
    throw new Error("There is no provider present at this time.");
}

get Signer() {
    if(this.#signer != undefined)
        return this.#signer;
    throw new Error("There is no signer present at this time.");
}

get Accounts() {
    if(this.#accounts != undefined)
        return this.#accounts;
    throw new Error("There are no accounts available at this time.");
}

get areAccountsAvailable() {
    return (this.#accounts != undefined) ? true : false;
}

/**
 * @function connectToWallet - connects to a wallet extension that is installed in the browser
 * @returns string - "Already connected", "Connected", "Connection rejected", "No wallet installed";
 */
 async connectToWallet() {
    const walletStatus = await this.fetchWalletStatus();
    if(walletStatus == "Connected")
        return "Already connected"; // Wallet was already connected!
    if(walletStatus == "No wallet installed")
        return "No wallet installed";
    this.#provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
    try {  
        this.#accounts = await this.#provider.send("eth_requestAccounts", []);
    } catch (error) {
        if(error.code === 4001) {
            // user rejected request, leave it unconnected.
            this.#signer = undefined;
            this.#provider = undefined;
            return "Connection rejected";
            }
        else throw (error);
    }
    // User accepted to connect. Grab the sigher!
    this.#signer = await this.#provider.getSigner(this.#accounts[0]);
    return "Connected";
}

async walletInstructions() {
    alert("Tell the user to install a wallet.");
}
} // class WalletPlug {