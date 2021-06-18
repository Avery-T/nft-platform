import React from 'react'
import './App.css';
import { useState, useEffect } from 'react'; 
import { ethers } from 'ethers'; 
import Picture from './artifacts/contracts/Picture.sol/Picture.json'

const pictureAddress =  "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9"
 
function App() {
  
  const [hash, setHashValue] = useState() 
  const [hashesOwned, setHashesOwned] = useState([''])
  //useEffect(() => {
  //   setHashesUpdated(true);  
  //  },[hashesOwned]); 


 async function requestAccount() {
    await window.ethereum.request({method: 'eth_requestAccounts'})
  }
  
 async function getUserHashes() {
    //resets the sate so no duplicate nfts shows up
    if (typeof window.ethereum !== 'undefined') { 
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(pictureAddress, Picture.abi, provider)
      try{
	const walletAddress = await provider.getSigner().getAddress()     
        //const data = await contract.balanceOf(walletAddress) 
        //const balance = await data.toNumber() 
	const data = await contract.totalSupply()
        const totalSupply = await data.toNumber()	
	console.log('data: ', totalSupply)
        //checks to see which nft in the array the wallet calling owns
	//re implement this with metadata not an array
	let nftsOwned = [] 
	for(let i=0; i<totalSupply; i++){
	 console.log( contract.pictureHashes(i))
	  let nftOwner = await contract.ownerOf(i)
	  console.log('owner' + nftOwner)
	  console.log(walletAddress)
            if(nftOwner  == walletAddress){ 
	      let nftOwnerHash = await contract.pictureHashes(i) 
	     // console.log(nftOwnerHash)
	      nftsOwned.push(nftOwnerHash)  
	    }
	}
        console.log(nftsOwned)	
	setHashesOwned([...hashesOwned, {nftsOwned}])
      }  catch(err) { console.log ('error: ', err) } 
   }
 } 

   async function setHash() {
    if (!hash) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(pictureAddress, Picture.abi, signer)
      const transaction = await contract.mint(hash)
      await transaction.wait()
    }
  }

 return (
   <div className="App"> 
     <header className="App-header">
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
