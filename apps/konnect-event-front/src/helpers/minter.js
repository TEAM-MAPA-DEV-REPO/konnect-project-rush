import Web3 from "web3"; // Only when using npm/yarn
import Moralis from "moralis";
import EventEmitter from "reactjs-eventemitter";
import { HiddenContracts } from '../contracts';

// Enable web3 and get the initialized web3 instance from Web3.js
await Moralis.enableWeb3();
const web3 = new Web3(Moralis.provider);
console.log('Web 초기화...', web3);

export const uploadAndMint = async (metadata, account) => {
    console.log('민팅 프로세스 시작...', metadata, account);
    const imageFile = new Moralis.File("generatedGoldy.png", { base64: metadata.image_data });
    // await imageFile.save();
    await imageFile.saveIPFS();
    const imageURI = imageFile.ipfs();
    console.log('이미지 ifps url...', imageURI, imageFile.url());
    // const metadata = {
    //   "name": "My Cute Goldy",
    //   "description": "Generated Goldies from Hidden NFT System",
    //   "image": imageURI
    // }
    metadata.image = imageURI;
    delete metadata.image_data;
    const metadataFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metadata))}) // Buffer.from(JSON.stringify(metadata), "base64")}) // btoa(JSON.stringify(metadata))});
    // await metadataFile.save();
    await metadataFile.saveIPFS();
    const metadataURI = metadataFile.ipfs();
    console.log('메타데이터 ifps url...', metadataURI, metadataFile.url());
    EventEmitter.emit('fetchMintProgress', {message: 'Medadata created'})
    
    const hiddenMetadata = new Moralis.Object("HiddenMetadata");
    hiddenMetadata.set("mint_id", "not allocated");
    hiddenMetadata.set("tx_hash", "not allocated");
    hiddenMetadata.set("gas_used", 0);
    hiddenMetadata.set("owner", account.toLowerCase());
    hiddenMetadata.set("image", imageFile);
    hiddenMetadata.set("metadata", metadataFile);
    hiddenMetadata.set("mint", "pending");
    await hiddenMetadata.save();
    EventEmitter.emit('fetchMintProgress', {message: 'Server data created'})
    
    // const result = await mintToken(metadataURI).then(notify)
    const result = await mintTokenByWeb3(metadataURI, account)
    console.log('민팅 결과...', result);
    EventEmitter.emit('fetchMintProgress', {message: 'Mint finished'})

    hiddenMetadata.set("mint_id", result.events.Transfer.returnValues.tokenId)
    hiddenMetadata.set("tx_hash", result.transactionHash)
    hiddenMetadata.set("gas_used", result.gasUsed)
    hiddenMetadata.set("mint", "finished")
    await hiddenMetadata.save();
    EventEmitter.emit('fetchMintProgress', {message: 'Mint result updated'})

    metadata.id = 'Goldy#' + result.events.Transfer.returnValues.tokenId;
    metadata.parts.Body = {
        partName : metadata.parts.Body.partName,
        thumbnail: metadata.parts.Body.partName + '_body_2.png',
    }
    metadata.parts["Ear/Horn"] = {
        partName : metadata.parts["Ear/Horn"].partName,
        thumbnail: metadata.parts["Ear/Horn"].partName + '_rightear_3.png',
    }
    metadata.parts.Arms = {
        partName : metadata.parts.Arms.partName,
        thumbnail: metadata.parts.Arms.partName + '_rightarm_3.png',
    }
    metadata.parts.Legs = {
        partName : metadata.parts.Legs.partName,
        thumbnail: metadata.parts.Legs.partName + '_leg_0.png',
    }
    return metadata;
}

export const mintTokenByWeb3 = async (_uri, account) => {
    console.log('web3 어카운트 테스트...', web3);
    try {
        const contract = new web3.eth.Contract(HiddenContracts.nftAbi, HiddenContracts.nftAddress);
        const response = await contract.methods
            // .mint(_uri)
            .mintGoldy(_uri)
            .send({ from: account });
        // Get token id
        // return response.events.Transfer.returnValues.tokenId;
        return response;
    } catch (err) {
        console.log('민팅 에러...', err);
    }
}

export const mintToken = async (_uri) => {
    const encodedFunction = web3.eth.abi.encodeFunctionCall({
      name: "mintToken",
      type: "function",
      inputs: [{
        type: 'string',
        name: 'tokenURI'
        }]
    }, [_uri]);
  
    const transactionParameters = {
      to: HiddenContracts.nftAddress,
      from: window.ethereum.selectedAddress,
      data: encodedFunction
    };

    const txt = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters]
    });

    return txt
}