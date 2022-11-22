const resources = {
    BUTTONS : {
      CONNECT : "Connect to a wallet",
      WHY_WALLET : "Why do I need a wallet?",
      SET_USERNAME: "Apply change to Smart Contract",
      MINT_NFT : "Mint NFT" 
    },
    LABELS : {
      SET_USERNAME : "Set a new user name",
      MINTING_OFFER : "Mint an NFT",
      MINTED_AMOUNT_RESULTS : "Your minted NFTs",
      METADATA_URL : "Enter the \"metadata.json\" URL:",
      ENTER_DESTINATION : "Check to specify a different wallet destination",
      MINT_TO : "NFT will be minted to:"
    },
    MAIN_UI : {
      HEADER_WEEK01 : "Road to Web 3 - Week 01",
      SUBHEADER_WEEK01 : "Develop an NFT Contract",
      GREETING : "Welcome, {username}!",
      VISITOR : "visitor",
      DISCONNECTED : "To interact with the deployed smart contract, please connect a wallet"
    },
    MINTING_INFO : {
      NONE : "You haven't minted any NFT yet.",
      PARTIAL : "You have minted {number} NFTs out of 5 you can mint.",
      ALL : "You have minted all the NFTs allowed for your wallet."
    },
    WALLET : {
              WALLET_ABSENT : "This website runs on Goerli gas. You haven't connected a wallet. " +
              "Please connect a Metamask wallet with available Goerli Ether. " +
              "If you don't have one, you may install a browser add-on from the " +
              "<a href=\"https://metamask.io/\" target=\"_blank\">Metamask Website</a>. Then, you'll be able to get " +
              "some Goerli Ether for free from one of the suggested <a href = " + 
              "\"http://afos.ml/faucets.html\" target=\"_blank\">Goerli Ether " +
              "Faucets</a>. Just supply your Goerli Ether wallet's address in the" +
              " faucets.",
              WALLET_PRESENT : "There is a compatible crypto wallet present in this browser. Please connect " +
              "to provide the necessary gas to tun the apps. You'll always be able to get " +
              "some Goerli Ether for free from one of the suggested <a href = " + 
              "\"http://afos.ml/faucets.html\">Goerli Ether Faucets</a>. Just supply your " +
              "Goerli Ether wallet's address in the faucets.",
              WALLET_CONNECTED  : "Wallet connected successfully, thank you!",
              WALLET_REFUSED : "You have refused to connect your wallet. To run this site," +
              " we need Goerli Ether to burn some gas in the smart contract writing functions.",
            },
  
    CONTACT : {
              HEADING_CONTACT : "Contact Us",
              INPUT_PLACEHOLDER_EMAIL : "Write Your Email Here",
              INPUT_PLACEHOLDER_NAME  : "Write Your Name",
              INPUT_PLACEHOLDER_MESSAGE : "Write Your Message",
            },
    HOME : {
              HEADING_WELCOME : "Welcome ",
              MESSAGE  : "This is the demo of string resources.",
            },
  }

 /**
 * @function getStringResource - finds the desired string resource from
 * the resources present in the strings.js file.
 * @param {String} _desiredResource 
 * @returns the desired string, when found, or (null) when anything goes wrong
 */
function getStringResource(_desiredResource) {
  const brokenDown = _desiredResource.split(".");
  let result = resources;
  let i = 0;
  for(; i < brokenDown.length; i++) {
      if((result=result[brokenDown[i]])==undefined)
          return null;
  }
  if(result.length == undefined)
      return null;
  return result;   
}

function getStringResourceWithUnicorn(_desiredResource, _argumentList) {
  const partialResult = getStringResource(_desiredResource);
  if(partialResult == null)
    return null;
  let finalResult = partialResult.formatUnicorn(_argumentList);
  return finalResult;
}

/**
*
*
*/
  String.prototype.formatUnicorn =
   String.prototype.formatUnicorn ||
    function () {
      "use strict";
      var str = this.toString();
      if (arguments.length) {
        var t = typeof arguments[0];
        var key;
        var args =
         ("string" === t || "number" === t) ?
          Array.prototype.slice.call(arguments) :
          arguments[0];
        for (key in args) {
          str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
      }
    return str;
  };
