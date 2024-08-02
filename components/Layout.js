

import React from 'react';
import 'tailwindcss/tailwind.css'; 

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      
      {children}
    </div>
  );
};

export default Layout;
