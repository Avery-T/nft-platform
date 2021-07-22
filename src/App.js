import React from 'react';
import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react'; 
import { ethers } from 'ethers'; 
import Picture from './artifacts/contracts/Picture.sol/Picture.json'

const pictureAddress =  '0x5FbDB2315678afecb367f032d93F642f64180aa3' 

function App() {
  const [name, setName] = useState(''); 
  const [selectedFile, setSelectedFile] = useState('');
  const [hash, setHashValue] = useState(); 
  const [hashesOwned, setHashesOwned] = useState(['']);

  async function requestAccount() {
    await window.ethereum.request({method: 'eth_requestAccounts'});
   }
  
  async function getUserHashes() {
  //resets the sate so no duplicate nfts shows up
    if (typeof window.ethereum !== 'undefined') { 
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(pictureAddress, Picture.abi, provider);
      try{
	const walletAddress = await provider.getSigner().getAddress();     
        //const data = await contract.balanceOf(walletAddress) 
        //const balance = await data.toNumber() 
	const data = await contract.totalSupply();
        const totalSupply = await data.toNumber();
	console.log('data: ', totalSupply);
        //checks to see which nft in the array the wallet calling owns
	//re implement this with metadata not an array
	let nftsOwned = []; 
	for(let i=0; i<totalSupply; i++){
	 console.log( contract.pictureHashes(i));
	  let nftOwner = await contract.ownerOf(i);
	  console.log('owner' + nftOwner);
	  console.log(walletAddress);
            if(nftOwner  == walletAddress){ 
	      let nftOwnerHash = await contract.pictureHashes(i);
	      nftsOwned.push(nftOwnerHash);  
	    }
	}
        console.log(nftsOwned);	
	setHashesOwned([...hashesOwned, {nftsOwned}]);
      }  catch(err) { console.log ('error: ', err) } 
    }
  }  

  async function setHash() {  
    if (!hash) return
    if (typeof window.ethereum !== 'undefined') {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(pictureAddress, Picture.abi, signer);
    const transaction = await contract.mint(hash);
    await transaction.wait();
   }
  }

  const submitForm = () => { 
    const formData = new FormData(); 
    formData.append('image',selectedFile); 
    alert(selectedFile)
    axios.post('http://localhost:5555/single', formData).then((res) => { alert("fille uploaded")})
    .catch((err) =>alert("FileUpload Error")); 
  }

  return (
    <div className="App">  
     <header className="App-header">
     <form> 
       <input
         type="text"
         value={name}
         onChange={(e) => setName(e.target.value)}
       />
       <input
         type="file"
         name="image" 
         id={selectedFile}
         onChange={(e) => setSelectedFile(e.target.files[0])}
       />
     <button onClick ={submitForm}> Submit </button>
     </form>  
     <input onChange={e => setHashValue(e.target.value)} placeholder="Set hash" />
     <button onClick={setHash}>---------------mint---------------</button>
     <p>-- Your NFT's -- </p>
     <button onClick={getUserHashes}>Fetch Hash</button>
     <p > {JSON.stringify(hashesOwned[1])} </p>  
     
    </header> 
   </div>  
 );
}

export default App;
