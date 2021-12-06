import React from 'react';
import './style.css';

const Footer = () => {
  return (
    <div className='footer-parent-div'>
      <p>created by</p>
      <div id='footer-logos'>
        <img
          src='https://i2.wp.com/neighborhoodnexus.org/wp-content/uploads/2021/12/ARC_logo_PMS7549_PMS425-e1638809577931.png'
          alt='ARC-logo'
        />
        <img
          src='https://neighborhoodnexus.org/wp-content/uploads/2016/04/neighborhood-nexus-logo.png'
          alt='NN-logo'
        />
      </div>

    </div>
  );
};
export default Footer;


