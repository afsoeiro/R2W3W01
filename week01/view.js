 /*
  This script is going to hold the View of the dapp.
  */
  
  const dSiteGreeting = document.getElementById("dSiteGreeting");
  const hWeek01 = document.getElementById("hWeek01");
  const shWeek01 = document.getElementById("shWeek01");
  const pGreeting = document.getElementById("pGreeting");
  const sUnknownUser = document.getElementById("sUnknownUser");
  const pDisconnectedWarning = document.getElementById("pDisconnectedWarning");
  const dLoggedUI = document.getElementById("dLoggedUI");
  const lUserName = document.getElementById("lUserName");
  const tiUserName = document.getElementById("tiUserName");
  const bSetUserName = document.getElementById("bSetUserName");
  const pSetUserNameResults = document.getElementById("pSetUserNameResults");
  const lMintedAmountResults = document.getElementById("lMintedAmountResults");
  const pMintedDeclaration = document.getElementById("pMintedDeclaration");
  const lMintingOffer = document.getElementById("lMintingOffer");
  const dMintingOffer = document.getElementById("dMintingOffer");
  const lMetadataUrl = document.getElementById("lMetadataUrl");
  const tiMetadataUrl = document.getElementById("tiMetadataUrl");
  const lEnterDestination = document.getElementById("lEnterDestination");
  const cbEnterDestination = document.getElementById("cbEnterDestination");
  const sMintTo = document.getElementById("sMintTo");
  const lMintTo = document.getElementById("lMintTo");
  const tiMintTo = document.getElementById("tiMintTo");
  const bMint = document.getElementById("bMint");
  const pMintedNFTResults = document.getElementById("pMintedNFTResults");
 
 /**
  * setUser - sets the user name and wallet address in the View interface, if given
  * @param {string} _userName
  * @param {string} _walletAddress
  */
  function updateUser(_userName, _walletAddress) {
    const bConnection = document.getElementById("bConnection");
    updateGreeting(_userName);
    if(_walletAddress == undefined || _walletAddress == 0) {
      dLoggedUI.style.display = "none";
      sUnknownUser.style.display = "block";
      document.querySelector('#bConnection').textContent = getStringResource("BUTTONS.CONNECT");
      bConnection.innerHTML = getStringResource("BUTTONS.CONNECT");
      bConnection.className = "btn btn-info";
      return;
    }
    dLoggedUI.style.display = "block";
    sUnknownUser.style.display = "none";
    bConnection.innerHTML = " [" + _walletAddress + "] ";
    bConnection.className = "btn btn-success";
  }
 
 function updateUserMintingInfo(_tokenList, _contractAddress) {
   if(
     _tokenList == null ||
     _tokenList.length == null ||
     _tokenList.length == undefined ||
     _tokenList.length == 0
     ) {
     pMintedDeclaration.innerHTML = getStringResource("MINTING_INFO.NONE");
     dMintingOffer.style.display = "block";
     return;
   }
   if(_tokenList.length > 4) {
     pMintedDeclaration.innerHTML = getStringResource("MINTING_INFO.ALL");
     dMintingOffer.style.display = "none";
   }
   else  {
     pMintedDeclaration.innerHTML =
      getStringResourceWithUnicorn(
       "MINTING_INFO.PARTIAL",
       {"number" : _tokenList.length}
        );
     dMintingOffer.style.display = "block";
   }
   pMintedDeclaration.innerHTML = 
     pMintedDeclaration.innerHTML +
     "<br />Your token list follows:";
     if(userMintedTokens.length) {
      // The function is returning an array within an array, so...
      // THIS is why I test everything here first.
      let i = 1;
      for(const token of userMintedTokens) {
          pMintedDeclaration.innerHTML = pMintedDeclaration.innerHTML +
              `<br />${(i ++)} - Token Id # ${token} - Hyperlink: 
              <a href=\"https://goerli.pixxiti.com/nfts/${_contractAddress.toLowerCase()}/${token}"
              target=\"_blank\">View NFT in Pixxiti</a>`;
      }
  /* for(i=0; i<_tokenList.length; i++)    
     pMintedDeclaration.innerHTML =
       pMintedDeclaration.innerHTML +
       "<br />" + "Token ID: " + _tokenList[i];*/
 }
} 
 
 function toggleMintTo() {
   sMintTo.style.display = (cbEnterDestination.checked) ? "block": "none";
 }
 
 /* Control Events */
 /* Event onChange */
 function controlChanged(_controlSource) {
   if(_controlSource == "cbEnterDestination") {
     toggleMintTo();
   }
 }
 
 /* Event onClick */
 async function buttonClicked(_buttonId) {
   let txInfo = undefined;
   let destination = undefined;
   if(_buttonId == "bConnection") {
     connectUser();
   } else if(_buttonId == "bSetUserName") {
     if(userName == undefined || tiUserName.value != userName)
       setNewUsername(tiUserName.value);
   } else if(_buttonId == "bMint") {
     if(tiMetadataUrl.value == "")
       throw new Error("We currently need a valid \"metadata.json\" file url.");
     if(!cbEnterDestination.checked){
           // ===> Move this to interfaceScripts
       /*txInfo = smartPlug.methods.selfMint(tiMetadataUrl.value).send({from: signer})
         .then(function(result) {
 
         }, function(error) {
 
         });*/
         destination = 0;
     } else {
        //Let us not burn NFTs
       if(tiMintTo.value = "" || tiMintTo.value.length != 42)
         throw new Error("We currently need a valid hex destination address.");
       destination = tiMintTo.value;
     } 
     // Must be a valid metadata file and address, let's mint!
     mintNFT(destination, tiMetadataUrl.value);
   }
 }
 
 
 function updateHeaders() {
    hWeek01.innerHTML = getStringResource("MAIN_UI.HEADER_WEEK01");
    shWeek01.innerHTML = getStringResource("MAIN_UI.SUBHEADER_WEEK01");
  }
 
 function updateGreeting(_userName) {
   if(_userName == undefined || _userName == "")
     _userName = getStringResource("MAIN_UI.VISITOR");
   pGreeting.innerHTML = getStringResourceWithUnicorn(
     "MAIN_UI.GREETING",
     {"username" : _userName}
     );
  }
 
 async function updateLabels() {
   lUserName.innerHTML = getStringResource("LABELS.SET_USERNAME");
   lMintingOffer.innerHTML = getStringResource("LABELS.MINTING_OFFER");
   lMetadataUrl.innerHTML = getStringResource("LABELS.METADATA_URL");
   lEnterDestination.innerHTML = getStringResource("LABELS.ENTER_DESTINATION");
   lMintTo.innerHTML = getStringResource("LABELS.MINT_TO");
   lMintedAmountResults.innerHTML = getStringResource("LABELS.MINTED_AMOUNT_RESULTS");
 }
 
 async function updateStandardButtonCaptions() {
   bSetUserName.innerHTML = getStringResource("BUTTONS.SET_USERNAME");
   bMint.innerHTML = getStringResource("BUTTONS.MINT_NFT");
 }
 
 function setWalletNotPresent() {
    const bConnection = document.getElementById("bConnection");
    bConnection.innerHTML = getStringResource("BUTTONS.WHY_WALLET");
    bConnection.className = "button uninstalledWalletButton";
    dLoggedUI.style.display = "none";
    sUnknownUser.style.display = "block";
  }