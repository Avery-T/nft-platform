import React from 'react' 
import styles from './Home.css' 
import bGroundImage from '../images/space.jpg' 
import {Button}  from './Button.js' 
function Home() { 

 return(  
  <React.Fragment> 
  <div className={'home-wrapper'}> 
    <img className={'image'} src={bGroundImage} />
  </div> 
   <div className={'home-btns'}> 
    <Button 
	 className='btns' 
	 buttonStyle='btn--outline' 
	 buttonSize='btn--large' 
	 > Hire Me </Button> 
    <Button className='btns' 
         buttonStyle='btn--primary'
	 buttonSize='btn--large'>
	 Click The Pain Away
    </Button> 
     </div> 
  </React.Fragment> 

 ) 
} 

export default Home;
