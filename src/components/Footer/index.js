import React from 'react';
import './style.css';

const Footer = () => {
  return (
    <div className='footer-parent-div'>
      <p>created by</p>
      <div id='footer-logos'>
        <img
          src='https://atlantaregional.org/wp-content/uploads/arc-logo-webinar.png'
          alt='ARC-logo'
        />
        <img
          src='https://neighborhoodnexus.org/wp-content/uploads/2022/03/NeighborhoodNexus_Logo_PrimaryRegular_Black.svg'
          alt='NN-logo'
        />
      </div>

    </div>
  );
};
export default Footer;


