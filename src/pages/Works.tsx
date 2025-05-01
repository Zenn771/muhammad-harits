
import React from 'react';
import Navbar from '@/components/Navbar';

const Works = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-b from-black to-dark relative grain-effect">
      <div className="fixed top-5 left-0 right-0 z-50">
        <Navbar />
      </div>
      
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-white">Works Page</h1>
      </div>
    </div>
  );
};

export default Works;
