import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light p-2 border-top text-center">
      &copy; {new Date().getFullYear()} StellarTrack Technologies Pvt. Ltd. All rights Reserved
    </footer>
  );
};

export default Footer;
