import React from 'react';
import './Button.css'; 
import {Link} from 'react-router-dom' 

const STYLES = ['btn--primary', 'btn--outline']
export const button = ({ 
 children, 
type, 
 onClick,
 buttonStyle, 
 buttonSize, 
 buttonSize 

 }) => {const checkButtonStyle= STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0] } 
