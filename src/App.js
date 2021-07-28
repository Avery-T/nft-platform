import React from 'react';
import './App.css';
import { useState, useEffect } from 'react'; 
import Navbar from './components/Navbar'; 
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import NftPage from './components/NftPage.js' 

function App() {
  return (
    <div className="App">  
     <Router> 
     <Navbar /> 
     <Switch> 
       <Route path='/' exact/> 
      </Switch> 
     <Route path='/nft' component={NftPage}/> 
     </Router>
     <header className="App-header">
    </header> 
   </div>  
 );
}

export default App;
