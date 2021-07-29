import React from 'react';
import './App.css';
import { useState, useEffect } from 'react'; 
import Navbar from './components/Navbar'; 
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import Home from './components/Home.js'
import NftPage from './components/NftPage.js' 

function App() {
  return (
    <div className="App">  
     <Router> 
     <Navbar /> 
       <Route exact path='/' component={Home}/> 

     <Route exact path='/nft' component={NftPage}/> 
     </Router>
     <header className="App-header">
    </header> 
   </div>  
 );
}

export default App;
