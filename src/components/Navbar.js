import React, {useState} from 'react' 
import {Link} from 'react-router-dom'
import './Navbar.css'
import {Button} from './Button'; 
 


function Navbar() { 

const  closeMobileMenu = () => {setClick(false)} 
const [click, setClick] = useState(false)
const [button,setButton] = useState(true)
const handleClick = () => setClick(!click); 

const showButton = () => { 
 if(window.innerWidth <= 960) 
 { setButton(false); 

}else{ setButton(true) }; 
}

window.addEventListener('resize', showButton); 

 return (
    <React.Fragment>
    <nav className='navbar'> 
     <div className='navbar-container'> 
      <Link to='/' className='navbar-logo'>
       NFT <i className='fab fa-typo3'/>

      </Link>
      <div className='menu-icon' onClick={handleClick}> 
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
     </div> 
     <ul className={click ? 'nav-menu active' :  'nav-menu'}> 
     <li className='nav-item'> 
       <Link to='/Home' className='nav-links' onClick={closeMobileMenu}> Home </Link>  
     </li>
     <li className='nav-item'>
       <Link to='/Mint' className='nav-links' onClick={closeMobileMenu}> Mint NFT </Link>
     </li>
     </ul>
     {button && <Button buttonStyle='btn--outline'> Mint NFT </Button> }
     </div> 
   </nav>
   </React.Fragment>
  );
} 

export default Navbar;
