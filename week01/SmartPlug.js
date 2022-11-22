/**
 * SmartPlug - a class that helps connecting a JavaScript frontend website to a smart contract
 */
class SmartPlug {
    /*
    Look for ethereum network chain IDs and providers at: https://chainlist.org/
    - Goerli Testnet - GöETH - Chain ID 5 - https://ethereum-goerli-rpc.allthatnode.com - https://goerli.net/
    - Polygon Mainnet - MATIC - Chain ID 137 - https://polygon-rpc.com
    */
    #contractAddress = undefined; // Address of the deployed smart contract goes here.
    #contractABI = undefined; // ABI of the deplyed smart contract gets loaded here
    #signer = undefined; // The signer wallet's address
    #networkProvider = undefined; // A network provider for read-only operations
    #readerContract = undefined; // When we call : "Contract instance goes here"
    #fullContract = undefined;
    
    constructor() { 
    }

    async plugContract(_contractName, _networkNode, _signer) {
        if(this.Status == "No connection") {
            const addressUrl = currentHref + _contractName + ".address";
            const abiUrl = currentHref + _contractName + ".abi";
            try {
                await this.loadBasicContractData(addressUrl, abiUrl, _networkNode);
                this.#readerContract = await this.connectContract(this.#networkProvider);
                if(_signer != undefined && _signer != null) {
                    this.#signer = _signer;
                    this.#fullContract = await this.connectContract(this.#signer);
                } else {
                    this.#signer = undefined;
                    this.#fullContract = undefined;
                }
            } catch (error) {
                console.log(error);
                return (error);
            }
        } // Basic connection is done. Status = "Contract connected"
        
        // If a wallet is connected, set it as the signer in the contract
        //if(accounts != undefined && accounts.length)
        //    await this.connectSigner(accounts[0]);
        // Status is now "Contract and wallet connected"
        return "Plugged";
    }
    async loadBasicContractData(_AddressUrl, _AbiUrl, _NetworkProviderUrl) {
        try {
            this.#contractAddress = await loadFromUrlPromise(
                {url: _AddressUrl, method: "GET", responseType: "text"}
            );
            this.#contractABI = await loadFromUrlPromise(
                {url: _AbiUrl, method: "GET", responseType: "json"}
                );
            this.#networkProvider = new ethers.providers.JsonRpcProvider(_NetworkProviderUrl);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    /**
     * @function connectContract - loads the contract address and ABI from specified URLs and connects to it
     * in read-only mode, given the provider's url
     * @param {*} _connectionElement - Either a network provider or a signer. If a signer, it will be a 
     *                                 connection that allows writing to the blockchain.
     */
    async connectContract(_connectionElement) {
        let contractConnection = undefined;
        try {
            contractConnection = await new ethers.Contract(
                this.#contractAddress,
                this.#contractABI,
                _connectionElement
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
        return contractConnection;
    }

    /**
     * @function callFunction - Makes a read-only call to the smart contract's specified function
     * @param {string} _functionName - the name of the function to be called 
     * @param  {...any} _args the arguments to be passed on to the function
     * @returns result of the function call
     */
    async callFunction(_functionName, ..._args) {
        if(this.#readerContract != null && this.#readerContract != undefined)
            return this.#readerContract.functions[_functionName](..._args);
    }

    /**
     * @function sendFunction - Makes a full call to the smart contract's specified function
     * @param {string} _functionName - the name of the function to be called 
     * @param  {...any} _args the arguments to be passed on to the function
     * @returns the promise of the called function
     */
    async sendFunction(_functionName, ..._args) {
        if(this.#fullContract != null && this.#fullContract != undefined)
            return this.#fullContract.functions[_functionName](..._args);
    }

    // Getters and Setters for object properties
    /**
     * @param {string} _address
     */
    set Address(_address) {
        // window.localStorage was working this way. Local variables, I'm not sure.
        // window.localStorage.setItem('contractAddress', _address);
        this.#contractAddress = _address;
    }
    get Address() {
        // window.localStorage was working this way. Local variables, I'm not sure.
        // return window.localStorage.getItem('contractAddress');
        return this.#contractAddress;
    }
    /**
     * @param {JSON} _ABI
     */
    set ABI(_ABI) {
        // window.localStorage was working this way. Local variables, I'm not sure.
        //window.localStorage.setItem('contractABI', JSON.stringify(_ABI));
        this.#contractABI = _ABI;
    }
    get ABI() {
        // window.localStorage was working this way. Local variables, I'm not sure.
        // return JSON.parse(window.localStorage.getItem('contractABI'));
        return this.#contractABI;
    }

    /*get execute() {
        if(this.#fullContract != undefined)
            return this.#fullContract;
        return this.#readerContract;
    }*/

    /*get readerContract() {
        if(this.#readerContract != undefined)
            return this.#readerContract;
        throw new Error("Reference for a contract made without a connected contract.");
    }*/

    /*get fullContract() {
        if(this.#fullContract != undefined)
            return this.#fullContract;
        throw new Error("Reference for a contract made without a connected contract.");
    }*/

    /*get signer() {
        if(this.#signer != undefined || this.#signer != null)
            return this.#signer;
        else
            throw new Error("Reference for 'signer' made without a connected signer wallet.");
    }*/

/**
 * @method Status - Informs current state of the SmartPlug object
 * @returns string - "Contract and wallet connected", "Contract connected", "No connection";
 */
    get Status() {
        if(this.#fullContract != undefined) {
            return "Contract and Wallet connected";
        }
        if(this.#readerContract != undefined) {
            return "Contract connected";
        }
        return "No connection";
    }
}
