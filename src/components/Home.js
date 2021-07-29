import React from 'react' 
import styles from './Home.css' 
import bGroundImage from '../images/space.jpg' 

function Home() { 

 return( 
  <div className={'home-wrapper'}> 
    <img className={'image'} src={bGroundImage} />
  </div>
 ) 
} 

export default Home;
